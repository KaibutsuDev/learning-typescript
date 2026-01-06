"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { es } from './locales/es';
import { en } from './locales/en';

// Magic TS type inference for autocomplete functionality
type Dictionary = typeof es;
type Locale = 'es' | 'en';

interface LanguageContextType {
  locale: Locale;
  t: Dictionary;
  toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>('es');

  // Choose current dictionary
  const t = locale === 'es' ? es : en;

  const toggleLanguage = () => {
    setLocale((prev) => (prev === 'es' ? 'en' : 'es'));
  };

  return (
    <LanguageContext.Provider value={{ locale, t, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

// Custom hook to use translations
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
