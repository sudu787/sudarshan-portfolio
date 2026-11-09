"use client";
import { motion } from "framer-motion";
import { Github, Linkedin } from "lucide-react";

const links = ["About", "Skills", "Projects", "Terminal", "Contact"];

export default function Navbar() {
  return (
    <motion.nav
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-4 inset-x-0 z-40 px-4"
    >
      <div className="mx-auto max-w-5xl flex items-center justify-between gap-4 rounded-full border border-white/10 bg-black/40 backdrop-blur-xl px-5 h-14 shadow-[0_8px_32px_rgb(0_0_0/0.4)]">
        <a href="#" className="flex items-center gap-2 font-semibold tracking-tight">
          <span className="grid place-items-center size-8 rounded-full bg-gradient-to-br from-primary to-accent text-black text-sm font-bold">S</span>
          <span className="hidden sm:inline">Sudarshan</span>
        </a>

        <div className="hidden md:flex items-center gap-1 text-sm text-zinc-400">
          {links.map((l) => (
            <a key={l} href={`#${l.toLowerCase()}`} className="px-3 py-1.5 rounded-full hover:text-white hover:bg-white/5 transition-colors">
              {l}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-1">
          <a href="https://github.com/sudu787" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="p-2 rounded-full text-zinc-400 hover:text-white hover:bg-white/5 transition-colors">
            <Github size={18} />
          </a>
          <a href="https://www.linkedin.com/in/sudarshan787" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="p-2 rounded-full text-zinc-400 hover:text-white hover:bg-white/5 transition-colors">
            <Linkedin size={18} />
          </a>
        </div>
      </div>
    </motion.nav>
  );
}
