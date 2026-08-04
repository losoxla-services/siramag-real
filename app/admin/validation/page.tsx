'use client';

import { createClient } from '@/lib/supabase/client';
import Link from 'next/link';
import { useEffect, useState } from 'react';

type Article = {
  id: string;
  titre: string;
  extrait: string | null;
  created_at: string;
  profiles: { nom_complet: string | null } | null;
};

export default function AdminValidationPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const supabase = createClient();

  async function load() {
    const { data } = await supabase
      .from('articles')
      .select('id, titre, extrait, created_at, profiles:auteur_id(nom_complet)')
      .eq('statut', 'soumis')
      .order('created_at', { ascending: false });
    setArticles((data as unknown as Article[]) ?? []);
  }

  useEffect(() => {
    load();
  }, []);

  async function publish(id: string, titre: string) {
    const { data: { user } } = await supabase.auth.getUser();
    await supabase.from('articles').update({ statut: 'publié', date_publication: new Date().toISOString() }).eq('id', id);
    await supabase.from('activity_log').insert({ user_id: user?.id, action: 'a publié un article', cible: titre });
    load();
  }

  async function sendBack(id: string) {
    await supabase.from('articles').update({ statut: 'brouillon' }).eq('id', id);
    load();
  }

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-sira-dark mb-2">Validation éditoriale</h1>
      <p className="text-sira-gray-text text-sm mb-6">Articles soumis par les auteurs, en attente de publication.</p>

      <div className="space-y-4">
        {articles.map((a) => (
          <div key={a.id} className="bg-white rounded-xl border border-sira-gray-mid/60 p-4">
            <p className="font-display font-semibold text-sira-dark">{a.titre}</p>
            {a.extrait && <p className="text-sm text-sira-gray-text mt-1">{a.extrait}</p>}
            <p className="text-xs text-sira-gray-text mt-2">Par {a.profiles?.nom_complet || 'un auteur'}</p>
            <div className="flex gap-4 text-sm mt-3">
              <Link href={`/admin/articles/${a.id}/edit`} className="text-sira-orange hover:underline">
                Relire / modifier
              </Link>
              <button onClick={() => publish(a.id, a.titre)} className="text-sira-teal-dark hover:underline font-semibold">
                Publier
              </button>
              <button onClick={() => sendBack(a.id)} className="text-sira-gray-text hover:underline">
                Renvoyer en brouillon
              </button>
            </div>
          </div>
        ))}
        {articles.length === 0 && <p className="text-sm text-sira-gray-text">Rien en attente de validation.</p>}
      </div>
    </div>
  );
}
