import React from 'react';
import { Code2, Database, Smartphone, Zap, MapPin, Briefcase } from 'lucide-react';
import { ReactIcon, FlutterIcon, LaravelIcon, PhpIcon } from './TechIcons';

export const About: React.FC = () => {
  return (
    <section id="about" className="relative py-10 sm:py-16 scroll-mt-20 sm:scroll-mt-24 overflow-hidden">
      {/* Subtle Ambient Glow */}
      <div className="absolute top-1/2 left-[-120px] w-[320px] h-[320px] bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-left mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Building software with <span className="gradient-text-animated">pragmatic craft</span>.
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-2xl leading-relaxed">
            A developer focused on scalable backend architectures, responsive web interfaces, and cross-platform mobile apps.
          </p>
        </div>

        {/* Bento-Style Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          {/* Main Story & Core Capabilities (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-5">
            {/* Story Card */}
            <div className="rounded-2xl p-5 sm:p-7 bg-[#0b101c]/80 border border-slate-800/80 backdrop-blur-xl space-y-4 shadow-lg">
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Hi, I'm Steve. Over the past 2+ years, I've helped teams and businesses build, scale, and maintain software products. My work spans the entire application lifecycle—from designing normalized relational databases and enterprise REST APIs to building fluid cross-platform mobile applications.
              </p>
              
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                I prioritize maintainable architecture over unnecessary complexity. My primary technology stack centers around <strong className="text-slate-200 font-medium">Laravel & PHP 8+</strong> on the backend, <strong className="text-slate-200 font-medium">React.js</strong> on the web, and <strong className="text-slate-200 font-medium">Flutter & Dart</strong> on mobile.
              </p>

              {/* Stack Highlight Pills */}
              <div className="pt-1 flex flex-wrap gap-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono text-slate-200">
                  <LaravelIcon className="w-4 h-4" />
                  <span>Laravel</span>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono text-slate-200">
                  <PhpIcon className="w-4 h-4" />
                  <span>PHP</span>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono text-slate-200">
                  <ReactIcon className="w-4 h-4" />
                  <span>React.js</span>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono text-slate-200">
                  <FlutterIcon className="w-4 h-4" />
                  <span>Flutter</span>
                </div>
              </div>
            </div>

            {/* Practical Craft Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              <div className="p-4 sm:p-5 rounded-2xl bg-[#0b101c]/70 border border-slate-800/80 space-y-2 hover:border-cyan-500/30 transition-all duration-300">
                <div className="p-2 w-fit rounded-xl bg-cyan-950/50 text-cyan-400 border border-cyan-500/20">
                  <Database className="w-4 h-4" />
                </div>
                <h4 className="font-bold text-white text-sm font-sans tracking-tight">Robust Schemas</h4>
                <p className="text-xs text-slate-400 leading-relaxed font-sans">
                  Normalized PostgreSQL & MySQL databases designed for data integrity, indexes, and fast queries.
                </p>
              </div>

              <div className="p-4 sm:p-5 rounded-2xl bg-[#0b101c]/70 border border-slate-800/80 space-y-2 hover:border-violet-500/30 transition-all duration-300">
                <div className="p-2 w-fit rounded-xl bg-violet-950/50 text-violet-400 border border-violet-500/20">
                  <Smartphone className="w-4 h-4" />
                </div>
                <h4 className="font-bold text-white text-sm font-sans tracking-tight">Flutter Mobile</h4>
                <p className="text-xs text-slate-400 leading-relaxed font-sans">
                  Smooth iOS & Android apps written with Flutter, responsive state management, and offline support.
                </p>
              </div>

              <div className="p-4 sm:p-5 rounded-2xl bg-[#0b101c]/70 border border-slate-800/80 space-y-2 hover:border-emerald-500/30 transition-all duration-300">
                <div className="p-2 w-fit rounded-xl bg-emerald-950/50 text-emerald-400 border border-emerald-500/20">
                  <Zap className="w-4 h-4" />
                </div>
                <h4 className="font-bold text-white text-sm font-sans tracking-tight">Reliable APIs</h4>
                <p className="text-xs text-slate-400 leading-relaxed font-sans">
                  Stateless token authentication, rate limiting, and asynchronous background worker queues.
                </p>
              </div>
            </div>
          </div>

          {/* Right Snapshot & Quick Stats Card (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div className="rounded-2xl p-5 sm:p-6 bg-[#0b101c]/80 border border-slate-800/80 backdrop-blur-xl shadow-xl flex-1 flex flex-col justify-between space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
                <div>
                  <h3 className="text-base font-bold text-white font-sans">Developer Profile</h3>
                  <p className="text-xs text-slate-400 font-mono">Steve &bull; Full-Stack & Mobile</p>
                </div>
                <div className="flex items-center gap-1.5 text-emerald-400 text-xs font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Active</span>
                </div>
              </div>

              {/* Tangible Metrics & Details */}
              <div className="space-y-4 text-xs font-mono">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-cyan-400 shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase tracking-wider">Location</span>
                    <span className="text-slate-200 font-sans text-sm font-medium">Phnom Penh, Cambodia</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-violet-400 shrink-0 mt-0.5">
                    <Briefcase className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase tracking-wider">Experience Level</span>
                    <span className="text-slate-200 font-sans text-sm font-medium">2+ Years Building Production Apps</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-emerald-400 shrink-0 mt-0.5">
                    <Code2 className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase tracking-wider">Core Strengths</span>
                    <span className="text-slate-200 font-sans text-sm font-medium">Backend Architecture &bull; Mobile Flutter</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};