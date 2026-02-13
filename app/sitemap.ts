import { getAllArticlesMetadata } from '@/lib/blog/get-articles';
import type { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const articles = await getAllArticlesMetadata();

  const articleUrls = articles.map((article) => ({
    url: `https://maxpaths.com/blog/${article.slug}`,
    lastModified: article.updatedAt || article.publishedAt,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // Guides disponibles
  const guideUrls = [
    {
      url: 'https://maxpaths.com/guides/nextjs-demo',
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: 'https://maxpaths.com/guides/react-19-advanced',
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
  ];

  return [
    {
      url: 'https://maxpaths.com',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: 'https://maxpaths.com/guides',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: 'https://maxpaths.com/blog',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: 'https://maxpaths.com/about',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    ...guideUrls,
    ...articleUrls,
  ];
}
