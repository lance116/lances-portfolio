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
  darkMode?: boolean;
  cover?: boolean;
  saturation?: number;
  loopPauseMs?: number;
  binarySize?: boolean;
  onEnded?: () => void;
  playbackRate?: number;
  className?: string;
}

export function AsciiDither({ src, cols = 90, color = '#6b5ce7', threshold = 0, invert = false, fill = false, borderRight = false, darkMode = false, cover = false, saturation = 6, loopPauseMs = 0, binarySize = false, onEnded, playbackRate = 1, className = '' }: Props) {
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
      let cropSX = 0, cropSY = 0, cropSW = vw, cropSH = vh;

      if (fill && (darkMode || cover)) {
        // Cover-fit: video fills entire grid, crop excess
        sampleCols = cols;
        sampleRows = rows;
        colOffset = 0;
        rowOffset = 0;
        if (gridAspect > videoAspect) {
          // Grid wider than video — crop top/bottom
          cropSH = vw / gridAspect;
          cropSY = (vh - cropSH) / 2;
        } else {
          // Grid taller than video — crop left/right
          cropSW = vh * gridAspect;
          cropSX = (vw - cropSW) / 2;
        }
      } else if (fill) {
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

      sampleCols = Math.max(1, Math.floor(sampleCols) || 1);
      sampleRows = Math.max(1, Math.floor(sampleRows) || 1);
      sampler.width = sampleCols;
      sampler.height = sampleRows;
      samplerCtx.drawImage(video, cropSX, cropSY, cropSW, cropSH, 0, 0, sampleCols, sampleRows);
      const pixels = samplerCtx.getImageData(0, 0, sampleCols, sampleRows).data;

      // Render
      ctx.save();
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.fillStyle = darkMode ? '#000' : '#fff';
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
          if (range > 15) {
            const avg = (r + g + b) / 3;
            const sat = saturation;
            fr = Math.max(0, Math.min(255, avg + (r - avg) * sat));
            fg = Math.max(0, Math.min(255, avg + (g - avg) * sat));
            fb = Math.max(0, Math.min(255, avg + (b - avg) * sat));
            const targetLum = darkMode
              ? Math.max(120, darkness * 255)
              : Math.min(170, (1 - darkness) * 250);
            const curLum = (fr + fg + fb) / 3;
            if (curLum > 0) {
              const scale = targetLum / curLum;
              fr = Math.floor(Math.max(0, Math.min(255, fr * scale)));
              fg = Math.floor(Math.max(0, Math.min(255, fg * scale)));
              fb = Math.floor(Math.max(0, Math.min(255, fb * scale)));
            }
          } else {
            const grey = darkMode
              ? Math.floor(Math.max(0, darkness * 220))
              : Math.floor(Math.max(0, (1 - darkness) * 140));
            fr = fg = fb = grey;
          }
          ctx.fillStyle = `rgb(${fr},${fg},${fb})`;
          ctx.globalAlpha = alpha;

          // Halftone — diamond shapes (45° squares) scale with darkness
          const rad = binarySize ? cell * 0.85 : Math.sqrt(darkness) * cell * 0.85;
          ctx.beginPath();
          ctx.moveTo(cx, cy - rad);
          ctx.lineTo(cx + rad, cy);
          ctx.lineTo(cx, cy + rad);
          ctx.lineTo(cx - rad, cy);
          ctx.closePath();
          ctx.fill();
        }
      }

      if (fill && !darkMode && video.currentTime > 9.5) {
        ctx.globalAlpha = 1;
        ctx.fillStyle = '#fff';
        ctx.fillRect(0, 0, containerW, totalH * 0.17);
        ctx.fillRect(0, totalH * 0.83, containerW, totalH * 0.17);
      }

      if (borderRight && fill) {
        ctx.globalAlpha = 0.1;
        ctx.fillStyle = '#000';
        const borderX = (sampleCols + colOffset) * cellX;
        ctx.fillRect(borderX, 0, 1, totalH);
      }

      ctx.restore();
    }

    // Playlist support with fade transitions
    const sources = Array.isArray(src) ? src : [src];
    let currentIdx = 0;
    video.src = sources[currentIdx];
    cvs.style.transition = 'opacity 0.4s ease';
    cvs.style.opacity = onEnded ? '1' : '0';
    let fadeTimer: number | null = null;
    let started = false;
    let endedFired = false;
    const HOLD_MS = 200;

    video.addEventListener('loadeddata', () => {
      if (onEnded && !started) {
        // Transition mode: hold on first frame briefly, then play
        video.pause();
        setTimeout(() => {
          if (started) return;
          started = true;
          video.playbackRate = playbackRate;
          video.play().catch(() => {});
          cvs.style.opacity = '1';
        }, HOLD_MS);
      }
    });

    video.addEventListener('canplay', () => {
      if (!onEnded && !started) {
        started = true;
        video.playbackRate = playbackRate;
        video.play().catch(() => {});
      }
      cvs.style.opacity = '1';
    });

    let earlyEndFired = false;
    video.addEventListener('timeupdate', () => {
      if (onEnded) return;
      if (!video.duration || isNaN(video.duration)) return;
      const remaining = video.duration - video.currentTime;
      // Start fading out 0.8s before the cut point (0.4s before actual end)
      if (remaining < 1.2 && cvs.style.opacity === '1') {
        cvs.style.opacity = '0';
      }
      // Trigger swap/loop 0.4s before actual end
      if (remaining < 0.4 && !earlyEndFired) {
        earlyEndFired = true;
        video.dispatchEvent(new Event('ended'));
      }
    });

    video.addEventListener('play', () => {
      earlyEndFired = false;
    });

    video.addEventListener('ended', () => {
      if (onEnded) {
        if (endedFired) return;
        endedFired = true;
        // Hold last frame briefly before signaling end
        video.pause();
        setTimeout(() => onEnded(), HOLD_MS);
        return;
      }
      if (sources.length <= 1) {
        const restart = () => {
          video.currentTime = 0;
          video.play().catch(() => {});
          requestAnimationFrame(() => {
            cvs.style.opacity = '1';
          });
        };
        if (loopPauseMs > 0) {
          setTimeout(restart, loopPauseMs);
        } else {
          restart();
        }
        return;
      }
      currentIdx = (currentIdx + 1) % sources.length;
      if (fadeTimer) clearTimeout(fadeTimer);
      fadeTimer = window.setTimeout(() => {
        video.src = sources[currentIdx];
        video.load();
      }, 100);
    });

    draw();

    const onResize = () => draw();
    window.addEventListener('resize', onResize);
    return () => { alive = false; window.removeEventListener('resize', onResize); };
  }, [src, cols, color, threshold, invert, fill, darkMode, borderRight, cover, saturation, loopPauseMs, binarySize]);

  return (
    <div className={className} style={{ width: '100%', height: '100%', position: 'relative', backgroundColor: '#fff' }}>
      <video
        ref={videoRef}
        autoPlay={!onEnded}
        muted
        playsInline
        preload="auto"
        crossOrigin="anonymous"
        style={{ position: 'absolute', opacity: 0, pointerEvents: 'none', width: 1, height: 1 }}
      />
      <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: '100%', objectFit: 'cover' }} />
    </div>
  );
}
