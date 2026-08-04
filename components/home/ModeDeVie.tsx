import { getArticlesByCategory } from '@/lib/content';
import { ArticleCard } from '@/components/shared/ArticleCard';
import { SectionHeader } from '@/components/shared/SectionHeader';

export async function ModeDeVie() {
  const display = await getArticlesByCategory('mode-de-vie', 3);
  if (display.length === 0) return null;

  return (
    <section className="bg-sira-gray/50 py-10">
      <div className="container mx-auto max-w-7xl px-4">
        <SectionHeader title="Mode de Vie" href="/mode-de-vie" accent="orange" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {display.map((a) => (
            <ArticleCard key={a.id} article={a} />
          ))}
        </div>
      </div>
    </section>
  );
}
