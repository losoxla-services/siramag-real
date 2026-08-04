import { CategoryPage, generateCategoryMetadata } from '@/components/shared/CategoryPage';

export const metadata = generateCategoryMetadata('just-elles-impact', 'a-l-ecoute');

export default function ALEcoutePage() {
  return <CategoryPage categorySlug="just-elles-impact" subcategorySlug="a-l-ecoute" />;
}
