import { useState, useEffect } from 'react';
import quests from './questData';
import QuestItem from './QuestItem';
import '../../styles/App.css'; // глобальні стилі

function QuestBoard({ resources, processed, setResources, setProcessed, activeQuests, setActiveQuests }) {
  const [currentQuests, setCurrentQuests] = useState([]);

  const getRandomQuests = () => {
    const available = quests.filter(q => !activeQuests.includes(q.id));
    const shuffled = [...available].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 3);
  };

  const refreshQuests = () => {
    setCurrentQuests(getRandomQuests());
  };

  useEffect(() => {
    refreshQuests(); // при першому завантаженні
  }, [activeQuests]);

  const handleComplete = (quest) => {
    const processedTypes = ['meal', 'planks', 'copper', 'iron', 'whiteIron', 'crystal'];

    if (processedTypes.includes(quest.type)) {
      // Віднімаємо з оброблених ресурсів
      setProcessed(prev => ({
        ...prev,
        [quest.type]: prev[quest.type] - quest.amount,
      }));

      // Додаємо золото
      setResources(prev => ({
        ...prev,
        gold: prev.gold + quest.reward,
      }));
    } else {
      // Віднімаємо зі звичайних ресурсів і додаємо золото
      setResources(prev => ({
        ...prev,
        [quest.type]: prev[quest.type] - quest.amount,
        gold: prev.gold + quest.reward,
      }));
    }

    // Відмічаємо квест як завершений
    setActiveQuests(prev => [...prev, quest.id]);
  };

  return (
    <div className="quest-board">
      <h2>📜 Дошка замовлень</h2>
      <button onClick={refreshQuests} className="refresh-button">
        🔄 Оновити квести
      </button>

      {currentQuests.map((q) => (
        <QuestItem
          key={q.id}
          quest={q}
          resources={resources}
          processed={processed}
          onComplete={handleComplete}
        />
      ))}
    </div>
  );
}

export default QuestBoard;
