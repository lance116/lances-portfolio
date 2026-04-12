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
      <h1 className={`text-2xl sm:text-4xl font-bold mb-5 sm:mb-8 ${headingColor} flex items-center gap-3 sm:gap-4`}>
        <span className="leading-none">Lance Yan</span>
        <button
          onClick={onSwitch}
          className={`p-1 transition-colors flex items-center relative top-[4px] sm:top-[5px] ${dark ? 'text-white/50 hover:text-white' : 'text-neutral-400 hover:text-neutral-800'}`}
          aria-label="Switch background"
        >
          <RefreshCw className="w-[22px] h-[22px] sm:w-[26px] sm:h-[26px]" />
        </button>
      </h1>

      <div className={`space-y-4 sm:space-y-6 text-sm sm:text-lg leading-relaxed ${bodyColor}`}>
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

      <div className={`mt-8 sm:mt-12 text-xs sm:text-sm space-x-6 ${footerColor}`}>
        <a href="https://x.com/lanceyyan/" target="_blank" rel="noreferrer" className={footerLink}>x</a>
        <a href="https://www.linkedin.com/in/lance-yan/" target="_blank" rel="noreferrer" className={footerLink}>linkedin</a>
        <a href="mailto:lance.yan.business@gmail.com" className={footerLink}>email</a>
      </div>
    </>
  );
}

export default function Home() {
  const [mode, setMode] = useState<'butterfly' | 'fish' | 'orchids'>('butterfly');
  const [fading, setFading] = useState(false);
  const [isNarrow, setIsNarrow] = useState(false);

  useEffect(() => {
    document.documentElement.classList.add('dark');
    const check = () => setIsNarrow(window.innerWidth < 1024 || window.innerWidth < window.innerHeight);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    const dark = mode === 'fish' || mode === 'orchids';
    const color = dark ? '#000' : '#fff';
    document.documentElement.style.backgroundColor = color;
    document.body.style.backgroundColor = color;
  }, [mode]);

  const handleSwitch = () => {
    if (mode === 'orchids') {
      setFading(true);
      setTimeout(() => window.location.reload(), 400);
      return;
    }
    setFading(true);
    setTimeout(() => {
      const next = mode === 'butterfly' ? 'fish' : 'orchids';
      setMode(next);
      setFading(false);
    }, 400);
  };

  if (mode === 'fish') {
    if (isNarrow) {
      return (
        <main className="h-[100dvh] overflow-hidden bg-black text-white flex flex-col justify-center transition-opacity duration-500" style={{ opacity: fading ? 0 : 1 }}>
          <div className="w-full overflow-hidden" style={{ aspectRatio: '16 / 9' }}>
            <AsciiDither
              key="fish"
              src={['/fish3.mp4', '/fish4.mp4', '/fish2.mp4']}
              cols={160}
              color="source"
              threshold={0.08}
              saturation={2}
              fill
              cover
              invert
              darkMode
              binarySize
              xOffsetBySrc={['-35%', '40%', '0%']}
              yOffsetBySrc={['15%', '10%', '15%']}
              scale={1.4}
              className="w-full h-full"
            />
          </div>
          <div className="flex justify-center px-8 sm:px-12 pt-6 pb-8" style={{ fontFamily: 'var(--font-serif), Georgia, serif' }}>
            <div className="w-full max-w-[400px]">
              <BioContent dark onSwitch={handleSwitch} />
            </div>
          </div>
        </main>
      );
    }
    return (
      <main className="fixed inset-0 bg-black text-white overflow-hidden transition-opacity duration-500" style={{ opacity: fading ? 0 : 1 }}>
        <div className="absolute inset-0 z-0">
          <AsciiDither
            key="fish"
            src={['/fish3.mp4', '/fish4.mp4', '/fish2.mp4']}
            cols={280}
            color="source"
            threshold={0.08}
            saturation={2}
            fill
            cover
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

  if (mode === 'orchids') {
    if (isNarrow) {
      return (
        <main className="h-[100dvh] overflow-hidden bg-black text-white flex flex-col justify-center transition-opacity duration-500" style={{ opacity: fading ? 0 : 1 }}>
          <div className="px-6 pb-6 mx-auto w-full max-w-[480px]" style={{ fontFamily: 'var(--font-serif), Georgia, serif' }}>
            <BioContent dark onSwitch={handleSwitch} />
          </div>
          <div className="w-full overflow-hidden" style={{ aspectRatio: '16 / 9' }}>
            <AsciiDither
              key="orchids"
              src="/orchids.mp4"
              cols={180}
              color="source"
              threshold={0.2}
              saturation={2}
              fill
              cover
              invert
              darkMode
              binarySize
              pureColor
              loopPauseMs={400}
              scale={1.3}
              className="w-full h-full"
            />
          </div>
        </main>
      );
    }
    return (
      <main className="fixed inset-0 bg-black text-white overflow-hidden transition-opacity duration-500" style={{ opacity: fading ? 0 : 1 }}>
        <div className="absolute inset-0 z-0" style={{ transform: 'translateY(120px)' }}>
          <AsciiDither
            key="orchids"
            src="/orchids.mp4"
            cols={280}
            color="source"
            threshold={0.2}
            saturation={2}
            fill
            cover
            invert
            darkMode
            binarySize
            pureColor
            loopPauseMs={400}
            playbackRateSchedule={[[0, 1], [25, 0.4]]}
            className="w-full h-full"
          />
        </div>
        <div className="absolute inset-0 z-10 flex items-start justify-start overflow-y-auto" style={{ fontFamily: 'var(--font-serif), Georgia, serif', padding: '98px 0 0 114px' }}>
          <div className="max-w-[640px]">
            <BioContent dark onSwitch={handleSwitch} />
          </div>
        </div>
      </main>
    );
  }

  if (isNarrow) {
    return (
      <main className="min-h-screen bg-white text-neutral-800 flex flex-col justify-center transition-opacity duration-500" style={{ opacity: fading ? 0 : 1 }}>
        <div className="mx-auto px-6 sm:px-8 pt-8 pb-6 max-w-[480px] sm:max-w-[640px] lg:max-w-[820px] w-full" style={{ fontFamily: 'var(--font-serif), Georgia, serif' }}>
          <BioContent dark={false} onSwitch={handleSwitch} />
        </div>
        <div className="w-full overflow-hidden" style={{ aspectRatio: '9 / 16' }}>
          <AsciiDither
            src="/butterfly.mp4"
            cols={100}
            color="source"
            threshold={0.22}
            fill
            cover
            loopPauseMs={400}
            offsetYSchedule={[[0, '-20%'], [4.2014, '0%'], [9.4918, '-20%']]}
            className="w-full h-full"
          />
        </div>
      </main>
    );
  }

  return (
    <main className="fixed inset-0 bg-white text-neutral-800 overflow-hidden transition-opacity duration-500" style={{ opacity: fading ? 0 : 1 }}>
      <div className="h-full flex flex-row" style={{ fontFamily: 'var(--font-serif), Georgia, serif' }}>
        {/* Butterfly left — full height, sized to video aspect */}
        <div className="h-full overflow-hidden relative" style={{ width: '35%', borderRight: '1px solid rgba(0,0,0,0.1)' }}>
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

        {/* Text right — fills remaining space, paragraph centered in it */}
        <div className="flex-1 flex items-center justify-center relative z-10">
          <div className="px-6 py-16 sm:py-24 w-full max-w-[580px]">
            <BioContent dark={false} onSwitch={handleSwitch} />
          </div>
        </div>
      </div>
    </main>
  );
}
