import React from 'react';
import { getTechIcon } from './TechIcons';

interface SkillArea {
  tag: string;
  title: string;
  description: string;
  skills: string[];
  isHighlighted?: boolean;
}

const SKILL_AREAS: SkillArea[] = [
  {
    tag: 'BUILD',
    title: 'FULL-STACK & MOBILE',
    description: 'Building web apps and mobile solutions end to end, from the interface people click on to the server and database behind it.',
    skills: [
      'TypeScript',
      'JavaScript',
      'React.js',
      'Flutter',
      'Dart',
      'Tailwind CSS',
      'HTML & CSS',
      'Node.js'
    ],
    isHighlighted: false
  },
  {
    tag: 'BACKEND',
    title: 'API & ARCHITECTURE',
    description: 'Designing scalable backend systems: RESTful APIs, asynchronous queue pipelines, normalized databases, and secure business logic.',
    skills: [
      'Laravel',
      'PHP 8+',
      'REST APIs',
      'MySQL',
      'PostgreSQL',
      'Redis'
    ],
    isHighlighted: false
  },
  {
    tag: 'TOOLS',
    title: 'AI, CLOUD & TOOLS',
    description: 'The services and tooling behind shipped products: cloud infrastructure, reverse proxies, containerization, and intelligent document extraction.',
    skills: [
      'Linux',
      'Git',
      'GitHub',
      'Nginx',
      'Cloud Infra',
      'Document AI',
      'Docker',
      'Postman'
    ],
    isHighlighted: true
  }
];

export const Skills: React.FC = React.memo(() => {
  return (
    <section id="skills" className="py-16 sm:py-24 relative overflow-hidden scroll-mt-20 sm:scroll-mt-24 topo-lines-overlay">
      {/* Ambient Liquid Gradient Blobs (Fluid Glass Refraction) */}
      <div className="liquid-blob w-[450px] h-[450px] bg-cyan-500/[0.045] top-[15%] right-[-5%] pointer-events-none" aria-hidden="true" />
      <div className="liquid-blob w-[380px] h-[380px] bg-cyan-400/[0.035] bottom-[10%] left-[-5%] pointer-events-none" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Section matching reference design */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12 sm:mb-16">
          <div>
            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black text-slate-900 dark:text-white tracking-tight font-sans uppercase">
              SKILLS
            </h2>
          </div>
          <div className="sm:text-right">
            <span className="block text-xs sm:text-sm font-mono tracking-widest text-cyan-600 dark:text-cyan-400 uppercase font-semibold">
              WHAT I WORK WITH
            </span>
            <span className="block text-xs sm:text-sm font-mono tracking-widest text-slate-500 dark:text-slate-400 uppercase font-medium mt-0.5">
              3 AREAS
            </span>
          </div>
        </div>

        {/* 3 Area Columns with Liquid Glass Style & Sharp Corner Brackets (No Radius) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-10 items-stretch">
          {SKILL_AREAS.map((area) => {
            const bracketColor = area.isHighlighted
              ? 'border-cyan-500 dark:border-cyan-400'
              : 'border-slate-400 dark:border-slate-600 group-hover:border-cyan-500/80';

            return (
              <div
                key={area.tag}
                className="liquid-glass-sharp relative p-6 sm:p-8 rounded-none transition-all duration-300 group hover:-translate-y-1 flex flex-col justify-between"
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
                  {/* Category Subtitle */}
                  <span className="text-xs font-mono font-bold tracking-wider text-cyan-600 dark:text-cyan-400 uppercase mb-2 block">
                    {area.tag}
                  </span>

                  {/* Area Title */}
                  <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight font-sans uppercase mb-3 leading-tight">
                    {area.title}
                  </h3>

                  {/* Area Description */}
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-sans mb-8">
                    {area.description}
                  </p>
                </div>

                {/* Liquid Glass Sharp Skill Chips (No Border Radius) */}
                <div className="flex flex-wrap gap-2 sm:gap-2.5">
                  {area.skills.map((skill) => (
                    <div
                      key={skill}
                      className="liquid-glass-chip inline-flex items-center gap-2 px-3 py-2 rounded-none cursor-default select-none group/chip"
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