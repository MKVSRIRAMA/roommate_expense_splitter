import React from 'react';

export default function ExpenseSummary({ balances, settlements, expenses, onDelete }) {
  return (
    <div>
      <div className="card">
        <h2>Who Owes Whom</h2>
        {settlements.length === 0 ? (
          <p className="subtitle">All settled up! 🎉</p>
        ) : (
          <ul className="list">
            {settlements.map((s, i) => (
              <li key={i} className="settle-row">
                <span><b>{s.from}</b> pays <b>{s.to}</b></span>
                <span className="badge">₹{s.amt.toFixed(2)}</span>
              </li>
            ))}
          </ul>
        )}
        <h3>Net Balances</h3>
        <ul className="list">
          {Object.entries(balances).map(([person, bal]) => (
            <li key={person} className="split-row">
              <span>{person}</span>
              <b className={bal >= 0 ? 'pos' : 'neg'}>
                {bal >= 0 ? `+₹${bal.toFixed(2)}` : `-₹${Math.abs(bal).toFixed(2)}`}
              </b>
            </li>
          ))}
        </ul>
      </div>

      <div className="card">
        <h2>Expense History</h2>
        {expenses.length === 0 ? (
          <p className="subtitle">No expenses yet.</p>
        ) : (
          <ul className="list">
            {expenses.map((e) => (
              <li key={e. id} className="split-row">
                <div className="wrap-text">
                  <b>{e.desc}</b> — ₹{e.amount.toFixed(2)}
                  <div className="small">Paid by <b>{e.paidBy}</b> • Split: {e.splitBetween.join(', ')}</div>
                </div>
                <button className="btn-del" onClick={() => onDelete(e.id)}>✕</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}