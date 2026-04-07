"use client";

import Image from "next/image";
import Link from "next/link";
import { useObserverAnimation } from "@/hooks/useObserverAnimation";
import { projects } from "@/data/projects";
import styles from "./Projects.module.css";


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
      className={styles.projectsSection}
    >
      {/* Section header */}
      <div className={styles.sectionHeader}>
        <div className={`section-label ${styles.sectionLabel}`}>
          <span className="accent-line" />
          Proyectos Destacados
        </div>
        <h2 className={styles.sectionTitle}>
          Lo que he construido
        </h2>
        <p className={styles.sectionDescription}>
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
    <div className={`project-row ${styles.projectRow}`}>
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
        className={`${styles.projectContainer} ${
          isEven ? styles.projectContainerEven : styles.projectContainerOdd
        }`}
        style={{ width: "100%" }}
      >
        {/* Image — links to detail page */}
        <Link
          href={`/proyectos/${project.id}`}
          aria-label={`Ver detalles del proyecto ${project.title}`}
          className={`${styles.imageContainer} ${
            isEven ? styles.imageContainerEven : styles.imageContainerOdd
          }`}
          style={{
            borderColor: `${project.accent}20`,
            borderRadius: "12px",
            transition: "all 0.35s cubic-bezier(0.4,0,0.2,1)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Main Image */}
          <div style={{ position: "relative", width: "100%", height: "100%" }}>
            <Image
              src={project.image}
              alt={`Captura del proyecto ${project.title}`}
              fill
              sizes="(max-width: 900px) 100vw, 90vw"
              loading="lazy"
              style={{ 
                objectFit: project.fit || "cover",
                backgroundColor: project.bgColor || "transparent",
              }}
            />
          </div>
          {/* "Ver detalle" label */}
          <div
            className={styles.detailLabel}
            style={{ background: project.accent }}
          >
            Ver detalle →
          </div>
        </Link>

        {/* Text content */}
        <div
          className={`${styles.textContent} ${
            isEven ? styles.textContentEven : styles.textContentOdd
          }`}
        >
          {/* Year */}
          <div className={styles.projectYear}>{project.year}</div>

          {/* Title */}
          <h3 className={styles.projectTitle}>{project.title}</h3>

          {/* Subtitle */}
          <p className={styles.projectSubtitle} style={{ color: project.accent }}>
            {project.subtitle}
          </p>

          {/* Short description */}
          <p className={styles.projectDescription}>{project.shortDesc}</p>

          {/* Tags */}
          <div className={styles.tagsList}>
            {project.tags.map((tag) => (
              <span
                key={tag}
                className={styles.tag}
                style={{
                  background: `${project.accent}10`,
                  color: project.accent,
                  borderColor: `${project.accent}25`,
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
              marginTop: "1.75rem",
            }}
          >
            Ver detalle completo <span style={{ transition: "all 0.2s" }}>→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
