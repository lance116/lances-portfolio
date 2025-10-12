'use client';

import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { useNavigationBounce } from "../../../lib/useNavigationBounce";

// Map of photo IDs to actual filenames, dimensions, and captions
const photoMap: Record<string, { filename: string; width: number; height: number; caption: string }> = {
  "pic1": { filename: "pic1.png", width: 1530, height: 1018, caption: "Downtown Vancouver." },
  "pic2": { filename: "pic2.png", width: 1526, height: 1014, caption: "Downtown Vancouver, Tiffany store." },
  "pic3": { filename: "pic3.png", width: 2074, height: 1020, caption: "Downtown Vancouver." },
  "pic4": { filename: "pic4.png", width: 1416, height: 1016, caption: "Vancouver skytrain." },
  "pic5": { filename: "pic5.png", width: 1534, height: 1018, caption: "Toronto Museum." },
  "pic6": { filename: "pic6.png", width: 1532, height: 1018, caption: "Yonge-Dundas Square in Toronto." },
  "pic7": { filename: "pic7.png", width: 1242, height: 1016, caption: "Burnaby, BC, Canada." },
  "pic8": { filename: "pic8.png", width: 1530, height: 1022, caption: "Langley, BC, Canada." },
  "pic9": { filename: "pic9.png", width: 1526, height: 1014, caption: "Seawall, Vancouver." },
  "pic10": { filename: "pic10.png", width: 706, height: 1018, caption: "Downtown Vancouver." },
  "pic11": { filename: "pic11.png", width: 672, height: 1014, caption: "Downtown Vancouver." }
};

interface PhotoPageProps {
  params: {
    id: string;
  };
}

export default function PhotoPage({ params }: PhotoPageProps) {
  const { shouldBounce } = useNavigationBounce('photography');
  const photoData = photoMap[params.id];

  if (!photoData) {
    notFound();
  }

  const photoIndex = Object.keys(photoMap).indexOf(params.id) + 1;

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
              <a href="/about" className={`hover-underline-nudge ${shouldBounce('about') ? 'nav-bounce' : ''}`}>About me</a>
            </div>
          </div>
          <div>↳ {photoData.caption}</div>
        </div>

        <div className="my-6 border-t border-neutral-200" />

        {/* Photo Display */}
        <div className="relative">
          <div className="relative overflow-hidden rounded-lg border border-neutral-200">
            <div style={{ aspectRatio: photoData.width / photoData.height }}>
              <Image
                src={`/${photoData.filename}`}
                alt={`Photo ${photoIndex}`}
                width={photoData.width}
                height={photoData.height}
                className="object-contain"
                sizes="100vw"
                priority
              />
            </div>
          </div>
        </div>

        <div className="my-6 border-t border-neutral-200" />

        {/* Navigation */}
        <div className="text-sm sm:text-[0.95rem] leading-tight space-y-2">
          <div className="flex items-center gap-4">
            <a href="/photography" className="hover-underline-nudge font-extralight">
              ← Back to gallery
            </a>
            <span className="text-neutral-400">|</span>
            <a href="/" className="hover-underline-nudge font-extralight">
              ← Back to home
            </a>
          </div>
        </div>

        <div className="pt-16 sm:pt-24" />
      </div>
    </main>
  );
}
