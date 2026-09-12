import type { Metadata } from 'next';
import Link from 'next/link';
import { SiteFooter } from '@/components/SiteFooter';

export const metadata: Metadata = {
  title: 'Page Not Found',
};

export default function NotFound() {
  return (
    <>
      <main id="main-content" className="not-found-page grid-surface">
        <section>
        <p>404 · Page not found</p>
        <h1>This page is not part of the plan.</h1>
        <span>
          The address may have changed, or the page may no longer exist. Choose a
          useful next step below.
        </span>
        <div>
          <Link href="/">Return home</Link>
          <Link href="/work">View our work</Link>
          <Link href="/contact">Contact Bazalel</Link>
        </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
