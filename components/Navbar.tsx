'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const updateNavbar = () => setIsScrolled(window.scrollY > 8);

    updateNavbar();
    window.addEventListener('scroll', updateNavbar, { passive: true });

    return () => window.removeEventListener('scroll', updateNavbar);
  }, []);

  return (
    <header className={`navbar${isScrolled ? ' navbar--scrolled' : ''}`}>
      <nav className="navbar__inner" aria-label="Primary navigation">
        <Link className="wordmark" href="/" aria-label="Bazalel home">
          Bazalel
        </Link>

        <Link className="contact-link" href="/contact">
          Get in touch
        </Link>
      </nav>
    </header>
  );
}
