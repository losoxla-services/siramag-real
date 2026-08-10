'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface ArticleFormProps {
  articleId?: string;
  initialData?: any;
  categories: any[];
}

export default function ArticleForm({
  articleId,
  initialData,
  categories,
}: ArticleFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    titre: initialData?.titre || '',
    extrait: initialData?.extrait || '',
    contenu: initialData?.contenu || '',
    categorie_id: initialData?.categorie_id || '',
    tags: initialData?.tags || '',
    temps_lecture: initialData?.temps_lecture || 5,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveDraft = async () => {
    setLoading(true);
    setError('');
    try {
      if (articleId) {
        await supabase
          .from('articles')
          .update({
            ...formData,
            statut: 'brouillon',
          })
          .eq('id', articleId);
      } else {
        const { data, error: err } = await supabase
          .from('articles')
          .insert([
            {
              ...formData,
              statut: 'brouillon',
            },
          ])
          .select();

        if (err) throw err;
        if (data && data[0]) {
          router.push(`/admin/articles/${data[0].id}/edit`);
        }
      }
      alert('Article enregistré en brouillon');
      router.refresh();
    } catch (err: any) {
      setError(err.message);
      console.error('Erreur:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitForReview = async () => {
    if (!articleId) {
      setError('Enregistrez d\'abord l\'article en brouillon');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const response = await fetch(`/api/articles/${articleId}/submit`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Erreur lors de la soumission');
      }

      alert('Article soumis pour validation');
      router.push('/admin/validation');
    } catch (err: any) {
      setError(err.message);
      console.error('Erreur:', err);
    } finally {
      setLoading(false);
    }
  };

  const handlePublish = async () => {
    if (!articleId) {
      setError('Enregistrez d\'abord l\'article');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const response = await fetch(`/api/articles/${articleId}/publish`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Erreur lors de la publication');
      }

      alert('Article publié !');
      router.push('/admin/articles');
    } catch (err: any) {
      setError(err.message);
      console.error('Erreur:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {error && (
        <div className="p-4 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium mb-2">Titre</label>
        <Input
          name="titre"
          value={formData.titre}
          onChange={handleChange}
          placeholder="Titre de l'article"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Catégorie</label>
        <select
          name="categorie_id"
          value={formData.categorie_id}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option value="">Choisir une catégorie</option>
          {categories.map(cat => (
            <option key={cat.id} value={cat.id}>
              {cat.nom}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Extrait</label>
        <Textarea
          name="extrait"
          value={formData.extrait}
          onChange={handleChange}
          placeholder="Résumé de l'article"
          rows={3}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Contenu</label>
        <Textarea
          name="contenu"
          value={formData.contenu}
          onChange={handleChange}
          placeholder="Contenu complet de l'article"
          rows={10}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Tags</label>
        <Input
          name="tags"
          value={formData.tags}
          onChange={handleChange}
          placeholder="tag1, tag2, tag3"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Temps de lecture (min)</label>
        <Input
          type="number"
          name="temps_lecture"
          value={formData.temps_lecture}
          onChange={handleChange}
        />
      </div>

      <div className="flex gap-4">
        <Button
          onClick={handleSaveDraft}
          disabled={loading}
          variant="outline"
        >
          {loading ? 'En cours...' : 'Enregistrer en brouillon'}
        </Button>

        {articleId && (
          <>
            <Button
              onClick={handleSubmitForReview}
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {loading ? 'En cours...' : 'Soumettre à validation'}
            </Button>

            <Button
              onClick={handlePublish}
              disabled={loading}
              className="bg-green-600 hover:bg-green-700"
            >
              {loading ? 'En cours...' : 'Publier maintenant'}
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
