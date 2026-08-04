import Link from 'next/link';
import Image from 'next/image';
import { getAllAuthors } from '@/lib/content';
import { Breadcrumb } from '@/components/shared/Breadcrumb';

export const metadata = {
  title: 'Nos auteurs | SIRA MAG',
  description: "Découvrez les plumes de SIRA MAG : journalistes, chroniqueuses et reportrices.",
};

export default async function AuthorsPage() {
  const authors = await getAllAuthors();

  return (
    <div className="container mx-auto max-w-7xl px-4 py-6 md:py-8">
      <Breadcrumb items={[{ label: 'Auteurs' }]} />
      <header className="mt-6 mb-8">
        <div className="flex items-center gap-3 mb-2">
          <span className="w-1.5 h-8 bg-sira-orange rounded-full" />
          <h1 className="font-display text-3xl md:text-4xl font-bold text-sira-dark">Nos auteurs</h1>
        </div>
        <p className="text-sira-gray-text max-w-2xl">Les plumes qui donnent voix aux femmes d'Afrique.</p>
      </header>

      {authors.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {authors.map((author) => (
            <Link key={author.id} href={`/auteurs/${author.id}`} className="article-card group bg-white rounded-xl border border-sira-gray-mid/60 p-6 text-center">
              {author.avatar ? (
                <Image src={author.avatar} alt={author.name} width={96} height={96} className="rounded-full object-cover mx-auto mb-4" />
              ) : (
                <div className="w-24 h-24 rounded-full bg-sira-gray mx-auto mb-4" />
              )}
              <h3 className="font-display text-lg font-bold text-sira-dark group-hover:text-sira-orange transition-colors">{author.name}</h3>
              <p className="text-sm text-sira-orange font-semibold mb-2">{author.role}</p>
              <p className="text-sm text-sira-gray-text line-clamp-3">{author.bio}</p>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-sira-gray-text">Aucun auteur pour l'instant.</p>
      )}
    </div>
  );
}
