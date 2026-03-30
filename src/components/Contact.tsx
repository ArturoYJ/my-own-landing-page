"use client";

import { useEffect, useRef } from "react";

const contactLinks = [
  {
    label: "Email",
    value: "yionjaime@gmail.com",
    href: "mailto:yionjaime@gmail.com",
    icon: "✉",
    accent: "#6ee7b7",
    description: "Escríbeme directamente",
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/arturo-yion",
    href: "https://linkedin.com/in/arturo-yion",
    icon: "in",
    accent: "#818cf8",
    description: "Perfil profesional",
    mono: true,
  },
  {
    label: "GitHub",
    value: "github.com/ArturoYJ",
    href: "https://github.com/ArturoYJ",
    icon: "⌥",
    accent: "#f9a8d4",
    description: "Código y proyectos",
  },
];

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            import("animejs").then((mod) => {
              const { animate, stagger } = mod;
              animate(".contact-card", {
                opacity: [0, 1],
                translateY: [30, 0],
                delay: stagger(120),
                duration: 700,
                ease: "outExpo",
              });
              animate(".contact-heading", {
                opacity: [0, 1],
                translateY: [20, 0],
                duration: 600,
                ease: "outExpo",
              });
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="contacto"
      ref={sectionRef}
      style={{
        padding: "7rem 2rem 6rem",
        background: "var(--bg-surface)",
        position: "relative",
        zIndex: 2,
      }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div className="section-label">
          <span className="accent-line" />
          Contacto
        </div>

        <div className="contact-heading" style={{ opacity: 0, marginBottom: "3.5rem" }}>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
              fontWeight: 700,
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
              marginBottom: "0.75rem",
            }}
          >
            ¿Trabajamos juntos?
          </h2>
          <p
            style={{
              color: "var(--text-secondary)",
              fontSize: "1rem",
              maxWidth: "480px",
            }}
          >
            Disponible para proyectos freelance, colaboraciones y oportunidades
            laborales. No dudes en escribirme.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "1.25rem",
          }}
        >
          {contactLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith("mailto") ? undefined : "_blank"}
              rel="noopener noreferrer"
              className="contact-card"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1.25rem",
                background: "var(--bg-card)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius-card)",
                padding: "1.5rem",
                textDecoration: "none",
                transition: "all 0.3s cubic-bezier(0.4,0,0.2,1)",
                opacity: 0,
                color: "inherit",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.borderColor = `${link.accent}40`;
                el.style.transform = "translateY(-3px)";
                el.style.boxShadow = `0 12px 30px rgba(0,0,0,0.3), 0 0 0 1px ${link.accent}20`;
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.borderColor = "var(--border)";
                el.style.transform = "translateY(0)";
                el.style.boxShadow = "none";
              }}
            >
              {/* Icon */}
              <div
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "10px",
                  background: `${link.accent}15`,
                  border: `1px solid ${link.accent}25`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: link.mono ? "var(--font-mono)" : "inherit",
                  fontSize: link.mono ? "0.75rem" : "1.1rem",
                  color: link.accent,
                  fontWeight: 700,
                  flexShrink: 0,
                }}
              >
                {link.icon}
              </div>

              {/* Content */}
              <div style={{ minWidth: 0 }}>
                <p
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.65rem",
                    color: link.accent,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    marginBottom: "3px",
                  }}
                >
                  {link.label}
                </p>
                <p
                  style={{
                    fontWeight: 500,
                    fontSize: "0.85rem",
                    color: "var(--text-primary)",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {link.value}
                </p>
                <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "2px" }}>
                  {link.description}
                </p>
              </div>

              {/* Arrow */}
              <span
                style={{
                  marginLeft: "auto",
                  color: "var(--text-muted)",
                  fontSize: "1rem",
                  flexShrink: 0,
                  transition: "transform 0.2s, color 0.2s",
                }}
              >
                →
              </span>
            </a>
          ))}
        </div>

        {/* Footer line */}
        <div
          style={{
            marginTop: "5rem",
            paddingTop: "2rem",
            borderTop: "1px solid var(--border)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.75rem",
              color: "var(--text-muted)",
            }}
          >
            © 2026 Arturo Yion Jaime
          </span>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.75rem",
              color: "var(--text-muted)",
            }}
          >
            Construido con Next.js · Tuxtla Gutiérrez, MX
          </span>
        </div>
      </div>
    </section>
  );
}
