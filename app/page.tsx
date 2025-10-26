'use client';

import Image from "next/image";
import Link from "next/link";
import { Mail, Github, Twitter, Linkedin } from "lucide-react";
import { useNavigationBounce } from "../lib/useNavigationBounce";
import { ThemeToggle } from "@/components/theme-toggle";

function Logo({ src, alt, size = 18, className = "" }: { src: string; alt: string; size?: number; className?: string }) {
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
        className={`h-[18px] w-[18px] object-contain align-middle ${className}`}
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
      <div className="relative z-10 mx-auto max-w-screen-sm px-4 sm:px-0">
        <div className="pt-16 sm:pt-24" />

        {/* Header */}
        <div className="text-sm sm:text-[0.95rem] leading-tight space-y-2">
          <div className="flex items-center justify-between">
            <h1 className="underline underline-offset-[3px] font-extralight">◆ Lance Yan</h1>
            <div className="flex items-center gap-2 font-extralight">
              <a href="/about" className={`hover-underline-nudge ${shouldBounce('about') ? 'nav-bounce' : ''}`}>About me</a>
              <span className="text-neutral-400 dark:text-neutral-600">|</span>
              <a href="/photography" className={`hover-underline-nudge ${shouldBounce('photography') ? 'nav-bounce-delayed' : ''}`}>Photos</a>
            </div>
          </div>
          <div>↳ Founder <span className="inline-flex items-center align-middle gap-1"><Logo src="/clice final logo.png" alt="Clice" className="" /><Label>Clice</Label></span></div>
          <div>↳ CS <span className="inline-flex items-center align-middle gap-1"><Logo src="/waterloo-logo.png" alt="UWaterloo" /><Label><a href="https://uwaterloo.ca/" target="_blank" rel="noreferrer" className="hover-underline-nudge">UWaterloo</a></Label></span></div>
        </div>

        <div className="my-3 border-t border-neutral-200 dark:border-neutral-700" />

        {/* Track Record */}
        <div className="text-sm sm:text-[0.95rem] leading-tight space-y-2">
          <div>◆ What makes me different:</div>
          <div>↳ Built <span className="inline-flex items-center align-middle gap-1"><Logo src="/ratemycompany logo.png" alt="ratemycompany.ca" /><Label><a href="https://www.ratemycompany.ca/" target="_blank" rel="noreferrer" className="hover-underline-nudge">ratemycompany.ca</a></Label></span>, got <span className="font-bold slight-italic">40K+</span> users and <span className="font-bold slight-italic">2.5M+</span> votes within <span className="font-bold slight-italic">48h</span>.</div>
          <div className="ml-4">↳ Implemented measures to prevent <span className="font-bold slight-italic">1K+</span> bots from getting their fav company on the podium (<span className="font-bold slight-italic">4M+</span> edge requests in <span className="font-bold slight-italic">12h</span>).</div>
          <div>↳ The <span className="font-bold slight-italic">fastest</span> in <span className="inline-flex items-center align-middle gap-1"><Logo src="/waterloo-logo.png" alt="UWaterloo" /><Label><a href="https://uwaterloo.ca/" target="_blank" rel="noreferrer" className="hover-underline-nudge">UWaterloo</a></Label></span>'s <span className="font-bold slight-italic">entire history</span> to get flown out to San Francisco to raise venture.</div>
          <div className="ml-4">↳ Turned down <span className="font-bold slight-italic">$7M</span> valuation offers to build <span className="inline-flex items-center align-middle gap-1"><Logo src="/clice final logo.png" alt="Clice" className="" /><Label>Clice</Label></span> heads-down in Waterloo.</div>
          <div>↳ Received full-time interest for: <span className="font-bold slight-italic">$300K</span> founding engineer role and another at <span className="inline-flex items-center align-middle gap-1"><Logo src="/icon.jpg" alt="Icon" /><Label><a href="https://icon.com/" target="_blank" rel="noreferrer" className="hover-underline-nudge">Icon</a></Label></span>, but decided to go all in on building <span className="inline-flex items-center align-middle gap-1"><Logo src="/clice final logo.png" alt="Clice" className="" /><Label>Clice</Label></span>.</div>
          <div>↳ Programming since <span className="font-bold slight-italic">age 5</span>, entrepreneur since <span className="font-bold slight-italic">age 11</span>.</div>
          <div>↳ Software Engineer/Builder at <span className="inline-flex items-center align-middle gap-1"><Logo src="/kalshi logo.png" alt="Kalshi" /><Label><a href="https://kalshi.com/" target="_blank" rel="noreferrer" className="hover-underline-nudge">Kalshi</a></Label></span>.</div>
          <div className="ml-4">↳ Project dropping soon!</div>
          <div>↳ Lead Software engineer at <span className="inline-flex items-center align-middle gap-1"><Logo src="/waterloo-logo.png" alt="UWaterloo" /><Label><a href="https://uwaterloo.ca/" target="_blank" rel="noreferrer" className="hover-underline-nudge">UWaterloo</a></Label></span>'s AI organization, <span className="inline-flex items-center align-middle gap-1"><Logo src="/wat.jpeg" alt="wat.ai" /><Label><a href="https://watai.ca/" target="_blank" rel="noreferrer" className="hover-underline-nudge">wat.ai</a></Label></span>.</div>
          <div>↳ Growth at <span className="inline-flex items-center align-middle gap-1"><Logo src="/symbal_logo.jpeg" alt="Symbal" /><Label><a href="https://www.symbal.ai/" target="_blank" rel="noreferrer" className="hover-underline-nudge">Symbal</a></Label></span>, backed by Peter Thiel and <span className="inline-flex items-center align-middle gap-1"><Logo src="/founders fund.jpeg" alt="Founders Fund" /><Label><a href="https://foundersfund.com/" target="_blank" rel="noreferrer" className="hover-underline-nudge">Founders Fund</a></Label></span>.</div>
          <div>↳ Fellow at <span className="inline-flex items-center align-middle gap-1"><Logo src="/boardy_logo.jpeg" alt="Boardy" /><Label><a href="https://www.boardy.ai/" target="_blank" rel="noreferrer" className="hover-underline-nudge">Boardy</a></Label></span>, Fall 2025 Cohort.</div>
          <div className="leading-[1.4]">↳ Mentored by some <span className="font-bold slight-italic">amazing</span> people. Including founders from <span className="inline-flex items-center align-middle gap-1"><Logo src="/YClogo.png" alt="YC" /><Label><a href="https://www.ycombinator.com/" target="_blank" rel="noreferrer" className="hover-underline-nudge">Y Combinator</a></Label></span>, <span className="inline-flex items-center align-middle gap-1"><Logo src="/speedrun.jpg" alt="speedrun" /><Label><a href="https://speedrun.a16z.com/" target="_blank" rel="noreferrer" className="hover-underline-nudge">speedrun</a></Label></span>, <span className="inline-flex items-center align-middle gap-1"><Logo src="/zfellows.jpg" alt="Z Fellows" /><Label><a href="https://www.zfellows.com/" target="_blank" rel="noreferrer" className="hover-underline-nudge">Z Fellows</a></Label></span> and <span className="inline-flex items-center align-middle gap-1"><Logo src="/thielfellow.png" alt="Thiel Fellows" /><Label><a href="https://thielfellowship.org/" target="_blank" rel="noreferrer" className="hover-underline-nudge">Thiel Fellowship</a></Label></span>.</div>
          <div>↳ <span className="font-bold slight-italic">2900+</span> followers on <span className="inline-flex items-center align-middle gap-1"><Logo src="/linkedin.webp" alt="LinkedIn" /><Label><a href="https://www.linkedin.com/in/lance-yan/" target="_blank" rel="noreferrer" className="hover-underline-nudge">LinkedIn</a></Label></span>, <span className="font-bold slight-italic">1400+</span> followers on <span className="inline-flex items-center align-middle gap-1"><span className="relative -top-[1px]"><Logo src="/X.png" alt="X" /></span></span>, with posts totaling <span className="font-bold slight-italic">1.6M+</span> views.</div>
        </div>

        <div className="my-3 border-t border-neutral-200 dark:border-neutral-700" />

        {/* Building */}
        <div className="text-sm sm:text-[0.95rem] leading-tight space-y-2">
          <div>◆ Building:</div>
          <div>↳ <span className="inline-flex items-center align-middle gap-1"><Logo src="/clice final logo.png" alt="Clice" className="" /><Label>Clice</Label></span>. AI agents for the lending industry.</div>
          <div className="ml-4">↳ Backed by angels from <span className="inline-flex items-center align-middle gap-1"><Logo src="/YClogo.png" alt="Y Combinator" /><Label><a href="https://www.ycombinator.com/" target="_blank" rel="noreferrer" className="hover-underline-nudge">Y Combinator</a></Label></span>, <span className="inline-flex items-center align-middle gap-1"><Logo src="/a16z.jpg" alt="a16z" /><Label><a href="https://a16z.com/" target="_blank" rel="noreferrer" className="hover-underline-nudge">a16z</a></Label></span>, and <span className="inline-flex items-center align-middle gap-1"><Logo src="/soma logo.jpg" alt="Soma Capital" /><Label><a href="https://somacap.com/featured" target="_blank" rel="noreferrer" className="hover-underline-nudge">Soma Capital</a></Label></span>.</div>
          <div className="ml-4">↳ Backed by my own school, <span className="inline-flex items-center align-middle gap-1"><Logo src="/waterloo-logo.png" alt="UWaterloo" /><Label><a href="https://uwaterloo.ca/" target="_blank" rel="noreferrer" className="hover-underline-nudge">UWaterloo</a></Label></span>'s <span className="inline-flex items-center align-middle gap-1"><Logo src="/velocity logo.png" alt="Velocity Fund" /><Label><a href="https://velocity.fund/" target="_blank" rel="noreferrer" className="hover-underline-nudge">Velocity Fund</a></Label></span>.</div>
          <div className="ml-8">↳ Invited to <span className="inline-flex items-center align-middle gap-1"><Logo src="/velocity logo.png" alt="Velocity Incubator" /><Label><a href="https://www.velocityincubator.com/" target="_blank" rel="noreferrer" className="hover-underline-nudge">Velocity Incubator</a></Label></span>'s Winter 2025 cohort.</div>
          <div>↳ <span className="inline-flex items-center align-middle gap-1"><Logo src="/ratemycompany logo.png" alt="ratemycompany.ca" /><Label><a href="https://www.ratemycompany.ca/" target="_blank" rel="noreferrer" className="hover-underline-nudge">ratemycompany.ca</a></Label></span>. Startups leaderboard coming soon. 👀</div>
          <div className="ml-4">↳ If you want your high-growth startup added please contact me!</div>
          </div>

        <div className="my-3 border-t border-neutral-200 dark:border-neutral-700" />


        {/* Reach out */}
        <div className="text-sm sm:text-[0.95rem] leading-tight space-y-2">
          <div>◆ Please reach out if you're</div>
          <div>↳ A fellow founder.</div>
          <div>↳ Someone who is curious about me or what I'm doing.</div>
        </div>

        <div className="my-3 border-t border-neutral-200 dark:border-neutral-700" />

        {/* Contact */}
        <div className="text-sm sm:text-[0.95rem] leading-tight">
          <div className="pt-4" />
          <footer className="pb-16 sm:pb-24">
            <div className="flex items-center justify-between flex-wrap">
              <div className="flex items-center gap-3">
                <div>◆ Contact:</div>
                <div className="flex items-center gap-3 text-neutral-700 dark:text-neutral-300">
                  <a className="inline-flex items-center gap-1" href="mailto:lance.yan.business@gmail.com"><Mail size={14} /><span className="hover-underline-nudge">Email</span></a>
                  <a className="inline-flex items-center gap-1" href="https://github.com/lance116" target="_blank" rel="noreferrer"><Github size={14} /><span className="hover-underline-nudge">GitHub</span></a>
                  <a className="inline-flex items-center gap-1" href="https://x.com/cnnguan/" target="_blank" rel="noreferrer"><Logo src="/X.png" alt="X" /><span className="hover-underline-nudge">Twitter</span></a>
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
