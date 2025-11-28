'use client';

import Image from "next/image";
import Link from "next/link";
import { Mail, Github, Twitter, Linkedin } from "lucide-react";
import { useNavigationBounce } from "../../lib/useNavigationBounce";
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

export default function About() {
  const { shouldBounce } = useNavigationBounce('about');

  return (
    <main className="relative">
      <div className="relative z-10 mx-auto max-w-[820px] px-4 sm:px-0">
        <div className="pt-16 sm:pt-24" />

        {/* Header */}
        <div className="text-sm sm:text-xl leading-tight space-y-2">
          <div className="flex items-center justify-between">
            <h1 className="underline underline-offset-[3px] font-extralight">◆ Lance Yan</h1>
            <div className="flex items-center gap-2 font-extralight">
              <a href="/" className={`hover-underline-nudge ${shouldBounce('home') ? 'nav-bounce' : ''}`}>Home</a>
              <span className="text-neutral-400 dark:text-neutral-600">|</span>
              <a href="/projects" className={`hover-underline-nudge ${shouldBounce('projects') ? 'nav-bounce-delayed-1' : ''}`}>Projects</a>
              <span className="text-neutral-400 dark:text-neutral-600">|</span>
              <a href="/photography" className={`hover-underline-nudge ${shouldBounce('photography') ? 'nav-bounce-delayed-2' : ''}`}>Photos</a>
            </div>
          </div>
          <div>↳ Based in <span className="inline-flex items-center align-middle gap-1"><Logo src="/cali flag.png" alt="California" /><Label>San Francisco</Label></span>, also live in <span className="inline-flex items-center align-middle gap-1"><Logo src="/bc flag.png" alt="BC" /><Label>Vancouver</Label></span> and <span className="inline-flex items-center align-middle gap-1"><Logo src="/ontario flag.png" alt="Ontario" /><Label>Toronto</Label></span>.</div>
          <div className="ml-4">↳ Proud <span className="inline-flex items-center align-middle gap-1"><Logo src="/canada flag.png" alt="Canada" /><Label>Canadian Citizen.</Label></span></div>
          <div className="ml-4">↳ Grew up in <span className="inline-flex items-center align-middle gap-1"><Logo src="/bc flag.png" alt="BC" /><Label>Vancouver.</Label></span></div>
          <div className="ml-4">↳ Born in <span className="inline-flex items-center align-middle gap-1"><Logo src="/chinese flag.png" alt="China" /><Label>Beijing.</Label></span></div>
          <div>↳ Played the Cello since I was 6 years old.</div>
          <div className="ml-4">↳ Played for the <span className="inline-flex items-center align-middle gap-1"><Logo src="/vyso-favicon.png" alt="VYSO" /><Label><a href="https://vyso.com/" target="_blank" rel="noreferrer" className="hover-underline-nudge">Vancouver Youth Symphony Orchestra</a></Label></span> and was the Principal Cellist of the <span className="inline-flex items-center align-middle gap-1"><Logo src="/vam.jpg" alt="VAM" /><Label><a href="https://vancouveracademyofmusic.com/events/vamso-orpheum-series/" target="_blank" rel="noreferrer" className="hover-underline-nudge">Vancouver Academy of Music Symphony Orchestra</a></Label></span>.</div>
          <div className="ml-4">↳ Performed at: The Vancouver <span className="inline-flex items-center align-middle gap-1"><Logo src="/vancouver_civic_theatres_logo.jpeg" alt="VCT" /><Label><a href="https://vancouvercivictheatres.com/venues/orpheum/" target="_blank" rel="noreferrer" className="hover-underline-nudge">Orpheum</a></Label></span>, the <span className="inline-flex items-center align-middle gap-1"><Logo src="/ubc-logo-edited.jpg" alt="UBC" /><Label><a href="https://www.ubc.ca/" target="_blank" rel="noreferrer" className="hover-underline-nudge">University of British Columbia</a></Label></span>, <span className="inline-flex items-center align-middle gap-1"><Logo src="/capU.jpg" alt="CapU" /><Label><a href="https://www.capilanou.ca/" target="_blank" rel="noreferrer" className="hover-underline-nudge">Capilano University</a></Label></span> and various churches around Vancouver.</div>
          <div>↳ My favorite hobby is 📷 <a href="/photography" className={`hover-underline-nudge ${shouldBounce('photography') ? 'nav-bounce' : ''}`}>photography</a> and my favorite sport is <span className="inline-flex items-center align-middle gap-1"><Logo src="/badminton.png" alt="Badminton" /><Label>badminton.</Label></span></div>
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
