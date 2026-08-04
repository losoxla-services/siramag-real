import { getArticlesByCategory } from '@/lib/content';
import { ArticleCard } from '@/components/shared/ArticleCard';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { AdPlaceholder } from '@/components/ads/AdPlaceholder';

export async function ActuElles() {
  const display = await getArticlesByCategory('actu-elles', 6);
  if (display.length === 0) return null;

  return (
    <section className="container mx-auto max-w-7xl px-4">
      <SectionHeader title="Actu'Elles" href="/actu-elles" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {display.map((a) => (
          <ArticleCard key={a.id} article={a} />
        ))}
      </div>
      <div className="mt-6">
        <AdPlaceholder format="leaderboard" />
      </div>
    </section>
  );
}
