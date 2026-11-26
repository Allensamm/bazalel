import Link from 'next/link';

import { industries } from '@/lib/industries';
import { packages } from '@/lib/packages';

export function RealEstateNiche() {
  return (
    <section id="major-niche" className="niche grid-surface" aria-labelledby="niche-title">
      <div className="niche__intro" data-reveal="up">
        <p className="niche__eyebrow">
          <span>01</span> Who we build for
        </p>
        <h2 id="niche-title">
          Websites for the people choosing your next project.
        </h2>
        <div className="niche__intro-copy">
          <p>
            A guest needs to see where they’ll stay. A design client wants to understand the thinking behind your portfolio.
            A prospective legal client needs to find the lawyer who handles their matter. Explore how we design for each decision.
          </p>
          <p>We welcome website briefs from the US, the UK and other international markets.</p>
          <div className="niche__areas niche__industries" aria-label="Industries we serve">
            {industries.map((industry) => (
              <Link key={industry.id} href={`/industries#${industry.id}`}>{industry.name}</Link>
            ))}
          </div>
        </div>
      </div>

      <div className="niche__profile" data-reveal="up">
        <div className="niche__profile-copy">
          <p className="niche__label">Real estate development &amp; investment</p>
          <h3>Give your flagship development a home of its own.</h3>
          <p>
            Bring the site plan, availability and project team together on one page.
            Buyers can book a viewing, commercial tenants can request leasing details,
            and investors can ask for the project brief.
          </p>
          <Link className="niche__detail-link" href="/real-estate-web-design">
            Explore real estate web design <span aria-hidden="true">→</span>
          </Link>
        </div>
        <dl className="niche__facts">
          <div><dt>Project portfolio</dt><dd>Flagship developments, commercial assets and exclusive residences</dd></div>
          <div><dt>Enquiry routes</dt><dd>Investor introductions, buyer viewings and leasing requests</dd></div>
          <div><dt>Property information</dt><dd>Your team controls the project details and availability. No MLS feed is required.</dd></div>
        </dl>
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
