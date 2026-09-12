import type { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { AdminSignOut } from '@/components/AdminSignOut';
import type { ContactRequest } from '@/lib/contact-requests';
import { CONTACT_EMAIL, createPageMetadata } from '@/lib/site';
import { createSupabaseServerClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = createPageMetadata({
  title: 'Private Enquiry Inbox',
  description: 'Secure administrator access to Bazalel project enquiries.',
  path: '/myrequest',
  noIndex: true,
});

function formatDate(value: string) {
  return new Intl.DateTimeFormat('en', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'UTC',
  }).format(new Date(value));
}

export default async function MyRequestPage() {
  const supabase = await createSupabaseServerClient();
  if (!supabase) redirect('/myrequest/login');

  const { data: userData } = await supabase.auth.getUser();
  if (userData.user?.email?.toLowerCase() !== CONTACT_EMAIL) {
    redirect('/myrequest/login');
  }

  const { data: assurance } = await supabase.auth.mfa.getAuthenticatorAssuranceLevel();
  if (assurance?.currentLevel !== 'aal2') redirect('/myrequest/verify');

  const { data, error } = await supabase
    .from('contact_requests')
    .select('id, created_at, name, email, company, website, industry, timeline, message, status')
    .order('created_at', { ascending: false })
    .limit(200);

  const requests = (data ?? []) as ContactRequest[];

  return (
    <main id="main-content" className="admin-inbox">
      <header className="admin-inbox__header">
        <div>
          <p>Private area · MFA protected</p>
          <h1>Project enquiries</h1>
        </div>
        <AdminSignOut />
      </header>

      <section className="admin-inbox__body" aria-labelledby="inbox-heading">
        <div className="admin-inbox__summary">
          <h2 id="inbox-heading">Latest messages</h2>
          <p>{requests.length} {requests.length === 1 ? 'enquiry' : 'enquiries'} shown</p>
        </div>

        {error ? (
          <p className="admin-inbox__empty" role="alert">
            Enquiries could not be loaded. Check the Supabase table and access policy.
          </p>
        ) : requests.length === 0 ? (
          <p className="admin-inbox__empty">No enquiries have arrived yet.</p>
        ) : (
          <div className="admin-inbox__list">
            {requests.map((request) => (
              <article className="admin-inbox__request" key={request.id}>
                <div className="admin-inbox__request-heading">
                  <div>
                    <span>{request.status}</span>
                    <h3>{request.name}</h3>
                    <p>{request.company}</p>
                  </div>
                  <time dateTime={request.created_at}>{formatDate(request.created_at)} UTC</time>
                </div>

                <dl className="admin-inbox__details">
                  <div>
                    <dt>Email</dt>
                    <dd><Link href={`mailto:${request.email}`}>{request.email}</Link></dd>
                  </div>
                  <div>
                    <dt>Industry</dt>
                    <dd>{request.industry}</dd>
                  </div>
                  <div>
                    <dt>Timing</dt>
                    <dd>{request.timeline}</dd>
                  </div>
                  <div>
                    <dt>Website</dt>
                    <dd>
                      {request.website ? (
                        <Link href={request.website} target="_blank" rel="noopener noreferrer">
                          View website ↗
                        </Link>
                      ) : 'Not provided'}
                    </dd>
                  </div>
                </dl>

                <div className="admin-inbox__message">
                  <h4>What the website should help achieve</h4>
                  <p>{request.message}</p>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
