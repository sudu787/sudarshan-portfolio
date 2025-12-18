"use client";
import { motion } from "framer-motion";
import { ArrowRight, Download, Terminal } from "lucide-react";
import { useState, useEffect } from "react";

// 👇 Improved Typewriter Component
const RoleRotator = () => {
  const roles = ["Red Team Specialist", "Malware Analysis", "Google Cloud Security"];
  
  const [text, setText] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [delta, setDelta] = useState(100); // Speed control

  useEffect(() => {
    let ticker = setInterval(() => {
      tick();
    }, delta);

    return () => clearInterval(ticker);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, delta]);

  const tick = () => {
    let i = roleIndex % roles.length;
    let fullText = roles[i];
    
    // Determine text based on typing or deleting
    let updatedText = isDeleting 
      ? fullText.substring(0, text.length - 1) 
      : fullText.substring(0, text.length + 1);

    setText(updatedText);

    // Typing Speed Logic
    if (isDeleting) {
      setDelta(40); // Fast delete speed
    } else {
      setDelta(80); // Normal typing speed
    }

    // 1. Finished Typing? -> Wait then delete
    if (!isDeleting && updatedText === fullText) {
      setDelta(2000); // 2 seconds pause at the end
      setIsDeleting(true);
    } 
    // 2. Finished Deleting? -> Move to next word
    else if (isDeleting && updatedText === "") {
      setIsDeleting(false);
      setRoleIndex((prev) => prev + 1);
      setDelta(100); // Reset speed for new word
    }
  };

  return (
    <span className="font-mono text-xl md:text-2xl text-gray-400 min-h-[32px] inline-block">
      {text}
      <span className="animate-cursor-blink border-r-2 border-primary ml-1">&nbsp;</span>
    </span>
  );
};

export default function Hero() {
  return (
    <section className="h-screen flex flex-col justify-center items-center relative overflow-hidden px-4">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,_var(--color-primary)_0%,_transparent_70%)] opacity-10" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-3xl"
      >
        <div className="flex items-center justify-center gap-2 mb-4">
          <span className="h-px w-8 bg-primary"></span>
          <span className="text-primary font-mono text-sm tracking-widest uppercase flex items-center gap-2">
            <Terminal size={14} /> System Online
          </span>
          <span className="h-px w-8 bg-primary"></span>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6">
          Sudarshan <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Ajoy Sindhu</span>
        </h1>

        {/* Animated Text Section */}
        <div className="h-12 flex justify-center items-center mb-8">
            <span className="text-primary mr-2 text-xl md:text-2xl">{">"}</span>
            <RoleRotator />
        </div>

        <p className="text-muted text-lg mb-8 max-w-xl mx-auto">
          "Breaking systems to build safer ones." <br />
          Specializing in Web/Network Pentesting, Malware Analysis, and Cloud Security.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#projects"
            className="group relative px-8 py-3 bg-white/5 border border-white/10 text-white rounded-md hover:bg-primary/10 hover:border-primary/50 transition-all duration-300"
          >
            <span className="flex items-center gap-2">
              View Projects <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </span>
          </a>
          
          <a
            href="/resume.pdf"
            download="Sudarshan_Sindhu_CV.pdf"
            className="px-8 py-3 bg-primary text-black font-semibold rounded-md hover:bg-primary/90 transition-colors flex items-center gap-2 justify-center shadow-[0_0_20px_rgba(0,255,157,0.3)] hover:shadow-[0_0_30px_rgba(0,255,157,0.5)]"
          >
             Download CV <Download size={18} />
          </a>
        </div>
      </motion.div>
    </section>
  );
}