"use client";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

export default function Bio() {
  // 👇 UPDATE THESE LINKS WITH YOUR ACTUAL CREDENTIAL URLS
  const certifications = [
    { name: "Google Cloud Security", link: "https://www.cloudskillhttps://www.credly.com/badges/6ca941e2-f56f-4ad5-952f-f2367630da8b/linked_in_profilesboost.google/public_profiles/YOUR_PROFILE" }, 
    { name: "Cisco Ethical Hacker", link: "https://www.https://www.credly.com/badges/2a2cc1ab-f223-4484-8417-38649f392bd2/linked_in_profilecredly.com/badges/YOUR_BADGE_ID" },
    { name: "IBM Malware Analysis", link: "https://www.coursera.org/accounhttps://www.coursera.org/account/accomplishments/verify/LXGK5NB0V726t/accomplishments/verify/LXGK5NB0V726" },
    { name: "ISO/IEC 27001", link: "https://www.skillfront.com/Badges/18744625721235" },
    { name: "API Security Fundamentals" , link :"https://www.credly.com/badges/586244fb-be62-4d26-9571-a8367075aa6d/linked_in_profile"},
  ];

  return (
    <section id="about" className="max-w-4xl mx-auto py-20 relative">
       <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold mb-8 flex items-center gap-2">
            <span className="text-primary">01.</span> /whoami
        </h2>
        
        <div className="prose prose-invert prose-lg text-gray-400">
            <p>
                I am currently pursuing an <span className="text-white">Integrated M.Tech in Information Technology</span> at the <span className="text-primary">Indian Institute of Information Technology, Gwalior</span> (Expected 2028).
            </p>
            <p>
                My passion lies in the lower levels of computing. While many focus on building applications, I focus on breaking them down—literally. I specialize in <span className="text-white">Malware Analysis, Web Application & API Pentesting, and Cloud Security</span>.
            </p>
            <p>
                I am an active member of the <span className="text-primary">Zero Day Club IIITM</span>, where we simulate attacks, dissect malware, and push the boundaries of ethical hacking.
            </p>
        </div>

        {/* Certifications Badge Area */}
        <div className="mt-8 flex flex-wrap gap-4">
            {certifications.map((cert) => (
                <a 
                  key={cert.name}
                  href={cert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 text-xs text-primary bg-primary/5 font-mono hover:bg-primary/10 hover:border-primary/60 transition-all cursor-pointer"
                >
                    {cert.name}
                    <ExternalLink size={10} className="opacity-50 group-hover:opacity-100 transition-opacity" />
                </a>
            ))}
        </div>
      </motion.div>
    </section>
  );
}