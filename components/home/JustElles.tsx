import { getArticlesByCategory } from '@/lib/content';
import { ArticleCard } from '@/components/shared/ArticleCard';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { AdPlaceholder } from '@/components/ads/AdPlaceholder';

export async function JustElles() {
  const display = await getArticlesByCategory('just-elles-impact', 3);
  if (display.length === 0) return null;

  return (
    <section className="bg-sira-gray/50 py-10">
      <div className="container mx-auto max-w-7xl px-4">
        <SectionHeader title="Just'Elles & Impact" href="/just-elles-impact" accent="teal" />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-9 grid grid-cols-1 sm:grid-cols-3 gap-5">
            {display.map((a) => (
              <ArticleCard key={a.id} article={a} />
            ))}
          </div>
          <aside className="lg:col-span-3 space-y-4">
            <div className="bg-sira-teal text-white rounded-xl p-5">
              <h3 className="font-display text-lg font-bold mb-2">SIRA Lab</h3>
              <p className="text-sm text-white/85 mb-4 leading-relaxed">
                Notre laboratoire d'études et de recherches sur les questions de genre en Afrique.
              </p>
              <a href="/just-elles-impact/sira-lab" className="inline-flex items-center text-sm font-semibold bg-white text-sira-teal-dark px-4 py-2 rounded-md hover:bg-white/90 transition-colors">
                Découvrir
              </a>
            </div>
            <AdPlaceholder format="square" />
          </aside>
        </div>
      </div>
    </section>
  );
}
