# Holistic Physio — Handover

Last updated: 2026-07-30

## 2026-07-30 SEO audit — closed out

Full audit at `.md/SEO_AUDIT_2026_07_30.md` (started at health 7/10). Every action item from the audit is now complete:

1. **Condition page depth** ✅ — all 11 condition pages (`pain`, `sports-injuries`, `work-injuries`, `migraines-and-headaches`, `stress`, `anxiety-and-depression`, `fatigue`, `womens-health`, `digestive-issues`, `fertility`, `fertility-acupuncture`) rewritten with dual-paradigm substance (Western mechanism + TCM framing via the `integrative-physio-tcm-writer` skill), a plain-language pass to ~13-year-old reading level (jargon like "musculoskeletal," "cervicogenic," "neuroplasticity" either simplified or explained via a "doctors call this X" pattern), and a genuine safety/red-flag FAQ per page.
2. **5 core modality pages deepened toward ~1,500 words** ✅ — `physiotherapy`, `acupuncture`, `chinese-herbal-medicine`, `clinical-pilates`, `fertility-acupuncture` each got genuinely new sections (not padding): physio's "when it needs backup," acupuncture's needle-safety section, herbal medicine's quality/interactions section, Pilates' "how this differs from a gym class," fertility acupuncture's male-fertility and timing sections.
3. **Keyword map & cannibalization** ✅ — `pain.html` retargeted to "chronic pain physiotherapy" (was competing with sports/work injuries); `fertility.html` meta retargeted to the personal-story angle to differentiate from `fertility-acupuncture.html`'s exact-match target. "Related conditions/care" links added to the FAQ intro column (same size as "Good questions" heading, smaller supporting text, pill buttons) on both cannibalization clusters.
4. **Service → condition linking** ✅ — was already in place from an earlier session; all 4 original modality pages already link out to 4-6 relevant condition pages.
5. **FAQ schema** ✅ — was already present on the homepage.
6. **Service schema** ✅ — added to all 5 modality pages (commit `09732c2`).
7. **Location page decision** ✅ — decided to keep all 27 suburb pages permanently (Option A from the audit), not consolidate.

**Also done this audit cycle:**
- White reading-progress bar added to all 50 pages (`scripts/progress-bar.js`, commit `9299440`).
- Location page strategy across all 27 suburb pages: explicit "based in Highgate Hill, X minutes away" note + a unique service/condition pairing per suburb (Barefoot Physiotherapy pattern). Commit `9e33319`.
- `.photo-break` component capped to 70% width / auto-height (was a forced 21:9 crop) across all 5 pages using it; `work-injuries.html` also trimmed from 6 to 4 photo-break images. Commit `0dbc127`.

**Standing/ongoing item (not a one-off task):** monitor the 27 suburb pages for content freshness now that they're a permanent fixture — the audit's only caution here was thin-content risk if they ever went stale.

**Next SEO review:** 2026-09-30 per the audit doc.

## Bug fixed: location note rendering before hero (24 suburb pages)

24 of 27 suburb pages had the "We're based in Highgate Hill..." location-note section placed BEFORE the hero in the markup (only annerley, coorparoo, fairfield had the correct order). Fixed by moving it to immediately after the hero on all 24 pages, matching the reference pages. Also fixed a real data bug surfaced in the process: 20 of those pages had a drive-time figure in the note that didn't match the hero/footer value (e.g. New Farm said 12 minutes in two places, 9 in the note) — corrected to match. Commit `fde89b8`.

## Full-site internal linking audit + FAQ page retired (2026-07-30)

Ran a full-site internal linking audit using the `seo-internal-linking` skill, parsing the actual `<main>`-content link graph across all 50 pages rather than assuming. Found and fixed:

- `acupuncture.html` mentioned fertility twice but never linked to `fertility-acupuncture.html` — added the link.
- `migraines-and-headaches.html` → `pain.html` was one-way (pain linked to migraines, not back) — made reciprocal.
- `fatigue.html` → `stress.html` was one-way (stress linked to fatigue, not back) — made reciprocal.
- `faq-frequently-asked-questions.html` was functionally orphaned: the global nav's "FAQ" link on all 50 pages (including its own) pointed to `index.html#faq`, never to itself, only reachable via 5 legal/trust page footers. 7 of its 9 questions duplicated the homepage FAQ. **Retired it**: merged the 2 unique questions ("Why should I choose Holistic Physio?", "What services do you offer?") into the homepage FAQ (visible + `FAQPage` JSON-LD, now 8 questions total), repointed the 5 pages that linked to it, removed it from `sitemap.xml` and `llms.txt`, deleted the file. See `feedback_holisticphysio_writer_skill.md` / `project_holisticphysio_faq_consolidation.md` in Claude memory for full detail. Commit `c54351f`.

**Anchor text note (no action taken):** ~90% of links to `acupuncture.html` use the exact-match anchor "Acupuncture" (from template step-heading lists repeated across condition pages). Technically over-optimized per strict SEO anchor-rotation rules, but these are UX-necessary step labels — decided not to force artificial variation here.

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
