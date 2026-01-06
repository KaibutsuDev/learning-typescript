/**
 * 📚 Course Data - Learning TypeScript
 * 
 * This file centralizes the import of all course modules.
 * Each module contains its corresponding lessons and quizzes.
 */

import { fundamentalsModule } from './modules/fundamentals';
import { functionsModule } from './modules/functions';
import { interfacesModule } from './modules/interfaces';
import { unionsModule } from './modules/unions';
import { genericsModule } from './modules/generics';
import { utilityTypesModule } from './modules/utilityTypes';

// ========================================
// 📋 TYPES
// ========================================

export interface QuizQuestion {
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

export interface Lesson {
  id: string;
  title: string;
  content: string;
  quiz: QuizQuestion[];
}

export interface Module {
  id: string;
  title: string;
  description: string;
  icon: string;
  level: 'Básico' | 'Intermedio' | 'Avanzado';
  lessons: Lesson[];
}

// ========================================
// 📦 DATA EXPORT
// ========================================

export const courseData: Module[] = [
  fundamentalsModule,
  functionsModule,
  interfacesModule,
  unionsModule,
  genericsModule,
  utilityTypesModule,
];

// ========================================
// 🔧 UTILITIES
// ========================================

/**
 * Finds a lesson by its ID across all modules
 */
export function findLessonById(lessonId: string): Lesson | null {
  for (const module of courseData) {
    const lesson = module.lessons.find(l => l.id === lessonId);
    if (lesson) return lesson;
  }
  return null;
}

/**
 * Gets the module a lesson belongs to
 */
export function findModuleByLessonId(lessonId: string): Module | null {
  for (const module of courseData) {
    if (module.lessons.some(l => l.id === lessonId)) {
      return module;
    }
  }
  return null;
}

/**
 * Gets the total number of lessons in the course
 */
export function getTotalLessons(): number {
  return courseData.reduce((total, module) => total + module.lessons.length, 0);
}

/**
 * Gets all lessons flattened
 */
export function getAllLessons(): Lesson[] {
  return courseData.flatMap(module => module.lessons);
}
