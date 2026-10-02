import React, { useState, useMemo, useEffect } from 'react';
import { Github, ArrowUpRight, X, MessageSquare, Lock, ShieldAlert, Server, Code2 } from 'lucide-react';
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
  const [privateNotice, setPrivateNotice] = useState<{
    project: typeof PROJECTS_DATA[0];
    type: 'live' | 'code';
  } | null>(null);
  const tabs = ['All', 'Web', 'Mobile', 'Backend'];

  // Lock body scroll and listen for Escape key when modal is open
  useEffect(() => {
    if (selectedProject || privateNotice) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          if (privateNotice) {
            setPrivateNotice(null);
          } else {
            setSelectedProject(null);
          }
        }
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [selectedProject, privateNotice]);

  const handleLinkClick = (e: React.MouseEvent, project: typeof PROJECTS_DATA[0], type: 'live' | 'code') => {
    e.preventDefault();
    if (project.isPrivate !== false) {
      setPrivateNotice({ project, type });
    } else {
      const url = type === 'live' ? project.liveUrl : project.githubUrl;
      if (url) window.open(url, '_blank', 'noreferrer');
    }
  };

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

        {/* Chamfered Card Grid (Short, Clear & Clean Architectural Cards) */}
        <div key={activeTab} className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-7 items-stretch tab-fade-in">
          {filteredProjects.map((project) => {
            return (
              <article
                key={project.id}
                className="chamfer-card-wrapper group flex flex-col justify-between"
              >
                <div className="chamfer-card-content p-5 sm:p-7 flex flex-col justify-between">
                  <div>
                    {/* Category · Year Header Line with Private Project indicator */}
                    <div className="flex items-center justify-between gap-2 text-xs font-mono font-semibold tracking-wider text-[#00839e] dark:text-cyan-400 uppercase mb-2.5">
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#00839e] dark:bg-cyan-400" />
                        <span>{project.category.toUpperCase()}</span>
                        <span className="text-slate-400 dark:text-slate-600">//</span>
                        <span className="text-slate-500 dark:text-slate-400 text-[11px]">2026</span>
                      </div>
                      <span className="inline-flex items-center gap-1 text-[10px] font-mono tracking-wider font-semibold text-amber-700 dark:text-amber-400 bg-amber-500/10 px-2 py-0.5 border border-amber-500/25">
                        <Lock className="w-2.5 h-2.5" />
                        <span>PRIVATE</span>
                      </span>
                    </div>

                    {/* Bold Display Title (Compact & Punchy) */}
                    <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight font-sans mb-2 leading-snug group-hover:text-[#00839e] dark:group-hover:text-cyan-300 transition-colors">
                      {project.title}
                    </h3>

                    {/* Clean Descriptive Copy (Clamped to 2 lines for uniform height) */}
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-sans mb-4 line-clamp-2">
                      {project.description}
                    </p>

                    {/* Tech Stack Chips (Compact inline chips) */}
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="inline-flex items-center gap-1 px-2 py-0.5 text-[11px] font-mono bg-slate-100 dark:bg-slate-900/90 text-slate-700 dark:text-slate-300 border border-slate-300/70 dark:border-cyan-500/20"
                        >
                          {getTechIcon(tech, 'w-3 h-3')}
                          <span>{tech}</span>
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Redesigned Actions Bar: Short, Clear & Clean */}
                  <div className="pt-3.5 border-t border-slate-200/80 dark:border-slate-800/80 flex flex-wrap sm:flex-nowrap items-center justify-between gap-2.5">
                    {/* DETAILS ↗ Button (Solid teal with cut bottom-right corner) */}
                    <button
                      type="button"
                      onClick={() => setSelectedProject(project)}
                      className="btn-chamfer-solid w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2 font-mono text-xs font-bold uppercase tracking-wider shadow-sm cursor-pointer hover:shadow-cyan-500/20"
                      aria-label={`View details for ${project.title}`}
                    >
                      <span>DETAILS</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>

                    {/* Quick Action Links: LIVE SITE & CODE */}
                    <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                      {project.liveUrl && (
                        <button
                          type="button"
                          onClick={(e) => handleLinkClick(e, project, 'live')}
                          className="btn-chamfer-outline flex-1 sm:flex-none inline-flex items-center justify-center cursor-pointer"
                          aria-label={`View live site status for ${project.title}`}
                          title="Live site (Internal enterprise deployment)"
                        >
                          <div className="btn-chamfer-outline-inner w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 font-mono text-xs font-bold uppercase tracking-wider">
                            <Lock className="w-3 h-3 text-[#007489] dark:text-cyan-400 opacity-90" />
                            <span>LIVE SITE</span>
                          </div>
                        </button>
                      )}

                      {project.githubUrl && (
                        <button
                          type="button"
                          onClick={(e) => handleLinkClick(e, project, 'code')}
                          className="btn-chamfer-outline flex-1 sm:flex-none inline-flex items-center justify-center cursor-pointer"
                          aria-label={`View source code status for ${project.title}`}
                          title="Code (Private enterprise repository)"
                        >
                          <div className="btn-chamfer-outline-inner w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 font-mono text-xs font-bold uppercase tracking-wider">
                            <Github className="w-3 h-3" />
                            <span>CODE</span>
                            <Lock className="w-2.5 h-2.5 text-[#007489] dark:text-cyan-400 opacity-90" />
                          </div>
                        </button>
                      )}
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
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-[3px] animate-fade-in"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-project-title"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="chamfer-card-wrapper relative w-full max-w-2xl max-h-[92vh] overflow-y-auto shadow-[0_25px_60px_rgba(0,0,0,0.85)] text-left"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="chamfer-card-content p-5 sm:p-7 space-y-4">
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 sm:top-5 sm:right-5 p-1.5 bg-slate-900 text-slate-400 hover:text-white border border-slate-800 hover:border-cyan-400 transition-colors cursor-pointer"
                aria-label="Close project details"
                style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%)' }}
              >
                <X className="w-4 h-4 text-cyan-400" />
              </button>

              {/* Header Info */}
              <div className="space-y-1 pr-8">
                <div className="flex items-center gap-2 text-xs font-mono">
                  <span className="font-bold tracking-[0.16em] text-[#00839e] dark:text-cyan-400 uppercase">
                    {selectedProject.category.toUpperCase()} &bull; 2026
                  </span>
                  <span className="text-slate-400 dark:text-slate-600">//</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-semibold uppercase tracking-wider text-[11px]">
                    PRODUCTION READY
                  </span>
                </div>
                <h3 id="modal-project-title" className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
                  {selectedProject.title}
                </h3>
                <p className="text-xs sm:text-sm text-cyan-700 dark:text-cyan-300 font-mono">
                  {PROJECT_DETAILS[selectedProject.id]?.headline || selectedProject.description}
                </p>
              </div>

              {/* Metrics Highlights Bar
              {PROJECT_DETAILS[selectedProject.id]?.metrics && (
                <div className="grid grid-cols-3 gap-2 p-2.5 sm:p-3 bg-slate-100 dark:bg-slate-900/90 border border-slate-300 dark:border-cyan-500/30 font-mono text-center">
                  {PROJECT_DETAILS[selectedProject.id].metrics.map((m) => (
                    <div key={m.label}>
                      <span className="text-slate-500 dark:text-slate-400 text-[10px] uppercase tracking-wider block font-semibold">{m.label}</span>
                      <span className="text-base sm:text-xl font-black text-slate-900 dark:text-white block mt-0.5">{m.value}</span>
                    </div>
                  ))}
                </div>
              )} */}

              {/* Problem & Solution Breakdown: Clean Side-by-Side 2-Column Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-sans leading-relaxed">
                <div className="p-3.5 bg-slate-100/90 dark:bg-[#0d1527] border-l-2 border-slate-400 dark:border-slate-600">
                  {/* <span className="font-mono text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-widest font-bold block mb-1">
                    // THE CHALLENGE
                  </span> */}
                  <p className="text-slate-700 dark:text-slate-300 leading-normal">
                    {PROJECT_DETAILS[selectedProject.id]?.problem}
                  </p>
                </div>
                <div className="p-3.5 bg-cyan-50/70 dark:bg-cyan-950/40 border-l-2 border-[#007489] dark:border-cyan-500">
                  {/* <span className="font-mono text-[10px] text-[#007489] dark:text-cyan-400 uppercase tracking-widest font-bold block mb-1">
                    // ENGINEERING ARCHITECTURE
                  </span> */}
                  <p className="text-slate-700 dark:text-slate-300 leading-normal">
                    {PROJECT_DETAILS[selectedProject.id]?.solution}
                  </p>
                </div>
              </div>

              {/* Architecture Highlights: Compact 2-Column Grid */}
              {PROJECT_DETAILS[selectedProject.id]?.architectureHighlights && (
                <div className="space-y-1.5">
                  <span className="font-mono text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-widest font-bold block">
                    // SYSTEM DELIVERABLES
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-slate-700 dark:text-slate-300 font-sans">
                    {PROJECT_DETAILS[selectedProject.id].architectureHighlights.map((highlight, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <span className="text-[#007489] dark:text-cyan-400 font-bold shrink-0 mt-0.5 text-xs">
                          ✓
                        </span>
                        <span className="leading-snug">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tech Stack Chips: Clean Inline Row */}
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                <span className="font-mono text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-wider mr-1 font-semibold">
                  Stack:
                </span>
                {selectedProject.technologies.map((tech) => (
                  <div
                    key={tech}
                    className="flex items-center gap-1 px-2 py-0.5 text-[11px] font-mono bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-300 border border-slate-300/80 dark:border-cyan-500/25"
                  >
                    {getTechIcon(tech, 'w-3 h-3')}
                    <span>{tech}</span>
                  </div>
                ))}
              </div>

              {/* Modal Footer Actions: Short, Clear & Clean */}
              <div className="pt-3.5 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 text-xs font-mono">
                <a
                  href="#contact"
                  onClick={() => {
                    setSelectedProject(null);
                    const el = document.getElementById('contact');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="btn-chamfer-solid inline-flex items-center justify-center gap-1.5 px-4 py-2 font-bold uppercase tracking-wider text-xs shadow-sm cursor-pointer"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Inquire / Request Walkthrough</span>
                </a>

                <div className="flex items-center gap-2">
                  {selectedProject.liveUrl && (
                    <button
                      type="button"
                      onClick={(e) => handleLinkClick(e, selectedProject, 'live')}
                      className="btn-chamfer-outline inline-flex items-center justify-center cursor-pointer"
                      aria-label={`View live site status for ${selectedProject.title}`}
                      title="Live site (Internal enterprise deployment)"
                    >
                      <div className="btn-chamfer-outline-inner inline-flex items-center gap-1.5 px-3 py-2 uppercase tracking-wider font-bold text-xs">
                        <Lock className="w-3 h-3 text-[#007489] dark:text-cyan-400 opacity-90" />
                        <span>Live Site</span>
                      </div>
                    </button>
                  )}

                  {selectedProject.githubUrl && (
                    <button
                      type="button"
                      onClick={(e) => handleLinkClick(e, selectedProject, 'code')}
                      className="btn-chamfer-outline inline-flex items-center justify-center cursor-pointer"
                      aria-label={`View source code status for ${selectedProject.title}`}
                      title="Code (Private enterprise repository)"
                    >
                      <div className="btn-chamfer-outline-inner inline-flex items-center gap-1.5 px-3 py-2 uppercase tracking-wider font-bold text-xs">
                        <Github className="w-3 h-3" />
                        <span>Private Repo</span>
                        <Lock className="w-2.5 h-2.5 text-[#007489] dark:text-cyan-400 opacity-90" />
                      </div>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Private Project Notification Modal */}
      {privateNotice && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-[4px] animate-fade-in"
          role="dialog"
          aria-modal="true"
          aria-labelledby="private-modal-title"
          onClick={() => setPrivateNotice(null)}
        >
          <div
            className="chamfer-card-wrapper relative w-full max-w-lg shadow-[0_25px_60px_rgba(0,0,0,0.85)] text-left"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="chamfer-card-content p-5 sm:p-7 space-y-4">
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setPrivateNotice(null)}
                className="absolute top-4 right-4 sm:top-5 sm:right-5 p-1.5 bg-slate-900 text-slate-400 hover:text-white border border-slate-800 hover:border-cyan-400 transition-colors cursor-pointer"
                aria-label="Close private project notice"
                style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%)' }}
              >
                <X className="w-4 h-4 text-cyan-400" />
              </button>

              {/* Security Status Tag */}
              <div className="pr-8 space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-mono">
                  {privateNotice.type === 'code' ? (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 font-bold tracking-wider text-amber-600 dark:text-amber-400 bg-amber-500/10 border border-amber-500/30 uppercase text-[11px]">
                      <Lock className="w-3 h-3" />
                      <span>PROPRIETARY SOURCE CODE // PRIVATE REPO</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 font-bold tracking-wider text-[#007489] dark:text-cyan-400 bg-cyan-500/10 border border-cyan-500/30 uppercase text-[11px]">
                      <ShieldAlert className="w-3 h-3" />
                      <span>INTERNAL DEPLOYMENT // RESTRICTED ACCESS</span>
                    </span>
                  )}
                </div>

                <h3 id="private-modal-title" className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
                  {privateNotice.project.title}
                </h3>
                <p className="text-xs sm:text-sm font-mono text-slate-500 dark:text-slate-400">
                  {privateNotice.type === 'code'
                    ? '// Enterprise Repository • Protected Intellectual Property'
                    : '// Enterprise Intranet • Production Environment'}
                </p>
              </div>

              {/* Descriptive Callout */}
              <div
                className={`p-3.5 sm:p-4 border-l-2 space-y-1.5 ${
                  privateNotice.type === 'code'
                    ? 'bg-amber-500/5 dark:bg-[#121726] border-amber-500'
                    : 'bg-cyan-500/5 dark:bg-[#0c1829] border-[#007489] dark:border-cyan-500'
                }`}
              >
                <div className="flex items-center gap-1.5 font-mono text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                  {privateNotice.type === 'code' ? (
                    <>
                      <Code2 className="w-3.5 h-3.5 text-amber-500" />
                      <span>Non-Disclosure & Licensing Restriction</span>
                    </>
                  ) : (
                    <>
                      <Server className="w-3.5 h-3.5 text-[#007489] dark:text-cyan-400" />
                      <span>Private Network Infrastructure</span>
                    </>
                  )}
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                  {privateNotice.type === 'code'
                    ? `This application's codebase is proprietary intellectual property built for enterprise production. Due to commercial non-disclosure agreements (NDAs) and organizational confidentiality, the GitHub repository is restricted to authorized team members.`
                    : `This platform is deployed within an internal enterprise network with strict role-based access control (RBAC). Public guest access is disabled to protect confidential organization records and operational databases.`}
                </p>
              </div>

              {/* Specification Grid */}
              <div className="grid grid-cols-2 gap-2.5 p-3 bg-slate-100 dark:bg-slate-900/90 border border-slate-300 dark:border-cyan-500/25 font-mono text-xs">
                <div>
                  <span className="text-slate-500 dark:text-slate-400 text-[10px] uppercase tracking-wider block font-semibold">
                    Access Level
                  </span>
                  <span className="font-bold text-slate-900 dark:text-white block mt-0.5 text-xs">
                    {privateNotice.type === 'code' ? 'Private / NDA' : 'Internal Intranet'}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 dark:text-slate-400 text-[10px] uppercase tracking-wider block font-semibold">
                    Verification
                  </span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400 block mt-0.5 text-xs">
                    Walkthrough on Request
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 dark:text-slate-400 text-[10px] uppercase tracking-wider block font-semibold">
                    Deliverables
                  </span>
                  <span className="font-bold text-slate-900 dark:text-white block mt-0.5 text-xs">
                    Production System
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 dark:text-slate-400 text-[10px] uppercase tracking-wider block font-semibold">
                    Case Study
                  </span>
                  <span className="font-bold text-[#00839e] dark:text-cyan-400 block mt-0.5 text-xs">
                    Full Specs Available
                  </span>
                </div>
              </div>

              {/* Modal Actions */}
              <div className="pt-1 flex flex-col sm:flex-row items-stretch gap-2 font-mono text-xs">
                <button
                  type="button"
                  onClick={() => {
                    const proj = privateNotice.project;
                    setPrivateNotice(null);
                    setSelectedProject(proj);
                  }}
                  className="btn-chamfer-solid flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 font-bold uppercase tracking-wider text-xs shadow-sm cursor-pointer"
                >
                  <ArrowUpRight className="w-3.5 h-3.5" />
                  <span>View Case Study</span>
                </button>

                <a
                  href="#contact"
                  onClick={() => {
                    setPrivateNotice(null);
                    setSelectedProject(null);
                    const el = document.getElementById('contact');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="btn-chamfer-outline flex-1 inline-flex items-center justify-center cursor-pointer"
                >
                  <div className="btn-chamfer-outline-inner w-full inline-flex items-center justify-center gap-1.5 px-4 py-2.5 uppercase tracking-wider font-bold text-xs">
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Inquire / Request Demo</span>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
});