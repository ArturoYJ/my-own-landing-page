"use client";

import { useEffect, useRef } from "react";

const projects = [
  {
    id: "glamstock",
    title: "GlamStock",
    subtitle: "Sistema de Inventarios para PyMEs",
    description:
      "Evolución de monolito a Arquitectura Orientada a Servicios (SOA), separando infraestructura, API y cliente. Validación con Zod que redujo errores de integración en 70%. BD PostgreSQL normalizada con 7 entidades para +1,500 registros.",
    tags: ["Next.js", "Express.js", "PostgreSQL", "Docker", "AWS EC2", "AWS RDS"],
    highlights: ["SOA Migration", "Zod Validation", "+1,500 records", "70% less errors"],
    year: "Mar 2026",
    link: "https://github.com/ArturoYJ",
    accent: "#6ee7b7",
  },
  {
    id: "huginmunin",
    title: "Hugin Munin",
    subtitle: "ZOOMAT — Sistema de Gestión de Especies",
    description:
      "Solución a la descentralización y pérdida de reportes/registros de especies en cautiverio. API REST construida con Kotlin/Ktor bajo Arquitectura Hexagonal, garantizando desacoplamiento total de la lógica de negocio.",
    tags: ["Angular", "Kotlin", "Ktor", "PostgreSQL", "Hexagonal Architecture"],
    highlights: ["Hexagonal Arch", "Zero logic coupling", "Species tracking"],
    year: "2025 – Present",
    link: "https://github.com/ArturoYJ",
    accent: "#818cf8",
  },
  {
    id: "pillup",
    title: "PillUp",
    subtitle: "Sistema de Salud Nativo — Android",
    description:
      "Aplicación nativa Android para gestión de medicamentos y salud. Implementación estricta de Arquitectura MVVM con ViewModel y LiveData, garantizando persistencia del estado ante cambios de configuración del dispositivo.",
    tags: ["Kotlin", "Jetpack Compose", "Firebase", "MVVM"],
    highlights: ["MVVM Pattern", "LiveData", "State persistence", "Native Android"],
    year: "Nov 2025",
    link: "https://github.com/ArturoYJ",
    accent: "#f9a8d4",
  },
];

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cards = entry.target.querySelectorAll(".project-card");
            import("animejs").then((mod) => {
              const { animate, stagger } = mod;
              animate(cards, {
                opacity: [0, 1],
                translateY: [40, 0],
                delay: stagger(150),
                duration: 700,
                ease: "outExpo",
              });
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="proyectos"
      ref={sectionRef}
      style={{
        padding: "7rem 2rem",
        position: "relative",
        zIndex: 2,
      }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div className="section-label">
          <span className="accent-line" />
          Proyectos Destacados
        </div>

        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
            fontWeight: 700,
            letterSpacing: "-0.03em",
            marginBottom: "0.75rem",
            lineHeight: 1.1,
          }}
        >
          Lo que he construido
        </h2>
        <p
          style={{
            color: "var(--text-secondary)",
            fontSize: "1rem",
            marginBottom: "3.5rem",
            maxWidth: "500px",
          }}
        >
          Proyectos reales con arquitecturas limpias, despliegue cloud y foco en
          la mantenibilidad a largo plazo.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}

type Project = (typeof projects)[0];

function ProjectCard({ project }: { project: Project }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    const el = cardRef.current;
    if (!el) return;
    el.style.borderColor = `${project.accent}33`;
    el.style.transform = "translateY(-4px)";
    el.style.boxShadow = `0 20px 40px rgba(0,0,0,0.4), 0 0 0 1px ${project.accent}22`;
  };

  const handleMouseLeave = () => {
    const el = cardRef.current;
    if (!el) return;
    el.style.borderColor = "var(--border)";
    el.style.transform = "translateY(0)";
    el.style.boxShadow = "none";
  };

  return (
    <div
      ref={cardRef}
      className="project-card"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        background: "var(--bg-card)",
        border: "1px solid var(--border)",
        borderRadius: "var(--radius-card)",
        padding: "1.75rem",
        transition: "all 0.35s cubic-bezier(0.4,0,0.2,1)",
        opacity: 0,
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        cursor: "default",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <div>
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.65rem",
              color: "var(--text-muted)",
              letterSpacing: "0.1em",
              marginBottom: "4px",
            }}
          >
            {project.year}
          </div>
          <h3
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "1.2rem",
              fontWeight: 700,
              color: "var(--text-primary)",
              letterSpacing: "-0.02em",
            }}
          >
            {project.title}
          </h3>
          <p
            style={{
              fontSize: "0.78rem",
              color: project.accent,
              marginTop: "2px",
              fontWeight: 500,
            }}
          >
            {project.subtitle}
          </p>
        </div>
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: "var(--text-muted)",
            textDecoration: "none",
            fontSize: "1.1rem",
            transition: "color 0.2s",
            flexShrink: 0,
            marginLeft: "1rem",
          }}
          aria-label={`Ver ${project.title} en GitHub`}
          onMouseEnter={(e) =>
            ((e.currentTarget as HTMLAnchorElement).style.color =
              project.accent)
          }
          onMouseLeave={(e) =>
            ((e.currentTarget as HTMLAnchorElement).style.color =
              "var(--text-muted)")
          }
        >
          ↗
        </a>
      </div>

      {/* Description */}
      <p
        style={{
          fontSize: "0.85rem",
          color: "var(--text-secondary)",
          lineHeight: 1.65,
          flexGrow: 1,
        }}
      >
        {project.description}
      </p>

      {/* Highlights */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
        {project.highlights.map((h) => (
          <span
            key={h}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.65rem",
              padding: "3px 8px",
              borderRadius: "4px",
              background: `${project.accent}12`,
              color: project.accent,
              letterSpacing: "0.04em",
            }}
          >
            {h}
          </span>
        ))}
      </div>

      {/* Tags */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "6px",
          paddingTop: "0.75rem",
          borderTop: "1px solid var(--border)",
        }}
      >
        {project.tags.map((tag) => (
          <span
            key={tag}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.65rem",
              padding: "3px 8px",
              borderRadius: "4px",
              background: "var(--bg-elevated)",
              color: "var(--text-muted)",
              letterSpacing: "0.04em",
            }}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
