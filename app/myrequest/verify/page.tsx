import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { AdminMfaForm } from '@/components/AdminMfaForm';
import { CONTACT_EMAIL, createPageMetadata } from '@/lib/site';
import { createSupabaseServerClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = createPageMetadata({
  title: 'Verify Private Inbox Access',
  description: 'Two-factor verification for the Bazalel private enquiry inbox.',
  path: '/myrequest/verify',
  noIndex: true,
});

export default async function MyRequestVerifyPage() {
  const supabase = await createSupabaseServerClient();

  if (!supabase) redirect('/myrequest/login');

  const { data } = await supabase.auth.getUser();
  if (data.user?.email?.toLowerCase() !== CONTACT_EMAIL) {
    redirect('/myrequest/login');
  }

  const { data: assurance } = await supabase.auth.mfa.getAuthenticatorAssuranceLevel();
  if (assurance?.currentLevel === 'aal2') redirect('/myrequest');

  const { data: factors } = await supabase.auth.mfa.listFactors();
  const verifiedFactor = factors?.totp.find((factor) => factor.status === 'verified');

  return (
    <main id="main-content" className="admin-auth grid-surface">
      <section className="admin-auth__card admin-auth__card--wide">
        <p className="admin-auth__eyebrow">Second step</p>
        <h1>{verifiedFactor ? 'Enter your secure code' : 'Secure your private inbox'}</h1>
        <p className="admin-auth__intro">
          {verifiedFactor
            ? 'Open your authenticator app and enter the current six-digit code.'
            : 'Set up your phone authenticator before viewing any visitor information.'}
        </p>
        <AdminMfaForm verifiedFactorId={verifiedFactor?.id} />
      </section>
    </main>
  );
}
