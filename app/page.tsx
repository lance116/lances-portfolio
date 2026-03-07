'use client';

import Image from "next/image";
import { Mail } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { useNavigationBounce } from "@/lib/useNavigationBounce";

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

export default function Home() {
  const { shouldBounce, markAsVisited } = useNavigationBounce('home');

  return (
    <main className="relative">
      <div className="relative z-10 mx-auto max-w-[960px] px-4 md:px-12">
        <div className="pt-16 sm:pt-24" />

        {/* Header */}
        <div className="text-sm sm:text-xl leading-tight space-y-3">
          <div className="flex items-center justify-between">
            <h1 className="underline underline-offset-[3px] font-semibold">Lance Yan</h1>
            {/* Social icons and theme toggle */}
            <div className="flex items-center gap-3 text-neutral-700 dark:text-neutral-300">
              <a href="https://x.com/lanceyyan/" target="_blank" rel="noreferrer" className={`hover:opacity-60 transition-opacity ${shouldBounce('x') ? 'nav-bounce' : ''}`} onClick={() => markAsVisited('x')}><Logo src="/X.png" alt="X" size={20} /></a>
              <a href="https://www.linkedin.com/in/lance-yan/" target="_blank" rel="noreferrer" className={`hover:opacity-60 transition-opacity ${shouldBounce('linkedin') ? 'nav-bounce-delayed-1' : ''}`} onClick={() => markAsVisited('linkedin')}><Logo src="/linkedin.webp" alt="LinkedIn" size={20} /></a>
              <a href="mailto:lance.yan.business@gmail.com" className="hover:opacity-60 transition-opacity"><Mail size={20} /></a>
              <ThemeToggle />
            </div>
          </div>
        </div>

        {/* Currently */}
        <div className="text-sm sm:text-xl leading-tight space-y-3 mt-6">
          <div>◆ <span className="font-semibold">Currently:</span></div>
          <div>↳ Co-Founder & CEO at <span className="inline-flex items-center align-middle gap-1"><Logo src="/traversing logo.png" alt="Traverse" /><Label><a href="https://traverse.so" target="_blank" rel="noreferrer" className="hover-underline-nudge font-semibold">Traverse</a></Label></span></div>
          <div className="ml-4">↳ Backed by <span className="inline-flex items-center align-middle gap-1"><Logo src="/YClogo.png" alt="Y Combinator" /><Label><a href="https://www.ycombinator.com/companies/clice-ai" target="_blank" rel="noreferrer" className="hover-underline-nudge">Y Combinator</a></Label></span> with angels from <span className="inline-flex items-center align-middle gap-1"><Logo src="/OAI.webp" alt="OpenAI" /><Label>OpenAI</Label></span>, <span className="inline-flex items-center align-middle gap-1"><Logo src="/GDM.png" alt="Google DeepMind" /><Label>Google DeepMind</Label></span>, and <span className="inline-flex items-center align-middle gap-1"><Logo src="/AN.png" alt="Anthropic" /><Label>Anthropic</Label></span></div>
        </div>

        <div className="my-6 border-t border-neutral-200 dark:border-neutral-700" />

        {/* Previously */}
        <div className="text-sm sm:text-xl leading-tight space-y-3">
          <div>◆ <span className="font-semibold">Previously:</span></div>
          <div>↳ CS at <span className="inline-flex items-center align-middle gap-1"><Logo src="/waterloo-logo.png" alt="UWaterloo" /><Label>UWaterloo</Label></span></div>
          <div className="ml-4">↳ First semester dropout</div>
          <div>↳ Software Engineer/Builder at <span className="inline-flex items-center align-middle gap-1"><Logo src="/kalshi logo.png" alt="Kalshi" /><Label>Kalshi</Label></span></div>
          <div>↳ Founding Engineer at <span className="inline-flex items-center align-middle gap-1"><Logo src="/stealth logo.png" alt="Stealth Startup" /><Label>Stealth Startup</Label></span></div>
          <div>↳ Lead Machine Learning Engineer at <span className="inline-flex items-center align-middle gap-1"><Logo src="/wat.jpeg" alt="wat.ai" /><Label>wat.ai</Label></span>, <span className="inline-flex items-center align-middle gap-1"><Logo src="/waterloo-logo.png" alt="UWaterloo" /><Label>UWaterloo</Label></span>'s AI organization</div>
        </div>

        <div className="my-6 border-t border-neutral-200 dark:border-neutral-700" />

        {/* Building */}
        <div className="text-sm sm:text-xl leading-loose space-y-3">
          <div>◆ <span className="font-semibold">Building:</span></div>
          <div>↳ <span className="inline-flex items-center align-middle gap-1"><Logo src="/traversing logo.png" alt="Traverse" /><Label><a href="https://traverse.so" target="_blank" rel="noreferrer" className="hover-underline-nudge font-semibold">Traverse</a></Label></span> - Applied data research lab that partners with frontier AI labs to produce the training data required for models to develop taste and judgment.</div>
          <div className="ml-4">↳ Our long-term goal is to give frontier models the foundations needed to perform and eventually surpass human white-collar work, accelerating the path toward artificial superintelligence.</div>
        </div>

        <div className="pb-16 sm:pb-24" />
      </div>
    </main>
  );
}
