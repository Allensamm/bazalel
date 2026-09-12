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

## Private enquiry inbox

Contact-form submissions are stored in Supabase and displayed only at
`/myrequest` after the administrator completes password and authenticator-app
verification. Add these Vercel environment variables:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
- `SUPABASE_SECRET_KEY` (server-only; never use a `NEXT_PUBLIC_` prefix)

In the Supabase SQL Editor, run:

```text
supabase/migrations/20260912000000_create_contact_requests.sql
```

Then create exactly one administrator under Authentication → Users with the
email `allen@bazaleldesign.com` and a strong unique password. Do not expose a
sign-up route, and disable public user registration in Supabase. On the first
login, `/myrequest` will ask the administrator to scan a QR code with an
authenticator app and verify the current six-digit code.

Email notification is optional. Supabase storage succeeds independently of
Resend. To receive a notification after an enquiry is saved, add:

- `RESEND_API_KEY`
- `CONTACT_FROM_EMAIL` (an address on a domain verified with Resend)

Optional notification emails are delivered to `allen@bazaleldesign.com`, which
is centralized in `lib/site.ts` and also used for the public contact link.

To protect the private review form, add a long random `REVIEW_SUBMISSION_KEY`.
The review link then becomes:

```text
https://www.bazaleldesign.com/makeareview?key=YOUR_VALUE
```

Apply environment variables to Production and Preview as needed, then redeploy.

## Manual Vercel / DNS / external actions

- Add both `bazaleldesign.com` and `www.bazaleldesign.com` to the Vercel project.
  Make `www.bazaleldesign.com` primary and redirect the apex domain to it.
- Connect a Vercel Blob store before accepting reviews. Review text and uploaded
  images are intentionally published on the Work page.
- Create a Supabase project, run the included contact-request migration, create
  only the `allen@bazaleldesign.com` administrator, disable public sign-ups,
  and add the three Supabase variables above to Vercel Production.
- Store `SUPABASE_SECRET_KEY` only in Vercel's server-side environment. It
  bypasses Row Level Security and must never be committed or exposed to the
  browser.
- Save a backup authenticator factor in Supabase or keep its setup secret in a
  secure password manager. Losing every factor requires an administrator reset
  from the Supabase dashboard.
- Free Supabase projects may pause after inactivity. Monitor the project and
  consider a paid plan later if uninterrupted production availability becomes
  essential.
- Optional: make sure `allen@bazaleldesign.com` is active and receiving mail,
  then configure Resend using an address on a verified domain for
  `CONTACT_FROM_EMAIL`.
- Keep the Content Security Policy in Report-Only mode while reviewing the
  browser console on production and preview pages. Enforce it only after
  confirming that legitimate resources do not generate violations.
- Consider enabling Vercel Firewall or Bot Protection for durable, distributed
  form rate limiting. The included in-memory limiter is best-effort because
  serverless instances do not share memory.
- In Google Search Console, add and verify the domain property using the DNS TXT
  value Google supplies, then submit `https://www.bazaleldesign.com/sitemap.xml`.
- In Bing Webmaster Tools, import the verified Search Console property or use
  Bing's supplied verification method, then submit the same sitemap URL.
- If Zoho hosts the professional email, copy the exact SPF and DKIM records from
  Zoho Admin into DNS. Add a DMARC record after SPF and DKIM pass; choose its
  policy with the email administrator rather than copying a generic value.
- Add privacy-conscious analytics only if needed, update the privacy policy for
  the chosen provider, and obtain consent where applicable.
- Have the starter Privacy Policy and Website Terms reviewed for the business's
  operating jurisdiction before relying on them.

## Checks

```bash
npm run lint
npm run build
```
