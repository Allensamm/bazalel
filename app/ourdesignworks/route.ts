import { absoluteUrl } from '@/lib/site';

export function GET() {
  return Response.redirect(absoluteUrl('/work'), 301);
}

export const HEAD = GET;
