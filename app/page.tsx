"use client";

import Link from "next/link";
import { useLanguage } from "@/src/i18n/LanguageContext";
import { useProgress } from "@/src/context/ProgressContext";
import { Badge, Card, IconBox, ProgressBar } from "@/src/components/ui";
import { ArrowRightIcon, CheckCircleIcon } from "@/src/components/icons";

// ========================================
// 🎨 DATOS DE MÓDULOS
// ========================================

const modulesData = [
  { id: "fundamentals", icon: "🏗️", href: "/concepts/fundamentals", levelKey: "basic" },
  { id: "functions", icon: "fn", href: "/concepts/functions", levelKey: "basic" },
  { id: "interfaces", icon: "📦", href: "/concepts/interfaces", levelKey: "intermediate" },
  { id: "unions", icon: "🔗", href: "/concepts/unions", levelKey: "intermediate" },
  { id: "generics", icon: "🧬", href: "/concepts/generics", levelKey: "advanced" },
  { id: "utility-types", icon: "🧰", href: "/concepts/utility-types", levelKey: "advanced" },
  { id: "advanced-narrowing", icon: "🛡️", href: "/concepts/advanced-narrowing", levelKey: "advanced" },
];

// ========================================
// 🧩 COMPONENTE PRINCIPAL
// ========================================

export default function Home() {
  const { t } = useLanguage();
  const { getProgress } = useProgress();
  const { completed, total, percentage } = getProgress();

  // Mapear datos a estructura completa
  const modules = modulesData.map((data, index) => {
    const moduleKey = ['basics', 'functions', 'interfaces', 'unions', 'generics', 'utility', 'advanced_narrowing'][index] as keyof typeof t.home.modules;
    return {
      ...data,
      title: t.home.modules[moduleKey as keyof typeof t.home.modules]?.title || moduleKey,
      description: t.home.modules[moduleKey as keyof typeof t.home.modules]?.desc || "",
      level: t.categories[data.levelKey as keyof typeof t.categories],
      levelKey: data.levelKey,
    };
  });

  return (
    <div className="space-y-16">
      {/* ========================================
          🦸 HERO SECTION
          ======================================== */}
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
          {/* TypeScript Logo */}
          <div className="mb-6 inline-flex items-center justify-center">
            <span className="text-6xl">🔷</span>
          </div>

          {/* Title con gradiente */}
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
            <span className="text-zinc-900 dark:text-white">{t.home.title.split(' ')[0]} </span>
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

          {/* Progress global */}
          {completed > 0 && (
            <div className="mt-8 max-w-md mx-auto">
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-zinc-600 dark:text-zinc-400">{t.ui.your_progress}</span>
                <span className="font-semibold text-indigo-600 dark:text-indigo-400">{percentage}%</span>
              </div>
              <ProgressBar value={completed} max={total} variant="gradient" size="md" />
            </div>
          )}

          {/* CTA Buttons */}
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

      {/* ========================================
          📚 CURRICULUM GRID
          ======================================== */}
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
                {/* Número de módulo */}
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
                  <Badge variant={module.levelKey as 'basic' | 'intermediate' | 'advanced'}>
                    {module.level}
                  </Badge>
                </div>

                <h3 className="text-lg font-semibold text-zinc-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {module.title}
                </h3>
                <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                  {module.description}
                </p>

                {/* Hover arrow */}
                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
                  <ArrowRightIcon className="w-5 h-5 text-indigo-500" />
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* ========================================
          🚀 CTA SECTION
          ======================================== */}
      <div 
        className="relative rounded-3xl overflow-hidden p-8 sm:p-12"
        style={{
          background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #1e3a5f 100%)'
        }}
      >
        {/* Decorative elements */}
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

      {/* ========================================
          📊 QUICK STATS
          ======================================== */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: t.ui.stats.modules, value: "6", icon: "📚" },
          { label: t.ui.stats.projects, value: "5", icon: "🛠️" },
          { label: t.ui.stats.quizzes, value: "12+", icon: "❓" },
          { label: t.ui.stats.examples, value: "50+", icon: "💡" },
        ].map((stat) => (
          <div 
            key={stat.label}
            className="text-center p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800"
          >
            <span className="text-2xl">{stat.icon}</span>
            <div className="mt-2 text-2xl font-bold text-zinc-900 dark:text-white">{stat.value}</div>
            <div className="text-sm text-zinc-500 dark:text-zinc-400">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
