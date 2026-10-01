import React from 'react';
import { getTechIcon } from './TechIcons';

interface ServiceArea {
  id: string;
  tag: string;
  title: string;
  description: string;
  skills: string[];
  isHighlighted?: boolean;
}

const SERVICE_AREAS: ServiceArea[] = [
  {
    id: 'srv-web',
    tag: 'DOMAIN 01 // WEB',
    title: 'WEB APPLICATIONS',
    description: 'Production-ready web applications built with Laravel and React.js. Focused on performance, responsive layouts, modular state management, and clear UI hierarchy.',
    skills: ['React.js', 'Laravel', 'REST APIs', 'TypeScript', 'Tailwind CSS'],
    isHighlighted: false
  },
  {
    id: 'srv-mobile',
    tag: 'DOMAIN 02 // MOBILE',
    title: 'MOBILE APPLICATIONS',
    description: 'Cross-platform mobile applications for iOS and Android built with Flutter. Clean reactive state management, 60 FPS performance, and offline-first capabilities.',
    skills: ['Flutter', 'Dart', 'REST APIs', 'JavaScript', 'HTML & CSS'],
    isHighlighted: false
  },
  {
    id: 'srv-backend',
    tag: 'DOMAIN 03 // BACKEND',
    title: 'BACKEND & APIS',
    description: 'Scalable RESTful API backends, robust database architecture, and secure authentication systems. Optimized queries, normalized schemas, and automated background queues.',
    skills: ['Laravel', 'PHP', 'MySQL', 'PostgreSQL', 'Node.js', 'Redis'],
    isHighlighted: false
  },
  {
    id: 'srv-devops',
    tag: 'DOMAIN 04 // INFRA',
    title: 'SYSTEM & CLOUD SETUP',
    description: 'Linux server management, reverse proxies, CI/CD pipelines, and cloud hosting. Asynchronous document ingestion pipelines leveraging OCR and worker queues.',
    skills: ['Linux', 'Nginx', 'Git', 'Cloud Infra', 'Document AI', 'Docker'],
    isHighlighted: true
  }
];

export const Services: React.FC = React.memo(() => {
  return (
    <section id="services" className="py-16 sm:py-24 relative overflow-hidden scroll-mt-20 sm:scroll-mt-24 topo-lines-overlay">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header Section matching architectural design */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12 sm:mb-16">
          <div>
            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black text-slate-900 dark:text-white tracking-tight font-sans uppercase">
              SERVICES
            </h2>
          </div>
          <div className="sm:text-right">
            <span className="block text-xs sm:text-sm font-mono tracking-widest text-cyan-600 dark:text-cyan-400 uppercase font-semibold">
              WHAT I DELIVER
            </span>
            <span className="block text-xs sm:text-sm font-mono tracking-widest text-slate-500 dark:text-slate-400 uppercase font-medium mt-0.5">
              4 DOMAINS
            </span>
          </div>
        </div>

        {/* 4 Domain Cards with Sharp 90° Corner Brackets & Sharp Deliverable Chips (No Radius) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 items-stretch">
          {SERVICE_AREAS.map((srv) => {
            const bracketColor = srv.isHighlighted
              ? 'border-cyan-500 dark:border-cyan-400'
              : 'border-slate-400 dark:border-slate-600 group-hover:border-cyan-500/80';

            return (
              <div
                key={srv.id}
                className="relative p-6 sm:p-8 rounded-none bg-white/40 dark:bg-[#0b101c]/35 backdrop-blur-[2px] transition-all duration-300 group hover:-translate-y-1 flex flex-col justify-between"
              >
                {/* 4 Sharp 90° Architectural L-Bracket Corner Accents (No Radius) */}
                <span
                  className={`absolute -top-2.5 -left-2.5 w-5 h-5 border-t-2 border-l-2 ${bracketColor} rounded-none transition-colors duration-200 pointer-events-none`}
                  aria-hidden="true"
                />
                <span
                  className={`absolute -top-2.5 -right-2.5 w-5 h-5 border-t-2 border-r-2 ${bracketColor} rounded-none transition-colors duration-200 pointer-events-none`}
                  aria-hidden="true"
                />
                <span
                  className={`absolute -bottom-2.5 -left-2.5 w-5 h-5 border-b-2 border-l-2 ${bracketColor} rounded-none transition-colors duration-200 pointer-events-none`}
                  aria-hidden="true"
                />
                <span
                  className={`absolute -bottom-2.5 -right-2.5 w-5 h-5 border-b-2 border-r-2 ${bracketColor} rounded-none transition-colors duration-200 pointer-events-none`}
                  aria-hidden="true"
                />

                <div>
                  {/* Domain Tag */}
                  <span className="text-xs font-mono font-bold tracking-wider text-cyan-600 dark:text-cyan-400 uppercase mb-2 block">
                    {srv.tag}
                  </span>

                  {/* Title in Heavy Uppercase */}
                  <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight font-sans uppercase mb-3 leading-tight">
                    {srv.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-sans mb-8">
                    {srv.description}
                  </p>
                </div>

                {/* Sharp Deliverable Chips (No Radius) */}
                <div className="flex flex-wrap gap-2 sm:gap-2.5 pt-6 border-t border-slate-200/60 dark:border-slate-800/60">
                  {srv.skills.map((skill) => (
                    <div
                      key={skill}
                      className="inline-flex items-center gap-2 px-3 py-2 rounded-none bg-white dark:bg-[#0c1220] border border-slate-200/90 dark:border-slate-800 shadow-[0_1px_3px_rgba(0,0,0,0.06)] hover:border-cyan-500/50 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-default select-none group/chip"
                    >
                      <div className="w-5 h-5 shrink-0 flex items-center justify-center rounded-none">
                        {getTechIcon(skill, 'w-4 h-4 sm:w-5 sm:h-5 object-contain')}
                      </div>
                      <span className="text-xs sm:text-sm font-medium font-sans text-slate-800 dark:text-slate-200 group-hover/chip:text-cyan-600 dark:group-hover/chip:text-cyan-300 transition-colors">
                        {skill}
                      </span>
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
});