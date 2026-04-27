import { BarChart as BarIcon, LineChart as LineIcon, PieChart as PieIcon, Filter, X, ChevronRight } from 'lucide-react';
import { useState } from 'react';

type ChartType = 'bar' | 'line' | 'pie';

type BreakdownRow = {
  name: string;
  value: number | string;
  secondary?: number | string;
  note?: string;
};

type GraphDatum = {
  label: string;
  value: string;
  percent: number;
  breakdown?: BreakdownRow[];
};

const COLORS = ['#875A7B', '#017E84', '#F0B400', '#E94B3C', '#3C7DD9', '#6BB87B'];

const fmt = (v: number | string) =>
  typeof v === 'number' ? new Intl.NumberFormat('en-US').format(v) : v;

export const GraphView = ({ title, data }: { title: string; data: GraphDatum[] }) => {
  const [chart, setChart] = useState<ChartType>('bar');
  const [selected, setSelected] = useState<number | null>(null);

  const switchChart = (c: ChartType) => {
    setChart(c);
    setSelected(null);
  };

  const toggleSelect = (i: number) => setSelected((cur) => (cur === i ? null : i));

  const buttonCls = (type: ChartType) =>
    chart === type
      ? 'p-1 bg-white shadow rounded text-[#875A7B]'
      : 'p-1 hover:bg-gray-200 rounded text-gray-400';

  return (
    <div className="h-full flex flex-col bg-white">
      <div className="flex justify-between items-center px-6 pt-6 pb-4 shrink-0">
        <div className="flex gap-1 border rounded p-1 bg-gray-50">
          <button onClick={() => switchChart('bar')} className={buttonCls('bar')} aria-label="Bar chart"><BarIcon size={16} /></button>
          <button onClick={() => switchChart('line')} className={buttonCls('line')} aria-label="Line chart"><LineIcon size={16} /></button>
          <button onClick={() => switchChart('pie')} className={buttonCls('pie')} aria-label="Pie chart"><PieIcon size={16} /></button>
        </div>
        <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest">{title} Analysis</h3>
        <div className="flex gap-2">
          <button className="text-xs border px-2 py-1 rounded bg-gray-50 flex items-center gap-1"><Filter size={12} /> Filter</button>
        </div>
      </div>

      <div className="flex-1 min-h-0 flex flex-col px-6">
        <div className="flex-1 min-h-0 flex flex-col">
          {chart === 'bar' && <BarChart data={data} selected={selected} onSelect={toggleSelect} />}
          {chart === 'line' && <LineChart data={data} selected={selected} onSelect={toggleSelect} />}
          {chart === 'pie' && <PieChart data={data} selected={selected} onSelect={toggleSelect} />}
        </div>

        {selected !== null && data[selected] && (
          <OdooDrillDown
            title={title}
            datum={data[selected]}
            onClose={() => setSelected(null)}
          />
        )}
      </div>
    </div>
  );
};

/* ---------------- Charts ---------------- */

type ChartProps = {
  data: GraphDatum[];
  selected: number | null;
  onSelect: (i: number) => void;
};

const BarChart = ({ data, selected, onSelect }: ChartProps) => (
  <div className="flex-1 flex items-end justify-around gap-6 px-10 pb-12 pt-6 border-b border-l relative ml-10 mb-2 bg-gray-50/30 rounded-br">
    <div className="absolute left-[-45px] top-0 h-full flex flex-col justify-between text-[10px] text-gray-400 items-end py-1">
      <span>100%</span><span>75%</span><span>50%</span><span>25%</span><span>0%</span>
    </div>
    {data.map((item, i) => {
      const isSel = selected === i;
      const dim = selected !== null && !isSel;
      return (
        <div key={i} className="flex-1 flex flex-col items-center group relative h-full justify-end">
          <button
            type="button"
            onClick={() => onSelect(i)}
            aria-pressed={isSel}
            className={`w-full rounded-t-sm transition-all duration-300 cursor-pointer shadow-sm focus:outline-none ${
              isSel
                ? 'bg-[#017E84] ring-1 ring-[#015a5f]'
                : 'bg-[#875A7B] group-hover:bg-[#017E84]'
            } ${dim ? 'opacity-50' : ''}`}
            style={{ height: `${item.percent}%` }}
          >
            <div className="absolute top-[-30px] left-1/2 -translate-x-1/2 bg-gray-800 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 shadow-lg pointer-events-none">
              {item.label}: {item.value}
            </div>
          </button>
          <span className="absolute bottom-[-35px] text-[10px] text-gray-500 font-bold whitespace-nowrap">
            {item.label}
          </span>
        </div>
      );
    })}
  </div>
);

const LineChart = ({ data, selected, onSelect }: ChartProps) => {
  const width = 600;
  const height = 280;
  const padding = 40;
  const stepX = data.length > 1 ? (width - padding * 2) / (data.length - 1) : 0;
  const points = data.map((d, i) => {
    const x = padding + i * stepX;
    const y = height - padding - (d.percent / 100) * (height - padding * 2);
    return { x, y, ...d };
  });
  const path = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
  const last = points[points.length - 1];
  const first = points[0];
  const areaPath = `${path} L ${last.x} ${height - padding} L ${first.x} ${height - padding} Z`;

  return (
    <div className="flex-1 flex items-center justify-center mb-2">
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full max-h-[320px]">
        {[0, 25, 50, 75, 100].map((tick) => {
          const y = height - padding - (tick / 100) * (height - padding * 2);
          return (
            <g key={tick}>
              <line x1={padding} y1={y} x2={width - padding} y2={y} stroke="#e5e7eb" strokeDasharray="3 3" />
              <text x={padding - 8} y={y + 3} textAnchor="end" fontSize="10" fill="#9ca3af">{tick}%</text>
            </g>
          );
        })}
        <path d={areaPath} fill="#875A7B" fillOpacity="0.1" />
        <path d={path} fill="none" stroke="#875A7B" strokeWidth="2.5" />
        {points.map((p, i) => {
          const isSel = selected === i;
          return (
            <g key={i}>
              {isSel && <circle cx={p.x} cy={p.y} r="10" fill="#017E84" fillOpacity="0.18" />}
              <circle
                cx={p.x}
                cy={p.y}
                r={isSel ? 7 : 5}
                fill={isSel ? '#017E84' : '#875A7B'}
                stroke={isSel ? '#ffffff' : 'none'}
                strokeWidth={isSel ? 2 : 0}
                className="hover:fill-[#017E84] cursor-pointer"
                onClick={() => onSelect(i)}
              />
              <text x={p.x} y={height - padding + 18} textAnchor="middle" fontSize="10" fill="#6b7280" fontWeight="bold">{p.label}</text>
              <title>{p.label}: {p.value}</title>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

const PieChart = ({ data, selected, onSelect }: ChartProps) => {
  const total = data.reduce((sum, d) => sum + d.percent, 0) || 1;
  const cx = 110, cy = 110, r = 100;
  let cumulative = 0;
  const slices = data.map((d, i) => {
    const startA = (cumulative / total) * Math.PI * 2 - Math.PI / 2;
    cumulative += d.percent;
    const endA = (cumulative / total) * Math.PI * 2 - Math.PI / 2;
    const midA = (startA + endA) / 2;
    const x1 = cx + r * Math.cos(startA);
    const y1 = cy + r * Math.sin(startA);
    const x2 = cx + r * Math.cos(endA);
    const y2 = cy + r * Math.sin(endA);
    const largeArc = endA - startA > Math.PI ? 1 : 0;
    const path = `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2} Z`;
    const dx = Math.cos(midA) * 8;
    const dy = Math.sin(midA) * 8;
    return { path, color: COLORS[i % COLORS.length], pct: ((d.percent / total) * 100).toFixed(0), dx, dy, ...d };
  });

  return (
    <div className="flex-1 flex items-center justify-center gap-10 mb-2 px-6">
      <svg viewBox="0 0 220 220" className="w-[260px] h-[260px]">
        {slices.map((s, i) => {
          const isSel = selected === i;
          return (
            <path
              key={i}
              d={s.path}
              fill={s.color}
              stroke="white"
              strokeWidth={isSel ? 3 : 2}
              transform={isSel ? `translate(${s.dx}, ${s.dy})` : undefined}
              className="hover:opacity-80 cursor-pointer transition-transform"
              onClick={() => onSelect(i)}
              opacity={selected !== null && !isSel ? 0.55 : 1}
            >
              <title>{s.label}: {s.value} ({s.pct}%)</title>
            </path>
          );
        })}
      </svg>
      <div className="flex flex-col gap-2">
        {slices.map((s, i) => {
          const isSel = selected === i;
          return (
            <button
              key={i}
              type="button"
              onClick={() => onSelect(i)}
              className={`flex items-center gap-2 text-xs text-left px-1 py-0.5 rounded ${
                isSel ? 'bg-[#f1f3f5]' : 'hover:bg-gray-50'
              }`}
            >
              <span className="w-3 h-3 rounded-sm" style={{ backgroundColor: s.color }} />
              <span className={`font-bold ${isSel ? 'text-[#017E84]' : 'text-gray-700'}`}>{s.label}</span>
              <span className="text-gray-400">{s.pct}%</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

/* ---------------- Odoo-styled drill-down ---------------- */

const OdooDrillDown = ({
  title,
  datum,
  onClose,
}: {
  title: string;
  datum: GraphDatum;
  onClose: () => void;
}) => {
  const rows: BreakdownRow[] =
    datum.breakdown && datum.breakdown.length > 0
      ? datum.breakdown
      : [{ name: datum.label, value: datum.value, secondary: `${datum.percent}%` }];

  const hasSecondary = rows.some((r) => r.secondary !== undefined);

  // Try to compute numeric total for the value column
  const numericValues = rows
    .map((r) => (typeof r.value === 'number' ? r.value : null))
    .filter((v): v is number => v !== null);
  const showTotal = numericValues.length === rows.length && rows.length > 1;
  const valueTotal = showTotal ? numericValues.reduce((a, b) => a + b, 0) : null;

  const numericSecondary = rows
    .map((r) => (typeof r.secondary === 'number' ? r.secondary : null))
    .filter((v): v is number => v !== null);
  const showSecondaryTotal = hasSecondary && numericSecondary.length === rows.length && rows.length > 1;
  const secondaryTotal = showSecondaryTotal ? numericSecondary.reduce((a, b) => a + b, 0) : null;

  return (
    <div className="border-t-2 border-[#dee2e6] bg-white shrink-0 mt-2 -mx-6">
      {/* Odoo breadcrumb / action bar */}
      <div className="flex items-center justify-between bg-[#f8f9fa] border-b border-[#dee2e6] px-4 h-8">
        <div className="flex items-center gap-1 text-[12px] text-[#4c4c4c]">
          <span className="font-semibold uppercase tracking-wide text-[10px] text-gray-500 mr-1">Group:</span>
          <span>{title}</span>
          <ChevronRight size={12} className="text-[#875A7B]" />
          <span className="font-semibold text-[#212529]">{datum.label}</span>
          <span className="ml-2 text-[11px] text-gray-400">({datum.value})</span>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close drill-down"
          className="p-1 rounded hover:bg-[#e9ecef] text-[#4c4c4c]"
        >
          <X size={14} />
        </button>
      </div>

      {/* Odoo list view */}
      <div className="max-h-64 overflow-auto">
        <table className="w-full border-collapse">
          <thead className="bg-[#f8f9fa] sticky top-0">
            <tr className="border-b border-[#dee2e6]">
              <th className="text-left px-4 py-2 text-[11px] font-semibold uppercase tracking-wide text-[#4c4c4c]">
                Name
              </th>
              <th className="text-right px-4 py-2 text-[11px] font-semibold uppercase tracking-wide text-[#4c4c4c] tabular-nums">
                Value
              </th>
              {hasSecondary && (
                <th className="text-right px-4 py-2 text-[11px] font-semibold uppercase tracking-wide text-[#4c4c4c] tabular-nums">
                  Secondary
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i} className="border-b border-[#dee2e6] hover:bg-[#f1f3f5]">
                <td className="px-4 py-1.5 text-[13px] text-[#212529]">
                  <div>{row.name}</div>
                  {row.note && <div className="text-[11px] text-gray-500">{row.note}</div>}
                </td>
                <td className="px-4 py-1.5 text-[13px] text-[#212529] text-right tabular-nums">
                  {fmt(row.value)}
                </td>
                {hasSecondary && (
                  <td className="px-4 py-1.5 text-[13px] text-[#212529] text-right tabular-nums">
                    {row.secondary !== undefined ? fmt(row.secondary) : ''}
                  </td>
                )}
              </tr>
            ))}
            {(showTotal || showSecondaryTotal) && (
              <tr className="bg-[#fafafa] border-t-2 border-[#dee2e6]">
                <td className="px-4 py-1.5 text-[12px] font-semibold uppercase tracking-wide text-[#4c4c4c]">
                  Total
                </td>
                <td className="px-4 py-1.5 text-[13px] font-semibold text-[#212529] text-right tabular-nums">
                  {showTotal ? fmt(valueTotal as number) : ''}
                </td>
                {hasSecondary && (
                  <td className="px-4 py-1.5 text-[13px] font-semibold text-[#212529] text-right tabular-nums">
                    {showSecondaryTotal ? fmt(secondaryTotal as number) : ''}
                  </td>
                )}
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
