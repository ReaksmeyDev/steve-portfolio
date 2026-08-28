import React, { useState, useEffect, useCallback } from 'react';
import { Terminal as TerminalIcon, Menu, X } from 'lucide-react';

const NAV_LINKS = [
  { name: 'About', href: '#about', id: 'about' },
  { name: 'Skills', href: '#skills', id: 'skills' },
  { name: 'Experience', href: '#experience', id: 'experience' },
  { name: 'Projects', href: '#projects', id: 'projects' },
  { name: 'Services', href: '#services', id: 'services' },
  { name: 'Terminal', href: '#terminal', id: 'terminal' },
  { name: 'Contact', href: '#contact', id: 'contact' },
];

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState<boolean>(() => {
    return typeof window !== 'undefined' && window.scrollY > 8;
  });
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>('');

  const updateScrollState = useCallback(() => {
    const currentScroll = window.scrollY;
    setScrolled(currentScroll > 8);

    const scrollPosition = currentScroll + 120;
    for (let i = NAV_LINKS.length - 1; i >= 0; i--) {
      const section = document.getElementById(NAV_LINKS[i].id);
      if (section && section.offsetTop <= scrollPosition) {
        setActiveSection(NAV_LINKS[i].id);
        return;
      }
    }
    setActiveSection('');
  }, []);

  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateScrollState();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    updateScrollState();

    return () => window.removeEventListener('scroll', onScroll);
  }, [updateScrollState]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 py-3 transition-all duration-300 ${
          mobileOpen
            ? 'bg-[#05070e] border-b border-slate-900'
            : scrolled
            ? 'bg-[#05070e]/95 backdrop-blur-xl border-b border-cyan-500/15 shadow-lg shadow-black/40'
            : 'bg-[#05070e]/75 backdrop-blur-md border-b border-slate-800/40'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <a
            href="#"
            onClick={() => setMobileOpen(false)}
            className="flex items-center gap-2.5 group"
          >
            <div className="p-1.5 rounded-lg bg-cyan-950/60 border border-cyan-500/20 group-hover:border-cyan-400/50 transition-colors">
              <TerminalIcon className="w-4 h-4 text-cyan-400" />
            </div>
            <span className="font-mono font-semibold text-base tracking-wider text-white">
              STEVE<span className="gradient-text-animated">.dev</span>
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6">
            <div className="flex items-center gap-1 text-xs font-mono text-slate-400 bg-slate-900/60 rounded-full p-1 border border-slate-800/80">
              {NAV_LINKS.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    className={`px-3 py-1.5 rounded-full transition-all duration-150 ${
                      isActive
                        ? 'text-cyan-300 bg-cyan-500/15 font-semibold shadow-[0_0_12px_rgba(34,211,238,0.25)]'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                    }`}
                  >
                    {link.name}
                  </a>
                );
              })}
            </div>

            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-950/30 border border-emerald-500/20 text-emerald-400 text-xs font-mono">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
              </span>
              <span>Available</span>
            </div>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 text-slate-400 hover:text-white transition-colors"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileOpen ? <X className="w-6 h-6 text-cyan-400" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Clean Minimal Liquid Mobile Menu */}
      <div
        className={`lg:hidden fixed inset-0 z-40 bg-[#05070e] transition-all duration-300 flex flex-col justify-between pt-24 pb-10 px-8 ${
          mobileOpen
            ? 'opacity-100 pointer-events-auto translate-y-0'
            : 'opacity-0 pointer-events-none -translate-y-3'
        }`}
      >
        {/* Soft Liquid Ambient Glow in Background */}
        <div className="absolute top-1/3 left-1/4 w-[260px] h-[260px] bg-cyan-500/10 rounded-full blur-[80px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[240px] h-[240px] bg-violet-500/8 rounded-full blur-[80px] pointer-events-none" />

        {/* Clean Typography Navigation Link List (Card-free, pure text) */}
        <div className="relative z-10 flex flex-col space-y-6 my-auto">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.name}
                onClick={() => handleNavClick(link.href)}
                className={`text-left font-sans text-2xl font-semibold tracking-tight transition-all duration-200 flex items-center justify-between group ${
                  isActive
                    ? 'text-cyan-300'
                    : 'text-slate-400 hover:text-slate-100 hover:translate-x-1.5'
                }`}
              >
                <span>{link.name}</span>
                {isActive && (
                  <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.9)]" />
                )}
              </button>
            );
          })}
        </div>

        {/* Clean Minimal Bottom Bar */}
        <div className="relative z-10 pt-6 border-t border-slate-900/80 flex items-center justify-between text-xs font-mono text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-emerald-400">Available for projects</span>
          </div>

          <a
            href="#contact"
            onClick={() => setMobileOpen(false)}
            className="text-cyan-400 hover:underline"
          >
            Say hello &rarr;
          </a>
        </div>
      </div>
    </>
  );
};