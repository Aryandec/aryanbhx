import HeroSection from "@/components/herosection";
import Projects from "@/components/projects";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <section id="projects">
        <Projects />
      </section>
    </main>
  );
}
