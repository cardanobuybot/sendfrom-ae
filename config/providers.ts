/**
 * Provider data — the ONE file to edit for fees, corridors, ratings, etc.
 *
 * Policy on numeric values:
 * - Provider pricing calculators are dynamic; we do NOT copy live figures
 *   into this file. Any `feeAed1k` / `rateMarkupPct` / `minAed` / `maxAed`
 *   left as `null` renders as "Check in app" on the site.
 * - When you pin a stable, versioned document (e.g. a "Global Service
 *   Fees PDF" or a help-centre article that quotes a specific figure),
 *   fill in the number AND add the exact URL to `sources[]` with the
 *   date you checked.
 * - `sources[]` per provider is the authoritative list of pages a reader
 *   or search engine can visit to verify pricing themselves.
 * - Bump `dataLastUpdated` whenever you touch any of the above.
 */

export type CorridorCode = "PH" | "IN" | "PK";
export type DeliveryMethod =
  | "bank_deposit"
  | "cash_pickup"
  | "gcash"
  | "maya"
  | "upi"
  | "wallet";

export type CorridorInfo = {
  country: CorridorCode;
  methods: DeliveryMethod[];
  /**
   * Flat transfer fee in AED for a 1,000 AED transfer.
   * `null` renders as "Check in app" on the site (see displayFee()).
   */
  feeAed1k: number | null;
  /** Approximate FX markup vs mid-market, in %. `null` → "Check in app". */
  rateMarkupPct: number | null;
  /** Typical delivery time in words (e.g. "minutes", "1-2 days"). */
  speed: string;
  minAed: number | null;
  maxAed: number | null;
};

/**
 * An official source URL we point users to for verifying pricing themselves.
 * `dateChecked` is when we last visited the URL and confirmed it loads.
 * We do NOT copy numbers from these pages into our data unless we can pin
 * them to a stable, versioned document — provider pricing calculators are
 * dynamic and change daily.
 */
export type ProviderSource = {
  url: string;
  label: string;
  dateChecked: string;
};

export type Provider = {
  slug: string;
  name: string;
  /** Short one-line description (shown in cards). */
  tagline: string;
  /** Longer paragraph on the provider page. */
  intro: string;
  /** Who this provider is best for. */
  bestFor: string[];
  corridors: CorridorInfo[];
  pros: string[];
  cons: string[];
  /** App store rating (average of iOS/Android) if publicly known. `null` if unclear. */
  appRating: number | null;
  /** ISO date the numbers on this page were verified. */
  dataLastUpdated: string;
  /** Step-by-step "how to send" instructions. */
  howToSend: string[];
  faq: { q: string; a: string }[];
  /**
   * Free-form "status" note shown at the top of the page.
   * Used by Revolut for its UAE-launch disclaimer.
   */
  statusNote?: string;
  /** Official URLs we cite as the authoritative source of live pricing. */
  sources: ProviderSource[];
};

/** UI helper — turn a possibly-null number into a friendly string. */
export function displayFee(v: number | null): string {
  return v == null ? "Check in app" : `AED ${v}`;
}
export function displayMarkup(v: number | null): string {
  return v == null ? "Check in app" : `${v.toFixed(2)}%`;
}
export function displayLimit(v: number | null): string {
  return v == null ? "Check in app" : `AED ${v.toLocaleString()}`;
}

// -------------------------------------------------------------------
// PROVIDERS
// -------------------------------------------------------------------

export const providers: Provider[] = [
  {
    slug: "revolut",
    name: "Revolut",
    tagline: "UK/EU digital bank — UAE launch expected late 2026.",
    intro:
      "Revolut is a global digital bank founded in the UK. In June 2026 it received the required licences from the UAE Central Bank, but at the time of writing the app is NOT yet open to UAE residents. A full consumer launch is expected later in 2026.",
    bestFor: [
      "People who already have a Revolut account from Europe or the UK and want to top up during their UAE trip.",
      "Anyone who wants to be first when Revolut UAE goes live.",
    ],
    corridors: [
      {
        country: "PH",
        methods: ["bank_deposit", "wallet"],
        feeAed1k: null,
        rateMarkupPct: null,
        speed: "minutes to same-day (expected)",
        minAed: null,
        maxAed: null,
      },
      {
        country: "IN",
        methods: ["bank_deposit", "upi"],
        feeAed1k: null,
        rateMarkupPct: null,
        speed: "minutes to same-day (expected)",
        minAed: null,
        maxAed: null,
      },
      {
        country: "PK",
        methods: ["bank_deposit"],
        feeAed1k: null,
        rateMarkupPct: null,
        speed: "1-2 days (expected)",
        minAed: null,
        maxAed: null,
      },
    ],
    pros: [
      "Strong track record in Europe and the UK",
      "Fully digital onboarding",
      "Multi-currency accounts and cards",
    ],
    cons: [
      "Not yet available to UAE residents",
      "Fees for the UAE market not yet published",
      "Support hours and Arabic language coverage still unknown",
    ],
    appRating: null,
    dataLastUpdated: "2026-09-24",
    howToSend: [
      "This provider is not open to UAE residents yet.",
      "Sign up on the notify form below and we'll email you when the UAE app goes live.",
      "If you already have a Revolut account from Europe or the UK, you can use it in the UAE for outbound transfers — subject to Revolut's home-country limits.",
    ],
    faq: [
      {
        q: "Can I open Revolut in the UAE today?",
        a: "No. As of the last update on this page, UAE residents cannot open a Revolut account. The company holds the required licences, but the consumer launch is expected later in 2026.",
      },
      {
        q: "Will Revolut UAE support GCash and Maya?",
        a: "The company has not published its supported delivery methods for the UAE market yet. We will update this page as soon as they announce them.",
      },
      {
        q: "Will Revolut UAE support Arabic?",
        a: "Not confirmed yet. In other markets Revolut supports the local language — we expect Arabic to follow.",
      },
    ],
    statusNote:
      "Revolut has received UAE Central Bank licences (June 2026) but is not yet open to UAE residents. Launch expected late 2026.",
      sources: [
      { url: "https://www.revolut.com/", label: 'Revolut homepage (UAE consumer product not yet open)', dateChecked: "2026-09-24" },
      { url: "https://help.revolut.com/", label: 'Revolut Help Centre — official fees & limits by market', dateChecked: "2026-09-24" },
    ],
  },
  {
    slug: "wise",
    name: "Wise",
    tagline: "Mid-market rate + transparent flat fee, all in-app.",
    intro:
      "Wise (formerly TransferWise) is a UK-based fintech known for showing the true mid-market exchange rate and charging a separate, upfront fee. Popular with expats sending money out of the UAE to bank accounts abroad.",
    bestFor: [
      "Anyone sending to a bank account in India, Philippines or Pakistan.",
      "People who want to see the exact fee before pressing Send.",
    ],
    corridors: [
      {
        country: "PH",
        methods: ["bank_deposit", "gcash"],
        feeAed1k: null,
        rateMarkupPct: null,
        speed: "minutes to 1 day",
        minAed: null,
        maxAed: null,
      },
      {
        country: "IN",
        methods: ["bank_deposit", "upi"],
        feeAed1k: null,
        rateMarkupPct: null,
        speed: "minutes to 1 day",
        minAed: null,
        maxAed: null,
      },
      {
        country: "PK",
        methods: ["bank_deposit"],
        feeAed1k: null,
        rateMarkupPct: null,
        speed: "1-2 days",
        minAed: null,
        maxAed: null,
      },
    ],
    pros: [
      "Real mid-market rate — no hidden markup",
      "Transparent flat fee shown before you send",
      "Well-designed app, English-first",
    ],
    cons: [
      "No cash pickup in the UAE",
      "Bank funding only — no cash top-up in a branch",
      "Not the fastest for cash-pickup corridors",
    ],
    appRating: null,
    dataLastUpdated: "2026-09-24",
    howToSend: [
      "Install the Wise app and register with your Emirates ID.",
      "Choose 'Send money' → recipient country (PH / IN / PK).",
      "Enter the amount in AED. Wise will show the fee, the mid-market rate and the exact amount your recipient will get.",
      "Fund the transfer from your UAE bank account (or debit card).",
      "Confirm and track the transfer inside the app until it completes.",
    ],
    faq: [
      {
        q: "Does Wise use the real exchange rate?",
        a: "Yes — Wise uses the mid-market rate you can look up on Google, and charges a separate fee shown before you confirm.",
      },
      {
        q: "Is Wise regulated in the UAE?",
        a: "Wise operates in the UAE in partnership with local licensed institutions. Check the latest terms inside the Wise app for the exact regulator.",
      },
    ],
      sources: [
      { url: "https://wise.com/", label: 'Wise homepage & AED corridor calculator', dateChecked: "2026-09-24" },
      { url: "https://wise.com/help/articles/2932693", label: 'Wise Help — pricing of transfers (canonical fee policy)', dateChecked: "2026-09-24" },
      { url: "https://wise.com/help/articles/2977951", label: 'Wise Help — send limits per country', dateChecked: "2026-09-24" },
    ],
  },
  {
    slug: "remitly",
    name: "Remitly",
    tagline: "Fast cash pickup + e-wallet delivery, remittance-focused.",
    intro:
      "Remitly is a US-headquartered money-transfer company built specifically for remittances. It offers 'Express' delivery (minutes, higher rate) and 'Economy' delivery (slower, better rate).",
    bestFor: [
      "Filipinos sending to GCash / Maya / cash pickup.",
      "Anyone who needs the money to arrive within minutes.",
    ],
    corridors: [
      {
        country: "PH",
        methods: ["bank_deposit", "cash_pickup", "gcash", "maya"],
        feeAed1k: null,
        rateMarkupPct: null,
        speed: "minutes (Express) or 3-5 days (Economy)",
        minAed: null,
        maxAed: null,
      },
      {
        country: "IN",
        methods: ["bank_deposit", "upi", "cash_pickup"],
        feeAed1k: null,
        rateMarkupPct: null,
        speed: "minutes to 1 day",
        minAed: null,
        maxAed: null,
      },
      {
        country: "PK",
        methods: ["bank_deposit", "cash_pickup"],
        feeAed1k: null,
        rateMarkupPct: null,
        speed: "minutes to 1 day",
        minAed: null,
        maxAed: null,
      },
    ],
    pros: [
      "Very fast Express option",
      "Wide cash-pickup network in PH, IN, PK",
      "GCash and Maya delivery for the Philippines",
    ],
    cons: [
      "Express is faster but noticeably more expensive than Economy",
      "First-transfer promotional rate can be misleading — check the regular rate too",
    ],
    appRating: null,
    dataLastUpdated: "2026-09-24",
    howToSend: [
      "Install Remitly and register with your Emirates ID.",
      "Pick recipient country and delivery method (bank / cash pickup / GCash / Maya).",
      "Choose 'Express' for speed or 'Economy' for a better rate.",
      "Fund with your UAE debit card or bank account.",
      "Share the tracking link with the recipient.",
    ],
    faq: [
      {
        q: "Express vs Economy — which one should I pick?",
        a: "Express is minutes and costs more; Economy takes a few working days but usually gives a better exchange rate. If you don't need the money the same day, Economy is almost always cheaper.",
      },
      {
        q: "Does Remitly send to GCash and Maya?",
        a: "Yes — both are supported for the UAE-to-Philippines corridor.",
      },
    ],
      sources: [
      { url: "https://www.remitly.com/ae/en", label: 'Remitly UAE homepage & calculator', dateChecked: "2026-09-24" },
      { url: "https://help.remitly.com/s/", label: 'Remitly Help Centre — Express vs Economy fee policy', dateChecked: "2026-09-24" },
    ],
  },
  {
    slug: "worldremit",
    name: "WorldRemit",
    tagline: "Global remittance app, wide corridor coverage.",
    intro:
      "WorldRemit is a London-based remittance service with strong coverage across Africa, Asia and Latin America. Popular with Filipino, Indian and Pakistani senders.",
    bestFor: [
      "People sending small amounts often, to varied delivery methods.",
      "Recipients who prefer cash pickup or mobile-money.",
    ],
    corridors: [
      {
        country: "PH",
        methods: ["bank_deposit", "cash_pickup", "gcash"],
        feeAed1k: null,
        rateMarkupPct: null,
        speed: "minutes to 1 day",
        minAed: null,
        maxAed: null,
      },
      {
        country: "IN",
        methods: ["bank_deposit", "upi"],
        feeAed1k: null,
        rateMarkupPct: null,
        speed: "minutes to 1 day",
        minAed: null,
        maxAed: null,
      },
      {
        country: "PK",
        methods: ["bank_deposit", "cash_pickup"],
        feeAed1k: null,
        rateMarkupPct: null,
        speed: "minutes to 1 day",
        minAed: null,
        maxAed: null,
      },
    ],
    pros: [
      "Wide network of delivery methods",
      "Well-known brand outside the UAE too",
      "GCash delivery for the Philippines",
    ],
    cons: [
      "Fees and rates vary a lot by corridor — always double-check in the app",
      "Interface has fewer transparency signals than Wise",
    ],
    appRating: null,
    dataLastUpdated: "2026-09-24",
    howToSend: [
      "Install WorldRemit and register with your Emirates ID.",
      "Choose recipient country + delivery method.",
      "Enter amount, check the total charge (fee + FX), confirm.",
      "Fund with debit card or UAE bank transfer.",
      "Track in-app until delivered.",
    ],
    faq: [
      {
        q: "Is WorldRemit cheaper than Wise?",
        a: "It depends on the corridor and the amount. For bank-to-bank into India, Wise is often cheaper. For cash pickup in the Philippines, WorldRemit can be competitive. Always compare the final amount the recipient will get in each app.",
      },
    ],
      sources: [
      { url: "https://www.worldremit.com/en/united-arab-emirates", label: 'WorldRemit UAE homepage & calculator', dateChecked: "2026-09-24" },
      { url: "https://www.worldremit.com/en/faq", label: 'WorldRemit FAQ — fees, delivery times, limits', dateChecked: "2026-09-24" },
    ],
  },
  {
    slug: "western-union",
    name: "Western Union",
    tagline: "Legacy remittance with the widest cash-pickup network.",
    intro:
      "Western Union is the oldest large-scale remittance network in the world. Best known for its physical branches — very useful when the recipient does not have a bank account and needs cash right away.",
    bestFor: [
      "Sending to recipients without a bank account.",
      "Emergency cash pickup in remote locations.",
    ],
    corridors: [
      {
        country: "PH",
        methods: ["cash_pickup", "bank_deposit", "gcash"],
        feeAed1k: null,
        rateMarkupPct: null,
        speed: "minutes for cash pickup",
        minAed: null,
        maxAed: null,
      },
      {
        country: "IN",
        methods: ["cash_pickup", "bank_deposit"],
        feeAed1k: null,
        rateMarkupPct: null,
        speed: "minutes to 1 day",
        minAed: null,
        maxAed: null,
      },
      {
        country: "PK",
        methods: ["cash_pickup", "bank_deposit"],
        feeAed1k: null,
        rateMarkupPct: null,
        speed: "minutes for cash pickup",
        minAed: null,
        maxAed: null,
      },
    ],
    pros: [
      "The largest physical cash-pickup network on earth",
      "You do not need to invite the recipient into an app",
      "Available in every emirate",
    ],
    cons: [
      "Historically among the more expensive options on rate + fee",
      "Digital experience is not as sharp as fintech competitors",
    ],
    appRating: null,
    dataLastUpdated: "2026-09-24",
    howToSend: [
      "In the WU app: pick recipient country + delivery method + amount.",
      "Alternatively, visit any Western Union branch in the UAE with your Emirates ID and cash / card.",
      "Share the MTCN (10-digit tracking number) with the recipient.",
      "Recipient collects cash at any WU agent in their country — or the money lands in their bank account.",
    ],
    faq: [
      {
        q: "Do I need a WU account to send in cash?",
        a: "You do not need an online account for over-the-counter cash sends, but you must present a valid ID (Emirates ID in the UAE).",
      },
    ],
      sources: [
      { url: "https://www.westernunion.com/ae/en/home.html", label: 'Western Union UAE homepage & send-money calculator', dateChecked: "2026-09-24" },
      { url: "https://www.westernunion.com/ae/en/web/global-service-fees.html", label: 'Western Union UAE — Global Service Fees', dateChecked: "2026-09-24" },
    ],
  },
  {
    slug: "al-ansari",
    name: "Al Ansari Exchange",
    tagline: "Big UAE branch network with same-day corridor deals.",
    intro:
      "Al Ansari Exchange is one of the largest licensed exchange houses in the UAE, with branches across every emirate. Strong presence in worker-heavy areas and dedicated remittance products for South-Asian and Filipino corridors.",
    bestFor: [
      "Workers who prefer paying in cash at a physical counter.",
      "Salary transfers on payday, straight from a WPS-linked salary.",
    ],
    corridors: [
      {
        country: "PH",
        methods: ["bank_deposit", "cash_pickup", "gcash"],
        feeAed1k: null,
        rateMarkupPct: null,
        speed: "same-day",
        minAed: null,
        maxAed: null,
      },
      {
        country: "IN",
        methods: ["bank_deposit", "upi"],
        feeAed1k: null,
        rateMarkupPct: null,
        speed: "same-day",
        minAed: null,
        maxAed: null,
      },
      {
        country: "PK",
        methods: ["bank_deposit", "cash_pickup"],
        feeAed1k: null,
        rateMarkupPct: null,
        speed: "same-day",
        minAed: null,
        maxAed: null,
      },
    ],
    pros: [
      "Very large branch network across the UAE",
      "Often runs zero-fee promotions on payday for specific corridors",
      "Cash sends without needing an app",
    ],
    cons: [
      "Exchange rate is not shown mid-market — margin is baked into the rate",
      "Best rate deals come and go; always ask at the counter",
    ],
    appRating: null,
    dataLastUpdated: "2026-09-24",
    howToSend: [
      "Visit any Al Ansari Exchange branch with your Emirates ID.",
      "Fill in the remittance slip: recipient bank / cash-pickup details, amount, corridor.",
      "Pay in cash or by card.",
      "Or send from the Al Ansari app after registering your Emirates ID.",
    ],
    faq: [
      {
        q: "Does Al Ansari have an app?",
        a: "Yes — it is called 'Al Ansari Exchange' on the App Store and Play Store. Register with your Emirates ID and phone number.",
      },
      {
        q: "Are their rates negotiable?",
        a: "For very large amounts, you can sometimes ask the branch manager for a slightly better rate — but this is not always granted.",
      },
    ],
      sources: [
      { url: "https://www.alansariexchange.com/", label: 'Al Ansari Exchange homepage', dateChecked: "2026-09-24" },
      { url: "https://www.alansariexchange.com/exchange-rates/", label: 'Al Ansari — live exchange rates board', dateChecked: "2026-09-24" },
      { url: "https://www.alansariexchange.com/remittances/", label: 'Al Ansari — remittance methods & partner list', dateChecked: "2026-09-24" },
    ],
  },
  {
    slug: "lulu-exchange",
    name: "LuLu Exchange",
    tagline: "Wide UAE network + LuLu Money app.",
    intro:
      "LuLu Exchange (part of the LuLu Financial Group) has a large network across the UAE and a mobile app called LuLu Money. Popular for South-Asian remittances.",
    bestFor: [
      "Regular senders to India, Philippines and Pakistan.",
      "People who like combining branch and app in one provider.",
    ],
    corridors: [
      {
        country: "PH",
        methods: ["bank_deposit", "cash_pickup"],
        feeAed1k: null,
        rateMarkupPct: null,
        speed: "same-day",
        minAed: null,
        maxAed: null,
      },
      {
        country: "IN",
        methods: ["bank_deposit", "upi", "cash_pickup"],
        feeAed1k: null,
        rateMarkupPct: null,
        speed: "same-day",
        minAed: null,
        maxAed: null,
      },
      {
        country: "PK",
        methods: ["bank_deposit", "cash_pickup"],
        feeAed1k: null,
        rateMarkupPct: null,
        speed: "same-day",
        minAed: null,
        maxAed: null,
      },
    ],
    pros: [
      "Convenient app + branch combo",
      "Frequent corridor promotions",
    ],
    cons: [
      "As with all exchange houses, FX margin is inside the rate — not shown separately",
      "App experience is workmanlike, not fintech-slick",
    ],
    appRating: null,
    dataLastUpdated: "2026-09-24",
    howToSend: [
      "Install LuLu Money and register with your Emirates ID.",
      "Add a recipient (bank details / cash pickup / mobile).",
      "Enter amount + corridor, review the total including fee.",
      "Fund with card or UAE bank account.",
      "Track until the recipient confirms.",
    ],
    faq: [
      {
        q: "Is LuLu Exchange the same as LuLu Hypermarket?",
        a: "They share the same parent group but are separate businesses. LuLu Exchange is a licensed exchange house regulated by the UAE Central Bank.",
      },
    ],
      sources: [
      { url: "https://www.luluexchange.com/", label: 'LuLu Exchange homepage', dateChecked: "2026-09-24" },
      { url: "https://www.luluexchange.com/en/exchange-rates.html", label: 'LuLu Exchange — live rates board', dateChecked: "2026-09-24" },
      { url: "https://www.luluexchange.com/en/services/remittance.html", label: 'LuLu Exchange — remittance products', dateChecked: "2026-09-24" },
    ],
  },
];

export function getProvider(slug: string): Provider | undefined {
  return providers.find((p) => p.slug === slug);
}
