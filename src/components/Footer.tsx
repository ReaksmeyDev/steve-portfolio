import React from 'react';
import { Github, Linkedin, Send, Facebook, ArrowUp } from 'lucide-react';

const socialLinks = [
  { icon: Github, label: 'GitHub', href: 'https://github.com' },
  { icon: Linkedin, label: 'LinkedIn', href: 'https://linkedin.com' },
  { icon: Send, label: 'Telegram', href: 'https://t.me/stevejkj' },
  { icon: Facebook, label: 'Facebook', href: 'https://facebook.com' },
];

export const Footer: React.FC = React.memo(() => {
  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-slate-800/60 bg-[#03050a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 flex flex-col items-center gap-6 sm:gap-8 sm:flex-row sm:justify-between">
        {/* Brand */}
        <div className="text-center sm:text-left">
          <a
            href="#"
            onClick={scrollToTop}
            className="font-mono font-bold text-white tracking-wider text-base inline-block hover:opacity-90 transition-opacity"
          >
            STEVE<span className="text-cyan-400 font-bold">.dev</span>
          </a>
          <p className="text-[11px] sm:text-xs text-slate-500 font-mono mt-0.5">
            Full-Stack & Mobile Developer &bull;
          </p>
        </div>

        {/* Social Icons & Back to Top */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {socialLinks.map(({ icon: Icon, label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              className="p-2 sm:p-2.5 rounded-xl text-slate-400 bg-slate-900 border border-slate-800 hover:text-cyan-400 hover:border-cyan-500/40 hover:-translate-y-0.5 transition-all duration-200"
              aria-label={label}
            >
              <Icon className="w-4 h-4" />
            </a>
          ))}

          <button
            type="button"
            onClick={scrollToTop}
            className="p-2 sm:p-2.5 rounded-xl text-slate-400 bg-slate-900 border border-slate-800 hover:text-cyan-400 hover:border-cyan-500/40 hover:-translate-y-0.5 transition-all duration-200 ml-1"
            title="Back to top"
            aria-label="Scroll back to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

        {/* Copyright */}
        <div className="text-[11px] sm:text-xs font-mono text-slate-500">
          &copy; {new Date().getFullYear()} Steve. Crafted with care &amp; performance.
        </div>
      </div>

      {/* Bottom gradient accent line */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-cyan-500/25 to-transparent" />
    </footer>
  );
});