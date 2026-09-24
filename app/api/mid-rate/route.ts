import { NextResponse } from "next/server";

/**
 * Mid-market reference rates for AED → PHP / INR / PKR.
 *
 * Source: https://open.er-api.com/v6/latest/AED — free, no API key, AED
 * supported as base currency, refreshes ~daily.
 *
 * We cache the fetch for 3600 seconds (1 hour). Vercel's Data Cache
 * returns the cached response to every visitor for that hour; only one
 * request per hour actually hits open.er-api.com. Nothing personal is
 * sent upstream — this is a pure server-side lookup.
 *
 * If the upstream fails, we return HTTP 502 with `error` set. The
 * client-side <Calculator /> renders a graceful fallback message.
 */

export const revalidate = 3600; // hint to Next.js runtime

type Payload = {
  base: "AED";
  rates: { PHP: number; INR: number; PKR: number };
  updatedUtc: string; // ISO
  source: string;
  sourceHost: string;
};

export async function GET() {
  try {
    const upstream = await fetch("https://open.er-api.com/v6/latest/AED", {
      next: { revalidate: 3600 },
      // A UA so upstream stats attribute traffic to us.
      headers: { "User-Agent": "sendfrom.ae mid-rate cache" },
    });
    if (!upstream.ok) {
      return NextResponse.json(
        { error: `upstream ${upstream.status}` },
        { status: 502 },
      );
    }
    const d = await upstream.json();
    if (d.result !== "success" || d.base_code !== "AED") {
      return NextResponse.json({ error: "unexpected upstream shape" }, { status: 502 });
    }
    const body: Payload = {
      base: "AED",
      rates: {
        PHP: Number(d.rates.PHP),
        INR: Number(d.rates.INR),
        PKR: Number(d.rates.PKR),
      },
      // upstream gives "Thu, 24 Sep 2026 00:02:32 +0000"; normalise to ISO.
      updatedUtc: new Date(d.time_last_update_utc).toISOString(),
      source: "open.er-api.com",
      sourceHost: "https://open.er-api.com/v6/latest/AED",
    };
    return NextResponse.json(body, {
      headers: {
        // Also let the browser cache 1h (with SWR).
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : String(e) },
      { status: 502 },
    );
  }
}
