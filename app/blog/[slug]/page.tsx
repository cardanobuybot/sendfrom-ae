import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { posts, getPost } from "@/config/blog";
import { site } from "@/config/site";
import FAQ from "@/components/FAQ";
import RevolutStatus from "@/components/RevolutStatus";
import IndependentBanner from "@/components/IndependentBanner";
import AffiliateButton from "@/components/AffiliateButton";
import DataDisclaimer from "@/components/DataDisclaimer";

export async function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> },
): Promise<Metadata> {
  const { slug } = await params;
  const p = getPost(slug);
  if (!p) return {};
  return {
    title: p.title,
    description: p.description,
    alternates: { canonical: `${site.url}/blog/${p.slug}` },
    openGraph: {
      title: `${p.title} · ${site.name}`,
      description: p.description,
      url: `${site.url}/blog/${p.slug}`,
      type: "article",
      publishedTime: p.date,
      modifiedTime: p.dateModified ?? p.date,
    },
  };
}

export default async function PostPage(
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const p = getPost(slug);
  if (!p) notFound();

  const isRevolutPost = p.slug.includes("revolut");
  const related = (p.relatedSlugs ?? [])
    .map((s) => getPost(s))
    .filter((x): x is NonNullable<typeof x> => !!x);

  return (
    <article>
      {isRevolutPost && <IndependentBanner providerName="Revolut" />}

      <p className="muted text-xs">
        Published <b>{p.date}</b>
        {p.dateModified && p.dateModified !== p.date ? (
          <> · updated <b>{p.dateModified}</b></>
        ) : null}
      </p>
      <h1 className="text-3xl font-bold mt-2">{p.title}</h1>
      <p className="muted mt-2">{p.description}</p>

      {p.showRevolutStatus && <RevolutStatus />}

      <div className="mt-6 space-y-4 leading-relaxed">
        {p.body.map((b, i) => {
          if (b.kind === "h2") return <h2 key={i} className="text-2xl font-bold mt-8">{b.text}</h2>;
          if (b.kind === "ul") return (
            <ul key={i} className="list-disc pl-5 space-y-1">
              {b.items.map((it) => <li key={it}>{it}</li>)}
            </ul>
          );
          if (b.kind === "ol") return (
            <ol key={i} className="list-decimal pl-5 space-y-1">
              {b.items.map((it) => <li key={it}>{it}</li>)}
            </ol>
          );
          if (b.kind === "note") return (
            <aside key={i} className="card p-4 text-sm">{b.text}</aside>
          );
          return <p key={i}>{b.text}</p>;
        })}
      </div>

      {isRevolutPost && (
        <div className="mt-8 flex flex-wrap gap-3">
          <AffiliateButton slug="revolut">Get notified when Revolut opens in the UAE</AffiliateButton>
          <Link href="/revolut" className="btn">Revolut UAE — full status</Link>
        </div>
      )}

      {related.length > 0 && (
        <section className="mt-10">
          <h2 className="text-2xl font-bold mb-3">Related</h2>
          <ul className="space-y-2">
            {related.map((r) => (
              <li key={r.slug}>
                <Link href={`/blog/${r.slug}`} className="card p-3 block hover:no-underline">
                  <div className="font-medium">{r.title}</div>
                  <div className="muted text-sm">{r.description}</div>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {p.faq && p.faq.length > 0 && <FAQ items={p.faq} />}

      <DataDisclaimer lastUpdated={p.dateModified ?? p.date} />

      {/* Article JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: p.title,
            description: p.description,
            datePublished: p.date,
            dateModified: p.dateModified ?? p.date,
            author: { "@type": "Organization", name: site.name },
            publisher: { "@type": "Organization", name: site.name, url: site.url },
            mainEntityOfPage: { "@type": "WebPage", "@id": `${site.url}/blog/${p.slug}` },
          }),
        }}
      />
    </article>
  );
}
