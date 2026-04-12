'use client';

import { useEffect, useRef } from 'react';

const CHARS = ' .,:;+*?%S#@';

export function AsciiTorus({ color = '#6b5ce7' }: { color?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cvs = ref.current!;
    if (!cvs) return;
    const ctx = cvs.getContext('2d')!;
    if (!ctx) return;

    let alive = true;
    let A = 0.5, B = 0;
    const dpr = window.devicePixelRatio || 1;

    const COLS = 80;
    const ROWS = 45;
    const R1 = 1;     // tube radius
    const R2 = 2.2;   // torus radius
    const K2 = 5;
    const K1 = COLS * K2 * 3 / (8 * (R1 + R2));

    function resize() {
      const size = Math.min(cvs.parentElement?.clientWidth || 600, 600);
      const charW = size / COLS;
      const charH = charW * 1.6;
      const h = ROWS * charH;

      cvs.width = size * dpr;
      cvs.height = h * dpr;
      cvs.style.width = size + 'px';
      cvs.style.height = h + 'px';
    }

    function render() {
      if (!alive) return;

      const w = cvs.width / dpr;
      const h = cvs.height / dpr;
      const charW = w / COLS;
      const charH = h / ROWS;
      const fontSize = Math.max(8, charH * 0.85);

      // Clear
      const output: string[][] = [];
      const zbuf: number[][] = [];
      for (let i = 0; i < ROWS; i++) {
        output[i] = [];
        zbuf[i] = [];
        for (let j = 0; j < COLS; j++) {
          output[i][j] = ' ';
          zbuf[i][j] = 0;
        }
      }

      const cA = Math.cos(A), sA = Math.sin(A);
      const cB = Math.cos(B), sB = Math.sin(B);

      for (let theta = 0; theta < 6.28; theta += 0.05) {
        const ct = Math.cos(theta), st = Math.sin(theta);

        for (let phi = 0; phi < 6.28; phi += 0.015) {
          const cp = Math.cos(phi), sp = Math.sin(phi);

          const cx = R2 + R1 * ct;
          const cy = R1 * st;

          const x = cx * (cB * cp + sA * sB * sp) - cy * cA * sB;
          const y = cx * (sB * cp - sA * cB * sp) + cy * cA * cB;
          const z = K2 + cA * cx * sp + cy * sA;
          const ooz = 1 / z;

          const xp = Math.floor(COLS / 2 + K1 * ooz * x);
          const yp = Math.floor(ROWS / 2 - K1 * ooz * y * 0.55);

          // Lighting — two light sources for depth
          const L = cp * ct * sB - cA * ct * sp - sA * st + cB * (cA * st - ct * sA * sp);

          if (L > 0 && xp >= 0 && xp < COLS && yp >= 0 && yp < ROWS) {
            if (ooz > zbuf[yp][xp]) {
              zbuf[yp][xp] = ooz;
              const li = Math.min(Math.floor(L * (CHARS.length - 1)), CHARS.length - 1);
              output[yp][xp] = CHARS[li];
            }
          }
        }
      }

      // Render
      ctx.save();
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      ctx.font = `${fontSize}px monospace`;
      ctx.textBaseline = 'top';
      ctx.textAlign = 'center';

      for (let i = 0; i < ROWS; i++) {
        for (let j = 0; j < COLS; j++) {
          const ch = output[i][j];
          if (ch !== ' ') {
            // Opacity based on character density
            const li = CHARS.indexOf(ch);
            const alpha = 0.3 + (li / CHARS.length) * 0.7;
            ctx.globalAlpha = alpha;
            ctx.fillStyle = color;
            ctx.fillText(ch, j * charW + charW / 2, i * charH);
          }
        }
      }

      ctx.restore();

      A += 0.025;
      B += 0.015;
      requestAnimationFrame(render);
    }

    resize();
    render();
    window.addEventListener('resize', resize);
    return () => { alive = false; window.removeEventListener('resize', resize); };
  }, [color]);

  return <canvas ref={ref} className="w-full max-w-[600px]" />;
}
