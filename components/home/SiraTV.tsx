import Link from 'next/link';
import Image from 'next/image';
import { getVideoEpisodes } from '@/lib/content';
import { Play, Eye } from 'lucide-react';

export async function SiraTV() {
  const videos = await getVideoEpisodes(undefined, 4);
  if (videos.length === 0) return null;
  const main = videos[0];
  const rest = videos.slice(1, 4);

  return (
    <section className="bg-sira-black text-white py-10">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="flex items-end justify-between mb-6 pb-3 border-b-2 border-white/10">
          <div className="flex items-center gap-3">
            <span className="w-1.5 h-7 bg-sira-orange rounded-full" />
            <h2 className="font-display text-xl md:text-2xl font-bold">
              SIRA TV
              <span className="ml-2 text-xs font-normal text-white/50">Talk-shows, reportages, documentaires</span>
            </h2>
          </div>
          <Link href="/sira-tv-hub-audio/talk-show" className="hidden sm:inline-flex items-center gap-1 text-sm font-medium text-white/70 hover:text-sira-orange-light transition-colors">
            Tout voir →
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7">
            <Link href="/sira-tv-hub-audio/talk-show" className="group block relative aspect-video rounded-xl overflow-hidden">
              <Image src={main.image} alt={main.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(min-width: 1024px) 700px, 100vw" priority />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="bg-sira-orange w-16 h-16 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-xl">
                  <Play className="h-7 w-7 text-white" fill="white" />
                </span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <span className="inline-block bg-sira-orange text-white text-xs font-semibold px-2 py-0.5 rounded mb-2">SIRA TV</span>
                <h3 className="font-display text-xl md:text-2xl font-bold line-clamp-2">{main.title}</h3>
 <div className="flex items-center gap-3 mt-2 text-xs text-white/70">
                  <span className="flex items-center gap-1"><Eye className="h-3 w-3" />{main.views} vues</span>
                  <span>{main.duration}</span>
                </div>
              </div>
            </Link>
          </div>

          <div className="lg:col-span-5 space-y-4">
            {rest.map((v) => (
              <Link key={v.id} href="/sira-tv-hub-audio/talk-show" className="group flex gap-4 items-center">
                <div className="relative w-32 h-20 shrink-0 rounded-lg overflow-hidden">
                  <Image src={v.image} alt={v.title} fill className="object-cover group-hover:scale-105 transition-transform" sizes="128px" />
                  <span className="absolute inset-0 flex items-center justify-center bg-black/30">
                    <Play className="h-6 w-6 text-white" fill="white" />
                  </span>
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-sm group-hover:text-sira-orange-light transition-colors line-clamp-2">{v.title}</h4>
                  <div className="flex items-center gap-2 mt-1 text-xs text-white/50">
                    <span>{v.duration}</span>
                    <span className="flex items-center gap-1"><Eye className="h-3 w-3" />{v.views}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
