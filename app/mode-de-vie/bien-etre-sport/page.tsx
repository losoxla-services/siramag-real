import { CategoryPage, generateCategoryMetadata } from '@/components/shared/CategoryPage';

export const metadata = generateCategoryMetadata('mode-de-vie', 'bien-etre-sport');

export default function BienEtreSportPage() {
  return <CategoryPage categorySlug="mode-de-vie" subcategorySlug="bien-etre-sport" />;
}
