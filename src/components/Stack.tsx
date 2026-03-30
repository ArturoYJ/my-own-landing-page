"use client";

import { useEffect, useRef } from "react";

const stackGroups = [
  {
    category: "Backend",
    color: "#a78bfa",
    icon: "⬡",
    skills: ["Node.js", "Express.js", "TypeScript", "Kotlin", "Ktor"],
  },
  {
    category: "Frontend",
    color: "#a78bfa",
    icon: "◈",
    skills: ["React.js", "Next.js", "Angular", "JavaScript", "TypeScript"],
  },
  {
    category: "Bases de Datos",
    color: "#a78bfa",
    icon: "◫",
    skills: ["PostgreSQL", "MySQL", "Firebase"],
  },
  {
    category: "Cloud & DevOps",
    color: "#fbbf24",
    icon: "◎",
    skills: ["AWS EC2", "AWS RDS", "Docker", "GitHub Actions"],
  },
  {
    category: "Arquitectura",
    color: "#34d399",
    icon: "◰",
    skills: [
      "Clean Architecture",
      "Hexagonal",
      "SOLID",
      "SOA",
      "MVVM",
      "Dependency Injection",
    ],
  },
];

export default function Stack() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            import("animejs").then((mod) => {
              const { animate, stagger } = mod;
              animate(".stack-group", {
                opacity: [0, 1],
                translateY: [30, 0],
                delay: stagger(100),
                duration: 600,
                ease: "outExpo",
              });
              animate(".skill-badge", {
                opacity: [0, 1],
                scale: [0.85, 1],
                delay: stagger(30, { start: 300 }),
                duration: 400,
                ease: "outBack",
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
      id="stack"
      ref={sectionRef}
      style={{
        padding: "7rem 2rem",
        background: "var(--bg-surface)",
        position: "relative",
        zIndex: 2,
        scrollSnapAlign: "start",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
      }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div className="section-label">
          <span className="accent-line" />
          Stack Técnico
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
          Herramientas que domino
        </h2>
        <p
          style={{
            color: "var(--text-secondary)",
            fontSize: "1rem",
            marginBottom: "3.5rem",
            maxWidth: "500px",
          }}
        >
          Tecnologías con las que construyo sistemas robustos, escalables y mantenibles.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gap: "1rem",
          }}
        >
          {stackGroups.map((group) => (
            <div
              key={group.category}
              className="stack-group"
              style={{
                background: "var(--bg-card)",
                borderRadius: "var(--radius-card)",
                padding: "1.75rem",
                opacity: 0,
                transition: "all 0.4s var(--transition-base)",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.background = "var(--bg-elevated)";
                el.style.transform = "translateY(-4px)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.background = "var(--bg-card)";
                el.style.transform = "translateY(0)";
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  marginBottom: "1rem",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "1rem",
                    color: group.color,
                  }}
                >
                  {group.icon}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.7rem",
                    color: group.color,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    fontWeight: 500,
                  }}
                >
                  {group.category}
                </span>
              </div>

              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="skill-badge"
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.72rem",
                      padding: "4px 10px",
                      borderRadius: "4px",
                      background: `${group.color}10`,
                      color: "var(--text-secondary)",
                      border: `1px solid ${group.color}20`,
                      opacity: 0,
                      transition: "all 0.2s",
                      cursor: "default",
                    }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget as HTMLSpanElement;
                      el.style.background = `${group.color}22`;
                      el.style.color = group.color;
                      el.style.borderColor = `${group.color}40`;
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget as HTMLSpanElement;
                      el.style.background = `${group.color}10`;
                      el.style.color = "var(--text-secondary)";
                      el.style.borderColor = `${group.color}20`;
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
