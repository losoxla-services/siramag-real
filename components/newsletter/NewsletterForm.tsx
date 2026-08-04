'use client';

import { useState } from 'react';
import { Mail, CheckCircle2, Loader2, Gift, Bell, Sparkles } from 'lucide-react';

export function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus('loading');
    try {
      const res = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error();
      setStatus('success');
      setEmail('');
      setTimeout(() => setStatus('idle'), 5000);
    } catch {
      setStatus('idle');
      alert("Une erreur est survenue, réessayez.");
    }
  };

  return (
    <>
      <div className="mt-8 bg-white border border-sira-gray-mid rounded-2xl p-6 md:p-8 shadow-card">
        {status === 'success' ? (
          <div className="text-center py-8">
            <CheckCircle2 className="h-14 w-14 text-sira-teal mx-auto mb-4" />
            <h2 className="font-display text-2xl font-bold text-sira-dark mb-2">Inscription confirmée !</h2>
            <p className="text-sira-gray-text">Merci de votre confiance. Surveillez votre boîte mail pour nos prochaines éditions.</p>
          </div>
        ) : (
          <form onSubmit={submit} className="space-y-4">
            <div>
              <label htmlFor="nl-email" className="block text-sm font-medium text-sira-dark mb-1.5">Votre adresse email</label>
              <input
                id="nl-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="vous@exemple.com"
                className="w-full px-4 py-3 border border-sira-gray-mid rounded-lg text-sira-dark focus:outline-none focus:ring-2 focus:ring-sira-orange"
              />
            </div>
            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full bg-sira-orange hover:bg-sira-orange-dark text-white font-semibold py-3.5 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {status === 'loading' ? <><Loader2 className="h-4 w-4 animate-spin" /> Inscription...</> : <>S'abonner gratuitement</>}
            </button>
            <p className="text-xs text-sira-gray-text text-center">
              En vous inscrivant, vous acceptez notre <a href="/politique-de-confidentialite" className="underline hover:text-sira-orange">politique de confidentialité</a>. Désabonnement en un clic.
            </p>
          </form>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
        {[
          { Icon: Sparkles, title: 'Sélection hebdomadaire', desc: 'Le meilleur de nos contenus' },
          { Icon: Bell, title: 'Alertes exclusives', desc: 'Les évènements à ne pas manquer' },
          { Icon: Gift, title: 'Avantages abonnés', desc: 'Offres et contenus premium' },
        ].map(({ Icon, title, desc }) => (
          <div key={title} className="bg-sira-gray/50 rounded-xl p-4 text-center">
            <Icon className="h-7 w-7 text-sira-orange mx-auto mb-2" />
            <h3 className="font-semibold text-sira-dark text-sm">{title}</h3>
            <p className="text-xs text-sira-gray-text mt-1">{desc}</p>
          </div>
        ))}
      </div>
    </>
  );
}
