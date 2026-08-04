import { CategoryPage, generateCategoryMetadata } from '@/components/shared/CategoryPage';

export const metadata = generateCategoryMetadata('coin-parents-enfance', 'education-epanouissement');

export default function EducationEpanouissementPage() {
  return <CategoryPage categorySlug="coin-parents-enfance" subcategorySlug="education-epanouissement" />;
}
