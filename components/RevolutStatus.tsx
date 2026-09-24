import { revolutStatus } from "@/config/revolut";

/**
 * Reusable status box for the Revolut UAE cluster.
 * Everything comes from config/revolut.ts so the pillar page and each
 * blog post stay in sync when you update the config.
 */
export default function RevolutStatus() {
  return (
    <aside
      className="card p-5 mt-4 border-l-4"
      style={{ borderLeftColor: "var(--accent)" }}
      aria-labelledby="revolut-status-title"
    >
      <h2 id="revolut-status-title" className="font-semibold text-lg">
        {revolutStatus.title}
      </h2>
      <p className="muted text-xs mt-1">
        Last updated: <b>{revolutStatus.lastUpdated}</b>
      </p>
      <p className="mt-3 leading-relaxed">{revolutStatus.summary}</p>
      <ul className="mt-4 space-y-2">
        {revolutStatus.bullets.map((b) => (
          <li key={b.date} className="text-sm">
            <b className="tabular-nums">{b.date}</b> — {b.text}
          </li>
        ))}
      </ul>
    </aside>
  );
}
