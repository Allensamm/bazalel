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
          <Link href="/#approach">Approach</Link>
          <Link href="/industries">Industries</Link>
          <Link href="/seeourworks">Our work</Link>
        </div>

        <div>
          <h2>Start</h2>
          <Link href="/contact">Contact</Link>
          <Link href="/seeourworks">Client stories</Link>
        </div>

        <div>
          <h2>Parent company</h2>
          <Link href="https://join2gether.work" target="_blank" rel="noreferrer">
            Join2getherWork ↗
          </Link>
        </div>
      </div>
      <div className="site-footer__bottom">
        <p>© {new Date().getFullYear()} Bazalel. All rights reserved.</p>
        <p>A Join2getherWork company.</p>
      </div>
    </footer>
  );
}
