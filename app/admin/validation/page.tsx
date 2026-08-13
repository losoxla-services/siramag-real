'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Button } from '@/components/ui/button';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function ValidationPage() {
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const { data, error } = await supabase
          .from('articles')
          .select('*')
          .eq('statut', 'soumis')
          .order('created_at', { ascending: false });

        if (error) throw error;
        setArticles(data || []);
      } catch (err) {
        console.error('Erreur:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  const handlePublish = async (articleId: string) => {
    try {
      const response = await fetch(`/api/articles/${articleId}/publish`, {
        method: 'PATCH',
      });

      if (response.ok) {
        alert('Article publié !');
        setArticles(articles.filter(a => a.id !== articleId));
      }
    } catch (err) {
      console.error('Erreur:', err);
    }
  };

  const handleReject = async (articleId: string) => {
    const raison = prompt('Motif du rejet :');
    if (!raison) return;

    try {
      const response = await fetch(`/api/articles/${articleId}/reject`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ raison }),
      });

      if (response.ok) {
        alert('Article rejeté');
        setArticles(articles.filter(a => a.id !== articleId));
      }
    } catch (err) {
      console.error('Erreur:', err);
    }
  };

  if (loading) return <div className="p-6">Chargement...</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Validation éditoriale</h1>
      <p className="mb-4 text-gray-600">Articles soumis par les auteurs, en attente de publication.</p>

      {articles.length === 0 ? (
        <p className="text-gray-500">Rien en attente de validation.</p>
      ) : (
        <div className="space-y-4">
          {articles.map(article => (
            <div key={article.id} className="border p-4 rounded bg-white shadow">
              <h2 className="font-bold text-lg">{article.titre}</h2>
              <p className="text-sm text-gray-600 mt-2">{article.extrait}</p>
              <div className="mt-4 flex gap-2">
                <Button
                  onClick={() => handlePublish(article.id)}
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  Publier
                </Button>
                <Button
                  onClick={() => handleReject(article.id)}
                  className="bg-red-600 hover:bg-red-700 text-white"
                >
                  Rejeter
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
