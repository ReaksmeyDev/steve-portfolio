import React from 'react';
import { Building, MapPin, Calendar } from 'lucide-react';
import { EXPERIENCE_DATA } from '../data/portfolioData';

export const Experience: React.FC = React.memo(() => {
  return (
    <section id="experience" className="py-16 sm:py-24 relative overflow-hidden scroll-mt-20 sm:scroll-mt-24 topo-lines-overlay">
      {/* Ambient Liquid Gradient Blobs (Fluid Glass Refraction) */}
      <div className="liquid-blob w-[450px] h-[450px] bg-cyan-500/[0.045] top-[20%] right-[-5%] pointer-events-none" aria-hidden="true" />
      <div className="liquid-blob w-[380px] h-[380px] bg-cyan-400/[0.035] bottom-[15%] left-[-5%] pointer-events-none" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Section matching architectural blueprint design */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12 sm:mb-16">
          <div>
            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black text-slate-900 dark:text-white tracking-tight font-sans uppercase">
              EXPERIENCE
            </h2>
          </div>
          <div className="sm:text-right">
            <span className="block text-xs sm:text-sm font-mono tracking-widest text-cyan-600 dark:text-cyan-400 uppercase font-semibold">
              CAREER TRACK
            </span>
            <span className="block text-xs sm:text-sm font-mono tracking-widest text-slate-500 dark:text-slate-400 uppercase font-medium mt-0.5">
              PRODUCTION SYSTEMS
            </span>
          </div>
        </div>

        {/* Connected Vertical Timeline (Zero Radius Architecture) */}
        <div className="relative pl-6 sm:pl-12 lg:pl-14">
          {/* Continuous Left Vertical Spine Track */}
          <div
            className="absolute left-2 sm:left-4 top-2 bottom-3 w-0.5 bg-gradient-to-b from-cyan-400 via-cyan-500/50 to-slate-300 dark:to-slate-800"
            aria-hidden="true"
          />

          <div className="space-y-12">
            {EXPERIENCE_DATA.map((item, index) => {
              // const formattedIndex = String(index + 1).padStart(2, '0');

              return (
                <div key={item.id} className="relative group">
                  {/* Milestone Node on the Spine (Zero Radius Square) */}
                  <div
                    className="timeline-spine-node absolute -left-6 sm:-left-12 -top-1.5 w-7 h-7 sm:w-8 sm:h-8 rounded-none bg-slate-950 dark:bg-slate-950 border-2 border-cyan-400 flex items-center justify-center z-20 pointer-events-none"
                    aria-hidden="true"
                  >
                    <span className="w-2.5 h-2.5 rounded-none bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
                  </div>

                  {/* Horizontal Connector Arm linking Spine directly to the Card */}
                  <div
                    className="hidden sm:block absolute -left-4 top-2.5 w-8 h-px bg-gradient-to-r from-cyan-400 to-cyan-500/20 pointer-events-none"
                    aria-hidden="true"
                  />

                  {/* Connected Timeline Card (Zero Radius) */}
                  <div className="timeline-card rounded-none p-6 sm:p-10 lg:p-12 transition-all duration-300">
                    {/* Meta Header Strip */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200/80 dark:border-slate-800/80">
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-mono font-bold tracking-wider text-cyan-600 dark:text-cyan-400 uppercase">
                          // FULL-TIME PRODUCTION
                        </span>
                      </div>

                      {/* Date Badge (Zero Radius) */}
                      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-none bg-cyan-950/40 border border-cyan-500/40 text-cyan-300 font-mono text-xs font-semibold self-start sm:self-auto shadow-sm">
                        <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                        <span>{item.period}</span>
                        {/* <span className="w-1.5 h-1.5 rounded-none bg-emerald-400 animate-pulse ml-1" />
                        <span className="text-[10px] text-emerald-400 uppercase font-bold tracking-wider">ACTIVE</span> */}
                      </div>
                    </div>

                    {/* Role & Company Header */}
                    <div className="mt-6 mb-8">
                      <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight font-sans uppercase">
                        {item.position}
                      </h3>

                      <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm font-mono text-slate-500 dark:text-slate-400 mt-3">
                        <span className="flex items-center gap-1.5 text-slate-900 dark:text-slate-100 font-bold">
                          <Building className="w-4 h-4 text-cyan-500" />
                          <span>{item.organization}</span>
                        </span>
                        <span className="text-slate-400 dark:text-slate-600">&bull;</span>
                        <span className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
                          <MapPin className="w-3.5 h-3.5 text-cyan-500/80" />
                          <span>Phnom Penh, Cambodia</span>
                        </span>
                      </div>

                      <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-sans mt-4 max-w-4xl">
                        {item.description}
                      </p>
                    </div>

                    {/* Key Contributions & System Deliverables */}
                    <div className="pt-8 border-t border-slate-200/80 dark:border-slate-800/80">
                      {/* <span className="text-xs font-mono font-bold tracking-wider text-cyan-600 dark:text-cyan-400 uppercase block mb-5">
                        // KEY CONTRIBUTIONS & SYSTEM DELIVERABLES
                      </span> */}

                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-3.5">
                        {item.responsibilities.map((resp, idx) => (
                          <div
                            key={idx}
                            className="flex items-start gap-3 p-3.5 rounded-none bg-white/60 dark:bg-slate-900/50 border border-slate-200/80 dark:border-slate-800/80 text-xs sm:text-sm text-slate-700 dark:text-slate-300 group/item hover:border-cyan-500/40 transition-colors"
                          >
                            <span className="font-mono text-xs font-bold text-cyan-600 dark:text-cyan-400 shrink-0 mt-0.5 rounded-none">
                              [0{idx + 1}]
                            </span>
                            <span className="leading-relaxed font-sans flex-1">
                              {resp}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Terminal Anchor Node at End of Spine (Zero Radius) */}
          <div className="relative pt-6 flex items-center gap-3">
            <div
              className="absolute -left-5 sm:-left-11 w-4 h-4 rounded-none bg-cyan-950 border border-cyan-400/60 flex items-center justify-center z-10"
              aria-hidden="true"
            >
              <span className="w-1.5 h-1.5 rounded-none bg-cyan-400" />
            </div>
            <span className="text-xs font-mono text-slate-400 dark:text-slate-500 tracking-wider">
              // CONTINUOUS ENGINEERING TRACK &bull; PRODUCTION READY
            </span>
          </div>
        </div>
      </div>
    </section>
  );
});