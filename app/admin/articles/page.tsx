import { createClient } from '@/lib/supabase/server';
import { getCurrentStaff } from '@/lib/admin/session';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

const STATUT_STYLE: Record<string, string> = {
  publié: 'bg-sira-teal/10 text-sira-teal-dark',
  soumis: 'bg-sira-orange/10 text-sira-orange-dark',
  brouillon: 'bg-sira-gray-mid/60 text-sira-gray-dark',
};

export default async function AdminArticlesPage() {
  const staff = await getCurrentStaff();
  const supabase = createClient();

  let query = supabase
    .from('articles')
    .select('id, titre, slug, statut, created_at, categorie:categorie_id(nom)')
    .order('created_at', { ascending: false });

  if (staff?.role === 'journaliste') {
    query = query.eq('auteur_id', staff.id);
  }

  const { data: articles } = await query;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-2xl font-bold text-sira-dark">Articles</h1>
        <Link href="/admin/articles/new" className="rounded-lg bg-sira-orange hover:bg-sira-orange-dark text-white text-sm font-semibold px-4 py-2.5 transition-colors">
          + Nouvel article
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-sira-gray-mid/60 divide-y divide-sira-gray-mid/60">
        {(articles ?? []).map((a: any) => (
          <div key={a.id} className="flex items-center justify-between gap-3 px-4 py-3">
            <div className="min-w-0">
              <p className="font-medium text-sira-dark truncate">{a.titre}</p>
              <p className="text-xs text-sira-gray-text truncate">{a.categorie?.nom}</p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <span className={`text-xs font-semibold px-3 py-1 rounded-full ${STATUT_STYLE[a.statut]}`}>{a.statut}</span>
              <Link href={`/admin/articles/${a.id}/edit`} className="text-sm text-sira-orange hover:underline">
                Modifier
              </Link>
            </div>
          </div>
        ))}
        {(!articles || articles.length === 0) && (
          <p className="px-4 py-8 text-sm text-sira-gray-text text-center">Aucun article pour l'instant.</p>
        )}
      </div>
    </div>
  );
}
