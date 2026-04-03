"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useObserverAnimation } from "@/hooks/useObserverAnimation";

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
    bgDark: false,
  },
  {
    id: "huginmunin",
    title: "Hugin Munin",
    subtitle: "ZOOMAT — Gestión de Especies en Cautiverio",
    shortDesc:
      "Centralización de datos de +100 especies para el Zoológico de Chiapas. API REST en Kotlin/Ktor bajo Arquitectura Hexagonal con desacoplamiento total de lógica de negocio.",
    tags: ["Angular", "Kotlin", "Ktor", "PostgreSQL"],
    year: "2025 – Present",
    accent: "#60a5fa",
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
    accent: "#34d399",
    image: "/project-placeholder.png",
    bgDark: false,
  },
];

export default function Projects() {
  const sectionRef = useObserverAnimation({
    selector: ".project-row",
    duration: 800,
    staggerDelay: 180,
    threshold: 0.1,
  });

  return (
    <section
      ref={sectionRef}
      id="proyectos"
      style={{
        position: "relative",
        zIndex: 2,
        background: "transparent",
        borderTop: "1px solid var(--bg-card)",
        borderBottom: "1px solid var(--bg-card)",
      }}
    >
      {/* Section header */}
      <div
        style={{
          padding: "5rem 2rem 2rem",
          maxWidth: "1100px",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <div className="section-label" style={{ marginBottom: "1rem" }}>
          <span className="accent-line" />
          Proyectos Destacados
        </div>
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(1.8rem, 5vw, 2.8rem)",
            fontWeight: 700,
            letterSpacing: "-0.03em",
            lineHeight: 1,
            marginBottom: "0.75rem",
          }}
        >
          Lo que he construido
        </h2>
        <p
          style={{
            color: "var(--text-secondary)",
            fontSize: "1rem",
            maxWidth: "540px",
            lineHeight: 1.5,
          }}
        >
          Arquitecturas limpias, despliegue cloud y foco en la mantenibilidad.
        </p>
      </div>

      {/* Project rows */}
      {projects.map((project, idx) => (
        <ProjectRow key={project.id} project={project} index={idx} />
      ))}
    </section>
  );
}

type Project = (typeof projects)[0];

function ProjectRow({ project, index }: { project: Project; index: number }) {
  const isEven = index % 2 === 0;

  return (
    <div
      className="project-row"
      style={{
        background: "transparent",
        position: "relative",
        opacity: 0,
        minHeight: "auto",
        display: "flex",
        alignItems: "center",
      }}
    >
      {/* Structural contrast edge */}
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
          padding: "3rem 2rem",
          display: "grid",
          gridTemplateColumns: isEven ? "1fr 1fr" : "1fr 1fr",
          gap: "4rem",
          alignItems: "center",
          direction: isEven ? "ltr" : "rtl",
          width: "100%",
        }}
      >
        {/* Image — links to detail page */}
        <Link
          href={`/proyectos/${project.id}`}
          aria-label={`Ver detalles del proyecto ${project.title}`}
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
            alt={`Captura de pantalla: ${project.title}`}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            priority={index === 0}
            style={{ objectFit: "cover" }}
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
              const arrow = el.querySelector("span");
              if (arrow) {
                arrow.style.transform = "translateX(2px) rotate(20deg)";
                arrow.style.display = "inline-block";
              }
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.borderBottomColor = `${project.accent}40`;
              el.style.gap = "6px";
              const arrow = el.querySelector("span");
              if (arrow) {
                arrow.style.transform = "translateX(0) rotate(0deg)";
              }
            }}
          >
            Ver detalle completo <span style={{ transition: "all 0.2s" }}>→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
