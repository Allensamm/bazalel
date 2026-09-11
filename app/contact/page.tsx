import type { Metadata } from 'next';
import Link from 'next/link';
import { ContactForm } from '@/components/ContactForm';
import { Navbar } from '@/components/Navbar';
import { SiteFooter } from '@/components/SiteFooter';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Tell Bazalel what your website needs to achieve and start a focused Squarespace website project.',
};

export default function ContactPage() {
  return (
    <main className="contact-page">
      <Navbar />

      <section className="contact-page__body grid-surface">
        <div className="contact-page__layout">
          <div className="contact-page__intro" data-reveal="up">
            <p className="contact-page__eyebrow">Start a conversation</p>
            <h1>What should your website help your business achieve?</h1>
            <p className="contact-page__lead">
              Tell us what is not working today and what a useful result would look
              like. We will reply with the clearest next step—not a generic sales pitch.
            </p>

            <div className="contact-page__notes">
              <p>A helpful first message includes:</p>
              <ul>
                <li>The problem with your current website</li>
                <li>The action you want more visitors to take</li>
                <li>Any important deadline or launch date</li>
              </ul>
            </div>

            <p className="contact-page__direct">
              Prefer email?{' '}
              <Link href="mailto:allensamuel569@gmail.com">
                allensamuel569@gmail.com
              </Link>
            </p>
          </div>

          <ContactForm />
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
