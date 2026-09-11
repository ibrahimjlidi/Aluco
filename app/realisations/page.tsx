'use client';

import Image from 'next/image';
import Link from 'next/link';
import MainHeader from '../components/MainHeader';
import { useLanguage } from '../context/LanguageContext';
import translations from '../i18n';

export default function RealisationsPage() {
  const { isArabic } = useLanguage();
  const t = isArabic ? translations.ar : translations.fr;
  const projectList = t.projectsList;
  const copy = isArabic
    ? {
      eyebrow: 'المشاريع',
      title: 'مشاريع استثنائية تنبثق من الضوء وتلبي طموح العمارة التونسية.',
      description: 'كل مشروع يراعي الكفاءة، الدقة الفنية، والمتطلبات المعمارية الأكثر تطلباً في تونس.',
    }
    : {
      eyebrow: 'Réalisation',
      title: 'Des projets d’exception révélés par la lumière.',
      description: 'Chaque commande est conçue pour répondre au plus exigeant des cahiers des charges architecturaux, avec une précision de fabrication et un souci constant du détail.',
    };

  return (
    <main className="bg-[#f7f4ee] text-charcoal">
      <MainHeader />

      <section className="hero-bg-realisations relative isolate overflow-hidden px-4 pb-24 pt-40 sm:px-6 lg:px-8 text-white">
        <div className="luxury-pattern absolute inset-0 opacity-25" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d0d0d]/80 via-[#0d0d0d]/60 to-transparent" />

        <div className="relative mx-auto max-w-[1400px]">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-champagne">{copy.eyebrow}</p>
            <h1 className="mt-4 font-display text-5xl tracking-[-0.06em] text-white sm:text-6xl">{copy.title}</h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-white/80">{copy.description}</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2">
          {projectList.map((project) => (
            <article key={project.title} className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-soft">
              <Image src={project.image} alt={project.title} width={1200} height={900} className="h-80 w-full object-cover" />
              <div className="p-7">
                <div className="flex items-center justify-between gap-4">
                  <p className="text-[10px] uppercase tracking-[0.26em] text-champagne">{project.category}</p>
                  <span className="text-sm text-slate-500">{project.location}</span>
                </div>
                <h2 className="mt-4 text-3xl font-semibold text-charcoal">{project.title}</h2>
                <p className="mt-4 text-base leading-7 text-slate-600">{project.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
