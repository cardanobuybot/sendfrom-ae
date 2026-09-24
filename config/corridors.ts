import type { CorridorCode } from "./providers";

export type Corridor = {
  code: CorridorCode;
  country: string;
  slug: string; // route path segment
  currency: string;
  flag: string; // emoji
  intro: string;
  recommendedProviderSlugs: string[]; // ordered by our editorial view
  tips: string[];
};

export const corridors: Corridor[] = [
  {
    code: "PH",
    country: "Philippines",
    slug: "send-money-to-philippines",
    currency: "PHP",
    flag: "🇵🇭",
    intro:
      "The UAE→Philippines corridor is one of the largest remittance flows in the world. Most senders use a mix of cash pickup, direct bank deposit and mobile wallets (GCash, Maya).",
    recommendedProviderSlugs: ["remitly", "wise", "worldremit", "al-ansari", "lulu-exchange", "western-union"],
    tips: [
      "GCash and Maya delivery is usually faster and cheaper than a bank deposit. Ask your recipient which wallet they prefer.",
      "'Express' options are minutes but cost more. If your recipient does not need cash today, pick Economy.",
      "On payday (25th-1st) some exchange houses run zero-fee promotions. Check Al Ansari and LuLu on the day.",
    ],
  },
  {
    code: "IN",
    country: "India",
    slug: "send-money-to-india",
    currency: "INR",
    flag: "🇮🇳",
    intro:
      "The UAE→India corridor is fast and highly competitive. Bank deposit and UPI arrive within minutes at most providers. Small differences in FX markup add up quickly.",
    recommendedProviderSlugs: ["wise", "remitly", "worldremit", "al-ansari", "lulu-exchange", "western-union"],
    tips: [
      "UPI transfers usually arrive within minutes.",
      "Compare the amount your recipient will actually receive in INR, not just the AED fee.",
      "For very large transfers (property, education), ask your bank about a Telegraphic Transfer — sometimes cheaper on FX than a remittance app.",
    ],
  },
  {
    code: "PK",
    country: "Pakistan",
    slug: "send-money-to-pakistan",
    currency: "PKR",
    flag: "🇵🇰",
    intro:
      "The UAE→Pakistan corridor supports bank deposit, cash pickup and (increasingly) mobile-wallet delivery. Rates can move a lot day-to-day because of PKR volatility.",
    recommendedProviderSlugs: ["remitly", "worldremit", "wise", "lulu-exchange", "al-ansari", "western-union"],
    tips: [
      "PKR moves fast — always check the recipient amount right before you send.",
      "Cash pickup at a big bank branch is usually more reliable than a small local kiosk.",
      "Some corridors have zero-fee days at exchange houses — worth checking on payday.",
    ],
  },
];

export function getCorridor(slug: string): Corridor | undefined {
  return corridors.find((c) => c.slug === slug);
}

export function getCorridorByCode(code: CorridorCode): Corridor | undefined {
  return corridors.find((c) => c.code === code);
}
