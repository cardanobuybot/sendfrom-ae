export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  date: string; // ISO
  /** Simple markdown-ish content: each element is a paragraph or heading. */
  body: BlogBlock[];
};

export type BlogBlock =
  | { kind: "p"; text: string }
  | { kind: "h2"; text: string }
  | { kind: "ul"; items: string[] };

export const posts: BlogPost[] = [
  {
    slug: "cheapest-uae-to-philippines",
    title: "Cheapest way to send money from UAE to Philippines",
    description:
      "How Filipinos in the UAE can compare Wise, Remitly, WorldRemit, Al Ansari, LuLu and Western Union for the best PHP rate.",
    date: "2026-09-24",
    body: [
      {
        kind: "p",
        text:
          "There is no single 'cheapest' service that stays cheapest forever — rates change every day. But there is a repeatable method to always land close to the best rate.",
      },
      { kind: "h2", text: "Step 1 — check the mid-market rate" },
      {
        kind: "p",
        text:
          "Open Google and type 'AED to PHP'. The number you see is the mid-market rate. Any provider will give you slightly less than that — the difference is how they earn on FX. Your job is to give up as little of that difference as possible.",
      },
      { kind: "h2", text: "Step 2 — compare three providers at your amount" },
      {
        kind: "p",
        text:
          "Never trust an average. Enter your exact amount into three provider apps (for example Wise, Remitly and Al Ansari) and note the amount your recipient will receive in PHP. Pick the biggest number.",
      },
      { kind: "h2", text: "Step 3 — pick the delivery method your recipient prefers" },
      {
        kind: "p",
        text:
          "GCash and Maya arrive in minutes and are usually the cheapest option overall. Direct bank deposit is a close second. Cash pickup is convenient but frequently the most expensive.",
      },
      { kind: "h2", text: "Which providers are competitive on this corridor?" },
      {
        kind: "ul",
        items: [
          "Remitly — very fast Express + GCash / Maya support",
          "Wise — mid-market rate, transparent fee (bank only)",
          "WorldRemit — competitive on cash pickup and GCash",
          "Al Ansari and LuLu — good on payday promos, and cash-friendly",
          "Western Union — best when the recipient has no bank account",
        ],
      },
      {
        kind: "p",
        text:
          "See the full provider comparison on /compare for our latest read.",
      },
    ],
  },
  {
    slug: "wise-vs-remitly-uae",
    title: "Wise vs Remitly from the UAE: which is cheaper?",
    description:
      "A head-to-head look at Wise and Remitly for UAE senders — when each one wins.",
    date: "2026-09-24",
    body: [
      {
        kind: "p",
        text:
          "Wise and Remitly solve overlapping problems, but with different philosophies. Wise sells transparency: mid-market rate + a flat fee shown up front. Remitly sells convenience: minute-level delivery, cash pickup, mobile-wallet payouts.",
      },
      { kind: "h2", text: "When Wise usually wins" },
      {
        kind: "ul",
        items: [
          "Recipient wants a direct bank deposit",
          "You care more about the exchange rate than about speed",
          "You are sending a larger amount where FX markup matters more than the flat fee",
        ],
      },
      { kind: "h2", text: "When Remitly usually wins" },
      {
        kind: "ul",
        items: [
          "Recipient needs the money the same hour",
          "You are paying into a GCash or Maya wallet in the Philippines",
          "Recipient has no bank account and needs cash pickup",
        ],
      },
      { kind: "h2", text: "The honest answer" },
      {
        kind: "p",
        text:
          "Install both, put your exact amount into each, and send to whichever shows a bigger recipient amount today. The winner rotates.",
      },
    ],
  },
  {
    slug: "revolut-uae-launch",
    title: "Revolut UAE launch: what we know so far",
    description:
      "Revolut received UAE Central Bank licences in June 2026. Here is what has been announced and what is still unknown.",
    date: "2026-09-24",
    body: [
      { kind: "h2", text: "Confirmed" },
      {
        kind: "ul",
        items: [
          "Revolut has received the licences it needs from the UAE Central Bank (June 2026).",
          "A consumer launch is expected later in 2026.",
          "The product is not yet open to UAE residents — the app does not accept an Emirates ID as proof of address.",
        ],
      },
      { kind: "h2", text: "Not yet confirmed" },
      {
        kind: "ul",
        items: [
          "Exact list of supported outbound corridors from the UAE",
          "Whether GCash and Maya delivery for the Philippines will be included at launch",
          "Fee schedule and FX markup for the UAE market",
          "Arabic language support",
        ],
      },
      { kind: "h2", text: "What you can do today" },
      {
        kind: "p",
        text:
          "If you already have a Revolut account issued in Europe or the UK, you can log in and use it inside the UAE for outbound transfers, subject to your home-country limits. If you don't, sign up on our /revolut page's notify form and we will email you as soon as the UAE app opens.",
      },
    ],
  },
];

export function getPost(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug);
}
