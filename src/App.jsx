import { useState, useRef, useEffect } from 'react';
import ResourceClicker from './components/ResourceClicker';
import Shop from './components/Shop';
import QuestBoard from './features/quests/QuestBoard';
import CombatArena from './features/combat/CombatArena';
import UpgradesPanel from './components/UpgradesPanel';
import ProcessingPanel from './components/ProcessingPanel';
import Inventory from './components/Inventory';
import PassiveUpgrades from './components/PassiveUpgrades';
import SellPanel from './components/SellPanel';
import GearPanel from './components/GearPanel';
import AdvancedResources from './components/AdvancedResources';
import TradeGuild from './components/TradeGuild';
import MenuPanel from './components/MenuPanel';

function App() {
  const [resources, setResources] = useState({ food: 0, wood: 0, ore: 0, gold: 0 });
  const [processed, setProcessed] = useState({
    meal: 0, planks: 0, copper: 0, iron: 0, whiteIron: 0, crystal: 0,
    herbs: 0, paper: 0, cotton: 0, ink: 0, spices: 0, tea: 0,
    tools: 0, furniture: 0, fabric: 0, painting: 0, book: 0,
    bandage: 0, potion: 0, tincture: 0, fancyMeal: 0, drySnack: 0,
    clothes: 0, fancyClothes: 0
  });
  const [activeQuests, setActiveQuests] = useState([]);
  const [upgrades, setUpgrades] = useState({ attackPower: 1 });
  const [passive, setPassive] = useState({
    farm: 0, sawmill: 0, mine: 0, tavern: 0,
    carpentry: 0, copperHouse: 0, smithy: 0,
    smeltery: 0, alchemyForge: 0
  });
  const [trade, setTrade] = useState({
    marketStall: 0, materialHouse: 0, diningHall: 0, forgeHouse: 0,
    advancedShop: 0, scienceShop: 0, healingCathedral: 0,
    supplyShop: 0, clothingShop: 0,
    woodSeller: 0, oreSeller: 0, mealSeller: 0, planksSeller1: 0, planksSeller2: 0,
    copperSeller: 0, ironSeller: 0, whiteIronSeller: 0, crystalSeller: 0,
    toolsSeller: 0, furnitureSeller: 0, paintingSeller: 0, bookSeller: 0,
    bandageSeller: 0, potionSeller: 0, tinctureSeller: 0,
    fancyMealSeller: 0, drySnackSeller: 0, clothesSeller: 0, fancyClothesSeller: 0
  });
  const [activeTab, setActiveTab] = useState('processing');
  const [enemy, setEnemy] = useState(null);
  const [currentHp, setCurrentHp] = useState(0);
  const audioRef = useRef(null);
  const [musicOn, setMusicOn] = useState(true);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = 0.4;
      audio.loop = true;
      musicOn ? audio.play().catch(() => {}) : audio.pause();
    }
  }, [musicOn]);

  useEffect(() => {
    const enemies = [
      { name: 'Гоблін', hp: 10, reward: 5 },
      { name: 'Скелет', hp: 15, reward: 8 },
      { name: 'Велетень', hp: 25, reward: 15 },
      { name: 'Демон', hp: 40, reward: 25 }
    ];
    const chosen = enemies[Math.floor(Math.random() * enemies.length)];
    setEnemy(chosen);
    setCurrentHp(chosen.hp);
  }, []);

  useEffect(() => {
    let tick = 0;
    const interval = setInterval(() => {
      setResources(prev => {
        const updated = { ...prev };

        for (let i = 0; i < trade.marketStall; i++) {
          if (updated.food > 0) {
            updated.food -= 1;
            updated.gold += 1;
          }
        }
        for (let i = 0; i < trade.woodSeller; i++) {
          if (updated.wood > 0) {
            updated.wood -= 1;
            updated.gold += 2;
          }
        }
        for (let i = 0; i < trade.oreSeller; i++) {
          if (updated.ore > 0) {
            updated.ore -= 1;
            updated.gold += 3;
          }
        }

        return updated;
      });

      setProcessed(prev => {
        const updated = { ...prev };
        let goldToAdd = 0;

        const trySell = (key, count, price) => {
          for (let i = 0; i < count; i++) {
            if (updated[key] > 0) {
              updated[key] -= 1;
              goldToAdd += price;
            }
          }
        };

        trySell('meal', trade.mealSeller, 10);
        trySell('planks', trade.planksSeller1, 4);
        trySell('planks', trade.planksSeller2, 4);
        trySell('copper', trade.copperSeller, 20);
        trySell('iron', trade.ironSeller, 45);
        trySell('whiteIron', trade.whiteIronSeller, 80);
        trySell('crystal', trade.crystalSeller, 200);
        trySell('tools', trade.toolsSeller, 50);
        trySell('furniture', trade.furnitureSeller, 90);
        trySell('clothes', trade.clothesSeller, 80);

        if (tick % 10 === 0) trySell('painting', trade.paintingSeller, 120);
        if (tick % 10 === 0) trySell('book', trade.bookSeller, 100);
        if (tick % 5 === 0) trySell('bandage', trade.bandageSeller, 30);
        if (tick % 7 === 0) trySell('potion', trade.potionSeller, 60);
        if (tick % 3 === 0) trySell('tincture', trade.tinctureSeller, 70);
        if (tick % 5 === 0) trySell('fancyMeal', trade.fancyMealSeller, 90);
        if (tick % 10 === 0) trySell('drySnack', trade.drySnackSeller, 55);
        if (tick % 10 === 0) trySell('fancyClothes', trade.fancyClothesSeller, 150);

        if (goldToAdd > 0) {
          setResources(prev => ({ ...prev, gold: prev.gold + goldToAdd }));
        }

        return updated;
      });

      tick++;
    }, 1000);

    return () => clearInterval(interval);
  }, [trade]);

  return (
    <div className="app-layout">
      <audio ref={audioRef} src="/audio/theme.mp3" preload="auto" />
      <MenuPanel
  musicOn={musicOn}
  setMusicOn={setMusicOn}
  resources={resources}
  processed={processed}
  passive={passive}
  upgrades={upgrades}
  trade={trade}
  setResources={setResources}
  setProcessed={setProcessed}
  setPassive={setPassive}
  setUpgrades={setUpgrades}
  setTrade={setTrade}
/>

      <div className="main-column">
        <h1>🌾 RPG Clicker</h1>
        <ResourceClicker resources={resources} setResources={setResources} />
        <Shop resources={resources} setResources={setResources} />
        <QuestBoard
          resources={resources}
          processed={processed}
          setResources={setResources}
          setProcessed={setProcessed}
          activeQuests={activeQuests}
          setActiveQuests={setActiveQuests}
        />
      </div>

      <div className="side-column">
        <div className="tabs">
          <button onClick={() => setActiveTab('processing')} className={activeTab === 'processing' ? 'active' : ''}>🔧 Обробка</button>
          <button onClick={() => setActiveTab('passive')} className={activeTab === 'passive' ? 'active' : ''}>⚙️ Пасивні</button>
          <button onClick={() => setActiveTab('sell')} className={activeTab === 'sell' ? 'active' : ''}>💰 Продаж</button>
          <button onClick={() => setActiveTab('inventory')} className={activeTab === 'inventory' ? 'active' : ''}>🎒 Інвентар</button>
          <button onClick={() => setActiveTab('gear')} className={activeTab === 'gear' ? 'active' : ''}>🛡️ Спорядження</button>
          <button onClick={() => setActiveTab('advanced')} className={activeTab === 'advanced' ? 'active' : ''}>🔬 Продвинуті</button>
          <button onClick={() => setActiveTab('trade')} className={activeTab === 'trade' ? 'active' : ''}>🏛️ Торгова гільдія</button>
        </div>

        <div className="tab-content">
          {activeTab === 'processing' && <ProcessingPanel resources={resources} setResources={setResources} processed={processed} setProcessed={setProcessed} />}
          {activeTab === 'passive' && <PassiveUpgrades resources={resources} setResources={setResources} processed={processed} setProcessed={setProcessed} passive={passive} setPassive={setPassive} />}
          {activeTab === 'sell' && <SellPanel processed={processed} setProcessed={setProcessed} resources={resources} setResources={setResources} />}
          {activeTab === 'inventory' && <Inventory processed={processed} />}
          {activeTab === 'gear' && <GearPanel upgrades={upgrades} setUpgrades={setUpgrades} resources={resources} setResources={setResources} />}
          {activeTab === 'advanced' && <AdvancedResources processed={processed} />}
          {activeTab === 'trade' && <TradeGuild processed={processed} setProcessed={setProcessed} resources={resources} setResources={setResources} trade={trade} setTrade={setTrade} />}
        </div>

        <div className="combat-section">
          <CombatArena enemy={enemy} currentHp={currentHp} setCurrentHp={setCurrentHp} generateEnemy={() => {}} setResources={setResources} upgrades={upgrades} />
        </div>
      </div>
    </div>
  );
}

export default App;
