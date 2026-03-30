"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const navLinks = [
  { href: "#proyectos", label: "Proyectos" },
  { href: "#stack", label: "Stack" },
  { href: "#sobre-mi", label: "Sobre mí" },
  { href: "#contacto", label: "Contacto" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: "0 2rem",
        transition: "all 0.4s cubic-bezier(0.4,0,0.2,1)",
        background: scrolled
          ? "rgba(8,8,8,0.85)"
          : "transparent",
        backdropFilter: scrolled ? "blur(20px) saturate(180%)" : "none",
        borderBottom: scrolled
          ? "1px solid var(--border)"
          : "1px solid transparent",
      }}
    >
      <nav
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          height: "64px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo */}
        <Link
          href="#hero"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.9rem",
            fontWeight: 500,
            color: "var(--accent-primary)",
            textDecoration: "none",
            letterSpacing: "0.05em",
          }}
        >
          ayj<span style={{ color: "var(--text-muted)" }}>@dev</span>
        </Link>

        {/* Links */}
        <ul
          style={{
            listStyle: "none",
            display: "flex",
            gap: "2rem",
            alignItems: "center",
          }}
        >
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                style={{
                  color: "var(--text-secondary)",
                  textDecoration: "none",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  letterSpacing: "0.02em",
                  transition: "color 0.2s",
                  position: "relative",
                  paddingBottom: "2px",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color =
                    "var(--text-primary)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color =
                    "var(--text-secondary)";
                }}
              >
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="mailto:yionjaime@gmail.com"
              style={{
                display: "inline-flex",
                alignItems: "center",
                padding: "0.4rem 1rem",
                background: "transparent",
                border: "1px solid var(--accent-primary)",
                borderRadius: "6px",
                color: "var(--accent-primary)",
                fontSize: "0.8rem",
                fontWeight: 500,
                textDecoration: "none",
                fontFamily: "var(--font-mono)",
                letterSpacing: "0.05em",
                transition: "all 0.2s cubic-bezier(0.4,0,0.2,1)",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.background = "var(--accent-primary)";
                el.style.color = "#080808";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.background = "transparent";
                el.style.color = "var(--accent-primary)";
              }}
            >
              Contacto
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
