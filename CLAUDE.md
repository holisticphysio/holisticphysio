# Active Progress: Holistic Physio Brisbane home page (2026-07-13)

**Status (2026-07-13, session 4):** BUILD COMPLETE, design-revised, awaiting HITL ship. Project folder is `projects/holisticphysio/` (renamed by user from `holisticphysio.com.au/` mid-session — use this path, not the old one). All copy, images, JSON-LD and quality gates from session 3 hold; session 4 fixed a real layout bug (practitioner portrait was rendering at native 196px width inside a wider container, leaving blank space — same fragile pattern flagged as a risk in `css/main.css` wherever `img{max-width:100%;height:auto}` meets a container wider than the source image; now fixed with explicit `width:100%`/`object-fit:cover`/`aspect-ratio` on `.practitioner__media` and `.difference__media`), removed all em dashes from every string in `index.html` and `condition-finder.js` per [[feedback_no_em_dashes]], dropped the redundant "Send an Enquiry" hero CTA, and added a real visual identity pass: ringed/framed photo motif reused across hero/difference/practitioner, radial-glow hero background, diagonal-cut divider into the trust bar, color-coded service-card top accents, and pull-quote-style testimonials.

**Remaining before ship (all HITL, all documented in `projects/holisticphysio/seo-report.md`):**
1. Cloudflare Pages deploy, then replace `PENDING_CF_ANALYTICS_TOKEN` in both `index.html` and `404.html` heads.
2. Real testimonial quotes from the client (current ones are visibly flagged placeholders — remove the flag when replaced).
3. Wire the enquiry form endpoint (`[data-contact-form]` markup is ready; status line currently tells visitors to call/book instead).
4. After deploy: verify beacon fires, submit sitemap in GSC.

**Harvest candidates for next Phase 8 pass:** `condition-finder.js` (10-condition chip/panel widget) is reusable for the module catalogue; the `html.js-modules` reveal-gate pattern (app.js sets the class, modules.css keys off it) should be ported back into the kit since ES modules silently fail on file:// — see [[feedback_es_modules_blocked_on_file_protocol]].

**Aside (unresolved, not blocking):** Intermittent Claude Code API errors, suspected local Headroom proxy (`ANTHROPIC_BASE_URL=http://127.0.0.1:8787`, headroom.exe v0.30.0). Bypass test (unset `ANTHROPIC_BASE_URL`/`ANTHROPIC_CUSTOM_HEADERS` for one session) suggested but not yet run.
