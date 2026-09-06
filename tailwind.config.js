/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        cyber: {
          bg: '#05070e',
          card: 'rgba(11, 17, 33, 0.75)',
          border: 'rgba(34, 211, 238, 0.15)',
          cyan: '#06b6d4',
          emerald: '#10b981',
          textMuted: '#94a3b8'
        },
        liquid: {
          cyan: '#22d3ee',
          purple: '#a78bfa',
          pink: '#f472b6',
          blue: '#3b82f6',
          teal: '#2dd4bf',
        }
      },
      fontFamily: {
        mono: ['Fira Code', 'JetBrains Mono', 'monospace'],
        sans: ['Inter', 'system-ui', 'sans-serif']
      },
      animation: {
        'blob': 'blob 7s infinite',
        'blob-slow': 'blob 12s infinite',
        'blob-reverse': 'blob-reverse 9s infinite',
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 10s ease-in-out infinite',
        'float-delayed': 'float 8s ease-in-out 2s infinite',
        'liquid-flow': 'liquid-flow 8s ease infinite',
        'gradient-shift': 'gradient-shift 6s ease infinite',
        'gradient-shift-slow': 'gradient-shift 12s ease infinite',
        'morph': 'morph 8s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'pulse-glow-slow': 'pulse-glow 4s ease-in-out infinite',
        'spin-slow': 'spin 15s linear infinite',
        'spin-slower': 'spin 25s linear infinite',
        'border-flow': 'border-flow 4s linear infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'wave': 'wave 10s ease-in-out infinite',
        'ripple': 'ripple 1s ease-out',
      },
      keyframes: {
        blob: {
          '0%': { transform: 'translate3d(0, 0, 0) scale(1) rotate(0deg)' },
          '33%': { transform: 'translate3d(15px, -20px, 0) scale(1.05) rotate(120deg)' },
          '66%': { transform: 'translate3d(-10px, 15px, 0) scale(0.97) rotate(240deg)' },
          '100%': { transform: 'translate3d(0, 0, 0) scale(1) rotate(360deg)' },
        },
        'blob-reverse': {
          '0%': { transform: 'translate3d(0, 0, 0) scale(1) rotate(0deg)' },
          '33%': { transform: 'translate3d(-15px, 20px, 0) scale(0.98) rotate(-120deg)' },
          '66%': { transform: 'translate3d(12px, -12px, 0) scale(1.04) rotate(-240deg)' },
          '100%': { transform: 'translate3d(0, 0, 0) scale(1) rotate(-360deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translate3d(0, 0px, 0)' },
          '50%': { transform: 'translate3d(0, -20px, 0)' },
        },
        'liquid-flow': {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        'gradient-shift': {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        morph: {
          '0%': { borderRadius: '40% 60% 60% 40% / 60% 30% 70% 40%' },
          '25%': { borderRadius: '50% 50% 40% 60% / 40% 60% 40% 60%' },
          '50%': { borderRadius: '60% 40% 50% 50% / 50% 50% 60% 40%' },
          '75%': { borderRadius: '40% 60% 60% 40% / 60% 40% 40% 60%' },
          '100%': { borderRadius: '40% 60% 60% 40% / 60% 30% 70% 40%' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.05)' },
        },
        'border-flow': {
          '0%': { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '300% 50%' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        wave: {
          '0%, 100%': { transform: 'translateX(0)' },
          '50%': { transform: 'translateX(-25px)' },
        },
        ripple: {
          '0%': { transform: 'scale(0)', opacity: '0.6' },
          '100%': { transform: 'scale(4)', opacity: '0' },
        },
      },
      boxShadow: {
        'glow-cyan': '0 0 20px rgba(34, 211, 238, 0.3), 0 0 60px rgba(34, 211, 238, 0.1)',
        'glow-cyan-lg': '0 0 40px rgba(34, 211, 238, 0.4), 0 0 80px rgba(34, 211, 238, 0.15)',
        'glow-purple': '0 0 20px rgba(167, 139, 250, 0.3), 0 0 60px rgba(167, 139, 250, 0.1)',
        'glow-emerald': '0 0 20px rgba(16, 185, 129, 0.3), 0 0 60px rgba(16, 185, 129, 0.1)',
        'liquid': '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 0 0 1px rgba(255, 255, 255, 0.05)',
        'liquid-hover': '0 16px 48px rgba(0, 0, 0, 0.5), inset 0 0 0 1px rgba(255, 255, 255, 0.08)',
      },
    },
  },
  plugins: [],
}