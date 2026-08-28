import React from 'react';
import { MapPin, Briefcase, Layers, Sparkles, Code2, ShieldCheck, Zap, User } from 'lucide-react';
import { ReactIcon, FlutterIcon, LaravelIcon, PhpIcon } from './TechIcons';

const WaveDivider = () => (
  <div className="wave-divider -mt-1">
    <svg viewBox="0 0 1440 80" preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M0 40C240 10 480 70 720 40C960 10 1200 70 1440 40V80H0V40Z"
        fill="rgba(7, 11, 20, 0.5)"
      />
      <path
        d="M0 50C200 25 400 65 600 45C800 25 1000 65 1200 40C1300 30 1380 55 1440 50V80H0V50Z"
        fill="#05070e"
        fillOpacity="0.3"
      />
    </svg>
  </div>
);

const metaItems = [
  { icon: MapPin, label: 'Based In', value: 'Phnom Penh, Cambodia', color: 'text-cyan-400' },
  { icon: Briefcase, label: 'Current Role', value: 'Full-Stack & Mobile Developer', color: 'text-violet-400' },
  { icon: Layers, label: 'Core Domains', value: 'Web Apps, Flutter Mobile, REST APIs', color: 'text-emerald-400' },
  { icon: Sparkles, label: 'Research Areas', value: 'Document AI, System Architecture, DevOps', color: 'text-pink-400' },
];

const pillars = [
  { icon: Code2, title: 'Clean Architecture', desc: 'Maintainable, testable codebases with clear separation of concerns and robust typing.' },
  { icon: ShieldCheck, title: 'Reliability & Security', desc: 'Secure token authentication, idempotent APIs, and stable relational database schemas.' },
  { icon: Zap, title: 'Performance Focused', desc: 'Fast load times, responsive queries, and optimized state management pipelines.' },
];

export const About: React.FC = () => {
  return (
    <section id="about" className="relative pt-6 pb-16 sm:pb-24 scroll-mt-20 sm:scroll-mt-24">
      <WaveDivider />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        {/* Header */}
        <div className="text-left mb-8 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-cyan-950/30 border border-cyan-500/20 text-cyan-400 font-mono text-xs mb-3">
            <User className="w-3.5 h-3.5" />
            <span>Developer Background</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Engineering with <span className="gradient-text-animated">Purpose</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Narrative & Pillars */}
          <div className="lg:col-span-7 space-y-6 text-slate-300 leading-relaxed text-sm sm:text-base">
            <p>
              I am a software developer dedicated to building reliable digital products and solving real-world challenges through clean engineering. My background spans both responsive web platforms and cross-platform mobile development, with a strong focus on structured backend architectures.
            </p>
            
            <p className="flex flex-wrap items-center gap-2">
              <span>Over the course of my career, I have engineered full-cycle solutions using</span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono text-white">
                <LaravelIcon className="w-4 h-4" />
                <span>Laravel</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono text-white">
                <PhpIcon className="w-4 h-4" />
                <span>PHP</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono text-white">
                <ReactIcon className="w-4 h-4" />
                <span>React.js</span>
              </span>
              <span>and</span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono text-white">
                <FlutterIcon className="w-4 h-4" />
                <span>Flutter / Dart</span>
              </span>
              <span>with dependable relational databases.</span>
            </p>

            {/* Engineering Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-2">
              {pillars.map(({ icon: Icon, title, desc }) => (
                <div key={title} className="p-4 sm:p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 space-y-2.5 hover:border-cyan-500/30 transition-all duration-300">
                  <div className="p-2.5 w-fit rounded-xl bg-slate-800 text-cyan-400">
                    <Icon className="w-4 h-4" />
                  </div>
                  <h4 className="font-bold text-white text-sm sm:text-base font-sans tracking-tight">{title}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed font-sans">{desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* System Metadata Card */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl p-5 sm:p-6 bg-[#0b101c]/80 border border-slate-800/80 backdrop-blur-xl space-y-5 shadow-xl">
              <h3 className="font-mono text-sm font-semibold text-slate-200 border-b border-slate-800 pb-3 flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                  Developer Overview
                </span>
                <span className="text-[10px] text-slate-500 font-mono">v4.2.0</span>
              </h3>

              <div className="space-y-4 font-mono text-xs">
                {metaItems.map(({ icon: Icon, label, value, color }) => (
                  <div key={label} className="flex items-start gap-3.5 group">
                    <div className={`p-2.5 rounded-xl bg-slate-900 border border-slate-800 ${color} group-hover:border-cyan-500/30 group-hover:shadow-[0_0_15px_rgba(34,211,238,0.15)] transition-all duration-300 shrink-0`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <span className="text-slate-500 block text-[10px] uppercase tracking-wider">{label}</span>
                      <span className="text-slate-200 text-xs sm:text-sm font-sans font-medium">{value}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};