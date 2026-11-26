import Link from 'next/link';

import { packages } from '@/lib/packages';

const specialties = [
  'Residential sales',
  'Luxury homes',
  'First-time buyers',
  'Investment properties',
  'Relocation',
  'Commercial real estate',
];

const industries = [
  'Real estate agents',
  'Consultants',
  'Financial services',
  'Healthcare practices',
  'Creative studios',
  'Education businesses',
];

export function RealEstateNiche() {
  return (
    <section id="major-niche" className="niche grid-surface" aria-labelledby="niche-title">
      <div className="niche__intro" data-reveal="up">
        <p className="niche__eyebrow">
          <span>01</span> Who we build for
        </p>
        <h2 id="niche-title">
          Built for ambitious service businesses. Specialized where trust matters most.
        </h2>
        <div className="niche__intro-copy">
          <p>
            Bazalel works with established professional-service businesses across
            industries. If expertise, reputation, and trust influence the buying
            decision, we can build a website that helps turn attention into action.
          </p>
          <p className="niche__not-limit">
            We specialize in websites for <strong>real estate agents.</strong>
          </p>
          <div className="niche__areas niche__industries" aria-label="Industries we serve">
            {industries.map((industry) => (
              <span key={industry}>{industry}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="niche__profile" data-reveal="up">
        <div className="niche__profile-copy">
          <p className="niche__label">Real estate agents</p>
          <h3>Help buyers and sellers get to know their local agent.</h3>
          <p>
            Show buyers the neighborhoods you know and sellers how you’ll market
            their property. Give both a simple way to book a conversation.
          </p>
          <Link className="niche__detail-link" href="/real-estate-web-design">
            Explore web design for real estate agents <span aria-hidden="true">→</span>
          </Link>
        </div>

        <dl className="niche__facts">
          <div>
            <dt>Team size</dt>
            <dd>Solo agents and teams</dd>
          </div>
          <div>
            <dt>Business profile</dt>
            <dd>Independent agents and brokerages</dd>
          </div>
          <div>
            <dt>Decision maker</dt>
            <dd>Agent, team lead or managing broker</dd>
          </div>
          <div>
            <dt>Common challenge</dt>
            <dd>Turning neighborhood and property searches into enquiries</dd>
          </div>
        </dl>

        <div className="niche__areas" aria-label="Real estate specialties">
          {specialties.map((area) => (
            <span key={area}>{area}</span>
          ))}
        </div>
      </div>

      <div className="offers">
        <div className="offers__layout">
          <div className="offers__heading" data-reveal="up">
            <p className="niche__label">For every service business</p>
            <h3>Choose the level of business change you need next.</h3>
          </div>

          <div className="offers__grid">
            {packages.map((item) => (
              <article
                key={item.name}
                className={`offer-card reveal-stagger-${packages.indexOf(item) + 1}${item.featured ? ' offer-card--featured' : ''}`}
                data-reveal="up"
              >
              {item.featured && <p className="offer-card__badge">Signature offer</p>}
              <div className="offer-card__topline">
                <h4>{item.name}</h4>
                <p>{item.price}</p>
              </div>
              <p className="offer-card__description">{item.description}</p>
              <ul>
                {item.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
              <div className="offer-card__footer">
                <p>
                  <span>Timeline</span>
                  {item.timeline}
                </p>
                <Link href="/contact" aria-label={`Start with the ${item.name} package`}>
                  Start a project <span aria-hidden="true">↗</span>
                </Link>
              </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
