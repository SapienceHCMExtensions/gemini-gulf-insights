## Fix: "LS Retail Data Sync" card appears blank

**Root cause**: `src/components/gbi/ui/Card.tsx` hardcodes `bg-white` on the wrapper, which overrides the `bg-[#017E84]` passed via `className` from `MarketingSlide.tsx`. Result: white text on white background.

**Fix (minimal, single-line)**: In `src/components/gbi/ui/Card.tsx`, move `bg-white` so a caller-supplied background can override it. Place `${className}` after `bg-white` is removed from the base, and add `bg-white` only when no background class is passed — simplest implementation: drop `bg-white` from the base classes and add it back conditionally:

```tsx
const hasBg = /\bbg-/.test(className);
<div className={`${hasBg ? '' : 'bg-white'} border rounded-lg shadow-sm overflow-hidden flex flex-col ${className}`}>
```

This keeps the original white default for every other Card in the app (Dashboard, F&B, Pipeline slides) and lets the Marketing teal card render correctly. No other files change. UI/layout/content stay identical to the original Gemini code.

**Files touched**: `src/components/gbi/ui/Card.tsx` only.

**Out of scope**: Title slide logo box (separate pending question), any other styling enhancements.