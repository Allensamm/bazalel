'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { CONTACT_EMAIL } from '@/lib/site';
import { createSupabaseBrowserClient } from '@/lib/supabase/client';

export function AdminLoginForm() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  async function submitLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = String(formData.get('email') ?? '').trim().toLowerCase();
    const password = String(formData.get('password') ?? '');

    setSubmitting(true);
    setError('');

    try {
      const supabase = createSupabaseBrowserClient();
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError || data.user?.email?.toLowerCase() !== CONTACT_EMAIL) {
        await supabase.auth.signOut();
        setError('The email or password is incorrect.');
        return;
      }

      router.replace('/myrequest/verify');
      router.refresh();
    } catch {
      setError('The private inbox is temporarily unavailable.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className="admin-auth__form" onSubmit={submitLogin}>
      <label>
        Administrator email
        <input
          type="email"
          name="email"
          autoComplete="username"
          inputMode="email"
          required
        />
      </label>
      <label>
        Password
        <input
          type="password"
          name="password"
          autoComplete="current-password"
          minLength={8}
          required
        />
      </label>
      <button type="submit" disabled={submitting}>
        {submitting ? 'Checking…' : 'Continue'}
      </button>
      <div className="admin-auth__status" aria-live="polite">
        {error && <p role="alert">{error}</p>}
      </div>
    </form>
  );
}
