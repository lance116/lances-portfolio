import { NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';

// Per-visit read+write, never cached.
export const dynamic = 'force-dynamic';

// Works with either the Upstash integration or Vercel KV env var names.
const url = process.env.UPSTASH_REDIS_REST_URL ?? process.env.KV_REST_API_URL;
const token = process.env.UPSTASH_REDIS_REST_TOKEN ?? process.env.KV_REST_API_TOKEN;
const redis = url && token ? new Redis({ url, token }) : null;

const KEY = 'last-visitor';

type Location = { city: string; country: string };

// Vercel sets geo headers URL-encoded (e.g. "San%20Francisco").
function decode(value: string | null): string {
  if (!value) return '';
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

export async function GET(request: Request) {
  const h = request.headers;
  const city = decode(h.get('x-vercel-ip-city'));
  const country = decode(h.get('x-vercel-ip-country'));
  const current: Location | null = city || country ? { city, country } : null;

  // Store not configured (or local dev) — show the current visitor as a fallback.
  if (!redis) {
    return NextResponse.json({ location: current });
  }

  try {
    const previous = await redis.get<Location>(KEY);
    // Record this visitor as the new "last" for whoever comes next.
    if (current) await redis.set(KEY, current);
    return NextResponse.json({ location: previous ?? current });
  } catch {
    return NextResponse.json({ location: current });
  }
}
