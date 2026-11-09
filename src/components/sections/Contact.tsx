"use client";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Send, CheckCircle } from "lucide-react";
import { useForm, ValidationError } from "@formspree/react";

const input =
  "w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:border-primary/60 focus:ring-4 focus:ring-primary/10 transition";

const socials = [
  { href: "https://github.com/sudu787", label: "GitHub", icon: Github },
  { href: "https://www.linkedin.com/in/sudarshan787", label: "LinkedIn", icon: Linkedin },
  { href: "mailto:sudarshanajoysindhu@gmail.com", label: "Email", icon: Mail },
];

export default function Contact() {
  const [state, handleSubmit] = useForm("xpqaabbr");

  return (
    <section id="contact" className="scroll-mt-24 py-20">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="card relative overflow-hidden p-8 md:p-12"
      >
        <div className="pointer-events-none absolute -left-32 -bottom-32 size-96 rounded-full bg-primary/15 blur-3xl" />
        <div className="pointer-events-none absolute -right-32 -top-32 size-96 rounded-full bg-secondary/15 blur-3xl" />

        <div className="relative grid gap-12 md:grid-cols-2">
          <div>
            <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-primary">
              <span className="h-px w-6 bg-primary" /> Contact
            </span>
            <h2 className="mt-3 text-4xl md:text-5xl font-semibold tracking-tight">
              Let&apos;s <span className="text-gradient">work together</span>
            </h2>
            <p className="mt-6 text-lg text-zinc-400 leading-relaxed">
              I&apos;m looking for opportunities in Red Teaming and Malware Analysis. Whether you have a question, a
              challenge, or just want to say hi, my inbox is open.
            </p>
            <div className="mt-8 flex gap-3">
              {socials.map(({ href, label, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="grid place-items-center size-12 rounded-full border border-white/10 bg-white/5 text-zinc-300 hover:text-white hover:border-primary/50 hover:bg-primary/10 transition-colors"
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {state.succeeded ? (
            <div className="flex flex-col items-center justify-center text-center gap-3 rounded-2xl border border-primary/20 bg-black/30 p-8">
              <CheckCircle size={40} className="text-primary" />
              <h3 className="text-xl font-medium">Message sent</h3>
              <p className="text-zinc-400">Thanks for reaching out. I&apos;ll get back to you soon.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="mb-2 block text-sm text-zinc-400">Name</label>
                <input id="name" name="name" type="text" placeholder="John Doe" required className={input} />
                <ValidationError prefix="Name" field="name" errors={state.errors} />
              </div>
              <div>
                <label htmlFor="email" className="mb-2 block text-sm text-zinc-400">Email</label>
                <input id="email" name="email" type="email" placeholder="john@example.com" required className={input} />
                <ValidationError prefix="Email" field="email" errors={state.errors} />
              </div>
              <div>
                <label htmlFor="message" className="mb-2 block text-sm text-zinc-400">Message</label>
                <textarea id="message" name="message" rows={4} placeholder="Your message..." required className={`${input} resize-none`} />
                <ValidationError prefix="Message" field="message" errors={state.errors} />
              </div>
              <button
                type="submit"
                disabled={state.submitting}
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-white py-3.5 font-medium text-black hover:bg-primary transition-colors disabled:opacity-50"
              >
                {state.submitting ? "Sending..." : <>Send message <Send size={16} /></>}
              </button>
            </form>
          )}
        </div>
      </motion.div>

      <footer className="mt-16 flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-zinc-600">
        <p>© {new Date().getFullYear()} Sudarshan Ajoy Sindhu</p>
        <p className="font-mono">Built with Next.js</p>
      </footer>
    </section>
  );
}
