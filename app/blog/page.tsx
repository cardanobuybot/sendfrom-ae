import type { Metadata } from "next";
import Link from "next/link";
import { posts } from "@/config/blog";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Blog",
  description: "Articles about sending money from the UAE — corridor guides, provider comparisons, and news.",
  alternates: { canonical: `${site.url}/blog` },
};

export default function BlogIndex() {
  return (
    <>
      <h1 className="text-3xl font-bold">Blog</h1>
      <p className="muted mt-2">Guides and news for UAE senders.</p>
      <ul className="mt-6 space-y-3">
        {posts.map((p) => (
          <li key={p.slug}>
            <Link href={`/blog/${p.slug}`} className="card p-4 block hover:no-underline">
              <div className="muted text-xs">{p.date}</div>
              <div className="font-semibold mt-1">{p.title}</div>
              <div className="muted text-sm mt-1">{p.description}</div>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
