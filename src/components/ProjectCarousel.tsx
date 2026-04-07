"use client";

import { useState } from "react";
import Image from "next/image";

interface ProjectCarouselProps {
  images: string[];
  title: string;
  accent: string;
  fit?: "cover" | "contain";
  aspectRatio?: string;
}

const CheatLeft = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
);

const CheatRight = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
);

export default function ProjectCarousel({ 
  images, 
  title, 
  accent,
  fit = "cover",
  aspectRatio = "16/9"
}: ProjectCarouselProps) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [direction, setDirection] = useState<"next" | "prev">("next");

  if (!images || images.length === 0) return null;

  const nextImage = () => {
    setDirection("next");
    setCurrentIdx((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setDirection("prev");
    setCurrentIdx((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div
      style={{
        marginBottom: "3rem",
        aspectRatio: aspectRatio,
        position: "relative",
        overflow: "hidden",
      }}
      className="project-carousel-group"
    >
      {/* Main Image Container with transition */}
      <div 
        key={currentIdx}
        style={{ 
          position: "relative", 
          width: "100%", 
          height: "100%",
          animation: `${direction === "next" ? "slideInFromRight" : "slideInFromLeft"} 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards`
        }}
      >
        <Image
          src={images[currentIdx]}
          alt={`Captura ${currentIdx + 1} de ${title}`}
          fill
          sizes="(max-width: 1200px) 100vw, 1000px"
          style={{ 
            objectFit: fit,
          }}
          priority
        />
      </div>

      {/* Navigation Arrows */}
      {images.length > 1 && (
        <>
          <button
            onClick={prevImage}
            style={{
              position: "absolute",
              left: "1.25rem",
              top: "50%",
              transform: "translateY(-50%)",
              background: "rgba(10, 10, 10, 0.15)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(255, 255, 255, 0.05)",
              borderRadius: "50%",
              width: "48px",
              height: "48px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: "white",
              zIndex: 10,
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
            }}
            onMouseOver={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = accent;
              (e.currentTarget as HTMLButtonElement).style.borderColor = accent;
              (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-50%) scale(1.1)";
            }}
            onMouseOut={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = "rgba(10, 10, 10, 0.15)";
              (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255, 255, 255, 0.05)";
              (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-50%) scale(1)";
            }}
            aria-label="Imagen anterior"
          >
            <CheatLeft />
          </button>
          <button
            onClick={nextImage}
            style={{
              position: "absolute",
              right: "1.25rem",
              top: "50%",
              transform: "translateY(-50%)",
              background: "rgba(10, 10, 10, 0.15)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(255, 255, 255, 0.05)",
              borderRadius: "50%",
              width: "48px",
              height: "48px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: "white",
              zIndex: 10,
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
            }}
            onMouseOver={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = accent;
              (e.currentTarget as HTMLButtonElement).style.borderColor = accent;
              (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-50%) scale(1.1)";
            }}
            onMouseOut={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = "rgba(10, 10, 10, 0.15)";
              (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255, 255, 255, 0.05)";
              (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-50%) scale(1)";
            }}
            aria-label="Siguiente imagen"
          >
            <CheatRight />
          </button>
        </>
      )}


    </div>
  );
}
