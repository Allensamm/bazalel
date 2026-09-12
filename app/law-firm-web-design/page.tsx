import type { Metadata } from 'next';
import Link from 'next/link';
import { SiteFooter } from '@/components/SiteFooter';
import { StructuredData } from '@/components/StructuredData';
import { createPageMetadata, SITE_URL } from '@/lib/site';

export const metadata: Metadata = createPageMetadata({
  title: 'Squarespace Web Design for Law Firms',
  description:
    'Strategy-led Squarespace web design for law firms that need clearer practice areas, credible attorney profiles, accessible mobile pages, and better enquiry paths.',
  path: '/law-firm-web-design',
});

const priorities = [
  {
    title: 'Credibility before the call',
    copy: 'A professional law firm website should make experience, focus, and proof easy to assess without relying on exaggerated claims.',
  },
  {
    title: 'Clear practice areas',
    copy: 'We organize services around the problems prospective clients recognize, with straightforward routes to the relevant information.',
  },
  {
    title: 'Useful attorney profiles',
    copy: 'Profiles can communicate qualifications, relevant experience, approach, and the human context clients look for when choosing counsel.',
  },
  {
    title: 'Confident mobile experience',
    copy: 'Responsive layouts, readable content, and practical tap targets help visitors find essential information on the device they already use.',
  },
  {
    title: 'Accessible enquiry paths',
    copy: 'Clear calls to action, consultation forms, click-to-call details, and useful expectations reduce avoidable friction around first contact.',
  },
  {
    title: 'Search-ready foundations',
    copy: 'Semantic pages, descriptive metadata, performance care, and a logical content structure create a sound base for ongoing local SEO work.',
  },
];

const redesignSignals = [
  'The site no longer reflects the quality of the practice',
  'Practice areas are difficult to understand or navigate',
  'Attorney profiles feel incomplete or inconsistent',
  'Calls and consultation requests are awkward on mobile',
  'Important trust signals are buried or missing',
  'The firm cannot update routine content confidently',
];

export default function LawFirmWebDesignPage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${SITE_URL}/law-firm-web-design/#service`,
    name: 'Squarespace Web Design for Law Firms',
    serviceType: 'Law firm website strategy, design, redesign, and development',
    url: `${SITE_URL}/law-firm-web-design`,
    provider: { '@id': `${SITE_URL}/#organization` },
    audience: {
      '@type': 'BusinessAudience',
      audienceType: 'Law firms and legal practices',
    },
  };

  return (
    <>
      <main id="main-content" className="editorial-page law-firm-page">
        <StructuredData data={structuredData} />
        <header className="editorial-hero grid-surface">
        <div className="editorial-hero__inner">
          <p data-reveal="up">Major specialization · Law firms</p>
          <h1 data-reveal="up" className="reveal-delay-1">
            Squarespace Web Design for Law Firms
          </h1>
          <p className="editorial-hero__lead" data-reveal="up">
            Professional law firm websites built to communicate expertise, organize
            complex services, and make the path to an enquiry clear.
          </p>
        </div>
      </header>

      <section className="service-intro grid-surface" aria-labelledby="law-firm-intro-title">
        <div className="service-intro__grid">
          <div data-reveal="up">
            <p>Why the website matters</p>
            <h2 id="law-firm-intro-title">Your digital presence should support the reputation you have earned.</h2>
          </div>
          <div data-reveal="up">
            <p>
              Prospective clients often visit a firm’s website while deciding whether
              its experience fits their matter. A confusing structure, dated mobile
              experience, or vague next step can make that assessment unnecessarily hard.
            </p>
            <p>
              Bazalel approaches attorney website design as a trust and communication
              problem. We shape the structure, content hierarchy, and calls to action
              so visitors can understand the practice without being overwhelmed.
            </p>
          </div>
        </div>
      </section>

      <section className="service-priorities" aria-labelledby="priorities-title">
        <div className="service-priorities__inner">
          <div className="section-rule" data-reveal="up">
            <span>What we prioritize</span>
            <i />
          </div>
          <h2 id="priorities-title" data-reveal="up">The foundations of a credible legal website.</h2>
          <div className="service-priorities__grid">
            {priorities.map((priority, index) => (
              <article key={priority.title} data-reveal="up">
                <span>{String(index + 1).padStart(2, '0')}</span>
                <h3>{priority.title}</h3>
                <p>{priority.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="redesign-signals grid-surface" aria-labelledby="redesign-title">
        <div className="redesign-signals__grid">
          <div data-reveal="up">
            <p>Lawyer website redesign</p>
            <h2 id="redesign-title">When a redesign is worth considering.</h2>
            <span>
              A redesign should solve specific communication and usability problems—not
              replace a working website simply for novelty.
            </span>
          </div>
          <ul>
            {redesignSignals.map((signal) => (
              <li key={signal} data-reveal="up">{signal}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="editorial-cta grid-surface" aria-labelledby="law-firm-cta-title">
        <div data-reveal="up">
          <p>Planning a new site or redesign?</p>
          <h2 id="law-firm-cta-title">Let’s make the firm easier to understand and trust online.</h2>
          <span>
            Tell us what is not working today. We will help identify the clearest next step.
          </span>
          <Link href="/contact">Discuss your law firm website <span aria-hidden="true">→</span></Link>
        </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
