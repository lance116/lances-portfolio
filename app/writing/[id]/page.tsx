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
  "the-window-between-nothing": {
    title: "The Window Between Nothing",
    date: "2025-11-14",
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
              })}
            </div>
          </div>
        </div>

        <div className="my-6 border-t border-neutral-200 dark:border-neutral-700" />

        {/* Essay Content */}
        <article className="prose prose-sm sm:prose-base dark:prose-invert max-w-none">
          <div className="text-sm sm:text-[0.95rem] leading-relaxed space-y-4 font-light">
            {essayData.content.split('\n\n').map((paragraph, index) => (
              <p key={index} className="text-neutral-900 dark:text-neutral-100">
                {paragraph}
              </p>
            ))}
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
