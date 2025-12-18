"use client";
import { motion } from "framer-motion";

const skills = [
  { 
    category: "Reverse Engineering", 
    items: ["Ghidra", "x64dbg", "Assembly (ASM)", "ProcMon", "Malware Analysis"] 
  },
  { 
    category: "Offensive Security", 
    items: ["Burp Suite", "Metasploit", "Nmap", "Wireshark", "Web/Network Pentesting"] 
  },
  { 
    category: "Development", 
    items: ["Python", "C/C++", "JavaScript", "Flask", "Bash Scripting"] 
  },
  { 
    category: "Cloud & Ops", 
    items: ["Google Cloud SCC", "Linux Administration", "Git/GitHub", "MySQL", "VS Code"] 
  },
];

export default function Skills() {
  return (
    <section id="skills" className="py-20">
      <div className="max-w-6xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-3xl font-bold mb-12 flex items-center gap-2"
        >
          <span className="text-primary">02.</span> Technical Arsenal
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skills.map((group, index) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="p-6 rounded-xl bg-white/5 border border-white/5 backdrop-blur-sm hover:border-primary/30 transition-colors"
            >
              <h3 className="text-xl font-bold text-accent mb-4 font-mono">{group.category}</h3>
              <ul className="space-y-2">
                {group.items.map((skill) => (
                  <li key={skill} className="flex items-center gap-2 text-gray-400 text-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/50" />
                    {skill}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}