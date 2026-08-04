import ArticleForm from '@/components/admin/ArticleForm';
import { getSubcategoriesForForm } from '@/lib/admin/categories';

export default async function NewArticlePage() {
  const subcategories = await getSubcategoriesForForm();
  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-sira-dark mb-6">Nouvel article</h1>
      <ArticleForm subcategories={subcategories} />
    </div>
  );
}
