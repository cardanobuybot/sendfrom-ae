import type { Metadata } from "next";
import Link from "next/link";
import { providers } from "@/config/providers";
import { corridors } from "@/config/corridors";
import { site } from "@/config/site";
import ProviderCard from "@/components/ProviderCard";
import Calculator from "@/components/Calculator";
import FAQ from "@/components/FAQ";
import DataDisclaimer from "@/components/DataDisclaimer";
import { fetchMidRate } from "@/lib/mid-rate";

export const metadata: Metadata = {
  // Absolute — bypass the layout template so the browser tab reads
  // exactly what the SEO brief asked for (under 60 chars including
  // the "2026" tag).
  title: { absolute: "Send Money from UAE: Compare Fees & Rates (2026)" },
  description: site.description,
  alternates: { canonical: site.url },
};

// Homepage is a Server Component; refresh cached data every hour to
// match the /api/mid-rate cache TTL.
export const revalidate = 3600;

const homeFaq = [
  {
    q: "Is sendfrom.ae a money-transfer service?",
    a: `No. ${site.name} is an independent information site. We do not hold or move money. All transfers happen inside the provider's own app or branch.`,
  },
  {
    q: "Why don't you show 'cheapest' as a single answer?",
    a: "Because the cheapest provider changes daily and depends on the corridor, delivery method and amount. We show you how to check three providers in three minutes.",
  },
  {
    q: "Do you make money from these links?",
    a: "For some providers, yes — we earn a commission if you sign up. It never changes the fees you pay, and we don't rank providers based on payouts. See our affiliate disclosure and 'How we compare' page.",
  },
  {
    q: "What about Revolut in the UAE?",
    a: "Revolut has received UAE Central Bank licences (June 2026) but is not yet open to UAE residents. Launch is expected later in 2026. See our /revolut page for updates.",
  },
];

export default async function Home() {
  // SSR fetch — passes rate into Calculator so the initial HTML shows
  // "1,000 AED ≈ 17,076 PHP" instead of "Loading current rate…".
  const midRate = await fetchMidRate();

  // Revolut card is deferred to the bottom of "Providers we track".
  const nonRevolut = providers.filter((p) => p.slug !== "revolut");
  const revolut = providers.find((p) => p.slug === "revolut");

  return (
    <>
      <section className="pt-4">
        <h1 className="text-4xl sm:text-5xl font-black leading-tight tracking-tight">
          Send money from the UAE — compare the cheapest ways
        </h1>
        <p className="mt-4 text-lg muted">
          Independent, English-language guide for expats in the UAE — Filipinos,
          Indians and Pakistanis. Compare fees, exchange rates and speed
          across the biggest providers.
        </p>
        <div className="mt-6 flex gap-3 flex-wrap">
          <Link href="/compare" className="btn btn-primary">Compare all providers</Link>
          <Link href="/how-we-compare" className="btn">How we compare</Link>
        </div>
      </section>

      <section className="mt-8 card p-5" aria-labelledby="best-for-title">
        <h2 id="best-for-title" className="text-xl font-semibold">Best for…</h2>
        <ul className="mt-3 space-y-2 text-sm">
          <li>
            <b>Bank deposit with a transparent fee:</b>{" "}
            <Link href="/wise" className="underline">Wise</Link>{" "}
            <span className="muted">— mid-market rate + a small flat fee shown up-front.</span>
          </li>
          <li>
            <b>First transfer to the Philippines:</b>{" "}
            <Link href="/remitly" className="underline">Remitly</Link>{" "}
            <span className="muted">— new-customer promo (17.16 PHP, no fee on first transfer, first AED 4,000).</span>
          </li>
          <li>
            <b>Cash pickup for the recipient:</b>{" "}
            <Link href="/western-union" className="underline">Western Union</Link>{" · "}
            <Link href="/al-ansari" className="underline">Al Ansari</Link>
          </li>
          <li>
            <b>Branch near you in the UAE:</b>{" "}
            <Link href="/al-ansari" className="underline">Al Ansari</Link>{" · "}
            <Link href="/lulu-exchange" className="underline">LuLu</Link>
          </li>
        </ul>
        <p className="muted text-xs mt-3">
          Based on our checks on <b>{site.dataLastUpdated}</b>; always compare
          the final amount inside the provider's app before sending.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-bold">Providers we track</h2>
        <p className="muted text-sm mt-1">
          Seven of the biggest options for outbound transfers from the UAE.
        </p>
        <div className="grid sm:grid-cols-2 gap-3 mt-4">
          {nonRevolut.map((p) => <ProviderCard key={p.slug} p={p} />)}
          {/* Revolut is the last card — see ProviderCard.tsx for the
              "Not yet available" variant. */}
          {revolut && <ProviderCard key={revolut.slug} p={revolut} />}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-bold">By destination country</h2>
        <div className="grid sm:grid-cols-3 gap-3 mt-4">
          {corridors.map((c) => (
            <Link key={c.slug} href={`/${c.slug}`} className="card p-4 hover:no-underline">
              <div className="text-2xl">{c.flag}</div>
              <div className="font-semibold mt-1">Send to {c.country}</div>
              <div className="muted text-sm">Guide + top providers</div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <Calculator initialRate={midRate} />
      </section>

      <section className="mt-10 card p-5">
        <h2 className="text-xl font-semibold">Why trust us</h2>
        <ul className="mt-3 space-y-2 text-sm">
          <li><b>Independent.</b> We are not a provider. We do not hold funds.</li>
          <li><b>Transparent.</b> Where we earn a commission, we say so — and we do not let payouts change the rankings.</li>
          <li><b>Dated sources.</b> Every number here has a &quot;last updated&quot; date and a link back to the source app.</li>
          <li><b>Neutral design.</b> We avoid any provider&apos;s branding to make sure this site is never mistaken for their official one.</li>
        </ul>
        <div className="mt-4 flex gap-2 flex-wrap">
          <Link href="/how-we-compare" className="btn">How we compare</Link>
          <Link href="/affiliate-disclosure" className="btn">Affiliate disclosure</Link>
        </div>
      </section>

      <FAQ items={homeFaq} title="Frequently asked" />

      <DataDisclaimer />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: site.name,
            url: site.url,
            description: site.description,
          }),
        }}
      />
    </>
  );
}
