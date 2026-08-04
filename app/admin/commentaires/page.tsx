'use client';

import { createClient } from '@/lib/supabase/client';
import { useEffect, useState } from 'react';

type Comment = { id: string; nom: string; contenu: string; statut: string; articles: { titre: string } | null };

export default function AdminCommentairesPage() {
  const [comments, setComments] = useState<Comment[]>([]);
  const supabase = createClient();

  async function load() {
    const { data } = await supabase
      .from('comments')
      .select('id, nom, contenu, statut, articles:article_id(titre)')
      .order('created_at', { ascending: false });
    setComments((data as unknown as Comment[]) ?? []);
  }

  useEffect(() => {
    load();
  }, []);

  async function updateStatus(id: string, statut: string) {
    await supabase.from('comments').update({ statut }).eq('id', id);
    load();
  }

  async function remove(id: string) {
    await supabase.from('comments').delete().eq('id', id);
    load();
  }

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-sira-dark mb-6">Modération des commentaires</h1>
      <div className="space-y-4">
        {comments.map((c) => (
          <div key={c.id} className="bg-white rounded-xl border border-sira-gray-mid/60 p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-semibold">{c.nom}</p>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-sira-gray text-sira-gray-dark">{c.statut}</span>
            </div>
            <p className="text-sm text-sira-gray-dark mb-2">{c.contenu}</p>
            {c.articles && <p className="text-xs text-sira-gray-text mb-3">Sur : {c.articles.titre}</p>}
            <div className="flex gap-3 text-sm">
              <button onClick={() => updateStatus(c.id, 'approuvé')} className="text-sira-teal-dark hover:underline">Approuver</button>
              <button onClick={() => updateStatus(c.id, 'rejeté')} className="text-sira-gray-text hover:underline">Rejeter</button>
              <button onClick={() => remove(c.id)} className="text-red-600 hover:underline">Supprimer</button>
            </div>
          </div>
        ))}
        {comments.length === 0 && <p className="text-sm text-sira-gray-text">Aucun commentaire.</p>}
      </div>
    </div>
  );
}
