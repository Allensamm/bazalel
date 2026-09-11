'use client';

import { useEffect, useRef } from 'react';

const statements = [
  'Most sought after Squarespace website design agency',
  'Over 30+ Squarespace website Delivered.',
];

export function WordReveal() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let frame = 0;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      sectionRef.current?.querySelectorAll<HTMLElement>('[data-word]').forEach((word) => {
        word.style.opacity = '1';
        word.style.color = 'var(--color-primary)';
      });
      return;
    }

    const update = () => {
      const section = sectionRef.current;
      if (!section) return;

      const words = section.querySelectorAll<HTMLElement>('[data-word]');
      const bounds = section.getBoundingClientRect();
      const travel = Math.max(section.offsetHeight - window.innerHeight, 1);
      const progress = Math.min(Math.max(-bounds.top / travel, 0), 1);

      words.forEach((word, index) => {
        const wordProgress = progress * (words.length + 5) - index;
        word.style.opacity = String(Math.min(Math.max(0.14 + wordProgress * 0.86, 0.14), 1));
        word.style.color = wordProgress > 0.15 ? 'var(--color-primary)' : 'var(--color-text-faint)';
      });
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
    <section ref={sectionRef} className="word-reveal grid-surface" aria-label="Our approach">
      <div className="word-reveal__sticky">
        <div className="word-reveal__content">
          <p>
            {statements.map((statement) => (
              <span key={statement} className="word-reveal__line">
                {statement.split(' ').map((word, wordIndex) => (
                  <span key={`${word}-${wordIndex}`} data-word>{word} </span>
                ))}
              </span>
            ))}
          </p>
        </div>
      </div>
    </section>
  );
}
