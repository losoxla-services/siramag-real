import { CategoryPage, generateCategoryMetadata } from '@/components/shared/CategoryPage';

export const metadata = generateCategoryMetadata('mode-de-vie');

export default function ModeDeViePage() {
  return <CategoryPage categorySlug="mode-de-vie" />;
}
