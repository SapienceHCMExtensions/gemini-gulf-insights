## Goal

Redesign `src/routes/drilldown.$widget.tsx` so it looks like a real screenshot of an Odoo 17 Sales Analytics screen — not a generic React/Tailwind page. Pixel-faithful to Odoo's actual chrome: navbar, breadcrumb cog, control panel with view switcher, search panel with filter chips, group-by facets, and an Odoo list/graph view body.

## Reference: what real Odoo looks like

Top to bottom:

1. **Top app navbar** — flat `#714B67` (Odoo enterprise purple), 46px tall.
   - Left: small white "Odoo" wordmark in a serif-ish font, then app menu name "Sales" with a `▾` chevron, all white 13px.
   - Right: tiny icons — debug bug, conversation, activity clock, settings gear, user initials avatar in white circle. All white at 60% opacity.

2. **Breadcrumb / control panel bar** — white background, 42px tall, bottom border `#dee2e6`.
   - Left: breadcrumb text `Sales Analysis › <Widget Name>` — the parent link is `#714B67` semibold, the `›` is grey, the leaf is `#4c4c4c`.
   - Right: view switcher pills — Pivot / Graph / List icons in a connected segmented group with a `1px #ced4da` border, the active one (`List`) gets `#714B67` text and a `#714B67` bottom underline. Then a vertical divider, then circular pager `‹ 1-50 / 50 ›`.

3. **Action bar** — white, 38px tall, bottom border `#dee2e6`.
   - Left: a single primary button `Measures ▾` in Odoo style: `#875A7B` purple text, `1px solid #875A7B` border, 4px radius, 11px uppercase. Next to it `Insert in Spreadsheet` as a flat link button.
   - Right: `⚙ Actions ▾` flat dropdown.

4. **Search panel** — white, ~44px tall, bottom border `#dee2e6`, with the canonical Odoo search input.
   - Pill-style input with a magnifying-glass icon left and three colored facet chips already applied:
     - `Filters: Last 30 Days` (chip with red `×` close, light grey background `#f1f3f5`, `#714B67` text)
     - `Group By: Product Category` 
     - `Favorites: My Dashboard`
   - To the right of the chips, three dropdown triggers: `▾ Filters`, `▾ Group By`, `▾ Favorites` — each in 12px `#4c4c4c`, with a small triangle.

5. **Page body** — `#f0f0f0` background (Odoo's app body grey, NOT white).
   - **Graph card** (full width, white, `1px #dee2e6`, no rounded corners — Odoo uses sharp corners). Header strip 32px `#f8f9fa` with 11px uppercase tracked label `${measure} Analysis` left and a tiny `↻` refresh icon right. Body 280px tall: vertical bar chart drawn with native divs (no recharts), bars in solid `#714B67`, hover `#017E84`, x-axis labels rotated -20°, y-axis grid lines every 25%. Below each bar the value in 11px `#4c4c4c`.
   - **List view** (full width, white, sharp corners, 1px border).
     - Header row: `#f9f9f9`, 32px tall, 11px uppercase `#4c4c4c` semibold tracked, sortable arrows `↕` next to each numeric column.
     - Rows: 32px tall, 13px `#212529`, hover `#f1f3f5`, 1px `#e7e7e7` row separator, first column has a checkbox.
     - Right-aligned numerics in `tabular-nums`, share column shows a tiny inline `#875A7B` progress bar (Odoo "progressbar widget").
     - Trend column uses Odoo's red/green: `#f06050` for negative, `#5cb85c` for positive, with up/down arrow.
     - Footer row pinned with `bg-[#f9f9f9]`, bold totals, `2px solid #875A7B` top border.

6. **Status bar** (bottom strip) — 28px, `#fafafa`, top border `#dee2e6`, very small grey text on the right: `${rowCount} records` · last update timestamp.

7. **Back action** — instead of a big purple button at the bottom, use Odoo's pattern: the breadcrumb's parent link is the back link. ALSO add a small `←` arrow next to the breadcrumb to make it explicit. Remove the previous footer "Back to GBI Distribution Analytics" CTA.

## Color tokens (exact Odoo)

```
--odoo-primary: #714B67   // app brand purple
--odoo-primary-lt: #875A7B // lighter accent
--odoo-accent: #017E84    // teal hover
--odoo-text: #212529
--odoo-text-2: #4c4c4c
--odoo-text-3: #6c757d
--odoo-border: #dee2e6
--odoo-border-2: #e7e7e7
--odoo-bg-app: #f0f0f0    // page body
--odoo-bg-strip: #f8f9fa  // header strips
--odoo-bg-row-hover: #f1f3f5
--odoo-success: #5cb85c
--odoo-danger: #f06050
```

## Typography

Odoo uses system sans with very tight 13px body. Set the page wrapper to:
`font-family: -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; font-size: 13px; color: #212529;`

All chrome labels use 11px uppercase 0.04em letter-spacing. Table rows 13px. Breadcrumb 13px semibold.

## Implementation

Rewrite `src/routes/drilldown.$widget.tsx` only. No data shape changes — keep `WIDGETS`, `loader`, `head`, `notFoundComponent`, `errorComponent`. Replace the body of `DrillDownPage` with the structure above.

- Use plain divs and inline class strings — no shadcn components. Odoo doesn't look like shadcn.
- Bars: render with `<div style={{ height: '${pct}%' }} className="w-8 bg-[#714B67] hover:bg-[#017E84]" />` inside a flex column container.
- Inline mini-progressbar in the share column: 60px wide track `#e7e7e7`, fill `#875A7B`.
- Checkboxes: `<input type="checkbox" className="accent-[#714B67] w-3 h-3" />`.
- Use `font-feature-settings: 'tnum'` via `tabular-nums` Tailwind utility for all numeric cells.

Layout uses CSS grid with no rounded corners and no shadow — Odoo cards are flat with hairline borders.

## Out of scope

- Dashboard slide changes (links already work).
- Real interactivity for filter chips, view switcher, or measures dropdown — they render but are static visuals (matches a real screenshot).
- Mobile responsive — Odoo back-office is desktop-only by design.
