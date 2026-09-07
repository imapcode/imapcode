export interface Project {
  id: string;
  title: string;
  subtitle: string;
  filename: string;
  language: string;
  projectType: string;
  description: string;
  category: string;
  tags: string[];
  githubUrl: string;
  liveUrl?: string;
  featured?: boolean;
  metrics?: string;
  highlights: string[];
  resumeBullets?: string[];
}

export interface EducationItem {
  institution: string;
  period: string;
  degree: string;
  score?: string;
  details?: string[];
}

export interface SocialLink {
  id: string;
  name: string;
  label: string;
  url: string;
  handle: string;
  description: string;
  icon: 'github' | 'linkedin' | 'file-text' | 'mail' | 'terminal' | 'drive';
}

export interface SkillCategory {
  title: string;
  skills: string[];
}

export interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  description: string[];
  tech: string[];
}
