/**
 * Outgoing links per provider.
 *
 * - `affiliate: true` means the link is served through /go/<slug> and marked
 *   rel="sponsored nofollow". Paste your affiliate URL in `url` when you have
 *   it. Until then we point at the provider's official site as a safe fallback.
 * - `affiliate: false` means we link straight to the official site with
 *   normal rel and no /go/ tracking (Al Ansari, LuLu, Western Union — no
 *   published affiliate programme at the time of writing).
 */
export type PartnerLink = {
  slug: string;
  name: string;
  affiliate: boolean;
  url: string; // affiliate URL if `affiliate=true`, else official site
  note?: string;
};

export const partners: Record<string, PartnerLink> = {
  revolut: {
    slug: "revolut",
    name: "Revolut",
    affiliate: true,
    url: "https://www.revolut.com/",
    // TODO: replace with your affiliate link once Revolut UAE affiliate program opens
    note: "UAE launch expected late 2026 — no affiliate program yet.",
  },
  wise: {
    slug: "wise",
    name: "Wise",
    affiliate: true,
    // TODO: replace with your Wise affiliate/referral link
    url: "https://wise.com/",
  },
  remitly: {
    slug: "remitly",
    name: "Remitly",
    affiliate: true,
    // TODO: replace with your Remitly Impact/Partnerize link
    url: "https://www.remitly.com/",
  },
  worldremit: {
    slug: "worldremit",
    name: "WorldRemit",
    affiliate: true,
    // TODO: replace with your WorldRemit CJ/Partnerize link
    url: "https://www.worldremit.com/",
  },
  "western-union": {
    slug: "western-union",
    name: "Western Union",
    affiliate: false,
    url: "https://www.westernunion.com/ae/en/home.html",
  },
  "al-ansari": {
    slug: "al-ansari",
    name: "Al Ansari Exchange",
    affiliate: false,
    url: "https://www.alansariexchange.com/",
  },
  "lulu-exchange": {
    slug: "lulu-exchange",
    name: "LuLu Exchange",
    affiliate: false,
    url: "https://www.luluexchange.com/",
  },
};

/** Resolve the destination URL for a /go/[slug] route. Returns null if slug unknown. */
export function resolvePartnerUrl(slug: string): string | null {
  const p = partners[slug];
  return p ? p.url : null;
}
