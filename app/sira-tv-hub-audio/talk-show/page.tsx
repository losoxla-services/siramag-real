import Link from 'next/link';
import Image from 'next/image';
import { getVideoEpisodes } from '@/lib/content';
import { Breadcrumb } from '@/components/shared/Breadcrumb';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { AdPlaceholder } from '@/components/ads/AdPlaceholder';
import { Play, Eye } from 'lucide-react';

export const metadata = {
  title: "SIRA MAG — Le Talk-Show | SIRA MAG",
  description: "Le talk-show de SIRA MAG : débats, interviews et reportages sur les femmes qui font l'Afrique.",
};

export default async function TalkShowPage() {
  const videos = await getVideoEpisodes('talk-show');
  if (videos.length === 0) {
    return (
      <div className="container mx-auto max-w-7xl px-4 py-20 text-center text-sira-gray-text">
        <p className="font-display text-xl mb-2">Aucun épisode publié pour l'instant</p>
      </div>
    );
  }
  return (
    <div className="container mx-auto max-w-7xl px-4 py-6 md:py-8">
      <Breadcrumb items={[{ label: "SIRA TV & Hub Audio", href: "/sira-tv-hub-audio" }, { label: "SIRA MAG (Le Talk-Show)" }]} />

      <header className="mt-6 mb-8">
        <div className="flex items-center gap-3 mb-2">
          <span className="w-1.5 h-8 bg-sira-orange rounded-full" />
          <h1 className="font-display text-3xl md:text-4xl font-bold text-sira-dark">SIRA MAG — Le Talk-Show</h1>
        </div>
        <p className="text-sira-gray-text max-w-2xl">Débats, interviews et reportages. Le rendez-vous phare de SIRA TV.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8">
          <Link href="/sira-tv-hub-audio/talk-show" className="group block relative aspect-video rounded-xl overflow-hidden mb-6">
            <Image src={videos[0].image} alt={videos[0].title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(min-width: 1024px) 700px, 100vw" priority />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="bg-sira-orange w-16 h-16 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-xl">
                <Play className="h-7 w-7 text-white" fill="white" />
              </span>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-5">
              <span className="inline-block bg-sira-orange text-white text-xs font-semibold px-2 py-0.5 rounded mb-2">À la une</span>
              <h3 className="font-display text-xl md:text-2xl font-bold text-white line-clamp-2">{videos[0].title}</h3>
            </div>
          </Link>

          <SectionHeader title="Tous les épisodes" accent="orange" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {videos.map((v) => (
              <Link key={v.id} href="/sira-tv-hub-audio/talk-show" className="article-card group bg-white rounded-xl overflow-hidden border border-sira-gray-mid/60">
                <div className="relative aspect-video overflow-hidden">
                  <Image src={v.image} alt={v.title} fill className="object-cover group-hover:scale-105 transition-transform" sizes="(min-width: 768px) 400px, 100vw" />
                  <span className="absolute inset-0 flex items-center justify-center bg-black/30">
                    <Play className="h-9 w-9 text-white" fill="white" />
                  </span>
                  <span className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-0.5 rounded">{v.duration}</span>
                </div>
                <div className="p-4">
                  <h4 className="font-display font-semibold text-sira-dark group-hover:text-sira-orange transition-colors line-clamp-2">{v.title}</h4>
                  <p className="text-sm text-sira-gray-text mt-1 line-clamp-2">{v.description}</p>
                  <div className="flex items-center gap-3 mt-2 text-xs text-sira-gray-text">
                    <span className="flex items-center gap-1"><Eye className="h-3 w-3" />{v.views} vues</span>
                    <span>{new Date(v.date).toLocaleDateString('fr-FR')}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <aside className="lg:col-span-4 space-y-6">
          <AdPlaceholder format="rectangle" />
          <AdPlaceholder format="rectangle" />
        </aside>
      </div>
    </div>
  );
}
