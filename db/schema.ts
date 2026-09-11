export const createReviewsTableSql = `
  CREATE TABLE IF NOT EXISTS reviews (
    id TEXT PRIMARY KEY,
    reviewer_name TEXT NOT NULL,
    company_name TEXT NOT NULL,
    website_url TEXT,
    rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
    review_text TEXT NOT NULL,
    image_key TEXT,
    image_type TEXT,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  )
`;

export const createReviewsDateIndexSql = `
  CREATE INDEX IF NOT EXISTS idx_reviews_created_at
  ON reviews(created_at DESC)
`;

export const optimizeReviewsSql = 'PRAGMA optimize';
