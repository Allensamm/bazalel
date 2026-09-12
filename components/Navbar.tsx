'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export function Navbar() {
  const pathname = usePathname();
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
        <Link
          className="wordmark"
          href="/"
          aria-label="Bazalel home"
          aria-current={pathname === '/' ? 'page' : undefined}
        >
          Bazalel
        </Link>

        <Link
          className="contact-link"
          href="/contact"
          aria-current={pathname === '/contact' ? 'page' : undefined}
        >
          Get in touch
        </Link>
      </nav>
    </header>
  );
}
