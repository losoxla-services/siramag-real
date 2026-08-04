'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import type { NavItem } from '@/lib/navigation';

interface MegaMenuProps {
  item: NavItem;
}

export function MegaMenu({ item }: MegaMenuProps) {
  if (!item.subItems) return null;

  return (
    <div
      className="absolute left-0 right-0 top-full bg-white shadow-mega border-t-2 border-sira-orange animate-slide-down z-40 mega-menu"
      role="menu"
      aria-label={`Menu ${item.label}`}
    >
      <div className="container mx-auto max-w-7xl px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xs uppercase tracking-wider text-sira-gray-text font-semibold mb-4">
              Sous-rubriques
            </h3>
            <ul className="space-y-1">
              {item.subItems.map((sub) => (
                <li key={sub.href}>
                  <Link
                    href={sub.href}
                    className="flex items-center justify-between py-2.5 px-3 -mx-3 rounded-md hover:bg-sira-gray text-sira-dark font-medium text-sm transition-colors group"
                  >
                    {sub.label}
                    <ArrowRight className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-sira-orange" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {item.featured && (
            <div className="md:col-span-2">
              <h3 className="text-xs uppercase tracking-wider text-sira-gray-text font-semibold mb-4">
                À la une
              </h3>
              <Link href={item.featured.href} className="group block">
                <div className="relative aspect-[16/9] rounded-lg overflow-hidden mb-3">
                  <Image
                    src={item.featured.image}
                    alt={item.featured.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(min-width: 1024px) 600px, 100vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <span className="absolute top-3 left-3 bg-sira-orange text-white text-xs font-semibold px-2.5 py-1 rounded">
                    {item.label}
                  </span>
                </div>
                <h4 className="font-display text-lg font-semibold text-sira-dark group-hover:text-sira-orange transition-colors line-clamp-2">
                  {item.featured.title}
                </h4>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
