'use client';

import { useEffect } from 'react';

export function ScrollReveal() {
  useEffect(() => {
    const root = document.documentElement;
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    const supportsObserver = 'IntersectionObserver' in window;
    const observedElements = new WeakSet<Element>();

    const observer = supportsObserver && !prefersReducedMotion
      ? new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (!entry.isIntersecting) return;

              entry.target.classList.add('is-visible');
              observer?.unobserve(entry.target);
            });
          },
          {
            rootMargin: '0px 0px -10% 0px',
            threshold: 0.12,
          },
        )
      : null;

    const registerElement = (element: HTMLElement) => {
      if (observedElements.has(element)) return;

      observedElements.add(element);

      if (!observer) {
        element.classList.add('is-visible');
        return;
      }

      observer.observe(element);
    };

    const registerTree = (node: ParentNode) => {
      if (node instanceof HTMLElement && node.matches('[data-reveal]')) {
        registerElement(node);
      }

      node
        .querySelectorAll<HTMLElement>('[data-reveal]')
        .forEach(registerElement);
    };

    registerTree(document);
    root.classList.add('reveal-ready');

    const routeObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node instanceof HTMLElement) registerTree(node);
        });
      });
    });

    routeObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      observer?.disconnect();
      routeObserver.disconnect();
      root.classList.remove('reveal-ready');
    };
  }, []);

  return null;
}
