"use client";

import { useEffect, useRef, useState } from "react";

const BASE_OPACITY = 0.40;

export default function FrameBackground() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [shouldPlay] = useState(() => {
    if (typeof window === 'undefined') return true;
    return !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !shouldPlay) return;

    let ticking = false;

    function updateOpacityOnScroll() {
      const scrollTop = window.scrollY;
      const vh = window.innerHeight;
      
      // Fade out video as we leave the Hero section
      // Starts fading at 70% of vh, fully gone at 100% of vh
      const fadeStart = vh * 0.7;
      const fadeEnd = vh;
      let dynamicOpacity = BASE_OPACITY;

      if (scrollTop > fadeStart) {
        const fadeProgress = (scrollTop - fadeStart) / (fadeEnd - fadeStart);
        dynamicOpacity = BASE_OPACITY * (1 - Math.max(0, Math.min(1, fadeProgress)));
      }

      if (video) {
        video.style.opacity = dynamicOpacity.toString();
        
        // Pause video when not visible for performance
        if (dynamicOpacity <= 0 && !video.paused) {
          video.pause();
        } else if (dynamicOpacity > 0 && video.paused) {
          video.play().catch(() => {
            // Ignore autoplay errors
          });
        }
      }
      
      ticking = false;
    }

    function handleScroll() {
      if (!ticking) {
        window.requestAnimationFrame(updateOpacityOnScroll);
        ticking = true;
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true });

    // Play video on mount
    video.play().catch(() => {
      // Ignore autoplay errors
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [shouldPlay]);

  if (!shouldPlay) {
    // Fallback: static background for reduced motion preference
    return (
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 0,
          pointerEvents: "none",
          background: "radial-gradient(ellipse at center, rgba(167, 139, 250, 0.05) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />
    );
  }

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "none",
        overflow: "hidden",
      }}
      aria-hidden="true"
    >
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity: BASE_OPACITY,
          transition: "opacity 0.5s ease-out",
        }}
      >
        <source src="/background.webm" type="video/webm" />
        Tu navegador no soporta video en segundo plano.
      </video>
    </div>
  );
}
