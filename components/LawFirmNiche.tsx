import Link from 'next/link';

const packages = [
  {
    name: 'Starter',
    price: '$1,500',
    description: 'Build trust quickly and give interested prospects a clear way to contact you.',
    timeline: '5–7 business days',
    features: [
      'A clear journey across up to 4 pages',
      'Custom design that builds credibility',
      'Fast, confident mobile experience',
      'Search-ready SEO foundations',
      'Easy contact and tap-to-call paths',
      'Refined copy and a guided launch',
    ],
  },
  {
    name: 'Growth',
    price: '$2,500',
    description: 'Turn more of your existing attention into qualified enquiries and bookings.',
    timeline: '7–10 business days',
    featured: true,
    features: [
      'A focused journey across up to 7 pages',
      'Conversion-led service positioning',
      'Credibility-rich founder or team profiles',
      'Service pages that answer buyer questions',
      'Enquiry paths built around visitor intent',
      'Analytics that measure visitor action',
      '2 revision rounds and launch support',
    ],
  },
  {
    name: 'Authority',
    price: '$4,000',
    description: 'Reposition an established business with a scalable platform for trust and lead generation.',
    timeline: '10–14 business days',
    features: [
      'A scalable platform across up to 10 pages',
      'Strategic sitemap aligned to business goals',
      'Clear team and service-area architecture',
      'Proof through FAQs, testimonials and results',
      'Advanced Squarespace customization',
      'SEO, analytics and qualified-lead forms',
      '3 revision rounds',
      '30 days of post-launch support',
    ],
  },
];

const practiceAreas = [
  'Business law',
  'Employment law',
  'Family law',
  'Estate planning',
  'Immigration',
  'Personal injury',
  'Real estate',
];

const industries = [
  'Law firms',
  'Consultants',
  'Financial services',
  'Healthcare practices',
  'Real estate',
  'Creative studios',
  'Education businesses',
];

export function LawFirmNiche() {
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
            Law firms are a major specialty—<strong>not our only focus.</strong>
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
          <p className="niche__label">Major niche · Law firms</p>
          <h3>A strong legal practice should not be held back by a weak website.</h3>
          <p>
            We understand how legal prospects assess credibility online. We clarify
            services, surface the firm’s proof, and guide high-intent visitors towards
            a consultation—without making the site feel generic or overcomplicated.
          </p>
        </div>

        <dl className="niche__facts">
          <div>
            <dt>Firm size</dt>
            <dd>2–20 attorneys</dd>
          </div>
          <div>
            <dt>Firm profile</dt>
            <dd>Established or growing practices</dd>
          </div>
          <div>
            <dt>Decision maker</dt>
            <dd>Managing partner, founder or attorney-owner</dd>
          </div>
          <div>
            <dt>Common challenge</dt>
            <dd>Unclear services, weak mobile experience, and enquiry friction</dd>
          </div>
        </dl>

        <div className="niche__areas" aria-label="Law firm practice areas">
          {practiceAreas.map((area) => (
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
