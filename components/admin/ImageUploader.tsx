'use client';

import { createClient } from '@/lib/supabase/client';
import { useState } from 'react';

export default function ImageUploader({
  value,
  onChange,
  folder = 'covers',
}: {
  value: string;
  onChange: (url: string) => void;
  folder?: string;
}) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError(null);
    const supabase = createClient();
    const path = `${folder}/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
    const { error: uploadError } = await supabase.storage.from('sira-media').upload(path, file, {
      cacheControl: '3600',
      upsert: false,
    });
    if (uploadError) {
      setError("Échec de l'upload : " + uploadError.message);
      setUploading(false);
      return;
    }
    const { data } = supabase.storage.from('sira-media').getPublicUrl(path);
    onChange(data.publicUrl);
    setUploading(false);
  }

  return (
    <div>
      <label className="block text-sm font-medium text-sira-gray-dark mb-1.5">Image de couverture</label>
      <div className="flex items-center gap-3">
        {value && <img src={value} alt="Aperçu" className="h-14 w-14 rounded object-cover border border-sira-gray-mid" />}
        <label className="cursor-pointer rounded-lg border border-sira-gray-mid px-3 py-2 text-sm hover:border-sira-orange transition-colors">
          {uploading ? 'Envoi en cours...' : value ? "Changer l'image" : 'Choisir depuis mon disque'}
          <input type="file" accept="image/*" onChange={handleFile} disabled={uploading} className="hidden" />
        </label>
      </div>
      {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
    </div>
  );
}
