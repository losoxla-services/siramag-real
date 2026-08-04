import { StaticPage } from '@/components/shared/StaticPage';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Conditions d'utilisation",
  description: "Conditions générales d'utilisation du site SIRA MAG.",
};

export default function ConditionsUtilisationPage() {
  return (
    <StaticPage title="Conditions d'utilisation" description="Les règles d'utilisation du site SIRA MAG.">
      <p>
        L'accès et l'utilisation du site siramag.com impliquent l'acceptation pleine et entière des présentes conditions générales d'utilisation.
      </p>

      <h2 className="font-display text-xl font-bold text-sira-dark mt-6">Accès au site</h2>
      <p>
        L'accès au site est libre et gratuit pour tout utilisateur disposant d'une connexion à Internet. SIRA MAG se réserve le droit de suspendre ou d'interdire l'accès au site en cas d'usage non conforme aux présentes conditions.
      </p>

      <h2 className="font-display text-xl font-bold text-sira-dark mt-6">Utilisation des contenus</h2>
      <p>
        Les contenus du site sont protégés par le droit d'auteur. Vous pouvez les consulter et les partager pour un usage personnel et non commercial. Toute exploitation commerciale, reproduction ou diffusion sans autorisation est interdite.
      </p>

      <h2 className="font-display text-xl font-bold text-sira-dark mt-6">Contribution des utilisateurs</h2>
      <p>
        Dans le cadre de la rubrique SIRA Community, les utilisateurs peuvent contribuer des contenus. SIRA MAG se réserve le droit de modérer, modifier ou refuser toute contribution contraire à sa ligne éditoriale ou aux règles de bienséance.
      </p>

      <h2 className="font-display text-xl font-bold text-sira-dark mt-6">Commentaires</h2>
      <p>
        Les commentaires sont modérés a posteriori. Tout commentaire injurieux, diffamatoire, discriminatoire ou hors sujet pourra être supprimé sans préavis.
      </p>

      <h2 className="font-display text-xl font-bold text-sira-dark mt-6">Responsabilité</h2>
      <p>
        SIRA MAG ne saurait être tenu responsable des dommages directs ou indirects résultant de l'utilisation du site, notamment de la perte de données ou d'une interruption de service.
      </p>

      <h2 className="font-display text-xl font-bold text-sira-dark mt-6">Modification des conditions</h2>
      <p>
        SIRA MAG se réserve le droit de modifier les présentes conditions à tout moment. Les conditions applicables sont celles en vigueur au moment de votre consultation du site.
      </p>
    </StaticPage>
  );
}
