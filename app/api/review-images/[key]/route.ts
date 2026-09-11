import { env } from 'cloudflare:workers';

export async function GET(
  _request: Request,
  context: { params: Promise<{ key: string }> },
) {
  const { key } = await context.params;

  if (!/^review-[a-f0-9-]+\.(jpg|png|webp|gif)$/i.test(key)) {
    return new Response('Not found', { status: 404 });
  }

  const image = await env.UPLOADS.get(key);
  if (!image) {
    return new Response('Not found', { status: 404 });
  }

  const headers = new Headers();
  image.writeHttpMetadata(headers);
  headers.set('Cache-Control', 'public, max-age=31536000, immutable');
  headers.set('ETag', image.httpEtag);
  headers.set('X-Content-Type-Options', 'nosniff');

  return new Response(image.body, { headers });
}
