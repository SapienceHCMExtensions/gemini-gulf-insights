import { BarChart, LineChart, PieChart, Filter } from 'lucide-react';

export const GraphView = ({ title, data }: any) => (
  <div className="p-6 h-full flex flex-col bg-white">
    <div className="flex justify-between items-center mb-6 shrink-0">
      <div className="flex gap-1 border rounded p-1 bg-gray-50">
        <button className="p-1 bg-white shadow rounded text-[#875A7B]"><BarChart size={16} /></button>
        <button className="p-1 hover:bg-gray-200 rounded text-gray-400"><LineChart size={16} /></button>
        <button className="p-1 hover:bg-gray-200 rounded text-gray-400"><PieChart size={16} /></button>
      </div>
      <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest">{title} Analysis</h3>
      <div className="flex gap-2">
        <button className="text-xs border px-2 py-1 rounded bg-gray-50 flex items-center gap-1"><Filter size={12}/> Filter</button>
      </div>
    </div>
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
  </div>
);
