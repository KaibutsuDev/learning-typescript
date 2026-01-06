"use client";

import Link from "next/link";
import { useLanguage } from "@/src/i18n/LanguageContext";
import { ChevronRightIcon, ArrowLeftIcon, ArrowRightIcon } from "./icons";

// ========================================
// 📍 BREADCRUMB
// ========================================

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400 mb-6">
      {items.map((item, index) => (
        <span key={index} className="flex items-center gap-2">
          {index > 0 && <ChevronRightIcon className="w-4 h-4 text-zinc-400" />}
          {item.href ? (
            <Link href={item.href} className="hover:text-zinc-900 dark:hover:text-white transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="text-zinc-900 dark:text-white font-medium">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}

// ========================================
// ⬅️ ➡️ LESSON NAVIGATION
// ========================================

interface LessonNavItem {
  title: string;
  href: string;
}

interface LessonNavigationProps {
  prev?: LessonNavItem;
  next?: LessonNavItem;
}

export function LessonNavigation({ prev, next }: LessonNavigationProps) {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between pt-12 mt-12 border-t border-zinc-200 dark:border-zinc-800 gap-6">
      {/* Previous */}
      {prev ? (
        <Link
          href={prev.href}
          className="group flex items-center gap-3 px-4 py-3 rounded-xl text-left hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors w-full sm:w-auto sm:max-w-[45%]"
        >
          <div className="shrink-0 w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center group-hover:bg-indigo-100 dark:group-hover:bg-indigo-900/30 transition-colors">
            <ArrowLeftIcon className="w-5 h-5 text-zinc-500 group-hover:text-indigo-600 dark:group-hover:text-indigo-400" />
          </div>
          <div className="min-w-0">
            <span className="block text-xs text-zinc-500 dark:text-zinc-400">{t.navigation.previous}</span>
            <span className="block text-sm font-medium text-zinc-900 dark:text-white truncate group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
              {prev.title}
            </span>
          </div>
        </Link>
      ) : <div className="hidden sm:block" />}

      {/* Next */}
      {next ? (
        <Link
          href={next.href}
          className="group flex items-center justify-end gap-3 px-4 py-3 rounded-xl text-right hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors w-full sm:w-auto sm:max-w-[45%] ml-auto"
        >
          <div className="min-w-0">
            <span className="block text-xs text-zinc-500 dark:text-zinc-400">{t.navigation.next}</span>
            <span className="block text-sm font-medium text-zinc-900 dark:text-white truncate group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
              {next.title}
            </span>
          </div>
          <div className="shrink-0 w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center group-hover:bg-indigo-200 dark:group-hover:bg-indigo-900/50 transition-colors">
            <ArrowRightIcon className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          </div>
        </Link>
      ) : <div className="hidden sm:block" />}
    </div>
  );
}

// ========================================
// 📊 LESSON PROGRESS
// ========================================

interface LessonProgressProps {
  current: number;
  total: number;
}

export function LessonProgress({ current, total }: LessonProgressProps) {
  const { t } = useLanguage();
  const percentage = Math.round((current / total) * 100);
  
  return (
    <div className="flex items-center gap-3 mb-6">
      <div className="flex-1 h-1.5 bg-zinc-200 dark:bg-zinc-700 rounded-full overflow-hidden">
        <div 
          className="h-full rounded-full transition-all duration-500"
          style={{ 
            width: `${percentage}%`,
            background: 'linear-gradient(90deg, #6366f1 0%, #06b6d4 100%)'
          }}
        />
      </div>
      <span className="text-xs text-zinc-500 dark:text-zinc-400 font-medium whitespace-nowrap">
        {current} {t.navigation.of} {total}
      </span>
    </div>
  );
}
