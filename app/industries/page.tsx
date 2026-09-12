import type { Metadata } from 'next';
import Link from 'next/link';
import { SiteFooter } from '@/components/SiteFooter';
import { createPageMetadata } from '@/lib/site';

export const metadata: Metadata = createPageMetadata({
  title: 'Industries',
  description:
    'Bazalel builds strategic Squarespace websites for law firms, consultants, financial services, healthcare practices, property businesses, studios, and other expert-led companies.',
  path: '/industries',
});

const industries = [
  {
    number: '01',
    name: 'Law firms',
    label: 'Major specialization',
    description:
      'For established practices whose website no longer reflects the quality of their legal work.',
    outcomes: [
      'Clarify practice areas and who the firm helps',
      'Build confidence through attorneys, proof, and process',
      'Make consultation requests simple on every device',
    ],
    featured: true,
  },
  {
    number: '02',
    name: 'Consultants & advisors',
    description:
      'For experts who need to turn knowledge, experience, and a proven method into a clear reason to engage.',
    outcomes: [
      'Package complex expertise into clear services',
      'Use case studies and insight to establish authority',
      'Filter enquiries towards stronger-fit clients',
    ],
  },
  {
    number: '03',
    name: 'Financial services',
    description:
      'For professional firms that need to explain high-consideration services with clarity and restraint.',
    outcomes: [
      'Make complicated services easier to understand',
      'Build confidence through process and credentials',
      'Guide prospects towards the right conversation',
    ],
  },
  {
    number: '04',
    name: 'Healthcare & wellness',
    description:
      'For practices that want patients and clients to understand their options and find the right next step quickly.',
    outcomes: [
      'Create clearer service and care pathways',
      'Improve access to essential information on mobile',
      'Reduce friction around calls and booking requests',
    ],
  },
  {
    number: '05',
    name: 'Real estate & property',
    description:
      'For property professionals whose reputation, portfolio, and local expertise should work harder online.',
    outcomes: [
      'Showcase services and selected properties clearly',
      'Strengthen trust with proof and local expertise',
      'Create direct paths for buyers, sellers, and investors',
    ],
  },
  {
    number: '06',
    name: 'Creative & professional studios',
    description:
      'For teams that need more than a beautiful portfolio—they need a site that explains why the work matters.',
    outcomes: [
      'Connect strong work to meaningful client outcomes',
      'Clarify the process and ideal project fit',
      'Turn portfolio interest into qualified briefs',
    ],
  },
  {
    number: '07',
    name: 'Education & training',
    description:
      'For educators and training businesses that need to make programmes, proof, and enrolment paths easier to navigate.',
    outcomes: [
      'Organize programmes around learner needs',
      'Use outcomes and testimonials to build confidence',
      'Simplify registration and enquiry journeys',
    ],
  },
  {
    number: '08',
    name: 'Other expert-led businesses',
    description:
      'Your industry does not need to be on a list. The strongest fit is a good business with a website that undersells it.',
    outcomes: [
      'Define the useful result your website should support',
      'Create a clearer message and visitor journey',
      'Measure the actions that matter to the business',
    ],
  },
];

const fitSignals = [
  'Your service depends on credibility and trust',
  'Prospects compare you carefully before making contact',
  'Your current website undersells the quality of the business',
  'You have demand, but the enquiry journey creates friction',
];

export default function IndustriesPage() {
  return (
    <>
      <main id="main-content" className="industries-page">
        <header className="industries-hero grid-surface">
        <div className="industries-hero__inner">
          <p data-reveal="up">Industries</p>
          <h1 data-reveal="up" className="reveal-delay-1">
            We build where trust drives the decision.
          </h1>
          <div className="industries-hero__intro" data-reveal="up">
            <p>
              Bazalel works with professional-service and expert-led businesses.
              We learn how your clients choose, then build the message, proof, and
              path that helps the right visitor take action.
            </p>
            <span>Law firms are a major specialty—not our only focus.</span>
          </div>
        </div>
      </header>

      <section className="industries-directory grid-surface" aria-labelledby="directory-title">
        <div className="section-rule" data-reveal="up">
          <span>Where we create value</span>
          <i />
        </div>

        <div className="industries-directory__heading" data-reveal="up">
          <h2 id="directory-title">Different industries. The same important job.</h2>
          <p>
            Make expertise easier to understand, establish confidence sooner, and
            make the next step obvious.
          </p>
        </div>

        <div className="industries-grid">
          {industries.map((industry, index) => (
            <article
              key={industry.name}
              className={`industry-card${industry.featured ? ' industry-card--featured' : ''}`}
              data-reveal="up"
              style={{ transitionDelay: `${(index % 2) * 100}ms` }}
            >
              <div className="industry-card__topline">
                <span>{industry.number}</span>
                {industry.label && <strong>{industry.label}</strong>}
              </div>
              <h3>{industry.name}</h3>
              <p>{industry.description}</p>
              <div className="industry-card__outcomes">
                <span>What the website should help do</span>
                <ul>
                  {industry.outcomes.map((outcome) => (
                    <li key={outcome}>{outcome}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="industry-fit" aria-labelledby="fit-title">
        <div className="industry-fit__inner">
          <div className="industry-fit__heading" data-reveal="up">
            <p>A strong fit</p>
            <h2 id="fit-title">
              Your industry matters. The job your website must do matters more.
            </h2>
          </div>
          <ol className="industry-fit__signals">
            {fitSignals.map((signal, index) => (
              <li key={signal} data-reveal="up">
                <span>{String(index + 1).padStart(2, '0')}</span>
                <strong>{signal}</strong>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="industries-cta grid-surface" aria-labelledby="industries-cta-title">
        <div className="industries-cta__inner" data-reveal="up">
          <p>Your industry is not listed?</p>
          <h2 id="industries-cta-title">Tell us what your website needs to achieve.</h2>
          <span>
            If the business is strong and the current website is getting in the way,
            that is a conversation worth having.
          </span>
          <Link href="/contact">
            Start a conversation <span aria-hidden="true">→</span>
          </Link>
        </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
