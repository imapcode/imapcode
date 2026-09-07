import React from 'react';
import { GitBranch, ArrowUp, FileCode2 } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface FooterProps {
  onOpenResumeModal: () => void;
  onOpenHireModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenResumeModal, onOpenHireModal }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-zinc-800/80 bg-[#090a0f] text-zinc-400 font-mono text-xs relative">
      {/* Upper Footer: Clean Developer Summary */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 pb-6 border-b border-zinc-800/60">
          {/* Brand & Comment */}
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-white font-semibold text-sm">
                {PERSONAL_INFO.name}
              </span>
              <span className="text-zinc-600">//</span>
              <span className="text-zinc-400">
                {PERSONAL_INFO.realName}
              </span>
            </div>
            <p className="text-zinc-500 text-xs">
              <span className="text-zinc-600">// </span>
              {PERSONAL_INFO.status}
            </p>
          </div>

          {/* Clean Quick Links */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs">
            <a
              href="https://github.com/imapcode"
              target="_blank"
              rel="noopener noreferrer"
              className="px-2.5 py-1 rounded bg-zinc-900/60 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800/80 transition-colors"
            >
              GitHub
            </a>

            <a
              href="https://linkedin.com/in/imapcode"
              target="_blank"
              rel="noopener noreferrer"
              className="px-2.5 py-1 rounded bg-zinc-900/60 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800/80 transition-colors"
            >
              LinkedIn
            </a>

            <button
              onClick={onOpenResumeModal}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-zinc-900/60 hover:bg-zinc-800 text-emerald-400 hover:text-emerald-300 border border-zinc-800/80 transition-colors cursor-pointer"
            >
              <FileCode2 className="w-3 h-3" />
              <span>resume.md</span>
            </button>

            <button
              onClick={onOpenHireModal}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-zinc-900 hover:bg-zinc-800 text-white border border-zinc-700/80 hover:border-zinc-500 transition-colors cursor-pointer"
            >
              <span className="text-emerald-400 font-bold">$</span>
              <span>sudo hire me</span>
            </button>
          </div>
        </div>

        {/* Back to top row */}
        <div className="pt-4 flex items-center justify-between text-[11px] text-zinc-500">
          <span>// End of buffer</span>
          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-1 text-zinc-400 hover:text-white transition-colors cursor-pointer"
          >
            <ArrowUp className="w-3 h-3" />
            <span>top (line 1)</span>
          </button>
        </div>
      </div>

      {/* Subtle Bottom IDE Status Line */}
      <div className="border-t border-zinc-800/60 bg-[#06070a] px-4 sm:px-6 py-1.5 flex items-center justify-between text-[11px] text-zinc-500 select-none">
        <div className="flex items-center gap-2">
          <GitBranch className="w-3 h-3 text-emerald-500/80" />
          <span>main</span>
          <span className="text-zinc-700">·</span>
          <span>ready</span>
        </div>

        <div className="hidden xs:block text-zinc-600">
          © {new Date().getFullYear()} {PERSONAL_INFO.realName}
        </div>

        <div className="flex items-center gap-2 text-zinc-500">
          <span>TypeScript</span>
          <span className="text-zinc-700">·</span>
          <span>UTF-8</span>
        </div>
      </div>
    </footer>
  );
};
