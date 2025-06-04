import { useState, useEffect } from 'react';
import enemies from './enemyData';
import EnemyDisplay from './EnemyDisplay';

function CombatArena({ setResources, upgrades }) {
  const [enemy, setEnemy] = useState(null);
  const [currentHp, setCurrentHp] = useState(0);

  useEffect(() => {
    generateEnemy();
  }, []);

  const generateEnemy = () => {
    const random = enemies[Math.floor(Math.random() * enemies.length)];
    setEnemy(random);
    setCurrentHp(random.hp);
  };

  const attack = () => {
    const damage = upgrades?.attackPower || 1;

    if (currentHp > damage) {
      setCurrentHp((prev) => prev - damage);
    } else {
      setResources((prev) => ({
        ...prev,
        gold: prev.gold + enemy.reward,
      }));
      generateEnemy();
    }
  };

  if (!enemy) return <p>Завантаження ворога...</p>;

  return (
    <div>
      <h2>⚔️ Бойова зона</h2>
      <EnemyDisplay enemy={enemy} currentHp={currentHp} />
      <button onClick={attack}>🗡️ Атакувати</button>
    </div>
  );
}

export default CombatArena;
