function QuestItem({ quest, resources, processed, onComplete }) {
  // 👇 Об'єднуємо ресурси з двох джерел
  const allResources = {
    ...resources,
    ...processed,
  };

  const current = allResources[quest.type] || 0;
  const ready = current >= quest.amount;

  const resourceNames = {
    food: 'їжі',
    wood: 'деревини',
    ore: 'руди',
    gold: 'золота',
    meal: 'страв',
    planks: 'дощок',
    copper: 'міді',
    iron: 'заліза',
    whiteIron: 'білого заліза',
    crystal: 'мутного кристалу',
  };

  return (
    <div className="quest-item">
      <h4>{quest.title}</h4>
      <p>
        Завдання: зібрати {quest.amount} {resourceNames[quest.type] || quest.type} ({current}/{quest.amount})
      </p>
      <p>Нагорода: {quest.reward} 🪙</p>
      <button disabled={!ready} onClick={() => onComplete(quest)}>
        {ready ? '✅ Завершити' : '❌ Недостатньо'}
      </button>
    </div>
  );
}

export default QuestItem;
