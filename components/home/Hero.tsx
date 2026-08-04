import Link from 'next/link';
import Image from 'next/image';
import { getFeaturedArticles, getLatestArticles } from '@/lib/content';
import { AdPlaceholder } from '@/components/ads/AdPlaceholder';
import { HeroCarousel } from '@/components/home/HeroCarousel';

export async function Hero() {
  const featured = (await getFeaturedArticles(4));
  const mostRead = await getLatestArticles(4);
  const sideArticles = featured.slice(0, 3);

  if (featured.length === 0) {
    return (
      <section className="container mx-auto max-w-7xl px-4 pt-5 md:pt-6">
        <div className="rounded-xl border border-dashed border-sira-gray-mid p-16 text-center">
          <p className="font-display text-xl text-sira-dark mb-2">Aucun article à la une pour l'instant</p>
          <p className="text-sm text-sira-gray-text">Publie ou marque un article comme "à la une" depuis l'espace admin.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="container mx-auto max-w-7xl px-4 pt-5 md:pt-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <div className="lg:col-span-8 relative">
          <HeroCarousel featured={featured} />
        </div>

        <div className="lg:col-span-4 flex flex-col gap-3">
          {sideArticles.map((a) => (
            <Link key={a.id} href={`/article/${a.slug}`} className="article-card group flex gap-3 bg-white rounded-lg border border-sira-gray-mid/70 p-3 flex-1 min-h-0">
              <div className="relative w-24 h-20 sm:w-28 sm:h-24 shrink-0 rounded-md overflow-hidden">
                <Image src={a.image} alt={a.title} fill className="object-cover group-hover:scale-105 transition-transform" sizes="112px" />
              </div>
              <div className="flex-1 min-w-0 flex flex-col">
                <span className="text-[10px] font-semibold uppercase tracking-wide text-sira-teal truncate">{a.category}</span>
                <h3 className="font-display text-sm font-semibold text-sira-dark group-hover:text-sira-orange transition-colors line-clamp-3 leading-snug flex-1">
                  {a.title}
                </h3>
                <span className="text-xs text-sira-gray-text mt-1">{new Date(a.publishedAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {mostRead.length > 0 && (
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-5">
          <div className="lg:col-span-9 bg-sira-gray rounded-xl p-4 md:p-5">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-1.5 h-5 bg-sira-orange rounded-full" />
              <h3 className="font-display font-bold text-sira-dark">Les Plus Lus</h3>
            </div>
            <ol className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-0 divide-y divide-sira-gray-mid">
              {mostRead.map((a, i) => (
                <li key={a.id} className="py-2.5 flex items-start gap-3">
                  <span className="font-display text-2xl font-bold text-sira-orange/40 w-7 shrink-0 leading-none">{i + 1}</span>
                  <Link href={`/article/${a.slug}`} className="flex-1 group">
                    <h4 className="font-medium text-sm text-sira-dark group-hover:text-sira-orange transition-colors line-clamp-2 leading-snug">{a.title}</h4>
                    <span className="text-xs text-sira-gray-text">{a.category}</span>
                  </Link>
                </li>
              ))}
            </ol>
          </div>
          <div className="lg:col-span-3">
            <AdPlaceholder format="rectangle" />
          </div>
        </div>
      )}
    </section>
  );
}
