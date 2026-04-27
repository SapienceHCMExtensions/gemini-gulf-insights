import { BarChart as BarIcon, LineChart as LineIcon, PieChart as PieIcon, Filter } from 'lucide-react';
import { useState } from 'react';

type ChartType = 'bar' | 'line' | 'pie';

const COLORS = ['#875A7B', '#017E84', '#F0B400', '#E94B3C', '#3C7DD9', '#6BB87B'];

export const GraphView = ({ title, data }: any) => {
  const [chart, setChart] = useState<ChartType>('bar');

  const buttonCls = (type: ChartType) =>
    chart === type
      ? 'p-1 bg-white shadow rounded text-[#875A7B]'
      : 'p-1 hover:bg-gray-200 rounded text-gray-400';

  return (
    <div className="p-6 h-full flex flex-col bg-white">
      <div className="flex justify-between items-center mb-6 shrink-0">
        <div className="flex gap-1 border rounded p-1 bg-gray-50">
          <button onClick={() => setChart('bar')} className={buttonCls('bar')} aria-label="Bar chart"><BarIcon size={16} /></button>
          <button onClick={() => setChart('line')} className={buttonCls('line')} aria-label="Line chart"><LineIcon size={16} /></button>
          <button onClick={() => setChart('pie')} className={buttonCls('pie')} aria-label="Pie chart"><PieIcon size={16} /></button>
        </div>
        <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest">{title} Analysis</h3>
        <div className="flex gap-2">
          <button className="text-xs border px-2 py-1 rounded bg-gray-50 flex items-center gap-1"><Filter size={12}/> Filter</button>
        </div>
      </div>

      {chart === 'bar' && <BarChart data={data} />}
      {chart === 'line' && <LineChart data={data} />}
      {chart === 'pie' && <PieChart data={data} />}
    </div>
  );
};

const BarChart = ({ data }: any) => (
  <div className="flex-1 flex items-end justify-around gap-6 px-10 pb-12 pt-10 border-b border-l relative ml-10 mb-6 bg-gray-50/30 rounded-br">
    <div className="absolute left-[-45px] top-0 h-full flex flex-col justify-between text-[10px] text-gray-400 items-end py-1">
      <span>100%</span><span>75%</span><span>50%</span><span>25%</span><span>0%</span>
    </div>
    {data.map((item: any, i: number) => (
      <div key={i} className="flex-1 flex flex-col items-center group relative h-full justify-end">
        <div
          className="w-full bg-[#875A7B] rounded-t-sm transition-all duration-700 group-hover:bg-[#017E84] cursor-pointer shadow-sm"
          style={{ height: `${item.percent}%` }}
        >
          <div className="absolute top-[-30px] left-1/2 -translate-x-1/2 bg-gray-800 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 shadow-lg">
            {item.label}: {item.value}
          </div>
        </div>
        <span className="absolute bottom-[-35px] text-[10px] text-gray-500 font-bold whitespace-nowrap">
          {item.label}
        </span>
      </div>
    ))}
  </div>
);

const LineChart = ({ data }: any) => {
  const width = 600;
  const height = 280;
  const padding = 40;
  const stepX = data.length > 1 ? (width - padding * 2) / (data.length - 1) : 0;
  const points = data.map((d: any, i: number) => {
    const x = padding + i * stepX;
    const y = height - padding - (d.percent / 100) * (height - padding * 2);
    return { x, y, ...d };
  });
  const path = points.map((p: any, i: number) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
  const last = points[points.length - 1];
  const first = points[0];
  const areaPath = `${path} L ${last.x} ${height - padding} L ${first.x} ${height - padding} Z`;

  return (
    <div className="flex-1 flex items-center justify-center mb-6">
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
        {points.map((p: any, i: number) => (
          <g key={i}>
            <circle cx={p.x} cy={p.y} r="5" fill="#875A7B" className="hover:fill-[#017E84] cursor-pointer" />
            <text x={p.x} y={height - padding + 18} textAnchor="middle" fontSize="10" fill="#6b7280" fontWeight="bold">{p.label}</text>
            <title>{p.label}: {p.value}</title>
          </g>
        ))}
      </svg>
    </div>
  );
};

const PieChart = ({ data }: any) => {
  const total = data.reduce((sum: number, d: any) => sum + d.percent, 0) || 1;
  const cx = 110, cy = 110, r = 100;
  let cumulative = 0;
  const slices = data.map((d: any, i: number) => {
    const start = (cumulative / total) * Math.PI * 2 - Math.PI / 2;
    cumulative += d.percent;
    const end = (cumulative / total) * Math.PI * 2 - Math.PI / 2;
    const x1 = cx + r * Math.cos(start);
    const y1 = cy + r * Math.sin(start);
    const x2 = cx + r * Math.cos(end);
    const y2 = cy + r * Math.sin(end);
    const largeArc = end - start > Math.PI ? 1 : 0;
    const path = `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2} Z`;
    return { path, color: COLORS[i % COLORS.length], pct: ((d.percent / total) * 100).toFixed(0), ...d };
  });

  return (
    <div className="flex-1 flex items-center justify-center gap-10 mb-6 px-6">
      <svg viewBox="0 0 220 220" className="w-[260px] h-[260px]">
        {slices.map((s: any, i: number) => (
          <path key={i} d={s.path} fill={s.color} stroke="white" strokeWidth="2" className="hover:opacity-80 cursor-pointer">
            <title>{s.label}: {s.value} ({s.pct}%)</title>
          </path>
        ))}
      </svg>
      <div className="flex flex-col gap-2">
        {slices.map((s: any, i: number) => (
          <div key={i} className="flex items-center gap-2 text-xs">
            <span className="w-3 h-3 rounded-sm" style={{ backgroundColor: s.color }} />
            <span className="font-bold text-gray-700">{s.label}</span>
            <span className="text-gray-400">{s.pct}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};
