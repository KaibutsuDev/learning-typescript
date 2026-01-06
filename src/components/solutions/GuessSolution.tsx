"use client";

import { useState, useEffect } from 'react';

type GameStatus = 'playing' | 'won' | 'lost';

export function GuessSolution() {
  const [target, setTarget] = useState(0);
  const [guess, setGuess] = useState('');
  const [status, setStatus] = useState<GameStatus>('playing');
  const [message, setMessage] = useState('');

  useEffect(() => {
    setTarget(Math.floor(Math.random() * 100) + 1);
  }, []);

  const check = () => {
    const num = parseInt(guess);
    if (isNaN(num)) return;

    if (num === target) {
      setStatus('won');
      setMessage('Correct!');
    } else if (num < target) {
      setMessage('Too low');
    } else {
      setMessage('Too high');
    }
  };

  const reset = () => {
    setTarget(Math.floor(Math.random() * 100) + 1);
    setGuess('');
    setStatus('playing');
    setMessage('');
  };

  return (
    <div className="flex flex-col gap-4 w-full max-w-xs p-4 border border-zinc-200 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-900 shadow-sm">
      {status === 'playing' ? (
        <>
          <div className="flex gap-2">
            <input 
              type="number" 
              value={guess} 
              onChange={e => setGuess(e.target.value)} 
              className="flex-1 p-2 rounded border border-zinc-300 dark:border-zinc-600 bg-transparent text-zinc-900 dark:text-zinc-100"
              placeholder="1-100"
              onKeyDown={e => e.key === 'Enter' && check()}
            />
            <button 
              onClick={check} 
              className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600 transition-colors"
            >
              Guess
            </button>
          </div>
          {message && <p className="text-center font-bold text-zinc-600 dark:text-zinc-300">{message}</p>}
        </>
      ) : (
        <div className="text-center py-4">
           <p className="text-2xl mb-4">🎉</p>
           <p className="text-green-600 dark:text-green-400 font-bold mb-4 text-lg">You won!</p>
           <button 
            onClick={reset} 
            className="px-4 py-2 bg-zinc-800 text-white rounded hover:bg-zinc-700 transition-colors"
          >
            Play Again
          </button>
        </div>
      )}
    </div>
  );
}
