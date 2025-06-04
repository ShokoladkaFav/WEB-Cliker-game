import { useEffect, useRef } from 'react';

function PassiveUpgrades({ resources, setResources, processed, setProcessed, passive, setPassive }) {
  const tickCounterRef = useRef(0);

  useEffect(() => {
    const baseInterval = setInterval(() => {
      setResources(prev => {
        const next = { ...prev };
        next.food += passive.farm || 0;
        next.wood += passive.sawmill || 0;
        next.ore += passive.mine || 0;
        return next;
      });

      setProcessed(prev => {
        const next = { ...prev };

        for (let i = 0; i < (passive.tavern || 0); i++) {
          if (resources.food >= 14) {
            resources.food -= 14;
            next.meal = (next.meal || 0) + 2;
          }
        }

        for (let i = 0; i < (passive.carpentry || 0); i++) {
          if (resources.wood >= 6) {
            resources.wood -= 6;
            next.planks = (next.planks || 0) + 2;
          }
        }

        for (let i = 0; i < (passive.copperHouse || 0); i++) {
          if (resources.ore >= 10) {
            resources.ore -= 10;
            next.copper = (next.copper || 0) + 2;
          }
        }

        for (let i = 0; i < (passive.smithy || 0); i++) {
          if (resources.ore >= 14) {
            resources.ore -= 14;
            next.iron = (next.iron || 0) + 2;
          }
        }

        for (let i = 0; i < (passive.smeltery || 0); i++) {
          if (resources.ore >= 30) {
            resources.ore -= 30;
            next.whiteIron = (next.whiteIron || 0) + 2;
          }
        }

        for (let i = 0; i < (passive.alchemyForge || 0); i++) {
          if (resources.ore >= 100) {
            resources.ore -= 100;
            next.crystal = (next.crystal || 0) + 2;
          }
        }

        return next;
      });

      tickCounterRef.current++;
    }, 1000);

    const advancedInterval = setInterval(() => {
      setProcessed(prev => {
        const next = { ...prev };

        const tryConsume = (req) => {
          for (let key in req) {
            const total = (resources[key] || 0) + (processed[key] || 0);
            if (total < req[key]) return false;
          }
          for (let key in req) {
            if ((resources[key] || 0) >= req[key]) {
              resources[key] -= req[key];
            } else {
              const rest = req[key] - (resources[key] || 0);
              resources[key] = 0;
              processed[key] -= rest;
            }
          }
          return true;
        };

        const list = [
          ['builderHouse', { planks: 4, iron: 2 }, 'tools'],
          ['furnitureHouse', { planks: 7, tools: 2 }, 'furniture'],
          ['tailorHouse', { cotton: 5, gold: 20 }, 'fabric'],
          ['artHouse', { fabric: 2, paper: 5, ink: 3 }, 'painting'],
          ['bookstore', { paper: 7, ink: 4 }, 'book'],
          ['ambulance', { fabric: 2, herbs: 4 }, 'bandage'],
          ['hospital', { herbs: 8 }, 'potion'],
          ['healerHouse', { herbs: 3, tea: 2 }, 'tincture'],
          ['inn', { meal: 5, spices: 2 }, 'fancyMeal'],
          ['hunterHouse', { food: 5, spices: 1, paper: 2 }, 'drySnack'],
          ['atelier', { fabric: 5, gold: 30 }, 'clothes'],
          ['luxuryStore', { fabric: 10, gold: 100 }, 'fancyClothes'],
        ];

        list.forEach(([key, req, result]) => {
          const count = passive[key] || 0;
          for (let i = 0; i < count; i++) {
            if (tryConsume(req)) {
              next[result] = (next[result] || 0) + 1;
            }
          }
        });

        return next;
      });
    }, 5000);

    return () => {
      clearInterval(baseInterval);
      clearInterval(advancedInterval);
    };
  }, [passive]);

  const handleBuy = (type, cost) => {
    if (resources.gold >= cost) {
      setResources(prev => ({
        ...prev,
        gold: prev.gold - cost,
      }));
      setPassive(prev => ({
        ...prev,
        [type]: (prev[type] || 0) + 1,
      }));
    }
  };

  const upgrades = [
    { key: 'farm', label: '🌾 Ферма', cost: 30, produces: '1 їжа / сек' },
    { key: 'sawmill', label: '🌲 Лісопилка', cost: 30, produces: '1 деревина / сек' },
    { key: 'mine', label: '⛏️ Шахта', cost: 30, produces: '1 руда / сек' },
    { key: 'tavern', label: '🍻 Таверна', cost: 50, produces: '2 страви / 14 їжі' },
    { key: 'carpentry', label: '🪵 Столярня', cost: 50, produces: '2 дошки / 6 дерева' },
    { key: 'copperHouse', label: '🏠 Мідний будинок', cost: 75, produces: '2 міді / 10 руди' },
    { key: 'smithy', label: '⚙️ Ковальня', cost: 100, produces: '2 заліза / 14 руди' },
    { key: 'smeltery', label: '🔥 Плавильня', cost: 150, produces: '2 білого заліза / 30 руди' },
    { key: 'alchemyForge', label: '🧪 Алхемічно-Ковальський будинок', cost: 300, produces: '2 кристали / 100 руди' },
    { key: 'builderHouse', label: '🏗️ Будинок будівельника', cost: 120, produces: '🛠️ Інструменти / 4 дошки + 2 заліза' },
    { key: 'furnitureHouse', label: '🪑 Меблевий будинок', cost: 150, produces: '🪑 Меблі / 7 дошок + 2 інструменти' },
    { key: 'tailorHouse', label: '🧵 Кравецький будинок', cost: 100, produces: '🧶 Тканина / 5 бавовни + 20 золота' },
    { key: 'artHouse', label: '🎨 Будинок митця', cost: 150, produces: '🖼️ Картина / 2 тканини + 5 паперу + 3 чорнила' },
    { key: 'bookstore', label: '📚 Книжковий магазинчик', cost: 150, produces: '📚 Книга / 7 паперу + 4 чорнила' },
    { key: 'ambulance', label: '🏥 Амбулаторія', cost: 100, produces: '🩹 Бинти / 2 тканини + 4 трави' },
    { key: 'hospital', label: '🏨 Лікарня', cost: 150, produces: '🧪 Ліки / 8 трав' },
    { key: 'healerHouse', label: '🧉 Будинок знахаря', cost: 180, produces: '🧉 Настоянка / 3 трави + 2 чаю' },
    { key: 'inn', label: '🏚️ Постоялий двір', cost: 150, produces: '🍽️ Вишукана страва / 5 страв + 2 приправи' },
    { key: 'hunterHouse', label: '🏹 Будинок мисливців', cost: 150, produces: '🥡 Сухий перекус / 5 їжі + приправа + 2 паперу' },
    { key: 'atelier', label: '🧥 Ательє', cost: 200, produces: '👕 Одежа / 5 тканини + 30 золота' },
    { key: 'luxuryStore', label: '👗 Розкішний магазин', cost: 250, produces: '👗 Вишукана одежа / 10 тканини + 100 золота' },
  ];

  return (
    <div className="passive-upgrades">
      <h2>⚙️ Пасивні апгрейди</h2>
      <ul>
        {upgrades.map((u) => (
          <li key={u.key} style={{ marginBottom: '1rem' }}>
            {u.label} — {passive[u.key] || 0} шт.
            <br />
            <button
              onClick={() => handleBuy(u.key, u.cost)}
              style={{
                marginTop: '0.25rem',
                fontSize: '0.85rem',
                padding: '0.4rem 0.7rem',
                borderRadius: '6px',
                backgroundColor: '#6b4e2e',
                color: 'white',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              Купити ({u.cost} 🪙)
            </button>
            <br />
            <small style={{ color: '#555' }}>▶ {u.produces}</small>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PassiveUpgrades;
