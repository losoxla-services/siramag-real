import { StaticPage } from '@/components/shared/StaticPage';
import { Megaphone, BarChart3, Users } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Publicité',
  description: "Diffusez votre message auprès de l'audience féminine africaine de SIRA MAG.",
};

export default function PublicitePage() {
  return (
    <StaticPage title="Publicité" description="Touchez une audience féminine engagée et qualifiée.">
      <p>
        SIRA MAG offre aux annonceurs un accès privilégié à une audience féminine, urbaine et connectée, à travers le continent africain. Nos formats publicitaires s'adaptent à vos objectifs de marque et de performance.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-8">
        {[
          { Icon: Megaphone, title: "Formats variés", desc: "Bannières, habillage, native, vidéos pré-roll, podcasts sponsorisés." },
          { Icon: BarChart3, title: "Audience qualifiée", desc: "500 000+ lecteurs mensuels, 70% de femmes, 20+ pays." },
          { Icon: Users, title: "Sur-mesure", desc: "Dispositifs personnalisés selon vos objectifs et votre budget." },
        ].map(({ Icon, title, desc }) => (
          <div key={title} className="bg-sira-gray/50 rounded-xl p-5">
            <Icon className="h-8 w-8 text-sira-orange mb-3" />
            <h2 className="font-display font-bold text-sira-dark mb-1">{title}</h2>
            <p className="text-sm text-sira-gray-text">{desc}</p>
          </div>
        ))}
      </div>

      <h2 className="font-display text-2xl font-bold text-sira-dark mt-8 mb-3">Nos formats</h2>
      <p><strong className="text-sira-dark">Display</strong> — Bannières leaderboard (728×90), rectangles (300×250), skyscrapers (300×600), habillage de site.</p>
      <p><strong className="text-sira-dark">Native & Brand Content</strong> — Articles sponsorisés intégrés à notre ligne éditoriale, respectant notre charte qualité.</p>
      <p><strong className="text-sira-dark">Vidéo & Audio</strong> — Pré-roll sur SIRA TV, sponsoring d'épisodes podcasts, mentions par nos animatrices.</p>
      <p><strong className="text-sira-dark">Événementiel</strong> — Partenariat sur nos forums et tables rondes, stands, interventions.</p>

      <div className="bg-sira-orange/10 rounded-xl p-6 mt-8 text-center">
        <h2 className="font-display text-xl font-bold text-sira-dark mb-2">Demander le média-kit</h2>
        <p className="text-sira-gray-text mb-4">Recevez notre dossier complet : audience, formats et tarifs.</p>
        <a href="/contact" className="inline-flex items-center bg-sira-orange hover:bg-sira-orange-dark text-white font-semibold px-6 py-3 rounded-lg transition-colors">
          Contacter l'équipe commerciale
        </a>
      </div>
    </StaticPage>
  );
}
