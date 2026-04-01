"use client";

import { useEffect, useRef } from "react";

const TOTAL_FRAMES = 240;
const OPACITY = 0.40;

/**
 * Genera la ruta de un frame con padding de 3 dígitos.
 * e.g. frame 1 → /frames1/ezgif-frame-001.jpg
 */
function frameSrc(index: number): string {
  const padded = String(index).padStart(3, "0");
  return `/frames1/ezgif-frame-${padded}.jpg`;
}

export default function FrameBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // ── Resize canvas to match viewport ──
    function resize() {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize, { passive: true });

    // ── Preload all frames ──
    const images: HTMLImageElement[] = [];
    let firstFrameReady = false;

    // Draw helper with closure access to canvas/ctx
    function drawFrame(img: HTMLImageElement) {
      if (!canvas || !ctx || !img || img.naturalWidth === 0) return;

      const canvasAspect = canvas.width / canvas.height;
      const imgAspect = img.naturalWidth / img.naturalHeight;

      let drawW: number, drawH: number, drawX: number, drawY: number;

      if (imgAspect > canvasAspect) {
        drawH = canvas.height;
        drawW = drawH * imgAspect;
        drawX = (canvas.width - drawW) / 2;
        drawY = 0;
      } else {
        drawW = canvas.width;
        drawH = drawW / imgAspect;
        drawX = 0;
        drawY = (canvas.height - drawH) / 2;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, drawX, drawY, drawW, drawH);
    }

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new window.Image();
      img.src = frameSrc(i);
      img.onload = () => {
        if (i === 1 && !firstFrameReady) {
          firstFrameReady = true;
          drawFrame(img);
        }
      };
      images.push(img);
    }

    // ── Scroll-driven Logic ──
    let ticking = false;

    function updateFrameOnScroll() {
      const scrollTop = window.scrollY;
      const vh = window.innerHeight;
      
      // ANIMATION: Complete 240 frames within 1 full viewport (High speed)
      const animationRange = vh; 
      const scrollFraction = Math.max(0, Math.min(1, scrollTop / animationRange));
      
      const frameIndex = Math.min(
        TOTAL_FRAMES - 1,
        Math.floor(scrollFraction * (TOTAL_FRAMES - 1))
      );

      const img = images[frameIndex];
      if (img && img.complete && img.naturalWidth > 0) {
        drawFrame(img);
      }

      // VISIBILITY: Fade out canvas as we leave the Hero section
      // Starts fading at 70% of vh, fully gone at 100% of vh
      const fadeStart = vh * 0.7;
      const fadeEnd = vh;
      let dynamicOpacity = OPACITY;

      if (scrollTop > fadeStart) {
        const fadeProgress = (scrollTop - fadeStart) / (fadeEnd - fadeStart);
        dynamicOpacity = OPACITY * (1 - Math.max(0, Math.min(1, fadeProgress)));
      }

      if (canvas) {
        canvas.style.opacity = dynamicOpacity.toString();
        // Hide completely if opacity is 0 for performance
        canvas.style.display = dynamicOpacity <= 0 ? "none" : "block";
      }
      
      ticking = false;
    }

    function handleScroll() {
      if (!ticking) {
        window.requestAnimationFrame(updateFrameOnScroll);
        ticking = true;
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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
        background: "transparent",
        opacity: OPACITY,
        transition: "opacity 0.8s ease-out",
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          width: "100%",
          height: "100%",
          display: "block",
        }}
      />
    </div>
  );
}
