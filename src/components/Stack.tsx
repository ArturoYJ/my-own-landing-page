"use client";

import { useObserverAnimation } from "@/hooks/useObserverAnimation";

const stackGroups = [
  {
    category: "Frontend",
    color: "#3b82f6",
    icon: "◈",
    skills: [
      { name: "React.js", icon: "⚛️" },
      { name: "Next.js", icon: "▲" },
      { name: "TypeScript", icon: "TS" },
      { name: "JavaScript", icon: "JS" },
    ],
  },
  {
    category: "Backend",
    color: "#10b981",
    icon: "⬡",
    skills: [
      { name: "Node.js", icon: "⬢" },
      { name: "Express", icon: "EX" },
      { name: "Kotlin", icon: "K" },
    ],
  },
  {
    category: "Databases",
    color: "#f59e0b",
    icon: "◫",
    skills: [
      { name: "PostgreSQL", icon: "🐘" },
      { name: "MySQL", icon: "🐬" },
      { name: "Firebase", icon: "🔥" },
    ],
  },
  {
    category: "Infrastructure",
    color: "#8b5cf6",
    icon: "◎",
    skills: [
      { name: "AWS", icon: "☁️" },
      { name: "Docker", icon: "🐳" },
      { name: "GitHub Actions", icon: "⚡" },
    ],
  },
  {
    category: "Tools",
    color: "#ec4899",
    icon: "◰",
    skills: [
      { name: "Git", icon: "📦" },
      { name: "Figma", icon: "🎨" },
      { name: "Postman", icon: "🚀" },
    ],
  },
];

export default function Stack() {
  const sectionRef = useObserverAnimation({
    selector: ".stack-col",
    duration: 600,
    staggerDelay: 100,
    threshold: 0.2,
  });

  return (
    <section
      id="stack"
      ref={sectionRef}
      style={{
        padding: "8rem 2rem",
        background: "transparent", // Unified starry background
        position: "relative",
        zIndex: 2,
        borderTop: "1px solid var(--bg-card)",
        borderBottom: "1px solid var(--bg-card)",
        minHeight: "40vh",
        display: "flex",
        alignItems: "center",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto", width: "100%" }}>

        <h2
          style={{
            display: "flex",
            alignItems: "center",
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2rem, 4vw, 3rem)",
            fontWeight: 700,
            letterSpacing: "-0.03em",
            marginBottom: "0.75rem",
            lineHeight: 1.1,
            color: "var(--accent-primary)",
          }}
        >
          <span className="accent-line" style={{ width: "40px" }} />
          Stack Técnico
        </h2>
        <p
          style={{
            color: "var(--text-secondary)",
            fontSize: "1rem",
            marginBottom: "4rem",
            maxWidth: "600px",
          }}
        >
          Un vistazo estructurado a las tecnologías que utilizo en mi día a día para crear soluciones completas.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "2rem",
          }}
        >
          {stackGroups.map((group) => (
            <div
              key={group.category}
              className="stack-col"
              style={{
                opacity: 0,
                display: "flex",
                flexDirection: "column",
                gap: "1.25rem",
              }}
            >
              {/* Column Header */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  paddingBottom: "0.5rem",
                  borderBottom: `2px solid var(--border)`,
                  marginBottom: "0.5rem",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "1.2rem",
                    color: group.color,
                  }}
                >
                  {group.icon}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.85rem",
                    color: "var(--text-primary)",
                    letterSpacing: "0.05em",
                    textTransform: "uppercase",
                    fontWeight: 600,
                  }}
                >
                  {group.category}
                </span>
              </div>

              {/* Skills Rows */}
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {group.skills.map((skill) => (
                  <div
                    key={skill.name}
                    className="skill-row"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.75rem",
                      padding: "0.6rem 0.8rem",
                      background: "var(--bg-card)",
                      border: "1px solid var(--border)",
                      borderRadius: "0px", // Rectangular logic
                      opacity: 0,
                      transition: "all 0.3s ease",
                      cursor: "default",
                    }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget as HTMLDivElement;
                      el.style.background = `${group.color}15`;
                      el.style.borderColor = `${group.color}50`;
                      el.style.transform = "translateX(5px)";
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget as HTMLDivElement;
                      el.style.background = "var(--bg-card)";
                      el.style.borderColor = "var(--border)";
                      el.style.transform = "translateX(0)";
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "28px",
                        height: "28px",
                        background: `${group.color}20`,
                        border: `1px solid ${group.color}40`,
                        borderRadius: "0px", // Rectangular logic
                        color: group.color,
                        fontSize: "0.9rem",
                        fontFamily: "var(--font-mono)",
                        fontWeight: 600,
                        flexShrink: 0,
                      }}
                    >
                      {skill.icon}
                    </div>
                    <span
                      style={{
                        fontFamily: "var(--font-sans)",
                        fontSize: "0.9rem",
                        fontWeight: 500,
                        color: "var(--text-primary)",
                      }}
                    >
                      {skill.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
