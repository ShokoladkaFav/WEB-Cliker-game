import React from 'react';

function MenuPanel({ 
  musicOn, 
  setMusicOn, 
  resources, 
  processed, 
  passive, 
  upgrades, 
  trade,
  setResources, 
  setProcessed, 
  setPassive, 
  setUpgrades, 
  setTrade 
}) {

  const handleSave = () => {
    const state = {
      resources,
      processed,
      passive,
      upgrades,
      trade
    };
    localStorage.setItem('saveData', JSON.stringify(state));
    alert('Прогрес збережено!');
  };

  const handleLoad = () => {
    const data = JSON.parse(localStorage.getItem('saveData'));
    if (!data) {
      alert('Збереження не знайдено.');
      return;
    }

    // Дефолтні значення (щоб не було undefined)
    const defaultResources = { food: 0, wood: 0, ore: 0, gold: 0 };
    const defaultProcessed = {
      meal: 0, planks: 0, copper: 0, iron: 0, whiteIron: 0, crystal: 0,
      herbs: 0, paper: 0, cotton: 0, ink: 0, spices: 0, tea: 0,
      tools: 0, furniture: 0, fabric: 0, painting: 0, book: 0,
      bandage: 0, potion: 0, tincture: 0, fancyMeal: 0, drySnack: 0,
      clothes: 0, fancyClothes: 0
    };
    const defaultPassive = {
      farm: 0, sawmill: 0, mine: 0, tavern: 0,
      carpentry: 0, copperHouse: 0, smithy: 0,
      smeltery: 0, alchemyForge: 0
    };
    const defaultUpgrades = { attackPower: 1 };
    const defaultTrade = {
      marketStall: 0, materialHouse: 0, diningHall: 0, forgeHouse: 0,
      advancedShop: 0, scienceShop: 0, healingCathedral: 0,
      supplyShop: 0, clothingShop: 0,
      woodSeller: 0, oreSeller: 0, mealSeller: 0,
      planksSeller1: 0, planksSeller2: 0,
      copperSeller: 0, ironSeller: 0, whiteIronSeller: 0, crystalSeller: 0,
      toolsSeller: 0, furnitureSeller: 0, paintingSeller: 0, bookSeller: 0,
      bandageSeller: 0, potionSeller: 0, tinctureSeller: 0,
      fancyMealSeller: 0, drySnackSeller: 0, clothesSeller: 0, fancyClothesSeller: 0
    };

    setResources({ ...defaultResources, ...(data.resources || {}) });
    setProcessed({ ...defaultProcessed, ...(data.processed || {}) });
    setPassive({ ...defaultPassive, ...(data.passive || {}) });
    setUpgrades({ ...defaultUpgrades, ...(data.upgrades || {}) });
    setTrade({ ...defaultTrade, ...(data.trade || {}) });

    alert('Прогрес завантажено!');
  };

  const handleReset = () => {
    if (!window.confirm('Ви впевнені, що хочете скинути прогрес?')) return;

    localStorage.removeItem('saveData');

    setResources({ food: 0, wood: 0, ore: 0, gold: 0 });
    setProcessed({
      meal: 0, planks: 0, copper: 0, iron: 0, whiteIron: 0, crystal: 0,
      herbs: 0, paper: 0, cotton: 0, ink: 0, spices: 0, tea: 0,
      tools: 0, furniture: 0, fabric: 0, painting: 0, book: 0,
      bandage: 0, potion: 0, tincture: 0, fancyMeal: 0, drySnack: 0,
      clothes: 0, fancyClothes: 0
    });
    setPassive({
      farm: 0, sawmill: 0, mine: 0, tavern: 0,
      carpentry: 0, copperHouse: 0, smithy: 0,
      smeltery: 0, alchemyForge: 0
    });
    setUpgrades({ attackPower: 1 });
    setTrade({
      marketStall: 0, materialHouse: 0, diningHall: 0, forgeHouse: 0,
      advancedShop: 0, scienceShop: 0, healingCathedral: 0,
      supplyShop: 0, clothingShop: 0,
      woodSeller: 0, oreSeller: 0, mealSeller: 0,
      planksSeller1: 0, planksSeller2: 0,
      copperSeller: 0, ironSeller: 0, whiteIronSeller: 0, crystalSeller: 0,
      toolsSeller: 0, furnitureSeller: 0, paintingSeller: 0, bookSeller: 0,
      bandageSeller: 0, potionSeller: 0, tinctureSeller: 0,
      fancyMealSeller: 0, drySnackSeller: 0, clothesSeller: 0, fancyClothesSeller: 0
    });

    alert('Прогрес скинуто!');
  };

  return (
    <div className="menu-panel" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', padding: '1rem', background: '#fff', borderRadius: '10px', boxShadow: '0 0 10px rgba(0,0,0,0.2)' }}>
      <button onClick={() => setMusicOn(prev => !prev)}>
        {musicOn ? '🔊 Музика увімкнена' : '🔇 Музика вимкнена'}
      </button>
      <button onClick={handleSave}>💾 Зберегти прогрес</button>
      <button onClick={handleLoad}>📂 Завантажити прогрес</button>
      <button onClick={handleReset}>🗑️ Почати спочатку</button>
    </div>
  );
}

export default MenuPanel;
