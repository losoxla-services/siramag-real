'use client';

import { useState } from 'react';
import { Mail, CheckCircle2, Loader2 } from 'lucide-react';

export function Newsletter() {
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
      setTimeout(() => setStatus('idle'), 4000);
    } catch {
      setStatus('idle');
      alert("Une erreur est survenue, réessayez.");
    }
  };

  return (
    <section className="bg-sira-dark text-white py-12 md:py-16">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-sira-orange/20 text-sira-orange-light px-3 py-1.5 rounded-full text-sm font-semibold mb-4">
              <Mail className="h-4 w-4" /> Newsletter
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-3">Recevez le meilleur de SIRA MAG</h2>
            <p className="text-white/70 max-w-md">
              Une sélection d'articles, podcasts et vidéos sur les femmes qui font l'Afrique.
              Chaque semaine, directement dans votre boîte mail.
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 md:p-8">
            {status === 'success' ? (
              <div className="text-center py-8">
                <CheckCircle2 className="h-12 w-12 text-sira-teal-light mx-auto mb-3" />
                <h3 className="font-display text-xl font-bold mb-1">Inscription confirmée !</h3>
                <p className="text-sm text-white/70">Merci. Surveillez votre boîte mail.</p>
              </div>
            ) : (
              <form onSubmit={submit} className="space-y-3">
                <label htmlFor="newsletter-email" className="block text-sm font-medium text-white/80">Votre adresse email</label>
                <input
                  id="newsletter-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="vous@exemple.com"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-sira-orange"
                />
                <button type="submit" disabled={status === 'loading'} className="w-full bg-sira-orange hover:bg-sira-orange-dark text-white font-semibold py-3 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-70">
                  {status === 'loading' ? <><Loader2 className="h-4 w-4 animate-spin" /> Inscription...</> : <>S'abonner gratuitement</>}
                </button>
                <p className="text-xs text-white/50 text-center">En vous inscrivant, vous acceptez notre politique de confidentialité.</p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
