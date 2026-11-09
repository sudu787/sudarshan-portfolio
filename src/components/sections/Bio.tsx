"use client";
import { motion } from "framer-motion";
import { ArrowUpRight, GraduationCap, ShieldCheck, Users } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";

const certifications = [
  { name: "Google Cloud Security", link: "https://www.credly.com/badges/6ca941e2-f56f-4ad5-952f-f2367630da8b/linked_in_profile" },
  { name: "Cisco Ethical Hacker", link: "https://www.credly.com/badges/2a2cc1ab-f223-4484-8417-38649f392bd2/linked_in_profile" },
  { name: "IBM Malware Analysis", link: "https://www.coursera.org/account/accomplishments/verify/LXGK5NB0V726" },
  { name: "ISO/IEC 27001", link: "https://www.skillfront.com/Badges/18744625721235" },
  { name: "API Security Fundamentals", link: "https://www.credly.com/badges/586244fb-be62-4d26-9571-a8367075aa6d/linked_in_profile" },
];

const reveal = (d = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, delay: d },
});

export default function Bio() {
  return (
    <section id="about" className="scroll-mt-24 py-20">
      <SectionHeading eyebrow="About" title="Who I am" />

      <div className="grid gap-4 md:grid-cols-3">
        <motion.div {...reveal()} className="card p-8 md:col-span-2 md:row-span-2 text-lg leading-relaxed text-zinc-400 space-y-4">
          <p>
            My passion lies in the lower levels of computing. While many focus on building applications, I focus on
            taking them apart. I specialize in <span className="text-white">malware analysis, web &amp; API pentesting,
            and cloud security</span>.
          </p>
          <p>
            I like understanding how things fail: reading disassembly, chaining small bugs into real impact, and
            turning what I find into clear, actionable reports.
          </p>
        </motion.div>

        <motion.div {...reveal(0.1)} className="card p-6 hover:border-primary/30">
          <GraduationCap className="text-primary" />
          <h3 className="mt-4 font-medium">Integrated M.Tech, IT</h3>
          <p className="mt-1 text-sm text-zinc-400">IIIT Gwalior · Expected 2028</p>
        </motion.div>

        <motion.div {...reveal(0.2)} className="card p-6 hover:border-secondary/30">
          <Users className="text-secondary" />
          <h3 className="mt-4 font-medium">Zero Day Club IIITM</h3>
          <p className="mt-1 text-sm text-zinc-400">Attack simulation, malware dissection, CTFs.</p>
        </motion.div>

        <motion.div {...reveal(0.3)} className="card p-6 md:col-span-3">
          <div className="flex items-center gap-2 text-sm text-zinc-400">
            <ShieldCheck size={16} className="text-accent" /> Certifications
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {certifications.map((c) => (
              <a
                key={c.name}
                href={c.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm hover:border-primary/40 hover:bg-primary/10 transition-colors"
              >
                {c.name}
                <ArrowUpRight size={14} className="text-zinc-500 group-hover:text-primary transition-colors" />
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
