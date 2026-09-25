import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ContactForm } from '@/components/ContactForm';
import { SiteFooter } from '@/components/SiteFooter';
import { CONTACT_EMAIL, createPageMetadata } from '@/lib/site';

export const metadata: Metadata = createPageMetadata({
  title: 'Contact',
  description:
    'Tell Bazalel what your website needs to achieve and start a focused Squarespace website project.',
  path: '/contact',
});

export default function ContactPage() {
  return (
    <>
      <main id="main-content" className="contact-page">
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

            <div className="contact-page__person">
              <Image
                src="/allen-samuel.jpg"
                alt="Allen Samuel"
                width={1280}
                height={1280}
                sizes="72px"
              />
              <div>
                <strong>Allen Samuel</strong>
                <p className="about-person__role">Coordinator of Bazalel</p>
                <p className="contact-page__direct">
                  <Link href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</Link>
                </p>
              </div>
            </div>
            <p className="contact-page__team">
              Based in Nigeria, our team is here to help you take the next step.
              {' '}<Link href="/about">Get to know us <span aria-hidden="true">→</span></Link>
            </p>
          </div>

          <ContactForm />
        </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
