declare namespace Cloudflare {
  interface Env {
    DB: D1Database;
    UPLOADS: R2Bucket;
    RESEND_API_KEY: string;
    CONTACT_FROM_EMAIL: string;
  }
}
