import Link from 'next/link';
import Image from 'next/image';
import { getVideoEpisodes, getPodcastEpisodes } from '@/lib/content';
import { Breadcrumb } from '@/components/shared/Breadcrumb';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { AdPlaceholder } from '@/components/ads/AdPlaceholder';
import { Play, Eye, Headphones, Clock } from 'lucide-react';

export async function SiraTvHubAudioPage() {
  const videos = await getVideoEpisodes(undefined, 4);
  const podcasts = await getPodcastEpisodes(undefined, 4);
  const mainVideo = videos[0];
  const otherVideos = videos.slice(1);
  if (!mainVideo) {
    return (
      <div className="container mx-auto max-w-7xl px-4 py-20 text-center text-sira-gray-text">
        <p className="font-display text-xl mb-2">Aucun contenu publié pour l'instant</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-7xl px-4 py-6 md:py-8">
      <Breadcrumb items={[{ label: "SIRA TV & Hub Audio" }]} />

      <header className="mt-6 mb-8">
        <div className="flex items-center gap-3 mb-2">
          <span className="w-1.5 h-8 bg-sira-orange rounded-full" />
          <h1 className="font-display text-3xl md:text-4xl font-bold text-sira-dark">SIRA TV & Hub Audio</h1>
        </div>
        <p className="text-sira-gray-text max-w-2xl">
          Talk-shows, podcasts, reportages et documentaires. Toute la production audiovisuelle de SIRA MAG.
        </p>
        <div className="flex flex-wrap gap-2 mt-4">
          <Link href="/sira-tv-hub-audio/talk-show" className="px-3 py-1.5 bg-sira-gray hover:bg-sira-orange hover:text-white text-sira-dark text-sm font-medium rounded-full transition-colors">SIRA MAG (Le Talk-Show)</Link>
          <Link href="/sira-tv-hub-audio/podcast" className="px-3 py-1.5 bg-sira-gray hover:bg-sira-orange hover:text-white text-sira-dark text-sm font-medium rounded-full transition-colors">SIRA Podcast</Link>
          <Link href="/sira-tv-hub-audio/les-fortes-tetes" className="px-3 py-1.5 bg-sira-gray hover:bg-sira-orange hover:text-white text-sira-dark text-sm font-medium rounded-full transition-colors">Les Fortes Têtes</Link>
          <Link href="/sira-tv-hub-audio/traces-reperes" className="px-3 py-1.5 bg-sira-gray hover:bg-sira-orange hover:text-white text-sira-dark text-sm font-medium rounded-full transition-colors">Traces & Repères</Link>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8">
          <SectionHeader title="À la une SIRA TV" accent="orange" />
          <Link href="/sira-tv-hub-audio/talk-show" className="group block relative aspect-video rounded-xl overflow-hidden mb-6">
            <Image src={mainVideo.image} alt={mainVideo.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(min-width: 1024px) 700px, 100vw" priority />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="bg-sira-orange w-16 h-16 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-xl">
                <Play className="h-7 w-7 text-white" fill="white" />
              </span>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-5">
              <span className="inline-block bg-sira-orange text-white text-xs font-semibold px-2 py-0.5 rounded mb-2">SIRA TV</span>
              <h3 className="font-display text-xl md:text-2xl font-bold text-white line-clamp-2">{mainVideo.title}</h3>
              <div className="flex items-center gap-3 mt-2 text-xs text-white/70">
                <span className="flex items-center gap-1"><Eye className="h-3 w-3" />{mainVideo.views} vues</span>
                <span>{mainVideo.duration}</span>
              </div>
            </div>
          </Link>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {otherVideos.map((v) => (
              <Link key={v.id} href="/sira-tv-hub-audio/talk-show" className="group">
                <div className="relative aspect-video rounded-lg overflow-hidden mb-2">
                  <Image src={v.image} alt={v.title} fill className="object-cover group-hover:scale-105 transition-transform" sizes="(min-width: 768px) 250px, 100vw" />
                  <span className="absolute inset-0 flex items-center justify-center bg-black/30">
                    <Play className="h-8 w-8 text-white" fill="white" />
                  </span>
                </div>
                <h4 className="font-semibold text-sm text-sira-dark group-hover:text-sira-orange transition-colors line-clamp-2">{v.title}</h4>
                <div className="flex items-center gap-2 mt-1 text-xs text-sira-gray-text">
                  <span>{v.duration}</span>
                  <span className="flex items-center gap-1"><Eye className="h-3 w-3" />{v.views}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <aside className="lg:col-span-4 space-y-6">
          <AdPlaceholder format="rectangle" />
          <div>
            <SectionHeader title="Derniers podcasts" accent="teal" />
            <div className="space-y-4">
              {podcasts.map((p) => (
                <Link key={p.id} href="/sira-tv-hub-audio/podcast" className="group flex gap-3">
                  <div className="relative w-16 h-16 shrink-0 rounded-lg overflow-hidden">
                    <Image src={p.image} alt={p.title} fill className="object-cover" sizes="64px" />
                    <span className="absolute inset-0 flex items-center justify-center bg-black/40">
                      <Headphones className="h-5 w-5 text-white" />
                    </span>
                  </div>
                  <div className="flex-1">
                    <span className="text-[10px] uppercase tracking-wide text-sira-teal font-semibold">{p.category}</span>
                    <h4 className="font-semibold text-sm text-sira-dark group-hover:text-sira-orange transition-colors line-clamp-2 leading-snug">{p.title}</h4>
                    <div className="flex items-center gap-2 mt-0.5 text-xs text-sira-gray-text">
                      <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{p.duration}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          <AdPlaceholder format="rectangle" />
        </aside>
      </div>
    </div>
  );
}
