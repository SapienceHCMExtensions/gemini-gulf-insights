## Goal

Deploy your existing Gulf Brands International / Odoo 19 slide deck React code into this TanStack Start project, broken into logical component files. **No UI, copy, color, layout, or behavior changes** — code is ported as-is. Future enhancements only on explicit request.

## What you'll see

Visiting `/` renders the same a responsive screen suited for all device types

1. Title slide (purple GBI cover)
2. GBI Distribution Analytics
3. On-Trade Key Account Performance  
4. CRM: B2B Sales & Account Pipeline  
5. Marketing: Campaign Reach & ROI  
6. Closing / Next Steps slide

Same Prev/Next controls, slide counter, progress bar, Dashboard / Pivot / Graph view toggle on each analytics slide.

## File breakdown

```text
src/
├── routes/
│   └── index.tsx                         → renders <App />
├── components/gbi/
│   ├── App.tsx                           → main slide controller (slides array, prev/next, progress)
│   ├── theme.ts                          → OdooColors constant
│   ├── lib/gemini.ts                     → callGemini() helper
│   ├── layout/
│   │   ├── Header.tsx                    → top bar with view toggle + search
│   │   └── ViewContainer.tsx             → wraps Header + dashboard/pivot/graph switch
│   ├── views/
│   │   ├── PivotView.tsx
│   │   └── GraphView.tsx
│   ├── ui/
│   │   ├── Card.tsx
│   │   └── Stat.tsx
│   └── slides/
│       ├── TitleSlide.tsx                → opening cover slide
│       ├── DashboardSlide.tsx            → GBI Distribution Analytics
│       ├── FBPerformanceSlide.tsx        → On-Trade Key Accounts
│       ├── PipelineSlide.tsx             → CRM Pipeline
│       ├── MarketingSlide.tsx            → Marketing campaigns
│       └── ClosingSlide.tsx              → Next Steps / Roadmap
```

Each file contains the corresponding block from your original code, unchanged. Imports are rewired between files; JSX, classNames, data, AI prompts, and logic stay byte-identical.

## Technical notes

- Project is TanStack Start + React 19 + Tailwind v4. `lucide-react` will be installed (it's the only external dep your code uses).
- `index.tsx` route mounts `<App />` directly — the deck takes the full viewport (`fixed inset-0`) exactly as written.
- `callGemini` keeps `apiKey = ""` exactly as in your file. The buttons will currently return the "Failed to generate insights" fallback until a key is wired in — this matches your current code's behavior. (I'll switch this to the Lovable AI Gateway whenever you ask for that enhancement.)
- TypeScript: components are converted to `.tsx` with minimal prop typing (`any`/inferred where your original was untyped JS) so nothing about runtime behavior or rendering changes.
- Placeholder content in `src/routes/index.tsx` is removed.
- No backend, no database, no auth — pure client deck.
- Replacing bar charts with a real chart library
- Routing each slide to its own URL
- Mobile-specific tweaks

## Out of scope (until you ask)

- Wiring Gemini/AI Gateway for the Sparkles buttons
- Real Odoo / Navision / LS Retail data integration
  &nbsp;
  &nbsp;