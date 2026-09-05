import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, ExternalLink, Terminal, Check, Copy, CornerDownLeft } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface HeroSectionProps {
  onOpenHireModal: () => void;
  onOpenResumeModal: () => void;
}

// Kinetic Typewriter component for the "sudo hire me" typography animation below IMAPCODE
const SudoTypewriterTypography: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  const fullText = 'sudo hire me';
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    let index = 0;
    let isDeleting = false;
    let timer: NodeJS.Timeout;

    const tick = () => {
      if (!isDeleting) {
        setDisplayText(fullText.slice(0, index + 1));
        index++;
        if (index === fullText.length) {
          timer = setTimeout(() => {
            isDeleting = true;
            timer = setTimeout(tick, 70);
          }, 3200);
          return;
        }
        timer = setTimeout(tick, 90);
      } else {
        setDisplayText(fullText.slice(0, index - 1));
        index--;
        if (index === 0) {
          isDeleting = false;
          timer = setTimeout(tick, 500);
          return;
        }
        timer = setTimeout(tick, 45);
      }
    };

    timer = setTimeout(tick, 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="mt-4 sm:mt-5 flex items-center justify-center"
    >
      <button
        onClick={onClick}
        className="group relative inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-zinc-950/80 border border-zinc-800/90 hover:border-emerald-500/60 transition-all duration-300 shadow-xl backdrop-blur-md cursor-pointer"
        title="Click to launch hire request"
      >
        {/* Glow ambient layer */}
        <span className="absolute inset-0 rounded-full bg-emerald-500/[0.04] group-hover:bg-emerald-500/[0.12] transition-colors" />

        <span className="font-mono font-bold text-xs text-emerald-400 group-hover:text-emerald-300">
          $
        </span>

        <span className="font-mono text-xs sm:text-sm font-semibold tracking-[0.22em] text-zinc-200 group-hover:text-white uppercase transition-colors">
          {displayText}
          <span className="inline-block w-1.5 h-3.5 bg-emerald-400 ml-1 translate-y-0.5 animate-pulse" />
        </span>

        <span className="text-[10px] font-mono text-zinc-500 group-hover:text-zinc-300 pl-1 border-l border-zinc-800 uppercase tracking-wider">
          init
        </span>
      </button>
    </motion.div>
  );
};

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenHireModal, onOpenResumeModal }) => {
  const [terminalInput, setTerminalInput] = useState('');
  const [historyCommands, setHistoryCommands] = useState<string[]>(['sudo hire me']);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [copiedTerminal, setCopiedTerminal] = useState(false);
  const terminalInputRef = useRef<HTMLInputElement>(null);

  const [terminalHistory, setTerminalHistory] = useState<Array<{ cmd: string; output: string | React.ReactNode }>>([
    {
      cmd: 'sudo hire me',
      output: (
        <div className="space-y-1.5 text-zinc-200">
          <div className="text-emerald-400 font-semibold flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            [ACCESS GRANTED] Root developer candidate online & ready for deployment.
          </div>
          <p className="text-zinc-400 text-xs">
            Direct channel: <span className="text-white font-mono">{PERSONAL_INFO.email}</span>
          </p>
          <button
            onClick={onOpenHireModal}
            className="mt-1.5 inline-flex items-center gap-1.5 px-3 py-1 bg-white text-zinc-950 font-mono font-semibold text-xs rounded-md hover:bg-zinc-200 transition-colors shadow-sm"
          >
            <span>Launch Hire Request Form</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      ),
    },
  ]);

  const AVAILABLE_COMMANDS = [
    'sudo hire me',
    'skills',
    'projects',
    'whoami',
    'about',
    'contact',
    'uptime',
    'matrix',
    'resume',
    'date',
    'help',
    'clear',
  ];

  const executeCommand = (cmdToRun: string) => {
    const raw = cmdToRun.trim().toLowerCase();
    let res: string | React.ReactNode = '';

    if (raw === 'sudo hire me' || raw === 'hire' || raw === 'hire me') {
      res = (
        <div className="space-y-1.5 text-zinc-200">
          <div className="text-emerald-400 font-semibold flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            [ACCESS GRANTED] Ready to build resilient web apps & systems architecture.
          </div>
          <div className="text-zinc-400 text-xs">
            Direct email: <span className="text-zinc-200">{PERSONAL_INFO.email}</span>
          </div>
          <div className="flex flex-wrap gap-2 pt-1">
            <button
              onClick={onOpenHireModal}
              className="px-3 py-1 bg-emerald-400 text-zinc-950 font-mono font-bold text-xs rounded hover:bg-emerald-300 transition-colors"
            >
              Open Hire Proposal →
            </button>
            <button
              onClick={onOpenResumeModal}
              className="px-3 py-1 bg-zinc-800 text-zinc-200 font-mono text-xs rounded hover:bg-zinc-700 transition-colors"
            >
              View Resume
            </button>
          </div>
        </div>
      );
    } else if (raw === 'skills' || raw === 'cat skills.txt') {
      res = (
        <div className="space-y-1.5">
          <div className="text-zinc-400 text-[11px] uppercase tracking-wider">Engineered Technologies:</div>
          <div className="flex flex-wrap gap-1.5 pt-0.5">
            {[
              'TypeScript',
              'React',
              'Node.js',
              'Go',
              'Rust',
              'Distributed Systems',
              'PostgreSQL',
              'Redis',
              'Docker',
              'AWS / GCP',
              'GraphQL',
              'Tailwind CSS',
            ].map((skill) => (
              <span
                key={skill}
                className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs font-mono"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      );
    } else if (raw === 'whoami') {
      res = (
        <div className="space-y-1">
          <div className="text-white font-semibold">alex@imapcode (uid=1000, gid=1000)</div>
          <div className="text-zinc-400 text-xs">
            Role: Full-Stack Craftsman & Distributed Systems Software Engineer.
          </div>
          <div className="text-zinc-400 text-xs">Status: Available for full-stack engineering & contracts.</div>
        </div>
      );
    } else if (raw === 'about' || raw === 'cat about.txt' || raw === 'bio') {
      res = PERSONAL_INFO.shortBio;
    } else if (raw === 'projects' || raw === 'ls projects' || raw === 'ls') {
      res = (
        <div className="space-y-1.5">
          <div className="text-zinc-400 text-[11px] uppercase tracking-wider">Selected Works:</div>
          <ul className="space-y-1 text-xs text-zinc-300">
            <li>
              <span className="text-emerald-400 font-semibold">• Synapse Queue:</span> High-throughput distributed task broker.
            </li>
            <li>
              <span className="text-emerald-400 font-semibold">• Nexus Cloud Studio:</span> Real-time collaborative infrastructure IDE.
            </li>
            <li>
              <span className="text-emerald-400 font-semibold">• Sentinel AI:</span> Edge-deployed LLM evaluation agent.
            </li>
            <li>
              <span className="text-emerald-400 font-semibold">• HyperState Canvas:</span> 60fps infinite collaborative canvas engine.
            </li>
          </ul>
          <a
            href="#projects"
            className="inline-block mt-1 text-emerald-400 hover:text-emerald-300 text-xs underline underline-offset-4"
          >
            Scroll to interactive project showcase ↓
          </a>
        </div>
      );
    } else if (raw === 'contact') {
      res = (
        <div className="space-y-1 text-xs">
          <div>
            Email:{' '}
            <a href={`mailto:${PERSONAL_INFO.email}`} className="text-emerald-400 hover:underline">
              {PERSONAL_INFO.email}
            </a>
          </div>
          <div>
            GitHub:{' '}
            <a href="https://github.com/imapcode" target="_blank" rel="noreferrer" className="text-emerald-400 hover:underline">
              github.com/imapcode
            </a>
          </div>
        </div>
      );
    } else if (raw === 'uptime') {
      res = 'up 1,460 days, 28 production deployments, 99.98% SLA, load average: 0.04, 0.02, 0.01';
    } else if (raw === 'date') {
      res = new Date().toUTCString();
    } else if (raw === 'matrix') {
      res = (
        <div className="text-emerald-500 font-mono text-xs leading-none tracking-widest select-none">
          <div>01001001 01001101 01000001 01010000 01000011 01001111 01000100 01000101</div>
          <div className="mt-1 text-emerald-400 font-bold">Wake up, engineer... Follow the white rabbit.</div>
        </div>
      );
    } else if (raw === 'sudo rm -rf /' || raw === 'rm -rf /') {
      res = (
        <span className="text-rose-400 font-semibold">
          [SECURITY PROTOCOL] Nice try! The core filesystem is immutable and protected by Sentinel AI.
        </span>
      );
    } else if (raw === 'curl resume' || raw === 'resume') {
      onOpenResumeModal();
      res = 'Opening verified resume document...';
    } else if (raw === 'clear') {
      setTerminalHistory([]);
      setTerminalInput('');
      return;
    } else if (raw === 'help') {
      res = (
        <div className="space-y-1.5">
          <div className="text-zinc-400 text-[11px] uppercase tracking-wider">Available Interactive Commands:</div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-1 text-xs font-mono">
            {AVAILABLE_COMMANDS.filter((c) => c !== 'help').map((cmd) => (
              <button
                key={cmd}
                onClick={() => executeCommand(cmd)}
                className="text-left text-zinc-300 hover:text-emerald-400 transition-colors cursor-pointer"
              >
                $ {cmd}
              </button>
            ))}
          </div>
        </div>
      );
    } else {
      res = `command not found: "${raw}". Try "sudo hire me" or "help".`;
    }

    setTerminalHistory((prev) => [...prev, { cmd: cmdToRun, output: res }]);
    setHistoryCommands((prev) => [...prev, cmdToRun]);
    setHistoryIndex(-1);
    setTerminalInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && terminalInput.trim()) {
      executeCommand(terminalInput);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyCommands.length === 0) return;
      const nextIndex = historyIndex === -1 ? historyCommands.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIndex);
      setTerminalInput(historyCommands[nextIndex]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex === -1) return;
      const nextIndex = historyIndex + 1;
      if (nextIndex >= historyCommands.length) {
        setHistoryIndex(-1);
        setTerminalInput('');
      } else {
        setHistoryIndex(nextIndex);
        setTerminalInput(historyCommands[nextIndex]);
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const match = AVAILABLE_COMMANDS.find((c) => c.startsWith(terminalInput.toLowerCase()));
      if (match) {
        setTerminalInput(match);
      }
    }
  };

  const handleCopyTerminal = () => {
    const textToCopy = terminalHistory
      .map((item) => `$ ${item.cmd}`)
      .join('\n');
    navigator.clipboard.writeText(textToCopy);
    setCopiedTerminal(true);
    setTimeout(() => setCopiedTerminal(false), 1800);
  };

  return (
    <section id="home" className="relative pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden">
      {/* Soft atmospheric gradient */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-white/[0.025] blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-4xl mx-auto px-6 relative">
        <div className="flex flex-col items-center text-center">

          {/* Website Name: IMAPCODE */}
          <motion.h1
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-6xl sm:text-8xl md:text-9xl font-cinematic font-black tracking-tight text-white select-none leading-none"
          >
            {PERSONAL_INFO.name}
          </motion.h1>

          {/* Typography Animation: SUDO HIRE ME below IMAPCODE */}
          <SudoTypewriterTypography onClick={onOpenHireModal} />

          {/* Actions - Boxed Control Bar with View Projects, sudo hire me, and Resume */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="flex justify-center mt-7"
          >
            <div className="inline-flex flex-wrap items-center justify-center gap-2 p-1.5 rounded-2xl bg-zinc-950/80 border border-zinc-800/90 shadow-2xl backdrop-blur-md">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-zinc-950 font-medium text-xs tracking-wider uppercase hover:bg-zinc-200 transition-all shadow-md group"
              >
                <span>View Projects</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </a>

              <button
                onClick={onOpenHireModal}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-200 font-mono text-xs tracking-wider hover:bg-zinc-800 hover:text-white hover:border-zinc-600 transition-all"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>sudo hire me</span>
              </button>

              <button
                onClick={onOpenResumeModal}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-zinc-400 font-medium text-xs tracking-wider uppercase hover:text-white hover:bg-zinc-900/60 transition-colors"
              >
                <span>Resume</span>
                <ExternalLink className="w-3 h-3 opacity-60" />
              </button>
            </div>
          </motion.div>

          {/* HIGHLY INTERACTIVE DEVELOPER TERMINAL */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.38 }}
            className="w-full max-w-2xl mt-12 rounded-xl bg-zinc-950/90 border border-zinc-800/90 text-left overflow-hidden shadow-2xl backdrop-blur-md"
            onClick={() => terminalInputRef.current?.focus()}
          >
            {/* Terminal Bar */}
            <div className="px-4 py-2.5 bg-zinc-900/80 border-b border-zinc-800/80 flex items-center justify-between text-xs text-zinc-400 font-mono">
              <div className="flex items-center gap-2">
                <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-[11px] text-zinc-300 font-semibold">imapcode@runtime: ~</span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCopyTerminal();
                  }}
                  className="text-zinc-500 hover:text-zinc-300 text-[11px] flex items-center gap-1 transition-colors cursor-pointer"
                  title="Copy commands"
                >
                  {copiedTerminal ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedTerminal ? 'Copied' : 'Copy'}</span>
                </button>
                <div className="flex gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-zinc-700" />
                  <span className="w-2 h-2 rounded-full bg-zinc-700" />
                  <span className="w-2 h-2 rounded-full bg-zinc-700" />
                </div>
              </div>
            </div>

            {/* Terminal Body */}
            <div className="p-4 sm:p-5 font-mono text-xs sm:text-sm space-y-3">
              {/* Quick Interactive Command Suggestion Chips */}
              <div className="flex flex-wrap items-center gap-1.5 pb-1">
                <span className="text-[10px] text-zinc-500 uppercase tracking-wider mr-1">Quick:</span>
                {['sudo hire me', 'skills', 'projects', 'whoami', 'matrix', 'clear'].map((cmd) => (
                  <button
                    key={cmd}
                    onClick={(e) => {
                      e.stopPropagation();
                      executeCommand(cmd);
                    }}
                    className="px-2 py-0.5 rounded bg-zinc-900/90 border border-zinc-800 text-zinc-400 hover:text-emerald-400 hover:border-emerald-500/40 text-[11px] transition-colors cursor-pointer"
                  >
                    $ {cmd}
                  </button>
                ))}
              </div>

              {/* History output */}
              {terminalHistory.map((item, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex items-center gap-2 text-zinc-400">
                    <span className="text-emerald-500 font-bold">$</span>
                    <span className="text-white font-medium">{item.cmd}</span>
                  </div>
                  <div className="text-zinc-300 pl-3 border-l-2 border-zinc-800 text-xs sm:text-sm leading-relaxed">
                    {item.output}
                  </div>
                </div>
              ))}

              {/* Active input row */}
              <div className="flex items-center gap-2 text-zinc-300 pt-1.5 border-t border-zinc-900/90">
                <span className="text-emerald-400 font-bold">$</span>
                <input
                  ref={terminalInputRef}
                  type="text"
                  value={terminalInput}
                  onChange={(e) => setTerminalInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="type 'help', 'skills', or 'sudo hire me'..."
                  className="flex-1 bg-transparent border-none outline-none text-emerald-300 placeholder:text-zinc-600 text-xs sm:text-sm font-mono"
                  autoComplete="off"
                  spellCheck="false"
                />
                <button
                  onClick={() => terminalInput.trim() && executeCommand(terminalInput)}
                  className="text-zinc-500 hover:text-emerald-400 transition-colors p-1"
                  title="Run command"
                >
                  <CornerDownLeft className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="text-[10px] text-zinc-600 flex items-center justify-between pt-1">
                <span>Tab to autocomplete · ↑ / ↓ for history</span>
                <span>Type 'help' for full command catalog</span>
              </div>
            </div>
          </motion.div>

          {/* Minimal Key Stats Row */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-10 mt-14 w-full max-w-2xl border-t border-zinc-900 pt-8"
          >
            {PERSONAL_INFO.stats.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-2xl sm:text-3xl font-cinematic font-bold text-white tracking-wide">
                  {stat.value}
                </div>
                <div className="text-xs text-zinc-400 uppercase tracking-wider mt-1 font-mono">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
};
