import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import { Breadcrumb } from '@/components/shared/Breadcrumb';
import type { Metadata } from 'next';

interface PageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const supabase = createClient();
  const { data } = await supabase.from('pages').select('titre').eq('slug', params.slug).eq('statut', 'publié').single();
  return { title: data ? `${data.titre} | SIRA MAG` : 'Page introuvable' };
}

export default async function GenericPage({ params }: PageProps) {
  const supabase = createClient();
  const { data: page } = await supabase.from('pages').select('titre, contenu').eq('slug', params.slug).eq('statut', 'publié').single();
  if (!page) notFound();

  return (
    <div className="container mx-auto max-w-3xl px-4 py-8">
      <Breadcrumb items={[{ label: page.titre }]} />
      <h1 className="font-display text-3xl md:text-4xl font-bold text-sira-dark mt-6 mb-6">{page.titre}</h1>
      <div className="prose max-w-none text-sira-gray-dark leading-relaxed whitespace-pre-wrap">{page.contenu}</div>
    </div>
  );
}
