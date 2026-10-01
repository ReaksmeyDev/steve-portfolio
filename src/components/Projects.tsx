import React, { useState, useMemo, useEffect } from 'react';
import { Github, ArrowUpRight, X, MessageSquare } from 'lucide-react';
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

  return (
    <section id="projects" className="py-16 sm:py-24 relative overflow-hidden scroll-mt-20 sm:scroll-mt-24 topo-lines-overlay">
      {/* Ambient Liquid Gradient Blobs */}
      <div className="liquid-blob w-[450px] h-[450px] bg-cyan-500/[0.045] top-[15%] right-[-5%] pointer-events-none" aria-hidden="true" />
      <div className="liquid-blob w-[380px] h-[380px] bg-cyan-400/[0.035] bottom-[10%] left-[-5%] pointer-events-none" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Section matching architectural blueprint design */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12 sm:mb-16">
          <div>
            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black text-slate-900 dark:text-white tracking-tight font-sans uppercase">
              PROJECTS
            </h2>
          </div>
          <div className="sm:text-right">
            <span className="block text-xs sm:text-sm font-mono tracking-widest text-[#00839e] dark:text-cyan-400 uppercase font-semibold">
              FEATURED WORK
            </span>
            <span className="block text-xs sm:text-sm font-mono tracking-widest text-slate-500 dark:text-slate-400 uppercase font-medium mt-0.5">
              4 ARCHITECTURES
            </span>
          </div>
        </div>

        {/* Tab Filters (Chamfered Architectural Tabs) */}
        <div className="flex flex-wrap gap-2.5 sm:gap-3 mb-12 sm:mb-16 font-mono text-xs">
          {tabs.map((tab) => {
            const count = tabCounts[tab] || 0;
            const isSelected = activeTab === tab;

            return (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2.5 uppercase font-bold tracking-wider transition-all duration-200 flex items-center gap-2.5 ${
                  isSelected
                    ? 'btn-chamfer-solid text-white shadow-sm'
                    : 'border border-slate-300 dark:border-slate-800 bg-white/60 dark:bg-[#0b101c]/60 text-slate-600 dark:text-slate-400 hover:border-[#007489] dark:hover:border-cyan-400 hover:text-slate-900 dark:hover:text-white'
                }`}
                style={isSelected ? { clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%)' } : {}}
              >
                <span>{tab}</span>
                <span className={`text-[10px] px-1.5 py-0.5 font-bold ${
                  isSelected
                    ? 'bg-white/20 text-white'
                    : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Chamfered Card Grid (Exact Reference Layout Without Photo) */}
        <div key={activeTab} className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 items-stretch tab-fade-in">
          {filteredProjects.map((project, index) => {
            return (
              <article
                key={project.id}
                className="chamfer-card-wrapper group flex flex-col justify-between"
              >
                <div className="chamfer-card-content p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
                  <div>
                    {/* Category · Year Header Line */}
                    <div className="flex items-center justify-between text-xs font-mono font-bold tracking-[0.16em] text-[#00839e] dark:text-cyan-400 uppercase mb-3">
                      <span>{project.category.toUpperCase()} &bull; 2026</span>
                      {/* <span className="text-slate-400 dark:text-slate-500 font-semibold tracking-widest text-[11px]">
                        #{String(index + 1).padStart(2, '0')}
                      </span> */}
                    </div>

                    {/* Massive Bold Display Title */}
                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 dark:text-white uppercase tracking-tight font-sans mb-3.5 leading-tight group-hover:text-[#00839e] dark:group-hover:text-cyan-300 transition-colors">
                      {project.title}
                    </h3>

                    {/* Clean Descriptive Copy */}
                    <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed font-sans mb-6">
                      {project.description}
                    </p>

                    {/* Tech Stack Chips */}
                    <div className="flex flex-wrap gap-2 mb-8">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono bg-slate-100 dark:bg-slate-900/90 text-slate-700 dark:text-slate-300 border border-slate-300/80 dark:border-cyan-500/25"
                        >
                          {getTechIcon(tech, 'w-3.5 h-3.5')}
                          <span>{tech}</span>
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Chamfered Action Buttons Row (Exact Reference Style) */}
                  <div className="flex flex-wrap items-center gap-3 pt-6 border-t border-slate-200/80 dark:border-slate-800/80">
                    {/* DETAILS ↗ Button (Solid teal with cut bottom-right corner) */}
                    <button
                      type="button"
                      onClick={() => setSelectedProject(project)}
                      className="btn-chamfer-solid inline-flex items-center justify-center gap-1.5 px-6 py-2.5 sm:px-7 sm:py-3 font-mono text-xs sm:text-sm font-bold uppercase tracking-wider shadow-sm"
                      aria-label={`View details for ${project.title}`}
                    >
                      <span>DETAILS</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </button>

                    {/* LIVE SITE ↗ Button (Outline teal with cut bottom-right corner) */}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="btn-chamfer-outline inline-flex items-center justify-center"
                        aria-label={`View live site for ${project.title}`}
                      >
                        <div className="btn-chamfer-outline-inner inline-flex items-center gap-1.5 font-mono text-xs sm:text-sm font-bold uppercase tracking-wider">
                          <span>LIVE SITE</span>
                          <ArrowUpRight className="w-4 h-4" />
                        </div>
                      </a>
                    )}

                    {/* CODE ↗ Button (Outline teal with cut bottom-right corner) */}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="btn-chamfer-outline inline-flex items-center justify-center"
                        aria-label={`View source code for ${project.title}`}
                      >
                        <div className="btn-chamfer-outline-inner inline-flex items-center gap-1.5 font-mono text-xs sm:text-sm font-bold uppercase tracking-wider">
                          <Github className="w-3.5 h-3.5" />
                          <span>CODE</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </div>
                      </a>
                    )}
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
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-[3px] animate-fade-in"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-project-title"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="chamfer-card-wrapper relative w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-[0_25px_60px_rgba(0,0,0,0.7)] text-left"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="chamfer-card-content p-6 sm:p-10 space-y-6">
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 bg-slate-900 text-slate-400 hover:text-white border border-slate-800 hover:border-cyan-400 transition-colors"
                aria-label="Close project details"
                style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%)' }}
              >
                <X className="w-5 h-5 text-cyan-400" />
              </button>

              {/* Header Info */}
              <div className="space-y-2 pr-10">
                <div className="flex items-center gap-2 text-xs font-mono">
                  <span className="font-bold tracking-[0.16em] text-[#00839e] dark:text-cyan-400 uppercase">
                    {selectedProject.category.toUpperCase()} &bull; 2026
                  </span>
                  <span className="text-slate-400 dark:text-slate-600">//</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-semibold uppercase tracking-wider">
                    PRODUCTION READY
                  </span>
                </div>
                <h3 id="modal-project-title" className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
                  {selectedProject.title}
                </h3>
                <p className="text-sm sm:text-base text-cyan-700 dark:text-cyan-300 font-mono">
                  {PROJECT_DETAILS[selectedProject.id]?.headline || selectedProject.description}
                </p>
              </div>

              {/* Metrics Highlights Bar */}
              {PROJECT_DETAILS[selectedProject.id]?.metrics && (
                <div className="grid grid-cols-3 gap-2 sm:gap-3 p-4 bg-slate-100 dark:bg-slate-900/90 border border-slate-300 dark:border-cyan-500/30 font-mono text-center">
                  {PROJECT_DETAILS[selectedProject.id].metrics.map((m) => (
                    <div key={m.label}>
                      <span className="text-slate-500 dark:text-slate-400 text-[10px] sm:text-xs uppercase tracking-wider block font-semibold">{m.label}</span>
                      <span className="text-lg sm:text-2xl font-black text-slate-900 dark:text-white block mt-1">{m.value}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Problem & Solution Breakdown */}
              <div className="space-y-4 text-sm text-slate-700 dark:text-slate-300 font-sans leading-relaxed">
                <div className="p-5 bg-slate-100/90 dark:bg-[#0d1527] border-l-4 border-slate-400 dark:border-slate-600 space-y-1.5">
                  <span className="font-mono text-xs text-slate-500 dark:text-slate-400 uppercase tracking-widest font-bold block">// THE CHALLENGE</span>
                  <p>{PROJECT_DETAILS[selectedProject.id]?.problem}</p>
                </div>
                <div className="p-5 bg-cyan-50/70 dark:bg-cyan-950/40 border-l-4 border-[#007489] dark:border-cyan-500 space-y-1.5">
                  <span className="font-mono text-xs text-[#007489] dark:text-cyan-400 uppercase tracking-widest font-bold block">// ENGINEERING ARCHITECTURE</span>
                  <p>{PROJECT_DETAILS[selectedProject.id]?.solution}</p>
                </div>
              </div>

              {/* Architecture Highlights */}
              {PROJECT_DETAILS[selectedProject.id]?.architectureHighlights && (
                <div className="space-y-3">
                  <span className="font-mono text-xs text-slate-500 dark:text-slate-400 uppercase tracking-widest font-bold block">
                    // SYSTEM DELIVERABLES
                  </span>
                  <div className="space-y-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                    {PROJECT_DETAILS[selectedProject.id].architectureHighlights.map((highlight, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <span className="w-5 h-5 bg-[#007489]/20 text-[#007489] dark:bg-cyan-950 dark:border dark:border-cyan-400 dark:text-cyan-300 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                          ✓
                        </span>
                        <span className="leading-relaxed font-sans">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tech Stack Chips */}
              <div className="pt-2">
                <span className="font-mono text-xs text-slate-500 dark:text-slate-400 uppercase tracking-widest font-bold block mb-3">
                  // TECHNOLOGIES DEPLOYED
                </span>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.technologies.map((tech) => (
                    <div
                      key={tech}
                      className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-300 border border-slate-300 dark:border-cyan-500/30"
                    >
                      {getTechIcon(tech, 'w-4 h-4')}
                      <span>{tech}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Modal Footer Actions */}
              <div className="pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 text-xs font-mono">
                <a
                  href="#contact"
                  onClick={() => {
                    setSelectedProject(null);
                    const el = document.getElementById('contact');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="btn-chamfer-solid inline-flex items-center justify-center gap-2 px-6 py-3 font-bold uppercase tracking-wider shadow-sm"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Inquire About Similar Architecture</span>
                </a>

                {selectedProject.githubUrl && (
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-chamfer-outline inline-flex items-center justify-center"
                  >
                    <div className="btn-chamfer-outline-inner inline-flex items-center gap-2 px-5 py-3 uppercase tracking-wider font-bold">
                      <Github className="w-4 h-4" />
                      <span>View Repository</span>
                    </div>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
});