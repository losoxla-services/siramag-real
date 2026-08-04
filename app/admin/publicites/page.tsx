'use client';

import { createClient } from '@/lib/supabase/client';
import { useEffect, useState } from 'react';
import ImageUploader from '@/components/admin/ImageUploader';

type Ad = { id: string; nom: string; image_url: string; lien_url: string; emplacement: string; actif: boolean };
const EMPLACEMENTS = ['leaderboard', 'billboard', 'sidebar', 'in-article', 'rectangle', 'square'];

export default function AdminPublicitesPage() {
  const [ads, setAds] = useState<Ad[]>([]);
  const [nom, setNom] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [lienUrl, setLienUrl] = useState('');
  const [emplacement, setEmplacement] = useState(EMPLACEMENTS[0]);
  const supabase = createClient();

  async function load() {
    const { data } = await supabase.from('ads').select('*').order('created_at', { ascending: false });
    setAds(data ?? []);
  }
  useEffect(() => { load(); }, []);

  async function create() {
    if (!nom.trim() || !imageUrl || !lienUrl.trim()) return;
    await supabase.from('ads').insert({ nom, image_url: imageUrl, lien_url: lienUrl, emplacement, actif: true });
    setNom(''); setImageUrl(''); setLienUrl('');
    load();
  }
  async function toggle(ad: Ad) {
    await supabase.from('ads').update({ actif: !ad.actif }).eq('id', ad.id);
    load();
  }
  async function remove(id: string) {
    await supabase.from('ads').delete().eq('id', id);
    load();
  }

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-sira-dark mb-6">Publicités</h1>

      <div className="bg-white rounded-xl border border-sira-gray-mid/60 p-5 mb-8 max-w-md space-y-3">
        <p className="font-semibold text-sm">Nouvelle publicité</p>
        <input placeholder="Nom (ex: Teyliom Properties)" value={nom} onChange={(e) => setNom(e.target.value)} className="w-full rounded-lg border border-sira-gray-mid px-3 py-2 text-sm" />
        <ImageUploader value={imageUrl} onChange={setImageUrl} folder="ads" />
        <input placeholder="Lien de destination" value={lienUrl} onChange={(e) => setLienUrl(e.target.value)} className="w-full rounded-lg border border-sira-gray-mid px-3 py-2 text-sm" />
        <select value={emplacement} onChange={(e) => setEmplacement(e.target.value)} className="w-full rounded-lg border border-sira-gray-mid px-3 py-2 text-sm">
          {EMPLACEMENTS.map((e) => <option key={e} value={e}>{e}</option>)}
        </select>
        <button onClick={create} className="rounded-lg bg-sira-orange hover:bg-sira-orange-dark text-white text-sm font-semibold px-4 py-2 transition-colors">Créer</button>
      </div>

      <div className="bg-white rounded-xl border border-sira-gray-mid/60 divide-y divide-sira-gray-mid/60">
        {ads.map((ad) => (
          <div key={ad.id} className="flex items-center gap-3 px-4 py-3">
            <img src={ad.image_url} alt={ad.nom} className="h-10 w-16 object-cover rounded" />
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm truncate">{ad.nom}</p>
              <p className="text-xs text-sira-gray-text">{ad.emplacement}</p>
            </div>
            <button onClick={() => toggle(ad)} className={`text-xs font-semibold px-3 py-1 rounded-full ${ad.actif ? 'bg-sira-teal/10 text-sira-teal-dark' : 'bg-sira-gray-mid/60 text-sira-gray-dark'}`}>
              {ad.actif ? 'Active' : 'Inactive'}
            </button>
            <button onClick={() => remove(ad.id)} className="text-xs text-red-600 hover:underline">Suppr.</button>
          </div>
        ))}
        {ads.length === 0 && <p className="px-4 py-8 text-sm text-sira-gray-text text-center">Aucune publicité.</p>}
      </div>
    </div>
  );
}
