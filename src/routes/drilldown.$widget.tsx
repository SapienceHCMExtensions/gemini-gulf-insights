import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ChevronRight, LayoutDashboard, Download, Filter, Search, X } from "lucide-react";

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
          { title: `${loaderData.title} — Drill-Down | GBI` },
          { name: "description", content: loaderData.subtitle }
        ]
      : []
  }),
  component: DrillDownPage,
  errorComponent: ({ error, reset }) => (
    <div className="min-h-screen flex items-center justify-center bg-[#f8f9fa] px-4">
      <div className="max-w-md text-center bg-white border border-[#dee2e6] rounded p-6">
        <h1 className="text-lg font-semibold text-[#212529] mb-2">Something went wrong</h1>
        <p className="text-sm text-[#6c757d] mb-4">{error.message}</p>
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={reset}
            className="text-xs border border-[#dee2e6] px-3 py-1.5 rounded bg-white hover:bg-[#f1f3f5] text-[#4c4c4c]"
          >
            Retry
          </button>
          <Link
            to="/"
            className="text-xs bg-[#875A7B] hover:bg-[#714B67] text-white px-3 py-1.5 rounded font-semibold"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  ),
  notFoundComponent: () => (
    <div className="min-h-screen flex items-center justify-center bg-[#f8f9fa]">
      <div className="text-center">
        <h1 className="text-xl font-bold text-[#212529] mb-2">Drill-down not found</h1>
        <Link to="/" className="text-[#875A7B] hover:underline text-sm font-semibold">
          ← Back to GBI Distribution Analytics
        </Link>
      </div>
    </div>
  )
});

function DrillDownPage() {
  const data = Route.useLoaderData();
  const max = Math.max(...data.rows.map((r) => r.value));
  const total = data.rows.reduce((acc, r) => acc + r.value, 0);
  const fmt = (n: number) => new Intl.NumberFormat("en-US").format(n);

  return (
    <div className="min-h-screen bg-[#f8f9fa] flex flex-col">
      {/* Odoo top bar */}
      <div className="bg-[#714B67] text-white px-4 h-11 flex items-center justify-between shrink-0 shadow">
        <div className="flex items-center gap-3">
          <div className="bg-white/15 p-1 rounded text-white">
            <LayoutDashboard size={16} />
          </div>
          <span className="text-[13px] font-semibold tracking-wide">Sales Analytics</span>
        </div>
        <div className="flex items-center gap-3 text-white/80">
          <Search size={14} />
          <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center text-[11px] font-bold">
            SA
          </div>
        </div>
      </div>

      {/* Breadcrumb / action bar */}
      <div className="bg-white border-b border-[#dee2e6] px-6 py-3 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2 text-[13px]">
          <Link
            to="/"
            className="flex items-center gap-1.5 text-[#875A7B] hover:text-[#714B67] font-semibold"
          >
            <ArrowLeft size={14} />
            {data.parent}
          </Link>
          <ChevronRight size={14} className="text-gray-400" />
          <span className="text-[#4c4c4c]">Drill-Down</span>
          <ChevronRight size={14} className="text-gray-400" />
          <span className="text-[#212529] font-semibold">{data.title}</span>
        </div>
        <div className="flex items-center gap-2">
          <button className="text-xs border border-[#dee2e6] px-3 py-1.5 rounded bg-white hover:bg-[#f1f3f5] flex items-center gap-1.5 text-[#4c4c4c]">
            <Filter size={12} /> Filters
          </button>
          <button className="text-xs border border-[#dee2e6] px-3 py-1.5 rounded bg-white hover:bg-[#f1f3f5] flex items-center gap-1.5 text-[#4c4c4c]">
            <Download size={12} /> Export
          </button>
          <Link
            to="/"
            className="text-xs border border-[#dee2e6] px-2 py-1.5 rounded bg-white hover:bg-[#f1f3f5] text-[#4c4c4c]"
            aria-label="Close drill-down"
          >
            <X size={14} />
          </Link>
        </div>
      </div>

      {/* Header */}
      <div className="px-6 pt-6 pb-4 shrink-0">
        <h1 className="text-[22px] font-semibold text-[#212529] tracking-tight">{data.title}</h1>
        <p className="text-[13px] text-[#6c757d] mt-1">{data.subtitle}</p>
      </div>

      {/* Body */}
      <div className="flex-1 px-6 pb-10 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white border border-[#dee2e6] rounded">
          <div className="px-4 h-9 flex items-center justify-between bg-[#f8f9fa] border-b border-[#dee2e6]">
            <span className="text-[11px] font-semibold uppercase tracking-wide text-[#4c4c4c]">
              {data.measure} ({data.unit})
            </span>
            <span className="text-[11px] text-[#6c757d]">Total: {fmt(total)} {data.unit}</span>
          </div>
          <div className="p-6">
            <div className="space-y-3">
              {data.rows.map((row, i) => {
                const pct = (row.value / max) * 100;
                return (
                  <div key={i}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[12px] text-[#212529] font-medium">{row.name}</span>
                      <span className="text-[12px] text-[#4c4c4c] tabular-nums">
                        {fmt(row.value)} {data.unit}
                        <span className="text-[#6c757d] ml-2">({row.share})</span>
                      </span>
                    </div>
                    <div className="h-5 bg-[#f1f3f5] rounded-sm overflow-hidden">
                      <div
                        className="h-full bg-[#875A7B] hover:bg-[#017E84] transition-colors"
                        style={{ width: `${pct}%` }}
                        title={`${row.name}: ${fmt(row.value)} ${data.unit}`}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="bg-white border border-[#dee2e6] rounded">
          <div className="px-4 h-9 flex items-center bg-[#f8f9fa] border-b border-[#dee2e6]">
            <span className="text-[11px] font-semibold uppercase tracking-wide text-[#4c4c4c]">Summary</span>
          </div>
          <div className="p-4 space-y-3 text-[13px]">
            <SummaryRow label="Records" value={String(data.rows.length)} />
            <SummaryRow label={`Total ${data.measure}`} value={`${fmt(total)} ${data.unit}`} highlight />
            <SummaryRow
              label="Top Contributor"
              value={data.rows.reduce((a, b) => (a.value > b.value ? a : b)).name}
            />
            <SummaryRow
              label="Avg per Record"
              value={`${fmt(Math.round(total / data.rows.length))} ${data.unit}`}
            />
          </div>
        </div>

        <div className="lg:col-span-3 bg-white border border-[#dee2e6] rounded">
          <div className="px-4 h-9 flex items-center justify-between bg-[#f8f9fa] border-b border-[#dee2e6]">
            <span className="text-[11px] font-semibold uppercase tracking-wide text-[#4c4c4c]">
              Breakdown
            </span>
            <span className="text-[11px] text-[#6c757d]">{data.rows.length} records</span>
          </div>
          <div className="overflow-auto">
            <table className="w-full border-collapse">
              <thead className="bg-[#f8f9fa]">
                <tr className="border-b border-[#dee2e6]">
                  <Th>Name</Th>
                  <Th align="right">{data.measure} ({data.unit})</Th>
                  <Th align="right">Share</Th>
                  <Th align="right">Trend (MoM)</Th>
                </tr>
              </thead>
              <tbody>
                {data.rows.map((row, i) => (
                  <tr key={i} className="border-b border-[#dee2e6] hover:bg-[#f1f3f5]">
                    <td className="px-4 py-2 text-[13px] text-[#212529]">
                      <div className="font-medium">{row.name}</div>
                      {row.note && <div className="text-[11px] text-[#6c757d]">{row.note}</div>}
                    </td>
                    <td className="px-4 py-2 text-[13px] text-[#212529] text-right tabular-nums">
                      {fmt(row.value)}
                    </td>
                    <td className="px-4 py-2 text-[13px] text-[#4c4c4c] text-right tabular-nums">
                      {row.share}
                    </td>
                    <td className="px-4 py-2 text-[13px] text-right tabular-nums">
                      {row.trend ? (
                        <span
                          className={
                            row.trend.startsWith("-")
                              ? "text-[#E94B3C] font-semibold"
                              : "text-[#2ecc71] font-semibold"
                          }
                        >
                          {row.trend}
                        </span>
                      ) : (
                        <span className="text-[#adb5bd]">—</span>
                      )}
                    </td>
                  </tr>
                ))}
                <tr className="bg-[#fafafa] border-t-2 border-[#dee2e6]">
                  <td className="px-4 py-2 text-[12px] font-semibold uppercase tracking-wide text-[#4c4c4c]">
                    Total
                  </td>
                  <td className="px-4 py-2 text-[13px] font-semibold text-[#212529] text-right tabular-nums">
                    {fmt(total)}
                  </td>
                  <td className="px-4 py-2 text-[13px] font-semibold text-[#212529] text-right">
                    100.0%
                  </td>
                  <td />
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="px-6 py-4 border-t border-[#dee2e6] bg-white flex items-center justify-between shrink-0">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-white bg-[#875A7B] hover:bg-[#714B67] px-4 py-2 rounded transition-colors"
        >
          <ArrowLeft size={14} />
          Back to {data.parent}
        </Link>
        <span className="text-[11px] text-[#6c757d]">
          Odoo Sales Analytics · Drill-down view
        </span>
      </div>
    </div>
  );
}

function Th({ children, align = "left" }: { children: React.ReactNode; align?: "left" | "right" }) {
  return (
    <th
      className={`px-4 py-2 text-[11px] font-semibold uppercase tracking-wide text-[#4c4c4c] ${
        align === "right" ? "text-right" : "text-left"
      }`}
    >
      {children}
    </th>
  );
}

function SummaryRow({
  label,
  value,
  highlight = false
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div className="flex items-center justify-between border-b border-[#f1f3f5] last:border-0 pb-2 last:pb-0">
      <span className="text-[12px] text-[#6c757d] uppercase tracking-wide font-semibold">
        {label}
      </span>
      <span
        className={`text-[13px] tabular-nums ${
          highlight ? "font-bold text-[#017E84]" : "text-[#212529] font-medium"
        }`}
      >
        {value}
      </span>
    </div>
  );
}
