import type { Metadata } from "next";
import { author } from "@/config/author";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: `About the author — ${author.name}`,
  description: author.shortBio,
  alternates: { canonical: author.fullUrl },
  openGraph: {
    title: `About the author — ${author.name} · ${site.name}`,
    description: author.shortBio,
    url: author.fullUrl,
    type: "profile",
  },
};

export default function AuthorPage() {
  return (
    <>
      <p className="muted text-sm">
        <a href="/about" className="underline">About</a> · Author
      </p>
      <h1 className="text-3xl font-bold mt-2">{author.name}</h1>
      <p className="muted mt-1">
        {author.role} · Based in {author.location}
      </p>

      <div className="mt-6 space-y-4 leading-relaxed">
        {author.longBio.map((para, i) => <p key={i}>{para}</p>)}
      </div>

      <div className="mt-8 flex flex-wrap gap-2">
        <a href="/about" className="btn">About sendfrom.ae</a>
        <a href="/how-we-compare" className="btn">How we compare</a>
        <a href="/affiliate-disclosure" className="btn">Affiliate disclosure</a>
      </div>

      {/* Person JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: author.name,
            url: author.fullUrl,
            jobTitle: author.role,
            homeLocation: {
              "@type": "Country",
              name: author.location,
            },
            description: author.shortBio,
            worksFor: {
              "@type": "Organization",
              name: site.name,
              url: site.url,
            },
          }),
        }}
      />
    </>
  );
}
