'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Clock } from 'lucide-react';
import { CategoryBadge } from '@/components/shared/CategoryBadge';
import type { Article } from '@/lib/content';

export function HeroCarousel({ featured }: { featured: Article[] }) {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => setCurrent((c) => (c + 1) % featured.length), [featured.length]);
  const prev = useCallback(() => setCurrent((c) => (c - 1 + featured.length) % featured.length), [featured.length]);

  useEffect(() => {
    if (paused || featured.length <= 1) return;
    const id = setInterval(next, 5000);
    return () => clearInterval(id);
  }, [paused, next, featured.length]);

  if (featured.length === 0) return null;

  return (
    <div className="relative aspect-[16/10] md:aspect-[16/9] rounded-xl overflow-hidden" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      {featured.map((a, i) => (
        <div
          key={a.id}
          className={`absolute inset-0 transition-opacity duration-700 ${i === current ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
          aria-hidden={i !== current}
        >
          <Link href={`/article/${a.slug}`} className="block h-full">
            <Image src={a.image} alt={a.title} fill className="object-cover" sizes="(min-width: 1024px) 800px, 100vw" priority={i === 0} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-5 md:p-7">
              <CategoryBadge category={a.category} categorySlug={a.categorySlug} size="md" className="mb-3" />
              <h2 className="font-display text-xl md:text-3xl font-bold text-white line-clamp-2 md:line-clamp-3 leading-tight mb-2">
                {a.title}
              </h2>
              <p className="text-white/80 text-sm line-clamp-2 mb-3 hidden md:block">{a.excerpt}</p>
              <div className="flex items-center gap-4 text-xs text-white/70">
                <span>{new Date(a.publishedAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}</span>
                <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{a.readingTime} min</span>
              </div>
            </div>
          </Link>
        </div>
      ))}

      {featured.length > 1 && (
        <>
          <div className="absolute bottom-4 right-4 flex items-center gap-1.5 z-10">
            {featured.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                aria-label={`Slide ${i + 1}`}
                className={`carousel-dot ${i === current ? 'active' : ''}`}
              />
            ))}
          </div>
          <button
            onClick={prev}
            aria-label="Précédent"
            className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/20 hover:bg-sira-orange text-white flex items-center justify-center backdrop-blur-sm transition-colors"
          >
            <ArrowRight className="h-4 w-4 rotate-180" />
          </button>
          <button
            onClick={next}
            aria-label="Suivant"
            className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/20 hover:bg-sira-orange text-white flex items-center justify-center backdrop-blur-sm transition-colors"
          >
            <ArrowRight className="h-4 w-4" />
          </button>
        </>
      )}
    </div>
  );
}
