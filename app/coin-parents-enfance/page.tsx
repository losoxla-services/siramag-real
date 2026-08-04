import { CategoryPage, generateCategoryMetadata } from '@/components/shared/CategoryPage';

export const metadata = generateCategoryMetadata('coin-parents-enfance');

export default function CoinParentsEnfancePage() {
  return <CategoryPage categorySlug="coin-parents-enfance" />;
}
