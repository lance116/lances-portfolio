'use client';

import Image from "next/image";
import Link from "next/link";
import { Mail, Github, Twitter, Linkedin } from "lucide-react";
import { useNavigationBounce } from "../lib/useNavigationBounce";
import { ThemeToggle } from "@/components/theme-toggle";

function Logo({ src, alt, size = 26, className = "" }: { src: string; alt: string; size?: number; className?: string }) {
  return (
    <span className="inline-flex items-center align-middle relative -top-[1px]">
      <Image
        src={src}
        alt={alt}
        width={size}
        height={size}
        sizes={`${size}px`}
        quality={100}
        priority={false}
        className={`h-[18px] w-[18px] sm:h-[26px] sm:w-[26px] object-contain align-middle ${className}`}
      />
    </span>
  );
}

const Label = ({ children }: { children: React.ReactNode }) => (
  <span className="relative -top-[1px] leading-none align-middle">{children}</span>
);

const FallbackLogo = ({ alt }: { alt: string }) => (
  <Logo src="/YClogo.png" alt={alt} />
);

export default function Home() {
  const { shouldBounce } = useNavigationBounce('home');

  return (
    <main className="relative">
      <div className="relative z-10 mx-auto max-w-[1400px] px-4 md:px-12 flex">
        {/* Left Sidebar - Desktop only */}
        <aside className="hidden md:block fixed w-[120px] pt-16 sm:pt-24 text-sm sm:text-xl text-neutral-900 dark:text-neutral-100 left-[max(48px,calc(50%-652px))]">
          <nav className="space-y-12">
            <a href="/about" className={`block hover:opacity-60 transition-opacity ${shouldBounce('about') ? 'nav-bounce' : ''}`}>About</a>
            <a href="/projects" className={`block hover:opacity-60 transition-opacity ${shouldBounce('projects') ? 'nav-bounce-delayed-1' : ''}`}>Projects</a>
            <a href="/photography" className={`block hover:opacity-60 transition-opacity ${shouldBounce('photography') ? 'nav-bounce-delayed-2' : ''}`}>Photos</a>
          </nav>
          {/* Contact icons */}
          <div className="flex flex-col gap-[19px] mt-12 text-neutral-700 dark:text-neutral-300 pl-[14px]">
            <a href="https://x.com/lanceyyan/" target="_blank" rel="noreferrer" className="hover:opacity-60 transition-opacity"><Logo src="/X.png" alt="X" /></a>
            <a href="https://github.com/lance116" target="_blank" rel="noreferrer" className="hover:opacity-60 transition-opacity"><Github size={26} /></a>
            <a href="https://www.linkedin.com/in/lance-yan/" target="_blank" rel="noreferrer" className="hover:opacity-60 transition-opacity"><Logo src="/linkedin.webp" alt="LinkedIn" /></a>
            <a href="mailto:lance.yan.business@gmail.com" className="hover:opacity-60 transition-opacity"><Mail size={26} /></a>
          </div>
        </aside>

        <div className="flex-1 md:ml-[140px]">
        <div className="pt-16 sm:pt-24" />

        {/* Header */}
        <div className="text-sm sm:text-xl leading-tight space-y-3">
          <div className="flex items-center justify-between">
            <h1 className="underline underline-offset-[3px] font-semibold">Lance Yan</h1>
            {/* Theme toggle - top right on desktop */}
            <div className="hidden md:block">
              <ThemeToggle />
            </div>
            {/* Mobile nav */}
            <div className="flex md:hidden items-center gap-2 font-extralight">
              <a href="/projects" className={`hover-underline-nudge ${shouldBounce('projects') ? 'nav-bounce' : ''}`}>Projects</a>
              <span className="text-neutral-400 dark:text-neutral-600">|</span>
              <a href="/about" className={`hover-underline-nudge ${shouldBounce('about') ? 'nav-bounce-delayed-1' : ''}`}>About me</a>
              <span className="text-neutral-400 dark:text-neutral-600">|</span>
              <a href="/photography" className={`hover-underline-nudge ${shouldBounce('photography') ? 'nav-bounce-delayed-2' : ''}`}>Photos</a>
            </div>
          </div>
        </div>

        {/* Currently */}
        <div className="text-sm sm:text-xl leading-tight space-y-3 mt-6">
          <div>◆ <span className="font-semibold">Currently:</span></div>
          <div>↳ Co-Founder & CEO at <span className="inline-flex items-center align-middle gap-1"><Logo src="/clice icon.png" alt="Clice AI" /><Label><a href="https://www.clice.ai" target="_blank" rel="noreferrer" className="hover-underline-nudge">Clice AI</a></Label></span></div>
          <div className="ml-4">↳ <span className="inline-flex items-center align-middle gap-1"><Logo src="/YClogo.png" alt="Y Combinator" /><Label><a href="https://www.ycombinator.com/companies/clice-ai" target="_blank" rel="noreferrer" className="hover-underline-nudge">YC W26</a></Label></span></div>
        </div>

        <div className="my-6 border-t border-neutral-200 dark:border-neutral-700" />

        {/* Previously */}
        <div className="text-sm sm:text-xl leading-tight space-y-3">
          <div>◆ <span className="font-semibold">Previously:</span></div>
          <div>↳ CS at <span className="inline-flex items-center align-middle gap-1"><Logo src="/waterloo-logo.png" alt="UWaterloo" /><Label>UWaterloo</Label></span></div>
          <div className="ml-4">↳ First semester dropout</div>
          <div>↳ Software Engineer/Builder at <span className="inline-flex items-center align-middle gap-1"><Logo src="/kalshi logo.png" alt="Kalshi" /><Label>Kalshi</Label></span></div>
          <div>↳ Lead Software engineer at <span className="inline-flex items-center align-middle gap-1"><Logo src="/waterloo-logo.png" alt="UWaterloo" /><Label>UWaterloo</Label></span>'s AI organization, <span className="inline-flex items-center align-middle gap-1"><Logo src="/wat.jpeg" alt="wat.ai" /><Label>wat.ai</Label></span></div>
          <div>↳ Software Engineer Intern at <span className="inline-flex items-center align-middle gap-1"><Logo src="/burnaby schools logo.jpeg" alt="Burnaby Schools" /><Label>Burnaby Schools</Label></span> and <span className="inline-flex items-center align-middle gap-1"><Logo src="/stealth logo.png" alt="Stealth Startups" /><Label>Stealth Startups</Label></span>.</div>
        </div>

        <div className="my-6 border-t border-neutral-200 dark:border-neutral-700" />

        {/* Building */}
        <div className="text-sm sm:text-xl leading-loose space-y-3">
          <div>◆ <span className="font-semibold">Building:</span></div>
          <div>↳ <span className="inline-flex items-center align-middle gap-1"><Logo src="/clice icon.png" alt="Clice AI" /><Label><a href="https://www.clice.ai" target="_blank" rel="noreferrer" className="hover-underline-nudge font-semibold">Clice AI</a></Label></span> - Building AI clones of people that can coordinate with each other.</div>
          <div className="ml-4">↳ <span className="font-semibold">Sales:</span></div>
          <div className="ml-8">↳ A teammate is out sick. A hot lead replies to their <span className="inline-flex items-center align-middle gap-1"><Logo src="/gmail logo.png" alt="Gmail" /><Label>email</Label></span>. Six hours go by. Your clone notices, pulls the deal context from your teammate's notes, and loops you in with everything you need. You respond same-day. The prospect never knew anything was wrong.</div>
          <div className="ml-4">↳ <span className="font-semibold">Engineering:</span></div>
          <div className="ml-8">↳ You're about to go on vacation. A teammate asks your clone "what's the status on the API integration?" Your clone knows the last <span className="inline-flex items-center align-middle gap-1"><Logo src="/github logo.png" alt="GitHub" /><Label>PR</Label></span> you merged, knows there's a blocker waiting on the backend team, knows you left notes in <span className="inline-flex items-center align-middle gap-1"><Logo src="/linear logo.jpeg" alt="Linear" /><Label>Linear</Label></span> about next steps. It gives them the full picture so they can pick it up without a single meeting.</div>
          <div>↳ If this sounds interesting, feel free to contact me!</div>
        </div>

        <div className="pb-16 sm:pb-24" />
        </div>
      </div>
    </main>
  );
}
