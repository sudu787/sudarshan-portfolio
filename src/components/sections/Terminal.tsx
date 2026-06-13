"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";

/* ───────────────────────── VFS data ───────────────────────── */

const VFS: Record<string, { type: "dir" | "file"; content?: string[] }> = {
  "~": { type: "dir" },
  "~/projects": { type: "dir" },
  "~/about.txt": { 
    type: "file", 
    content: [
      "\x1b[32mSudarshan Ajoy Sindhu\x1b[0m",
      "Red Team Specialist | Cybersecurity Researcher",
      "",
      "Integrated M.Tech in IT @ IIITM Gwalior (Expected 2028)",
      "Specializing in Malware Analysis, Web/API Pentesting,",
      "and Cloud Security. Active member of Zero Day Club IIITM.",
    ] 
  },
  "~/skills.txt": { 
    type: "file", 
    content: [
      "\x1b[36m┌─ Reverse Engineering ─\x1b[0m",
      "\x1b[36m│\x1b[0m  \x1b[32m▸\x1b[0m Ghidra, x64dbg, Assembly (ASM), ProcMon, Malware Analysis",
      "\x1b[36m└────────────────────\x1b[0m",
      "",
      "\x1b[36m┌─ Offensive Security ─\x1b[0m",
      "\x1b[36m│\x1b[0m  \x1b[32m▸\x1b[0m Burp Suite, Metasploit, Nmap, Wireshark, Web/Network Pentesting",
      "\x1b[36m└────────────────────\x1b[0m",
      "",
      "\x1b[36m┌─ Development ─\x1b[0m",
      "\x1b[36m│\x1b[0m  \x1b[32m▸\x1b[0m Python, C/C++, JavaScript, Flask, Bash Scripting",
      "\x1b[36m└────────────────────\x1b[0m",
      "",
      "\x1b[36m┌─ Cloud & Ops ─\x1b[0m",
      "\x1b[36m│\x1b[0m  \x1b[32m▸\x1b[0m Google Cloud SCC, Linux Administration, Git/GitHub, MySQL, VS Code",
      "\x1b[36m└────────────────────\x1b[0m",
    ] 
  },
  "~/certs.txt": { 
    type: "file", 
    content: [
      "\x1b[32mActive Certifications:\x1b[0m",
      "─────────────────────────────────────",
      "\x1b[36m▸\x1b[0m Google Cloud Security",
      "\x1b[36m▸\x1b[0m Cisco Ethical Hacker",
      "\x1b[36m▸\x1b[0m IBM Malware Analysis",
      "\x1b[36m▸\x1b[0m ISO/IEC 27001",
      "\x1b[36m▸\x1b[0m API Security Fundamentals",
    ] 
  },
  "~/contact.txt": { 
    type: "file", 
    content: [
      "\x1b[32mContact Information:\x1b[0m",
      "─────────────────────────────────────",
      "\x1b[36m📧 Email:\x1b[0m    sudarshanajoysindhu@gmail.com",
      "\x1b[36m🐙 GitHub:\x1b[0m   github.com/sudu787",
      "\x1b[36m🔗 LinkedIn:\x1b[0m linkedin.com/in/sudarshan787",
    ] 
  },
  "~/resume.pdf": { 
    type: "file", 
    content: [
      "\x1b[31mError: Cannot display binary file in terminal.\x1b[0m",
      "Please run \x1b[36mresume\x1b[0m command to download the file directly.",
    ] 
  },
  "~/projects/phishing_detector.txt": { 
    type: "file", 
    content: [
      "\x1b[32mPhishing Detector Chrome Extension\x1b[0m",
      "Real-time cybersecurity browser extension powered by DistilBERT NLP + XGBoost + LLM SOC Analyst via FastAPI",
    ] 
  },
  "~/projects/pentest_reporter.txt": { 
    type: "file", 
    content: [
      "\x1b[32mPentest Reporter\x1b[0m",
      "Full-stack security reporting platform with FastAPI, Next.js, Docker, PostgreSQL, and Google OAuth 2.0 / OTP login.",
    ] 
  },
  "~/projects/home_lab.txt": { 
    type: "file", 
    content: [
      "\x1b[32mHome Lab & Network Defense\x1b[0m",
      "Self-hosted IDS/monitoring environment for Blue Team operations and log analysis",
    ] 
  },
};

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
                                                \x1b[32mStatus:\x1b[0m  Open to Opportunities
`;

const BOOT_LINES = [
  { text: "BIOS v2.4.1 — Initializing hardware...", delay: 0 },
  { text: "[  OK  ] Loaded kernel: red-team-v2.0", delay: 200 },
  { text: "[  OK  ] Mounted virtual filesystem", delay: 350 },
  { text: "[  OK  ] Started Network Reconnaissance Service", delay: 500 },
  { text: "[  OK  ] Reached target: Multi-User System", delay: 800 },
  { text: "", delay: 950 },
  { text: "Welcome to Sudarshan's Terminal v3.0 (VFS Edition)", delay: 1100 },
  { text: 'Type "help" to see available commands.\n', delay: 1300 },
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

function resolvePath(cwd: string, target: string): string | null {
  if (!target || target === "~" || target === "/") return "~";
  
  let path = target;
  if (path.startsWith("/")) path = "~" + path;
  if (!path.startsWith("~")) path = cwd === "~" ? `~/${path}` : `${cwd}/${path}`;
  
  const parts = path.replace(/^~/, "").split("/").filter(Boolean);
  const resolved: string[] = [];
  
  for (const p of parts) {
    if (p === ".") continue;
    if (p === "..") {
      resolved.pop();
    } else {
      resolved.push(p);
    }
  }
  
  const finalPath = "~" + (resolved.length ? "/" + resolved.join("/") : "");
  return finalPath;
}

function getDirContents(dirPath: string) {
  const prefix = dirPath === "~" ? "~/" : `${dirPath}/`;
  return Object.keys(VFS)
    .filter(k => k.startsWith(prefix) && k !== dirPath)
    .map(k => k.substring(prefix.length))
    .filter(k => !k.includes("/")); 
}

/* ───────────────────── component ───────────────────── */

export default function Terminal() {
  const [lines, setLines] = useState<OutputLine[]>([]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [booted, setBooted] = useState(false);
  const [isBooting, setIsBooting] = useState(true);
  const [cwd, setCwd] = useState("~");

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
        const val = input.trim();
        const inputLine: OutputLine = { type: "input", text: val };

        if (val) setHistory((prev) => [...prev, val]);
        setHistoryIndex(-1);
        setInput("");

        if (!val) {
          setLines((prev) => [...prev, { type: "input", text: "" }]);
          return;
        }

        const parts = val.split(/\s+/);
        const cmd = parts[0].toLowerCase();
        const args = parts.slice(1);
        let output: OutputLine[] = [];

        // ─── Linux Commands ───

        if (cmd === "pwd") {
          output = [{ type: "output", text: `  /home/sudarshan${cwd.replace(/^~/, "")}` }];
        } 
        else if (cmd === "ls") {
          const target = args[0] || ".";
          const resolved = resolvePath(cwd, target);
          if (!resolved || !VFS[resolved]) {
            output = [{ type: "error", text: `  ls: cannot access '${target}': No such file or directory` }];
          } else if (VFS[resolved].type === "file") {
            output = [{ type: "output", text: `  ${target}` }];
          } else {
            const contents = getDirContents(resolved);
            const formatted = contents.map(item => {
              const fullPath = resolved === "~" ? `~/${item}` : `${resolved}/${item}`;
              return VFS[fullPath]?.type === "dir" ? `\x1b[36m${item}/\x1b[0m` : item;
            }).join("  ");
            output = [{ type: "output", text: `  ${formatted}` }];
          }
        } 
        else if (cmd === "cd") {
          const target = args[0] || "~";
          const resolved = resolvePath(cwd, target);
          if (!resolved || !VFS[resolved]) {
            output = [{ type: "error", text: `  cd: ${target}: No such file or directory` }];
          } else if (VFS[resolved].type === "file") {
            output = [{ type: "error", text: `  cd: ${target}: Not a directory` }];
          } else {
            setCwd(resolved);
          }
        } 
        else if (cmd === "cat") {
          if (!args[0]) {
            output = [{ type: "error", text: "  cat: missing operand" }];
          } else {
            const resolved = resolvePath(cwd, args[0]);
            if (!resolved || !VFS[resolved]) {
              output = [{ type: "error", text: `  cat: ${args[0]}: No such file or directory` }];
            } else if (VFS[resolved].type === "dir") {
              output = [{ type: "error", text: `  cat: ${args[0]}: Is a directory` }];
            } else {
              output = [
                { type: "output", text: "" },
                ...(VFS[resolved].content || []).map((text) => ({ type: "output" as const, text: `  ${text}` })),
                { type: "output", text: "" },
              ];
            }
          }
        }
        
        // ─── Legacy / Portfolio Commands ───
        
        else if (cmd === "help") {
          output = [
            { type: "output", text: "" },
            { type: "output", text: "\x1b[32m  Available Commands:\x1b[0m" },
            { type: "output", text: "  ─────────────────────────────────────" },
            { type: "output", text: "  \x1b[36mls [dir]\x1b[0m        List directory contents" },
            { type: "output", text: "  \x1b[36mcd <dir>\x1b[0m        Change directory" },
            { type: "output", text: "  \x1b[36mpwd\x1b[0m             Print working directory" },
            { type: "output", text: "  \x1b[36mcat <file>\x1b[0m      Read file content" },
            { type: "output", text: "  \x1b[36mhelp\x1b[0m            Show this help menu" },
            { type: "output", text: "  \x1b[36mwhoami\x1b[0m          Display profile info" },
            { type: "output", text: "  \x1b[36mneofetch\x1b[0m        Display system info" },
            { type: "output", text: "  \x1b[36mresume\x1b[0m          Download resume PDF" },
            { type: "output", text: "  \x1b[36mclear\x1b[0m           Clear the terminal" },
            { type: "output", text: "  \x1b[36mecho <text>\x1b[0m     Echo back text" },
            { type: "output", text: "  \x1b[36msudo hire-me\x1b[0m    ???" },
            { type: "output", text: "" },
            { type: "output", text: "  \x1b[33mTip:\x1b[0m Try navigating the filesystem! Start with \x1b[36mls\x1b[0m" },
            { type: "output", text: "" },
          ];
        }
        else if (cmd === "whoami") {
          output = [
            { type: "output", text: "" },
            ...VFS["~/about.txt"].content!.map((text) => ({ type: "output" as const, text: `  ${text}` })),
            { type: "output", text: "" },
          ];
        }
        else if (cmd === "skills" || cmd === "projects" || cmd === "certs" || cmd === "contact") {
           output = [
             { type: "output", text: "" },
             { type: "output", text: `  \x1b[33mHint:\x1b[0m Command deprecated. Use \x1b[36mcat ${cmd === 'certs' ? 'certs' : cmd}.txt\x1b[0m instead.` },
             { type: "output", text: "" },
           ];
        }
        else if (cmd === "resume") {
          if (typeof window !== "undefined") {
            const a = document.createElement("a");
            a.href = "/resumeaiml.pdf";
            a.download = "Sudarshan_Sindhu_Resume.pdf";
            a.click();
          }
          output = [
            { type: "output", text: "" },
            { type: "output", text: "\x1b[32m  [✓] Downloading resume...\x1b[0m" },
            { type: "output", text: "" },
          ];
        }
        else if (cmd === "neofetch") {
          output = NEOFETCH_ART.split("\n").map((line) => ({
            type: "output" as const,
            text: line,
          }));
        }
        else if (cmd === "clear") {
          setLines([]);
          return;
        }
        else if (cmd === "echo") {
          const rest = val.slice(5);
          output = [{ type: "output", text: `  ${rest}` }];
        }
        else if (val.toLowerCase() === "sudo hire-me") {
          output = [
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
        else {
          output = [
            { type: "error", text: `  bash: ${cmd}: command not found` },
            { type: "output", text: '  Type \x1b[36m"help"\x1b[0m for a list of commands.' },
            { type: "output", text: "" },
          ];
        }

        setLines((prev) => [...prev, { type: "input", text: val, cwd }, ...output]);
      }
    },
    [input, history, historyIndex, cwd]
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
              sudarshan@kali:{cwd}
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
                      <span className="text-[#00f0ff]">{(line as any).cwd || cwd}</span>
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
                  <span className="text-[#00f0ff]">{cwd}</span>
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
