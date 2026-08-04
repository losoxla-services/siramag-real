import { StaticPage } from '@/components/shared/StaticPage';
import Image from 'next/image';
import { Target, Eye, Heart, Users, Award, Globe } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Qui sommes-nous',
  description: "SIRA MAG, le média panafricain qui donne aux femmes d'Afrique toute leur place. Notre mission, notre vision, nos valeurs.",
};

export default function QuiSommesNousPage() {
  return (
    <StaticPage title="Qui sommes-nous" description="Le média panafricain qui célèbre les femmes.">
      <div className="relative aspect-[21/9] rounded-2xl overflow-hidden mb-8">
        <Image src="https://images.pexels.com/photos/3184287/pexels-photo-3184287.jpeg?auto=compress&cs=tinysrgb&w=1200" alt="L'équipe SIRA MAG" fill className="object-cover" sizes="1200px" priority />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-8">
        {[
          { Icon: Target, title: 'Notre Mission', desc: "Donner aux femmes d'Afrique toute leur place dans le débat public." },
          { Icon: Eye, title: 'Notre Vision', desc: "Une Afrique où les femmes sont pleinement actrices de leur destin." },
          { Icon: Heart, title: 'Nos Valeurs', desc: 'Égalité, pluralisme, indépendance, excellence journalistique.' },
        ].map(({ Icon, title, desc }) => (
          <div key={title} className="bg-sira-gray/50 rounded-xl p-5">
            <Icon className="h-8 w-8 text-sira-orange mb-3" />
            <h2 className="font-display font-bold text-sira-dark mb-1">{title}</h2>
            <p className="text-sm text-sira-gray-text">{desc}</p>
          </div>
        ))}
      </div>

      <h2 className="font-display text-2xl font-bold text-sira-dark mt-8 mb-3">Notre histoire</h2>
      <p>
        SIRA MAG est né d'un constat simple : les femmes africaines sont sous-représentées dans les médias, alors même qu'elles sont au cœur des transformations économiques, sociales et culturelles du continent. Nous avons décidé de créer un média qui leur donne toute leur place.
      </p>
      <p>
        "Sira" signifie "chemin" en arabe et dans plusieurs langues africaines. C'est le chemin que nous traçons avec et pour les femmes : un chemin de visibilité, de reconnaissance et d'empowerment.
      </p>

      <h2 className="font-display text-2xl font-bold text-sira-dark mt-8 mb-3">Notre ligne éditoriale</h2>
      <p>
        Notre ligne éditoriale repose sur le professionnalisme, l'indépendance et la pluralité des voix. Nous couvrons l'actualité sous tous ses angles — politique, économique, social, culturel — avec un prisme délibérément féminin, sans jamais tomber dans le militantisme.
      </p>
      <p>
        Nous donnons la parole aux femmes qui font l'Afrique : entrepreneures, artistes, militantes, chercheuses, sportives, mères, filles. Toutes celles qui, par leur engagement et leur talent, transforment le continent.
      </p>

      <h2 className="font-display text-2xl font-bold text-sira-dark mt-8 mb-3">Nos chiffres clés</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 my-6">
        {[
          { Icon: Users, value: '500K+', label: 'Lecteurs mensuels' },
          { Icon: Globe, value: '20+', label: 'Pays couverts' },
          { Icon: Award, value: '150+', label: 'Auteures contributrices' },
          { Icon: Heart, value: '5 ans', label: "D'existence" },
        ].map(({ Icon, value, label }) => (
          <div key={label} className="bg-white border border-sira-gray-mid rounded-xl p-4 text-center">
            <Icon className="h-6 w-6 text-sira-orange mx-auto mb-2" />
            <p className="font-display text-2xl font-bold text-sira-dark">{value}</p>
            <p className="text-xs text-sira-gray-text">{label}</p>
          </div>
        ))}
      </div>

      <h2 className="font-display text-2xl font-bold text-sira-dark mt-8 mb-3">Notre équipe</h2>
      <p>
        SIRA MAG réunit une équipe de journalistes, chroniqueuses, reportrices et photographes passionnées, basées à Dakar et dans plusieurs capitales africaines. Notre rédaction fonctionne en réseau, pour couvrir l'actualité au plus près du terrain.
      </p>
    </StaticPage>
  );
}
