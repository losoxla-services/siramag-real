'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Breadcrumb } from '@/components/shared/Breadcrumb';
import { Mail, MapPin, Phone, CheckCircle2, Loader2 } from 'lucide-react';

const schema = z.object({
  name: z.string().min(2, 'Veuillez saisir votre nom'),
  email: z.string().email('Adresse email invalide'),
  subject: z.string().min(3, 'Veuillez saisir un sujet'),
  message: z.string().min(10, 'Votre message est trop court'),
});

type FormData = z.infer<typeof schema>;

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      alert("Une erreur est survenue, réessayez.");
      return;
    }
    setSubmitted(true);
    reset();
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="container mx-auto max-w-5xl px-4 py-6 md:py-8">
      <Breadcrumb items={[{ label: 'Contact' }]} />

      <header className="mt-6 mb-8">
        <div className="flex items-center gap-3 mb-2">
          <span className="w-1.5 h-8 bg-sira-orange rounded-full" />
          <h1 className="font-display text-3xl md:text-4xl font-bold text-sira-dark">Contact</h1>
        </div>
        <p className="text-sira-gray-text max-w-2xl">Une question, une suggestion, une collaboration ? Écrivez-nous, notre équipe vous répondra.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {submitted ? (
            <div className="bg-white border border-sira-gray-mid rounded-2xl p-8 text-center shadow-card">
              <CheckCircle2 className="h-14 w-14 text-sira-teal mx-auto mb-4" />
              <h2 className="font-display text-2xl font-bold text-sira-dark mb-2">Message envoyé !</h2>
              <p className="text-sira-gray-text">Merci de nous avoir contactés. Nous vous répondrons dans les plus brefs délais.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="bg-white border border-sira-gray-mid rounded-2xl p-6 md:p-8 space-y-5 shadow-card">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-sira-dark mb-1.5">Nom complet *</label>
                  <input id="name" {...register('name')} className="w-full px-4 py-2.5 border border-sira-gray-mid rounded-lg focus:outline-none focus:ring-2 focus:ring-sira-orange" />
                  {errors.name && <p className="text-xs text-red-600 mt-1">{errors.name.message}</p>}
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-sira-dark mb-1.5">Email *</label>
                  <input id="email" type="email" {...register('email')} className="w-full px-4 py-2.5 border border-sira-gray-mid rounded-lg focus:outline-none focus:ring-2 focus:ring-sira-orange" />
                  {errors.email && <p className="text-xs text-red-600 mt-1">{errors.email.message}</p>}
                </div>
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-sira-dark mb-1.5">Sujet *</label>
                <input id="subject" {...register('subject')} className="w-full px-4 py-2.5 border border-sira-gray-mid rounded-lg focus:outline-none focus:ring-2 focus:ring-sira-orange" />
                {errors.subject && <p className="text-xs text-red-600 mt-1">{errors.subject.message}</p>}
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-sira-dark mb-1.5">Message *</label>
                <textarea id="message" rows={6} {...register('message')} className="w-full px-4 py-2.5 border border-sira-gray-mid rounded-lg focus:outline-none focus:ring-2 focus:ring-sira-orange resize-none" />
                {errors.message && <p className="text-xs text-red-600 mt-1">{errors.message.message}</p>}
              </div>
              <button type="submit" disabled={isSubmitting} className="bg-sira-orange hover:bg-sira-orange-dark text-white font-semibold px-6 py-3 rounded-lg transition-colors flex items-center gap-2 disabled:opacity-70">
                {isSubmitting ? <><Loader2 className="h-4 w-4 animate-spin" /> Envoi...</> : 'Envoyer le message'}
              </button>
            </form>
          )}
        </div>

        <aside className="space-y-4">
          {[
            { Icon: MapPin, title: 'Adresse', value: 'Dakar, Sénégal', sub: 'Plateau, Almadies' },
            { Icon: Mail, title: 'Email', value: 'contact@siramag.com', sub: 'Réponse sous 48h' },
            { Icon: Phone, title: 'Téléphone', value: '+221 33 000 00 00', sub: 'Lun–Ven, 9h–18h' },
          ].map(({ Icon, title, value, sub }) => (
            <div key={title} className="bg-white border border-sira-gray-mid rounded-xl p-5 flex gap-4">
              <div className="w-10 h-10 rounded-full bg-sira-orange/10 flex items-center justify-center shrink-0">
                <Icon className="h-5 w-5 text-sira-orange" />
              </div>
              <div>
                <h3 className="font-semibold text-sira-dark text-sm">{title}</h3>
                <p className="text-sira-dark font-medium">{value}</p>
                <p className="text-xs text-sira-gray-text">{sub}</p>
              </div>
            </div>
          ))}
        </aside>
      </div>
    </div>
  );
}
