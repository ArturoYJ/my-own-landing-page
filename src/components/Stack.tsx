"use client";

import styles from "./Stack.module.css";
import { useObserverAnimation } from "@/hooks/useObserverAnimation";

/**
 * ARQUITECTURA DE RECURSOS EXTERNOS
 * Aquí definimos rutas web (URLs). 
 * Ventaja: No ocupan espacio en tu repositorio.
 * Desventaja: Si el sitio externo cae, el logo no se verá.
 */
const stackGroups = [
  {
    category: "Frontend",
    color: "#3b82f6",
    icon: "/icons/screen.svg",
    skills: [
      { name: "React.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
      { name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg" },
      { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg" },
      { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" },
    ],
  },
  {
    category: "Backend",
    color: "#10b981",
    icon: "/icons/backend.svg",
    skills: [
      { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg" },
      { name: "Express", icon: "https://img.icons8.com/nolan/64/express-js.png" },
      { name: "Kotlin", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kotlin/kotlin-original.svg" },
    ],
  },
  {
    category: "Databases",
    color: "#f59e0b",
    icon: "/icons/database.svg",
    skills: [
      { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg" },
      { name: "MySQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg" },
      { name: "Firebase", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-original.svg" },
    ],
  },
  {
    category: "Infrastructure",
    color: "#8b5cf6",
    icon: "/icons/cloud.svg",
    skills: [
      { name: "AWS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg" },
      { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-plain-wordmark.svg" },
      { name: "GitHub Actions", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/githubactions/githubactions-original.svg" },
    ],
  },
  {
    category: "Tools",
    color: "#ec4899",
    icon: "https://img.icons8.com/fluency/48/console.png",
    skills: [
      { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg" },
      { name: "Figma", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg" },
      { name: "Postman", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postman/postman-original.svg" },
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
          Tecnologías integradas mediante recursos distribuidos (CDNs).
        </p>

        <div className={styles.skillsGridWrapper}>
          <div className={styles.skillsGrid}>
            {stackGroups.map((group) => (
              <div key={group.category} className={`stack-col ${styles.stackCol}`}>
                <div className={styles.categoryHeader}>
                  <span className={styles.categoryIcon} style={{ color: group.color }}>
                    {group.icon.startsWith("http") || group.icon.startsWith("/") ? (
                      <img 
                        src={group.icon} 
                        alt={group.category} 
                        style={{ 
                          width: "25px", 
                          height: "25px", 
                          objectFit: "contain",
                          display: "block"
                        }} 
                      />
                    ) : (
                      group.icon
                    )}
                  </span>
                  <span className={styles.categoryTitle}>{group.category}</span>
                </div>

                <div className={styles.skillsList}>
                  {group.skills.map((skill) => (
                    <div
                      key={skill.name}
                      className={`skill-row ${styles.skillRow}`}
                      onMouseEnter={(e) => {
                        const el = e.currentTarget as HTMLDivElement;
                        el.style.background = `${group.color}15`;
                        el.style.borderColor = `${group.color}50`;
                        el.style.transform = "translateX(5px) scale(1.02)";
                      }}
                      onMouseLeave={(e) => {
                        const el = e.currentTarget as HTMLDivElement;
                        el.style.background = "rgba(10, 10, 10, 0.4)";
                        el.style.borderColor = "rgba(148, 142, 157, 0.06)";
                        el.style.transform = "translateX(0) scale(1)";
                      }}
                    >
                      <span className={styles.skillIcon} style={{ color: group.color }}>
                        <img
                          src={skill.icon}
                          alt={`Logo de ${skill.name}`}
                          loading="lazy"
                          decoding="async"
                          referrerPolicy="no-referrer"
                          style={{
                            width: "20px",
                            height: "20px",
                            objectFit: "contain",
                            display: "block",
                          }}
                          // Error handling: si la URL falla, mostramos el nombre
                          onError={(e) => {
                            (e.currentTarget as HTMLImageElement).style.display = "none";
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