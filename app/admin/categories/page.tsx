'use client';

import { createClient } from '@/lib/supabase/client';
import { useEffect, useState } from 'react';

type Category = { id: string; nom: string; slug: string; parent_id: string | null; ordre: number };

function slugify(text: string) {
  return text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [newParentNom, setNewParentNom] = useState('');
  const [newSubNom, setNewSubNom] = useState<Record<string, string>>({});
  const supabase = createClient();

  async function load() {
    const { data } = await supabase.from('categories').select('*').order('ordre');
    setCategories(data ?? []);
  }

  useEffect(() => {
    load();
  }, []);

  const parents = categories.filter((c) => !c.parent_id);
  const subsOf = (parentId: string) => categories.filter((c) => c.parent_id === parentId);

  async function addParent() {
    if (!newParentNom.trim()) return;
    await supabase.from('categories').insert({ nom: newParentNom.trim(), slug: slugify(newParentNom), ordre: parents.length + 1 });
    setNewParentNom('');
    load();
  }

  async function addSub(parentId: string) {
    const nom = newSubNom[parentId];
    if (!nom?.trim()) return;
    await supabase.from('categories').insert({ nom: nom.trim(), slug: slugify(nom), parent_id: parentId, ordre: subsOf(parentId).length + 1 });
    setNewSubNom({ ...newSubNom, [parentId]: '' });
    load();
  }

  async function remove(id: string) {
    if (!confirm('Supprimer cette catégorie ? Les sous-catégories et articles liés seront affectés.')) return;
    await supabase.from('categories').delete().eq('id', id);
    load();
  }

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-sira-dark mb-6">Catégories</h1>

      <div className="flex gap-2 mb-8 max-w-md">
        <input
          placeholder="Nouvelle rubrique principale"
          value={newParentNom}
          onChange={(e) => setNewParentNom(e.target.value)}
          className="flex-1 rounded-lg border border-sira-gray-mid px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sira-orange"
        />
        <button onClick={addParent} className="rounded-lg bg-sira-orange hover:bg-sira-orange-dark text-white text-sm font-semibold px-4 transition-colors">
          Ajouter
        </button>
      </div>

      <div className="space-y-4">
        {parents.map((p) => (
          <div key={p.id} className="bg-white rounded-xl border border-sira-gray-mid/60 p-4">
            <div className="flex items-center justify-between mb-3">
              <p className="font-display font-semibold text-sira-dark">{p.nom}</p>
              <button onClick={() => remove(p.id)} className="text-xs text-red-600 hover:underline">
                Supprimer
              </button>
            </div>
            <ul className="space-y-1.5 mb-3">
              {subsOf(p.id).map((s) => (
                <li key={s.id} className="flex items-center justify-between text-sm pl-3 border-l-2 border-sira-gray-mid">
                  <span>{s.nom}</span>
                  <button onClick={() => remove(s.id)} className="text-xs text-red-600 hover:underline">
                    Suppr.
                  </button>
                </li>
              ))}
            </ul>
            <div className="flex gap-2">
              <input
                placeholder="Nouvelle sous-catégorie"
                value={newSubNom[p.id] ?? ''}
                onChange={(e) => setNewSubNom({ ...newSubNom, [p.id]: e.target.value })}
                className="flex-1 rounded-md border border-sira-gray-mid px-2.5 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-sira-orange"
              />
              <button onClick={() => addSub(p.id)} className="text-xs rounded-md bg-sira-gray hover:bg-sira-orange hover:text-white px-3 py-1.5 transition-colors">
                Ajouter
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
