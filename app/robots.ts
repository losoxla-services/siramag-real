import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/', disallow: ['/recherche'] },
    sitemap: 'https://siramag.com/sitemap.xml',
  };
}
