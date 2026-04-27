# Remove CFO & Head of Retail Ops Cards

## Changes to `src/components/gbi/slides/StakeholderValueMapSlide.tsx`

1. Remove the **CFO** persona object from the `personas` array.
2. Remove the **Head of Retail Ops** persona object from the `personas` array.
3. Clean up unused icon imports (`Calculator`, `Store`) from the `lucide-react` import.
4. Update the heading from "One Platform. Six Stakeholders. Measurable Wins." to "One Platform. Four Stakeholders. Measurable Wins." to reflect the remaining 4 cards (CEO, Head of Sales, Head of Marketing, IT Director).

The 3-column grid layout will naturally reflow to show the 4 remaining cards.
