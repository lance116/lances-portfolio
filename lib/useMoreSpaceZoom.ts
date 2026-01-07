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
    function isMobile(): boolean {
      if (typeof window === 'undefined') return false;
      return window.innerWidth < 768;
    }

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
      // Mobile: 85% zoom (bigger than desktop's 70%)
      if (isMobile()) {
        document.documentElement.style.zoom = '0.85';
        return;
      }

      const isMoreSpace = detectMoreSpace();
      // More Space users already have OS scaling, so less zoom needed
      // Default/Windows users need more zoom out to match the visual size
      document.documentElement.style.zoom = isMoreSpace ? '0.85' : '0.70';
    }

    applyZoom();

    window.addEventListener('resize', applyZoom);
    return () => window.removeEventListener('resize', applyZoom);
  }, []);
}
