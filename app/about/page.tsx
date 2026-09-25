import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { SiteFooter } from '@/components/SiteFooter';
import { CONTACT_EMAIL, createPageMetadata } from '@/lib/site';

export const metadata: Metadata = createPageMetadata({
  title: 'About Us — Allen Samuel & the Bazalel Team',
  description:
    'Meet Allen Samuel, Coordinator of Bazalel, and our team in Nigeria. Our mission is to help 1,000 businesses launch and grow with Squarespace websites.',
  path: '/about',
});

const principles = [
  {
    title: 'Start with the business.',
    description:
      'Before we design, we ask who you serve, what makes you worth choosing, and what a visitor should do next. Those answers guide the website.',
  },
  {
    title: 'Make decisions easier.',
    description:
      'You bring the knowledge of your business. We bring clear recommendations, focused feedback rounds, and a plan that keeps the project moving.',
  },
  {
    title: 'Build for the next customer.',
    description:
      'Every page should help someone understand your offer, trust your business, and take a useful next step—whether that is an enquiry, a booking, or a purchase.',
  },
  {
    title: 'Give you room to grow.',
    description:
      'We build on Squarespace so your team can keep content current as the business evolves. A clear handover helps you feel confident using what we create.',
  },
];

export default function AboutPage() {
  return (
    <>
      <main id="main-content" className="about-page">
        <header className="about-hero grid-surface">
          <div className="about-container">
            <p className="about-eyebrow" data-reveal="up">About Bazalel · Based in Nigeria</p>
            <div className="about-hero__layout">
              <h1 data-reveal="up">Your business<br />deserves to<br /><em>get going.</em></h1>
              <figure className="about-hero__portrait" data-reveal="up">
                <Image
                  src="/allen-samuel.jpg"
                  alt="Portrait of Allen Samuel"
                  width={1280}
                  height={1280}
                  sizes="(max-width: 760px) 90vw, (max-width: 1280px) 36vw, 440px"
                  preload
                />
                <figcaption>
                  <strong>Allen Samuel</strong>
                  <span>Coordinator of Bazalel</span>
                </figcaption>
              </figure>
            </div>
            <div className="about-hero__bottom" data-reveal="up">
              <p>
                We’re Allen Samuel and the Bazalel team. We build Squarespace websites
                that help business owners launch with confidence, earn trust,
                and make room for growth.
              </p>
              <a className="about-text-link" href="#our-story">
                Get to know us <span aria-hidden="true">↓</span>
              </a>
            </div>
          </div>
        </header>

        <section id="our-story" className="about-section grid-surface" aria-labelledby="story-title">
          <div className="about-container about-story">
            <div data-reveal="up">
              <p className="about-eyebrow">Why we started</p>
              <h2 id="story-title">Less time getting online.<br />More time moving forward.</h2>
            </div>
            <div className="about-copy" data-reveal="up">
              <p>
                We kept seeing the same thing: business owners were ready to
                move forward, but their websites were holding them up. On
                marketplaces like Fiverr, finding the right designer could mean
                hours of comparing profiles, explaining the brief, reviewing
                drafts, and chasing the finish line.
              </p>
              <p>
                The website became another job. Time that could have gone into
                serving customers, improving an offer, or making the next sale
                was spent managing a build.
              </p>
              <p>
                Bazalel grew out of a simple belief: getting a good website
                should help your business move forward. From Nigeria, our team
                brings strategy, design, and a focused process together to make
                that happen.
              </p>
              <p>
                Squarespace is our chosen platform because it gives businesses
                a practical way to launch and keep moving. We shape the message,
                structure, and design around what your business needs to achieve.
              </p>
            </div>
          </div>
        </section>

        <section className="about-mission" aria-labelledby="mission-title">
          <div className="about-container about-mission__grid">
            <div data-reveal="up">
              <p className="about-eyebrow">The goal we’re working towards</p>
              <strong className="about-mission__number">1,000</strong>
              <h2 id="mission-title">businesses with<br />a stronger start online.</h2>
              <p className="about-mission__note">Our ambition. One business at a time.</p>
            </div>
            <div className="about-mission__statements">
              <div data-reveal="up">
                <h3>Our mission</h3>
                <p>
                  Help 1,000 businesses launch and grow through Squarespace
                  websites that communicate their value, build confidence,
                  and create a clear path to becoming a customer.
                </p>
              </div>
              <div data-reveal="up">
                <h3>Our vision</h3>
                <p>
                  A world where a capable business can be seen, trusted, and
                  chosen online—and its owner has the time to focus on the
                  work they do best.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="about-section grid-surface" aria-labelledby="team-title">
          <div className="about-container about-team">
            <div className="about-team__introduction" data-reveal="up">
              <p className="about-eyebrow">The people behind the work</p>
              <h2 id="team-title">Hello, I’m Allen Samuel.</h2>
              <p className="about-eyebrow">Coordinator of Bazalel</p>
              <p>
                I coordinate the team at Bazalel. We’re based in Nigeria,
                and we care about what happens to your business after the
                website goes live.
              </p>
              <p>
                Tell us what you’re building, what’s getting in the way, and
                where you want to go. We’ll help you work out what the website
                needs to do and how to get it there.
              </p>
              <Link className="about-text-link" href={`mailto:${CONTACT_EMAIL}`}>
                Email Allen Samuel <span aria-hidden="true">↗</span>
              </Link>
              <span className="about-team__email">{CONTACT_EMAIL}</span>
            </div>
            <aside className="about-team__note" data-reveal="up" aria-label="Our commitment to your business">
              <p className="about-eyebrow">From our team to yours</p>
              <p className="about-team__belief">
                Your website should give you more time to run your business.
              </p>
              <p>
                That belief shapes how we work: clear conversations, practical
                recommendations, and a shared focus on getting your business
                ready for its next customer.
              </p>
              <span>Allen Samuel &amp; the Bazalel team<br />Nigeria · A Join2getherWork company</span>
            </aside>
          </div>
        </section>

        <section className="about-section about-principles grid-surface" aria-labelledby="principles-title">
          <div className="about-container">
            <div className="about-section__heading" data-reveal="up">
              <p className="about-eyebrow">What we believe</p>
              <h2 id="principles-title">Good design has<br />a business purpose.</h2>
            </div>
            <ol className="about-principles__list">
              {principles.map((principle, index) => (
                <li key={principle.title} data-reveal="up">
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <h3>{principle.title}</h3>
                  <p>{principle.description}</p>
                </li>
              ))}
            </ol>
            <Link className="about-text-link" href="/approach">
              See our process <span aria-hidden="true">→</span>
            </Link>
          </div>
        </section>

        <section className="about-section grid-surface" aria-labelledby="launch-title">
          <div className="about-container about-launch" data-reveal="up">
            <div>
              <p className="about-eyebrow">Our launch commitment</p>
              <h2 id="launch-title">Ready to move<br />in 14 days.</h2>
            </div>
            <div className="about-copy">
              <p>
                We commit to launching your agreed website within 14 calendar
                days of kickoff, with content ready and feedback on schedule.
                We agree the scope, responsibilities, and launch date together
                before the build begins.
              </p>
              <p>
                The goal is a live website that makes your business easier to
                understand, easier to trust, and easier to contact—so you can
                get back to growing it.
              </p>
              <Link className="pill-button" href="/contact">
                Let’s talk about your business <span aria-hidden="true">↗</span>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
