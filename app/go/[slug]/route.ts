import { NextResponse, type NextRequest } from "next/server";
import { after } from "next/server";
import { resolvePartnerUrl } from "@/config/partners";
import { track } from "@vercel/analytics/server";

/**
 * Affiliate redirect. All outbound affiliate traffic goes through this route
 * so we can:
 *   - keep destination URLs in one config file (config/partners.ts);
 *   - count clicks with Vercel Analytics custom events;
 *   - carry rel="sponsored nofollow" on inbound links (see AffiliateButton).
 *
 * If the slug is unknown or the partner is non-affiliate, we still redirect
 * to their official site (defense in depth) and log the event.
 */
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const url = resolvePartnerUrl(slug);
  if (!url) {
    return NextResponse.redirect(new URL("/", _req.nextUrl.origin), 307);
  }
  after(() => {
    // Fire-and-forget analytics event. Do NOT block the redirect on it.
    track("affiliate_click", { slug }).catch(() => { /* noop */ });
  });
  return NextResponse.redirect(url, 302);
}
