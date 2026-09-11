'use client';

import { useEffect, useRef } from 'react';

export function CursorGlow() {
  const haloRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canTrack = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

    if (!canTrack) return;

    let frame = 0;
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;

    const paint = () => {
      haloRef.current?.style.setProperty('transform', `translate3d(${x - 200}px, ${y - 200}px, 0)`);
      dotRef.current?.style.setProperty('transform', `translate3d(${x - 4}px, ${y - 4}px, 0)`);
      frame = 0;
    };

    const move = (event: PointerEvent) => {
      x = event.clientX;
      y = event.clientY;

      if (!frame) frame = window.requestAnimationFrame(paint);
    };

    window.addEventListener('pointermove', move, { passive: true });

    return () => {
      window.removeEventListener('pointermove', move);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <>
      <div ref={haloRef} className="cursor-glow cursor-glow--halo" aria-hidden="true" />
      <div ref={dotRef} className="cursor-glow cursor-glow--dot" aria-hidden="true" />
    </>
  );
}
