"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "#proyectos", label: "Proyectos" },
  { href: "#stack", label: "Stack" },
  { href: "#sobre-mi", label: "Sobre mí" },
  { href: "#contacto", label: "Contacto" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isSubpage = pathname !== "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      style={{
        position: "fixed",
        top: "0",
        left: "0",
        right: "0",
        zIndex: 100,
        padding: "0 2rem",
        transition: "all 0.4s cubic-bezier(0.4,0,0.2,1)",
        background: scrolled
          ? "rgba(10,10,10,0.95)"
          : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled
          ? "1px solid rgba(255,255,255,0.1)"
          : "1px solid transparent",
        boxShadow: scrolled ? "0 4px 30px rgba(0,0,0,0.3)" : "none",
      }}
    >
      <nav
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          height: scrolled ? "60px" : "80px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          transition: "height 0.4s ease",
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.95rem",
            fontWeight: 700,
            color: "var(--text-primary)",
            textDecoration: "none",
            letterSpacing: "0.05em",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          <span style={{ 
            width: "8px", 
            height: "8px", 
            background: "var(--accent-primary)",
            borderRadius: 0,
          }} />
          <span style={{ display: "flex", alignItems: "baseline" }}>
            ayj<span style={{ color: "var(--accent-primary)" }}>.</span>
          </span>
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
          {navLinks.map((link) => {
            const resolvedHref = isSubpage ? `/${link.href}` : link.href;
            return (
              <li key={link.href}>
                <a
                  href={resolvedHref}
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
            );
          })}
          <li>
            <a
              href="mailto:yionjaime@gmail.com"
              style={{
                display: "inline-flex",
                alignItems: "center",
                padding: "0.5rem 1.25rem",
                background: "transparent",
                border: "1px solid var(--accent-primary)",
                borderRadius: "0px",
                color: "var(--accent-primary)",
                fontSize: "0.75rem",
                fontWeight: 600,
                textDecoration: "none",
                fontFamily: "var(--font-mono)",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                transition: "all 0.3s cubic-bezier(0.4,0,0.2,1)",
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
              Email
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}