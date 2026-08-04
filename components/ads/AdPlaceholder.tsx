interface AdPlaceholderProps {
  format?: 'leaderboard' | 'rectangle' | 'square' | 'skyscraper' | 'mobile' | 'billboard';
  className?: string;
  label?: string;
}

const formats: Record<NonNullable<AdPlaceholderProps['format']>, { h: string; label: string }> = {
  leaderboard: { h: 'h-[90px] md:h-[90px]', label: '728×90' },
  billboard: { h: 'h-[120px] md:h-[250px]', label: '970×250' },
  rectangle: { h: 'h-[250px]', label: '300×250' },
  square: { h: 'h-[300px]', label: '300×300' },
  skyscraper: { h: 'h-[600px]', label: '300×600' },
  mobile: { h: 'h-[100px]', label: '320×100' },
};

export function AdPlaceholder({ format = 'leaderboard', className = '', label }: AdPlaceholderProps) {
  const cfg = formats[format];
  return (
    <div
      className={`relative w-full ${cfg.h} bg-sira-gray border border-dashed border-sira-gray-mid rounded-lg flex items-center justify-center ${className}`}
      role="complementary"
      aria-label="Emplacement publicitaire"
    >
      <div className="text-center">
        <p className="text-[10px] uppercase tracking-widest text-sira-gray-text font-semibold mb-1">Publicité</p>
        <p className="text-xs text-sira-gray-text">{label || cfg.label}</p>
      </div>
    </div>
  );
}
