import './globals.css';
import type { Metadata } from 'next';
// import { Poppins } from 'next/font/google';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { TopBar } from '@/components/layout/TopBar';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-poppins',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://siramag.com'),
  title: {
    default: "SIRA MAG — Le média qui donne aux femmes d'Afrique toute leur place",
    template: '%s | SIRA MAG',
  },
  description: "SIRA MAG, le média panafricain qui célèbre les femmes, leurs luttes, leurs succès et leur impact. Actu'Elles, Just'Elles, SIRA TV, Podcasts, Mode de Vie et plus encore.",
  keywords: ['SIRA MAG', 'femmes afrique', 'media féminin', 'entrepreneuriat féminin', 'afrique', 'senegal'],
  openGraph: {
    type: 'website', locale: 'fr_FR', url: 'https://siramag.com', siteName: 'SIRA MAG',
    title: "SIRA MAG — Le média qui donne aux femmes d'Afrique toute leur place",
    description: "Le média panafricain qui célèbre les femmes, leurs luttes, leurs succès et leur impact.",
    images: [{ url: '/Logo_Sirawebzine_png.png', width: 1200, height: 630, alt: 'SIRA MAG' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "SIRA MAG — Le média qui donne aux femmes d'Afrique toute leur place",
    description: "Le média panafricain qui célèbre les femmes.",
    images: ['/Logo_Sirawebzine_png.png'],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={poppins.variable}>
      <body>
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:z-[999] focus:top-2 focus:left-2 focus:bg-sira-orange focus:text-white focus:px-4 focus:py-2 focus:rounded">
          Aller au contenu principal
        </a>
        <TopBar />
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
