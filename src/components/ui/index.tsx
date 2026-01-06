/**
 * 🎨 Componentes UI Reutilizables
 */

import { ReactNode } from 'react';

// ========================================
// 🏷️ BADGE
// ========================================

type BadgeVariant = 'basic' | 'intermediate' | 'advanced' | 'success' | 'error' | 'info';

interface BadgeProps {
  variant: BadgeVariant;
  children: ReactNode;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  basic: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  intermediate: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
  advanced: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
  success: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  error: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  info: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
};

export function Badge({ variant, children, className = '' }: BadgeProps) {
  return (
    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${variantStyles[variant]} ${className}`}>
      {children}
    </span>
  );
}

// ========================================
// 📊 PROGRESS BAR
// ========================================

interface ProgressBarProps {
  value: number;
  max: number;
  variant?: 'gradient' | 'success' | 'indigo';
  size?: 'sm' | 'md';
  showLabel?: boolean;
}

export function ProgressBar({ value, max, variant = 'gradient', size = 'sm', showLabel = false }: ProgressBarProps) {
  const percentage = Math.round((value / max) * 100);
  const heightClass = size === 'sm' ? 'h-1.5' : 'h-2.5';
  
  const fillStyles: Record<string, string> = {
    gradient: 'linear-gradient(90deg, #6366f1 0%, #06b6d4 100%)',
    success: '#22c55e',
    indigo: '#6366f1',
  };

  return (
    <div className="flex items-center gap-2">
      <div className={`flex-1 ${heightClass} bg-zinc-200 dark:bg-zinc-700 rounded-full overflow-hidden`}>
        <div 
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${percentage}%`, background: fillStyles[variant] }}
        />
      </div>
      {showLabel && (
        <span className="text-xs text-zinc-500 dark:text-zinc-400 font-medium whitespace-nowrap">
          {value}/{max}
        </span>
      )}
    </div>
  );
}

// ========================================
// 🃏 CARD
// ========================================

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export function Card({ children, className = '', hover = false }: CardProps) {
  const hoverClass = hover 
    ? 'hover:border-indigo-500 dark:hover:border-indigo-500 hover:shadow-lg cursor-pointer' 
    : '';
    
  return (
    <div className={`
      p-6 bg-white dark:bg-zinc-900 
      border border-zinc-200 dark:border-zinc-800 
      rounded-xl transition-all 
      ${hoverClass} 
      ${className}
    `}>
      {children}
    </div>
  );
}

// ========================================
// 📦 ICON BOX
// ========================================

interface IconBoxProps {
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'indigo';
}

export function IconBox({ children, size = 'md', variant = 'default' }: IconBoxProps) {
  const sizeClasses = {
    sm: 'h-8 w-8 text-base',
    md: 'h-10 w-10 text-lg',
    lg: 'h-12 w-12 text-xl',
  };
  
  const variantClasses = {
    default: 'bg-zinc-100 dark:bg-zinc-800',
    indigo: 'bg-indigo-50 dark:bg-indigo-900/30',
  };

  return (
    <div className={`
      flex items-center justify-center rounded-xl
      ${sizeClasses[size]}
      ${variantClasses[variant]}
    `}>
      {children}
    </div>
  );
}

// ========================================
// 📮 INLINE CODE
// ========================================

interface InlineCodeProps {
  children: ReactNode;
}

export function InlineCode({ children }: InlineCodeProps) {
  return (
    <code className="px-1.5 py-0.5 bg-zinc-100 dark:bg-zinc-800 rounded text-sm font-mono text-indigo-600 dark:text-indigo-400">
      {children}
    </code>
  );
}
