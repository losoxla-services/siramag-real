import { searchArticles } from '@/lib/content';
import { ArticleCard } from '@/components/shared/ArticleCard';
import { Breadcrumb } from '@/components/shared/Breadcrumb';
import { Search as SearchIcon } from 'lucide-react';

interface PageProps {
  searchParams: { q?: string };
}

export const metadata = {
  title: 'Recherche | SIRA MAG',
  description: 'Recherchez un article, un thème ou un mot-clé sur SIRA MAG.',
};

export default async function SearchPage({ searchParams }: PageProps) {
  const submitted = (searchParams.q || '').trim();
  const results = submitted ? await searchArticles(submitted) : [];

  return (
    <div className="container mx-auto max-w-7xl px-4 py-6 md:py-8">
      <Breadcrumb items={[{ label: 'Recherche' }]} />

      <header className="mt-6 mb-8">
        <div className="flex items-center gap-3 mb-2">
          <span className="w-1.5 h-8 bg-sira-orange rounded-full" />
          <h1 className="font-display text-3xl md:text-4xl font-bold text-sira-dark">Recherche</h1>
        </div>
        <p className="text-sira-gray-text">Trouvez un article, un thème ou un mot-clé sur SIRA MAG.</p>
      </header>

      <form action="/recherche" method="get" className="flex gap-2 max-w-2xl mb-8">
        <div className="relative flex-1">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-sira-gray-text" />
          <input
            type="search"
            name="q"
            defaultValue={submitted}
            placeholder="Que recherchez-vous ?"
            className="w-full pl-11 pr-4 py-3 border border-sira-gray-mid rounded-lg text-sira-dark focus:outline-none focus:ring-2 focus:ring-sira-orange"
            aria-label="Termes de recherche"
            autoFocus
          />
        </div>
        <button type="submit" className="bg-sira-orange hover:bg-sira-orange-dark text-white font-semibold px-6 rounded-lg transition-colors flex items-center gap-2">
          <SearchIcon className="h-4 w-4" />
          Rechercher
        </button>
      </form>

      {submitted ? (
        <>
          <p className="text-sm text-sira-gray-text mb-6">
            {results.length > 0
              ? `${results.length} résultat${results.length > 1 ? 's' : ''} pour « ${submitted} »`
              : `Aucun résultat pour « ${submitted} »`}
          </p>
          {results.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {results.map((a) => (
                <ArticleCard key={a.id} article={a} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <SearchIcon className="h-12 w-12 text-sira-gray-mid mx-auto mb-3" />
              <p className="font-display text-xl text-sira-dark mb-2">Aucun résultat</p>
              <p className="text-sm text-sira-gray-text">Essayez avec d'autres mots-clés ou explorez nos rubriques.</p>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-16">
          <SearchIcon className="h-12 w-12 text-sira-gray-mid mx-auto mb-3" />
          <p className="font-display text-xl text-sira-dark mb-2">Recherchez sur SIRA MAG</p>
          <p className="text-sm text-sira-gray-text">Saisissez un mot-clé ci-dessus pour commencer.</p>
        </div>
      )}
    </div>
  );
}
