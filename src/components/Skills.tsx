import React, { useState, useMemo } from 'react';
import { SKILLS_DATA } from '../data/portfolioData';
import { getTechIcon, getTechBrandColor } from './TechIcons';

export const Skills: React.FC = React.memo(() => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const categories = ['All', 'Frontend', 'Backend', 'Database', 'DevOps & Infra'];

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: SKILLS_DATA.length };
    categories.forEach((cat) => {
      if (cat !== 'All') {
        counts[cat] = SKILLS_DATA.filter((s) => s.category === cat).length;
      }
    });
    return counts;
  }, [categories]);

  const filteredSkills = useMemo(() => {
    return selectedCategory === 'All'
      ? SKILLS_DATA
      : SKILLS_DATA.filter((s) => s.category === selectedCategory);
  }, [selectedCategory]);

  const getCategoryColor = (_cat: string) => {
    return 'text-cyan-300 border-cyan-500/30 bg-cyan-950/40';
  };

  return (
    <section id="skills" className="py-12 sm:py-20 relative overflow-hidden scroll-mt-20 sm:scroll-mt-24">
      {/* Background Accent (Pure Cyan) */}
      <div className="absolute top-1/2 left-[-10%] w-[350px] h-[350px] bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[350px] h-[350px] bg-cyan-600/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-left mb-8 sm:mb-12">
          <span className="font-mono text-xs text-cyan-400 uppercase tracking-widest block mb-2">// Technical Expertise</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Tools & <span className="gradient-text-animated">Technologies</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2.5 max-w-2xl leading-relaxed">
            Technologies, libraries, and infrastructure actively deployed across production systems.
          </p>
        </div>

        {/* Category Filters with Counts */}
        <div className="flex flex-wrap gap-2 mb-8 font-mono text-xs">
          {categories.map((cat) => {
            const count = categoryCounts[cat] || 0;
            const isSelected = selectedCategory === cat;

            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl transition-all duration-200 border flex items-center gap-2 ${
                  isSelected
                    ? 'bg-cyan-500/15 text-cyan-300 border-cyan-500/50 shadow-[0_0_16px_rgba(34,211,238,0.2)] font-semibold scale-[1.01]'
                    : 'bg-slate-900/70 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-slate-200'
                }`}
              >
                <span>{cat}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                  isSelected ? 'bg-cyan-400/20 text-cyan-300' : 'bg-slate-800 text-slate-500'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Skills Grid */}
        <div key={selectedCategory} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 tab-fade-in">
          {filteredSkills.map((skill) => {
            const brandStyle = getTechBrandColor(skill.name);
            const badgeClass = getCategoryColor(skill.category);

            return (
              <div
                key={skill.name}
                className={`rounded-2xl p-5 sm:p-6 bg-[#0b101c] border border-slate-800/80 ${brandStyle.borderHover} hover:bg-[#0f172a] transition-all duration-200 group relative shadow-sm hover:-translate-y-1 flex flex-col justify-between`}
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <div className="shrink-0 group-hover:scale-110 transition-transform duration-200 flex items-center justify-center p-1 rounded-lg">
                        {getTechIcon(skill.name, 'w-7 h-7 object-contain')}
                      </div>
                      <h3 className="font-bold text-white group-hover:text-cyan-300 transition-colors font-sans tracking-tight text-base sm:text-lg">
                        {skill.name}
                      </h3>
                    </div>

                    <span className={`text-[10px] font-mono font-medium px-2 py-0.5 rounded-md border ${badgeClass}`}>
                      {skill.category}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-sans mt-2">
                    {skill.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between text-[11px] font-mono text-slate-500">
                  <span>Production Ready</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/50 group-hover:bg-cyan-400 transition-colors" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
});