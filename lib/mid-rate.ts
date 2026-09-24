/**
 * Shared mid-market-rate fetcher.
 *
 * Used by both:
 *   - app/api/mid-rate/route.ts   → serves fresh JSON to clients.
 *   - app/page.tsx (server)       → renders the number into the initial
 *                                    HTML so users don't see
 *                                    "Loading current rate…".
 *
 * Cache: 3600 s via Next.js Data Cache. Only one request per hour
 * actually hits open.er-api.com; everyone else is served from cache.
 * No cookies or personal data go upstream — pure server-side lookup.
 */

export type MidRatePayload = {
  base: "AED";
  rates: { PHP: number; INR: number; PKR: number };
  /** ISO timestamp of the upstream update. */
  updatedUtc: string;
  source: string;
  sourceHost: string;
};

export async function fetchMidRate(): Promise<MidRatePayload | null> {
  try {
    const upstream = await fetch("https://open.er-api.com/v6/latest/AED", {
      next: { revalidate: 3600 },
      headers: { "User-Agent": "sendfrom.ae mid-rate cache" },
    });
    if (!upstream.ok) return null;
    const d = await upstream.json();
    if (d.result !== "success" || d.base_code !== "AED") return null;
    return {
      base: "AED",
      rates: {
        PHP: Number(d.rates.PHP),
        INR: Number(d.rates.INR),
        PKR: Number(d.rates.PKR),
      },
      updatedUtc: new Date(d.time_last_update_utc).toISOString(),
      source: "open.er-api.com",
      sourceHost: "https://open.er-api.com/v6/latest/AED",
    };
  } catch {
    return null;
  }
}
