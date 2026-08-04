import { CategoryPage, generateCategoryMetadata } from '@/components/shared/CategoryPage';

export const metadata = generateCategoryMetadata('actu-elles', 'politique-institutions');

export default function PolitiqueInstitutionsPage() {
  return <CategoryPage categorySlug="actu-elles" subcategorySlug="politique-institutions" />;
}
