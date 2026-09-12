import type { Metadata } from 'next';
import { LegalPage } from '@/components/LegalPage';
import { CONTACT_EMAIL, createPageMetadata } from '@/lib/site';

export const metadata: Metadata = createPageMetadata({
  title: 'Website Terms',
  description: 'Starter terms governing use of the Bazalel website and its published information.',
  path: '/terms',
});

const sections = [
  {
    title: 'Using this website',
    paragraphs: [
      'You may use this website for lawful purposes and to learn about Bazalel’s services. You must not attempt to disrupt the site, gain unauthorized access, submit malicious content, or misuse its forms.',
    ],
  },
  {
    title: 'Website information',
    paragraphs: [
      'Content on this website is general information, not professional, legal, financial, or business advice. Service descriptions, package details, timing, and availability may change and are confirmed only in a written client agreement.',
      'Examples identified as concept work are demonstrations and are not represented as commissioned client projects or evidence of particular commercial results.',
    ],
  },
  {
    title: 'No guaranteed outcomes',
    paragraphs: [
      'A website can support clearer communication, credibility, and enquiry journeys, but Bazalel does not guarantee search rankings, leads, revenue, conversion rates, or other business outcomes through this website.',
    ],
  },
  {
    title: 'Intellectual property',
    paragraphs: [
      'Unless otherwise stated, Bazalel or its licensors own the website’s original text, visual presentation, and concept materials. You may not copy or commercially reuse them without written permission, except as allowed by applicable law.',
    ],
  },
  {
    title: 'Third-party links and services',
    paragraphs: [
      'Links to third-party websites are provided for convenience. Bazalel does not control and is not responsible for their content, availability, security, or privacy practices.',
    ],
  },
  {
    title: 'Liability and changes',
    paragraphs: [
      'To the extent permitted by applicable law, the website is provided without warranties about uninterrupted availability or error-free operation. We may update these terms or the website at any time. Any limits that cannot legally apply will be limited only to the extent required by law.',
    ],
  },
];

export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="Terms"
      title="Website Terms"
      introduction="These starter terms apply when you visit or use the public Bazalel website. Project work is governed by a separate written agreement."
      sections={sections}
      contactEmail={CONTACT_EMAIL}
    />
  );
}
