import { CategoryPage, generateCategoryMetadata } from '@/components/shared/CategoryPage';

export const metadata = generateCategoryMetadata('succes-inspiration');

export default function SuccesInspirationPage() {
  return <CategoryPage categorySlug="succes-inspiration" />;
}
