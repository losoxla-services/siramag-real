import { CategoryPage, generateCategoryMetadata } from '@/components/shared/CategoryPage';

export const metadata = generateCategoryMetadata('sira-community', 'contributions');

export default function ContributionsPage() {
  return <CategoryPage categorySlug="sira-community" subcategorySlug="contributions" />;
}
