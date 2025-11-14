# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is Lance's personal portfolio website built with Next.js 14 (App Router), TypeScript, and Tailwind CSS. The site features a custom WebGL fluid dynamics cursor effect and a dark/light theme system.

## Development Commands

```bash
# Development
npm run dev          # Start development server on http://localhost:3000

# Production
npm run build        # Build for production
npm start            # Start production server

# Code Quality
npm run lint         # Run ESLint
```

## Architecture & Key Features

### 1. Custom WebGL Fluid Cursor Effect

The centerpiece of this portfolio is a sophisticated WebGL-based fluid dynamics simulation that creates interactive visual effects when users move their cursor or touch the screen.

**Location**: `components/ui/splash-cursor.tsx`

**Implementation details**:
- Uses WebGL2/WebGL1 with fallback support
- Implements Navier-Stokes fluid simulation with custom shaders
- Performance-optimized: animation loop only starts on first user interaction (mousemove/touchstart)
- Highly configurable parameters: `SPLAT_RADIUS`, `SPLAT_FORCE`, `DENSITY_DISSIPATION`, `VELOCITY_DISSIPATION`, etc.
- Generates dark-toned colors (HSV value: 0.1-0.3) for visual aesthetic
- Mounted globally in `app/layout.tsx` with `pointer-events-none` to not interfere with page interactions

**Important**: The cursor effect is complex (~1350 lines). When modifying, test thoroughly across different devices and browsers.

### 2. Theme System

Custom light/dark mode implementation using React Context and localStorage.

**Components**:
- `components/theme-provider.tsx`: Context provider managing theme state
- `components/theme-toggle.tsx`: UI toggle component with Moon/Sun icons
- `app/layout.tsx`: Contains inline script to prevent FOUC (Flash of Unstyled Content)

**How it works**:
- Theme preference stored in `localStorage` under key `'theme'`
- Inline script in layout reads theme before hydration to apply `dark` class immediately
- Smooth transitions applied via `.theme-transitioning` class (300ms)
- Custom CSS variables defined in `app/globals.css` for light/dark modes

### 3. Navigation Bounce System

Visual indicator (gentle bounce animation) for unvisited pages in current session.

**Location**: `lib/useNavigationBounce.ts`

**How it works**:
- Tracks visited pages per browser session using `sessionStorage` and `localStorage`
- Generates unique session ID on first visit
- Pages bounce until user navigates to them once
- CSS animations: `.nav-bounce` and `.nav-bounce-delayed` in `app/globals.css`
- Used on navigation links in header across all pages

### 4. Page Structure

All pages follow a consistent layout pattern:

**Routes**:
- `/` - Home page (`app/page.tsx`): Main bio, achievements, current projects
- `/about` - About page (`app/about/page.tsx`): Personal background, hobbies, locations
- `/projects` - Projects page (`app/projects/page.tsx`): Collection of built projects with tech stacks
- `/writing` - Writing page (`app/writing/page.tsx`): List of essays and articles
- `/writing/[id]` - Individual essay view (`app/writing/[id]/page.tsx`): Full essay with large title
- `/photography` - Photo gallery (`app/photography/page.tsx`): Grid layout with hover effects
- `/photography/[id]` - Individual photo view (`app/photography/[id]/page.tsx`): Full-size photo with caption

**Common elements**:
- Header with navigation (Home | Projects | About me | Writing | Photos)
- Footer with contact links and theme toggle
- Logo component for inline brand/company icons
- Consistent typography and spacing

### 5. Writing Section

Blog-style section for essays and long-form content.

**Location**: `app/writing/page.tsx` and `app/writing/[id]/page.tsx`

**How it works**:
- List view displays essays with title, description, and date
- Individual essay page features large title (text-3xl sm:text-5xl) for emphasis
- Essays stored in `essayMap` object in `app/writing/[id]/page.tsx`
- Content formatted as plain text with paragraph spacing
- Dates formatted using `toLocaleDateString()` for consistency

**Adding new essays**:
1. Add essay metadata to `essays` array in `app/writing/page.tsx`:
   - `id`: URL-friendly slug
   - `title`: Essay title
   - `description`: Short description for list view
   - `date`: ISO date string (YYYY-MM-DD)
2. Add essay content to `essayMap` in `app/writing/[id]/page.tsx`:
   - Include full essay text with line breaks between paragraphs
   - Paragraphs automatically split and rendered with proper spacing

### 6. Styling System

Built with Tailwind CSS using custom design tokens.

**Key files**:
- `app/globals.css`: Custom CSS layers, animations, utility classes
- `tailwind.config.js`: Extended color palette using CSS variables

**Custom utilities**:
- `.hover-underline-nudge`: Animated underline with slight vertical nudge on hover
- `.nav-bounce` / `.nav-bounce-delayed`: Gentle bounce animations
- `.photo-hover`: Scale-up effect on photo thumbnails
- `.slight-italic`: Subtle italic skew for emphasis

**Typography**:
- Font: Inter (weights: 200, 300)
- Base size: `text-sm sm:text-[0.95rem]`
- Font weight: `font-extralight` for headers

## Image Assets

Photos are stored in `/public` directory with specific dimensions tracked in code:
- Photography images: `pic1.png` through `pic11.png`
- Logo images: Various company/organization logos (e.g., `clice final logo.png`, `waterloo-logo.png`, etc.)

**Note**: When adding new photos to the gallery, update both:
1. `photographyImages` array in `app/photography/page.tsx`
2. `photoMap` object in `app/photography/[id]/page.tsx`

Include exact dimensions and captions.

## TypeScript Configuration

- Strict mode enabled
- Path aliases: `@/*` maps to project root
- Target: ES5 for broad compatibility
- Isolated modules for faster builds

## Important Notes for Development

1. **Client Components**: Most components use `'use client'` directive due to interactivity (hooks, events)

2. **Performance**: The WebGL cursor effect is performance-intensive. Animation loop is lazy-loaded and starts only on first user interaction

3. **Responsive Design**: Mobile-first approach with `sm:` breakpoint for desktop
   - Breakpoint: 640px

4. **Vercel Analytics**: Integrated via `@vercel/analytics` in root layout

5. **Dark Mode Colors**: Pure black/white (`0 0% 0%` / `0 0% 100%`) for maximum contrast

6. **Logo Component Pattern**: Inline logos use a reusable `Logo` component with `Label` wrapper for consistent alignment and sizing
