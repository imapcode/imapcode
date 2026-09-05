export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  category: 'Full Stack' | 'Systems & Backend' | 'Frontend' | 'Developer Tools';
  tags: string[];
  githubUrl: string;
  liveUrl?: string;
  featured?: boolean;
  metrics?: string;
  highlights: string[];
}

export interface SocialLink {
  id: string;
  name: string;
  label: string;
  url: string;
  handle: string;
  description: string;
  icon: 'github' | 'linkedin' | 'file-text' | 'mail' | 'terminal';
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
