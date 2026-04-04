"use client";

import { useObserverAnimation } from "@/hooks/useObserverAnimation";
import styles from "./About.module.css";

export default function About() {
  const sectionRef = useObserverAnimation({
    selector: ".about-col",
    animations: { opacity: [0, 1], translateX: [-30, 0] },
    duration: 800,
    staggerDelay: 200,
    threshold: 0.15,
  });

  return (
    <section
      id="sobre-mi"
      ref={sectionRef}
      className={styles.aboutSection}
    >
      <div className={styles.container}>
        {/* Left */}
        <div className={`about-col ${styles.aboutCol}`}>
          <div className="section-label">
            <span className="accent-line" />
            Sobre mí
          </div>

          <h2 className={styles.sectionTitle}>
            Construyo con{" "}
            <span className={styles.accent}>propósito</span>
            ,<br />
            no con templates.
          </h2>

          <p className={styles.bioParagraph}>
            Soy Ingeniero de Software en formación, especializado en el
            desarrollo de aplicaciones robustas bajo principios de{" "}
            <strong>
              Clean Architecture
            </strong>{" "}
            y <strong>SOLID</strong>.
          </p>
          <p className={styles.bioParagraph}>
            Tengo experiencia diseñando sistemas escalables con el stack PERN y
            despliegue en infraestructuras Cloud como AWS y herramientas como Docker, priorizando el desacoplamiento
            de la lógica de negocio y la eficiencia en el acceso a datos.
          </p>
          <p className={styles.bioParagraph}>
            Me apasiona resolver problemas desde sus{" "}
            <strong>
              fundamentos teóricos
            </strong>
            , no solo desde la superficie y proponer soluciones eficientes.
          </p>
        </div>

        {/* Right */}
        <div className={`about-col ${styles.aboutCol} ${styles.rightColumn}`}>
          {/* Education card */}
          <div className={styles.educationCard}>
            <div className={`section-label ${styles.cardLabel}`}>
              <span className="accent-line" />
              Formación
            </div>
            <p className={styles.universityName}>
              Universidad Politécnica de Chiapas
            </p>
            <p className={styles.degreeName}>
              Ingeniería en Tecnologías de la Información e Innovación Digital
            </p>
            <p className={styles.period}>
              Ago. 2024 – Dic. 2027
            </p>
            <div className={styles.areasList}>
              {[
                "Arquitectura de Software",
                "Desarrollo Web",
                "APIs RESTful",
                "BD Relacionales",
              ].map((area) => (
                <span key={area} className={styles.areaTag}>
                  {area}
                </span>
              ))}
            </div>
          </div>

          {/* Info cards row */}
          <div className={styles.infoCardsRow}>
            {/* Location */}
            <div className={styles.infoCard}>
              <p className={styles.infoCardLabel}>
                Ubicación
              </p>
              <p className={styles.locationPrimary}>
                Tuxtla Gutiérrez
              </p>
              <p className={styles.locationSecondary}>
                Chiapas, México
              </p>
            </div>

            {/* Languages */}
            <div className={styles.infoCard}>
              <p className={styles.languagesLabel}>
                Idiomas
              </p>
              <p className={styles.languageItem}>
                Español Nativo
              </p>
              <p className={styles.languageItem}>
                Inglés{" "}
                <span className={styles.languageLevel}>
                  B1 Intermedio
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
