'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import MainHeader from './components/MainHeader';
import { useLanguage } from './context/LanguageContext';
import translations from './i18n';

const projectData = {
  'modal-1': {
    title: 'Villa Saint-Cloud',
    category: 'Villa',
    description:
      'Une maison d’architecte au croisement du minimalisme et du luxe discret. La façade met en valeur des lignes horizontales, des vitrages sur mesure et une pureté architecturale remarquable.',
    architect: 'Marie Laurent Architectes',
    profiles: 'ALUCOA Présence 75',
    glass: 'Vitrage basse émissivité',
    image:
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80'
  },
  'modal-2': {
    title: 'Maison de luxe Paris',
    category: 'Rénovation',
    description:
      'Rénovation d’exception d’une demeure de caractère avec optimisation de l’isolation, du confort thermique et d’une luminosité naturelle exceptionnelle.',
    architect: 'Benoît Martin Studio',
    profiles: 'ALUCOA Thermal 68',
    glass: 'Double vitrage acoustique',
    image:
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80'
  },
  'modal-3': {
    title: 'Hotel & Spa',
    category: 'Tertiaire',
    description:
      'Façade tertiaire premium avec solutions de sécurité renforcée, confort acoustique et intégration visuelle immédiate dans un environnement de standing.',
    architect: 'Atelier 9 Design',
    profiles: 'ALUCOA Facade 82',
    glass: 'Vitrage anti-effraction',
    image:
      'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80'
  }
};

export default function HomePage() {
  const { isArabic } = useLanguage();
  const [currentStep, setCurrentStep] = useState(0);
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const [config, setConfig] = useState({
    productIdx: 0,
    finishIdx: 0,
    glazingIdx: 0,
    width: 2,
    height: 1.5,
    name: '',
    email: '',
    message: ''
  });

  const t = isArabic ? translations.ar : translations.fr;

  const estimate = Math.round(
    (config.width * config.height) *
    ([500, 350, 400, 450][config.productIdx] || 400) *
    ([1, 1.1, 1.15, 1.25, 1.2][config.finishIdx] || 1) *
    ([1, 1.25, 1.4, 1.6][config.glazingIdx] || 1)
  );

  useEffect(() => {
    setMounted(true);
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible');
        });
      },
      { threshold: 0.15 }
    );

    reveals.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
    };
  }, []);

  const totalSteps = 3;

  const stepPanels = [
    {
      title: t.step1Title,
      content: (
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {t.productOptions.map(({ name, desc }, index) => (
            <label
              key={name}
              className={`product-option block cursor-pointer rounded-2xl border p-4 transition hover:border-champagne/80 ${index === config.productIdx ? 'border-champagne/80 bg-champagne/5' : 'border-white/10 bg-white/5'
                }`}
            >
              <input type="radio" name="product" value={name} className="sr-only" checked={index === config.productIdx} onChange={() => setConfig({ ...config, productIdx: index })} />
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xl font-semibold text-white">{name}</p>
                  <p className="mt-2 text-sm text-white/70">{desc}</p>
                </div>
                <span className={`mt-1 flex h-5 w-5 items-center justify-center rounded-full border ${index === config.productIdx ? 'border-champagne bg-champagne text-charcoal' : 'border-white/30'}`}>
                  {index === config.productIdx && <div className="h-2.5 w-2.5 rounded-full bg-charcoal" />}
                </span>
              </div>
            </label>
          ))}
        </div>
      )
    },
    {
      title: t.step2Title,
      content: (
        <div className="mt-6 space-y-5">
          <div>
            <label className="mb-2 block text-sm text-white/70">{t.finishLabel}</label>
            <select value={config.finishIdx} onChange={(e) => setConfig({ ...config, finishIdx: parseInt(e.target.value) })} className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-champagne">
              {t.finishOptions.map((o, idx) => (
                <option key={o} value={idx}>{o}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-2 block text-sm text-white/70">{t.glazingLabel}</label>
            <select value={config.glazingIdx} onChange={(e) => setConfig({ ...config, glazingIdx: parseInt(e.target.value) })} className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-champagne">
              {t.glazingOptions.map((o, idx) => (
                <option key={o} value={idx}>{o}</option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-2 block text-sm text-white/70">Largeur (m)</label>
              <input type="number" min="0.5" step="0.1" value={config.width} onChange={(e) => setConfig({ ...config, width: parseFloat(e.target.value) || 0 })} className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-champagne" />
            </div>
            <div>
              <label className="mb-2 block text-sm text-white/70">Hauteur (m)</label>
              <input type="number" min="0.5" step="0.1" value={config.height} onChange={(e) => setConfig({ ...config, height: parseFloat(e.target.value) || 0 })} className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-champagne" />
            </div>
          </div>
        </div>
      )
    },
    {
      title: t.step3Title,
      content: (
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm text-white/70">{t.nameLabel}</label>
            <input type="text" value={config.name} onChange={(e) => setConfig({ ...config, name: e.target.value })} className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/35 outline-none focus:border-champagne" placeholder={t.namePlaceholder} />
          </div>
          <div>
            <label className="mb-2 block text-sm text-white/70">{t.emailLabel}</label>
            <input type="email" value={config.email} onChange={(e) => setConfig({ ...config, email: e.target.value })} className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/35 outline-none focus:border-champagne" placeholder={t.emailPlaceholder} />
          </div>
          <div className="md:col-span-2">
            <label className="mb-2 block text-sm text-white/70">{t.projectLabel}</label>
            <textarea rows={4} value={config.message} onChange={(e) => setConfig({ ...config, message: e.target.value })} className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/35 outline-none focus:border-champagne" placeholder={t.projectPlaceholder} />
          </div>
        </div>
      )
    }
  ];

  const galleryItems = t.galleryItems;

  const filteredGallery =
    activeFilter === 'all' ? galleryItems : galleryItems.filter((item) => item.category === activeFilter);

  return (
    <>
      <MainHeader />

      <main id="top">
        <section className="hero-bg relative isolate overflow-hidden">
          <div className="luxury-pattern absolute inset-0 opacity-25" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0d0d0d]/80 via-[#0d0d0d]/35 to-transparent" />

          <div className="relative mx-auto grid min-h-screen max-w-[1440px] items-center gap-10 px-4 pb-20 pt-32 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:pb-28 lg:pt-36">
            <div className="max-w-2xl text-white">
              <p className="mb-6 inline-flex items-center rounded-full border border-white/15 bg-white/5 px-4 py-2 text-[10px] font-medium uppercase tracking-[0.28em] text-white/80 glass">
                {t.heroBadge}
              </p>
              <h1 className="font-display text-5xl font-semibold leading-[0.95] tracking-[-0.06em] sm:text-6xl lg:text-[5.3rem]">
                {t.heroTitle}
              </h1>
              <p className="mt-6 max-w-xl text-base leading-8 text-white/80 sm:text-lg">
                {t.heroText}
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <a href="#collections" className="inline-flex items-center justify-center rounded-full bg-champagne px-6 py-3.5 text-sm font-semibold text-charcoal transition hover:bg-[#d7bb8a]">
                  {t.primaryCta}
                </a>
                <a href="#configurator" className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10">
                  {t.secondaryCta}
                </a>
              </div>

              <div className="mt-10 grid max-w-lg grid-cols-3 gap-5">
                {[['18+', 'Années'], ['2.4k', 'Projets'], ['A+', 'Performance']].map(([value, label]) => (
                  <div key={label} className="glass-panel rounded-2xl p-4">
                    <p className="text-2xl font-semibold text-white">{value}</p>
                    <p className="mt-2 text-[10px] uppercase tracking-[0.22em] text-white/60">{label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative flex justify-center lg:justify-end">
              <div className="glass-panel w-full max-w-md rounded-[32px] p-3 shadow-luxe float-soft">
                <div className="overflow-hidden rounded-[24px]">
                  <Image
                    src="https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80"
                    alt="Maison contemporaine avec menuiserie aluminium de luxe"
                    width={1200}
                    height={1500}
                    className="h-[540px] w-full object-cover"
                  />
                </div>
              </div>
              <div className="absolute -left-4 bottom-10 max-w-[220px] rounded-2xl bg-white/90 p-4 shadow-luxe backdrop-blur-md">
                <p className="text-[10px] uppercase tracking-[0.25em] text-slate-500">{t.performanceCard.valueLabel}</p>
                <p className="mt-2 text-3xl font-semibold text-charcoal">{t.performanceCard.value}</p>
                <p className="mt-2 text-sm text-slate-600">{t.performanceCard.text}</p>
              </div>
            </div>
          </div>
        </section>

        <section id="collections" className="reveal mx-auto max-w-[1440px] px-4 py-24 sm:px-6 lg:px-8">
          <div className="mb-10 max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-champagne">{t.collectionsLabel}</p>
            <h2 className="section-title mt-4 font-display text-4xl font-semibold tracking-[-0.05em] text-charcoal sm:text-5xl">
              {t.collectionsTitle}
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {t.collectionsCards.map(({ label, title, desc }) => (
              <article key={title} className="hover-lift reveal rounded-[28px] border border-slate-200 bg-white p-6 shadow-soft">
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-smoke text-charcoal">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.7" stroke="currentColor" className="h-7 w-7">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5M7.5 7.5h9l3 4.5v4.5H4.5v-4.5l3-4.5Z" />
                  </svg>
                </div>
                <p className="text-[10px] uppercase tracking-[0.28em] text-champagne">{label}</p>
                <h3 className="mt-4 text-2xl font-semibold text-charcoal">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{desc}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="configurator" className="reveal bg-[#111111] py-24 text-white">
          <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
            <div className="mb-10 max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.32em] text-champagne">{t.configuratorLabel}</p>
              <h2 className="section-title mt-4 font-display text-4xl font-semibold tracking-[-0.05em] text-white sm:text-5xl">
                {t.configuratorTitle}
              </h2>
            </div>

            <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
              <div className="rounded-[28px] border border-white/10 bg-white/5 p-6 sm:p-8">
                <div className="mb-8 flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    {[0, 1, 2].map((step) => (
                      <span
                        key={step}
                        className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold ${step === currentStep ? 'bg-champagne text-charcoal' : 'border border-white/20 text-white/70'
                          }`}
                      >
                        {step + 1}
                      </span>
                    ))}
                  </div>
                  <div className="h-px flex-1 bg-white/10" />
                </div>

                <div className="space-y-8">
                  <div className="text-2xl font-semibold text-white">{stepPanels[currentStep].title}</div>
                  {stepPanels[currentStep].content}
                  <div className="flex justify-between pt-4">
                    <button
                      type="button"
                      className={`${currentStep === 0 ? 'hidden' : ''} rounded-full border border-white/20 px-5 py-3 text-sm font-medium text-white/70 transition hover:bg-white/5`}
                      onClick={() => setCurrentStep((p) => Math.max(0, p - 1))}
                    >
                      {t.back}
                    </button>
                    <button
                      type="button"
                      className="ml-auto rounded-full bg-champagne px-6 py-3 text-sm font-semibold text-charcoal transition hover:bg-[#d9b98d]"
                      onClick={() => {
                        if (currentStep < totalSteps - 1) {
                          setCurrentStep((prev) => prev + 1);
                          return;
                        }

                        alert(t.submitAlert);
                      }}
                    >
                      {currentStep === totalSteps - 1 ? t.submit : t.next}
                    </button>
                  </div>
                </div>
              </div>

              <aside className="rounded-[28px] border border-champagne/30 bg-gradient-to-b from-[#1a1a1a] to-black p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden">
                <div className="luxury-pattern absolute inset-0 opacity-10" />
                <div className="relative z-10">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-champagne mb-4">Simulation instantanée</p>
                  <div className="mb-6 rounded-2xl bg-white/5 p-5 border border-white/10">
                    <p className="text-sm text-white/60 mb-2">Budget estimatif</p>
                    <h3 className="font-display text-4xl font-semibold tracking-[-0.05em] text-champagne">
                      ≈ {estimate.toLocaleString()} DT
                    </h3>
                  </div>

                  <div className="space-y-3 text-sm text-white/80">
                    <div className="flex justify-between border-b border-white/10 pb-3">
                      <span className="text-white/50">Série</span>
                      <span className="font-semibold text-white text-right max-w-[150px] truncate">{t.productOptions[config.productIdx]?.name}</span>
                    </div>
                    <div className="flex justify-between border-b border-white/10 pb-3">
                      <span className="text-white/50">Finition & Verre</span>
                      <span className="font-medium text-white text-right max-w-[150px] truncate">{t.finishOptions[config.finishIdx]?.split(' ')[0]} / {t.glazingOptions[config.glazingIdx]?.split(' ')[0]}</span>
                    </div>
                    <div className="flex justify-between pb-2">
                      <span className="text-white/50">Dimensions</span>
                      <span className="font-medium text-white">{config.width}m × {config.height}m ({(config.width * config.height).toFixed(2)} m²)</span>
                    </div>
                  </div>
                </div>

                <div className="relative z-10 mt-8 rounded-[24px] border border-champagne/20 bg-[#232323] p-5">
                  <p className="text-[10px] uppercase tracking-[0.28em] text-champagne">{t.diagnostic.replyLabel}</p>
                  <p className="mt-3 text-3xl font-semibold text-white">{t.diagnostic.replyTime}</p>
                  <p className="mt-2 text-sm text-white/65">{t.diagnostic.replyText}</p>
                </div>
              </aside>
            </div>
          </div>
        </section>

        <section id="portfolio" className="reveal mx-auto max-w-[1440px] px-4 py-24 sm:px-6 lg:px-8">
          <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.32em] text-champagne">{t.portfolioLabel}</p>
              <h2 className="section-title mt-4 font-display text-4xl font-semibold tracking-[-0.05em] text-charcoal sm:text-5xl">
                {t.portfolioTitle}
              </h2>
            </div>

            <div className="flex flex-wrap gap-3">
              {[
                ['all', t.all],
                ['villa', t.villa],
                ['renovation', t.renovation],
                ['tertiaire', t.tertiary]
              ].map(([value, label]) => (
                <button
                  key={value}
                  type="button"
                  className={`filter-btn rounded-full border px-4 py-2 text-sm font-medium ${activeFilter === value ? 'border-charcoal bg-charcoal text-white' : 'border-charcoal/10 bg-white text-charcoal'
                    }`}
                  onClick={() => setActiveFilter(value)}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3" id="galleryGrid">
            {filteredGallery.slice(0, 3).map((item) => (
              <article key={item.id} className="gallery-item rounded-[28px] overflow-hidden bg-white shadow-soft border border-slate-200">
                <button type="button" className="block w-full text-left" onClick={() => setSelectedProject(item.id)}>
                  <Image src={item.image} alt={item.title} width={1000} height={800} className="h-80 w-full object-cover" />
                  <div className="p-5">
                    <div className="flex items-center justify-between gap-4">
                      <h3 className="text-2xl font-semibold text-charcoal">{item.title}</h3>
                      <span className="text-xs uppercase tracking-[0.22em] text-champagne">{item.slug}</span>
                    </div>
                    <p className="mt-3 text-sm text-slate-600">{item.text}</p>
                  </div>
                </button>
              </article>
            ))}
          </div>

          <div className="mt-12 flex justify-center">
            <Link href="/realisations" className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-8 py-3.5 text-sm font-semibold text-charcoal shadow-soft transition hover:border-charcoal hover:bg-smoke focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-champagne">
              {t.seeAllProjects}
            </Link>
          </div>
        </section>

        {selectedProject && (
          <div className="fixed inset-0 z-[60] bg-[#111111]/85 p-4 backdrop-blur-md" onClick={() => setSelectedProject(null)}>
            <div className="relative mx-auto max-w-5xl overflow-hidden rounded-[30px] bg-white shadow-luxe" onClick={(e) => e.stopPropagation()}>
              <button type="button" className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/80 text-charcoal shadow-md" onClick={() => setSelectedProject(null)} aria-label="Fermer">✕</button>
              <div className="grid md:grid-cols-[1.15fr_0.85fr]">
                <Image
                  src={projectData[selectedProject as keyof typeof projectData].image}
                  alt="Projet ALUCOA"
                  width={1200}
                  height={900}
                  className="h-full min-h-[320px] w-full object-cover"
                />
                <div className="p-6 sm:p-8">
                  <p className="text-[10px] uppercase tracking-[0.28em] text-champagne">{projectData[selectedProject as keyof typeof projectData].category}</p>
                  <h3 className="mt-4 font-display text-3xl font-semibold tracking-[-0.05em] text-charcoal">{projectData[selectedProject as keyof typeof projectData].title}</h3>
                  <p className="mt-4 text-base leading-7 text-slate-600">{projectData[selectedProject as keyof typeof projectData].description}</p>
                  <div className="mt-6 space-y-4 text-sm text-slate-700">
                    <div className="flex items-center justify-between border-b border-slate-200 pb-3"><span>Architecte</span><span className="font-medium text-charcoal">{projectData[selectedProject as keyof typeof projectData].architect}</span></div>
                    <div className="flex items-center justify-between border-b border-slate-200 pb-3"><span>Profilés</span><span className="font-medium text-charcoal">{projectData[selectedProject as keyof typeof projectData].profiles}</span></div>
                    <div className="flex items-center justify-between border-b border-slate-200 pb-3"><span>Vitrage</span><span className="font-medium text-charcoal">{projectData[selectedProject as keyof typeof projectData].glass}</span></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <section id="performance" className="reveal bg-smoke py-24">
          <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
            <div className="mb-10 max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.32em] text-champagne">{t.performanceLabel}</p>
              <h2 className="section-title mt-4 font-display text-4xl font-semibold tracking-[-0.05em] text-charcoal sm:text-5xl">
                {t.performanceTitle}
              </h2>
            </div>

            <div className="overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-soft">
              <table className="min-w-full text-left">
                <thead className="bg-[#111111] text-white">
                  <tr>
                    {t.tableHeaders.map((h) => (
                      <th key={h} className="px-6 py-5 text-sm font-medium uppercase tracking-[0.2em]">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {t.tableRows.map((row, idx) => (
                    <tr key={idx} className={idx < t.tableRows.length - 1 ? 'border-b border-slate-200' : ''}>
                      {row.map((cell, cidx) => (
                        <td key={cidx} className={`px-6 py-5 ${cidx === 0 ? 'font-medium text-charcoal' : 'text-slate-700'}`}>{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section id="architects" className="reveal mx-auto max-w-[1440px] px-4 py-24 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div className="overflow-hidden rounded-[30px] shadow-luxe">
              <Image src="https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=1200&q=80" alt="Atelier d'architecture" width={1200} height={900} className="h-full w-full object-cover" />
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.32em] text-champagne">{t.architectsLabel}</p>
              <h2 className="section-title mt-4 font-display text-4xl font-semibold tracking-[-0.05em] text-charcoal sm:text-5xl">
                {t.architectsTitle}
              </h2>
              <p className="mt-6 max-w-xl text-base leading-8 text-slate-600">
                Nous mettons à disposition des architectes et maîtres d’œuvre des outils de conception, fiches techniques, documents BIM et un support de projet pour garantir des réalisations impeccables.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {t.architectsCards.map(({ label, title, text }) => (
                  <div key={title} className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-soft">
                    <p className="text-[10px] uppercase tracking-[0.24em] text-champagne">{label}</p>
                    <h3 className="mt-3 text-xl font-semibold text-charcoal">{title}</h3>
                    <p className="mt-2 text-sm text-slate-600">{text}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <a href="/contact" className="inline-flex items-center justify-center rounded-full bg-charcoal px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#2d2d2d]">
                  {t.architectsExtras.accessPro}
                </a>
                <a href="/contact" className="inline-flex items-center justify-center rounded-full border border-charcoal/15 bg-white px-6 py-3 text-sm font-semibold text-charcoal transition hover:bg-slate-50">
                  {t.architectsExtras.downloadSheets}
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer id="contact" className="bg-[#111111] text-slate-300">
        <div className="mx-auto max-w-[1440px] px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.2fr_0.8fr_1fr_1.2fr] lg:gap-8">
            <div>
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-champagne/40 bg-white/5 text-lg font-bold text-champagne">A</div>
                <div>
                  <p className="font-display text-[2rem] font-semibold leading-none tracking-[-0.06em] text-white">ALUCOA</p>
                  <p className="mt-1 text-[9px] uppercase tracking-[0.3em] text-slate-400">Prestige</p>
                </div>
              </div>
              <p className="mt-6 max-w-xs text-base leading-8 text-slate-300">
                Manufacture d’excellence pour des menuiseries aluminium architecturales à la hauteur des projets les plus exigeants.
              </p>
              <div className="mt-6 flex flex-wrap gap-2 text-[10px] uppercase tracking-[0.18em] text-slate-200">
                <span className="rounded-full border border-champagne/30 bg-white/5 px-3 py-2">Qualicoat</span>
                <span className="rounded-full border border-champagne/30 bg-white/5 px-3 py-2">Qualimarine</span>
                <span className="rounded-full border border-champagne/30 bg-white/5 px-3 py-2">Cekal</span>
              </div>
            </div>

            <div>
              <h3 className="text-[10px] font-semibold uppercase tracking-[0.26em] text-slate-400">{t.collectionsLabel}</h3>
              <ul className="mt-6 space-y-4 text-[0.98rem] text-slate-300">
                {t.collectionsCards.map((c, idx) => (
                  <li key={c.title}><a href={idx === 3 ? '/produits' : '/#collections'} className="transition hover:text-champagne">{c.label}</a></li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-[10px] font-semibold uppercase tracking-[0.26em] text-slate-400">{t.footer.showrooms}</h3>
              <ul className="mt-6 space-y-4 text-[0.98rem] text-slate-300">
                {t.footer.showroomList.map((s) => (
                  <li key={s}>{s}</li>
                ))}
                <li><a href="/contact" className="transition hover:text-champagne">{t.footer.takeAppointment}</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-[10px] font-semibold uppercase tracking-[0.26em] text-slate-400">{t.footer.newsletterTitle}</h3>
              <form
                className="mt-6"
                onSubmit={async (event) => {
                  event.preventDefault();
                  const form = event.currentTarget;
                  const input = form.querySelector('input[name="newsletter-email"]') as HTMLInputElement | null;
                  const email = input?.value?.trim();

                  if (!email) {
                    alert(t.newsletter.emptyEmail);
                    return;
                  }

                  try {
                    const response = await fetch('/api/newsletter', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ email })
                    });

                    const data = await response.json();
                    if (!response.ok) throw new Error(data.error || 'Erreur');

                    alert(t.footer.newsletterSuccess);
                    form.reset();
                  } catch (error) {
                    alert(error instanceof Error ? error.message : t.footer.newsletterError);
                  }
                }}
              >
                <div className="flex items-center overflow-hidden rounded-full border border-champagne/40 bg-white/5">
                  <input name="newsletter-email" type="email" placeholder={t.footer.newsletterPlaceholder} className="w-full bg-transparent px-4 py-3 text-sm text-white placeholder:text-slate-400 outline-none" required />
                  <button type="submit" className="bg-champagne px-5 py-3 text-sm font-semibold text-charcoal transition hover:bg-[#d9b98d]">
                    Ok
                  </button>
                </div>
              </form>

              <ul className="mt-6 space-y-3 text-[0.95rem] text-slate-300">
                <li><a href="/contact" className="transition hover:text-champagne">{t.footer.legal}</a></li>
                <li><a href="/contact" className="transition hover:text-champagne">{t.footer.privacy}</a></li>
                <li><a href="/contact" className="transition hover:text-champagne">{t.footer.terms}</a></li>
                <li><a href="/contact" className="transition hover:text-champagne">{t.footer.cookies}</a></li>
              </ul>
            </div>
          </div>

          <div className="mt-12 border-t border-white/10 pt-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-slate-400">© {new Date().getFullYear()} ALUCOA Prestige — Tous droits réservés.</p>
              <div className="flex items-center gap-4 text-slate-400">
                <a href="https://www.instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram" className="transition hover:text-champagne">Instagram</a>
                <a href="https://www.linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="transition hover:text-champagne">LinkedIn</a>
                <a href="https://www.pinterest.com" target="_blank" rel="noreferrer" aria-label="Pinterest" className="transition hover:text-champagne">Pinterest</a>
              </div>
              <p className="text-sm text-slate-400">Crafted for Excellence</p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
