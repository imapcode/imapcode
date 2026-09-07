import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Github, ArrowUpRight, Check, Copy, Braces, Terminal, ExternalLink } from 'lucide-react';
import { PROJECTS } from '../data/portfolioData';
import { cardAudio } from '../utils/cardAudio';

export const ProjectsSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories = ['All', 'Python', 'C++', 'Systems'];

  const filteredProjects =
    selectedCategory === 'All'
      ? PROJECTS
      : PROJECTS.filter((p) => {
          if (selectedCategory === 'Python') return p.tags.includes('Python') || p.category === 'Python';
          if (selectedCategory === 'C++') return p.tags.includes('C++') || p.category === 'C++';
          if (selectedCategory === 'Systems') {
            return (
              p.category.includes('Systems') ||
              p.tags.includes('OS Internals') ||
              p.tags.includes('Game Loop') ||
              p.tags.includes('C++')
            );
          }
          return true;
        });

  const handleCopyJson = (e: React.MouseEvent, project: (typeof PROJECTS)[0]) => {
    e.stopPropagation();
    const cleanStr = (s: string) => s.replace(/[*`]/g, '');
    const jsonOutput: Record<string, any> = {
      project: project.title,
      stack: project.tags,
      architecture: project.highlights.map(cleanStr),
      metrics: project.metrics,
      repository: project.githubUrl,
    };
    if (project.liveUrl && project.liveUrl !== project.githubUrl) {
      jsonOutput.deployment = project.liveUrl;
    }
    navigator.clipboard.writeText(JSON.stringify(jsonOutput, null, 2));
    setCopiedId(project.id);
    cardAudio.playSelect();
    setTimeout(() => setCopiedId(null), 2000);
  };

  const renderArchitectureHighlight = (text: string) => {
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
    <section id="projects" className="py-14 sm:py-20 md:py-28 relative border-t border-zinc-900">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-12 gap-5 sm:gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 mb-2 uppercase tracking-widest">
              <Terminal className="w-3.5 h-3.5" />
              <span>manifest.json</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-cinematic font-bold tracking-tight text-white">
              Projects
            </h2>
            <p className="text-zinc-400 text-xs sm:text-sm mt-2 max-w-xl font-editorial italic">
              Production codebases and systems architectures serialized in structured format.
            </p>
          </div>

          {/* Filter pills */}
          <div className="flex items-center gap-1.5 p-1 rounded-lg bg-zinc-950 border border-zinc-800/80 text-xs font-mono overflow-x-auto no-scrollbar max-w-full">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  cardAudio.playSelect();
                }}
                className={`whitespace-nowrap flex-shrink-0 px-3 py-1.5 sm:py-1 rounded-md transition-all touch-manipulation ${
                  selectedCategory === cat
                    ? 'bg-zinc-100 text-zinc-950 font-semibold'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid: Clean JSON Document Format */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3 }}
              className="group rounded-xl bg-[#0a0c10] border border-zinc-800/80 hover:border-zinc-700 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.5)]"
            >
              {/* Window Title Bar */}
              <div className="flex items-center justify-between px-3.5 py-2.5 bg-zinc-950 border-b border-zinc-800/80 select-none">
                <div className="flex items-center gap-2 min-w-0">
                  {/* Traffic Light Dots */}
                  <div className="flex items-center gap-1.5 pr-2 border-r border-zinc-800">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]/70 group-hover:bg-[#ff5f56] transition-colors" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]/70 group-hover:bg-[#ffbd2e] transition-colors" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]/70 group-hover:bg-[#27c93f] transition-colors" />
                  </div>

                  {/* Tab Title */}
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-zinc-900 border border-zinc-800/80 text-xs font-mono text-zinc-200 truncate">
                    <Braces className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span className="text-[11px] sm:text-xs text-zinc-200 font-medium truncate">
                      {project.filename}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={(e) => handleCopyJson(e, project)}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-400 hover:text-white transition-colors text-[11px] font-mono"
                    title="Copy formatted JSON"
                  >
                    {copiedId === project.id ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-400" />
                        <span className="text-emerald-400">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Copy JSON</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* JSON Editor Buffer with Line Numbers */}
              <div className="p-4 sm:p-5 font-mono text-xs sm:text-[13px] leading-relaxed flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  {/* Root opening */}
                  <div className="text-zinc-500 font-semibold">{'{'}</div>

                  {/* "title" */}
                  <div className="pl-4 flex flex-wrap items-baseline gap-x-1.5">
                    <span className="text-sky-400 font-medium">"title"</span>
                    <span className="text-zinc-500">:</span>
                    <span className="text-amber-200 font-semibold">"{project.title}"</span>
                    <span className="text-zinc-500">,</span>
                  </div>

                  {/* "stack" */}
                  <div className="pl-4 flex flex-wrap items-baseline gap-x-1">
                    <span className="text-sky-400 font-medium">"stack"</span>
                    <span className="text-zinc-500">:</span>
                    <span className="text-zinc-400">[</span>
                    {project.tags.slice(0, 4).map((tag, idx, arr) => (
                      <span key={tag} className="inline-flex items-baseline">
                        <span className="text-emerald-300">"{tag}"</span>
                        {idx < arr.length - 1 && <span className="text-zinc-500 mr-1.5">,</span>}
                      </span>
                    ))}
                    <span className="text-zinc-400">]</span>
                    <span className="text-zinc-500">,</span>
                  </div>

                  {/* "architecture" */}
                  <div className="pl-4 space-y-1.5">
                    <div className="flex items-baseline gap-1">
                      <span className="text-sky-400 font-medium">"architecture"</span>
                      <span className="text-zinc-500">: [</span>
                    </div>

                    {project.highlights.map((highlight, hIdx) => (
                      <div key={hIdx} className="pl-4 text-zinc-300 text-xs sm:text-[12.5px] leading-relaxed flex items-start gap-1">
                        <span className="text-emerald-400/80 shrink-0 select-none">"</span>
                        <span className="break-words">
                          {renderArchitectureHighlight(highlight)}
                        </span>
                        <span className="text-emerald-400/80 shrink-0 select-none">"</span>
                        {hIdx < project.highlights.length - 1 && (
                          <span className="text-zinc-500 shrink-0">,</span>
                        )}
                      </div>
                    ))}

                    <div className="text-zinc-400">
                      ]<span className="text-zinc-500">,</span>
                    </div>
                  </div>

                  {/* "metrics" */}
                  {project.metrics && (
                    <div className="pl-4 flex flex-wrap items-baseline gap-x-1.5">
                      <span className="text-sky-400 font-medium">"metrics"</span>
                      <span className="text-zinc-500">:</span>
                      <span className="text-purple-300 font-medium">"{project.metrics}"</span>
                      <span className="text-zinc-500">,</span>
                    </div>
                  )}

                  {/* "deployment" */}
                  {project.liveUrl && project.liveUrl !== project.githubUrl && (
                    <div className="pl-4 flex flex-wrap items-baseline gap-x-1.5">
                      <span className="text-sky-400 font-medium">"deployment"</span>
                      <span className="text-zinc-500">:</span>
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-emerald-300 hover:text-emerald-200 underline decoration-zinc-700 hover:decoration-emerald-400 transition-colors inline-flex items-center gap-1"
                      >
                        <span>"{project.liveUrl}"</span>
                        <ArrowUpRight className="w-3 h-3 text-emerald-400" />
                      </a>
                      <span className="text-zinc-500">,</span>
                    </div>
                  )}

                  {/* "repository" */}
                  <div className="pl-4 flex flex-wrap items-baseline gap-x-1.5">
                    <span className="text-sky-400 font-medium">"repository"</span>
                    <span className="text-zinc-500">:</span>
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-amber-300/90 hover:text-amber-200 underline decoration-zinc-700 hover:decoration-amber-300 transition-colors inline-flex items-center gap-1"
                    >
                      <span>"{project.githubUrl}"</span>
                      <ArrowUpRight className="w-3 h-3 text-zinc-400" />
                    </a>
                  </div>

                  {/* Root closing */}
                  <div className="text-zinc-500 font-semibold">{'}'}</div>
                </div>
              </div>

              {/* IDE Bottom Status Bar */}
              <div className="px-4 py-2 bg-zinc-950/80 border-t border-zinc-900 flex items-center justify-between text-xs font-mono text-zinc-500">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1.5 text-zinc-400 text-[11px]">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    valid json
                  </span>
                  <span className="hidden sm:inline text-zinc-600">|</span>
                  <span className="hidden sm:inline text-zinc-500 text-[11px]">UTF-8</span>
                </div>

                <div className="flex items-center gap-2.5">
                  {project.liveUrl && project.liveUrl !== project.githubUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-950/50 hover:bg-emerald-900/60 border border-emerald-500/30 text-emerald-300 hover:text-emerald-200 transition-colors text-[11px] font-medium"
                    >
                      <ExternalLink className="w-3 h-3" />
                      <span>Live App</span>
                      <ArrowUpRight className="w-3 h-3 text-emerald-400" />
                    </a>
                  )}

                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-zinc-400 hover:text-white transition-colors text-[11px]"
                  >
                    <Github className="w-3 h-3" />
                    <span>View Source</span>
                    <ArrowUpRight className="w-3 h-3 text-zinc-500" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
