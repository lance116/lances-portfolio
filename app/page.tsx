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
      <div className="relative z-10 mx-auto max-w-[820px] px-4 sm:px-0">
        <div className="pt-16 sm:pt-24" />

        {/* Header */}
        <div className="text-sm sm:text-xl leading-tight space-y-2">
          <div className="flex items-center justify-between">
            <h1 className="underline underline-offset-[3px] font-extralight">◆ Lance Yan</h1>
            <div className="flex items-center gap-2 font-extralight">
              <a href="/projects" className={`hover-underline-nudge ${shouldBounce('projects') ? 'nav-bounce' : ''}`}>Projects</a>
              <span className="text-neutral-400 dark:text-neutral-600">|</span>
              <a href="/about" className={`hover-underline-nudge ${shouldBounce('about') ? 'nav-bounce-delayed-1' : ''}`}>About me</a>
              <span className="text-neutral-400 dark:text-neutral-600">|</span>
              <a href="/photography" className={`hover-underline-nudge ${shouldBounce('photography') ? 'nav-bounce-delayed-2' : ''}`}>Photos</a>
            </div>
          </div>
          <div>↳ Co-founder & CEO <span className="inline-flex items-center align-middle gap-1"><Logo src="/clice white logo.png" alt="Clice AI" className="border border-neutral-300 dark:border-neutral-600 rounded" /><Label><a href="https://www.clice.ai" target="_blank" rel="noreferrer" className="hover-underline-nudge">Clice AI</a></Label></span></div>
        </div>

        <div className="my-3 border-t border-neutral-200 dark:border-neutral-700" />

        {/* Previously */}
        <div className="text-sm sm:text-xl leading-tight space-y-2">
          <div>◆ Previously:</div>
          <div>↳ CS <span className="inline-flex items-center align-middle gap-1"><Logo src="/waterloo-logo.png" alt="UWaterloo" /><Label><a href="https://uwaterloo.ca/" target="_blank" rel="noreferrer" className="hover-underline-nudge">UWaterloo</a></Label></span></div>
          <div>↳ Software Engineer/Builder at <span className="inline-flex items-center align-middle gap-1"><Logo src="/kalshi logo.png" alt="Kalshi" /><Label><a href="https://kalshi.com/" target="_blank" rel="noreferrer" className="hover-underline-nudge">Kalshi</a></Label></span></div>
          <div>↳ Lead Software engineer at <span className="inline-flex items-center align-middle gap-1"><Logo src="/waterloo-logo.png" alt="UWaterloo" /><Label><a href="https://uwaterloo.ca/" target="_blank" rel="noreferrer" className="hover-underline-nudge">UWaterloo</a></Label></span>'s AI organization, <span className="inline-flex items-center align-middle gap-1"><Logo src="/wat.jpeg" alt="wat.ai" /><Label><a href="https://watai.ca/" target="_blank" rel="noreferrer" className="hover-underline-nudge">wat.ai</a></Label></span></div>
          <div>↳ Software Engineer Intern at <span className="inline-flex items-center align-middle gap-1"><Logo src="/burnaby schools logo.jpeg" alt="Burnaby Schools" /><Label><a href="https://burnabyschools.ca/" target="_blank" rel="noreferrer" className="hover-underline-nudge">Burnaby Schools</a></Label></span> and <span className="inline-flex items-center align-middle gap-1"><Logo src="/stealth logo.png" alt="Stealth Startups" /><Label>Stealth Startups</Label></span>.</div>
        </div>

        <div className="my-3 border-t border-neutral-200 dark:border-neutral-700" />

        {/* Building */}
        <div className="text-sm sm:text-xl leading-tight space-y-2">
          <div>◆ Building:</div>
          <div>↳ <span className="inline-flex items-center align-middle gap-1"><Logo src="/clice white logo.png" alt="Clice AI" className="border border-neutral-300 dark:border-neutral-600 rounded" /><Label><a href="https://www.clice.ai" target="_blank" rel="noreferrer" className="hover-underline-nudge">Clice AI</a></Label></span><span className="relative top-0">. The communication OS for loan officers.</span></div>
          <div className="ml-4">↳ Backed by <span className="inline-flex items-center align-middle gap-1"><Logo src="/YClogo.png" alt="Y Combinator" /><Label><a href="https://www.ycombinator.com/" target="_blank" rel="noreferrer" className="hover-underline-nudge">Y Combinator</a></Label></span> & angels at <span className="inline-flex items-center align-middle gap-1"><Logo src="/a16z.jpg" alt="a16z" /><Label><a href="https://a16z.com/" target="_blank" rel="noreferrer" className="hover-underline-nudge">a16z</a></Label></span>, <span className="inline-flex items-center align-middle gap-1"><Logo src="/soma.png" alt="Soma Capital" /><Label><a href="https://somacap.com/featured" target="_blank" rel="noreferrer" className="hover-underline-nudge">Soma Capital</a></Label></span>, <span className="inline-flex items-center align-middle gap-1"><Logo src="/waterloo-logo.png" alt="UWaterloo" /><Label><a href="https://uwaterloo.ca/" target="_blank" rel="noreferrer" className="hover-underline-nudge">UWaterloo</a></Label></span>.</div>
          </div>

        <div className="my-3 border-t border-neutral-200 dark:border-neutral-700" />


        {/* Reach out */}
        <div className="text-sm sm:text-xl leading-tight space-y-2">
          <div>◆ Please reach out if you're:</div>
          <div>↳ A fellow founder.</div>
          <div>↳ Someone who is curious about what I'm building.</div>
        </div>

        <div className="my-3 border-t border-neutral-200 dark:border-neutral-700" />

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
