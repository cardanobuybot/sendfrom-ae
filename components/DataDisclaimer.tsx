import { site } from "@/config/site";

/**
 * Standard disclaimer shown on any page that displays fees / rates / speed.
 * Prints the `lastUpdated` date so users see how fresh the data is.
 */
export default function DataDisclaimer({ lastUpdated }: { lastUpdated?: string }) {
  const date = lastUpdated ?? site.dataLastUpdated;
  return (
    <p className="muted text-xs mt-6 leading-relaxed">
      Rates and fees change daily. Always check the final amount in the
      provider's app before sending. Last updated: <b>{date}</b>.
    </p>
  );
}
