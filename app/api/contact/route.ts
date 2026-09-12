import { CONTACT_EMAIL } from '@/lib/site';
import {
  checkRateLimit,
  exceedsContentLength,
  isSameOriginRequest,
  jsonResponse,
} from '@/lib/request-security';

interface ContactPayload {
  name?: unknown;
  email?: unknown;
  company?: unknown;
  website?: unknown;
  industry?: unknown;
  timeline?: unknown;
  message?: unknown;
  companyWebsite?: unknown;
}

function cleanText(value: unknown, maximumLength: number) {
  return typeof value === 'string' ? value.trim().slice(0, maximumLength) : '';
}

function cleanSingleLine(value: unknown, maximumLength: number) {
  return cleanText(value, maximumLength).replace(/[\r\n\t]+/g, ' ');
}

function validEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function validWebsite(value: string) {
  if (!value) return true;

  try {
    const url = new URL(value);
    return (url.protocol === 'http:' || url.protocol === 'https:')
      && !url.username
      && !url.password;
  } catch {
    return false;
  }
}

function escapeHtml(value: string) {
  return value.replace(/[&<>'"]/g, (character) => {
    const replacements: Record<string, string> = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;',
    };

    return replacements[character];
  });
}

export async function POST(request: Request) {
  if (!isSameOriginRequest(request)) {
    return jsonResponse({ error: 'Invalid form submission.' }, { status: 403 });
  }

  if (!request.headers.get('content-type')?.includes('application/json')) {
    return jsonResponse({ error: 'Invalid form submission.' }, { status: 415 });
  }

  if (exceedsContentLength(request, 16 * 1024)) {
    return jsonResponse({ error: 'The form submission is too large.' }, { status: 413 });
  }

  const rateLimit = checkRateLimit(request, 'contact', {
    limit: 5,
    windowMs: 10 * 60 * 1000,
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

  let payload: ContactPayload;

  try {
    payload = (await request.json()) as ContactPayload;
  } catch {
    return jsonResponse({ error: 'Invalid form submission.' }, { status: 400 });
  }

  if (cleanText(payload.companyWebsite, 200)) {
    return jsonResponse({ ok: true });
  }

  const maximumLengths: Array<[unknown, number]> = [
    [payload.name, 100],
    [payload.email, 160],
    [payload.company, 140],
    [payload.website, 300],
    [payload.industry, 100],
    [payload.timeline, 100],
    [payload.message, 2000],
  ];

  if (maximumLengths.some(([value, maximum]) => (
    typeof value === 'string' && value.length > maximum
  ))) {
    return jsonResponse({ error: 'One or more fields are too long.' }, { status: 400 });
  }

  const name = cleanSingleLine(payload.name, 100);
  const email = cleanSingleLine(payload.email, 160).toLowerCase();
  const company = cleanSingleLine(payload.company, 140);
  const website = cleanSingleLine(payload.website, 300);
  const industry = cleanSingleLine(payload.industry, 100);
  const timeline = cleanSingleLine(payload.timeline, 100);
  const message = cleanText(payload.message, 2000);

  if (!name || !email || !company || !industry || !timeline || message.length < 30) {
    return jsonResponse(
      { error: 'Please complete every required field.' },
      { status: 400 },
    );
  }

  if (!validEmail(email)) {
    return jsonResponse({ error: 'Enter a valid email address.' }, { status: 400 });
  }

  if (!validWebsite(website)) {
    return jsonResponse(
      { error: 'Enter a complete website address beginning with https://.' },
      { status: 400 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY?.trim();
  const fromAddress = process.env.CONTACT_FROM_EMAIL?.trim();

  if (!apiKey || !fromAddress) {
    return jsonResponse(
      { error: 'Email delivery is not configured yet. Please email us directly.' },
      { status: 503 },
    );
  }

  const safe = {
    name: escapeHtml(name),
    email: escapeHtml(email),
    company: escapeHtml(company),
    website: escapeHtml(website || 'Not provided'),
    industry: escapeHtml(industry),
    timeline: escapeHtml(timeline),
    message: escapeHtml(message).replace(/\n/g, '<br />'),
  };

  let response: Response;

  try {
    response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'Idempotency-Key': crypto.randomUUID(),
      },
      body: JSON.stringify({
        from: fromAddress,
        to: [CONTACT_EMAIL],
        reply_to: email,
        subject: `New Bazalel enquiry from ${name} — ${company}`,
        text: [
          `Name: ${name}`,
          `Email: ${email}`,
          `Business: ${company}`,
          `Website: ${website || 'Not provided'}`,
          `Industry: ${industry}`,
          `Timeline: ${timeline}`,
          '',
          'Project goal:',
          message,
        ].join('\n'),
        html: `
          <h1>New Bazalel project enquiry</h1>
          <p><strong>Name:</strong> ${safe.name}</p>
          <p><strong>Email:</strong> ${safe.email}</p>
          <p><strong>Business:</strong> ${safe.company}</p>
          <p><strong>Website:</strong> ${safe.website}</p>
          <p><strong>Industry:</strong> ${safe.industry}</p>
          <p><strong>Timeline:</strong> ${safe.timeline}</p>
          <hr />
          <p><strong>What the website should help achieve:</strong></p>
          <p>${safe.message}</p>
        `,
      }),
      signal: AbortSignal.timeout(12_000),
    });
  } catch {
    return jsonResponse(
      { error: 'Your message could not be delivered. Please email us directly.' },
      { status: 502 },
    );
  }

  if (!response.ok) {
    return jsonResponse(
      { error: 'Your message could not be delivered. Please email us directly.' },
      { status: 502 },
    );
  }

  return jsonResponse({ ok: true });
}
