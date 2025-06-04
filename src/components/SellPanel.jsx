function SellPanel({ processed, setProcessed, resources, setResources }) {
  const sellOptions = [
    { key: 'meal', label: '🍲 Страва', price: 10 },
    { key: 'planks', label: '🪚 Дошки', price: 8 },
    { key: 'copper', label: '🟠 Мідь', price: 20 },
    { key: 'iron', label: '⚙️ Залізо', price: 45 },
    { key: 'whiteIron', label: '⚪ Біле залізо', price: 80 },
    { key: 'crystal', label: '💠 Мутний кристал', price: 200 },

    // Нові ресурси
    { key: 'tools', label: '🛠️ Інструменти', price: 30 },
    { key: 'furniture', label: '🪑 Меблі', price: 50 },
    { key: 'fabric', label: '🧶 Тканина', price: 20 },
    { key: 'painting', label: '🖼️ Картина', price: 60 },
    { key: 'book', label: '📚 Книга', price: 40 },
    { key: 'bandage', label: '🩹 Бинти', price: 25 },
    { key: 'potion', label: '🧪 Ліки', price: 35 },
    { key: 'tincture', label: '🧉 Настоянка', price: 40 },
    { key: 'fancyMeal', label: '🍽️ Вишукана страва', price: 45 },
    { key: 'drySnack', label: '🥡 Сухий перекус', price: 35 },
    { key: 'clothes', label: '👕 Одежа', price: 60 },
    { key: 'fancyClothes', label: '👗 Вишукана одежа', price: 120 },
  ];

  const handleSell = (key, price) => {
    if (processed[key] > 0) {
      setProcessed(prev => ({
        ...prev,
        [key]: prev[key] - 1,
      }));

      setResources(prev => ({
        ...prev,
        gold: prev.gold + price,
      }));
    }
  };

  return (
    <div className="sell-panel">
      <h2>💰 Продаж ресурсів</h2>
      <ul>
        {sellOptions.map(({ key, label, price }) => (
          <li key={key}>
            {label} ({processed[key] || 0}) — {price} 🪙
            <button onClick={() => handleSell(key, price)} disabled={processed[key] <= 0}>
              Продати 1
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SellPanel;
