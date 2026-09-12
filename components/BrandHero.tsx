'use client';

import { useEffect, useRef } from 'react';

export function BrandHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const messageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame = 0;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      if (titleRef.current) {
        titleRef.current.style.opacity = '1';
        titleRef.current.style.transform = 'scale(1)';
        titleRef.current.style.letterSpacing = '-0.055em';
      }
      if (messageRef.current) messageRef.current.style.opacity = '1';
      return;
    }

    const update = () => {
      const section = sectionRef.current;
      const title = titleRef.current;
      const message = messageRef.current;
      if (!section || !title || !message) return;

      const bounds = section.getBoundingClientRect();
      const distance = Math.max(section.offsetHeight - window.innerHeight, 1);
      const progress = Math.min(Math.max(-bounds.top / distance, 0), 1);

      title.style.opacity = String(0.18 + progress * 0.82);
      title.style.transform = `scale(${0.18 + progress * 0.82})`;
      title.style.letterSpacing = `${-0.08 + progress * 0.025}em`;
      message.style.opacity = String(Math.max(1 - progress * 3.2, 0));
      message.style.transform = `translateY(${-progress * 20}px)`;
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
    <section ref={sectionRef} className="brand-hero grid-surface" aria-labelledby="hero-title">
      <div className="brand-hero__sticky">
        <div ref={titleRef} className="brand-hero__mark" aria-hidden="true">
          Bazalel
        </div>
        <div ref={messageRef} className="brand-hero__message">
          <h1 id="hero-title">
            Squarespace Websites for Law Firms &amp; Professional Service Businesses
          </h1>
          <p>
            Strategy-led, conversion-focused Squarespace websites designed to build
            trust, communicate expertise, and turn serious visitors into qualified
            enquiries.
          </p>
          <strong className="brand-hero__rating">Over 4.5-star average rating.</strong>
        </div>
        <div className="brand-hero__foot">
          <span>Strategy-led</span>
          <span>Conversion-focused</span>
          <span>Built to last</span>
        </div>
      </div>
    </section>
  );
}
