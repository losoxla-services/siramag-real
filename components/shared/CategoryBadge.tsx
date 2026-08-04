interface CategoryBadgeProps {
  category: string;
  categorySlug: string;
  size?: 'sm' | 'md';
  className?: string;
}

export function CategoryBadge({ category, categorySlug, size = 'sm', className = '' }: CategoryBadgeProps) {
  const sizeCls = size === 'sm' ? 'text-[11px] px-2 py-0.5' : 'text-xs px-2.5 py-1';
  return (
    <span className={`inline-block bg-sira-teal ${sizeCls} text-white font-semibold uppercase tracking-wide rounded ${className}`}>
      {category}
    </span>
  );
}
