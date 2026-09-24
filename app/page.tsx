import Link from "next/link";
import { providers } from "@/config/providers";
import { corridors } from "@/config/corridors";
import { site } from "@/config/site";
import ProviderCard from "@/components/ProviderCard";
import Calculator from "@/components/Calculator";
import FAQ from "@/components/FAQ";
import DataDisclaimer from "@/components/DataDisclaimer";

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

export default function Home() {
  return (
    <>
      <section className="pt-4">
        <h1 className="text-4xl sm:text-5xl font-black leading-tight tracking-tight">
          Send money from the UAE — compare the cheapest ways
        </h1>
        <p className="mt-4 text-lg muted">
          Independent, English-language guide for expats in the UAE — Filipinos,
          Indians, Pakistanis and seafarers. Compare fees, exchange rates and
          speed across the biggest providers.
        </p>
        <div className="mt-6 flex gap-3 flex-wrap">
          <Link href="/compare" className="btn btn-primary">Compare all providers</Link>
          <Link href="/how-we-compare" className="btn">How we compare</Link>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-bold">Providers we track</h2>
        <p className="muted text-sm mt-1">
          Seven of the biggest options for outbound transfers from the UAE.
        </p>
        <div className="grid sm:grid-cols-2 gap-3 mt-4">
          {providers.map((p) => <ProviderCard key={p.slug} p={p} />)}
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
        <Calculator />
      </section>

      <section className="mt-10 card p-5">
        <h2 className="text-xl font-semibold">Why trust us</h2>
        <ul className="mt-3 space-y-2 text-sm">
          <li><b>Independent.</b> We are not a provider. We do not hold funds.</li>
          <li><b>Transparent.</b> Where we earn a commission, we say so — and we do not let payouts change the rankings.</li>
          <li><b>Editable.</b> Every number here has a "last updated" date and a link back to the source app.</li>
          <li><b>Neutral design.</b> We avoid any provider's branding to make sure this site is never mistaken for their official one.</li>
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
