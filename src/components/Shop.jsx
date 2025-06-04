function Shop({ resources, setResources }) {
  const sell = (type, price) => {
    if (resources[type] > 0) {
      setResources((prev) => ({
        ...prev,
        [type]: prev[type] - 1,
        gold: prev.gold + price,
      }));
    }
  };

  return (
    <div>
      <h2>🏪 Магазин</h2>
      <p>Золото: 🪙 {resources.gold}</p>
      <button onClick={() => sell('food', 2)}>Продати 1 їжу за 2🪙</button>
      <button onClick={() => sell('wood', 3)}>Продати 1 дерево за 3🪙</button>
      <button onClick={() => sell('ore', 5)}>Продати 1 руду за 5🪙</button>
    </div>
  );
}

export default Shop;
