import React, { useState, useEffect, useMemo } from 'react';
import { calculateSplit } from './utils/splitMath';
import SetupScreen from './components/SetupScreen';
import ExpenseForm from './components/ExpenseForm';
import ExpenseSummary from './components/ExpenseSummary';
import './App.css';

export default function App() {
  const [roommates, setRoommates] = useState(() => JSON.parse(localStorage.getItem('roommates')) || []);
  const [expenses, setExpenses] = useState(() => JSON.parse(localStorage.getItem('expenses')) || []);
  const [step, setStep] = useState(() => (roommates.length >= 2 ? 'tracker' : 'setup'));

  useEffect(() => {
    localStorage.setItem('roommates', JSON.stringify(roommates));
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }, [roommates, expenses]);

  const { balances, settlements, total } = useMemo(
    () => calculateSplit(roommates, expenses),
    [roommates, expenses]
  );

  if (step === 'setup') {
    return (
      <SetupScreen
        roommates={roommates}
        setRoommates={setRoommates}
        onStart={() => setStep('tracker')}
      />
    );
  }

  return (
    <div className="container">
      <header className="header">
        <div>
          <h1>🏠 Roommate Expense Splitter</h1>
          <p className="subtitle">
            Roommates: <b>{roommates.join(', ')}</b> • Total: <b>₹{total.toFixed(2)}</b>
          </p>
        </div>
        <button className="btn-light" disabled={expenses.length > 0} onClick={() => setStep('setup')}>
          ← Edit Roommates
        </button>
      </header>

      <div className="grid">
        <ExpenseForm
          roommates={roommates}
          onAdd={(exp) => setExpenses([exp, ...expenses])}
        />
        <ExpenseSummary
          balances={balances}
          settlements={settlements}
          expenses={expenses}
          onDelete={(id) => setExpenses(expenses.filter((e) => e.id !== id))}
        />
      </div>
    </div>
  );
}