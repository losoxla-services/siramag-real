import { StaticPage } from '@/components/shared/StaticPage';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Politique de confidentialité',
  description: 'Politique de protection des données personnelles de SIRA MAG.',
};

export default function PolitiqueConfidentialitePage() {
  return (
    <StaticPage title="Politique de confidentialité" description="Comment SIRA MAG protège vos données personnelles.">
      <p>
        SIRA MAG accorde une importance particulière à la protection des données personnelles de ses utilisateurs. La présente politique décrit comment nous collectons, utilisons et protégeons vos données, conformément à la loi sénégalaise sur la protection des données à caractère personnel.
      </p>

      <h2 className="font-display text-xl font-bold text-sira-dark mt-6">Données collectées</h2>
      <p>
        Nous collectons les données suivantes : adresse email (lors de l'inscription à la newsletter), nom et email (lors du remplissage du formulaire de contact), données de navigation (cookies, adresse IP, pages visitées).
      </p>

      <h2 className="font-display text-xl font-bold text-sira-dark mt-6">Finalités</h2>
      <p>
        Vos données sont utilisées pour : vous envoyer notre newsletter, répondre à vos demandes de contact, améliorer notre contenu et notre site, mesurer l'audience, proposer des publicités pertinentes.
      </p>

      <h2 className="font-display text-xl font-bold text-sira-dark mt-6">Conservation</h2>
      <p>
        Vos données sont conservées pour une durée maximale de 3 ans à compter de votre dernière interaction, sauf demande de suppression de votre part.
      </p>

      <h2 className="font-display text-xl font-bold text-sira-dark mt-6">Vos droits</h2>
      <p>
        Vous disposez d'un droit d'accès, de rectification, d'effacement et d'opposition au traitement de vos données. Pour exercer ces droits, écrivez-nous à contact@siramag.com.
      </p>

      <h2 className="font-display text-xl font-bold text-sira-dark mt-6">Cookies</h2>
      <p>
        Notre site utilise des cookies pour mesurer l'audience et améliorer votre expérience. Vous pouvez à tout moment désactiver les cookies dans les paramètres de votre navigateur.
      </p>

      <h2 className="font-display text-xl font-bold text-sira-dark mt-6">Sécurité</h2>
      <p>
        Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour protéger vos données contre tout accès non autorisé, altération ou divulgation.
      </p>
    </StaticPage>
  );
}
