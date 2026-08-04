import { CategoryPage, generateCategoryMetadata } from '@/components/shared/CategoryPage';

export const metadata = generateCategoryMetadata('mode-de-vie', 'fashion-style-beaute');

export default function FashionStyleBeautePage() {
  return <CategoryPage categorySlug="mode-de-vie" subcategorySlug="fashion-style-beaute" />;
}
