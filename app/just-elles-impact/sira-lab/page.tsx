import { CategoryPage, generateCategoryMetadata } from '@/components/shared/CategoryPage';

export const metadata = generateCategoryMetadata('just-elles-impact', 'sira-lab');

export default function SiraLabPage() {
  return <CategoryPage categorySlug="just-elles-impact" subcategorySlug="sira-lab" />;
}
