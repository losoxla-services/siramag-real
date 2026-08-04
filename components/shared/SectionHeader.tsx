import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface SectionHeaderProps {
  title: string;
  href?: string;
  linkLabel?: string;
  accent?: 'orange' | 'teal';
}

export function SectionHeader({ title, href, linkLabel = 'Tout voir', accent = 'orange' }: SectionHeaderProps) {
  const accentColor = accent === 'orange' ? 'bg-sira-orange' : 'bg-sira-teal';
  return (
    <div className="flex items-end justify-between mb-6 pb-3 border-b-2 border-sira-gray-mid">
      <div className="flex items-center gap-3">
        <span className={`w-1.5 h-7 ${accentColor} rounded-full`} />
        <h2 className="font-display text-xl md:text-2xl font-bold text-sira-dark">{title}</h2>
      </div>
      {href && (
        <Link href={href} className="hidden sm:inline-flex items-center gap-1 text-sm font-medium text-sira-gray-dark hover:text-sira-orange transition-colors group">
          {linkLabel}
          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      )}
    </div>
  );
}
