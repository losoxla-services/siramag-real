import { CategoryPage, generateCategoryMetadata } from '@/components/shared/CategoryPage';

export const metadata = generateCategoryMetadata('succes-inspiration', 'success-story');

export default function SuccessStoryPage() {
  return <CategoryPage categorySlug="succes-inspiration" subcategorySlug="success-story" />;
}
