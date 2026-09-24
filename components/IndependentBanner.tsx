import { site } from "@/config/site";

/** Top-of-page independence + affiliate disclosure banner. */
export default function IndependentBanner({ providerName }: { providerName: string }) {
  return (
    <div className="card p-3 text-xs muted mb-4">
      <b className="text-[color:var(--fg)]">Independent guide.</b>{" "}
      {site.name} is not affiliated with {providerName}. This page contains
      affiliate links — see our{" "}
      <a href="/affiliate-disclosure" className="underline">affiliate disclosure</a>.
    </div>
  );
}
