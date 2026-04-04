"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import styles from "./Hero.module.css";

const roles = [
  "Full Stack Dev",
  "Software Engineer",
  "Backend Developer",
];

export default function Hero() {
  const roleRef = useRef<HTMLSpanElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    import("animejs").then((mod) => {
      const { createTimeline, stagger } = mod;

      // ── Entrance animation timeline ──
      const tl = createTimeline({});

      tl.add(".hero-tag", { opacity: [0, 1], translateY: [16, 0], duration: 600, ease: "outExpo" })
        .add(".hero-name", { opacity: [0, 1], translateY: [40, 0], duration: 900, ease: "outExpo" }, "-=300")
        .add(".hero-role-line", { opacity: [0, 1], translateY: [20, 0], duration: 700, ease: "outExpo" }, "-=500")
        .add(".hero-desc", { opacity: [0, 1], translateY: [20, 0], duration: 700, ease: "outExpo" }, "-=400")
        .add(".hero-ctas", { opacity: [0, 1], translateY: [20, 0], duration: 600, ease: "outExpo" }, "-=400")
        .add(".hero-photo", { opacity: [0, 1], scale: [0.92, 1], duration: 900, ease: "outExpo" }, "-=900")
        .add(".stat-item", { opacity: [0, 1], translateY: [16, 0], delay: stagger(120), duration: 500, ease: "outExpo" }, "-=400");

      // ── Typewriter role ──
      let roleIndex = 0;
      let charIndex = 0;
      let isDeleting = false;
      const el = roleRef.current;
      if (!el) return;

      function typeWriter() {
        if (!el) return;
        const currentRole = roles[roleIndex];
        if (isDeleting) {
          el.textContent = currentRole.slice(0, charIndex - 1);
          charIndex--;
          if (charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            setTimeout(typeWriter, 400);
            return;
          }
          setTimeout(typeWriter, 50);
        } else {
          el.textContent = currentRole.slice(0, charIndex + 1);
          charIndex++;
          if (charIndex === currentRole.length) {
            isDeleting = true;
            setTimeout(typeWriter, 2000);
            return;
          }
          setTimeout(typeWriter, 80);
        }
      }
      setTimeout(typeWriter, 1800);
    });
  }, []);

  // Parallax effect on photo (respects prefers-reduced-motion)
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !photoRef.current) return;

    const PARALLAX_DISTANCE = 10; // pixels - max movement distance
    let animationFrameId: number;

    const handleMouseMove = (e: MouseEvent) => {
      if (!photoRef.current) return;

      if (animationFrameId) cancelAnimationFrame(animationFrameId);

      animationFrameId = requestAnimationFrame(() => {
        if (!photoRef.current) return;

        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;

        const x = (clientX - innerWidth / 2) / innerWidth;
        const y = (clientY - innerHeight / 2) / innerHeight;

        photoRef.current.style.transform = `translate(${x * PARALLAX_DISTANCE}px, ${y * PARALLAX_DISTANCE}px)`;
      });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <section
      id="hero"
      className={styles.heroSection}
    >
      <div className={styles.heroContainer}>
        {/* Left — Text */}
        <div>
          {/* Status tag */}
          <div className={`hero-tag ${styles.heroTag}`}>
            <span className={styles.tagDot} />
            <span>
              Disponible para colaborar
            </span>
          </div>

          {/* Name */}
          <h1 className={`hero-name ${styles.heroName}`}>
            Arturo
            <br />
            <span className={styles.nameSecondary}>Yion Jaime</span>
          </h1>

          {/* Role typewriter */}
          <div className={`hero-role-line ${styles.heroRoleLine}`}>
            <span className={styles.rolePrompt}>&gt;_</span>
            <span
              ref={roleRef}
              className={styles.roleText}
            >
              Software Engineer
            </span>
          </div>

          {/* Description */}
          <p className={`hero-desc ${styles.heroDescription}`}>
            Sistemas robustos bajo principios de <strong>Clean Architecture</strong> y <strong>SOLID</strong>. 
            Especializado en el stack PERN con infraestructura en AWS. 
            Resolviendo problemas desde sus fundamentos técnicos.
          </p>

          {/* CTAs */}
          <div className={`hero-ctas ${styles.heroCtas}`}>
            <a
              href="#proyectos"
              aria-label="Ir a la sección de proyectos destacados"
              className={styles.ctaPrimary}
            >
              Ver proyectos
            </a>
            <a
              href="https://github.com/ArturoYJ"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visitar perfil de GitHub en una nueva ventana"
              className={styles.ctaSecondary}
            >
              GitHub <span>→</span>
            </a>
          </div>

          {/* Stats */}
          <div className={`hero-stats ${styles.heroStats}`}>
            {[{ value: "+4", label: "Proyectos" }, { value: "PERN", label: "Stack" }, { value: "AWS", label: "Cloud" }].map((stat) => (
              <div key={stat.label} className={`stat-item ${styles.statItem}`}>
                <div className={styles.statValue}>{stat.value}</div>
                <div className={styles.statLabel}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — Photo */}
        <div className={`hero-photo ${styles.heroPhotoContainer}`}>
          <div className={styles.photoRingOuter} />
          <div className={styles.photoRingInner} />
          <div
            ref={photoRef}
            className={styles.photoWrapper}
          >
            <Image 
              src="/foto.jpg" 
              alt="Arturo Yion Jaime — Software Engineer" 
              fill 
              sizes="(max-width: 768px) 220px, 320px" 
              style={{ objectFit: "cover", objectPosition: "center top" }} 
              priority 
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
            />
          </div>
        </div>
      </div>
    </section>
  );
}
