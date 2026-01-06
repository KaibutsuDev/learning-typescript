"use client";

import { useLanguage } from '@/src/i18n/LanguageContext';
import { ChallengeSidebar } from './challenge/ChallengeSidebar';
import { SolutionViewer } from './challenge/SolutionViewer';

interface Hint {
  title: string;
  content: string;
}

interface Solution {
    title: string;
    description?: string;
    code: string;
}

interface ChallengeLayoutProps {
  title: string;
  description: string;
  objectives: string[];
  hints?: Hint[];
  solution?: Solution;
  solutionComponent?: React.ReactNode;
  children: React.ReactNode;
  projectId: string; // Unique ID for tracking
}

export default function ChallengeLayout({
  title,
  description,
  objectives,
  hints = [],
  solution,
  solutionComponent,
  children,
  projectId
}: ChallengeLayoutProps) {
  const { t } = useLanguage();

  return (
    <div className="min-h-[calc(100vh-4rem)]">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Instructions Panel (Left Side) */}
        <ChallengeSidebar
          title={title}
          description={description}
          objectives={objectives}
          hints={hints}
          projectId={projectId}
        />

        {/* Workspace Area (Right Side) */}
        <div className="lg:col-span-2">
          <div className="bg-zinc-50 dark:bg-black/50 rounded-xl border border-dashed border-zinc-300 dark:border-zinc-700 h-full min-h-[500px] flex flex-col">
            <div className="p-4 border-b border-zinc-200 dark:border-zinc-800 flex justify-between items-center text-xs text-zinc-500 uppercase tracking-wider font-semibold">
              <span>{t.challenge.workspace}</span>
              <span>{t.challenge.preview}</span>
            </div>
            <div className="flex-1 p-8 flex items-center justify-center">
               {children}
            </div>
          </div>
        </div>
      </div>
      
      {solution && (
        <SolutionViewer 
          solution={solution} 
          solutionComponent={solutionComponent} 
        />
      )}
    </div>
  );
}
