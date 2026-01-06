"use client";

import { useMemo } from 'react';
import CodeBlock from './CodeBlock';
import Quiz, { QuizQuestion } from './Quiz';

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

interface ParsedPart {
  type: 'h1' | 'h2' | 'h3' | 'p' | 'li' | 'code';
  content: string | React.ReactNode[];
  lang?: string;
}

// ========================================
// 🧩 MAIN COMPONENT
// ========================================

export default function LessonView({ lesson, onQuizComplete }: LessonViewProps) {
  // Parse Markdown content
  const parts = useMemo(() => {
    const lines = lesson.content.split('\n');
    const result: ParsedPart[] = [];
    let currentCode: string[] | null = null;
    let codeLang = '';

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      // Code block start/end
      if (line.trim().startsWith('```')) {
        if (currentCode !== null) {
          // End of block
          result.push({ 
            type: 'code', 
            content: currentCode.join('\n'), 
            lang: codeLang 
          });
          currentCode = null;
        } else {
          // Start of block
          codeLang = line.replace('```', '').trim() || 'typescript';
          currentCode = [];
        }
        continue;
      }

      // Inside code block
      if (currentCode !== null) {
        currentCode.push(line);
        continue;
      }

      // Headers
      if (line.startsWith('# ')) {
        result.push({ type: 'h1', content: line.substring(2) });
      } else if (line.startsWith('## ')) {
        result.push({ type: 'h2', content: line.substring(3) });
      } else if (line.startsWith('### ')) {
        result.push({ type: 'h3', content: line.substring(4) });
      } else if (line.trim().startsWith('- ')) {
        result.push({ type: 'li', content: line.trim().substring(2) });
      } else if (line.trim() !== '') {
        // Basic bold formatting **text**
        const formattedText = formatText(line);
        result.push({ type: 'p', content: formattedText });
      }
    }

    return result;
  }, [lesson.content]);

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      {/* Título de la lección */}
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold mb-4 bg-linear-to-r from-indigo-600 to-cyan-500 dark:from-indigo-400 dark:to-cyan-400 bg-clip-text text-transparent">
          {lesson.title}
        </h1>
      </div>

      {/* Contenido parseado */}
      <div className="space-y-4">
        {parts.map((item, index) => {
          switch (item.type) {
            case 'h1':
              return (
                <h1 
                  key={index}
                  className="text-3xl font-bold text-zinc-900 dark:text-white mt-8 mb-4"
                >
                  {item.content as string}
                </h1>
              );
            case 'h2':
              return (
                <h2 
                  key={index}
                  className="text-2xl font-semibold text-zinc-900 dark:text-white mt-6 mb-3"
                >
                  {item.content as string}
                </h2>
              );
            case 'h3':
              return (
                <h3 
                  key={index}
                  className="text-xl font-semibold text-indigo-600 dark:text-indigo-400 mt-6 mb-2"
                >
                  {item.content as string}
                </h3>
              );
            case 'li':
              return (
                <li 
                  key={index}
                  className="text-zinc-600 dark:text-zinc-300 ml-6 list-disc"
                >
                  {item.content as string}
                </li>
              );
            case 'code':
              return (
                <CodeBlock 
                  key={index}
                  code={item.content as string}
                  language={item.lang}
                />
              );
            case 'p':
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

      {/* Quiz al final de la lección */}
      {lesson.quiz && lesson.quiz.length > 0 && (
        <Quiz 
          questions={lesson.quiz} 
          lessonId={lesson.id}
          onComplete={onQuizComplete}
        />
      )}
    </div>
  );
}

// ========================================
// 🔧 UTILITIES
// ========================================

function formatText(text: string): React.ReactNode[] {
  // Dividir por patrones de negrita **texto**
  const parts = text.split(/(\*\*[^*]+\*\*)/);
  
  return parts.map((part, idx) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={idx} className="font-semibold text-zinc-900 dark:text-white">
          {part.slice(2, -2)}
        </strong>
      );
    }
    
    // También manejar código inline `code`
    if (part.includes('`')) {
      const codeParts = part.split(/(`[^`]+`)/);
      return codeParts.map((codePart, codeIdx) => {
        if (codePart.startsWith('`') && codePart.endsWith('`')) {
          return (
            <code 
              key={`${idx}-${codeIdx}`}
              className="px-1.5 py-0.5 bg-zinc-100 dark:bg-zinc-800 rounded text-sm font-mono text-indigo-600 dark:text-indigo-400"
            >
              {codePart.slice(1, -1)}
            </code>
          );
        }
        return codePart;
      });
    }
    
    return part;
  });
}
