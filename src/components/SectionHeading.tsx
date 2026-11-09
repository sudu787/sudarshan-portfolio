"use client";
import { motion } from "framer-motion";

export default function SectionHeading({ eyebrow, title, sub }: { eyebrow: string; title: string; sub?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="mb-12"
    >
      <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-primary">
        <span className="h-px w-6 bg-primary" /> {eyebrow}
      </span>
      <h2 className="mt-3 text-3xl md:text-5xl font-semibold tracking-tight">{title}</h2>
      {sub && <p className="mt-4 max-w-2xl text-zinc-400">{sub}</p>}
    </motion.div>
  );
}
