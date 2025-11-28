'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from './theme-provider';
import { useEffect, useState } from 'react';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button
        className="inline-flex items-center gap-1 text-lg sm:text-xl text-neutral-700 dark:text-neutral-300 hover-underline-nudge whitespace-nowrap"
        style={{ verticalAlign: 'middle', position: 'relative', top: '-2px' }}
        aria-label="Toggle theme"
        disabled
      >
        <div style={{ width: 18, height: 18, display: 'inline-block', verticalAlign: 'middle' }} />
        <span style={{ display: 'inline-block', verticalAlign: 'middle', opacity: 0 }}>Loading</span>
      </button>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className="inline-flex items-center gap-1 text-lg sm:text-xl text-neutral-700 dark:text-neutral-300 hover-underline-nudge whitespace-nowrap"
      style={{ verticalAlign: 'middle', position: 'relative', top: '-2px' }}
      aria-label="Toggle theme"
    >
      {theme === 'light' ? (
        <>
          <Moon size={18} style={{ display: 'inline-block', verticalAlign: 'middle' }} />
          <span style={{ display: 'inline-block', verticalAlign: 'middle' }}>Dark mode</span>
        </>
      ) : (
        <>
          <Sun size={18} style={{ display: 'inline-block', verticalAlign: 'middle' }} />
          <span style={{ display: 'inline-block', verticalAlign: 'middle' }}>Light mode</span>
        </>
      )}
    </button>
  );
}

