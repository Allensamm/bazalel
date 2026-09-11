'use client';

import Link from 'next/link';
import { FormEvent, useState } from 'react';

type FormStatus =
  | { state: 'idle' }
  | { state: 'submitting' }
  | { state: 'success' }
  | { state: 'error'; message: string };

export function ReviewForm() {
  const [status, setStatus] = useState<FormStatus>({ state: 'idle' });
  const [fileName, setFileName] = useState('');

  async function submitReview(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const websiteUrl = String(formData.get('websiteUrl') ?? '').trim();
    const image = formData.get('projectImage');

    if (!websiteUrl && (!(image instanceof File) || image.size === 0)) {
      setStatus({
        state: 'error',
        message: 'Please add your website link or upload a project image.',
      });
      return;
    }

    setStatus({ state: 'submitting' });

    try {
      const response = await fetch('/api/reviews', {
        method: 'POST',
        body: formData,
      });
      const result = (await response.json()) as { error?: string };

      if (!response.ok) {
        setStatus({
          state: 'error',
          message: result.error ?? 'We couldn’t save your review. Please try again.',
        });
        return;
      }

      form.reset();
      setFileName('');
      setStatus({ state: 'success' });
    } catch {
      setStatus({
        state: 'error',
        message: 'We couldn’t save your review. Please check your connection.',
      });
    }
  }

  if (status.state === 'success') {
    return (
      <div className="review-success" role="status">
        <span aria-hidden="true">✓</span>
        <p className="review-form__eyebrow">Review received</p>
        <h2>Thank you for sharing your experience.</h2>
        <p>Your review is now live in the Bazalel work collection.</p>
        <Link href="/seeourworks">See your review <span aria-hidden="true">↗</span></Link>
      </div>
    );
  }

  return (
    <form className="review-form" onSubmit={submitReview}>
      <div className="review-form__heading">
        <p className="review-form__eyebrow">Private review link</p>
        <h1>Tell us about working with Bazalel.</h1>
        <p>
          Your words help future clients understand what thoughtful design can do
          for their business.
        </p>
      </div>

      <div className="review-form__grid">
        <label>
          Your name
          <input
            type="text"
            name="reviewerName"
            autoComplete="name"
            maxLength={100}
            required
          />
        </label>

        <label>
          Firm or business
          <input
            type="text"
            name="companyName"
            autoComplete="organization"
            maxLength={120}
            required
          />
        </label>

        <label>
          Your rating
          <select name="rating" defaultValue="5" required>
            <option value="5">5 — Exceptional</option>
            <option value="4">4 — Great</option>
            <option value="3">3 — Good</option>
            <option value="2">2 — Fair</option>
            <option value="1">1 — Needs improvement</option>
          </select>
        </label>

        <label>
          Website link
          <input
            type="url"
            name="websiteUrl"
            inputMode="url"
            autoComplete="url"
            placeholder="https://yourwebsite.com"
          />
        </label>

        <label className="review-form__message">
          Your review
          <textarea
            name="reviewText"
            minLength={20}
            maxLength={1200}
            rows={7}
            placeholder="What changed for your business, and what did you value about the process?"
            required
          />
        </label>

        <label className="review-form__upload">
          <span>Website or project image</span>
          <span className="review-form__upload-control">
            <strong>{fileName || 'Choose an image'}</strong>
            <small>JPG, PNG, WebP or GIF · 5 MB maximum</small>
          </span>
          <input
            type="file"
            name="projectImage"
            accept="image/jpeg,image/png,image/webp,image/gif"
            onChange={(event) => setFileName(event.target.files?.[0]?.name ?? '')}
          />
        </label>

        <label className="review-form__honeypot" aria-hidden="true">
          Company website
          <input type="text" name="companyWebsite" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="review-form__actions">
        <p>
          Add either a website link or a project image. Your review will be
          published when submitted.
        </p>
        <button type="submit" disabled={status.state === 'submitting'}>
          {status.state === 'submitting' ? 'Publishing…' : 'Publish review'}
          <span aria-hidden="true">↗</span>
        </button>
      </div>

      <div className="review-form__status" aria-live="polite">
        {status.state === 'error' && <p>{status.message}</p>}
      </div>
    </form>
  );
}
