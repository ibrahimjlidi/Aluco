'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import translations from '../i18n';

export default function MainHeader() {
  const { isArabic, locale, setLocale } = useLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinkFocus = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-champagne/70 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent';
  const ctaClass = 'inline-flex items-center justify-center rounded-full border border-champagne/60 bg-champagne px-5 py-2.5 text-sm font-semibold text-charcoal transition hover:bg-[#d9b98d] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-champagne/70 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent';

  const navItemClass = `transition ${navLinkFocus} ${isScrolled ? 'text-charcoal hover:text-black' : 'text-white/80 hover:text-white'}`;

  const t = isArabic ? translations.ar : translations.fr;

  const labels = isArabic
    ? {
      collections: 'المجموعات',
      products: 'المنتجات',
      projects: 'المشاريع',
      performance: 'الأداء',
      architects: 'المهندسين',
      contact: 'تواصل',
      cta: 'احجز استشارة',
      language: 'اللغة',
    }
    : {
      collections: 'Collections',
      products: 'Produits',
      projects: 'Réalisation',
      performance: 'Performance',
      architects: 'Architectes',
      contact: 'Contact',
      cta: 'Prendre rendez-vous',
      language: 'Langue',
    };

  return (
    <header id="header" className="fixed inset-x-0 top-0 z-50 transition-all duration-300">
      <nav className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <div id="headerWrap" className={`mx-auto mt-5 flex max-w-[1320px] items-center justify-between rounded-full border px-5 py-3 shadow-soft backdrop-blur-md transition-all duration-300 ${isScrolled ? 'bg-white/90 border-slate-200 text-charcoal shadow-luxe' : 'bg-white/5 border-white/15 text-white'}`}>
          <Link href="/" className="flex items-center gap-3" aria-label="Alucoa Aluminium home">
            <div className={`flex h-11 w-11 items-center justify-center overflow-hidden rounded-full border transition-colors duration-300 ${isScrolled ? 'border-charcoal/20 bg-charcoal/5' : 'border-white/20 bg-white/10'}`}>
              <Image src="/logo-Alucoa-creative.svg" alt="Alucoa Aluminium logo" width={54} height={54} priority />
            </div>
            <div className="leading-none">
              <div className={`text-[0.52rem] uppercase tracking-[0.24em] transition-colors duration-300 ${isScrolled ? 'text-slate-500' : 'text-white/70'}`}>ALUCOA</div>
            </div>
          </Link>

          <div className="hidden items-center gap-8 text-sm font-medium lg:flex">
            <div className="group relative">
              <button type="button" className={`flex items-center gap-2 ${navItemClass}`} aria-expanded="false">
                {labels.collections}
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.8" stroke="currentColor" className="h-4 w-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m6 9 6 6 6-6" />
                </svg>
              </button>

              <div className="invisible absolute left-1/2 top-full mt-4 w-[760px] -translate-x-1/2 rounded-[28px] border border-white/10 bg-[#111111]/90 p-5 opacity-0 shadow-luxe transition duration-300 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                <div className="grid grid-cols-4 gap-4 text-left">
                  {t.mainMenuTiles.map(({ label, title, desc }) => (
                    <div key={title} className="rounded-2xl bg-white/5 p-4">
                      <p className="text-xs uppercase tracking-[0.25em] text-champagne">{label}</p>
                      <h4 className="mt-3 text-xl font-semibold text-white">{title}</h4>
                      <p className="mt-2 text-sm text-white/70">{desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <Link href="/produits" className={navItemClass}>{labels.products}</Link>
            <Link href="/realisations" className={navItemClass}>{labels.projects}</Link>
            <Link href="/#performance" className={navItemClass}>{labels.performance}</Link>
            <Link href="/#architects" className={navItemClass}>{labels.architects}</Link>
            <Link href="/contact" className={navItemClass}>{labels.contact}</Link>
          </div>

          <div className="hidden items-center gap-4 lg:flex">
            <div className={`flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs uppercase tracking-[0.24em] transition-colors duration-300 ${isScrolled ? 'border-slate-200 bg-slate-50 text-slate-700' : 'border-white/15 bg-white/5 text-white/80'}`}>
              <button type="button" onClick={() => setLocale('fr')} className={`font-semibold transition ${locale === 'fr' ? (isScrolled ? 'text-charcoal' : 'text-white') : (isScrolled ? 'opacity-70 hover:text-charcoal' : 'opacity-70 hover:text-white')}`}>
                FR
              </button>
              <span className={isScrolled ? 'text-slate-300' : 'text-white/40'}>|</span>
              <button type="button" onClick={() => setLocale('ar')} className={`transition ${locale === 'ar' ? (isScrolled ? 'text-charcoal' : 'text-white') : (isScrolled ? 'opacity-70 hover:text-charcoal' : 'opacity-70 hover:text-white')}`}>
                AR
              </button>
            </div>
            <Link href="/contact" className={ctaClass}>{labels.cta}</Link>
          </div>

          <button
            id="mobileMenuButton"
            type="button"
            onClick={() => setMobileOpen((open) => !open)}
            className={`inline-flex h-10 w-10 items-center justify-center rounded-full border transition-colors duration-300 lg:hidden ${isScrolled ? 'border-slate-200 bg-slate-50 text-charcoal' : 'border-white/15 bg-white/5 text-white'}`}
            aria-label="Menu"
            aria-expanded={mobileOpen}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.7" stroke="currentColor" className="h-5 w-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
        </div>

        <div id="mobileMenu" className={`${mobileOpen ? 'block' : 'hidden'} mt-3 rounded-[24px] border border-white/10 bg-[#111111]/90 p-4 text-white shadow-luxe backdrop-blur-lg lg:hidden`}>
          <div className="flex flex-col gap-4 text-sm text-white/80">
            <Link href="/#collections" onClick={() => setMobileOpen(false)} className="text-white/80 hover:text-white">{labels.collections}</Link>
            <Link href="/produits" onClick={() => setMobileOpen(false)} className="text-white/80 hover:text-white">{labels.products}</Link>
            <Link href="/realisations" onClick={() => setMobileOpen(false)} className="text-white/80 hover:text-white">{labels.projects}</Link>
            <Link href="/#performance" onClick={() => setMobileOpen(false)} className="text-white/80 hover:text-white">{labels.performance}</Link>
            <Link href="/#architects" onClick={() => setMobileOpen(false)} className="text-white/80 hover:text-white">{labels.architects}</Link>
            <Link href="/contact" onClick={() => setMobileOpen(false)} className="text-white/80 hover:text-white">{labels.contact}</Link>
            <div className="flex items-center justify-between gap-3 rounded-full border border-white/10 bg-white/5 px-3 py-2">
              <span className="text-xs uppercase tracking-[0.24em] text-white/70">{labels.language}</span>
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em]">
                <button type="button" onClick={() => setLocale('fr')} className={`text-white ${locale === 'fr' ? 'text-white' : 'text-white/60'}`}>FR</button>
                <span className="text-white/40">/</span>
                <button type="button" onClick={() => setLocale('ar')} className={`text-white ${locale === 'ar' ? 'text-white' : 'text-white/60'}`}>AR</button>
              </div>
            </div>
            <Link href="/contact" onClick={() => setMobileOpen(false)} className="inline-flex items-center justify-center rounded-full bg-champagne px-4 py-3 font-semibold text-charcoal">{labels.cta}</Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
