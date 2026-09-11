import Link from 'next/link';
import { BrandHero } from '@/components/BrandHero';
import { LawFirmNiche } from '@/components/LawFirmNiche';
import { Navbar } from '@/components/Navbar';
import { PortfolioShowcase } from '@/components/PortfolioShowcase';
import { SiteFooter } from '@/components/SiteFooter';
import { WordReveal } from '@/components/WordReveal';

const metrics = [
  {
    value: '30+',
    title: 'Squarespace websites delivered',
    description: 'Each one structured to make the right next step clear to serious visitors.',
  },
  {
    value: '4.5',
    title: 'Average client rating',
    description: 'A careful, dependable process from the first conversation through launch.',
  },
  {
    value: '5–14',
    title: 'Business-day delivery',
    description: 'A focused build that gets your new client journey working sooner.',
  },
];

const outcomes = [
  'Turn more visitors into qualified enquiries',
  'Make your value easier to understand',
  'Build confidence before the first conversation',
  'Spend less time answering routine questions',
];

export default function Home() {
  return (
    <main className="site-shell">
      <Navbar />
      <BrandHero />
      <WordReveal />

      <section className="metrics grid-surface" aria-label="Bazalel by the numbers">
        <div className="section-rule" data-reveal="up">
          <span>Built with proof</span>
          <i />
        </div>
        <div className="metrics__grid">
          {metrics.map((metric, index) => (
            <article
              key={metric.title}
              data-reveal="up"
              className={`reveal-stagger-${index + 1}`}
            >
              <strong>{metric.value}</strong>
              <h2>{metric.title}</h2>
              <p>{metric.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="approach" className="agency-intro grid-surface" aria-labelledby="approach-title">
        <div className="section-rule" data-reveal="up">
          <span>The job behind the website</span>
          <i />
        </div>
        <div className="agency-intro__grid">
          <div className="agency-intro__title" data-reveal="up">
            <h2 id="approach-title">Built for<br />what happens next.</h2>
            <p>A useful website should earn trust, reduce friction, and help the right client act.</p>
          </div>
          <div className="agency-intro__copy">
            <p data-reveal="up">
              Your business does not need pages for the sake of having pages. It
              needs a website that helps create a useful result: more consultation
              requests, better-qualified leads, a stronger first impression, or a
              simpler path from interest to action.
            </p>
            <p data-reveal="up">
              We begin with that result, then shape the positioning, proof, page
              structure, mobile experience, and calls to action around it. We cannot
              promise future revenue, but we can remove the confusion and friction
              that costs good businesses opportunities.
            </p>
            <ul className="agency-intro__outcomes" aria-label="What a better website can help achieve">
              {outcomes.map((outcome, index) => (
                <li key={outcome} data-reveal="up">
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <strong>{outcome}</strong>
                </li>
              ))}
            </ul>
            <div className="agency-intro__offer" data-reveal="up">
              <span>The result</span>
              <strong>
                A website that gives the right visitor a clear reason to choose you—and
                an easy next step.
              </strong>
              <p>
                We connect your message, proof, services, and calls to action around
                the business outcome that matters most.
              </p>
            </div>
            <Link className="pill-button" href="/contact" data-reveal="up">
              Tell us what the site should achieve <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      <PortfolioShowcase />
      <LawFirmNiche />
      <SiteFooter />
    </main>
  );
}
