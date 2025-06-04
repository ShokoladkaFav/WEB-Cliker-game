function ProcessingPanel({ resources, setResources, processed, setProcessed }) {
  const canAfford = (req) =>
    Object.entries(req).every(([key, value]) =>
      key === 'gold' ? resources[key] >= value : (resources[key] ?? processed[key] ?? 0) >= value
    );

  const process = (req, goldCost, resultKey, resultAmount = 1) => {
    if (canAfford(req) && resources.gold >= goldCost) {
      const updatedResources = { ...resources };
      const updatedProcessed = { ...processed };

      Object.entries(req).forEach(([key, val]) => {
        if (resources[key] !== undefined) {
          updatedResources[key] -= val;
        } else if (processed[key] !== undefined) {
          updatedProcessed[key] -= val;
        }
      });

      updatedResources.gold -= goldCost;

      setResources(updatedResources);
      setProcessed(prev => ({
        ...updatedProcessed,
        [resultKey]: (prev[resultKey] || 0) + resultAmount,
      }));
    }
  };

  return (
    <div className="processing-panel">
      <h2>🔧 Обробка ресурсів</h2>
      <ul>
        {/* Базові рецепти */}
        <li>🍞 3 їжі + 3 🪙 → 🍲 Страва
          <button onClick={() => process({ food: 3 }, 3, 'meal')}>Готувати</button>
        </li>
        <li>🪵 1 дерево + 2 🪙 → 🪚 Дошки
          <button onClick={() => process({ wood: 1 }, 2, 'planks')}>Розпиляти</button>
        </li>
        <li>⛏️ 2 руда + 5 🪙 → 🟠 Мідь
          <button onClick={() => process({ ore: 2 }, 5, 'copper')}>Плавити</button>
        </li>
        <li>⛏️ 5 руда + 15 🪙 → ⚙️ Залізо
          <button onClick={() => process({ ore: 5 }, 15, 'iron')}>Плавити</button>
        </li>
        <li>⛏️ 10 руда + 25 🪙 → ⚪ Біле залізо
          <button onClick={() => process({ ore: 10 }, 25, 'whiteIron')}>Плавити</button>
        </li>
        <li>⛏️ 30 руда + 100 🪙 → 💠 Мутний кристал
          <button onClick={() => process({ ore: 30 }, 100, 'crystal')}>Синтез</button>
        </li>

        <hr />
        <h3>📦 Складні ресурси</h3>

        <li> 2 🪚 + ⚙️ → 🛠️ Інструменти
          <button onClick={() => process({ planks: 2, iron: 1 }, 0, 'tools')}>Зібрати</button>
        </li>
        <li> 5 🪚 + 🛠️ → 🪑 Меблі
          <button onClick={() => process({ planks: 5, tools: 1 }, 0, 'furniture')}>Створити</button>
        </li>
        <li> 3 ☁️ + 10 🪙 → 🧶 Тканина
          <button onClick={() => process({ cotton: 3 }, 10, 'fabric')}>Шити</button>
        </li>
        <li> 1 🧶 + 3 📄 + 2 🖋️ → 🖼️ Картина
          <button onClick={() => process({ fabric: 1, paper: 3, ink: 2 }, 0, 'painting')}>Малювати</button>
        </li>
        <li> 5 📄 + 2 🖋️ → 📚 Книга
          <button onClick={() => process({ paper: 5, ink: 2 }, 0, 'book')}>Скласти</button>
        </li>
        <li> 1 🧶 + 2 🌿 → 🩹 Бинти
          <button onClick={() => process({ fabric: 1, herbs: 2 }, 0, 'bandage')}>Перев’язати</button>
        </li>
        <li> 5 🌿 → 🧪 Флакон ліків
          <button onClick={() => process({ herbs: 5 }, 0, 'potion')}>Готувати</button>
        </li>
        <li> 🌿 + 🍵 → 🧉 Лікувальна настоянка
          <button onClick={() => process({ herbs: 3, tea: 1 }, 0, 'tincture')}>Настоювати</button>
        </li>
        <li>🍲 x2 + 🧂 → 🍽️ Вишукана страва
          <button onClick={() => process({ meal: 2, spices: 1 }, 0, 'fancyMeal')}>Готувати</button>
        </li>
        <li>🍞x2 + 🧂 + 📄 → 🥡 Сухий перекус
          <button onClick={() => process({ food: 2, spices: 1, paper: 1 }, 0, 'drySnack')}>Упакувати</button>
        </li>
        <li> 3 🧶 + 15 🪙 → 👕 Одежа
          <button onClick={() => process({ fabric: 3 }, 15, 'clothes')}>Шити</button>
        </li>
        <li> 5 🧶 + 50 🪙 → 👗 Вишукана одежа
          <button onClick={() => process({ fabric: 5 }, 50, 'fancyClothes')}>Вишивати</button>
        </li>
      </ul>
    </div>
  );
}

export default ProcessingPanel;
