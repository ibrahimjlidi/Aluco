'use client';

import { FormEvent, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import translations from '../i18n';

export default function ContactForm() {
  const { isArabic } = useLanguage();
  const t = isArabic ? translations.ar : translations.fr;

  const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    setIsSubmitting(true);
    setStatus(null);

    try {
      const response = await fetch('/api/devis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.error || t.contactForm.error);

      setStatus({
        type: 'success',
        message: 'Votre demande a bien été envoyée. Nous vous recontacterons rapidement.'
      });

      form.reset();
    } catch (error) {
      setStatus({
        type: 'error',
        message: error instanceof Error ? error.message : t.contactForm.error
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-soft sm:p-8">
      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">{t.contactForm.nameLabel}</label>
          <input name="nom" required className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-champagne" placeholder={t.contactForm.nameLabel} />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">{t.contactForm.emailLabel}</label>
          <input name="email" type="email" required className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-champagne" placeholder={t.contactForm.emailLabel} />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">{t.contactForm.phoneLabel}</label>
          <input name="telephone" className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-champagne" placeholder={t.contactForm.phoneLabel} />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">{t.contactForm.typeLabel}</label>
          <select name="type" className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-champagne">
            {t.contactForm.typeOptions.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </div>
        <div className="md:col-span-2">
          <label className="mb-2 block text-sm font-medium text-slate-700">{t.contactForm.projectLabel}</label>
          <textarea name="message" rows={6} required className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-champagne" placeholder={t.contactForm.projectPlaceholder} />
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between gap-4">
        <button type="submit" disabled={isSubmitting} className="rounded-full bg-charcoal px-6 py-3 text-sm font-semibold text-white disabled:opacity-60">
          {isSubmitting ? t.contactForm.submittingLabel : t.contactForm.submitLabel}
        </button>
        <span className="text-sm text-slate-500">{t.contactForm.responseLabel}</span>
      </div>

      {status && (
        <div className={`mt-6 rounded-2xl border px-4 py-3 text-sm ${status.type === 'success' ? 'border-emerald-200 bg-emerald-50 text-emerald-700' : 'border-red-200 bg-red-50 text-red-700'}`}>
          {status.message}
        </div>
      )}
    </form>
  );
}
