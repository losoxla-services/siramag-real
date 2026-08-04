'use client';

import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import ImageUploader from '@/components/admin/ImageUploader';
import { sanitizeHtml } from '@/lib/sanitizeHtml';

type Subcategory = { id: string; nom: string; parentNom: string };

type ArticleData = {
  id?: string;
  titre: string;
  slug: string;
  extrait: string;
  contenu: string;
  image_cover: string;
  categorie_id: string;
  tags: string;
  featured: boolean;
  temps_lecture: number;
  statut: string;
};

function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

// Convertit un texte brut en paragraphes HTML simples (le contenu est affiché en HTML sur le site)
function toHtml(text: string) {
  if (/<[a-z][\s\S]*>/i.test(text)) return text; // déjà du HTML
  return text
    .split(/\n{2,}/)
    .map((p) => `<p>${p.replace(/\n/g, '<br/>')}</p>`)
    .join('\n');
}

export default function ArticleForm({
  subcategories,
  initial,
}: {
  subcategories: Subcategory[];
  initial?: ArticleData;
}) {
  const [form, setForm] = useState<ArticleData>(
    initial ?? {
      titre: '',
      slug: '',
      extrait: '',
      contenu: '',
      image_cover: '',
      categorie_id: subcategories[0]?.id ?? '',
      tags: '',
      featured: false,
      temps_lecture: 5,
      statut: 'brouillon',
    }
  );
  const [role, setRole] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(async ({ data: { user } }) => {
      if (!user) return;
      const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single();
      setRole(profile?.role ?? null);
    });
  }, []);

  const canPublish = role === 'admin' || role === 'superviseur';

  async function handleSave(action: 'brouillon' | 'soumettre' | 'publier') {
    setLoading(true);
    setError(null);
    const supabase = createClient();

    const statut = action === 'brouillon' ? 'brouillon' : action === 'soumettre' ? 'soumis' : 'publié';

    const {
      data: { user },
    } = await supabase.auth.getUser();

    const payload = {
      titre: form.titre,
      slug: form.slug || slugify(form.titre),
      extrait: form.extrait,
      contenu: sanitizeHtml(toHtml(form.contenu)),
      image_cover: form.image_cover,
      categorie_id: form.categorie_id,
      tags: form.tags.split(',').map((t) => t.trim()).filter(Boolean),
      featured: form.featured,
      temps_lecture: form.temps_lecture,
      statut,
      date_publication: statut === 'publié' ? new Date().toISOString() : null,
      ...(initial?.id ? {} : { auteur_id: user?.id }),
    };

    const { error } = initial?.id
      ? await supabase.from('articles').update(payload).eq('id', initial.id)
      : await supabase.from('articles').insert(payload);

    setLoading(false);
    if (error) {
      setError(error.message);
      return;
    }
    router.push('/admin/articles');
    router.refresh();
  }

  return (
    <div className="space-y-4 max-w-3xl">
      <input
        placeholder="Titre de l'article"
        value={form.titre}
        onChange={(e) => setForm({ ...form, titre: e.target.value })}
        className="w-full rounded-lg border border-sira-gray-mid px-3 py-2.5 text-lg font-display font-semibold focus:outline-none focus:ring-2 focus:ring-sira-orange"
      />

      <div className="grid sm:grid-cols-2 gap-4">
        <select
          value={form.categorie_id}
          onChange={(e) => setForm({ ...form, categorie_id: e.target.value })}
          className="rounded-lg border border-sira-gray-mid px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-sira-orange"
        >
          {subcategories.map((s) => (
            <option key={s.id} value={s.id}>
              {s.parentNom} — {s.nom}
            </option>
          ))}
        </select>
        <input
          type="number"
          min={1}
          placeholder="Temps de lecture (min)"
          value={form.temps_lecture}
          onChange={(e) => setForm({ ...form, temps_lecture: Number(e.target.value) })}
          className="rounded-lg border border-sira-gray-mid px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-sira-orange"
        />
      </div>

      <ImageUploader value={form.image_cover} onChange={(url) => setForm({ ...form, image_cover: url })} />

      <input
        placeholder="Extrait (résumé court)"
        value={form.extrait}
        onChange={(e) => setForm({ ...form, extrait: e.target.value })}
        className="w-full rounded-lg border border-sira-gray-mid px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-sira-orange"
      />

      <textarea
        placeholder="Contenu complet — un saut de ligne double sépare les paragraphes"
        rows={14}
        value={form.contenu}
        onChange={(e) => setForm({ ...form, contenu: e.target.value })}
        className="w-full rounded-lg border border-sira-gray-mid px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-sira-orange"
      />

      <input
        placeholder="Mots-clés séparés par des virgules (ex: entrepreneuriat, femmes, économie)"
        value={form.tags}
        onChange={(e) => setForm({ ...form, tags: e.target.value })}
        className="w-full rounded-lg border border-sira-gray-mid px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-sira-orange"
      />

      {canPublish && (
        <label className="flex items-center gap-2 text-sm text-sira-gray-dark">
          <input
            type="checkbox"
            checked={form.featured}
            onChange={(e) => setForm({ ...form, featured: e.target.checked })}
          />
          Mettre à la une (carrousel d'accueil)
        </label>
      )}

      <div className="flex items-center gap-3 flex-wrap pt-2">
        <button
          onClick={() => handleSave('brouillon')}
          disabled={loading || !form.titre || !form.contenu}
          className="rounded-lg border border-sira-gray-mid hover:border-sira-orange transition-colors px-5 py-2.5 font-semibold text-sm disabled:opacity-50"
        >
          {loading ? '...' : 'Enregistrer (brouillon)'}
        </button>
        {canPublish ? (
          <button
            onClick={() => handleSave('publier')}
            disabled={loading || !form.titre || !form.contenu}
            className="rounded-lg bg-sira-orange hover:bg-sira-orange-dark transition-colors px-5 py-2.5 font-semibold text-sm text-white disabled:opacity-50"
          >
            {loading ? '...' : 'Publier maintenant'}
          </button>
        ) : (
          <button
            onClick={() => handleSave('soumettre')}
            disabled={loading || !form.titre || !form.contenu}
            className="rounded-lg bg-sira-orange hover:bg-sira-orange-dark transition-colors px-5 py-2.5 font-semibold text-sm text-white disabled:opacity-50"
          >
            {loading ? '...' : 'Soumettre à validation'}
          </button>
        )}
        {error && <p className="text-sm text-red-600">{error}</p>}
      </div>
      {!canPublish && (
        <p className="text-xs text-sira-gray-text">
          Un superviseur ou l'administrateur devra valider ton article avant publication.
        </p>
      )}
    </div>
  );
}
