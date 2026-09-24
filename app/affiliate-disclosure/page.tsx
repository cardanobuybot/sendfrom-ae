import type { Metadata } from "next";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Affiliate disclosure",
  description: "Which links on sendfrom.ae are affiliate links, and how we handle them.",
  alternates: { canonical: `${site.url}/affiliate-disclosure` },
};

export default function Page() {
  return (
    <>
      <h1 className="text-3xl font-bold">Affiliate disclosure</h1>
      <p className="mt-4 leading-relaxed">
        {site.name} earns a commission when a reader signs up for some — not
        all — of the providers listed on this site. When we do, we mark it
        clearly.
      </p>

      <h2 className="text-2xl font-bold mt-8">How we mark affiliate links</h2>
      <ul className="list-disc pl-5 mt-2 space-y-1">
        <li>Affiliate links pass through our <code>/go/&lt;slug&gt;</code> redirect and carry <code>rel="sponsored nofollow"</code>.</li>
        <li>Non-affiliate links (e.g. providers without a public affiliate programme) go straight to the official site and carry no <code>/go/</code> tracking.</li>
        <li>Every provider page carries a banner reminding you that the page is an independent guide and may contain affiliate links.</li>
      </ul>

      <h2 className="text-2xl font-bold mt-8">Does the commission change your fees?</h2>
      <p className="mt-2 leading-relaxed">
        No. The provider pays us a commission out of their own margin — you
        pay exactly the same fee whether you arrive through our link or not.
      </p>

      <h2 className="text-2xl font-bold mt-8">Does the commission change your rankings?</h2>
      <p className="mt-2 leading-relaxed">
        No. We compare providers on published fees, exchange rate markup,
        delivery speed and delivery methods, from the same public sources you
        can verify. See <a href="/how-we-compare" className="underline">how we compare</a>.
      </p>

      <h2 className="text-2xl font-bold mt-8">What we will not do</h2>
      <ul className="list-disc pl-5 mt-2 space-y-1">
        <li>Offer our own cashback or bonuses in exchange for signups.</li>
        <li>Run paid ads on provider brand names.</li>
        <li>Copy any provider's logos, colours, or wording.</li>
      </ul>
    </>
  );
}
