import type { Metadata } from 'next';
import Link from 'next/link';
import { industries } from '@/lib/industries';
import { SiteFooter } from '@/components/SiteFooter';
import { createPageMetadata } from '@/lib/site';

export const metadata: Metadata = createPageMetadata({
  title: 'Web Design for Property, Hospitality, Design Studios & Law Firms',
  description:
    'Explore Squarespace web design for property developers, investment groups, luxury brokerages, hospitality brands, architecture and interior studios, and law firms.',
  path: '/industries',
});

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
            Web design for property, hospitality, design studios and professional services.
          </h1>
          <div className="industries-hero__intro" data-reveal="up">
            <p>
              Explore how a development website can attract investor enquiries, a portfolio can win a studio brief,
              or a practice page can bring the right matter to a lawyer.
            </p>
            <span>Explore our <Link href="/real-estate-web-design">real estate</Link> and <Link href="/law-firm-web-design">law firm web design services</Link>.</span>
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
              key={industry.id}
              id={industry.id}
              className={`industry-card${index === 0 ? ' industry-card--featured' : ''}`}
              data-reveal="up"
              style={{ transitionDelay: `${(index % 2) * 100}ms` }}
            >
              <div className="industry-card__topline">
                <span>{String(index + 1).padStart(2, '0')}</span>
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
