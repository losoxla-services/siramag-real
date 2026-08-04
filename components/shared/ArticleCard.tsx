import Link from 'next/link';
import Image from 'next/image';
import { Clock, Play, Headphones } from 'lucide-react';
import { CategoryBadge } from './CategoryBadge';
import { getAuthor } from '@/lib/content';
import type { Article } from '@/lib/content';

interface ArticleCardProps {
  article: Article;
  variant?: 'default' | 'large' | 'horizontal' | 'compact' | 'overlay';
  priority?: boolean;
}

function fmt(iso: string) {
  return new Date(iso).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' });
}

export async function ArticleCard({ article, variant = 'default', priority = false }: ArticleCardProps) {
  const author = variant === 'large' ? await getAuthor(article.authorId) : undefined;
  const href = `/article/${article.slug}`;
  const typeIcon = article.type === 'video' ? <Play className="h-4 w-4" fill="white" /> : article.type === 'podcast' ? <Headphones className="h-4 w-4" /> : null;

  if (variant === 'horizontal') {
    return (
      <article className="article-card flex gap-4 bg-white rounded-lg overflow-hidden border border-sira-gray-mid/60">
        <Link href={href} className="relative w-28 sm:w-36 h-24 sm:h-28 shrink-0 overflow-hidden">
          <Image src={article.image} alt={article.title} fill className="object-cover" sizes="144px" />
          {typeIcon && <span className="absolute inset-0 flex items-center justify-center bg-black/30"><span className="bg-sira-orange/90 w-8 h-8 rounded-full flex items-center justify-center">{typeIcon}</span></span>}
        </Link>
        <div className="flex-1 py-2 pr-2">
          <CategoryBadge category={article.category} categorySlug={article.categorySlug} className="mb-1.5" />
          <Link href={href}>
            <h3 className="font-display font-semibold text-sira-dark hover:text-sira-orange transition-colors line-clamp-2 text-sm sm:text-base leading-snug">{article.title}</h3>
          </Link>
          <div className="flex items-center gap-3 mt-2 text-xs text-sira-gray-text">
            <span>{fmt(article.publishedAt)}</span>
            <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{article.readingTime} min</span>
          </div>
        </div>
      </article>
    );
  }

  if (variant === 'compact') {
    return (
      <article className="article-card group">
        <Link href={href} className="relative block w-20 h-20 float-left mr-3 mb-1 overflow-hidden rounded-md">
          <Image src={article.image} alt={article.title} fill className="object-cover group-hover:scale-105 transition-transform" sizes="80px" />
        </Link>
        <CategoryBadge category={article.category} categorySlug={article.categorySlug} className="mb-1" />
        <Link href={href}>
          <h3 className="font-display text-sm font-semibold text-sira-dark group-hover:text-sira-orange transition-colors line-clamp-3 leading-snug">{article.title}</h3>
        </Link>
        <div className="clear-both" />
      </article>
    );
  }

  if (variant === 'overlay') {
    return (
      <article className="article-card relative rounded-xl overflow-hidden h-full min-h-[280px] group">
        <Link href={href} className="block h-full">
          <Image src={article.image} alt={article.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(min-width: 1024px) 600px, 100vw" priority={priority} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
            <CategoryBadge category={article.category} categorySlug={article.categorySlug} className="mb-2" />
            <h3 className="font-display text-lg md:text-2xl font-bold text-white line-clamp-3 group-hover:text-sira-orange-light transition-colors">{article.title}</h3>
            <div className="flex items-center gap-3 mt-2 text-xs text-white/80">
              <span>{fmt(article.publishedAt)}</span>
              <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{article.readingTime} min</span>
            </div>
          </div>
          {typeIcon && <span className="absolute top-4 right-4 bg-sira-orange w-10 h-10 rounded-full flex items-center justify-center">{typeIcon}</span>}
        </Link>
      </article>
    );
  }

  if (variant === 'large') {
    return (
      <article className="article-card group bg-white rounded-xl overflow-hidden border border-sira-gray-mid/60">
        <Link href={href} className="relative block aspect-[16/10] overflow-hidden">
          <Image src={article.image} alt={article.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(min-width: 1024px) 800px, 100vw" priority={priority} />
          {typeIcon && <span className="absolute bottom-4 right-4 bg-sira-orange w-11 h-11 rounded-full flex items-center justify-center shadow-lg">{typeIcon}</span>}
        </Link>
        <div className="p-5">
          <CategoryBadge category={article.category} categorySlug={article.categorySlug} className="mb-2" />
          <Link href={href}>
            <h3 className="font-display text-xl md:text-2xl font-bold text-sira-dark group-hover:text-sira-orange transition-colors line-clamp-3 leading-tight">{article.title}</h3>
          </Link>
          <p className="mt-2 text-sm text-sira-gray-text line-clamp-2 leading-relaxed">{article.excerpt}</p>
          <div className="flex items-center gap-3 mt-4 pt-4 border-t border-sira-gray-mid/50 text-xs text-sira-gray-text">
            {author && <span className="flex items-center gap-2"><Image src={author.avatar} alt={author.name} width={24} height={24} className="rounded-full object-cover" /><span className="font-medium text-sira-dark">{author.name}</span></span>}
            <span className="ml-auto flex items-center gap-1"><Clock className="h-3 w-3" />{article.readingTime} min</span>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="article-card group bg-white rounded-xl overflow-hidden border border-sira-gray-mid/60 h-full flex flex-col">
      <Link href={href} className="relative block aspect-[16/10] overflow-hidden">
        <Image src={article.image} alt={article.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(min-width: 768px) 400px, 100vw" priority={priority} />
        {typeIcon && <span className="absolute bottom-3 right-3 bg-sira-orange w-9 h-9 rounded-full flex items-center justify-center shadow-lg">{typeIcon}</span>}
      </Link>
      <div className="p-4 flex flex-col flex-1">
        <CategoryBadge category={article.category} categorySlug={article.categorySlug} className="mb-2" />
        <Link href={href} className="flex-1">
          <h3 className="font-display text-base font-semibold text-sira-dark group-hover:text-sira-orange transition-colors line-clamp-3 leading-snug">{article.title}</h3>
        </Link>
        <div className="flex items-center gap-3 mt-3 text-xs text-sira-gray-text">
          <span>{fmt(article.publishedAt)}</span>
          <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{article.readingTime} min</span>
        </div>
      </div>
    </article>
  );
}
