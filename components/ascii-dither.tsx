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
  binarySizeScale?: number;
  filterGreen?: boolean;
  filterBlue?: boolean;
  pureColor?: boolean;
  greyscale?: boolean;
  rawColor?: boolean;
  tintRGB?: [number, number, number];
  cropTop?: boolean;
  offsetYSchedule?: Array<[number, string]>;
  onEnded?: () => void;
  playbackRate?: number;
  className?: string;
}

export function AsciiDither({ src, cols = 90, color = '#6b5ce7', threshold = 0, invert = false, fill = false, borderRight = false, darkMode = false, cover = false, saturation = 6, loopPauseMs = 0, binarySize = false, binarySizeScale = 0.85, filterGreen = false, filterBlue = false, pureColor = false, greyscale = false, rawColor = false, tintRGB, cropTop = false, offsetYSchedule, onEnded, playbackRate = 1, className = '' }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const overlayRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [dimensions, setDimensions] = useState({ w: 600, h: 400 });

  useEffect(() => {
    const cvs = canvasRef.current!;
    const overlay = overlayRef.current!;
    const video = videoRef.current!;
    if (!cvs || !overlay || !video) return;

    const ctx = cvs.getContext('2d')!;
    const overlayCtx = overlay.getContext('2d')!;
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
      applyOffset();

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

      if (fill && cover) {
        // Cover-fit: video fills entire grid, crop excess
        sampleCols = cols;
        sampleRows = rows;
        colOffset = 0;
        rowOffset = 0;
        if (gridAspect > videoAspect) {
          // Grid wider than video — crop top/bottom
          cropSH = vw / gridAspect;
          cropSY = cropTop ? 0 : (vh - cropSH) / 2;
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

      // Pre-build a unit diamond Path2D once per frame for the binarySize case
      let fixedDiamond: Path2D | null = null;
      if (binarySize) {
        const r = cell * binarySizeScale;
        fixedDiamond = new Path2D();
        fixedDiamond.moveTo(0, -r);
        fixedDiamond.lineTo(r, 0);
        fixedDiamond.lineTo(0, r);
        fixedDiamond.lineTo(-r, 0);
        fixedDiamond.closePath();
      }

      for (let row = 0; row < sampleRows; row++) {
        for (let col = 0; col < sampleCols; col++) {
          const i = (row * sampleCols + col) * 4;
          const r = pixels[i], g = pixels[i + 1], b = pixels[i + 2];

          let lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
          if (invert) lum = 1 - lum;

          const isGreen = filterGreen && g - Math.max(r, b) > 0;
          const isBlue = filterBlue && b > 80 && b > r * 1.8 && b > g * 1.4;
          const darkness = 1 - lum;
          if (darkness < threshold || isGreen || isBlue) continue;
          const fade = 0.12;
          const alpha = Math.min(1, (darkness - threshold) / fade);

          const cx = (col + colOffset) * cellX + halfX;
          const cy = (row + rowOffset) * cellY + halfY;
          const max = Math.max(r, g, b);
          const min = Math.min(r, g, b);
          const range = max - min;
          let fr = r, fg = g, fb = b;
          if (rawColor) {
            fr = r;
            fg = filterGreen ? Math.min(g, Math.max(r, b)) : g;
            fb = b;
          } else if (greyscale) {
            const intensity = darkMode ? darkness : 1 - darkness;
            if (tintRGB) {
              fr = Math.floor(Math.max(0, Math.min(255, tintRGB[0] * intensity)));
              fg = Math.floor(Math.max(0, Math.min(255, tintRGB[1] * intensity)));
              fb = Math.floor(Math.max(0, Math.min(255, tintRGB[2] * intensity)));
            } else {
              const grey = Math.floor(Math.max(0, (darkMode ? intensity * 255 : intensity * 140)));
              fr = fg = fb = grey;
            }
          } else if (pureColor) {
            // Mild vibrancy: small saturation + brightness boost while preserving hue
            // Slight pink shift (lift R and B, drop G a touch) to counter yellow cast
            const avg = (r + g + b) / 3;
            const sat = saturation;
            fr = Math.max(0, Math.min(255, (avg + (r - avg) * sat) * 1.32));
            fg = Math.max(0, Math.min(255, (avg + (g - avg) * sat) * 1.10));
            fb = Math.max(0, Math.min(255, (avg + (b - avg) * sat) * 1.35));
          } else if (range > 15) {
            const avg = (r + g + b) / 3;
            const sat = saturation;
            fr = Math.max(0, Math.min(255, avg + (r - avg) * sat));
            fg = Math.max(0, Math.min(255, avg + (g - avg) * sat));
            fb = Math.max(0, Math.min(255, avg + (b - avg) * sat));
            const targetLum = darkMode
              ? Math.max(150, darkness * 280)
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
          if (fixedDiamond) {
            ctx.translate(cx, cy);
            ctx.fill(fixedDiamond);
            ctx.translate(-cx, -cy);
          } else {
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

    let earlyEndFired = false;
    let onNextPlaying: (() => void) | null = null;

    const onLoaded = () => {
      if (onEnded && !started) {
        video.pause();
        setTimeout(() => {
          if (started) return;
          started = true;
          video.playbackRate = playbackRate;
          video.play().catch(() => {});
          cvs.style.opacity = '1';
        }, HOLD_MS);
      }
    };
    const onCanPlay = () => {
      if (!onEnded && !started) {
        started = true;
        video.playbackRate = playbackRate;
        video.play().catch(() => {});
      }
      cvs.style.opacity = '1';
    };
    const applyOffset = () => {
      if (!offsetYSchedule || offsetYSchedule.length === 0) return;
      const t = video.currentTime;
      let active = '0%';
      for (const [start, y] of offsetYSchedule) {
        if (t >= start) active = y;
      }
      cvs.style.transform = `translateY(${active})`;
    };
    const onTimeUpdate = () => {
      if (onEnded) return;
      if (!video.duration || isNaN(video.duration)) return;
      const remaining = video.duration - video.currentTime;
      if (sources.length <= 1 && remaining < 1.2 && cvs.style.opacity === '1') {
        cvs.style.opacity = '0';
      }
      if (remaining < 0.4 && !earlyEndFired) {
        earlyEndFired = true;
        video.dispatchEvent(new Event('ended'));
      }
    };
    const onPlay = () => {
      earlyEndFired = false;
      endedFired = false;
    };
    const onEndedHandler = () => {
      if (endedFired) return;
      endedFired = true;
      if (onEnded) {
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
      // Snapshot current main canvas to overlay so it covers the swap
      overlay.width = cvs.width;
      overlay.height = cvs.height;
      overlay.style.width = cvs.style.width;
      overlay.style.height = cvs.style.height;
      overlayCtx.drawImage(cvs, 0, 0);
      overlay.style.transition = 'none';
      overlay.style.opacity = '1';

      // Wait until the next clip is actually playing before fading the overlay
      if (onNextPlaying) video.removeEventListener('playing', onNextPlaying);
      const startFade = () => {
        if (fadeTimer) clearTimeout(fadeTimer);
        requestAnimationFrame(() => {
          overlay.style.transition = 'opacity 0.6s ease';
          overlay.style.opacity = '0';
        });
      };
      onNextPlaying = () => {
        if (onNextPlaying) video.removeEventListener('playing', onNextPlaying);
        onNextPlaying = null;
        startFade();
      };
      video.addEventListener('playing', onNextPlaying);

      if (fadeTimer) clearTimeout(fadeTimer);
      // Safety fallback: if `playing` never fires, fade anyway after 1.5s
      fadeTimer = window.setTimeout(() => {
        if (onNextPlaying) {
          video.removeEventListener('playing', onNextPlaying);
          onNextPlaying = null;
        }
        startFade();
      }, 1500);

      video.src = sources[currentIdx];
      video.load();
      video.play().catch(() => {});
    };

    video.addEventListener('loadeddata', onLoaded);
    video.addEventListener('canplay', onCanPlay);
    video.addEventListener('timeupdate', onTimeUpdate);
    video.addEventListener('play', onPlay);
    video.addEventListener('ended', onEndedHandler);

    draw();

    const onResize = () => draw();
    window.addEventListener('resize', onResize);
    return () => {
      alive = false;
      window.removeEventListener('resize', onResize);
      video.removeEventListener('loadeddata', onLoaded);
      video.removeEventListener('canplay', onCanPlay);
      video.removeEventListener('timeupdate', onTimeUpdate);
      video.removeEventListener('play', onPlay);
      video.removeEventListener('ended', onEndedHandler);
      if (onNextPlaying) video.removeEventListener('playing', onNextPlaying);
      if (fadeTimer) clearTimeout(fadeTimer);
    };
  }, [src, cols, color, threshold, invert, fill, darkMode, borderRight, cover, saturation, loopPauseMs, binarySize, binarySizeScale, filterGreen, filterBlue, pureColor, greyscale, rawColor, tintRGB, cropTop, offsetYSchedule]);

  return (
    <div className={className} style={{ width: '100%', height: '100%', position: 'relative' }}>
      <video
        ref={videoRef}
        autoPlay={!onEnded}
        muted
        playsInline
        preload="auto"
        crossOrigin="anonymous"
        style={{ position: 'absolute', opacity: 0, pointerEvents: 'none', width: 1, height: 1 }}
      />
      <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: '100%', objectFit: 'cover', position: 'relative', zIndex: 1 }} />
      <canvas ref={overlayRef} style={{ display: 'block', position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', pointerEvents: 'none', opacity: 0, zIndex: 2 }} />
    </div>
  );
}
