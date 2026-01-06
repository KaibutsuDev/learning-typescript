"use client";

import Link from "next/link";
import { ArrowRightIcon } from "@/src/components/icons";
import { ProgressBar } from "@/src/components/ui";

interface HeroSectionProps {
  t: any;
  progress: {
    completed: number;
    total: number;
    percentage: number;
  };
}

export function HeroSection({ t, progress }: HeroSectionProps) {
  const { completed, total, percentage } = progress;

  return (
    <div className="relative isolate overflow-hidden py-8">
      {/* Background decoration */}
      <div 
        className="absolute inset-0 -z-10 opacity-30 dark:opacity-20"
        style={{
          backgroundImage: `radial-gradient(circle at 30% 20%, rgba(99, 102, 241, 0.15) 0%, transparent 50%),
                            radial-gradient(circle at 70% 80%, rgba(6, 182, 212, 0.15) 0%, transparent 50%)`
        }}
      />
      
      <div className="mx-auto max-w-3xl text-center">
        <div className="mb-6 inline-flex items-center justify-center">
          <span className="text-6xl">🔷</span>
        </div>

        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl text-zinc-900 dark:text-white">
          {t.home.title.split(' ')[0]}{' '}
          <span 
            className="bg-clip-text text-transparent"
            style={{ backgroundImage: 'linear-gradient(135deg, #3178c6 0%, #06b6d4 100%)' }}
          >
            {t.home.title.split(' ').slice(1).join(' ')}
          </span>
        </h1>
        
        <p className="mt-6 text-lg leading-8 text-zinc-600 dark:text-zinc-300 max-w-2xl mx-auto">
          {t.home.subtitle}
        </p>

        {completed > 0 && (
          <div className="mt-8 max-w-md mx-auto">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-zinc-600 dark:text-zinc-400">{t.ui.your_progress}</span>
              <span className="font-semibold text-indigo-600 dark:text-indigo-400">{percentage}%</span>
            </div>
            <ProgressBar value={completed} max={total} variant="gradient" size="md" />
          </div>
        )}

        <div className="mt-10 flex items-center justify-center gap-4 flex-wrap">
          <Link
            href="/concepts/fundamentals"
            className="group inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 hover:bg-indigo-500 transition-all hover:shadow-indigo-500/40 hover:scale-105"
          >
            {t.ui.start_learning}
            <ArrowRightIcon className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 px-6 py-3 text-sm font-semibold text-zinc-900 dark:text-white hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-all"
          >
            {t.ui.view_projects}
          </Link>
        </div>
      </div>
    </div>
  );
}
