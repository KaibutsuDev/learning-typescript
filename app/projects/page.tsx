"use client";

import Link from "next/link";
import { useProgress } from "@/src/context/ProgressContext";
import { useLanguage } from "@/src/i18n/LanguageContext";
import { Card, Badge } from "@/src/components/ui";
import { CheckCircleIcon, ArrowRightIcon } from "@/src/components/icons";
import { useLocalizedList } from "@/src/hooks/useLocalizedContent";

// ========================================
// 🎨 PROJECT DATA
// ========================================

const projectsData = [
  {
    id: "calculator",
    href: "/projects/calculator",
    difficultyKey: "easy",
    week: 1,
    icon: "🧮",
  },
  {
    id: "todo",
    href: "/projects/todo",
    difficultyKey: "easy",
    week: 2,
    icon: "✅",
  },
  {
    id: "guess-game",
    href: "/projects/guess-game",
    difficultyKey: "medium",
    week: 3,
    icon: "🎯",
  },
  {
    id: "contacts",
    href: "/projects/contacts",
    difficultyKey: "medium",
    week: 4,
    icon: "👥",
  },
  {
    id: "shopping-cart",
    href: "/projects/shopping-cart",
    difficultyKey: "hard",
    week: 5,
    icon: "🛒",
  },
  {
    id: "api-dashboard",
    href: "/projects/api-dashboard",
    difficultyKey: "hard",
    week: 6,
    icon: "📊",
  },
];

const projectKeys = [
  "calculator",
  "todo",
  "guess",
  "contacts",
  "cart",
  "api_dashboard",
];

// ========================================
// 🧩 MAIN COMPONENT
// ========================================

export default function ProjectsPage() {
  const { completedItems } = useProgress();
  const { t } = useLanguage();

  const projects = useLocalizedList(
    projectsData,
    (t) => t.projects.list,
    projectKeys
  ).map((p) => ({
    ...p,
    title: p.title,
    description: p.desc,
    difficultyLabel:
      t.projects.difficulty[
        p.difficultyKey as keyof typeof t.projects.difficulty
      ],
  }));

  const completedCount = projects.filter((p) =>
    completedItems.includes(p.id)
  ).length;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="relative">
        <div
          className="absolute inset-0 -z-10 opacity-20"
          style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(99, 102, 241, 0.1) 0%, transparent 50%)`,
          }}
        />

        <div className="text-center sm:text-left">
          <span className="text-4xl mb-4 block">🛠️</span>
          <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-5xl">
            {t.projects.title}
          </h1>
          <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl">
            {t.projects.subtitle}
          </p>

          {/* Progress */}
          {completedCount > 0 && (
            <div className="mt-6 inline-flex items-center gap-3 px-4 py-2 rounded-full bg-green-100 dark:bg-green-900/30">
              <CheckCircleIcon className="w-5 h-5 text-green-600 dark:text-green-400" />
              <span className="text-sm font-medium text-green-700 dark:text-green-400">
                {completedCount} {t.quiz.of} {projects.length}{" "}
                {t.projects.completed.toLowerCase()}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => {
          const isCompleted = completedItems.includes(project.id);

          return (
            <Link key={project.href} href={project.href} className="group">
              <Card
                hover
                className={`h-full relative overflow-hidden ${
                  isCompleted
                    ? "ring-2 ring-green-500/20 bg-green-50/50 dark:bg-green-900/10"
                    : ""
                }`}
              >
                {/* Completed badge */}
                {isCompleted && (
                  <div className="absolute top-4 right-4">
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-100 dark:bg-green-900/50">
                      <CheckCircleIcon className="w-4 h-4 text-green-600 dark:text-green-400" />
                      <span className="text-xs font-semibold text-green-700 dark:text-green-400">
                        {t.projects.completed}
                      </span>
                    </div>
                  </div>
                )}

                {/* Header */}
                <div className="flex items-start gap-4 mb-4">
                  <div className="text-3xl">{project.icon}</div>
                  <div className="flex flex-col gap-1">
                    <span className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">
                      {t.projects.week} {project.week}
                    </span>
                    <Badge
                      variant={
                        project.difficultyKey === "easy"
                          ? "success"
                          : project.difficultyKey === "medium"
                          ? "intermediate"
                          : "error"
                      }
                    >
                      {project.difficultyLabel}
                    </Badge>
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-zinc-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {project.title}
                </h3>
                <p className="mt-2 text-zinc-600 dark:text-zinc-400">
                  {project.description}
                </p>

                {/* Footer */}
                <div className="mt-4 pt-4 border-t border-zinc-100 dark:border-zinc-800 flex items-center text-sm font-medium text-indigo-600 dark:text-indigo-400">
                  {isCompleted ? t.projects.review : t.projects.go_to}
                  <ArrowRightIcon className="ml-1 w-4 h-4 transition-transform group-hover:translate-x-1" />
                </div>
              </Card>
            </Link>
          );
        })}
      </div>

      {/* Tips Section */}
      <div className="rounded-2xl bg-linear-to-br from-indigo-50 to-cyan-50 dark:from-indigo-900/20 dark:to-cyan-900/20 p-6 border border-indigo-100 dark:border-indigo-900/30">
        <h3 className="font-semibold text-zinc-900 dark:text-white mb-3 flex items-center gap-2">
          💡 {t.ui.tips}
        </h3>
        <ul className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
          <li className="flex items-start gap-2">
            <span className="text-indigo-500">•</span>
            {t.tips.tip1}
          </li>
          <li className="flex items-start gap-2">
            <span className="text-indigo-500">•</span>
            {t.tips.tip2}
          </li>
          <li className="flex items-start gap-2">
            <span className="text-indigo-500">•</span>
            {t.tips.tip3}
          </li>
        </ul>
      </div>
    </div>
  );
}
