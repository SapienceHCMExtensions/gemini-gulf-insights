# Make Line & Pie Chart Buttons Functional in GraphView

The Graph view (used in Customer 360 and other slides) currently shows three icons (Bar, Line, Pie) but only the Bar chart renders—the Line and Pie buttons are decorative.

## Changes to `src/components/gbi/views/GraphView.tsx`

1. Add local `useState<'bar' | 'line' | 'pie'>` state to track the active chart type.
2. Wire each icon button to switch the active chart and apply active/inactive styling.
3. Extract the existing bar chart into a `BarChart` subcomponent (unchanged visuals).
4. Add an SVG-based `LineChart` subcomponent: gridlines, axis labels, a smooth purple line + light fill area, and hoverable data points with tooltips.
5. Add an SVG-based `PieChart` subcomponent: colored slices using the GBI palette (`#875A7B`, `#017E84`, plus complementary tones), white separators, hover tooltips, and a legend listing each segment with its percentage.
6. All three charts read the same `data` prop (`{ label, value, percent }[]`) so no callers need to change.
