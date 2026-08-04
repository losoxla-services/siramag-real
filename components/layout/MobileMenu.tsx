'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { X, ChevronDown, Search } from 'lucide-react';
import { navigation } from '@/lib/navigation';

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const pathname = usePathname();

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/recherche?q=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/50 z-[60] lg:hidden transition-opacity duration-300 ${
          open ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        className={`fixed top-0 left-0 bottom-0 w-[85%] max-w-sm bg-white z-[70] lg:hidden overflow-y-auto transition-transform duration-300 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Menu de navigation"
      >
        <div className="flex items-center justify-between p-4 border-b border-sira-gray-mid sticky top-0 bg-white z-10">
          <span className="font-display font-bold text-lg text-sira-dark">Menu</span>
          <button onClick={onClose} className="p-2 -mr-2" aria-label="Fermer le menu">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-4 border-b border-sira-gray-mid">
          <form onSubmit={submitSearch} className="flex gap-2">
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Rechercher..."
              className="flex-1 px-3 py-2 border border-sira-gray-mid rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-sira-orange"
              aria-label="Rechercher"
            />
            <button type="submit" className="bg-sira-orange text-white px-4 rounded-md" aria-label="Lancer la recherche">
              <Search className="h-4 w-4" />
            </button>
          </form>
        </div>

        <nav className="p-2" aria-label="Navigation mobile">
          {navigation.map((item) => (
            <div key={item.href} className="border-b border-sira-gray/50 last:border-0">
              {item.subItems ? (
                <>
                  <button
                    className="flex items-center justify-between w-full py-3 px-3 text-left font-medium text-sira-dark hover:bg-sira-gray rounded-md transition-colors"
                    onClick={() => setExpanded(expanded === item.label ? null : item.label)}
                    aria-expanded={expanded === item.label}
                  >
                    <Link href={item.href} onClick={onClose} className="flex-1">
                      {item.label}
                    </Link>
                    <ChevronDown
                      className={`h-4 w-4 transition-transform ${expanded === item.label ? 'rotate-180' : ''}`}
                    />
                  </button>
                  {expanded === item.label && (
                    <ul className="pl-4 pb-2 animate-accordion-down">
                      {item.subItems.map((sub) => (
                        <li key={sub.href}>
                          <Link
                            href={sub.href}
                            onClick={onClose}
                            className={`block py-2.5 px-3 text-sm rounded-md transition-colors ${
                              pathname === sub.href ? 'text-sira-orange font-semibold bg-sira-gray/50' : 'text-sira-gray-dark hover:bg-sira-gray'
                            }`}
                          >
                            {sub.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              ) : (
                <Link
                  href={item.href}
                  onClick={onClose}
                  className={`block py-3 px-3 font-medium rounded-md transition-colors ${
                    pathname === item.href ? 'text-sira-orange' : 'text-sira-dark hover:bg-sira-gray'
                  }`}
                >
                  {item.label}
                </Link>
              )}
            </div>
          ))}
        </nav>

        <div className="p-4">
          <Link
            href="/newsletter"
            onClick={onClose}
            className="block w-full text-center bg-sira-orange hover:bg-sira-orange-dark text-white font-semibold py-3 rounded-md transition-colors"
          >
            S'abonner à la newsletter
          </Link>
        </div>
      </div>
    </>
  );
}
