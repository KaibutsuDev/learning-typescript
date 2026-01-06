"use client";

import { useState } from 'react';

export function CalculatorSolution() {
  const [num1, setNum1] = useState<string>('');
  const [num2, setNum2] = useState<string>('');
  const [result, setResult] = useState<number | string | null>(null);

  const handleOp = (op: '+' | '-' | '*' | '/') => {
    const n1 = parseFloat(num1);
    const n2 = parseFloat(num2);
    if (isNaN(n1) || isNaN(n2)) return setResult("Entrada no válida");

    switch(op) {
      case '+': setResult(n1 + n2); break;
      case '-': setResult(n1 - n2); break;
      case '*': setResult(n1 * n2); break;
      case '/': setResult(n2 !== 0 ? n1 / n2 : "Div por 0"); break;
    }
  };

  return (
    <div className='p-4 gap-4 flex flex-col w-full max-w-[200px] border border-zinc-200 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-900 shadow-sm'>
      <div className="flex flex-col gap-2">
        <input 
          className="p-2 rounded border border-zinc-300 dark:border-zinc-600 bg-transparent text-right font-mono"
          value={num1} 
          onChange={e => setNum1(e.target.value)} 
          placeholder="0" 
        />
        <input 
          className="p-2 rounded border border-zinc-300 dark:border-zinc-600 bg-transparent text-right font-mono"
          value={num2} 
          onChange={e => setNum2(e.target.value)} 
          placeholder="0" 
        />
      </div>
      
      <div className="grid grid-cols-4 gap-2">
        {['+', '-', '*', '/'].map(op => (
          <button 
            key={op} 
            onClick={() => handleOp(op as any)}
            className="p-2 rounded bg-indigo-100 hover:bg-indigo-200 dark:bg-indigo-900/30 dark:hover:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 font-bold transition-colors"
          >
            {op}
          </button>
        ))}
      </div>
      
      <div className="text-right p-2 font-mono font-bold border-t border-zinc-200 dark:border-zinc-700">
        Result: {result ?? '-'}
      </div>
    </div>
  )
}
