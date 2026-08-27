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

export const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#05070e] text-slate-200 relative selection:bg-cyan-500/30 selection:text-cyan-300 noise-overlay">
      {/* SVG Filters for Gooey / Liquid Effects */}
      <svg className="absolute w-0 h-0" aria-hidden="true">
        <defs>
          <filter id="gooey">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
              result="goo"
            />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>

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
          <Hero />
          <About />
          <Skills />
          <Experience />
          <Projects />
          <Services />
          <Terminal />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default App;