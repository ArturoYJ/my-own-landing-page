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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const pathname = usePathname();
  const isSubpage = pathname !== "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Smooth scroll indicator: detect which section is in viewport
  useEffect(() => {
    const observerOptions = {
      threshold: [0.05, 0.1, 0.2], // Multiple thresholds for better sensitivity
      rootMargin: "-15% 0px -45% 0px", // Detect section in the upper-middle window of the screen
    };

    const observer = new IntersectionObserver((entries) => {
      // Only update state for the section with highest intersection ratio
      const isIntersecting = entries.filter((e) => e.isIntersecting);
      if (isIntersecting.length > 0) {
        // Pick the section occupying the most vertical pixels in the root area
        const active = isIntersecting.reduce((a, b) =>
          a.intersectionRect.height > b.intersectionRect.height ? a : b
        );
        setActiveSection(active.target.id);
      }
    }, observerOptions);

    // Observe all sections
    navLinks.forEach((link) => {
      const sectionId = link.href.substring(1); // Remove '#' from href
      const section = document.getElementById(sectionId);
      if (section) {
        observer.observe(section);
      } else if (!isSubpage && process.env.NODE_ENV === 'development') {
        console.warn(`Navigation section not found: #${sectionId}`);
      }
    });

    return () => observer.disconnect();
  }, []);

  // Handle Escape key to close mobile menu
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [mobileMenuOpen]); // Only re-register if mobileMenuOpen state is needed in the handler

  // Close mobile menu on navigation
  const handleNavClick = () => {
    setMobileMenuOpen(false);
  };

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
          onClick={handleNavClick}
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
          aria-label="Arturo Yion - Inicio"
        >
          <span
            style={{
              width: "8px",
              height: "8px",
              background: "var(--accent-primary)",
              borderRadius: 0,
            }}
          />
          <span style={{ display: "flex", alignItems: "baseline" }}>
            Arturo Yion<span style={{ color: "var(--accent-primary)" }}></span>
          </span>
        </Link>

        {/* Desktop Links */}
        <ul
          style={{
            listStyle: "none",
            display: "flex",
            gap: "2rem",
            alignItems: "center",
          }}
          className="desktop-nav"
        >
          {navLinks.map((link) => {
            const resolvedHref = isSubpage ? `/#${link.href.substring(1)}` : link.href;
            const sectionId = link.href.substring(1);
            const isActive = activeSection === sectionId;
            return (
              <li key={link.href}>
                <a
                  href={resolvedHref}
                  onClick={handleNavClick}
                  style={{
                    color: isActive ? "var(--accent-primary)" : "var(--text-secondary)",
                    textDecoration: "none",
                    fontSize: "0.875rem",
                    fontWeight: 500,
                    letterSpacing: "0.02em",
                    transition: "all 0.3s cubic-bezier(0.2, 0.8, 0.5, 1)",
                    position: "relative",
                    paddingBottom: "8px",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLAnchorElement;
                    el.style.color = "var(--accent-primary)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLAnchorElement;
                    if (!isActive) {
                      el.style.color = "var(--text-secondary)";
                    }
                  }}
                >
                  {link.label}
                  {/* Underline indicator */}
                  <span
                    style={{
                      position: "absolute",
                      bottom: "0",
                      left: "0",
                      width: "100%",
                      height: "2px",
                      background: "var(--accent-primary)",
                      borderRadius: "1px",
                      transform: isActive ? "scaleX(1)" : "scaleX(0)",
                      transformOrigin: "left",
                      transition: "transform 0.4s cubic-bezier(0.2, 0.8, 0.5, 1)",
                      pointerEvents: "none",
                    }}
                  />
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
                cursor: "pointer",
              }}
              aria-label="Enviar email"
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

        {/* Mobile Hamburger Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={mobileMenuOpen}
          style={{
            display: "none",
            flexDirection: "column",
            gap: "5px",
            background: "transparent",
            border: "none",
            cursor: "pointer",
            padding: "8px",
          }}
          className="mobile-menu-button"
        >
          <span
            style={{
              width: "24px",
              height: "2px",
              background: "var(--text-primary)",
              transition: "all 0.3s",
              transform: mobileMenuOpen ? "rotate(45deg) translate(10px, 10px)" : "none",
            }}
          />
          <span
            style={{
              width: "24px",
              height: "2px",
              background: "var(--text-primary)",
              transition: "all 0.3s",
              opacity: mobileMenuOpen ? 0 : 1,
            }}
          />
          <span
            style={{
              width: "24px",
              height: "2px",
              background: "var(--text-primary)",
              transition: "all 0.3s",
              transform: mobileMenuOpen ? "rotate(-45deg) translate(8px, -8px)" : "none",
            }}
          />
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <nav
          style={{
            background: "rgba(10,10,10,0.95)",
            borderTop: "1px solid rgba(255,255,255,0.1)",
            padding: "1rem 2rem",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            animation: "slideDown 0.3s ease-out",
          }}
          className="mobile-nav-menu"
        >
          {navLinks.map((link) => {
            const resolvedHref = isSubpage ? `/#${link.href.substring(1)}` : link.href;
            const sectionId = link.href.substring(1);
            const isActive = activeSection === sectionId;
            return (
              <a
                key={link.href}
                href={resolvedHref}
                onClick={handleNavClick}
                style={{
                  color: isActive ? "var(--accent-primary)" : "var(--text-secondary)",
                  textDecoration: "none",
                  fontSize: "0.95rem",
                  padding: "0.75rem 0",
                  borderBottom: isActive ? "1px solid var(--accent-primary)" : "1px solid rgba(206,189,255,0.1)",
                  transition: "all 0.3s cubic-bezier(0.2, 0.8, 0.5, 1)",
                  fontWeight: isActive ? 600 : 500,
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color =
                    "var(--accent-primary)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  if (!isActive) {
                    el.style.color = "var(--text-secondary)";
                  }
                }}
              >
                {link.label}
              </a>
            );
          })}
          <a
            href="mailto:yionjaime@gmail.com"
            onClick={handleNavClick}
            style={{
              display: "inline-flex",
              alignItems: "center",
              padding: "0.75rem 1.25rem",
              background: "var(--accent-primary)",
              color: "#080808",
              fontSize: "0.75rem",
              fontWeight: 600,
              textDecoration: "none",
              fontFamily: "var(--font-mono)",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              borderRadius: "4px",
              marginTop: "0.5rem",
              transition: "all 0.3s",
              cursor: "pointer",
            }}
            aria-label="Enviar email"
          >
            Email
          </a>
        </nav>
      )}

      <style>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 768px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-menu-button {
            display: flex !important;
          }
        }

        @media (min-width: 769px) {
          .mobile-menu-button {
            display: none !important;
          }
        }
      `}</style>
    </header>
  );
}