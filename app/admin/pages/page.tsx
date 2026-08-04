'use client';

import { createClient } from '@/lib/supabase/client';
import { useEffect, useState } from 'react';

type Page = { id: string; titre: string; slug: string; contenu: string; statut: string };

function slugify(text: string) {
  return text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

export default function AdminPagesPage() {
  const [pages, setPages] = useState<Page[]>([]);
  const [editing, setEditing] = useState<Page | null>(null);
  const [titre, setTitre] = useState('');
  const [contenu, setContenu] = useState('');
  const supabase = createClient();

  async function load() {
    const { data } = await supabase.from('pages').select('*').order('created_at', { ascending: false });
    setPages(data ?? []);
  }
  useEffect(() => { load(); }, []);

  function startEdit(p: Page | null) {
    setEditing(p);
    setTitre(p?.titre ?? '');
    setContenu(p?.contenu ?? '');
  }

  async function save(statut: 'brouillon' | 'publié') {
    if (!titre.trim() || !contenu.trim()) return;
    const payload = { titre, slug: editing?.slug || slugify(titre), contenu, statut, updated_at: new Date().toISOString() };
    if (editing) {
      await supabase.from('pages').update(payload).eq('id', editing.id);
    } else {
      await supabase.from('pages').insert(payload);
    }
    startEdit(null);
    load();
  }
  async function remove(id: string) {
    await supabase.from('pages').delete().eq('id', id);
    load();
  }

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-sira-dark mb-6">Pages</h1>

      <div className="bg-white rounded-xl border border-sira-gray-mid/60 p-5 mb-8 max-w-xl space-y-3">
        <p className="font-semibold text-sm">{editing ? 'Modifier la page' : 'Nouvelle page'}</p>
        <input placeholder="Titre" value={titre} onChange={(e) => setTitre(e.target.value)} className="w-full rounded-lg border border-sira-gray-mid px-3 py-2 text-sm" />
        <textarea placeholder="Contenu" rows={8} value={contenu} onChange={(e) => setContenu(e.target.value)} className="w-full rounded-lg border border-sira-gray-mid px-3 py-2 text-sm" />
        <div className="flex gap-2">
          <button onClick={() => save('brouillon')} className="rounded-lg border border-sira-gray-mid px-4 py-2 text-sm font-semibold hover:border-sira-orange transition-colors">Brouillon</button>
          <button onClick={() => save('publié')} className="rounded-lg bg-sira-orange hover:bg-sira-orange-dark text-white text-sm font-semibold px-4 py-2 transition-colors">Publier</button>
          {editing && <button onClick={() => startEdit(null)} className="text-sm text-sira-gray-text hover:underline">Annuler</button>}
        </div>
      </div>

      <div className="bg-white rounded-xl border border-sira-gray-mid/60 divide-y divide-sira-gray-mid/60">
        {pages.map((p) => (
          <div key={p.id} className="flex items-center justify-between px-4 py-3">
            <div className="min-w-0">
              <p className="font-medium text-sm truncate">{p.titre}</p>
              <p className="text-xs text-sira-gray-text">/{p.slug} — {p.statut}</p>
            </div>
            <div className="flex gap-3 shrink-0">
              <button onClick={() => startEdit(p)} className="text-xs text-sira-orange hover:underline">Modifier</button>
              <button onClick={() => remove(p.id)} className="text-xs text-red-600 hover:underline">Supprimer</button>
            </div>
          </div>
        ))}
        {pages.length === 0 && <p className="px-4 py-8 text-sm text-sira-gray-text text-center">Aucune page.</p>}
      </div>
    </div>
  );
}
