import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'SIRA MAG - Le média panafricain des femmes',
  description:
    'SIRA MAG : actualités, success stories, mode de vie, podcasts et vidéos dédiés aux femmes d\'Afrique',
  keywords: [
    'femmes africaines',
    'actualités',
    'podcast',
    'webzine',
    'Afrique',
    'Sénégal',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="bg-white text-gray-900">
        {children}
      </body>
    </html>
  );
}
