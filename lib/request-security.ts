interface RateLimitRecord {
  count: number;
  resetAt: number;
}

interface RateLimitOptions {
  limit: number;
  windowMs: number;
}

const globalRateLimit = globalThis as typeof globalThis & {
  bazalelRateLimits?: Map<string, RateLimitRecord>;
};

const rateLimits = globalRateLimit.bazalelRateLimits ?? new Map<string, RateLimitRecord>();
globalRateLimit.bazalelRateLimits = rateLimits;

function clientAddress(request: Request) {
  const forwarded = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim();
  const address = forwarded || request.headers.get('x-real-ip')?.trim();
  const userAgent = request.headers.get('user-agent')?.slice(0, 120) || 'unknown-agent';
  return address || `unknown:${userAgent}`;
}

export function checkRateLimit(
  request: Request,
  scope: string,
  { limit, windowMs }: RateLimitOptions,
) {
  const now = Date.now();

  if (rateLimits.size > 5000) {
    for (const [key, record] of rateLimits) {
      if (record.resetAt <= now) rateLimits.delete(key);
    }

    while (rateLimits.size > 5000) {
      const oldestKey = rateLimits.keys().next().value as string | undefined;
      if (!oldestKey) break;
      rateLimits.delete(oldestKey);
    }
  }

  const key = `${scope}:${clientAddress(request)}`;
  const current = rateLimits.get(key);

  if (!current || current.resetAt <= now) {
    rateLimits.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, retryAfter: 0 };
  }

  if (current.count >= limit) {
    return {
      allowed: false,
      retryAfter: Math.max(1, Math.ceil((current.resetAt - now) / 1000)),
    };
  }

  current.count += 1;
  return { allowed: true, retryAfter: 0 };
}

export function isSameOriginRequest(request: Request) {
  const fetchSite = request.headers.get('sec-fetch-site');
  if (fetchSite && !['same-origin', 'same-site', 'none'].includes(fetchSite)) {
    return false;
  }

  const origin = request.headers.get('origin');
  if (!origin) return true;

  try {
    return new URL(origin).origin === new URL(request.url).origin;
  } catch {
    return false;
  }
}

export function exceedsContentLength(request: Request, maximumBytes: number) {
  const value = request.headers.get('content-length');
  if (!value) return false;

  const contentLength = Number(value);
  return Number.isFinite(contentLength) && contentLength > maximumBytes;
}

export function jsonResponse(body: object, init?: ResponseInit) {
  const headers = new Headers(init?.headers);
  headers.set('Cache-Control', 'no-store');

  return Response.json(body, { ...init, headers });
}
