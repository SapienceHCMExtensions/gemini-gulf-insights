## Build 3 New Slides: Customer 360°, Stakeholder Value Map, Phased Roadmap

Additive only. No existing slides, components, or styles will be modified. All new slides reuse the existing `Header`, `ViewContainer`, `Card`, `PivotView`, `GraphView`, `callGemini`, and Odoo color palette (`#875A7B` purple, `#017E84` teal) for visual consistency.

### New files

1. **`src/components/gbi/slides/Customer360Slide.tsx`** — full tri-view slide (Dashboard / Pivot / Graph)
   - **Dashboard**: 3-column layout
     - Left: Customer profile card (Ritz-Carlton example) with LTV, NPS, unified data-source chips (LS Retail, Navision, Odoo CRM, Marketing, eCommerce)
     - Middle: Vertical engagement timeline showing touchpoints across GBI Express, Email, LS Retail POS, Sales Calls, Events
     - Right: AI Next-Best-Action card (purple gradient, Gemini-powered) + Channel Affinity bars
   - **Pivot**: Cross-channel revenue attribution per top customer (POS / Navision / GBI Express / Total)
   - **Graph**: Engagement Score by Customer Segment (HORECA, F1, Mid-Market, Retail Loyalty, GBI Express)

2. **`src/components/gbi/slides/StakeholderValueMapSlide.tsx`** — content slide (Title/Closing pattern)
   - Header strip with Odoo purple accent
   - Hero line: *"One Platform. Five Stakeholders. Measurable Wins."*
   - 2x3 grid of persona cards: CEO, CFO, Sales Head, Marketing Head, Retail Ops Head, IT Director
   - Each card: persona icon, "Pain Today", "Odoo Delivers", quantified outcome metric
   - Footer band: *"Built on top of your existing Navision + LS Retail investment — zero rip-and-replace."*

3. **`src/components/gbi/slides/RoadmapSlide.tsx`** — content slide (Title/Closing pattern)
   - Header: "Phased Roadmap with Quick Wins"
   - Horizontal timeline with 4 phases (Month 1-2, 3-4, 5-6, Year 2)
   - Each phase pill shows: duration, scope, **Quick Win badge**, investment range, expected ROI metric, exit criteria
   - Risk-mitigation footnote: each phase is independently valuable; GBI can pause or stop after any phase
   - CTA band: "Start with a 2-week paid Discovery Workshop"

### Wiring

4. **`src/components/gbi/App.tsx`** — insert the 3 new slides into the `slides` array in this order so the deck flows naturally:
   - Title
   - **Stakeholder Value Map** (new — sets stakeholder context up front)
   - Dashboard (existing)
   - F&B Performance (existing)
   - Pipeline (existing)
   - Marketing (existing)
   - **Customer 360°** (new — engagement centerpiece, after channel-specific slides)
   - **Phased Roadmap** (new — sits just before Closing)
   - Closing

   Pattern follows existing convention: tri-view slides use `{ id, component }`, content slides use `{ type, content }`. The existing `type === 'title' || type === 'closing'` render branch will be extended to also recognize the two new content-slide types (`'stakeholder'`, `'roadmap'`).

### Out of scope (per standing instructions)

- No edits to existing slides (Title, Dashboard, F&B, Pipeline, Marketing, Closing)
- No edits to `Header`, `ViewContainer`, `Card`, `Stat`, `PivotView`, `GraphView`, `theme.ts`, or `gemini.ts`
- No design-token / `styles.css` changes
- No new dependencies (all icons used are already in `lucide-react`)