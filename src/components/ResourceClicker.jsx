function ResourceClicker({ resources, setResources }) {
  const handleClick = (type) => {
    setResources((prev) => ({
      ...prev,
      [type]: prev[type] + 1,
    }));
  };

  return (
    <div>
      <h2>🔨 Добування ресурсів</h2>
      <button onClick={() => handleClick('food')}>🍞 Зібрати їжу</button>
      <button onClick={() => handleClick('wood')}>🪵 Нарубати дерева</button>
      <button onClick={() => handleClick('ore')}>⛏️ Видобути руду</button>

      <p>Їжа: {resources.food} | Дерево: {resources.wood} | Руда: {resources.ore}</p>
    </div>
  );
}

export default ResourceClicker;
