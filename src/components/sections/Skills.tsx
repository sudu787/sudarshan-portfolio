"use client";
import { motion } from "framer-motion";
import { Bug, Cloud, Code2, Crosshair } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";

const skills = [
  { category: "Reverse Engineering", icon: Bug, items: ["Ghidra", "x64dbg", "Assembly", "ProcMon", "Malware Analysis"] },
  { category: "Offensive Security", icon: Crosshair, items: ["Burp Suite", "Metasploit", "Nmap", "Wireshark", "Web/Network Pentesting"] },
  { category: "Development", icon: Code2, items: ["Python", "C/C++", "JavaScript", "Flask", "Bash"] },
  { category: "Cloud & Ops", icon: Cloud, items: ["Google Cloud SCC", "Linux Admin", "Git/GitHub", "MySQL", "VS Code"] },
];

export default function Skills() {
  return (
    <section id="skills" className="scroll-mt-24 py-20">
      <SectionHeading eyebrow="Skills" title="Technical arsenal" />

      <div className="grid gap-4 sm:grid-cols-2">
        {skills.map(({ category, icon: Icon, items }, i) => (
          <motion.div
            key={category}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="card group p-6 hover:border-primary/30 hover:-translate-y-1"
          >
            <div className="flex items-center gap-3">
              <span className="grid place-items-center size-10 rounded-xl bg-primary/10 text-primary ring-1 ring-primary/20">
                <Icon size={20} />
              </span>
              <h3 className="text-lg font-medium">{category}</h3>
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              {items.map((s) => (
                <span key={s} className="rounded-lg border border-white/5 bg-white/[0.03] px-3 py-1.5 text-sm text-zinc-300">
                  {s}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
