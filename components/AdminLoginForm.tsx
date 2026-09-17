'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { CONTACT_EMAIL } from '@/lib/site';
import { createSupabaseBrowserClient } from '@/lib/supabase/client';

interface AdminLoginFormProps {
  passwordReset?: boolean;
}

export function AdminLoginForm({ passwordReset = false }: AdminLoginFormProps) {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [requestingReset, setRequestingReset] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState(
    passwordReset ? 'Your password was changed. Sign in with the new password.' : '',
  );

  async function submitLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = String(formData.get('email') ?? '').trim().toLowerCase();
    const password = String(formData.get('password') ?? '');

    setSubmitting(true);
    setError('');
    setNotice('');

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

  async function requestPasswordReset() {
    setRequestingReset(true);
    setError('');
    setNotice('');

    try {
      const supabase = createSupabaseBrowserClient();
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(
        CONTACT_EMAIL,
        {
          redirectTo: `${window.location.origin}/myrequest/reset-password`,
        },
      );

      if (resetError) throw resetError;

      setNotice(
        `A secure reset link was sent to ${CONTACT_EMAIL}. Open it on this device, then confirm with your authenticator app.`,
      );
    } catch {
      setError('A reset link could not be sent right now. Please try again shortly.');
    } finally {
      setRequestingReset(false);
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
        <span className="admin-auth__password-field">
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            autoComplete="current-password"
            minLength={8}
            maxLength={128}
            required
          />
          <button
            type="button"
            className="admin-auth__password-toggle"
            aria-pressed={showPassword}
            aria-label={`${showPassword ? 'Hide' : 'Show'} password`}
            onClick={() => setShowPassword((visible) => !visible)}
          >
            {showPassword ? 'Hide' : 'Show'}
          </button>
        </span>
      </label>
      <button type="submit" disabled={submitting || requestingReset}>
        {submitting ? 'Checking…' : 'Continue'}
      </button>
      <button
        type="button"
        className="admin-auth__forgot"
        disabled={submitting || requestingReset}
        onClick={requestPasswordReset}
      >
        {requestingReset ? 'Sending secure reset link…' : 'Forgot your password?'}
      </button>
      <div className="admin-auth__status" aria-live="polite">
        {error && <p role="alert">{error}</p>}
        {notice && <p data-tone="success">{notice}</p>}
      </div>
    </form>
  );
}
