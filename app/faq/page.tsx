import { StaticPage } from '@/components/shared/StaticPage';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FAQ',
  description: 'Questions fréquentes sur SIRA MAG.',
};

export default function FaqPage() {
  const faqs = [
    { q: "Qu'est-ce que SIRA MAG ?", a: "SIRA MAG est un média panafricain qui célèbre les femmes, leurs luttes, leurs succès et leur impact. Nous proposons articles, podcasts, vidéos et événements." },
    { q: "Comment m'abonner à la newsletter ?", a: "Rendez-vous sur la page Newsletter, saisissez votre adresse email et confirmez votre inscription. Vous recevrez chaque semaine le meilleur de notre contenu." },
    { q: "Puis-je contribuer au média ?", a: "Oui ! La rubrique SIRA Community permet à chacun de partager ses histoires et contributions. Rendez-vous sur la page Contributions pour en savoir plus." },
    { q: "Comment proposer un sujet ou une interview ?", a: "Écrivez-nous via le formulaire de contact en précisant 'Suggestion éditoriale' dans le sujet. Notre rédaction étudie toutes les propositions." },
    { q: "Le contenu est-il gratuit ?", a: "L'essentiel de notre contenu est gratuit. Certains contenus premium ou archives peuvent nécessiter un compte. La newsletter est entièrement gratuite." },
    { q: "Comment diffuser ma publicité sur SIRA MAG ?", a: "Consultez notre page Publicité pour découvrir nos formats et contactez notre équipe commerciale pour un dispositif sur mesure." },
    { q: "Sur quelles plateformes écouter les podcasts ?", a: "Nos podcasts sont disponibles sur Spotify, Apple Podcasts, Deezer et Google Podcasts, ainsi que directement sur notre site." },
    { q: "Comment signaler une erreur dans un article ?", a: "Écrivez-nous à contact@siramag.com en indiquant le titre de l'article et l'erreur constatée. Nous corrigeons rapidement." },
  ];

  return (
    <StaticPage title="Questions fréquentes" description="Tout ce que vous devez savoir sur SIRA MAG.">
      <div className="space-y-3">
        {faqs.map((faq, i) => (
          <details key={i} className="group bg-white border border-sira-gray-mid rounded-xl p-5 [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex items-center justify-between cursor-pointer font-display font-semibold text-sira-dark text-lg">
              {faq.q}
              <span className="text-sira-orange text-2xl group-open:rotate-45 transition-transform">+</span>
            </summary>
            <p className="mt-3 text-sira-gray-text leading-relaxed">{faq.a}</p>
          </details>
        ))}
      </div>
    </StaticPage>
  );
}
