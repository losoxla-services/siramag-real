'use client';

import { createClient } from '@/lib/supabase/client';
import { useEffect, useState } from 'react';

type Profile = { id: string; nom_complet: string | null; role: string; created_at: string };
const ROLES = ['lecteur', 'contributeur', 'journaliste', 'superviseur', 'admin'];
const LABELS: Record<string, string> = {
  lecteur: 'Lecteur',
  contributeur: 'Contributeur',
  journaliste: 'Auteur',
  superviseur: 'Superviseur',
  admin: 'Administrateur Général',
};

export default function AdminUtilisateursPage() {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const supabase = createClient();

  async function load() {
    const { data } = await supabase.from('profiles').select('id, nom_complet, role, created_at').order('created_at', { ascending: false });
    setProfiles(data ?? []);
  }

  useEffect(() => {
    load();
  }, []);

  async function changeRole(id: string, role: string, nom: string | null) {
    const { data: { user } } = await supabase.auth.getUser();
    await supabase.from('profiles').update({ role }).eq('id', id);
    await supabase.from('activity_log').insert({ user_id: user?.id, action: `a changé le rôle en "${LABELS[role]}"`, cible: nom || id });
    load();
  }

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-sira-dark mb-2">Utilisateurs</h1>
      <p className="text-sira-gray-text text-sm mb-6">Un Auteur ne peut publier qu'après validation d'un Superviseur ou de l'Administrateur.</p>

      <div className="bg-white rounded-xl border border-sira-gray-mid/60 divide-y divide-sira-gray-mid/60">
        {profiles.map((p) => (
          <div key={p.id} className="flex items-center justify-between gap-3 px-4 py-3">
            <div className="min-w-0">
              <p className="font-medium text-sira-dark truncate">{p.nom_complet || 'Sans nom'}</p>
              <p className="text-xs text-sira-gray-text truncate">{p.id}</p>
            </div>
            <select
              value={p.role}
              onChange={(e) => changeRole(p.id, e.target.value, p.nom_complet)}
              className="rounded-md border border-sira-gray-mid px-2 py-1.5 text-sm shrink-0"
            >
              {ROLES.map((r) => (
                <option key={r} value={r}>{LABELS[r]}</option>
              ))}
            </select>
          </div>
        ))}
        {profiles.length === 0 && <p className="px-4 py-8 text-sm text-sira-gray-text text-center">Aucun utilisateur.</p>}
      </div>
    </div>
  );
}
