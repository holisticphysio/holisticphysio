# Holistic Physio (holisticphysio.com.au)

Brisbane physiotherapy and acupuncture clinic. Static site, no build step. Practitioner: Sandra Tan, Physiotherapist and Doctor of Chinese Medicine. Clinic at 26 Gladstone Rd (cnr Brook St), Highgate Hill Qld 4101.

**Last session: 2026-08-07.** Content and structure passover. Working tree has ~54 modified files uncommitted.

## Stack and layout

Vanilla HTML/CSS/JS, hand-authored, deployed on Cloudflare Pages (preview at holisticphysio.pages.dev). No framework, no bundler, no npm.

- `css/main.css` is the only stylesheet.
- `scripts/app.js` (nav, suburb widget, lightbox, email obfuscation, reveal gate), `scripts/progress-bar.js`.
- `images/` uses the `holisticphysio-holistic-physio-` prefix on every asset.
- 53 pages, all flat in the project root: `index.html`, 27 suburb pages, service and condition pages, 4 comparison pages, `about-us`, `contact`, and 3 legal pages.

`app.js` holds the `SUBURBS` array (name, drive minutes, filename) that drives the suburb pill widget. Drive times there must stay in sync with the copy on each suburb page.

## Conventions

- Booking always links to the Zanda Health client portal, never an internal form. There is no contact form on the site and no form endpoint.
- Contact links site-wide point at `contact.html`. Only `index.html` uses same-page `#therapies` / `#conditions` anchors in its nav and footer.
- Every page carries the identical `<footer class="footer">` block including the 27-suburb "Areas we serve" grid.
- No analytics or tracking scripts are installed. This is deliberate and the privacy policy now states it. If analytics is ever added, update `privacy-policy.html` in the same commit.
- No dollar amounts anywhere in the copy. Fees and Medicare rebates change, so pages say "the Medicare rebate" and direct patients to confirm current amounts. Do not reintroduce figures.
- Medicare wording is "chronic condition management plan". The old "Chronic Disease Management (CDM)" naming was swept out on 2026-08-07. The 5-service cap is shared across all allied health providers, not 5 physiotherapy visits.
- Any use of "Dr Sandra Tan" must state the profession alongside it, per AHPRA advertising guidelines.
- No em dashes. Enforced by a PostToolUse hook.

## Suburb pages

Each has a "Getting here from [Suburb]" section: driving route with real road names, parking and public transport, and for the longer variants a suburb-specific clinical observation. Two-paragraph and three-paragraph versions alternate so lengths vary (643 to 744 words). This structure exists specifically to keep textual similarity between suburb pages down, currently 69 to 77 percent, previously 87 to 95 percent. Do not regenerate these from a single template.

Route detail was written from general Brisbane geography and has not been map-verified. The western suburbs (Sherwood, Corinda, Graceville, Indooroopilly) and the Eleanor Schonell Bridge bus claim on `st-lucia.html` are the ones worth checking.

## Open items

1. Verify "chronic condition management plan" is the current Services Australia plan name before the next deploy.
2. Map-verify suburb page routes, western suburbs first.
3. Location strategy: the 27 suburb pages are still a doorway-page risk even at 69 to 77 percent similarity. The agreed direction is a Barefoot-style single-location approach. Not started.
4. Legal pages carry no JSON-LD. Low priority.
5. Next scheduled SEO review: 2026-09-30.

## Related skills and memory

- Writing skill: `integrative-physio-tcm-writer` (grade-8 patient-facing, "doctors call this X" pattern for jargon).
- Memory: `project_holisticphysio_seo_audit_2026_07_30`, `project_holisticphysio_ai_seo_2026_07_30`, `project_holisticphysio_location_strategy`, `project_holisticphysio_image_naming`, `project_holisticphysio_original_source`, `feedback_case_study_sourcing_discipline` (one review per page, never fabricate).
