import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ReviewForm } from '@/components/ReviewForm';
import { createPageMetadata } from '@/lib/site';

export const metadata: Metadata = createPageMetadata({
  title: 'Share Your Review',
  description: 'Share your experience working with Bazalel.',
  path: '/makeareview',
  noIndex: true,
});

interface MakeAReviewPageProps {
  searchParams: Promise<{ key?: string | string[] }>;
}

export default async function MakeAReviewPage({ searchParams }: MakeAReviewPageProps) {
  const parameters = await searchParams;
  const suppliedKey = Array.isArray(parameters.key) ? parameters.key[0] : parameters.key;
  const requiredKey = process.env.REVIEW_SUBMISSION_KEY?.trim();

  if (requiredKey && suppliedKey !== requiredKey) notFound();

  return (
    <main id="main-content" className="review-page">
      <section className="review-page__body">
        <ReviewForm submissionKey={suppliedKey} />
      </section>
    </main>
  );
}
