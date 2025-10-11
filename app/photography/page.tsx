'use client';

import Image from "next/image";
import Link from "next/link";
import { Mail, Github } from "lucide-react";
import { useNavigationBounce } from "../../lib/useNavigationBounce";

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

// Photography images with their actual dimensions
const photographyImages = [
  { filename: "pic1.png", width: 1530, height: 1018 },
  { filename: "pic2.png", width: 1526, height: 1014 },
  { filename: "pic4.png", width: 1416, height: 1016 },
  { filename: "pic5.png", width: 1534, height: 1018 },
  { filename: "pic6.png", width: 1532, height: 1018 },
  { filename: "pic7.png", width: 1242, height: 1016 },
  { filename: "pic8.png", width: 1530, height: 1022 },
  { filename: "pic9.png", width: 1526, height: 1014 },
  { filename: "pic10.png", width: 706, height: 1018 },
  { filename: "pic11.png", width: 672, height: 1014 },
  { filename: "pic3.png", width: 2074, height: 1020 } // Moved to bottom as the wide photo
];

export default function Photography() {
  const { shouldBounce } = useNavigationBounce('photography');

  return (
    <main className="relative">
      <div className="relative z-10 mx-auto max-w-screen-sm px-4 sm:px-0">
        <div className="pt-16 sm:pt-24" />

        {/* Header */}
        <div className="text-sm sm:text-[0.95rem] leading-tight space-y-2">
          <div className="flex items-center justify-between">
            <h1 className="underline underline-offset-[3px] font-extralight">◆ Photography</h1>
            <div className="flex items-center gap-2 font-extralight">
              <a href="/" className={`hover-underline-nudge ${shouldBounce('home') ? 'nav-bounce' : ''}`}>Home</a>
              <span className="text-neutral-400">|</span>
              <a href="/about" className={`hover-underline-nudge ${shouldBounce('about') ? 'nav-bounce-delayed' : ''}`}>About me</a>
            </div>
          </div>
          <div>↳ A collection of my favorite photos.</div>
        </div>

        <div className="my-6 border-t border-neutral-200" />

        {/* Photo Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {photographyImages.map((image, index) => {
            const photoId = image.filename.replace('.png', '');
            const aspectRatio = image.width / image.height;
            // For the last photo in a 2-column grid, center it
            const isLastPhoto = index === photographyImages.length - 1;
            const isOddTotal = photographyImages.length % 2 === 1;
            
            return (
              <Link 
                key={index} 
                href={`/photography/${photoId}`}
                className={`cursor-pointer ${isLastPhoto && isOddTotal ? 'sm:col-span-2' : ''}`}
              >
                <div className="relative overflow-hidden rounded-lg border border-neutral-200 photo-hover">
                  <div style={{ aspectRatio: aspectRatio }}>
                    <Image
                      src={`/${image.filename}`}
                      alt={`Photo ${index + 1}`}
                      width={image.width}
                      height={image.height}
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, 50vw"
                    />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="my-6 border-t border-neutral-200" />

        {/* Back to Home */}
        <div className="text-sm sm:text-[0.95rem] leading-tight my-6">
          <a href="/" className="hover-underline-nudge font-extralight">
            ← Back to home
          </a>
        </div>

        <div className="my-6 border-t border-neutral-200" />

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
