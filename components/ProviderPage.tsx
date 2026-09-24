import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getProvider, displayFee, displayMarkup, displayLimit } from "@/config/providers";
import { site } from "@/config/site";
import { partners } from "@/config/partners";
import AffiliateButton from "./AffiliateButton";
import IndependentBanner from "./IndependentBanner";
import FAQ from "./FAQ";
import DataDisclaimer from "./DataDisclaimer";
import RevolutNotify from "./RevolutNotify";

const methodLabels: Record<string, string> = {
  bank_deposit: "Bank deposit",
  cash_pickup: "Cash pickup",
  gcash: "GCash",
  maya: "Maya",
  upi: "UPI",
  wallet: "E-wallet",
  home_delivery: "Home delivery",
};

const countryLabels: Record<string, string> = {
  PH: "Philippines",
  IN: "India",
  PK: "Pakistan",
};

export function providerMetadata(slug: string): Metadata {
  const p = getProvider(slug);
  if (!p) return {};
  return {
    title: `${p.name} — send money from the UAE`,
    description: `${p.name} for UAE senders. ${p.tagline}`,
    alternates: { canonical: `${site.url}/${p.slug}` },
    openGraph: {
      title: `${p.name} — send money from the UAE · ${site.name}`,
      description: p.tagline,
      url: `${site.url}/${p.slug}`,
    },
  };
}

export default function ProviderPage({ slug }: { slug: string }) {
  const p = getProvider(slug);
  if (!p) notFound();
  const partner = partners[slug];

  return (
    <article>
      <IndependentBanner providerName={p.name} />

      <h1 className="text-3xl font-bold">{p.name}</h1>
      <p className="muted mt-1">{p.tagline}</p>

      {p.statusNote && (
        <div className="card p-4 mt-4 border-l-4" style={{ borderLeftColor: "var(--accent)" }}>
          <b>Status.</b> {p.statusNote}
        </div>
      )}

      <p className="mt-6 leading-relaxed">{p.intro}</p>

      <h2 className="text-2xl font-bold mt-8">Who it's best for</h2>
      <ul className="list-disc pl-5 mt-2 space-y-1">
        {p.bestFor.map((b) => <li key={b}>{b}</li>)}
      </ul>

      <h2 className="text-2xl font-bold mt-8">Corridors from the UAE</h2>
      <div className="mt-3 space-y-3">
        {p.corridors.map((c) => (
          <div key={c.country} className="card p-4">
            <div className="flex justify-between gap-3 items-baseline">
              <h3 className="font-semibold">→ {countryLabels[c.country]}</h3>
              <span className="muted text-sm">{c.speed}</span>
            </div>
            <p className="text-sm mt-2">
              <b>Delivery:</b>{" "}
              {c.methods.map((m) => methodLabels[m] ?? m).join(", ")}
            </p>
            {c.partners && c.partners.length > 0 && (
              <p className="text-sm mt-1 muted">
                <b className="text-[color:var(--fg)]">Partners:</b> {c.partners.join(" · ")}
              </p>
            )}
            <p className="text-sm mt-1 muted">
              Fee (AED 1,000): {displayFee(c.feeAed1k)} · FX markup: {displayMarkup(c.rateMarkupPct)}
              {(c.minAed != null || c.maxAed != null) && (
                <> · Limits: {displayLimit(c.minAed)}–{displayLimit(c.maxAed)}</>
              )}
            </p>
            {c.promoNote && (
              <div
                className="mt-3 p-3 rounded-lg text-sm"
                style={{
                  background: "var(--card2, rgba(79,165,132,0.08))",
                  border: "1px dashed var(--accent)",
                }}
              >
                <b>Welcome offer</b> · {c.promoNote}
              </div>
            )}
          </div>
        ))}
      </div>

      {(p.paymentMethods || p.regulator || p.appRatingDetail) && (
        <section className="mt-8 grid sm:grid-cols-2 gap-4">
          {p.paymentMethods && p.paymentMethods.length > 0 && (
            <div className="card p-4">
              <h3 className="font-semibold mb-2">Payment methods (UAE side)</h3>
              <p className="text-sm">{p.paymentMethods.join(" · ")}</p>
            </div>
          )}
          {p.regulator && (
            <div className="card p-4">
              <h3 className="font-semibold mb-2">Regulator</h3>
              <p className="text-sm">{p.regulator}</p>
            </div>
          )}
          {p.appRatingDetail && (
            <div className="card p-4 sm:col-span-2">
              <h3 className="font-semibold mb-2">App-store ratings</h3>
              <p className="text-sm">
                {p.appRatingDetail.ios && (
                  <>
                    App Store <b>★ {p.appRatingDetail.ios.rating}</b>{" "}
                    <span className="muted">({p.appRatingDetail.ios.count} ratings)</span>
                  </>
                )}
                {p.appRatingDetail.ios && p.appRatingDetail.android && <span className="mx-2 muted">·</span>}
                {p.appRatingDetail.android && (
                  <>
                    Google Play <b>★ {p.appRatingDetail.android.rating}</b>{" "}
                    <span className="muted">({p.appRatingDetail.android.count} ratings)</span>
                  </>
                )}
              </p>
              <p className="muted text-xs mt-2">
                As displayed on the provider's own site on {p.dataLastUpdated}.
              </p>
            </div>
          )}
        </section>
      )}

      <div className="grid sm:grid-cols-2 gap-4 mt-8">
        <div className="card p-4">
          <h3 className="font-semibold mb-2">Pros</h3>
          <ul className="list-disc pl-5 space-y-1 text-sm">{p.pros.map((x) => <li key={x}>{x}</li>)}</ul>
        </div>
        <div className="card p-4">
          <h3 className="font-semibold mb-2">Cons</h3>
          <ul className="list-disc pl-5 space-y-1 text-sm">{p.cons.map((x) => <li key={x}>{x}</li>)}</ul>
        </div>
      </div>

      <h2 className="text-2xl font-bold mt-8">How to send</h2>
      <ol className="list-decimal pl-5 mt-2 space-y-2">
        {p.howToSend.map((s) => <li key={s}>{s}</li>)}
      </ol>

      {slug === "revolut" && (
        <div className="mt-8">
          <RevolutNotify />
        </div>
      )}

      <div className="mt-8 flex flex-wrap gap-3 items-center">
        <AffiliateButton slug={p.slug}>
          {partner?.affiliate ? `Try ${p.name}` : `Visit ${p.name}`}
        </AffiliateButton>
        <Link href="/compare" className="btn">Compare all providers</Link>
      </div>

      <FAQ items={p.faq} />

      {p.sources.length > 0 && (
        <section className="mt-10">
          <h2 className="text-2xl font-bold mb-3">Sources</h2>
          <p className="muted text-sm mb-3">
            Official pages where you can verify the current fees, rates and
            limits yourself. Numbers change daily — we deliberately don't
            copy them into this page.
          </p>
          <ul className="space-y-2 text-sm">
            {p.sources.map((s) => (
              <li key={s.url} className="card p-3">
                <a href={s.url} rel="noopener noreferrer" target="_blank" className="underline break-all">
                  {s.label}
                </a>
                <div className="muted text-xs mt-1">
                  {s.url} · checked {s.dateChecked}
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}

      <DataDisclaimer lastUpdated={p.dataLastUpdated} />

      {/* Article JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: `${p.name} — send money from the UAE`,
            description: p.tagline,
            dateModified: p.dataLastUpdated,
            author: { "@type": "Organization", name: site.name },
            publisher: { "@type": "Organization", name: site.name, url: site.url },
          }),
        }}
      />
    </article>
  );
}
