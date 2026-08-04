'use client';

import { createClient } from '@/lib/supabase/client';
import { useEffect, useState } from 'react';
import ImageUploader from '@/components/admin/ImageUploader';

type Category = { id: string; nom: string };
type Episode = { id: string; titre: string; statut: string };

export default function AdminSiraTVPage() {
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [titre, setTitre] = useState('');
  const [description, setDescription] = useState('');
  const [duree, setDuree] = useState('');
  const [categorieId, setCategorieId] = useState('');
  const [imageCover, setImageCover] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const supabase = createClient();

  async function load() {
    const { data: parent } = await supabase.from('categories').select('id').eq('slug', 'sira-tv-hub-audio').single();
    const { data: subs } = await supabase.from('categories').select('id, nom').eq('parent_id', parent?.id);
    setCategories(subs ?? []);
    if (!categorieId && subs && subs.length > 0) setCategorieId(subs[0].id);

    const { data } = await supabase.from('video_episodes').select('id, titre, statut').order('created_at', { ascending: false });
    setEpisodes(data ?? []);
  }
  useEffect(() => { load(); }, []);

  async function publish() {
    if (!titre.trim() || !videoUrl || !categorieId) return;
    await supabase.from('video_episodes').insert({
      titre, description, duree, categorie_id: categorieId,
      image_cover: imageCover || null, video_url: videoUrl, statut: 'publié', date_publication: new Date().toISOString(),
    });
    setTitre(''); setDescription(''); setDuree(''); setImageCover(''); setVideoUrl('');
    load();
  }
  async function remove(id: string) {
    await supabase.from('video_episodes').delete().eq('id', id);
    load();
  }

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-sira-dark mb-6">SIRA TV</h1>

      <div className="bg-white rounded-xl border border-sira-gray-mid/60 p-5 mb-8 max-w-xl space-y-3">
        <p className="font-semibold text-sm">Nouvel épisode vidéo</p>
        <input placeholder="Titre" value={titre} onChange={(e) => setTitre(e.target.value)} className="w-full rounded-lg border border-sira-gray-mid px-3 py-2 text-sm" />
        <textarea placeholder="Description" rows={3} value={description} onChange={(e) => setDescription(e.target.value)} className="w-full rounded-lg border border-sira-gray-mid px-3 py-2 text-sm" />
        <input placeholder="Durée (ex: 45 min)" value={duree} onChange={(e) => setDuree(e.target.value)} className="w-full rounded-lg border border-sira-gray-mid px-3 py-2 text-sm" />
        <select value={categorieId} onChange={(e) => setCategorieId(e.target.value)} className="w-full rounded-lg border border-sira-gray-mid px-3 py-2 text-sm">
          {categories.map((c) => <option key={c.id} value={c.id}>{c.nom}</option>)}
        </select>
        <ImageUploader value={imageCover} onChange={setImageCover} folder="sira-tv" />
        <input placeholder="Lien vidéo (YouTube/Vimeo) ou URL de fichier" value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)} className="w-full rounded-lg border border-sira-gray-mid px-3 py-2 text-sm" />
        <button onClick={publish} className="rounded-lg bg-sira-orange hover:bg-sira-orange-dark text-white text-sm font-semibold px-4 py-2 transition-colors">
          Publier l'épisode
        </button>
      </div>

      <div className="bg-white rounded-xl border border-sira-gray-mid/60 divide-y divide-sira-gray-mid/60">
        {episodes.map((ep) => (
          <div key={ep.id} className="flex items-center justify-between px-4 py-3">
            <p className="font-medium text-sm truncate">{ep.titre}</p>
            <button onClick={() => remove(ep.id)} className="text-xs text-red-600 hover:underline">Supprimer</button>
          </div>
        ))}
        {episodes.length === 0 && <p className="px-4 py-8 text-sm text-sira-gray-text text-center">Aucun épisode.</p>}
      </div>
    </div>
  );
}
