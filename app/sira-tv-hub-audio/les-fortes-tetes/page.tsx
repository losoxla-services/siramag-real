import { CategoryPage, generateCategoryMetadata } from '@/components/shared/CategoryPage';

export const metadata = generateCategoryMetadata('sira-tv-hub-audio', 'les-fortes-tetes');

export default function LesFortesTetesPage() {
  return <CategoryPage categorySlug="sira-tv-hub-audio" subcategorySlug="les-fortes-tetes" />;
}
