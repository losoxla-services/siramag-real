'use client';

import { createClient } from '@/lib/supabase/client';
import { useEffect, useState } from 'react';
import ImageUploader from '@/components/admin/ImageUploader';

type Category = { id: string; nom: string };
type Episode = { id: string; titre: string; animatrice: string | null; statut: string; categorie_id: string | null };

export default function AdminPodcastsPage() {
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [titre, setTitre] = useState('');
  const [description, setDescription] = useState('');
  const [animatrice, setAnimatrice] = useState('');
  const [duree, setDuree] = useState('');
  const [numero, setNumero] = useState<number>(1);
  const [categorieId, setCategorieId] = useState('');
  const [imageCover, setImageCover] = useState('');
  const [audioUrl, setAudioUrl] = useState('');
  const [uploadingAudio, setUploadingAudio] = useState(false);
  const supabase = createClient();

  async function load() {
    const { data: cats } = await supabase.from('categories').select('id, nom').eq('slug', 'podcast');
    const podcastCat = cats?.[0];
    // Toutes les sous-catégories de SIRA TV & Hub Audio peuvent accueillir des podcasts
    const { data: parent } = await supabase.from('categories').select('id').eq('slug', 'sira-tv-hub-audio').single();
    const { data: subs } = await supabase.from('categories').select('id, nom').eq('parent_id', parent?.id);
    setCategories(subs ?? []);
    if (!categorieId && subs && subs.length > 0) setCategorieId(subs[0].id);

    const { data } = await supabase.from('podcast_episodes').select('id, titre, animatrice, statut, categorie_id').order('created_at', { ascending: false });
    setEpisodes(data ?? []);
  }
  useEffect(() => { load(); }, []);

  async function handleAudioUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingAudio(true);
    const path = `podcasts/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
    const { error } = await supabase.storage.from('sira-media').upload(path, file);
    if (!error) {
      const { data } = supabase.storage.from('sira-media').getPublicUrl(path);
      setAudioUrl(data.publicUrl);
    }
    setUploadingAudio(false);
  }

  async function publish() {
    if (!titre.trim() || !audioUrl || !categorieId) return;
    await supabase.from('podcast_episodes').insert({
      titre, description, animatrice, duree, numero_episode: numero, categorie_id: categorieId,
      image_cover: imageCover || null, audio_url: audioUrl, statut: 'publié', date_publication: new Date().toISOString(),
    });
    setTitre(''); setDescription(''); setAnimatrice(''); setDuree(''); setImageCover(''); setAudioUrl('');
    load();
  }
  async function remove(id: string) {
    await supabase.from('podcast_episodes').delete().eq('id', id);
    load();
  }

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-sira-dark mb-6">Podcasts</h1>

      <div className="bg-white rounded-xl border border-sira-gray-mid/60 p-5 mb-8 max-w-xl space-y-3">
        <p className="font-semibold text-sm">Nouvel épisode</p>
        <input placeholder="Titre" value={titre} onChange={(e) => setTitre(e.target.value)} className="w-full rounded-lg border border-sira-gray-mid px-3 py-2 text-sm" />
        <textarea placeholder="Description" rows={3} value={description} onChange={(e) => setDescription(e.target.value)} className="w-full rounded-lg border border-sira-gray-mid px-3 py-2 text-sm" />
        <div className="grid grid-cols-3 gap-2">
          <input placeholder="Animatrice" value={animatrice} onChange={(e) => setAnimatrice(e.target.value)} className="rounded-lg border border-sira-gray-mid px-3 py-2 text-sm" />
          <input placeholder="Durée (ex: 32 min)" value={duree} onChange={(e) => setDuree(e.target.value)} className="rounded-lg border border-sira-gray-mid px-3 py-2 text-sm" />
          <input type="number" placeholder="N° épisode" value={numero} onChange={(e) => setNumero(Number(e.target.value))} className="rounded-lg border border-sira-gray-mid px-3 py-2 text-sm" />
        </div>
        <select value={categorieId} onChange={(e) => setCategorieId(e.target.value)} className="w-full rounded-lg border border-sira-gray-mid px-3 py-2 text-sm">
          {categories.map((c) => <option key={c.id} value={c.id}>{c.nom}</option>)}
        </select>
        <ImageUploader value={imageCover} onChange={setImageCover} folder="podcasts" />
        <label className="cursor-pointer inline-block rounded-lg border border-sira-gray-mid px-3 py-2 text-sm hover:border-sira-orange transition-colors">
          {uploadingAudio ? 'Envoi...' : audioUrl ? 'Audio ✓' : 'Fichier audio'}
          <input type="file" accept="audio/*" onChange={handleAudioUpload} disabled={uploadingAudio} className="hidden" />
        </label>
        <button onClick={publish} className="block rounded-lg bg-sira-orange hover:bg-sira-orange-dark text-white text-sm font-semibold px-4 py-2 transition-colors">
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
