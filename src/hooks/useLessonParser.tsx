"use client";

import { useMemo, ReactNode } from 'react';

export interface ParsedPart {
  type: 'h1' | 'h2' | 'h3' | 'p' | 'li' | 'code';
  content: string | ReactNode[];
  lang?: string;
}

export function useLessonParser(content: string) {
  const parts = useMemo(() => {
    const lines = content.split('\n');
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
  }, [content]);

  return parts;
}

function formatText(text: string): ReactNode[] {
  // Split by bold patterns **text**
  const parts = text.split(/(\*\*[^*]+\*\*)/);
  
  return parts.flatMap((part, idx) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return [
        <strong key={idx} className="font-semibold text-zinc-900 dark:text-white">
          {part.slice(2, -2)}
        </strong>
      ];
    }
    
    // Also handle inline code `code`
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
    
    return [part];
  });
}
