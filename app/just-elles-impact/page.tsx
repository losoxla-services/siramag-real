import { CategoryPage, generateCategoryMetadata } from '@/components/shared/CategoryPage';

export const metadata = generateCategoryMetadata('just-elles-impact');

export default function JustEllesImpactPage() {
  return <CategoryPage categorySlug="just-elles-impact" />;
}
