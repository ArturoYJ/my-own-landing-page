"use client";

import { useEffect, useRef } from "react";

const TOTAL_FRAMES = 240;
const TARGET_FPS = 24;
const FRAME_INTERVAL = 1000 / TARGET_FPS;
const OPACITY = 0.15;

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
    let loadedCount = 0;
    let firstFrameReady = false;

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new window.Image();
      img.src = frameSrc(i);
      img.onload = () => {
        loadedCount++;
        // Draw first frame as soon as it's ready (instant start)
        if (i === 1 && !firstFrameReady) {
          firstFrameReady = true;
          drawFrame(img);
        }
      };
      images.push(img);
    }

    // ── objectFit: cover draw helper ──
    function drawFrame(img: HTMLImageElement) {
      if (!canvas || !ctx || img.naturalWidth === 0) return;

      const canvasAspect = canvas.width / canvas.height;
      const imgAspect = img.naturalWidth / img.naturalHeight;

      let drawW: number, drawH: number, drawX: number, drawY: number;

      if (imgAspect > canvasAspect) {
        // Image is wider — fit by height
        drawH = canvas.height;
        drawW = drawH * imgAspect;
        drawX = (canvas.width - drawW) / 2;
        drawY = 0;
      } else {
        // Image is taller — fit by width
        drawW = canvas.width;
        drawH = drawW / imgAspect;
        drawX = 0;
        drawY = (canvas.height - drawH) / 2;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, drawX, drawY, drawW, drawH);
    }

    // ── Animation loop ──
    let currentFrame = 0;
    let lastTime = 0;
    let rafId: number;

    function animate(timestamp: number) {
      rafId = requestAnimationFrame(animate);

      // Throttle to TARGET_FPS
      if (timestamp - lastTime < FRAME_INTERVAL) return;
      lastTime = timestamp;

      const img = images[currentFrame];
      if (img && img.complete && img.naturalWidth > 0) {
        drawFrame(img);
      }

      currentFrame = (currentFrame + 1) % TOTAL_FRAMES;
    }

    // Start loop after a tiny delay to allow first frame to load
    const startTimeout = setTimeout(() => {
      rafId = requestAnimationFrame(animate);
    }, 100);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(startTimeout);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 0,
        opacity: OPACITY,
        pointerEvents: "none",
        display: "block",
      }}
    />
  );
}
