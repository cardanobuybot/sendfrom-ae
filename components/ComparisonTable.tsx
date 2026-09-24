"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import { providers, displayFee, displayMarkup, type CorridorCode } from "@/config/providers";

type SortKey = "name" | "fee" | "markup" | "speed" | "rating";

function fmtRating(v: number | null) { return v == null ? "Check in app" : v.toFixed(1); }

const corridors: { code: CorridorCode; label: string; flag: string }[] = [
  { code: "PH", label: "Philippines", flag: "🇵🇭" },
  { code: "IN", label: "India", flag: "🇮🇳" },
  { code: "PK", label: "Pakistan", flag: "🇵🇰" },
];

/** Small pill next to a promotional cell. */
function PromoBadge() {
  return (
    <span
      className="ml-2 inline-block text-[10px] uppercase tracking-wide font-semibold rounded px-1.5 py-0.5"
      style={{
        background: "rgba(31,106,82,0.15)",
        color: "var(--accent)",
        border: "1px solid var(--accent)",
      }}
    >
      promo
    </span>
  );
}

export default function ComparisonTable() {
  const [corridor, setCorridor] = useState<CorridorCode>("PH");
  const [sort, setSort] = useState<SortKey>("fee");
  const [dir, setDir] = useState<1 | -1>(1);

  const { sortable, pinnedRevolut } = useMemo(() => {
    const rows = providers.map((p) => {
      const c = p.corridors.find((x) => x.country === corridor);
      return {
        slug: p.slug,
        name: p.name,
        fee: c?.feeAed1k ?? null,
        markup: c?.rateMarkupPct ?? null,
        speed: c?.speed ?? "—",
        rating: p.appRating,
        promoFeeLabel: c?.promoFeeLabel,
        promoRateLabel: c?.promoRateLabel,
      };
    });
    // Revolut is not yet open to UAE residents — pin it below the table,
    // excluded from ranking so it never appears at #1 by fee=null etc.
    const revolut = rows.find((r) => r.slug === "revolut") ?? null;
    const rest = rows.filter((r) => r.slug !== "revolut");

    const key = (r: (typeof rest)[number]) => {
      switch (sort) {
        case "name": return r.name.toLowerCase();
        case "fee": return r.fee == null ? Number.POSITIVE_INFINITY : r.fee;
        case "markup": return r.markup == null ? Number.POSITIVE_INFINITY : r.markup;
        case "rating": return r.rating == null ? -1 : r.rating;
        case "speed": return r.speed.toLowerCase();
      }
    };
    rest.sort((a, b) => (key(a) < key(b) ? -1 * dir : key(a) > key(b) ? 1 * dir : 0));
    return { sortable: rest, pinnedRevolut: revolut };
  }, [corridor, sort, dir]);

  function toggle(key: SortKey) {
    if (sort === key) setDir((d) => (d === 1 ? -1 : 1));
    else { setSort(key); setDir(1); }
  }

  return (
    <div>
      <div className="flex gap-2 mb-3 flex-wrap">
        {corridors.map((c) => (
          <button
            key={c.code}
            onClick={() => setCorridor(c.code)}
            className={
              "btn text-sm " + (corridor === c.code ? "btn-primary" : "")
            }
            aria-pressed={corridor === c.code}
          >
            {c.flag} {c.label}
          </button>
        ))}
      </div>
      <div className="overflow-x-auto card">
        <table className="w-full text-sm">
          <thead className="text-left border-b border-[var(--card-border)]">
            <tr>
              {[
                { k: "name" as SortKey, l: "Provider" },
                { k: "fee" as SortKey, l: "Fee (AED 1,000)" },
                { k: "markup" as SortKey, l: "FX markup" },
                { k: "speed" as SortKey, l: "Speed" },
                { k: "rating" as SortKey, l: "App ★" },
              ].map((h) => (
                <th key={h.k} className="p-3">
                  <button
                    className="font-semibold hover:underline underline-offset-2"
                    onClick={() => toggle(h.k)}
                  >
                    {h.l} {sort === h.k ? (dir === 1 ? "▲" : "▼") : ""}
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortable.map((r) => (
              <tr key={r.slug} className="border-b border-[var(--card-border)] last:border-b-0">
                <td className="p-3">
                  <Link href={`/${r.slug}`} className="underline">{r.name}</Link>
                </td>
                <td className="p-3">
                  {r.promoFeeLabel ? (
                    <>
                      {r.promoFeeLabel}<PromoBadge />
                    </>
                  ) : displayFee(r.fee)}
                </td>
                <td className="p-3">
                  {r.promoRateLabel ? (
                    <>
                      {r.promoRateLabel}<PromoBadge />
                    </>
                  ) : displayMarkup(r.markup)}
                </td>
                <td className="p-3">{r.speed}</td>
                <td className="p-3">{fmtRating(r.rating)}</td>
              </tr>
            ))}
            {pinnedRevolut && (
              <tr className="border-t-2 border-dashed border-[var(--card-border)]">
                <td className="p-3">
                  <Link href="/revolut" className="underline">{pinnedRevolut.name}</Link>
                </td>
                <td colSpan={4} className="p-3">
                  <span className="muted">Not yet available in the UAE — launch expected late 2026.</span>{" "}
                  <Link href="/revolut" className="underline">Get notified →</Link>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <p className="muted text-xs mt-3">
        Fields marked "Check in app" are ones we cannot pin from an official
        static source — the provider's calculator gives the live number.
        Promotional values (labelled "promo") apply only under the
        conditions stated. Always confirm the final amount inside the
        provider's app before sending.
      </p>
    </div>
  );
}
