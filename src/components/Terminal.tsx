import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, CornerDownLeft, Sparkles, Play } from 'lucide-react';

export const Terminal: React.FC = () => {
  const [history, setHistory] = useState<Array<{ command: string; output: string | React.ReactNode }>>([
    {
      command: 'whoami',
      output: (
        <span className="text-slate-300">
          <span className="text-cyan-400 font-bold">Steve</span> &bull; Full-Stack & Mobile Developer based in <span className="text-emerald-400">Phnom Penh, Cambodia</span>
        </span>
      ),
    },
    {
      command: 'status',
      output: (
        <span className="text-emerald-400 flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Available for full-time engineering roles, high-impact contracts & consulting.</span>
        </span>
      ),
    },
  ]);
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [activeRunningCmd, setActiveRunningCmd] = useState<string | null>(null);
  const outputContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const quickCommands = ['whoami', 'skills', 'projects', 'status', 'contact', 'help', 'clear'];

  const executeCmd = (cmdText: string) => {
    const cmd = cmdText.trim().toLowerCase();
    if (!cmd) return;

    let response: string | React.ReactNode = '';

    switch (cmd) {
      case 'help':
        response = (
          <span className="text-slate-400">
            Available commands: <span className="text-cyan-300 font-semibold cursor-pointer hover:underline" onClick={() => simulateTyping('whoami')}>whoami</span>, <span className="text-cyan-300 font-semibold cursor-pointer hover:underline" onClick={() => simulateTyping('skills')}>skills</span>, <span className="text-cyan-300 font-semibold cursor-pointer hover:underline" onClick={() => simulateTyping('status')}>status</span>, <span className="text-cyan-300 font-semibold cursor-pointer hover:underline" onClick={() => simulateTyping('projects')}>projects</span>, <span className="text-cyan-300 font-semibold cursor-pointer hover:underline" onClick={() => simulateTyping('contact')}>contact</span>, <span className="text-cyan-300 font-semibold cursor-pointer hover:underline" onClick={() => simulateTyping('clear')}>clear</span>
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
            <div><span className="text-cyan-400 font-semibold">Mobile:</span> Flutter, Dart</div>
            <div><span className="text-cyan-400 font-semibold">Frontend:</span> React.js, TypeScript, Tailwind CSS</div>
            <div><span className="text-cyan-400 font-semibold">Backend:</span> Laravel, PHP 8+, Node.js, REST APIs</div>
            <div><span className="text-cyan-400 font-semibold">Databases:</span> PostgreSQL, MySQL</div>
            <div><span className="text-cyan-400 font-semibold">DevOps:</span> Linux Server Management, Nginx, CI/CD</div>
          </div>
        );
        break;
      case 'status':
        response = (
          <span className="text-emerald-400 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Open to full-time roles, contracts, and system architecture consulting.</span>
          </span>
        );
        break;
      case 'projects':
        response = (
          <div className="space-y-1.5 text-xs">
            <div><span className="text-cyan-400 font-semibold">1. School Management System</span> &mdash; Enterprise academic & administrative platform (Laravel + React)</div>
            <div><span className="text-cyan-400 font-semibold">2. Rules & Document Search App</span> &mdash; Cross-platform offline-ready legal query app (Flutter + Dart)</div>
            <div><span className="text-cyan-400 font-semibold">3. OCR Document Engine</span> &mdash; Automated cloud text extraction pipeline (Laravel + Cloud AI)</div>
          </div>
        );
        break;
      case 'contact':
        response = (
          <span className="text-slate-300">
            Email: <a href="mailto:steve.code.dev@gmail.com" className="text-cyan-400 underline">steve.code.dev@gmail.com</a> | Location: <span className="text-emerald-400">Phnom Penh, Cambodia</span>
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
  };

  // Simulate realistic typing when clicking quick command buttons
  const simulateTyping = (targetCmd: string) => {
    if (isTyping) return;
    setIsTyping(true);
    setActiveRunningCmd(targetCmd);
    setInputVal('');

    let charIdx = 0;
    const interval = setInterval(() => {
      if (charIdx <= targetCmd.length) {
        setInputVal(targetCmd.slice(0, charIdx));
        charIdx++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          executeCmd(targetCmd);
          setIsTyping(false);
          setActiveRunningCmd(null);
        }, 150);
      }
    }, 40);
  };

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (isTyping) return;
    executeCmd(inputVal);
  };

  // Auto-scroll the internal terminal output container
  useEffect(() => {
    if (outputContainerRef.current) {
      outputContainerRef.current.scrollTop = outputContainerRef.current.scrollHeight;
    }
  }, [history]);

  return (
    <section id="terminal" className="py-10 sm:py-16 relative overflow-hidden scroll-mt-20 sm:scroll-mt-24">
      {/* Background Ambient Glow */}
      <div className="absolute top-0 left-1/4 w-[300px] h-[300px] bg-cyan-500/8 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[250px] h-[250px] bg-violet-500/6 rounded-full blur-[90px] pointer-events-none" />

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
            Click any quick action command or type directly into the terminal to query live developer details.
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
                  : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:text-cyan-300 hover:border-cyan-500/40 hover:bg-slate-850 hover:shadow-sm'
              }`}
            >
              <span className="text-cyan-400 font-semibold">$</span>
              <span>{cmd}</span>
            </button>
          ))}
        </div>

        {/* Terminal Window with CRT Scanline & Ambient Glow */}
        <div className="terminal-window terminal-scanline rounded-2xl overflow-hidden font-mono text-[12px] sm:text-sm border border-slate-800/90 bg-[#0d1117]/95 shadow-2xl backdrop-blur-xl">
          {/* Title Bar */}
          <div className="bg-[#161b22] px-4 py-3 border-b border-slate-800/90 flex items-center justify-between relative z-10">
            <div className="flex items-center gap-2.5">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-[#ff5f56] inline-block shadow-sm hover:opacity-80 cursor-pointer transition-opacity" />
                <span className="w-3 h-3 rounded-full bg-[#ffbd2e] inline-block shadow-sm hover:opacity-80 cursor-pointer transition-opacity" />
                <span className="w-3 h-3 rounded-full bg-[#27c93f] inline-block shadow-sm hover:opacity-80 cursor-pointer transition-opacity" />
              </div>
              <div className="flex items-center gap-2 ml-3 text-slate-300 text-xs">
                <TerminalIcon className="w-3.5 h-3.5 text-cyan-400" />
                <span>steve@workstation:~ (zsh)</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
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
                  <span className="text-emerald-400 font-bold">&gt;</span>
                  <span className="text-cyan-300 font-semibold">{item.command}</span>
                </div>
                <div className="text-slate-300 pl-4 leading-relaxed font-sans text-xs sm:text-sm">
                  {item.output}
                </div>
              </div>
            ))}
          </div>

          {/* Input Command Line with Blinking Block Cursor */}
          <form onSubmit={handleCommand} className="border-t border-slate-800/90 bg-[#161b22] p-3.5 flex items-center gap-3 relative z-10">
            <span className="text-emerald-400 font-bold pl-1">&gt;</span>
            <div className="flex-1 flex items-center min-w-0">
              <input
                ref={inputRef}
                type="text"
                value={inputVal}
                disabled={isTyping}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder={isTyping ? 'Simulating typing...' : "Type 'help' or enter a command..."}
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
};