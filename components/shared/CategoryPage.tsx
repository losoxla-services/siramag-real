import { ArticleCard } from '@/components/shared/ArticleCard';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { Breadcrumb } from '@/components/shared/Breadcrumb';
import { AdPlaceholder } from '@/components/ads/AdPlaceholder';
import { getArticlesByCategory, getArticlesBySubCategory, getLatestArticles } from '@/lib/content';
import { navigation } from '@/lib/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';

interface CategoryPageProps {
  categorySlug: string;
  subcategorySlug?: string;
}

export async function CategoryPage({ categorySlug, subcategorySlug }: CategoryPageProps) {
  const navItem = navigation.find((n) => n.href === `/${categorySlug}`);
  const isSub = !!subcategorySlug;

  const items = isSub
    ? await getArticlesBySubCategory(categorySlug, subcategorySlug!)
    : await getArticlesByCategory(categorySlug);

  const displayItems = items;
  const plusLus = await getLatestArticles(4);
  const main = displayItems[0];
  const rest = displayItems.slice(1);

  const categoryName = navItem?.label || categorySlug;
  const subItem = navItem?.subItems?.find((s) => s.href === `/${categorySlug}/${subcategorySlug}`);
  const subName = subItem?.label;

  const title = isSub ? `${subName} — ${categoryName}` : categoryName;

  const crumbs: { label: string; href?: string }[] = [{ label: categoryName, href: `/${categorySlug}` }];
  if (isSub) crumbs.push({ label: subName || subcategorySlug! });

  return (
    <div className="container mx-auto max-w-7xl px-4 py-6 md:py-8">
      <Breadcrumb items={crumbs} />

      <header className="mt-6 mb-8">
        <div className="flex items-center gap-3 mb-2">
          <span className="w-1.5 h-8 bg-sira-orange rounded-full" />
          <h1 className="font-display text-3xl md:text-4xl font-bold text-sira-dark">
            {isSub ? subName : categoryName}
          </h1>
        </div>
        {navItem?.subItems && !isSub && (
          <div className="flex flex-wrap gap-2 mt-4">
            {navItem.subItems.map((s) => (
              <Link
                key={s.href}
                href={s.href}
                className="inline-flex items-center px-3 py-1.5 bg-sira-gray hover:bg-sira-orange hover:text-white text-sira-dark text-sm font-medium rounded-full transition-colors"
              >
                {s.label}
              </Link>
            ))}
          </div>
        )}
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-8">
          {main && <ArticleCard article={main} variant="large" priority />}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {rest.map((a) => (
              <ArticleCard key={a.id} article={a} />
            ))}
          </div>
          {displayItems.length === 0 && (
            <div className="text-center py-16 text-sira-gray-text">
              <p className="font-display text-xl mb-2">Aucun article pour le moment</p>
              <p className="text-sm">Cette rubrique sera bientôt alimentée. Revenez bientôt !</p>
            </div>
          )}
        </div>

        <aside className="lg:col-span-4 space-y-6">
          <AdPlaceholder format="rectangle" />
          {navItem?.subItems && (
            <div className="bg-white rounded-xl border border-sira-gray-mid/60 p-5">
              <h3 className="font-display font-bold text-sira-dark mb-3">Sous-rubriques</h3>
              <ul className="space-y-1">
                {navItem.subItems.map((s) => (
                  <li key={s.href}>
                    <Link
                      href={s.href}
                      className="block py-2 px-3 -mx-3 rounded-md text-sm text-sira-gray-dark hover:bg-sira-gray hover:text-sira-orange transition-colors"
                    >
                      {s.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div>
            <SectionHeader title="Les plus lus" accent="teal" />
            <div className="space-y-4">
              {plusLus.map((a) => (
                <ArticleCard key={a.id} article={a} variant="compact" />
              ))}
            </div>
          </div>
          <AdPlaceholder format="rectangle" />
        </aside>
      </div>

      <div className="mt-10">
        <AdPlaceholder format="leaderboard" />
      </div>
    </div>
  );
}

export function generateCategoryMetadata(categorySlug: string, subcategorySlug?: string): Metadata {
  const navItem = navigation.find((n) => n.href === `/${categorySlug}`);
  const subItem = navItem?.subItems?.find((s) => s.href === `/${categorySlug}/${subcategorySlug}`);
  const title = subcategorySlug ? `${subItem?.label} | ${navItem?.label}` : navItem?.label;
  return {
    title: `${title} | SIRA MAG`,
    description: `Toute l'actualité ${title} sur SIRA MAG, le média panafricain qui célèbre les femmes.`,
    openGraph: { title: `${title} | SIRA MAG`, type: 'website' },
  };
}
