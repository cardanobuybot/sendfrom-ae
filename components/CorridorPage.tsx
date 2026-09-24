import Link from "next/link";
import type { Metadata } from "next";
import { corridors, getCorridor } from "@/config/corridors";
import { getProvider } from "@/config/providers";
import { site } from "@/config/site";
import ProviderCard from "./ProviderCard";
import DataDisclaimer from "./DataDisclaimer";

export function corridorMetadata(slug: string): Metadata {
  const c = getCorridor(slug);
  if (!c) return {};
  return {
    title: `Send money from the UAE to ${c.country}`,
    description: `Best ways to send money from the UAE to ${c.country}: providers, fees, delivery methods and tips.`,
    alternates: { canonical: `${site.url}/${c.slug}` },
    openGraph: {
      title: `Send money from the UAE to ${c.country} · ${site.name}`,
      description: `Providers, fees, delivery methods and tips for the UAE → ${c.country} corridor.`,
      url: `${site.url}/${c.slug}`,
    },
  };
}

export default function CorridorPage({ slug }: { slug: string }) {
  const c = getCorridor(slug);
  if (!c) return null;
  const recommended = c.recommendedProviderSlugs
    .map((s) => getProvider(s))
    .filter((x): x is NonNullable<typeof x> => !!x);

  return (
    <article>
      <p className="muted text-sm">
        {corridors
          .filter((x) => x.slug !== c.slug)
          .map((x) => (
            <Link key={x.slug} href={`/${x.slug}`} className="mr-3 underline">
              → {x.country}
            </Link>
          ))}
      </p>

      <h1 className="text-3xl font-bold mt-3">
        {c.flag} Send money from the UAE to {c.country}
      </h1>
      <p className="mt-3 leading-relaxed">{c.intro}</p>

      <h2 className="text-2xl font-bold mt-8">Recommended providers</h2>
      <div className="grid sm:grid-cols-2 gap-3 mt-3">
        {recommended.map((p) => <ProviderCard key={p.slug} p={p} />)}
      </div>

      <h2 className="text-2xl font-bold mt-8">Tips</h2>
      <ul className="list-disc pl-5 mt-2 space-y-1">
        {c.tips.map((t) => <li key={t}>{t}</li>)}
      </ul>

      <div className="mt-8 flex gap-2 flex-wrap">
        <Link href="/compare" className="btn btn-primary">Full comparison table</Link>
      </div>

      <DataDisclaimer />
    </article>
  );
}
