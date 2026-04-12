'use client';

import { useEffect, useRef, useState } from 'react';

const ASCII_RAMP = ' .:;+xX$&@#';

interface Props {
  src: string | string[];
  cols?: number;
  color?: string;
  threshold?: number;
  invert?: boolean;
  fill?: boolean;
  borderRight?: boolean;
  className?: string;
}

export function AsciiDither({ src, cols = 90, color = '#6b5ce7', threshold = 0, invert = false, fill = false, borderRight = false, className = '' }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [dimensions, setDimensions] = useState({ w: 600, h: 400 });

  useEffect(() => {
    const cvs = canvasRef.current!;
    const video = videoRef.current!;
    if (!cvs || !video) return;

    const ctx = cvs.getContext('2d')!;
    const sampler = document.createElement('canvas');
    const samplerCtx = sampler.getContext('2d', { willReadFrequently: true })!;

    let alive = true;
    const dpr = window.devicePixelRatio || 1;

    function getSize() {
      const container = cvs.parentElement;
      return container ? container.clientWidth : 600;
    }

    function draw() {
      if (!alive) return;
      requestAnimationFrame(draw);

      const vw = video.videoWidth;
      const vh = video.videoHeight;
      if (!vw || !vh || video.readyState < 2) return;

      const container = cvs.parentElement;
      const containerW = container ? container.clientWidth : 600;
      const charW = containerW / cols;
      const charH = charW;

      let rows: number;
      if (fill) {
        const containerH = container ? container.clientHeight : 400;
        rows = Math.ceil(containerH / charH);
      } else {
        rows = Math.floor(cols * (vh / vw));
      }

      const totalH = fill ? (container ? container.clientHeight : 400) : rows * charH;

      if (cvs.width !== Math.floor(containerW * dpr) || cvs.height !== Math.floor(totalH * dpr)) {
        cvs.width = containerW * dpr;
        cvs.height = totalH * dpr;
        cvs.style.width = containerW + 'px';
        cvs.style.height = totalH + 'px';
        setDimensions({ w: containerW, h: totalH });
      }

      // Sample video — contain-fit (show full video), bottom-aligned
      const cellX = charW;
      const cellY = totalH / rows;
      const videoAspect = vw / vh;
      const gridAspect = containerW / totalH;

      let sampleCols: number, sampleRows: number, colOffset: number, rowOffset: number;

      if (fill) {
        if (gridAspect > videoAspect) {
          // Grid wider than video — fit to height, left-aligned
          sampleRows = rows;
          sampleCols = Math.round((totalH * videoAspect) / cellX);
          colOffset = 0;
          rowOffset = 0;
        } else {
          // Grid taller than video — fit to width
          sampleCols = cols;
          sampleRows = Math.round((containerW / videoAspect) / cellY);
          colOffset = 0;
          rowOffset = rows - sampleRows;
        }
      } else {
        sampleCols = cols;
        sampleRows = rows;
        colOffset = 0;
        rowOffset = 0;
      }

      sampler.width = sampleCols;
      sampler.height = sampleRows;
      samplerCtx.drawImage(video, 0, 0, vw, vh, 0, 0, sampleCols, sampleRows);
      const pixels = samplerCtx.getImageData(0, 0, sampleCols, sampleRows).data;

      // Render
      ctx.save();
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.fillStyle = '#fff';
      ctx.fillRect(0, 0, containerW, totalH);

      const halfX = cellX / 2;
      const halfY = cellY / 2;
      const cell = cellX;

      ctx.lineWidth = Math.max(0.5, cell * 0.08);
      ctx.lineCap = 'round';

      for (let row = 0; row < sampleRows; row++) {
        for (let col = 0; col < sampleCols; col++) {
          const i = (row * sampleCols + col) * 4;
          const r = pixels[i], g = pixels[i + 1], b = pixels[i + 2];

          let lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
          if (invert) lum = 1 - lum;

          const isGreen = g > 50 && g > r * 1.1 && g > b * 1.1;
          const darkness = 1 - lum;
          if (darkness < threshold || isGreen) continue;
          const fade = 0.12;
          const alpha = Math.min(1, (darkness - threshold) / fade);

          const cx = (col + colOffset) * cellX + halfX;
          const cy = (row + rowOffset) * cellY + halfY;
          const max = Math.max(r, g, b);
          const min = Math.min(r, g, b);
          const range = max - min;
          let fr = r, fg = g, fb = b;
          if (range > 25) {
            const avg = (r + g + b) / 3;
            const sat = 3;
            fr = Math.max(0, Math.min(255, avg + (r - avg) * sat));
            fg = Math.max(0, Math.min(255, avg + (g - avg) * sat));
            fb = Math.max(0, Math.min(255, avg + (b - avg) * sat));
            const targetLum = Math.min(170, (1 - darkness) * 250);
            const curLum = (fr + fg + fb) / 3;
            if (curLum > 0) {
              const scale = targetLum / curLum;
              fr = Math.floor(Math.max(0, Math.min(255, fr * scale)));
              fg = Math.floor(Math.max(0, Math.min(255, fg * scale)));
              fb = Math.floor(Math.max(0, Math.min(255, fb * scale)));
            }
          } else {
            const grey = Math.floor(Math.max(0, (1 - darkness) * 140));
            fr = fg = fb = grey;
          }
          ctx.fillStyle = `rgb(${fr},${fg},${fb})`;
          ctx.globalAlpha = alpha;

          // Halftone — diamond shapes (45° squares) scale with darkness
          const rad = Math.sqrt(darkness) * cell * 0.85;
          ctx.beginPath();
          ctx.moveTo(cx, cy - rad);
          ctx.lineTo(cx + rad, cy);
          ctx.lineTo(cx, cy + rad);
          ctx.lineTo(cx - rad, cy);
          ctx.closePath();
          ctx.fill();
        }
      }

      if (fill && video.currentTime > 9.5) {
        ctx.globalAlpha = 1;
        ctx.fillStyle = '#fff';
        ctx.fillRect(0, 0, containerW, totalH * 0.17);
        ctx.fillRect(0, totalH * 0.83, containerW, totalH * 0.17);
      }

      if (borderRight && fill) {
        ctx.globalAlpha = 0.25;
        ctx.fillStyle = '#000';
        const borderX = (sampleCols + colOffset) * cellX;
        ctx.fillRect(borderX, 0, 1, totalH);
      }

      ctx.restore();
    }

    // Playlist support
    const sources = Array.isArray(src) ? src : [src];
    let currentIdx = 0;
    video.src = sources[currentIdx];

    video.addEventListener('canplay', () => {
      video.play().catch(() => {});
    });

    video.addEventListener('ended', () => {
      currentIdx = (currentIdx + 1) % sources.length;
      video.src = sources[currentIdx];
      video.load();
    });

    draw();

    const onResize = () => draw();
    window.addEventListener('resize', onResize);
    return () => { alive = false; window.removeEventListener('resize', onResize); };
  }, [src, cols, color]);

  return (
    <div className={className} style={{ width: '100%', height: '100%', position: 'relative' }}>
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        crossOrigin="anonymous"
        style={{ position: 'absolute', opacity: 0, pointerEvents: 'none', width: 1, height: 1 }}
      />
      <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: '100%', objectFit: 'cover' }} />
    </div>
  );
}
