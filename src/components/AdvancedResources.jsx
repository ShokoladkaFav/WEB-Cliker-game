function AdvancedResources({ processed }) {
  return (
    <div className="advanced-panel">
      <h2>🔬 Продвинуті ресурси</h2>
      <ul>
        <li>🌿 Лікувальні трави: {processed.herbs}</li>
        <li>📄 Папір: {processed.paper}</li>
        <li>☁️ Бавовна: {processed.cotton}</li>
        <li>🖋️ Чорнила: {processed.ink}</li>
        <li>🧂 Приправи: {processed.spices}</li>
        <li>🍵 Чай: {processed.tea}</li>
      </ul>
    </div>
  );
}

export default AdvancedResources;
