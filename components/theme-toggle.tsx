'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from './theme-provider';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="inline-flex items-center gap-1 text-sm sm:text-[0.95rem] text-neutral-700 dark:text-neutral-300 hover-underline-nudge whitespace-nowrap"
      style={{ verticalAlign: 'middle' }}
      aria-label="Toggle theme"
    >
      {theme === 'light' ? (
        <>
          <Moon size={14} style={{ display: 'inline-block', verticalAlign: 'middle' }} />
          <span style={{ display: 'inline-block', verticalAlign: 'middle' }}>Dark mode</span>
        </>
      ) : (
        <>
          <Sun size={14} style={{ display: 'inline-block', verticalAlign: 'middle' }} />
          <span style={{ display: 'inline-block', verticalAlign: 'middle' }}>Light mode</span>
        </>
      )}
    </button>
  );
}

