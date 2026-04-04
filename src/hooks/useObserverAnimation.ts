import { useEffect, useRef } from 'react';

interface AnimationOptions {
  selector: string;
  animations?: {
    opacity?: [number, number];
    translateY?: [number, number];
    translateX?: [number, number];
    scale?: [number, number];
    filter?: [string, string]; // Agregado para efectos "Premium" (Blur Reveal)
  };
  duration?: number;
  ease?: string;
  staggerDelay?: number;
  threshold?: number;
  skipIfReducedMotion?: boolean;
}

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
    // 1. Accesibilidad: Verificamos Preferencias del Sistema
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    // Si prefiere movimiento reducido, no mutamos el DOM. 
    // Simplemente no activamos la animación. El CSS base debe tener opacidad 1.
    if (skipIfReducedMotion && prefersReduced) {
      return; 
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Lazy load de Anime.js (Optimización de Chunking)
            import('animejs').then((mod) => {
              const { animate, stagger } = mod;

              const animationConfig = {
                ...animations,
                duration,
                ease,
                ...(staggerDelay > 0 && { delay: stagger(staggerDelay) }),
              };

              animate(selector, animationConfig);
            }).catch(console.error);

            // Una vez animado, desconectamos para ahorrar recursos
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    // Fase de Limpieza (Evita Memory Leaks de Listeners)
    return () => {
      observer.disconnect();
    };
  }, [selector, animations, duration, ease, staggerDelay, threshold, skipIfReducedMotion]);

  return ref;
}