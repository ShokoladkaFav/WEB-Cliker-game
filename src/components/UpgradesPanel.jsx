function UpgradesPanel({ upgrades, setUpgrades, resources, setResources }) {
  const handleUpgrade = (key, cost, effect) => {
    if (resources.gold >= cost) {
      setResources((prev) => ({
        ...prev,
        gold: prev.gold - cost,
      }));

      setUpgrades((prev) => ({
        ...prev,
        [key]: prev[key] + effect,
      }));
    }
  };

  return (
    <div className="upgrade-panel">
      <h2>🛠️ Покращення</h2>
      <p>Сила атаки: {upgrades.attackPower}</p>
      <button
        onClick={() => handleUpgrade('attackPower', 20, 1)}
        disabled={resources.gold < 20}
      >
        +1 сила атаки (20 🪙)
      </button>
    </div>
  );
}

export default UpgradesPanel;
