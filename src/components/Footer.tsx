import React from 'react';
import { Github, Linkedin, FileText, ArrowUp } from 'lucide-react';
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
    <footer className="border-t border-zinc-200 bg-white py-12 relative">
      <div className="max-w-4xl mx-auto px-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-8 border-b border-zinc-200">
          {/* Brand */}
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-cinematic font-bold text-base text-zinc-950 tracking-wider">
                {PERSONAL_INFO.name}
              </span>
              <span className="text-xs font-mono text-zinc-500 uppercase">
                · {PERSONAL_INFO.caption}
              </span>
            </div>
            <p className="text-xs text-zinc-600">
              Full-Stack Web Applications & Distributed Systems.
            </p>
          </div>

          {/* Quick links */}
          <div className="flex flex-wrap items-center gap-5 text-xs font-mono">
            <a
              href="https://github.com/imapcode"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-600 hover:text-zinc-950 font-medium transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/imapcode"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-600 hover:text-zinc-950 font-medium transition-colors"
            >
              LinkedIn
            </a>
            <button
              onClick={onOpenResumeModal}
              className="text-zinc-600 hover:text-zinc-950 font-medium transition-colors"
            >
              Resume
            </button>
            <button
              onClick={onOpenHireModal}
              className="text-zinc-950 hover:text-zinc-700 underline font-semibold transition-colors"
            >
              sudo hire me
            </button>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 flex items-center justify-between text-xs text-zinc-600 font-mono">
          <span>© {new Date().getFullYear()} {PERSONAL_INFO.name}. All rights reserved.</span>
          <button
            onClick={scrollToTop}
            className="p-2 rounded-lg bg-zinc-100 border border-zinc-200 text-zinc-700 hover:text-zinc-950 hover:bg-zinc-200 transition-colors"
            aria-label="Back to top"
          >
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
