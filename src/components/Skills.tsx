import React, { useState } from 'react';
import { SKILLS_DATA } from '../data/portfolioData';
import { useScrollAnimation, useStaggeredAnimation } from '../hooks/useScrollAnimation';
import { getTechIcon, getTechBrandColor } from './TechIcons';
import { Layers, Sparkles, CheckCircle2 } from 'lucide-react';

export const Skills: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const categories = ['All', 'Frontend', 'Backend', 'Database', 'DevOps & Infra'];
  const headerAnim = useScrollAnimation();

  const filteredSkills = selectedCategory === 'All'
    ? SKILLS_DATA
    : SKILLS_DATA.filter((s) => s.category === selectedCategory);

  const gridAnim = useStaggeredAnimation(filteredSkills.length);

  const getCategoryBadge = (cat: string) => {
    switch (cat) {
      case 'Frontend':
        return 'text-cyan-400 bg-cyan-950/40 border-cyan-500/30';
      case 'Backend':
        return 'text-violet-400 bg-violet-950/40 border-violet-500/30';
      case 'Database':
        return 'text-emerald-400 bg-emerald-950/40 border-emerald-500/30';
      case 'DevOps & Infra':
        return 'text-amber-400 bg-amber-950/40 border-amber-500/30';
      default:
        return 'text-slate-400 bg-slate-900 border-slate-700';
    }
  };

  return (
    <section id="skills" className="py-16 sm:py-24 relative overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-[-10%] w-[350px] h-[350px] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[350px] h-[350px] bg-violet-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div
          ref={headerAnim.ref}
          className={`text-left mb-8 sm:mb-12 scroll-fade-up ${headerAnim.isVisible ? 'visible' : ''}`}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-cyan-950/30 border border-cyan-500/20 text-cyan-400 font-mono text-xs mb-3">
            <Layers className="w-3.5 h-3.5" />
            <span>Technical Mastery</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Skills & <span className="gradient-text-animated">Expertise</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-2xl">
            Official tools, languages, and distributed frameworks actively deployed across production systems.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 mb-8 sm:mb-10 font-mono text-xs">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 sm:px-5 py-2 rounded-xl transition-all duration-300 border flex items-center gap-1.5 ${
                selectedCategory === cat
                  ? 'bg-cyan-500/15 text-cyan-300 border-cyan-500/50 shadow-[0_0_20px_rgba(34,211,238,0.2)] font-semibold'
                  : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-slate-200'
              }`}
            >
              <span>{cat}</span>
              {selectedCategory === cat && <Sparkles className="w-3 h-3 text-cyan-400" />}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div
          ref={gridAnim.containerRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5"
        >
          {filteredSkills.map((skill, index) => {
            const brandStyle = getTechBrandColor(skill.name);

            return (
              <div
                key={skill.name}
                className={`rounded-2xl p-5 sm:p-6 bg-[#0b101c]/85 border border-slate-800/80 ${brandStyle.borderHover} ${brandStyle.glow} hover:bg-[#0f172a] transition-all duration-300 group relative backdrop-blur-xl shadow-sm hover:-translate-y-1`}
                style={gridAnim.getItemStyle(index)}
              >
                <div className="flex items-start justify-between gap-3 mb-3.5">
                  <div className="flex items-center gap-3.5">
                    {/* Brand Tech Icon Container */}
                    <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 shadow-inner group-hover:scale-110 transition-transform duration-300 shrink-0 flex items-center justify-center">
                      {getTechIcon(skill.name, 'w-7 h-7 object-contain')}
                    </div>
                    <div>
                      <h3 className="font-bold text-white group-hover:text-cyan-300 transition-colors font-sans tracking-tight text-base sm:text-lg flex items-center gap-1.5">
                        <span>{skill.name}</span>
                      </h3>
                      <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1 mt-0.5">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Production Ready</span>
                      </span>
                    </div>
                  </div>

                  <span className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full border ${getCategoryBadge(skill.category)}`}>
                    {skill.category}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-sans mt-2">
                  {skill.description}
                </p>

                {/* Bottom subtle brand accent glow */}
                <div className="absolute inset-x-0 bottom-0 h-[1.5px] bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};