import { useEffect } from "react";
import { useProgress } from "@/src/context/ProgressContext";
import CodeBlock from "./CodeBlock";
import Quiz, { QuizQuestion } from "./Quiz";
import { useLessonParser } from "@/src/hooks/useLessonParser";

// ========================================
// 📋 TYPES
// ========================================

export interface Lesson {
  id: string;
  title: string;
  content: string;
  quiz?: QuizQuestion[];
}

interface LessonViewProps {
  lesson: Lesson;
  onQuizComplete?: (score: number, total: number) => void;
}

// ========================================
// 🧩 MAIN COMPONENT
// ========================================

export default function LessonView({
  lesson,
  onQuizComplete,
}: LessonViewProps) {
  const parts = useLessonParser(lesson.content);
  const { markComplete } = useProgress();

  // Auto-mark as complete if no quiz exists,
  // otherwise quiz component will handle it via score tracking if needed
  // or we can just mark it as "touched" or "read"
  useEffect(() => {
    if (!lesson.quiz || lesson.quiz.length === 0) {
      markComplete(lesson.id);
    }
  }, [lesson.id, lesson.quiz, markComplete]);

  const handleQuizComplete = (score: number, total: number) => {
    // If user passed the quiz (60%+), mark as complete
    if (score / total >= 0.6) {
      markComplete(lesson.id);
    }
    onQuizComplete?.(score, total);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      {/* Lesson Title */}
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold mb-4 bg-linear-to-r from-indigo-600 to-cyan-500 dark:from-indigo-400 dark:to-cyan-400 bg-clip-text text-transparent">
          {lesson.title}
        </h1>
      </div>

      {/* Parsed Content */}
      <div className="space-y-4">
        {parts.map((item, index) => {
          switch (item.type) {
            case "h1":
              return (
                <h1
                  key={index}
                  className="text-3xl font-bold text-zinc-900 dark:text-white mt-8 mb-4"
                >
                  {item.content as string}
                </h1>
              );
            case "h2":
              return (
                <h2
                  key={index}
                  className="text-2xl font-semibold text-zinc-900 dark:text-white mt-6 mb-3"
                >
                  {item.content as string}
                </h2>
              );
            case "h3":
              return (
                <h3
                  key={index}
                  className="text-xl font-semibold text-indigo-600 dark:text-indigo-400 mt-6 mb-2"
                >
                  {item.content as string}
                </h3>
              );
            case "li":
              return (
                <li
                  key={index}
                  className="text-zinc-600 dark:text-zinc-300 ml-6 list-disc"
                >
                  {item.content as string}
                </li>
              );
            case "code":
              return (
                <CodeBlock
                  key={index}
                  code={item.content as string}
                  language={item.lang}
                />
              );
            case "p":
              return (
                <p
                  key={index}
                  className="text-zinc-600 dark:text-zinc-300 leading-relaxed text-lg"
                >
                  {item.content as React.ReactNode[]}
                </p>
              );
            default:
              return null;
          }
        })}
      </div>

      {/* Quiz at end of lesson */}
      {lesson.quiz && lesson.quiz.length > 0 && (
        <Quiz
          questions={lesson.quiz}
          lessonId={lesson.id}
          onComplete={handleQuizComplete}
        />
      )}
    </div>
  );
}
