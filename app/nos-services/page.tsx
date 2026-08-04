import { StaticPage } from '@/components/shared/StaticPage';
import { Megaphone, Mic, Video, FileText, BarChart3, Handshake, CheckCircle2 } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Nos Services',
  description: "Découvrez les services de SIRA MAG : production de contenu, partenariats, publicité, événementiel et plus encore.",
};

export default function NosServicesPage() {
  const services = [
    { Icon: Megaphone, title: "Publicité & Brand Content", desc: "Touchez une audience engagée à travers nos formats publicitaires et contenus de marque." },
    { Icon: Mic, title: "Production Podcast", desc: "Conception et production de podcasts sur mesure pour votre marque ou institution." },
    { Icon: Video, title: "Production Vidéo", desc: "Reportages, documentaires et talk-shows réalisés par notre studio SIRA TV." },
    { Icon: FileText, title: "Rédaction & Édition", desc: "Production de contenus éditoriaux pour vos supports de communication." },
    { Icon: BarChart3, title: "Études & Recherches", desc: "Le SIRA Lab produit des études sur les questions de genre en Afrique." },
    { Icon: Handshake, title: "Partenariats & Événementiel", desc: "Organisation d'événements, forums et tables rondes autour des thématiques féminines." },
  ];

  return (
    <StaticPage title="Nos Services" description="Des solutions sur mesure pour toucher les femmes d'Afrique.">
      <p>
        SIRA MAG met son expertise éditoriale et sa connaissance fine des audiences féminines africaines au service des marques, institutions et organisations qui souhaitent s'adresser à ce public avec pertinence et impact.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 my-8">
        {services.map(({ Icon, title, desc }) => (
          <div key={title} className="bg-white border border-sira-gray-mid rounded-xl p-6 hover:shadow-card transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-sira-orange/10 flex items-center justify-center mb-4">
              <Icon className="h-6 w-6 text-sira-orange" />
            </div>
            <h2 className="font-display text-lg font-bold text-sira-dark mb-2">{title}</h2>
            <p className="text-sm text-sira-gray-text leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>

      <h2 className="font-display text-2xl font-bold text-sira-dark mt-8 mb-3">Pourquoi choisir SIRA MAG ?</h2>
      <ul className="space-y-3">
        {[
          "Une audience qualifiée et engagée, majoritairement féminine et urbaine",
          "Une expertise éditoriale reconnue sur les questions de genre en Afrique",
          "Des formats variés : articles, podcasts, vidéos, événements",
          "Une couverture panafricaine avec un réseau de correspondantes",
          "Des dispositifs sur mesure adaptés à vos objectifs",
        ].map((item) => (
          <li key={item} className="flex items-start gap-3">
            <CheckCircle2 className="h-5 w-5 text-sira-teal shrink-0 mt-0.5" />
            <span className="text-sira-gray-dark">{item}</span>
          </li>
        ))}
      </ul>

      <div className="bg-sira-orange/10 rounded-xl p-6 mt-8 text-center">
        <h2 className="font-display text-xl font-bold text-sira-dark mb-2">Un projet en tête ?</h2>
        <p className="text-sira-gray-text mb-4">Parlons-en. Notre équipe commerciale vous répondra sous 48h.</p>
        <a href="/contact" className="inline-flex items-center bg-sira-orange hover:bg-sira-orange-dark text-white font-semibold px-6 py-3 rounded-lg transition-colors">
          Nous contacter
        </a>
      </div>
    </StaticPage>
  );
}
