import type { MetadataRoute } from 'next';
import { projects } from '@/lib/projects';
import { absoluteUrl } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: Array<{
    path: string;
    changeFrequency: 'weekly' | 'monthly' | 'yearly';
    priority: number;
  }> = [
    { path: '/', changeFrequency: 'weekly', priority: 1 },
    { path: '/work', changeFrequency: 'monthly', priority: 0.8 },
    { path: '/law-firm-web-design', changeFrequency: 'monthly', priority: 0.9 },
    { path: '/industries', changeFrequency: 'monthly', priority: 0.8 },
    { path: '/approach', changeFrequency: 'monthly', priority: 0.7 },
    { path: '/contact', changeFrequency: 'yearly', priority: 0.7 },
    { path: '/privacy', changeFrequency: 'yearly', priority: 0.2 },
    { path: '/terms', changeFrequency: 'yearly', priority: 0.2 },
  ];

  const projectPages = projects.map((project) => ({
    url: absoluteUrl(`/work/${project.slug}`),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [
    ...pages.map((page) => ({
      url: absoluteUrl(page.path),
      changeFrequency: page.changeFrequency,
      priority: page.priority,
    })),
    ...projectPages,
  ];
}
