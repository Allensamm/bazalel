'use client';

import { FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { CONTACT_EMAIL } from '@/lib/site';
import { createSupabaseBrowserClient } from '@/lib/supabase/client';

type ResetStage = 'checking' | 'verify' | 'password' | 'error';

export function AdminResetPasswordForm() {
  const router = useRouter();
  const [stage, setStage] = useState<ResetStage>('checking');
  const [factorId, setFactorId] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;

    async function prepareRecovery() {
      try {
        const supabase = createSupabaseBrowserClient();

        // getSession waits for the PKCE recovery code in the URL to be
        // exchanged before the verified user and MFA factors are inspected.
        await supabase.auth.getSession();
        const { data: userData, error: userError } = await supabase.auth.getUser();

        if (
          userError
          || userData.user?.email?.toLowerCase() !== CONTACT_EMAIL
        ) {
          throw new Error('invalid-recovery-session');
        }

        const { data: factors, error: factorsError } = await supabase.auth.mfa.listFactors();
        if (factorsError) throw factorsError;

        const verifiedFactor = factors.totp.find((factor) => factor.status === 'verified');
        if (!verifiedFactor) throw new Error('missing-authenticator');

        const { data: assurance } = await supabase.auth.mfa.getAuthenticatorAssuranceLevel();
        if (!active) return;

        setFactorId(verifiedFactor.id);
        setStage(assurance?.currentLevel === 'aal2' ? 'password' : 'verify');
      } catch {
        if (!active) return;
        setError(
          'This reset link is invalid or expired. Request a new link from the login page.',
        );
        setStage('error');
      }
    }

    void prepareRecovery();

    return () => {
      active = false;
    };
  }, []);

  async function verifyAuthenticator(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const code = String(formData.get('code') ?? '').replace(/\s+/g, '');

    if (!factorId || !/^\d{6}$/.test(code)) {
      setError('Enter the six-digit code from your authenticator app.');
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      const supabase = createSupabaseBrowserClient();
      const { error: verificationError } = await supabase.auth.mfa.challengeAndVerify({
        factorId,
        code,
      });

      if (verificationError) {
        setError('That code was not accepted. Wait for a new code and try again.');
        return;
      }

      const { data: assurance } = await supabase.auth.mfa.getAuthenticatorAssuranceLevel();
      if (assurance?.currentLevel !== 'aal2') {
        setError('Authenticator verification did not complete. Please try again.');
        return;
      }

      setStage('password');
    } catch {
      setError('The authenticator code could not be checked. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  async function changePassword(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const password = String(formData.get('password') ?? '');
    const confirmation = String(formData.get('passwordConfirmation') ?? '');

    if (password.length < 12) {
      setError('Use at least 12 characters for the new password.');
      return;
    }

    if (password !== confirmation) {
      setError('The two passwords do not match.');
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      const supabase = createSupabaseBrowserClient();
      const { data: assurance } = await supabase.auth.mfa.getAuthenticatorAssuranceLevel();

      if (assurance?.currentLevel !== 'aal2') {
        setStage('verify');
        setError('Confirm a fresh authenticator code before changing the password.');
        return;
      }

      const { error: updateError } = await supabase.auth.updateUser({ password });
      if (updateError) {
        setError('The password could not be changed. Try a different strong password.');
        return;
      }

      await supabase.auth.signOut({ scope: 'local' });
      router.replace('/myrequest/login?reset=success');
      router.refresh();
    } catch {
      setError('The password could not be changed. Please request a new reset link.');
    } finally {
      setSubmitting(false);
    }
  }

  if (stage === 'checking') {
    return (
      <div className="admin-auth__recovery-status" role="status">
        Checking your secure reset link…
      </div>
    );
  }

  if (stage === 'error') {
    return (
      <div className="admin-auth__recovery-status">
        <p role="alert">{error}</p>
        <button type="button" onClick={() => router.replace('/myrequest/login')}>
          Return to login
        </button>
      </div>
    );
  }

  if (stage === 'verify') {
    return (
      <form className="admin-auth__form" onSubmit={verifyAuthenticator}>
        <label>
          Six-digit authenticator code
          <input
            type="text"
            name="code"
            inputMode="numeric"
            autoComplete="one-time-code"
            pattern="[0-9]{6}"
            maxLength={6}
            required
          />
        </label>
        <button type="submit" disabled={submitting}>
          {submitting ? 'Verifying…' : 'Verify authenticator'}
        </button>
        <div className="admin-auth__status" aria-live="polite">
          {error && <p role="alert">{error}</p>}
        </div>
      </form>
    );
  }

  return (
    <form className="admin-auth__form" onSubmit={changePassword}>
      <label>
        New password
        <span className="admin-auth__password-field">
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            autoComplete="new-password"
            minLength={12}
            maxLength={128}
            required
          />
          <button
            type="button"
            className="admin-auth__password-toggle"
            aria-pressed={showPassword}
            aria-label={`${showPassword ? 'Hide' : 'Show'} new password fields`}
            onClick={() => setShowPassword((visible) => !visible)}
          >
            {showPassword ? 'Hide' : 'Show'}
          </button>
        </span>
      </label>
      <label>
        Confirm new password
        <input
          type={showPassword ? 'text' : 'password'}
          name="passwordConfirmation"
          autoComplete="new-password"
          minLength={12}
          maxLength={128}
          required
        />
      </label>
      <p className="admin-auth__hint">Use at least 12 characters and a unique password.</p>
      <button type="submit" disabled={submitting}>
        {submitting ? 'Saving new password…' : 'Change password'}
      </button>
      <div className="admin-auth__status" aria-live="polite">
        {error && <p role="alert">{error}</p>}
      </div>
    </form>
  );
}
