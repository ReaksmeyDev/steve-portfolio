import React, { useState, useMemo, useEffect } from 'react';
import { Github, ExternalLink, ArrowUpRight, FolderGit2, CheckCircle2, Layers, X, MessageSquare, Sparkles } from 'lucide-react';
import { PROJECTS_DATA } from '../data/portfolioData';
import { getTechIcon } from './TechIcons';

const PROJECT_DETAILS: Record<string, {
  headline: string;
  problem: string;
  solution: string;
  architectureHighlights: string[];
  metrics: { label: string; value: string }[];
}> = {
  'school-management': {
    headline: 'Multi-Tier Operational & Academic ERP System',
    problem: 'Disparate administrative spreadsheets led to data mismatch, slow quarterly report generation, and lack of role-based security across staff, students, and administration.',
    solution: 'Designed an integrated Laravel and React single-page platform with granular RBAC permissions, normalized MySQL schema, and asynchronous queue workers for batch grade reporting.',
    architectureHighlights: [
      'Role-based Access Control (RBAC) microservice guarding sensitive academic operations',
      'Normalized schema across MySQL with indexing for high-frequency attendance logging',
      'Automated batch report card generation leveraging asynchronous queue workers',
      'Modular React.js single-page application with responsive administrative dashboards'
    ],
    metrics: [
      { label: 'Active Students', value: '1,240+' },
      { label: 'Query Latency', value: '< 25ms' },
      { label: 'Uptime', value: '99.9%' }
    ]
  },
  'rules-search': {
    headline: 'Cross-Platform Offline Regulatory Query App',
    problem: 'Field consultants and compliance auditors required instantaneous access to extensive regulatory decrees without guaranteed cellular internet access.',
    solution: 'Engineered a cross-platform mobile application in Flutter and Dart using a local SQLite database that synchronizes incrementally with a Laravel REST backend.',
    architectureHighlights: [
      'Custom offline-first SQLite cache with delta-sync algorithms against REST endpoints',
      'Multi-keyword fuzzy token matching allowing rapid legal clause discovery',
      'Optimized isolate-driven JSON parsing for lag-free 60 FPS scrolling on mobile',
      'Cross-platform codebase delivering pixel-perfect UX on iOS and Android'
    ],
    metrics: [
      { label: 'Search Latency', value: '< 10ms' },
      { label: 'Indexed Decrees', value: '10,000+' },
      { label: 'Offline Support', value: '100%' }
    ]
  },
  'ocr-engine': {
    headline: 'High-Throughput Asynchronous Document Ingestion Pipeline',
    problem: 'Scanning and processing physical multi-page administrative forms was error-prone, manually intensive, and unsearchable.',
    solution: 'Architected an asynchronous pipeline in Laravel with Redis queue workers that accepts multi-page PDF uploads, coordinates cloud OCR extraction, and structures data into searchable records.',
    architectureHighlights: [
      'Asynchronous task workers managed via Redis queues for zero-blocking HTTP requests',
      'Integration with Google Cloud Vision OCR API for accurate optical character recognition',
      'Regex-based and heuristic entity parsing pipeline converting unstructured text to SQL',
      'Automated webhook notifications dispatching completion status to client apps'
    ],
    metrics: [
      { label: 'Parsing Speed', value: '0.42s/page' },
      { label: 'Accuracy', value: '99.2%' },
      { label: 'Batch Capacity', value: '500+ docs/hr' }
    ]
  },
  'documents-management-system': {
    headline: 'Centralized Enterprise Document Storage & Indexing System',
    problem: 'Fragmented document storage across disconnected hard drives led to lost archives, versioning conflicts, and lack of permission control.',
    solution: 'Constructed a centralized web archiving portal with Laravel and MySQL featuring hierarchical taxonomy categorization, fast full-text searching, and immutable audit logs.',
    architectureHighlights: [
      'Hierarchical category taxonomy with automated tag extraction and metadata indexing',
      'Full-text MySQL searching across title, description, and indexed document metadata',
      'Secure signed URL generation for restricted document downloads and expirations',
      'Complete immutable audit logging recording all document reads, edits, and exports'
    ],
    metrics: [
      { label: 'Query Speed', value: '< 18ms' },
      { label: 'Storage Modes', value: 'Cloud / Local' },
      { label: 'Audit Trail', value: 'Complete' }
    ]
  }
};

export const Projects: React.FC = React.memo(() => {
  const [activeTab, setActiveTab] = useState<string>('All');
  const [selectedProject, setSelectedProject] = useState<typeof PROJECTS_DATA[0] | null>(null);
  const tabs = ['All', 'Web', 'Mobile', 'Backend'];

  // Lock body scroll and listen for Escape key when modal is open
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setSelectedProject(null);
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [selectedProject]);

  const tabCounts = useMemo(() => {
    const counts: Record<string, number> = { All: PROJECTS_DATA.length };
    tabs.forEach((t) => {
      if (t !== 'All') {
        counts[t] = PROJECTS_DATA.filter((p) => p.category === t).length;
      }
    });
    return counts;
  }, [tabs]);

  const filteredProjects = useMemo(() => {
    return activeTab === 'All'
      ? PROJECTS_DATA
      : PROJECTS_DATA.filter((p) => p.category === activeTab);
  }, [activeTab]);

  const getCategoryColor = (_cat: string) => {
    return 'text-cyan-300 border-cyan-500/30 bg-cyan-950/40';
  };

  // Render an editorial visual preview graphic for each project
  const renderProjectVisual = (project: typeof PROJECTS_DATA[0], index: number) => {
    const formattedIndex = String(index + 1).padStart(2, '0');

    if (project.id === 'school-management') {
      return (
        <div className="relative w-full h-48 sm:h-56 bg-[#070b14] rounded-xl overflow-hidden border border-slate-800/90 p-4 font-mono text-[11px] flex flex-col justify-between group-hover:border-cyan-500/30 transition-colors">
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-2.5 text-slate-500">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-700" />
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-600/60" />
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400/80" />
            </div>
            <span className="text-[10px] text-slate-400">portal.school-admin.local</span>
            <span className="text-cyan-400/80 font-bold">{formattedIndex}</span>
          </div>

          <div className="grid grid-cols-3 gap-2 my-auto">
            <div className="p-2.5 rounded-lg bg-slate-900/90 border border-slate-800 text-left">
              <span className="text-[10px] text-slate-500 block">Enrolled</span>
              <span className="text-sm sm:text-base font-bold text-white">1,240</span>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-900/90 border border-slate-800 text-left">
              <span className="text-[10px] text-slate-500 block">Attendance</span>
              <span className="text-sm sm:text-base font-bold text-cyan-300">98.4%</span>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-900/90 border border-slate-800 text-left">
              <span className="text-[10px] text-slate-500 block">Courses</span>
              <span className="text-sm sm:text-base font-bold text-cyan-400">48</span>
            </div>
          </div>

          <div className="flex items-center justify-between text-[10px] text-slate-500 pt-2 border-t border-slate-800/60">
            <span className="text-slate-400">Auth: Role-Based RBAC</span>
            <span className="text-cyan-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" /> API Connected
            </span>
          </div>
        </div>
      );
    }

    if (project.id === 'rules-search') {
      return (
        <div className="relative w-full h-48 sm:h-56 bg-[#070b14] rounded-xl overflow-hidden border border-slate-800/90 p-4 font-mono text-[11px] flex flex-col justify-between group-hover:border-cyan-500/30 transition-colors">
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-2.5 text-slate-500">
            <div className="flex items-center gap-2">
              <span className="text-cyan-300 font-semibold">Flutter Engine</span>
            </div>
            <span className="text-cyan-400/80 font-bold">{formattedIndex}</span>
          </div>

          <div className="space-y-2 my-auto">
            <div className="px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 flex items-center justify-between text-xs">
              <span>Q: "tax compliance article 14"</span>
              <span className="text-cyan-400 text-[10px]">Indexed</span>
            </div>
            <div className="p-2.5 rounded-lg bg-cyan-950/20 border border-cyan-500/20 text-left space-y-1">
              <span className="text-xs text-white font-semibold block">Regulatory Decree No. 42</span>
              <p className="text-[10px] text-slate-400 line-clamp-1">Full offline cache enabled &bull; Multi-keyword match</p>
            </div>
          </div>

          <div className="flex items-center justify-between text-[10px] text-slate-500 pt-2 border-t border-slate-800/60">
            <span>iOS & Android</span>
            <span className="text-cyan-400">SQLite + REST Sync</span>
          </div>
        </div>
      );
    }

    if (project.id === 'ocr-engine') {
      return (
        <div className="relative w-full h-48 sm:h-56 bg-[#070b14] rounded-xl overflow-hidden border border-slate-800/90 p-4 font-mono text-[11px] flex flex-col justify-between group-hover:border-cyan-500/30 transition-colors">
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-2.5 text-slate-500">
            <span className="text-cyan-300 font-semibold">Pipeline: Cloud Vision</span>
            <span className="text-cyan-400/80 font-bold">{formattedIndex}</span>
          </div>

          <div className="space-y-1.5 my-auto text-left text-[11px]">
            <div className="flex items-center justify-between text-slate-400 bg-slate-900/60 px-2.5 py-1.5 rounded-md border border-slate-800/80">
              <span className="text-cyan-400">[INGEST]</span>
              <span>contract_2026.pdf (12 pages)</span>
            </div>
            <div className="flex items-center justify-between text-slate-400 bg-slate-900/60 px-2.5 py-1.5 rounded-md border border-slate-800/80">
              <span className="text-cyan-300">[OCR]</span>
              <span>Parsed 4,820 tokens (0.42s)</span>
            </div>
            <div className="flex items-center justify-between text-slate-400 bg-slate-900/60 px-2.5 py-1.5 rounded-md border border-slate-800/80">
              <span className="text-cyan-400">[INDEX]</span>
              <span className="text-cyan-300 font-semibold">Stored in MySQL DB</span>
            </div>
          </div>

          <div className="flex items-center justify-between text-[10px] text-slate-500 pt-2 border-t border-slate-800/60">
            <span>Worker Queue: Redis</span>
            <span className="text-cyan-400">Async Batch Mode</span>
          </div>
        </div>
      );
    }

    // documents-management-system or default
    return (
      <div className="relative w-full h-48 sm:h-56 bg-[#070b14] rounded-xl overflow-hidden border border-slate-800/90 p-4 font-mono text-[11px] flex flex-col justify-between group-hover:border-cyan-500/30 transition-colors">
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-2.5 text-slate-500">
          <span className="text-cyan-400 font-semibold">Document Archive</span>
          <span className="text-cyan-400/80 font-bold">{formattedIndex}</span>
        </div>

        <div className="grid grid-cols-2 gap-2 my-auto">
          <div className="p-2.5 rounded-lg bg-slate-900/90 border border-slate-800 text-left space-y-1">
            <span className="text-[10px] text-slate-500 block">Cataloging</span>
            <span className="text-xs font-semibold text-white block">Auto Tagging</span>
            <span className="text-[10px] text-cyan-400">Taxonomy Matrix</span>
          </div>
          <div className="p-2.5 rounded-lg bg-slate-900/90 border border-slate-800 text-left space-y-1">
            <span className="text-[10px] text-slate-500 block">Query Speed</span>
            <span className="text-xs font-semibold text-cyan-400 block">&lt; 18ms</span>
            <span className="text-[10px] text-slate-400">Indexed Columns</span>
          </div>
        </div>

        <div className="flex items-center justify-between text-[10px] text-slate-500 pt-2 border-t border-slate-800/60">
          <span>Storage: Cloud / Local</span>
          <span className="text-cyan-400">Full Text Search</span>
        </div>
      </div>
    );
  };

  return (
    <section id="projects" className="py-12 sm:py-20 relative overflow-hidden scroll-mt-20 sm:scroll-mt-24">
      {/* Ambient background (Cyan Vibe) */}
      <div className="absolute bottom-0 right-[-5%] w-[350px] h-[350px] bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-left mb-8 sm:mb-12">
          <span className="font-mono text-xs text-cyan-400 uppercase tracking-widest block mb-2">// Featured Work</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Selected <span className="gradient-text-animated">Projects</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2.5 max-w-2xl leading-relaxed">
            Real-world systems engineered with modern backend pipelines, responsive frontends, and cross-platform mobile apps.
          </p>
        </div>

        {/* Tab Filters */}
        <div className="flex flex-wrap gap-2 mb-8 font-mono text-xs">
          {tabs.map((tab) => {
            const count = tabCounts[tab] || 0;
            const isSelected = activeTab === tab;

            return (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-xl transition-all duration-200 border flex items-center gap-2 ${
                  isSelected
                    ? 'bg-cyan-500/15 text-cyan-300 border-cyan-500/50 shadow-[0_0_16px_rgba(34,211,238,0.2)] font-semibold scale-[1.01]'
                    : 'bg-slate-900/70 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-slate-200'
                }`}
              >
                <span>{tab}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                  isSelected ? 'bg-cyan-400/20 text-cyan-300' : 'bg-slate-800 text-slate-500'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Editorial Project Cards Grid */}
        <div key={activeTab} className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 tab-fade-in">
          {filteredProjects.map((project, index) => {
            const badgeClass = getCategoryColor(project.category);

            return (
              <article
                key={project.id}
                className="rounded-2xl p-5 sm:p-7 bg-[#0b101c] border border-slate-800/80 hover:border-cyan-500/40 hover:bg-[#0f172a] transition-all duration-200 group flex flex-col justify-between shadow-lg hover:-translate-y-1 relative"
              >
                <div>
                  {/* Top Preview Graphical Mock */}
                  <div className="mb-5">
                    {renderProjectVisual(project, index)}
                  </div>

                  {/* Category & Title */}
                  <div className="flex items-center justify-between gap-3 mb-2.5">
                    <span className={`text-[10px] font-mono font-medium px-2 py-0.5 rounded-md border ${badgeClass}`}>
                      {project.category}
                    </span>
                    <span className="font-mono text-xs text-slate-500">
                      Project #{String(index + 1).padStart(2, '0')}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-2.5 font-sans tracking-tight group-hover:text-cyan-300 transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-6 font-sans">
                    {project.description}
                  </p>
                </div>

                <div>
                  {/* Technology Tags */}
                  <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-6">
                    {project.technologies.map((tech) => (
                      <div
                        key={tech}
                        className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-mono bg-slate-900 text-slate-300 border border-slate-800"
                      >
                        {getTechIcon(tech, 'w-3.5 h-3.5')}
                        <span>{tech}</span>
                      </div>
                    ))}
                  </div>

                  {/* Working Action Links */}
                  <div className="flex items-center justify-between pt-4 border-t border-slate-800/80 font-mono text-xs">
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => setSelectedProject(project)}
                        className="inline-flex items-center gap-1.5 text-cyan-400 hover:text-cyan-300 hover:underline transition-colors font-semibold"
                        aria-label={`View architecture details for ${project.title}`}
                      >
                        <span>View Architecture</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>

                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 text-slate-300 hover:text-cyan-300 transition-colors"
                          aria-label={`View source code for ${project.title}`}
                        >
                          <Github className="w-4 h-4 text-slate-400" />
                          <span>Code</span>
                        </a>
                      )}
                    </div>

                    <div className="flex items-center gap-1 text-slate-500 text-[11px]">
                      <span className="w-2 h-2 rounded-full bg-cyan-400/80" />
                      <span>Shipped</span>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* Interactive Architecture Case Study Modal */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-fade-in"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-project-title"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-[#0b101c] border border-slate-800 p-6 sm:p-8 shadow-2xl text-left space-y-6"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setSelectedProject(null)}
              className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white bg-slate-900 border border-slate-800 hover:border-cyan-500/40 transition-colors focus-visible:ring-1 focus-visible:ring-cyan-400"
              aria-label="Close project details"
            >
              <X className="w-5 h-5 text-cyan-400" />
            </button>

            {/* Header Info */}
            <div className="space-y-2 pr-10">
              <div className="flex items-center gap-2 text-xs font-mono">
                <span className="text-[10px] font-medium px-2 py-0.5 rounded-md border text-cyan-300 border-cyan-500/30 bg-cyan-950/40">
                  {selectedProject.category}
                </span>
                <span className="text-slate-500">&bull;</span>
                <span className="text-cyan-400/90 font-semibold">Production Ready</span>
              </div>
              <h3 id="modal-project-title" className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {selectedProject.title}
              </h3>
              <p className="text-sm sm:text-base text-cyan-300 font-mono">
                {PROJECT_DETAILS[selectedProject.id]?.headline || selectedProject.description}
              </p>
            </div>

            {/* Graphical Preview Card */}
            <div className="border border-slate-800 rounded-xl overflow-hidden">
              {renderProjectVisual(selectedProject, PROJECTS_DATA.findIndex((p) => p.id === selectedProject.id))}
            </div>

            {/* Metrics Highlights Bar */}
            {PROJECT_DETAILS[selectedProject.id]?.metrics && (
              <div className="grid grid-cols-3 gap-2 sm:gap-3 p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 font-mono text-center">
                {PROJECT_DETAILS[selectedProject.id].metrics.map((m) => (
                  <div key={m.label}>
                    <span className="text-slate-500 text-[10px] uppercase tracking-wider block">{m.label}</span>
                    <span className="text-base sm:text-lg font-bold text-white block mt-0.5">{m.value}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Problem & Solution Breakdown */}
            <div className="space-y-4 text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 space-y-1">
                <span className="font-mono text-[11px] text-slate-400 uppercase tracking-wider block">// The Challenge</span>
                <p>{PROJECT_DETAILS[selectedProject.id]?.problem}</p>
              </div>
              <div className="p-4 rounded-xl bg-cyan-950/30 border border-cyan-500/20 space-y-1">
                <span className="font-mono text-[11px] text-cyan-400 uppercase tracking-wider block">// Engineering Solution</span>
                <p>{PROJECT_DETAILS[selectedProject.id]?.solution}</p>
              </div>
            </div>

            {/* Architecture Highlights */}
            {PROJECT_DETAILS[selectedProject.id]?.architectureHighlights && (
              <div className="space-y-2.5">
                <span className="font-mono text-xs text-slate-400 uppercase tracking-wider block">// Architecture Highlights</span>
                <div className="space-y-2 text-xs sm:text-sm text-slate-300">
                  {PROJECT_DETAILS[selectedProject.id].architectureHighlights.map((highlight, idx) => (
                    <div key={idx} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tech Stack Chips */}
            <div className="pt-2">
              <span className="font-mono text-xs text-slate-400 uppercase tracking-wider block mb-2.5">// Technologies Deployed</span>
              <div className="flex flex-wrap gap-2">
                {selectedProject.technologies.map((tech) => (
                  <div
                    key={tech}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono bg-slate-900 text-slate-300 border border-slate-800"
                  >
                    {getTechIcon(tech, 'w-4 h-4')}
                    <span>{tech}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Modal Footer Actions */}
            <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 text-xs font-mono">
              <a
                href="#contact"
                onClick={() => {
                  setSelectedProject(null);
                  const el = document.getElementById('contact');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold transition-all shadow-md shadow-cyan-500/20"
              >
                <MessageSquare className="w-4 h-4 text-slate-950" />
                <span>Inquire About Similar Architecture</span>
              </a>

              {selectedProject.githubUrl && (
                <a
                  href={selectedProject.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-500/40 text-slate-300 hover:text-cyan-300 transition-colors"
                >
                  <Github className="w-4 h-4 text-slate-400" />
                  <span>View Repository</span>
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
});