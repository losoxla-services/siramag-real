import { CategoryPage, generateCategoryMetadata } from '@/components/shared/CategoryPage';

export const metadata = generateCategoryMetadata('actu-elles', 'economie-business');

export default function EconomieBusinessPage() {
  return <CategoryPage categorySlug="actu-elles" subcategorySlug="economie-business" />;
}
