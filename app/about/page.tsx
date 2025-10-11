import Image from "next/image";
import { Mail, Github, Twitter, Linkedin } from "lucide-react";

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

export default function About() {
  return (
    <main className="relative">
      <div className="relative z-10 mx-auto max-w-screen-sm px-4 sm:px-0">
        <div className="pt-16 sm:pt-24" />

        {/* Header */}
        <div className="text-sm sm:text-[0.95rem] leading-tight space-y-2">
          <div className="flex items-center justify-between">
            <h1 className="underline underline-offset-[3px] font-extralight">◆ Lance Yan</h1>
            <div className="flex items-center gap-2 font-extralight">
              <a href="/" className="hover-underline-nudge">Home</a>
              <span className="text-neutral-400">|</span>
              <a href="/photography" className="hover-underline-nudge">Photo</a>
            </div>
          </div>
          <div className="whitespace-nowrap">↳ Grew up in <span className="inline-flex items-center align-middle gap-1"><Logo src="/bc flag.png" alt="BC" /><Label>Vancouver</Label></span>, but also live in <span className="inline-flex items-center align-middle gap-1"><Logo src="/ontario flag.png" alt="Ontario" /><Label>Waterloo</Label></span>, <span className="inline-flex items-center align-middle gap-1"><Logo src="/ontario flag.png" alt="Ontario" /><Label>Toronto</Label></span>, and <span className="inline-flex items-center align-middle gap-1"><Logo src="/cali flag.png" alt="California" /><Label>San Francisco</Label></span>.</div>
          <div>↳ Played the Cello since I was 6.</div>
          <div className="ml-4">↳ Played for the <span className="inline-flex items-center align-middle gap-1"><Logo src="/vyso-favicon.png" alt="VYSO" /><Label><a href="https://vyso.com/" target="_blank" rel="noreferrer" className="hover-underline-nudge">Vancouver Youth Symphony Orchestra</a></Label></span> and was the Principal Cellist of the <span className="inline-flex items-center align-middle gap-1"><Logo src="/vam.jpg" alt="VAM" /><Label><a href="https://vancouveracademyofmusic.com/events/vamso-orpheum-series/" target="_blank" rel="noreferrer" className="hover-underline-nudge">Vancouver Academy of Music Symphony Orchestra</a></Label></span>.</div>
          <div className="ml-4">↳ Perfomed at: The <a href="https://vancouvercivictheatres.com/venues/orpheum/" target="_blank" rel="noreferrer" className="hover-underline-nudge">Vancouver Orpheum</a>, the <span className="inline-flex items-center align-middle gap-1"><Logo src="/ubc-logo-edited.jpg" alt="UBC" /><Label><a href="https://www.ubc.ca/" target="_blank" rel="noreferrer" className="hover-underline-nudge">University of British Columbia</a></Label></span>, <span className="inline-flex items-center align-middle gap-1"><Logo src="/capU.jpg" alt="CapU" /><Label><a href="https://www.capilanou.ca/" target="_blank" rel="noreferrer" className="hover-underline-nudge">Capilano University</a></Label></span> and various churches around Vancouver.</div>
          <div>↳ My favorite hobby is 📷 <a href="/photography" className="text-green-700 hover:text-green-900 hover-underline-nudge">photography</a>, favorite sport is <span className="inline-flex items-center align-middle gap-1"><Logo src="/badminton.png" alt="Badminton" /><Label>badminton.</Label></span></div>
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
