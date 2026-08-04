'use client';

import { createClient } from '@/lib/supabase/client';
import { useEffect, useState } from 'react';

type Campaign = { id: string; sujet: string; statut: string; created_at: string };

export default function AdminNewsletterPage() {
  const [count, setCount] = useState(0);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [sujet, setSujet] = useState('');
  const [contenu, setContenu] = useState('');
  const [sending, setSending] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const supabase = createClient();

  async function load() {
    const { count: c } = await supabase.from('newsletter_subscribers').select('*', { count: 'exact', head: true });
    setCount(c ?? 0);
    const { data } = await supabase.from('newsletter_campaigns').select('id, sujet, statut, created_at').order('created_at', { ascending: false });
    setCampaigns(data ?? []);
  }
  useEffect(() => { load(); }, []);

  async function createDraft() {
    if (!sujet.trim() || !contenu.trim()) return;
    await supabase.from('newsletter_campaigns').insert({ sujet, contenu_html: contenu, statut: 'brouillon' });
    setSujet(''); setContenu('');
    load();
  }

  async function send(campaignId: string) {
    if (!confirm(`Envoyer cette campagne à ${count} abonné(s) ? Cette action est définitive.`)) return;
    setSending(campaignId);
    setFeedback(null);
    try {
      const res = await fetch('/api/admin/newsletter/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ campaignId }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'Erreur inconnue');
      setFeedback(`Envoyée à ${data.sentCount}/${data.total} abonnés.`);
    } catch (e) {
      setFeedback(e instanceof Error ? e.message : 'Erreur lors de l\'envoi');
    }
    setSending(null);
    load();
  }

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-sira-dark mb-2">Newsletter</h1>
      <p className="text-sira-gray-text text-sm mb-6">{count} abonné{count > 1 ? 's' : ''}</p>

      <div className="bg-white rounded-xl border border-sira-gray-mid/60 p-5 mb-8 max-w-xl space-y-3">
        <p className="font-semibold text-sm">Nouvelle campagne (brouillon)</p>
        <input placeholder="Sujet de l'email" value={sujet} onChange={(e) => setSujet(e.target.value)} className="w-full rounded-lg border border-sira-gray-mid px-3 py-2 text-sm" />
        <textarea placeholder="Contenu (HTML simple accepté)" rows={8} value={contenu} onChange={(e) => setContenu(e.target.value)} className="w-full rounded-lg border border-sira-gray-mid px-3 py-2 text-sm" />
        <button onClick={createDraft} className="rounded-lg bg-sira-orange hover:bg-sira-orange-dark text-white text-sm font-semibold px-4 py-2 transition-colors">
          Enregistrer le brouillon
        </button>
      </div>

      {feedback && <p className="text-sm text-sira-teal-dark mb-4">{feedback}</p>}

      <div className="bg-white rounded-xl border border-sira-gray-mid/60 divide-y divide-sira-gray-mid/60">
        {campaigns.map((c) => (
          <div key={c.id} className="flex items-center justify-between px-4 py-3">
            <p className="text-sm font-medium truncate">{c.sujet}</p>
            <div className="flex items-center gap-3 shrink-0">
              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${c.statut === 'envoyée' ? 'bg-sira-teal/10 text-sira-teal-dark' : 'bg-sira-gray-mid/60 text-sira-gray-dark'}`}>
                {c.statut}
              </span>
              {c.statut === 'brouillon' && (
                <button
                  onClick={() => send(c.id)}
                  disabled={sending === c.id}
                  className="text-xs font-semibold text-sira-orange hover:underline disabled:opacity-50"
                >
                  {sending === c.id ? 'Envoi...' : 'Envoyer'}
                </button>
              )}
            </div>
          </div>
        ))}
        {campaigns.length === 0 && <p className="px-4 py-8 text-sm text-sira-gray-text text-center">Aucune campagne.</p>}
      </div>
    </div>
  );
}
