import React, { useState } from 'react';

export default function ExpenseForm({ roommates, onAdd }) {
  const [desc, setDesc] = useState('');
  const [amount, setAmount] = useState('');
  const [paidBy, setPaidBy] = useState(roommates[0] || '');
  const [splitBetween, setSplitBetween] = useState(roommates);

  const toggleSplit = (name) =>
    setSplitBetween((prev) =>
      prev.includes(name) ? prev.filter((item) => item !== name) : [...prev, name]
    );

  const handleSubmit = (e) => {
    e.preventDefault();
    const num = parseFloat(amount);
    if (!desc.trim() || isNaN(num) || num <= 0 || !splitBetween.length) return;
    onAdd({ id: Date.now(), desc: desc.trim(), amount: num, paidBy, splitBetween });
    setDesc('');
    setAmount('');
  };

  return (
    <div className="card">
      <h2>Add Shared Expense</h2>
      <form onSubmit={handleSubmit} className="stack">
        <input placeholder="Description (e.g., Wi-Fi, Groceries)" value={desc} onChange={(e) => setDesc(e.target.value)} />
        <input type="number" step="0.01" placeholder="Amount (₹)" value={amount} onChange={(e) => setAmount(e.target.value)} />
        <label className="row-center">
          <span>Paid By:</span>
          <select value={paidBy} onChange={(e) => setPaidBy(e.target.value)}>
            {roommates.map((r) => <option key={r} value={r}>{r}</option>)}
          </select>
        </label>
        <div>
          <span className="label">Split Equally Between:</span>
          <div className="checks">
            {roommates.map((r) => (
              <label key={r} className="check-item">
                <input type="checkbox" checked={splitBetween.includes(r)} onChange={() => toggleSplit(r)} />
                <span>{r}</span>
              </label>
            ))}
          </div>
        </div>
        <button type="submit" className="btn-primary full">Record Expense</button>
      </form>
    </div>
  );
}