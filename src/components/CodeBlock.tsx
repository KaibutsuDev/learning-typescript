"use client";

import { useState } from 'react';
import { CheckIcon, CopyIcon } from './icons';

// ========================================
// 📋 TYPES
// ========================================

interface CodeBlockProps {
  code: string;
  language?: string;
  showCopy?: boolean;
  title?: string;
}

// ========================================
// 🧩 MAIN COMPONENT
// ========================================

export default function CodeBlock({ code, language = 'typescript', showCopy = true, title }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Copy error:', err);
    }
  };

  return (
    <div 
      className="group relative my-6 rounded-lg overflow-hidden"
      style={{
        background: '#0f172a',
        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.4), 0 8px 10px -6px rgba(0, 0, 0, 0.3)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
      }}
    >
      {/* Header */}
      <div 
        className="flex items-center px-4 py-2"
        style={{
          background: '#1e293b',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        {/* Dots macOS */}
        <span className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: '#ef4444' }} />
        <span className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: '#fbbf24' }} />
        <span className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: '#22c55e' }} />
        
        {title && (
          <span className="ml-3 text-xs font-medium" style={{ color: '#94a3b8' }}>
            {title}
          </span>
        )}
        
        {/* Language badge */}
        <span 
          className="ml-auto text-xs font-semibold uppercase tracking-wider"
          style={{ color: '#38bdf8' }}
        >
          {language}
        </span>
        
        {/* Copy button */}
        {showCopy && (
          <button
            onClick={handleCopy}
            className="ml-3 p-1.5 rounded-md transition-all duration-200"
            style={{
              color: copied ? '#4ade80' : '#94a3b8',
              background: copied ? 'rgba(74, 222, 128, 0.1)' : 'transparent',
            }}
            onMouseEnter={(e) => {
              if (!copied) {
                e.currentTarget.style.background = 'rgba(148, 163, 184, 0.1)';
                e.currentTarget.style.color = '#f8fafc';
              }
            }}
            onMouseLeave={(e) => {
              if (!copied) {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = '#94a3b8';
              }
            }}
            title={copied ? 'Copied!' : 'Copy code'}
          >
            {copied ? <CheckIcon className="w-4 h-4" /> : <CopyIcon />}
          </button>
        )}
      </div>
      
      {/* Code */}
      <pre className="p-4 overflow-x-auto" style={{ margin: 0 }}>
        <code 
          className="text-sm leading-relaxed"
          style={{
            fontFamily: "'Fira Code', 'JetBrains Mono', 'Consolas', monospace",
            color: '#a5b4fc',
            display: 'block',
          }}
        >
          {code}
        </code>
      </pre>
    </div>
  );
}
