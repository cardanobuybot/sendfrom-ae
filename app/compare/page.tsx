import type { Metadata } from "next";
import ComparisonTable from "@/components/ComparisonTable";
import DataDisclaimer from "@/components/DataDisclaimer";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Compare money-transfer providers from the UAE",
  description: "Fees, exchange-rate markup, speed and delivery methods for the biggest UAE money-transfer providers, side by side.",
  alternates: { canonical: `${site.url}/compare` },
};

export default function Page() {
  return (
    <>
      <h1 className="text-3xl font-bold">Compare providers</h1>
      <p className="muted mt-2 text-sm">
        Pick a corridor and sort by whichever column matters to you — fee, FX
        markup, speed or app rating.
      </p>
      <div className="mt-6"><ComparisonTable /></div>
      <DataDisclaimer />
    </>
  );
}
