// src/components/Stack.tsx
"use client";

import Image from "next/image";
import styles from "./Stack.module.css";
import { useObserverAnimation } from "@/hooks/useObserverAnimation";

/**
 * ARQUITECTURA DE RECURSOS LOCALES
 * Almacena estos SVGs en tu carpeta public/icons/
 * Esto elimina la latencia de DNS y bloqueos de red de terceros.
 */
const stackGroups = [
  {
    category: "Frontend",
    color: "#3b82f6",
    icon: "/icons/frontend.svg",
    skills: [
      { name: "React.js", icon: "/icons/react.svg" },
      { name: "Next.js", icon: "/icons/next.png" },
      { name: "TypeScript", icon: "/icons/typeScript.svg" },
      { name: "JavaScript", icon: "/icons/javaScript.svg" },
    ],
  },
  {
    category: "Backend",
    color: "#10b981",
    icon: "/icons/backend.png",
    skills: [
      { name: "Node.js", icon: "/icons/node.svg" },
      { name: "Express", icon: "/icons/express.png" },
      { name: "Kotlin", icon: "/icons/kotlin.svg" },
    ],
  },
  {
    category: "Databases",
    color: "#f59e0b",
    icon: "/icons/db.svg",
    skills: [
      { name: "PostgreSQL", icon: "/icons/postgresSQL.svg" },
      { name: "MySQL", icon: "/icons/mySQL.svg" },
      { name: "Firebase", icon: "/icons/fireBase.svg" },
    ],
  },
  {
    category: "Infrastructure",
    color: "#8b5cf6",
    icon: "/icons/cloud.svg",
    skills: [
      { name: "AWS", icon: "/icons/aws.svg" },
      { name: "Docker", icon: "/icons/docker.svg" },
      { name: "GitHub Actions", icon: "/icons/gitHubActions.svg" },
    ],
  },
  {
    category: "Tools",
    color: "#ec4899",
    icon: "/icons/terminal.png",
    skills: [
      { name: "Git", icon: "/icons/git.svg" },
      { name: "Figma", icon: "/icons/figma.svg" },
      { name: "Postman", icon: "/icons/postman.svg" },
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
    <section id="stack" ref={sectionRef} className={styles.stackSection}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>
          <span className="accent-line" style={{ width: "40px" }} />
          Stack Técnico
        </h2>
        <p className={styles.sectionDescription}>
          Infraestructura nativa y optimizada para el hilo del compositor.
        </p>

        <div className={styles.skillsGridWrapper}>
          <div className={styles.skillsGrid}>
            {stackGroups.map((group) => (
              <div key={group.category} className={`stack-col ${styles.stackCol}`}>
                <div className={styles.categoryHeader}>
                  <span className={styles.categoryIcon} style={{ color: group.color }}>
                    <Image
                      src={group.icon}
                      alt={group.category}
                      width={25}
                      height={25}
                      style={{
                        width: "25px",
                        height: "25px",
                        objectFit: "contain",
                        display: "block",
                      }}
                    />
                  </span>
                  <span className={styles.categoryTitle}>{group.category}</span>
                </div>

                <div className={styles.skillsList}>
                  {group.skills.map((skill) => (
                    <div
                      key={skill.name}
                      // Pasamos el color como una variable CSS inline para que el CSS Modules lo use en el :hover
                      style={{ '--group-color': group.color } as React.CSSProperties}
                      className={`skill-row ${styles.skillRow}`}
                    >
                      <span className={styles.skillIcon}>
                        <Image
                          src={skill.icon}
                          alt={`Logo de ${skill.name}`}
                          width={20}
                          height={20}
                          loading="lazy"
                          style={{
                            width: "20px",
                            height: "20px",
                            objectFit: "contain",
                            display: "block",
                          }}
                        />
                      </span>
                      <span className={styles.skillName}>{skill.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}