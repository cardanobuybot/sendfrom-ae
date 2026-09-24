"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import { providers, type CorridorCode } from "@/config/providers";

type SortKey = "name" | "fee" | "markup" | "speed" | "rating";

function fmtFee(v: number | null) { return v == null ? "—" : `AED ${v}`; }
function fmtMarkup(v: number | null) { return v == null ? "—" : `${v.toFixed(2)}%`; }
function fmtRating(v: number | null) { return v == null ? "—" : v.toFixed(1); }

const corridors: { code: CorridorCode; label: string; flag: string }[] = [
  { code: "PH", label: "Philippines", flag: "🇵🇭" },
  { code: "IN", label: "India", flag: "🇮🇳" },
  { code: "PK", label: "Pakistan", flag: "🇵🇰" },
];

export default function ComparisonTable() {
  const [corridor, setCorridor] = useState<CorridorCode>("PH");
  const [sort, setSort] = useState<SortKey>("fee");
  const [dir, setDir] = useState<1 | -1>(1);

  const rows = useMemo(() => {
    const arr = providers.map((p) => {
      const c = p.corridors.find((x) => x.country === corridor);
      return {
        slug: p.slug,
        name: p.name,
        fee: c?.feeAed1k ?? null,
        markup: c?.rateMarkupPct ?? null,
        speed: c?.speed ?? "—",
        rating: p.appRating,
        methods: c?.methods ?? [],
      };
    });
    const key = (r: (typeof arr)[number]) => {
      switch (sort) {
        case "name": return r.name.toLowerCase();
        case "fee": return r.fee == null ? Number.POSITIVE_INFINITY : r.fee;
        case "markup": return r.markup == null ? Number.POSITIVE_INFINITY : r.markup;
        case "rating": return r.rating == null ? -1 : r.rating;
        case "speed": return r.speed.toLowerCase();
      }
    };
    return arr.sort((a, b) => (key(a) < key(b) ? -1 * dir : key(a) > key(b) ? 1 * dir : 0));
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
            {rows.map((r) => (
              <tr key={r.slug} className="border-b border-[var(--card-border)] last:border-b-0">
                <td className="p-3">
                  <Link href={`/${r.slug}`} className="underline">{r.name}</Link>
                </td>
                <td className="p-3">{fmtFee(r.fee)}</td>
                <td className="p-3">{fmtMarkup(r.markup)}</td>
                <td className="p-3">{r.speed}</td>
                <td className="p-3">{fmtRating(r.rating)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="muted text-xs mt-3">
        Some numbers show "—" while we verify them provider-by-provider. Always
        check the final amount inside the provider's app.
      </p>
    </div>
  );
}
