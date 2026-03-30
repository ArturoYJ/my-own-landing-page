"use client";

import { useEffect, useRef, useState } from "react";
import type {
  CVImpactoMonocromoData,
  UseCVImpactoMonocromoReturn,
} from "./types";
import { TOKENS } from "./types";

// ─── Static CV Data (replace with API call / RSC props when available) ───────

const DEFAULT_DATA: CVImpactoMonocromoData = {
  nav: [
    { label: "PROYECTOS", href: "#projects" },
    { label: "STACK", href: "#stack" },
    { label: "CONTACTO", href: "#contact" },
  ],
  hero: {
    eyebrow: "ARQUITECTO > SISTEMA_01",
    title: "CONSTRUYENDO ARQUITECTURAS ESCALABLES",
    subtitle:
      "Ingeniería de sistemas en la intersección del rendimiento y la modularidad. Desarrollando la próxima generación de infraestructura digital resiliente.",
  },
  persona: {
    heading: "Arturo Yion Jaime",
    body: "Ingeniero Full Stack especializado en sistemas de alta concurrencia y arquitecturas limpias. Transformo lógica de negocio compleja en ecosistemas modulares y elegantes usando una metodología data-first bajo principios SOLID y Clean Architecture.",
  },
  featuredSystem: {
    label: "SISTEMA DESTACADO",
    title: "GlamStock — Motor SOA",
    description:
      "Procesador de inventario en tiempo real con migración de monolito a SOA. Validación Zod que redujo errores de integración en 70%. BD PostgreSQL normalizada para +1,500 registros.",
  },
  techStack: [
    {
      name: "TypeScript",
      description: "Arquitecturas React empresariales y APIs con tipado estricto.",
      icon: "{ }",
    },
    {
      name: "Node.js / Express",
      description: "Microservicios y procesamiento concurrente de alto rendimiento.",
      icon: "⬡",
    },
    {
      name: "Kotlin / Ktor",
      description: "Programación de sistemas type-safe con arquitectura hexagonal.",
      icon: "◈",
    },
    {
      name: "PostgreSQL",
      description: "Modelado relacional optimizado con Zod para validación de esquemas.",
      icon: "◫",
    },
    {
      name: "AWS / Docker",
      description: "Orquestando entornos containerizados con GitHub Actions CI/CD.",
      icon: "◎",
    },
  ],
  commitSection: {
    label: "COMMIT_FREQUENCY",
    description:
      "Representación visual de la velocidad de desarrollo en repositorios principales durante el último ciclo.",
    bars: [
      { day: "LUN", value: 60, highlight: false },
      { day: "MAR", value: 85, highlight: false },
      { day: "MIÉ", value: 40, highlight: false },
      { day: "JUE", value: 100, highlight: true },
      { day: "VIE", value: 75, highlight: false },
      { day: "SÁB", value: 30, highlight: false },
      { day: "DOM", value: 55, highlight: false },
    ],
  },
  footer: {
    links: [
      { label: "GITHUB", href: "https://github.com/ArturoYJ" },
      { label: "LINKEDIN", href: "https://linkedin.com/in/arturo-yion" },
      { label: "EMAIL", href: "mailto:yionjaime@gmail.com" },
    ],
  },
};

// ─── Commit Bar Canvas Renderer ───────────────────────────────────────────────

function drawCommitBars(
  canvas: HTMLCanvasElement,
  bars: CVImpactoMonocromoData["commitSection"]["bars"],
  progress: number // 0 → 1
): void {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
  ctx.scale(dpr, dpr);

  const W = rect.width;
  const H = rect.height;
  const barAreaH = H * 0.8;
  const gap = W * 0.03;
  const barW = (W - gap * (bars.length - 1)) / bars.length;

  ctx.clearRect(0, 0, W, H);

  bars.forEach((bar, i) => {
    const x = i * (barW + gap);
    const barH = (bar.value / 100) * barAreaH * progress;
    const y = barAreaH - barH;

    // Background track
    ctx.fillStyle = TOKENS.color.surfaceContainerHigh;
    ctx.fillRect(x, 0, barW, barAreaH);

    // Animated bar fill
    const gradient = ctx.createLinearGradient(0, barAreaH, 0, y);
    if (bar.highlight) {
      gradient.addColorStop(0, TOKENS.color.primaryContainer);
      gradient.addColorStop(1, TOKENS.color.primary);
    } else {
      gradient.addColorStop(0, TOKENS.color.surfaceBright);
      gradient.addColorStop(1, TOKENS.color.onSurfaceVariant);
    }
    ctx.fillStyle = gradient;
    ctx.fillRect(x, y, barW, barH);

    // Day label
    ctx.fillStyle = TOKENS.color.onSurfaceVariant;
    ctx.font = `500 10px ${TOKENS.font.label}`;
    ctx.textAlign = "center";
    ctx.fillText(bar.day, x + barW / 2, H);
  });
}

// ─── Custom Hook ──────────────────────────────────────────────────────────────

export function useCVImpactoMonocromo(
  initialData?: Partial<CVImpactoMonocromoData>
): UseCVImpactoMonocromoReturn {
  const data: CVImpactoMonocromoData = { ...DEFAULT_DATA, ...initialData };
  const [isNavScrolled, setIsNavScrolled] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);

  // ── Nav scroll detection ──
  useEffect(() => {
    const handleScroll = () => setIsNavScrolled(window.scrollY > 32);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ── Commit bars canvas: IntersectionObserver + rAF animation ──
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let startTime: number | null = null;
    const DURATION = 1200; // ms

    function animate(timestamp: number) {
      if (!canvas) return;
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / DURATION, 1);

      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      drawCommitBars(canvas, data.commitSection.bars, eased);

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      }
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          startTime = null;
          rafRef.current = requestAnimationFrame(animate);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(canvas);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { data, isNavScrolled, canvasRef };
}
