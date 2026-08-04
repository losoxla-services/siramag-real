import Link from 'next/link';
import { Home, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-20 md:py-32 text-center">
      <p className="font-display text-7xl md:text-9xl font-bold text-sira-orange/30">404</p>
      <h1 className="font-display text-3xl md:text-4xl font-bold text-sira-dark mt-4 mb-3">
        Page introuvable
      </h1>
      <p className="text-sira-gray-text text-lg mb-8 max-w-md mx-auto">
        La page que vous cherchez n'existe pas ou a été déplacée. Revenez à l'accueil ou lancez une recherche.
      </p>
      <div className="flex flex-wrap gap-3 justify-center">
        <Link href="/" className="inline-flex items-center gap-2 bg-sira-orange hover:bg-sira-orange-dark text-white font-semibold px-6 py-3 rounded-lg transition-colors">
          <Home className="h-4 w-4" /> Retour à l'accueil
        </Link>
        <Link href="/recherche" className="inline-flex items-center gap-2 bg-sira-gray hover:bg-sira-gray-mid text-sira-dark font-semibold px-6 py-3 rounded-lg transition-colors">
          <Search className="h-4 w-4" /> Rechercher
        </Link>
      </div>
    </div>
  );
}
