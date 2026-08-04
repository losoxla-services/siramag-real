import { CategoryPage, generateCategoryMetadata } from '@/components/shared/CategoryPage';

export const metadata = generateCategoryMetadata('sira-tv-hub-audio', 'traces-reperes');

export default function TracesReperesPage() {
  return <CategoryPage categorySlug="sira-tv-hub-audio" subcategorySlug="traces-reperes" />;
}
