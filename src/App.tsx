import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Experience } from './components/Experience';
import { Projects } from './components/Projects';
import { Services } from './components/Services';
import { Terminal } from './components/Terminal';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { ScrollReveal } from './components/ScrollReveal';

const SectionBridge: React.FC = () => (
  <div className="relative w-full max-w-5xl mx-auto px-4 sm:px-6 my-[-1px] pointer-events-none" aria-hidden="true">
    <div className="h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent relative">
      <div className="absolute left-1/2 -translate-x-1/2 -top-[3px] w-1.5 h-1.5 rounded-full bg-cyan-400/40 shadow-[0_0_8px_rgba(34,211,238,0.4)]" />
    </div>
  </div>
);

export const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#05070e] text-slate-200 relative selection:bg-cyan-500/30 selection:text-cyan-300 noise-overlay">
      {/* Starfield Background (CSS-only, GPU-accelerated) */}
      <div className="starfield">
        <div className="starfield-layer starfield-layer-1" />
        <div className="starfield-layer starfield-layer-2" />
        <div className="starfield-layer starfield-layer-3" />
      </div>

      {/* Ambient Gradient Orbs */}
      <div className="ambient-orb w-[400px] h-[400px] bg-cyan-500/[0.04] top-[10%] left-[-5%] animate-blob z-0" />
      <div className="ambient-orb w-[350px] h-[350px] bg-violet-500/[0.03] top-[40%] right-[-5%] animate-blob-slow z-0" />
      <div className="ambient-orb w-[300px] h-[300px] bg-emerald-500/[0.03] bottom-[15%] left-[15%] animate-blob-reverse z-0" />

      {/* Content */}
      <div className="relative z-10">
        <Navbar />
        <main>
          <ScrollReveal initiallyVisible={true}>
            <Hero />
          </ScrollReveal>
          <SectionBridge />

          <ScrollReveal delay={30}>
            <About />
          </ScrollReveal>
          <SectionBridge />

          <ScrollReveal delay={30}>
            <Skills />
          </ScrollReveal>
          <SectionBridge />

          <ScrollReveal delay={30}>
            <Experience />
          </ScrollReveal>
          <SectionBridge />

          <ScrollReveal delay={30}>
            <Projects />
          </ScrollReveal>
          <SectionBridge />

          <ScrollReveal delay={30}>
            <Services />
          </ScrollReveal>
          <SectionBridge />

          <ScrollReveal delay={30}>
            <Terminal />
          </ScrollReveal>
          <SectionBridge />

          <ScrollReveal delay={30}>
            <Contact />
          </ScrollReveal>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default App;