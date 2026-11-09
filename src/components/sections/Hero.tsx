"use client";
import { motion } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";
import { useState, useEffect } from "react";

const roles = ["Red Team Specialist", "Malware Analyst", "Cloud Security Engineer"];

function RoleRotator() {
  const [text, setText] = useState("");
  const [i, setI] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const full = roles[i % roles.length];
    const done = !deleting && text === full;
    const t = setTimeout(() => {
      if (done) return setDeleting(true);
      if (deleting && text === "") {
        setDeleting(false);
        setI(i + 1);
        return;
      }
      setText(full.slice(0, text.length + (deleting ? -1 : 1)));
    }, done ? 1800 : deleting ? 40 : 80);
    return () => clearTimeout(t);
  }, [text, deleting, i]);

  return (
    <span className="font-mono text-primary">
      {text}
      <span className="animate-cursor-blink ml-0.5 border-r-2 border-primary">&nbsp;</span>
    </span>
  );
}

const stats = [
  { value: "5+", label: "Certifications" },
  { value: "3", label: "Security projects" },
  { value: "2028", label: "M.Tech, IIITM" },
];

const fade = (d: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay: d, ease: [0.22, 1, 0.36, 1] as const },
});

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center px-4 pt-28 pb-16">
      <div className="mx-auto max-w-5xl w-full">
        <motion.div {...fade(0)} className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-300">
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex size-2 rounded-full bg-primary" />
          </span>
          Open to Red Team &amp; security internships
        </motion.div>

        <motion.h1 {...fade(0.1)} className="mt-6 text-5xl sm:text-7xl md:text-8xl font-semibold tracking-tighter leading-[0.95]">
          Sudarshan
          <br />
          <span className="text-gradient">Ajoy Sindhu</span>
        </motion.h1>

        <motion.p {...fade(0.2)} className="mt-6 text-xl md:text-2xl text-zinc-400 h-8">
          <RoleRotator />
        </motion.p>

        <motion.p {...fade(0.3)} className="mt-6 max-w-xl text-lg text-zinc-400 leading-relaxed">
          Breaking systems to build safer ones. I work on web &amp; network pentesting,
          malware reverse engineering, and cloud security.
        </motion.p>

        <motion.div {...fade(0.4)} className="mt-10 flex flex-col sm:flex-row gap-3">
          <a
            href="#projects"
            className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 font-medium text-black hover:bg-zinc-200 transition-colors"
          >
            View projects <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="/resumeaiml.pdf"
            download="Sudarshan_Sindhu_Resume.pdf"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 font-medium hover:bg-white/10 transition-colors"
          >
            Download résumé <Download size={18} />
          </a>
        </motion.div>

        <motion.dl {...fade(0.5)} className="mt-16 grid grid-cols-3 max-w-lg divide-x divide-white/10 border-t border-white/10 pt-6">
          {stats.map((s) => (
            <div key={s.label} className="px-4 first:pl-0">
              <dt className="text-2xl md:text-3xl font-semibold tracking-tight">{s.value}</dt>
              <dd className="mt-1 text-xs text-zinc-500">{s.label}</dd>
            </div>
          ))}
        </motion.dl>
      </div>
    </section>
  );
}
