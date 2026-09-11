import { list, put } from '@vercel/blob';

export interface Review {
  id: string;
  reviewerName: string;
  companyName: string;
  websiteUrl: string | null;
  rating: number;
  reviewText: string;
  imageUrl: string | null;
  createdAt: string;
}

export interface NewReview {
  id: string;
  reviewerName: string;
  companyName: string;
  websiteUrl: string | null;
  rating: number;
  reviewText: string;
  imageUrl: string | null;
}

function storageIsConfigured() {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN || process.env.BLOB_STORE_ID);
}

export async function createReview(review: NewReview) {
  const storedReview: Review = {
    ...review,
    createdAt: new Date().toISOString(),
  };

  await put(`reviews/${review.id}.json`, JSON.stringify(storedReview), {
    access: 'public',
    addRandomSuffix: false,
    contentType: 'application/json',
    cacheControlMaxAge: 60,
  });
}

export async function listReviews(): Promise<Review[]> {
  if (!storageIsConfigured()) return [];

  const reviewBlobs = [];
  let cursor: string | undefined;

  do {
    const page = await list({ prefix: 'reviews/', cursor, limit: 1000 });
    reviewBlobs.push(...page.blobs.filter((blob) => blob.pathname.endsWith('.json')));
    cursor = page.hasMore ? page.cursor : undefined;
  } while (cursor);

  const reviews = await Promise.all(
    reviewBlobs.map(async (blob) => {
      const response = await fetch(blob.url, { cache: 'no-store' });
      if (!response.ok) throw new Error('A stored review could not be loaded.');
      return (await response.json()) as Review;
    }),
  );

  return reviews.sort(
    (first, second) =>
      new Date(second.createdAt).getTime() - new Date(first.createdAt).getTime(),
  );
}
