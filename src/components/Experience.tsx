import React from 'react';
import { Calendar, Building, CheckCircle2, Briefcase } from 'lucide-react';
import { EXPERIENCE_DATA } from '../data/portfolioData';
import { getTechIcon } from './TechIcons';

const ExperienceCard: React.FC<{ item: typeof EXPERIENCE_DATA[0]; index: number }> = ({ item }) => {
  return (
    <div className="relative">
      {/* Timeline Dot – Glowing Ring */}
      <div className="absolute -left-[calc(1.5rem+9px)] sm:-left-[calc(2.5rem+9px)] top-2">
        <div className="relative">
          <div className="w-4 h-4 rounded-full bg-[#05070e] border-2 border-cyan-400 z-10 relative" />
          <div className="absolute inset-0 w-4 h-4 rounded-full bg-cyan-400/30 animate-ping" />
          <div className="absolute -inset-1 w-6 h-6 rounded-full bg-cyan-400/10 animate-pulse" />
        </div>
      </div>

      {/* Experience Card */}
      <div className="rounded-2xl p-4 sm:p-6 bg-[#0b101c]/80 border border-slate-800/80 hover:border-cyan-500/30 hover:bg-[#0f172a]/90 transition-all duration-300 backdrop-blur-xl shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-3 mb-3">
          <h3 className="text-base sm:text-lg font-bold text-white font-mono flex items-center gap-2">
            <span>{item.position}</span>
          </h3>
          <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] font-mono text-cyan-400 bg-cyan-950/40 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full border border-cyan-500/20 w-fit">
            <Calendar className="w-3 sm:w-3.5 h-3 sm:h-3.5" />
            <span>{item.period}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-400 mb-3 sm:mb-4 font-mono">
          <Building className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-cyan-400/70 shrink-0" />
          <span className="text-slate-300 font-semibold">{item.organization}</span>
        </div>

        <p className="text-xs sm:text-sm text-slate-400 mb-4 sm:mb-5 leading-relaxed font-sans">
          {item.description}
        </p>

        <div className="space-y-2.5 mb-5 sm:mb-6">
          {item.responsibilities.map((resp, idx) => (
            <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
              <CheckCircle2 className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span className="leading-normal">{resp}</span>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-1.5 pt-3 sm:pt-4 border-t border-slate-800/80">
          {item.technologies.map((tech) => (
            <div
              key={tech}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] sm:text-[11px] font-mono bg-slate-900/90 text-slate-300 border border-slate-800"
            >
              {getTechIcon(tech, 'w-3.5 h-3.5')}
              <span>{tech}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const Experience: React.FC = () => {
  return (
    <section id="experience" className="py-16 sm:py-24 relative overflow-hidden scroll-mt-20 sm:scroll-mt-24">
      {/* Background Accent */}
      <div className="absolute top-1/3 left-[-80px] w-[300px] h-[300px] bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-left mb-8 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-cyan-950/30 border border-cyan-500/20 text-cyan-400 font-mono text-xs mb-3">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Career Milestones</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Work <span className="gradient-text-animated">Experience</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-2xl">
            Track record of shipping software solutions, architecting databases, and leading technical deliveries.
          </p>
        </div>

        {/* Liquid Timeline */}
        <div className="relative liquid-timeline ml-2 sm:ml-6 space-y-6 sm:space-y-12 pl-6 sm:pl-10">
          {EXPERIENCE_DATA.map((item, index) => (
            <ExperienceCard key={item.id} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};