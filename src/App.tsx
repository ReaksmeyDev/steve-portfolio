import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Experience } from './components/Experience';
import { Services } from './components/Services';
import { Terminal } from './components/Terminal';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

const SectionBridge: React.FC = React.memo(() => (
  <div className="relative w-full max-w-5xl mx-auto px-4 sm:px-6 pointer-events-none" aria-hidden="true">
    <div className="h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent relative">
      <div className="absolute left-1/2 -translate-x-1/2 -top-[2px] w-1.5 h-1.5 rounded-full bg-cyan-400/50 shadow-[0_0_8px_rgba(34,211,238,0.4)]" />
    </div>
  </div>
));

const BackToTopButton: React.FC = React.memo(() => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const sentinel = document.getElementById('scroll-sentinel');
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(!entry.isIntersecting);
      },
      { threshold: 0 }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed bottom-6 right-6 z-40 p-2.5 rounded-xl bg-slate-900 border border-slate-700/80 text-slate-300 hover:text-cyan-300 hover:border-cyan-500/50 shadow-2xl transition-all duration-200 hover:-translate-y-1 focus-visible:ring-1 focus-visible:ring-cyan-400"
      aria-label="Back to top"
      title="Back to top"
    >
      <ArrowUp className="w-4 h-4" />
    </button>
  );
});

export const App: React.FC = () => {
  return (
    <div id="top" className="min-h-screen bg-[#05070e] text-slate-200 relative selection:bg-cyan-500/30 selection:text-cyan-300 noise-overlay">
      {/* Viewport Sentinels for Zero-JS-Scroll Observers */}
      <div id="nav-sentinel" className="absolute top-[16px] left-0 w-px h-px pointer-events-none opacity-0" aria-hidden="true" />
      <div id="scroll-sentinel" className="absolute top-[450px] left-0 w-px h-px pointer-events-none opacity-0" aria-hidden="true" />

      {/* Starfield Background (CSS-only, GPU-accelerated) */}
      <div className="starfield" aria-hidden="true">
        <div className="starfield-layer starfield-layer-1" />
        <div className="starfield-layer starfield-layer-2" />
        <div className="starfield-layer starfield-layer-3" />
      </div>

      {/* Ambient Gradient Orbs (Pure Cyan Vibe, GPU Isolated) */}
      <div className="ambient-orb w-[400px] h-[400px] bg-cyan-500/[0.045] top-[10%] left-[-5%] animate-blob z-0" aria-hidden="true" />
      <div className="ambient-orb w-[360px] h-[360px] bg-cyan-400/[0.035] top-[40%] right-[-5%] animate-blob-slow z-0" aria-hidden="true" />
      <div className="ambient-orb w-[320px] h-[320px] bg-cyan-600/[0.04] bottom-[15%] left-[15%] animate-blob-reverse z-0" aria-hidden="true" />

      {/* Main Content Flow */}
      <div className="relative z-10">
        <Navbar />
        <main>
          <Hero />
          <SectionBridge />

          <About />
          <SectionBridge />

          <Skills />
          <SectionBridge />

          <Projects />
          <SectionBridge />

          <Experience />
          <SectionBridge />

          <Services />
          <SectionBridge />

          <Terminal />
          <SectionBridge />

          <Contact />
        </main>
        <Footer />
        <BackToTopButton />
      </div>
    </div>
  );
};

export default App;