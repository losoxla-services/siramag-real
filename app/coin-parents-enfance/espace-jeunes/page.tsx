import { CategoryPage, generateCategoryMetadata } from '@/components/shared/CategoryPage';

export const metadata = generateCategoryMetadata('coin-parents-enfance', 'espace-jeunes');

export default function EspaceJeunesPage() {
  return <CategoryPage categorySlug="coin-parents-enfance" subcategorySlug="espace-jeunes" />;
}
