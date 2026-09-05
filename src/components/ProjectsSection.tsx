import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Github, ArrowUpRight } from 'lucide-react';
import { PROJECTS } from '../data/portfolioData';
import { cardAudio } from '../utils/cardAudio';

export const ProjectsSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Systems & Backend', 'Full Stack', 'Developer Tools'];

  const filteredProjects =
    selectedCategory === 'All'
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === selectedCategory || p.tags.includes(selectedCategory));

  return (
    <section id="projects" className="py-14 sm:py-20 md:py-28 relative border-t border-zinc-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-12 gap-5 sm:gap-6">
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-cinematic font-bold tracking-tight text-white">
              My Projects
            </h2>
            <p className="text-zinc-400 text-xs sm:text-sm mt-2 max-w-lg font-editorial italic">
              Selected production systems, distributed infrastructure, and web applications.
            </p>
          </div>

          {/* Filter pills - horizontally scrollable on mobile */}
          <div className="flex items-center gap-1.5 p-1 rounded-lg bg-zinc-950 border border-zinc-800/80 text-xs font-mono overflow-x-auto no-scrollbar max-w-full">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
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

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -6, scale: 1.015 }}
              onMouseEnter={() => cardAudio.playHover()}
              transition={{ duration: 0.3 }}
              className="group rounded-xl bg-zinc-950/70 border border-zinc-800/80 hover:border-zinc-400/90 transition-all duration-300 p-5 sm:p-6 flex flex-col justify-between hover:shadow-[0_16px_36px_rgba(0,0,0,0.8)]"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-zinc-400 mb-2">
                  <span className="text-[11px] uppercase tracking-wider">{project.category}</span>
                  {project.metrics && (
                    <span className="text-zinc-300 font-semibold text-[11px] sm:text-xs">{project.metrics}</span>
                  )}
                </div>

                <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-zinc-200 transition-colors">
                  {project.title}
                </h3>

                <p className="text-xs sm:text-sm text-zinc-400 mt-2.5 leading-relaxed">
                  {project.description}
                </p>

                {/* Tech tags */}
                <div className="flex flex-wrap gap-1 sm:gap-1.5 mt-4 sm:mt-5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800/80 text-[10px] sm:text-[11px] font-mono text-zinc-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Footer Links */}
              <div className="pt-4 sm:pt-5 mt-4 sm:mt-5 border-t border-zinc-900 flex items-center justify-between text-xs font-mono">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-zinc-400 hover:text-white transition-colors py-1"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>Source Code</span>
                  </a>
                )}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-white hover:underline transition-colors ml-auto font-medium py-1"
                  >
                    <span>Live Preview</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
