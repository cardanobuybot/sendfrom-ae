import Link from "next/link";
import type { Provider } from "@/config/providers";
import AffiliateButton from "./AffiliateButton";

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

  return (
    <article className="card p-5">
      <div className="flex items-baseline justify-between gap-3">
        <h3 className="text-lg font-semibold">{p.name}</h3>
      </div>
      <p className="muted text-sm mt-1">{p.tagline}</p>
      <ul className="mt-3 text-sm space-y-1">
        {p.corridors.map((c) => (
          <li key={c.country} className="flex justify-between gap-3">
            <span className="muted">→ {c.country}</span>
            <span>{c.speed}</span>
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
