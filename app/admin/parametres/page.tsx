'use client';

import { createClient } from '@/lib/supabase/client';
import { useEffect, useState } from 'react';

export default function AdminParametresPage() {
  const [channelId, setChannelId] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'saved'>('idle');
  const supabase = createClient();

  useEffect(() => {
    supabase.from('site_settings').select('youtube_channel_id').eq('id', 1).single().then(({ data }) => {
      setChannelId(data?.youtube_channel_id ?? '');
    });
  }, []);

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setStatus('loading');
    await supabase.from('site_settings').update({ youtube_channel_id: channelId.trim() }).eq('id', 1);
    setStatus('saved');
  }

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-sira-dark mb-6">Paramètres</h1>
      <form onSubmit={save} className="max-w-md space-y-3">
        <label className="block text-sm font-medium text-sira-gray-dark">Chaîne YouTube (ID) — pour SIRA TV en direct</label>
        <input
          placeholder="Ex : UCxxxxxxxxxxxxxxxxxxxxxxxx"
          value={channelId}
          onChange={(e) => setChannelId(e.target.value)}
          className="w-full rounded-lg border border-sira-gray-mid px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-sira-orange"
        />
        <button type="submit" className="rounded-lg bg-sira-orange hover:bg-sira-orange-dark text-white text-sm font-semibold px-5 py-2.5 transition-colors">
          {status === 'loading' ? 'Enregistrement...' : 'Enregistrer'}
        </button>
        {status === 'saved' && <p className="text-sm text-sira-teal-dark">Enregistré.</p>}
      </form>
    </div>
  );
}
