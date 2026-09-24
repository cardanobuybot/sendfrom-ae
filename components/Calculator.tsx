"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import { providers, type CorridorCode } from "@/config/providers";

/**
 * Very simple estimator. Reads the SAME data file as the comparison table.
 * When we plug in a live rates API, replace `estimateRecipient` with a call
 * to that API — the UI stays the same.
 */
function estimateRecipient(
  amountAed: number,
  feeAed: number | null,
  markupPct: number | null,
): number | null {
  if (feeAed == null || markupPct == null) return null;
  // We deliberately do NOT put a mid-market rate here — that must come from
  // a live source at the point where we integrate one.
  // For the UI we only show the "amount that goes into FX" after the fee.
  const afterFee = Math.max(0, amountAed - feeAed);
  return afterFee * (1 - markupPct / 100);
}

const corridors: { code: CorridorCode; label: string; flag: string }[] = [
  { code: "PH", label: "Philippines", flag: "🇵🇭" },
  { code: "IN", label: "India", flag: "🇮🇳" },
  { code: "PK", label: "Pakistan", flag: "🇵🇰" },
];

export default function Calculator() {
  const [amount, setAmount] = useState<number>(1000);
  const [corridor, setCorridor] = useState<CorridorCode>("PH");

  const rows = useMemo(() => {
    return providers
      .map((p) => {
        const c = p.corridors.find((x) => x.country === corridor);
        return {
          slug: p.slug,
          name: p.name,
          fee: c?.feeAed1k ?? null,
          markup: c?.rateMarkupPct ?? null,
          net: estimateRecipient(amount, c?.feeAed1k ?? null, c?.rateMarkupPct ?? null),
          speed: c?.speed ?? "—",
        };
      })
      .sort((a, b) => {
        const A = a.net ?? -Infinity;
        const B = b.net ?? -Infinity;
        return B - A;
      });
  }, [amount, corridor]);

  return (
    <section className="card p-5">
      <h2 className="text-xl font-semibold mb-2">Estimator</h2>
      <p className="muted text-sm mb-4">
        Ranks providers by the amount your recipient would get, based on the
        latest fees and rate markup we have on file. Numbers are estimates —
        always check the exact amount in the provider's app before sending.
      </p>
      <div className="flex flex-wrap gap-3 items-end mb-4">
        <label className="flex flex-col text-sm">
          Amount (AED)
          <input
            type="number"
            min={50}
            step={50}
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value) || 0)}
            className="mt-1 px-3 py-2 rounded-lg border border-[var(--card-border)] bg-[var(--card)] w-40"
          />
        </label>
        <div className="flex flex-wrap gap-1">
          {corridors.map((c) => (
            <button
              key={c.code}
              onClick={() => setCorridor(c.code)}
              className={"btn text-sm " + (corridor === c.code ? "btn-primary" : "")}
              aria-pressed={corridor === c.code}
            >
              {c.flag} {c.label}
            </button>
          ))}
        </div>
      </div>
      <ul className="divide-y divide-[var(--card-border)]">
        {rows.map((r) => (
          <li key={r.slug} className="py-2 flex justify-between items-center gap-3">
            <div className="flex-1">
              <Link href={`/${r.slug}`} className="font-medium underline">{r.name}</Link>
              <div className="muted text-xs">
                fee {r.fee == null ? "Check in app" : `AED ${r.fee}`} · markup {r.markup == null ? "Check in app" : `${r.markup}%`} · {r.speed}
              </div>
            </div>
            <div className="text-right min-w-[140px]">
              <b>{r.net == null ? "Check in app" : `~${r.net.toFixed(0)} after fee & FX`}</b>
              <div className="muted text-xs">{r.net == null ? "no static source" : "estimate"}</div>
            </div>
          </li>
        ))}
      </ul>
      <p className="muted text-xs mt-3">
        {/* Live-rates hook: replace estimateRecipient() with a call to your live
            FX + fee API. Keep the shape of the row so the UI does not change. */}
        Recipient amount is shown in AED terms (after fee, after FX markup). To
        show local currency (PHP / INR / PKR), plug in a mid-market rates
        source in <code>components/Calculator.tsx</code>.
      </p>
    </section>
  );
}
