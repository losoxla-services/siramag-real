import { StaticPage } from '@/components/shared/StaticPage';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mentions légales',
  description: 'Mentions légales du site SIRA MAG.',
};

export default function MentionsLegalesPage() {
  return (
    <StaticPage title="Mentions légales" description="Informations légales relatives au site SIRA MAG.">
      <h2 className="font-display text-xl font-bold text-sira-dark">Éditeur du site</h2>
      <p>
        SIRA MAG SAS<br />
        Capital social : 1 000 000 FCFA<br />
        Siège social : Dakar, Sénégal<br />
        RCS Dakar : SN-DKR-2024-12345<br />
        N° NINEA : 005678910 2D2<br />
        Directeur de la publication : Awa Diallo<br />
        Email : contact@siramag.com — Téléphone : +221 33 000 00 00
      </p>

      <h2 className="font-display text-xl font-bold text-sira-dark mt-6">Hébergement</h2>
      <p>
        Le site est hébergé par Netlify Inc., 2325 3rd Street, Suite 296, San Francisco, California 94107, États-Unis.
      </p>

      <h2 className="font-display text-xl font-bold text-sira-dark mt-6">Propriété intellectuelle</h2>
      <p>
        L'ensemble des contenus présents sur ce site (articles, images, vidéos, podcasts, logos, charte graphique) est la propriété exclusive de SIRA MAG, sauf mention contraire. Toute reproduction, représentation, modification ou diffusion, totale ou partielle, sans autorisation écrite préalable est interdite et constitue une contrefaçon.
      </p>

      <h2 className="font-display text-xl font-bold text-sira-dark mt-6">Responsabilité</h2>
      <p>
        SIRA MAG s'efforce de fournir des informations exactes et actualisées. Toutefois, l'éditeur ne saurait être tenu responsable des erreurs, d'une absence de disponibilité des contenus, ou de la présence de virus sur le site. Les contenus sont fournis à titre informatif et ne constituent pas un conseil professionnel.
      </p>

      <h2 className="font-display text-xl font-bold text-sira-dark mt-6">Liens hypertextes</h2>
      <p>
        Le site peut contenir des liens vers des sites externes. SIRA MAG n'exerce aucun contrôle sur ces sites et décline toute responsabilité quant à leur contenu.
      </p>

      <h2 className="font-display text-xl font-bold text-sira-dark mt-6">Droit applicable</h2>
      <p>
        Le présent site et ses mentions légales sont soumis au droit sénégalais. En cas de litige, les tribunaux sénégalais seront seuls compétents.
      </p>
    </StaticPage>
  );
}
