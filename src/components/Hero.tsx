import React, { useState } from 'react';
import { ArrowRight, Check, Copy, Code2, Sparkles } from 'lucide-react';
import { ReactIcon, FlutterIcon, LaravelIcon, NodeIcon, PostgresIcon } from './TechIcons';

type TabKey = 'developer' | 'stack' | 'architecture';

export const Hero: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabKey>('developer');
  const [copied, setCopied] = useState(false);

  const snippets: Record<TabKey, { filename: string; language: string; code: React.ReactNode }> = {
    developer: {
      filename: 'developer.ts',
      language: 'TypeScript',
      code: (
        <>
          <div><span className="text-[#e06c75]">import</span> <span className="text-[#e5c07b]">type</span> &#123; <span className="text-[#e5c07b]">Engineer</span> &#125; <span className="text-[#e06c75]">from</span> <span className="text-[#98c379]">'@steve/core'</span>;</div>
          <div className="text-slate-600">// Full-stack & mobile developer profile</div>
          <div><span className="text-[#c678dd]">export const</span> <span className="text-[#61afef]">steve</span>: <span className="text-[#e5c07b]">Engineer</span> = &#123;</div>
          <div className="pl-3 sm:pl-4"><span className="text-[#e06c75]">name</span>: <span className="text-[#98c379]">'Steve'</span>,</div>
          <div className="pl-3 sm:pl-4"><span className="text-[#e06c75]">title</span>: <span className="text-[#98c379]">'Full-Stack & Mobile Developer'</span>,</div>
          <div className="pl-3 sm:pl-4"><span className="text-[#e06c75]">location</span>: <span className="text-[#98c379]">'Phnom Penh, Cambodia'</span>,</div>
          <div className="pl-3 sm:pl-4"><span className="text-[#e06c75]">status</span>: <span className="text-[#98c379]">'Available for projects'</span>,</div>
          <div className="pl-3 sm:pl-4"><span className="text-[#e06c75]">yearsActive</span>: <span className="text-[#d19a66]">2</span>,</div>
          <div className="pl-3 sm:pl-4"><span className="text-[#e06c75]">passions</span>: [</div>
          <div className="pl-6 sm:pl-8"><span className="text-[#98c379]">'Clean Architecture'</span>,</div>
          <div className="pl-6 sm:pl-8"><span className="text-[#98c379]">'Cross-Platform Apps'</span>,</div>
          <div className="pl-6 sm:pl-8"><span className="text-[#98c379]">'Scalable REST APIs'</span>,</div>
          <div className="pl-3 sm:pl-4">],</div>
          <div className="pl-3 sm:pl-4"><span className="text-[#61afef]">buildSolution</span>: (<span className="text-[#abb2bf]">idea</span>) <span className="text-[#c678dd]">=&gt;</span> &#123;</div>
          <div className="pl-6 sm:pl-8"><span className="text-[#c678dd]">return</span> <span className="text-[#61afef]">deployToProduction</span>(<span className="text-[#abb2bf]">idea</span>);</div>
          <div className="pl-3 sm:pl-4">&#125;</div>
          <div>&#125;;</div>
        </>
      ),
    },
    stack: {
      filename: 'stack.config.ts',
      language: 'TypeScript',
      code: (
        <>
          <div className="text-slate-600">// Production-proven technology matrix</div>
          <div><span className="text-[#c678dd]">export const</span> <span className="text-[#61afef]">primaryStack</span> = &#123;</div>
          <div className="pl-3 sm:pl-4"><span className="text-[#e06c75]">mobile</span>: [<span className="text-[#98c379]">'Flutter'</span>, <span className="text-[#98c379]">'Dart'</span>],</div>
          <div className="pl-3 sm:pl-4"><span className="text-[#e06c75]">frontend</span>: [<span className="text-[#98c379]">'React.js'</span>, <span className="text-[#98c379]">'TypeScript'</span>],</div>
          <div className="pl-3 sm:pl-4"><span className="text-[#e06c75]">backend</span>: [<span className="text-[#98c379]">'Laravel'</span>, <span className="text-[#98c379]">'PHP 8+'</span>, <span className="text-[#98c379]">'Node.js'</span>],</div>
          <div className="pl-3 sm:pl-4"><span className="text-[#e06c75]">databases</span>: [<span className="text-[#98c379]">'PostgreSQL'</span>, <span className="text-[#98c379]">'MySQL'</span>],</div>
          <div className="pl-3 sm:pl-4"><span className="text-[#e06c75]">infrastructure</span>: [<span className="text-[#98c379]">'Linux'</span>, <span className="text-[#98c379]">'Nginx'</span>],</div>
          <div className="pl-3 sm:pl-4"><span className="text-[#e06c75]">specialties</span>: [<span className="text-[#98c379]">'Document AI'</span>, <span className="text-[#98c379]">'Cloud OCR'</span>, <span className="text-[#98c379]">'Async Queues'</span>]</div>
          <div>&#125; <span className="text-[#e5c07b]">as const</span>;</div>
        </>
      ),
    },
    architecture: {
      filename: 'architecture.ts',
      language: 'TypeScript',
      code: (
        <>
          <div className="text-slate-600">// Engineering principles & standards</div>
          <div><span className="text-[#c678dd]">class</span> <span className="text-[#e5c07b]">SystemArchitecture</span> &#123;</div>
          <div className="pl-3 sm:pl-4"><span className="text-[#c678dd]">readonly</span> <span className="text-[#e06c75]">principles</span> = [</div>
          <div className="pl-6 sm:pl-8"><span className="text-[#98c379]">'High Performance'</span>,</div>
          <div className="pl-6 sm:pl-8"><span className="text-[#98c379]">'Modular & Maintainable'</span>,</div>
          <div className="pl-6 sm:pl-8"><span className="text-[#98c379]">'Fault Tolerant'</span>,</div>
          <div className="pl-6 sm:pl-8"><span className="text-[#98c379]">'Security by Design'</span></div>
          <div className="pl-3 sm:pl-4">];</div>
          <div className="pl-3 sm:pl-4"><span className="text-[#61afef]">verifyHealth</span>(): <span className="text-[#56b6c2]">Promise</span>&lt;<span className="text-[#56b6c2]">boolean</span>&gt; &#123;</div>
          <div className="pl-6 sm:pl-8"><span className="text-[#c678dd]">return</span> <span className="text-[#56b6c2]">Promise</span>.<span className="text-[#61afef]">resolve</span>(<span className="text-[#d19a66]">true</span>);</div>
          <div className="pl-3 sm:pl-4">&#125;</div>
          <div>&#125;</div>
        </>
      ),
    },
  };

  const handleCopy = () => {
    const rawCode = activeTab === 'developer'
      ? `const steve = {\n  name: 'Steve',\n  title: 'Full-Stack & Mobile Developer',\n  location: 'Phnom Penh, Cambodia',\n  stack: ['React', 'Flutter', 'Laravel', 'Node.js']\n};`
      : activeTab === 'stack'
      ? `export const primaryStack = {\n  mobile: ['Flutter', 'Dart'],\n  frontend: ['React.js', 'TypeScript'],\n  backend: ['Laravel', 'Node.js']\n};`
      : `class SystemArchitecture {\n  principles = ['High Performance', 'Security by Design'];\n}`;

    navigator.clipboard.writeText(rawCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative flex items-center justify-center pt-16 sm:pt-24 pb-8 sm:pb-12 overflow-hidden">
      {/* Background Grid Accent */}
      <div className="absolute inset-0 cyber-grid opacity-75" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#05070e]/60 to-[#05070e] pointer-events-none" />

      {/* Atmospheric Glow */}
      <div className="absolute top-1/3 left-1/4 w-[250px] sm:w-[500px] h-[250px] sm:h-[500px] bg-cyan-500/8 rounded-full blur-[80px] sm:blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[200px] sm:w-[450px] h-[200px] sm:h-[450px] bg-violet-500/8 rounded-full blur-[80px] sm:blur-[100px] pointer-events-none" />

      <div className="relative max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
        {/* Left Column: Hero Intro */}
        <div className="lg:col-span-7 space-y-4 sm:space-y-6 text-left">
          {/* Status Indicator (Clean Minimalist) */}
          <div className="inline-flex items-center gap-2 font-mono text-xs sm:text-sm">
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
            </span>
            <span className="text-slate-300 font-medium">Software Developer</span>
            <span className="text-slate-600">/</span>
            <span className="text-cyan-400">Open to Opportunities</span>
          </div>

          {/* Heading */}
          <div className="space-y-1.5 sm:space-y-2">
            <h1 className="text-3xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1]">
              Hi, I'm <span className="gradient-text-animated">Steve</span>.
            </h1>
            <p className="text-lg sm:text-2xl font-medium text-slate-200 tracking-tight leading-snug">
              Building scalable web ecosystems & cross-platform mobile apps.
            </p>
          </div>

          {/* Bio */}
          <p className="text-slate-400 text-sm sm:text-base lg:text-lg max-w-xl leading-relaxed">
            Specializing in <span className="text-cyan-300 font-medium">Laravel</span>, <span className="text-cyan-300 font-medium">React</span>, and <span className="text-cyan-300 font-medium">Flutter</span>. I engineer high-performance systems with clean architectural patterns, robust databases, and polished user experiences.
          </p>

          {/* Quick Tech Pill Badges */}
          <div className="flex items-center flex-wrap gap-1.5 sm:gap-2 pt-1">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900/70 border border-slate-800 text-[11px] sm:text-xs font-mono text-slate-300">
              <ReactIcon className="w-4 h-4" />
              <span>React</span>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900/70 border border-slate-800 text-[11px] sm:text-xs font-mono text-slate-300">
              <FlutterIcon className="w-4 h-4" />
              <span>Flutter</span>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900/70 border border-slate-800 text-[11px] sm:text-xs font-mono text-slate-300">
              <LaravelIcon className="w-4 h-4" />
              <span>Laravel</span>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900/70 border border-slate-800 text-[11px] sm:text-xs font-mono text-slate-300">
              <NodeIcon className="w-4 h-4" />
              <span>Node.js</span>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900/70 border border-slate-800 text-[11px] sm:text-xs font-mono text-slate-300">
              <PostgresIcon className="w-4 h-4" />
              <span>PostgreSQL</span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 pt-2">
            <a
              href="#projects"
              className="liquid-btn inline-flex items-center justify-center gap-2 px-6 py-3 sm:px-7 sm:py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-cyan-400 text-slate-950 font-semibold text-sm sm:text-base shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all duration-300"
            >
              <span>Explore Projects</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              href="#contact"
              className="liquid-btn inline-flex items-center justify-center gap-2 px-6 py-3 sm:px-7 sm:py-3.5 rounded-xl bg-slate-900/90 border border-slate-700/80 text-slate-200 font-medium text-sm sm:text-base hover:border-cyan-500/40 backdrop-blur-sm transition-all duration-300"
            >
              <span>Get in Touch</span>
            </a>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-3 gap-2 sm:gap-3 pt-4 border-t border-slate-800/80 font-mono text-left">
            <div>
              <div className="text-base sm:text-2xl font-bold text-white tracking-tight">2+</div>
              <div className="text-[10px] sm:text-xs text-slate-500">Years Exp</div>
            </div>
            <div>
              <div className="text-base sm:text-2xl font-bold text-cyan-400 tracking-tight">5+</div>
              <div className="text-[10px] sm:text-xs text-slate-500">Production Builds</div>
            </div>
            <div>
              <div className="text-base sm:text-2xl font-bold text-emerald-400 tracking-tight">100%</div>
              <div className="text-[10px] sm:text-xs text-slate-500">Commitment</div>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Syntax-Highlighted Editor */}
        <div className="lg:col-span-5 w-full max-w-full overflow-hidden">
          <div className="rounded-2xl border border-cyan-500/20 bg-[#0d1117] shadow-2xl overflow-hidden backdrop-blur-xl relative w-full">
            {/* Editor Window Header & Tabs */}
            <div className="bg-[#161b22] px-3 sm:px-4 py-2 border-b border-slate-800 flex items-center justify-between gap-2">
              {/* Window Controls */}
              <div className="flex items-center gap-1.5 shrink-0">
                <span className="w-2.5 sm:w-3 h-2.5 sm:h-3 rounded-full bg-[#ff5f56] inline-block shadow-sm" />
                <span className="w-2.5 sm:w-3 h-2.5 sm:h-3 rounded-full bg-[#ffbd2e] inline-block shadow-sm" />
                <span className="w-2.5 sm:w-3 h-2.5 sm:h-3 rounded-full bg-[#27c93f] inline-block shadow-sm" />
              </div>

              {/* Clean Borderless Tabs */}
              <div className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto no-scrollbar">
                {(['developer', 'stack', 'architecture'] as TabKey[]).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-2 sm:px-2.5 py-1 rounded-md text-[11px] font-mono transition-all duration-150 flex items-center gap-1.5 shrink-0 ${
                      activeTab === tab
                        ? 'bg-slate-800/80 text-cyan-300 font-semibold'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                    }`}
                  >
                    <Code2 className="w-3 h-3" />
                    <span>{snippets[tab].filename}</span>
                  </button>
                ))}
              </div>

              {/* Copy Code Action */}
              <button
                onClick={handleCopy}
                className="p-1 sm:p-1.5 rounded-md hover:bg-slate-800 text-slate-400 hover:text-cyan-300 transition-colors shrink-0"
                title="Copy snippet"
                aria-label="Copy snippet"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>

            {/* Code Body with Line Numbers & Syntax Colors with Tab Transition Animation */}
            <div
              key={activeTab}
              className="tab-fade-in p-3 sm:p-5 font-mono text-[11px] sm:text-[13px] leading-relaxed overflow-x-auto no-scrollbar text-left min-h-[260px] sm:min-h-[310px] bg-[#0d1117] max-w-full"
            >
              <div className="flex gap-2.5 sm:gap-4">
                {/* Line numbers */}
                <div className="select-none text-slate-600 text-right space-y-0.5 font-mono text-[10px] sm:text-xs pr-1.5 sm:pr-2 border-r border-slate-800/80 shrink-0">
                  {Array.from({ length: 14 }).map((_, i) => (
                    <div key={i}>{i + 1}</div>
                  ))}
                </div>

                {/* Highlighted code */}
                <div className="flex-1 space-y-0.5 font-mono min-w-0">
                  {snippets[activeTab].code}
                </div>
              </div>
            </div>

            {/* Editor Status Bar */}
            <div className="bg-[#161b22] px-3 sm:px-4 py-1.5 sm:py-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] sm:text-[11px] font-mono text-slate-400">
              <div className="flex items-center gap-2 sm:gap-3">
                <span className="flex items-center gap-1 text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>main*</span>
                </span>
                <span className="hidden sm:inline text-slate-500">TypeScript 5.4</span>
              </div>
              <div className="flex items-center gap-2 sm:gap-3 text-slate-400">
                <span>UTF-8</span>
                <span className="flex items-center gap-1 text-cyan-400">
                  <Sparkles className="w-3 h-3" />
                  <span>Ready</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};