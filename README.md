# sendfrom.ae

Independent English-language guide for expats in the UAE (Filipinos, Indians, Pakistanis, seafarers) comparing money-transfer providers.

**Live domain:** https://sendfrom.ae

Stack: Next.js 15 (App Router) · TypeScript · Tailwind CSS · Vercel Analytics.

---

## Run locally

```bash
npm install
npm run dev
# → http://localhost:3000
```

Type-check + build:
```bash
npm run build
```

---

## Where to edit content

Everything editable lives under `config/`:

| File                     | What lives here                                                                              |
| ------------------------ | -------------------------------------------------------------------------------------------- |
| `config/site.ts`         | Domain, tagline, description, contact email, Google Search Console verification.             |
| `config/partners.ts`     | **Affiliate URLs — paste yours here.** One entry per provider.                               |
| `config/providers.ts`    | Provider descriptions, corridors, fees, rate markup, delivery methods, pros/cons, FAQ, ...   |
| `config/corridors.ts`    | Country landing pages: Philippines / India / Pakistan intro, recommended providers, tips.    |
| `config/blog.ts`         | Blog posts — one entry per post, no MDX required.                                            |

Numbers marked `null` or `TODO: verify` render as `—` on the site and appear in the launch checklist below.

`Last updated` dates come from `provider.dataLastUpdated` per page, with a
site-wide fallback in `site.dataLastUpdated`.

---

## Affiliate links

- All outgoing affiliate links go through `/go/<slug>` (see `app/go/[slug]/route.ts`).
  Destination URLs live in `config/partners.ts`.
- Affiliate links carry `rel="sponsored nofollow"` and `target="_blank"`.
- Providers without an affiliate programme (Al Ansari, LuLu, Western Union) link directly to their official site — no redirect, no `/go/`.
- Every `/go/*` click fires a Vercel Analytics `affiliate_click` event tagged with the slug.

To swap in your real affiliate URL: edit the `url` field for the given
provider in `config/partners.ts`, commit, push. That's it.

---

## Deploy to Vercel

The GitHub repo `cardanobuybot/sendfrom-ae` is already linked to a Vercel project (created via API on first deploy).

1. Every push to `main` triggers a production deploy.
2. Every push to any other branch creates a preview deploy at `sendfrom-ae-git-<branch>-pavels-projects-21cf5e6e.vercel.app`.
3. Vercel Analytics is auto-enabled (`@vercel/analytics` package).

### Connecting the domain sendfrom.ae

DNS for `sendfrom.ae` is at your registrar (likely name.com; check first).

In your registrar, add:

| Type  | Host / Name | Value                    | TTL     |
| ----- | ----------- | ------------------------ | ------- |
| A     | @           | `76.76.21.21`            | default |
| CNAME | www         | `cname.vercel-dns.com`   | default |

Then in Vercel:

1. Project → Settings → Domains → Add.
2. Enter `sendfrom.ae` (assign to **Production**).
3. Add `www.sendfrom.ae` (also Production, will 308-redirect to apex).

Vercel will issue a Let's Encrypt certificate automatically within a couple of minutes once DNS resolves.

> If Vercel shows different DNS values than the ones above (their apex IP changes very occasionally), trust Vercel's UI over this README.

---

## Google Search Console

1. Claim `https://sendfrom.ae` in [Search Console](https://search.google.com/search-console/).
2. Pick the HTML meta-tag verification method — copy the token value.
3. Paste it into `config/site.ts` → `googleSiteVerification`.
4. Push; Vercel redeploys; verification succeeds.

The `sitemap.xml` is at `https://sendfrom.ae/sitemap.xml` (Next.js generates it from `app/sitemap.ts`).

---

## What NOT to do

- Do not put a provider's logo, brand colours, or the word "official" on the site.
- Do not offer cashback or bonuses in exchange for signups — most affiliate agreements forbid this.
- Do not run paid ads on any provider's brand name.
- Do not invent fees or rates — use the placeholders until you can verify.

---

## Checklist before applying to affiliate programmes

See [`CHECKLIST.md`](./CHECKLIST.md).
