import { del, put } from '@vercel/blob';
import { createReview } from '@/lib/reviews';
import {
  checkRateLimit,
  exceedsContentLength,
  isSameOriginRequest,
  jsonResponse,
} from '@/lib/request-security';

const allowedImageTypes = new Map([
  ['image/jpeg', 'jpg'],
  ['image/png', 'png'],
  ['image/webp', 'webp'],
  ['image/gif', 'gif'],
]);

const maxImageSize = 5 * 1024 * 1024;

function textField(formData: FormData, name: string) {
  const value = formData.get(name);
  return typeof value === 'string' ? value.trim() : '';
}

function normalizeWebsite(value: string) {
  if (!value) return null;

  const url = new URL(value);
  if (url.protocol !== 'http:' && url.protocol !== 'https:') {
    throw new Error('Website URL must use http or https.');
  }

  if (url.username || url.password) {
    throw new Error('Website URL cannot contain credentials.');
  }

  return url.toString();
}

async function hasValidImageSignature(file: File) {
  const bytes = new Uint8Array(await file.slice(0, 12).arrayBuffer());

  if (file.type === 'image/jpeg') {
    return bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff;
  }

  if (file.type === 'image/png') {
    return [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0, 0x1a, 0x0a]
      .every((byte, index) => bytes[index] === byte);
  }

  if (file.type === 'image/webp') {
    return String.fromCharCode(...bytes.slice(0, 4)) === 'RIFF'
      && String.fromCharCode(...bytes.slice(8, 12)) === 'WEBP';
  }

  if (file.type === 'image/gif') {
    const signature = String.fromCharCode(...bytes.slice(0, 6));
    return signature === 'GIF87a' || signature === 'GIF89a';
  }

  return false;
}

export async function POST(request: Request) {
  let imageUrl: string | null = null;

  try {
    if (!isSameOriginRequest(request)) {
      return jsonResponse({ error: 'Invalid form submission.' }, { status: 403 });
    }

    if (!request.headers.get('content-type')?.includes('multipart/form-data')) {
      return jsonResponse({ error: 'Invalid form submission.' }, { status: 415 });
    }

    if (exceedsContentLength(request, 6 * 1024 * 1024)) {
      return jsonResponse({ error: 'The form submission is too large.' }, { status: 413 });
    }

    const rateLimit = checkRateLimit(request, 'reviews', {
      limit: 3,
      windowMs: 60 * 60 * 1000,
    });

    if (!rateLimit.allowed) {
      return jsonResponse(
        { error: 'Too many attempts. Please wait before trying again.' },
        {
          status: 429,
          headers: { 'Retry-After': String(rateLimit.retryAfter) },
        },
      );
    }

    if (!process.env.BLOB_READ_WRITE_TOKEN && !process.env.BLOB_STORE_ID) {
      return jsonResponse(
        { error: 'Review storage is not configured yet.' },
        { status: 503 },
      );
    }

    const formData = await request.formData();
    const honeypot = textField(formData, 'companyWebsite');
    const requiredKey = process.env.REVIEW_SUBMISSION_KEY?.trim();
    const suppliedKey = textField(formData, 'submissionKey');

    if (honeypot) {
      return jsonResponse({ ok: true }, { status: 201 });
    }

    if (requiredKey && suppliedKey !== requiredKey) {
      return jsonResponse({ error: 'Invalid review link.' }, { status: 403 });
    }

    const reviewerName = textField(formData, 'reviewerName');
    const companyName = textField(formData, 'companyName');
    const reviewText = textField(formData, 'reviewText');
    const rawWebsiteUrl = textField(formData, 'websiteUrl');
    const rating = Number(textField(formData, 'rating'));
    const projectImage = formData.get('projectImage');
    const hasImage = projectImage instanceof File && projectImage.size > 0;

    if (!reviewerName || !companyName || !reviewText) {
      return jsonResponse(
        { error: 'Name, company and review are required.' },
        { status: 400 },
      );
    }

    if (
      reviewerName.length > 100
      || companyName.length > 120
      || rawWebsiteUrl.length > 300
    ) {
      return jsonResponse({ error: 'Name or company is too long.' }, { status: 400 });
    }

    if (reviewText.length < 20 || reviewText.length > 1200) {
      return jsonResponse(
        { error: 'Your review must be between 20 and 1,200 characters.' },
        { status: 400 },
      );
    }

    if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
      return jsonResponse({ error: 'Choose a rating from 1 to 5.' }, { status: 400 });
    }

    if (!rawWebsiteUrl && !hasImage) {
      return jsonResponse(
        { error: 'Add your website link or upload a project image.' },
        { status: 400 },
      );
    }

    let websiteUrl: string | null;
    try {
      websiteUrl = normalizeWebsite(rawWebsiteUrl);
    } catch {
      return jsonResponse(
        { error: 'Enter a complete website address beginning with https://.' },
        { status: 400 },
      );
    }

    if (hasImage) {
      const extension = allowedImageTypes.get(projectImage.type);
      if (!extension) {
        return jsonResponse(
          { error: 'Upload a JPG, PNG, WebP or GIF image.' },
          { status: 400 },
        );
      }

      if (projectImage.size > maxImageSize) {
        return jsonResponse(
          { error: 'The image must be smaller than 5 MB.' },
          { status: 400 },
        );
      }

      if (!(await hasValidImageSignature(projectImage))) {
        return jsonResponse(
          { error: 'The selected file is not a valid supported image.' },
          { status: 400 },
        );
      }

      const image = await put(
        `review-images/review-${crypto.randomUUID()}.${extension}`,
        projectImage,
        {
          access: 'public',
          addRandomSuffix: false,
          contentType: projectImage.type,
          cacheControlMaxAge: 31536000,
        },
      );
      imageUrl = image.url;
    }

    await createReview({
      id: crypto.randomUUID(),
      reviewerName,
      companyName,
      websiteUrl,
      rating,
      reviewText,
      imageUrl,
    });

    return jsonResponse({ ok: true }, { status: 201 });
  } catch {
    if (imageUrl) {
      await del(imageUrl).catch(() => undefined);
    }

    return jsonResponse(
      { error: 'We couldn’t save your review. Please try again.' },
      { status: 500 },
    );
  }
}
