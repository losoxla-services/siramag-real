'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Search, Menu, X, ChevronDown } from 'lucide-react';
import { navigation } from '@/lib/navigation';
import { MegaMenu } from './MegaMenu';
import { MobileMenu } from './MobileMenu';

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setActiveMenu(null);
  }, [pathname]);

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/recherche?q=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  return (
    <>
      <header
        className={`sticky top-0 z-50 bg-white transition-shadow duration-300 ${scrolled ? 'shadow-header' : 'shadow-sm'}`}
        onMouseLeave={() => setActiveMenu(null)}
      >
        <div className="container mx-auto max-w-7xl px-4">
          <div className="flex items-center justify-between h-16 md:h-20 gap-4">
            <button
              className="lg:hidden p-2 -ml-2 text-sira-dark"
              onClick={() => setMobileOpen(true)}
              aria-label="Ouvrir le menu"
            >
              <Menu className="h-6 w-6" />
            </button>

            <Link href="/" className="flex items-center gap-2 shrink-0" aria-label="SIRA MAG - Accueil">
              <div className="relative h-10 md:h-12 w-36 md:w-44">
                <Image
                  src="/Logo_Sirawebzine_png.png"
                  alt="SIRA MAG"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </Link>

            <nav className="hidden lg:flex items-center gap-0.5 flex-1 justify-center" aria-label="Navigation principale">
              {navigation.map((item) => (
                <div
                  key={item.href}
                  className="relative"
                  onMouseEnter={() => setActiveMenu(item.subItems ? item.label : null)}
                >
                  <Link
                    href={item.href}
                    className={`flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-md transition-colors hover:text-sira-orange ${
                      pathname === item.href || pathname.startsWith(item.href + '/') ? 'text-sira-orange' : 'text-sira-dark'
                    }`}
                  >
                    {item.label}
                    {item.subItems && <ChevronDown className="h-3.5 w-3.5 opacity-60" />}
                  </Link>
                </div>
              ))}
            </nav>

            <div className="flex items-center gap-1 md:gap-2">
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 rounded-md hover:bg-sira-gray text-sira-dark transition-colors"
                aria-label="Rechercher"
                aria-expanded={searchOpen}
              >
                <Search className="h-5 w-5" />
              </button>
              <Link
                href="/newsletter"
                className="hidden md:inline-flex items-center bg-sira-orange hover:bg-sira-orange-dark text-white text-sm font-semibold px-4 py-2 rounded-md transition-colors"
              >
                Newsletter
              </Link>
            </div>
          </div>

          {searchOpen && (
            <div className="absolute left-0 right-0 top-full bg-white shadow-header border-t border-sira-gray-mid animate-slide-down z-50">
              <div className="container mx-auto max-w-7xl px-4 py-4">
                <form onSubmit={submitSearch} className="flex gap-2">
                  <input
                    type="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Rechercher un article, une rubrique, un thème..."
                    className="flex-1 px-4 py-3 border border-sira-gray-mid rounded-md focus:outline-none focus:ring-2 focus:ring-sira-orange text-sm"
                    autoFocus
                    aria-label="Termes de recherche"
                  />
                  <button type="submit" className="bg-sira-orange hover:bg-sira-orange-dark text-white px-6 py-3 rounded-md font-semibold text-sm transition-colors">
                    Rechercher
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>

        {activeMenu && <MegaMenu item={navigation.find((n) => n.label === activeMenu)!} />}
      </header>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
