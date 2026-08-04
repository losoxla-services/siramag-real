import Link from 'next/link';
import Image from 'next/image';
import { getPodcastEpisodes } from '@/lib/content';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { Headphones, Play } from 'lucide-react';

export async function Podcasts() {
  const podcasts = await getPodcastEpisodes(undefined, 4);
  if (podcasts.length === 0) return null;
  return (
    <section className="container mx-auto max-w-7xl px-4 py-10 md:py-12">
      <SectionHeader title="Podcasts" href="/sira-tv-hub-audio/podcast" accent="teal" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {podcasts.map((p) => (
          <Link
            key={p.id}
            href="/sira-tv-hub-audio/podcast"
            className="article-card group bg-white rounded-xl overflow-hidden border border-sira-gray-mid/60 flex flex-col"
          >
            <div className="relative aspect-square overflow-hidden">
              <Image src={p.image} alt={p.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(min-width: 1024px) 300px, 50vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <span className="absolute top-3 left-3 bg-sira-teal text-white text-xs font-semibold px-2 py-1 rounded flex items-center gap-1">
                <Headphones className="h-3 w-3" /> Ép. {p.episode}
              </span>
              <span className="absolute bottom-3 right-3 bg-sira-orange w-10 h-10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <Play className="h-4 w-4 text-white" fill="white" />
              </span>
            </div>
            <div className="p-4 flex-1 flex flex-col">
              <span className="text-[11px] uppercase tracking-wide text-sira-teal font-semibold mb-1">{p.category}</span>
              <h3 className="font-display text-sm font-semibold text-sira-dark group-hover:text-sira-orange transition-colors line-clamp-2 leading-snug flex-1">
                {p.title}
              </h3>
              <div className="flex items-center gap-2 mt-2 text-xs text-sira-gray-text">
                <span>{p.duration}</span>
                <span>•</span>
                <span>Par {p.host}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
