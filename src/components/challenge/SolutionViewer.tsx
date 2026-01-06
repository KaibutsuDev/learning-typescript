import CodeBlock from '../CodeBlock';
import { SectionDivider } from '../CodeComparison';
import { useLanguage } from '@/src/i18n/LanguageContext';

interface Solution {
  title: string;
  description?: string;
  code: string;
}

interface SolutionViewerProps {
  solution: Solution;
  solutionComponent?: React.ReactNode;
}

export function SolutionViewer({ solution, solutionComponent }: SolutionViewerProps) {
  const { t } = useLanguage();

  return (
    <div className="mt-12">
      <SectionDivider />
      <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-8 shadow-sm">
        <div className="max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-6 h-6 text-green-500">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-8.82l-2.072 2.072 1.414 1.414 3.036-3.036-3.036-3.036-1.414 1.414 2.072 2.072H6v2h4.75z" clipRule="evenodd" />
            </svg>
            {t.challenge.solution || "Solución Esperada"}
          </h3>
          
          <div className="mb-6">
            <h4 className="text-lg font-semibold text-zinc-900 dark:text-white mb-2">{solution.title}</h4>
            {solution.description && <p className="text-zinc-600 dark:text-zinc-400">{solution.description}</p>}
          </div>

          <div className="rounded-xl overflow-hidden shadow-lg border border-zinc-200 dark:border-zinc-700">
            <div className="bg-zinc-50 dark:bg-zinc-800/50 p-2 border-b border-zinc-200 dark:border-zinc-700 flex justify-between items-center">
              <span className="text-xs font-mono text-zinc-500">solution.tsx</span>
            </div>
            <CodeBlock code={solution.code} language="typescript" />
          </div>

          {solutionComponent && (
            <div className="mt-8">
              <h4 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
                {t.challenge.preview || "Vista Previa"}
              </h4>
              <div className="bg-zinc-50 dark:bg-black/50 rounded-xl border border-zinc-300 dark:border-zinc-700 border-dashed p-8 flex items-center justify-center">
                {solutionComponent}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
