import { CategoryPage, generateCategoryMetadata } from '@/components/shared/CategoryPage';

export const metadata = generateCategoryMetadata('sira-community', 'sira-leaders');

export default function SiraLeadersPage() {
  return <CategoryPage categorySlug="sira-community" subcategorySlug="sira-leaders" />;
}
