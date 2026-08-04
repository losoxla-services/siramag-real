import { createClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

export default async function AdminStatistiquesPage() {
  const supabase = createClient();

  const since7 = new Date(Date.now() - 7 * 86400000).toISOString();
  const since30 = new Date(Date.now() - 30 * 86400000).toISOString();

  const [{ count: total }, { count: last7 }, { count: last30 }, { data: recentPaths }] = await Promise.all([
    supabase.from('page_views').select('*', { count: 'exact', head: true }),
    supabase.from('page_views').select('*', { count: 'exact', head: true }).gte('created_at', since7),
    supabase.from('page_views').select('*', { count: 'exact', head: true }).gte('created_at', since30),
    supabase.from('page_views').select('chemin').gte('created_at', since30).limit(2000),
  ]);

  const counts: Record<string, number> = {};
  (recentPaths ?? []).forEach((r: any) => {
    counts[r.chemin] = (counts[r.chemin] ?? 0) + 1;
  });
  const topPages = Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 10);

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-sira-dark mb-6">Statistiques</h1>

      <div className="grid grid-cols-3 gap-4 mb-8 max-w-xl">
        <div className="bg-white rounded-xl border border-sira-gray-mid/60 p-4">
          <p className="text-2xl font-display font-bold text-sira-dark">{total ?? 0}</p>
          <p className="text-xs text-sira-gray-text mt-1">Vues (total)</p>
        </div>
        <div className="bg-white rounded-xl border border-sira-gray-mid/60 p-4">
          <p className="text-2xl font-display font-bold text-sira-dark">{last7 ?? 0}</p>
          <p className="text-xs text-sira-gray-text mt-1">7 derniers jours</p>
        </div>
        <div className="bg-white rounded-xl border border-sira-gray-mid/60 p-4">
          <p className="text-2xl font-display font-bold text-sira-dark">{last30 ?? 0}</p>
          <p className="text-xs text-sira-gray-text mt-1">30 derniers jours</p>
        </div>
      </div>

      <h2 className="font-display text-lg font-semibold text-sira-dark mb-3">Pages les plus vues (30 jours)</h2>
      <div className="bg-white rounded-xl border border-sira-gray-mid/60 divide-y divide-sira-gray-mid/60 max-w-xl">
        {topPages.map(([path, n]) => (
          <div key={path} className="flex items-center justify-between px-4 py-2.5 text-sm">
            <span className="truncate">{path}</span>
            <span className="font-semibold text-sira-orange shrink-0 ml-3">{n}</span>
          </div>
        ))}
        {topPages.length === 0 && <p className="px-4 py-8 text-sm text-sira-gray-text text-center">Pas encore de données.</p>}
      </div>
    </div>
  );
}
