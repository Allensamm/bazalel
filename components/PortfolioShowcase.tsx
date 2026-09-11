'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef } from 'react';

export function PortfolioShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    let animationFrame = 0;

    const updatePreview = () => {
      const section = sectionRef.current;
      const frame = frameRef.current;
      const image = imageRef.current;

      if (!section || !frame || !image) return;

      const bounds = section.getBoundingClientRect();
      const scrollDistance = Math.max(section.offsetHeight - window.innerHeight, 1);
      const progress = Math.min(Math.max(-bounds.top / scrollDistance, 0), 1);
      const imageTravel = Math.max(image.offsetHeight - frame.clientHeight, 0);

      image.style.transform = `translate3d(-50%, -${progress * imageTravel}px, 0)`;
    };

    const requestUpdate = () => {
      cancelAnimationFrame(animationFrame);
      animationFrame = requestAnimationFrame(updatePreview);
    };

    updatePreview();
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="portfolio-showcase"
      aria-label="Featured Squarespace website design"
    >
      <div className="portfolio-showcase__stage">
        <div
          ref={frameRef}
          className="portfolio-showcase__frame"
          data-reveal="scale"
        >
          <Image
            ref={imageRef}
            className="portfolio-showcase__image"
            src="/dummy-squarespace-site.png"
            alt="A full-page interior design website created as a sample Squarespace project"
            width={1024}
            height={1536}
            sizes="(max-width: 640px) 126vw, (max-width: 1200px) 82vw, 1120px"
          />

          <div className="portfolio-showcase__shade" aria-hidden="true" />

          <Link className="works-link" href="/seeourworks">
            See our works
            <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
