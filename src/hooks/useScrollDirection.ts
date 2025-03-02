// useScrollDirection.js - Custom hook to detect scroll direction
import { useState, useEffect } from 'react';

export const useScrollDirection = () => {
  const [isScrolling, setIsScrolling] = useState(false);
  const [scrollDirection, setScrollDirection] = useState('up');
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const [buttonVisible, setButtonVisible] = useState(true);

  useEffect(() => {
    let scrollTimeout: number | undefined;

    const handleScroll = () => {
      const currentScrollTop =
        window.pageYOffset || document.documentElement.scrollTop;

      // Set scrolling state
      setIsScrolling(true);

      // Clear any existing timeout to reset the scrolling state
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }

      // Determine scroll direction
      if (currentScrollTop > lastScrollTop) {
        setScrollDirection('down');
        setButtonVisible(false);
      } else {
        setScrollDirection('up');
        setButtonVisible(true);
      }

      setLastScrollTop(currentScrollTop);

      // Set a timeout to detect when scrolling stops
      scrollTimeout = setTimeout(() => {
        setIsScrolling(false);
        // Show button when scrolling stops
        setButtonVisible(true);
      }, 150);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
    };
  }, [lastScrollTop]);

  return { isScrolling, scrollDirection, buttonVisible };
};
