'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { RefreshCw } from 'lucide-react';
import { AsciiDither } from '@/components/ascii-dither';

function Logo({ src, alt }: { src: string; alt: string }) {
  return (
    <span className="inline-flex items-center align-middle relative -top-[2px] mr-1">
      <Image
        src={src}
        alt={alt}
        width={20}
        height={20}
        sizes="20px"
        quality={100}
        className="h-[16px] w-[16px] sm:h-[18px] sm:w-[18px] object-contain align-middle"
      />
    </span>
  );
}

export default function Home() {
  const [videoSrc, setVideoSrc] = useState('/butterfly.mp4');

  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  return (
    <main className="fixed inset-0 bg-white text-neutral-800 overflow-hidden">
      <div className="h-full flex flex-col sm:flex-row" style={{ fontFamily: 'var(--font-serif), Georgia, serif' }}>
        {/* Butterfly left — full height */}
        <div className="w-full sm:w-[58%] h-[50vh] sm:h-full overflow-hidden relative">
          <AsciiDither
            src={videoSrc}
            cols={200}
            color="source"
            threshold={0.22}
            fill
            borderRight
            className="w-full h-full"
          />
          <button
            onClick={() => setVideoSrc('/fish 2.mov')}
            className="absolute top-4 right-4 p-1.5 text-neutral-400 hover:text-neutral-800 transition-colors"
            aria-label="Switch video"
          >
            <RefreshCw size={14} />
          </button>
        </div>

        {/* Text right */}
        <div className="w-full sm:w-[42%] flex items-center justify-center">
          <div className="px-8 sm:px-12 lg:px-16 py-16 sm:py-24 sm:w-[800px] sm:min-w-[800px] sm:flex-shrink-0 sm:-translate-x-[170px]">
            <h1 className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-8">Lance Yan</h1>

            <div className="space-y-6 text-base sm:text-lg leading-relaxed text-neutral-600">
              <p>
                I&apos;m the co-founder and CEO of{' '}
                <Logo src="/traversing logo.png" alt="Traverse" />
                <a href="https://traverse.so" target="_blank" rel="noreferrer" className="text-neutral-900 underline underline-offset-4 decoration-neutral-300 hover:decoration-neutral-900 transition-colors">Traverse</a>.
                We&apos;re backed by{' '}
                <Logo src="/YClogo.png" alt="Y Combinator" />
                <a href="https://www.ycombinator.com/companies/clice-ai" target="_blank" rel="noreferrer" className="text-neutral-900 underline underline-offset-4 decoration-neutral-300 hover:decoration-neutral-900 transition-colors">Y Combinator</a>
                {' '}with angels from{' '}
                <Logo src="/OAI.webp" alt="OpenAI" />OpenAI,{' '}
                <Logo src="/GDM.png" alt="Google DeepMind" />Google DeepMind,{' '}
                <Logo src="/AN.png" alt="Anthropic" />Anthropic, and{' '}
                <Logo src="/meta icon.png" alt="Meta" />Meta.
              </p>

              <p>
                Previously, I studied CS at{' '}
                <Logo src="/waterloo-logo.png" alt="UWaterloo" />UWaterloo — dropped out first semester. I had very brief stints as a builder/SWE at{' '}
                <Logo src="/kalshi logo.png" alt="Kalshi" />
                <a href="https://kalshi.com" target="_blank" rel="noreferrer" className="text-neutral-900 underline underline-offset-4 decoration-neutral-300 hover:decoration-neutral-900 transition-colors">Kalshi</a>,
                founding engineer at a{' '}
                <Logo src="/stealth logo.png" alt="Stealth" />stealth startup, and led 12 ML engineers at{' '}
                <Logo src="/wat.jpeg" alt="wat.ai" />
                <a href="https://watai.ca" target="_blank" rel="noreferrer" className="text-neutral-900 underline underline-offset-4 decoration-neutral-300 hover:decoration-neutral-900 transition-colors">wat.ai</a>.
              </p>

              <p>
                We&apos;re building an applied data research lab that partners with frontier AI labs to produce the training data required for models to develop taste and judgment.
              </p>
            </div>

            <div className="mt-12 text-sm text-neutral-500 space-x-6">
              <a href="https://x.com/lanceyyan/" target="_blank" rel="noreferrer" className="underline underline-offset-4 hover:text-neutral-800 transition-colors">x</a>
              <a href="https://www.linkedin.com/in/lance-yan/" target="_blank" rel="noreferrer" className="underline underline-offset-4 hover:text-neutral-800 transition-colors">linkedin</a>
              <a href="mailto:lance.yan.business@gmail.com" className="underline underline-offset-4 hover:text-neutral-800 transition-colors">email</a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
