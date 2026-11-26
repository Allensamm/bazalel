import Link from 'next/link';

export function AboutIntro() {
  return (
    <section className="about-intro grid-surface" aria-labelledby="about-intro-title">
      <div className="section-rule" data-reveal="up">
        <span>About us · Based in Nigeria</span>
        <i />
      </div>
      <div className="about-intro__grid">
        <div data-reveal="up">
          <h2 id="about-intro-title">A real team.<br />In your corner.</h2>
          <Link className="about-text-link" href="/about">
            Meet the people behind Bazalel <span aria-hidden="true">↗</span>
          </Link>
        </div>
        <div className="about-intro__copy" data-reveal="up">
          <div className="about-intro__person">
            <div>
              <p className="about-intro__hello">Hello, I’m Allen Samuel.</p>
              <p className="about-person__role">Coordinator of Bazalel</p>
            </div>
          </div>
          <p>
            Together with our team in Nigeria, I help business owners get their
            Squarespace websites up and working for their business. We started
            Bazalel because getting online should give you momentum—and time
            back to serve your customers.
          </p>
          <p>
            Our goal is to help <strong>1,000 businesses launch and grow</strong>
            {' '}with websites that make their value clear and turn interest into
            conversations.
          </p>
          <span className="about-intro__signature">Allen Samuel &amp; the Bazalel team</span>
        </div>
      </div>
    </section>
  );
}
