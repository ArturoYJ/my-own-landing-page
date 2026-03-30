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
              background: "rgba(110,231,183,0.08)",
              border: "1px solid rgba(110,231,183,0.2)",
              borderRadius: "100px",
              padding: "4px 14px",
              marginBottom: "1.5rem",
              opacity: 0,
            }}
          >
            <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "var(--accent-primary)", display: "inline-block", animation: "pulse 2s ease-in-out infinite" }} />
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: "var(--accent-primary)", letterSpacing: "0.1em" }}>
              Disponible para proyectos
            </span>
          </div>

          {/* Name */}
          <h1
            className="hero-name"
            style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.5rem, 6vw, 5rem)", fontWeight: 700, lineHeight: 1.05, letterSpacing: "-0.03em", marginBottom: "0.5rem", opacity: 0 }}
          >
            Arturo
            <br />
            <span style={{ color: "var(--text-muted)" }}>Yion Jaime</span>
          </h1>

          {/* Role typewriter */}
          <div className="hero-role-line" style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "1.5rem", opacity: 0 }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "clamp(0.9rem, 2vw, 1.1rem)", color: "var(--accent-secondary)" }}>&gt;_</span>
            <span
              ref={roleRef}
              style={{ fontFamily: "var(--font-mono)", fontSize: "clamp(0.9rem, 2vw, 1.1rem)", color: "var(--text-secondary)", borderRight: "2px solid var(--accent-primary)", paddingRight: "4px", animation: "blink 1s step-end infinite" }}
            >
              Software Engineer
            </span>
          </div>

          {/* Description */}
          <p
            className="hero-desc"
            style={{ fontSize: "1rem", color: "var(--text-secondary)", lineHeight: 1.7, maxWidth: "520px", marginBottom: "2.5rem", opacity: 0 }}
          >
            Especializado en arquitecturas escalables bajo principios de{" "}
            <strong style={{ color: "var(--text-primary)", fontWeight: 500 }}>Clean Architecture</strong> y{" "}
            <strong style={{ color: "var(--text-primary)", fontWeight: 500 }}>SOLID</strong>.
            Stack PERN con despliegue en AWS. Apasionado por resolver problemas desde sus fundamentos teóricos.
          </p>

          {/* CTAs */}
          <div className="hero-ctas" style={{ display: "flex", gap: "1rem", flexWrap: "wrap", opacity: 0 }}>
            <a
              href="#proyectos"
              style={{ padding: "0.75rem 1.75rem", background: "var(--accent-primary)", color: "#080808", borderRadius: "8px", fontWeight: 600, fontSize: "0.9rem", textDecoration: "none", transition: "all 0.2s cubic-bezier(0.4,0,0.2,1)" }}
              onMouseEnter={(e) => { const el = e.currentTarget as HTMLAnchorElement; el.style.transform = "translateY(-2px)"; el.style.boxShadow = "0 8px 30px rgba(110,231,183,0.3)"; }}
              onMouseLeave={(e) => { const el = e.currentTarget as HTMLAnchorElement; el.style.transform = "translateY(0)"; el.style.boxShadow = "none"; }}
            >
              Ver proyectos
            </a>
            <a
              href="https://github.com/ArturoYJ"
              target="_blank"
              rel="noopener noreferrer"
              style={{ padding: "0.75rem 1.75rem", background: "transparent", color: "var(--text-primary)", borderRadius: "8px", fontWeight: 500, fontSize: "0.9rem", textDecoration: "none", border: "1px solid var(--border)", transition: "all 0.2s cubic-bezier(0.4,0,0.2,1)" }}
              onMouseEnter={(e) => { const el = e.currentTarget as HTMLAnchorElement; el.style.borderColor = "var(--border-hover)"; el.style.transform = "translateY(-2px)"; }}
              onMouseLeave={(e) => { const el = e.currentTarget as HTMLAnchorElement; el.style.borderColor = "var(--border)"; el.style.transform = "translateY(0)"; }}
            >
              GitHub →
            </a>
          </div>

          {/* Stats */}
          <div className="hero-stats" style={{ display: "flex", gap: "2.5rem", marginTop: "3rem", paddingTop: "2rem", borderTop: "1px solid var(--border)" }}>
            {[{ value: "3+", label: "Proyectos" }, { value: "PERN", label: "Stack" }, { value: "AWS", label: "Cloud" }].map((stat) => (
              <div key={stat.label} className="stat-item" style={{ opacity: 0 }}>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: "1.25rem", fontWeight: 500, color: "var(--accent-primary)", lineHeight: 1 }}>{stat.value}</div>
                <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "4px", letterSpacing: "0.05em" }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — Photo */}
        <div className="hero-photo" style={{ position: "relative", opacity: 0, flexShrink: 0 }}>
          <div style={{ position: "absolute", inset: "-8px", borderRadius: "50%", border: "1px solid rgba(110,231,183,0.2)", animation: "spin 20s linear infinite" }} />
          <div style={{ position: "absolute", inset: "-20px", borderRadius: "50%", border: "1px dashed rgba(110,231,183,0.08)", animation: "spin 35s linear infinite reverse" }} />
          <div style={{ width: "clamp(180px, 20vw, 260px)", height: "clamp(180px, 20vw, 260px)", borderRadius: "50%", overflow: "hidden", border: "2px solid var(--border)", position: "relative" }}>
            <Image src="/foto.jpg" alt="Arturo Yion Jaime — Software Engineer" fill sizes="(max-width: 768px) 180px, 260px" style={{ objectFit: "cover", objectPosition: "center top" }} priority />
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
