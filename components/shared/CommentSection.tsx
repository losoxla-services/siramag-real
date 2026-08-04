'use client';

import { useState } from 'react';

type Comment = { id: string; nom: string; contenu: string };

export default function CommentSection({ articleId, initialComments }: { articleId: string; initialComments: Comment[] }) {
  const [nom, setNom] = useState('');
  const [contenu, setContenu] = useState('');
  const [siteWeb, setSiteWeb] = useState(''); // piège à robots — jamais visible pour un humain
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ article_id: articleId, nom, contenu, site_web: siteWeb }),
      });
      if (!res.ok) throw new Error();
      setStatus('done');
      setNom('');
      setContenu('');
    } catch {
      setStatus('error');
    }
  }

  return (
    <section className="mt-10 pt-8 border-t border-sira-gray-mid">
      <h2 className="font-display text-xl font-bold text-sira-dark mb-4">
        Commentaires {initialComments.length > 0 && `(${initialComments.length})`}
      </h2>

      <div className="space-y-4 mb-8">
        {initialComments.length === 0 && <p className="text-sm text-sira-gray-text">Soyez le premier à commenter.</p>}
        {initialComments.map((c) => (
          <div key={c.id} className="border-l-2 border-sira-orange/30 pl-4">
            <p className="font-semibold text-sm text-sira-dark">{c.nom}</p>
            <p className="text-sira-gray-dark text-sm mt-1">{c.contenu}</p>
          </div>
        ))}
      </div>

      {status === 'done' ? (
        <p className="text-sm text-sira-teal-dark">Merci — votre commentaire sera visible après modération.</p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3 max-w-md">
          <input
            type="text"
            name="site_web"
            value={siteWeb}
            onChange={(e) => setSiteWeb(e.target.value)}
            tabIndex={-1}
            autoComplete="off"
            className="absolute -left-[9999px] w-px h-px opacity-0"
            aria-hidden="true"
          />
          <input
            required
            placeholder="Votre nom"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            className="w-full rounded-lg border border-sira-gray-mid px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sira-orange"
          />
          <textarea
            required
            placeholder="Votre commentaire"
            rows={3}
            value={contenu}
            onChange={(e) => setContenu(e.target.value)}
            className="w-full rounded-lg border border-sira-gray-mid px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sira-orange"
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className="rounded-lg bg-sira-orange hover:bg-sira-orange-dark text-white text-sm font-semibold px-4 py-2 transition-colors disabled:opacity-60"
          >
            {status === 'loading' ? 'Envoi...' : 'Publier'}
          </button>
          {status === 'error' && <p className="text-xs text-red-600">Une erreur est survenue.</p>}
        </form>
      )}
    </section>
  );
}
