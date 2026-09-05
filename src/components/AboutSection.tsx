import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Github, Linkedin, FileText, Mail, Copy, Check, ArrowUpRight } from 'lucide-react';
import { PERSONAL_INFO, SKILL_CATEGORIES } from '../data/portfolioData';

interface AboutSectionProps {
  onOpenResumeModal: () => void;
  onOpenHireModal: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenResumeModal, onOpenHireModal }) => {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="about" className="py-14 sm:py-20 md:py-28 relative border-t border-zinc-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Section Title */}
        <div className="mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-cinematic font-bold tracking-tight text-white">
            About Me
          </h2>
          <p className="text-zinc-400 text-xs sm:text-sm mt-2 max-w-lg font-editorial italic">
            Background, engineering philosophy, and communication channels.
          </p>
        </div>

        <div className="space-y-8 sm:space-y-12">
          
          {/* A Small Para About Me */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="p-5 sm:p-8 rounded-2xl bg-zinc-950/60 border border-zinc-800/80 space-y-4 sm:space-y-5"
          >
            <p className="text-sm sm:text-base md:text-lg text-zinc-200 leading-relaxed font-light">
              {PERSONAL_INFO.bio}
            </p>

            <div className="pt-4 border-t border-zinc-900 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
              <div className="flex items-center gap-2 text-zinc-400 min-w-0">
                <Mail className="w-3.5 h-3.5 text-zinc-300 flex-shrink-0" />
                <span className="text-zinc-300 truncate">{PERSONAL_INFO.email}</span>
              </div>
              <button
                onClick={copyEmail}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-zinc-800 bg-zinc-900 text-zinc-300 hover:text-white hover:border-zinc-600 transition-colors touch-manipulation"
              >
                {copied ? (
                  <>
                    <Check className="w-3 h-3 text-white" />
                    <span>Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3 text-zinc-400" />
                    <span>Copy Email</span>
                  </>
                )}
              </button>
            </div>
          </motion.div>

          {/* MY LINKS (specifically requested in prompt) */}
          <div id="links" className="space-y-4">
            <h3 className="text-xs sm:text-sm font-mono uppercase tracking-wider text-zinc-400">
              My Links
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
              {/* GitHub */}
              <motion.a
                href="https://github.com/imapcode"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
                className="group p-4 sm:p-5 rounded-xl bg-zinc-950/60 border border-zinc-800/80 hover:border-zinc-500 hover:bg-zinc-900/60 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-700/80 flex items-center justify-center text-white group-hover:border-zinc-400 transition-colors">
                      <Github className="w-4 h-4" />
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-white transition-colors" />
                  </div>
                  <h4 className="font-bold text-sm text-white group-hover:text-zinc-200">
                    GitHub
                  </h4>
                  <p className="text-xs text-zinc-400 mt-1 leading-normal">
                    Repositories, open-source libraries, and code contributions.
                  </p>
                </div>
                <div className="mt-4 pt-2 border-t border-zinc-900 text-[11px] font-mono text-zinc-500 group-hover:text-zinc-300">
                  github.com/imapcode
                </div>
              </motion.a>

              {/* LinkedIn */}
              <motion.a
                href="https://linkedin.com/in/imapcode"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
                className="group p-4 sm:p-5 rounded-xl bg-zinc-950/60 border border-zinc-800/80 hover:border-zinc-500 hover:bg-zinc-900/60 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-700/80 flex items-center justify-center text-white group-hover:border-zinc-400 transition-colors">
                      <Linkedin className="w-4 h-4" />
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-white transition-colors" />
                  </div>
                  <h4 className="font-bold text-sm text-white group-hover:text-zinc-200">
                    LinkedIn
                  </h4>
                  <p className="text-xs text-zinc-400 mt-1 leading-normal">
                    Professional background, career trajectory, and recommendations.
                  </p>
                </div>
                <div className="mt-4 pt-2 border-t border-zinc-900 text-[11px] font-mono text-zinc-500 group-hover:text-zinc-300">
                  linkedin.com/in/imapcode
                </div>
              </motion.a>

              {/* Resume */}
              <motion.button
                onClick={onOpenResumeModal}
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
                className="group p-4 sm:p-5 rounded-xl bg-zinc-950/60 border border-zinc-800/80 hover:border-zinc-500 hover:bg-zinc-900/60 transition-all flex flex-col justify-between text-left sm:col-span-2 md:col-span-1"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-700/80 flex items-center justify-center text-white group-hover:border-zinc-400 transition-colors">
                      <FileText className="w-4 h-4" />
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-white transition-colors" />
                  </div>
                  <h4 className="font-bold text-sm text-white group-hover:text-zinc-200">
                    Resume
                  </h4>
                  <p className="text-xs text-zinc-400 mt-1 leading-normal">
                    Curriculum vitae, detailed impact metrics, and education.
                  </p>
                </div>
                <div className="mt-4 pt-2 border-t border-zinc-900 text-[11px] font-mono text-zinc-500 group-hover:text-zinc-300">
                  View Document →
                </div>
              </motion.button>
            </div>
          </div>

          {/* Technical Skills & Capabilities */}
          <div className="space-y-4 pt-2">
            <h3 className="text-xs sm:text-sm font-mono uppercase tracking-wider text-zinc-400">
              Technical Capabilities
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {SKILL_CATEGORIES.map((category, index) => (
                <div
                  key={index}
                  className="p-4 sm:p-5 rounded-xl bg-zinc-950/40 border border-zinc-800/70 space-y-2.5"
                >
                  <h4 className="text-xs font-mono font-semibold text-zinc-300 uppercase tracking-wider">
                    {category.title}
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {category.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2 sm:px-2.5 py-1 rounded-md bg-zinc-900 border border-zinc-800 text-[11px] sm:text-xs text-zinc-300 font-mono"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
