'use client';

import Link from "next/link";
import { notFound } from "next/navigation";
import { useNavigationBounce } from "../../../lib/useNavigationBounce";
import { Mail, Github } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

function Logo({ src, alt, size = 18, className = "" }: { src: string; alt: string; size?: number; className?: string }) {
  return (
    <span className="inline-flex items-center align-middle relative -top-[1px]">
      <img
        src={src}
        alt={alt}
        width={size}
        height={size}
        className={`h-[18px] w-[18px] object-contain align-middle ${className}`}
      />
    </span>
  );
}

// Map of essay IDs to content and metadata
const essayMap: Record<string, { title: string; date: string; content: string }> = {
  "floor-in-the-sky": {
    title: "Floor in the Sky",
    date: "2025-11-14T05:42:00",
    content: `My high school yearbook quote was something like: "We're more defined by the bar we set at the bottom than the heights we aim to reach."

Everyone has big dreams. Everyone wants to do something significant, make a lot of money, change the world. The dreams are cheap. What actually defines you is your bare minimum. The floor you refuse to go below.

I got 99.2% in high school. Not because I aimed for 99.2%. I aimed for 100% and accepted nothing less. 99% was just what happened when I set the floor that high and hit a few obstacles along the way.

Most people confuse goals with floors. "I want to be successful" isn't a standard. That's a direction. A floor is: what are you absolutely not willing to accept? Goals tell you where to aim. Floors tell you what happens when you're tired.

When 20+ people botted ratemycompany.ca (thanks for the traffic), my floor wasn't "well, I built something." My floor was "this has to work correctly." So I stayed up for two nights fixing it. Not because I'm particularly disciplined. Because falling below my floor wasn't an option I'd given myself.

The floor doesn't come from discipline or motivation. It comes from identity. From who you actually believe you are.

If you see yourself as someone who builds things that matter, being mediocre violates your self-concept. That violation is what enforces the floor, it's automatic. Which means raising your floor isn't about willpower. It's about changing who you think you are. The floor follows from that.

I saw this early. When I was eleven, I ran Discord servers and a Minecraft skyblock guild with hundreds of members. Not any formal authority, only influence. But if I shipped something broken or handled a situation poorly, people left. The only thing that kept those communities running was maintaining a standard. That's where the floor started forming. Not from discipline. From understanding that if I accepted mediocre, mediocre is what I'd get.

I think this is why people quit too early. They say they want to do something important, but their floor is "I tried, I learned something." So when things get hard, they've already cleared their minimum standard. They can give up with a clear conscience. The people who succeed have a different floor. Not "I'll try to make this work." Just "this will work."

People think high standards make you stubborn. It's the opposite. High standards make pivoting easier. If your floor is "this has to be excellent," you're not married to any specific approach. You're attached to the outcome. The same floor that keeps you up two nights fixing bugs is what makes you kill the whole project when you realize it's solving the wrong problem. When something isn't working, the floor tells you immediately. Change it.

Set standards for things you control. "This has to work correctly" is a floor you can enforce. "This has to make me rich" isn't. One is about output quality. The other is about outcomes that depend on factors beyond you. The useful floors are about standards, not results.

The floor makes decisions easier. When something doesn't meet your standard, you know immediately. No internal debate. No agonizing over sunk costs. The answer is obvious. Either it clears the bar or it doesn't.

But high standards don't prevent failure. They only prevent mediocrity. You can fail a hundred times with a high floor. Each time, you built something that met your standard. Failing is fine. What you can't do is lower the bar because you're tired of failing.

Set the bar high enough, and average becomes impossible. Mediocre becomes unthinkable. The heights you aim for don't matter if you're willing to settle for less. But if you make settling impossible, you'll find a way to clear the bar you set.`
  },
  "the-window-between-nothing": {
    title: "The Window Between Nothing",
    date: "2025-11-14T04:26:00",
    content: `Most people avoid thinking about death. It's uncomfortable and too heavy for normal conversation.

But avoiding it means avoiding the one question that actually matters: what are you doing with your life? And why?

At 15, I spent a lot of time thinking about death. I read philosophy books trying to find some answer that would make it less terrifying. Nothing worked. The problem is that death is fundamentally weird. You spend your whole life being conscious, and then one day you're not. How do you wrap your head around that?

Eventually I had a realization that helped. If death is anything like the state before birth, it's not painful or scary. It's just nothing. No awareness at all.

This sounds pretty grim, but it actually clarified things for me. If everything ends in nothing, then the only thing that matters is what you do in between. The window, as I think of it.

So what do you do with the window?

Most people would say "be happy" or "enjoy life." And I agree. There's a lot of truth to that. I love photography. I love traveling. I love having new and novel experiences.

But consider my thought experiment: imagine you spent your whole life experiencing conventionally happy things, and you're 80 and lying in bed dying. Would you feel satisfied?

Most people might say yes. But I don't think I would. I'd still feel like something was missing. I think I'm weird in this way.

I'm obsessed with the idea of building something real. Obviously for the experience of building it (I love building sh*t), but also for the legacy. For what continues after the window closes.

Let me justify myself.

You won't be around to see your legacy. That's true. But the work persists. And that persistence matters precisely because your consciousness doesn't.

Think about it like sedimentary layers. Each generation adds a layer to the mountain. Your layer doesn't need to last forever. It just needs to support what comes next.

The internet is built on protocols from the 70s and 80s. Those protocols enabled the web. The web enabled social networks. Social networks enabled entirely new forms of human connection. Each layer made the next possible, even though the original creators are often forgotten.

Your window closes, but what you built during it keeps affecting the world. Einstein's equations still predict how the universe behaves. Newton's laws still govern motion. The creators are gone. The contributions remain.

I'm not claiming I can do something at that scale. I'm not Einstein or Newton. But I can still try to build something that outlasts me. Even if it's a fraction as significant, that would be enough. My window would contain something that persists after it closes.

The point isn't immortality. It's impact. Adding a genuine layer to the mountain. Contributing something that wouldn't exist without your specific window of consciousness.

And even if someone deposited 100 million dollars in my account tomorrow, I'd probably still want to be building things. Maybe most people would retire. But I would just use it to fund bigger projects. To me, the money isn't really the point. The lasting impact is.

When I imagine being old, the thing that would bother me most is thinking "I should have really tried harder," or "I had so much potential." I don't want to play it safe and waste the window.

This is why being average feels unacceptable. If you only get one shot at consciousness, spending it on work that dies with you is a waste. You have this rare, temporary thing. Why not try to do something that persists beyond it?

I'm lucky enough to be in a position where I can actually try. Not everyone gets that. Most people's windows are consumed by survival, but I got dealt a good hand. Right opportunities, right circumstances, right moment. Wasting that because building something real felt 'too hard' or 'too risky' would be unforgivable.

Better to swing for something significant and fail than to build nothing that lasts. Did you add a layer to the mountain? Did you build something that shifts how future people live, even slightly?

The alternative is just existing until you don't, leaving no trace. That feels like squandering the only interesting thing you have.

Make your window count. Build something that outlasts it.`
  }
};

interface EssayPageProps {
  params: {
    id: string;
  };
}

export default function EssayPage({ params }: EssayPageProps) {
  const { shouldBounce } = useNavigationBounce('writing');
  const essayData = essayMap[params.id];

  if (!essayData) {
    notFound();
  }

  return (
    <main className="relative">
      <div className="relative z-10 mx-auto max-w-screen-sm px-4 sm:px-0">
        <div className="pt-16 sm:pt-24" />

        {/* Header */}
        <div className="space-y-6">
          <div className="flex items-center justify-end gap-2 text-sm sm:text-[0.95rem] font-extralight">
            <a href="/" className={`hover-underline-nudge ${shouldBounce('home') ? 'nav-bounce' : ''}`}>Home</a>
            <span className="text-neutral-400 dark:text-neutral-600">|</span>
            <a href="/writing" className={`hover-underline-nudge ${shouldBounce('writing') ? 'nav-bounce-delayed-1' : ''}`}>Writing</a>
          </div>
          <div className="-ml-[0.5px]">
            <h1 className="text-3xl sm:text-5xl font-extralight leading-tight mb-3 tracking-tight">{essayData.title}</h1>
            <div className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 ml-[0.5px]">
              {new Date(essayData.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })} at {new Date(essayData.date).toLocaleTimeString('en-US', {
                hour: 'numeric',
                minute: '2-digit',
                hour12: true
              })}
            </div>
          </div>
        </div>

        <div className="my-6 border-t border-neutral-200 dark:border-neutral-700" />

        {/* Essay Content */}
        <article className="prose prose-sm sm:prose-base dark:prose-invert max-w-none">
          <div className="text-sm sm:text-[0.95rem] leading-relaxed space-y-4 font-light">
            {essayData.content.split('\n\n').map((paragraph, index) => {
              // Convert ratemycompany.ca to a link
              const parts = paragraph.split('ratemycompany.ca');
              return (
                <p key={index} className="text-neutral-900 dark:text-neutral-100">
                  {parts.length > 1 ? (
                    <>
                      {parts[0]}
                      <a
                        href="https://www.ratemycompany.ca/"
                        target="_blank"
                        rel="noreferrer"
                        className="hover-underline-nudge text-neutral-900 dark:text-neutral-100"
                      >
                        ratemycompany.ca
                      </a>
                      {parts.slice(1).join('ratemycompany.ca')}
                    </>
                  ) : (
                    paragraph
                  )}
                </p>
              );
            })}
          </div>
        </article>

        <div className="my-6 border-t border-neutral-200 dark:border-neutral-700" />

        {/* Navigation */}
        <div className="text-sm sm:text-[0.95rem] leading-tight space-y-2">
          <div className="flex items-center gap-4">
            <a href="/writing" className="hover-underline-nudge font-extralight">
              ← Back to writing
            </a>
            <span className="text-neutral-400">|</span>
            <a href="/" className="hover-underline-nudge font-extralight">
              ← Back to home
            </a>
          </div>
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
                  <a className="inline-flex items-center gap-1" href="https://x.com/lanceyyan/" target="_blank" rel="noreferrer"><Logo src="/X.png" alt="X" /><span className="hover-underline-nudge">Twitter</span></a>
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
