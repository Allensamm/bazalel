'use client';

import { useEffect, useRef } from 'react';

export function BrandHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    let frame = 0;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      if (titleRef.current) {
        titleRef.current.style.opacity = '1';
        titleRef.current.style.transform = 'scale(1)';
        titleRef.current.style.letterSpacing = '-0.055em';
      }
      return;
    }

    const update = () => {
      const section = sectionRef.current;
      const title = titleRef.current;
      if (!section || !title) return;

      const bounds = section.getBoundingClientRect();
      const distance = Math.max(section.offsetHeight - window.innerHeight, 1);
      const progress = Math.min(Math.max(-bounds.top / distance, 0), 1);

      title.style.opacity = String(0.18 + progress * 0.82);
      title.style.transform = `scale(${0.18 + progress * 0.82})`;
      title.style.letterSpacing = `${-0.08 + progress * 0.025}em`;
    };

    const requestUpdate = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
    };
  }, []);

  return (
    <section ref={sectionRef} className="brand-hero grid-surface" aria-labelledby="brand-title">
      <div className="brand-hero__sticky">
        <h1 ref={titleRef} id="brand-title">Bazalel</h1>
        <strong className="brand-hero__rating">over 4.5 star average rating.</strong>
        <div className="brand-hero__foot">
          <span>Strategy-led</span>
          <span>Conversion-focused</span>
          <span>Built to last</span>
        </div>
      </div>
    </section>
  );
}
