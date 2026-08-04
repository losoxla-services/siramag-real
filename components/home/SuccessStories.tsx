import Link from 'next/link';
import Image from 'next/image';
import { getArticlesByCategory } from '@/lib/content';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { Quote } from 'lucide-react';

export async function SuccessStories() {
  const items = await getArticlesByCategory('succes-inspiration', 3);
  if (items.length === 0) return null;
  const main = items[0];
  const rest = items.slice(1, 3);

  return (
    <section className="container mx-auto max-w-7xl px-4">
      <SectionHeader title="Succès & Inspiration" href="/succes-inspiration" />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-5">
          {main && (
            <Link href={`/article/${main.slug}`} className="group block relative rounded-2xl overflow-hidden h-full min-h-[360px]">
              <Image src={main.image} alt={main.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(min-width: 1024px) 500px, 100vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
              <div className="absolute bottom-0 p-6">
                <span className="inline-block bg-sira-orange text-white text-xs font-semibold px-2.5 py-1 rounded mb-3 uppercase tracking-wide">Success Story</span>
                <h3 className="font-display text-2xl font-bold text-white line-clamp-3 group-hover:text-sira-orange-light transition-colors">{main.title}</h3>
                <p className="mt-2 text-sm text-white/80 line-clamp-2">{main.excerpt}</p>
              </div>
            </Link>
          )}
        </div>

        <div className="lg:col-span-4 space-y-5">
          {rest.map((a) => (
            <Link key={a.id} href={`/article/${a.slug}`} className="group flex gap-4">
              <div className="relative w-24 h-24 shrink-0 rounded-lg overflow-hidden">
                <Image src={a.image} alt={a.title} fill className="object-cover group-hover:scale-105 transition-transform" sizes="96px" />
              </div>
              <div className="flex-1">
                <span className="text-[11px] uppercase tracking-wide text-sira-orange font-semibold">{a.subcategory}</span>
                <h4 className="font-display font-semibold text-sira-dark group-hover:text-sira-orange transition-colors line-clamp-2 leading-snug">{a.title}</h4>
                <p className="text-xs text-sira-gray-text mt-1 line-clamp-2">{a.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="lg:col-span-3">
          <div className="bg-sira-teal/10 border-l-4 border-sira-teal rounded-r-xl p-5 h-full flex flex-col justify-center">
            <Quote className="h-8 w-8 text-sira-teal mb-3" />
            <p className="font-display italic text-sira-dark text-lg leading-snug">"Le succès, c'est se lever une fois de plus qu'on est tombé."</p>
            <p className="mt-3 text-sm font-semibold text-sira-gray-dark">— Proverbe africain</p>
          </div>
        </div>
      </div>
    </section>
  );
}
