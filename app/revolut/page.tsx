import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/config/site";
import { revolutStatus, revolutClusterPosts } from "@/config/revolut";
import { getPost } from "@/config/blog";
import { getProvider } from "@/config/providers";
import IndependentBanner from "@/components/IndependentBanner";
import RevolutStatus from "@/components/RevolutStatus";
import RevolutNotify from "@/components/RevolutNotify";
import AffiliateButton from "@/components/AffiliateButton";
import FAQ from "@/components/FAQ";
import DataDisclaimer from "@/components/DataDisclaimer";

export const metadata: Metadata = {
  title: "Revolut in the UAE — status & what to expect",
  description:
    "Independent 2026 status page. Revolut has UAE Central Bank licences but is not yet open to residents. Launch expected late 2026.",
  alternates: { canonical: `${site.url}/revolut` },
  openGraph: {
    title: `Revolut in the UAE — status & what to expect · ${site.name}`,
    description:
      "Independent 2026 status page. Revolut has CBUAE licences but is not yet open to UAE residents. Launch expected late 2026.",
    url: `${site.url}/revolut`,
    type: "article",
    modifiedTime: revolutStatus.lastUpdated,
  },
};

const pillarFaq = [
  {
    q: "Can I open a Revolut account in the UAE today?",
    a: "No. Revolut's consumer product is not yet open to UAE residents. The app cannot verify an Emirates ID for account creation. The Central Bank of the UAE granted Revolut the necessary payment licences on 17 June 2026, but the app has not launched yet.",
  },
  {
    q: "When will Revolut launch in the UAE?",
    a: "Revolut has publicly committed to a late-2026 launch. No specific date has been announced. If you want to be notified, use the sign-up form on this page.",
  },
  {
    q: "What will Revolut UAE include at launch?",
    a: "Revolut has said the initial UAE product will include multi-currency accounts, physical and virtual cards, local UAE payments, and international transfers. Crypto will follow once VARA grants full approval — VARA gave in-principle approval on 15 July 2026.",
  },
  {
    q: "I already have a Revolut account from Europe or the UK. Can I use it in the UAE?",
    a: "Yes. You can log in and use your existing card for outbound transfers, ATM withdrawals and card payments in the UAE, subject to your home-country plan's monthly limits. See our guide 'Using your Revolut card in Dubai' below.",
  },
  {
    q: "Will Revolut Business be available in the UAE?",
    a: "Not announced. Revolut has not confirmed whether Revolut Business will follow the consumer launch in the UAE.",
  },
];

export default function RevolutPillar() {
  const clusterPosts = revolutClusterPosts
    .map((s) => getPost(s))
    .filter((x): x is NonNullable<typeof x> => !!x);
  const alternatives = ["wise", "remitly", "worldremit"]
    .map((s) => getProvider(s))
    .filter((x): x is NonNullable<typeof x> => !!x);

  return (
    <article>
      <IndependentBanner providerName="Revolut" />

      <h1 className="text-3xl font-bold">Revolut in the UAE — status &amp; what to expect</h1>
      <p className="muted mt-2">
        Independent guide to Revolut's UAE launch: what has actually been announced, what is still unknown, and what you can do while you wait.
      </p>

      <RevolutStatus />

      <h2 className="text-2xl font-bold mt-10">Planned at launch</h2>
      <p className="mt-2 leading-relaxed">
        Based on Revolut's public statements, the initial UAE product is expected to include:
      </p>
      <ul className="list-disc pl-5 mt-2 space-y-1">
        {revolutStatus.plannedAtLaunch.map((x) => <li key={x}>{x}</li>)}
      </ul>
      <p className="mt-3 muted text-sm">{revolutStatus.cryptoNote}</p>

      <h2 className="text-2xl font-bold mt-10">Still unknown</h2>
      <ul className="list-disc pl-5 mt-2 space-y-1">
        {revolutStatus.unknowns.map((x) => <li key={x}>{x}</li>)}
      </ul>

      <h2 className="text-2xl font-bold mt-10">Notify me when Revolut launches</h2>
      <p className="mt-2 leading-relaxed">
        One email at launch. We will not send you anything else.
      </p>
      <div className="mt-4"><RevolutNotify /></div>

      <h2 className="text-2xl font-bold mt-10">Alternatives available today</h2>
      <p className="mt-2 leading-relaxed">
        You can already send money from the UAE cheaply. The three providers below cover almost every UAE-outbound use case:
      </p>
      <div className="grid sm:grid-cols-3 gap-3 mt-4">
        {alternatives.map((p) => (
          <Link key={p.slug} href={`/${p.slug}`} className="card p-4 hover:no-underline">
            <div className="font-semibold">{p.name}</div>
            <div className="muted text-sm mt-1">{p.tagline}</div>
          </Link>
        ))}
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        <Link href="/compare" className="btn">Compare all providers</Link>
        <Link href="/send-money-to-philippines" className="btn">UAE → Philippines</Link>
        <Link href="/send-money-to-india" className="btn">UAE → India</Link>
        <Link href="/send-money-to-pakistan" className="btn">UAE → Pakistan</Link>
      </div>

      <h2 className="text-2xl font-bold mt-10">In-depth reads</h2>
      <ul className="mt-3 space-y-2">
        {clusterPosts.map((p) => (
          <li key={p.slug}>
            <Link href={`/blog/${p.slug}`} className="card p-3 block hover:no-underline">
              <div className="font-medium">{p.title}</div>
              <div className="muted text-sm">{p.description}</div>
            </Link>
          </li>
        ))}
      </ul>

      <div className="mt-10 flex flex-wrap gap-3">
        <AffiliateButton slug="revolut">
          Get notified about Revolut UAE
        </AffiliateButton>
        <Link href="/how-we-compare" className="btn">How we compare</Link>
      </div>

      <FAQ items={pillarFaq} />

      <DataDisclaimer lastUpdated={revolutStatus.lastUpdated} />

      {/* Article JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: "Revolut in the UAE — status & what to expect",
            description:
              "Independent 2026 status page for Revolut's UAE launch — regulatory milestones, planned features, and alternatives available today.",
            datePublished: "2026-09-24",
            dateModified: revolutStatus.lastUpdated,
            author: { "@type": "Organization", name: site.name },
            publisher: { "@type": "Organization", name: site.name, url: site.url },
            mainEntityOfPage: { "@type": "WebPage", "@id": `${site.url}/revolut` },
          }),
        }}
      />
    </article>
  );
}
