import { Project, SocialLink, SkillCategory, EducationItem } from '../types';

export const PERSONAL_INFO = {
  name: 'IMAPCODE',
  realName: 'Aryan Mishra',
  handle: 'imapcode',
  website: 'imapcode.vercel.app',
  resumeDriveUrl: 'https://drive.google.com/file/d/1thwzIaNz9BG-e6E2_u3wewugRrTaLdih/view?usp=sharing',
  caption: 'SUDO HIRE ME',
  tagline: 'Computer Science Undergraduate & Systems Craftsman',
  status: 'Ready to build high-scale software & backend infrastructure',
  location: 'Delhi, India',
  phone: '+91 9958186079',
  email: 'student.aryanmishra@gmail.com',
  bio: `Computer Science undergraduate skilled in modern software development practices. Strong foundation in Data Structures, Algorithms, Operating Systems, Database Management Systems, and Computer Networks, with a keen interest in software engineering, backend development, and scalable system design.`,
  shortBio: `Computer Science undergraduate specializing in backend development, systems programming, and scalable architecture. Proficient in C, C++, Python, and modern software craft.`,
  stats: [
    { label: 'Core Projects', value: '4' },
    { label: 'Primary Tech', value: 'C++, Python' },
    { label: 'Degree CGPA', value: '7.5' },
    { label: 'Graduation Year', value: '2027' },
  ]
};

export const SOCIAL_LINKS: SocialLink[] = [
  {
    id: 'github',
    name: 'GitHub',
    label: 'Explore Source Code',
    url: 'https://github.com/imapcode',
    handle: '@imapcode',
    description: 'Repositories, open-source tools, systems projects, and star-worthy codebases.',
    icon: 'github',
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    label: 'Connect Professionally',
    url: 'https://linkedin.com/in/imapcode',
    handle: 'in/imapcode',
    description: 'Career track record, academic profile, professional network, and technical updates.',
    icon: 'linkedin',
  },
  {
    id: 'resume',
    name: 'Resume',
    label: 'View Full CV / Resume',
    url: '#resume',
    handle: 'Aryan_Mishra_Resume.pdf',
    description: 'Detailed education, academic coursework, technical stack breakdown, and projects.',
    icon: 'file-text',
  },
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: 'Languages',
    skills: ['C', 'C++', 'Java', 'Python', 'Bash']
  },
  {
    title: 'Web & Frontend',
    skills: ['HTML', 'CSS', 'JavaScript', 'React']
  },
  {
    title: 'Backend & Frameworks',
    skills: ['Flask', 'MongoDB']
  },
  {
    title: 'Databases',
    skills: ['PostgreSQL', 'MySQL']
  },
  {
    title: 'DevOps & Cloud',
    skills: ['Git', 'GitHub', 'Docker', 'AWS', 'Bash']
  },
  {
    title: 'Tools & Design',
    skills: ['Wireshark', 'Figma', 'Photoshop']
  }
];

export const PROJECTS: Project[] = [
  {
    id: 'image-file-manipulation-system',
    title: 'Image File Manipulation System',
    subtitle: 'OpenCV, Pillow, Tkinter',
    filename: 'image_pipeline.json',
    language: 'json',
    projectType: 'Personal Project',
    description: 'Zero-copy image pipeline with in-memory buffering to bypass disk I/O bottlenecks and event-driven batch processing.',
    category: 'Python',
    tags: ['OpenCV', 'Pillow', 'Tkinter', 'Python'],
    githubUrl: 'https://github.com/imapcode/image-file-manipulation',
    liveUrl: 'https://github.com/imapcode/image-file-manipulation',
    featured: true,
    metrics: 'Zero-disk overhead in-memory buffering',
    highlights: [
      '*In-memory buffering* via `Pillow` to eliminate disk I/O bottlenecks',
      '*Event-driven* `Tkinter` GUI decoupled from `OpenCV` processing engine',
      '*Batch pipeline* for automated resizing, format conversion & compression'
    ],
    resumeBullets: [
      'Designed a modular pipeline architecture separating I/O, processing, and rendering layers; applied in-memory buffering via Pillow to avoid redundant disk reads between chained operations.',
      'Built file-dialog box input and output using Tkinter with event-driven control flow, decoupling user interactions from core image processing logic; supported batch compression, conversion, resizing, and grayscale colorization.'
    ]
  },
  {
    id: '2d-game-engine',
    title: '2D Game Engine',
    subtitle: 'C++, SFML',
    filename: 'game_engine.json',
    language: 'json',
    projectType: 'Personal Project',
    description: 'Component-based game loop with fixed-timestep physics updates and decoupled rendering subsystems.',
    category: 'C++',
    tags: ['C++', 'SFML', 'Game Loop', 'Physics'],
    githubUrl: 'https://github.com/imapcode/2d-game-engine',
    liveUrl: 'https://github.com/imapcode/2d-game-engine',
    featured: true,
    metrics: 'Fixed-timestep cycle & AABB collision detection',
    highlights: [
      '*Component-based game loop* with *fixed-timestep* tick cycle (`SFML`)',
      '*Isolated subsystems*: decoupled input, physics, and sprite rendering',
      '`AABB` *collision detection* with `FSM` entity state machines'
    ],
    resumeBullets: [
      'Architected a component-based game loop with fixed-timestep update cycle, separating input, physics, and rendering into distinct subsystems for frame-rate independence.',
      'Implemented AABB collision detection and a finite state machine for character states (idle, moving, shooting), decoupling game logic from sprite/animation rendering.'
    ]
  },
  {
    id: 'wallpaper-engine',
    title: 'Wallpaper Engine',
    subtitle: 'Python, Winreg, ctypes',
    filename: 'wallpaper_engine.json',
    language: 'json',
    projectType: 'Personal Project',
    description: 'Low-level Windows registry interface for direct OS desktop control with O(1) directory navigation.',
    category: 'Python',
    tags: ['Python', 'Winreg', 'ctypes', 'Windows API'],
    githubUrl: 'https://github.com/imapcode/wallpaper-engine',
    liveUrl: 'https://github.com/imapcode/wallpaper-engine',
    featured: true,
    metrics: 'Direct OS registry control & O(1) keyboard indexing',
    highlights: [
      '*Low-level OS hooks* via `winreg` & `ctypes` for *zero-latency* writes',
      '`O(1)` *directory indexer* for instant keyboard-driven swapping',
      '*Decoupled architecture*: input listener isolated from desktop manager'
    ],
    resumeBullets: [
      'Built a low-level Windows registry interface using winreg and ctypes for direct OS wallpaper control, bypassing high-level APIs.',
      'Designed a directory indexing system for O(1) keyboard-driven navigation, decoupling input handling from wallpaper state management.'
    ]
  },
  {
    id: 'youtube-downloader-metadata',
    title: 'YouTube Downloader & Metadata Embedder',
    subtitle: 'yt-dlp, pandas, eyed3',
    filename: 'media_pipeline.json',
    language: 'json',
    projectType: 'Personal Project',
    description: 'Producer-consumer download queue with per-item fault isolation and Excel-driven automated metadata embedding.',
    category: 'Python',
    tags: ['Python', 'yt-dlp', 'pandas', 'eyed3'],
    githubUrl: 'https://github.com/imapcode/youtube-downloader-metadata',
    liveUrl: 'https://github.com/imapcode/youtube-downloader-metadata',
    featured: true,
    metrics: 'Per-item fault isolation & automated ID3 cover embedding',
    highlights: [
      '*Producer-consumer queue* decoupling download from tagging workers',
      '*Per-item fault isolation*: single failure never halts batch queue',
      '*Automated metadata pipeline* parsing Excel sheets via `pandas`'
    ],
    resumeBullets: [
      'Designed a producer-consumer queue architecture to decouple download scheduling from metadata embedding, with per-item fault isolation preventing single failures from halting the queue.',
      'Built an Excel-driven metadata pipeline using pandas to parse song/album data and auto-embed cover art and ID3 tags via eyed3/mutagen, eliminating all manual tagging.'
    ]
  }
];

export const EDUCATION_ITEMS: EducationItem[] = [
  {
    institution: 'Chandigarh University',
    period: '2023 – 2027',
    degree: 'Bachelor of Engineering in Computer Science',
    score: 'CGPA: 7.5',
    details: [
      'Coursework: Computer Organization, Database Management Systems, Operating Systems, Computer Networks, Object-Oriented Programming, Data Structures and Algorithms.'
    ]
  },
  {
    institution: 'Maxfort School Dwarka, New Delhi',
    period: '2019 – 2022',
    degree: 'Intermediate & Matriculation [CBSE]',
    score: 'Intermediate: 84% | Matriculation: 80%',
    details: [
      'Intermediate (PCM with CS) [2021–2022]: 84%',
      'Matriculation [2019–2020]: 80%'
    ]
  }
];

// Fallback for experience interface if referenced
export const WORK_EXPERIENCE = [];
