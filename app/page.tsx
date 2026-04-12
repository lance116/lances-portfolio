'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { RefreshCw, ChevronDown } from 'lucide-react';
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

type BioVariant = 'intro' | 'about' | 'books';
type Mode = 'butterfly' | 'fish' | 'orchids';

type TimelineItem = { label: string; title: string; detail: string };

const timelineItems: TimelineItem[] = [
  {
    label: 'Age 18',
    title: 'Founded Traverse. Got into Y Combinator.',
    detail: 'Traverse is an applied data research lab. Backed by Y Combinator with angels from OpenAI, Google DeepMind, Anthropic, and Meta.',
  },
  {
    label: 'Age 18',
    title: 'Started CS at UWaterloo, dropped out after 2 months.',
    detail: 'Four weeks in I was fielding VC offers. I realized chasing them was self-interest, not what the company needed. Left to focus on Traverse full-time.',
  },
  {
    label: 'Age 18',
    title: 'Graduated valedictorian.',
    detail: 'Finished high school at 99.2% and gave the valedictory address.',
  },
  {
    label: 'Age 16',
    title: 'Started my second business.',
    detail: 'Built it over two back-to-back all-nighters. Ships faster when I don\u2019t sleep.',
  },
  {
    label: 'Age 13',
    title: 'Started high school. Got into psychology and philosophy.',
    detail: 'First time school felt like something I actually cared about. Ran clubs, organizations, anything where I could call the shots.',
  },
  {
    label: 'Age 12',
    title: 'Started my first business.',
    detail: 'First real attempt to make and sell something. Learned more from it failing than most things I\u2019ve done since.',
  },
  {
    label: 'Age 7',
    title: 'Joined orchestra on cello.',
    detail: 'Played competitively through most of my childhood. More hours on it than I want to count.',
  },
  {
    label: 'Age 6',
    title: 'Started coding; built a Minecraft mod.',
    detail: 'Built a mod, led Minecraft guilds, quit after a year. First time I shipped something other people used.',
  },
  {
    label: 'Age 5',
    title: 'Started cello and badminton.',
    detail: 'Didn\u2019t pick either. Got competitive fast anyway.',
  },
  {
    label: 'Age 3',
    title: 'Moved from China to Canada.',
    detail: 'My mom worked as a cashier at the dollar store. My dad drove a taxi.',
  },
  {
    label: 'Born',
    title: 'Beijing, China.',
    detail: 'First-generation immigrant kid.',
  },
];

function BioContent({ dark, onSwitch, onNavigate, variant = 'intro' }: { dark: boolean; onSwitch: () => void; onNavigate?: (m: Mode) => void; variant?: BioVariant }) {
  const [openTimelineIdx, setOpenTimelineIdx] = useState<number | null>(null);
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
        {variant === 'intro' && (
          <>
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
              <Logo src="/waterloo-logo.png" alt="UWaterloo" />UWaterloo and dropped out after 2 months. I was a builder/software engineer at{' '}
              <Logo src="/kalshi logo.png" alt="Kalshi" />
              <a href="https://kalshi.com" target="_blank" rel="noreferrer" className={linkClass}>Kalshi</a>, founding engineer at the{' '}
              <Logo src="/stealth logo.png" alt="Stealth Startup" />Stealth Startup, and led 12 ML engineers at{' '}
              <Logo src="/wat.jpeg" alt="wat.ai" />
              <a href="https://watai.ca" target="_blank" rel="noreferrer" className={linkClass}>wat.ai</a>.
            </p>

            <p>
              My{' '}
              <button
                type="button"
                onClick={() => onNavigate?.('fish')}
                className={`${linkClass} cursor-pointer`}
                style={{ background: 'none', border: 'none', padding: 0, font: 'inherit' }}
              >
                life&apos;s goal
              </button>
              {' '}is to advance humanity towards a cyberpunk, intergalactic civilization. I also love{' '}
              <button
                type="button"
                onClick={() => onNavigate?.('orchids')}
                className={`${linkClass} cursor-pointer`}
                style={{ background: 'none', border: 'none', padding: 0, font: 'inherit' }}
              >
                reading
              </button>
              .
            </p>
          </>
        )}

        {variant === 'about' && (
          <>
            <p>
              I&apos;ve done a bit so far. Here&apos;s a rough timeline:
            </p>

            <ul className={`list-none pl-0 divide-y ${dark ? 'divide-white/10' : 'divide-black/10'}`}>
              {timelineItems.map((item, i) => {
                const isOpen = openTimelineIdx === i;
                return (
                  <li key={i}>
                    <button
                      type="button"
                      onClick={() => setOpenTimelineIdx(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      className="w-full text-left flex items-start gap-0 py-3 cursor-pointer"
                    >
                      <span className="tabular-nums opacity-60 inline-block w-16 shrink-0">{item.label}</span>
                      <span className="flex-1 pr-2">{item.title}</span>
                      <ChevronDown
                        size={18}
                        className={`mt-[2px] opacity-60 transition-transform duration-200 shrink-0 ${isOpen ? 'rotate-180' : ''}`}
                      />
                    </button>
                    {isOpen && (
                      <div className="pl-16 pr-6 pb-3 -mt-1 text-sm sm:text-base opacity-75">
                        {item.detail}
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </>
        )}

        {variant === 'books' && (
          <>
            <p>
              I&apos;ve been reading a lot lately. Some books I&apos;ve read or am on:
            </p>

            <ul className="list-disc pl-5 space-y-1 marker:text-current/50">
              <li>Meditations — Marcus Aurelius</li>
              <li>Zero to One — Peter Thiel</li>
              <li>Foundation — Isaac Asimov</li>
              <li>Thinking, Fast and Slow — Daniel Kahneman</li>
              <li>High Output Management — Andy Grove</li>
              <li>The Hard Thing About Hard Things — Ben Horowitz</li>
            </ul>
          </>
        )}
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
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    document.documentElement.classList.add('dark');
    const check = () => setIsNarrow(window.innerWidth < 1024 || window.innerWidth < window.innerHeight);
    check();
    setMounted(true);
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

  const switchTo = (target: 'butterfly' | 'fish' | 'orchids') => {
    if (target === mode) return;
    setFading(true);
    setTimeout(() => {
      setMode(target);
      setFading(false);
    }, 400);
  };

  if (!mounted) {
    const dark = mode === 'fish' || mode === 'orchids';
    return <main className={`min-h-screen ${dark ? 'bg-black' : 'bg-white'}`} />;
  }

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
              batched
              className="w-full h-full"
            />
          </div>
          <div className="flex justify-center px-8 sm:px-12 pt-6 pb-8" style={{ fontFamily: 'var(--font-serif), Georgia, serif' }}>
            <div className="w-full max-w-[400px]">
              <BioContent dark onSwitch={handleSwitch} variant="about" />
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
            <BioContent dark onSwitch={handleSwitch} variant="about" />
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
            <BioContent dark onSwitch={handleSwitch} variant="books" />
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
              playbackRateSchedule={[[0, 1], [25, 0.4]]}
              scale={1.3}
              batched
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
            <BioContent dark onSwitch={handleSwitch} variant="books" />
          </div>
        </div>
      </main>
    );
  }

  if (isNarrow) {
    return (
      <main className="min-h-screen bg-white text-neutral-800 flex flex-col justify-center transition-opacity duration-500" style={{ opacity: fading ? 0 : 1 }}>
        <div className="mx-auto px-6 sm:px-8 pt-8 pb-6 max-w-[480px] sm:max-w-[640px] lg:max-w-[820px] w-full" style={{ fontFamily: 'var(--font-serif), Georgia, serif' }}>
          <BioContent dark={false} onSwitch={handleSwitch} onNavigate={switchTo} />
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
            batched
            className="w-full h-full"
          />
        </div>
      </main>
    );
  }

  return (
    <main className="fixed inset-0 bg-white text-neutral-800 overflow-hidden transition-opacity duration-500" style={{ opacity: fading ? 0 : 1 }}>
      <div className="h-full flex flex-row" style={{ fontFamily: 'var(--font-serif), Georgia, serif' }}>
        {/* Text left — fills remaining space, paragraph centered in it */}
        <div className="flex-1 flex items-center justify-center relative z-10">
          <div className="px-6 py-16 sm:py-24 w-full max-w-[580px]">
            <BioContent dark={false} onSwitch={handleSwitch} onNavigate={switchTo} />
          </div>
        </div>

        {/* Butterfly right — full height, sized to video aspect */}
        <div className="h-full overflow-hidden relative" style={{ width: '35%', borderLeft: '1px solid rgba(0,0,0,0.1)' }}>
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
      </div>
    </main>
  );
}
