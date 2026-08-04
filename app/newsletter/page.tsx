import { Breadcrumb } from '@/components/shared/Breadcrumb';
import { NewsletterForm } from '@/components/newsletter/NewsletterForm';
import { Mail } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Newsletter | SIRA MAG',
  description: 'Abonnez-vous à la newsletter de SIRA MAG et recevez chaque semaine le meilleur de notre contenu.',
};

export default function NewsletterPage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-6 md:py-10">
      <Breadcrumb items={[{ label: 'Newsletter' }]} />

      <div className="text-center mt-8">
        <div className="inline-flex items-center gap-2 bg-sira-orange/10 text-sira-orange px-3 py-1.5 rounded-full text-sm font-semibold mb-4">
          <Mail className="h-4 w-4" /> Newsletter
        </div>
        <h1 className="font-display text-3xl md:text-5xl font-bold text-sira-dark mb-4">
          Le meilleur de SIRA MAG, chaque semaine
        </h1>
        <p className="text-sira-gray-text text-lg max-w-xl mx-auto">
          Une sélection d'articles, podcasts et vidéos sur les femmes qui font l'Afrique. Gratuit, directement dans votre boîte mail.
        </p>
      </div>

      <NewsletterForm />
    </div>
  );
}
