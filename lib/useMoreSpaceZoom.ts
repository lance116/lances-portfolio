'use client';

import { useEffect } from 'react';

/**
 * Adjusts zoom based on Mac "More Space" display setting.
 * - Normal users: 0.8 zoom (20% out)
 * - "More Space" users: 1.0 zoom (they're already scaled down)
 */

const MORE_SPACE_WIDTH_THRESHOLD = 1700;

export function useMoreSpaceZoom() {
  useEffect(() => {
    function detectMoreSpace(): boolean {
      if (typeof window === 'undefined') return false;

      const userAgent = navigator.userAgent.toLowerCase();
      const platform = navigator.platform?.toLowerCase() || '';
      const isMac = platform.includes('mac') || userAgent.includes('macintosh') || userAgent.includes('mac os');

      if (!isMac) return false;

      const dpr = window.devicePixelRatio;
      if (dpr < 2) return false;

      const screenWidth = window.screen.width;
      return screenWidth > MORE_SPACE_WIDTH_THRESHOLD;
    }

    function applyZoom() {
      const isMoreSpace = detectMoreSpace();
      // More Space users get normal zoom, others get 20% out
      document.documentElement.style.zoom = isMoreSpace ? '1' : '0.8';
    }

    applyZoom();

    window.addEventListener('resize', applyZoom);
    return () => window.removeEventListener('resize', applyZoom);
  }, []);
}
