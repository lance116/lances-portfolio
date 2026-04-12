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
  playbackRateSchedule?: Array<[number, number]>;
  xOffsetBySrc?: string[];
  yOffsetBySrc?: string[];
  scale?: number;
  onEnded?: () => void;
  playbackRate?: number;
  batched?: boolean;
  className?: string;
}

export function AsciiDither({ src, cols = 90, color = '#6b5ce7', threshold = 0, invert = false, fill = false, borderRight = false, darkMode = false, cover = false, saturation = 6, loopPauseMs = 0, binarySize = false, binarySizeScale = 0.85, filterGreen = false, filterBlue = false, pureColor = false, greyscale = false, rawColor = false, tintRGB, cropTop = false, offsetYSchedule, playbackRateSchedule, xOffsetBySrc, yOffsetBySrc, scale = 1, onEnded, playbackRate = 1, batched = false, className = '' }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  // Second video element used only on iOS single-source loops: kept paused at
  // currentTime=0 with frame 0 pre-decoded so we can swap to it on the loop
  // boundary instead of waiting for the same element to decode-after-seek.
  const videoBRef = useRef<HTMLVideoElement>(null);
  const [dimensions, setDimensions] = useState({ w: 600, h: 400 });

  useEffect(() => {
    const cvs = canvasRef.current!;
    const videoA = videoRef.current!;
    const videoB = videoBRef.current!;
    if (!cvs || !videoA || !videoB) return;

    const ctx = cvs.getContext('2d')!;
    const sampler = document.createElement('canvas');
    const samplerCtx = sampler.getContext('2d', { willReadFrequently: true })!;

    // iOS Safari has 200-500ms decode-after-loop latency that makes native
    // <video loop> visibly stutter at every loop boundary. Detect iOS and use
    // a second video element kept paused at currentTime=0 so we can swap to
    // a pre-decoded element instead of waiting on a fresh decode.
    const isIOS = typeof navigator !== 'undefined' && (
      /iP(hone|od|ad)/.test(navigator.platform) ||
      (navigator.platform === 'MacIntel' && (navigator as Navigator & { maxTouchPoints?: number }).maxTouchPoints !== undefined && (navigator as Navigator & { maxTouchPoints?: number }).maxTouchPoints! > 1)
    );

    // Two-video swap path used only for iOS single-source loops. Everything
    // else (multi-source playlists, non-iOS) keeps a single video element
    // and the native loop / src-swap behavior.
    const useDualVideo = isIOS && !Array.isArray(src) && !onEnded;
    let activeVideo = videoA;
    let standbyVideo = videoB;
    const video = videoA;

    let alive = true;
    const dpr = window.devicePixelRatio || 1;
    let pendingPaintCallback: (() => void) | null = null;
    // Reused across frames when `batched` is on: groups cells by quantized
    // (color, alpha) so we can emit one fill() per bucket. Big win on iOS
    // Safari where per-cell fill() dominates; turn off on desktop where the
    // bookkeeping costs more than the saved fills in high-color scenes.
    const colorBuckets = new Map<number, Path2D>();

    // Wipe the canvas to bg color. Used before re-revealing on a seek/swap so
    // a stale frame held in the iOS Safari decode buffer can't flash through
    // when opacity returns to 1.
    const clearCanvas = () => {
      ctx.save();
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.fillStyle = darkMode ? '#000' : '#fff';
      ctx.fillRect(0, 0, cvs.width / dpr, cvs.height / dpr);
      ctx.restore();
    };

    // Snapshot of the rendered first frame from the initial playthrough.
    // Painted onto the canvas at every native loop boundary so the fade-in
    // shows real content instantly — no waiting for iOS Safari to decode
    // frame 0 after the loop, which is what produced the cocoon glitch.
    const frame0Canvas = document.createElement('canvas');
    let frame0Captured = false;
    let frame0Dims = { w: 0, h: 0 };

    // Set after clearCanvas so draw() doesn't immediately overwrite the cleared
    // pixels by sampling whatever stale frame iOS Safari still has buffered for
    // the video element. Held until currentTime advances past the seek point or
    // the safety deadline expires.
    let suppressSampleUntilT = -1;
    let suppressDeadlineMs = 0;

    function getSize() {
      const container = cvs.parentElement;
      return container ? container.clientWidth : 600;
    }

    let lastDrawnVideoTime = -1;

    function draw() {
      if (!alive) return;
      requestAnimationFrame(draw);

      const v = activeVideo;
      const vw = v.videoWidth;
      const vh = v.videoHeight;
      if (!vw || !vh || v.readyState < 2) return;

      const curT = v.currentTime;

      // Detect a native loop boundary on the RAF tick (~60Hz). Paint the
      // cached frame-0 onto the canvas (instead of clearing) so the fade-in
      // can reveal a real frame immediately — iOS's decode-after-loop
      // latency no longer matters because we're not waiting on drawImage.
      // Suppress sampling briefly so the live drawImage doesn't overwrite
      // our cached frame with whatever stale buffer iOS has until it catches
      // up; once currentTime advances past the loop point, live sampling
      // takes over and the fade is already running on real content.
      if (sources.length <= 1 && lastDrawnVideoTime > 0 && curT < lastDrawnVideoTime - 1) {
        if (frame0Captured && frame0Dims.w === cvs.width && frame0Dims.h === cvs.height) {
          ctx.save();
          ctx.setTransform(1, 0, 0, 1, 0, 0);
          ctx.globalAlpha = 1;
          ctx.drawImage(frame0Canvas, 0, 0);
          ctx.restore();
        } else {
          clearCanvas();
        }
        suppressSampleUntilT = curT;
        suppressDeadlineMs = performance.now() + 500;
        if (cvs.style.opacity !== '1') cvs.style.opacity = '1';
        lastDrawnVideoTime = -1;
      }

      if (suppressSampleUntilT >= 0) {
        if (curT > suppressSampleUntilT + 0.001 || performance.now() > suppressDeadlineMs) {
          suppressSampleUntilT = -1;
        } else {
          if (pendingPaintCallback) {
            const cb = pendingPaintCallback;
            pendingPaintCallback = null;
            cb();
          }
          return;
        }
      }

      // Skip the heavy resample/render if the video frame hasn't advanced.
      // 60fps RAF on 25fps video would otherwise repeat identical work.
      if (curT === lastDrawnVideoTime) {
        if (pendingPaintCallback) {
          const cb = pendingPaintCallback;
          pendingPaintCallback = null;
          cb();
        }
        return;
      }
      lastDrawnVideoTime = curT;

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
      samplerCtx.drawImage(v, cropSX, cropSY, cropSW, cropSH, 0, 0, sampleCols, sampleRows);
      const pixels = samplerCtx.getImageData(0, 0, sampleCols, sampleRows).data;

      // Render
      ctx.save();
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.fillStyle = darkMode ? '#000' : '#fff';
      ctx.fillRect(0, 0, containerW, totalH);

      const halfX = cellX / 2;
      const halfY = cellY / 2;
      const cell = cellX;

      // Pre-build a unit diamond Path2D once per frame for the binarySize case
      let fixedDiamond: Path2D | null = null;
      const binR = binarySize ? cell * binarySizeScale : 0;
      if (binarySize && !batched) {
        fixedDiamond = new Path2D();
        fixedDiamond.moveTo(0, -binR);
        fixedDiamond.lineTo(binR, 0);
        fixedDiamond.lineTo(0, binR);
        fixedDiamond.lineTo(-binR, 0);
        fixedDiamond.closePath();
      }

      // Cache last fillStyle/alpha to skip redundant style mutations
      let lastFr = -1, lastFg = -1, lastFb = -1, lastAlpha = -1;
      const fadeInv = 16 / 0.12;
      if (batched) colorBuckets.clear();

      for (let row = 0; row < sampleRows; row++) {
        const rowBase = row * sampleCols;
        for (let col = 0; col < sampleCols; col++) {
          const i = (rowBase + col) * 4;
          const r = pixels[i], g = pixels[i + 1], b = pixels[i + 2];

          let lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
          if (invert) lum = 1 - lum;

          const darkness = 1 - lum;
          if (darkness < threshold) continue;
          if (filterGreen && g - Math.max(r, b) > 0) continue;
          if (filterBlue && b > 80 && b > r * 1.8 && b > g * 1.4) continue;

          let alphaQ = Math.round((darkness - threshold) * fadeInv);
          if (alphaQ <= 0) continue;
          if (alphaQ > 16) alphaQ = 16;
          const alpha = alphaQ / 16;

          const cx = (col + colOffset) * cellX + halfX;
          const cy = (row + rowOffset) * cellY + halfY;
          let fr = r, fg = g, fb = b;
          if (rawColor) {
            if (filterGreen) fg = Math.min(g, Math.max(r, b));
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
            const avg = (r + g + b) / 3;
            const sat = saturation;
            fr = Math.max(0, Math.min(255, (avg + (r - avg) * sat) * 1.32));
            fg = Math.max(0, Math.min(255, (avg + (g - avg) * sat) * 1.10));
            fb = Math.max(0, Math.min(255, (avg + (b - avg) * sat) * 1.35));
          } else {
            const max = r > g ? (r > b ? r : b) : (g > b ? g : b);
            const min = r < g ? (r < b ? r : b) : (g < b ? g : b);
            if (max - min > 15) {
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
          }
          if (batched) {
            const qr = fr >> 3;
            const qg = fg >> 3;
            const qb = fb >> 3;
            const key = (qr << 15) | (qg << 10) | (qb << 5) | alphaQ;
            let path = colorBuckets.get(key);
            if (path === undefined) {
              path = new Path2D();
              colorBuckets.set(key, path);
            }
            const rad = binarySize ? binR : Math.sqrt(darkness) * cell * 0.85;
            path.moveTo(cx, cy - rad);
            path.lineTo(cx + rad, cy);
            path.lineTo(cx, cy + rad);
            path.lineTo(cx - rad, cy);
            path.closePath();
          } else {
            if (fr !== lastFr || fg !== lastFg || fb !== lastFb) {
              ctx.fillStyle = `rgb(${fr},${fg},${fb})`;
              lastFr = fr; lastFg = fg; lastFb = fb;
            }
            if (alpha !== lastAlpha) {
              ctx.globalAlpha = alpha;
              lastAlpha = alpha;
            }

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
      }

      if (batched) {
        ctx.globalAlpha = 1;
        colorBuckets.forEach((path, key) => {
          const qr = (key >> 15) & 31;
          const qg = (key >> 10) & 31;
          const qb = (key >> 5) & 31;
          const aQ = key & 31;
          const r8 = (qr << 3) | (qr >> 2);
          const g8 = (qg << 3) | (qg >> 2);
          const b8 = (qb << 3) | (qb >> 2);
          ctx.fillStyle = `rgba(${r8},${g8},${b8},${aQ / 16})`;
          ctx.fill(path);
        });
      }

      if (fill && !darkMode && v.currentTime > 9.5) {
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

      // Cache the rendered first frame so the next loop boundary can paint
      // it immediately, instead of waiting on iOS to decode video frame 0.
      if (sources.length <= 1 && !frame0Captured && curT > 0.05 && curT < 0.4) {
        if (frame0Canvas.width !== cvs.width || frame0Canvas.height !== cvs.height) {
          frame0Canvas.width = cvs.width;
          frame0Canvas.height = cvs.height;
        }
        const f0 = frame0Canvas.getContext('2d');
        if (f0) {
          f0.setTransform(1, 0, 0, 1, 0, 0);
          f0.clearRect(0, 0, frame0Canvas.width, frame0Canvas.height);
          f0.drawImage(cvs, 0, 0);
          frame0Dims = { w: cvs.width, h: cvs.height };
          frame0Captured = true;
        }
      }

      if (pendingPaintCallback) {
        const cb = pendingPaintCallback;
        pendingPaintCallback = null;
        cb();
      }
    }

    // Playlist support with fade transitions
    const sources = Array.isArray(src) ? src : [src];
    let currentIdx = 0;
    video.src = sources[currentIdx];
    // Native loop only when we're not dual-buffering. Dual-buffering manages
    // the loop manually by swapping to the standby video on 'ended'.
    video.loop = sources.length === 1 && !onEnded && !useDualVideo;

    // Brief play+pause to force iOS to decode the standby video's frame 0
    // into its display buffer, so the swap-time play() doesn't pay the same
    // decode-from-seek latency we're trying to avoid.
    const primeStandby = (v: HTMLVideoElement) => {
      v.pause();
      try { v.currentTime = 0; } catch {}
      v.play().then(() => {
        window.setTimeout(() => {
          if (!alive) return;
          v.pause();
          try { v.currentTime = 0; } catch {}
        }, 40);
      }).catch(() => {});
    };

    if (useDualVideo) {
      videoB.src = sources[0];
      videoB.muted = true;
      videoB.playsInline = true;
      const onBReady = () => {
        videoB.removeEventListener('canplay', onBReady);
        if (!alive) return;
        primeStandby(videoB);
      };
      videoB.addEventListener('canplay', onBReady);
      videoB.load();
    }
    cvs.style.transition = 'opacity 0.25s ease';
    cvs.style.opacity = onEnded ? '1' : '0';
    let fadeTimer: number | null = null;
    let started = false;
    let endedFired = false;
    const HOLD_MS = 200;

    let earlyEndFired = false;
    let onNextPlaying: (() => void) | null = null;

    const onLoaded = (e: Event) => {
      if (useDualVideo && e.target !== activeVideo) return;
      if (onEnded && !started) {
        activeVideo.pause();
        setTimeout(() => {
          if (started) return;
          started = true;
          activeVideo.playbackRate = playbackRate;
          activeVideo.play().catch(() => {});
          cvs.style.opacity = '1';
        }, HOLD_MS);
      }
    };
    const onCanPlay = (e: Event) => {
      if (useDualVideo && e.target !== activeVideo) return;
      if (!onEnded && !started) {
        started = true;
        activeVideo.playbackRate = playbackRate;
        activeVideo.play().catch(() => {});
      }
      cvs.style.opacity = '1';
    };
    const applyOffset = () => {
      const t = activeVideo.currentTime;
      let activeY = '0%';
      if (offsetYSchedule && offsetYSchedule.length > 0) {
        for (const [start, y] of offsetYSchedule) {
          if (t >= start) activeY = y;
        }
      }
      const activeX = xOffsetBySrc && xOffsetBySrc[currentIdx] ? xOffsetBySrc[currentIdx] : '0%';
      const srcY = yOffsetBySrc && yOffsetBySrc[currentIdx] ? yOffsetBySrc[currentIdx] : '0%';
      const composedY = activeY === '0%' ? srcY : (srcY === '0%' ? activeY : `calc(${activeY} + ${srcY})`);
      const transform = `translate(${activeX}, ${composedY}) scale(${scale})`;
      if (cvs.style.transform !== transform) cvs.style.transform = transform;

      if (playbackRateSchedule && playbackRateSchedule.length > 0) {
        let activeRate = playbackRate;
        for (const [start, rate] of playbackRateSchedule) {
          if (t >= start) activeRate = rate;
        }
        if (activeVideo.playbackRate !== activeRate) activeVideo.playbackRate = activeRate;
      }
    };
    const onTimeUpdate = (e: Event) => {
      if (useDualVideo && e.target !== activeVideo) return;
      if (onEnded) return;
      if (!activeVideo.duration || isNaN(activeVideo.duration)) return;
      const t = activeVideo.currentTime;
      const remaining = activeVideo.duration - t;

      if (sources.length <= 1) {
        // Loop boundary is caught in the draw RAF; timeupdate just handles
        // the fade-out trigger near the end of each pass. Trigger as late as
        // safely possible so the invisible tail before the loop is short.
        if (remaining < 0.5 && cvs.style.opacity === '1') {
          cvs.style.opacity = '0';
        }
      } else if (remaining < 0.4 && !earlyEndFired) {
        // Multi-source: trigger early so we can swap src under cover of fade.
        earlyEndFired = true;
        activeVideo.dispatchEvent(new Event('ended'));
      }
    };
    const onPlay = (e: Event) => {
      if (useDualVideo && e.target !== activeVideo) return;
      earlyEndFired = false;
      endedFired = false;
    };
    const onEndedHandler = (e: Event) => {
      if (useDualVideo && e.target !== activeVideo) return;
      if (endedFired) return;
      endedFired = true;
      if (onEnded) {
        // Hold last frame briefly before signaling end
        activeVideo.pause();
        setTimeout(() => onEnded(), HOLD_MS);
        return;
      }
      if (sources.length <= 1) {
        if (useDualVideo) {
          // Swap to the pre-decoded standby video. Paint cached frame-0 so
          // the canvas reveals real content the moment opacity returns to 1
          // — no waiting on iOS to decode-from-seek.
          const old = activeVideo;
          activeVideo = standbyVideo;
          standbyVideo = old;
          activeVideo.play().catch(() => {});
          if (frame0Captured && frame0Dims.w === cvs.width && frame0Dims.h === cvs.height) {
            ctx.save();
            ctx.setTransform(1, 0, 0, 1, 0, 0);
            ctx.globalAlpha = 1;
            ctx.drawImage(frame0Canvas, 0, 0);
            ctx.restore();
          } else {
            clearCanvas();
          }
          lastDrawnVideoTime = -1;
          suppressSampleUntilT = activeVideo.currentTime;
          suppressDeadlineMs = performance.now() + 400;
          if (cvs.style.opacity !== '1') cvs.style.opacity = '1';
          // Reset the just-finished video back to a primed standby state
          // so it has frame 0 decoded and ready for the next swap.
          primeStandby(old);
        }
        // Native loop (non-iOS) handles its own loop; nothing else to do.
        return;
      }
      // Sequential fade: hide current clip fully, then swap src, then reveal
      // new clip — guarantees no frame where both clips are visible.
      const FADE_OUT_MS = 400;
      cvs.style.transition = 'opacity 0.4s ease';
      cvs.style.opacity = '0';

      setTimeout(() => {
        if (!alive) return;
        currentIdx = (currentIdx + 1) % sources.length;

        if (onNextPlaying) video.removeEventListener('playing', onNextPlaying);
        onNextPlaying = () => {
          if (onNextPlaying) video.removeEventListener('playing', onNextPlaying);
          onNextPlaying = null;
          if (fadeTimer) clearTimeout(fadeTimer);
          clearCanvas();
          lastDrawnVideoTime = -1;
          suppressSampleUntilT = video.currentTime;
          suppressDeadlineMs = performance.now() + 1000;
          cvs.style.opacity = '1';
        };
        video.addEventListener('playing', onNextPlaying);

        if (fadeTimer) clearTimeout(fadeTimer);
        // Safety fallback: if `playing` never fires, reveal anyway after 1.5s
        fadeTimer = window.setTimeout(() => {
          if (onNextPlaying) {
            video.removeEventListener('playing', onNextPlaying);
            onNextPlaying = null;
          }
          pendingPaintCallback = null;
          cvs.style.opacity = '1';
        }, 1500);

        video.src = sources[currentIdx];
        video.load();
        video.play().catch(() => {});
      }, FADE_OUT_MS);
    };

    videoA.addEventListener('loadeddata', onLoaded);
    videoA.addEventListener('canplay', onCanPlay);
    videoA.addEventListener('timeupdate', onTimeUpdate);
    videoA.addEventListener('play', onPlay);
    videoA.addEventListener('ended', onEndedHandler);
    if (useDualVideo) {
      videoB.addEventListener('loadeddata', onLoaded);
      videoB.addEventListener('canplay', onCanPlay);
      videoB.addEventListener('timeupdate', onTimeUpdate);
      videoB.addEventListener('play', onPlay);
      videoB.addEventListener('ended', onEndedHandler);
    }

    draw();

    const onResize = () => {
      // Cached frame-0 dims won't match the new canvas size; let it re-capture.
      frame0Captured = false;
      draw();
    };
    window.addEventListener('resize', onResize);
    return () => {
      alive = false;
      window.removeEventListener('resize', onResize);
      videoA.removeEventListener('loadeddata', onLoaded);
      videoA.removeEventListener('canplay', onCanPlay);
      videoA.removeEventListener('timeupdate', onTimeUpdate);
      videoA.removeEventListener('play', onPlay);
      videoA.removeEventListener('ended', onEndedHandler);
      if (useDualVideo) {
        videoB.removeEventListener('loadeddata', onLoaded);
        videoB.removeEventListener('canplay', onCanPlay);
        videoB.removeEventListener('timeupdate', onTimeUpdate);
        videoB.removeEventListener('play', onPlay);
        videoB.removeEventListener('ended', onEndedHandler);
      }
      if (onNextPlaying) videoA.removeEventListener('playing', onNextPlaying);
      if (fadeTimer) clearTimeout(fadeTimer);
    };
  }, [src, cols, color, threshold, invert, fill, darkMode, borderRight, cover, saturation, loopPauseMs, binarySize, binarySizeScale, filterGreen, filterBlue, pureColor, greyscale, rawColor, tintRGB, cropTop, offsetYSchedule, playbackRateSchedule, xOffsetBySrc, yOffsetBySrc, scale, batched]);

  return (
    <div className={className} style={{ width: '100%', height: '100%', position: 'relative', backgroundColor: darkMode ? '#000' : '#fff' }}>
      <video
        ref={videoRef}
        autoPlay={!onEnded}
        muted
        playsInline
        preload="auto"
        style={{ position: 'absolute', opacity: 0, pointerEvents: 'none', width: '100%', height: '100%', top: 0, left: 0 }}
      />
      <video
        ref={videoBRef}
        muted
        playsInline
        preload="auto"
        style={{ position: 'absolute', opacity: 0, pointerEvents: 'none', width: '100%', height: '100%', top: 0, left: 0 }}
      />
      <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: '100%', objectFit: 'cover', position: 'relative', zIndex: 1 }} />
    </div>
  );
}
