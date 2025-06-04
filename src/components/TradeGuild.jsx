import { useEffect } from 'react';

/**
 *  🏛️  Торгова гільдія
 *  ───────────────────
 *  • Кожен апґрейд щосекунди (або раз на 3 / 5 / 7 / 10 с) продає 1 од. свого ресурсу
 *  • Кількість, що продається = рівню апґрейду (1 рівень → 1 од. за цикл)
 *  • Ціни вказані у таблиці «prices»
 */
function TradeGuild({ processed, setProcessed, resources, setResources, trade, setTrade }) {
  /**  ціна золота за 1 од. ресурсу */
  const prices = {
    food: 1,      wood: 2,   ore: 3,    meal: 10,   planks: 4,
    copper: 20,   iron: 45,  whiteIron: 80, crystal: 200,
    tools: 50,    furniture: 90,
    painting: 120, book: 100,
    bandage: 30,  potion: 60, tincture: 70,
    fancyMeal: 90, drySnack: 55,
    clothes: 80,  fancyClothes: 150,
  };

  useEffect(() => {
    let tick = 0;

    const interval = setInterval(() => {
      /** ──────────── 1. Ресурси з resources ──────────── */
      setResources(prev => {
        const up = { ...prev };

        const sellFromResources = (key, level, intervalSec = 1) => {
          if (level > 0 && tick % intervalSec === 0 && up[key] >= level) {
            up[key] -= level;
            up.gold += level * prices[key];
          }
        };

        sellFromResources('food', trade.marketStall);                 // 🛒
        sellFromResources('wood', trade.woodSeller);                  // 🪵
        sellFromResources('ore',  trade.oreSeller);                   // ⛏️

        return up;
      });

      /** ──────────── 2. Ресурси з processed ──────────── */
      setProcessed(prev => {
        const up = { ...prev };
        let goldGain = 0;

        const sellFromProcessed = (key, level, intervalSec = 1) => {
          if (level > 0 && tick % intervalSec === 0 && up[key] >= level) {
            up[key] -= level;
            goldGain += level * prices[key];
          }
        };

        // щосекунди
        sellFromProcessed('meal',      trade.mealSeller);
        sellFromProcessed('planks',    trade.planksSeller1);
        sellFromProcessed('planks',    trade.planksSeller2);
        sellFromProcessed('copper',    trade.copperSeller);
        sellFromProcessed('iron',      trade.ironSeller);
        sellFromProcessed('whiteIron', trade.whiteIronSeller);
        sellFromProcessed('crystal',   trade.crystalSeller);
        sellFromProcessed('tools',     trade.toolsSeller);
        sellFromProcessed('furniture', trade.furnitureSeller);
        sellFromProcessed('clothes',   trade.clothesSeller);

        // інтервал ≠ 1 с
        sellFromProcessed('painting',    trade.paintingSeller, 10);
        sellFromProcessed('book',        trade.bookSeller,     10);
        sellFromProcessed('bandage',     trade.bandageSeller,   5);
        sellFromProcessed('potion',      trade.potionSeller,    7);
        sellFromProcessed('tincture',    trade.tinctureSeller,  3);
        sellFromProcessed('fancyMeal',   trade.fancyMealSeller, 5);
        sellFromProcessed('drySnack',    trade.drySnackSeller, 10);
        sellFromProcessed('fancyClothes',trade.fancyClothesSeller, 10);

        if (goldGain > 0) {
          setResources(r => ({ ...r, gold: r.gold + goldGain }));
        }
        return up;
      });

      tick++;
    }, 1000);

    return () => clearInterval(interval);
  }, [trade]);

  /** Покупка апґрейду */
  const handleBuy = (key, cost) => {
    if (resources.gold < cost) return;
    setResources(r => ({ ...r, gold: r.gold - cost }));
    setTrade(t => ({ ...t, [key]: (t[key] || 0) + 1 }));
  };

  /** Список апґрейдів */
  const upgrades = [
    { key: 'marketStall',   label: '🛒 Риночний кіоск',             cost: 25,  effect: '2 їжа/сек' },
    { key: 'woodSeller',    label: '🏠 Дерево-загот. будинок',      cost: 40,  effect: '2 деревина/сек' },
    { key: 'oreSeller',     label: '⛏️ Каменоломня',                cost: 45,  effect: '2 руда/сек' },
    { key: 'mealSeller',    label: '🍽️ Їдальня',                   cost: 90,  effect: '2 страва/сек' },
    { key: 'planksSeller1', label: '🪑 Деревʼяний ринок',            cost: 60,  effect: '2 дошка/сек' },
    { key: 'planksSeller2', label: '🪚 Майстерня деревороба',       cost: 75,  effect: '2 дошка/сек' },
    { key: 'copperSeller',  label: '🪙 Купецький монетний двір',    cost: 120, effect: '2 мідь/сек' },
    { key: 'ironSeller',    label: '⚔️ Зброярня',                  cost: 140, effect: '2 залізо/сек' },
    { key: 'whiteIronSeller',label:'🛡️ Бронник',                  cost: 170, effect: '2 біле залізо/сек' },
    { key: 'crystalSeller', label: '🔮 Чарівна обсерваторія',       cost: 220, effect: '2 кристал/сек' },
    { key: 'toolsSeller',   label: '🔧 Будинок ремісників',         cost: 150, effect: '2 інструмент/сек' },
    { key: 'furnitureSeller',label:'🪑 Меблевий магазинчик',       cost: 160, effect: '2 меблі/сек' },
    { key: 'paintingSeller',label: '🎨 Гільдія малярів',            cost: 200, effect: '2 картина/10 с' },
    { key: 'bookSeller',    label: '📚 Бібліотека',                 cost: 200, effect: '2 книга/10 с' },
    { key: 'bandageSeller', label: '🩹 Аптека милосердя',           cost: 140, effect: '2 бинт/5 с' },
    { key: 'potionSeller',  label: '💊 Лікувальний Собор',          cost: 180, effect: '2 ліки/7 с' },
    { key: 'tinctureSeller',label: '🧪 Будинок цілителя',           cost: 160, effect: '2 настоянка/3 с' },
    { key: 'fancyMealSeller',label:'🍖 Лавка екзот. делік.',       cost: 180, effect: '2 вишук. страва/5 с' },
    { key: 'drySnackSeller',label:'🥪 Лавка похідн. запасів',       cost: 150, effect: '2 сухпай/10 с' },
    { key: 'clothesSeller', label: '👗 Ательє',                     cost: 160, effect: '2 одежа/сек' },
    { key: 'fancyClothesSeller',label:'👑 Ткацький двір арист.',   cost: 220, effect: '2 вишук. одеж/10 с' },
  ];

  return (
    <div className="trade-guild">
      <h2>🏛️ Торгова гільдія</h2>
      <ul>
        {upgrades.map(u => (
          <li key={u.key} style={{ marginBottom: '1rem' }}>
            {u.label} — {trade[u.key] || 0} шт.
            <br />
            <button
              onClick={() => handleBuy(u.key, u.cost)}
              style={{
                marginTop: '0.25rem',
                fontSize: '0.85rem',
                padding: '0.4rem 0.7rem',
                borderRadius: '6px',
                backgroundColor: '#5c4033',
                color: 'white',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              Купити ({u.cost} 🪙)
            </button>
            <br />
            <small style={{ color: '#555' }}>▶ {u.effect}</small>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TradeGuild;
