# Pre-affiliate-application checklist

Every `TODO:` you must fill in before you apply to an affiliate programme
or send traffic. Grep the repo for `TODO:` to see every occurrence:

```
grep -rn "TODO:" --include="*.ts" --include="*.tsx" --include="*.md"
```

## 1. Affiliate URLs — `config/partners.ts`

- [ ] `revolut.url` — replace when Revolut UAE affiliate opens (currently official site).
- [ ] `wise.url` — paste your Wise affiliate/referral URL.
- [ ] `remitly.url` — paste your Remitly (Impact / Partnerize) URL.
- [ ] `worldremit.url` — paste your WorldRemit (CJ / Partnerize) URL.
- [x] `western-union.url` — no affiliate programme; direct link ✓.
- [x] `al-ansari.url` — no affiliate programme; direct link ✓.
- [x] `lulu-exchange.url` — no affiliate programme; direct link ✓.

## 2. Fees, exchange rate markup, limits — `config/providers.ts`

For **every** provider × every corridor (PH, IN, PK):

- [ ] `feeAed1k` — fee for a benchmark 1,000 AED transfer, verified in the provider's app on `dataLastUpdated`.
- [ ] `rateMarkupPct` — approx FX markup vs. mid-market, verified in-app.
- [ ] `speed` — currently plain text ("minutes to 1 day"); keep truthful.
- [ ] `minAed` / `maxAed` — per-transfer limits per provider.
- [ ] `appRating` — average of iOS + Android at time of verification (Play Store + App Store).
- [ ] `dataLastUpdated` — bump every time you edit numbers for that provider.

## 3. Blog

- [ ] `config/blog.ts` — re-read each post; confirm no numbers you can't defend.
- [ ] Publish date on each post is set to actual publish day.

## 4. Site config — `config/site.ts`

- [ ] `ownerEmail` — set to a real inbox you monitor.
- [ ] `googleSiteVerification` — token from Google Search Console.
- [ ] `dataLastUpdated` — site-wide fallback; align with your most-recent provider bump.

## 5. Email signup — `app/api/notify-revolut/route.ts`

- [ ] Replace `TODO: replace with real ESP call` — plug in Mailchimp / Loops / Resend / Buttondown.

## 6. Calculator

- [ ] Optionally plug in a live rates API in `components/Calculator.tsx` (`estimateRecipient`). Marked with a code comment.

## 7. Legal + trust

- [x] `/affiliate-disclosure` — present.
- [x] `/how-we-compare` — present.
- [x] `/privacy`, `/terms` — present. **Re-read them once with your name / owner details substituted.**
- [x] Independence banner on every provider page.
- [x] Footer disclaimer on every page.
- [x] Consent banner (privacy-friendly).

## 8. Deployment

- [ ] GitHub repo `cardanobuybot/sendfrom-ae` — created + first push done.
- [ ] Vercel project linked — auto-deploy on push to `main`.
- [ ] Domain `sendfrom.ae` connected in Vercel dashboard (apex + www).
- [ ] DNS records added at registrar (A `76.76.21.21`, CNAME `cname.vercel-dns.com` for `www`).
- [ ] Google Search Console verified.
- [ ] Sitemap `https://sendfrom.ae/sitemap.xml` reachable and lists all pages.

## 9. Content review

- [ ] Every provider page names the provider (never "the official site").
- [ ] No copied brand colours / logos on any page.
- [ ] No promo / cashback / referral offers from us to users.
- [ ] No paid ads on provider brand names (Google / Meta).
