"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// ========================================
// 📋 TYPES
// ========================================

interface ProgressContextType {
  completedItems: string[];
  markComplete: (id: string) => void;
  toggleComplete: (id: string) => void;
  isCompleted: (id: string) => boolean;
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

const STORAGE_KEY = "learning-typescript-progress-v2";
const DEFAULT_TOTAL_ITEMS = 13; // Updated to match total content

// ========================================
// 📦 CONTEXT
// ========================================

const ProgressContext = createContext<ProgressContextType | undefined>(
  undefined
);

// ========================================
// 🎯 PROVIDER
// ========================================

export function ProgressProvider({
  children,
  totalLessons = DEFAULT_TOTAL_ITEMS,
}: ProgressProviderProps) {
  const [completedItems, setCompletedItems] = useState<string[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  // Load progress from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setCompletedItems(parsed);
        }
      }
    } catch (error) {
      console.error("Error loading progress:", error);
    }
    setIsHydrated(true);
  }, []);

  // Save progress to localStorage when it changes
  useEffect(() => {
    if (isHydrated) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(completedItems));
      } catch (error) {
        console.error("Error saving progress:", error);
      }
    }
  }, [completedItems, isHydrated]);

  // Mark an item as complete
  const markComplete = (id: string) => {
    setCompletedItems((prev) => {
      if (prev.includes(id)) return prev;
      return [...prev, id];
    });
  };

  // Toggle item completion
  const toggleComplete = (id: string) => {
    setCompletedItems((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      }
      return [...prev, id];
    });
  };

  // Check if an item is complete
  const isCompleted = (id: string) => {
    return completedItems.includes(id);
  };

  // Get progress statistics
  const getProgress = () => {
    const completed = completedItems.length;
    const total = totalLessons;
    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
    return { completed, total, percentage };
  };

  // Reset all progress
  const resetProgress = () => {
    setCompletedItems([]);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error("Error resetting progress:", error);
    }
  };

  const value: ProgressContextType = {
    completedItems,
    markComplete,
    toggleComplete,
    isCompleted,
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
    throw new Error("useProgress must be used within a ProgressProvider");
  }
  return context;
}

// ========================================
// 🎨 PROGRESS INDICATOR COMPONENT
// ========================================

export function ProgressIndicator() {
  const { getProgress, completedItems } = useProgress();
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
  id: string; // Generic ID
  className?: string;
}

export function LessonCheck({ id, className = "" }: LessonCheckProps) {
  const { isCompleted } = useProgress();

  if (!isCompleted(id)) return null;

  return (
    <span className={`text-green-500 ${className}`} title="Completed">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        className="w-5 h-5"
      >
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
          clipRule="evenodd"
        />
      </svg>
    </span>
  );
}
