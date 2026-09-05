import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
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

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Links', href: '#links' },
    { label: 'Projects', href: '#projects' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md border-b border-zinc-200/90 py-3 shadow-sm'
          : 'bg-white/90 backdrop-blur-sm border-b border-zinc-200/70 py-4 shadow-xs'
      }`}
    >
      <div className="max-w-5xl mx-auto px-6 relative flex items-center justify-between">
        {/* Brand (IMAPCODE only - removed sudo hire me) */}
        <a
          href="#home"
          className="group flex items-center text-zinc-950 hover:text-zinc-700 transition-colors"
          aria-label="IMAPCODE Home"
        >
          <span className="font-cinematic font-black tracking-wider text-lg sm:text-xl text-zinc-950 group-hover:text-zinc-700 transition-colors">
            {PERSONAL_INFO.name}
          </span>
        </a>

        {/* Centered Desktop Nav Links (Geometrically centered) */}
        <nav className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-xs tracking-wider uppercase font-semibold text-zinc-600 hover:text-zinc-950 transition-colors"
            >
              {link.label}
            </a>
          ))}
          <button
            onClick={onOpenResumeModal}
            className="text-xs tracking-wider uppercase font-semibold text-zinc-600 hover:text-zinc-950 transition-colors flex items-center gap-1"
          >
            <span>Resume</span>
            <ArrowUpRight className="w-3 h-3 opacity-70" />
          </button>
        </nav>

        {/* Right side balance */}
        <div className="hidden md:flex items-center">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-zinc-100 border border-zinc-200/80 text-[11px] font-mono text-zinc-600">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>online</span>
          </span>
        </div>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-zinc-900 hover:text-zinc-600 transition-colors"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5 text-zinc-950" /> : <Menu className="w-5 h-5 text-zinc-950" />}
        </button>
      </div>

      {/* Mobile Drawer (Matching white background & black typography) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="md:hidden bg-white border-b border-zinc-200 px-6 py-6 shadow-xl space-y-4"
          >
            <nav className="flex flex-col gap-3.5">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm font-semibold tracking-wide text-zinc-800 hover:text-zinc-950 transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenResumeModal();
                }}
                className="text-left text-sm font-semibold tracking-wide text-zinc-800 hover:text-zinc-950 transition-colors flex items-center justify-between"
              >
                <span>Resume</span>
                <ArrowUpRight className="w-4 h-4 text-zinc-500" />
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
