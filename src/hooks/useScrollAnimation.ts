import { useEffect, useRef, useState } from 'react';

interface ScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

export function useScrollAnimation<T extends HTMLElement = HTMLDivElement>(
  options: ScrollAnimationOptions = {}
) {
  const { threshold = 0, rootMargin = '0px 0px 80px 0px', triggerOnce = true } = options;
  const ref = useRef<T>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // On mobile devices, enable visibility immediately to prevent scroll lag and empty screen issues
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      setIsVisible(true);
      return;
    }

    const element = ref.current;
    if (!element) {
      setIsVisible(true);
      return;
    }

    // Safety fallback: if observer takes longer than 350ms, ensure element is visible
    const timer = setTimeout(() => setIsVisible(true), 350);

    if (typeof IntersectionObserver === 'undefined') {
      setIsVisible(true);
      return () => clearTimeout(timer);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          clearTimeout(timer);
          if (triggerOnce) observer.unobserve(element);
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);
    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [threshold, rootMargin, triggerOnce]);

  return { ref, isVisible };
}

export function useStaggeredAnimation<T extends HTMLElement = HTMLDivElement>(
  itemCount: number,
  options: ScrollAnimationOptions = {}
) {
  const { threshold = 0, rootMargin = '0px 0px 80px 0px', triggerOnce = true } = options;
  const containerRef = useRef<T>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // On mobile devices, show instantly without staggered waiting
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      setIsVisible(true);
      return;
    }

    const element = containerRef.current;
    if (!element) {
      setIsVisible(true);
      return;
    }

    const timer = setTimeout(() => setIsVisible(true), 350);

    if (typeof IntersectionObserver === 'undefined') {
      setIsVisible(true);
      return () => clearTimeout(timer);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          clearTimeout(timer);
          if (triggerOnce) observer.unobserve(element);
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);
    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [threshold, rootMargin, triggerOnce, itemCount]);

  const getItemStyle = (index: number): React.CSSProperties => {
    // Instant display on mobile screens
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      return { opacity: 1, transform: 'none' };
    }

    return {
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateY(0)' : 'translateY(16px)',
      transition: `opacity 0.45s ease ${Math.min(index * 40, 300)}ms, transform 0.45s ease ${Math.min(index * 40, 300)}ms`,
    };
  };

  return { containerRef, isVisible, getItemStyle };
}
