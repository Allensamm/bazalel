import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { SiteFooter } from '@/components/SiteFooter';
import { listReviews, type Review } from '@/lib/reviews';
import { projects } from '@/lib/projects';
import { createPageMetadata } from '@/lib/site';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata: Metadata = createPageMetadata({
  title: 'Squarespace Website Design Work',
  description:
    'Explore Bazalel Squarespace concept work and client feedback, presented clearly without invented project results.',
  path: '/work',
});

function ReviewCard({ review }: { review: Review }) {
  const date = new Intl.DateTimeFormat('en-US', {
    month: 'short',
    year: 'numeric',
  }).format(new Date(review.createdAt));

  return (
    <article className="client-review" data-reveal="up">
      <div className="client-review__visual">
        {review.imageUrl ? (
          <Image
            src={review.imageUrl}
            alt={`${review.companyName} website or project shared with their review`}
            fill
            sizes="(max-width: 760px) 100vw, 50vw"
          />
        ) : (
          <span aria-hidden="true">{review.companyName.charAt(0).toUpperCase()}</span>
        )}
      </div>

      <div className="client-review__content">
        <div className="client-review__meta">
          <p aria-label={`${review.rating} out of 5 stars`}>
            <span aria-hidden="true">
              {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
            </span>
          </p>
          <time dateTime={review.createdAt}>{date}</time>
        </div>
        <blockquote>“{review.reviewText}”</blockquote>
        <div className="client-review__person">
          <div>
            <strong>{review.reviewerName}</strong>
            <span>{review.companyName}</span>
          </div>
          {review.websiteUrl && (
            <Link
              href={review.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Visit website <span aria-hidden="true">↗</span>
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}

export default async function WorkPage() {
  let reviews: Review[] = [];

  try {
    reviews = await listReviews();
  } catch {
    reviews = [];
  }

  const featuredProject = projects[0];

  return (
    <>
      <main id="main-content" className="works-page">
        <header className="works-page__hero">
        <p data-reveal="up">Business goals, made visible</p>
        <h1 data-reveal="up" className="reveal-delay-1">
          Websites that make the next step feel obvious.
        </h1>
      </header>

      <section className="featured-work" aria-labelledby="featured-work-title">
        <div className="featured-work__heading" data-reveal="up">
          <p>Featured website</p>
          <h2 id="featured-work-title">{featuredProject.title}</h2>
          <span>{featuredProject.category}</span>
          <Link className="featured-work__details" href={`/work/${featuredProject.slug}`}>
            View concept details <span aria-hidden="true">→</span>
          </Link>
        </div>
        <Link
          href={`/work/${featuredProject.slug}`}
          className="featured-work__image"
          data-reveal="scale"
          aria-label={`View ${featuredProject.title} concept details`}
        >
          <Image
            src={featuredProject.image}
            alt={featuredProject.imageAlt}
            width={1024}
            height={1536}
            sizes="(max-width: 900px) 92vw, 72vw"
          />
        </Link>
      </section>

      <section id="client-stories" className="reviews-collection" aria-labelledby="reviews-title">
        <div className="reviews-collection__heading" data-reveal="up">
          <p>In their words</p>
          <h2 id="reviews-title">What our clients say.</h2>
        </div>

        {reviews.length > 0 ? (
          <div className="reviews-collection__grid">
            {reviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        ) : (
          <div className="reviews-collection__empty" data-reveal="up">
            <p>New client stories will appear here soon.</p>
          </div>
        )}
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
