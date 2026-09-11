'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';

export type Locale = 'fr' | 'ar';

type LanguageContextValue = {
  locale: Locale;
  setLocale: (nextLocale: Locale) => void;
  isArabic: boolean;
};

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('fr');

  useEffect(() => {
    const stored = window.localStorage.getItem('alucoa-locale');
    const initialLocale = stored === 'ar' ? 'ar' : 'fr';
    setLocaleState(initialLocale);
    applyLocale(initialLocale);
  }, []);

  const setLocale = (nextLocale: Locale) => {
    setLocaleState(nextLocale);
    window.localStorage.setItem('alucoa-locale', nextLocale);
    applyLocale(nextLocale);
  };

  const value = useMemo(
    () => ({ locale, setLocale, isArabic: locale === 'ar' }),
    [locale]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

function applyLocale(nextLocale: Locale) {
  const root = document.documentElement;
  root.lang = nextLocale;
  root.dir = nextLocale === 'ar' ? 'rtl' : 'ltr';
}

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }

  return context;
}
