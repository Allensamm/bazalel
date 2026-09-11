import type { Metadata } from 'next';
import { Navbar } from '@/components/Navbar';
import { ReviewForm } from '@/components/ReviewForm';

export const metadata: Metadata = {
  title: 'Share Your Review',
  description: 'Share your experience working with Bazalel.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function MakeAReviewPage() {
  return (
    <main className="review-page">
      <Navbar />
      <section className="review-page__body">
        <ReviewForm />
      </section>
    </main>
  );
}
