import Link from 'next/link';
import { SiteFooter } from '@/components/SiteFooter';
import { StructuredData } from '@/components/StructuredData';
import { packages } from '@/lib/packages';
import { absoluteUrl, createPageMetadata } from '@/lib/site';

const path = '/real-estate-web-design';
const title = 'Squarespace Web Design for Real Estate Agents';
const description =
  'Bazalel designs Squarespace websites for independent agents and brokerages. Compare packages and timelines, plan neighborhood pages, and scope listing feeds.';

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
          audience: { '@type': 'BusinessAudience', audienceType: 'Real estate agents and brokerages' },
        }} />
        <header className="editorial-hero grid-surface">
          <div className="editorial-hero__inner">
            <p>Bazalel · Website design</p>
            <h1>{title}</h1>
            <p className="editorial-hero__lead">
              We build Squarespace websites for independent agents, teams, and brokerages.
              Buyers can explore the neighborhoods you serve, and sellers can see how you
              would market their home before they request a valuation.
            </p>
          </div>
        </header>
        <section className="service-intro grid-surface" aria-labelledby="pages-title">
          <div className="service-intro__grid">
            <div><h2 id="pages-title">Which pages does a real estate agent need?</h2></div>
            <div>
              <p>For a four-page site, start with a homepage that names your market, a buyer guide,
                a seller guide, and an agent profile with contact details. Give buyers a way to
                ask about a viewing and sellers a way to request a pricing conversation.</p>
              <p>If you serve several neighborhoods, add a page where you have firsthand knowledge
                to share. Explain the housing types buyers can expect, illustrate them with photos
                you have permission to use, and answer questions you hear during viewings.</p>
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
            <div><h2 id="listings-title">Do I need a live property feed?</h2></div>
            <div>
              <p>If you want to show a handful of properties you represent, individual pages can
                give each home space for photography, details, and viewing requests.
                Assign someone to update the price and status when either changes.</p>
              <p>If buyers need to search live inventory from a multiple listing service (MLS),
                include that in your brief. Bring your provider’s Internet Data Exchange (IDX)
                requirements so we can confirm permissions, Squarespace compatibility, and
                any recurring fees before quoting the integration.</p>
            </div>
          </div>
        </section>
        <section className="editorial-cta grid-surface">
          <div>
            <h2>Tell us about the market you serve.</h2>
            <span>Share your service area, current website, and the enquiries you want from buyers or sellers.</span>
            <Link href="/contact">Discuss your real estate website <span aria-hidden="true">→</span></Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
