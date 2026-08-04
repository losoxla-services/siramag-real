import { CategoryPage, generateCategoryMetadata } from '@/components/shared/CategoryPage';

export const metadata = generateCategoryMetadata('sira-community');

export default function SiraCommunityPage() {
  return <CategoryPage categorySlug="sira-community" />;
}
