import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { AdminLoginForm } from '@/components/AdminLoginForm';
import { CONTACT_EMAIL, createPageMetadata } from '@/lib/site';
import { getSupabasePublicConfig } from '@/lib/supabase/config';
import { createSupabaseServerClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = createPageMetadata({
  title: 'Private Inbox Login',
  description: 'Secure administrator access to Bazalel project enquiries.',
  path: '/myrequest/login',
  noIndex: true,
});

export default async function MyRequestLoginPage() {
  const configured = Boolean(getSupabasePublicConfig());
  const supabase = await createSupabaseServerClient();

  if (supabase) {
    const { data } = await supabase.auth.getUser();
    if (data.user?.email?.toLowerCase() === CONTACT_EMAIL) {
      redirect('/myrequest/verify');
    }
  }

  return (
    <main id="main-content" className="admin-auth grid-surface">
      <section className="admin-auth__card">
        <p className="admin-auth__eyebrow">Private area</p>
        <h1>Bazalel enquiries</h1>
        <p className="admin-auth__intro">
          Administrator access requires your password and a code from your authenticator app.
        </p>
        {configured ? (
          <AdminLoginForm />
        ) : (
          <p className="admin-auth__notice" role="status">
            The private inbox is not configured yet.
          </p>
        )}
      </section>
    </main>
  );
}
