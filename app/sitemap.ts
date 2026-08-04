import type { MetadataRoute } from 'next';
import { getAllPublishedSlugs, getAllAuthors } from '@/lib/content';
import { navigation } from '@/lib/navigation';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://siramag.netlify.app';

  const staticPages: MetadataRoute.Sitemap = [
    { url: base, lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    { url: `${base}/newsletter`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${base}/contact`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.5 },
    { url: `${base}/qui-sommes-nous`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/nos-services`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/mentions-legales`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    { url: `${base}/politique-de-confidentialite`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    { url: `${base}/conditions-utilisation`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    { url: `${base}/faq`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.4 },
    { url: `${base}/publicite`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${base}/recherche`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.5 },
    { url: `${base}/auteurs`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.6 },
  ];

  const navPages: MetadataRoute.Sitemap = [];
  navigation.forEach((item) => {
    navPages.push({ url: `${base}${item.href}`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 });
    item.subItems?.forEach((sub) => {
      navPages.push({ url: `${base}${sub.href}`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.8 });
    });
  });

  const slugs = await getAllPublishedSlugs();
  const articlePages: MetadataRoute.Sitemap = slugs.map((slug) => ({
    url: `${base}/article/${slug}`,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  const authors = await getAllAuthors();
  const authorPages: MetadataRoute.Sitemap = authors.map((a) => ({
    url: `${base}/auteurs/${a.id}`,
    changeFrequency: 'monthly',
    priority: 0.5,
  }));

  return [...staticPages, ...navPages, ...articlePages, ...authorPages];
}
