import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import ProjectCarousel from "@/components/ProjectCarousel";
import { projects, projectsById } from "@/data/projects";

type Params = { id: string };

export async function generateStaticParams() {
  return projects.map((project) => ({ id: project.id }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { id } = await params;
  const project = projectsById[id];
  if (!project) return {};
  return {
    title: `${project.title} — Arturo Yion Jaime`,
    description: project.overview,
  };
}

export default async function ProjectDetail({ params }: { params: Promise<Params> }) {
  const { id } = await params;
  const project = projectsById[id];
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
          className="project-detail-grid"
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
              fit={project.fit}
              aspectRatio={project.aspectRatio}
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
          <aside
            className="project-detail-sidebar"
            style={{
              position: "relative",
            }}
          >
            <div
              className="project-detail-sticky"
              style={{
                position: "sticky",
                top: "100px",
                height: "fit-content",
                zIndex: 10,
              }}
            >
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
