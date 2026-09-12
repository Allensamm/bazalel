import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArticlePage } from '@/components/ArticlePage';
import { SiteFooter } from '@/components/SiteFooter';
import { articles, getArticle } from '@/lib/articles';
import { createPageMetadata } from '@/lib/site';

interface ArticleRouteProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: ArticleRouteProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);

  if (!article) return {};

  return createPageMetadata({
    title: article.title,
    description: article.description,
    path: `/bazalelpages/${article.slug}`,
  });
}

export default async function ArticleRoute({ params }: ArticleRouteProps) {
  const { slug } = await params;
  const article = getArticle(slug);

  if (!article) notFound();

  return (
    <>
      <ArticlePage article={article} />
      <SiteFooter />
    </>
  );
}
