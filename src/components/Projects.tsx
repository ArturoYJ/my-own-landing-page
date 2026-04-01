"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

const projects = [
  {
    id: "glamstock",
    title: "GlamStock",
    subtitle: "Sistema de Inventarios para PyMEs",
    shortDesc:
      "Evolución de monolito a SOA. Validación con Zod que redujo errores en 70%. BD PostgreSQL normalizada con 7 entidades para +1,500 registros de inventario.",
    tags: ["Next.js", "Express.js", "PostgreSQL", "Docker", "AWS"],
    year: "Mar 2026",
    accent: "#a78bfa",
    image: "/project-placeholder.png",
    // Bg: alternating contrast via bg color
    bgDark: false,
  },
  {
    id: "huginmunin",
    title: "Hugin Munin",
    subtitle: "ZOOMAT — Gestión de Especies en Cautiverio",
    shortDesc:
      "Centralización de datos de especies para el Zoológico de Chiapas. API REST en Kotlin/Ktor bajo Arquitectura Hexagonal con desacoplamiento total de lógica de negocio.",
    tags: ["Angular", "Kotlin", "Ktor", "PostgreSQL"],
    year: "2025 – Present",
    accent: "#a78bfa",
    image: "/project-placeholder.png",
    bgDark: true,
  },
  {
    id: "pillup",
    title: "PillUp",
    subtitle: "Sistema de Salud Nativo — Android",
    shortDesc:
      "App nativa Android para gestión de medicamentos. Arquitectura MVVM estricta con ViewModel y LiveData, garantizando persistencia de estado ante cambios de configuración.",
    tags: ["Kotlin", "Jetpack Compose", "Firebase", "MVVM"],
    year: "Nov 2025",
    accent: "#a78bfa",
    image: "/project-placeholder.png",
    bgDark: false,
  },
];

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            import("animejs").then((mod) => {
              const { animate, stagger } = mod;
              animate(".project-row", {
                opacity: [0, 1],
                translateY: [30, 0],
                delay: stagger(180),
                duration: 800,
                ease: "outExpo",
              });
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="proyectos"
      ref={sectionRef}
      style={{ position: "relative", zIndex: 2 }}
    >
      {/* Section header */}
      <div style={{ 
        padding: "8rem 2rem", 
        maxWidth: "1100px", 
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}>
        <div className="section-label">
          <span className="accent-line" />
          Proyectos Destacados
        </div>
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(1.8rem, 5vw, 3.5rem)", // Bigger for full-page feel
            fontWeight: 700,
            letterSpacing: "-0.03em",
            lineHeight: 1,
            marginBottom: "1rem",
          }}
        >
          Lo que he <br /> construido
        </h2>
        <p style={{ 
          color: "var(--text-secondary)", 
          fontSize: "1.1rem", 
          maxWidth: "540px",
          lineHeight: 1.6 
        }}>
          Proyectos reales con arquitecturas limpias, despliegue cloud y foco en la mantenibilidad.
        </p>
      </div>

      {/* Project rows — each one is a full-width horizontal band */}
      {projects.map((project, idx) => (
        <ProjectRow key={project.id} project={project} index={idx} />
      ))}
    </section>
  );
}

type Project = (typeof projects)[0];

function ProjectRow({ project, index }: { project: Project; index: number }) {
  const rowRef = useRef<HTMLDivElement>(null);
  const isEven = index % 2 === 0;

  // No-Line Rule: Contrast via tonal shifts rather than solid dividers
  const bg = project.bgDark ? "var(--bg-void)" : "var(--bg-base)";

  return (
    <div
      ref={rowRef}
      className="project-row"
      style={{
        background: bg,
        position: "relative",
        opacity: 0,
        minHeight: "80vh",
        display: "flex",
        alignItems: "center"
      }}
    >
      {/* Structural contrast edge - using color shift instead of 1px border */}
      <div 
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "1px",
          background: "linear-gradient(90deg, transparent, rgba(206,189,255,0.05), transparent)",
        }}
      />

      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "5rem 2rem",
          display: "grid",
          gridTemplateColumns: isEven ? "1fr 1fr" : "1fr 1fr",
          gap: "4rem",
          alignItems: "center",
          // Alternate image left/right for visual rhythm
          direction: isEven ? "ltr" : "rtl",
        }}
      >
        {/* Image — links to detail page */}
        <Link
          href={`/proyectos/${project.id}`}
          style={{
            display: "block",
            borderRadius: "12px",
            overflow: "hidden",
            border: `1px solid ${project.accent}20`,
            position: "relative",
            aspectRatio: "16/10",
            transition: "all 0.35s cubic-bezier(0.4,0,0.2,1)",
            direction: "ltr",
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLAnchorElement;
            el.style.borderColor = `${project.accent}55`;
            el.style.transform = "scale(1.02)";
            el.style.boxShadow = `0 20px 50px rgba(0,0,0,0.5), 0 0 0 1px ${project.accent}30`;
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLAnchorElement;
            el.style.borderColor = `${project.accent}20`;
            el.style.transform = "scale(1)";
            el.style.boxShadow = "none";
          }}
        >
          <Image
            src={project.image}
            alt={`Captura de pantalla de ${project.title}`}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            style={{ objectFit: "cover" }}
          />
          {/* Hover overlay */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: `linear-gradient(135deg, ${project.accent}15, transparent)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              opacity: 0,
              transition: "opacity 0.3s",
            }}
            className="image-overlay"
          />
          {/* "Ver detalle" label */}
          <div
            style={{
              position: "absolute",
              bottom: "12px",
              right: "12px",
              background: project.accent,
              color: "#080808",
              fontFamily: "var(--font-mono)",
              fontSize: "0.65rem",
              fontWeight: 600,
              letterSpacing: "0.08em",
              padding: "5px 10px",
              borderRadius: "4px",
            }}
          >
            Ver detalle →
          </div>
        </Link>

        {/* Text content */}
        <div style={{ direction: "ltr" }}>
          {/* Year */}
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.65rem",
              color: "var(--text-muted)",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              marginBottom: "0.75rem",
            }}
          >
            {project.year}
          </div>

          {/* Title */}
          <h3
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.5rem, 3vw, 2.2rem)",
              fontWeight: 700,
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
              marginBottom: "0.4rem",
              color: "var(--text-primary)",
            }}
          >
            {project.title}
          </h3>

          {/* Subtitle */}
          <p
            style={{
              fontSize: "0.85rem",
              color: project.accent,
              fontWeight: 500,
              marginBottom: "1.25rem",
            }}
          >
            {project.subtitle}
          </p>

          {/* Short description */}
          <p
            style={{
              fontSize: "0.92rem",
              color: "var(--text-secondary)",
              lineHeight: 1.7,
              marginBottom: "1.75rem",
              maxWidth: "420px",
            }}
          >
            {project.shortDesc}
          </p>

          {/* Tags */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "1.75rem" }}>
            {project.tags.map((tag) => (
              <span
                key={tag}
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.68rem",
                  padding: "4px 10px",
                  borderRadius: "4px",
                  background: `${project.accent}10`,
                  color: project.accent,
                  border: `1px solid ${project.accent}25`,
                  letterSpacing: "0.04em",
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* CTA */}
          <Link
            href={`/proyectos/${project.id}`}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              fontFamily: "var(--font-mono)",
              fontSize: "0.8rem",
              fontWeight: 500,
              color: project.accent,
              textDecoration: "none",
              borderBottom: `1px solid ${project.accent}40`,
              paddingBottom: "2px",
              transition: "all 0.2s",
              letterSpacing: "0.02em",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.borderBottomColor = project.accent;
              el.style.gap = "10px";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.borderBottomColor = `${project.accent}40`;
              el.style.gap = "6px";
            }}
          >
            Ver detalle completo <span>→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
