"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

const roles = [
  "Software Engineer",
  "Backend Developer",
  "Full Stack Dev",
  "Clean Architecture",
];

export default function Hero() {
  const roleRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    import("animejs").then((mod) => {
      const { createTimeline, stagger } = mod;

      // ── Entrance animation timeline ──
      const tl = createTimeline({});

      tl.add(".hero-tag", { opacity: [0, 1], translateY: [16, 0], duration: 600, ease: "outExpo" })
        .add(".hero-name", { opacity: [0, 1], translateY: [40, 0], duration: 900, ease: "outExpo" }, "-=300")
        .add(".hero-role-line", { opacity: [0, 1], translateY: [20, 0], duration: 700, ease: "outExpo" }, "-=500")
        .add(".hero-desc", { opacity: [0, 1], translateY: [20, 0], duration: 700, ease: "outExpo" }, "-=400")
        .add(".hero-ctas", { opacity: [0, 1], translateY: [20, 0], duration: 600, ease: "outExpo" }, "-=400")
        .add(".hero-photo", { opacity: [0, 1], scale: [0.92, 1], duration: 900, ease: "outExpo" }, "-=900")
        .add(".stat-item", { opacity: [0, 1], translateY: [16, 0], delay: stagger(120), duration: 500, ease: "outExpo" }, "-=400");

      // ── Typewriter role ──
      let roleIndex = 0;
      let charIndex = 0;
      let isDeleting = false;
      const el = roleRef.current;
      if (!el) return;

      function typeWriter() {
        if (!el) return;
        const currentRole = roles[roleIndex];
        if (isDeleting) {
          el.textContent = currentRole.slice(0, charIndex - 1);
          charIndex--;
          if (charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            setTimeout(typeWriter, 400);
            return;
          }
          setTimeout(typeWriter, 50);
        } else {
          el.textContent = currentRole.slice(0, charIndex + 1);
          charIndex++;
          if (charIndex === currentRole.length) {
            isDeleting = true;
            setTimeout(typeWriter, 2000);
            return;
          }
          setTimeout(typeWriter, 80);
        }
      }
      setTimeout(typeWriter, 1800);
    });
  }, []);

  return (
    <section
      id="hero"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        padding: "0 2rem",
        position: "relative",
        zIndex: 2,
        scrollSnapAlign: "start",
        scrollSnapStop: "always",
        background: "var(--bg-base)", // Correct surface as per Stitch
      }}
    >
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          width: "100%",
          display: "grid",
          gridTemplateColumns: "1fr auto",
          gap: "4rem",
          alignItems: "center",
          paddingTop: "80px",
        }}
      >
        {/* Left — Text */}
        <div>
          {/* Status tag */}
          <div
            className="hero-tag"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: "rgba(167,139,250,0.06)",
              borderRadius: "4px", // Precision: 4px
              padding: "4px 12px",
              marginBottom: "1.5rem",
              opacity: 0,
            }}
          >
            <span style={{ width: "4px", height: "4px", borderRadius: "50%", background: "var(--accent-primary)", display: "inline-block", animation: "pulse 2s ease-in-out infinite" }} />
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "var(--accent-primary)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
              Disponible para proyectos
            </span>
          </div>

          {/* Name */}
          <h1
            className="hero-name"
            style={{ 
              fontFamily: "var(--font-display)", 
              fontSize: "clamp(3rem, 8vw, 6.5rem)", // Bold architectural scale
              fontWeight: 700, 
              lineHeight: 0.9, 
              letterSpacing: "-0.04em", 
              marginBottom: "1rem", 
              opacity: 0 
            }}
          >
            Arturo
            <br />
            <span style={{ color: "var(--text-muted)", opacity: 0.8 }}>Yion Jaime</span>
          </h1>

          {/* Role typewriter */}
          <div className="hero-role-line" style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "2rem", opacity: 0 }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "clamp(0.85rem, 1.5vw, 1rem)", color: "var(--primary)" }}>&gt;_</span>
            <span
              ref={roleRef}
              style={{ fontFamily: "var(--font-mono)", fontSize: "clamp(0.85rem, 1.5vw, 1rem)", color: "var(--text-secondary)", borderRight: "2px solid var(--accent-primary)", paddingRight: "4px", animation: "blink 1s step-end infinite" }}
            >
              Software Engineer
            </span>
          </div>

          {/* Description */}
          <p
            className="hero-desc"
            style={{ fontSize: "1rem", color: "var(--text-secondary)", lineHeight: 1.8, maxWidth: "540px", marginBottom: "3rem", opacity: 0 }}
          >
            Sistemas robustos bajo principios de <strong style={{ color: "var(--text-primary)", fontWeight: 500 }}>Clean Architecture</strong> y <strong style={{ color: "var(--text-primary)", fontWeight: 500 }}>SOLID</strong>. 
            Especializado en el stack PERN con infraestructura en AWS. 
            Resolviendo problemas desde sus fundamentos técnicos.
          </p>

          {/* CTAs */}
          <div className="hero-ctas" style={{ display: "flex", gap: "1.25rem", flexWrap: "wrap", opacity: 0 }}>
            <a
              href="#proyectos"
              style={{ 
                padding: "0.85rem 2rem", 
                background: "linear-gradient(135deg, var(--primary), var(--primary-container))", 
                color: "#131313", 
                borderRadius: "4px", 
                fontWeight: 600, 
                fontSize: "0.85rem", 
                textDecoration: "none", 
                transition: "all 0.3s var(--transition-base)",
                boxShadow: "0 0 40px rgba(167,139,250,0.1)"
              }}
              onMouseEnter={(e) => { const el = e.currentTarget as HTMLAnchorElement; el.style.transform = "translateY(-3px) scale(1.02)"; el.style.boxShadow = "0 10px 50px rgba(167,139,250,0.25)"; }}
              onMouseLeave={(e) => { const el = e.currentTarget as HTMLAnchorElement; el.style.transform = "translateY(0) scale(1)"; el.style.boxShadow = "0 0 40px rgba(167,139,250,0.1)"; }}
            >
              Ver proyectos
            </a>
            <a
              href="https://github.com/ArturoYJ"
              target="_blank"
              rel="noopener noreferrer"
              style={{ 
                padding: "0.85rem 2rem", 
                borderRadius: "4px", 
                fontWeight: 500, 
                fontSize: "0.85rem", 
                textDecoration: "none", 
                border: "1px solid rgba(148, 142, 157, 0.15)", // Ghost border
                color: "var(--text-primary)",
                transition: "all 0.3s var(--transition-base)" 
              }}
              onMouseEnter={(e) => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = "var(--bg-card)"; el.style.transform = "translateY(-3px)"; }}
              onMouseLeave={(e) => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = "transparent"; el.style.transform = "translateY(0)"; }}
            >
              GitHub <span>→</span>
            </a>
          </div>

          {/* Stats */}
          <div className="hero-stats" style={{ display: "flex", gap: "3.5rem", marginTop: "4rem", paddingTop: "2rem", borderTop: "1px solid rgba(148, 142, 157, 0.05)" }}>
            {[{ value: "3+", label: "Proyectos" }, { value: "PERN", label: "Stack" }, { value: "AWS", label: "Cloud" }].map((stat) => (
              <div key={stat.label} className="stat-item" style={{ opacity: 0 }}>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: "1.35rem", fontWeight: 600, color: "var(--accent-primary)", lineHeight: 1 }}>{stat.value}</div>
                <div style={{ fontSize: "0.7rem", color: "var(--text-muted)", marginTop: "6px", letterSpacing: "0.1em", textTransform: "uppercase" }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — Photo */}
        <div className="hero-photo" style={{ position: "relative", opacity: 0, flexShrink: 0 }}>
          <div style={{ position: "absolute", inset: "-12px", borderRadius: "50%", border: "1px solid rgba(167,139,250,0.1)", animation: "spin 25s linear infinite" }} />
          <div style={{ position: "absolute", inset: "-30px", borderRadius: "50%", border: "1px dashed rgba(167,139,250,0.04)", animation: "spin 40s linear infinite reverse" }} />
          <div style={{ width: "clamp(220px, 25vw, 320px)", height: "clamp(220px, 25vw, 320px)", borderRadius: "50%", overflow: "hidden", position: "relative", zIndex: 1, filter: "grayscale(20%) brightness(90%)" }}>
            <Image src="/foto.jpg" alt="Arturo Yion Jaime — Software Engineer" fill sizes="(max-width: 768px) 220px, 320px" style={{ objectFit: "cover", objectPosition: "center top" }} priority />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{ position: "absolute", bottom: "2rem", left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: "6px", opacity: 0.4 }}>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "var(--text-muted)", letterSpacing: "0.1em" }}>scroll</span>
        <div style={{ width: "1px", height: "30px", background: "linear-gradient(to bottom, var(--text-muted), transparent)", animation: "scrollPulse 2s ease-in-out infinite" }} />
      </div>

      <style>{`
        @keyframes blink { 50% { border-color: transparent; } }
        @keyframes pulse { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.5; transform: scale(0.8); } }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes scrollPulse { 0%, 100% { opacity: 0.4; } 50% { opacity: 1; } }
      `}</style>
    </section>
  );
}
