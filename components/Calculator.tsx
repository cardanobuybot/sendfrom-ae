"use client";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { providers, type CorridorCode } from "@/config/providers";

/**
 * Mid-market rate reference card.
 *
 * Purpose: give visitors a single, honest anchor before they open a
 * provider's app — "at the raw exchange rate, my AED gets me X of the
 * local currency". Every provider will hand back slightly less than
 * that; the difference is fees + FX markup.
 *
 * Per-provider net amounts are DELIBERATELY NOT shown here. Until we
 * pin real quotes into config/providers.ts, showing provider-specific
 * numbers would be guessing — which we don't do.
 *
 * Data comes from GET /api/mid-rate (server-cached 1h, sources
 * open.er-api.com — free, no key, supports AED base).
 */

type MidRatePayload = {
  base: "AED";
  rates: { PHP: number; INR: number; PKR: number };
  updatedUtc: string;
  source: string;
  sourceHost: string;
};

const corridors: { code: CorridorCode; label: string; flag: string; currency: string }[] = [
  { code: "PH", label: "Philippines", flag: "🇵🇭", currency: "PHP" },
  { code: "IN", label: "India", flag: "🇮🇳", currency: "INR" },
  { code: "PK", label: "Pakistan", flag: "🇵🇰", currency: "PKR" },
];

function fmt(n: number): string {
  // Local-style grouping, no currency symbol (PHP/INR/PKR appended by caller).
  return n.toLocaleString(undefined, { maximumFractionDigits: 0 });
}

function fmtWhen(iso: string): string {
  try {
    const d = new Date(iso);
    return d.toISOString().slice(0, 16).replace("T", " ") + " UTC";
  } catch {
    return iso;
  }
}

export default function Calculator() {
  const [amount, setAmount] = useState<number>(1000);
  const [corridor, setCorridor] = useState<CorridorCode>("PH");
  const [rate, setRate] = useState<MidRatePayload | null>(null);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/mid-rate")
      .then(async (r) => {
        if (!r.ok) throw new Error(`mid-rate ${r.status}`);
        return r.json();
      })
      .then((d: MidRatePayload) => setRate(d))
      .catch((e) => setErr(e instanceof Error ? e.message : String(e)));
  }, []);

  const activeCurrency = corridors.find((c) => c.code === corridor)!.currency as "PHP" | "INR" | "PKR";
  const targetAmount = useMemo(() => {
    if (!rate) return null;
    return amount * rate.rates[activeCurrency];
  }, [amount, activeCurrency, rate]);

  return (
    <section className="card p-5" aria-labelledby="calc-title">
      <h2 id="calc-title" className="text-xl font-semibold mb-2">Mid-market reference</h2>
      <p className="muted text-sm mb-4">
        A single honest anchor before you open a provider's app. This is the
        raw exchange rate — providers add a fee and/or exchange-rate markup
        on top, so the final amount you get in each app will be lower.
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
              type="button"
              onClick={() => setCorridor(c.code)}
              className={"btn text-sm " + (corridor === c.code ? "btn-primary" : "")}
              aria-pressed={corridor === c.code}
            >
              {c.flag} {c.label}
            </button>
          ))}
        </div>
      </div>

      {err && (
        <p className="text-sm text-red-500">
          Couldn't load the reference rate ({err}). Check any provider's app
          for the current rate.
        </p>
      )}

      {!err && !rate && <p className="muted text-sm">Loading current rate…</p>}

      {rate && amount > 0 && targetAmount != null && (
        <>
          <p className="mt-2 text-lg leading-relaxed">
            At the mid-market rate,{" "}
            <b>{fmt(amount)} AED ≈ {fmt(targetAmount)} {activeCurrency}</b>.
          </p>
          <p className="mt-2 text-sm muted">
            Providers add a fee and/or exchange-rate markup — compare the
            final amount in each app.
          </p>
          <p className="mt-4 text-xs muted">
            Rate from{" "}
            <a
              href={rate.sourceHost}
              rel="noopener noreferrer"
              target="_blank"
              className="underline"
            >
              {rate.source}
            </a>{" "}
            · updated {fmtWhen(rate.updatedUtc)} · cached hourly.
          </p>
        </>
      )}

      <VerifiedQuotes corridor={corridor} currency={activeCurrency} />
    </section>
  );
}

/**
 * Small ranked list of providers for the currently-selected corridor.
 * Rows with a pinned quote (`quoteRecipientAtAed1k`) show the real
 * "1,000 AED → X" number. Rows without one show "Check in app" and
 * link to their page so the reader can go verify.
 *
 * The 1,000 AED anchor is deliberate — we can only cite figures that
 * we actually pulled from the provider's own quote page on a specific
 * date. Extrapolating to other amounts would put us in "guessing"
 * territory, which the sendfrom.ae data policy forbids.
 */
function VerifiedQuotes({
  corridor,
  currency,
}: {
  corridor: CorridorCode;
  currency: "PHP" | "INR" | "PKR";
}) {
  const rows = useMemo(() => {
    return providers
      .map((p) => {
        const c = p.corridors.find((x) => x.country === corridor);
        return {
          slug: p.slug,
          name: p.name,
          fee: c?.feeAed1k ?? null,
          rate: c?.quoteRate ?? null,
          net: c?.quoteRecipientAtAed1k ?? null,
          note: p.quoteNote,
        };
      })
      .sort((a, b) => (b.net ?? -1) - (a.net ?? -1));
  }, [corridor]);

  const anyQuoted = rows.some((r) => r.net != null);
  if (!anyQuoted) return null;

  return (
    <div className="mt-6 pt-5 border-t border-[var(--card-border)]">
      <h3 className="text-lg font-semibold">Verified quotes at 1,000 AED</h3>
      <p className="muted text-xs mt-1">
        Numbers pulled directly from provider calculators on the checked
        date. Others say "Check in app" — we don't invent figures.
      </p>
      <ul className="mt-3 divide-y divide-[var(--card-border)]">
        {rows.map((r) => (
          <li key={r.slug} className="py-2 flex flex-wrap justify-between items-center gap-2">
            <Link href={`/${r.slug}`} className="font-medium underline">{r.name}</Link>
            <div className="text-right min-w-[180px]">
              {r.net != null ? (
                <>
                  <b>{r.net.toLocaleString()} {currency}</b>
                  <div className="muted text-xs">
                    fee AED {r.fee?.toFixed(2)} · rate {r.rate}
                  </div>
                </>
              ) : (
                <>
                  <b>Check in app</b>
                  <div className="muted text-xs">no static quote pinned yet</div>
                </>
              )}
            </div>
          </li>
        ))}
      </ul>
      {rows.find((r) => r.note) && (
        <p className="muted text-xs mt-3 italic">
          {rows.find((r) => r.note)?.note}
        </p>
      )}
    </div>
  );
}
