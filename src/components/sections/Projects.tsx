"use client";
import { motion } from "framer-motion";
import { Github, ExternalLink, Lock } from "lucide-react";

const projects = [
  {
    title: "Phishing Detector Chrome Extension",
    desc: "Developed a real-time cybersecurity browser extension powered by a custom-trained DistilBERT NLP model (fine-tuned on 1.33M URLs) and an XGBoost heuristic engine. Integrated an autonomous LLM (Llama-3.3 70B via Groq) to act as a virtual SOC Analyst, fusing live domain intelligence and ML signals to accurately detect and explain zero-day phishing attacks in milliseconds via a FastAPI backend.",
    tags: ["Python", "Flask", "Scikit-Learn", "JavaScript", "Chrome API"],
    links: { github: "https://github.com/yourusername", live: null },
  },
  {
    title: "Pentest Reporter",
    desc: "A full-stack security reporting platform designed to streamline the workflow of penetration testers, allowing users to create projects, upload scan results, and generate PDF reports. Engineered a secure authentication system featuring both Google OAuth 2.0 and a custom OTP-based email login flow using FastAPI and BackgroundTasks for asynchronous email delivery. Designed a robust database schema with SQLAlchemy and PostgreSQL to manage users, projects, scans, and vulnerabilities, enforcing strict foreign-key relationships. Deployed a containerized microservices architecture using Docker on Render.com, implementing CORS middleware.",
    tags: ["Python", "Next.js", "FastAPI", "Docker", "PostgreSQL"],
    links: { github: "https://github.com/sudu787/pentest-reporter-mvp", live: "#" },
  },
  // Added a placeholder for your future third project
  {
    title: "Home Lab & Network Defense",
    desc: "Self-hosted intrusion detection and monitoring environment to practice Blue Team operations, log analysis, and network traffic inspection using industry-standard tools.",
    tags: ["Wireshark", "Snort", "Virtualization", "Bash"],
    links: { github: null, live: null },
  },
];

export default function Projects() {
  return (
    <section id="projects" className="py-20">
      <div className="max-w-6xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-3xl font-bold mb-12 flex items-center gap-2"
        >
          <span className="text-primary">03.</span> Operations & Projects
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="group relative bg-[#0f0f0f] border border-gray-800 rounded-lg overflow-hidden hover:border-primary/50 transition-all duration-300 flex flex-col"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-2 bg-primary/10 rounded-lg text-primary">
                    <Lock size={20} />
                  </div>
                  <div className="flex gap-3">
                    {project.links.github && (
                      <a href={project.links.github} className="text-gray-400 hover:text-white transition-colors">
                        <Github size={20} />
                      </a>
                    )}
                  </div>
                </div>

                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{project.title}</h3>
                <p className="text-gray-400 text-sm mb-6 flex-1 leading-relaxed">{project.desc}</p>

                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.tags.map(tag => (
                    <span key={tag} className="text-xs font-mono px-2 py-1 rounded bg-white/5 text-primary/80 border border-white/5">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}