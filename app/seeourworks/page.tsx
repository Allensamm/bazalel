import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { listReviews, type Review } from '@/lib/reviews';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Our Design Work',
  description: 'Explore Bazalel websites designed to build trust, clarify value, and guide visitors towards action.',
};

function ReviewCard({ review }: { review: Review }) {
  const date = new Intl.DateTimeFormat('en-US', {
    month: 'short',
    year: 'numeric',
  }).format(new Date(`${review.createdAt}Z`));

  return (
    <article className="client-review" data-reveal="up">
      <div className="client-review__visual">
        {review.imageKey ? (
          <Image
            src={`/api/review-images/${review.imageKey}`}
            alt={`${review.companyName} website or project`}
            fill
            sizes="(max-width: 760px) 100vw, 50vw"
            unoptimized
          />
        ) : (
          <span aria-hidden="true">{review.companyName.charAt(0).toUpperCase()}</span>
        )}
      </div>

      <div className="client-review__content">
        <div className="client-review__meta">
          <p aria-label={`${review.rating} out of 5 stars`}>
            {'★'.repeat(review.rating)}
            <span aria-hidden="true">{'☆'.repeat(5 - review.rating)}</span>
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
            <Link href={review.websiteUrl} target="_blank" rel="noreferrer">
              Visit website <span aria-hidden="true">↗</span>
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}

export default async function SeeOurWorksPage() {
  let reviews: Review[] = [];

  try {
    reviews = await listReviews();
  } catch {
    reviews = [];
  }

  return (
    <main className="works-page">
      <Navbar />

      <header className="works-page__hero">
        <p data-reveal="up">Business goals, made visible</p>
        <h1 data-reveal="up" className="reveal-delay-1">
          Websites that make the next step feel obvious.
        </h1>
      </header>

      <section className="featured-work" aria-labelledby="featured-work-title">
        <div className="featured-work__heading" data-reveal="up">
          <p>Featured website</p>
          <h2 id="featured-work-title">Studio No. 8</h2>
          <span>Interior design · Squarespace concept</span>
        </div>
        <div className="featured-work__image" data-reveal="scale">
          <Image
            src="/dummy-squarespace-site.png"
            alt="Studio No. 8 interior design website concept"
            width={1024}
            height={1536}
            sizes="(max-width: 900px) 92vw, 72vw"
            priority
          />
        </div>
      </section>

      <section className="reviews-collection" aria-labelledby="reviews-title">
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
  );
}
