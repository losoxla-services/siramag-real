import { CategoryPage, generateCategoryMetadata } from '@/components/shared/CategoryPage';

export const metadata = generateCategoryMetadata('actu-elles', 'culture-tourisme');

export default function CultureTourismePage() {
  return <CategoryPage categorySlug="actu-elles" subcategorySlug="culture-tourisme" />;
}
