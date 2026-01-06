import { useState } from 'react';
import Link from 'next/link';
import { useProgress } from '@/src/hooks/useProgress';
import confetti from 'canvas-confetti';
import { useLanguage } from '@/src/i18n/LanguageContext';

interface Hint {
  title: string;
  content: string;
}

interface ChallengeSidebarProps {
  title: string;
  description: string;
  objectives: string[];
  hints: Hint[];
  projectId: string;
}

export function ChallengeSidebar({
  title,
  description,
  objectives,
  hints,
  projectId
}: ChallengeSidebarProps) {
  const [activeHint, setActiveHint] = useState<number | null>(null);
  const { isCompleted, toggleComplete } = useProgress(projectId);
  const { t } = useLanguage();

  const handleComplete = () => {
    if (!isCompleted) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
    toggleComplete();
  };

  return (
    <div className="lg:col-span-1 space-y-6">
      <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <Link 
            href="/projects"
            className="p-2 -ml-2 rounded-lg text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
              <path fillRule="evenodd" d="M17 10a.75.75 0 01-.75.75H5.612l4.158 3.96a.75.75 0 11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75 0 111.04 1.08L5.612 9.25H16.25A.75.75 0 0117 10z" clipRule="evenodd" />
            </svg>
          </Link>
          <h1 className="text-xl font-bold text-zinc-900 dark:text-white truncate">{title}</h1>
        </div>
        <p className="text-zinc-600 dark:text-zinc-400 mb-6">{description}</p>
        
        <div className="space-y-4">
          <h3 className="font-semibold text-zinc-900 dark:text-white flex items-center gap-2">
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 text-xs">
              1
            </span>
            {t.challenge.objectives}
          </h3>
          <ul className="space-y-3">
            {objectives.map((obj, idx) => (
              <li key={idx} className="flex gap-3 text-sm text-zinc-600 dark:text-zinc-400">
                <div className="mt-1 min-w-4 w-4 h-4 rounded border border-zinc-300 dark:border-zinc-600" />
                {obj}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {hints.length > 0 && (
        <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6 shadow-sm">
          <h3 className="font-semibold text-zinc-900 dark:text-white mb-4 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-yellow-500">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z" clipRule="evenodd" />
            </svg>
            {t.challenge.hints.title}
          </h3>
          <div className="space-y-2">
            {hints.map((hint, idx) => (
              <div key={idx} className="border border-zinc-200 dark:border-zinc-700 rounded-lg overflow-hidden">
                <button
                  onClick={() => setActiveHint(activeHint === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-3 text-sm font-medium text-left bg-zinc-50 dark:bg-zinc-800/50 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                >
                  <span>{t.challenge.hints.trigger} #{idx + 1}: {hint.title}</span>
                  <svg
                    className={`w-4 h-4 transition-transform ${activeHint === idx ? 'rotate-180' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {activeHint === idx && (
                  <div className="p-4 bg-yellow-50/50 dark:bg-yellow-900/10 text-sm text-zinc-700 dark:text-zinc-300 font-mono whitespace-pre-wrap">
                    {hint.content}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      <button
        onClick={handleComplete}
        className={`w-full py-3 px-4 rounded-lg font-bold transition-all flex items-center justify-center gap-2 ${
          isCompleted 
            ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' 
            : 'bg-zinc-900 text-white dark:bg-white dark:text-black hover:opacity-90'
        }`}
      >
        {isCompleted ? (
          <>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
              <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
            </svg>
            {t.challenge.completed_btn}
          </>
        ) : (
          t.challenge.complete_btn
        )}
      </button>
    </div>
  );
}
