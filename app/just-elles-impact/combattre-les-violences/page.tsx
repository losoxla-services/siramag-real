import { CategoryPage, generateCategoryMetadata } from '@/components/shared/CategoryPage';

export const metadata = generateCategoryMetadata('just-elles-impact', 'combattre-les-violences');

export default function CombattreViolencesPage() {
  return <CategoryPage categorySlug="just-elles-impact" subcategorySlug="combattre-les-violences" />;
}
