import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Download,
  Printer,
  Mail,
  Linkedin,
  Phone,
  MapPin,
  CheckCircle,
  FileText,
  Briefcase,
  GraduationCap,
  Wrench,
  Code2,
  Eye,
  ZoomIn,
  ZoomOut,
  FileCode2,
  ExternalLink,
  GitBranch,
  Check,
  ChevronRight,
  Terminal,
  Radio,
  Minus,
  Square
} from 'lucide-react';
import { PERSONAL_INFO, SKILL_CATEGORIES, PROJECTS, EDUCATION_ITEMS } from '../data/portfolioData';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DRIVE_RESUME_URL = 'https://drive.google.com/file/d/1thwzIaNz9BG-e6E2_u3wewugRrTaLdih/';

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  // View mode: 'interactive' (VS Code / Markdown view) or 'pdf' (embedded PDF layout)
  const [viewMode, setViewMode] = useState<'interactive' | 'pdf'>('interactive');
  const [pdfZoom, setPdfZoom] = useState<number>(100);

  if (!isOpen) return null;

  const handleDownloadTxt = () => {
    const resumeText = `
${PERSONAL_INFO.realName.toUpperCase()}
| ${PERSONAL_INFO.website} |
Phone: ${PERSONAL_INFO.phone} | Email: ${PERSONAL_INFO.email} | LinkedIn: https://linkedin.com/in/imapcode | Location: ${PERSONAL_INFO.location}

============================================================
SUMMARY
============================================================
${PERSONAL_INFO.bio}

============================================================
PROJECTS
============================================================
${PROJECTS.map(
  (p) => `
${p.title} | ${p.subtitle} (${p.projectType})
${(p.resumeBullets || p.highlights).map((h) => `• ${h.replace(/[*`]/g, '')}`).join('\n')}
`
).join('\n')}

============================================================
EDUCATION
============================================================
${EDUCATION_ITEMS.map(
  (edu) => `
${edu.institution} (${edu.period})
${edu.degree}${edu.score ? ` | ${edu.score}` : ''}
${(edu.details || []).map((d) => `• ${d}`).join('\n')}
`
).join('\n')}

============================================================
SKILLS
============================================================
${SKILL_CATEGORIES.map((cat) => `${cat.title} : ${cat.skills.join(', ')}`).join('\n')}
    `.trim();

    const blob = new Blob([resumeText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Aryan_Mishra_Resume.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 2000);
  };

  const renderCherryRedHighlight = (text: string) => {
    const regex = /(\*[^*]+\*|`[^`]+`)/g;
    const parts = text.split(regex);

    return parts.map((part, index) => {
      if (part.startsWith('*') && part.endsWith('*')) {
        return (
          <span key={index} className="italic text-[#ff3864] font-medium">
            {part.slice(1, -1)}
          </span>
        );
      }
      if (part.startsWith('`') && part.endsWith('`')) {
        return (
          <span
            key={index}
            className="text-amber-300 font-semibold px-1 py-0.2 rounded bg-amber-400/10 border border-amber-400/20 text-[11px] font-mono inline-block mx-0.5"
          >
            {part.slice(1, -1)}
          </span>
        );
      }
      return <span key={index} className="text-zinc-300">{part}</span>;
    });
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
        />

        {/* Modal Window: VS Code / IDE Styled Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 14 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 14 }}
          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-4xl max-h-[92vh] bg-[#0c0d12] border border-zinc-800/90 rounded-xl shadow-2xl flex flex-col z-10 overflow-hidden text-zinc-100 font-sans ring-1 ring-white/5"
        >
          {/* ========================================================================= */}
          {/* 1. CODE EDITOR TOP TITLEBAR                                               */}
          {/* ========================================================================= */}
          <div className="h-9 px-3.5 bg-[#14161d] border-b border-zinc-800/80 flex items-center justify-between select-none shrink-0 gap-2">
            {/* Window Controls (macOS Traffic Lights) */}
            <div className="flex items-center gap-2 w-20">
              <button
                onClick={onClose}
                className="w-3 h-3 rounded-full bg-[#ff5f56] hover:brightness-110 active:brightness-90 transition-all flex items-center justify-center group"
                title="Close"
              >
                <X className="w-2 h-2 text-[#4c0002] opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
              <button
                onClick={onClose}
                className="w-3 h-3 rounded-full bg-[#ffbd2e] hover:brightness-110 active:brightness-90 transition-all flex items-center justify-center group"
                title="Minimize"
              >
                <Minus className="w-2 h-2 text-[#543b00] opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
              <button
                className="w-3 h-3 rounded-full bg-[#27c93f] hover:brightness-110 active:brightness-90 transition-all flex items-center justify-center group"
                title="Zoom / Expand"
              >
                <Square className="w-1.5 h-1.5 text-[#00380e] opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            </div>

            {/* Central Command / Document Pill */}
            <div className="hidden sm:flex items-center justify-center gap-2 px-3 py-1 rounded-md bg-zinc-900/80 border border-zinc-800 text-[11px] font-mono text-zinc-400 max-w-md w-full truncate shadow-inner">
              <Terminal className="w-3 h-3 text-emerald-400 shrink-0" />
              <span className="text-zinc-200 truncate">imapcode — {viewMode === 'interactive' ? 'resume.md' : 'preview.pdf'}</span>
              <span className="text-zinc-600">— Code Editor</span>
            </div>

            {/* Top Right Quick Actions */}
            <div className="flex items-center gap-1.5 w-20 justify-end">
              <button
                onClick={onClose}
                className="p-1 rounded-md text-zinc-400 hover:text-white hover:bg-zinc-800/80 transition-colors"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* 2. EDITOR TAB BAR & ACTION BUTTONS                                        */}
          {/* ========================================================================= */}
          <div className="flex items-center justify-between px-2 bg-[#0f1117] border-b border-zinc-800/90 gap-2 shrink-0">
            {/* Tabs List */}
            <div className="flex items-center gap-1 overflow-x-auto no-scrollbar pt-1.5">
              {/* Tab 1: resume.md (Interactive Dark IDE View) */}
              <button
                onClick={() => setViewMode('interactive')}
                className={`relative flex items-center gap-2 px-3 py-1.5 rounded-t-md text-xs font-mono transition-colors border-t border-x ${
                  viewMode === 'interactive'
                    ? 'bg-[#181a24] text-white border-zinc-700/80 border-t-emerald-400 font-medium shadow-sm'
                    : 'bg-transparent text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/50 border-transparent'
                }`}
              >
                <FileCode2 className={`w-3.5 h-3.5 ${viewMode === 'interactive' ? 'text-emerald-400' : 'text-zinc-500'}`} />
                <span>resume.md</span>
                {viewMode === 'interactive' && (
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 ml-0.5 animate-pulse" />
                )}
              </button>

              {/* Tab 2: preview.pdf (View PDF Local Document Viewer) */}
              <button
                onClick={() => setViewMode('pdf')}
                className={`relative flex items-center gap-2 px-3 py-1.5 rounded-t-md text-xs font-mono transition-colors border-t border-x ${
                  viewMode === 'pdf'
                    ? 'bg-[#181a24] text-white border-zinc-700/80 border-t-emerald-400 font-medium shadow-sm'
                    : 'bg-transparent text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/50 border-transparent'
                }`}
              >
                <Eye className={`w-3.5 h-3.5 ${viewMode === 'pdf' ? 'text-emerald-400' : 'text-zinc-500'}`} />
                <span>preview.pdf</span>
                <span className="text-[10px] px-1 py-0.2 rounded bg-zinc-800 text-zinc-400">View PDF</span>
              </button>
            </div>

            {/* Tab Actions Toolbar (Print redirects to Google Drive, TXT download) */}
            <div className="flex items-center gap-2 py-1 flex-shrink-0">
              {/* Print Button (Always visible in interactive tab, redirects to user's Drive link) */}
              <a
                href={DRIVE_RESUME_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-zinc-900 hover:bg-zinc-800 text-zinc-200 hover:text-white text-xs font-mono border border-zinc-700/80 hover:border-zinc-500 transition-all touch-manipulation group"
                title="Print resume (Redirects to Google Drive PDF)"
              >
                <Printer className="w-3.5 h-3.5 text-zinc-400 group-hover:text-emerald-400 transition-colors" />
                <span>Print</span>
                <ExternalLink className="w-3 h-3 text-zinc-500 group-hover:text-zinc-300 ml-0.5" />
              </a>

              {/* TXT Download Button */}
              <button
                onClick={handleDownloadTxt}
                className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white text-xs font-mono border border-zinc-800 transition-colors"
                title="Download plain text (.txt)"
              >
                {downloadSuccess ? (
                  <>
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Saved</span>
                  </>
                ) : (
                  <>
                    <Download className="w-3.5 h-3.5" />
                    <span>TXT</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* 3. BREADCRUMBS PATH BAR                                                  */}
          {/* ========================================================================= */}
          <div className="px-4 py-1.5 bg-[#12141c] border-b border-zinc-800/60 flex items-center justify-between text-[11px] font-mono text-zinc-400 select-none shrink-0">
            <div className="flex items-center gap-1.5 truncate">
              <span className="text-zinc-500">imapcode-portfolio</span>
              <ChevronRight className="w-3 h-3 text-zinc-600" />
              <span className="text-zinc-500">src</span>
              <ChevronRight className="w-3 h-3 text-zinc-600" />
              <span className="text-zinc-500">data</span>
              <ChevronRight className="w-3 h-3 text-zinc-600" />
              <span className="text-zinc-300 font-medium">
                {viewMode === 'interactive' ? 'resume.md' : 'preview.pdf'}
              </span>
              <ChevronRight className="w-3 h-3 text-zinc-600" />
              <span className="text-emerald-400">AryanMishra</span>
            </div>

            <div className="hidden xs:flex items-center gap-2">
              <span className="text-[10px] text-zinc-500">
                {viewMode === 'interactive' ? '● Markdown Language Server' : '● PDF Document Canvas'}
              </span>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* 4. MAIN EDITOR WORKSPACE CONTENT                                          */}
          {/* ========================================================================= */}
          {viewMode === 'interactive' ? (
            /* ======================================================================= */
            /* 4A. INTERACTIVE CODE VIEW (The authentic dark developer resume)        */
            /* ======================================================================= */
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 space-y-6 text-zinc-200 bg-[#0c0d12]">
              {/* Profile Card */}
              <div className="p-5 sm:p-6 rounded-xl bg-[#141620] border border-zinc-800/90 shadow-lg">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <span className="text-zinc-500 font-mono text-xs">#</span>
                      <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                        {PERSONAL_INFO.realName}
                      </h3>
                      <span className="text-xs font-mono px-2 py-0.5 rounded bg-emerald-400/10 border border-emerald-400/30 text-emerald-300">
                        @{PERSONAL_INFO.handle}
                      </span>
                    </div>
                    <p className="text-sm text-zinc-400 mt-1 font-mono">
                      {PERSONAL_INFO.tagline}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setViewMode('pdf')}
                      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-mono transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>View PDF Resume</span>
                    </button>
                  </div>
                </div>

                {/* Contact & Meta Badges */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 mt-4 pt-4 border-t border-zinc-800/80 text-xs font-mono">
                  <div className="flex items-center gap-2 text-zinc-400 truncate">
                    <Phone className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                    <span>{PERSONAL_INFO.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-zinc-400 truncate">
                    <Mail className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                    <a href={`mailto:${PERSONAL_INFO.email}`} className="hover:text-emerald-400 truncate">
                      {PERSONAL_INFO.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-2 text-zinc-400 truncate">
                    <Linkedin className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                    <a
                      href="https://linkedin.com/in/imapcode"
                      target="_blank"
                      rel="noreferrer"
                      className="hover:text-emerald-400 truncate"
                    >
                      in/imapcode
                    </a>
                  </div>
                  <div className="flex items-center gap-2 text-zinc-400 truncate">
                    <MapPin className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                    <span>{PERSONAL_INFO.location}</span>
                  </div>
                </div>
              </div>

              {/* Summary Section */}
              <div className="space-y-2">
                <h4 className="text-xs font-mono text-emerald-400 uppercase tracking-wider flex items-center gap-2">
                  <span className="text-zinc-600">##</span>
                  <Code2 className="w-3.5 h-3.5" />
                  <span>01_SUMMARY</span>
                </h4>
                <div className="p-4 rounded-xl bg-[#141620]/80 border border-zinc-800/80 text-xs sm:text-[13px] leading-relaxed text-zinc-300">
                  {PERSONAL_INFO.bio}
                </div>
              </div>

              {/* Technical Skills Grid */}
              <div className="space-y-3">
                <h4 className="text-xs font-mono text-emerald-400 uppercase tracking-wider flex items-center gap-2">
                  <span className="text-zinc-600">##</span>
                  <Wrench className="w-3.5 h-3.5" />
                  <span>02_TECHNICAL_SKILLS</span>
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {SKILL_CATEGORIES.map((cat, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-lg bg-[#141620]/70 border border-zinc-800/80"
                    >
                      <div className="text-xs font-semibold text-white mb-2 font-mono flex items-center justify-between">
                        <span>{cat.title}</span>
                        <span className="text-[10px] text-zinc-500">{cat.skills.length} tools</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {cat.skills.map((skill, sIdx) => (
                          <span
                            key={sIdx}
                            className="px-2 py-0.5 rounded text-[11px] font-mono bg-zinc-900 border border-zinc-800 text-zinc-300"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Featured Engineering Projects */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-mono text-emerald-400 uppercase tracking-wider flex items-center gap-2">
                    <span className="text-zinc-600">##</span>
                    <Briefcase className="w-3.5 h-3.5" />
                    <span>03_FEATURED_ENGINEERING_PROJECTS</span>
                  </h4>
                  <span className="text-[11px] font-mono text-zinc-500 hidden sm:inline">
                    Cherry Red = Architecture Highlights
                  </span>
                </div>

                <div className="space-y-3">
                  {PROJECTS.map((project) => (
                    <div
                      key={project.id}
                      className="p-4 rounded-xl bg-[#141620]/80 border border-zinc-800/80 hover:border-zinc-700 transition-colors"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2.5">
                        <div>
                          <span className="font-semibold text-white text-sm">
                            {project.title}
                          </span>
                          <span className="text-xs font-mono text-zinc-400 ml-2">
                            | {project.subtitle}
                          </span>
                        </div>
                        <span className="text-[11px] font-mono text-zinc-500 italic">
                          {project.projectType}
                        </span>
                      </div>

                      <ul className="space-y-1.5 text-xs sm:text-[12.5px] leading-relaxed">
                        {project.highlights.map((highlight, hIdx) => (
                          <li key={hIdx} className="flex items-start gap-2">
                            <span className="text-emerald-400 font-mono select-none">›</span>
                            <span>{renderCherryRedHighlight(highlight)}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* Education */}
              <div className="space-y-3">
                <h4 className="text-xs font-mono text-emerald-400 uppercase tracking-wider flex items-center gap-2">
                  <span className="text-zinc-600">##</span>
                  <GraduationCap className="w-3.5 h-3.5" />
                  <span>04_EDUCATION</span>
                </h4>
                <div className="space-y-3">
                  {EDUCATION_ITEMS.map((edu, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-[#141620]/70 border border-zinc-800/80"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                        <span className="font-bold text-white text-sm">
                          {edu.institution}
                        </span>
                        <span className="text-xs font-mono text-zinc-400">
                          {edu.period}
                        </span>
                      </div>
                      <div className="text-xs text-zinc-300 mb-2">
                        <span>{edu.degree}</span>
                        {edu.score && (
                          <span className="ml-2 font-mono text-emerald-400">
                            | {edu.score}
                          </span>
                        )}
                      </div>
                      {edu.details && edu.details.length > 0 && (
                        <ul className="space-y-1 text-xs text-zinc-400">
                          {edu.details.map((detail, dIdx) => (
                            <li key={dIdx} className="flex items-start gap-2">
                              <span className="text-zinc-600 font-mono select-none">•</span>
                              <span>{detail}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            /* ======================================================================= */
            /* 4B. LOCAL PDF DOCUMENT VIEW (Opens PDF locally with zoom controls)     */
            /* NOTE: As requested, NO print button is included in this tab            */
            /* ======================================================================= */
            <div className="flex-1 flex flex-col min-h-0 bg-[#161821]">
              {/* PDF Toolbar - NO PRINT BUTTON as per instructions */}
              <div className="px-4 py-2 bg-[#12141c] border-b border-zinc-800 flex items-center justify-between text-xs font-mono text-zinc-400 gap-2 shrink-0">
                <div className="flex items-center gap-2 truncate">
                  <FileText className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span className="text-white font-medium truncate">Aryan_Mishra_Resume.pdf</span>
                  <span className="text-zinc-600 hidden sm:inline">|</span>
                  <span className="text-zinc-400 hidden sm:inline">1 Page A4 Document</span>
                </div>

                <div className="flex items-center gap-2">
                  {/* Zoom Controls */}
                  <div className="flex items-center gap-1 bg-zinc-900 px-2 py-0.5 rounded border border-zinc-800 text-[11px]">
                    <button
                      onClick={() => setPdfZoom((z) => Math.max(75, z - 10))}
                      className="hover:text-white p-0.5"
                      title="Zoom Out"
                    >
                      <ZoomOut className="w-3 h-3" />
                    </button>
                    <span className="w-9 text-center">{pdfZoom}%</span>
                    <button
                      onClick={() => setPdfZoom((z) => Math.min(130, z + 10))}
                      className="hover:text-white p-0.5"
                      title="Zoom In"
                    >
                      <ZoomIn className="w-3 h-3" />
                    </button>
                  </div>

                  {/* Switch back to interactive code view */}
                  <button
                    onClick={() => setViewMode('interactive')}
                    className="text-xs text-zinc-400 hover:text-white underline underline-offset-2 ml-1"
                  >
                    Back to Code
                  </button>
                </div>
              </div>

              {/* PDF Canvas Viewport */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-8 flex justify-center items-start">
                <div
                  style={{ transform: `scale(${pdfZoom / 100})`, transformOrigin: 'top center' }}
                  className="w-full max-w-[760px] bg-white text-zinc-900 rounded shadow-2xl p-6 sm:p-10 font-sans transition-transform duration-150"
                >
                  {/* Header: Name & Contact Info */}
                  <div className="text-center pb-3 border-b border-zinc-300">
                    <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-black">
                      {PERSONAL_INFO.realName}
                    </h1>
                    <div className="text-xs sm:text-sm text-zinc-600 mt-0.5 font-medium">
                      | {PERSONAL_INFO.website} |
                    </div>

                    <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 mt-2 text-[11px] sm:text-xs text-zinc-700">
                      <span className="inline-flex items-center gap-1">
                        <Phone className="w-3 h-3 text-zinc-600" />
                        <span>{PERSONAL_INFO.phone}</span>
                      </span>
                      <span>|</span>
                      <span className="inline-flex items-center gap-1">
                        <Mail className="w-3 h-3 text-zinc-600" />
                        <span>{PERSONAL_INFO.email}</span>
                      </span>
                      <span>|</span>
                      <span className="inline-flex items-center gap-1">
                        <Linkedin className="w-3 h-3 text-zinc-600" />
                        <span>linkedin.com/in/imapcode</span>
                      </span>
                      <span>|</span>
                      <span className="inline-flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-zinc-600" />
                        <span>{PERSONAL_INFO.location}</span>
                      </span>
                    </div>
                  </div>

                  {/* SUMMARY SECTION */}
                  <div className="mt-3.5">
                    <h2 className="text-xs sm:text-sm font-bold tracking-wider uppercase text-black pb-0.5 border-b border-zinc-300">
                      SUMMARY
                    </h2>
                    <p className="mt-1.5 text-xs sm:text-[12.5px] leading-relaxed text-zinc-800 text-justify">
                      {PERSONAL_INFO.bio}
                    </p>
                  </div>

                  {/* PROJECTS SECTION */}
                  <div className="mt-3.5">
                    <h2 className="text-xs sm:text-sm font-bold tracking-wider uppercase text-black pb-0.5 border-b border-zinc-300">
                      PROJECTS
                    </h2>

                    <div className="space-y-3 mt-2">
                      {PROJECTS.map((project) => (
                        <div key={project.id} className="text-xs sm:text-[12.5px]">
                          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                            <div className="font-semibold text-black">
                              <span className="font-bold">{project.title}</span>
                              <span className="font-normal text-zinc-600">
                                {' '}| {project.subtitle}
                              </span>
                            </div>
                            <div className="text-[11px] text-zinc-600 italic sm:text-right shrink-0">
                              {project.projectType}
                            </div>
                          </div>

                          <ul className="mt-1 space-y-1 list-disc list-outside ml-4 text-zinc-800 leading-relaxed">
                            {(project.resumeBullets || project.highlights).map((bullet, bIdx) => (
                              <li key={bIdx}>
                                {bullet.replace(/[*`]/g, '')}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* EDUCATION SECTION */}
                  <div className="mt-3.5">
                    <h2 className="text-xs sm:text-sm font-bold tracking-wider uppercase text-black pb-0.5 border-b border-zinc-300">
                      EDUCATION
                    </h2>

                    <div className="space-y-2.5 mt-2 text-xs sm:text-[12.5px]">
                      {/* Chandigarh University */}
                      <div>
                        <div className="flex justify-between items-baseline">
                          <span className="font-bold text-black">
                            Chandigarh University
                          </span>
                          <span className="text-zinc-700 text-xs font-medium">
                            2023 – 2027
                          </span>
                        </div>
                        <div className="text-zinc-800 italic">
                          Bachelor of Engineering in Computer Science | <span className="font-semibold not-italic">CGPA: 7.5</span>
                        </div>
                        <ul className="list-disc list-outside ml-4 mt-0.5 text-zinc-800 text-[11.5px] leading-relaxed">
                          <li>
                            Coursework: Computer Organization, Database Management Systems, Operating Systems, Computer Networks, Object-Oriented Programming, Data Structures and Algorithms.
                          </li>
                        </ul>
                      </div>

                      {/* Maxfort School */}
                      <div>
                        <div className="flex justify-between items-baseline">
                          <span className="font-bold text-black">
                            Maxfort School Dwarka, New Delhi
                          </span>
                          <span className="text-zinc-700 text-xs font-medium">
                            2019 – 2022
                          </span>
                        </div>
                        <div className="text-zinc-800 italic">
                          Intermediate & Matriculation [CBSE]
                        </div>
                        <ul className="list-disc list-outside ml-4 mt-0.5 text-zinc-800 text-[11.5px] leading-relaxed">
                          <li>
                            Intermediate (PCM with CS) [2021–2022]: <span className="font-semibold">84%</span>
                          </li>
                          <li>
                            Matriculation [2019–2020]: <span className="font-semibold">80%</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* SKILLS SECTION */}
                  <div className="mt-3.5">
                    <h2 className="text-xs sm:text-sm font-bold tracking-wider uppercase text-black pb-0.5 border-b border-zinc-300">
                      SKILLS
                    </h2>

                    <div className="mt-1.5 space-y-1 text-xs sm:text-[12px] text-zinc-900 leading-relaxed">
                      <div>
                        <span className="font-bold">Languages : </span>
                        <span>C, C++, Java, Python, Bash</span>
                      </div>
                      <div>
                        <span className="font-bold">Web & Frontend : </span>
                        <span>HTML, CSS, JavaScript, React</span>
                      </div>
                      <div>
                        <span className="font-bold">Backend & Frameworks : </span>
                        <span>Flask, MongoDB</span>
                      </div>
                      <div>
                        <span className="font-bold">Databases : </span>
                        <span>PostgreSQL, MySQL</span>
                      </div>
                      <div>
                        <span className="font-bold">DevOps & Cloud : </span>
                        <span>Git, GitHub, Docker, AWS, Bash</span>
                      </div>
                      <div>
                        <span className="font-bold">Tools : </span>
                        <span>Wireshark, Figma, Photoshop</span>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* 5. VS CODE / IDE BOTTOM STATUS BAR                                        */}
          {/* ========================================================================= */}
          <div className="px-3.5 py-1.5 border-t border-zinc-800/90 bg-[#090a0f] flex items-center justify-between gap-2 text-[11px] text-zinc-400 font-mono select-none shrink-0">
            {/* Left Status Indicators */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 text-zinc-300 hover:text-white transition-colors cursor-pointer">
                <GitBranch className="w-3 h-3 text-emerald-400" />
                <span className="font-medium">main*</span>
              </div>
              <span className="text-zinc-700">|</span>
              <div className="hidden xs:flex items-center gap-2 text-zinc-400">
                <span className="flex items-center gap-1">
                  <span className="text-emerald-400">0</span>
                  <span className="text-zinc-500">errors</span>
                </span>
                <span className="flex items-center gap-1">
                  <span className="text-amber-400">0</span>
                  <span className="text-zinc-500">warnings</span>
                </span>
              </div>
              <span className="text-zinc-700 hidden xs:inline">|</span>
              <div className="flex items-center gap-1 text-emerald-400">
                <Radio className="w-2.5 h-2.5 animate-pulse" />
                <span className="text-[10px]">Live IDE</span>
              </div>
            </div>

            {/* Right Editor Diagnostics */}
            <div className="flex items-center gap-3">
              <span className="hidden sm:inline text-zinc-500">Ln 1, Col 1</span>
              <span className="text-zinc-700 hidden sm:inline">|</span>
              <span className="hidden md:inline text-zinc-500">Spaces: 2</span>
              <span className="text-zinc-700 hidden md:inline">|</span>
              <span className="hidden sm:inline text-zinc-500">UTF-8</span>
              <span className="text-zinc-700 hidden sm:inline">|</span>
              <span className="hidden sm:inline text-zinc-500">LF</span>
              <span className="text-zinc-700 hidden sm:inline">|</span>
              <span className="text-zinc-300 font-medium">
                {viewMode === 'interactive' ? 'Markdown' : 'PDF Viewer'}
              </span>
              <span className="text-zinc-700">|</span>
              <div className="flex items-center gap-1 text-zinc-300">
                <Check className="w-3 h-3 text-emerald-400" />
                <span>Prettier</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
