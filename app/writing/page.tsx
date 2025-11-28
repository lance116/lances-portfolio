'use client';

import Link from "next/link";
import { Mail, Github } from "lucide-react";
import { useNavigationBounce } from "../../lib/useNavigationBounce";
import { ThemeToggle } from "@/components/theme-toggle";

function Logo({ src, alt, size = 26, className = "" }: { src: string; alt: string; size?: number; className?: string }) {
  return (
    <span className="inline-flex items-center align-middle relative -top-[1px]">
      <img
        src={src}
        alt={alt}
        width={size}
        height={size}
        className={`h-[18px] w-[18px] sm:h-[26px] sm:w-[26px] object-contain align-middle ${className}`}
      />
    </span>
  );
}

// Essays with metadata
const essays = [
  {
    id: "the-window-between-nothing",
    title: "The Window Between Nothing",
    description: "An essay about death and finding purpose in life.",
    date: "2025-11-14T04:26:00"
  },
  {
    id: "floor-in-the-sky",
    title: "Floor in the Sky",
    description: "A short essay about standards.",
    date: "2025-11-14T05:42:00"
  }
];

export default function Writing() {
  const { shouldBounce } = useNavigationBounce('writing');

  return (
    <main className="relative">
      <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-0">
        <div className="pt-16 sm:pt-24" />

        {/* Header */}
        <div className="text-sm sm:text-xl leading-tight space-y-2">
          <div className="flex items-center justify-between">
            <h1 className="underline underline-offset-[3px] font-extralight">◆ Writing</h1>
            <div className="flex items-center gap-2 font-extralight">
              <a href="/" className={`hover-underline-nudge ${shouldBounce('home') ? 'nav-bounce' : ''}`}>Home</a>
              <span className="text-neutral-400 dark:text-neutral-600">|</span>
              <a href="/projects" className={`hover-underline-nudge ${shouldBounce('projects') ? 'nav-bounce-delayed-1' : ''}`}>Projects</a>
              <span className="text-neutral-400 dark:text-neutral-600">|</span>
              <a href="/about" className={`hover-underline-nudge ${shouldBounce('about') ? 'nav-bounce-delayed-2' : ''}`}>About me</a>
              <span className="text-neutral-400 dark:text-neutral-600">|</span>
              <a href="/photography" className={`hover-underline-nudge ${shouldBounce('photography') ? 'nav-bounce-delayed-3' : ''}`}>Photos</a>
            </div>
          </div>
          <div>↳ Essays and thoughts about life, building, and everything in between.</div>
        </div>

        <div className="my-6 border-t border-neutral-200 dark:border-neutral-700" />

        {/* Essays List */}
        <div className="space-y-6">
          {essays.map((essay) => (
            <Link
              key={essay.id}
              href={`/writing/${essay.id}`}
              className="block group"
            >
              <div className="space-y-2">
                <div className="text-sm sm:text-xl font-extralight hover-underline-nudge inline-block">
                  {essay.title}
                </div>
                <div className="text-xs sm:text-lg text-neutral-600 dark:text-neutral-400">
                  {essay.description}
                </div>
                <div className="text-xs text-neutral-500 dark:text-neutral-500">
                  {new Date(essay.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })} at {new Date(essay.date).toLocaleTimeString('en-US', {
                    hour: 'numeric',
                    minute: '2-digit',
                    hour12: true
                  })}
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="my-6 border-t border-neutral-200 dark:border-neutral-700" />

        {/* Back to Home */}
        <div className="text-sm sm:text-xl leading-tight my-6">
          <a href="/" className="hover-underline-nudge font-extralight">
            ← Back to home
          </a>
        </div>

        <div className="my-6 border-t border-neutral-200 dark:border-neutral-700" />

        {/* Contact */}
        <div className="text-sm sm:text-xl leading-tight">
          <div className="pt-4" />
          <footer className="pb-16 sm:pb-24">
            <div className="flex items-center justify-between flex-wrap gap-y-3">
              <div className="flex items-center gap-3">
                <div>◆ Contact:</div>
                <div className="flex items-center gap-3 text-neutral-700 dark:text-neutral-300">
                  <a className="inline-flex items-center gap-1" href="mailto:lance.yan.business@gmail.com"><Mail size={14} className="sm:w-[18px] sm:h-[18px]" /><span className="hover-underline-nudge">Email</span></a>
                  <a className="inline-flex items-center gap-1" href="https://github.com/lance116" target="_blank" rel="noreferrer"><Github size={14} className="sm:w-[18px] sm:h-[18px]" /><span className="hover-underline-nudge">GitHub</span></a>
                  <a className="inline-flex items-center gap-1" href="https://x.com/lanceyyan/" target="_blank" rel="noreferrer"><Logo src="/X.png" alt="X" /><span className="hover-underline-nudge">Twitter</span></a>
                  <a className="inline-flex items-center gap-1" href="https://www.linkedin.com/in/lance-yan/" target="_blank" rel="noreferrer"><Logo src="/linkedin.webp" alt="LinkedIn" /><span className="hover-underline-nudge">LinkedIn</span></a>
                </div>
              </div>
              <ThemeToggle />
            </div>
          </footer>
        </div>
      </div>
    </main>
  );
}
