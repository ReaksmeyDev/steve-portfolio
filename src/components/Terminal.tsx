import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Terminal as TerminalIcon, Sparkles, Play, CornerDownLeft } from 'lucide-react';

interface HistoryItem {
  command: string;
  output: string | React.ReactNode;
}

export const Terminal: React.FC = React.memo(() => {
  const [history, setHistory] = useState<HistoryItem[]>([
    {
      command: 'whoami',
      output: (
        <span className="text-slate-300">
          <span className="text-cyan-400 font-bold">Steve</span> &bull; Full-Stack & Mobile Developer based in <span className="text-cyan-300">Phnom Penh, Cambodia</span>
        </span>
      ),
    },
    {
      command: 'status',
      output: (
        <span className="text-cyan-400 flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span>Available for full-time engineering roles, high-impact contracts & consulting.</span>
        </span>
      ),
    },
  ]);

  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [activeRunningCmd, setActiveRunningCmd] = useState<string | null>(null);

  // Command history navigation (ArrowUp / ArrowDown)
  const commandHistoryRef = useRef<string[]>(['whoami', 'status']);
  const [historyPointer, setHistoryPointer] = useState<number>(-1);

  const outputContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const typingTimerRef = useRef<NodeJS.Timeout | null>(null);
  const typingIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const quickCommands = ['whoami', 'about', 'skills', 'projects', 'experience', 'services', 'status', 'contact', 'clear'];
  const availableCommands = [
    'help',
    'whoami',
    'about',
    'skills',
    'projects',
    'experience',
    'services',
    'status',
    'contact',
    'ls',
    'pwd',
    'date',
    'clear',
  ];

  // Clean up timers on unmount
  useEffect(() => {
    return () => {
      if (typingTimerRef.current) clearTimeout(typingTimerRef.current);
      if (typingIntervalRef.current) clearInterval(typingIntervalRef.current);
    };
  }, []);

  // Cancel simulateTyping if user starts typing manually
  const cancelSimulation = useCallback(() => {
    if (typingIntervalRef.current) clearInterval(typingIntervalRef.current);
    if (typingTimerRef.current) clearTimeout(typingTimerRef.current);
    setIsTyping(false);
    setActiveRunningCmd(null);
  }, []);

  const executeCmd = useCallback((cmdText: string) => {
    const rawCmd = cmdText.trim();
    const cmd = rawCmd.toLowerCase();
    if (!cmd) return;

    // Track command in history for ArrowUp/Down navigation
    commandHistoryRef.current.push(rawCmd);
    setHistoryPointer(-1);

    let response: string | React.ReactNode = '';

    if (cmd === 'help') {
      response = (
        <div className="space-y-1.5 text-xs text-slate-300">
          <div className="text-cyan-400 font-semibold">Available Commands:</div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-1 text-[11px] sm:text-xs">
            <div><span className="text-cyan-300 font-bold cursor-pointer hover:underline" onClick={() => simulateTyping('whoami')}>whoami</span> &mdash; Intro</div>
            <div><span className="text-cyan-300 font-bold cursor-pointer hover:underline" onClick={() => simulateTyping('about')}>about</span> &mdash; Bio</div>
            <div><span className="text-cyan-300 font-bold cursor-pointer hover:underline" onClick={() => simulateTyping('skills')}>skills</span> &mdash; Tech stack</div>
            <div><span className="text-cyan-300 font-bold cursor-pointer hover:underline" onClick={() => simulateTyping('projects')}>projects</span> &mdash; Builds</div>
            <div><span className="text-cyan-300 font-bold cursor-pointer hover:underline" onClick={() => simulateTyping('experience')}>experience</span> &mdash; Career</div>
            <div><span className="text-cyan-300 font-bold cursor-pointer hover:underline" onClick={() => simulateTyping('services')}>services</span> &mdash; Solutions</div>
            <div><span className="text-cyan-300 font-bold cursor-pointer hover:underline" onClick={() => simulateTyping('status')}>status</span> &mdash; Availability</div>
            <div><span className="text-cyan-300 font-bold cursor-pointer hover:underline" onClick={() => simulateTyping('contact')}>contact</span> &mdash; Reach out</div>
            <div><span className="text-cyan-300 font-bold cursor-pointer hover:underline" onClick={() => simulateTyping('ls')}>ls</span> &mdash; List files</div>
            <div><span className="text-cyan-300 font-bold cursor-pointer hover:underline" onClick={() => simulateTyping('pwd')}>pwd</span> &mdash; Current dir</div>
            <div><span className="text-cyan-300 font-bold cursor-pointer hover:underline" onClick={() => simulateTyping('clear')}>clear</span> &mdash; Reset screen</div>
          </div>
          <div className="text-[10px] text-slate-500 pt-0.5">
            Tip: Press <kbd className="px-1 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">Tab</kbd> to autocomplete &bull; <kbd className="px-1 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">↑</kbd> <kbd className="px-1 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">↓</kbd> for history
          </div>
        </div>
      );
    } else if (cmd === 'whoami') {
      response = (
        <span className="text-slate-300">
          <span className="text-cyan-400 font-bold">Steve</span> &mdash; Full-Stack Developer & Mobile Engineer (Laravel, React.js, Flutter, PostgreSQL, Linux) based in <span className="text-cyan-300">Phnom Penh, Cambodia</span>
        </span>
      );
    } else if (cmd === 'about') {
      response = (
        <div className="space-y-1 text-xs text-slate-300">
          <p>
            2+ years of software engineering building reliable web systems, scalable REST APIs, and fluid cross-platform mobile apps.
          </p>
          <div className="text-slate-400">
            Core stack: <strong className="text-cyan-300">Laravel / PHP 8+</strong> &bull; <strong className="text-cyan-300">React.js</strong> &bull; <strong className="text-cyan-300">Flutter / Dart</strong> &bull; <strong className="text-cyan-300">PostgreSQL</strong>
          </div>
        </div>
      );
    } else if (cmd === 'skills' || cmd === 'skills --list') {
      response = (
        <div className="space-y-1 text-xs">
          <div><span className="text-cyan-400 font-semibold">Mobile:</span> Flutter, Dart (iOS & Android)</div>
          <div><span className="text-cyan-400 font-semibold">Frontend:</span> React.js, TypeScript, Modern CSS/Tailwind</div>
          <div><span className="text-cyan-400 font-semibold">Backend:</span> Laravel, PHP 8+, Node.js, REST APIs</div>
          <div><span className="text-cyan-400 font-semibold">Databases:</span> PostgreSQL, MySQL, Relational Schemas</div>
          <div><span className="text-cyan-400 font-semibold">DevOps:</span> Linux Server Administration, Nginx, CI/CD</div>
        </div>
      );
    } else if (cmd === 'status') {
      response = (
        <span className="text-cyan-400 flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span>Active & available for full-time engineering roles, high-impact contracts & consulting.</span>
        </span>
      );
    } else if (cmd === 'projects') {
      response = (
        <div className="space-y-1.5 text-xs">
          <div><span className="text-cyan-400 font-semibold">1. School Management System</span> &mdash; Enterprise academic & administrative platform (Laravel + React)</div>
          <div><span className="text-cyan-400 font-semibold">2. Rules & Document Search App</span> &mdash; Cross-platform offline-ready legal query app (Flutter + Dart)</div>
          <div><span className="text-cyan-400 font-semibold">3. OCR Document Engine</span> &mdash; Automated cloud text extraction pipeline (Laravel + Cloud AI)</div>
          <div><span className="text-cyan-400 font-semibold">4. Documents Management System</span> &mdash; Centralized document archiving and indexing system (Laravel + MySQL)</div>
        </div>
      );
    } else if (cmd === 'experience') {
      response = (
        <div className="space-y-1 text-xs">
          <div><span className="text-cyan-400 font-semibold">Full-Stack Developer</span> &bull; Software Solutions Inc. (2024 - Present)</div>
          <div className="text-slate-400">Architected Laravel REST APIs, built Flutter mobile apps, optimized MySQL queries, and automated deployment pipelines.</div>
        </div>
      );
    } else if (cmd === 'services') {
      response = (
        <div className="space-y-1 text-xs">
          <div><span className="text-cyan-400 font-semibold">1. Web Application Development:</span> Production React.js & Laravel systems.</div>
          <div><span className="text-cyan-400 font-semibold">2. Cross-Platform Mobile Apps:</span> High-performance Flutter iOS & Android apps.</div>
          <div><span className="text-cyan-400 font-semibold">3. RESTful API & Backend Engineering:</span> Secure, transactional microservices.</div>
          <div><span className="text-cyan-400 font-semibold">4. Database Architecture & Optimization:</span> PostgreSQL & MySQL schema design.</div>
        </div>
      );
    } else if (cmd === 'contact') {
      response = (
        <span className="text-slate-300">
          Email: <a href="mailto:steve.code.dev@gmail.com" className="text-cyan-400 underline">steve.code.dev@gmail.com</a> | Telegram: <a href="https://t.me/stevejkj" target="_blank" rel="noreferrer" className="text-cyan-400 underline">@stevejkj</a> | Location: <span className="text-cyan-400">Phnom Penh, Cambodia</span>
        </span>
      );
    } else if (cmd === 'ls' || cmd === 'dir') {
      response = (
        <div className="space-y-1 text-xs font-mono">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-cyan-300">
            <span className="cursor-pointer hover:underline text-cyan-400" onClick={() => simulateTyping('about')}>about.md</span>
            <span className="cursor-pointer hover:underline text-cyan-400" onClick={() => simulateTyping('skills')}>skills.json</span>
            <span className="cursor-pointer hover:underline text-cyan-400" onClick={() => simulateTyping('projects')}>projects.txt</span>
            <span className="cursor-pointer hover:underline text-cyan-400" onClick={() => simulateTyping('contact')}>contact.txt</span>
          </div>
        </div>
      );
    } else if (cmd === 'pwd') {
      response = <span className="text-slate-300 font-mono">/home/steve/portfolio</span>;
    } else if (cmd === 'date') {
      response = <span className="text-slate-300 font-mono">{new Date().toLocaleString()} (Asia/Phnom_Penh GMT+7)</span>;
    } else if (cmd.startsWith('cat ')) {
      const target = cmd.replace('cat ', '').trim();
      if (target.includes('about')) {
        response = <span className="text-slate-300">Steve: Full-Stack Developer with 2+ years experience in Laravel, React, and Flutter.</span>;
      } else if (target.includes('skill')) {
        response = <span className="text-slate-300 font-mono">['Flutter', 'Dart', 'React', 'TypeScript', 'Laravel', 'PHP', 'PostgreSQL', 'MySQL']</span>;
      } else if (target.includes('contact')) {
        response = <span className="text-slate-300 font-mono">email: steve.code.dev@gmail.com | telegram: @stevejkj</span>;
      } else {
        response = <span className="text-slate-400 font-mono">File: {target} &mdash; Content loaded from portfolio data.</span>;
      }
    } else if (cmd.startsWith('sudo')) {
      response = <span className="text-cyan-300 font-bold font-mono">[sudo] Authorization granted: Welcome aboard! Steve is ready for high-impact production engineering.</span>;
    } else if (cmd === 'clear') {
      setHistory([]);
      setInputVal('');
      return;
    } else {
      response = (
        <span className="text-rose-400">
          Command not recognized: '{cmd}'. Type <span className="text-cyan-300 font-bold cursor-pointer underline" onClick={() => simulateTyping('help')}>'help'</span> for available commands.
        </span>
      );
    }

    setHistory((prev) => [...prev, { command: rawCmd, output: response }]);
    setInputVal('');
  }, []);

  // Simulate realistic typing when clicking quick command buttons
  const simulateTyping = (targetCmd: string) => {
    cancelSimulation();
    setIsTyping(true);
    setActiveRunningCmd(targetCmd);
    setInputVal('');

    let charIdx = 0;
    typingIntervalRef.current = setInterval(() => {
      charIdx++;
      if (charIdx <= targetCmd.length) {
        setInputVal(targetCmd.slice(0, charIdx));
      } else {
        if (typingIntervalRef.current) clearInterval(typingIntervalRef.current);
        typingTimerRef.current = setTimeout(() => {
          executeCmd(targetCmd);
          setIsTyping(false);
          setActiveRunningCmd(null);
          inputRef.current?.focus();
        }, 120);
      }
    }, 35);
  };

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (isTyping) return;
    executeCmd(inputVal);
  };

  // Keyboard navigation for command history & autocompletion
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // If simulation was running and user interacts, cancel simulation immediately
    if (isTyping) {
      cancelSimulation();
    }

    if (e.key === 'Tab') {
      e.preventDefault();
      const query = inputVal.trim().toLowerCase();
      if (!query) return;
      const match = availableCommands.find((c) => c.startsWith(query));
      if (match) {
        setInputVal(match);
      }
      return;
    }

    if (e.key === 'Escape') {
      e.preventDefault();
      setInputVal('');
      cancelSimulation();
      return;
    }

    const historyList = commandHistoryRef.current;
    if (historyList.length === 0) return;

    if (e.key === 'ArrowUp') {
      e.preventDefault();
      const nextPointer = historyPointer === -1 ? historyList.length - 1 : Math.max(historyPointer - 1, 0);
      setHistoryPointer(nextPointer);
      setInputVal(historyList[nextPointer] || '');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyPointer === -1) return;
      const nextPointer = historyPointer + 1;
      if (nextPointer >= historyList.length) {
        setHistoryPointer(-1);
        setInputVal('');
      } else {
        setHistoryPointer(nextPointer);
        setInputVal(historyList[nextPointer] || '');
      }
    }
  };

  // Auto-scroll the terminal output window
  useEffect(() => {
    if (outputContainerRef.current) {
      outputContainerRef.current.scrollTop = outputContainerRef.current.scrollHeight;
    }
  }, [history]);

  return (
    <section id="terminal" className="py-12 sm:py-20 relative overflow-hidden scroll-mt-20 sm:scroll-mt-24">
      {/* Background Accent (Pure Cyan) */}
      <div className="absolute top-0 left-1/4 w-[300px] h-[300px] bg-cyan-500/5 rounded-full blur-[90px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[250px] h-[250px] bg-cyan-600/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-left mb-6 sm:mb-8">
          {/* <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive CLI</span>
          </div> */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Developer <span className="gradient-text-animated">Terminal</span>
          </h2>
          {/* <p className="text-slate-400 text-sm sm:text-base mt-2">
            Click any quick action or type directly into the terminal to query live developer details. Press Tab to autocomplete, ↑/↓ for history.
          </p> */}
        </div>

        {/* Quick Action Interactive Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-4 font-mono text-xs">
          <span className="text-slate-500 text-[11px] mr-1 flex items-center gap-1">
            <Play className="w-3 h-3 text-cyan-400" />
            <span>Quick run:</span>
          </span>
          {quickCommands.map((cmd) => (
            <button
              key={cmd}
              type="button"
              disabled={isTyping && activeRunningCmd === cmd}
              onClick={() => simulateTyping(cmd)}
              className={`px-2.5 py-1 rounded-lg border transition-all duration-200 active:scale-95 flex items-center gap-1 ${
                activeRunningCmd === cmd
                  ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-[0_0_12px_rgba(34,211,238,0.3)] scale-105'
                  : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:text-cyan-300 hover:border-cyan-500/40 hover:bg-slate-800'
              }`}
            >
              <span className="text-cyan-400 font-semibold">$</span>
              <span>{cmd}</span>
            </button>
          ))}
        </div>

        {/* Terminal Window with CRT Scanline */}
        <div
          onClick={() => inputRef.current?.focus()}
          title="Click to focus CLI"
          className="tech-bracket-card terminal-window terminal-scanline rounded-2xl overflow-hidden font-mono text-[12px] sm:text-sm border border-slate-800/90 bg-[#0d1117] shadow-2xl cursor-text"
        >
          {/* Title Bar */}
          <div className="bg-[#161b22] px-4 py-3 border-b border-slate-800/90 flex items-center justify-between relative z-10">
            <div className="flex items-center gap-2.5">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-[#ff5f56] inline-block shadow-sm" />
                <span className="w-3 h-3 rounded-full bg-[#ffbd2e] inline-block shadow-sm" />
                <span className="w-3 h-3 rounded-full bg-[#27c93f] inline-block shadow-sm" />
              </div>
              <div className="flex items-center gap-2 ml-3 text-slate-300 text-xs">
                <TerminalIcon className="w-3.5 h-3.5 text-cyan-400" />
                <span>steve@workstation:~ (zsh)</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400" />
              </span>
              <div className="text-[11px] text-slate-400 bg-[#0d1117] px-2 py-0.5 rounded border border-slate-800">
                UTF-8
              </div>
            </div>
          </div>

          {/* Terminal Output Body with Animated Line Entries */}
          <div
            ref={outputContainerRef}
            className="p-4 sm:p-6 min-h-[230px] sm:min-h-[280px] max-h-[380px] overflow-y-auto space-y-3.5 text-left bg-[#0d1117]/90 relative z-10"
          >
            {history.map((item, idx) => (
              <div key={idx} className="terminal-line-enter space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-cyan-400 font-bold">&gt;</span>
                  <span className="text-cyan-300 font-semibold">{item.command}</span>
                </div>
                <div className="text-slate-300 pl-4 leading-relaxed font-sans text-xs sm:text-sm">
                  {item.output}
                </div>
              </div>
            ))}
          </div>

          {/* Input Command Line */}
          <form onSubmit={handleCommand} className="border-t border-slate-800/90 bg-[#161b22] p-3.5 flex items-center gap-3 relative z-10">
            <span className="text-cyan-400 font-bold pl-1 shrink-0">&gt;</span>
            <div className="flex-1 flex items-center min-w-0 relative">
              <input
                ref={inputRef}
                type="text"
                value={inputVal}
                readOnly={isTyping}
                onChange={(e) => {
                  if (isTyping) cancelSimulation();
                  setInputVal(e.target.value);
                }}
                onKeyDown={handleKeyDown}
                placeholder={isTyping ? '' : "Type 'help', 'skills', 'about' (Tab to autocomplete)..."}
                className="w-full bg-transparent text-slate-100 outline-none text-xs sm:text-sm placeholder-slate-500/70 font-mono caret-cyan-400"
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck={false}
              />
            </div>
            <button
              type="submit"
              disabled={isTyping || !inputVal.trim()}
              className="p-1.5 sm:p-2 text-slate-400 hover:text-cyan-300 disabled:opacity-40 transition-colors rounded-lg hover:bg-slate-800 shrink-0"
              aria-label="Run command"
              title="Press Enter to run"
            >
              <CornerDownLeft className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
});