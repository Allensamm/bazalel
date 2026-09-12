import type { Metadata } from 'next';
import Link from 'next/link';
import { SiteFooter } from '@/components/SiteFooter';
import { articles, formatArticleDate, getArticleReadingMinutes } from '@/lib/articles';
import { createPageMetadata } from '@/lib/site';

export const metadata: Metadata = createPageMetadata({
  title: 'Website Strategy & Squarespace Articles',
  description:
    'Practical Bazalel articles about Squarespace websites, law firm web design, professional-service websites, SEO, planning, and responsible redesigns.',
  path: '/bazalelpages',
});

export default function BazalelPagesIndex() {
  return (
    <>
      <main id="main-content" className="articles-index">
        <header className="articles-index__hero grid-surface">
          <div>
            <p data-reveal="up">Bazalel Pages</p>
            <h1 data-reveal="up" className="reveal-delay-1">
              Useful thinking for a website that has a job to do.
            </h1>
            <span data-reveal="up">
              Practical guidance for law firms, consultants, and professional-service
              businesses planning, improving, or protecting their website.
            </span>
          </div>
        </header>

        <section className="articles-index__collection grid-surface" aria-labelledby="article-collection-title">
          <div className="section-rule" data-reveal="up">
            <span>Website strategy, clearly explained</span>
            <i />
          </div>
          <div className="articles-index__heading" data-reveal="up">
            <h2 id="article-collection-title">Start with the question in front of you.</h2>
            <p>
              Every article is written to support a real decision—not to fill a content calendar.
            </p>
          </div>

          <div className="articles-index__grid">
            {articles.map((article, index) => (
              <article
                key={article.slug}
                className={index === 0 ? 'article-card article-card--featured' : 'article-card'}
                data-reveal="up"
              >
                <div className="article-card__meta">
                  <p>{article.category}</p>
                  <span>{getArticleReadingMinutes(article)} min read</span>
                </div>
                <h3>{article.title}</h3>
                <p className="article-card__description">{article.description}</p>
                <div className="article-card__footer">
                  <time dateTime={article.publishedAt}>{formatArticleDate(article.publishedAt)}</time>
                  <Link href={`/bazalelpages/${article.slug}`} aria-label={`Read ${article.title}`}>
                    Read article <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="articles-index__cta grid-surface" aria-labelledby="articles-cta-title">
          <div data-reveal="up">
            <p>A question specific to your business?</p>
            <h2 id="articles-cta-title">Tell us what the website needs to achieve.</h2>
            <Link href="/contact">
              Start a conversation <span aria-hidden="true">→</span>
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
