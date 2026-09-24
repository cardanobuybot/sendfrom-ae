import Link from "next/link";
import type { Provider, CorridorCode } from "@/config/providers";
import AffiliateButton from "./AffiliateButton";

const countryLabels: Record<CorridorCode, string> = {
  PH: "Philippines",
  IN: "India",
  PK: "Pakistan",
};

export default function ProviderCard({ p }: { p: Provider }) {
  // Revolut variant: not yet open to UAE residents. Show one clear
  // status line and a "Get notified" CTA to /revolut (NOT /go/revolut —
  // there's nothing to affiliate for a product that doesn't exist yet).
  if (p.slug === "revolut") {
    return (
      <article className="card p-5">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="text-lg font-semibold">{p.name}</h3>
        </div>
        <p className="muted text-sm mt-1">Not yet available in the UAE.</p>
        <p className="text-sm mt-3">Launch expected late 2026.</p>
        <div className="mt-4 flex gap-2 flex-wrap">
          <Link href="/revolut" className="btn">Full status</Link>
          <Link href="/revolut" className="btn btn-primary">Get notified</Link>
        </div>
      </article>
    );
  }

  // Remitly PH welcome offer surfaces as a small badge under the tagline.
  // We look up the corridor and only render if the promo fields are set —
  // makes this future-proof for other providers picking up promos later.
  const phPromo = p.corridors.find((c) => c.country === "PH" && c.promoFeeLabel);

  return (
    <article className="card p-5">
      <div className="flex items-baseline justify-between gap-3">
        <h3 className="text-lg font-semibold">{p.name}</h3>
      </div>
      <p className="muted text-sm mt-1">{p.tagline}</p>

      {phPromo && (
        <Link
          href={`/${p.slug}`}
          className="mt-2 inline-block text-xs leading-tight rounded-md px-2 py-1 hover:no-underline"
          style={{
            background: "rgba(31,106,82,0.12)",
            color: "var(--accent)",
            border: "1px solid var(--accent)",
          }}
        >
          <b>New customers → Philippines:</b> no fee on 1st transfer + promo rate{" "}
          <span className="opacity-75">(as of 24 Sep 2026)</span>
        </Link>
      )}

      <ul className="mt-3 text-sm space-y-1">
        {p.corridors.map((c) => (
          <li
            key={c.country}
            className="flex items-start gap-3"
          >
            {/* Left column: label (arrow + country name), never wraps. */}
            <span className="muted whitespace-nowrap shrink-0">
              → {countryLabels[c.country]}
            </span>
            {/* Right column: delivery time, right-aligned, wraps within
                the column when the phrase is long
                (e.g. "minutes (Express) or 3-5 days (Economy)"). */}
            <span className="flex-1 text-right break-words">{c.speed}</span>
          </li>
        ))}
      </ul>
      <div className="mt-4 flex gap-2 flex-wrap">
        <Link href={`/${p.slug}`} className="btn">Full review</Link>
        <AffiliateButton slug={p.slug} />
      </div>
    </article>
  );
}
