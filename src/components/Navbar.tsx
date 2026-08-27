import React, { useState, useEffect } from 'react';
import { Terminal as TerminalIcon, Menu, X } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Services', href: '#services' },
    { name: 'Terminal', href: '#terminal' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled
        ? 'bg-[#05070e]/70 backdrop-blur-xl py-2.5 sm:py-3 border-b border-cyan-500/10 shadow-lg shadow-black/20'
        : 'bg-transparent py-3 sm:py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2 sm:gap-2.5 group">
          <div className="relative p-1.5 sm:p-2 rounded-lg sm:rounded-xl bg-gradient-to-br from-cyan-950/60 to-slate-900/60 border border-cyan-500/20 group-hover:border-cyan-400/50 transition-all duration-300 group-hover:shadow-glow-cyan">
            <TerminalIcon className="w-4 sm:w-5 h-4 sm:h-5 text-cyan-400 group-hover:text-cyan-300 transition-colors" />
            <div className="absolute inset-0 rounded-lg sm:rounded-xl bg-cyan-400/5 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <span className="font-mono font-semibold text-base sm:text-lg tracking-wider text-slate-100">
            STEVE<span className="gradient-text-animated">.dev</span>
          </span>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-1">
          <div className="flex items-center gap-1 text-sm font-mono text-slate-400 bg-slate-900/40 rounded-full px-2 py-1 border border-slate-800/50">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="px-3 py-1.5 rounded-full hover:text-cyan-300 hover:bg-cyan-500/10 transition-all duration-300"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="ml-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-950/30 border border-emerald-500/20 text-emerald-400 text-xs font-mono">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
            </span>
            Available
          </div>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden p-2 text-slate-400 hover:text-white transition-colors"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-5 sm:w-6 h-5 sm:h-6" /> : <Menu className="w-5 sm:w-6 h-5 sm:h-6" />}
        </button>
      </div>

      {/* Mobile Drawer – Full Screen Overlay */}
      <div className={`lg:hidden fixed inset-0 top-[52px] sm:top-[60px] z-40 transition-all duration-400 ${
        mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}>
        <div className="absolute inset-0 bg-[#05070e]/95 backdrop-blur-xl" />
        <div className={`relative px-6 pt-6 pb-8 space-y-1 transition-transform duration-400 ${
          mobileOpen ? 'translate-y-0' : '-translate-y-4'
        }`}>
          {navLinks.map((link, index) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block text-lg font-mono text-slate-200 hover:text-cyan-400 px-4 py-3 rounded-xl hover:bg-cyan-500/5 transition-all"
              style={{
                opacity: mobileOpen ? 1 : 0,
                transform: mobileOpen ? 'translateX(0)' : 'translateX(-20px)',
                transition: `opacity 0.3s ease ${index * 50}ms, transform 0.3s ease ${index * 50}ms`,
              }}
            >
              {link.name}
            </a>
          ))}

          <div
            className="mt-6 mx-4 flex items-center gap-2 px-4 py-2.5 rounded-full bg-emerald-950/30 border border-emerald-500/20 text-emerald-400 text-sm font-mono w-fit"
            style={{
              opacity: mobileOpen ? 1 : 0,
              transition: `opacity 0.3s ease ${navLinks.length * 50}ms`,
            }}
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
            </span>
            Available for opportunities
          </div>
        </div>
      </div>
    </nav>
  );
};