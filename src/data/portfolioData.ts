import type { Skill, Project, ExperienceItem, ServiceItem } from '../types/portfolio';

export const SKILLS_DATA: Skill[] = [
  { name: 'React.js', category: 'Frontend', description: 'Component architectures, state stores, performance optimization.' },
  { name: 'Flutter', category: 'Frontend', description: 'Cross-platform mobile apps for Android and iOS.' },
  { name: 'Dart', category: 'Frontend', description: 'Typed, object-oriented language for robust Flutter development.' },
  { name: 'JavaScript', category: 'Frontend', description: 'ESNext, async programming, modern browser standards.' },
  { name: 'HTML & CSS', category: 'Frontend', description: 'Semantic, responsive layouts with modern CSS/Tailwind.' },
  { name: 'Laravel', category: 'Backend', description: 'REST APIs, Eloquent ORM, MVC systems, background queues.' },
  { name: 'PHP', category: 'Backend', description: 'Modern PHP 8+, clean architecture, secure business logic.' },
  { name: 'Node.js', category: 'Backend', description: 'Scalable backend services, async runtime environments.' },
  { name: 'REST APIs', category: 'Backend', description: 'JWT/OAuth auth, idempotent design, API documentation.' },
  { name: 'MySQL', category: 'Database', description: 'Relational design, indexing, transaction handling.' },
  { name: 'PostgreSQL', category: 'Database', description: 'Advanced JSONB querying, indexing, reliability.' },
  { name: 'Linux', category: 'DevOps & Infra', description: 'Ubuntu/Debian management, systemd, shell scripting.' },
  { name: 'Git', category: 'DevOps & Infra', description: 'Branch management, CI workflows, team collaboration.' },
  { name: 'Nginx', category: 'DevOps & Infra', description: 'Reverse proxy, SSL certificates, load distribution.' },
  { name: 'Cloud Infra', category: 'DevOps & Infra', description: 'VPS environments, cloud object storage, deployment.' },
  { name: 'Document AI', category: 'DevOps & Infra', description: 'Integration of OCR, parsing models, and text extraction.' }
];

export const PROJECTS_DATA: Project[] = [
  {
    id: 'school-management',
    title: 'School Management System',
    category: 'Web',
    description: 'A comprehensive operational system designed for managing academic records, student enrollments, course schedules, attendance workflows, and administrative reporting.',
    technologies: ['Laravel', 'MySQL', 'React.js', 'Tailwind CSS'],
    githubUrl: 'https://github.com',
    liveUrl: 'https://example.com'
  },
  {
    id: 'rules-search',
    title: 'Rules & Document Search App',
    category: 'Mobile',
    description: 'A mobile application engineered to search, index, and browse regulatory, policy, and legal documents with multi-keyword query execution and offline capabilities.',
    technologies: ['Flutter', 'Dart', 'Laravel', 'MySQL', 'REST API'],
    githubUrl: 'https://github.com',
    liveUrl: 'https://example.com'
  },
  {
    id: 'ocr-engine',
    title: 'OCR Document Processing Engine',
    category: 'Backend',
    description: 'A backend processing pipeline that ingests multi-page PDF documents, extracts text using cloud OCR, structures unstructured content, and pushes it to search indices.',
    technologies: ['Laravel', 'PHP', 'MySQL', 'Google Cloud Vision', 'Queue System'],
    githubUrl: 'https://github.com'
  }
];

export const EXPERIENCE_DATA: ExperienceItem[] = [
  {
    id: 'exp-1',
    position: 'Full-Stack Developer',
    organization: 'Software Solutions Inc.',
    period: '2023 - Present',
    description: 'Developing and scaling enterprise web platforms and integrated mobile applications.',
    responsibilities: [
      'Designed and deployed scalable RESTful APIs in Laravel consumed by web and Flutter clients.',
      'Implemented document ingestion pipelines leveraging OCR and asynchronous queues.',
      'Configured Linux production instances, Nginx reverse proxies, and automated deployment pipelines.'
    ],
    technologies: ['Laravel', 'Flutter', 'React.js', 'MySQL', 'Linux', 'Nginx']
  },
  {
    id: 'exp-2',
    position: 'Backend Developer',
    organization: 'Digital Systems Enterprise',
    period: '2021 - 2023',
    description: 'Engineered backend databases, business logic layers, and internal operational tooling.',
    responsibilities: [
      'Optimized SQL queries and schema models across MySQL and SQL Server databases.',
      'Constructed role-based access control (RBAC) authentication microservices.',
      'Collaborated with frontend developers to deliver responsive administrative portals.'
    ],
    technologies: ['PHP', 'Laravel', 'SQL Server', 'MySQL', 'JavaScript', 'Git']
  }
];

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'srv-web',
    title: 'Web Applications',
    description: 'Production-ready web applications built with Laravel and React.js. Focused on performance, responsive layouts, modular state management, and clear UI hierarchy.',
    skills: ['React.js', 'Laravel', 'REST APIs', 'Tailwind CSS']
  },
  {
    id: 'srv-mobile',
    title: 'Mobile Applications',
    description: 'Cross-platform mobile apps for Android and iOS using Flutter and Dart. Native performance with a single clean codebase and smooth API integrations.',
    skills: ['Flutter', 'Dart', 'State Management', 'Mobile UI/UX']
  },
  {
    id: 'srv-backend',
    title: 'Backend & APIs',
    description: 'Reliable backend services, structured relational database architecture (MySQL, PostgreSQL, SQL Server), secure token auth, and background processing.',
    skills: ['Laravel', 'PHP', 'Node.js', 'Queue Pipelines']
  },
  {
    id: 'srv-devops',
    title: 'System & Cloud Setup',
    description: 'Linux server management, Nginx web server configuration, SSL, database provisioning, process control, and cloud asset hosting.',
    skills: ['Linux', 'Nginx', 'Git Workflows', 'Cloud Hosting']
  }
];