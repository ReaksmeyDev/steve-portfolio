export interface Skill {
  name: string;
  category: 'Frontend' | 'Backend' | 'Database' | 'DevOps & Infra';
  description: string;
}

export interface Project {
  id: string;
  title: string;
  category: 'Web' | 'Mobile' | 'Backend';
  description: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
}

export interface ExperienceItem {
  id: string;
  position: string;
  organization: string;
  period: string;
  description: string;
  responsibilities: string[];
  technologies: string[];
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  skills: string[];
}