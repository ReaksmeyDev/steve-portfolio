import React, { useState, useEffect, useRef } from 'react';
import { Terminal as TerminalIcon, Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const NAV_LINKS = [
  { name: 'About', href: '#about', id: 'about' },
  { name: 'Skills', href: '#skills', id: 'skills' },
  { name: 'Projects', href: '#projects', id: 'projects' },
  { name: 'Experience', href: '#experience', id: 'experience' },
  { name: 'Services', href: '#services', id: 'services' },
  { name: 'Terminal', href: '#terminal', id: 'terminal' },
  { name: 'Contact', href: '#contact', id: 'contact' },
];

export const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState<boolean>(() => {
    return typeof window !== 'undefined' && window.scrollY > 12;
  });
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>('');
  const progressRef = useRef<HTMLDivElement>(null);

  // 1. Observe top sentinel for navbar background change (Zero JS scroll listener)
  useEffect(() => {
    const sentinel = document.getElementById('nav-sentinel');
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setScrolled(!entry.isIntersecting);
      },
      { threshold: 0 }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  // 2. Hardware-accelerated scroll progress fallback (for browsers without CSS animation-timeline)
  useEffect(() => {
    const supportsScrollTimeline =
      typeof CSS !== 'undefined' && CSS.supports && CSS.supports('animation-timeline', 'scroll()');
    if (supportsScrollTimeline) return;

    let ticking = false;
    const handleScrollProgress = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const docHeight = document.documentElement.scrollHeight - window.innerHeight;
          const progress = docHeight > 0 ? Math.min(Math.max(window.scrollY / docHeight, 0), 1) : 0;
          if (progressRef.current) {
            progressRef.current.style.transform = `scaleX(${progress})`;
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScrollProgress, { passive: true });
    handleScrollProgress();
    return () => window.removeEventListener('scroll', handleScrollProgress);
  }, []);

  // 3. High-performance IntersectionObserver for active section highlighting (Batched via RAF)
  useEffect(() => {
    let ticking = false;
    let pendingTarget: string | null = null;

    const observerCallback: IntersectionObserverCallback = (entries) => {
      // Find the entry with the highest intersection ratio
      let bestEntry: IntersectionObserverEntry | null = null;
      for (const entry of entries) {
        if (entry.isIntersecting && (!bestEntry || entry.intersectionRatio > bestEntry.intersectionRatio)) {
          bestEntry = entry;
        }
      }

      if (bestEntry) {
        const targetId = bestEntry.target.id === 'hero' ? '' : bestEntry.target.id;
        if (targetId !== pendingTarget) {
          pendingTarget = targetId;
          if (!ticking) {
            window.requestAnimationFrame(() => {
              if (pendingTarget !== null) {
                setActiveSection((prev) => (prev !== pendingTarget ? pendingTarget : prev));
              }
              ticking = false;
            });
            ticking = true;
          }
        }
      }
    };

    const observer = new IntersectionObserver(observerCallback, {
      root: null,
      rootMargin: '-20% 0px -40% 0px',
      threshold: 0.15,
    });

    ['hero', ...NAV_LINKS.map((l) => l.id)].forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    // Detect footer to reliably highlight Contact at the end of the page
    const footer = document.querySelector('footer');
    let footerObserver: IntersectionObserver | null = null;
    if (footer) {
      footerObserver = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection('contact');
          }
        },
        { threshold: 0.1 }
      );
      footerObserver.observe(footer);
    }

    return () => {
      observer.disconnect();
      if (footerObserver) footerObserver.disconnect();
    };
  }, []);

  // 3. Accessibility: close on Escape key and lock body scroll
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileOpen) {
        setMobileOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [mobileOpen]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileOpen(false);
    if (href === '#') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setActiveSection('');
      return;
    }
    const targetId = href.replace('#', '');
    setActiveSection(targetId);
    const target = document.getElementById(targetId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Zero-re-render Scroll Progress Bar */}
      <div ref={progressRef} className="scroll-progress-line" aria-hidden="true" />

      <header
        className={`fixed top-0 left-0 right-0 z-50 py-3.5 transition-all duration-300 ${
          mobileOpen
            ? 'bg-[#05070e] border-b border-slate-900'
            : scrolled
            ? 'bg-[#05070e]/90 backdrop-blur-xl border-b border-slate-800/80 shadow-lg shadow-black/40'
            : 'bg-[#05070e]/70 backdrop-blur-md border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <a
            href="#"
            onClick={(e) => handleNavClick(e, '#')}
            className="flex items-center gap-2.5 group focus-visible:ring-1 focus-visible:ring-cyan-400 rounded-lg p-1"
            aria-label="Steve - Back to top"
          >
            <div className="p-1.5 rounded-lg bg-cyan-950/60 border border-cyan-500/25 group-hover:border-cyan-400/60 transition-colors">
              <TerminalIcon className="w-4 h-4 text-cyan-400" />
            </div>
            <span className="font-mono font-semibold text-base tracking-wider text-white">
              STEVE<span className="text-cyan-400 font-bold">.dev</span>
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            <div className="flex items-center gap-5 text-xs font-mono">
              {NAV_LINKS.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={`relative py-1 transition-colors duration-150 rounded ${
                      isActive
                        ? 'text-cyan-300 font-medium'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {link.name}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-cyan-400 rounded-full" />
                    )}
                  </a>
                );
              })}
            </div>

            <div className="h-4 w-px bg-slate-800" aria-hidden="true" />

            {/* Architectural Cybernetic Theme Switcher */}
            <div
              id="theme-switcher-desktop"
              className="relative inline-flex items-center p-1 rounded-none bg-slate-900/90 border border-slate-800 hover:border-cyan-500/50 transition-all duration-200 shadow-inner"
              role="group"
              aria-label="Theme mode switcher"
            >
              {/* Sliding Active Pill Background */}
              <div
                className={`absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-none transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] shadow-sm pointer-events-none ${
                  theme === 'dark'
                    ? 'left-[calc(50%+2px)] bg-cyan-950 border border-cyan-400/60 shadow-[0_0_12px_rgba(34,211,238,0.35)]'
                    : 'left-1 bg-white border border-slate-300 shadow-[0_1px_4px_rgba(0,0,0,0.1)]'
                }`}
              />

              {/* Light Option Button */}
              <button
                id="theme-btn-light"
                type="button"
                onClick={(e) => theme !== 'light' && toggleTheme(e)}
                className={`relative z-10 flex items-center gap-1.5 px-3 py-1 rounded-none text-xs font-mono transition-colors duration-200 focus-visible:outline-none ${
                  theme === 'light'
                    ? 'text-cyan-950 font-bold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                aria-pressed={theme === 'light'}
                title="Switch to Light mode"
              >
                <Sun className={`w-3.5 h-3.5 transition-transform duration-500 ${theme === 'light' ? 'rotate-90 text-amber-500 scale-110' : 'text-slate-500'}`} />
                <span className="text-[11px] uppercase tracking-wider font-semibold">Light</span>
              </button>

              {/* Night Option Button */}
              <button
                id="theme-btn-night"
                type="button"
                onClick={(e) => theme !== 'dark' && toggleTheme(e)}
                className={`relative z-10 flex items-center gap-1.5 px-3 py-1 rounded-none text-xs font-mono transition-colors duration-200 focus-visible:outline-none ${
                  theme === 'dark'
                    ? 'text-cyan-300 font-bold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                aria-pressed={theme === 'dark'}
                title="Switch to Night mode"
              >
                <Moon className={`w-3.5 h-3.5 transition-transform duration-500 ${theme === 'dark' ? '-rotate-12 text-cyan-400 scale-110' : 'text-slate-500'}`} />
                <span className="text-[11px] uppercase tracking-wider font-semibold">Night</span>
              </button>
            </div>
          </nav>

          {/* Mobile Right Controls: Modern Architectural Theme Toggle + Menu Button */}
          <div className="lg:hidden flex items-center gap-2">
            <div
              id="theme-switcher-mobile"
              className="relative flex items-center p-0.5 rounded-none bg-slate-900 border border-slate-800 hover:border-cyan-500/50 transition-colors shadow-inner"
              role="group"
              aria-label="Theme mode switcher"
            >
              <div
                className={`absolute top-0.5 bottom-0.5 w-[calc(50%-2px)] rounded-none transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-none ${
                  theme === 'dark'
                    ? 'left-[calc(50%+1px)] bg-cyan-950 border border-cyan-400/60 shadow-[0_0_10px_rgba(34,211,238,0.3)]'
                    : 'left-0.5 bg-white border border-slate-300 shadow-sm'
                }`}
              />

              <button
                id="theme-btn-mobile-light"
                type="button"
                onClick={(e) => theme !== 'light' && toggleTheme(e)}
                className={`relative z-10 p-1.5 rounded-none transition-colors ${
                  theme === 'light' ? 'text-amber-500 font-bold' : 'text-slate-400 hover:text-slate-200'
                }`}
                aria-label="Switch to Light mode"
                title="Switch to Light mode"
              >
                <Sun className={`w-3.5 h-3.5 transition-transform duration-500 ${theme === 'light' ? 'rotate-90 scale-110' : ''}`} />
              </button>

              <button
                id="theme-btn-mobile-night"
                type="button"
                onClick={(e) => theme !== 'dark' && toggleTheme(e)}
                className={`relative z-10 p-1.5 rounded-none transition-colors ${
                  theme === 'dark' ? 'text-cyan-400 font-bold' : 'text-slate-400 hover:text-slate-200'
                }`}
                aria-label="Switch to Night mode"
                title="Switch to Night mode"
              >
                <Moon className={`w-3.5 h-3.5 transition-transform duration-500 ${theme === 'dark' ? '-rotate-12 scale-110' : ''}`} />
              </button>
            </div>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 rounded-none text-slate-400 hover:text-white hover:bg-slate-900 transition-colors focus-visible:ring-1 focus-visible:ring-cyan-400"
              aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileOpen}
              aria-controls="mobile-navigation"
            >
              {mobileOpen ? <X className="w-6 h-6 text-cyan-400" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Editorial Mobile Navigation Drawer */}
      <div
        id="mobile-navigation"
        className={`lg:hidden fixed inset-0 z-40 bg-[#05070e] transition-all duration-300 flex flex-col justify-between pt-24 pb-8 px-6 ${
          mobileOpen
            ? 'opacity-100 pointer-events-auto translate-y-0'
            : 'opacity-0 pointer-events-none -translate-y-4'
        }`}
      >
        {/* Subtle Ambient Backing */}
        <div className="absolute top-1/4 right-1/4 w-[240px] h-[240px] bg-cyan-500/5 rounded-none blur-[80px] pointer-events-none" />

        <nav className="relative z-10 flex flex-col space-y-4 my-auto">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`text-left font-sans text-2xl font-bold tracking-tight transition-all duration-200 flex items-center justify-between py-2 group ${
                  isActive
                    ? 'text-cyan-300 pl-2 border-l-2 border-cyan-400'
                    : 'text-slate-400 hover:text-slate-100 hover:translate-x-1.5'
                }`}
              >
                <span>{link.name}</span>
                {isActive && (
                  <span className="w-2 h-2 rounded-none bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
                )}
              </a>
            );
          })}
        </nav>

        {/* Mobile Drawer Bottom Info */}
        <div className="relative z-10 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between text-xs font-mono text-slate-400">
          <div className="flex items-center gap-2">
            <span className="text-slate-400 text-xs">Vibe:</span>
            <div
              id="theme-switcher-drawer"
              className="relative inline-flex items-center p-0.5 rounded-none bg-slate-900 border border-slate-800"
              role="group"
            >
              <div
                className={`absolute top-0.5 bottom-0.5 w-[calc(50%-2px)] rounded-none transition-all duration-300 ease-out pointer-events-none ${
                  theme === 'dark'
                    ? 'left-[calc(50%+1px)] bg-cyan-950 border border-cyan-500/40'
                    : 'left-0.5 bg-white border border-slate-200'
                }`}
              />
              <button
                id="theme-btn-drawer-light"
                type="button"
                onClick={(e) => theme !== 'light' && toggleTheme(e)}
                className={`relative z-10 px-2.5 py-1 rounded-none text-xs transition-colors flex items-center gap-1 ${
                  theme === 'light' ? 'text-cyan-800 font-semibold' : 'text-slate-400'
                }`}
              >
                <Sun className="w-3 h-3 text-cyan-600" />
                <span>Light</span>
              </button>
              <button
                id="theme-btn-drawer-night"
                type="button"
                onClick={(e) => theme !== 'dark' && toggleTheme(e)}
                className={`relative z-10 px-2.5 py-1 rounded-none text-xs transition-colors flex items-center gap-1 ${
                  theme === 'dark' ? 'text-cyan-300 font-semibold' : 'text-slate-400'
                }`}
              >
                <Moon className="w-3 h-3 text-cyan-400" />
                <span>Night</span>
              </button>
            </div>
          </div>

          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, '#contact')}
            className="text-cyan-400 hover:underline flex items-center gap-1 font-semibold"
          >
            <span>Start a conversation</span>
            <span>&rarr;</span>
          </a>
        </div>
      </div>
    </>
  );
};