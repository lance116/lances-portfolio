# Video Loop Journey — what we tried, what broke, what stuck

A running log of the bugs, hypotheses, and fixes for the ASCII-dither video
playback loop in `components/ascii-dither.tsx`. Most of the pain was iOS
Safari's video element behaving differently from desktop Chrome/Safari.

---

## The architecture

- A `<video>` element plays the source clip, hidden (`opacity: 0`).
- A `<canvas>` element is drawn to every animation frame: we sample the video
  via `samplerCtx.drawImage(video, ...)`, read pixels with `getImageData`, and
  render a halftone/ASCII dither into the visible canvas.
- For looping single-clip playback (butterfly, orchids), the video plays
  continuously; we fade the canvas out near the end and fade it back in for
  the next loop.
- For multi-clip playlists (fish), we swap `video.src` between clips and
  manage the transition with overlay/snapshot or sequential fades.

---

## Issues we hit, in roughly the order they appeared

### 1. End-of-video flash on loop / clip transition

**Symptom:** Just before the next loop or clip, the previous video's last
frame would briefly flash through the fade.

**Why:** Multiple causes stacked here:
- iOS Safari holds the last decoded frame in its GPU decode buffer.
  `drawImage(video)` keeps sampling that stale frame for tens to hundreds of
  ms after a `seek` or `src` swap, even after `seeked`/`playing` events fire.
- Our draw RAF loop kept running during the transition, sampling that stale
  frame and painting it onto the canvas, then revealing it when opacity
  returned to 1.

**Things we tried:**
- Wait for `seeked` event before fading in — not enough, iOS still had stale.
- Wait for `playing` event before fading in — same problem.
- Wait for `requestVideoFrameCallback` — supported on Safari but fired late
  (sometimes 500ms+ after the actual frame), produced its own freeze.
- 2-RAF delay after `seeked` — fast but not enough to outrun the stale buffer.
- Sync the overlay snapshot's CSS transform with the canvas — this fixed the
  multi-source "random frame in different position" variant, where the canvas
  jumped to the next clip's per-source offset while still showing the
  previous clip's pixels. The overlay snapshot had no transform, so it
  couldn't cover the canvas at its new position.
- Overlay crossfade replaced with sequential fade-out → src swap → fade-in for
  fish, so both clips can never be visible at once.
- **Pre-clear the canvas to bg color before re-revealing.** This worked: stale
  frames literally couldn't be on the canvas because we wiped it first.
- **Suppress the draw loop's sampling until the video advances past the seek
  point.** Pre-clearing alone was insufficient because the draw RAF could
  fire in the same animation frame as the opacity RAF and immediately
  overwrite the cleared canvas with the stale-buffered sample.

### 2. ~0.5-1s freeze at the start of each replay (iOS)

**Symptom:** After the fade-out, the cocoon (start of butterfly) would sit
visibly frozen for half a second to a second before actually playing.

**Why:** iOS Safari takes 200-500ms (sometimes more) after `video.currentTime
= 0; video.play()` before the video element actually starts presenting fresh
frames. Our `waitForFreshFrame` waited for `currentTime` to advance, so the
canvas stayed cleared/hidden the whole time.

**Things we tried:**
- Reduce the `waitForFreshFrame` cap from 800ms to 200ms — still felt frozen.
- Skip `waitForFreshFrame` entirely + pre-clear canvas — fixed the freeze
  but the stale frame came back (see issue 1).
- Switch single-source playback to the native `<video loop>` attribute.
  Browser handles the loop seamlessly with no `play()` call needed, so iOS
  has no rate-limit / decode-after-seek delay to introduce. Detect the loop
  boundary via `currentTime` jumping backwards and run the same
  clear+suppress dance to handle any remaining stale-buffer lag.
- Initially detected the loop in `timeupdate` (~4Hz on iOS), which left a
  ~250ms gap between the actual loop boundary and the fade-in trigger.
  Moved loop detection into the draw RAF (~60Hz) so the fade-in starts
  within ~16ms of the loop.
- Cache the rendered first frame to an offscreen canvas during the initial
  playthrough; paint it onto the visible canvas at every loop boundary so
  the fade-in reveals real content immediately instead of cleared bg.
- Tighten timings: fade-out trigger from `remaining < 1.2` to `< 0.5`,
  CSS fade duration from 0.4s to 0.25s. Cuts the perceived pause window
  significantly. None of this attacks the actual iOS decode latency, just
  the surrounding fluff.
- **Final fix: dual-video swap on iOS.** Render a second `<video>`
  element kept paused at `currentTime=0` with frame 0 forcibly decoded
  via a 40ms play+pause prime. When the active video ends, swap to the
  standby and play it — playback resumes from a pre-decoded frame so iOS
  skips the decode-from-seek latency entirely. The just-finished video
  gets reset and re-primed for the next swap. iOS-only — Mac/non-iOS
  keeps the simpler native loop path.

### 3. Video stops playing entirely after 3-4 cycles (iOS Safari)

**Symptom:** Butterfly (or any single-source clip) plays a few times, then
just stops — white screen, no further loops.

**Why:** iOS Safari rate-limits or breaks rapid `video.currentTime = 0;
video.play()` loops. After a few cycles the `play()` promise resolves but
the video element doesn't actually advance. Our state machine waited for
`currentTime` to change, never got it, and revealed the canvas while the
video was stalled at frame 0 (which `drawImage` returned as transparent or
white).

**Things we tried:**
- Add a 700ms watchdog after `play()` — if `currentTime` is still ~0, force
  `video.load()` + `play()` again. Helped but not 100% reliable.
- **Switch single-source to `<video loop>`** (fixed issue 2 too). With
  native loop there is no manual `play()` per cycle, so iOS has nothing to
  rate-limit. Failure mode disappeared. The dual-video swap on iOS still
  uses `play()` per cycle but on alternating elements, which iOS doesn't
  appear to rate-limit the same way.

### 4. SSR layout flicker on first load

**Symptom:** Page loaded with the desktop side-by-side layout for a beat,
then snapped to the mobile vertical layout.

**Why:** `isNarrow` defaulted to `false`, so server-side render produced the
desktop layout. JS then ran `useEffect`, detected the actual viewport, and
re-rendered.

**Fix:** Render a mode-colored blank `<main>` placeholder until the
viewport check has run after mount.

### 5. Canvas area flashed black before the first video frame

**Symptom:** On initial load, the area where the ASCII canvas would appear
flashed black before the video started rendering into it.

**Why:** An uninitialized `<canvas>` element renders as black on iOS
Safari. Until the first `draw()` painted into it, the canvas was that
default black.

**Fix:** Set the AsciiDither wrapper `<div>` to `backgroundColor: darkMode ?
'#000' : '#fff'`. The wrapper now matches what the canvas will eventually
paint, so there's nothing to flash through.

### 6. Mobile FPS too low

**Symptom:** Mobile felt laggy / sub-25fps.

**Things we tried:**
- **Skip the heavy resample/render when `video.currentTime` hasn't
  advanced.** RAF runs at ~60Hz but the source video is 25fps, so ~58% of
  draws were redoing identical work. Big clean win.
- **Batch dither cells by quantized (color, alpha) into Path2D buckets,
  emit one `fillStyle` + `fill()` per bucket.** Helped iOS (per-cell
  `fill()` is the dominant cost there). On desktop the bookkeeping cost
  more than the savings during high-color scenes (butterfly opens its
  wings) so it visibly lagged.
- **Made batching opt-in via a `batched` prop**, enabled only on the
  mobile layouts (fish/orchids/butterfly stacked). Best of both.

### 7. Desktop FPS regressed when the butterfly opened its wings

See issue 6 — the unconditional batching exploded the bucket count in
high-color scenes and the bookkeeping outweighed the savings. Reverted to
per-cell loop on desktop, kept batching for mobile only.

---

## Architectural takeaways

The bugs were almost all about three async timelines that have to align:
- the video element's internal decode/playback state (mostly opaque to JS),
- the canvas RAF render loop,
- CSS opacity transitions.

iOS Safari makes this worse than desktop because:
- It holds the last decoded frame in its buffer across seeks/loops.
- It rate-limits rapid `seek + play` patterns.
- `seeked` and `playing` fire before frames are actually presented.
- `requestVideoFrameCallback` is delayed.
- `timeupdate` fires only ~4Hz vs ~60Hz on desktop.
- Autoplay context can quietly expire after a few cycles.

The "right" architectures are:
1. **Two alternating `<video>` elements**, preloading the next while the
   current plays, crossfade between two canvases. Eliminates seek/play
   entirely.
2. **`<video loop>`** for single clips with timeupdate/RAF-based loop
   detection for the fade. (This is what we landed on for single-source.)

What we have now:
- Single-source clips on **non-iOS**: native `<video loop>`, RAF-based loop
  detection, clear+suppress + cached frame-0 paint on the boundary.
- Single-source clips on **iOS**: dual `<video>` elements, swap on `ended`,
  standby element kept paused at currentTime=0 with frame 0 forcibly
  pre-decoded so the swap-time `play()` skips iOS's decode-from-seek wait.
- Multi-source playlists: sequential canvas fade-out → src swap → fade-in,
  so both clips can never be visible at once.
- Mobile: batched dither rendering for the per-cell `fill()` reduction.
- Desktop: direct per-cell dither rendering for high-color smoothness.

---

## Useful code anchors

- `components/ascii-dither.tsx` — all rendering and playback state.
- `clearCanvas()` — wipes to bg color before re-revealing.
- `frame0Canvas` / `frame0Captured` — offscreen cache of the first
  rendered frame, painted onto the visible canvas at every loop boundary
  so the fade-in reveals real content immediately.
- `suppressSampleUntilT` — gates the draw loop's `drawImage` until the
  video has actually advanced past the seek/loop point.
- `lastDrawnVideoTime` — frame-skip cache; reset on restart so the next
  draw can't be incorrectly skipped.
- `colorBuckets` (when `batched` is on) — per-frame `Map<number, Path2D>`
  for color-grouped fills.
- `useDualVideo` / `activeVideo` / `standbyVideo` / `primeStandby()` —
  iOS-only dual-video swap. Both `<video>` elements share the src;
  `activeVideo` is sampled by `drawImage`, `standbyVideo` is paused at
  currentTime=0 with frame 0 pre-decoded. On `ended`, refs swap and
  the new active plays from a pre-decoded frame.

---

## Files touched

- `components/ascii-dither.tsx`
- `app/page.tsx`
