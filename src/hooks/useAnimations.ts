import { useEffect, useRef, useState } from 'react';

/**
 * Hook that uses Intersection Observer to trigger animations when elements enter the viewport.
 */
export function useInView(options?: IntersectionObserverInit) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(element);
        }
      },
      { threshold: 0.15, ...options }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [options]);

  return { ref, isVisible };
}

/**
 * Hook for animated counter (0 → target value).
 */
export function useCounter(target: number, duration: number = 1500, startOnView: boolean = true) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(!startOnView);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!startOnView) return;

    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.unobserve(element);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [startOnView]);

  useEffect(() => {
    if (!started) return;

    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));

      if (progress >= 1) {
        clearInterval(interval);
        setCount(target);
      }
    }, 16);

    return () => clearInterval(interval);
  }, [started, target, duration]);

  return { count, ref };
}

/**
 * Hook to track the active section for navigation highlighting.
 */
export function useActiveSection(sectionIds: string[]) {
  const [activeSection, setActiveSection] = useState(sectionIds[0] || '');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Find elements intersecting our top-of-screen threshold band
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          // If multiple are visible in the band, pick the one closest to the top
          const best = visible.reduce((a, b) =>
            a.boundingClientRect.top < b.boundingClientRect.top ? b : a
          );
          setActiveSection(best.target.id);
        }
      },
      // Creates a narrow detection band: starts 80px from top (below header) and ends at 30% of screen height
      { threshold: 0, rootMargin: '-80px 0px -70% 0px' }
    );

    const observeElements = () => {
      sectionIds.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.observe(el);
      });
    };

    // Initial observation
    observeElements();

    // Setup MutationObserver to watch for dynamically added sections
    const mutationObserver = new MutationObserver(() => {
      observeElements();
    });

    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, [sectionIds]);

  return activeSection;
}
