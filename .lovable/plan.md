## Goal

Make the two dashboard widgets on the GBI Distribution Analytics slide — "Sales by Key On-Trade Account" and "Revenue Channel Split" — drillable. Clicking a bar, donut segment, or legend item navigates to a dedicated drill-down **route** (new page, real URL) styled like an Odoo analytics detail view, with a clear "Back to GBI Distribution Analytics" action that returns to the dashboard slide.

## Architecture note

Today the whole app is rendered at `/` by `App.tsx`, which is a slide-deck shell that swaps slide components via local state — slides are not routes. To deliver "a new page (route)", we add a real TanStack route alongside the deck:

```
src/routes/
  index.tsx                  -> / (existing slide deck)
  drilldown.$widget.tsx      -> /drilldown/:widget (new)
```

Navigating to `/drilldown/on-trade-accounts` or `/drilldown/revenue-channel` opens a standalone Odoo-styled detail page. Clicking "Back" navigates to `/`, which re-renders the slide deck. The deck's local slide index will reset to 0 (Title slide) on return — see "Trade-off" below.

## What changes

### 1. New route: `src/routes/drilldown.$widget.tsx`

A new TanStack Start file route registered automatically by the Vite plugin. It contains:

- A `WIDGETS` lookup keyed by widget ID with the data + metadata for each drill-down (parent, title, subtitle, measure label, unit, rows). Two entries: `on-trade-accounts` and `revenue-channel`.
- `loader` resolves the widget config; throws `notFound()` for unknown IDs.
- `head()` sets a per-route title/description.
- `notFoundComponent` shows an Odoo-styled "not found" with a back link to `/`.
- The page renders the Odoo analytics detail layout described below.

### 2. `src/components/gbi/slides/DashboardSlide.tsx`

Replace the static bars and donut with interactive elements that link to the route:

- **Sales by Key On-Trade Account** — wrap each bar in a `<Link to="/drilldown/$widget" params={{ widget: "on-trade-accounts" }}>` so the whole column is clickable. Hover styling: bar swaps to `#017E84`, slight scale, pointer cursor. The card title gets a small "Drill down →" hint.
- **Revenue Channel Split** — make each legend row a `<Link to="/drilldown/$widget" params={{ widget: "revenue-channel" }}>`. Wrap the donut itself in the same link so clicking the visual also drills in. Hover: legend row gets `bg-[#f1f3f5]`, donut gets a subtle ring.
- Both cards remain visually identical; only interactivity is added. No data changes.

### 3. No router/config changes

`@tanstack/react-router` is already wired (root route exists). The Vite plugin auto-discovers the new file and regenerates `routeTree.gen.ts` — no manual edits.

## Odoo look & feel for the drill-down page

Layout (full viewport):

1. **Top app bar** — `#714B67` background, white text, small Odoo-style logo box on the left, "Sales Analytics" label, search icon + user avatar on the right. Mirrors Odoo's chrome.
2. **Breadcrumb / control bar** — white, bottom border `#dee2e6`. Left: `← GBI Distribution Analytics  ›  Drill-Down  ›  <Widget Name>` with the back-arrow link in `#875A7B`. Right: Filters, Export, and a flat `×` close button (also navigates back to `/`).
3. **Page header** — large `#212529` title + grey subtitle.
4. **Content grid** (3 columns on lg, stacks below):
   - **Bar visualization (2 cols)** — Odoo Graph-style: left-aligned name + right-aligned value/share rows, each with a horizontal `#875A7B` progress bar that hovers to `#017E84`. Card has the standard Odoo header strip (`bg-[#f8f9fa]`, uppercase 11px label, `#dee2e6` border).
   - **Summary card (1 col)** — Records, Total, Top Contributor, Avg per Record. Total highlighted in Odoo teal.
   - **Breakdown table (full width)** — Odoo list view: `#f8f9fa` header, 11px uppercase column labels, `#dee2e6` row borders, `#f1f3f5` row hover, right-aligned numerics with `tabular-nums`, and a final Total row with `bg-[#fafafa]` and a thicker top border. Trend column shows ±% in red/green.
5. **Footer bar** — white, bordered top. Primary "Back to GBI Distribution Analytics" button in Odoo purple on the left; small caption on the right.

Typography stays in the project's existing system stack — no font swaps. All numeric formatting uses `Intl.NumberFormat('en-US')`. All icons via lucide.

## Data shown

- **on-trade-accounts**: 6 hospitality accounts (Ritz-Carlton, Four Seasons, Gulf Hotel, InterContinental Regency, Sofitel Zallaq, Wyndham Grand) with revenue, share %, MoM trend, and a note on the top contributor.
- **revenue-channel**: 3 channels (On-Trade, Retail Store, GBI Express) with revenue, share %, trend, and a contextual note. Numbers align with the existing dashboard story (65/25/10 split, total ~BHD 845K).

## Trade-off (so you can decide before I build)

Returning to `/` re-mounts the slide deck. Because `App.tsx` keeps `currentSlide` in local React state, the user lands on the Title slide rather than the GBI Distribution Analytics slide they came from. Two options:

- **A. Accept it (default)** — Simplest, zero refactor of the deck. Back link returns to slide 1 of the deck.
- **B. Persist current slide in the URL** — Convert the deck to read its current slide index from a search param (e.g. `/?slide=2`) so the drill-down link can carry it and return restores the same slide. Small refactor of `App.tsx` (~15 lines) to read/write `useSearch`/`useNavigate` instead of `useState`. Recommended if you want a polished "back to exactly where I was" experience.

I'll go with **A** unless you say otherwise — it matches your one-line ask and keeps the change scoped.

## Out of scope

- Drill-down on other dashboard slides (FBPerformance, Marketing, Pipeline, Customer360 dashboards) — their dashboards use different patterns and you only asked about this slide.
- Persisting filters across drill-downs.
- Real backend data — the drill-down data is co-located with the route (same pattern as the existing slide data).
