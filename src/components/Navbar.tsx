"use client";
import { motion } from "framer-motion";
import { Terminal, Github, Linkedin } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-40 backdrop-blur-md border-b border-white/5 bg-black/50"
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2 text-primary font-mono font-bold text-lg">
          <Terminal size={20} />
          <span>~/sudarshan</span>
        </div>

        <div className="hidden md:flex items-center gap-8 font-mono text-sm text-gray-400">
          <Link href="#about" className="hover:text-primary transition-colors">./About</Link>
          <Link href="#skills" className="hover:text-primary transition-colors">./Skills</Link>
          <Link href="#projects" className="hover:text-primary transition-colors">./Projects</Link>
          <Link href="#contact" className="hover:text-primary transition-colors">./Contact</Link>
        </div>

        <div className="flex items-center gap-4">
            <a href="https://github.com/sudu787" target="_blank" className="text-gray-400 hover:text-white transition-colors">
                <Github size={20} />
            </a>
            <a href="www.linkedin.com/in/sudarshan787" target="_blank" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin size={20} />
            </a>
        </div>
      </div>
    </motion.nav>
  );
}