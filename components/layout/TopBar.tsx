'use client';

import { Facebook, Instagram, Linkedin, Youtube, X, Play, Tv, Mic } from 'lucide-react';
import Link from 'next/link';

export function TopBar() {
  const today = new Date().toLocaleDateString('fr-FR', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
  });
  const mobileDate = new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });

  return (
    <div className="bg-sira-teal text-white">
      <div className="container mx-auto max-w-7xl px-3 md:px-4">
        <div className="flex items-center justify-between h-10 text-xs md:text-sm">
          <div className="flex items-center gap-0 md:gap-1.5 shrink-0">
            {[
              { Icon: Facebook, label: 'Facebook' },
              { Icon: Instagram, label: 'Instagram' },
              { Icon: Linkedin, label: 'LinkedIn' },
              { Icon: Play, label: 'TikTok' },
              { Icon: Youtube, label: 'YouTube' },
              { Icon: X, label: 'X (Twitter)' },
            ].map(({ Icon, label }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="w-6 h-6 md:w-7 md:h-7 flex items-center justify-center rounded-full hover:bg-white/20 transition-colors"
              >
                <Icon className="h-3 w-3 md:h-3.5 md:w-3.5" />
              </a>
            ))}
          </div>

          <nav className="hidden md:flex items-center gap-7 font-medium" aria-label="Liens rapides">
            <Link href="/sira-tv-hub-audio/talk-show" className="hover:text-sira-orange-light transition-colors flex items-center gap-1.5">
              <Tv className="h-3.5 w-3.5" /> SIRA TV
            </Link>
            <Link href="/" className="hover:text-sira-orange-light transition-colors font-semibold">
              SIRA MAG
            </Link>
            <Link href="/sira-tv-hub-audio/podcast" className="hover:text-sira-orange-light transition-colors flex items-center gap-1.5">
              <Mic className="h-3.5 w-3.5" /> PODCAST
            </Link>
          </nav>

          <div className="hidden md:block text-xs font-medium text-white/85 capitalize">
            {today}
          </div>

          <div className="flex md:hidden items-center gap-3 shrink-0">
            <Link href="/sira-tv-hub-audio/talk-show" className="hover:text-sira-orange-light transition-colors flex items-center gap-1 text-[10px] font-medium">
              <Tv className="h-3 w-3" /> SIRA TV
            </Link>
            <Link href="/sira-tv-hub-audio/podcast" className="hover:text-sira-orange-light transition-colors flex items-center gap-1 text-[10px] font-medium">
              <Mic className="h-3 w-3" /> PODCAST
            </Link>
            <span className="text-[10px] font-medium text-white/80 capitalize">{mobileDate}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
