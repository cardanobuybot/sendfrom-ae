export type FAQItem = { q: string; a: string };

export default function FAQ({ items, title = "FAQ" }: { items: FAQItem[]; title?: string }) {
  if (!items?.length) return null;
  return (
    <section className="mt-10">
      <h2 className="text-2xl font-bold mb-3">{title}</h2>
      <div className="space-y-3">
        {items.map((it) => (
          <details key={it.q} className="card p-4 group">
            <summary className="cursor-pointer font-medium">{it.q}</summary>
            <p className="mt-2 muted">{it.a}</p>
          </details>
        ))}
      </div>
      {/* FAQPage JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: items.map((it) => ({
              "@type": "Question",
              name: it.q,
              acceptedAnswer: { "@type": "Answer", text: it.a },
            })),
          }),
        }}
      />
    </section>
  );
}
