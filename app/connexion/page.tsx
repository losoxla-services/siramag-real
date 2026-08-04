'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      setError('Email ou mot de passe incorrect.');
      return;
    }
    router.push('/admin');
    router.refresh();
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <h1 className="font-display text-2xl font-bold text-sira-dark mb-1">Espace éditorial</h1>
        <p className="text-sira-gray-text text-sm mb-6">SIRA MAG — panel d'administration</p>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            required
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border border-sira-gray-mid px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-sira-orange"
          />
          <input
            required
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg border border-sira-gray-mid px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-sira-orange"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-sira-orange hover:bg-sira-orange-dark transition-colors px-4 py-2.5 font-semibold text-white disabled:opacity-60"
          >
            {loading ? 'Connexion...' : 'Se connecter'}
          </button>
          {error && <p className="text-sm text-red-600">{error}</p>}
        </form>
      </div>
    </div>
  );
}
