"use client";

import Link from "next/link";
import { ArrowRightIcon } from "@/src/components/icons";
import { Card, IconBox, Badge } from "@/src/components/ui";

interface ModuleGridProps {
  t: any;
  modules: any[];
}

export function ModuleGrid({ t, modules }: ModuleGridProps) {
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">
          {t.home.curriculum}
        </h2>
        <Link 
          href="/concepts" 
          className="text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
        >
          {t.ui.view_all}
          <ArrowRightIcon className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {modules.map((module, index) => (
          <Link key={module.href} href={module.href} className="group">
            <Card hover className="h-full relative overflow-hidden">
              <div 
                className="absolute -top-4 -right-4 w-20 h-20 rounded-full flex items-end justify-start pl-5 pb-5 text-3xl font-bold opacity-5 dark:opacity-10"
                style={{ background: 'linear-gradient(135deg, #6366f1, #06b6d4)' }}
              >
                {index + 1}
              </div>

              <div className="flex items-center gap-4 mb-4">
                <IconBox variant="indigo" size="md">
                  {module.icon}
                </IconBox>
                <Badge variant={module.levelKey}>
                  {module.level}
                </Badge>
              </div>

              <h3 className="text-lg font-semibold text-zinc-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                {module.title}
              </h3>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                {module.description}
              </p>

              <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
                <ArrowRightIcon className="w-5 h-5 text-indigo-500" />
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}

export function HomeCTA({ t }: { t: any }) {
  return (
    <div 
      className="relative rounded-3xl overflow-hidden p-8 sm:p-12"
      style={{
        background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #1e3a5f 100%)'
      }}
    >
      <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl" />
      
      <div className="relative sm:flex sm:items-center sm:justify-between">
        <div className="max-w-xl">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            {t.home.ctaTitle}
          </h2>
          <p className="mt-3 text-indigo-200">
            {t.home.ctaDesc}
          </p>
        </div>
        <div className="mt-6 sm:mt-0 sm:ml-8">
          <Link
            href="/projects"
            className="group inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-indigo-900 shadow-lg hover:bg-indigo-50 transition-all hover:scale-105"
          >
            {t.home.ctaButton}
            <ArrowRightIcon className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export function HomeStats({ t }: { t: any }) {
  const stats = [
    { label: t.ui.stats.modules, value: "7", icon: "📚" },
    { label: t.ui.stats.projects, value: "6", icon: "🛠️" },
    { label: t.ui.stats.quizzes, value: "14+", icon: "❓" },
    { label: t.ui.stats.examples, value: "60+", icon: "💡" },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <div 
          key={stat.label}
          className="text-center p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm"
        >
          <span className="text-2xl">{stat.icon}</span>
          <div className="mt-2 text-2xl font-bold text-zinc-900 dark:text-white">{stat.value}</div>
          <div className="text-sm text-zinc-500 dark:text-zinc-400">{stat.label}</div>
        </div>
      ))}
    </div>
  );
}
