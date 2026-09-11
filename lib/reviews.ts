import { env } from 'cloudflare:workers';
import {
  createReviewsDateIndexSql,
  createReviewsTableSql,
  optimizeReviewsSql,
} from '@/db/schema';

export interface Review {
  id: string;
  reviewerName: string;
  companyName: string;
  websiteUrl: string | null;
  rating: number;
  reviewText: string;
  imageKey: string | null;
  imageType: string | null;
  createdAt: string;
}

interface ReviewRow {
  id: string;
  reviewer_name: string;
  company_name: string;
  website_url: string | null;
  rating: number;
  review_text: string;
  image_key: string | null;
  image_type: string | null;
  created_at: string;
}

export interface NewReview {
  id: string;
  reviewerName: string;
  companyName: string;
  websiteUrl: string | null;
  rating: number;
  reviewText: string;
  imageKey: string | null;
  imageType: string | null;
}

export async function ensureReviewsSchema() {
  const database = env.DB;

  await database.batch([
    database.prepare(createReviewsTableSql),
    database.prepare(createReviewsDateIndexSql),
    database.prepare(optimizeReviewsSql),
  ]);
}

export async function createReview(review: NewReview) {
  await ensureReviewsSchema();

  await env.DB.prepare(
    `INSERT INTO reviews (
      id,
      reviewer_name,
      company_name,
      website_url,
      rating,
      review_text,
      image_key,
      image_type
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
  )
    .bind(
      review.id,
      review.reviewerName,
      review.companyName,
      review.websiteUrl,
      review.rating,
      review.reviewText,
      review.imageKey,
      review.imageType,
    )
    .run();
}

export async function listReviews(): Promise<Review[]> {
  await ensureReviewsSchema();

  const result = await env.DB.prepare(
    `SELECT
      id,
      reviewer_name,
      company_name,
      website_url,
      rating,
      review_text,
      image_key,
      image_type,
      created_at
    FROM reviews
    ORDER BY created_at DESC`,
  ).all<ReviewRow>();

  return result.results.map((review) => ({
    id: review.id,
    reviewerName: review.reviewer_name,
    companyName: review.company_name,
    websiteUrl: review.website_url,
    rating: review.rating,
    reviewText: review.review_text,
    imageKey: review.image_key,
    imageType: review.image_type,
    createdAt: review.created_at,
  }));
}
