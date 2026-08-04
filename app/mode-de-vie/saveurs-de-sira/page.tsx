import { CategoryPage, generateCategoryMetadata } from '@/components/shared/CategoryPage';

export const metadata = generateCategoryMetadata('mode-de-vie', 'saveurs-de-sira');

export default function SaveursDeSiraPage() {
  return <CategoryPage categorySlug="mode-de-vie" subcategorySlug="saveurs-de-sira" />;
}
