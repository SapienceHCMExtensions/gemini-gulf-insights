## Goal
Fix layout overflow with the slide navigator and clean up content per feedback on the Stakeholder Value Map and Phased Roadmap slides.

## Changes

### 1. `src/components/gbi/slides/StakeholderValueMapSlide.tsx`
- Footer banner ("Built on top of your existing investment...") is currently rendered inside a flex column where the persona grid takes `flex-1`, pushing the banner out of view behind the slide navigator pill.
- Fix: Remove `flex-1 min-h-0` from the persona grid and ensure the banner sits naturally after the cards. Add bottom padding (`pb-20`) to the scroll container so the floating navigator (bottom-right) does not overlap content.
- Banner content stays unchanged, just ensure it appears after all 6 cards in normal scroll flow.

### 2. `src/components/gbi/slides/RoadmapSlide.tsx`
Content edits per phase:
- **Phase 1 — CRM + Marketing Live**: remove `'Email & WhatsApp automation'` from scope.
- **Phase 2** — rename title from `Customer 360 + AI Insights` → `Customer 360`. Remove `'Gemini-powered next-best-action'` from scope. Update `quickWin` to remove the AI reference (e.g., "First churn save on a HORECA account").
- **Phase 3 — eCommerce + Loyalty**: remove `'Loyalty program live'` from scope.
- **Phase 4 — Unified Platform Evaluation**: remove `'Optional Odoo ERP migration'` and `'Full consolidation business case'` from scope (keep only ROI review item). Remove the italic `exit` footer line below each card entirely (across all 4 phases) since user wants unwanted footers gone.

Investment removal:
- Remove the `investment` field from each phase object.
- Remove the "Investment" row from the card footer JSX.
- Keep ROI row.

Layout / overlap fix:
- The bottom CTA banner with "Book Discovery Workshop" button is being overlapped by the navigator pill (bottom-right).
- Fix: add `pb-20` (or `pb-24`) to the scroll container so the CTA banner clears the floating navigator. The navigator stays in its current fixed position (it is a global control in `App.tsx` shared by all slides — we won't move it globally, just add bottom padding to this slide's content so nothing is hidden underneath).

### 3. No changes to
- `src/components/gbi/App.tsx` (navigator position is shared across slides; per-slide padding is the correct fix)
- Other slides
- Theme / styles / dependencies

## Out of scope
- Moving the global navigator below content on every slide (would require restructuring `App.tsx` layout; per-slide bottom padding solves the visible overlap without regressing other slides).
