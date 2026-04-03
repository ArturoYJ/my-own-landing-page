import { useEffect, useRef } from 'react';

interface AnimationOptions {
  selector: string;
  animations?: {
    opacity?: [number, number];
    translateY?: [number, number];
    translateX?: [number, number];
    scale?: [number, number];
  };
  duration?: number;
  ease?: string;
  staggerDelay?: number;
  threshold?: number;
  skipIfReducedMotion?: boolean;
}

/**
 * Reusable hook for intersection observer with anime.js animations
 * Handles animations when element becomes visible in viewport
 *
 * @example
 * const ref = useObserverAnimation({
 *   selector: '.project-row',
 *   duration: 800,
 *   staggerDelay: 180,
 * });
 * return <div ref={ref} className="project-row">...</div>
 */
export function useObserverAnimation({
  selector,
  animations = { opacity: [0, 1], translateY: [30, 0] },
  duration = 600,
  ease = 'outExpo',
  staggerDelay = 0,
  threshold = 0.1,
  skipIfReducedMotion = true,
}: AnimationOptions) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    // Check if user prefers reduced motion
    if (skipIfReducedMotion) {
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReduced) {
        // Just remove opacity: 0 from elements without animating
        const elements = ref.current?.querySelectorAll(selector);
        if (elements) {
          elements.forEach((el) => {
            const htmlEl = el as HTMLElement;
            htmlEl.style.opacity = '1';
            htmlEl.style.transform = 'none';
          });
        }
        return;
      }
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Lazy load anime.js only when needed
            import('animejs').then((mod) => {
              const { animate, stagger } = mod;

              // Build animation object dynamically
              const animationConfig = {
                ...animations,
                duration,
                ease,
                ...(staggerDelay > 0 && { delay: stagger(staggerDelay) }),
              };

              animate(selector, animationConfig);
            });

            // Unobserve after animation
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [selector, animations, duration, ease, staggerDelay, threshold, skipIfReducedMotion]);

  return ref;
}
