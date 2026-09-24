import type { Metadata } from "next";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "How we compare providers",
  description: "The methodology behind sendfrom.ae rankings — data sources, criteria, and update frequency.",
  alternates: { canonical: `${site.url}/how-we-compare` },
};

export default function Page() {
  return (
    <>
      <h1 className="text-3xl font-bold">How we compare providers</h1>

      <h2 className="text-2xl font-bold mt-8">What we track</h2>
      <ul className="list-disc pl-5 mt-2 space-y-1">
        <li>Flat fee (in AED) for a benchmark AED 1,000 transfer.</li>
        <li>FX markup vs. the mid-market rate at the moment of quote.</li>
        <li>Delivery speed for each corridor.</li>
        <li>Delivery methods (bank deposit, cash pickup, GCash, Maya, UPI).</li>
        <li>Publicly available app-store rating (average of iOS + Android).</li>
        <li>Regulatory status (which UAE / home-country authority licenses the provider).</li>
      </ul>

      <h2 className="text-2xl font-bold mt-8">Where the numbers come from</h2>
      <p className="mt-2 leading-relaxed">
        Directly from each provider's app or public site, on the day we
        update. Every page carries a "Last updated" date. When we cannot
        verify a number, we show a placeholder (<code>—</code> or "TODO:
        verify") rather than invent one.
      </p>

      <h2 className="text-2xl font-bold mt-8">How often we update</h2>
      <p className="mt-2 leading-relaxed">
        Provider fees and rate policies are relatively stable — we aim to
        re-verify each provider page at least once every 30 days. Exchange
        rates move daily; we do not attempt to keep those live on this site.
        Always confirm the exact recipient amount in the provider's own app.
      </p>

      <h2 className="text-2xl font-bold mt-8">What we do not do</h2>
      <ul className="list-disc pl-5 mt-2 space-y-1">
        <li>Rank based on affiliate commission.</li>
        <li>Copy provider branding.</li>
        <li>Compete with providers by offering our own promotions.</li>
      </ul>

      <p className="mt-6 muted text-sm">
        Comments, corrections and edge cases welcome — see{" "}
        <a href="/contact" className="underline">contact</a>.
      </p>
      <p className="muted text-xs mt-2">Methodology last updated: {site.dataLastUpdated}.</p>
    </>
  );
}
