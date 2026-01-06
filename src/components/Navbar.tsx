"use client";

import Link from 'next/link';
import { useLanguage } from '@/src/i18n/LanguageContext';
import { useProgress } from '@/src/context/ProgressContext';

export default function Navbar() {
  const { t, locale, toggleLanguage } = useLanguage();
  const { getProgress } = useProgress();
  const { completed, total, percentage } = getProgress();

  const navItems = [
    { name: t.nav.home, path: '/' },
    { name: t.nav.projects, path: '/projects' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-lg border-b border-zinc-200 dark:border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 text-xl font-bold text-zinc-900 dark:text-white">
              <span className="text-2xl">🔷</span>
              <span className="hidden sm:inline">TS Learning</span>
            </Link>
            
            {/* Nav Links */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-1">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    href={item.path}
                    className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          
          {/* Right side */}
          <div className="flex items-center gap-4">
            {/* Progress Indicator */}
            {completed > 0 && (
              <div className="hidden sm:flex items-center gap-2">
                <div className="w-24 h-2 bg-zinc-200 dark:bg-zinc-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full transition-all duration-500"
                    style={{ 
                      width: `${percentage}%`,
                      background: 'linear-gradient(90deg, #6366f1 0%, #06b6d4 100%)'
                    }}
                  />
                </div>
                <span className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">
                  {completed}/{total}
                </span>
              </div>
            )}
            
            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors flex items-center gap-1.5"
            >
              {locale === 'es' ? '🇺🇸 EN' : '🇪🇸 ES'}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
