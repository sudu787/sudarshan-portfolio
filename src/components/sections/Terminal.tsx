"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";

/* ───────────────────────── data ───────────────────────── */

const SKILLS = [
  { category: "Reverse Engineering", items: ["Ghidra", "x64dbg", "Assembly (ASM)", "ProcMon", "Malware Analysis"] },
  { category: "Offensive Security", items: ["Burp Suite", "Metasploit", "Nmap", "Wireshark", "Web/Network Pentesting"] },
  { category: "Development", items: ["Python", "C/C++", "JavaScript", "Flask", "Bash Scripting"] },
  { category: "Cloud & Ops", items: ["Google Cloud SCC", "Linux Administration", "Git/GitHub", "MySQL", "VS Code"] },
];

const PROJECTS = [
  { name: "Phishing Detector Chrome Extension", desc: "Real-time cybersecurity browser extension powered by DistilBERT NLP + XGBoost + LLM SOC Analyst via FastAPI" },
  { name: "IoT Honeypot System", desc: "Low-interaction honeypot emulating vulnerable smart devices using MQTT for threat intelligence" },
  { name: "Home Lab & Network Defense", desc: "Self-hosted IDS/monitoring environment for Blue Team operations and log analysis" },
];

const CERTIFICATIONS = [
  { name: "Google Cloud Security", url: "https://www.credly.com/badges/6ca941e2-f56f-4ad5-952f-f2367630da8b" },
  { name: "Cisco Ethical Hacker", url: "https://www.credly.com/badges/2a2cc1ab-f223-4484-8417-38649f392bd2" },
  { name: "IBM Malware Analysis", url: "https://www.coursera.org/account/accomplishments/verify/LXGK5NB0V726" },
  { name: "ISO/IEC 27001", url: "https://www.skillfront.com/Badges/18744625721235" },
  { name: "API Security Fundamentals", url: "https://www.credly.com/badges/586244fb-be62-4d26-9571-a8367075aa6d" },
];

const NEOFETCH_ART = `
\x1b[36m         ██████╗ ██╗   ██╗██████╗ ██╗   ██╗\x1b[0m      \x1b[32msudarshan\x1b[0m@\x1b[32mkali\x1b[0m
\x1b[36m        ██╔════╝ ██║   ██║██╔══██╗██║   ██║\x1b[0m      ──────────────────
\x1b[36m        ╚█████╗  ██║   ██║██║  ██║██║   ██║\x1b[0m      \x1b[32mOS:\x1b[0m      Kali Linux x86_64
\x1b[36m         ╚═══██╗ ██║   ██║██║  ██║██║   ██║\x1b[0m      \x1b[32mHost:\x1b[0m    IIITM Gwalior
\x1b[36m        ██████╔╝ ╚██████╔╝██████╔╝╚██████╔╝\x1b[0m      \x1b[32mKernel:\x1b[0m  Red-Team-v2.0
\x1b[36m        ╚═════╝   ╚═════╝ ╚═════╝  ╚═════╝\x1b[0m       \x1b[32mShell:\x1b[0m   bash 5.2.15
\x1b[0m                                                \x1b[32mUptime:\x1b[0m  21 years
                                                \x1b[32mIDE:\x1b[0m     VS Code
                                                \x1b[32mLang:\x1b[0m    Python, C/C++, JS
                                                \x1b[32mCerts:\x1b[0m   5 active
                                                \x1b[32mStatus:\x1b[0m  Open to Opportunities
`;

const BOOT_LINES = [
  { text: "BIOS v2.4.1 — Initializing hardware...", delay: 0 },
  { text: "[  OK  ] Loaded kernel: red-team-v2.0", delay: 200 },
  { text: "[  OK  ] Mounted /dev/skills", delay: 350 },
  { text: "[  OK  ] Started Network Reconnaissance Service", delay: 500 },
  { text: "[  OK  ] Loaded module: exploit-framework", delay: 650 },
  { text: "[  OK  ] Reached target: Multi-User System", delay: 800 },
  { text: "", delay: 950 },
  { text: "██╗  ██╗ █████╗ ██╗     ██╗", delay: 1050 },
  { text: "██║ ██╔╝██╔══██╗██║     ██║", delay: 1100 },
  { text: "█████╔╝ ███████║██║     ██║", delay: 1150 },
  { text: "██╔═██╗ ██╔══██║██║     ██║", delay: 1200 },
  { text: "██║  ██╗██║  ██║███████╗██║", delay: 1250 },
  { text: "╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝╚═╝", delay: 1300 },
  { text: "", delay: 1400 },
  { text: "Welcome to Sudarshan's Terminal v2.0", delay: 1500 },
  { text: 'Type "help" to see available commands.\n', delay: 1700 },
];

/* ───────────────────── helpers ──────────────────────── */

type OutputLine = { type: "input" | "output" | "error" | "system"; text: string };

function parseAnsi(raw: string): React.ReactNode[] {
  const COLOR_MAP: Record<string, string> = {
    "36": "#00f0ff",   // cyan / accent
    "32": "#00ff9d",   // green / primary
    "31": "#ff5555",   // red
    "33": "#f1fa8c",   // yellow
    "35": "#bd00ff",   // purple / secondary
    "0": "",
  };

  const parts = raw.split(/\x1b\[(\d+)m/);
  const nodes: React.ReactNode[] = [];
  let currentColor = "";

  for (let i = 0; i < parts.length; i++) {
    if (i % 2 === 1) {
      currentColor = COLOR_MAP[parts[i]] ?? "";
    } else if (parts[i]) {
      nodes.push(
        currentColor ? (
          <span key={i} style={{ color: currentColor }}>{parts[i]}</span>
        ) : (
          <span key={i}>{parts[i]}</span>
        )
      );
    }
  }
  return nodes;
}

/* ───────────────────── command handler ──────────────── */

function handleCommand(raw: string): OutputLine[] {
  const trimmed = raw.trim();
  if (!trimmed) return [];

  const lower = trimmed.toLowerCase();
  const parts = trimmed.split(/\s+/);
  const cmd = parts[0].toLowerCase();

  // help
  if (cmd === "help") {
    return [
      { type: "output", text: "" },
      { type: "output", text: "\x1b[32m  Available Commands:\x1b[0m" },
      { type: "output", text: "  ─────────────────────────────────────" },
      { type: "output", text: "  \x1b[36mhelp\x1b[0m            Show this help menu" },
      { type: "output", text: "  \x1b[36mwhoami\x1b[0m          Display profile info" },
      { type: "output", text: "  \x1b[36mskills\x1b[0m          List technical skills" },
      { type: "output", text: "  \x1b[36mprojects\x1b[0m        Show project portfolio" },
      { type: "output", text: "  \x1b[36mcertifications\x1b[0m  List certifications" },
      { type: "output", text: "  \x1b[36meducation\x1b[0m       Show education details" },
      { type: "output", text: "  \x1b[36mcontact\x1b[0m         Display contact info" },
      { type: "output", text: "  \x1b[36mresume\x1b[0m          Download resume PDF" },
      { type: "output", text: "  \x1b[36mneofetch\x1b[0m        Display system info" },
      { type: "output", text: "  \x1b[36mecho <text>\x1b[0m     Echo back text" },
      { type: "output", text: "  \x1b[36mclear\x1b[0m           Clear the terminal" },
      { type: "output", text: "  \x1b[36msudo hire-me\x1b[0m    ???" },
      { type: "output", text: "" },
    ];
  }

  // whoami
  if (cmd === "whoami") {
    return [
      { type: "output", text: "" },
      { type: "output", text: "\x1b[32m  Sudarshan Ajoy Sindhu\x1b[0m" },
      { type: "output", text: "  Red Team Specialist | Cybersecurity Researcher" },
      { type: "output", text: "" },
      { type: "output", text: "  Integrated M.Tech in IT @ IIITM Gwalior (Expected 2028)" },
      { type: "output", text: "  Specializing in Malware Analysis, Web/API Pentesting," },
      { type: "output", text: "  and Cloud Security. Active member of Zero Day Club IIITM." },
      { type: "output", text: "" },
    ];
  }

  // skills
  if (cmd === "skills") {
    const lines: OutputLine[] = [{ type: "output", text: "" }];
    SKILLS.forEach((group) => {
      lines.push({ type: "output", text: `  \x1b[36m┌─ ${group.category} ─\x1b[0m` });
      group.items.forEach((item) => {
        lines.push({ type: "output", text: `  \x1b[36m│\x1b[0m  \x1b[32m▸\x1b[0m ${item}` });
      });
      lines.push({ type: "output", text: `  \x1b[36m└────────────────────\x1b[0m` });
      lines.push({ type: "output", text: "" });
    });
    return lines;
  }

  // projects
  if (cmd === "projects") {
    const lines: OutputLine[] = [{ type: "output", text: "" }];
    PROJECTS.forEach((p, i) => {
      lines.push({ type: "output", text: `  \x1b[32m[${i + 1}]\x1b[0m \x1b[36m${p.name}\x1b[0m` });
      lines.push({ type: "output", text: `      ${p.desc}` });
      lines.push({ type: "output", text: "" });
    });
    return lines;
  }

  // certifications
  if (cmd === "certifications" || cmd === "certs") {
    const lines: OutputLine[] = [
      { type: "output", text: "" },
      { type: "output", text: "\x1b[32m  Active Certifications:\x1b[0m" },
      { type: "output", text: "  ─────────────────────────────────────" },
    ];
    CERTIFICATIONS.forEach((c) => {
      lines.push({ type: "output", text: `  \x1b[36m▸\x1b[0m ${c.name}` });
      lines.push({ type: "output", text: `    \x1b[35m${c.url}\x1b[0m` });
    });
    lines.push({ type: "output", text: "" });
    return lines;
  }

  // education
  if (cmd === "education") {
    return [
      { type: "output", text: "" },
      { type: "output", text: "\x1b[32m  Education:\x1b[0m" },
      { type: "output", text: "  ─────────────────────────────────────" },
      { type: "output", text: "  \x1b[36m▸\x1b[0m Integrated M.Tech in Information Technology" },
      { type: "output", text: "    Indian Institute of Information Technology, Gwalior" },
      { type: "output", text: "    Expected Graduation: 2028" },
      { type: "output", text: "" },
    ];
  }

  // contact
  if (cmd === "contact") {
    return [
      { type: "output", text: "" },
      { type: "output", text: "\x1b[32m  Contact Information:\x1b[0m" },
      { type: "output", text: "  ─────────────────────────────────────" },
      { type: "output", text: "  \x1b[36m📧 Email:\x1b[0m    sudarshanajoysindhu@gmail.com" },
      { type: "output", text: "  \x1b[36m🐙 GitHub:\x1b[0m   github.com/sudu787" },
      { type: "output", text: "  \x1b[36m🔗 LinkedIn:\x1b[0m linkedin.com/in/sudarshan787" },
      { type: "output", text: "" },
    ];
  }

  // resume
  if (cmd === "resume") {
    if (typeof window !== "undefined") {
      const a = document.createElement("a");
      a.href = "/resume.pdf";
      a.download = "Sudarshan_Sindhu_CV.pdf";
      a.click();
    }
    return [
      { type: "output", text: "" },
      { type: "output", text: "\x1b[32m  [✓] Downloading resume...\x1b[0m" },
      { type: "output", text: "" },
    ];
  }

  // neofetch
  if (cmd === "neofetch") {
    return NEOFETCH_ART.split("\n").map((line) => ({
      type: "output" as const,
      text: line,
    }));
  }

  // clear — handled separately in the component
  if (cmd === "clear") {
    return [{ type: "system", text: "__CLEAR__" }];
  }

  // echo
  if (cmd === "echo") {
    const rest = trimmed.slice(5);
    return [{ type: "output", text: rest }];
  }

  // sudo hire-me
  if (lower === "sudo hire-me") {
    return [
      { type: "output", text: "" },
      { type: "output", text: "\x1b[32m  [sudo] password for recruiter: ********\x1b[0m" },
      { type: "output", text: "" },
      { type: "output", text: "  \x1b[33m⚡ ACCESS GRANTED ⚡\x1b[0m" },
      { type: "output", text: "" },
      { type: "output", text: "  Loading offer_letter.pdf... \x1b[32m[████████████████████] 100%\x1b[0m" },
      { type: "output", text: "" },
      { type: "output", text: "  Just kidding — but seriously, I'm available! 🚀" },
      { type: "output", text: "  Reach out at \x1b[36msudarshanajoysindhu@gmail.com\x1b[0m" },
      { type: "output", text: "" },
    ];
  }

  // unknown
  return [
    { type: "error", text: `  bash: ${parts[0]}: command not found` },
    { type: "output", text: '  Type \x1b[36m"help"\x1b[0m for a list of commands.' },
    { type: "output", text: "" },
  ];
}

/* ───────────────────── component ───────────────────── */

export default function Terminal() {
  const [lines, setLines] = useState<OutputLine[]>([]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [booted, setBooted] = useState(false);
  const [isBooting, setIsBooting] = useState(true);

  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [lines]);

  // Boot sequence
  useEffect(() => {
    if (booted) return;

    const timeouts: NodeJS.Timeout[] = [];
    BOOT_LINES.forEach((bl, i) => {
      const t = setTimeout(() => {
        setLines((prev) => [...prev, { type: "system", text: bl.text }]);
        if (i === BOOT_LINES.length - 1) {
          setBooted(true);
          setIsBooting(false);
          setTimeout(() => inputRef.current?.focus(), 100);
        }
      }, bl.delay);
      timeouts.push(t);
    });

    return () => timeouts.forEach(clearTimeout);
  }, [booted]);

  const focusInput = useCallback(() => {
    if (!isBooting) inputRef.current?.focus();
  }, [isBooting]);

  const submitCommand = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "ArrowUp") {
        e.preventDefault();
        if (history.length === 0) return;
        const nextIdx = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(nextIdx);
        setInput(history[nextIdx]);
        return;
      }
      if (e.key === "ArrowDown") {
        e.preventDefault();
        if (historyIndex === -1) return;
        const nextIdx = historyIndex + 1;
        if (nextIdx >= history.length) {
          setHistoryIndex(-1);
          setInput("");
        } else {
          setHistoryIndex(nextIdx);
          setInput(history[nextIdx]);
        }
        return;
      }
      if (e.key === "Enter") {
        const val = input;
        const inputLine: OutputLine = { type: "input", text: val };

        // add to history
        if (val.trim()) {
          setHistory((prev) => [...prev, val]);
        }
        setHistoryIndex(-1);

        const result = handleCommand(val);

        // handle clear
        if (result.length === 1 && result[0].text === "__CLEAR__") {
          setLines([]);
        } else {
          setLines((prev) => [...prev, inputLine, ...result]);
        }

        setInput("");
      }
    },
    [input, history, historyIndex]
  );

  /* ─── render ─── */
  return (
    <section id="terminal" className="py-20">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-3xl font-bold mb-12 flex items-center gap-2"
        >
          <span className="text-primary">04.</span> Interactive Terminal
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          onClick={focusInput}
          className="relative rounded-xl overflow-hidden border border-white/10 cursor-text"
          style={{
            boxShadow: "0 0 40px rgba(0,255,157,0.08), 0 0 80px rgba(0,255,157,0.04)",
          }}
        >
          {/* ── Title bar ── */}
          <div className="flex items-center gap-2 px-4 py-3 bg-[#1a1a2e] border-b border-white/10 select-none">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
              <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
              <div className="w-3 h-3 rounded-full bg-[#28c840]" />
            </div>
            <span className="ml-3 text-xs font-mono text-gray-500">
              sudarshan@kali:~
            </span>
          </div>

          {/* ── Terminal body ── */}
          <div
            ref={scrollRef}
            className="relative bg-[#0d1117] p-5 font-mono text-sm leading-relaxed overflow-y-auto"
            style={{ height: "420px" }}
          >
            {/* Scanline overlay */}
            <div
              className="pointer-events-none absolute inset-0 z-10"
              style={{
                background:
                  "repeating-linear-gradient(0deg, rgba(0,255,157,0.015) 0px, rgba(0,255,157,0.015) 1px, transparent 1px, transparent 3px)",
              }}
            />

            {/* Lines */}
            <div className="relative z-20">
              {lines.map((line, i) => (
                <div key={i} className="min-h-[1.375rem]">
                  {line.type === "input" ? (
                    <span>
                      <span className="text-[#00ff9d]">sudarshan@kali</span>
                      <span className="text-gray-500">:</span>
                      <span className="text-[#00f0ff]">~</span>
                      <span className="text-gray-500">$ </span>
                      <span className="text-gray-300">{line.text}</span>
                    </span>
                  ) : line.type === "error" ? (
                    <span className="text-[#ff5555]">{parseAnsi(line.text)}</span>
                  ) : (
                    <span className="text-gray-400 whitespace-pre">{parseAnsi(line.text)}</span>
                  )}
                </div>
              ))}

              {/* Active input line */}
              {!isBooting && (
                <div className="flex items-center min-h-[1.375rem]">
                  <span className="text-[#00ff9d]">sudarshan@kali</span>
                  <span className="text-gray-500">:</span>
                  <span className="text-[#00f0ff]">~</span>
                  <span className="text-gray-500">$ </span>
                  <span className="text-gray-300">{input}</span>
                  <span
                    className="inline-block w-[8px] h-[18px] bg-[#00ff9d] ml-px"
                    style={{ animation: "blink 1s step-end infinite" }}
                  />
                  <input
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={submitCommand}
                    className="absolute opacity-0 w-0 h-0"
                    autoCapitalize="off"
                    autoComplete="off"
                    autoCorrect="off"
                    spellCheck={false}
                  />
                </div>
              )}
            </div>
          </div>

          {/* ── Bottom hint bar ── */}
          <div className="flex items-center justify-between px-4 py-2 bg-[#1a1a2e] border-t border-white/10 text-[10px] font-mono text-gray-600 select-none">
            <span>↑↓ history &nbsp;·&nbsp; type &quot;help&quot; for commands</span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#28c840] animate-pulse" />
              connected
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
