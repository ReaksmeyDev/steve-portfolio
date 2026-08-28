import React, { useState } from 'react';
import { Github, FolderGit2, GitBranch, ArrowUpRight } from 'lucide-react';
import { PROJECTS_DATA } from '../data/portfolioData';
import { getTechIcon } from './TechIcons';

export const Projects: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('All');
  const tabs = ['All', 'Web', 'Mobile', 'Backend'];

  const filteredProjects = activeTab === 'All'
    ? PROJECTS_DATA
    : PROJECTS_DATA.filter((p) => p.category === activeTab);

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case 'Web': return 'text-cyan-400 bg-cyan-950/40 border-cyan-500/30';
      case 'Mobile': return 'text-violet-400 bg-violet-950/40 border-violet-500/30';
      case 'Backend': return 'text-emerald-400 bg-emerald-950/40 border-emerald-500/30';
      default: return 'text-slate-400 bg-slate-900 border-slate-700';
    }
  };

  return (
    <section id="projects" className="py-16 sm:py-24 relative overflow-hidden scroll-mt-20 sm:scroll-mt-24">
      {/* Ambient blob */}
      <div className="absolute bottom-0 right-[-5%] w-[350px] h-[350px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-left mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-cyan-950/30 border border-cyan-500/20 text-cyan-400 font-mono text-xs mb-3">
            <FolderGit2 className="w-3.5 h-3.5" />
            <span>Featured Case Studies</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Selected <span className="gradient-text-animated">Projects</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-2xl">
            Real-world systems engineered with modern frameworks, reliable data pipelines, and responsive frontends.
          </p>
        </div>

        {/* Tab Filters */}
        <div className="flex flex-wrap gap-2 mb-8 sm:mb-10 font-mono text-xs">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 sm:px-5 py-2 rounded-xl transition-all duration-300 border ${
                activeTab === tab
                  ? 'bg-cyan-500/15 text-cyan-300 border-cyan-500/50 shadow-[0_0_20px_rgba(34,211,238,0.2)] font-semibold'
                  : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-slate-200'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Project Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="rounded-2xl p-5 sm:p-6 bg-[#0b101c]/80 border border-slate-800/80 hover:border-cyan-500/40 hover:bg-[#0f172a]/90 transition-all duration-300 flex flex-col justify-between group relative backdrop-blur-xl shadow-lg hover:shadow-[0_12px_36px_rgba(0,0,0,0.5)]"
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 group-hover:border-cyan-500/30 transition-colors">
                    <FolderGit2 className="w-5 h-5 text-cyan-400" />
                  </div>
                  <span className={`text-[10px] font-mono px-2.5 py-1 rounded-full border ${getCategoryColor(project.category)}`}>
                    {project.category}
                  </span>
                </div>

                {/* Title (Modern Sans) */}
                <h3 className="text-lg sm:text-xl font-bold text-white mb-2.5 font-sans tracking-tight group-hover:text-cyan-300 transition-colors flex items-center justify-between gap-2">
                  <span>{project.title}</span>
                  <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 -translate-y-1 translate-x-1 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-200 text-cyan-400 shrink-0" />
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-6 font-sans">
                  {project.description}
                </p>
              </div>

              <div>
                {/* Tech Tags with Brand Icons */}
                <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-6">
                  {project.technologies.map((tech) => (
                    <div
                      key={tech}
                      className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-mono bg-slate-900/90 text-slate-300 border border-slate-800"
                    >
                      {getTechIcon(tech, 'w-4 h-4')}
                      <span>{tech}</span>
                    </div>
                  ))}
                </div>

                {/* Footer Action */}
                {project.githubUrl && (
                  <div className="flex items-center justify-between pt-4 border-t border-slate-800/80 font-mono text-xs">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 text-slate-300 hover:text-cyan-300 transition-colors"
                    >
                      <Github className="w-4 h-4" />
                      <span>View Source</span>
                    </a>

                    <div className="flex items-center gap-1.5 text-slate-500 text-[11px]">
                      <GitBranch className="w-3.5 h-3.5 text-emerald-400" />
                      <span>main</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Subtle top edge glow */}
              <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};