import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, CornerDownLeft } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

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
  const outputContainerRef = useRef<HTMLDivElement>(null);
  const headerAnim = useScrollAnimation();
  const terminalAnim = useScrollAnimation();

  const quickCommands = ['whoami', 'skills', 'projects', 'status', 'contact', 'clear'];

  const executeCmd = (cmdText: string) => {
    const cmd = cmdText.trim().toLowerCase();
    if (!cmd) return;

    let response: string | React.ReactNode = '';

    switch (cmd) {
      case 'help':
        response = (
          <span className="text-slate-400">
            Available commands: <span className="text-cyan-300 font-semibold">whoami</span>, <span className="text-cyan-300 font-semibold">skills</span>, <span className="text-cyan-300 font-semibold">status</span>, <span className="text-cyan-300 font-semibold">projects</span>, <span className="text-cyan-300 font-semibold">contact</span>, <span className="text-cyan-300 font-semibold">clear</span>
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
            <div><span className="text-cyan-400 font-semibold">Databases:</span> PostgreSQL, MySQL, SQL Server</div>
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
          <div className="space-y-1 text-xs">
            <div><span className="text-cyan-400 font-semibold">1. School Management System</span> &mdash; Enterprise academic & administrative platform (Laravel + React)</div>
            <div><span className="text-cyan-400 font-semibold">2. Rules & Document Search App</span> &mdash; Cross-platform offline-ready legal query app (Flutter + Dart)</div>
            <div><span className="text-cyan-400 font-semibold">3. OCR Document Engine</span> &mdash; Automated cloud text extraction pipeline (Laravel + Cloud AI)</div>
          </div>
        );
        break;
      case 'contact':
        response = (
          <span className="text-slate-300">
            Email: <a href="mailto:contact@example.com" className="text-cyan-400 underline">contact@example.com</a> | Telegram: <span className="text-violet-400">@developer_placeholder</span>
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
            Command not recognized: '{cmd}'. Type <span className="text-cyan-300 font-bold cursor-pointer" onClick={() => executeCmd('help')}>'help'</span> for available commands.
          </span>
        );
    }

    setHistory((prev) => [...prev, { command: cmdText, output: response }]);
    setInputVal('');
  };

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    executeCmd(inputVal);
  };

  // Only scroll the internal terminal container, never scroll the whole window
  useEffect(() => {
    if (outputContainerRef.current) {
      outputContainerRef.current.scrollTop = outputContainerRef.current.scrollHeight;
    }
  }, [history]);

  return (
    <section id="terminal" className="py-18 sm:py-24 relative overflow-hidden">
      {/* Background Accent */}
      <div className="absolute top-0 left-1/4 w-[250px] h-[250px] bg-cyan-500/5 rounded-full blur-[90px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div
          ref={headerAnim.ref}
          className={`text-left mb-6 sm:mb-8 scroll-fade-up ${headerAnim.isVisible ? 'visible' : ''}`}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-cyan-950/30 border border-cyan-500/20 text-cyan-400 font-mono text-xs mb-3">
            <TerminalIcon className="w-3.5 h-3.5" />
            <span>Interactive Console</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Developer <span className="gradient-text-animated">Terminal</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2">
            Execute commands or click quick action pills to query developer profile data.
          </p>
        </div>

        {/* Quick Command Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-4 font-mono text-xs">
          <span className="text-slate-500 text-[11px] mr-1">Quick actions:</span>
          {quickCommands.map((cmd) => (
            <button
              key={cmd}
              type="button"
              onClick={() => executeCmd(cmd)}
              className="px-2.5 py-1 rounded-lg bg-slate-900/80 border border-slate-800 text-slate-300 hover:text-cyan-300 hover:border-cyan-500/40 hover:bg-slate-800 transition-all active:scale-95"
            >
              ${cmd}
            </button>
          ))}
        </div>

        {/* Terminal Window */}
        <div
          ref={terminalAnim.ref}
          className={`rounded-2xl overflow-hidden font-mono text-[12px] sm:text-sm scroll-zoom-in ${terminalAnim.isVisible ? 'visible' : ''} border border-slate-800/90 bg-[#0d1117] shadow-2xl backdrop-blur-xl`}
        >
          {/* Title Bar */}
          <div className="bg-[#161b22] px-4 py-3 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-[#ff5f56] inline-block shadow-sm" />
                <span className="w-3 h-3 rounded-full bg-[#ffbd2e] inline-block shadow-sm" />
                <span className="w-3 h-3 rounded-full bg-[#27c93f] inline-block shadow-sm" />
              </div>
              <div className="flex items-center gap-1.5 ml-3 text-slate-400 text-xs">
                <TerminalIcon className="w-3.5 h-3.5 text-cyan-400" />
                <span>steve@workstation:~ (zsh)</span>
              </div>
            </div>
            <div className="text-[11px] text-slate-500 bg-[#0d1117] px-2 py-0.5 rounded border border-slate-800/80">zsh 5.9</div>
          </div>

          {/* Terminal Output - Internal Scroll Only */}
          <div
            ref={outputContainerRef}
            className="p-4 sm:p-6 min-h-[220px] sm:min-h-[280px] max-h-[360px] overflow-y-auto space-y-3.5 text-left bg-[#0d1117]"
          >
            {history.map((item, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-emerald-400 font-bold">&gt;</span>
                  <span className="text-cyan-300 font-semibold">{item.command}</span>
                </div>
                <div className="text-slate-300 pl-4 leading-relaxed font-sans text-xs sm:text-sm">{item.output}</div>
              </div>
            ))}
          </div>

          {/* Input Form */}
          <form onSubmit={handleCommand} className="border-t border-slate-800 bg-[#161b22] p-3.5 flex items-center gap-3">
            <span className="text-emerald-400 font-bold pl-1">&gt;</span>
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Type 'help' or enter a command..."
              className="flex-1 bg-transparent text-slate-200 outline-none text-xs sm:text-sm placeholder-slate-600 min-w-0 font-mono"
            />
            <button
              type="submit"
              className="p-1.5 sm:p-2 text-slate-400 hover:text-cyan-300 transition-colors rounded-lg hover:bg-slate-800 shrink-0"
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