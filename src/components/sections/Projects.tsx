"use client";
import { motion } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";

const projects = [
  {
    title: "Phishing Detector Chrome Extension",
    desc: "Real-time browser extension powered by a DistilBERT model fine-tuned on 1.33M URLs plus an XGBoost heuristic engine. A Llama-3.3 70B agent (via Groq) acts as a virtual SOC analyst, fusing live domain intel and ML signals to detect and explain zero-day phishing in milliseconds over a FastAPI backend.",
    tags: ["DistilBERT", "XGBoost", "FastAPI", "LLM", "Chrome API"],
    links: { github: null, live: null },
  },
  {
    title: "Pentest Reporter",
    desc: "Full-stack reporting platform for penetration testers: create projects, upload scan results, generate PDF reports. Google OAuth 2.0 plus OTP email login, a PostgreSQL schema for users, scans and vulnerabilities, and containerized deployment with Docker.",
    tags: ["Next.js", "FastAPI", "PostgreSQL", "Docker", "OAuth"],
    links: { github: "https://github.com/sudu787/pentest-reporter-mvp", live: "https://pentest-frontend-production.up.railway.app/" },
  },
  {
    title: "Home Lab & Network Defense",
    desc: "Self-hosted intrusion detection and monitoring environment for practicing Blue Team operations, log analysis, and network traffic inspection with industry-standard tools.",
    tags: ["Wireshark", "Snort", "Virtualization", "Bash"],
    links: { github: null, live: null },
  },
];

export default function Projects() {
  return (
    <section id="projects" className="scroll-mt-24 py-20">
      <SectionHeading eyebrow="Work" title="Selected projects" sub="Things I've built while learning how to break, and defend, real systems." />

      <div className="space-y-4">
        {projects.map((p, i) => (
          <motion.article
            key={p.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="card group relative overflow-hidden p-6 md:p-8 hover:border-white/15"
          >
            <div className="pointer-events-none absolute -right-24 -top-24 size-64 rounded-full bg-primary/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative grid gap-6 md:grid-cols-[auto_1fr_auto] md:items-start">
              <span className="font-mono text-sm text-zinc-600">0{i + 1}</span>

              <div>
                <h3 className="text-2xl font-semibold tracking-tight">{p.title}</h3>
                <p className="mt-3 max-w-2xl text-zinc-400 leading-relaxed">{p.desc}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <span key={t} className="rounded-full bg-white/5 px-3 py-1 font-mono text-xs text-zinc-300">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex gap-2">
                {p.links.github && (
                  <a href={p.links.github} target="_blank" rel="noopener noreferrer" aria-label={`${p.title} source`} className="grid place-items-center size-10 rounded-full border border-white/10 text-zinc-400 hover:text-white hover:border-white/30 transition-colors">
                    <Github size={18} />
                  </a>
                )}
                {p.links.live && (
                  <a href={p.links.live} target="_blank" rel="noopener noreferrer" aria-label={`${p.title} live`} className="grid place-items-center size-10 rounded-full bg-white text-black hover:bg-primary transition-colors">
                    <ArrowUpRight size={18} />
                  </a>
                )}
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
