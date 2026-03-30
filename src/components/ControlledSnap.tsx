"use client";

import { useEffect, useRef } from "react";

export default function ControlledSnap() {
  const isScrolling = useRef(false);
  const currentSection = useRef(0);
  const sections = useRef<Element[]>([]);

  useEffect(() => {
    let animateFn: any;

    // In animejs v4, the default function is replaced by named exports like `animate`
    import("animejs").then((mod: any) => {
      animateFn = mod.animate || mod.default;
    });

    const collectSections = () => {
      const hero = document.querySelector("#hero");
      const projectsHeader = document.querySelector(".projects-header-slide");
      const rows = document.querySelectorAll(".project-row");
      const stack = document.querySelector("#stack");
      const about = document.querySelector("#about");
      const contact = document.querySelector("#contact");

      const all = [hero, projectsHeader, ...Array.from(rows), stack, about, contact].filter(Boolean) as Element[];
      sections.current = all;
    };

    collectSections();
    window.addEventListener("resize", collectSections);

    const handleWheel = (e: WheelEvent) => {
      // Avoid intercepting on mobile/tablets where we use native snap
      if (window.innerWidth <= 1024) return;
      
      if (isScrolling.current || !animateFn) {
        e.preventDefault();
        return;
      }

      if (Math.abs(e.deltaY) < 30) return;

      e.preventDefault();
      isScrolling.current = true;

      const direction = e.deltaY > 0 ? 1 : -1;
      const nextIndex = Math.max(0, Math.min(sections.current.length - 1, currentSection.current + direction));

      if (nextIndex === currentSection.current) {
        isScrolling.current = false;
        return;
      }

      currentSection.current = nextIndex;
      const targetElement = sections.current[nextIndex];
      const targetPos = (targetElement as HTMLElement).offsetTop;

      // Use the 'animate' function from animejs v4 with the correct signature (target, parameters)
      const targetEl = document.scrollingElement || document.documentElement;
      animateFn(targetEl, {
        scrollTop: targetPos,
        duration: 1600, // Cinematic slow speed
        ease: 'inOutQuart', // 'ease' instead of 'easing' in v4 usually, but we'll try 'inOutQuart'
        onComplete: () => {
          setTimeout(() => {
            isScrolling.current = false;
          }, 150);
        }
      });
    };

    window.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("resize", collectSections);
    };
  }, []);

  return null;
}
