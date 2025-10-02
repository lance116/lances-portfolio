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
        className="h-[18px] w-[18px] object-contain align-middle"
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
  return (
    <main className="relative">
      <div className="relative z-10 mx-auto max-w-screen-sm px-4 sm:px-0">
        <div className="pt-16 sm:pt-24" />

        {/* Header */}
        <div className="text-sm sm:text-[0.95rem] leading-tight space-y-2">
          <h1 className="underline underline-offset-[3px] font-extralight">◆ Lance Yan</h1>
          <div>↳ CS @ <span className="inline-flex items-center align-middle gap-1"><Logo src="/waterloo-logo.png" alt="UWaterloo" /><Label><a href="https://uwaterloo.ca/" target="_blank" rel="noreferrer" className="hover-underline-nudge">UWaterloo</a></Label></span></div>
          <div>↳ Building Clice, an agentic CRM for mortgage brokers and loan officers</div>
        </div>

        <div className="my-3 border-t border-neutral-200" />

        {/* Track Record */}
        <div className="text-sm sm:text-[0.95rem] leading-tight space-y-2">
          <div>◆ Track Record:</div>
          <div>↳ The <span className="font-semibold italic">youngest</span> and <span className="font-semibold italic">fastest</span> ever in <span className="inline-flex items-center align-middle gap-1"><Logo src="/waterloo-logo.png" alt="UWaterloo" /><Label><a href="https://uwaterloo.ca/" target="_blank" rel="noreferrer" className="hover-underline-nudge">UWaterloo</a></Label></span>’s <span className="font-semibold italic">entire history</span> to get flown out to San Francisco to raise venture.</div>
          <div>↳ Turned down full-time interest, a <span className="font-semibold italic">$300K</span>  engineering role and another at <span className="inline-flex items-center align-middle gap-1"><Logo src="/icon.jpg" alt="Icon" /><Label><a href="https://icon.com/" target="_blank" rel="noreferrer" className="hover-underline-nudge">Icon</a></Label></span> ($12M domain, $5M ARR) to build Clice.</div>
          <div>↳ Did 3 <span className="font-semibold italic">highschool</span> software engineering internships.</div>
          <div>↳ Software engineer in the <span className="font-semibold italic">most selective</span> team at UWaterloo’s AI org, <span className="inline-flex items-center align-middle gap-1"><Logo src="/wat.jpeg" alt="wat.ai" /><Label><a href="https://watai.ca/" target="_blank" rel="noreferrer" className="hover-underline-nudge">wat.ai</a></Label></span>.</div>
          <div>↳ Programming since <span className="font-semibold italic">age 5</span>, entrepreneur since <span className="font-semibold italic">age 11</span>.</div>
          <div className="leading-[1.4]">↳ Mentored by <span className="font-semibold italic">a lot</span> of cool people. Including founders from <span className="inline-flex items-center align-middle gap-1"><Logo src="/YClogo.png" alt="YC" /><Label><a href="https://www.ycombinator.com/" target="_blank" rel="noreferrer" className="hover-underline-nudge">Y Combinator</a></Label></span>, <span className="inline-flex items-center align-middle gap-1"><Logo src="/speedrun.jpg" alt="speedrun" /><Label><a href="https://speedrun.a16z.com/" target="_blank" rel="noreferrer" className="hover-underline-nudge">speedrun</a></Label></span>, <span className="inline-flex items-center align-middle gap-1"><Logo src="/zfellows.jpg" alt="Z Fellows" /><Label><a href="https://www.zfellows.com/" target="_blank" rel="noreferrer" className="hover-underline-nudge">Z Fellows</a></Label></span> and <span className="inline-flex items-center align-middle gap-1"><Logo src="/thielfellow.png" alt="Thiel Fellows" /><Label><a href="https://thielfellowship.org/" target="_blank" rel="noreferrer" className="hover-underline-nudge">Thiel Fellowship</a></Label></span>.</div>
          <div>↳ <span className="font-semibold italic">1100+</span> followers on <span className="inline-flex items-center align-middle gap-1"><Logo src="/X.png" alt="X" /></span> with posts totaling <span className="font-semibold italic">600K+</span> views.</div>
        </div>

        <div className="my-3 border-t border-neutral-200" />

        {/* Building */}
        <div className="text-sm sm:text-[0.95rem] leading-tight space-y-2">
          <div>◆ Building:</div>
          <div>↳ The <span className="font-semibold italic">worlds first</span> agentic CRM for mortgage brokers/loan officers.</div>
          <div>↳ Potentially <span className="font-semibold italic">1000+</span> mortgage brokers/loan officers to test my solution.</div>
          <div>↳ Loan officers who earn <span className="font-semibold italic">$1M+</span> have told me: “I would pay <span className="font-semibold italic">thousands</span> a month for this.”</div>
        </div>

        <div className="my-3 border-t border-neutral-200" />

        {/* Currently */}
        <div className="text-sm sm:text-[0.95rem] leading-tight space-y-2">
          <div>◆ Currently:</div>
          <div>↳ Raising preseed (seeking ~$400K)</div>
          <div>↳ Interest from:</div>
          <div className="ml-4 space-y-1">
            <div className="flex items-center gap-2">↳ <Logo src="/YClogo.png" alt="Y Combinator" /><Label><a href="https://www.ycombinator.com/" target="_blank" rel="noreferrer" className="hover-underline-nudge">Y Combinator</a></Label></div>
            <div className="flex items-center gap-2">↳ <Logo src="/a16z.jpg" alt="a16z" /><Label><a href="https://a16z.com/" target="_blank" rel="noreferrer" className="hover-underline-nudge">a16z</a></Label></div>
            <div className="flex items-center gap-2">↳ <Logo src="/speedrun.jpg" alt="a16z speedrun" /><Label><a href="https://speedrun.a16z.com/" target="_blank" rel="noreferrer" className="hover-underline-nudge">a16z speedrun</a></Label></div>
            <div className="flex items-center gap-2">↳ <Logo src="/finc.jpg" alt="Founders Inc." /><Label><a href="https://f.inc/" target="_blank" rel="noreferrer" className="hover-underline-nudge">Founders Inc.</a></Label></div>
            <div className="flex items-center gap-2">↳ <Logo src="/zfellows.jpg" alt="Z Fellows" /><Label><a href="https://www.zfellows.com/" target="_blank" rel="noreferrer" className="hover-underline-nudge">Z Fellows</a></Label></div>
            <div className="flex items-center gap-2">↳ <Logo src="/EF.png" alt="Entrepreneurs First" /><Label><a href="https://www.joinef.com/" target="_blank" rel="noreferrer" className="hover-underline-nudge">Entrepreneurs First</a></Label></div>
            <div className="flex items-center gap-2">↳ <Logo src="/afore.png" alt="Afore Capital" /><Label><a href="https://www.afore.vc/" target="_blank" rel="noreferrer" className="hover-underline-nudge">Afore Capital</a></Label></div>
            <div className="flex items-center gap-2">↳ <Logo src="/radical.webp" alt="Radical Ventures" /><Label><a href="https://radical.vc/" target="_blank" rel="noreferrer" className="hover-underline-nudge">Radical Ventures</a></Label></div>
            <div className="flex items-center gap-2">↳ <Logo src="/pear.jpg" alt="Pear VC" /><Label><a href="https://pear.vc/" target="_blank" rel="noreferrer" className="hover-underline-nudge">Pear VC</a></Label></div>
            <div className="flex items-center gap-2">↳ <Logo src="/index ventures.jpg" alt="Index Ventures" /><Label><a href="https://www.indexventures.com/" target="_blank" rel="noreferrer" className="hover-underline-nudge">Index Ventures</a></Label></div>
            <div className="flex items-center gap-2">↳ <Logo src="/crv.png" alt="CRV" /><Label><a href="https://www.crv.com/" target="_blank" rel="noreferrer" className="hover-underline-nudge">CRV</a></Label></div>
            <div className="flex items-center gap-2">↳ <Logo src="/moxxie.jpg" alt="Moxxie Ventures" /><Label><a href="https://www.moxxie.vc/" target="_blank" rel="noreferrer" className="hover-underline-nudge">Moxxie Ventures</a></Label></div>
            <div className="flex items-center gap-2">↳ <Logo src="/goldenventures.jpg" alt="Golden Ventures" /><Label><a href="https://www.golden.ventures/" target="_blank" rel="noreferrer" className="hover-underline-nudge">Golden Ventures</a></Label></div>
            <div className="flex items-center gap-2">↳ <Logo src="/nexus ventures.jpg" alt="Nexus Ventures" /><Label><a href="https://nexusvp.com/" target="_blank" rel="noreferrer" className="hover-underline-nudge">Nexus Ventures</a></Label></div>
            <div className="flex items-center gap-2">↳ <Logo src="/panache.jpg" alt="Panache Ventures" /><Label><a href="https://www.panache.vc/" target="_blank" rel="noreferrer" className="hover-underline-nudge">Panache Ventures</a></Label></div>
            <div className="flex items-center gap-2">↳ <Logo src="/frontrow.jpg" alt="Front Row Ventures" /><Label><a href="https://frontrow.ventures/" target="_blank" rel="noreferrer" className="hover-underline-nudge">Front Row Ventures</a></Label></div>
            <div className="flex items-center gap-2">↳ <Logo src="/rippleventures.jpg" alt="Ripple Ventures" /><Label><a href="https://rippleventures.com/" target="_blank" rel="noreferrer" className="hover-underline-nudge">Ripple Ventures</a></Label></div>
          </div>
        </div>

        <div className="my-3 border-t border-neutral-200" />

        {/* Reach out */}
        <div className="text-sm sm:text-[0.95rem] leading-tight space-y-2">
          <div>◆ Please reach out if you’re:</div>
          <div>↳ A mortgage broker/loan officer</div>
          <div>↳ A founder</div>
          <div>↳ A VC</div>
          <div>↳ Someone who is curious about me or what I'm doing</div>
        </div>

        <div className="my-3 border-t border-neutral-200" />

        {/* Contact */}
        <div className="text-sm sm:text-[0.95rem] leading-tight">
          <div className="pt-4" />
          <footer className="pb-16 sm:pb-24">
            <div>◆ Contact:</div>
            <div className="mt-2 flex items-center gap-3 text-neutral-700">
              <a className="inline-flex items-center gap-1" href="mailto:lance.yan.business@gmail.com"><Mail size={14} /><span className="hover-underline-nudge">Email</span></a>
              <a className="inline-flex items-center gap-1" href="https://github.com/lance116" target="_blank" rel="noreferrer"><Github size={14} /><span className="hover-underline-nudge">GitHub</span></a>
              <a className="inline-flex items-center gap-1" href="https://x.com/cnnguan/" target="_blank" rel="noreferrer"><Logo src="/X.png" alt="X" /><span className="hover-underline-nudge">Twitter</span></a>
              <a className="inline-flex items-center gap-1" href="https://www.linkedin.com/in/lance-yan/" target="_blank" rel="noreferrer"><Logo src="/linkedin.webp" alt="LinkedIn" /><span className="hover-underline-nudge">LinkedIn</span></a>
            </div>
          </footer>
        </div>
      </div>
    </main>
  );
}
