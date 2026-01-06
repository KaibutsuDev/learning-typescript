"use client";

import { useState } from 'react';
import ChallengeLayout from '@/src/components/ChallengeLayout';
import { useLanguage } from '@/src/i18n/LanguageContext';

// -------------------------------------------------------------------------
// 🏗️ USER WORKSPACE
// -------------------------------------------------------------------------

function ApiDashboardWorkshop() {
  const { t } = useLanguage();
  
  return (
    <div className="w-full max-w-2xl bg-white dark:bg-zinc-900 p-6 rounded-xl shadow-lg border border-zinc-200 dark:border-zinc-800">
      <div className="text-center text-zinc-500 py-12 border-2 border-dashed border-zinc-200 dark:border-zinc-700 rounded-lg">
        <p>🚧 Tu API Dashboard aparecerá aquí 🚧</p>
        <p className="text-sm mt-2">Sigue los objetivos de la izquierda</p>
      </div>
    </div>
  );
}

// -------------------------------------------------------------------------
// 💡 MODEL SOLUTION
// -------------------------------------------------------------------------

interface User {
  id: number;
  name: string;
  email: string;
}

type FetchState<T> = 
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'error', error: string }
  | { status: 'success', data: T };

function ApiSolution() {
  const [state, setState] = useState<FetchState<User[]>>({ status: 'idle' });

  const loadUsers = async () => {
    setState({ status: 'loading' });
    try {
      // Simulating network delay for realistic effect
      await new Promise(r => setTimeout(r, 1000));
      
      const res = await fetch('https://jsonplaceholder.typicode.com/users');
      if (!res.ok) throw new Error('Network error');
      const data = await res.json();
      setState({ status: 'success', data });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setState({ status: 'error', error: message });
    }
  };

  return (
    <div className="w-full max-w-sm flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h4 className="font-bold text-zinc-900 dark:text-white">User List</h4>
        <button 
          onClick={loadUsers} 
          disabled={state.status === 'loading'}
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
        >
          {state.status === 'loading' ? 'Loading...' : 'Load Users'}
        </button>
      </div>

      <div className="min-h-[200px] border border-zinc-200 dark:border-zinc-700 rounded-lg p-2 bg-white dark:bg-zinc-800">
        {state.status === 'idle' && (
            <div className="h-full flex items-center justify-center text-zinc-400 text-sm">
                Click "Load Users" to fetch data
            </div>
        )}

        {state.status === 'loading' && (
             <div className="h-full flex flex-col items-center justify-center text-zinc-400 gap-2">
                <div className="w-6 h-6 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                <span className="text-sm">Fetching...</span>
            </div>
        )}

        {state.status === 'error' && (
            <div className="h-full flex items-center justify-center text-red-500 text-sm p-4 text-center">
                Error: {state.error}
            </div>
        )}
      
        {state.status === 'success' && (
            <div className="grid gap-2 max-h-[300px] overflow-y-auto">
            {state.data.slice(0, 5).map(u => (
                <div key={u.id} className="p-3 border border-zinc-100 dark:border-zinc-700 rounded shadow-sm bg-zinc-50 dark:bg-zinc-800/50">
                    <p className="font-semibold text-sm">{u.name}</p>
                    <p className="text-xs text-zinc-500">{u.email}</p>
                </div>
            ))}
            </div>
        )}
      </div>
    </div>
  );
}

// -------------------------------------------------------------------------
// 🧩 CHALLENGE CONFIGURATION
// -------------------------------------------------------------------------

export default function ApiDashboardPage() {
  const { t } = useLanguage();
  const c = t.projects.list.api_dashboard;

  return (
    <ChallengeLayout
      title={c.title}
      description={c.longDesc || c.desc}
      objectives={c.objectives || []}
      hints={c.hints || []}
      solution={c.solution}
      solutionComponent={<ApiSolution />}
      projectId="api-dashboard"
    >
      <ApiDashboardWorkshop />
    </ChallengeLayout>
  );
}
