import Image from "next/image";
import { Mail, Github, Twitter, Linkedin, Square } from "lucide-react";

function Logo({ src, alt, size = 18 }: { src: string; alt: string; size?: number }) {
  return (
    <span className="inline-flex items-center align-middle">
      <Image
        src={src}
        alt={alt}
        width={size}
        height={size}
        sizes={`${size}px`}
        quality={100}
        priority={false}
        className="h-[18px] w-[18px] object-contain"
      />
    </span>
  );
}

export default function Home() {
  return (
    <main className="relative">
      {/* Centered narrow column */}
      <div className="relative z-10 mx-auto max-w-screen-sm px-4 sm:px-0">
        <div className="pt-16 sm:pt-24" />

        {/* Name */}
        <h1 className="text-sm sm:text-[0.95rem] font-extralight underline underline-offset-[3px]">Lance Yan</h1>

        {/* Categories and items */}
        <div className="mt-3 space-y-2 text-sm sm:text-[0.95rem] leading-tight">
          {/* Track Record */}
          <div>
            <span className="italic text-neutral-600 inline-flex items-center gap-2 align-middle">
              <span className="inline-block rotate-45"><Square size={8} className="text-neutral-500" /></span>
              Track Record
            </span>
            <div className="mt-1 space-y-1 text-neutral-800">
              <div className="text-neutral-700">↳ SWE Internships: <span className="inline-flex items-center gap-3 flex-wrap align-middle">
                <span className="inline-flex items-center gap-1 align-middle hover-nudge"><Logo src="/ConsultingPFP.png" alt="RCL Consulting" /><span>RCL Consulting</span></span>
                <span className="inline-flex items-center gap-1 align-middle hover-nudge"><Logo src="/stealthlogo.jpg" alt="Stealth" /><span>Stealth startup</span></span>
                <span className="inline-flex items-center gap-1 align-middle hover-nudge"><Logo src="/moscrop.jpg" alt="Moscrop" /><span>Moscrop CS dept</span></span>
              </span></div>
              <div>↳ SWE for most selective team at <span className="inline-flex items-center gap-1 align-middle hover-nudge"><Logo src="/wat.jpeg" alt="Wat.ai" /><span>Wat.ai</span></span>.</div>
              <div>↳ Coding since age 5, entrepreneur since age 11.</div>
              <div>↳ Youngest + fastest in UWaterloo history flown to SF to raise venture.</div>
              <div>↳ Turned down $300K+ offers + full-time interest at Icon (spent $12M on domain).</div>
              <div>↳ 1200+ Twitter followers, posts w/ 100K+ views.</div>
              <div>↳ Mentored by <span className="inline-flex items-center gap-1 align-middle hover-nudge"><Logo src="/YClogo.png" alt="YC" /><span>YC</span></span> + <span className="inline-flex items-center gap-1 align-middle hover-nudge"><Logo src="/speedrun.jpg" alt="speedrun" /><span>speedrun</span><span>founders.</span></span></div>
            </div>
          </div>

          {/* What I’ve Been Building */}
          <div>
            <span className="italic text-neutral-600 inline-flex items-center gap-2 align-middle">
              <span className="inline-block rotate-45"><Square size={8} className="text-neutral-500" /></span>
              What I’ve Been Building
            </span>
            <div className="mt-1 space-y-1 text-neutral-800">
              <div>↳ World’s first agentic CRM for mortgage brokers/loan officers.</div>
              <div>↳ 1000+ potential users; loan officers making $1M+ willing to pay thousands/month.</div>
            </div>
          </div>

          {/* Currently */}
          <div>
            <span className="italic text-neutral-600 inline-flex items-center gap-2 align-middle">
              <span className="inline-block rotate-45"><Square size={8} className="text-neutral-500" /></span>
              Currently
            </span>
            <div className="mt-1 space-y-1 text-neutral-800">
              <div>↳ Raising $500K pre-seed, talking to 15+ VCs.</div>
            </div>
          </div>

          {/* Previously */}
          <div>
            <span className="italic text-neutral-600 inline-flex items-center gap-2 align-middle">
              <span className="inline-block rotate-45"><Square size={8} className="text-neutral-500" /></span>
              Previously
            </span>
            <div className="mt-1 space-y-1 text-neutral-800">
              <div>↳ SWE Internships: <span className="inline-flex items-center gap-3 flex-wrap align-middle">
                <span className="inline-flex items-center gap-1 align-middle hover-nudge"><Logo src="/ConsultingPFP.png" alt="RCL Consulting" /><span>RCL Consulting</span></span>
                <span className="inline-flex items-center gap-1 align-middle hover-nudge"><Logo src="/stealthlogo.jpg" alt="Stealth" /><span>Stealth startup</span></span>
                <span className="inline-flex items-center gap-1 align-middle hover-nudge"><Logo src="/moscrop.jpg" alt="Moscrop" /><span>Moscrop CS dept</span></span>
              </span></div>
            </div>
          </div>
        </div>

        {/* Footer / contact */}
        <div className="pt-8 sm:pt-10" />
        <footer className="pb-16 sm:pb-24 text-sm text-neutral-700">
          <div className="flex items-center gap-2 text-neutral-500">
            <span className="inline-block rotate-45"><Square size={10} className="text-neutral-400" /></span>
            <span className="tracking-tight">L</span>
          </div>
          <div className="mt-2 flex items-center gap-4 text-neutral-700">
            <a className="link-minimal hover-nudge inline-flex items-center gap-1" href="mailto:lance.yan.business@gmail.com"><Mail size={14} /> Email</a>
            <a className="link-minimal hover-nudge inline-flex items-center gap-1" href="https://github.com/lance116" target="_blank" rel="noreferrer"><Github size={14} /> GitHub</a>
            <a className="link-minimal hover-nudge inline-flex items-center gap-1" href="https://x.com/cnnguan/" target="_blank" rel="noreferrer"><Twitter size={14} /> Twitter</a>
            <a className="link-minimal hover-nudge inline-flex items-center gap-1" href="https://www.linkedin.com/in/lance-yan/" target="_blank" rel="noreferrer"><Linkedin size={14} /> LinkedIn</a>
          </div>
        </footer>
      </div>

      {/* Keep background effect untouched (SplashCursor already mounted globally) */}
    </main>
  );
}
