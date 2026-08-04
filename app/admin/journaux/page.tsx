import { createClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

export default async function AdminJournauxPage() {
  const supabase = createClient();
  const { data: logs } = await supabase
    .from('activity_log')
    .select('id, action, cible, created_at, profiles:user_id(nom_complet)')
    .order('created_at', { ascending: false })
    .limit(100);

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-sira-dark mb-6">Journaux d'activité</h1>
      <div className="bg-white rounded-xl border border-sira-gray-mid/60 divide-y divide-sira-gray-mid/60">
        {(logs ?? []).map((l: any) => (
          <div key={l.id} className="flex items-center justify-between px-4 py-3 text-sm">
            <div>
              <span className="font-medium">{l.profiles?.nom_complet || 'Système'}</span>
              <span className="text-sira-gray-text"> — {l.action}</span>
              {l.cible && <span className="text-sira-gray-text"> ({l.cible})</span>}
            </div>
            <span className="text-xs text-sira-gray-text shrink-0 ml-3">
              {new Date(l.created_at).toLocaleString('fr-FR')}
            </span>
          </div>
        ))}
        {(!logs || logs.length === 0) && <p className="px-4 py-8 text-sm text-sira-gray-text text-center">Aucune activité enregistrée.</p>}
      </div>
    </div>
  );
}
