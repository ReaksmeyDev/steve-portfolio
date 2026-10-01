import React, { createContext, useContext, useState, useEffect } from 'react';
import { flushSync } from 'react-dom';

export type Theme = 'dark' | 'light';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: (event?: React.MouseEvent | MouseEvent) => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'dark',
  toggleTheme: () => {},
  setTheme: () => {},
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      if (localStorage.getItem('steve-theme')) {
        localStorage.removeItem('steve-theme');
      }
      const saved = localStorage.getItem('steve-portfolio-theme') as Theme | null;
      if (saved === 'dark' || saved === 'light') return saved;
      return 'dark';
    }
    return 'dark';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
    localStorage.setItem('steve-portfolio-theme', theme);

    const metaTheme = document.querySelector('meta[name="theme-color"]');
    if (metaTheme) {
      metaTheme.setAttribute('content', theme === 'dark' ? '#05070e' : '#f8fafc');
    }
  }, [theme]);

  // Smooth & Interesting Theme Switcher starting precisely from the switch button
  const toggleTheme = (event?: React.MouseEvent | MouseEvent) => {
    const nextTheme: Theme = theme === 'dark' ? 'light' : 'dark';

    // 1. Locate the exact center of the switch button
    let x = typeof window !== 'undefined' ? Math.round(window.innerWidth * 0.85) : 0;
    let y = 36;

    // Check event target or currentTarget (handles Element, SVGElement, HTMLButtonElement)
    let foundBtn: Element | null = null;
    const rawTarget = event?.currentTarget || event?.target;
    if (rawTarget && typeof (rawTarget as Element).closest === 'function') {
      foundBtn =
        (rawTarget as Element).closest('button') ||
        (rawTarget as Element).closest('[role="group"]') ||
        (rawTarget as Element);
    }

    // If not found via event target, check which button corresponds to the target mode
    if (!foundBtn && typeof document !== 'undefined') {
      const preferredId = nextTheme === 'light' ? 'theme-btn-light' : 'theme-btn-night';
      const mobilePreferredId = nextTheme === 'light' ? 'theme-btn-mobile-light' : 'theme-btn-mobile-night';
      const drawerPreferredId = nextTheme === 'light' ? 'theme-btn-drawer-light' : 'theme-btn-drawer-night';
      foundBtn =
        document.getElementById(preferredId) ||
        document.getElementById(mobilePreferredId) ||
        document.getElementById(drawerPreferredId) ||
        document.getElementById('theme-switcher-desktop') ||
        document.getElementById('theme-switcher-mobile') ||
        document.querySelector('[aria-label="Theme mode switcher"]');
    }

    if (foundBtn && typeof foundBtn.getBoundingClientRect === 'function') {
      const rect = foundBtn.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        x = Math.round(rect.left + rect.width / 2);
        y = Math.round(rect.top + rect.height / 2);
      }
    } else if (event && 'clientX' in event && typeof event.clientX === 'number' && event.clientX > 0) {
      x = Math.round(event.clientX);
      y = Math.round(event.clientY);
    }

    const root = document.documentElement;
    root.style.setProperty('--theme-origin-x', `${x}px`);
    root.style.setProperty('--theme-origin-y', `${y}px`);

    // 2. Trigger expanding cyber shockwave wave element originating exactly at the switch button
    if (typeof document !== 'undefined') {
      const ripple = document.createElement('div');
      ripple.className = 'theme-shockwave-ring';
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;
      document.body.appendChild(ripple);
      setTimeout(() => {
        ripple.remove();
      }, 700);
    }

    const isAppearanceTransition =
      typeof document !== 'undefined' &&
      // @ts-expect-error View Transitions API check
      Boolean(document.startViewTransition) &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Maximum distance from the switch button to any corner of viewport
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    if (!isAppearanceTransition) {
      // Fallback for browsers without View Transitions:
      // An expanding circular overlay mask blooms from (x, y)
      const overlay = document.createElement('div');
      overlay.className = 'theme-fallback-wipe';
      overlay.style.backgroundColor = nextTheme === 'dark' ? '#05070e' : '#f8fafc';
      overlay.style.clipPath = `circle(0px at ${x}px ${y}px)`;
      document.body.appendChild(overlay);

      requestAnimationFrame(() => {
        overlay.style.transition = 'clip-path 0.55s cubic-bezier(0.16, 1, 0.3, 1)';
        overlay.style.clipPath = `circle(${endRadius}px at ${x}px ${y}px)`;
      });

      root.classList.add('theme-transitioning');
      setTimeout(() => {
        setTheme(nextTheme);
        if (nextTheme === 'dark') {
          root.classList.add('dark');
          root.classList.remove('light');
        } else {
          root.classList.add('light');
          root.classList.remove('dark');
        }
      }, 150);

      setTimeout(() => {
        overlay.remove();
        root.classList.remove('theme-transitioning');
      }, 600);
      return;
    }

    root.classList.add('theme-transitioning');

    // @ts-expect-error View Transitions API call
    const transition = document.startViewTransition(() => {
      flushSync(() => {
        setTheme(nextTheme);
        if (nextTheme === 'dark') {
          root.classList.add('dark');
          root.classList.remove('light');
        } else {
          root.classList.add('light');
          root.classList.remove('dark');
        }
      });
    });

    transition.ready
      .then(() => {
        document.documentElement.animate(
          {
            clipPath: [
              `circle(0px at ${x}px ${y}px)`,
              `circle(${endRadius}px at ${x}px ${y}px)`,
            ],
          },
          {
            duration: 560,
            easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
            pseudoElement: '::view-transition-new(root)',
          }
        );
      })
      .finally(() => {
        transition.finished
          .catch(() => {})
          .finally(() => {
            root.classList.remove('theme-transitioning');
          });
      });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
