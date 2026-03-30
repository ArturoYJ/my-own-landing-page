import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Stack from "@/components/Stack";
import About from "@/components/About";
import Contact from "@/components/Contact";
import FrameBackground from "@/components/FrameBackground";
import ControlledSnap from "@/components/ControlledSnap";

export default function Home() {
  return (
    <>
      {/* Scroll Logic Controller */}
      <ControlledSnap />

      {/* Frame video background — bottommost layer */}
      <FrameBackground />

      {/* Background effects */}
      <div className="dot-grid" aria-hidden="true" />
      <div className="noise-overlay" aria-hidden="true" />

      {/* App shell */}
      <Nav />
      <main>
        <Hero />
        <Projects />
        <Stack />
        <About />
        <Contact />
      </main>
    </>
  );
}
