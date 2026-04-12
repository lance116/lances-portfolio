'use client';

import { useEffect, useRef } from 'react';

interface Fish {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  speed: number;
  phase: number;
  opacity: number;
}

export function AsciiFish({ color = 'rgba(107, 92, 231, 0.6)', count = 3 }: { color?: string; count?: number }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cvs = ref.current!;
    if (!cvs) return;
    const ctx = cvs.getContext('2d')!;
    if (!ctx) return;

    let alive = true;
    let w = 0, h = 0;
    let time = 0;
    const dpr = window.devicePixelRatio || 1;
    const CHAR_SIZE = 11;
    const CHARS = '01';

    // Create fish
    const fish: Fish[] = [];

    function initFish() {
      fish.length = 0;
      for (let i = 0; i < count; i++) {
        const size = 80 + Math.random() * 120;
        const speed = 0.3 + Math.random() * 0.5;
        const dir = Math.random() > 0.5 ? 1 : -1;
        fish.push({
          x: Math.random() * w,
          y: h * 0.2 + Math.random() * h * 0.6,
          vx: speed * dir,
          vy: (Math.random() - 0.5) * 0.3,
          size,
          speed,
          phase: Math.random() * Math.PI * 2,
          opacity: 0.15 + Math.random() * 0.25,
        });
      }
    }

    function resize() {
      w = window.innerWidth;
      h = window.innerHeight;
      cvs.width = w * dpr;
      cvs.height = h * dpr;
      cvs.style.width = w + 'px';
      cvs.style.height = h + 'px';
      if (fish.length === 0) initFish();
    }

    // Check if a point is inside the fish body
    function fishBody(
      px: number, py: number,
      fx: number, fy: number,
      size: number, t: number, phase: number, facingRight: boolean
    ): { inside: boolean; brightness: number } {
      // Transform to fish-local coordinates (head at right)
      let lx = (px - fx) / size;
      let ly = (py - fy) / size;
      if (!facingRight) lx = -lx;

      // Body runs from x = -0.5 (tail) to x = 0.5 (nose)
      // Undulation: sine wave, bigger amplitude toward tail
      const bodyX = lx + 0.5; // 0 = tail, 1 = nose
      if (bodyX < -0.15 || bodyX > 1.05) return { inside: false, brightness: 0 };

      const undulate = Math.sin(bodyX * 5 - t * 4 + phase) * (1 - bodyX) * 0.08;
      const adjY = ly - undulate;

      // Main body: teardrop shape
      let bodyHalfW = 0;
      if (bodyX >= 0 && bodyX <= 1) {
        // Wider at 0.35, tapers both ways
        bodyHalfW = 0.16 * Math.sin(bodyX * Math.PI) * (1 + 0.3 * Math.sin(bodyX * Math.PI * 0.5));
      }

      // Tail fin
      if (bodyX >= -0.15 && bodyX < 0.05) {
        const tailT = (bodyX + 0.15) / 0.2; // 0 to 1
        const tailW = 0.12 * (1 - tailT);
        bodyHalfW = Math.max(bodyHalfW, tailW);
      }

      // Dorsal fin (top)
      if (bodyX >= 0.3 && bodyX <= 0.65) {
        const finT = (bodyX - 0.3) / 0.35;
        const finH = 0.06 * Math.sin(finT * Math.PI);
        if (adjY < 0) {
          bodyHalfW = Math.max(bodyHalfW, bodyHalfW + finH);
        }
      }

      const inside = Math.abs(adjY) < bodyHalfW;
      if (!inside) return { inside: false, brightness: 0 };

      // Brightness: brighter at center, darker at edges
      const edgeDist = 1 - Math.abs(adjY) / bodyHalfW;
      const brightness = edgeDist * 0.5 + 0.5;

      return { inside, brightness };
    }

    function draw() {
      if (!alive) return;
      time += 0.016;

      ctx.save();
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      ctx.font = `${CHAR_SIZE}px monospace`;
      ctx.textBaseline = 'top';
      ctx.textAlign = 'center';

      // Update and render each fish
      for (const f of fish) {
        // Gentle wandering
        f.vy += (Math.sin(time * 0.5 + f.phase) * 0.01);
        f.vy *= 0.99;
        f.x += f.vx;
        f.y += f.vy;

        // Wrap around screen
        if (f.vx > 0 && f.x > w + f.size) f.x = -f.size;
        if (f.vx < 0 && f.x < -f.size) f.x = w + f.size;
        // Soft vertical bounds
        if (f.y < h * 0.1) f.vy += 0.02;
        if (f.y > h * 0.9) f.vy -= 0.02;

        const facingRight = f.vx > 0;

        // Render fish as character grid
        const gridStep = CHAR_SIZE * 0.9;
        const extent = f.size * 0.7;

        for (let gx = -extent; gx <= extent; gx += gridStep) {
          for (let gy = -extent * 0.5; gy <= extent * 0.5; gy += gridStep) {
            const px = f.x + gx;
            const py = f.y + gy;

            if (px < -20 || px > w + 20 || py < -20 || py > h + 20) continue;

            const { inside, brightness } = fishBody(px, py, f.x, f.y, f.size, time, f.phase, facingRight);

            if (inside) {
              const ch = CHARS[Math.floor(Math.random() * CHARS.length)];
              ctx.globalAlpha = f.opacity * brightness;
              ctx.fillStyle = color;
              ctx.fillText(ch, px, py);
            }
          }
        }

        // Eye
        const eyeX = f.x + (facingRight ? 1 : -1) * f.size * 0.35;
        const undulateEye = Math.sin(0.85 * 5 - time * 4 + f.phase) * 0.15 * 0.08 * f.size;
        const eyeY = f.y - f.size * 0.02 + undulateEye;
        ctx.globalAlpha = f.opacity * 1.5;
        ctx.fillStyle = color;
        ctx.fillText('@', eyeX, eyeY);
      }

      ctx.restore();
      requestAnimationFrame(draw);
    }

    resize();
    draw();
    window.addEventListener('resize', resize);
    return () => { alive = false; window.removeEventListener('resize', resize); };
  }, [color, count]);

  return (
    <canvas
      ref={ref}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        pointerEvents: 'none',
        zIndex: 1,
      }}
    />
  );
}
