import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Stack from "@/components/Stack";
import About from "@/components/About";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
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
