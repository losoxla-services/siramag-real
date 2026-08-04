import { CategoryPage, generateCategoryMetadata } from '@/components/shared/CategoryPage';

export const metadata = generateCategoryMetadata('mode-de-vie', 'tradi-astuces');

export default function TradiAstucesPage() {
  return <CategoryPage categorySlug="mode-de-vie" subcategorySlug="tradi-astuces" />;
}
