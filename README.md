# Bazalel

Bazalel is a Next.js and TypeScript website for a Squarespace design agency.

## Local development

```bash
npm install
cp .env.example .env.local
npm run dev
```

## Vercel deployment

The project uses the standard Next.js build output and can be deployed directly
from the `main` branch.

To enable the review form, create a Vercel Blob store for the project. Vercel
will provide the `BLOB_READ_WRITE_TOKEN` environment variable.

To enable contact-form email delivery, add these project environment variables:

- `RESEND_API_KEY`
- `CONTACT_FROM_EMAIL` (an address on a domain verified with Resend)

The contact form sends enquiries to `allensamuel569@gmail.com`.

## Checks

```bash
npm run lint
npm run build
```
