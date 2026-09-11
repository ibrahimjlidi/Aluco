'use client';

import Image from 'next/image';
import Link from 'next/link';
import MainHeader from '../components/MainHeader';
import { useLanguage } from '../context/LanguageContext';
import translations from '../i18n';

export default function ProduitsPage() {
  const { isArabic } = useLanguage();
  const t = isArabic ? translations.ar : translations.fr;
  const copy = isArabic
    ? {
        eyebrow: 'المجموعات',
        title: 'أبواب ونوافذ مصممة لمستقبل العمارة في تونس.',
        description: 'كل مشروع يتم تصميمه حسب المقاسات واحتياجات المبنى لضمان أناقة، كفاءة حرارية، وتجربة عيش فاخرة.',
        cta: 'طلب عرض سعر',
      }
    : {
        eyebrow: 'Collections',
        title: 'Des menuiseries pensées pour l’architecture de demain.',
        description: 'Chaque projet est étudié sur mesure pour associer esthétique, confort thermique et intégration remarquable dans le bâtiment.',
        cta: 'Demander un devis',
      };

  return (
    <main className="bg-[#f7f4ee] text-charcoal">
      <MainHeader />

      <section className="hero-bg-produits relative isolate overflow-hidden px-4 pb-24 pt-40 sm:px-6 lg:px-8 text-white">
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
          {t.productsList.map((product) => (
            <article key={product.title} className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-soft">
              <Image src={product.image} alt={product.title} width={1200} height={900} className="h-80 w-full object-cover" />
              <div className="p-7">
                <p className="text-[10px] uppercase tracking-[0.28em] text-champagne">{product.subtitle}</p>
                <h2 className="mt-4 text-3xl font-semibold text-charcoal">{product.title}</h2>
                <p className="mt-4 text-base leading-7 text-slate-600">{product.description}</p>
                <div className="mt-6 flex items-center justify-between border-t border-slate-200 pt-4">
                  <span className="text-sm font-medium text-slate-500">Sur-mesure</span>
                  <Link href="/contact" className="text-sm font-semibold text-charcoal">{copy.cta} →</Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
