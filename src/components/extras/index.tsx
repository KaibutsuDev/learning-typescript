"use client";

import { useState, useEffect } from 'react';
import { ArrowRightIcon } from '@/src/components/icons';

// ========================================
// ⬆️ SCROLL TO TOP BUTTON
// ========================================

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 400);
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-indigo-600 text-white shadow-lg shadow-indigo-500/25 hover:bg-indigo-500 transition-all hover:scale-110 hover:shadow-indigo-500/40"
      aria-label="Scroll to top"
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
        <path fillRule="evenodd" d="M10 17a.75.75 0 0 1-.75-.75V5.612L5.29 9.77a.75.75 0 0 1-1.08-1.04l5.25-5.5a.75.75 0 0 1 1.08 0l5.25 5.5a.75.75 0 1 1-1.08 1.04l-3.96-4.158V16.25A.75.75 0 0 1 10 17Z" clipRule="evenodd" />
      </svg>
    </button>
  );
}

// ========================================
// 🎯 FEATURE CARD
// ========================================

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
}

export function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="relative p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-indigo-300 dark:hover:border-indigo-700 transition-colors group">
      <div className="text-3xl mb-4">{icon}</div>
      <h3 className="font-semibold text-zinc-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
        {title}
      </h3>
      <p className="text-sm text-zinc-600 dark:text-zinc-400">
        {description}
      </p>
    </div>
  );
}

// ========================================
// 📊 STAT CARD
// ========================================

interface StatCardProps {
  icon: string;
  value: string;
  label: string;
}

export function StatCard({ icon, value, label }: StatCardProps) {
  return (
    <div className="text-center p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
      <span className="text-2xl">{icon}</span>
      <div className="mt-2 text-2xl font-bold text-zinc-900 dark:text-white">{value}</div>
      <div className="text-sm text-zinc-500 dark:text-zinc-400">{label}</div>
    </div>
  );
}

// ========================================
// 💫 ANIMATED GRADIENT TEXT
// ========================================

interface GradientTextProps {
  children: React.ReactNode;
  className?: string;
}

export function GradientText({ children, className = '' }: GradientTextProps) {
  return (
    <span 
      className={`bg-clip-text text-transparent ${className}`}
      style={{ 
        backgroundImage: 'linear-gradient(135deg, #3178c6 0%, #06b6d4 50%, #818cf8 100%)',
        backgroundSize: '200% auto',
      }}
    >
      {children}
    </span>
  );
}

// ========================================
// 🎨 TIP BOX
// ========================================

interface TipBoxProps {
  title: string;
  children: React.ReactNode;
  variant?: 'info' | 'warning' | 'success';
}

export function TipBox({ title, children, variant = 'info' }: TipBoxProps) {
  const styles = {
    info: {
      bg: 'bg-indigo-50 dark:bg-indigo-900/20',
      border: 'border-indigo-100 dark:border-indigo-900/30',
      icon: '💡',
      titleColor: 'text-indigo-900 dark:text-indigo-300',
    },
    warning: {
      bg: 'bg-amber-50 dark:bg-amber-900/20',
      border: 'border-amber-100 dark:border-amber-900/30',
      icon: '⚠️',
      titleColor: 'text-amber-900 dark:text-amber-300',
    },
    success: {
      bg: 'bg-green-50 dark:bg-green-900/20',
      border: 'border-green-100 dark:border-green-900/30',
      icon: '✅',
      titleColor: 'text-green-900 dark:text-green-300',
    },
  };

  const s = styles[variant];

  return (
    <div className={`rounded-xl p-4 border ${s.bg} ${s.border}`}>
      <h4 className={`font-semibold mb-2 flex items-center gap-2 ${s.titleColor}`}>
        {s.icon} {title}
      </h4>
      <div className="text-sm text-zinc-600 dark:text-zinc-400">
        {children}
      </div>
    </div>
  );
}
