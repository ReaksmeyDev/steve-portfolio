import React from 'react';
import { Globe, Smartphone, Server, Cpu } from 'lucide-react';
import { SERVICES_DATA } from '../data/portfolioData';
import { getTechIcon } from './TechIcons';

const iconConfig: Record<string, { icon: React.ElementType; color: string; border: string; glow: string }> = {
  'srv-web': { icon: Globe, color: 'text-cyan-400', border: 'border-cyan-500/30', glow: 'shadow-[0_0_20px_rgba(34,211,238,0.2)]' },
  'srv-mobile': { icon: Smartphone, color: 'text-violet-400', border: 'border-violet-500/30', glow: 'shadow-[0_0_20px_rgba(167,139,250,0.2)]' },
  'srv-backend': { icon: Server, color: 'text-emerald-400', border: 'border-emerald-500/30', glow: 'shadow-[0_0_20px_rgba(16,185,129,0.2)]' },
  'srv-devops': { icon: Cpu, color: 'text-amber-400', border: 'border-amber-500/30', glow: 'shadow-[0_0_20px_rgba(245,158,11,0.2)]' },
};

export const Services: React.FC = () => {
  return (
    <section id="services" className="py-10 sm:py-16 relative overflow-hidden scroll-mt-20 sm:scroll-mt-24">
      {/* Background Accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-pink-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-left mb-6 sm:mb-10">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Solutions I <span className="gradient-text-animated">Deliver</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-2xl">
            From cross-platform apps to enterprise API backends, I bring end-to-end engineering to production.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
          {SERVICES_DATA.map((srv) => {
            const config = iconConfig[srv.id] || { icon: Cpu, color: 'text-slate-400', border: 'border-slate-700', glow: '' };
            const IconComp = config.icon;

            return (
              <div
                key={srv.id}
                className="rounded-2xl p-5 sm:p-7 bg-[#0b101c]/80 border border-slate-800/80 hover:border-cyan-500/30 hover:bg-[#0f172a]/90 transition-all duration-300 group backdrop-blur-xl shadow-lg relative flex flex-col justify-between"
              >
                <div>
                  {/* Icon */}
                  <div className={`p-3 sm:p-3.5 w-fit rounded-2xl bg-slate-900 border ${config.border} ${config.color} mb-4 sm:mb-5 group-hover:scale-105 ${config.glow} transition-all duration-300`}>
                    <IconComp className="w-5 sm:w-6 h-5 sm:h-6" />
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-white font-sans tracking-tight mb-2.5 group-hover:text-cyan-300 transition-colors">
                    {srv.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-6 font-sans">
                    {srv.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-4 border-t border-slate-800/80">
                  {srv.skills.map((skill) => (
                    <div
                      key={skill}
                      className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-mono bg-slate-900/90 text-slate-300 border border-slate-800"
                    >
                      {getTechIcon(skill, 'w-4 h-4')}
                      <span>{skill}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};