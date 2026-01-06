"use client";

import { useState, useEffect } from 'react';

export function useProgress(itemId: string) {
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    // Load the initial state
    const saved = localStorage.getItem(`progress_${itemId}`);
    if (saved) {
      setIsCompleted(JSON.parse(saved));
    }
  }, [itemId]);

  const toggleComplete = () => {
    const newState = !isCompleted;
    setIsCompleted(newState);
    localStorage.setItem(`progress_${itemId}`, JSON.stringify(newState));
  };

  return { isCompleted, toggleComplete };
}

export function useGlobalProgress() {
  const [completedItems, setCompletedItems] = useState<string[]>([]);

  useEffect(() => {
    // Scan localStorage to find completed items
    const items: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith('progress_')) {
        const val = localStorage.getItem(key);
        if (val === 'true') {
          items.push(key.replace('progress_', ''));
        }
      }
    }
    setCompletedItems(items);
  }, []);

  return { completedItems };
}
