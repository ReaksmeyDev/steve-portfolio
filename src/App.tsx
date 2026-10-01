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

interface SectionBridgeProps {
  label?: string;
}

const SectionBridge: React.FC<SectionBridgeProps> = React.memo(({ label }) => (
  <div className="relative w-full max-w-5xl mx-auto px-4 sm:px-6 pointer-events-none my-3 sm:my-5" aria-hidden="true">
    <div className="h-px bg-gradient-to-r from-transparent via-cyan-500/25 to-transparent relative flex items-center justify-center">
      {label ? (
        <div className="section-bridge-badge px-3 py-1 rounded-full text-[10px] font-mono tracking-widest uppercase text-slate-400 flex items-center gap-1.5 shadow-[0_0_12px_rgba(34,211,238,0.12)]">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          <span>{label}</span>
        </div>
      ) : (
        <div className="section-bridge-node w-2 h-2 rounded-[2px] bg-[#05070e] border border-cyan-400/60 shadow-[0_0_8px_rgba(34,211,238,0.4)] rotate-45" />
      )}
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
      className="fixed bottom-6 right-6 z-40 p-2.5 rounded-none bg-slate-900 border border-slate-700/80 text-slate-300 hover:text-cyan-300 hover:border-cyan-500/50 shadow-2xl transition-all duration-200 hover:-translate-y-1 focus-visible:ring-1 focus-visible:ring-cyan-400"
      aria-label="Back to top"
      title="Back to top"
    >
      <ArrowUp className="w-4 h-4" />
    </button>
  );
});

export const App: React.FC = () => {
  // Ambient cursor lighting following background vibe (Zero-Re-Render via CSS properties + RAF)
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      return;
    }

    let ticking = false;
    const handlePointerMove = (e: PointerEvent) => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          document.documentElement.style.setProperty('--cursor-x', `${e.clientX}px`);
          document.documentElement.style.setProperty('--cursor-y', `${e.clientY}px`);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    return () => window.removeEventListener('pointermove', handlePointerMove);
  }, []);

  return (
    <div id="top" className="min-h-screen bg-[#05070e] text-slate-200 relative selection:bg-cyan-500/30 selection:text-cyan-300 noise-overlay">
      {/* Viewport Sentinels for Zero-JS-Scroll Observers */}
      <div id="nav-sentinel" className="absolute top-[16px] left-0 w-px h-px pointer-events-none opacity-0" aria-hidden="true" />
      <div id="scroll-sentinel" className="absolute top-[450px] left-0 w-px h-px pointer-events-none opacity-0" aria-hidden="true" />

      {/* Top Ambient Spotlight Cone (Linear / Vercel Key Light) */}
      <div className="top-spotlight-cone" aria-hidden="true" />

      {/* Precision Geometric Grid Square Background System */}
      <div className="grid-square-background" aria-hidden="true" />
      <div className="grid-square-major" aria-hidden="true" />

      {/* Interactive Cursor Ambient Glow (Follows cursor across background vibe) */}
      <div className="cursor-ambient-spotlight" aria-hidden="true" />

      {/* Starfield Background (CSS-only, GPU-accelerated single layer) */}
      <div className="starfield" aria-hidden="true">
        <div className="starfield-layer starfield-layer-1" />
      </div>

      {/* Ambient Gradient Orbs (Zero-recomposite static radial lighting) */}
      <div className="ambient-orb w-[400px] h-[400px] bg-cyan-500/[0.04] top-[10%] left-[-5%] z-0" aria-hidden="true" />
      <div className="ambient-orb w-[360px] h-[360px] bg-cyan-400/[0.03] top-[40%] right-[-5%] z-0" aria-hidden="true" />
      <div className="ambient-orb w-[320px] h-[320px] bg-cyan-600/[0.035] bottom-[15%] left-[15%] z-0" aria-hidden="true" />

      {/* Main Content Flow */}
      <div className="relative z-10">
        <Navbar />
        <div className="cyber-horizon-beam" aria-hidden="true" />
        <main>
          <Hero />
          <SectionBridge label="01 // About" />

          <About />
          <SectionBridge label="02 // Skills" />

          <Skills />
          <SectionBridge label="03 // Projects" />

          <Projects />
          <SectionBridge label="04 // Experience" />

          <Experience />
          <SectionBridge label="05 // Services" />

          <Services />
          <SectionBridge label="06 // Terminal" />

          <Terminal />
          <SectionBridge label="07 // Contact" />

          <Contact />
        </main>
        <Footer />
        <BackToTopButton />
      </div>
    </div>
  );
};

export default App;