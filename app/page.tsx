'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { RefreshCw } from 'lucide-react';
import { AsciiDither } from '@/components/ascii-dither';

function Logo({ src, alt, invert = false }: { src: string; alt: string; invert?: boolean }) {
  return (
    <span className="inline-flex items-center align-middle relative -top-[2px] mr-1">
      <Image
        src={src}
        alt={alt}
        width={20}
        height={20}
        sizes="20px"
        quality={100}
        style={invert ? { filter: 'invert(1)' } : undefined}
        className="h-[16px] w-[16px] sm:h-[18px] sm:w-[18px] object-contain align-middle"
      />
    </span>
  );
}

function BioContent({ dark, onSwitch }: { dark: boolean; onSwitch: () => void }) {
  const linkClass = dark
    ? 'text-white underline underline-offset-4 decoration-white/40 hover:decoration-white transition-colors'
    : 'text-neutral-900 underline underline-offset-4 decoration-neutral-300 hover:decoration-neutral-900 transition-colors';
  const headingColor = dark ? 'text-white' : 'text-neutral-900';
  const bodyColor = dark ? 'text-white/80' : 'text-neutral-600';
  const footerColor = dark ? 'text-white/60' : 'text-neutral-500';
  const footerLink = dark
    ? 'underline underline-offset-4 hover:text-white transition-colors'
    : 'underline underline-offset-4 hover:text-neutral-800 transition-colors';

  return (
    <>
      <h1 className={`text-3xl sm:text-4xl font-bold mb-8 ${headingColor} flex items-center gap-3`}>
        <span>Lance Yan</span>
        <button
          onClick={onSwitch}
          className={`p-1.5 transition-colors ${dark ? 'text-white/50 hover:text-white' : 'text-neutral-400 hover:text-neutral-800'}`}
          aria-label="Switch background"
        >
          <RefreshCw size={16} />
        </button>
      </h1>

      <div className={`space-y-6 text-base sm:text-lg leading-relaxed ${bodyColor}`}>
        <p>
          I&apos;m the co-founder and CEO of{' '}
          <Logo src="/traversing logo.png" alt="Traverse" />
          <a href="https://traverse.so" target="_blank" rel="noreferrer" className={linkClass}>Traverse</a>.
          We&apos;re backed by{' '}
          <Logo src="/YClogo.png" alt="Y Combinator" />
          <a href="https://www.ycombinator.com/companies/clice-ai" target="_blank" rel="noreferrer" className={linkClass}>Y Combinator</a>
          {' '}with angels from{' '}
          <Logo src="/OAI.webp" alt="OpenAI" invert={dark} />OpenAI,{' '}
          <Logo src="/GDM.png" alt="Google DeepMind" />Google DeepMind,{' '}
          <Logo src="/AN.png" alt="Anthropic" invert={dark} />Anthropic, and{' '}
          <Logo src="/meta icon.png" alt="Meta" />Meta.
        </p>

        <p>
          Previously, I studied CS at{' '}
          <Logo src="/waterloo-logo.png" alt="UWaterloo" />UWaterloo — dropped out first semester. I had very brief stints as a builder/SWE at{' '}
          <Logo src="/kalshi logo.png" alt="Kalshi" />
          <a href="https://kalshi.com" target="_blank" rel="noreferrer" className={linkClass}>Kalshi</a>,
          founding engineer at a{' '}
          <Logo src="/stealth logo.png" alt="Stealth" />stealth startup, and led 12 ML engineers at{' '}
          <Logo src="/wat.jpeg" alt="wat.ai" />
          <a href="https://watai.ca" target="_blank" rel="noreferrer" className={linkClass}>wat.ai</a>.
        </p>

        <p>
          We&apos;re building an applied data research lab that partners with frontier AI labs to produce the training data required for models to develop taste and judgment.
        </p>
      </div>

      <div className={`mt-12 text-sm space-x-6 ${footerColor}`}>
        <a href="https://x.com/lanceyyan/" target="_blank" rel="noreferrer" className={footerLink}>x</a>
        <a href="https://www.linkedin.com/in/lance-yan/" target="_blank" rel="noreferrer" className={footerLink}>linkedin</a>
        <a href="mailto:lance.yan.business@gmail.com" className={footerLink}>email</a>
      </div>
    </>
  );
}

export default function Home() {
  const [mode, setMode] = useState<'butterfly' | 'fish'>('butterfly');
  const [fading, setFading] = useState(false);
  const [isNarrow, setIsNarrow] = useState(false);
  const isFish = mode === 'fish';

  useEffect(() => {
    document.documentElement.classList.add('dark');
    const check = () => setIsNarrow(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const handleSwitch = () => {
    setFading(true);
    setTimeout(() => {
      setMode(mode === 'butterfly' ? 'fish' : 'butterfly');
      setFading(false);
    }, 400);
  };

  if (isFish) {
    return (
      <main className="fixed inset-0 bg-black text-white overflow-hidden transition-opacity duration-500" style={{ opacity: fading ? 0 : 1 }}>
        <div className="absolute inset-0 z-0">
          <AsciiDither
            src={['/fish3.mp4', '/fish4.mp4', '/fish2.mp4']}
            cols={180}
            color="source"
            threshold={0.08}
            saturation={2}
            fill
            invert
            darkMode
            binarySize
            className="w-full h-full"
          />
        </div>
        <div className="absolute inset-0 z-10 flex items-center justify-center px-6 sm:px-12 overflow-y-auto" style={{ fontFamily: 'var(--font-serif), Georgia, serif' }}>
          <div className="max-w-[640px] py-16">
            <BioContent dark onSwitch={handleSwitch} />
          </div>
        </div>
      </main>
    );
  }

  if (isNarrow) {
    return (
      <main className="fixed inset-0 bg-white text-neutral-800 overflow-hidden transition-opacity duration-500" style={{ opacity: fading ? 0 : 1 }}>
        <div className="absolute inset-0 z-0">
          <AsciiDither
            src="/butterfly.mp4"
            cols={140}
            color="source"
            threshold={0.22}
            fill
            cover
            loopPauseMs={400}
            className="w-full h-full"
          />
        </div>
        <div className="absolute inset-0 z-10 flex items-center justify-center px-6 overflow-y-auto" style={{ fontFamily: 'var(--font-serif), Georgia, serif' }}>
          <div className="max-w-[560px] py-12 bg-white/85 backdrop-blur-sm rounded-lg p-6 my-8">
            <BioContent dark={false} onSwitch={handleSwitch} />
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="fixed inset-0 bg-white text-neutral-800 overflow-hidden transition-opacity duration-500" style={{ opacity: fading ? 0 : 1 }}>
      <div className="h-full flex flex-row" style={{ fontFamily: 'var(--font-serif), Georgia, serif' }}>
        {/* Butterfly left — full height */}
        <div className="w-[58%] h-full overflow-hidden relative">
          <AsciiDither
            src="/butterfly.mp4"
            cols={200}
            color="source"
            threshold={0.22}
            fill
            borderRight
            loopPauseMs={400}
            className="w-full h-full"
          />
        </div>

        {/* Text right */}
        <div className="w-[42%] flex items-center justify-center">
          <div className="px-8 sm:px-12 lg:px-16 py-16 sm:py-24 w-[800px] min-w-[800px] flex-shrink-0 -translate-x-[170px]">
            <BioContent dark={false} onSwitch={handleSwitch} />
          </div>
        </div>
      </div>
    </main>
  );
}
