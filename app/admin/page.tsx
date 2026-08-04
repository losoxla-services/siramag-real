import { createClient } from '@/lib/supabase/server';
import { getCurrentStaff } from '@/lib/admin/session';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  const staff = await getCurrentStaff();
  const supabase = createClient();
  const isAdmin = staff?.role === 'admin';

  const [
    { count: articlesCount },
    { count: publishedCount },
    { count: soumisCount },
    { count: categoriesCount },
  ] = await Promise.all([
    supabase.from('articles').select('*', { count: 'exact', head: true }),
    supabase.from('articles').select('*', { count: 'exact', head: true }).eq('statut', 'publié'),
    supabase.from('articles').select('*', { count: 'exact', head: true }).eq('statut', 'soumis'),
    supabase.from('categories').select('*', { count: 'exact', head: true }),
  ]);

  let adminStats: Record<string, number> = {};
  if (isAdmin) {
    const [
      { count: usersCount },
      { count: adsCount },
      { count: podcastsCount },
      { count: videosCount },
      { count: viewsCount },
      { count: subsCount },
    ] = await Promise.all([
      supabase.from('profiles').select('*', { count: 'exact', head: true }),
      supabase.from('ads').select('*', { count: 'exact', head: true }),
      supabase.from('podcast_episodes').select('*', { count: 'exact', head: true }),
      supabase.from('video_episodes').select('*', { count: 'exact', head: true }),
      supabase.from('page_views').select('*', { count: 'exact', head: true }),
      supabase.from('newsletter_subscribers').select('*', { count: 'exact', head: true }),
    ]);
    adminStats = {
      utilisateurs: usersCount ?? 0,
      publicites: adsCount ?? 0,
      podcasts: podcastsCount ?? 0,
      videos: videosCount ?? 0,
      vues: viewsCount ?? 0,
      abonnes: subsCount ?? 0,
    };
  }

  const cards = [
    { label: 'Articles', value: articlesCount ?? 0 },
    { label: 'Publiés', value: publishedCount ?? 0 },
    { label: 'En attente de validation', value: soumisCount ?? 0 },
    { label: 'Catégories', value: categoriesCount ?? 0 },
    ...(isAdmin
      ? [
          { label: 'Utilisateurs', value: adminStats.utilisateurs },
          { label: 'Publicités', value: adminStats.publicites },
          { label: 'Podcasts', value: adminStats.podcasts },
          { label: 'Vidéos SIRA TV', value: adminStats.videos },
          { label: 'Vues (total)', value: adminStats.vues },
          { label: 'Abonnés newsletter', value: adminStats.abonnes },
        ]
      : []),
  ];

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-sira-dark mb-6">Tableau de bord</h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
        {cards.map((c) => (
          <div key={c.label} className="bg-white rounded-xl border border-sira-gray-mid/60 p-4">
            <p className="text-2xl font-display font-bold text-sira-dark">{c.value}</p>
            <p className="text-xs text-sira-gray-text mt-1">{c.label}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-3">
        <Link href="/admin/articles/new" className="rounded-lg bg-sira-orange hover:bg-sira-orange-dark text-white text-sm font-semibold px-4 py-2.5 transition-colors">
          + Nouvel article
        </Link>
        {(staff?.role === 'superviseur' || isAdmin) && soumisCount! > 0 && (
          <Link href="/admin/validation" className="rounded-lg bg-white border border-sira-gray-mid text-sira-dark text-sm font-semibold px-4 py-2.5 hover:border-sira-orange transition-colors">
            {soumisCount} article{soumisCount! > 1 ? 's' : ''} en attente de validation
          </Link>
        )}
      </div>
    </div>
  );
}
