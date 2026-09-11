import { del, put } from '@vercel/blob';
import { createReview } from '@/lib/reviews';

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

  return url.toString();
}

export async function POST(request: Request) {
  let imageUrl: string | null = null;

  try {
    if (!process.env.BLOB_READ_WRITE_TOKEN && !process.env.BLOB_STORE_ID) {
      return Response.json(
        { error: 'Review storage is not configured yet.' },
        { status: 503 },
      );
    }

    const formData = await request.formData();
    const honeypot = textField(formData, 'companyWebsite');

    if (honeypot) {
      return Response.json({ ok: true }, { status: 201 });
    }

    const reviewerName = textField(formData, 'reviewerName');
    const companyName = textField(formData, 'companyName');
    const reviewText = textField(formData, 'reviewText');
    const rawWebsiteUrl = textField(formData, 'websiteUrl');
    const rating = Number(textField(formData, 'rating'));
    const projectImage = formData.get('projectImage');
    const hasImage = projectImage instanceof File && projectImage.size > 0;

    if (!reviewerName || !companyName || !reviewText) {
      return Response.json(
        { error: 'Name, company and review are required.' },
        { status: 400 },
      );
    }

    if (reviewerName.length > 100 || companyName.length > 120) {
      return Response.json({ error: 'Name or company is too long.' }, { status: 400 });
    }

    if (reviewText.length < 20 || reviewText.length > 1200) {
      return Response.json(
        { error: 'Your review must be between 20 and 1,200 characters.' },
        { status: 400 },
      );
    }

    if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
      return Response.json({ error: 'Choose a rating from 1 to 5.' }, { status: 400 });
    }

    if (!rawWebsiteUrl && !hasImage) {
      return Response.json(
        { error: 'Add your website link or upload a project image.' },
        { status: 400 },
      );
    }

    let websiteUrl: string | null;
    try {
      websiteUrl = normalizeWebsite(rawWebsiteUrl);
    } catch {
      return Response.json(
        { error: 'Enter a complete website address beginning with https://.' },
        { status: 400 },
      );
    }

    if (hasImage) {
      const extension = allowedImageTypes.get(projectImage.type);
      if (!extension) {
        return Response.json(
          { error: 'Upload a JPG, PNG, WebP or GIF image.' },
          { status: 400 },
        );
      }

      if (projectImage.size > maxImageSize) {
        return Response.json(
          { error: 'The image must be smaller than 5 MB.' },
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

    return Response.json({ ok: true }, { status: 201 });
  } catch {
    if (imageUrl) {
      await del(imageUrl).catch(() => undefined);
    }

    return Response.json(
      { error: 'We couldn’t save your review. Please try again.' },
      { status: 500 },
    );
  }
}
