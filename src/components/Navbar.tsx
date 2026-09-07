import React, { useState, useEffect } from 'react';
import { Menu, X, Terminal, FileCode2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface NavbarProps {
  onOpenHireModal: () => void;
  onOpenResumeModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenHireModal, onOpenResumeModal }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'about.ts', href: '#about' },
    { label: 'links.json', href: '#links' },
    { label: 'projects.cpp', href: '#projects' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#090a0f]/90 backdrop-blur-md border-b border-zinc-800/80 py-2.5 shadow-lg'
          : 'bg-[#090a0f]/75 backdrop-blur-sm border-b border-zinc-800/50 py-3'
      }`}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-4">
        {/* Left: Window Dots + Brand */}
        <a
          href="#home"
          className="flex items-center gap-3 text-zinc-200 hover:text-white transition-colors group"
          aria-label="IMAPCODE Home"
        >
          {/* Subtle macOS window dots (calm, muted) */}
          <div className="flex items-center gap-1.5 opacity-60 group-hover:opacity-100 transition-opacity">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
          </div>

          <span className="font-mono text-xs sm:text-sm font-semibold tracking-wider text-white flex items-center gap-1">
            <span className="text-zinc-500 font-normal">~/</span>
            <span>{PERSONAL_INFO.name.toLowerCase()}</span>
          </span>
        </a>

        {/* Center: Clean Code Editor Tabs */}
        <nav className="hidden md:flex items-center gap-1 bg-zinc-900/50 p-1 rounded-lg border border-zinc-800/60 font-mono text-xs">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="px-3 py-1 rounded-md text-zinc-400 hover:text-white hover:bg-zinc-800/60 transition-colors"
            >
              {item.label}
            </a>
          ))}

          {/* Resume Tab */}
          <button
            onClick={onOpenResumeModal}
            className="px-3 py-1 rounded-md text-emerald-400 hover:text-emerald-300 hover:bg-emerald-950/30 transition-colors flex items-center gap-1.5 cursor-pointer"
            title="Open Resume"
          >
            <FileCode2 className="w-3.5 h-3.5" />
            <span>resume.md</span>
          </button>
        </nav>

        {/* Right: Clean Terminal CTA */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={onOpenHireModal}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-zinc-900/80 hover:bg-zinc-800 text-zinc-200 hover:text-white border border-zinc-800 hover:border-zinc-700 text-xs font-mono transition-colors cursor-pointer"
            title="Execute sudo hire me"
          >
            <span className="text-emerald-400 font-bold">$</span>
            <span>sudo hire me</span>
          </button>

          {/* Mobile menu hamburger toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 rounded-md bg-zinc-900/80 border border-zinc-800 text-zinc-400 hover:text-white transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15 }}
            className="md:hidden bg-[#0c0e14] border-b border-zinc-800 px-5 py-4 font-mono text-xs space-y-2 shadow-2xl mt-2"
          >
            <div className="text-[11px] text-zinc-500 uppercase tracking-wider mb-2">
              FILES
            </div>
            <nav className="flex flex-col gap-1.5">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 rounded-md text-zinc-300 hover:text-white hover:bg-zinc-900 transition-colors"
                >
                  {item.label}
                </a>
              ))}

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenResumeModal();
                }}
                className="px-3 py-2 rounded-md text-emerald-400 hover:bg-emerald-950/20 transition-colors text-left flex items-center gap-2"
              >
                <FileCode2 className="w-3.5 h-3.5" />
                <span>resume.md</span>
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
