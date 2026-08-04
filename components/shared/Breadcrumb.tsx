import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

export function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Fil d'Ariane" className="flex items-center flex-wrap gap-1 text-sm text-sira-gray-text">
      <Link href="/" className="flex items-center hover:text-sira-orange transition-colors">
        <Home className="h-3.5 w-3.5" />
      </Link>
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1">
          <ChevronRight className="h-3.5 w-3.5 text-sira-gray-mid" />
          {item.href ? (
            <Link href={item.href} className="hover:text-sira-orange transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="text-sira-dark font-medium">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
