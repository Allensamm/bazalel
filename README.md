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

Contact-form enquiries are delivered to `allen@bazaleldesign.com`, which is
centralized in `lib/site.ts` and also used for the public contact link.

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
- Make sure `allen@bazaleldesign.com` is active and receiving mail. Configure
  the Resend variables above, using an address on a Resend-verified domain for
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
