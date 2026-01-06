"use client";

import Link from "next/link";
import { useLanguage } from "@/src/i18n/LanguageContext";
import { useProgress } from "@/src/context/ProgressContext";
import { Badge, ProgressBar, Card, IconBox } from "@/src/components/ui";
import { CheckCircleIcon, ArrowRightIcon } from "@/src/components/icons";

// ========================================
// 📋 CONCEPTS DATA
// ========================================

const conceptsData = [
  { id: "fundamentals", icon: "🏗️", href: "/concepts/fundamentals", lessons: ["fundamentals-01", "fundamentals-02"] },
  { id: "functions", icon: "fn", href: "/concepts/functions", lessons: ["functions-01", "functions-02"] },
  { id: "interfaces", icon: "📦", href: "/concepts/interfaces", lessons: ["interfaces-01", "interfaces-02"] },
  { id: "unions", icon: "🔗", href: "/concepts/unions", lessons: ["unions-01", "unions-02"] },
  { id: "generics", icon: "🧬", href: "/concepts/generics", lessons: ["generics-01", "generics-02"] },
  { id: "utility-types", icon: "🧰", href: "/concepts/utility-types", lessons: ["utility-01", "utility-02"] },
  { id: "advanced-narrowing", icon: "🛡️", href: "/concepts/advanced-narrowing", lessons: ["adv-narrowing-01"] },
];

// ========================================
// 🧩 MAIN COMPONENT
// ========================================

export default function ConceptosPage() {
  const { t } = useLanguage();
  const { isLessonComplete } = useProgress();

  // Map data to full structure
  const concepts = conceptsData.map((data, index) => {
    const moduleKey = ['basics', 'functions', 'interfaces', 'unions', 'generics', 'utility', 'advanced_narrowing'][index] as keyof typeof t.home.modules;
    const categoryKey = index < 2 ? 'basic' : index < 4 ? 'intermediate' : 'advanced';
    
    return {
      ...data,
      title: t.home.modules[moduleKey].title,
      description: t.home.modules[moduleKey].desc,
      category: t.categories[categoryKey as keyof typeof t.categories],
      categoryKey,
    };
  });

  const getModuleProgress = (lessons: string[]) => {
    const completed = lessons.filter(l => isLessonComplete(l)).length;
    return { completed, total: lessons.length };
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center sm:text-left">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
          {t.concepts_page.title}
        </h1>
        <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400 max-w-3xl">
          {t.concepts_page.subtitle}
        </p>
      </div>

      {/* Grid */}
      <div className="grid gap-6 sm:grid-cols-2">
        {concepts.map((concept, index) => {
          const progress = getModuleProgress(concept.lessons);
          const isCompleted = progress.completed === progress.total && progress.total > 0;

          return (
            <Link key={concept.href} href={concept.href} className="group">
              <Card hover className="relative overflow-hidden h-full">
                {/* Completado badge */}
                {isCompleted && (
                  <div className="absolute top-4 right-4">
                    <span className="flex items-center gap-1 text-xs font-semibold text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30 px-2 py-1 rounded-full">
                      <CheckCircleIcon className="w-3.5 h-3.5" />
                      {t.ui.completed}
                    </span>
                  </div>
                )}

                {/* Header */}
                <div className="flex items-center gap-4 mb-4">
                  <IconBox variant="indigo" size="lg">
                    {concept.icon}
                  </IconBox>
                  <div className="flex flex-col">
                    <span className="text-xs text-zinc-400 dark:text-zinc-500 font-medium">
                      {t.ui.module} {index + 1}
                    </span>
                    <Badge variant={concept.categoryKey as 'basic' | 'intermediate' | 'advanced'}>
                      {concept.category}
                    </Badge>
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-zinc-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {concept.title}
                </h3>
                <p className="mt-2 text-zinc-600 dark:text-zinc-400">
                  {concept.description}
                </p>

                {/* Progress */}
                {progress.total > 0 && (
                  <div className="mt-4">
                    <ProgressBar 
                      value={progress.completed} 
                      max={progress.total} 
                      variant={isCompleted ? 'success' : 'gradient'} 
                      showLabel 
                    />
                  </div>
                )}

                {/* Arrow */}
                <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowRightIcon className="w-5 h-5 text-indigo-500" />
                </div>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
