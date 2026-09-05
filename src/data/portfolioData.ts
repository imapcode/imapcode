import { Project, SocialLink, SkillCategory, ExperienceItem } from '../types';

export const PERSONAL_INFO = {
  name: 'IMAPCODE',
  caption: 'SUDO HIRE ME',
  tagline: 'Full-Stack Software Engineer & Distributed Systems Craftsman',
  status: 'Ready to build high-scale products & production infrastructure',
  location: 'Remote / Global',
  email: 'hire@imapcode.dev',
  bio: `I am a software engineer focused on building resilient full-stack web applications, lightning-fast developer tools, and scalable distributed architectures. Driven by a deep appreciation for systems programming, clean interface aesthetics, and zero-compromise runtime performance, I bridge the gap between heavy backend engineering and pixel-precise, accessible user experiences.`,
  shortBio: `Full-stack engineer crafting bulletproof web applications, distributed APIs, and developer-first infrastructure. Obsessed with clean abstractions, microsecond optimizations, and user-centric software craft.`,
  stats: [
    { label: 'Years of Experience', value: '4+' },
    { label: 'Production Projects', value: '25+' },
    { label: 'Open Source Commits', value: '1.2k+' },
    { label: 'System Uptime Delivered', value: '99.98%' },
  ]
};

export const SOCIAL_LINKS: SocialLink[] = [
  {
    id: 'github',
    name: 'GitHub',
    label: 'Explore Source Code',
    url: 'https://github.com/imapcode',
    handle: '@imapcode',
    description: 'Repositories, open-source tools, system experiments, and star-worthy codebases.',
    icon: 'github',
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    label: 'Connect Professionally',
    url: 'https://linkedin.com/in/imapcode',
    handle: 'in/imapcode',
    description: 'Career track record, endorsements, professional network, and technical updates.',
    icon: 'linkedin',
  },
  {
    id: 'resume',
    name: 'Resume',
    label: 'View Full CV / Resume',
    url: '#resume',
    handle: 'IMAPCODE_Resume.pdf',
    description: 'Detailed work history, technical stack breakdown, certifications, and impact metrics.',
    icon: 'file-text',
  },
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: 'Languages & Core',
    skills: ['TypeScript', 'JavaScript (ESNext)', 'Go', 'Python', 'Rust (Basics)', 'SQL (Postgres)', 'HTML5/CSS3']
  },
  {
    title: 'Frontend Architecture',
    skills: ['React 18/19', 'Next.js', 'Tailwind CSS', 'Motion / Animations', 'Zustand / Redux', 'Vite', 'WebSockets']
  },
  {
    title: 'Backend & Distributed Systems',
    skills: ['Node.js / Express', 'Go Gin / Fiber', 'PostgreSQL', 'Redis', 'Kafka / RabbitMQ', 'REST & GraphQL', 'gRPC']
  },
  {
    title: 'Cloud, DevOps & Tooling',
    skills: ['Docker & Containers', 'Kubernetes', 'AWS & Cloudflare', 'CI/CD (GitHub Actions)', 'Linux / Bash Scripting', 'Nginx']
  }
];

export const PROJECTS: Project[] = [
  {
    id: 'synapse-queue',
    title: 'Synapse Queue',
    subtitle: 'High-Throughput Distributed Message Streamer & Broker',
    description: 'A lightweight distributed pub/sub event engine with zero-copy binary serialization, disk persistence, and real-time WebSocket observability cluster.',
    category: 'Systems & Backend',
    tags: ['Go', 'TypeScript', 'WebSockets', 'Redis', 'Docker', 'Tailwind'],
    githubUrl: 'https://github.com/imapcode/synapse-queue',
    liveUrl: 'https://synapse-demo.imapcode.dev',
    featured: true,
    metrics: 'Handles 120,000 msgs/sec with sub-millisecond p99 latency',
    highlights: [
      'Engineered ring-buffer memory storage with WAL (Write-Ahead-Log) crash resilience',
      'Designed interactive visual telemetry monitoring dashboard with real-time consumer lag metrics',
      'Implemented customizable partitioning strategies and consumer groups auto-rebalancing'
    ]
  },
  {
    id: 'nexus-cloud',
    title: 'Nexus Cloud Studio',
    subtitle: 'Full-Stack Serverless Application & API Management Platform',
    description: 'Developer workspace for orchestrating microservices, environment deployments, instant preview branches, and secure environment secrets with audit logs.',
    category: 'Full Stack',
    tags: ['Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'Prisma', 'Docker API'],
    githubUrl: 'https://github.com/imapcode/nexus-cloud',
    liveUrl: 'https://nexus.imapcode.dev',
    featured: true,
    metrics: 'Active developer tool powering 400+ weekly micro-deployments',
    highlights: [
      'Multi-tenant role-based access control (RBAC) with cryptographic session signing',
      'Integrated live log streaming via SSE (Server-Sent Events) and container health probes',
      'One-click ephemeral branch preview generation via Docker daemon automation'
    ]
  },
  {
    id: 'sentinel-ai',
    title: 'Sentinel Code Audit',
    subtitle: 'Automated Static Security & AST Vulnerability Scanner',
    description: 'Developer command-line tool and web dashboard analyzing Git commits for hardcoded secrets, SQL injection vectors, and dependency CVE exploits.',
    category: 'Developer Tools',
    tags: ['TypeScript', 'Rust Parser', 'Node.js', 'React', 'Tailwind CSS', 'CLI'],
    githubUrl: 'https://github.com/imapcode/sentinel-audit',
    liveUrl: 'https://sentinel.imapcode.dev',
    featured: true,
    metrics: '99.4% detection accuracy across 15+ common vulnerability suites',
    highlights: [
      'Abstract Syntax Tree (AST) pattern engine scanning 10,000 LOC under 180 milliseconds',
      'Generates interactive HTML audit reports with inline patch suggestions and remediation diffs',
      'GitHub Action integration with automated PR comments and status checks'
    ]
  },
  {
    id: 'hyper-state',
    title: 'HyperState Canvas',
    subtitle: 'Collaborative Infinite Whiteboard & Architecture Diagrammer',
    description: 'Ultra-responsive 60fps multiplayer vector diagramming application supporting real-time cursors, markdown notes, code snippet blocks, and export to SVG.',
    category: 'Frontend',
    tags: ['React', 'TypeScript', 'HTML5 Canvas', 'WebRTC', 'Tailwind CSS', 'Motion'],
    githubUrl: 'https://github.com/imapcode/hyperstate-canvas',
    liveUrl: 'https://hyperstate.imapcode.dev',
    featured: false,
    metrics: 'Smooth 60 FPS under 5,000 simultaneous canvas nodes',
    highlights: [
      'Custom spatial index (QuadTree) for instant camera culling and buttery-smooth panning',
      'Conflict-free Replicated Data Types (CRDTs) for offline-first multi-client state convergence',
      'Extensible node plugin system with custom connectors and auto-routing bezier algorithms'
    ]
  },
  {
    id: 'apex-metrics',
    title: 'Apex Metric Engine',
    subtitle: 'Time-Series Monitoring & Anomaly Detection Pipeline',
    description: 'An open-source telemetry ingestion gateway ingesting metrics from Prometheus agents, storing time-series buckets, and triggering intelligent alerts.',
    category: 'Systems & Backend',
    tags: ['Go', 'PostgreSQL', 'TimescaleDB', 'React', 'Recharts', 'Docker'],
    githubUrl: 'https://github.com/imapcode/apex-metrics',
    liveUrl: 'https://apex.imapcode.dev',
    featured: false,
    metrics: 'Reduced alert fatigue by 73% using dynamic statistical deviation thresholds',
    highlights: [
      'Efficient downsampling rollups reducing time-series database footprint by 85%',
      'Configurable alert webhook pipelines forwarding to Slack, PagerDuty, and Discord',
      'Custom query builder interface with live aggregate previews'
    ]
  },
  {
    id: 'vault-keys',
    title: 'Vault CLI & Secret Gate',
    subtitle: 'Zero-Knowledge Encrypted Secrets Sharing for Teams',
    description: 'Terminal client and web vault encrypting sensitive configuration keys with client-side AES-256-GCM before crossing the wire, featuring self-destructing access links.',
    category: 'Developer Tools',
    tags: ['TypeScript', 'Node.js', 'Web Crypto API', 'React', 'Tailwind'],
    githubUrl: 'https://github.com/imapcode/vault-cli',
    liveUrl: 'https://vault.imapcode.dev',
    featured: false,
    metrics: 'Over 12,000 secure secrets safely dispatched without persistent traces',
    highlights: [
      'Client-side key derivation (PBKDF2) ensuring the server never inspects plaintext secrets',
      'Burn-after-reading URLs with strict rate limiting and IP geotrust rules',
      'Seamless CLI command `vault push` / `vault pull` syncing local .env variables'
    ]
  }
];

export const WORK_EXPERIENCE: ExperienceItem[] = [
  {
    role: 'Senior Full-Stack Engineer',
    company: 'Vanguard Systems',
    period: '2023 — Present',
    description: [
      'Architected and led the development of core web applications handling 2.5M+ requests daily with 99.98% uptime.',
      'Reduced API response latencies by 42% through query optimization, distributed Redis caching, and async task queuing.',
      'Mentored 6 engineers and spearheaded adoption of modern TypeScript design patterns and automated CI/CD workflows.'
    ],
    tech: ['React', 'TypeScript', 'Go', 'Node.js', 'PostgreSQL', 'Docker', 'AWS']
  },
  {
    role: 'Full-Stack Developer',
    company: 'Cognitive Web Labs',
    period: '2021 — 2023',
    description: [
      'Built reactive, modular user interfaces and backend services for collaborative B2B software suites.',
      'Engineered real-time notification microservice utilizing WebSockets and Redis pub/sub.',
      'Championed frontend performance audits, elevating Google Lighthouse scores from 64 to 98 across core flows.'
    ],
    tech: ['Next.js', 'React', 'Tailwind CSS', 'Express', 'Redis', 'Jest', 'PostgreSQL']
  }
];
