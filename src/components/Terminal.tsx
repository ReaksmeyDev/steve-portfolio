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

  const quickCommands = ['whoami', 'skills', 'projects', 'experience', 'status', 'contact', 'clear'];

  // Clean up timers on unmount
  useEffect(() => {
    return () => {
      if (typingTimerRef.current) clearTimeout(typingTimerRef.current);
      if (typingIntervalRef.current) clearInterval(typingIntervalRef.current);
    };
  }, []);

  const executeCmd = useCallback((cmdText: string) => {
    const cmd = cmdText.trim().toLowerCase();
    if (!cmd) return;

    // Track command in history for ArrowUp/Down navigation
    commandHistoryRef.current.push(cmdText.trim());
    setHistoryPointer(-1);

    let response: string | React.ReactNode = '';

    switch (cmd) {
      case 'help':
        response = (
          <span className="text-slate-400">
            Available commands: <span className="text-cyan-300 font-semibold cursor-pointer hover:underline" onClick={() => simulateTyping('whoami')}>whoami</span>, <span className="text-cyan-300 font-semibold cursor-pointer hover:underline" onClick={() => simulateTyping('skills')}>skills</span>, <span className="text-cyan-300 font-semibold cursor-pointer hover:underline" onClick={() => simulateTyping('projects')}>projects</span>, <span className="text-cyan-300 font-semibold cursor-pointer hover:underline" onClick={() => simulateTyping('experience')}>experience</span>, <span className="text-cyan-300 font-semibold cursor-pointer hover:underline" onClick={() => simulateTyping('status')}>status</span>, <span className="text-cyan-300 font-semibold cursor-pointer hover:underline" onClick={() => simulateTyping('contact')}>contact</span>, <span className="text-cyan-300 font-semibold cursor-pointer hover:underline" onClick={() => simulateTyping('clear')}>clear</span>
          </span>
        );
        break;
      case 'whoami':
        response = (
          <span className="text-slate-300">
            <span className="text-cyan-400 font-bold">Steve</span> &mdash; Full-Stack & Mobile Developer (Laravel, React.js, Flutter, PostgreSQL, Linux)
          </span>
        );
        break;
      case 'skills':
      case 'skills --list':
        response = (
          <div className="space-y-1 text-xs">
            <div><span className="text-cyan-400 font-semibold">Mobile:</span> Flutter, Dart (iOS & Android)</div>
            <div><span className="text-cyan-400 font-semibold">Frontend:</span> React.js, TypeScript, Modern CSS/Tailwind</div>
            <div><span className="text-cyan-400 font-semibold">Backend:</span> Laravel, PHP 8+, Node.js, REST APIs</div>
            <div><span className="text-cyan-400 font-semibold">Databases:</span> PostgreSQL, MySQL, Relational Schemas</div>
            <div><span className="text-cyan-400 font-semibold">DevOps:</span> Linux Server Administration, Nginx, CI/CD</div>
          </div>
        );
        break;
      case 'status':
        response = (
          <span className="text-cyan-400 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span>Open to full-time roles, contracts, and architecture consulting.</span>
          </span>
        );
        break;
      case 'projects':
        response = (
          <div className="space-y-1.5 text-xs">
            <div><span className="text-cyan-400 font-semibold">1. School Management System</span> &mdash; Enterprise academic & administrative platform (Laravel + React)</div>
            <div><span className="text-cyan-400 font-semibold">2. Rules & Document Search App</span> &mdash; Cross-platform offline-ready legal query app (Flutter + Dart)</div>
            <div><span className="text-cyan-400 font-semibold">3. OCR Document Engine</span> &mdash; Automated cloud text extraction pipeline (Laravel + Cloud AI)</div>
            <div><span className="text-cyan-400 font-semibold">4. Documents Management System</span> &mdash; Centralized document archiving and indexing system (Laravel + MySQL)</div>
          </div>
        );
        break;
      case 'experience':
        response = (
          <div className="space-y-1 text-xs">
            <div><span className="text-cyan-400 font-semibold">Full-Stack Developer</span> &bull; Software Solutions Inc. (2024 - Present)</div>
            <div className="text-slate-400">Architected Laravel REST APIs, built Flutter mobile apps, optimized MySQL queries, and automated deployment pipelines.</div>
          </div>
        );
        break;
      case 'contact':
        response = (
          <span className="text-slate-300">
            Email: <a href="mailto:steve.code.dev@gmail.com" className="text-cyan-400 underline">steve.code.dev@gmail.com</a> | Telegram: <a href="https://t.me/stevejkj" target="_blank" rel="noreferrer" className="text-cyan-400 underline">@stevejkj</a> | Location: <span className="text-cyan-400">Phnom Penh, Cambodia</span>
          </span>
        );
        break;
      case 'clear':
        setHistory([]);
        setInputVal('');
        return;
      default:
        response = (
          <span className="text-rose-400">
            Command not recognized: '{cmd}'. Type <span className="text-cyan-300 font-bold cursor-pointer underline" onClick={() => simulateTyping('help')}>'help'</span> for available commands.
          </span>
        );
    }

    setHistory((prev) => [...prev, { command: cmdText, output: response }]);
    setInputVal('');
  }, []);

  // Simulate realistic typing when clicking quick command buttons
  const simulateTyping = (targetCmd: string) => {
    if (isTyping) return;
    setIsTyping(true);
    setActiveRunningCmd(targetCmd);
    setInputVal('');

    let charIdx = 0;
    typingIntervalRef.current = setInterval(() => {
      if (charIdx <= targetCmd.length) {
        setInputVal(targetCmd.slice(0, charIdx));
        charIdx++;
      } else {
        if (typingIntervalRef.current) clearInterval(typingIntervalRef.current);
        typingTimerRef.current = setTimeout(() => {
          executeCmd(targetCmd);
          setIsTyping(false);
          setActiveRunningCmd(null);
        }, 120);
      }
    }, 35);
  };

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (isTyping) return;
    executeCmd(inputVal);
  };

  // Keyboard navigation for command history
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive CLI</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Developer <span className="gradient-text-animated">Terminal</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2">
            Click any quick action or type directly into the terminal to query live developer details. Press ↑ and ↓ to browse command history.
          </p>
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
              disabled={isTyping}
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
          className="terminal-window terminal-scanline rounded-2xl overflow-hidden font-mono text-[12px] sm:text-sm border border-slate-800/90 bg-[#0d1117] shadow-2xl cursor-text"
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
            <span className="text-cyan-400 font-bold pl-1">&gt;</span>
            <div className="flex-1 flex items-center min-w-0">
              <input
                ref={inputRef}
                type="text"
                value={inputVal}
                disabled={isTyping}
                onChange={(e) => setInputVal(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={isTyping ? 'Simulating typing...' : "Type 'help' or enter a command (↑/↓ for history)..."}
                className="w-full bg-transparent text-slate-100 outline-none text-xs sm:text-sm placeholder-slate-600 font-mono disabled:opacity-80"
              />
              <span className="terminal-cursor-block" />
            </div>
            <button
              type="submit"
              disabled={isTyping || !inputVal.trim()}
              className="p-1.5 sm:p-2 text-slate-400 hover:text-cyan-300 disabled:opacity-40 transition-colors rounded-lg hover:bg-slate-800 shrink-0"
              aria-label="Run command"
            >
              <CornerDownLeft className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
});