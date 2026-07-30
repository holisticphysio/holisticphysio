# Holistic Physio — Handover

Last updated: 2026-07-30

## Current priority: SEO audit follow-through

Full audit documented at `.md/SEO_AUDIT_2026_07_30.md` (health 7/10). Action plan, in order:

1. **Condition page depth** (in progress) — pattern piloted and confirmed on `migraines-and-headaches.html` (commit `bc3846a`): rewrite the templated clinical paragraph with real dual-paradigm substance (Western mechanism + TCM framing, via the `integrative-physio-tcm-writer` skill), enrich the condition list items from 3-5 word fragments to real clinical detail, add a genuine safety/red-flag FAQ, add light natural internal links only where copy already supports it. Remaining pages to roll out to: `pain`, `sports-injuries`, `work-injuries`, `stress`, `anxiety-and-depression`, `fatigue`, `womens-health`, `digestive-issues`, `fertility`, `fertility-acupuncture`.
2. **Keyword map** — assign a unique primary keyword per page to eliminate cannibalization risk (pain/sports-injuries/work-injuries currently competing for overlapping terms).
3. **Service → condition linking** — add a "Conditions we treat" section to `physiotherapy.html`, `acupuncture.html`, `chinese-herbal-medicine.html`, `clinical-pilates.html`, linking to 3-4 relevant condition pages each.
4. **Quick wins** — FAQ schema on homepage, Service schema on the 4 therapy pages.

**Also done this audit cycle (2026-07-30):**
- White reading-progress bar added to all 50 pages (`scripts/progress-bar.js`, commit `9299440`).
- Location page strategy implemented across all 27 suburb pages: explicit "based in Highgate Hill, X minutes away" note + a unique service/condition pairing per suburb (Barefoot Physiotherapy pattern — proven at their 15-suburb scale). Prevents both thin-content duplication and the confusion of implying separate businesses. Commit `9e33319`.

## Project state

Template-based rebuild of holisticphysio.com.au, sourced from the original WordPress export at `C:\1myguy\projects\holisticphysio.com.au ORIGINAL`. 50 HTML pages, static site, no build step. Root directory is the live document root (flat file structure, e.g. `acupuncture.html`, `annerley.html`).

**Structure:**
- `index.html` — homepage
- 4 therapy pages: `physiotherapy`, `acupuncture`, `chinese-herbal-medicine`, `clinical-pilates`
- 11 condition/specialised pages: `pain`, `fatigue`, `stress`, `anxiety-and-depression`, `digestive-issues`, `migraines-and-headaches`, `sports-injuries`, `womens-health`, `work-injuries`, `fertility`, `fertility-acupuncture`
- 27 suburb pages (Brisbane inner suburbs, templated)
- 8 support/trust pages: `about-us`, `contact`, `faq-frequently-asked-questions`, `holistic-physio-difference`, `privacy-policy`, `terms-and-conditions`, `disclaimer`
- `css/main.css`, `scripts/app.js` — shared across every page
- `images/` — all real photos, converted to `.webp`, named `holisticphysio-holistic-physio-{semantic}.webp`

**Deliberately not built (do not recreate these):**
- `chronic-and-acute-pain.html` and `chronic-fatigue.html` — original site had these as separate nav items, but their content is a full subset of what `pain.html` and `fatigue.html` already cover. Building duplicates would cannibalize rankings.
- `pregnancy-and-fertility.html` — was a dead 404 in the original site, no real content ever existed for it.
- `services.html` — original was an unfinished WordPress placeholder stub (literal "consider using this if you need more context" boilerplate), just duplicating nav links already on this site.

---

## SEO foundation (from `/seo-audit` and `/ai-seo`)

- `sitemap.xml` and `robots.txt` at root, all 50 pages listed, explicitly allows `GPTBot`, `ChatGPT-User`, `ClaudeBot`, `anthropic-ai`, `PerplexityBot`, `Google-Extended`, `Bingbot`.
- `llms.txt` at root: business summary, address/phone/hours/booking link, all pages linked.
- Self-referencing canonical tags on every page.
- Schema markup (JSON-LD) on every page: `MedicalBusiness` (address, phone, email, geo, `sameAs`, `hasMap` via confirmed Google Place ID `ChIJPYIJUwtakWsRsGcrZF1zqa4`, `openingHoursSpecification`: Mon 10:00–18:30, Tue 13:30–17:30, Thu 10:00–18:30, closed Wed/Fri/Sat/Sun), `FAQPage` on pages with a `.faq-list` section, `Person` schema for Dr Sandra Tan on `about-us.html`.
- Open Graph / Twitter card tags on all 50 pages: `og:title`/`description`/`url`/`image` + `twitter:card`, sharing one dedicated image `images/holisticphysio-holistic-physio-ogshare.webp` (1200×630).
- Titles ≤65 rendered characters, meta descriptions ≤160, unique across the site.
- Domain used throughout: `https://holisticphysio.com.au` (site not live yet — re-verify all canonical/sitemap/og URLs match the real domain before launch if this changes).

**Not checkable yet (site isn't live):** Core Web Vitals, Search Console coverage, Mobile-Friendly Test — all need a live domain first. Once live, run the AI-visibility audit from `/ai-seo` (ChatGPT/Perplexity/Google AI Overviews for queries like "physio Highgate Hill") to get a citation baseline.

### Internal linking (from `/seo-internal-linking`)

Audited and fixed a sitewide gap: every condition page had a "how we treat it" list naming its therapies (Acupuncture, Physiotherapy, Clinical Pilates, Chinese herbal medicine) as **unlinked bold text**, and `acupuncture.html`'s condition list had the same gap in reverse. All now link to their matching pages, including the homepage's JS-rendered condition-picker widget (`scripts/app.js`, `THERAPY_LINKS` map).

Lateral cross-links between related conditions were added **only** where the existing copy already named the other topic explicitly (no invented anchors): `digestive-issues → stress`, `stress → fatigue`, `pain → sports-injuries`, `womens-health → fertility`, `fertility-acupuncture → womens-health`. Deliberately did **not** link `stress ↔ anxiety-and-depression` — see rename note below, that link would recreate the exact conflation the rename fixed.

Suburb pages (27) are fully linked: real `<a href>` distance-calculator pills, a site-wide "Areas we serve" footer grid, and suburb-to-suburb "Nearby areas" cross-links using real Brisbane geography.

---

## Site history / notable fixes this project

- **`anxiety-and-depression.html`** (was `stress-anxiety-and-depression.html`) — renamed so it doesn't cannibalize `stress.html`; `stress.html` = physical stress symptoms, this page = the mental-health angle only. Updated every reference site-wide (nav, sitemap, llms.txt, canonical/og:url, schema, `scripts/app.js`). No longer reuses the acupuncture photo or the fatigue page's photos — runs on 6 of its own dedicated images (hero, 2 visit sections, 3 photo-break sections, no duplicates).
- **Mobile horizontal overflow** — `.footer-links` wasn't a wrapping flexbox, so 5 nav items forced the whole page to scroll sideways on mobile. Fixed with `flex-wrap` + `overflow-x: hidden` safety net on `html, body`; "Our Difference" now drops to its own line under the other four footer links on mobile.
- **Legal pages** — `privacy-policy.html`, `terms-and-conditions.html`, `disclaimer.html` added, physiotherapy-appropriate content (APPs/health-info handling, booking/Medicare/HICAPS terms, medical disclaimer). Linked from a `footer-legal` nav on every page, same text size as the copyright line.
- **Nav "Issues" dropdown** — lists all condition pages. Originally pure-CSS `:hover`, which closed instantly when the cursor crossed the gap to the menu. Fixed by driving open/close from JS (`mouseenter`/`mouseleave` with a 350ms close-delay timer); click-to-toggle and Escape-to-close unchanged.
- **New topic photography** — sourced and converted 25 real photos (bathroom/stomach pain, sports injuries, women's health, workplace injuries, anxiety/depression) to webp, one per condition previously stuck with generic or icon-only imagery. Initially placed as a single gallery block per page, then **corrected to be spread individually between each content section** (a `.photo-break` component woven between sections) per explicit feedback — not bundled together.
- **27 orphaned suburb pages** — previously zero internal links pointed to them. Fixed via real `<a href>` distance pills, footer "Areas we serve" grid, and suburb-to-suburb nearby-area cross-links.
- Softened all "yes you're covered" health fund/Medicare claims sitewide to "in most cases" + "check with your fund" language.

---

## Outstanding

- **38 unconverted-but-imported photos** sit in `images/` prefixed `holisticphysio-holistic-physio-extra-*.webp` — pulled from the original archive, not yet curated/assigned to any page. Available for future page refreshes.
- Lateral cross-links were deliberately kept minimal (see above) — if more conditions get dedicated copy that naturally references another condition, add the link then rather than forcing one now.

---

## Standing conventions (for future work on this project)

- **Image naming**: `holisticphysio-holistic-physio-{semantic-or-page}-{description}.webp`, strip WordPress hash suffixes, convert everything to webp. Source of truth for original photos/content is `C:\1myguy\projects\holisticphysio.com.au ORIGINAL`.
- **Real content only** — no fake CTAs, no reused stock photos as generic decoration, no invented content when the original site has real copy to pull from.
- **No em dashes** anywhere (chat replies or page copy).
- **Purple accent** (`#930f86` / `#690a60`, CSS vars `--purple` / `--purple-deep` / `--purple-tint`) for the nav bar and "difference"-pattern sections, layered on the primary green brand palette (`--brand` etc.) — pulled from the real original site's nav colour.
- Site-wide reusable component pattern (`.hero`, `.mission`, `.visit`, `.difference`, `.testimonials`, `.faq`, `.contact`, `.footer`, `.photo-break`, `.legal`) shared via `css/main.css` — new pages should reuse these rather than one-off styles.
- Google review testimonials sourced from `.md/reviews from google.txt` (~40 real reviews). Only ~15-20 used so far across homepage + 5 therapy pages; more available for variety. All 5-star except Dorothy Shanks (4-star), reflected accurately in star icons.
- Internal-linking philosophy: only link where the existing copy already names the target topic — don't invent cross-references just to hit a linking quota.

---

## Verification status

Full-site Playwright pass (all pages) confirmed zero console errors, zero failed network requests, all internal links resolving, as of the SEO-foundation session. This session's HTML/CSS/JS changes were verified via tag-balance checks and image-path resolution scripts (no live browser available in this session) — worth a manual/Playwright pass before considering this fully closed.
