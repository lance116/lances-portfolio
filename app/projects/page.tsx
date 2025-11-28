'use client';

import Image from "next/image";
import Link from "next/link";
import { Mail, Github, ExternalLink } from "lucide-react";
import { useNavigationBounce } from "../../lib/useNavigationBounce";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiVercel,
  SiPostgresql,
  SiReact,
  SiPwa,
  SiPython,
  SiTensorflow,
  SiNumpy,
  SiWebgl,
  SiJavascript,
  SiSupabase,
  SiVite
} from "react-icons/si";
import { FaDatabase, FaChessKnight, FaGamepad } from "react-icons/fa";
import { IconType } from "react-icons";

function Logo({ src, alt, size = 26, className = "" }: { src: string; alt: string; size?: number; className?: string }) {
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
        className={`h-[18px] w-[18px] sm:h-[26px] sm:w-[26px] object-contain align-middle ${className}`}
      />
    </span>
  );
}

interface Project {
  id: string;
  name: string;
  description: string;
  techStack: string[];
  githubUrl: string;
  websiteUrl?: string;
  screenshot: string;
}

// Map tech names to their icons
const techIcons: Record<string, { icon: IconType; color: string }> = {
  "Next.js": { icon: SiNextdotjs, color: "#000000" },
  "Next.js 14": { icon: SiNextdotjs, color: "#000000" },
  "TypeScript": { icon: SiTypescript, color: "#3178C6" },
  "Tailwind CSS": { icon: SiTailwindcss, color: "#06B6D4" },
  "Vercel": { icon: SiVercel, color: "#000000" },
  "PostgreSQL": { icon: SiPostgresql, color: "#4169E1" },
  "React": { icon: SiReact, color: "#61DAFB" },
  "Progressive Web App": { icon: SiPwa, color: "#5A0FC8" },
  "Python": { icon: SiPython, color: "#3776AB" },
  "TensorFlow": { icon: SiTensorflow, color: "#FF6F00" },
  "NumPy": { icon: SiNumpy, color: "#013243" },
  "WebGL": { icon: SiWebgl, color: "#990000" },
  "Local Storage": { icon: FaDatabase, color: "#FF9900" },
  "Chess.js": { icon: FaChessKnight, color: "#000000" },
  "Supabase": { icon: SiSupabase, color: "#3ECF8E" },
  "Vite": { icon: SiVite, color: "#646CFF" },
  "Pygame": { icon: FaGamepad, color: "#3776AB" },
  "python-chess": { icon: FaChessKnight, color: "#000000" }
};

const projects: Project[] = [
  {
    id: "ratemycompany",
    name: "ratemycompany.ca",
    description: "A matchup voting platform applying 'hot or not' concept to tech companies. Users vote on company comparisons with hCaptcha-secured API, session management, and real-time leaderboards. Got 20K users and 2M votes in 24h. Implemented measures to prevent 1K bots from getting their fav company on the podium (6M edge requests).",
    techStack: ["React", "TypeScript", "Vite", "Tailwind CSS", "Supabase", "Vercel"],
    githubUrl: "https://github.com/lance116/ratemycompany",
    websiteUrl: "https://www.ratemycompany.ca/",
    screenshot: "/ratemycompany.png"
  },
  {
    id: "chess-neural-network",
    name: "Chess Neural Network",
    description: "Interactive chess game with AI opponent powered by TensorFlow neural networks. Features complete rule validation (castling, en passant, promotion), move highlighting, and continuous improvement through self-play training mechanisms.",
    techStack: ["Python", "TensorFlow", "NumPy", "Pygame", "python-chess"],
    githubUrl: "https://github.com/lance116/Chess-Neural-Network",
    screenshot: "/chessscreens.png"
  },
  {
    id: "portfolio",
    name: "Portfolio Website",
    description: "My personal portfolio featuring a fluid dynamic cursor effect. Modern, responsive design built with Next.js 14 to showcase my projects and experience with smooth animations.",
    techStack: ["Next.js 14", "TypeScript", "Tailwind CSS", "WebGL", "Vercel"],
    githubUrl: "https://github.com/lance116/lances-portfolio",
    screenshot: "/pic1.png"
  },
  {
    id: "perica",
    name: "Perica - Period Tracker",
    description: "Privacy-focused menstrual cycle tracker with AI-powered health assistant. Features symptom and mood logging, pattern recognition, predictive capabilities, and health insights.",
    techStack: ["React", "TypeScript", "Vite", "Tailwind CSS", "Supabase"],
    githubUrl: "https://github.com/lance116/period-tracker",
    screenshot: "/perica.png"
  }
];

export default function Projects() {
  const { shouldBounce } = useNavigationBounce('projects');

  return (
    <main className="relative">
      <div className="relative z-10 mx-auto max-w-[820px] px-4 sm:px-0">
        <div className="pt-16 sm:pt-24" />

        {/* Header */}
        <div className="text-sm sm:text-xl leading-tight space-y-2">
          <div className="flex items-center justify-between">
            <h1 className="underline underline-offset-[3px] font-extralight">◆ Projects</h1>
            <div className="flex items-center gap-2 font-extralight">
              <a href="/" className={`hover-underline-nudge ${shouldBounce('home') ? 'nav-bounce' : ''}`}>Home</a>
              <span className="text-neutral-400 dark:text-neutral-600">|</span>
              <a href="/about" className={`hover-underline-nudge ${shouldBounce('about') ? 'nav-bounce-delayed-1' : ''}`}>About me</a>
              <span className="text-neutral-400 dark:text-neutral-600">|</span>
              <a href="/photography" className={`hover-underline-nudge ${shouldBounce('photography') ? 'nav-bounce-delayed-2' : ''}`}>Photos</a>
            </div>
          </div>
          <div>↳ A collection of projects I've built.</div>
        </div>

        <div className="my-6 border-t border-neutral-200 dark:border-neutral-700" />

        {/* Projects List */}
        <div className="space-y-8 sm:space-y-10">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="project-card group"
              style={{
                animationDelay: `${index * 150}ms`,
                opacity: 0,
                animation: 'fadeInUp 0.6s ease-out forwards'
              }}
            >
              {/* Card Container */}
              <div className="border border-neutral-200 dark:border-neutral-800 rounded-lg overflow-hidden bg-white dark:bg-neutral-950 project-card-hover">
                {/* Screenshot */}
                <div className="relative overflow-hidden border-b border-neutral-200 dark:border-neutral-800">
                  <div className="aspect-[16/10] bg-neutral-100 dark:bg-neutral-900">
                    <Image
                      src={project.screenshot}
                      alt={`${project.name} screenshot`}
                      width={1600}
                      height={1000}
                      className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, 640px"
                    />
                  </div>
                </div>

                {/* Project Info */}
                <div className="p-5 sm:p-6 space-y-4">
                  <div className="flex items-start justify-between gap-4">
                    <h2 className="font-extralight text-sm sm:text-xl text-neutral-900 dark:text-neutral-50">
                      {project.name}
                    </h2>
                    <div className="flex items-center gap-3 shrink-0">
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
                      >
                        <Github size={14} />
                        <span>Code</span>
                      </a>
                      {project.websiteUrl && (
                        <>
                          <span className="text-neutral-300 dark:text-neutral-700">|</span>
                          <a
                            href={project.websiteUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
                          >
                            <ExternalLink size={14} />
                            <span>Live</span>
                          </a>
                        </>
                      )}
                    </div>
                  </div>

                  <p className="text-sm sm:text-[0.95rem] leading-relaxed text-neutral-600 dark:text-neutral-400">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 pt-2">
                    {project.techStack.map((tech) => {
                      const techInfo = techIcons[tech];
                      const Icon = techInfo?.icon;

                      return (
                        <span
                          key={tech}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-light bg-neutral-50 dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 rounded-md border border-neutral-200 dark:border-neutral-800 transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-800"
                        >
                          {Icon && (
                            <Icon
                              size={14}
                              className="shrink-0"
                              style={{ color: techInfo.color }}
                            />
                          )}
                          <span>{tech}</span>
                        </span>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="my-6 border-t border-neutral-200 dark:border-neutral-700" />

        {/* Back to Home */}
        <div className="text-sm sm:text-xl leading-tight my-6">
          <a href="/" className="hover-underline-nudge font-extralight">
            ← Back to home
          </a>
        </div>

        <div className="my-6 border-t border-neutral-200 dark:border-neutral-700" />

        {/* Contact */}
        <div className="text-sm sm:text-xl leading-tight">
          <div className="pt-4" />
          <footer className="pb-16 sm:pb-24">
            <div className="flex items-center justify-between flex-wrap gap-y-3">
              <div className="flex items-center gap-3">
                <div>◆ Contact:</div>
                <div className="flex items-center gap-3 text-neutral-700 dark:text-neutral-300">
                  <a className="inline-flex items-center gap-1" href="mailto:lance.yan.business@gmail.com"><Mail size={14} className="sm:w-[18px] sm:h-[18px]" /><span className="hover-underline-nudge">Email</span></a>
                  <a className="inline-flex items-center gap-1" href="https://github.com/lance116" target="_blank" rel="noreferrer"><Github size={14} className="sm:w-[18px] sm:h-[18px]" /><span className="hover-underline-nudge">GitHub</span></a>
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
