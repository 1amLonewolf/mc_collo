import { useState, useEffect } from 'react';

/**
 * Custom hook to detect if a component is in the viewport
 * Uses IntersectionObserver for performance
 * 
 * @param threshold - How much of the element should be visible (0-1, default: 0.1)
 * @returns Ref callback and boolean indicating visibility
 * 
 * @example
 * const [ref, isVisible] = useInView(0.2);
 * return <div ref={ref}>{isVisible ? 'Visible!' : 'Not visible'}</div>;
 */
export function useInView(threshold = 0.1) {
  const [isVisible, setIsVisible] = useState(false);
  const [element, setElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [element, threshold]);

  return [setElement, isVisible] as const;
}
