export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  date: string; // ISO — first published
  dateModified?: string; // ISO — last meaningful edit
  faq?: { q: string; a: string }[];
  /** Slugs of related posts (used for cross-linking). */
  relatedSlugs?: string[];
  /** True → render a shared Revolut status box at the top. */
  showRevolutStatus?: boolean;
  body: BlogBlock[];
};

export type BlogBlock =
  | { kind: "p"; text: string }
  | { kind: "h2"; text: string }
  | { kind: "ul"; items: string[] }
  | { kind: "ol"; items: string[] }
  | { kind: "note"; text: string };

// -------------------------------------------------------------------
// POSTS
// -------------------------------------------------------------------

export const posts: BlogPost[] = [
  // ─── Original starter posts ───────────────────────────────────────
  {
    slug: "cheapest-uae-to-philippines",
    title: "Cheapest way to send money from UAE to Philippines",
    description:
      "How Filipinos in the UAE can compare Wise, Remitly, WorldRemit, Al Ansari, LuLu and Western Union for the best PHP rate.",
    date: "2026-09-24",
    dateModified: "2026-09-24",
    relatedSlugs: ["wise-vs-remitly-uae", "revolut-uae-send-money-philippines"],
    body: [
      { kind: "p", text: "There is no single 'cheapest' service that stays cheapest forever — rates change every day. But there is a repeatable method to always land close to the best rate." },
      { kind: "h2", text: "Step 1 — check the mid-market rate" },
      { kind: "p", text: "Open Google and type 'AED to PHP'. The number you see is the mid-market rate. Any provider will give you slightly less than that — the difference is how they earn on FX. Your job is to give up as little of that difference as possible." },
      { kind: "h2", text: "Step 2 — compare three providers at your amount" },
      { kind: "p", text: "Never trust an average. Enter your exact amount into three provider apps (for example Wise, Remitly and Al Ansari) and note the amount your recipient will receive in PHP. Pick the biggest number." },
      { kind: "h2", text: "Step 3 — pick the delivery method your recipient prefers" },
      { kind: "p", text: "GCash and Maya arrive in minutes and are usually the cheapest option overall. Direct bank deposit is a close second. Cash pickup is convenient but frequently the most expensive." },
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
      { kind: "p", text: "See the full provider comparison on /compare for our latest read." },
    ],
  },
  {
    slug: "wise-vs-remitly-uae",
    title: "Wise vs Remitly from the UAE: which is cheaper?",
    description:
      "A head-to-head look at Wise and Remitly for UAE senders — when each one wins.",
    date: "2026-09-24",
    dateModified: "2026-09-24",
    relatedSlugs: ["cheapest-uae-to-philippines", "revolut-vs-wise-uae"],
    body: [
      { kind: "p", text: "Wise and Remitly solve overlapping problems, but with different philosophies. Wise sells transparency: mid-market rate + a flat fee shown up front. Remitly sells convenience: minute-level delivery, cash pickup, mobile-wallet payouts." },
      { kind: "h2", text: "When Wise usually wins" },
      { kind: "ul", items: [
        "Recipient wants a direct bank deposit",
        "You care more about the exchange rate than about speed",
        "You are sending a larger amount where FX markup matters more than the flat fee",
      ] },
      { kind: "h2", text: "When Remitly usually wins" },
      { kind: "ul", items: [
        "Recipient needs the money the same hour",
        "You are paying into a GCash or Maya wallet in the Philippines",
        "Recipient has no bank account and needs cash pickup",
      ] },
      { kind: "h2", text: "The honest answer" },
      { kind: "p", text: "Install both, put your exact amount into each, and send to whichever shows a bigger recipient amount today. The winner rotates." },
    ],
  },

  // ─── Revolut UAE cluster ──────────────────────────────────────────
  {
    slug: "is-revolut-available-in-uae",
    title: "Is Revolut available in the UAE? (2026 answer)",
    description:
      "Straight answer for 2026: Revolut has UAE licences but the app is not yet open to residents. Here's what has actually happened.",
    date: "2026-09-24",
    dateModified: "2026-09-24",
    relatedSlugs: ["revolut-uae-launch-date", "use-revolut-card-in-dubai"],
    showRevolutStatus: true,
    faq: [
      {
        q: "Can UAE residents sign up for Revolut today?",
        a: "No. As of the last update on this page, Revolut's consumer product is not open to UAE residents. The app cannot verify an Emirates ID as proof of address.",
      },
      {
        q: "So what does Revolut have in the UAE right now?",
        a: "It has the CBUAE Stored Value Facilities and Retail Payment Services (Category II) licences, granted on 17 June 2026. It also has an in-principle approval from Dubai's VARA (15 July 2026) for crypto — not full approval.",
      },
      {
        q: "When will Revolut open in the UAE?",
        a: "Revolut says late 2026. No exact date has been announced. If you want to be first, use the notify form on our /revolut page and we'll email you at launch.",
      },
      {
        q: "I already have Revolut from Europe or the UK. Can I use it in the UAE?",
        a: "Yes — you can log in and use it for outbound transfers and card payments while you are in the UAE, subject to your home-country plan's limits. See our guide to using a Revolut card in Dubai.",
      },
    ],
    body: [
      { kind: "p", text: "Short answer: not yet. If you live in the UAE, you cannot open a Revolut account today. The app does not accept an Emirates ID as a residency document, and there is no public sign-up flow for UAE-issued IDs." },
      { kind: "p", text: "That is not because Revolut has been rejected. The opposite has happened — regulators have said yes to a launch. But the product has not been switched on yet. Here is what has actually happened, in order." },

      { kind: "h2", text: "What has happened so far" },
      { kind: "p", text: "Revolut has been quietly moving through the UAE licensing process for well over a year." },
      { kind: "ul", items: [
        "In September 2025, the Central Bank of the UAE (CBUAE) issued Revolut an in-principle approval — an intent to license, subject to Revolut meeting the final conditions.",
        "On 17 June 2026, that in-principle approval was converted into two full licences: Stored Value Facilities (SVF) and Retail Payment Services (Category II). These are the licences that a fintech needs to hold customer balances and process retail payments in the UAE.",
        "On 15 July 2026, Dubai's Virtual Assets Regulatory Authority (VARA) granted Revolut an in-principle approval for crypto. This is not the same as being live — VARA still needs to sign off on the final product before anything crypto goes to UAE users.",
      ] },
      { kind: "p", text: "Everything above is real. What is not yet public: a launch date, a fee schedule, and the exact set of features UAE users will get on day one." },

      { kind: "h2", text: "What Revolut has said" },
      { kind: "p", text: "In public statements, Revolut has said it plans a full UAE launch in late 2026. It has also said the first features will look similar to Revolut in other markets: multi-currency accounts, physical and virtual cards, local UAE payments, and international transfers. Crypto is expected later, once VARA gives full approval." },
      { kind: "p", text: "Beyond that, everything is not yet announced — pricing, corridor coverage, Arabic language support, and whether Revolut Business will follow the consumer launch." },

      { kind: "h2", text: "What you can (and can't) do today" },
      { kind: "p", text: "You cannot: open a new Revolut account with an Emirates ID; receive salary into Revolut in AED; use the app for local UAE payments; hold AED in a Revolut wallet." },
      { kind: "p", text: "You can: sit on the notify list; if you have a Revolut account issued in Europe or the UK, log in from the UAE and use it for outbound international transfers and card payments (subject to your home-country plan's fair-usage limits)." },

      { kind: "h2", text: "What to do while you wait" },
      { kind: "p", text: "The good news is that there are already several strong options for outbound transfers from the UAE. Depending on your corridor and how fast you need the money to arrive:" },
      { kind: "ul", items: [
        "Wise — mid-market rate, transparent flat fee, works well for direct bank deposit.",
        "Remitly — very fast option, especially for the Philippines and India.",
        "WorldRemit — competitive on cash pickup and GCash.",
      ] },
      { kind: "p", text: "See our /compare page for the full side-by-side, or drop into any of the provider pages linked above." },

      { kind: "h2", text: "How we'll update this page" },
      { kind: "p", text: "The status box at the top is shared across every Revolut article on the site. When Revolut announces something concrete — a launch date, a fee schedule, a corridor list — we update that box in one place and every article on this cluster will pick it up on the next build." },
    ],
  },

  {
    slug: "revolut-uae-launch-date",
    title: "Revolut UAE launch date — what we know",
    description:
      "Revolut says late 2026 for the UAE launch, without a public date. Here's the regulatory checklist and what could still delay it.",
    date: "2026-09-24",
    dateModified: "2026-09-24",
    relatedSlugs: ["is-revolut-available-in-uae", "revolut-uae-crypto"],
    showRevolutStatus: true,
    faq: [
      {
        q: "Does Revolut have an official UAE launch date?",
        a: "No. As of the last update on this page, Revolut has only committed publicly to 'late 2026'. Any specific date circulating online is not sourced from Revolut itself.",
      },
      {
        q: "What has to happen before UAE users can sign up?",
        a: "The CBUAE licences are already issued. VARA has given in-principle approval for crypto but not final approval. Revolut also needs to complete the technical rollout: KYC flows for the Emirates ID, local payment rails, and a UAE-specific fee schedule.",
      },
      {
        q: "Could the launch slip into 2027?",
        a: "It is possible. Fintech launches routinely slip when a market's KYC, tax reporting or bank-partnership plumbing is more complex than expected. If Revolut hits an unexpected requirement, late 2026 could easily become early 2027.",
      },
      {
        q: "Will the whole product open at once?",
        a: "Not necessarily. Revolut has often opened new markets in waves — accounts and cards first, then more features. Crypto in particular is gated on full VARA approval, so it may lag behind the initial launch.",
      },
    ],
    body: [
      { kind: "p", text: "'When will Revolut open in the UAE?' is the question we get most often. The honest answer is that Revolut itself has only committed to 'late 2026'. There is no specific day published. Anything more precise you have seen online is unsourced." },
      { kind: "p", text: "Instead of guessing at a date, it is more useful to know which regulatory boxes still need to be ticked, what could delay the launch, and how you will actually find out." },

      { kind: "h2", text: "The short answer" },
      { kind: "p", text: "Late 2026. That is Revolut's own guidance. No public press release has ever nailed down a day, week or month." },

      { kind: "h2", text: "The regulatory checklist" },
      { kind: "p", text: "Two regulators, three items:" },
      { kind: "ol", items: [
        "CBUAE Stored Value Facilities (SVF) licence — done. Granted 17 June 2026.",
        "CBUAE Retail Payment Services Category II — done. Granted 17 June 2026.",
        "VARA crypto approval — in-principle only (15 July 2026). Full approval is still outstanding.",
      ] },
      { kind: "p", text: "The consumer launch does not need VARA final approval — Revolut can go live with everything except crypto. But it does need the two CBUAE licences, which it now has. In other words, the regulator side is done for the initial launch." },

      { kind: "h2", text: "What could still delay the launch" },
      { kind: "p", text: "A licence is permission to operate — not a working product. Between now and go-live, Revolut still has to:" },
      { kind: "ul", items: [
        "Wire up Emirates ID verification into its onboarding flow.",
        "Connect to UAE payment rails (IPI, SARIE, and any local partner banks).",
        "Publish a UAE-specific fee schedule and terms of service.",
        "Localise the app (English is likely day one; Arabic language coverage is not yet announced).",
        "Set up UAE customer support hours and channels.",
      ] },
      { kind: "p", text: "None of these are exotic — Revolut has done them before in other markets. But UAE-specific quirks (WPS salary handling, Emirates ID formats, sanctions screening on regional corridors) sometimes reveal themselves only late in testing." },

      { kind: "h2", text: "What 'late 2026' actually means" },
      { kind: "p", text: "In fintech PR, 'late 2026' typically means November or December. It can also mean 'sometime before we announce the next quarter'. The last two months of a calendar year are the most common launch window because they let a company report the launch as part of Q4 earnings." },
      { kind: "p", text: "The risk is that a launch this close to year-end can slip into January or February. If we get to December without a hard date, expect early 2027." },

      { kind: "h2", text: "How you'll find out" },
      { kind: "p", text: "Three signals will fire, in this order:" },
      { kind: "ol", items: [
        "The Revolut app store listing changes: currently the UAE App Store shows Revolut but the app declines to create an account for a UAE-issued ID. At launch, that changes.",
        "Revolut's press page publishes a UAE launch release, usually with a specific date and price list.",
        "UAE banks, telcos and news outlets pick it up the same day.",
      ] },
      { kind: "p", text: "If you want to skip refreshing news pages, put your email into the notify box on our /revolut page. We'll send one email at launch — no other communications." },

      { kind: "h2", text: "What to do until then" },
      { kind: "p", text: "Set up the alternatives that are already live. Wise, Remitly and WorldRemit will still be relevant once Revolut arrives, because no single app is best on every corridor and every delivery method. Building the muscle of 'compare three apps for two minutes before pressing Send' is the single biggest thing you can do to spend less on transfers over a year." },
    ],
  },

  {
    slug: "revolut-vs-wise-uae",
    title: "Revolut vs Wise from the UAE (2026)",
    description:
      "Revolut isn't live in the UAE yet — Wise is. A fair comparison based on what we know about both today.",
    date: "2026-09-24",
    dateModified: "2026-09-24",
    relatedSlugs: ["is-revolut-available-in-uae", "wise-vs-remitly-uae"],
    showRevolutStatus: true,
    faq: [
      {
        q: "Which one can I use in the UAE today?",
        a: "Wise. Revolut's consumer product for UAE residents has not launched yet.",
      },
      {
        q: "Will Revolut UAE be cheaper than Wise?",
        a: "Not yet announced. In other markets, Wise usually gives a slightly better mid-market rate for larger bank transfers, while Revolut wins on card + wallet convenience. UAE pricing is not published.",
      },
      {
        q: "If I already have a Revolut card from Europe or the UK, should I use it or Wise in the UAE?",
        a: "For outbound transfers to a bank account abroad, Wise is usually cheaper. For card payments and ATM withdrawals in the UAE, your existing Revolut card is convenient (subject to your home-country plan's limits).",
      },
    ],
    body: [
      { kind: "p", text: "This is a fair comparison, not a scoreboard. Revolut and Wise are two of the biggest fintech names on earth, and they overlap. But in the UAE in 2026, they are not on the same starting line." },

      { kind: "h2", text: "Availability today" },
      { kind: "p", text: "Wise is live. UAE residents can sign up with an Emirates ID and send money out of the UAE to bank accounts, mobile wallets and (in some corridors) cash pickup." },
      { kind: "p", text: "Revolut is not live for UAE residents. It has the necessary CBUAE licences (SVF and Retail Payment Services Category II, granted 17 June 2026), plus an in-principle VARA approval for crypto (15 July 2026). The consumer app opens later in 2026." },
      { kind: "p", text: "That single fact settles most 'which one should I pick' questions today: Wise, because it is the only one you can actually use." },

      { kind: "h2", text: "How each handles the exchange rate" },
      { kind: "p", text: "Wise's core promise is the mid-market rate — the same rate you see on Google, with no hidden markup. The way Wise makes money is a flat fee shown separately, in AED, before you press Send." },
      { kind: "p", text: "Revolut in other markets uses two rate regimes: a mid-market rate on weekdays within your plan's monthly limit, and a small markup on weekends or above the limit. There is no published UAE-specific rate policy yet, so we cannot directly compare on numbers." },

      { kind: "h2", text: "Fees you can see" },
      { kind: "p", text: "Wise shows the fee as a separate AED figure. Nothing is buried in the rate. If you send 3,000 AED, you see the exact AED that leaves your account and the exact recipient amount." },
      { kind: "p", text: "Revolut's fee model in Europe / UK is tiered by subscription plan: Standard, Plus, Premium, Metal, Ultra. Each has a free international-transfer allowance per month, plus low fees beyond that. Whether Revolut UAE keeps the same plan structure is not yet announced." },

      { kind: "h2", text: "Delivery methods" },
      { kind: "p", text: "Wise from the UAE supports direct bank deposit to almost every country your family is in. Cash pickup is not part of Wise. GCash and UPI are supported for some corridors." },
      { kind: "p", text: "Revolut's expected launch feature set for the UAE — multi-currency accounts, cards, local payments, international transfers — hints at a bank-first product. Cash pickup and GCash / Maya / UPI as native delivery targets are not yet announced." },

      { kind: "h2", text: "App experience (based on non-UAE Revolut)" },
      { kind: "p", text: "Revolut's app is one of the most feature-dense in fintech: multi-currency wallets, budgeting, savings vaults, disposable cards, junior accounts, insurance. Wise is deliberately minimal — the app is about moving money and holding it in multiple currencies." },
      { kind: "p", text: "If you want a full 'neobank' experience with cards + savings + FX + budgeting, Revolut is the deeper product elsewhere. If you want to move money out of the country as cheaply as possible, Wise is the sharper tool. Neither of those two truths depends on the UAE launch." },

      { kind: "h2", text: "Which one to use today" },
      { kind: "p", text: "Wise, unless the transfer is small and urgent and the recipient uses cash pickup — in which case look at Remitly instead." },

      { kind: "h2", text: "Which one to watch" },
      { kind: "p", text: "Revolut, once it opens the UAE consumer app. The pricing and feature list at launch will tell you whether it beats Wise on rate, matches it on transparency, or offers a wider product bundle in exchange for a slightly worse rate." },

      { kind: "h2", text: "A note on independence" },
      { kind: "p", text: "sendfrom.ae is not affiliated with either Revolut or Wise. Where we earn a commission, we mark it — see our affiliate disclosure. Rankings on this site are based on published fees, exchange-rate policies and delivery methods, not on payouts." },
    ],
  },

  {
    slug: "revolut-uae-send-money-philippines",
    title: "Revolut UAE → Philippines: send money today?",
    description:
      "Revolut is not yet available to UAE residents, so it can't send AED to PHP today. Here's what actually works in the meantime.",
    date: "2026-09-24",
    dateModified: "2026-09-24",
    relatedSlugs: ["cheapest-uae-to-philippines", "is-revolut-available-in-uae"],
    showRevolutStatus: true,
    faq: [
      {
        q: "Can I use Revolut to send AED to PHP today?",
        a: "No — Revolut's UAE consumer product has not launched yet, so there is no way to add AED to a Revolut wallet in the UAE.",
      },
      {
        q: "Will Revolut UAE support GCash and Maya at launch?",
        a: "Not yet announced. In some other markets Revolut supports mobile-wallet payouts; whether UAE→Philippines will get GCash and Maya at day one has not been confirmed.",
      },
      {
        q: "What's cheapest for UAE → Philippines today?",
        a: "It depends on the corridor and amount. In our observations, Remitly is often best for cash pickup and mobile-wallet delivery, Wise is often best for bank deposit. Always compare the three top apps for your exact amount before sending.",
      },
    ],
    body: [
      { kind: "p", text: "The UAE → Philippines corridor is one of the biggest remittance flows on earth. If you are a Filipino working in the UAE and you have been hearing about Revolut's UAE launch, the honest short answer is: not yet. You cannot send AED to a Philippine account through Revolut today. When you will be able to depends on when Revolut opens its UAE consumer app, which is expected late 2026." },

      { kind: "h2", text: "Can I use Revolut for UAE → Philippines right now?" },
      { kind: "p", text: "No. Two things need to happen first: Revolut UAE has to open (not yet), and Revolut UAE has to confirm the Philippines corridor and its delivery methods (not yet announced). Everything else on this page is about what you can do in the meantime and what to expect once Revolut does open." },

      { kind: "h2", text: "What Revolut typically offers on this corridor" },
      { kind: "p", text: "Revolut is a fintech, not a bank — it does not have physical branches, and it has never been strong at over-the-counter cash pickup. On UAE → Philippines specifically, expect bank-to-bank as the flagship delivery method. Whether GCash and Maya wallet payouts get included at launch is not yet announced." },
      { kind: "p", text: "Speed: in other markets, Revolut's transfers to standard bank accounts range from minutes (SWIFT-alternative rails) to a couple of business days for less common banks. Expect similar. FX rates: mid-market on weekdays within your monthly plan allowance, small markup otherwise — again, in other markets, and not yet confirmed for the UAE." },

      { kind: "h2", text: "GCash and Maya — not yet confirmed" },
      { kind: "p", text: "GCash and Maya are the two biggest e-wallets in the Philippines. For a lot of Filipino families, they are how the household actually receives money — the bank account is only used for occasional big-ticket transfers. Any UAE outbound provider that wants to compete on the PH corridor really needs both." },
      { kind: "p", text: "Revolut has not confirmed which mobile wallets it will support at UAE launch. Do not assume GCash / Maya are automatic. If you rely on those wallets, one of the alternatives below is the safer choice for the first months after Revolut UAE opens." },

      { kind: "h2", text: "What to use today" },
      { kind: "p", text: "Three apps cover almost every UAE → Philippines use case:" },
      { kind: "ul", items: [
        "Remitly — very fast Express, native GCash and Maya delivery, wide cash-pickup network in the Philippines.",
        "Wise — mid-market rate and transparent flat fee. Best when the recipient has a bank account and speed is not urgent.",
        "WorldRemit — competitive on GCash and cash pickup; sometimes wins on fee combination.",
      ] },
      { kind: "p", text: "Local exchange houses (Al Ansari, LuLu) also run zero-fee promotions on payday for the PH corridor — worth checking at the counter if you were going to walk in anyway." },

      { kind: "h2", text: "A repeatable way to always land close to the best rate" },
      { kind: "p", text: "You do not need to guess which app is cheapest today. Do this every time:" },
      { kind: "ol", items: [
        "Open Google, type 'AED to PHP'. That's the mid-market rate.",
        "Enter your exact AED amount into three apps (say Remitly, Wise and WorldRemit). Read the amount that will land in PHP.",
        "Choose the biggest number. Send.",
      ] },
      { kind: "p", text: "This takes two minutes. Over a year of remittances, it saves more than any single 'best app' recommendation could ever promise." },

      { kind: "h2", text: "What we'll update once Revolut UAE opens" },
      { kind: "p", text: "Once Revolut is live for UAE residents, we will run the same three-app comparison here for the PH corridor: Revolut vs Wise vs Remitly at the same amount. Whichever gives the biggest PHP number wins. Simple as that." },
    ],
  },

  {
    slug: "revolut-uae-crypto",
    title: "Revolut Crypto in the UAE — VARA update",
    description:
      "Dubai's VARA gave Revolut in-principle approval for crypto on 15 July 2026. Here's what 'in-principle' means and what still needs to happen.",
    date: "2026-09-24",
    dateModified: "2026-09-24",
    relatedSlugs: ["is-revolut-available-in-uae", "revolut-uae-launch-date"],
    showRevolutStatus: true,
    faq: [
      {
        q: "Can I buy crypto through Revolut in the UAE today?",
        a: "No. Revolut's consumer product has not launched in the UAE, and even when it does, crypto will require full VARA approval — which is still outstanding.",
      },
      {
        q: "What does 'in-principle approval' from VARA actually mean?",
        a: "VARA has said Revolut can move to the next stage of the licensing process, subject to meeting the remaining conditions. It is a green flag, but it is not a licence to serve UAE users yet.",
      },
      {
        q: "Which coins will Revolut offer in the UAE?",
        a: "Not yet announced. In other markets Revolut supports a curated list — usually the largest coins by market cap, with a smaller selection than dedicated exchanges. UAE-specific coin coverage will be published closer to full approval.",
      },
      {
        q: "Will Revolut UAE let me withdraw crypto to an external wallet?",
        a: "Not yet announced for the UAE. In some markets Revolut supports self-custody withdrawals; in others it does not. Watch the VARA final approval and Revolut's UAE terms of service when they publish.",
      },
    ],
    body: [
      { kind: "p", text: "On 15 July 2026, Dubai's Virtual Assets Regulatory Authority (VARA) gave Revolut in-principle approval to offer crypto services in the UAE. This is a real milestone — but it does not mean you can buy crypto through Revolut in the UAE today. Here is what changed, and what still has to happen." },

      { kind: "h2", text: "What just happened" },
      { kind: "p", text: "VARA is the crypto-specific regulator in Dubai. It licenses everything from exchanges and brokers to custodians and NFT marketplaces. Any company that wants to offer crypto services to UAE users needs VARA approval." },
      { kind: "p", text: "Revolut applied and, on 15 July 2026, got what regulators call 'in-principle' approval — the middle stage between an application and a full licence." },

      { kind: "h2", text: "What 'in-principle' means (and doesn't mean)" },
      { kind: "p", text: "In plain English, in-principle approval is a green flag. VARA has read Revolut's application and said: yes, we are prepared to license you — as long as you finish the remaining conditions." },
      { kind: "p", text: "What it is not:" },
      { kind: "ul", items: [
        "It is not a full licence.",
        "It is not permission to onboard UAE customers.",
        "It is not a guarantee that final approval will follow — approvals can still fail if the applicant cannot meet the final conditions.",
      ] },
      { kind: "p", text: "In practical terms, Revolut still has to finish its UAE-specific compliance, custody and disclosure setup before VARA will convert the in-principle approval into a full licence. Only then can UAE users see 'Crypto' as a tab inside a Revolut UAE account." },

      { kind: "h2", text: "How this fits into the wider UAE launch" },
      { kind: "p", text: "The two CBUAE licences Revolut received on 17 June 2026 cover money-transfer and payment services — accounts, cards, transfers. Those are the pieces you need for a consumer neobank launch." },
      { kind: "p", text: "VARA covers crypto. Revolut does not need VARA approval to launch its non-crypto product. So it is possible — even likely — that Revolut UAE will open first with accounts, cards and transfers, and add crypto later once VARA gives full approval." },

      { kind: "h2", text: "What Revolut Crypto looks like elsewhere (with a caveat)" },
      { kind: "p", text: "In the UK and EU, Revolut Crypto is a beginner-friendly wallet, not a serious trading platform:" },
      { kind: "ul", items: [
        "A curated list of the largest coins.",
        "Buy / sell in a couple of taps.",
        "Fees are a percentage on the trade, tiered by subscription plan.",
        "Withdrawals to external wallets are supported in some markets, not others.",
      ] },
      { kind: "p", text: "The caveat: the UAE version does not have to look like the UK or EU version. VARA imposes its own disclosure, custody and marketing rules, and Revolut will design the UAE product to fit those rules. Assume overlap with the European product — but do not assume identical." },

      { kind: "h2", text: "What's unclear about the UAE version" },
      { kind: "ul", items: [
        "Which coins will be supported.",
        "Whether withdrawals to self-custody wallets will be allowed.",
        "The fee schedule.",
        "Whether staking is included.",
        "Whether Revolut Business customers get crypto — Revolut Business availability in the UAE is not announced.",
      ] },

      { kind: "h2", text: "What to do today" },
      { kind: "p", text: "If you want to buy crypto in the UAE right now, use one of the VARA-licensed exchanges. This site is not a crypto-exchange comparison, so we don't recommend a specific one — but you can find the current VARA-licensed list on vara.ae." },
      { kind: "p", text: "For sending money home from the UAE, Revolut's crypto approval is not directly relevant. Use one of the money-transfer options we cover: Wise, Remitly, WorldRemit, Al Ansari, LuLu, Western Union. See /compare for the side-by-side." },
    ],
  },

  {
    slug: "use-revolut-card-in-dubai",
    title: "Using your Revolut card in Dubai (2026 guide)",
    description:
      "You already have a Revolut card from Europe or the UK. Here's how it behaves in Dubai — ATM withdrawals, contactless, FX and hidden costs.",
    date: "2026-09-24",
    dateModified: "2026-09-24",
    relatedSlugs: ["is-revolut-available-in-uae", "revolut-uae-launch-date"],
    showRevolutStatus: true,
    faq: [
      {
        q: "Will my Revolut card work in the UAE?",
        a: "Yes — a Revolut card issued in Europe or the UK works in the UAE at any merchant that accepts Visa or Mastercard, contactless or chip + PIN. ATM withdrawals also work, subject to your home-country plan's monthly free allowance.",
      },
      {
        q: "Should I let the ATM 'convert' to my home currency?",
        a: "No. Always choose to be charged in AED. Letting the ATM convert (a practice called DCC — dynamic currency conversion) usually costs you a worse rate than Revolut's own FX. This is true for all foreign cards, not just Revolut.",
      },
      {
        q: "Are there hidden fair-usage limits?",
        a: "Yes — every Revolut plan has a monthly free FX allowance and a monthly ATM allowance. Beyond that you pay a fee, in Europe / UK terms. Check the fees page inside your Revolut app before a big trip.",
      },
      {
        q: "Can I load AED into my existing Revolut wallet?",
        a: "You can hold AED in your Revolut wallet by converting from another currency you already hold. You cannot yet deposit AED directly from a UAE bank account — that will come with the UAE consumer launch.",
      },
    ],
    body: [
      { kind: "p", text: "You already have a Revolut account — issued in the UK, Ireland, Germany, France, or somewhere else in Europe. You're spending time in the UAE (holiday, work trip, temporary posting), and you want to know: does the card 'just work'? What will FX look like at an ATM in Dubai? Is there something you should switch on in the app before you land?" },
      { kind: "p", text: "This page is for you. If you are a UAE resident wondering whether you can open a new Revolut account today, that answer is over on our /revolut page." },

      { kind: "h2", text: "Who this applies to" },
      { kind: "p", text: "A Revolut account issued in a country where Revolut is already live — the UK, most EU countries, Australia, Singapore, and a few others. What lives in your wallet: EUR / GBP / other home currency, a card in your name, and probably a small crypto position if you use that side of the app." },
      { kind: "p", text: "What this article is not about: opening a new Revolut account with an Emirates ID. That is not possible in 2026 — Revolut UAE is not yet live." },

      { kind: "h2", text: "Paying in AED (contactless, chip + PIN, Apple / Google Pay)" },
      { kind: "p", text: "In the UAE, contactless works everywhere from supermarkets to Careem. Your Revolut card, added to Apple Pay or Google Pay, behaves exactly the same as any other Visa or Mastercard from any bank." },
      { kind: "p", text: "For larger purchases (say, above AED 500), some terminals fall back to chip + PIN. Your Revolut PIN is the same one you set when you activated the card in Europe or the UK." },

      { kind: "h2", text: "Currency options at the point of sale" },
      { kind: "p", text: "This is the single most costly mistake tourists make in the UAE. Some terminals — especially in hotels and taxis — will ask you: 'Pay in AED or EUR?'. Always pick AED." },
      { kind: "p", text: "Choosing EUR (or your home currency) is called dynamic currency conversion (DCC). The merchant's terminal invents its own exchange rate, worse than Revolut's. Same rule applies at ATMs. Always AED." },

      { kind: "h2", text: "ATM withdrawals in the UAE" },
      { kind: "p", text: "Most UAE ATMs accept international cards without an issue. Emirates NBD, ADCB, FAB, Mashreq and RAKBANK all take Visa / Mastercard from abroad. Fees:" },
      { kind: "ul", items: [
        "Revolut's own monthly ATM allowance — plan-dependent (Standard has the smallest allowance; Premium and Metal have more).",
        "The UAE ATM operator may charge a fee (typically AED 8-20). Some ATMs waive it for foreign cards; others don't. The fee is disclosed on-screen before you confirm — read it.",
        "If you exceed your Revolut monthly ATM limit, Revolut charges its own small percentage on top.",
      ] },

      { kind: "h2", text: "FX and hidden costs" },
      { kind: "p", text: "Revolut's card FX on weekdays is the mid-market rate, up to your monthly free allowance for card spend. Weekends and above-allowance card spend attract a small markup, typically around 0.5% (in Europe / UK terms — UAE-specific terms are not yet published)." },
      { kind: "p", text: "In practice: if your total UAE spend is on the small side and mostly on weekdays, Revolut is one of the cheapest cards you can bring. If you plan to make several thousand euros of purchases inside a weekend, check the fees page inside your app first — you may be better off exchanging in advance." },

      { kind: "h2", text: "Fair-usage — check your plan" },
      { kind: "p", text: "Every Revolut plan (Standard, Plus, Premium, Metal, Ultra) has different monthly free allowances for FX, ATM withdrawals and international transfers. What was free on your last trip might not be free now if you have downgraded, or if Revolut has adjusted the plans in your country." },
      { kind: "p", text: "Two minutes inside the Revolut app before you land in Dubai — Settings → Plan → Fair usage — will save you a lot more than the €7 or €14 you might spend on a Premium plan for a month." },

      { kind: "h2", text: "What still won't work today" },
      { kind: "ul", items: [
        "You cannot receive an AED salary into your existing Revolut wallet. There is no AED IBAN in your account.",
        "You cannot send AED between UAE bank accounts. Local UAE payments will come once Revolut UAE opens.",
        "You cannot deposit AED cash into your Revolut wallet from a UAE bank branch or exchange house.",
      ] },

      { kind: "h2", text: "Once Revolut UAE opens, what changes" },
      { kind: "p", text: "For most existing Revolut users passing through Dubai, not much — you'll still be able to spend on your home-country card. What changes is that UAE residents will be able to sign up with an Emirates ID and hold AED natively. For a family that has one member in Europe on a Revolut card and another in Dubai on the same brand, that will make peer-to-peer transfers effectively free inside the app." },

      { kind: "h2", text: "Bottom line" },
      { kind: "p", text: "Your existing Revolut card works well in the UAE. Choose AED at every payment terminal, watch your monthly allowance, and know that big-ticket weekend spending is where the small hidden costs live." },
    ],
  },
];

export function getPost(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug);
}
