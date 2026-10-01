import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';
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

  const isTransitioningRef = useRef<boolean>(false);

  // Helper to synchronously synchronize DOM classes and meta tags
  const applyThemeToDom = useCallback((targetTheme: Theme) => {
    const root = document.documentElement;
    if (targetTheme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
    localStorage.setItem('steve-portfolio-theme', targetTheme);

    const metaTheme = document.querySelector('meta[name="theme-color"]');
    if (metaTheme) {
      metaTheme.setAttribute('content', targetTheme === 'dark' ? '#05070e' : '#f8fafc');
    }
  }, []);

  // Ensure DOM is synchronized on initial mount or direct setTheme call
  useEffect(() => {
    applyThemeToDom(theme);
  }, [theme, applyThemeToDom]);

  // Smooth & High-Performance Theme Switcher starting precisely from the switch button
  const toggleTheme = useCallback((event?: React.MouseEvent | MouseEvent) => {
    // Prevent overlapping transitions if already active
    if (isTransitioningRef.current) return;

    const nextTheme: Theme = theme === 'dark' ? 'light' : 'dark';

    // Immediate change if reduced motion is requested
    if (
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      setTheme(nextTheme);
      applyThemeToDom(nextTheme);
      return;
    }

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

    // Clamp coordinates safely within viewport
    if (typeof window !== 'undefined') {
      x = Math.max(0, Math.min(x, window.innerWidth));
      y = Math.max(0, Math.min(y, window.innerHeight));
    }

    // Maximum distance from the switch button to any corner of viewport
    const endRadius = Math.ceil(
      Math.hypot(
        Math.max(x, (typeof window !== 'undefined' ? window.innerWidth : 1200) - x),
        Math.max(y, (typeof window !== 'undefined' ? window.innerHeight : 800) - y)
      )
    );

    const root = document.documentElement;
    root.style.setProperty('--theme-origin-x', `${x}px`);
    root.style.setProperty('--theme-origin-y', `${y}px`);
    root.style.setProperty('--theme-end-radius', `${endRadius}px`);

    const spawnShockwave = () => {
      if (typeof document === 'undefined') return;
      const ripple = document.createElement('div');
      ripple.className = 'theme-shockwave-ring';
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;
      document.body.appendChild(ripple);
      setTimeout(() => {
        ripple.remove();
      }, 420);
    };

    const isAppearanceTransition =
      typeof document !== 'undefined' &&
      // @ts-expect-error View Transitions API check
      Boolean(document.startViewTransition);

    if (!isAppearanceTransition) {
      // Fallback for browsers without native View Transitions:
      isTransitioningRef.current = true;
      root.classList.add('theme-transitioning');

      const overlay = document.createElement('div');
      overlay.className = 'theme-fallback-wipe';
      overlay.style.backgroundColor = nextTheme === 'dark' ? '#05070e' : '#f8fafc';
      overlay.style.clipPath = `circle(0px at ${x}px ${y}px)`;
      document.body.appendChild(overlay);

      spawnShockwave();

      requestAnimationFrame(() => {
        overlay.style.transition = 'clip-path 0.38s cubic-bezier(0.16, 1, 0.3, 1)';
        overlay.style.clipPath = `circle(${endRadius}px at ${x}px ${y}px)`;
      });

      setTimeout(() => {
        setTheme(nextTheme);
        applyThemeToDom(nextTheme);
      }, 160);

      setTimeout(() => {
        overlay.remove();
        root.classList.remove('theme-transitioning');
        isTransitioningRef.current = false;
      }, 400);
      return;
    }

    // Modern View Transitions API flow
    isTransitioningRef.current = true;
    root.classList.add('theme-transitioning');

    // @ts-expect-error View Transitions API call
    const transition = document.startViewTransition(() => {
      flushSync(() => {
        setTheme(nextTheme);
        applyThemeToDom(nextTheme);
      });
    });

    transition.ready
      .then(() => {
        // Spawn subtle GPU cyber shockwave ripple now that snapshots are captured
        spawnShockwave();

        try {
          const anim = document.documentElement.animate(
            {
              clipPath: [
                `circle(0px at ${x}px ${y}px)`,
                `circle(${endRadius}px at ${x}px ${y}px)`,
              ],
            },
            {
              duration: 380,
              easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
              pseudoElement: '::view-transition-new(root)',
            }
          );
          return anim.finished;
        } catch {
          // If pseudoElement animate is not supported, CSS keyframes handle the circular expansion
        }
      })
      .catch(() => {
        // Gracefully handle any transition interruption
      })
      .finally(() => {
        transition.finished
          .catch(() => {})
          .finally(() => {
            root.classList.remove('theme-transitioning');
            isTransitioningRef.current = false;
          });
      });
  }, [theme, applyThemeToDom]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
