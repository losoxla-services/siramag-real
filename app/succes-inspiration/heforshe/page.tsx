import { CategoryPage, generateCategoryMetadata } from '@/components/shared/CategoryPage';

export const metadata = generateCategoryMetadata('succes-inspiration', 'heforshe');

export default function HeForShePage() {
  return <CategoryPage categorySlug="succes-inspiration" subcategorySlug="heforshe" />;
}
