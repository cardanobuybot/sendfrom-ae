import { NextResponse } from "next/server";
import { fetchMidRate } from "@/lib/mid-rate";

export const revalidate = 3600;

/**
 * Same-origin JSON endpoint for the mid-market rate.
 *
 * Business logic lives in `lib/mid-rate.ts` so the homepage server
 * component can render the initial figure into the SSR HTML without
 * going through this route.
 */
export async function GET() {
  const body = await fetchMidRate();
  if (!body) {
    return NextResponse.json({ error: "upstream unavailable" }, { status: 502 });
  }
  return NextResponse.json(body, {
    headers: {
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
