/**
 * Central status object for the Revolut UAE content cluster.
 *
 * Edit this ONE file when Revolut announces anything new. The
 * <RevolutStatus /> component reads it, so the pillar page /revolut and
 * every /blog/revolut-* post picks up the update at build time.
 */

export type RevolutStatusBullet = {
  date: string; // ISO
  text: string;
};

export const revolutStatus = {
  title: "Status update — Revolut in the UAE",
  lastUpdated: "2026-09-24",
  summary:
    "Revolut has received the UAE Central Bank licences it needs, but the consumer product is not yet open to UAE residents. Launch is expected late 2026.",
  bullets: [
    {
      date: "2026-06-17",
      text:
        "The Central Bank of the UAE granted Revolut Stored Value Facilities (SVF) and Retail Payment Services (Category II) licences, converting the in-principle approval it had received in September 2025.",
    },
    {
      date: "2026-07-15",
      text:
        "Dubai's Virtual Assets Regulatory Authority (VARA) granted Revolut in-principle approval for crypto services. Full approval is still required before Revolut can offer crypto to UAE users.",
    },
    {
      date: "late 2026",
      text:
        "Revolut plans a full UAE launch in late 2026. No public launch date has been announced. The app is NOT yet open to UAE residents.",
    },
  ] as RevolutStatusBullet[],
  plannedAtLaunch: [
    "Multi-currency accounts",
    "Physical and virtual cards",
    "Local UAE payments",
    "International money transfers",
  ],
  cryptoNote:
    "Crypto services are expected after VARA grants full approval — later than the initial launch.",
  unknowns: [
    "Fee schedule and FX markup for the UAE market",
    "Which corridors will be live at launch",
    "Whether GCash / Maya delivery for the Philippines will be included at launch",
    "Arabic language support",
    "Revolut Business availability in the UAE (not announced)",
  ],
};

/** Ordered list of every article in the Revolut UAE cluster. */
export const revolutClusterPosts = [
  "is-revolut-available-in-uae",
  "revolut-uae-launch-date",
  "revolut-vs-wise-uae",
  "revolut-uae-send-money-philippines",
  "revolut-uae-crypto",
  "use-revolut-card-in-dubai",
];
