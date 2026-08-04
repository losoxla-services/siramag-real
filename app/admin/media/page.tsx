'use client';

import { createClient } from '@/lib/supabase/client';
import { useEffect, useState } from 'react';

type FileItem = { name: string; path: string; url: string; folder: string };
const FOLDERS = ['covers', 'sira-tv', 'podcasts', 'ads', 'pages'];

export default function AdminMediaPage() {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState<string | null>(null);
  const supabase = createClient();

  async function load() {
    setLoading(true);
    const all: FileItem[] = [];
    for (const folder of FOLDERS) {
      const { data } = await supabase.storage.from('sira-media').list(folder, { sortBy: { column: 'created_at', order: 'desc' } });
      for (const item of data ?? []) {
        if (!item.name) continue;
        const path = `${folder}/${item.name}`;
        const { data: urlData } = supabase.storage.from('sira-media').getPublicUrl(path);
        all.push({ name: item.name, path, url: urlData.publicUrl, folder });
      }
    }
    setFiles(all);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  async function copyUrl(url: string) {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(url);
      setTimeout(() => setCopied(null), 2000);
    } catch {}
  }

  async function remove(item: FileItem) {
    if (!confirm(`Supprimer "${item.name}" ?`)) return;
    await supabase.storage.from('sira-media').remove([item.path]);
    load();
  }

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-sira-dark mb-2">Médiathèque</h1>
      <p className="text-sira-gray-text text-sm mb-6">Tous les fichiers déjà envoyés — copie un lien pour le réutiliser.</p>

      {loading ? (
        <p className="text-sm text-sira-gray-text">Chargement...</p>
      ) : files.length === 0 ? (
        <p className="text-sm text-sira-gray-text">Aucun fichier envoyé pour l'instant.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {files.map((f) => (
            <div key={f.path} className="bg-white rounded-lg border border-sira-gray-mid/60 overflow-hidden">
              <div className="aspect-square bg-sira-gray">
                <img src={f.url} alt={f.name} className="h-full w-full object-cover" />
              </div>
              <div className="p-2">
                <p className="text-xs truncate mb-1.5" title={f.name}>{f.name}</p>
                <div className="flex gap-2">
                  <button onClick={() => copyUrl(f.url)} className="text-xs text-sira-orange hover:underline">
                    {copied === f.url ? 'Copié ✓' : 'Copier'}
                  </button>
                  <button onClick={() => remove(f)} className="text-xs text-red-600 hover:underline">
                    Suppr.
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
