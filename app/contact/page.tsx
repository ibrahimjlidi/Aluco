'use client';

import Link from 'next/link';
import ContactForm from '../components/ContactForm';
import MainHeader from '../components/MainHeader';
import { useLanguage } from '../context/LanguageContext';
import translations from '../i18n';

const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '21600000000';
const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'contact@alucoaprestige.tn';

const channels = (langCopy: typeof translations.fr) => [
  {
    title: 'WhatsApp',
    href: `https://wa.me/${whatsappNumber}`,
    icon: (
      <svg fill="currentColor" viewBox="0 0 24 24" className="h-5 w-5">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
      </svg>
    )
  },
  {
    title: 'Facebook',
    href: 'https://facebook.com',
    icon: (
      <svg fill="currentColor" viewBox="0 0 24 24" className="h-5 w-5">
        <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
      </svg>
    )
  },
  {
    title: 'Instagram',
    href: 'https://instagram.com',
    icon: (
      <svg fill="currentColor" viewBox="0 0 24 24" className="h-5 w-5">
        <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
      </svg>
    )
  },
  {
    title: 'Email',
    href: `mailto:${contactEmail}`,
    icon: (
      <svg fill="currentColor" viewBox="0 0 24 24" className="h-5 w-5">
        <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67z" />
        <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908z" />
      </svg>
    )
  }
];

export default function ContactPage() {
  const { isArabic } = useLanguage();
  const t = isArabic ? translations.ar : translations.fr;
  const copy = t.contact;
  const channelList = channels(t);

  return (
    <main className="bg-[#f7f4ee] text-charcoal">
      <MainHeader />

      <section className="hero-bg-contact relative isolate overflow-hidden px-4 pb-24 pt-40 sm:px-6 lg:px-8 text-white">
        <div className="luxury-pattern absolute inset-0 opacity-25" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d0d0d]/80 via-[#0d0d0d]/60 to-transparent" />

        <div className="relative mx-auto max-w-[1400px]">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-champagne">{copy.eyebrow}</p>
            <h1 className="mt-4 font-display text-5xl tracking-[-0.06em] text-white sm:text-6xl">{copy.title}</h1>
            <p className="mt-5 text-lg leading-8 text-white/80">{copy.description}</p>

            <div className="mt-8 flex gap-4">
              {channelList.map((channel) => (
                <a
                  key={channel.title}
                  href={channel.href}
                  target={channel.href.startsWith('http') ? '_blank' : undefined}
                  rel={channel.href.startsWith('http') ? 'noreferrer' : undefined}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition hover:scale-110 hover:border-champagne hover:bg-champagne hover:text-charcoal"
                  title={channel.title}
                  aria-label={channel.title}
                >
                  {channel.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div className="space-y-5">
            <div className="rounded-[26px] border border-slate-200 bg-white p-6 shadow-soft">
              <p className="text-[10px] uppercase tracking-[0.28em] text-champagne">{copy.showroom}</p>
              <h2 className="mt-3 text-2xl font-semibold text-charcoal">Tunis</h2>
              <p className="mt-3 text-base leading-7 text-slate-600">Ariana, Grand Tunis</p>
              <p className="mt-2 text-base leading-7 text-slate-600">Lundi au vendredi — 9h00 à 18h30</p>
            </div>

            <div className="rounded-[26px] border border-slate-200 bg-white p-6 shadow-soft">
              <p className="text-[10px] uppercase tracking-[0.28em] text-champagne">{copy.phone}</p>
              <a href="tel:+21600000000" className="mt-3 block text-2xl font-semibold text-charcoal">{whatsappNumber}</a>
              <a href={`mailto:${contactEmail}`} className="mt-2 block text-base text-slate-600">{contactEmail}</a>
            </div>
          </div>

          <ContactForm />
        </div>
      </section>
    </main>
  );
}
