'use client';

import { useLanguage } from '../context/LanguageContext';

export default function LanguageToggle() {
  const { locale, setLocale } = useLanguage();

  return (
    <div className="flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs uppercase tracking-[0.24em] text-white/80">
      <button
        type="button"
        onClick={() => setLocale('fr')}
        className={`font-semibold transition ${locale === 'fr' ? 'text-white' : 'opacity-70 hover:text-white'}`}
      >
        FR
      </button>
      <span className="text-white/40">|</span>
      <button
        type="button"
        onClick={() => setLocale('ar')}
        className={`transition ${locale === 'ar' ? 'text-white' : 'opacity-70 hover:text-white'}`}
      >
        AR
      </button>
    </div>
  );
}
