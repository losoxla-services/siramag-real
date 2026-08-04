import { CategoryPage, generateCategoryMetadata } from '@/components/shared/CategoryPage';

export const metadata = generateCategoryMetadata('coin-parents-enfance', 'sante-mentale');

export default function SanteMentalePage() {
  return <CategoryPage categorySlug="coin-parents-enfance" subcategorySlug="sante-mentale" />;
}
