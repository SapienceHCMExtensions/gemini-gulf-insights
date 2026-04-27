## Diagnosis

The drill-down route file `src/routes/drilldown.$widget.tsx` exists, and `DashboardSlide.tsx` correctly links to it with `<Link to="/drilldown/$widget" params={{ widget: "..." }}>`. But `src/routeTree.gen.ts` only registers `/` — the file was never regenerated after the new route was created.

At runtime TanStack Router consults the generated route tree. Since `/drilldown/...` is not in it, navigation falls through to the root `notFoundComponent`, which renders the "Page not found" screen the user is seeing.

The TanStack Router Vite plugin auto-regenerates `routeTree.gen.ts` on dev/build start, but the committed copy is stale and the dev server can be using cached output.

## Fix

1. Run a build (`bun run build`) to force the TanStack Router Vite plugin to regenerate `src/routeTree.gen.ts`. This adds:
   - `DrilldownWidgetRoute` import
   - `/drilldown/$widget` entry in `FileRoutesByFullPath`, `FileRoutesByTo`, `FileRoutesById`
   - `DrilldownWidgetRoute` in `rootRouteChildren`

2. Verify by grepping the regenerated file for `drilldown`.

3. After regeneration, clicking a bar on "Sales by Key On-Trade Account" or a legend row / donut on "Revenue Channel Split" navigates to `/drilldown/on-trade-accounts` or `/drilldown/revenue-channel` and renders the Odoo-styled detail page. The "Back to GBI Distribution Analytics" button returns to `/`.

## Out of scope

- No content/styling changes to the drill-down page or the dashboard widgets — they are already correct. This is purely a route registration regeneration.
- Preserving the current slide index on return (still option B from the previous plan, not requested).
