'use client';

import { useState, useEffect } from 'react';

export function useNavigationBounce(currentPage: string) {
  const [visitedPages, setVisitedPages] = useState<Set<string>>(new Set());
  const [sessionId, setSessionId] = useState<string>('');

  useEffect(() => {
    // Generate or retrieve session ID
    const currentSessionId = sessionStorage.getItem('bounceSessionId') || 
      Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    
    if (!sessionStorage.getItem('bounceSessionId')) {
      sessionStorage.setItem('bounceSessionId', currentSessionId);
    }
    
    setSessionId(currentSessionId);

    // Load visited pages for this session from localStorage
    const stored = localStorage.getItem(`visitedPages_${currentSessionId}`);
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
        // Save to localStorage with session ID
        localStorage.setItem(`visitedPages_${currentSessionId}`, JSON.stringify(Array.from(newVisitedPages)));
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

  const markAsVisited = (page: string) => {
    setVisitedPages(prev => {
      const newVisitedPages = new Set(prev);
      newVisitedPages.add(page);
      if (sessionId) {
        localStorage.setItem(`visitedPages_${sessionId}`, JSON.stringify(Array.from(newVisitedPages)));
      }
      return newVisitedPages;
    });
  };

  return { shouldBounce, markAsVisited };
}
