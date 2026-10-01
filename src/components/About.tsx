import React from 'react';
import { Code2, Database, Smartphone, Zap, MapPin, Briefcase } from 'lucide-react';
import { ReactIcon, FlutterIcon, LaravelIcon, PhpIcon, PostgresIcon } from './TechIcons';

export const About: React.FC = React.memo(() => {
  return (
    <section id="about" className="relative py-12 sm:py-20 scroll-mt-20 sm:scroll-mt-24 overflow-hidden">
      {/* Subtle Ambient Backing */}
      <div className="absolute top-1/2 left-[-120px] w-[320px] h-[320px] bg-cyan-500/5 rounded-full blur-[90px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-left mb-8 sm:mb-12">
          <span className="font-mono text-xs text-cyan-400 uppercase tracking-widest block mb-2">// Philosophy & Craft</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Building software that <span className="gradient-text-animated">solves real problems</span>.
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2.5 max-w-2xl leading-relaxed">
            A pragmatic approach to full-stack architecture, clean relational databases, and fluid cross-platform mobile applications.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="space-y-6">
          {/* Top Row: Story Card (7 cols) + Developer Profile (5 cols) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-stretch">
            {/* Story Card */}
            <div className="lg:col-span-7 rounded-2xl p-6 sm:p-8 bg-[#0b101c] border border-slate-800/80 hover:border-cyan-500/30 transition-all duration-300 flex flex-col justify-between space-y-5 shadow-lg">
              <div className="space-y-3.5">
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  Hi, I'm Steve. Over the past 2+ years, I've helped teams build, scale, and maintain production software products. My work spans the entire application lifecycle—from designing normalized relational databases and enterprise REST APIs to building fluid cross-platform mobile applications.
                </p>
                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                  I prioritize maintainable architecture over unnecessary complexity. My primary engineering stack centers around <strong className="text-slate-200 font-medium">Laravel & PHP 8+</strong> on the backend, <strong className="text-slate-200 font-medium">React.js</strong> on the web, and <strong className="text-slate-200 font-medium">Flutter & Dart</strong> on mobile.
                </p>
              </div>

              {/* Stack Highlight Pills */}
              <div className="pt-2 flex flex-wrap gap-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono text-slate-200 hover:border-cyan-500/40 transition-colors">
                  <LaravelIcon className="w-4 h-4" />
                  <span>Laravel</span>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono text-slate-200 hover:border-cyan-500/40 transition-colors">
                  <PhpIcon className="w-4 h-4" />
                  <span>PHP 8+</span>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono text-slate-200 hover:border-cyan-500/40 transition-colors">
                  <ReactIcon className="w-4 h-4" />
                  <span>React.js</span>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono text-slate-200 hover:border-cyan-500/40 transition-colors">
                  <FlutterIcon className="w-4 h-4" />
                  <span>Flutter</span>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono text-slate-200 hover:border-cyan-500/40 transition-colors">
                  <PostgresIcon className="w-4 h-4" />
                  <span>PostgreSQL</span>
                </div>
              </div>
            </div>

            {/* Developer Profile Card */}
            <div className="lg:col-span-5 rounded-2xl p-6 sm:p-7 bg-[#0b101c] border border-slate-800/80 hover:border-cyan-500/30 transition-all duration-300 flex flex-col justify-between space-y-5 shadow-lg">
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-3.5">
                <div>
                  <h3 className="text-base font-bold text-white font-sans">Developer Profile</h3>
                  <p className="text-xs text-slate-400 font-mono">Steve &bull; Full-Stack & Mobile</p>
                </div>
                <div className="flex items-center gap-1.5 text-cyan-400 text-xs font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                  <span>Active</span>
                </div>
              </div>

              <div className="space-y-4 text-xs font-mono">
                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-cyan-400 shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase tracking-wider">Location</span>
                    <span className="text-slate-200 font-sans text-sm font-medium">Phnom Penh, Cambodia (GMT+7)</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-cyan-400 shrink-0">
                    <Briefcase className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase tracking-wider">Experience Level</span>
                    <span className="text-slate-200 font-sans text-sm font-medium">2+ Years Building Production Systems</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-cyan-400 shrink-0">
                    <Code2 className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase tracking-wider">Specialties</span>
                    <span className="text-slate-200 font-sans text-sm font-medium">Laravel APIs &bull; Flutter Mobile &bull; React Web</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Row: 3 Practical Craft Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
            <div className="p-5 sm:p-6 rounded-2xl bg-[#0b101c] border border-slate-800/80 space-y-3 hover:border-cyan-500/30 hover:-translate-y-1 transition-all duration-300">
              <div className="p-2.5 w-fit rounded-xl bg-cyan-950/50 text-cyan-400 border border-cyan-500/20">
                <Database className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-white text-base font-sans tracking-tight">Robust Schemas</h4>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-sans">
                Normalized PostgreSQL & MySQL databases designed for ACID integrity, strategic indexes, and efficient querying.
              </p>
            </div>

            <div className="p-5 sm:p-6 rounded-2xl bg-[#0b101c] border border-slate-800/80 space-y-3 hover:border-cyan-500/30 hover:-translate-y-1 transition-all duration-300">
              <div className="p-2.5 w-fit rounded-xl bg-cyan-950/50 text-cyan-400 border border-cyan-500/20">
                <Smartphone className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-white text-base font-sans tracking-tight">Flutter Mobile</h4>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-sans">
                Smooth iOS & Android apps written with Flutter, responsive state management, and offline-first data support.
              </p>
            </div>

            <div className="p-5 sm:p-6 rounded-2xl bg-[#0b101c] border border-slate-800/80 space-y-3 hover:border-cyan-500/30 hover:-translate-y-1 transition-all duration-300">
              <div className="p-2.5 w-fit rounded-xl bg-cyan-950/50 text-cyan-400 border border-cyan-500/20">
                <Zap className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-white text-base font-sans tracking-tight">Reliable APIs</h4>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-sans">
                Stateless token authentication, predictable error contracts, and asynchronous background worker queues.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});