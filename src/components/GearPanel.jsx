function GearPanel({ upgrades, setUpgrades, resources, setResources }) {
  const handleBuyUpgrade = (type, cost) => {
    if (resources.gold >= cost) {
      setResources(prev => ({
        ...prev,
        gold: prev.gold - cost,
      }));
      setUpgrades(prev => ({
        ...prev,
        [type]: prev[type] + 1,
      }));
    }
  };

  return (
    <div className="gear-panel">
      <h2>🛡️ Покращення спорядження</h2>
      <div className="gear-item">
        <p>🗡️ Меч +1 до атаки (Поточна сила: {upgrades.attackPower})</p>
        <button onClick={() => handleBuyUpgrade('attackPower', 50)}>
          Купити (50 🪙)
        </button>
      </div>
    </div>
  );
}

export default GearPanel;
