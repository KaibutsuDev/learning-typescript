"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// ========================================
// 📋 TYPES
// ========================================

interface ProgressContextType {
  completedLessons: string[];
  markLessonComplete: (lessonId: string) => void;
  isLessonComplete: (lessonId: string) => boolean;
  getProgress: () => { completed: number; total: number; percentage: number };
  resetProgress: () => void;
}

interface ProgressProviderProps {
  children: ReactNode;
  totalLessons?: number;
}

// ========================================
// 🔧 CONSTANTS
// ========================================

const STORAGE_KEY = 'learning-typescript-progress';
const DEFAULT_TOTAL_LESSONS = 12; // 6 modules * 2 average lessons

// ========================================
// 📦 CONTEXT
// ========================================

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

// ========================================
// 🎯 PROVIDER
// ========================================

export function ProgressProvider({ children, totalLessons = DEFAULT_TOTAL_LESSONS }: ProgressProviderProps) {
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  // Load progress from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setCompletedLessons(parsed);
        }
      }
    } catch (error) {
      console.error('Error loading progress:', error);
    }
    setIsHydrated(true);
  }, []);

  // Save progress to localStorage when it changes
  useEffect(() => {
    if (isHydrated) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(completedLessons));
      } catch (error) {
        console.error('Error saving progress:', error);
      }
    }
  }, [completedLessons, isHydrated]);

  // Mark a lesson as complete
  const markLessonComplete = (lessonId: string) => {
    setCompletedLessons(prev => {
      if (prev.includes(lessonId)) return prev;
      return [...prev, lessonId];
    });
  };

  // Check if a lesson is complete
  const isLessonComplete = (lessonId: string) => {
    return completedLessons.includes(lessonId);
  };

  // Get progress statistics
  const getProgress = () => {
    const completed = completedLessons.length;
    const total = totalLessons;
    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
    return { completed, total, percentage };
  };

  // Reset all progress
  const resetProgress = () => {
    setCompletedLessons([]);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error('Error resetting progress:', error);
    }
  };

  const value: ProgressContextType = {
    completedLessons,
    markLessonComplete,
    isLessonComplete,
    getProgress,
    resetProgress,
  };

  return (
    <ProgressContext.Provider value={value}>
      {children}
    </ProgressContext.Provider>
  );
}

// ========================================
// 🪝 HOOK
// ========================================

export function useProgress() {
  const context = useContext(ProgressContext);
  if (context === undefined) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
}

// ========================================
// 🎨 PROGRESS INDICATOR COMPONENT
// ========================================

export function ProgressIndicator() {
  const { getProgress, completedLessons } = useProgress();
  const { completed, total, percentage } = getProgress();

  if (completed === 0) return null;

  return (
    <div className="flex items-center gap-3">
      <div className="w-32 h-2 bg-zinc-200 dark:bg-zinc-700 rounded-full overflow-hidden">
        <div 
          className="h-full bg-linear-to-r from-indigo-500 to-cyan-500 rounded-full transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <span className="text-sm text-zinc-500 dark:text-zinc-400">
        {completed}/{total}
      </span>
    </div>
  );
}

// ========================================
// ✅ CHECKMARK COMPONENT
// ========================================

interface LessonCheckProps {
  lessonId: string;
  className?: string;
}

export function LessonCheck({ lessonId, className = '' }: LessonCheckProps) {
  const { isLessonComplete } = useProgress();
  
  if (!isLessonComplete(lessonId)) return null;

  return (
    <span className={`text-green-500 ${className}`} title="Completed">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
      </svg>
    </span>
  );
}
