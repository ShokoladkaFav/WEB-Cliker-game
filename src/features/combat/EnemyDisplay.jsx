function EnemyDisplay({ enemy, currentHp }) {
  return (
    <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
      <h3>{enemy.name}</h3>
      <img
        src={enemy.image}
        alt={enemy.name}
        style={{ width: '150px', marginBottom: '1rem' }}
      />
      <p>HP: {currentHp} / {enemy.hp}</p>
    </div>
  );
}

export default EnemyDisplay;
