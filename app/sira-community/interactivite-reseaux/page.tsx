import { CategoryPage, generateCategoryMetadata } from '@/components/shared/CategoryPage';

export const metadata = generateCategoryMetadata('sira-community', 'interactivite-reseaux');

export default function InteractiviteReseauxPage() {
  return <CategoryPage categorySlug="sira-community" subcategorySlug="interactivite-reseaux" />;
}
