"use client";
import { motion } from "framer-motion";
import { Github, ExternalLink, Lock } from "lucide-react";

const projects = [
  {
    title: "Pentest Reporter",
    desc: "A full-stack security reporting platform designed to streamline penetration testing workflows. Features secure OAuth 2.0/OTP authentication, automated PDF generation, and a Dockerized microservices architecture using FastAPI and PostgreSQL.",
    tags: ["Python", "Next.js", "FastAPI", "Docker", "PostgreSQL"],
    links: { github: "https://github.com/sudu787/pentest-reporter-mvp", live: "https://pentest-frontend-7nnw.onrender.com/" }, // Add specific link if you have it
  },
  {
    title: "Phishing Detector Extension",
    desc: "Machine learning-powered security tool featuring a Chrome extension client and Flask backend. Uses a trained Random Forest model to extract URL-based features and classify potential phishing threats in real-time.",
    tags: ["Python", "Flask", "Scikit-Learn", "JavaScript"],
    links: { github: "https://github.com/sudu787/mini-project/tree/add-ml-documentation", live: null },
  },
  {
    title: "Portfolio & Silent Logger",
    desc: "High-performance site built on the Vercel Edge Network. Features a custom serverless 'Silent Logger' engineered with Next.js Middleware and Redis to capture and visualize real-time visitor telemetry without third-party trackers.",
    tags: ["Next.js 16", "TypeScript", "Redis", "Tailwind CSS"],
    links: { github: "https://github.com/sudu787/sudarshan-portfolio", live: "https://sudarshanajoysindhu.vercel.app" },
  },
];

export default function Projects() {
  return (
    <section id="projects" className="py-20">
      <div className="max-w-6xl mx-auto px-4"> {/* Added px-4 for mobile padding */}
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
                      <a href={project.links.github} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                        <Github size={20} />
                      </a>
                    )}
                    {project.links.live && (
                      <a href={project.links.live} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                        <ExternalLink size={20} />
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