import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Nav from "@/components/Nav";
import ProjectCarousel from "@/components/ProjectCarousel";
import { ErrorBoundary } from "@/components/ErrorBoundary";

/* ─── Project data ─── */
const projects = {
  glamstock: {
    id: "glamstock",
    title: "GlamStock",
    subtitle: "Sistema de Inventarios para PyMEs",
    year: "Mar 2026",
    accent: "#a78bfa",
    images: ["/glamstock/glamstock.png", "/glamstock/glamstock2.png", "/glamstock/glamstock3.png", "/glamstock/glamstock4.png"],
    overview:
      "GlamStock es un sistema de gestión de inventarios diseñado específicamente para pequeñas y medianas empresas del sector retail y cosmético. Nació como un monolito y evolucionó a una Arquitectura Orientada a Servicios (SOA) para mejorar su escalabilidad y mantenimiento.",
    challenges: [
      "Migración de monolito a SOA sin interrumpir el servicio existente.",
      "Diseño de esquemas de validación robustos con Zod para garantizar integridad de datos.",
      "Configuración de infraestructura cloud con alta disponibilidad en AWS.",
      "Normalización de base de datos PostgreSQL con 7 entidades para soportar +1,500 registros.",
    ],
    results: [
      "Reducción de errores de integración en un 70% tras implementar validación con Zod.",
      "Separación completa de infraestructura, API y cliente bajo SOA.",
      "Persistencia de datos confiable con PostgreSQL en AWS RDS.",
      "Despliegue automatizado con Docker y GitHub Actions.",
    ],
    tags: ["Next.js", "Express.js", "PostgreSQL", "Docker", "AWS EC2", "AWS RDS", "Zod", "TypeScript"],
    github: "https://github.com/ArturoYJ/GlamStock",
    fit: "cover",
  },
  huginmunin: {
    id: "huginmunin",
    title: "Hugin Munin",
    subtitle: "ZOOMAT — Sistema de Gestión de Especies",
    year: "2025 – Present",
    accent: "#34d399",
    images: ["/hugin/huginmunin.png"],
    overview:
      "Hugin Munin es una plataforma de gestión diseñada para el Zoológico Miguel Álvarez del Toro (ZOOMAT) en Chiapas. Soluciona el problema de la descentralización y pérdida de registros de especies en cautiverio mediante una API robusta y un cliente Angular.",
    challenges: [
      "Centralización de datos históricamente dispersos en papel y distintos sistemas.",
      "Diseño de API desacoplada usando Arquitectura Hexagonal en Kotlin/Ktor.",
      "Colaboración en equipo multidisciplinario con metodología ágil.",
      "Garantizar cero pérdida de datos en registros de especies protegidas.",
    ],
    results: [
      "API REST completamente desacoplada de lógica de negocio bajo Hexagonal Architecture.",
      "Sistema de conteo y reporte de especies en tiempo real.",
      "Reducción de tiempo de generación de reportes de días a segundos.",
      "Integración exitosa con el flujo operativo del zoológico.",
    ],
    tags: ["Angular", "Kotlin", "Ktor", "PostgreSQL", "Hexagonal Architecture", "REST API"],
    github: "https://github.com/ArturoYJ/hugin_munin_ng",
    fit: "cover",
  },
  pillup: {
    id: "pillup",
    title: "PillUp",
    subtitle: "Sistema de Salud Nativo — Android",
    year: "Nov 2025",
    accent: "#60a5fa",
    images: [ 
      "/pillup/vistade3/bienvenida1.png", 
      "/pillup/vistade3/procesoMedicamentos.png",
      "/pillup/vistade2/medicamentos.png", 
      "/pillup/vistade2/registrarMedicamento2.png", 
      "/pillup/vistade2/verContacto.png",
    ],
    overview:
      "PillUp es una aplicación móvil nativa para Android orientada a la gestión personal de medicamentos y seguimiento de salud. Implementa una Arquitectura MVVM estricta que garantiza la persistencia del estado de la aplicación ante cualquier cambio de configuración del dispositivo.",
    challenges: [
      "Implementación correcta del patrón MVVM con separación estricta de responsabilidades.",
      "Manejo de cambios de configuración (rotación, idioma) sin pérdida de estado.",
      "Integración con Firebase para autenticación y base de datos en tiempo real.",
      "Diseño de interfaz accesible y fluida con Jetpack Compose.",
    ],
    results: [
      "Persistencia total del estado ante cambios de configuración con ViewModel y LiveData.",
      "UI moderna y reactiva implementada con Jetpack Compose.",
      "Sincronización en tiempo real de datos de medicamentos con Firebase.",
      "Arquitectura limpia y mantenible lista para escalar con nuevas funcionalidades.",
    ],
    tags: ["Kotlin", "Jetpack Compose", "Firebase", "MVVM", "LiveData", "ViewModel", "Android"],
    github: "https://github.com/ArturoYJ/PillUp",
    fit: "contain",
    aspectRatio: "16 / 9",
  },
};

type Params = { id: string };

export async function generateStaticParams() {
  return Object.keys(projects).map((id) => ({ id }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { id } = await params;
  const project = projects[id as keyof typeof projects];
  if (!project) return {};
  return {
    title: `${project.title} — Arturo Yion Jaime`,
    description: project.overview,
  };
}

export default async function ProjectDetail({ params }: { params: Promise<Params> }) {
  const { id } = await params;
  const project = projects[id as keyof typeof projects];
  if (!project) notFound();

  return (
    <>
      {/* Background Effects (No Video) */}
      <div className="dot-grid" aria-hidden="true" />
      <div className="noise-overlay" aria-hidden="true" />

      <Nav />
      <main
        style={{
          minHeight: "100vh",
          background: "var(--bg-base)",
          color: "var(--text-primary)",
          paddingTop: "80px",
        }}
      >
        {/* Hero del proyecto */}
        <div
          style={{
            position: "relative",
            padding: "5rem 0 1.5rem",
            overflow: "hidden",
          }}
        >
          {/* Gradient accent background */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: `radial-gradient(ellipse 60% 60% at 80% 50%, ${project.accent}08, transparent)`,
              pointerEvents: "none",
            }}
          />

          <div style={{ maxWidth: "1300px", margin: "0 auto", padding: "0 2rem", position: "relative" }}>
            {/* Back link */}
            <Link
              href="/#proyectos"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                fontFamily: "var(--font-mono)",
                fontSize: "0.75rem",
                color: "var(--text-muted)",
                textDecoration: "none",
                marginBottom: "2.5rem",
                transition: "color 0.2s",
              }}
            >
              ← Volver a proyectos
            </Link>

            <div className="section-label">
              <span className="accent-line" />
              {project.year}
            </div>

            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
                fontWeight: 700,
                letterSpacing: "-0.04em",
                lineHeight: 1.0,
                marginBottom: "0.5rem",
              }}
            >
              {project.title}
            </h1>
            <p style={{ fontSize: "1.1rem", color: project.accent, fontWeight: 500 }}>
              {project.subtitle}
            </p>
          </div>
        </div>

        {/* Content */}
        <div
          style={{
            maxWidth: "1300px",
            margin: "0 auto",
            padding: "0.5rem 2rem 6rem",
            display: "grid",
            gridTemplateColumns: "1fr 380px",
            gap: "5rem",
            alignItems: "start",
          }}
        >
          {/* Left — main content */}
          <div>
            {/* Carousel */}
            <ProjectCarousel 
              images={project.images} 
              title={project.title} 
              accent={project.accent} 
              fit={(project as any).fit} 
              aspectRatio={(project as any).aspectRatio} 
            />

            {/* Overview */}
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "1.4rem",
                fontWeight: 700,
                letterSpacing: "-0.02em",
                marginBottom: "1rem",
                color: "var(--text-primary)",
              }}
            >
              Descripción general
            </h2>
            <p
              style={{
                fontSize: "0.95rem",
                color: "var(--text-secondary)",
                lineHeight: 1.8,
                marginBottom: "3rem",
              }}
            >
              {project.overview}
            </p>

            {/* Challenges */}
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "1.4rem",
                fontWeight: 700,
                letterSpacing: "-0.02em",
                marginBottom: "1rem",
                color: "var(--text-primary)",
              }}
            >
              Desafíos
            </h2>
            <ul
              style={{
                listStyle: "none",
                display: "flex",
                flexDirection: "column",
                gap: "0.75rem",
                marginBottom: "3rem",
              }}
            >
              {project.challenges.map((c, i) => (
                <li key={i} style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                  <span style={{ color: project.accent, fontFamily: "var(--font-mono)", fontSize: "0.8rem", marginTop: "2px", flexShrink: 0 }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span style={{ fontSize: "0.9rem", color: "var(--text-secondary)", lineHeight: 1.65 }}>
                    {c}
                  </span>
                </li>
              ))}
            </ul>

            {/* Results */}
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "1.4rem",
                fontWeight: 700,
                letterSpacing: "-0.02em",
                marginBottom: "1rem",
                color: "var(--text-primary)",
              }}
            >
              Resultados
            </h2>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {project.results.map((r, i) => (
                <li key={i} style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                  <span style={{ color: project.accent, fontSize: "0.9rem", flexShrink: 0, marginTop: "1px" }}>✓</span>
                  <span style={{ fontSize: "0.9rem", color: "var(--text-secondary)", lineHeight: 1.65 }}>{r}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right — sidebar */}
          <aside style={{ 
            height: "100%",
            position: "relative"
          }}>
            <div style={{
              position: "sticky", 
              top: "120px", 
              height: "fit-content",
              zIndex: 10
            }}>
            {/* Tech stack */}
            <div
              style={{
                background: "var(--bg-card)",
                border: `1px solid ${project.accent}20`,
                borderRadius: "12px",
                padding: "1.5rem",
                marginBottom: "1.25rem",
              }}
            >
              <div className="section-label" style={{ marginBottom: "1rem" }}>
                <span className="accent-line" />
                Stack
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.68rem",
                      padding: "4px 10px",
                      borderRadius: "4px",
                      background: `${project.accent}12`,
                      color: project.accent,
                      border: `1px solid ${project.accent}25`,
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Links */}
            <div
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border)",
                borderRadius: "12px",
                padding: "1.5rem",
              }}
            >
              <div className="section-label" style={{ marginBottom: "1rem" }}>
                <span className="accent-line" />
                Links
              </div>
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "0.75rem 1rem",
                  borderRadius: "8px",
                  background: "var(--bg-elevated)",
                  border: "1px solid var(--border)",
                  color: "var(--text-primary)",
                  textDecoration: "none",
                  fontSize: "0.85rem",
                  fontWeight: 500,
                  transition: "border-color 0.2s",
                }}
              >
                <span>Ver en GitHub</span>
                <span style={{ color: "var(--text-muted)" }}>↗</span>
              </a>
            </div>
          </div>
        </aside>
        </div>
      </main>
    </>
  );
}
