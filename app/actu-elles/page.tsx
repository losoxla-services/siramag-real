import { CategoryPage, generateCategoryMetadata } from '@/components/shared/CategoryPage';

export const metadata = generateCategoryMetadata('actu-elles');

export default function ActuEllesPage() {
  return <CategoryPage categorySlug="actu-elles" />;
}
