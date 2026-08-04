import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { getArticleBySlug, getAuthor, getRelatedArticles, getAllPublishedSlugs } from '@/lib/content';
import { createClient } from '@/lib/supabase/server';
import { Breadcrumb } from '@/components/shared/Breadcrumb';
import { CategoryBadge } from '@/components/shared/CategoryBadge';
import { ArticleCard } from '@/components/shared/ArticleCard';
import { AdPlaceholder } from '@/components/ads/AdPlaceholder';
import CommentSection from '@/components/shared/CommentSection';
import { sanitizeHtml } from '@/lib/sanitizeHtml';
import { Clock, Calendar, Share2, Facebook, Twitter, Link2, ArrowLeft, Tag } from 'lucide-react';
import type { Metadata } from 'next';

interface PageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  const slugs = await getAllPublishedSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const article = await getArticleBySlug(params.slug);
  if (!article) return { title: 'Article introuvable' };
  const author = await getAuthor(article.authorId);
  return {
    title: article.title,
    description: article.excerpt,
    openGraph: {
      type: 'article',
      title: article.title,
      description: article.excerpt,
      url: `https://siramag.com/article/${article.slug}`,
      images: [{ url: article.image, width: 1200, height: 630, alt: article.title }],
      publishedTime: article.publishedAt,
      authors: [author?.name || 'SIRA MAG'],
    },
    twitter: { card: 'summary_large_image', title: article.title, description: article.excerpt, images: [article.image] },
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const article = await getArticleBySlug(params.slug);
  if (!article) notFound();

  const author = await getAuthor(article.authorId);
  const related = await getRelatedArticles(article);

  // Suivi des vues pour le tableau de bord Statistiques — best-effort, ne bloque jamais l'affichage
  createClient().from('page_views').insert({ chemin: `/article/${article.slug}` }).then(() => {});

  const { data: comments } = await createClient()
    .from('comments')
    .select('id, nom, contenu')
    .eq('article_id', article.id)
    .eq('statut', 'approuvé')
    .order('created_at', { ascending: false });

  const formatDate = (iso: string) => new Date(iso).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt,
    image: article.image,
    datePublished: article.publishedAt,
    author: { '@type': 'Person', name: author?.name },
    publisher: { '@type': 'Organization', name: 'SIRA MAG' },
    keywords: article.tags.join(', '),
  };

  return (
    <article>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="container mx-auto max-w-7xl px-4 py-6 md:py-8">
        <Breadcrumb items={[
          { label: article.category, href: `/${article.categorySlug}` },
          ...(article.subcategorySlug ? [{ label: article.subcategory!, href: `/${article.categorySlug}/${article.subcategorySlug}` }] : []),
          { label: article.title },
        ]} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6">
          <div className="lg:col-span-8">
            <header className="mb-6">
              <CategoryBadge category={article.category} categorySlug={article.categorySlug} size="md" className="mb-3" />
              <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-sira-dark leading-tight mb-4">
                {article.title}
              </h1>
              <p className="text-lg text-sira-gray-text leading-relaxed mb-5">{article.excerpt}</p>

              <div className="flex items-center justify-between flex-wrap gap-4 pb-5 border-b border-sira-gray-mid">
                <div className="flex items-center gap-3">
                  {author && (
                    <Link href={`/auteurs/${author.id}`} className="flex items-center gap-3 group">
                      <Image src={author.avatar} alt={author.name} width={44} height={44} className="rounded-full object-cover" />
                      <div>
                        <p className="font-semibold text-sira-dark group-hover:text-sira-orange transition-colors text-sm">{author.name}</p>
                        <p className="text-xs text-sira-gray-text">{author.role}</p>
                      </div>
                    </Link>
                  )}
                </div>
                <div className="flex items-center gap-4 text-sm text-sira-gray-text">
                  <span className="flex items-center gap-1.5"><Calendar className="h-4 w-4" />{formatDate(article.publishedAt)}</span>
                  <span className="flex items-center gap-1.5"><Clock className="h-4 w-4" />{article.readingTime} min</span>
                </div>
              </div>
            </header>

            <div className="relative aspect-[16/9] rounded-xl overflow-hidden mb-6">
              <Image src={article.image} alt={article.title} fill className="object-cover" sizes="(min-width: 1024px) 800px, 100vw" priority />
            </div>

            <div className="flex items-center gap-2 mb-6">
              <span className="text-sm font-medium text-sira-gray-dark">Partager :</span>
              {[
                { Icon: Facebook, label: 'Facebook' },
                { Icon: Twitter, label: 'Twitter' },
                { Icon: Link2, label: 'Copier le lien' },
              ].map(({ Icon, label }) => (
                <button key={label} aria-label={label} className="w-9 h-9 flex items-center justify-center rounded-full bg-sira-gray hover:bg-sira-orange hover:text-white text-sira-dark transition-colors">
                  <Icon className="h-4 w-4" />
                </button>
              ))}
            </div>

            <div className="article-prose text-sira-dark leading-relaxed" dangerouslySetInnerHTML={{ __html: sanitizeHtml(article.content) }} />

            <div className="mt-8 pt-6 border-t border-sira-gray-mid">
              <h3 className="text-sm font-semibold text-sira-gray-dark mb-3 flex items-center gap-2">
                <Tag className="h-4 w-4" /> Mots-clés
              </h3>
              <div className="flex flex-wrap gap-2">
                {article.tags.map((tag) => (
                  <Link key={tag} href={`/recherche?q=${encodeURIComponent(tag)}`} className="px-3 py-1 bg-sira-gray hover:bg-sira-orange hover:text-white text-sira-gray-dark text-sm rounded-full transition-colors">
                    #{tag}
                  </Link>
                ))}
              </div>
            </div>

            {author && (
              <div className="mt-8 bg-sira-gray/60 rounded-xl p-6 flex gap-4">
                <Image src={author.avatar} alt={author.name} width={64} height={64} className="rounded-full object-cover shrink-0" />
                <div>
                  <p className="text-xs text-sira-gray-text mb-1">Écrit par</p>
                  <Link href={`/auteurs/${author.id}`} className="font-display text-lg font-bold text-sira-dark hover:text-sira-orange transition-colors">{author.name}</Link>
                  <p className="text-sm text-sira-gray-text mt-1">{author.bio}</p>
                </div>
              </div>
            )}
          </div>

          <aside className="lg:col-span-4 space-y-6">
            <AdPlaceholder format="rectangle" />
            <div>
              <h3 className="font-display font-bold text-sira-dark mb-4 flex items-center gap-2">
                <span className="w-1 h-5 bg-sira-orange rounded-full" /> À lire aussi
              </h3>
              <div className="space-y-4">
                {related.map((a) => (
                  <ArticleCard key={a.id} article={a} variant="horizontal" />
                ))}
              </div>
            </div>
            <AdPlaceholder format="rectangle" />
          </aside>
        </div>

        {related.length > 0 && (
          <section className="mt-12 pt-8 border-t border-sira-gray-mid">
            <h2 className="font-display text-2xl font-bold text-sira-dark mb-6">Articles similaires</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((a) => (
                <ArticleCard key={a.id} article={a} />
              ))}
            </div>
          </section>
        )}

        <CommentSection articleId={article.id} initialComments={comments ?? []} />

        <div className="mt-10">
          <Link href={`/${article.categorySlug}`} className="inline-flex items-center gap-2 text-sira-orange font-semibold hover:gap-3 transition-all">
            <ArrowLeft className="h-4 w-4" /> Retour à {article.category}
          </Link>
        </div>
      </div>
    </article>
  );
}
