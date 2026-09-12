'use client';

import Image from 'next/image';
import { FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createSupabaseBrowserClient } from '@/lib/supabase/client';

interface Enrollment {
  factorId: string;
  qrCode: string;
  secret: string;
}

interface AdminMfaFormProps {
  verifiedFactorId?: string;
}

export function AdminMfaForm({ verifiedFactorId }: AdminMfaFormProps) {
  const router = useRouter();
  const [enrollment, setEnrollment] = useState<Enrollment | null>(null);
  const [loading, setLoading] = useState(!verifiedFactorId);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (verifiedFactorId) return;

    let active = true;

    async function beginEnrollment() {
      try {
        const supabase = createSupabaseBrowserClient();
        const { data: factors } = await supabase.auth.mfa.listFactors();

        for (const factor of factors?.all ?? []) {
          if (factor.factor_type === 'totp' && factor.status === 'unverified') {
            await supabase.auth.mfa.unenroll({ factorId: factor.id });
          }
        }

        const { data, error: enrollmentError } = await supabase.auth.mfa.enroll({
          factorType: 'totp',
          friendlyName: 'Bazalel private inbox',
        });

        if (enrollmentError) throw enrollmentError;
        if (!active) return;

        setEnrollment({
          factorId: data.id,
          qrCode: data.totp.qr_code,
          secret: data.totp.secret,
        });
      } catch {
        if (active) setError('Authenticator setup could not be started. Sign in again.');
      } finally {
        if (active) setLoading(false);
      }
    }

    void beginEnrollment();

    return () => {
      active = false;
    };
  }, [verifiedFactorId]);

  async function verifyCode(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const factorId = verifiedFactorId ?? enrollment?.factorId;
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

      router.replace('/myrequest');
      router.refresh();
    } catch {
      setError('The code could not be checked. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="admin-auth__mfa">
      {!verifiedFactorId && (
        <div className="admin-auth__setup">
          <h2>Connect an authenticator app</h2>
          <p>
            Scan this once with Google Authenticator, Microsoft Authenticator,
            1Password, Authy, or Apple Passwords.
          </p>
          {loading && <p className="admin-auth__loading">Creating your secure code…</p>}
          {enrollment && (
            <>
              <Image
                src={enrollment.qrCode}
                width={220}
                height={220}
                alt="QR code for the Bazalel inbox authenticator"
                unoptimized
              />
              <p className="admin-auth__secret">
                Manual setup key: <code>{enrollment.secret}</code>
              </p>
            </>
          )}
        </div>
      )}

      <form className="admin-auth__form" onSubmit={verifyCode}>
        <label>
          Six-digit authenticator code
          <input
            type="text"
            name="code"
            inputMode="numeric"
            autoComplete="one-time-code"
            pattern="[0-9]{6}"
            maxLength={6}
            disabled={loading || (!verifiedFactorId && !enrollment)}
            required
          />
        </label>
        <button
          type="submit"
          disabled={submitting || loading || (!verifiedFactorId && !enrollment)}
        >
          {submitting ? 'Verifying…' : 'Open private inbox'}
        </button>
        <div className="admin-auth__status" aria-live="polite">
          {error && <p role="alert">{error}</p>}
        </div>
      </form>
    </div>
  );
}
