import React from 'react';
import { Github, Linkedin, Send, Facebook } from 'lucide-react';

const socialLinks = [
  { icon: Github, href: 'https://github.com', label: 'GitHub' },
  { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
  { icon: Send, href: 'https://t.me', label: 'Telegram' },
  { icon: Facebook, href: 'https://facebook.com', label: 'Facebook' },
];

export const Footer: React.FC = () => {
  return (
    <footer className="relative border-t border-slate-800/40 bg-[#03050a]/80 backdrop-blur-sm">
      {/* Wave Divider */}
      <div className="absolute -top-[1px] left-0 right-0 overflow-hidden leading-none">
        <svg viewBox="0 0 1440 40" preserveAspectRatio="none" className="w-full h-6 sm:h-8 fill-[#05070e]">
          <path d="M0 20C360 35 720 5 1080 20C1260 28 1380 12 1440 20V0H0V20Z" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 flex flex-col items-center gap-6 sm:gap-8 sm:flex-row sm:justify-between">
        {/* Brand */}
        <div className="text-center sm:text-left">
          <span className="font-mono font-bold text-white tracking-wider text-base">
            STEVE<span className="gradient-text-animated">.dev</span>
          </span>
          <p className="text-[10px] sm:text-xs text-slate-500 font-mono mt-1">Full-Stack Developer</p>
        </div>

        {/* Social Icons */}
        <div className="flex items-center gap-2 sm:gap-3">
          {socialLinks.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              className="p-2 sm:p-2.5 rounded-lg sm:rounded-xl text-slate-400 bg-slate-900/50 border border-slate-800/50 hover:text-cyan-400 hover:border-cyan-500/30 hover:shadow-glow-cyan transition-all duration-300"
              aria-label={label}
            >
              <Icon className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
            </a>
          ))}
        </div>

        {/* Copyright */}
        <div className="text-[10px] sm:text-xs font-mono text-slate-600">
          © 2026 STEVE. All rights reserved.
        </div>
      </div>

      {/* Bottom gradient line */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
    </footer>
  );
};