import { Breadcrumb } from '@/components/shared/Breadcrumb';
import { AdPlaceholder } from '@/components/ads/AdPlaceholder';

interface StaticPageProps {
  title: string;
  description?: string;
  breadcrumbLabel?: string;
  children: React.ReactNode;
}

export function StaticPage({ title, description, breadcrumbLabel, children }: StaticPageProps) {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-6 md:py-8">
      <Breadcrumb items={[{ label: breadcrumbLabel || title }]} />

      <header className="mt-6 mb-8">
        <div className="flex items-center gap-3 mb-2">
          <span className="w-1.5 h-8 bg-sira-orange rounded-full" />
          <h1 className="font-display text-3xl md:text-4xl font-bold text-sira-dark">{title}</h1>
        </div>
        {description && <p className="text-sira-gray-text text-lg">{description}</p>}
      </header>

      <div className="prose-content text-sira-dark leading-relaxed space-y-4">
        {children}
      </div>

      <div className="mt-10">
        <AdPlaceholder format="leaderboard" />
      </div>
    </div>
  );
}
