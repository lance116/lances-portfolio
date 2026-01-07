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
        className="hover:opacity-60 transition-opacity"
        aria-label="Toggle theme"
        disabled
      >
        <Sun size={22} />
      </button>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className="hover:opacity-60 transition-opacity"
      aria-label="Toggle theme"
    >
      {theme === 'light' ? <Moon size={22} /> : <Sun size={22} />}
    </button>
  );
}

