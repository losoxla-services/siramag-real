import { SectionHeader } from '@/components/shared/SectionHeader';

const partners = [
  'UN Women', 'ONU Femmes', 'Bill & Melinda Gates Foundation', 'African Development Bank',
  'UNICEF', 'Oxfam', 'Mastercard Foundation', 'Ambassade de France',
  'AFD', 'Orange Sénégal', 'Société Générale', 'Ecobank',
];

export function Partners() {
  return (
    <section className="container mx-auto max-w-7xl px-4">
      <SectionHeader title="Ils nous soutiennent" accent="teal" />
      <div className="relative overflow-hidden py-4">
        <div className="partners-track">
          {[...partners, ...partners].map((p, i) => (
            <span key={i} className="text-lg md:text-xl font-display font-semibold text-sira-gray-dark/60 hover:text-sira-teal transition-colors whitespace-nowrap">
              {p}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
