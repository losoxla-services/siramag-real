import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export function Community() {
  return (
    <section className="container mx-auto max-w-7xl px-4">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8">
          <div className="bg-gradient-to-br from-sira-teal to-sira-teal-dark rounded-2xl p-8 md:p-10 text-white relative overflow-hidden h-full flex items-center">
            <div className="relative z-10 max-w-xl">
              <h2 className="font-display text-2xl md:text-3xl font-bold mb-3">Rejoignez la communauté #SiraMag</h2>
              <p className="text-white/85 mb-6">
                Partagez vos histoires, échangez avec d'autres femmes inspirantes et participez aux débats.
                Ensemble, donnons aux femmes d'Afrique toute leur place.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="/sira-community/contributions" className="inline-flex items-center gap-2 bg-white text-sira-teal-dark font-semibold px-5 py-2.5 rounded-md hover:bg-white/90 transition-colors">
                  Contribuer <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/sira-community/sira-leaders" className="inline-flex items-center bg-white/15 text-white font-semibold px-5 py-2.5 rounded-md hover:bg-white/25 transition-colors backdrop-blur-sm border border-white/20">
                  Forum SIRA Leaders
                </Link>
              </div>
            </div>
            <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-white/5 rounded-full" />
            <div className="absolute -right-20 -top-20 w-80 h-80 bg-white/5 rounded-full" />
          </div>
        </div>

        <div className="lg:col-span-4 bg-white rounded-2xl border border-sira-gray-mid/60 p-6 flex flex-col justify-center text-center">
          <h3 className="font-display text-lg font-bold text-sira-dark mb-2">Vos contributions</h3>
          <p className="text-sm text-sira-gray-text mb-4">Votre voix compte. Partagez votre histoire avec la communauté SIRA MAG.</p>
          <Link href="/sira-community/contributions" className="inline-flex items-center justify-center gap-1 text-sm font-semibold text-sira-orange hover:text-sira-orange-dark transition-colors">
            Partager mon histoire <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
