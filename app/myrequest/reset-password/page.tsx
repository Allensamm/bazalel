import type { Metadata } from 'next';
import { AdminResetPasswordForm } from '@/components/AdminResetPasswordForm';
import { createPageMetadata } from '@/lib/site';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = createPageMetadata({
  title: 'Reset Private Inbox Password',
  description: 'Secure password recovery for the Bazalel private enquiry inbox.',
  path: '/myrequest/reset-password',
  noIndex: true,
});

export default function MyRequestResetPasswordPage() {
  return (
    <main id="main-content" className="admin-auth grid-surface">
      <section className="admin-auth__card">
        <p className="admin-auth__eyebrow">Secure recovery</p>
        <h1>Reset password</h1>
        <p className="admin-auth__intro">
          Your email reset link and authenticator app are both required before a new
          administrator password can be saved.
        </p>
        <AdminResetPasswordForm />
      </section>
    </main>
  );
}
