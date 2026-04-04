import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Stack from "@/components/Stack";
import About from "@/components/About";
import Contact from "@/components/Contact";
import FrameBackground from "@/components/FrameBackground";
import { ErrorBoundary } from "@/components/ErrorBoundary";

export default function Home() {
  return (
    <>
      {/* Frame video background — bottommost layer */}
      <ErrorBoundary>
        <FrameBackground />
      </ErrorBoundary>

      {/* Background effects */}
      <div className="dot-grid" aria-hidden="true" />
      <div className="noise-overlay" aria-hidden="true" />

      {/* App shell */}
      <Nav />
      <main>
        <Hero />
        <Stack />
        <Projects />
        <About />
        <Contact />
      </main>
    </>
  );
}
