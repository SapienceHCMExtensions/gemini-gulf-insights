import { createFileRoute, Link, notFound } from "@tanstack/react-router";

type DrillRow = {
  name: string;
  value: number;
  share: string;
  trend?: string;
  note?: string;
};

type DrillConfig = {
  parent: string;
  title: string;
  subtitle: string;
  measure: string;
  unit: string;
  rows: DrillRow[];
};

const WIDGETS: Record<string, DrillConfig> = {
  "on-trade-accounts": {
    parent: "GBI Distribution Analytics",
    title: "Sales by Key On-Trade Account",
    subtitle: "Wholesale revenue contribution per 5-star hospitality account (last 30 days).",
    measure: "Wholesale Revenue",
    unit: "BHD",
    rows: [
      { name: "The Ritz-Carlton, Bahrain", value: 184500, share: "26.0%", trend: "+8.2%", note: "Top contributor — Dom Pérignon reorder driver" },
      { name: "Four Seasons Bahrain", value: 142500, share: "20.1%", trend: "+5.4%" },
      { name: "Gulf Hotel Group", value: 118600, share: "16.7%", trend: "+2.1%" },
      { name: "InterContinental Regency", value: 96800, share: "13.6%", trend: "-1.2%" },
      { name: "Sofitel Zallaq Thalassa", value: 82700, share: "11.7%", trend: "+3.7%" },
      { name: "Wyndham Grand Manama", value: 84600, share: "11.9%", trend: "+6.0%" }
    ]
  },
  "revenue-channel": {
    parent: "GBI Distribution Analytics",
    title: "Revenue Channel Split",
    subtitle: "Monthly wholesale revenue distribution across primary sales channels.",
    measure: "Channel Revenue",
    unit: "BHD",
    rows: [
      { name: "On-Trade (Hotels & Bars)", value: 549250, share: "65.0%", trend: "+12.5%", note: "Hilton, Ritz, Four Seasons, Sofitel, Wyndham" },
      { name: "Retail Store", value: 211250, share: "25.0%", trend: "+4.8%", note: "Seef + Adliya outlets" },
      { name: "GBI Express (Home Delivery)", value: 84500, share: "10.0%", trend: "+18.3%", note: "eCommerce — fastest growing channel" }
    ]
  }
};

export const Route = createFileRoute("/drilldown/$widget")({
  loader: ({ params }) => {
    const config = WIDGETS[params.widget];
    if (!config) throw notFound();
    return config;
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.title} — Sales Analysis | Odoo` },
          { name: "description", content: loaderData.subtitle }
        ]
      : []
  }),
  component: DrillDownPage,
  errorComponent: ({ error, reset }) => (
    <div className="min-h-screen flex items-center justify-center bg-[#f0f0f0] px-4 odoo-root">
      <div className="max-w-md text-center bg-white border border-[#dee2e6] p-6">
        <h1 className="text-[15px] font-semibold text-[#212529] mb-2">Server Error</h1>
        <p className="text-[13px] text-[#6c757d] mb-4">{error.message}</p>
        <div className="flex items-center justify-center gap-2">
          <button onClick={reset} className="text-[12px] border border-[#ced4da] px-3 py-1 bg-white hover:bg-[#f1f3f5] text-[#4c4c4c] rounded-sm">
            Retry
          </button>
          <Link to="/" className="text-[12px] bg-[#714B67] hover:bg-[#5d3d56] text-white px-3 py-1 rounded-sm font-semibold">
            Discard
          </Link>
        </div>
      </div>
    </div>
  ),
  notFoundComponent: () => (
    <div className="min-h-screen flex items-center justify-center bg-[#f0f0f0] odoo-root">
      <div className="text-center">
        <h1 className="text-[15px] font-semibold text-[#212529] mb-2">Record not found</h1>
        <Link to="/" className="text-[#714B67] hover:underline text-[13px] font-semibold">
          ← Back to GBI Distribution Analytics
        </Link>
      </div>
    </div>
  )
});

const ODOO_FONT =
  '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif';

function DrillDownPage() {
  const data = Route.useLoaderData();
  const max = Math.max(...data.rows.map((r) => r.value));
  const total = data.rows.reduce((acc, r) => acc + r.value, 0);
  const fmt = (n: number) => new Intl.NumberFormat("en-US").format(n);

  return (
    <div
      className="min-h-screen bg-[#f0f0f0] flex flex-col text-[#212529]"
      style={{ fontFamily: ODOO_FONT, fontSize: 13 }}
    >
      {/* 1. Top app navbar */}
      <header className="bg-[#714B67] h-[46px] flex items-center justify-between px-3 shrink-0 select-none">
        <div className="flex items-center gap-4 text-white">
          <span
            className="text-[18px] leading-none tracking-tight"
            style={{ fontFamily: 'Georgia, "Times New Roman", serif', fontStyle: "italic" }}
          >
            odoo
          </span>
          <span className="w-px h-5 bg-white/20" />
          <button className="flex items-center gap-1.5 text-[13px] font-medium text-white/95 hover:text-white">
            Sales
            <svg width="9" height="9" viewBox="0 0 10 10" fill="none">
              <path d="M2 4l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
        <div className="flex items-center gap-3 text-white/85">
          <NavIcon label="Debug">
            <path d="M9 2a3 3 0 016 0v1H9V2zm-3 6a6 6 0 0112 0v1h-2v6a4 4 0 01-8 0v-6H6V8z" />
          </NavIcon>
          <NavIcon label="Discuss">
            <path d="M3 4h18v12h-7l-4 4v-4H3V4z" />
          </NavIcon>
          <NavIcon label="Activities">
            <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm1 5h-2v6l5 3 1-1.7-4-2.3V7z" />
          </NavIcon>
          <NavIcon label="Settings">
            <path d="M12 8a4 4 0 100 8 4 4 0 000-8zm9.4 4l-1.9-.4a8 8 0 00-.7-1.6l1-1.6-2.4-2.4-1.6 1a8 8 0 00-1.6-.7L13.8 4h-3.4l-.4 1.9a8 8 0 00-1.6.7l-1.6-1L4.4 8l1 1.6a8 8 0 00-.7 1.6L2.6 12v3.4l1.9.4c.2.6.4 1.1.7 1.6l-1 1.6L6.6 21l1.6-1c.5.3 1 .5 1.6.7l.4 1.9h3.4l.4-1.9c.6-.2 1.1-.4 1.6-.7l1.6 1 2.4-2.4-1-1.6c.3-.5.5-1 .7-1.6l1.9-.4V12z" />
          </NavIcon>
          <div className="w-7 h-7 rounded-full bg-[#017E84] flex items-center justify-center text-[10px] font-bold text-white border border-white/20">
            SA
          </div>
        </div>
      </header>

      {/* 2. Breadcrumb / view switcher */}
      <div className="bg-white h-[42px] border-b border-[#dee2e6] flex items-center justify-between px-4 shrink-0">
        <div className="flex items-center gap-2 text-[13px]">
          <Link
            to="/"
            className="flex items-center gap-1 text-[#714B67] hover:text-[#5d3d56] font-semibold"
            title="Back to dashboard"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Sales Analysis
          </Link>
          <span className="text-[#adb5bd]">›</span>
          <span className="text-[#4c4c4c]">{data.title}</span>
        </div>
        <div className="flex items-center gap-3">
          {/* View switcher */}
          <div className="flex items-stretch border border-[#ced4da] rounded-sm overflow-hidden h-[26px]">
            <ViewBtn icon="pivot" />
            <ViewBtn icon="graph" />
            <ViewBtn icon="list" active />
          </div>
          {/* Pager */}
          <div className="flex items-center gap-2 text-[12px] text-[#4c4c4c] tabular-nums">
            <span>1-{data.rows.length}</span>
            <span className="text-[#adb5bd]">/</span>
            <span>{data.rows.length}</span>
            <button className="w-6 h-6 border border-[#ced4da] rounded-sm hover:bg-[#f1f3f5] flex items-center justify-center text-[#6c757d]">
              ‹
            </button>
            <button className="w-6 h-6 border border-[#ced4da] rounded-sm hover:bg-[#f1f3f5] flex items-center justify-center text-[#6c757d]">
              ›
            </button>
          </div>
        </div>
      </div>

      {/* 3. Action bar */}
      <div className="bg-white h-[38px] border-b border-[#dee2e6] flex items-center justify-between px-4 shrink-0">
        <div className="flex items-center gap-2">
          <button className="text-[11px] uppercase tracking-wide font-semibold text-[#875A7B] border border-[#875A7B] px-3 py-1 rounded-sm hover:bg-[#875A7B] hover:text-white flex items-center gap-1.5">
            Measures
            <svg width="8" height="8" viewBox="0 0 10 10" fill="none">
              <path d="M2 4l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button className="text-[12px] text-[#4c4c4c] px-2 py-1 hover:bg-[#f1f3f5] rounded-sm">
            Insert in Spreadsheet
          </button>
        </div>
        <div className="flex items-center gap-1">
          <button className="text-[12px] text-[#4c4c4c] px-2 py-1 hover:bg-[#f1f3f5] rounded-sm flex items-center gap-1.5">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 8a4 4 0 100 8 4 4 0 000-8zm9.4 4l-1.9-.4a8 8 0 00-.7-1.6l1-1.6-2.4-2.4-1.6 1a8 8 0 00-1.6-.7L13.8 4h-3.4l-.4 1.9a8 8 0 00-1.6.7l-1.6-1L4.4 8l1 1.6a8 8 0 00-.7 1.6L2.6 12v3.4l1.9.4c.2.6.4 1.1.7 1.6l-1 1.6L6.6 21l1.6-1c.5.3 1 .5 1.6.7l.4 1.9h3.4l.4-1.9c.6-.2 1.1-.4 1.6-.7l1.6 1 2.4-2.4-1-1.6c.3-.5.5-1 .7-1.6l1.9-.4V12z" />
            </svg>
            Actions
            <svg width="8" height="8" viewBox="0 0 10 10" fill="none">
              <path d="M2 4l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>

      {/* 4. Search panel */}
      <div className="bg-white border-b border-[#dee2e6] px-4 py-2 shrink-0 flex items-center gap-2 flex-wrap">
        <div className="flex items-center gap-1.5 text-[#6c757d] pl-1 pr-2">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
            <path d="M20 20l-3-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>
        <Facet category="Filters" value="Last 30 Days" />
        <Facet category="Group By" value={data.measure === "Channel Revenue" ? "Sales Channel" : "Product Category"} />
        <Facet category="Favorites" value="My Dashboard" />
        <div className="flex-1" />
        <SearchDropdown label="Filters" />
        <SearchDropdown label="Group By" />
        <SearchDropdown label="Favorites" star />
      </div>

      {/* 5. Body */}
      <div className="flex-1 p-3 space-y-3">
        {/* Graph card */}
        <section className="bg-white border border-[#dee2e6]">
          <div className="h-[32px] bg-[#f8f9fa] border-b border-[#dee2e6] flex items-center justify-between px-3">
            <span className="text-[11px] uppercase tracking-wider text-[#4c4c4c] font-semibold">
              {data.measure} Analysis ({data.unit})
            </span>
            <button className="text-[#6c757d] hover:text-[#212529]" title="Refresh">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                <path d="M3 12a9 9 0 0115.5-6.3M21 12a9 9 0 01-15.5 6.3M21 4v5h-5M3 20v-5h5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
          <div className="px-6 pt-6 pb-3">
            <div className="relative h-[240px] flex items-end gap-6 border-l border-b border-[#e7e7e7] pl-3">
              {/* Y grid */}
              {[0, 25, 50, 75, 100].map((p) => (
                <div
                  key={p}
                  className="absolute left-3 right-0 border-t border-dashed border-[#eeeeee]"
                  style={{ bottom: `${p}%` }}
                />
              ))}
              {/* Y axis labels */}
              <div className="absolute -left-1 top-0 bottom-0 -translate-x-full pr-2 flex flex-col justify-between text-[10px] text-[#6c757d] tabular-nums">
                <span>{fmt(max)}</span>
                <span>{fmt(Math.round(max * 0.75))}</span>
                <span>{fmt(Math.round(max * 0.5))}</span>
                <span>{fmt(Math.round(max * 0.25))}</span>
                <span>0</span>
              </div>
              {data.rows.map((row, i) => {
                const pct = (row.value / max) * 100;
                return (
                  <div key={i} className="relative flex-1 flex flex-col items-center justify-end h-full group">
                    <span className="text-[10px] text-[#4c4c4c] tabular-nums mb-1 opacity-0 group-hover:opacity-100 transition-opacity font-semibold">
                      {fmt(row.value)}
                    </span>
                    <div
                      className="w-full max-w-[56px] bg-[#714B67] group-hover:bg-[#017E84] transition-colors cursor-pointer"
                      style={{ height: `${pct}%` }}
                      title={`${row.name}: ${fmt(row.value)} ${data.unit}`}
                    />
                  </div>
                );
              })}
            </div>
            {/* X labels */}
            <div className="flex gap-6 pl-3 mt-2">
              {data.rows.map((row, i) => (
                <div
                  key={i}
                  className="flex-1 text-[10px] text-[#4c4c4c] text-center truncate"
                  title={row.name}
                >
                  {row.name.length > 18 ? row.name.slice(0, 17) + "…" : row.name}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* List view */}
        <section className="bg-white border border-[#dee2e6]">
          <div className="overflow-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#f9f9f9] border-b border-[#dee2e6]">
                  <th className="w-8 px-2 py-1.5">
                    <input type="checkbox" className="accent-[#714B67] w-3 h-3 align-middle" />
                  </th>
                  <Th>Name</Th>
                  <Th align="right">{data.measure} ({data.unit})</Th>
                  <Th align="right">Share</Th>
                  <Th align="right">Variation (MoM)</Th>
                </tr>
              </thead>
              <tbody>
                {data.rows.map((row, i) => {
                  const sharePct = parseFloat(row.share);
                  const positive = row.trend ? !row.trend.startsWith("-") : true;
                  return (
                    <tr key={i} className="border-b border-[#e7e7e7] hover:bg-[#f1f3f5] cursor-pointer">
                      <td className="w-8 px-2 py-1.5">
                        <input type="checkbox" className="accent-[#714B67] w-3 h-3 align-middle" />
                      </td>
                      <td className="px-3 py-1.5 text-[13px] text-[#212529]">
                        <div className="flex flex-col">
                          <span>{row.name}</span>
                          {row.note && <span className="text-[11px] text-[#6c757d]">{row.note}</span>}
                        </div>
                      </td>
                      <td className="px-3 py-1.5 text-[13px] text-[#212529] text-right tabular-nums">
                        {fmt(row.value)}
                      </td>
                      <td className="px-3 py-1.5 text-[13px] text-[#4c4c4c] text-right">
                        <div className="inline-flex items-center gap-2 justify-end">
                          <div className="w-[60px] h-[10px] bg-[#e7e7e7] rounded-sm overflow-hidden">
                            <div className="h-full bg-[#875A7B]" style={{ width: `${sharePct}%` }} />
                          </div>
                          <span className="tabular-nums w-[42px] text-right">{row.share}</span>
                        </div>
                      </td>
                      <td className="px-3 py-1.5 text-[13px] text-right tabular-nums">
                        {row.trend ? (
                          <span
                            className="inline-flex items-center gap-0.5 font-semibold"
                            style={{ color: positive ? "#5cb85c" : "#f06050" }}
                          >
                            <svg width="9" height="9" viewBox="0 0 10 10" fill="currentColor">
                              {positive ? (
                                <path d="M5 1l4 5H1z" />
                              ) : (
                                <path d="M5 9L1 4h8z" />
                              )}
                            </svg>
                            {row.trend}
                          </span>
                        ) : (
                          <span className="text-[#adb5bd]">—</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
                <tr className="bg-[#f9f9f9] border-t-2 border-[#875A7B]">
                  <td className="w-8" />
                  <td className="px-3 py-1.5 text-[12px] uppercase tracking-wider font-semibold text-[#4c4c4c]">
                    Total
                  </td>
                  <td className="px-3 py-1.5 text-[13px] font-bold text-[#212529] text-right tabular-nums">
                    {fmt(total)}
                  </td>
                  <td className="px-3 py-1.5 text-[13px] font-bold text-[#212529] text-right tabular-nums">
                    100.0%
                  </td>
                  <td />
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>

      {/* 6. Status bar */}
      <footer className="h-[26px] bg-[#fafafa] border-t border-[#dee2e6] flex items-center justify-between px-4 text-[11px] text-[#6c757d] shrink-0">
        <span>{data.subtitle}</span>
        <span className="tabular-nums">
          {data.rows.length} record{data.rows.length === 1 ? "" : "s"} · Last updated just now
        </span>
      </footer>
    </div>
  );
}

function NavIcon({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <button title={label} className="hover:text-white p-1">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        {children}
      </svg>
    </button>
  );
}

function ViewBtn({ icon, active = false }: { icon: "pivot" | "graph" | "list"; active?: boolean }) {
  const cls = active
    ? "bg-white text-[#714B67] border-b-2 border-[#714B67]"
    : "bg-white text-[#6c757d] hover:text-[#212529]";
  return (
    <button className={`px-2 flex items-center justify-center w-[34px] ${cls}`} title={icon}>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        {icon === "pivot" && (
          <>
            <rect x="3" y="3" width="7" height="7" />
            <rect x="14" y="3" width="7" height="7" />
            <rect x="3" y="14" width="7" height="7" />
            <rect x="14" y="14" width="7" height="7" />
          </>
        )}
        {icon === "graph" && (
          <>
            <path d="M3 3v18h18" />
            <path d="M7 14l4-4 3 3 5-7" />
          </>
        )}
        {icon === "list" && (
          <>
            <line x1="8" y1="6" x2="21" y2="6" />
            <line x1="8" y1="12" x2="21" y2="12" />
            <line x1="8" y1="18" x2="21" y2="18" />
            <line x1="3" y1="6" x2="3.01" y2="6" />
            <line x1="3" y1="12" x2="3.01" y2="12" />
            <line x1="3" y1="18" x2="3.01" y2="18" />
          </>
        )}
      </svg>
    </button>
  );
}

function Facet({ category, value }: { category: string; value: string }) {
  return (
    <div className="inline-flex items-stretch border border-[#714B67] rounded-sm overflow-hidden text-[12px] h-[24px]">
      <span className="bg-[#714B67] text-white px-2 flex items-center font-semibold">{category}</span>
      <span className="bg-white text-[#714B67] px-2 flex items-center">{value}</span>
      <button className="text-[#714B67] hover:bg-[#f1f3f5] px-1.5 flex items-center" title="Remove">
        ×
      </button>
    </div>
  );
}

function SearchDropdown({ label, star = false }: { label: string; star?: boolean }) {
  return (
    <button className="text-[12px] text-[#4c4c4c] hover:text-[#212529] flex items-center gap-1 px-2 py-1 rounded-sm hover:bg-[#f1f3f5]">
      {star && (
        <svg width="11" height="11" viewBox="0 0 24 24" fill="#e1a836">
          <path d="M12 2l3 7h7l-5.5 4 2 7L12 16l-6.5 4 2-7L2 9h7z" />
        </svg>
      )}
      {label}
      <svg width="8" height="8" viewBox="0 0 10 10" fill="none">
        <path d="M2 4l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}

function Th({ children, align = "left" }: { children: React.ReactNode; align?: "left" | "right" }) {
  return (
    <th
      className={`px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-[#4c4c4c] ${
        align === "right" ? "text-right" : "text-left"
      }`}
    >
      <span className="inline-flex items-center gap-1">
        {children}
        {align === "right" && <span className="text-[#adb5bd]">↕</span>}
      </span>
    </th>
  );
}
