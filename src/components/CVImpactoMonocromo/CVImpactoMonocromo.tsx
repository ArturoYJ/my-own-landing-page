"use client";

import type { CVImpactoMonocromoProps, TechSkill, CommitBar } from "./types";
import { TOKENS } from "./types";
import { useCVImpactoMonocromo } from "./useCVImpactoMonocromo";

// ─── Sub-components (Presentational, no state) ────────────────────────────────

function NavBar({
  items,
  scrolled,
}: {
  items: Array<{ label: string; href: string }>;
  scrolled: boolean;
}) {
  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: `${TOKENS.spacing.md} ${TOKENS.spacing["2xl"]}`,
        background: scrolled
          ? `${TOKENS.color.surfaceVariant}99` // 60% opacity
          : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
        transition: "background 0.3s ease, backdrop-filter 0.3s ease",
        borderBottom: scrolled
          ? `1px solid ${TOKENS.color.outlineVariant}26` // 15% opacity ghost border
          : "none",
      }}
    >
      {/* Logotype */}
      <span
        style={{
          fontFamily: TOKENS.font.label,
          fontSize: "0.75rem",
          fontWeight: 700,
          letterSpacing: "0.15em",
          color: TOKENS.color.primary,
          textTransform: "uppercase",
        }}
      >
        ayj<span style={{ color: TOKENS.color.onSurfaceVariant }}>@dev</span>
      </span>

      {/* Nav links */}
      <ul
        style={{
          display: "flex",
          gap: TOKENS.spacing["2xl"],
          listStyle: "none",
          margin: 0,
          padding: 0,
        }}
      >
        {items.map((item) => (
          <li key={item.label}>
            <a
              href={item.href}
              style={{
                fontFamily: TOKENS.font.label,
                fontSize: "0.7rem",
                fontWeight: 500,
                letterSpacing: "0.12em",
                color: TOKENS.color.onSurfaceVariant,
                textDecoration: "none",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLAnchorElement).style.color =
                  TOKENS.color.primary)
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLAnchorElement).style.color =
                  TOKENS.color.onSurfaceVariant)
              }
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function HeroSection({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
}) {
  return (
    <section
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        padding: `0 ${TOKENS.spacing["2xl"]}`,
        background: TOKENS.color.surface,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Geometric background grid (outline_variant at 6%) */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(${TOKENS.color.outlineVariant}0f 1px, transparent 1px),
            linear-gradient(90deg, ${TOKENS.color.outlineVariant}0f 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
          pointerEvents: "none",
        }}
      />

      {/* Accent glow — "digital pulse" */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "30%",
          right: "-10%",
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          background: `radial-gradient(circle, ${TOKENS.color.primaryContainer}0d 0%, transparent 70%)`,
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: "1100px", margin: "0 auto", width: "100%", position: "relative" }}>
        {/* Eyebrow kicker — all-caps label */}
        <p
          style={{
            fontFamily: TOKENS.font.label,
            fontSize: "0.7rem",
            fontWeight: 500,
            letterSpacing: "0.2em",
            color: TOKENS.color.primaryContainer,
            textTransform: "uppercase",
            marginBottom: TOKENS.spacing.lg,
          }}
        >
          {eyebrow}
        </p>

        {/* Display headline — aggressive leading -2% tracking */}
        <h1
          style={{
            fontFamily: TOKENS.font.display,
            fontSize: "clamp(2.5rem, 7vw, 5.5rem)",
            fontWeight: 700,
            letterSpacing: "-0.02em",
            lineHeight: 1.05,
            color: TOKENS.color.onSurface,
            marginBottom: TOKENS.spacing.xl,
            maxWidth: "800px",
          }}
        >
          {title}
        </h1>

        {/* Subtitle — body in onSurfaceVariant (no pure white) */}
        <p
          style={{
            fontFamily: TOKENS.font.body,
            fontSize: "1rem",
            lineHeight: 1.75,
            color: TOKENS.color.onSurfaceVariant,
            maxWidth: "560px",
            marginBottom: TOKENS.spacing["3xl"],
          }}
        >
          {subtitle}
        </p>

        {/* Primary CTA — gradient from primary → primaryContainer at 135° */}
        <a
          href="#projects"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: TOKENS.spacing.sm,
            padding: `${TOKENS.spacing.md} ${TOKENS.spacing["2xl"]}`,
            background: `linear-gradient(135deg, ${TOKENS.color.primary}, ${TOKENS.color.primaryContainer})`,
            color: TOKENS.color.onPrimaryFixed,
            fontFamily: TOKENS.font.label,
            fontSize: "0.8rem",
            fontWeight: 700,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            textDecoration: "none",
            borderRadius: TOKENS.radius.sm,
            transition: "opacity 0.2s, transform 0.2s",
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLAnchorElement;
            el.style.opacity = "0.9";
            el.style.transform = "translateY(-2px)";
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLAnchorElement;
            el.style.opacity = "1";
            el.style.transform = "translateY(0)";
          }}
        >
          Ver proyectos →
        </a>
      </div>
    </section>
  );
}

function PersonaSection({ heading, body }: { heading: string; body: string }) {
  return (
    <section
      id="persona"
      style={{
        background: TOKENS.color.surfaceContainerLow, // surface shift, no border
        padding: `${TOKENS.spacing["3xl"]} ${TOKENS.spacing["2xl"]}`,
      }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        {/* Kicker */}
        <p
          style={{
            fontFamily: TOKENS.font.label,
            fontSize: "0.68rem",
            fontWeight: 500,
            letterSpacing: "0.18em",
            color: TOKENS.color.outlineVariant,
            textTransform: "uppercase",
            marginBottom: TOKENS.spacing.md,
          }}
        >
          SOBRE MÍ
        </p>
        <h2
          style={{
            fontFamily: TOKENS.font.display,
            fontSize: "clamp(1.6rem, 3.5vw, 2.8rem)",
            fontWeight: 700,
            letterSpacing: "-0.02em",
            color: TOKENS.color.onSurface,
            marginBottom: TOKENS.spacing.lg,
            lineHeight: 1.1,
          }}
        >
          {heading}
        </h2>
        <p
          style={{
            fontFamily: TOKENS.font.body,
            fontSize: "0.95rem",
            lineHeight: 1.8,
            color: TOKENS.color.onSurfaceVariant,
            maxWidth: "640px",
          }}
        >
          {body}
        </p>
      </div>
    </section>
  );
}

function FeaturedSystemSection({
  label,
  title,
  description,
}: {
  label: string;
  title: string;
  description: string;
}) {
  return (
    <section
      style={{
        background: TOKENS.color.surfaceContainerLowest, // "engraved" inlay
        padding: `${TOKENS.spacing["3xl"]} ${TOKENS.spacing["2xl"]}`,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Geometric polyline accent */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          right: 0,
          top: "50%",
          transform: "translateY(-50%)",
          width: "400px",
          height: "400px",
          border: `1px solid ${TOKENS.color.outlineVariant}0d`,
          borderRadius: "50%",
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: "1100px", margin: "0 auto", position: "relative" }}>
        <p
          style={{
            fontFamily: TOKENS.font.label,
            fontSize: "0.68rem",
            fontWeight: 500,
            letterSpacing: "0.18em",
            color: TOKENS.color.primaryContainer,
            textTransform: "uppercase",
            marginBottom: TOKENS.spacing.md,
          }}
        >
          {label}
        </p>
        <h2
          style={{
            fontFamily: TOKENS.font.display,
            fontSize: "clamp(1.8rem, 4vw, 3rem)",
            fontWeight: 700,
            letterSpacing: "-0.03em",
            color: TOKENS.color.onSurface,
            marginBottom: TOKENS.spacing.lg,
            lineHeight: 1.05,
          }}
        >
          {title}
        </h2>
        <p
          style={{
            fontFamily: TOKENS.font.body,
            fontSize: "0.95rem",
            lineHeight: 1.8,
            color: TOKENS.color.onSurfaceVariant,
            maxWidth: "560px",
          }}
        >
          {description}
        </p>
      </div>
    </section>
  );
}

function TechSkillCard({ skill }: { skill: TechSkill }) {
  return (
    <div
      style={{
        background: TOKENS.color.surfaceContainerLow,
        borderRadius: TOKENS.radius.md,
        padding: TOKENS.spacing.lg,
        transition: "background 0.25s ease",
        cursor: "default",
      }}
      onMouseEnter={(e) =>
        ((e.currentTarget as HTMLDivElement).style.background =
          TOKENS.color.surfaceContainerHigh)
      }
      onMouseLeave={(e) =>
        ((e.currentTarget as HTMLDivElement).style.background =
          TOKENS.color.surfaceContainerLow)
      }
    >
      {/* Icon */}
      <div
        style={{
          fontFamily: TOKENS.font.label,
          fontSize: "1.2rem",
          color: TOKENS.color.primaryContainer,
          marginBottom: TOKENS.spacing.md,
        }}
      >
        {skill.icon}
      </div>

      {/* Name — label-md kicker becomes accent on hover handled via CSS class */}
      <p
        style={{
          fontFamily: TOKENS.font.label,
          fontSize: "0.75rem",
          fontWeight: 700,
          letterSpacing: "0.1em",
          color: TOKENS.color.onSurface,
          textTransform: "uppercase",
          marginBottom: TOKENS.spacing.sm,
        }}
      >
        {skill.name}
      </p>

      {/* Description */}
      <p
        style={{
          fontFamily: TOKENS.font.body,
          fontSize: "0.82rem",
          lineHeight: 1.65,
          color: TOKENS.color.onSurfaceVariant,
        }}
      >
        {skill.description}
      </p>
    </div>
  );
}

function TechStackSection({ skills }: { skills: TechSkill[] }) {
  return (
    <section
      id="stack"
      style={{
        background: TOKENS.color.surface,
        padding: `${TOKENS.spacing["3xl"]} ${TOKENS.spacing["2xl"]}`,
      }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <p
          style={{
            fontFamily: TOKENS.font.label,
            fontSize: "0.68rem",
            fontWeight: 500,
            letterSpacing: "0.18em",
            color: TOKENS.color.outlineVariant,
            textTransform: "uppercase",
            marginBottom: TOKENS.spacing.md,
          }}
        >
          SYSTEM DEPENDENCIES
        </p>
        <h2
          style={{
            fontFamily: TOKENS.font.display,
            fontSize: "clamp(1.6rem, 3vw, 2.4rem)",
            fontWeight: 700,
            letterSpacing: "-0.02em",
            color: TOKENS.color.onSurface,
            marginBottom: TOKENS.spacing["2xl"],
            lineHeight: 1.1,
          }}
        >
          Stack Técnico
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gap: TOKENS.spacing.md,
          }}
        >
          {skills.map((skill) => (
            <TechSkillCard key={skill.name} skill={skill} />
          ))}
        </div>
      </div>
    </section>
  );
}

function CommitBar({ bar }: { bar: CommitBar }) {
  // Static fallback — the canvas renders the animated version
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: TOKENS.spacing.xs,
      }}
    >
      <div
        style={{
          width: "32px",
          height: `${bar.value}%`,
          background: bar.highlight
            ? `linear-gradient(to top, ${TOKENS.color.primaryContainer}, ${TOKENS.color.primary})`
            : TOKENS.color.surfaceBright,
          borderRadius: `${TOKENS.radius.sm} ${TOKENS.radius.sm} 0 0`,
        }}
      />
      <span
        style={{
          fontFamily: TOKENS.font.label,
          fontSize: "0.6rem",
          color: TOKENS.color.onSurfaceVariant,
          letterSpacing: "0.08em",
        }}
      >
        {bar.day}
      </span>
    </div>
  );
}

function CommitSection({
  label,
  description,
  bars,
  canvasRef,
}: {
  label: string;
  description: string;
  bars: CommitBar[];
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
}) {
  return (
    <section
      style={{
        background: TOKENS.color.surfaceContainerLow,
        padding: `${TOKENS.spacing["3xl"]} ${TOKENS.spacing["2xl"]}`,
      }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <p
          style={{
            fontFamily: TOKENS.font.label,
            fontSize: "0.68rem",
            fontWeight: 500,
            letterSpacing: "0.18em",
            color: TOKENS.color.primaryContainer,
            textTransform: "uppercase",
            marginBottom: TOKENS.spacing.md,
          }}
        >
          {label}
        </p>
        <p
          style={{
            fontFamily: TOKENS.font.body,
            fontSize: "0.88rem",
            color: TOKENS.color.onSurfaceVariant,
            marginBottom: TOKENS.spacing.xl,
            maxWidth: "520px",
            lineHeight: 1.7,
          }}
        >
          {description}
        </p>

        {/* Canvas — animated version (JS) */}
        <canvas
          ref={canvasRef}
          aria-label="Frecuencia de commits por día de la semana"
          style={{
            width: "100%",
            height: "140px",
            display: "block",
          }}
        />

        {/* Noscript / Accessible fallback — static bars */}
        <noscript>
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              gap: TOKENS.spacing.md,
              height: "120px",
            }}
          >
            {bars.map((bar) => (
              <CommitBar key={bar.day} bar={bar} />
            ))}
          </div>
        </noscript>
      </div>
    </section>
  );
}

function FooterSection({
  links,
}: {
  links: Array<{ label: string; href: string }>;
}) {
  return (
    <footer
      id="contact"
      style={{
        background: TOKENS.color.surfaceContainerLowest,
        padding: `${TOKENS.spacing["3xl"]} ${TOKENS.spacing["2xl"]}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: TOKENS.spacing.lg,
      }}
    >
      <span
        style={{
          fontFamily: TOKENS.font.label,
          fontSize: "0.7rem",
          color: TOKENS.color.outlineVariant,
          letterSpacing: "0.1em",
        }}
      >
        © 2026 ARTURO YION JAIME
      </span>

      <div style={{ display: "flex", gap: TOKENS.spacing["2xl"] }}>
        {links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: TOKENS.font.label,
              fontSize: "0.68rem",
              fontWeight: 600,
              letterSpacing: "0.15em",
              color: TOKENS.color.onSurfaceVariant,
              textDecoration: "none",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLAnchorElement).style.color =
                TOKENS.color.primaryContainer)
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLAnchorElement).style.color =
                TOKENS.color.onSurfaceVariant)
            }
          >
            {link.label}
          </a>
        ))}
      </div>
    </footer>
  );
}

// ─── Root Presentational Component ───────────────────────────────────────────

export default function CVImpactoMonocromo({
  initialData,
}: CVImpactoMonocromoProps) {
  const { data, isNavScrolled, canvasRef } =
    useCVImpactoMonocromo(initialData);

  return (
    <div
      style={{
        background: TOKENS.color.surface,
        color: TOKENS.color.onSurface,
        fontFamily: TOKENS.font.body,
        minHeight: "100vh",
      }}
    >
      <NavBar items={data.nav} scrolled={isNavScrolled} />

      <HeroSection
        eyebrow={data.hero.eyebrow}
        title={data.hero.title}
        subtitle={data.hero.subtitle}
      />

      <PersonaSection
        heading={data.persona.heading}
        body={data.persona.body}
      />

      <FeaturedSystemSection
        label={data.featuredSystem.label}
        title={data.featuredSystem.title}
        description={data.featuredSystem.description}
      />

      <TechStackSection skills={data.techStack} />

      <CommitSection
        label={data.commitSection.label}
        description={data.commitSection.description}
        bars={data.commitSection.bars}
        canvasRef={canvasRef}
      />

      <FooterSection links={data.footer.links} />
    </div>
  );
}
