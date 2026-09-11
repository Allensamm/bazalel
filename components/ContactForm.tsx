'use client';

import { FormEvent, useState } from 'react';

type ContactStatus =
  | { state: 'idle' }
  | { state: 'submitting' }
  | { state: 'success' }
  | { state: 'error'; message: string };

export function ContactForm() {
  const [status, setStatus] = useState<ContactStatus>({ state: 'idle' });

  async function submitContact(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    setStatus({ state: 'submitting' });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(formData.entries())),
      });
      const result = (await response.json()) as { error?: string };

      if (!response.ok) {
        setStatus({
          state: 'error',
          message: result.error ?? 'Your message could not be sent. Please try again.',
        });
        return;
      }

      form.reset();
      setStatus({ state: 'success' });
    } catch {
      setStatus({
        state: 'error',
        message: 'Your message could not be sent. Please check your connection.',
      });
    }
  }

  if (status.state === 'success') {
    return (
      <div className="contact-form contact-form--success" role="status" data-reveal="up">
        <span aria-hidden="true">✓</span>
        <p>Message sent</p>
        <h2>Thank you. We’ll be in touch.</h2>
        <button type="button" onClick={() => setStatus({ state: 'idle' })}>
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form className="contact-form" onSubmit={submitContact} data-reveal="up">
      <div className="contact-form__heading">
        <p>Project enquiry</p>
        <h2>Tell us about the opportunity.</h2>
      </div>

      <div className="contact-form__grid">
        <label>
          Your name
          <input type="text" name="name" autoComplete="name" maxLength={100} required />
        </label>

        <label>
          Work email
          <input type="email" name="email" autoComplete="email" maxLength={160} required />
        </label>

        <label>
          Business or firm
          <input
            type="text"
            name="company"
            autoComplete="organization"
            maxLength={140}
            required
          />
        </label>

        <label>
          Current website <span>Optional</span>
          <input
            type="url"
            name="website"
            inputMode="url"
            autoComplete="url"
            placeholder="https://"
            maxLength={300}
          />
        </label>

        <label>
          Industry
          <select name="industry" defaultValue="" required>
            <option value="" disabled>Select your industry</option>
            <option>Law firm</option>
            <option>Consulting or advisory</option>
            <option>Financial services</option>
            <option>Healthcare or wellness</option>
            <option>Real estate or property</option>
            <option>Creative or professional studio</option>
            <option>Education or training</option>
            <option>Other professional service</option>
          </select>
        </label>

        <label>
          Ideal timing
          <select name="timeline" defaultValue="" required>
            <option value="" disabled>Select a timeframe</option>
            <option>As soon as possible</option>
            <option>Within 1 month</option>
            <option>Within 2–3 months</option>
            <option>I’m planning ahead</option>
          </select>
        </label>

        <label className="contact-form__message">
          What should the website help you achieve?
          <textarea
            name="message"
            minLength={30}
            maxLength={2000}
            rows={7}
            placeholder="Tell us what is not working, what should improve, and what a successful result would look like."
            required
          />
        </label>

        <label className="contact-form__honeypot" aria-hidden="true">
          Leave this field empty
          <input type="text" name="companyWebsite" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="contact-form__actions">
        <p>Sent securely to the Bazalel team.</p>
        <button type="submit" disabled={status.state === 'submitting'}>
          {status.state === 'submitting' ? 'Sending…' : 'Send enquiry'}
          <span aria-hidden="true">→</span>
        </button>
      </div>

      <div className="contact-form__status" aria-live="polite">
        {status.state === 'error' && <p>{status.message}</p>}
      </div>
    </form>
  );
}
