// src/components/Hero.tsx
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
  const magneticButtonRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout; // Referencia para el Garbage Collector
    let isMounted = true; // Bandera de seguridad para operaciones asíncronas

    import("animejs").then((mod) => {
      if (!isMounted) return;
      const { createTimeline, stagger } = mod;

      const tl = createTimeline({});

      // Mejora UI/UX: Añadimos 'filter' para un efecto de revelación (Blur Reveal) premium
      tl.add(".hero-tag", { opacity: [0, 1], translateY: [16, 0], filter: ['blur(12px)', 'blur(0px)'], duration: 600, ease: "outExpo" })
        .add(".hero-name", { opacity: [0, 1], translateY: [40, 0], filter: ['blur(12px)', 'blur(0px)'], duration: 900, ease: "outExpo" }, "-=300")
        .add(".hero-role-line", { opacity: [0, 1], translateY: [20, 0], duration: 700, ease: "outExpo" }, "-=500")
        .add(".hero-desc", { opacity: [0, 1], translateY: [20, 0], duration: 700, ease: "outExpo" }, "-=400")
        .add(".hero-ctas", { opacity: [0, 1], translateY: [20, 0], duration: 600, ease: "outExpo" }, "-=400")
        .add(".hero-photo", { opacity: [0, 1], scale: [0.92, 1], filter: ['blur(20px)', 'blur(0px)'], duration: 900, ease: "outExpo" }, "-=900")
        .add(".stat-item", { opacity: [0, 1], translateY: [16, 0], delay: stagger(120), duration: 500, ease: "outExpo" }, "-=400");

      let roleIndex = 0;
      let charIndex = 0;
      let isDeleting = false;

      function typeWriter() {
        const el = roleRef.current;
        if (!el || !isMounted) return;

        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
          el.textContent = currentRole.slice(0, charIndex - 1);
          charIndex--;
          if (charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            timeoutId = setTimeout(typeWriter, 400);
            return;
          }
          timeoutId = setTimeout(typeWriter, 50);
        } else {
          el.textContent = currentRole.slice(0, charIndex + 1);
          charIndex++;
          if (charIndex === currentRole.length) {
            isDeleting = true;
            timeoutId = setTimeout(typeWriter, 2000);
            return;
          }
          timeoutId = setTimeout(typeWriter, 80);
        }
      }
      
      timeoutId = setTimeout(typeWriter, 1800);
    });

    // Cleanup function: Destruye el timeout cuando el componente muere
    return () => {
      isMounted = false;
      clearTimeout(timeoutId);
    };
  }, []);

  // Parallax y Botón Magnético delegados al Animation Frame
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    let animationFrameId: number;

    const handleMouseMove = (e: MouseEvent) => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);

      animationFrameId = requestAnimationFrame(() => {
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;

        // 1. Parallax de la foto
        if (photoRef.current) {
          const PARALLAX_DISTANCE = 10;
          const x = (clientX - innerWidth / 2) / innerWidth;
          const y = (clientY - innerHeight / 2) / innerHeight;
          photoRef.current.style.transform = `translate(${x * PARALLAX_DISTANCE}px, ${y * PARALLAX_DISTANCE}px)`;
        }

        // 2. Efecto Magnético del Botón Principal
        if (magneticButtonRef.current) {
          const btn = magneticButtonRef.current;
          const rect = btn.getBoundingClientRect();
          const btnCenterX = rect.left + rect.width / 2;
          const btnCenterY = rect.top + rect.height / 2;
          
          const distanceX = clientX - btnCenterX;
          const distanceY = clientY - btnCenterY;
          const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);

          // Si el cursor está a menos de 100px, atraemos el botón
          if (distance < 100) {
            const pullX = distanceX * 0.2; // Fuerza magnética
            const pullY = distanceY * 0.2;
            btn.style.transform = `translate(${pullX}px, ${pullY}px)`;
          } else {
            btn.style.transform = 'translate(0px, 0px)';
          }
        }
      });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <section id="hero" className={styles.heroSection}>
      <div className={styles.heroContainer}>
        <div>
          <div className={`hero-tag ${styles.heroTag}`}>
            <span className={styles.tagDot} />
            <span>Disponible para colaborar</span>
          </div>

          {/* Mejora UI: tracking-tight para emular diseño editorial moderno */}
          <h1 className={`hero-name ${styles.heroName} tracking-tighter`}>
            Arturo
            <br />
            <span className={styles.nameSecondary}>Yion Jaime</span>
          </h1>

          <div className={`hero-role-line ${styles.heroRoleLine}`}>
            <span className={styles.rolePrompt}>&gt;_</span>
            <span ref={roleRef} className={styles.roleText}>Software Engineer</span>
          </div>

          <p className={`hero-desc ${styles.heroDescription}`}>
            Sistemas robustos bajo principios de <strong>Clean Architecture</strong> y <strong>SOLID</strong>. 
            Especializado en el stack PERN con infraestructura en AWS. 
            Resolviendo problemas desde sus fundamentos técnicos.
          </p>

          <div className={`hero-ctas ${styles.heroCtas}`}>
            <a
              ref={magneticButtonRef}
              href="#proyectos"
              className={styles.ctaPrimary}
              style={{ transition: 'transform 0.1s cubic-bezier(0.25, 1, 0.5, 1)' }}
            >
              Ver proyectos
            </a>
            <a href="https://github.com/ArturoYJ" target="_blank" rel="noopener noreferrer" className={styles.ctaSecondary}>
              GitHub <span>→</span>
            </a>
          </div>

          <div className={`hero-stats ${styles.heroStats}`}>
            {[{ value: "+4", label: "Proyectos" }, { value: "PERN", label: "Stack" }, { value: "AWS", label: "Cloud" }].map((stat) => (
              <div key={stat.label} className={`stat-item ${styles.statItem}`}>
                <div className={styles.statValue}>{stat.value}</div>
                <div className={styles.statLabel}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className={`hero-photo ${styles.heroPhotoContainer}`}>
          <div className={styles.photoRingOuter} />
          <div className={styles.photoRingInner} />
          <div ref={photoRef} className={styles.photoWrapper}>
            <Image 
              src="/foto.jpg" 
              alt="Arturo Yion Jaime" 
              fill 
              sizes="(max-width: 768px) 220px, 320px" 
              style={{ objectFit: "cover", objectPosition: "center top" }} 
              priority 
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQ..."
            />
          </div>
        </div>
      </div>
    </section>
  );
}