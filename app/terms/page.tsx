import type { Metadata } from "next";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Terms of use",
  description: "Terms of use for sendfrom.ae — information site, not financial advice.",
  alternates: { canonical: `${site.url}/terms` },
};

export default function Page() {
  return (
    <>
      <h1 className="text-3xl font-bold">Terms of use</h1>
      <p className="mt-4 leading-relaxed">
        {site.name} publishes information about money-transfer providers. The
        content is general in nature and does not constitute financial advice.
        Fees, exchange rates and delivery times shown on this site are
        placeholders / estimates unless marked otherwise — always confirm the
        final numbers inside the provider's own app before sending money.
      </p>
      <p className="mt-4 leading-relaxed">
        We do not receive, hold, transfer or convert money. All transactions
        happen between you and the chosen provider under that provider's own
        terms and licences.
      </p>
      <p className="mt-4 leading-relaxed">
        We are not liable for outcomes of transfers you make with a provider.
        If you believe a page here contains a factual error, please contact us —
        we will correct it.
      </p>
    </>
  );
}
