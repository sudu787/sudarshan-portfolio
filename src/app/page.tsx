import Navbar from "@/components/Navbar";
import Hero from "@/components/sections/Hero";
import Bio from "@/components/sections/Bio";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Terminal from "@/components/sections/Terminal";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <Navbar />
      <Hero />
      <div className="mx-auto max-w-5xl px-4 pb-12">
        <Bio />
        <Skills />
        <Projects />
        <Terminal />
        <Contact />
      </div>
    </main>
  );
}
