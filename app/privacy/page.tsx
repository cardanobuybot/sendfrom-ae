import type { Metadata } from "next";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Privacy policy",
  description: "How sendfrom.ae handles data — short version: as little as possible.",
  alternates: { canonical: `${site.url}/privacy` },
};

export default function Page() {
  return (
    <>
      <h1 className="text-3xl font-bold">Privacy policy</h1>
      <p className="mt-4 leading-relaxed">
        Short version: this site does not ask you for personal data unless you
        explicitly submit a form (e.g. the Revolut notification form on{" "}
        <a href="/revolut" className="underline">/revolut</a>).
      </p>

      <h2 className="text-2xl font-bold mt-8">Analytics</h2>
      <p className="mt-2 leading-relaxed">
        We use Vercel Analytics, a privacy-friendly analytics service that
        does not use cookies for tracking and does not fingerprint users. It
        counts anonymised page views and click events on outbound partner
        links.
      </p>

      <h2 className="text-2xl font-bold mt-8">Affiliate link tracking</h2>
      <p className="mt-2 leading-relaxed">
        Some outbound links to money-transfer providers pass through our{" "}
        <code>/go/&lt;slug&gt;</code> redirect. This lets us count how many
        readers use each provider so we can prioritise updates. No personal
        data is transmitted through this redirect.
      </p>

      <h2 className="text-2xl font-bold mt-8">Forms</h2>
      <p className="mt-2 leading-relaxed">
        When you submit the "Notify me when Revolut launches" form, we store
        your email so we can send you exactly one email at launch. You can
        request deletion any time — see <a href="/contact" className="underline">contact</a>.
      </p>

      <h2 className="text-2xl font-bold mt-8">Data controller</h2>
      <p className="mt-2 leading-relaxed">
        This site is operated by the owner of {site.domain}. For any
        data-protection request, email{" "}
        <a href={`mailto:${site.ownerEmail}`} className="underline">
          {site.ownerEmail}
        </a>.
      </p>
    </>
  );
}
