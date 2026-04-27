## Goal

Add click-to-drill-down on every chart inside `GraphView` (bar, line, pie). Clicking a bar / point / slice opens a drill-down table directly below the chart, styled to match Odoo's native look so it feels like a real Odoo Graph view drill-down — not a custom UI bolted on.

## Where to change

All analytical charts on slides flow through one shared component: `src/components/gbi/views/GraphView.tsx` (used by `DashboardSlide`, `Customer360Slide`, `MarketingSlide`, `PipelineSlide`, `FBPerformanceSlide`, etc. via `ViewContainer`'s `graph` prop).

Implementing drill-down inside `GraphView` gives every slide the feature with zero per-slide changes. Slide files get small data extensions to provide breakdown rows.

## Odoo look & feel (the visual brief)

The drill-down panel must look like an Odoo grouped list / pivot drilldown:

- **Container**: white background, 1px border `#dee2e6`, no rounded corners on the table itself, sits flush below the chart with a top border separating them (Odoo never floats panels — they're docked).
- **Header bar above the table**: light grey `bg-[#f8f9fa]`, height ~32px, left side shows breadcrumb-style text `Group: <chart title> › <selected label>` in `#4c4c4c` with the › separators in `#875A7B`. Right side has a flat icon-only "×" close button (Odoo uses `fa-times`-style, no border, hover bg `#e9ecef`).
- **Table**:
  - Header row: `bg-[#f8f9fa]`, `text-[11px]`, `font-semibold`, `uppercase`, `tracking-wide`, color `#4c4c4c`, border-bottom `#dee2e6`, left-aligned for label cols, right-aligned for numeric cols (Odoo convention).
  - Body rows: `text-[13px]`, color `#212529`, row height ~28px (`py-1.5`), border-bottom `#dee2e6`, hover `bg-[#f1f3f5]` (Odoo row hover).
  - Numeric cells: right-aligned, monospace-ish via `tabular-nums`, with thousand separators.
  - Last "Total" row: `font-semibold`, `bg-[#fafafa]`, top border slightly darker — mirrors Odoo pivot totals.
- **Empty / single-item fallback**: when the clicked datum has no `breakdown`, show a 1-row Odoo-style table with columns `Label | Value | Share` derived from `label`, `value`, `percent`.
- **Typography**: inherit the existing system stack already in use; no font swaps. Consistent with `PivotView`'s look so the two feel like the same product surface.
- **Icons**: keep using lucide (already in the project) but pick the closest equivalents to Odoo's FontAwesome set — `X` for close, `ChevronRight` for breadcrumb separator (replaces ›).

The chart-element selected state also gets an Odoo touch:
- Bar: selected bar uses solid Odoo teal `#017E84` with a 1px darker outline; non-selected bars dim to `opacity-60`.
- Line point: selected circle grows to `r=7`, fill `#017E84`, white halo ring.
- Pie slice: selected slice nudged outward ~6px along its mid-angle, `stroke-width=3` white stroke (classic Odoo pie selection).

## Data contract (backward compatible)

Extend the `data` prop accepted by `GraphView`:

```ts
type GraphDatum = {
  label: string;
  value: string;       // display value (e.g. "BHD 184.5K")
  percent: number;     // 0-100 for chart sizing
  breakdown?: Array<{
    name: string;                      // first column
    value: number | string;            // numeric column (right-aligned, formatted)
    secondary?: number | string;       // optional second numeric column
    note?: string;                     // optional small grey caption under name
  }>;
};
```

If `breakdown` is missing, drill-down still works via the single-row fallback. Slides without `breakdown` continue rendering exactly as today.

## UX behavior

- Hover over a bar/point/slice shows pointer cursor (already mostly true).
- Click selects that datum; click again on the same element, or click the × in the drill-down header, clears it.
- Switching chart type (bar/line/pie) clears selection.
- Drill-down panel is rendered below the chart inside the same `GraphView` flex column. Chart shrinks; drill-down gets `max-h-64 overflow-auto`. Layout stays clean at 943×674.

## Technical details

File edits:

1. **`src/components/gbi/views/GraphView.tsx`**
   - Add `selected: number | null` state and a `select(i)` toggler.
   - Reset `selected` when `chart` changes.
   - Wrap chart in `flex-1 min-h-0`; render `<OdooDrillDown />` below when `selected != null`.
   - `BarChart`: each bar gets `onClick`; selected styling as described; non-selected dimmed.
   - `LineChart`: each `<circle>` gets `onClick` + selected styling.
   - `PieChart`: each `<path>` gets `onClick` + outward translate via `transform` along mid-angle.
   - New local component `OdooDrillDown({ datum, title, onClose })` rendering the Odoo-styled header + table described above. Number formatting via `Intl.NumberFormat('en-US')`.

2. **Slide files — add `breakdown` to `GraphView` data** (so drill-downs are meaningful, not just fallback rows):
   - `DashboardSlide.tsx` — monthly revenue → top channels for that month.
   - `Customer360Slide.tsx` — engagement score per segment → top contributing accounts.
   - `MarketingSlide.tsx`, `PipelineSlide.tsx`, `FBPerformanceSlide.tsx`, `RoadmapSlide.tsx`, `StakeholderValueMapSlide.tsx` — concise breakdowns matching each chart's theme. Slides without a `graph` prop are skipped.

No new dependencies. No routing/SSR changes. Pure client interaction.

## Out of scope (ask if you want them)

- Drill-down on the bespoke mini-charts inside `DashboardSlide`'s dashboard view (custom hand-rolled bars/donut, not `GraphView`).
- Drill-down on `PivotView` cells or KPI `Stat` cards.
- Multi-level (nested) drill-down — only one level deep, matching the most common Odoo Graph drilldown behavior.
