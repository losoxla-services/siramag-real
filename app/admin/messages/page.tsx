'use client';

import { createClient } from '@/lib/supabase/client';
import { useEffect, useState } from 'react';

type Msg = { id: string; nom: string; email: string; sujet: string; message: string; lu: boolean; created_at: string };

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<Msg[]>([]);
  const supabase = createClient();

  async function load() {
    const { data } = await supabase.from('contact_messages').select('*').order('created_at', { ascending: false });
    setMessages(data ?? []);
  }
  useEffect(() => { load(); }, []);

  async function markRead(id: string) {
    await supabase.from('contact_messages').update({ lu: true }).eq('id', id);
    load();
  }
  async function remove(id: string) {
    await supabase.from('contact_messages').delete().eq('id', id);
    load();
  }

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-sira-dark mb-6">Messages de contact</h1>
      <div className="space-y-4">
        {messages.map((m) => (
          <div key={m.id} className={`bg-white rounded-xl border p-4 ${m.lu ? 'border-sira-gray-mid/60' : 'border-sira-orange'}`}>
            <div className="flex items-center justify-between mb-1">
              <p className="font-semibold text-sm">{m.sujet}</p>
              {!m.lu && <span className="text-xs font-semibold text-sira-orange">Nouveau</span>}
            </div>
            <p className="text-xs text-sira-gray-text mb-2">{m.nom} — {m.email}</p>
            <p className="text-sm text-sira-gray-dark mb-3">{m.message}</p>
            <div className="flex gap-3 text-sm">
              {!m.lu && <button onClick={() => markRead(m.id)} className="text-sira-orange hover:underline">Marquer comme lu</button>}
              <a href={`mailto:${m.email}`} className="text-sira-teal-dark hover:underline">Répondre</a>
              <button onClick={() => remove(m.id)} className="text-red-600 hover:underline">Supprimer</button>
            </div>
          </div>
        ))}
        {messages.length === 0 && <p className="text-sm text-sira-gray-text">Aucun message.</p>}
      </div>
    </div>
  );
}
