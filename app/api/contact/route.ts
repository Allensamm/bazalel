const recipient = 'allensamuel569@gmail.com';

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

function validEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function validWebsite(value: string) {
  if (!value) return true;

  try {
    const url = new URL(value);
    return url.protocol === 'http:' || url.protocol === 'https:';
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
  let payload: ContactPayload;

  try {
    payload = (await request.json()) as ContactPayload;
  } catch {
    return Response.json({ error: 'Invalid form submission.' }, { status: 400 });
  }

  if (cleanText(payload.companyWebsite, 200)) {
    return Response.json({ ok: true });
  }

  const name = cleanText(payload.name, 100);
  const email = cleanText(payload.email, 160).toLowerCase();
  const company = cleanText(payload.company, 140);
  const website = cleanText(payload.website, 300);
  const industry = cleanText(payload.industry, 100);
  const timeline = cleanText(payload.timeline, 100);
  const message = cleanText(payload.message, 2000);

  if (!name || !email || !company || !industry || !timeline || message.length < 30) {
    return Response.json(
      { error: 'Please complete every required field.' },
      { status: 400 },
    );
  }

  if (!validEmail(email)) {
    return Response.json({ error: 'Enter a valid email address.' }, { status: 400 });
  }

  if (!validWebsite(website)) {
    return Response.json(
      { error: 'Enter a complete website address beginning with https://.' },
      { status: 400 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY?.trim();
  const fromAddress = process.env.CONTACT_FROM_EMAIL?.trim();

  if (!apiKey || !fromAddress) {
    return Response.json(
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

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      'Idempotency-Key': crypto.randomUUID(),
    },
    body: JSON.stringify({
      from: fromAddress,
      to: [recipient],
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
  });

  if (!response.ok) {
    return Response.json(
      { error: 'Your message could not be delivered. Please email us directly.' },
      { status: 502 },
    );
  }

  return Response.json({ ok: true });
}
