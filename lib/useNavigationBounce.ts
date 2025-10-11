'use client';

import { useState, useEffect } from 'react';

export function useNavigationBounce(currentPage: string) {
  const [visitedPages, setVisitedPages] = useState<Set<string>>(new Set());

  useEffect(() => {
    // Load visited pages from localStorage
    const stored = localStorage.getItem('visitedPages');
    if (stored) {
      try {
        const parsedPages = JSON.parse(stored);
        setVisitedPages(new Set(parsedPages));
      } catch (e) {
        console.warn('Failed to parse visited pages from localStorage');
      }
    }

    // Mark current page as visited after a short delay to ensure state is loaded
    const timer = setTimeout(() => {
      setVisitedPages(prev => {
        const newVisitedPages = new Set(prev);
        newVisitedPages.add(currentPage);
        // Save to localStorage
        localStorage.setItem('visitedPages', JSON.stringify([...newVisitedPages]));
        return newVisitedPages;
      });
    }, 100);

    return () => clearTimeout(timer);
  }, [currentPage]);

  const shouldBounce = (page: string) => {
    // Home page never bounces since users land there first
    if (page === 'home') return false;
    
    return !visitedPages.has(page);
  };

  return { shouldBounce };
}
