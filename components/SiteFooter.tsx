import Link from 'next/link';

export function SiteFooter() {
  return (
    <footer className="site-footer grid-surface">
      <div className="site-footer__grid">
        <div className="site-footer__brand">
          <Link href="/">Bazalel</Link>
          <p>Squarespace websites built to earn trust, clarify your value, and create qualified enquiries.</p>
        </div>

        <div>
          <h2>Explore</h2>
          <Link href="/approach">Approach</Link>
          <Link href="/industries">Industries</Link>
          <Link href="/law-firm-web-design">Law firm web design</Link>
          <Link href="/work">Our work</Link>
          <Link href="/bazalelpages">Bazalel Pages</Link>
        </div>

        <div>
          <h2>Start</h2>
          <Link href="/contact">Contact</Link>
          <Link href="/work#client-stories">Client stories</Link>
        </div>

        <div>
          <h2>Parent company</h2>
          <Link
            href="https://join2gether.work"
            target="_blank"
            rel="noopener noreferrer"
          >
            Join2getherWork ↗
          </Link>
        </div>
      </div>
      <div className="site-footer__bottom">
        <p>© {new Date().getFullYear()} Bazalel. All rights reserved.</p>
        <div>
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
          <p>A Join2getherWork company.</p>
        </div>
      </div>
    </footer>
  );
}
