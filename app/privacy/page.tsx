import type { Metadata } from 'next';
import { LegalPage } from '@/components/LegalPage';
import { CONTACT_EMAIL, createPageMetadata } from '@/lib/site';

export const metadata: Metadata = createPageMetadata({
  title: 'Privacy Policy',
  description: 'How Bazalel collects, uses, stores, and protects information submitted through this website.',
  path: '/privacy',
});

const sections = [
  {
    title: 'Information we collect',
    paragraphs: [
      'When you send a project enquiry, we collect the information you provide, such as your name, email address, business, website, industry, preferred timing, and project message.',
      'When an invited client submits a review, we collect the review details, rating, business name, optional website link, and optional project image they choose to provide.',
    ],
  },
  {
    title: 'How we use information',
    items: [
      'To respond to enquiries and discuss potential projects',
      'To provide and improve our services and website experience',
      'To publish reviews and submitted project material when the review form clearly states that submission will be public',
      'To protect the website from spam, abuse, and security incidents',
      'To meet applicable legal or regulatory obligations',
    ],
  },
  {
    title: 'Service providers and storage',
    paragraphs: [
      'The website is hosted by Vercel. Contact messages are delivered through Resend, and submitted review content or images may be stored using Vercel Blob. These providers may process technical and submitted information according to their own terms and privacy practices.',
      'We do not sell personal information. We share information only where reasonably necessary to operate the website, deliver requested services, protect our rights, or comply with law.',
    ],
  },
  {
    title: 'Retention and security',
    paragraphs: [
      'We retain information only for as long as reasonably necessary for the purposes described here. No online service can guarantee absolute security, but we use reasonable technical and organizational safeguards appropriate to a small web design agency.',
    ],
  },
  {
    title: 'Your choices',
    paragraphs: [
      'You may ask us to correct or delete information you submitted, subject to legal and operational requirements. If you submitted a public review, you may contact us to request an update or removal.',
    ],
  },
  {
    title: 'Changes to this policy',
    paragraphs: [
      'We may update this policy as the website, services, or legal requirements change. The date above identifies the latest published version.',
    ],
  },
];

export default function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="Privacy"
      title="Privacy Policy"
      introduction="This policy explains how Bazalel handles information provided through bazaleldesign.com."
      sections={sections}
      contactEmail={CONTACT_EMAIL}
    />
  );
}
