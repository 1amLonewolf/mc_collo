import { useState, useEffect } from 'react';

/**
 * Custom hook to track scroll position
 * Returns the current Y scroll position and whether the user has scrolled past a threshold
 * 
 * @param threshold - Pixel value to consider as "scrolled" (default: 50)
 * @returns Object with scrollY and isScrolled boolean
 * 
 * @example
 * const { scrollY, isScrolled } = useScrollPosition(100);
 */
export function useScrollPosition(threshold = 50) {
  const [scrollY, setScrollY] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);
      setIsScrolled(currentScrollY > threshold);
    };

    // Set initial value
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [threshold]);

  return { scrollY, isScrolled };
}
