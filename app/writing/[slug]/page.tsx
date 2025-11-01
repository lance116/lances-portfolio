'use client';

import Image from "next/image";
import { Mail, Github } from "lucide-react";
import { useNavigationBounce } from "../../../lib/useNavigationBounce";
import { ThemeToggle } from "@/components/theme-toggle";
import { useParams } from "next/navigation";

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

interface EssayContent {
  title: string;
  date: string;
  content: string[];
}

const essays: Record<string, EssayContent> = {
  "floor-in-the-sky": {
    title: "Floor in the Sky",
    date: "2025",
    content: [
      "My high school yearbook quote was something like: \"We're more defined by the bar we set at the bottom than the heights we aim to reach.\"",
      "Everyone has big dreams. Everyone wants to build something significant, make a lot of money, change the world. The dreams are cheap. What actually defines you is your bare minimum. The 'floor' you refuse to go below.",
      "I got 99.2% in high school. Not because I aimed for 99.2%. I aimed for 100% and accepted nothing less. 99% was just what happened when I set the floor that high and hit a few obstacles along the way.",
      "Most people set their floor way too low.",
      "They say they want to build something great, but their floor is \"I'll try my best and see what happens.\" That floor is so low you can trip over it.",
      "If your floor is \"I'll try,\" then when things get hard, you've already succeeded. You tried. It didn't work. Oh well. You met your minimum.",
      "But if your floor is \"this has to work,\" you don't get that out. You have to find a way. There's no acceptable world where you don't solve this problem.",
      "That's the whole game. Your floor determines everything. Not your ceiling.",
      "Because when things get hard, you fall to your floor. That's human nature. When you're tired, stressed, overwhelmed, you revert to your minimum acceptable standard.",
      "Example: when someone botted ratemycompany.ca, my floor wasn't \"well, I built something.\" My floor was \"this has to work correctly.\" So I stayed up for two nights fixing it. Not because I'm particularly disciplined. Because falling below my floor wasn't an option I'd given myself.",
      "I think most people confuse goals with floors. They say \"I want to be successful\" and think that's a standard. But it's not. That's a direction. The floor is: what are you absolutely not willing to accept?",
      "This is why most founders quit too early. They say they want to build something important, but their floor is \"I tried, I learned something.\" So when things get hard, they've already cleared their minimum standard. They can give up or shut down with a clear conscience.",
      "The founders who succeed have a different floor. Not \"I'll try to make this work.\" Just \"this will work.\"",
      "Having a high floor doesn't mean grinding forever on everything. It means being more selective upfront. If your floor is \"this has to matter,\" you can't start ten projects and see what sticks. Each thing you commit to has to clear the bar. So you think harder before you start.",
      "The floor forces better decisions on the front end, not just more effort on the back end.",
      "And the floor has to be about things you control. \"This has to work correctly\" is a floor you can enforce. \"This has to make me rich\" isn't. One is about output quality. The other is about outcomes that depend on factors beyond you.",
      "The useful floors are about standards, not results.",
      "The floor also can't be fake. You can't just decide \"my floor is high now\" and expect it to work. The floor comes from identity, who you actually believe you are. If you see yourself as someone who builds things that matter, being mediocre violates your self-concept. That violation is what enforces the floor. It's automatic.",
      "Which means raising your floor isn't about discipline or motivation. It's about changing who you think you are. If you believe you're the kind of person who ships mediocre things, you will. If you believe you're the kind of person who doesn't, you won't. The floor follows from that.",
      "Most people try to build discipline, force themselves to work hard, maintain motivation. That's exhausting. Motivation is a finite resource. It comes and goes.",
      "It's a lot better to set a floor that does the work for you. Make your minimum standard high enough that you have no choice but to clear it.",
      "This is the difference between people who do exceptional things and people who want to do exceptional things. The first group has set their bare minimum at a level that forces exceptional behavior. The second group has set their bare minimum at comfortable and hopes they'll somehow end up exceptional anyway.",
      "It doesn't work like that.",
      "When you're tired and want to quit, passion doesn't help. Passion is energy. Energy runs out. But a floor is always there. You can be exhausted, frustrated, ready to give up. But if you've set your floor high enough, giving up means falling below it. And you've already decided that's not acceptable.",
      "So you keep going. Not because you feel like it. Because the alternative violates your minimum standard.",
      "Set it high enough, and average becomes impossible. Mediocre becomes unthinkable. Good enough stops being sufficient.",
      "The heights you aim for don't matter if you're willing to settle for less. But if you make settling impossible, you'll find a way to clear the bar you set."
    ]
  }
};

export default function EssayPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const essay = essays[slug];
  const { shouldBounce } = useNavigationBounce('writing');

  if (!essay) {
    return (
      <main className="relative">
        <div className="relative z-10 mx-auto max-w-screen-sm px-4 sm:px-0">
          <div className="pt-16 sm:pt-24" />
          <div className="text-sm sm:text-[0.95rem] leading-tight">
            <p>Essay not found.</p>
            <div className="my-6 border-t border-neutral-200 dark:border-neutral-700" />
            <a href="/writing" className="hover-underline-nudge font-extralight">
              ← Back to writing
            </a>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="relative">
      <div className="relative z-10 mx-auto max-w-screen-sm px-4 sm:px-0">
        <div className="pt-16 sm:pt-24" />

        {/* Header */}
        <div className="text-sm sm:text-[0.95rem] leading-tight space-y-2 essay-header" style={{ opacity: 0, animation: 'fadeInUp 0.5s ease-out forwards' }}>
          <div className="flex items-center justify-between">
            <h1 className="underline underline-offset-[3px] font-extralight">◆ {essay.title}</h1>
            <div className="flex items-center gap-2 font-extralight">
              <a href="/" className={`hover-underline-nudge ${shouldBounce('home') ? 'nav-bounce' : ''}`}>Home</a>
              <span className="text-neutral-400 dark:text-neutral-600">|</span>
              <a href="/writing" className={`hover-underline-nudge ${shouldBounce('writing') ? 'nav-bounce-delayed-1' : ''}`}>Writing</a>
            </div>
          </div>
          <div className="text-neutral-500 dark:text-neutral-500">↳ {essay.date}</div>
        </div>

        <div className="my-6 border-t border-neutral-200 dark:border-neutral-700" />

        {/* Essay Content */}
        <article className="essay-content space-y-5 text-sm sm:text-[0.95rem] leading-relaxed text-neutral-800 dark:text-neutral-200">
          {essay.content.map((paragraph, index) => (
            <p
              key={index}
              className="essay-paragraph"
              style={{
                animationDelay: `${index * 30 + 200}ms`,
                opacity: 0,
                animation: 'fadeIn 0.6s ease-out forwards'
              }}
            >
              {paragraph}
            </p>
          ))}
        </article>

        <div className="my-8 border-t border-neutral-200 dark:border-neutral-700" />

        {/* Back to Writing */}
        <div className="text-sm sm:text-[0.95rem] leading-tight my-6">
          <a href="/writing" className="hover-underline-nudge font-extralight">
            ← Back to writing
          </a>
        </div>

        <div className="my-6 border-t border-neutral-200 dark:border-neutral-700" />

        {/* Contact */}
        <div className="text-sm sm:text-[0.95rem] leading-tight">
          <div className="pt-4" />
          <footer className="pb-16 sm:pb-24">
            <div className="flex items-center justify-between flex-wrap">
              <div className="flex items-center gap-3">
                <div>◆ Contact:</div>
                <div className="flex items-center gap-3 text-neutral-700 dark:text-neutral-300">
                  <a className="inline-flex items-center gap-1" href="mailto:lance.yan.business@gmail.com"><Mail size={14} /><span className="hover-underline-nudge">Email</span></a>
                  <a className="inline-flex items-center gap-1" href="https://github.com/lance116" target="_blank" rel="noreferrer"><Github size={14} /><span className="hover-underline-nudge">GitHub</span></a>
                  <a className="inline-flex items-center gap-1" href="https://x.com/cnnguan/" target="_blank" rel="noreferrer"><Logo src="/X.png" alt="X" /><span className="hover-underline-nudge">Twitter</span></a>
                  <a className="inline-flex items-center gap-1" href="https://www.linkedin.com/in/lance-yan/" target="_blank" rel="noreferrer"><Logo src="/linkedin.webp" alt="LinkedIn" /><span className="hover-underline-nudge">LinkedIn</span></a>
                </div>
              </div>
              <ThemeToggle />
            </div>
          </footer>
        </div>
      </div>
    </main>
  );
}
