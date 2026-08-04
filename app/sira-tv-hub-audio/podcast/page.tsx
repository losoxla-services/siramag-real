import Link from 'next/link';
import Image from 'next/image';
import { getPodcastEpisodes } from '@/lib/content';
import { Breadcrumb } from '@/components/shared/Breadcrumb';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { AdPlaceholder } from '@/components/ads/AdPlaceholder';
import { Headphones, Play, Clock } from 'lucide-react';

export const metadata = {
  title: "SIRA Podcast | SIRA MAG",
  description: "Tous les podcasts de SIRA MAG : conversations inspirantes avec les femmes qui font l'Afrique.",
};

export default async function PodcastPage() {
  const podcasts = await getPodcastEpisodes('podcast');
  return (
    <div className="container mx-auto max-w-7xl px-4 py-6 md:py-8">
      <Breadcrumb items={[{ label: "SIRA TV & Hub Audio", href: "/sira-tv-hub-audio" }, { label: "SIRA Podcast" }]} />

      <header className="mt-6 mb-8">
        <div className="flex items-center gap-3 mb-2">
          <span className="w-1.5 h-8 bg-sira-teal rounded-full" />
          <h1 className="font-display text-3xl md:text-4xl font-bold text-sira-dark">SIRA Podcast</h1>
        </div>
        <p className="text-sira-gray-text max-w-2xl">Conversations, témoignages et analyses audio. Écoutez les voix qui font l'Afrique au féminin.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8">
          <SectionHeader title="Tous les épisodes" accent="teal" />
          {podcasts.length === 0 && (
            <p className="text-sira-gray-text py-8">Aucun épisode publié pour l'instant.</p>
          )}
          <div className="space-y-4">
            {podcasts.map((p) => (
              <Link
                key={p.id}
                href="/sira-tv-hub-audio/podcast"
                className="article-card group flex gap-4 bg-white rounded-xl overflow-hidden border border-sira-gray-mid/60 p-4"
              >
                <div className="relative w-28 h-28 sm:w-32 sm:h-32 shrink-0 rounded-lg overflow-hidden">
                  <Image src={p.image} alt={p.title} fill className="object-cover" sizes="128px" />
                  <span className="absolute inset-0 flex items-center justify-center bg-black/40">
                    <span className="bg-sira-orange w-10 h-10 rounded-full flex items-center justify-center">
                      <Play className="h-4 w-4 text-white" fill="white" />
                    </span>
                  </span>
                </div>
                <div className="flex-1 flex flex-col">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="inline-flex items-center gap-1 bg-sira-teal text-white text-[11px] font-semibold px-2 py-0.5 rounded">
                      <Headphones className="h-3 w-3" /> Ép. {p.episode}
                    </span>
                    <span className="text-xs text-sira-gray-text">{p.category}</span>
                  </div>
                  <h3 className="font-display font-semibold text-sira-dark group-hover:text-sira-orange transition-colors line-clamp-2 leading-snug">{p.title}</h3>
                  <p className="text-sm text-sira-gray-text mt-1 line-clamp-2 flex-1">{p.description}</p>
                  <div className="flex items-center gap-3 mt-2 text-xs text-sira-gray-text">
                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{p.duration}</span>
                    <span>Par {p.host}</span>
                    <span className="ml-auto">{new Date(p.date).toLocaleDateString('fr-FR')}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <aside className="lg:col-span-4 space-y-6">
          <AdPlaceholder format="rectangle" />
          <div className="bg-sira-teal text-white rounded-xl p-5">
            <Headphones className="h-8 w-8 mb-3" />
            <h3 className="font-display text-lg font-bold mb-2">Écoutez partout</h3>
            <p className="text-sm text-white/85 mb-4">Retrouvez SIRA Podcast sur Spotify, Apple Podcasts, Deezer et Google Podcasts.</p>
            <div className="flex flex-wrap gap-2">
              <span className="text-xs bg-white/15 px-3 py-1.5 rounded-full">Spotify</span>
              <span className="text-xs bg-white/15 px-3 py-1.5 rounded-full">Apple</span>
              <span className="text-xs bg-white/15 px-3 py-1.5 rounded-full">Deezer</span>
            </div>
          </div>
          <AdPlaceholder format="rectangle" />
        </aside>
      </div>
    </div>
  );
}
