function Inventory({ processed }) {
  const entries = Object.entries(processed).filter(([_, count]) => count > 0);

  if (entries.length === 0) {
    return (
      <div className="inventory-panel">
        <h2>🎒 Інвентар</h2>
        <p>У вас ще нічого немає 😅</p>
      </div>
    );
  }

  return (
    <div className="inventory-panel">
      <h2>🎒 Інвентар</h2>
      <ul>
        {entries.map(([key, count]) => (
          <li key={key}>
            {formatLabel(key)}: {count}
          </li>
        ))}
      </ul>
    </div>
  );
}

function formatLabel(key) {
  const map = {
    // Базові ресурси
    meal: '🍲 Страва',
    planks: '🪚 Дошки',
    copper: '🟠 Мідь',
    iron: '⚙️ Залізо',
    whiteIron: '⚪ Біле залізо',
    crystal: '💠 Мутний кристал',

    // Продвинуті ресурси
    herbs: '🌿 Лікувальні трави',
    paper: '📄 Папір',
    cotton: '🏵️ Бавовна',
    ink: '🖋️ Чорнила',
    spices: '🧂 Приправи',
    tea: '🍵 Чай',

    // Оброблені продвинуті
    tools: '🛠️ Інструменти',
    furniture: '🪑 Меблі',
    fabric: '🧶 Тканина',
    painting: '🖼️ Картина',
    book: '📚 Книга',
    bandage: '🩹 Бинти',
    potion: '🧪 Ліки',
    tincture: '🌿 Настоянка',
    fancyMeal: '🍽️ Вишукана страва',
    drySnack: '🥡 Сухий перекус',
    clothes: '👕 Одежа',
    fancyClothes: '👗 Вишукана одежа',
  };

  return map[key] || key;
}

export default Inventory;
