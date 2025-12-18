"use client";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Send, CheckCircle, Terminal } from "lucide-react";
import { useForm, ValidationError } from "@formspree/react";

export default function Contact() {
  // 1. SETUP: Replace the string below with your unique Formspree ID
  const [state, handleSubmit] = useForm("xpqaabbr");

  // 2. SUCCESS STATE: What to show after the user clicks send
  if (state.succeeded) {
    return (
      <section id="contact" className="py-24 relative overflow-hidden flex items-center justify-center">
        <div className="bg-[#0a0a0a] border border-green-500/30 p-8 rounded-2xl shadow-2xl max-w-lg text-center">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex flex-col items-center gap-4"
          >
            <div className="p-4 bg-green-500/10 rounded-full text-green-500">
                <CheckCircle size={48} />
            </div>
            <h3 className="text-2xl font-bold text-white">Transmission Received</h3>
            <p className="text-gray-400 font-mono text-sm">
              <span className="text-primary">root@sudarshan:~$</span> echo "Message delivered."
            </p>
            <p className="text-gray-500 mt-2">
              Thanks for reaching out! I will decrypt your message and respond shortly.
            </p>
            <button 
                onClick={() => window.location.reload()} 
                className="mt-6 px-6 py-2 bg-white/5 border border-white/10 rounded hover:bg-white/10 text-sm transition-colors"
            >
                Send Another Packet
            </button>
          </motion.div>
        </div>
      </section>
    );
  }

  // 3. NORMAL STATE: The form itself
  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          
          {/* Left Side: Text & Socials */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Let's <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Connect!</span>
            </h2>
            
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              I'm currently looking for new opportunities in **Red Teaming** and **Malware Analysis**. 
              Whether you have a question, a challenge, or just want to say hi, my inbox is always open!
            </p>

            <div className="flex gap-6 mb-12">
              <a href="https://github.com" target="_blank" className="p-3 bg-white/5 rounded-full hover:bg-primary/20 hover:text-primary transition-all">
                <Github size={24} />
              </a>
              <a href="https://linkedin.com" target="_blank" className="p-3 bg-white/5 rounded-full hover:bg-primary/20 hover:text-primary transition-all">
                <Linkedin size={24} />
              </a>
              <a href="mailto:sudarshanajoysindhu@gmail.com" className="p-3 bg-white/5 rounded-full hover:bg-primary/20 hover:text-primary transition-all">
                <Mail size={24} />
              </a>
            </div>
            
            <div className="p-4 bg-white/5 border-l-4 border-primary rounded-r-lg hidden md:block">
              <p className="text-sm text-gray-300 font-mono flex items-center gap-2">
                <Terminal size={14} className="text-primary"/>
                <span className="text-primary">root@sudarshan:~$</span> ./open_channel.sh --secure
              </p>
            </div>
          </motion.div>

          {/* Right Side: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-[#0a0a0a] border border-white/5 p-8 rounded-2xl shadow-2xl relative"
          >
            {/* Form Logic */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2">Name</label>
                <input 
                  id="name"
                  type="text" 
                  name="name" // Name attribute is required for Formspree
                  placeholder="John Doe" 
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                />
                <ValidationError prefix="Name" field="name" errors={state.errors} />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">Email</label>
                <input 
                  id="email"
                  type="email" 
                  name="email" // required
                  placeholder="john@example.com" 
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                />
                <ValidationError prefix="Email" field="email" errors={state.errors} />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-2">Message</label>
                <textarea 
                  id="message"
                  name="message" // required
                  rows={4} 
                  placeholder="Your message..." 
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors resize-none"
                />
                <ValidationError prefix="Message" field="message" errors={state.errors} />
              </div>

              <button 
                type="submit" 
                disabled={state.submitting}
                className="w-full bg-gradient-to-r from-primary to-green-600 text-black font-bold py-4 rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {state.submitting ? "Transmitting..." : "Send Message"} 
                {!state.submitting && <Send size={18} />}
              </button>
            </form>
          </motion.div>
        </div>

        <div className="mt-24 pt-8 border-t border-white/5 text-center text-sm text-gray-600 font-mono">
          <p>Build v1.0.0 // Sudarshan Ajoy Sindhu</p>
        </div>
      </div>
    </section>
  );
}