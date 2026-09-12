import Link from 'next/link';
import { StructuredData } from '@/components/StructuredData';
import {
  articles,
  formatArticleDate,
  getArticleReadingMinutes,
  type Article,
  type LinkedParagraph,
} from '@/lib/articles';
import { absoluteUrl, SITE_URL } from '@/lib/site';

function ArticleParagraph({ paragraph }: { paragraph: string | LinkedParagraph }) {
  if (typeof paragraph === 'string') return <p>{paragraph}</p>;

  return (
    <p>
      {paragraph.before}
      <Link href={paragraph.href}>{paragraph.linkText}</Link>
      {paragraph.after}
    </p>
  );
}

export function ArticlePage({ article }: { article: Article }) {
  const relatedArticles = article.relatedSlugs
    .map((slug) => articles.find((candidate) => candidate.slug === slug))
    .filter((candidate): candidate is Article => Boolean(candidate));
  const articleUrl = `${SITE_URL}/bazalelpages/${article.slug}`;
  const structuredData = [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      '@id': `${articleUrl}/#article`,
      headline: article.title,
      description: article.description,
      datePublished: article.publishedAt,
      dateModified: article.updatedAt,
      mainEntityOfPage: articleUrl,
      isAccessibleForFree: true,
      image: absoluteUrl('/opengraph-image'),
      author: {
        '@type': 'Organization',
        name: 'Bazalel',
        url: `${SITE_URL}/`,
      },
      publisher: {
        '@type': 'Organization',
        name: 'Bazalel',
        url: `${SITE_URL}/`,
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: `${SITE_URL}/`,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Bazalel Pages',
          item: `${SITE_URL}/bazalelpages`,
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: article.title,
          item: articleUrl,
        },
      ],
    },
  ];

  return (
    <>
      <main id="main-content" className="article-page grid-surface">
        <StructuredData data={structuredData} />

        <header className="article-page__header">
          <Link className="article-page__back" href="/bazalelpages" data-reveal="up">
            <span aria-hidden="true">←</span> Bazalel Pages
          </Link>
          <p className="article-page__category" data-reveal="up">{article.category}</p>
          <h1 data-reveal="up" className="reveal-delay-1">{article.title}</h1>
          <p className="article-page__introduction" data-reveal="up">
            {article.introduction}
          </p>
          <div className="article-page__meta" data-reveal="up">
            <span>By Bazalel</span>
            <time dateTime={article.publishedAt}>{formatArticleDate(article.publishedAt)}</time>
            <span>{getArticleReadingMinutes(article)} min read</span>
          </div>
        </header>

        <div className="article-page__layout">
          <aside className="article-page__contents" aria-label="Article contents" data-reveal="up">
            <p>In this article</p>
            <ol>
              {article.sections.map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`}>{section.title}</a>
                </li>
              ))}
            </ol>
          </aside>

          <article className="article-page__body">
            <div className="article-page__takeaway" data-reveal="up">
              <span>Key takeaway</span>
              <p>{article.keyTakeaway}</p>
            </div>

            {article.sections.map((section, sectionIndex) => (
              <section
                id={section.id}
                className="article-page__section"
                key={section.id}
                aria-labelledby={`${section.id}-title`}
                data-reveal="up"
              >
                <span className="article-page__number" aria-hidden="true">
                  {String(sectionIndex + 1).padStart(2, '0')}
                </span>
                <h2 id={`${section.id}-title`}>{section.title}</h2>

                {section.paragraphs?.map((paragraph, index) => (
                  <ArticleParagraph key={`${section.id}-paragraph-${index}`} paragraph={paragraph} />
                ))}

                {section.items && (
                  <div className="article-page__items">
                    {section.items.map((item) => (
                      <div key={item.title}>
                        <h3>{item.title}</h3>
                        <p>{item.copy}</p>
                      </div>
                    ))}
                  </div>
                )}

                {section.bullets && (
                  <ul className="article-page__list">
                    {section.bullets.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                )}

                {section.numbered && (
                  <ol className="article-page__steps">
                    {section.numbered.map((item, index) => (
                      <li key={item}>
                        <span>{String(index + 1).padStart(2, '0')}</span>
                        <p>{item}</p>
                      </li>
                    ))}
                  </ol>
                )}

                {section.note && <aside className="article-page__note">{section.note}</aside>}
              </section>
            ))}

            <section className="article-page__service" aria-labelledby="article-service-title" data-reveal="up">
              <p>From reading to action</p>
              <h2 id="article-service-title">{article.serviceLink.label}</h2>
              <span>{article.serviceLink.copy}</span>
              <div>
                <Link href={article.serviceLink.href}>
                  Explore the service <span aria-hidden="true">→</span>
                </Link>
                <Link href="/contact">
                  Discuss your website <span aria-hidden="true">→</span>
                </Link>
              </div>
            </section>

            <section className="article-page__references" aria-labelledby="article-references-title">
              <h2 id="article-references-title">Official references and further reading</h2>
              <ul>
                {article.references.map((reference) => (
                  <li key={reference.href}>
                    <a href={reference.href} target="_blank" rel="noopener noreferrer">
                      {reference.label} <span>— {reference.source}</span>
                    </a>
                  </li>
                ))}
              </ul>
              <p>
                Platform features and prices can change. Confirm current details with the
                provider before making a purchase or migration decision.
              </p>
            </section>
          </article>
        </div>

        <section className="article-page__related" aria-labelledby="related-articles-title">
          <div className="section-rule" data-reveal="up">
            <span>Keep reading</span>
            <i />
          </div>
          <h2 id="related-articles-title" data-reveal="up">Related Bazalel Pages</h2>
          <div>
            {relatedArticles.map((related) => (
              <article key={related.slug} data-reveal="up">
                <p>{related.category}</p>
                <h3>{related.title}</h3>
                <Link href={`/bazalelpages/${related.slug}`}>
                  Read article <span aria-hidden="true">→</span>
                </Link>
              </article>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
