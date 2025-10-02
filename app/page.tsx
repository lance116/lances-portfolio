import Image from "next/image";
import { Mail, Github, Twitter, Linkedin } from "lucide-react";

function Logo({ src, alt, size = 18 }: { src: string; alt: string; size?: number }) {
  return (
    <span className="inline-flex items-center">
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
          <div>↳ CS @ <span className="inline-flex items-center gap-1"><Logo src="/waterloo-logo.png" alt="UWaterloo" /><span>UWaterloo</span></span></div>
          <div>↳ Building Clice, the worlds first agentic CRM for mortgage brokers and loan officers</div>
        </div>

        <div className="my-3 border-t border-neutral-200" />

        {/* Track Record */}
        <div className="text-sm sm:text-[0.95rem] leading-tight space-y-2">
          <div>◆ Track Record:</div>
          <div>↳ The <span className="font-semibold italic">youngest</span> and <span className="font-semibold italic">fastest</span> ever in <span className="inline-flex items-center gap-1"><Logo src="/waterloo-logo.png" alt="UWaterloo" /><span>UWaterloo</span></span>’s <span className="font-semibold italic">entire history</span> to get flown out to San Francisco to raise venture.</div>
          <div>↳ Turned down full time interest at <span className="font-semibold italic">$300K</span> a year, and full-time interest at <span className="inline-flex items-center gap-1"><Logo src="/icon.jpg" alt="Icon" /><span>Icon</span></span> ($12M domain, $5M ARR) to build Clice.</div>
          <div>↳ Did 3 <span className="font-semibold italic">highschool</span> software engineering internships.</div>
          <div>↳ Software engineer at the <span className="font-semibold italic">most selective</span> team in UWaterloo’s AI org, <span className="inline-flex items-center gap-1"><Logo src="/wat.jpeg" alt="wat.ai" /><span>wat.ai</span></span>.</div>
          <div>↳ Programming since <span className="font-semibold italic">age 5</span>, entrepreneur since <span className="font-semibold italic">age 11</span>.</div>
          <div>↳ Mentored by <span className="font-semibold italic">a lot</span> of cool people. Including founders from <span className="inline-flex items-center gap-1"><Logo src="/YClogo.png" alt="YC" /><span>YC</span></span>, <span className="inline-flex items-center gap-1"><Logo src="/speedrun.jpg" alt="speedrun" /><span>speedrun</span></span>, <span className="inline-flex items-center gap-1"><Logo src="/zfellows.jpg" alt="Z Fellows" /><span>Z Fellows</span></span> and <span className="inline-flex items-center gap-1"><Logo src="/thielfellow.png" alt="Thiel Fellows" /><span>Thiel Fellows</span></span>.</div>
          <div>↳ <span className="font-semibold italic">1200+</span> followers on 𝕏 with posts totaling <span className="font-semibold italic">600K+</span> views.</div>
        </div>

        <div className="my-3 border-t border-neutral-200" />

        {/* Building */}
        <div className="text-sm sm:text-[0.95rem] leading-tight space-y-2">
          <div>◆ Building:</div>
          <div>↳ The worlds first agentic CRM for mortgage brokers/loan officers.</div>
          <div>↳ Potentially 1000+ mortgage brokers/loan officers are interested.</div>
          <div>↳ Loan officers who make $1M+ have told me: “I would pay thousands a month for this.”</div>
        </div>

        <div className="my-3 border-t border-neutral-200" />

        {/* Currently */}
        <div className="text-sm sm:text-[0.95rem] leading-tight space-y-2">
          <div>◆ Currently:</div>
          <div>↳ Raising preseed (looking for ~$400K)</div>
          <div>↳ Interest from:</div>
          <div className="ml-4 space-y-1">
            <div className="flex items-center gap-2">↳ <Logo src="/YClogo.png" alt="Y Combinator" /><span>Y Combinator</span></div>
            <div className="flex items-center gap-2">↳ <Logo src="/a16z.jpg" alt="a16z" /><span>a16z</span></div>
            <div className="flex items-center gap-2">↳ <Logo src="/speedrun.jpg" alt="a16z speedrun" /><span>a16z speedrun</span></div>
            <div className="flex items-center gap-2">↳ <Logo src="/finc.jpg" alt="Founders Inc." /><span>Founders Inc.</span></div>
            <div className="flex items-center gap-2">↳ <Logo src="/zfellows.jpg" alt="Z Fellows" /><span>Z Fellows</span></div>
            <div className="flex items-center gap-2">↳ <Logo src="/EF.png" alt="Entrepreneurs First" /><span>Entrepreneurs First</span></div>
            <div className="flex items-center gap-2">↳ <Logo src="/afore.png" alt="Afore Capital" /><span>Afore Capital</span></div>
            <div className="flex items-center gap-2">↳ <Logo src="/radical.webp" alt="Radical Ventures" /><span>Radical Ventures</span></div>
            <div className="flex items-center gap-2">↳ <Logo src="/pear.jpg" alt="Pear VC" /><span>Pear VC</span></div>
            <div className="flex items-center gap-2">↳ <Logo src="/index ventures.jpg" alt="Index Ventures" /><span>Index Ventures</span></div>
            <div className="flex items-center gap-2">↳ <Logo src="/crv.png" alt="CRV" /><span>CRV</span></div>
            <div className="flex items-center gap-2">↳ <Logo src="/moxxie.jpg" alt="Moxxie Ventures" /><span>Moxxie Ventures</span></div>
            <div className="flex items-center gap-2">↳ <Logo src="/goldenventures.jpg" alt="Golden Ventures" /><span>Golden Ventures</span></div>
            <div className="flex items-center gap-2">↳ <Logo src="/nexus ventures.jpg" alt="Nexus Ventures" /><span>Nexus Ventures</span></div>
            <div className="flex items-center gap-2">↳ <Logo src="/panache.jpg" alt="Panache Ventures" /><span>Panache Ventures</span></div>
            <div className="flex items-center gap-2">↳ <Logo src="/frontrow.jpg" alt="Front Row Ventures" /><span>Front Row Ventures</span></div>
            <div className="flex items-center gap-2">↳ <Logo src="/rippleventures.jpg" alt="Ripple Ventures" /><span>Ripple Ventures</span></div>
          </div>
        </div>

        <div className="my-3 border-t border-neutral-200" />

        {/* Reach out */}
        <div className="text-sm sm:text-[0.95rem] leading-tight space-y-2">
          <div>◆ Reach out if you’re:</div>
          <div>↳ A mortgage broker/loan officer</div>
          <div>↳ A founder</div>
          <div>↳ A VC</div>
          <div>↳ Someone curious in what I’m doing</div>
        </div>

        <div className="my-3 border-t border-neutral-200" />

        {/* Contact */}
        <div className="pt-4" />
        <footer className="pb-16 sm:pb-24 text-sm text-neutral-700">
          <div>◆ Contact:</div>
          <div className="mt-2 flex items-center gap-4 text-neutral-700">
            <a className="link-minimal inline-flex items-center gap-1" href="mailto:lance.yan.business@gmail.com"><Mail size={14} /> Email</a>
            <a className="link-minimal inline-flex items-center gap-1" href="https://github.com/lance116" target="_blank" rel="noreferrer"><Github size={14} /> GitHub</a>
            <a className="link-minimal inline-flex items-center gap-1" href="https://x.com/cnnguan/" target="_blank" rel="noreferrer">Twitter</a>
            <a className="link-minimal inline-flex items-center gap-1" href="https://www.linkedin.com/in/lance-yan/" target="_blank" rel="noreferrer"><Linkedin size={14} /> LinkedIn</a>
          </div>
        </footer>
      </div>
    </main>
  );
}
