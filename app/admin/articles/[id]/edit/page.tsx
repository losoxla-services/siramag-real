import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import ArticleForm from '@/components/admin/ArticleForm';
import { getSubcategoriesForForm } from '@/lib/admin/categories';

export default async function EditArticlePage({ params }: { params: { id: string } }) {
  const supabase = createClient();
  const [subcategories, { data: article }] = await Promise.all([
    getSubcategoriesForForm(),
    supabase
      .from('articles')
      .select('id, titre, slug, extrait, contenu, image_cover, categorie_id, tags, featured, temps_lecture, statut')
      .eq('id', params.id)
      .single(),
  ]);

  if (!article) notFound();

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-sira-dark mb-6">Modifier l'article</h1>
      <ArticleForm
        subcategories={subcategories}
        initial={{
          id: article.id,
          titre: article.titre,
          slug: article.slug,
          extrait: article.extrait ?? '',
          contenu: article.contenu,
          image_cover: article.image_cover ?? '',
          categorie_id: article.categorie_id ?? '',
          tags: (article.tags ?? []).join(', '),
          featured: article.featured ?? false,
          temps_lecture: article.temps_lecture ?? 5,
          statut: article.statut,
        }}
      />
    </div>
  );
}
