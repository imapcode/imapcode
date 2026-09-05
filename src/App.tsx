/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { CinemaOverlay } from './components/CinemaOverlay';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { InteractiveCardDeck } from './components/InteractiveCardDeck';
import { AboutSection } from './components/AboutSection';
import { ProjectsSection } from './components/ProjectsSection';
import { ResumeModal } from './components/ResumeModal';
import { HireMeModal } from './components/HireMeModal';
import { Footer } from './components/Footer';

export default function App() {
  const [resumeModalOpen, setResumeModalOpen] = useState(false);
  const [hireModalOpen, setHireModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-200 selection:bg-white selection:text-zinc-950 font-sans relative overflow-x-hidden">
      {/* Subtle 35mm Celluloid Film Grain & Vignette */}
      <CinemaOverlay />

      {/* Minimalist Top Navigation */}
      <Navbar
        onOpenResumeModal={() => setResumeModalOpen(true)}
        onOpenHireModal={() => setHireModalOpen(true)}
      />

      {/* Main Content */}
      <main id="main-content" className="relative z-10">
        {/* Hero Section */}
        <HeroSection
          onOpenResumeModal={() => setResumeModalOpen(true)}
          onOpenHireModal={() => setHireModalOpen(true)}
        />

        {/* The IMAPCODE 8-Card Deck with Scroll and Hover Physics */}
        <InteractiveCardDeck />

        {/* About Me & My Links */}
        <AboutSection
          onOpenResumeModal={() => setResumeModalOpen(true)}
          onOpenHireModal={() => setHireModalOpen(true)}
        />

        {/* Projects */}
        <ProjectsSection />
      </main>

      {/* Minimalist Footer */}
      <Footer
        onOpenResumeModal={() => setResumeModalOpen(true)}
        onOpenHireModal={() => setHireModalOpen(true)}
      />

      {/* Interactive Modals */}
      <ResumeModal
        isOpen={resumeModalOpen}
        onClose={() => setResumeModalOpen(false)}
      />

      <HireMeModal
        isOpen={hireModalOpen}
        onClose={() => setHireModalOpen(false)}
      />
    </div>
  );
}
