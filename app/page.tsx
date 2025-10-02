import Image from "next/image";
import { Mail, Github, Twitter, Linkedin } from "lucide-react";

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

const FallbackLogo = ({ alt }: { alt: string }) => (
  <Logo src="/YClogo.png" alt={alt} />
);

export default function Home() {
  return (
    <main className="relative">
      <div className="relative z-10 mx-auto max-w-screen-sm px-4 sm:px-0">
        <div className="pt-16 sm:pt-24" />

        {/* Header */}
        <div className="text-sm sm:text-[0.95rem] leading-tight space-y-2">
          <h1 className="underline underline-offset-[3px] font-extralight">◆ Lance Yan</h1>
          <div>↳ CS @ <span className="inline-flex items-center gap-1 align-middle"><Logo src="/waterloo-logo.png" alt="UWaterloo" /><span>UWaterloo</span></span></div>
          <div>↳ Building Clice, the worlds first agentic CRM for mortgage brokers and loan officers</div>
        </div>

        {/* Track Record */}
        <div className="mt-5 text-sm sm:text-[0.95rem] leading-tight space-y-2">
          <div>◆ Track Record:</div>
          <div>↳ The youngest and fastest ever in <span className="inline-flex items-center gap-1 align-middle"><Logo src="/waterloo-logo.png" alt="UWaterloo" /><span>UWaterloo</span></span>’s entire history to get flown out to San Francisco to raise venture.</div>
          <div>↳ Turned down full time interest at $300K a year, and full-time interest at <span className="inline-flex items-center gap-1 align-middle"><Logo src="/icon.jpg" alt="Icon" /><span>Icon</span></span> ($12M domain, $5M ARR) to build Clice.</div>
          <div>↳ Did 3 highschool software engineering internships.</div>
          <div>↳ Software engineer at the most selective team in UWaterloo’s AI org, <span className="inline-flex items-center gap-1 align-middle"><Logo src="/wat.jpeg" alt="wat.ai" /><span>wat.ai</span></span>.</div>
          <div>↳ Programming since age 5, entrepreneur since age 11.</div>
          <div>↳ Mentored by a lot of cool people. Including founders from <span className="inline-flex items-center gap-1 align-middle"><Logo src="/YClogo.png" alt="YC" /><span>YC</span></span> and <span className="inline-flex items-center gap-1 align-middle"><Logo src="/speedrun.jpg" alt="speedrun" /><span>speedrun</span></span>, <span className="inline-flex items-center gap-1 align-middle"><Logo src="/zfellows.jpg" alt="Z Fellows" /><span>Z Fellows</span></span>, <span className="inline-flex items-center gap-1 align-middle"><Logo src="/thielfellow.png" alt="Thiel Fellows" /><span>Thiel Fellows</span></span>.</div>
          <div>↳ 1200+ followers on X with posts totaling 600K+ views.</div>
        </div>

        {/* Building */}
        <div className="mt-5 text-sm sm:text-[0.95rem] leading-tight space-y-2">
          <div>◆ Building:</div>
          <div>↳ The worlds first agentic CRM for mortgage brokers/loan officers.</div>
          <div>↳ Potentially 1000+ mortgage brokers/loan officers are interested.</div>
          <div>↳ Loan officers who make $1M+ have told me: “I would pay thousands a month for this.”</div>
        </div>

        {/* Currently */}
        <div className="mt-5 text-sm sm:text-[0.95rem] leading-tight space-y-2">
          <div>◆ Currently:</div>
          <div>↳ Raising preseed (looking for ~$400K)</div>
          <div>↳ Interest from:</div>
          <div className="ml-4 space-y-1">
            <div className="flex items-center gap-2">↳ <Logo src="/YClogo.png" alt="Y Combinator" /><span>Y Combinator</span></div>
            <div className="flex items-center gap-2">↳ <Logo src="/a16z.jpg" alt="a16z" /><span>a16z</span></div>
            <div className="flex items-center gap-2">↳ <Logo src="/speedrun.jpg" alt="a16z speedrun" /><span>a16z speedrun</span></div>
            <div className="flex items-center gap-2">↳ <Logo src="/finc.jpg" alt="Founders Inc." /><span>Founders Inc.</span></div>
            <div className="flex items-center gap-2">↳ <Logo src="/zfellows.jpg" alt="Z Fellows" /><span>Z Fellows</span></div>
            <div className="flex items-center gap-2">↳ <FallbackLogo alt="Entrepreneurs First" /><span>Entrepreneurs First</span></div>
            <div className="flex items-center gap-2">↳ <Logo src="/afore.png" alt="Afore Capital" /><span>Afore Capital</span></div>
            <div className="flex items-center gap-2">↳ <Logo src="/pear.jpg" alt="Pear VC" /><span>Pear VC</span></div>
            <div className="flex items-center gap-2">↳ <FallbackLogo alt="CRV" /><span>CRV</span></div>
            <div className="flex items-center gap-2">↳ <FallbackLogo alt="Radical Ventures" /><span>Radical Ventures</span></div>
            <div className="flex items-center gap-2">↳ <FallbackLogo alt="Index Ventures" /><span>Index Ventures</span></div>
            <div className="flex items-center gap-2">↳ <FallbackLogo alt="Moxxie Ventures" /><span>Moxxie Ventures</span></div>
            <div className="flex items-center gap-2">↳ <FallbackLogo alt="Golden Ventures" /><span>Golden Ventures</span></div>
            <div className="flex items-center gap-2">↳ <FallbackLogo alt="Nexus Ventures" /><span>Nexus Ventures</span></div>
            <div className="flex items-center gap-2">↳ <FallbackLogo alt="Panache Ventures" /><span>Panache Ventures</span></div>
            <div className="flex items-center gap-2">↳ <FallbackLogo alt="Front Row Ventures" /><span>Front Row Ventures</span></div>
            <div className="flex items-center gap-2">↳ <FallbackLogo alt="Ripple Ventures" /><span>Ripple Ventures</span></div>
          </div>
        </div>

        {/* Contact me if you're */}
        <div className="mt-5 text-sm sm:text-[0.95rem] leading-tight space-y-2">
          <div>◆ Contact me if you’re:</div>
          <div>↳ A mortgage broker/loan officer</div>
          <div>↳ A founder</div>
          <div>↳ A VC</div>
          <div>↳ Someone curious in what I’m doing</div>
        </div>

        {/* Contact shit */}
        <div className="pt-8 sm:pt-10" />
        <footer className="pb-16 sm:pb-24 text-sm text-neutral-700">
          <div>Contact shit.</div>
          <div className="mt-2 flex items-center gap-4 text-neutral-700">
            <a className="link-minimal hover-nudge inline-flex items-center gap-1" href="mailto:lance.yan.business@gmail.com"><Mail size={14} /> Email</a>
            <a className="link-minimal hover-nudge inline-flex items-center gap-1" href="https://github.com/lance116" target="_blank" rel="noreferrer"><Github size={14} /> GitHub</a>
            <a className="link-minimal hover-nudge inline-flex items-center gap-1" href="https://x.com/cnnguan/" target="_blank" rel="noreferrer">Twitter</a>
            <a className="link-minimal hover-nudge inline-flex items-center gap-1" href="https://www.linkedin.com/in/lance-yan/" target="_blank" rel="noreferrer"><Linkedin size={14} /> LinkedIn</a>
          </div>
        </footer>
      </div>
    </main>
  );
}
