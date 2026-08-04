import { notFound } from 'next/navigation';
import Image from 'next/image';
import { getAllAuthors, getAuthor, getArticlesByAuthor } from '@/lib/content';
import { ArticleCard } from '@/components/shared/ArticleCard';
import { Breadcrumb } from '@/components/shared/Breadcrumb';
import { Mail, Twitter, Linkedin } from 'lucide-react';
import type { Metadata } from 'next';

interface PageProps {
  params: { id: string };
}

export async function generateStaticParams() {
  const authors = await getAllAuthors();
  return authors.map((a) => ({ id: a.id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const author = await getAuthor(params.id);
  if (!author) return { title: 'Auteur introuvable' };
  return {
    title: `${author.name} — ${author.role}`,
    description: author.bio,
    openGraph: { title: `${author.name} | SIRA MAG`, description: author.bio, images: author.avatar ? [author.avatar] : undefined },
  };
}

export default async function AuthorPage({ params }: PageProps) {
  const author = await getAuthor(params.id);
  if (!author) notFound();

  const authorArticles = await getArticlesByAuthor(author.id);

  return (
    <div className="container mx-auto max-w-7xl px-4 py-6 md:py-8">
      <Breadcrumb items={[{ label: 'Auteurs', href: '/auteurs' }, { label: author.name }]} />

      <header className="mt-6 mb-8 bg-sira-gray/60 rounded-2xl p-6 md:p-8 flex flex-col sm:flex-row gap-6 items-center sm:items-start">
        {author.avatar ? (
          <Image src={author.avatar} alt={author.name} width={120} height={120} className="rounded-full object-cover shrink-0" />
        ) : (
          <div className="w-[120px] h-[120px] rounded-full bg-white shrink-0" />
        )}
        <div className="text-center sm:text-left">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-sira-dark mb-1">{author.name}</h1>
          <p className="text-sira-orange font-semibold mb-3">{author.role}</p>
          <p className="text-sira-gray-text max-w-2xl leading-relaxed">{author.bio}</p>
          <div className="flex gap-2 mt-4 justify-center sm:justify-start">
            <a href="mailto:contact@siramag.com" aria-label="Email" className="w-9 h-9 flex items-center justify-center rounded-full bg-white hover:bg-sira-orange hover:text-white text-sira-dark transition-colors"><Mail className="h-4 w-4" /></a>
            <a href="#" aria-label="Twitter" className="w-9 h-9 flex items-center justify-center rounded-full bg-white hover:bg-sira-orange hover:text-white text-sira-dark transition-colors"><Twitter className="h-4 w-4" /></a>
            <a href="#" aria-label="LinkedIn" className="w-9 h-9 flex items-center justify-center rounded-full bg-white hover:bg-sira-orange hover:text-white text-sira-dark transition-colors"><Linkedin className="h-4 w-4" /></a>
          </div>
        </div>
      </header>

      <h2 className="font-display text-2xl font-bold text-sira-dark mb-6">Articles de {author.name}</h2>
      {authorArticles.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {authorArticles.map((a) => (
            <ArticleCard key={a.id} article={a} />
          ))}
        </div>
      ) : (
        <p className="text-sira-gray-text">Aucun article publié pour le moment.</p>
      )}
    </div>
  );
}
