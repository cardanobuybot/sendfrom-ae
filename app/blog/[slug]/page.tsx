import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { posts, getPost } from "@/config/blog";
import { site } from "@/config/site";

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
    },
  };
}

export default async function PostPage(
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const p = getPost(slug);
  if (!p) notFound();

  return (
    <article>
      <p className="muted text-xs">{p.date}</p>
      <h1 className="text-3xl font-bold mt-2">{p.title}</h1>
      <p className="muted mt-2">{p.description}</p>

      <div className="mt-6 space-y-4 leading-relaxed">
        {p.body.map((b, i) => {
          if (b.kind === "h2") return <h2 key={i} className="text-2xl font-bold mt-8">{b.text}</h2>;
          if (b.kind === "ul") return (
            <ul key={i} className="list-disc pl-5 space-y-1">
              {b.items.map((it) => <li key={it}>{it}</li>)}
            </ul>
          );
          return <p key={i}>{b.text}</p>;
        })}
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: p.title,
            description: p.description,
            datePublished: p.date,
            dateModified: p.date,
            author: { "@type": "Organization", name: site.name },
            publisher: { "@type": "Organization", name: site.name, url: site.url },
          }),
        }}
      />
    </article>
  );
}
