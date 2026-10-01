import React, { createContext, useContext, useState, useEffect } from 'react';

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
    let x = typeof window !== 'undefined' ? window.innerWidth - 70 : 0;
    let y = 36;

    if (event?.currentTarget instanceof HTMLElement) {
      const rect = event.currentTarget.getBoundingClientRect();
      x = Math.round(rect.left + rect.width / 2);
      y = Math.round(rect.top + rect.height / 2);
    } else if (event?.target instanceof HTMLElement) {
      const btn = event.target.closest('button') || event.target.closest('[role="group"]');
      if (btn) {
        const rect = btn.getBoundingClientRect();
        x = Math.round(rect.left + rect.width / 2);
        y = Math.round(rect.top + rect.height / 2);
      }
    } else if (typeof document !== 'undefined') {
      const switcher =
        document.getElementById('theme-btn-light') ||
        document.getElementById('theme-btn-night') ||
        document.getElementById('theme-switcher-desktop') ||
        document.getElementById('theme-switcher-mobile') ||
        document.querySelector('[aria-label="Theme mode switcher"]');
      if (switcher) {
        const rect = switcher.getBoundingClientRect();
        x = Math.round(rect.left + rect.width / 2);
        y = Math.round(rect.top + rect.height / 2);
      }
    }

    const root = document.documentElement;
    root.style.setProperty('--theme-origin-x', `${x}px`);
    root.style.setProperty('--theme-origin-y', `${y}px`);

    // 2. Trigger expanding cyber ripple wave element originating exactly at the switch button
    if (typeof document !== 'undefined') {
      const ripple = document.createElement('div');
      ripple.className = 'theme-ripple-wave';
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

    if (!isAppearanceTransition) {
      // Smooth component-level CSS interpolation fallback
      root.classList.add('theme-transitioning');
      setTheme(nextTheme);
      setTimeout(() => {
        root.classList.remove('theme-transitioning');
      }, 500);
      return;
    }

    // Maximum distance from the switch button to any corner of viewport
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    root.classList.add('theme-transitioning');

    // @ts-expect-error View Transitions API call
    const transition = document.startViewTransition(() => {
      setTheme(nextTheme);
    });

    transition.ready
      .then(() => {
        const clipPath = [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${endRadius}px at ${x}px ${y}px)`,
        ];

        document.documentElement.animate(
          {
            clipPath,
          },
          {
            duration: 540,
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
