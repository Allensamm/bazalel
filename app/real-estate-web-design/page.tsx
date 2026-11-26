import Link from 'next/link';
import { SiteFooter } from '@/components/SiteFooter';
import { StructuredData } from '@/components/StructuredData';
import { packages } from '@/lib/packages';
import { absoluteUrl, createPageMetadata } from '@/lib/site';

const path = '/real-estate-web-design';
const title = 'Web Design for Property Developers & Commercial Real Estate';
const description =
  'Squarespace websites for property developers, commercial real estate firms, investment groups and boutique luxury brokerages. Showcase projects and capture enquiries.';

export const metadata = createPageMetadata({ title, description, path });

export default function RealEstateWebDesignPage() {
  return (
    <>
      <main id="main-content" className="editorial-page">
        <StructuredData data={{
          '@context': 'https://schema.org',
          '@type': 'Service',
          '@id': absoluteUrl(path + '#service'),
          url: absoluteUrl(path),
          name: title,
          description,
          provider: { '@type': 'Organization', '@id': absoluteUrl('/#organization'), name: 'Bazalel' },
          audience: { '@type': 'BusinessAudience', audienceType: 'Property developers, commercial real estate firms, real estate investment groups and boutique luxury brokerages' },
        }} />
        <header className="editorial-hero grid-surface">
          <div className="editorial-hero__inner">
            <p>Bazalel · Website design</p>
            <h1>{title}</h1>
            <p className="editorial-hero__lead">
              Bazalel builds Squarespace websites for property developers, commercial real estate firms,
              investment groups and boutique luxury brokerages. Present the projects you control and give
              investors, tenants and buyers a clear route to the right person.
            </p>
          </div>
        </header>
        <section className="service-intro grid-surface" aria-labelledby="pages-title">
          <div className="service-intro__grid">
            <div><h2 id="pages-title">What belongs on a flagship development page?</h2></div>
            <div>
              <p>Start with location, project stage and availability. Pair renderings or completed photography
                with a site plan, floor plans and delivery milestones. Label renderings clearly so visitors
                can distinguish the proposal from what they could visit today.</p>
              <p>Offer separate next steps. A buyer may want a viewing or price sheet, a commercial tenant
                needs leasing particulars, and an investment partner may want an introduction to the project team.
                Ask which project they’re interested in so your team can reply with the right information.</p>
            </div>
          </div>
        </section>
        <section className="service-priorities" aria-labelledby="cost-title">
          <div className="service-priorities__inner">
            <h2 id="cost-title">How much does a Bazalel website cost, and how long does it take?</h2>
            <p>These package timelines assume your content is ready and feedback arrives on schedule.</p>
            <div className="service-priorities__grid">
              {packages.map((item) => (
                <article key={item.name}>
                  <h3>{item.name} · {item.price}</h3>
                  <p>{item.features[0]}. Delivery in {item.timeline}.</p>
                </article>
              ))}
            </div>
            <Link className="about-text-link" href="/bazalelpages/squarespace-website-cost-2026">Read the Squarespace website cost guide</Link>
          </div>
        </section>
        <section className="service-intro grid-surface" aria-labelledby="listings-title">
          <div className="service-intro__grid">
            <div><h2 id="listings-title">Does a property showcase need MLS or IDX?</h2></div>
            <div>
              <p>No. Developers, investment groups and commercial firms can publish their own projects
                directly. Each project page can carry its own availability, downloadable particulars
                and enquiry contact. Assign someone to keep those details current.</p>
              <p>A boutique luxury brokerage can use the same approach for selected homes, pairing an
                agent’s local knowledge with photography and a private viewing request. An MLS or IDX
                feed is relevant when the brief calls for searchable third-party listing inventory.</p>
            </div>
          </div>
        </section>
        <section className="editorial-cta grid-surface">
          <div>
            <h2>Tell us about the market you serve.</h2>
            <span>Share the development, portfolio or brokerage you want to showcase and who should enquire.</span>
            <Link href="/contact">Discuss your real estate website <span aria-hidden="true">→</span></Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
