"use client";

import { useEffect, useRef } from "react";

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            import("animejs").then((mod) => {
              const { animate, stagger } = mod;
              animate(".about-col", {
                opacity: [0, 1],
                translateX: [-30, 0],
                delay: stagger(200),
                duration: 800,
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
      id="sobre-mi"
      ref={sectionRef}
      style={{
        padding: "7rem 2rem",
        position: "relative",
        zIndex: 2,
        scrollSnapAlign: "start",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
      }}
    >
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "5rem",
          alignItems: "start",
        }}
      >
        {/* Left */}
        <div className="about-col" style={{ opacity: 0 }}>
          <div className="section-label">
            <span className="accent-line" />
            Sobre mí
          </div>

          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)",
              fontWeight: 700,
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
              marginBottom: "1.5rem",
            }}
          >
            Construyo con{" "}
            <span style={{ color: "var(--accent-primary)" }}>propósito</span>
            ,<br />
            no con templates.
          </h2>

          <p
            style={{
              color: "var(--text-secondary)",
              lineHeight: 1.75,
              fontSize: "0.95rem",
              marginBottom: "1.25rem",
            }}
          >
            Soy Ingeniero de Software en formación, especializado en el
            desarrollo de aplicaciones robustas bajo principios de{" "}
            <strong style={{ color: "var(--text-primary)", fontWeight: 500 }}>
              Clean Architecture
            </strong>{" "}
            y <strong style={{ color: "var(--text-primary)", fontWeight: 500 }}>SOLID</strong>.
          </p>
          <p
            style={{
              color: "var(--text-secondary)",
              lineHeight: 1.75,
              fontSize: "0.95rem",
              marginBottom: "1.25rem",
            }}
          >
            Tengo experiencia diseñando sistemas escalables con el stack PERN y
            despliegue en infraestructuras Cloud, priorizando el desacoplamiento
            de la lógica de negocio y la eficiencia en el acceso a datos.
          </p>
          <p
            style={{
              color: "var(--text-secondary)",
              lineHeight: 1.75,
              fontSize: "0.95rem",
            }}
          >
            Me apasiona resolver problemas desde sus{" "}
            <strong style={{ color: "var(--text-primary)", fontWeight: 500 }}>
              fundamentos teóricos
            </strong>
            , no solo desde la superficie.
          </p>
        </div>

        {/* Right */}
        <div className="about-col" style={{ opacity: 0, display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          {/* Education card */}
          <div
            style={{
              background: "var(--bg-card)",
              borderRadius: "var(--radius-card)",
              padding: "1.75rem",
              transition: "all 0.4s var(--transition-base)",
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLDivElement).style.background =
                "var(--bg-elevated)")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLDivElement).style.background =
                "var(--bg-card)")
            }
          >
            <div className="section-label" style={{ marginBottom: "1rem" }}>
              <span className="accent-line" />
              Formación
            </div>
            <p
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 600,
                fontSize: "0.95rem",
                marginBottom: "4px",
              }}
            >
              Universidad Politécnica de Chiapas
            </p>
            <p
              style={{ color: "var(--text-secondary)", fontSize: "0.85rem", marginBottom: "4px" }}
            >
              Ingeniería en Desarrollo de Software
            </p>
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.72rem",
                color: "var(--text-muted)",
              }}
            >
              Sep. 2023 – Dic. 2027 (previsto) · 5° Cuatrimestre
            </p>
            <div
              style={{
                marginTop: "1rem",
                display: "flex",
                flexWrap: "wrap",
                gap: "6px",
              }}
            >
              {[
                "Arquitectura de Software",
                "Desarrollo Web",
                "APIs RESTful",
                "BD Relacionales",
              ].map((area) => (
                <span
                  key={area}
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.65rem",
                    padding: "3px 8px",
                    borderRadius: "4px",
                    background: "rgba(167,139,250,0.08)",
                    color: "var(--accent-primary)",
                    border: "1px solid rgba(167,139,250,0.15)",
                  }}
                >
                  {area}
                </span>
              ))}
            </div>
          </div>

          {/* Info cards row */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            {/* Location */}
            <div
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius-card)",
                padding: "1.25rem",
                transition: "border-color 0.3s",
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLDivElement).style.borderColor =
                  "var(--border-hover)")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLDivElement).style.borderColor =
                  "var(--border)")
              }
            >
              <p
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.65rem",
                  color: "var(--text-muted)",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  marginBottom: "6px",
                }}
              >
                Ubicación
              </p>
              <p
                style={{
                  fontSize: "0.85rem",
                  fontWeight: 500,
                  color: "var(--text-primary)",
                }}
              >
                Tuxtla Gutiérrez
              </p>
              <p style={{ fontSize: "0.78rem", color: "var(--text-secondary)" }}>
                Chiapas, México
              </p>
            </div>

            {/* Languages */}
            <div
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius-card)",
                padding: "1.25rem",
                transition: "border-color 0.3s",
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLDivElement).style.borderColor =
                  "var(--border-hover)")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLDivElement).style.borderColor =
                  "var(--border)")
              }
            >
              <p
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.65rem",
                  color: "var(--text-muted)",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  marginBottom: "8px",
                }}
              >
                Idiomas
              </p>
              <p style={{ fontSize: "0.83rem", fontWeight: 500, color: "var(--text-primary)" }}>
                Español <span style={{ color: "var(--accent-primary)" }}>Nativo</span>
              </p>
              <p style={{ fontSize: "0.83rem", fontWeight: 500, color: "var(--text-primary)" }}>
                Inglés{" "}
                <span style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)", fontSize: "0.7rem" }}>
                  B1 Técnico
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
