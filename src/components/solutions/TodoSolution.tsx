"use client";

import { useState } from 'react';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export function TodoSolution() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [text, setText] = useState('');

  const add = () => {
    if (!text.trim()) return;
    const newTodo = { id: Date.now(), text, completed: false };
    setTodos([...todos, newTodo]);
    setText('');
  };

  const toggle = (id: number) => {
    setTodos(todos.map(t => 
      t.id === id ? { ...t, completed: !t.completed } : t
    ));
  };

  const remove = (id: number) => {
    setTodos(todos.filter(t => t.id !== id));
  };

  return (
    <div className="w-full max-w-sm flex flex-col gap-4">
      <div className="flex gap-2">
        <input 
          className="flex-1 p-2 rounded border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800"
          value={text} 
          onChange={e => setText(e.target.value)} 
          placeholder="New Task..."
          onKeyDown={e => e.key === 'Enter' && add()}
        />
        <button 
          onClick={add}
          className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600 transition-colors"
        >
          Add
        </button>
      </div>
      <ul className="space-y-2">
        {todos.length === 0 && <li className="text-zinc-400 text-center italic text-sm">No tasks yet</li>}
        {todos.map(t => (
          <li key={t.id} className="flex gap-3 items-center p-3 rounded bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 shadow-sm">
            <input 
              type="checkbox" 
              checked={t.completed} 
              onChange={() => toggle(t.id)}
              className="w-5 h-5 accent-indigo-500"
            />
            <span className={`flex-1 ${t.completed ? 'line-through text-zinc-400' : 'text-zinc-700 dark:text-zinc-200'}`}>
              {t.text}
            </span>
            <button onClick={() => remove(t.id)} className="text-red-400 hover:text-red-600">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                <path fillRule="evenodd" d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.327 4.025C9.16 4 10 4 10.84 4V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325z" />
                <path d="M8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 001.5.06l.3-7.5z" />
              </svg>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
