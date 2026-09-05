import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Download, Printer, Mail, Github, Linkedin, Briefcase, Award, CheckCircle } from 'lucide-react';
import { PERSONAL_INFO, WORK_EXPERIENCE, SKILL_CATEGORIES } from '../data/portfolioData';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  if (!isOpen) return null;

  const handleDownload = () => {
    const resumeText = `
IMAPCODE — RESUME
Caption: SUDO HIRE ME
Role: Full-Stack Architect / Systems Engineer
Email: ${PERSONAL_INFO.email}
GitHub: https://github.com/imapcode
LinkedIn: https://linkedin.com/in/imapcode

============================================================
SUMMARY
============================================================
${PERSONAL_INFO.bio}

============================================================
WORK EXPERIENCE
============================================================
${WORK_EXPERIENCE.map(
  (exp) => `
Role: ${exp.role}
Company: ${exp.company} (${exp.period})
Responsibilities:
${exp.description.map((d) => `- ${d}`).join('\n')}
Technologies: ${exp.tech.join(', ')}
`
).join('\n')}

============================================================
TECHNICAL SKILLS
============================================================
${SKILL_CATEGORIES.map((cat) => `- ${cat.title}: ${cat.skills.join(', ')}`).join('\n')}

============================================================
EDUCATION
============================================================
- B.S. in Computer Science (Distributed Systems & Algorithms)
- Magna Cum Laude
    `.trim();

    const blob = new Blob([resumeText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'IMAPCODE_Resume.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm"
        />

        {/* Modal Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.97, y: 12 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-3xl max-h-[92vh] bg-[#0c0c0e] border border-zinc-800 rounded-2xl shadow-2xl flex flex-col z-10 overflow-hidden text-zinc-100 font-sans"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border-b border-zinc-800/80 bg-zinc-950/60 sticky top-0 z-20 backdrop-blur-sm">
            <div className="min-w-0 pr-2">
              <span className="font-mono text-xs font-semibold text-white uppercase tracking-wider truncate block">
                {PERSONAL_INFO.name} — Resume
              </span>
            </div>

            <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
              <button
                onClick={handleDownload}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-100 hover:bg-white text-zinc-950 text-xs font-medium transition-colors touch-manipulation min-h-[36px]"
              >
                {downloadSuccess ? (
                  <>
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span className="hidden xs:inline">Downloaded</span>
                  </>
                ) : (
                  <>
                    <Download className="w-3.5 h-3.5" />
                    <span>Download<span className="hidden sm:inline"> TXT</span></span>
                  </>
                )}
              </button>

              <button
                onClick={handlePrint}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 text-xs border border-zinc-800 transition-colors min-h-[36px]"
                title="Print Resume"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print</span>
              </button>

              <button
                onClick={onClose}
                className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors ml-1 touch-manipulation min-h-[36px] min-w-[36px] flex items-center justify-center"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Document Content */}
          <div className="overflow-y-auto p-4 sm:p-8 space-y-6 sm:space-y-8 text-xs sm:text-sm">
            {/* Intro */}
            <div className="border-b border-zinc-800 pb-6 flex flex-col sm:flex-row justify-between sm:items-start gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                  {PERSONAL_INFO.name}
                </h1>
                <p className="text-zinc-400 text-xs font-mono uppercase tracking-wider mt-1">
                  {PERSONAL_INFO.caption} · Full-Stack & Systems Engineer
                </p>
                <p className="text-zinc-300 text-xs sm:text-sm mt-2 max-w-lg leading-relaxed">
                  {PERSONAL_INFO.bio}
                </p>
              </div>

              <div className="space-y-1.5 text-xs font-mono text-zinc-400 shrink-0">
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-zinc-300" />
                  <span>{PERSONAL_INFO.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Github className="w-3.5 h-3.5 text-zinc-300" />
                  <a href="https://github.com/imapcode" target="_blank" rel="noreferrer" className="hover:text-white">
                    github.com/imapcode
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Linkedin className="w-3.5 h-3.5 text-zinc-300" />
                  <a href="https://linkedin.com/in/imapcode" target="_blank" rel="noreferrer" className="hover:text-white">
                    linkedin.com/in/imapcode
                  </a>
                </div>
              </div>
            </div>

            {/* Work Experience */}
            <div className="space-y-4">
              <h2 className="text-xs font-mono uppercase tracking-wider text-zinc-400">
                Experience
              </h2>

              <div className="space-y-5">
                {WORK_EXPERIENCE.map((exp, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-zinc-950/40 border border-zinc-800/80 space-y-2">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <h3 className="font-semibold text-white text-sm">{exp.role}</h3>
                      <span className="text-xs font-mono text-zinc-400">{exp.period}</span>
                    </div>
                    <div className="text-xs font-mono text-zinc-400">{exp.company}</div>
                    <ul className="space-y-1 list-disc list-inside text-xs text-zinc-300 pt-1">
                      {exp.description.map((desc, dIdx) => (
                        <li key={dIdx} className="leading-relaxed">
                          {desc}
                        </li>
                      ))}
                    </ul>
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {exp.tech.map((t) => (
                        <span key={t} className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-[10px] font-mono text-zinc-300">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Skills */}
            <div className="space-y-3">
              <h2 className="text-xs font-mono uppercase tracking-wider text-zinc-400">
                Technical Skills
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {SKILL_CATEGORIES.map((cat, i) => (
                  <div key={i} className="p-3.5 rounded-lg bg-zinc-950/40 border border-zinc-800 text-xs">
                    <div className="font-mono font-semibold text-zinc-200 mb-2">{cat.title}</div>
                    <div className="flex flex-wrap gap-1.5">
                      {cat.skills.map((s) => (
                        <span key={s} className="px-2 py-0.5 rounded bg-zinc-900 text-zinc-300 font-mono text-[11px]">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Education */}
            <div className="space-y-3 pt-2">
              <h2 className="text-xs font-mono uppercase tracking-wider text-zinc-400">
                Education
              </h2>
              <div className="p-4 rounded-xl bg-zinc-950/40 border border-zinc-800/80 flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                <div>
                  <h3 className="font-semibold text-white text-sm">B.S. in Computer Science</h3>
                  <p className="text-xs text-zinc-400 mt-0.5">Distributed Systems & Algorithmic Computing</p>
                </div>
                <span className="text-xs font-mono text-zinc-400">Magna Cum Laude</span>
              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
