"use client";

import { useState } from 'react';
import { XCircleIcon, CheckCircleIcon, ChevronDownIcon, LightbulbIcon } from './icons';
import { useLanguage } from "@/src/i18n/LanguageContext";

// ========================================
// 📋 TYPES
// ========================================

interface CodeComparisonProps {
  title: string;
  description: string;
  badCode: string;
  goodCode: string;
  explanation: string;
}

interface InternalCodeBlockProps {
  code: string;
  type: 'bad' | 'good';
  label: string;
}

// ========================================
// 🧩 INTERNAL CODE BLOCK
// ========================================

function InternalCodeBlock({ code, type, label }: InternalCodeBlockProps) {
  const isBad = type === 'bad';
  
  return (
    <div 
      className="rounded-lg overflow-hidden"
      style={{
        background: '#0f172a',
        boxShadow: '0 4px 15px -3px rgba(0, 0, 0, 0.3)',
        border: `1px solid ${isBad ? 'rgba(239, 68, 68, 0.3)' : 'rgba(34, 197, 94, 0.3)'}`,
      }}
    >
      {/* Header */}
      <div 
        className="flex items-center px-4 py-2.5"
        style={{
          background: isBad ? 'rgba(127, 29, 29, 0.5)' : 'rgba(20, 83, 45, 0.5)',
          borderBottom: `1px solid ${isBad ? 'rgba(239, 68, 68, 0.2)' : 'rgba(34, 197, 94, 0.2)'}`,
        }}
      >
        {/* Dots macOS */}
        <span className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: '#ef4444' }} />
        <span className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: '#fbbf24' }} />
        <span className="w-3 h-3 rounded-full mr-4" style={{ backgroundColor: '#22c55e' }} />
        
        {/* Label with icon */}
        <div 
          className="flex items-center gap-2 text-sm font-semibold"
          style={{ color: isBad ? '#fca5a5' : '#86efac' }}
        >
          {isBad ? <XCircleIcon /> : <CheckCircleIcon />}
          {label}
        </div>
        
        {/* Language badge */}
        <span 
          className="ml-auto text-xs font-semibold uppercase tracking-wider"
          style={{ color: '#38bdf8' }}
        >
          typescript
        </span>
      </div>
      
      {/* Code */}
      <pre className="p-4 overflow-x-auto" style={{ margin: 0 }}>
        <code 
          style={{
            fontFamily: "'Fira Code', 'JetBrains Mono', 'Consolas', monospace",
            fontSize: '0.875rem',
            lineHeight: '1.7',
            color: isBad ? '#fca5a5' : '#86efac',
            display: 'block',
          }}
        >
          {code}
        </code>
      </pre>
    </div>
  );
}

// ========================================
// 🧩 MAIN COMPONENT
// ========================================

export default function CodeComparison({ title, description, badCode, goodCode, explanation }: CodeComparisonProps) {
  const [showExplanation, setShowExplanation] = useState(false);
  const { t } = useLanguage();

  return (
    <div className="my-8">
      {/* Header */}
      <div className="mb-6">
        <h3 className="text-xl font-bold text-zinc-900 dark:text-white">{title}</h3>
        <p className="mt-1 text-zinc-600 dark:text-zinc-400">{description}</p>
      </div>
      
      {/* Column blocks */}
      <div className="space-y-4">
        <InternalCodeBlock code={goodCode} type="good" label={`✅ ${t.code_comparison.good}`} />
        <InternalCodeBlock code={badCode} type="bad" label={`❌ ${t.code_comparison.bad}`} />
      </div>

      {/* Explanation */}
      <div 
        className="mt-4 rounded-lg overflow-hidden"
        style={{
          background: 'rgba(99, 102, 241, 0.1)',
          border: '1px solid rgba(99, 102, 241, 0.2)',
        }}
      >
        <button
          onClick={() => setShowExplanation(!showExplanation)}
          className="w-full px-4 py-3 flex items-center gap-2 text-left transition-colors hover:bg-indigo-500/10"
          style={{ color: '#a5b4fc' }}
        >
          <LightbulbIcon />
          <span className="font-semibold text-sm">
            {showExplanation ? t.code_comparison.show_explanation : t.code_comparison.why}
          </span>
          <span className={`ml-auto transition-transform duration-200 ${showExplanation ? 'rotate-180' : ''}`}>
            <ChevronDownIcon />
          </span>
        </button>
        
        {showExplanation && (
          <div 
            className="px-4 pb-4 text-sm leading-relaxed"
            style={{ 
              color: '#c7d2fe',
              borderTop: '1px solid rgba(99, 102, 241, 0.2)',
              paddingTop: '1rem',
            }}
          >
            {explanation}
          </div>
        )}
      </div>
    </div>
  );
}

// ========================================
// 🔹 SECTION DIVIDER
// ========================================

export function SectionDivider() {
  return (
    <div className="my-12 flex items-center gap-4">
      <div className="flex-1 h-px bg-linear-to-r from-transparent via-zinc-300 dark:via-zinc-700 to-transparent" />
      <div className="flex gap-1">
        <span className="w-2 h-2 rounded-full bg-indigo-400" />
        <span className="w-2 h-2 rounded-full bg-cyan-400" />
        <span className="w-2 h-2 rounded-full bg-indigo-400" />
      </div>
      <div className="flex-1 h-px bg-linear-to-r from-transparent via-zinc-300 dark:via-zinc-700 to-transparent" />
    </div>
  );
}
