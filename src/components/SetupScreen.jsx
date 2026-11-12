import React, { useState } from 'react';

export default function SetupScreen({ roommates, setRoommates, onStart }) {
  const [name, setName] = useState('');

  const handleAdd = (e) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (trimmed && !roommates.some((r) => r.toLowerCase() === trimmed.toLowerCase())) {
      setRoommates([...roommates, trimmed]);
      setName('');
    }
  };

  return (
    <div className="setup-box">
      <div className="card">
        <div className="center">
          <h1>🏠 Roommate Expense Splitter</h1>
          <p className="subtitle">Step 1: Add roommates (minimum 2)</p>
        </div>
        <form onSubmit={handleAdd} className="row">
          <input
            placeholder="Enter roommate name..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoFocus
          />
          <button type="submit" className="btn-dark">Add</button>
        </form>
        <ul className="list">
          {roommates.map((r) => (
            <li key={r} className="item-box">
              <span>{r}</span>
              <button className="btn-del" onClick={() => setRoommates(roommates.filter((x) => x !== r))}>
                ✕
              </button>
            </li>
          ))}
        </ul>
        <button className="btn-primary full" disabled={roommates.length < 2} onClick={onStart}>
          Go to Sharing Platform →
        </button>
      </div>
    </div>
  );
}