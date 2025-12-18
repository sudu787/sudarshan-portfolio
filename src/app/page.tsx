import Navbar from "@/components/Navbar";
import Hero from "@/components/sections/Hero";
import Bio from "@/components/sections/Bio";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Contact from "@/components/sections/Contact"; // <--- New Import

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <Navbar />
      <Hero />
      
      <div className="container mx-auto px-4 space-y-24 pb-24">
        <Bio />
        <Skills />
        <Projects />
        
        {/* The new Contact section handles the footer content now */}
        <Contact />
      </div>
    </main>
  );
}