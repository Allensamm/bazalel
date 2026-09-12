import type { Metadata } from 'next';
import Link from 'next/link';
import { SiteFooter } from '@/components/SiteFooter';
import { createPageMetadata } from '@/lib/site';

export const metadata: Metadata = createPageMetadata({
  title: 'Our Squarespace Website Design Process',
  description:
    'See how Bazalel moves from discovery and strategy through structure, design, development, quality assurance, and launch.',
  path: '/approach',
});

const stages = [
  {
    number: '01',
    title: 'Discovery',
    description:
      'We clarify the business, audience, current website problems, and the action the new site should support.',
  },
  {
    number: '02',
    title: 'Strategy',
    description:
      'We define the positioning, proof, priorities, and measures that will keep the project focused on a useful outcome.',
  },
  {
    number: '03',
    title: 'Structure',
    description:
      'We organize pages and content around the questions serious visitors need answered before they make contact.',
  },
  {
    number: '04',
    title: 'Design',
    description:
      'We create a clear visual system that reflects the quality of the business and works naturally across screen sizes.',
  },
  {
    number: '05',
    title: 'Development',
    description:
      'We build the approved direction in Squarespace with maintainable customization and purposeful interactions.',
  },
  {
    number: '06',
    title: 'Quality assurance',
    description:
      'We review content, links, forms, accessibility basics, responsive layouts, and browser behavior before launch.',
  },
  {
    number: '07',
    title: 'Launch',
    description:
      'We complete final checks, connect the essentials, and provide a clear handover for the website after release.',
  },
];

export default function ApproachPage() {
  return (
    <>
      <main id="main-content" className="editorial-page">
        <header className="editorial-hero grid-surface">
        <div className="editorial-hero__inner">
          <p data-reveal="up">Our approach</p>
          <h1 data-reveal="up" className="reveal-delay-1">
            A focused process from business problem to working website.
          </h1>
          <p className="editorial-hero__lead" data-reveal="up">
            Every stage has a clear job. The process keeps decisions grounded in
            what your audience needs to understand, trust, and do next.
          </p>
        </div>
      </header>

      <section className="process-section grid-surface" aria-labelledby="process-title">
        <div className="section-rule" data-reveal="up">
          <span>How we work</span>
          <i />
        </div>
        <h2 id="process-title" className="visually-hidden">Bazalel website design process</h2>
        <ol className="process-list">
          {stages.map((stage) => (
            <li key={stage.number} data-reveal="up">
              <span>{stage.number}</span>
              <h3>{stage.title}</h3>
              <p>{stage.description}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="editorial-cta grid-surface" aria-labelledby="approach-cta-title">
        <div data-reveal="up">
          <p>Start with the outcome</p>
          <h2 id="approach-cta-title">Tell us what the website needs to change.</h2>
          <Link href="/contact">Start a conversation <span aria-hidden="true">→</span></Link>
        </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
