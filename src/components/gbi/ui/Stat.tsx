import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

export const Stat = ({ label, value, trend, isUp }: any) => (
  <div className="flex flex-col">
    <span className="text-xs text-gray-500 mb-1">{label}</span>
    <div className="flex items-end gap-2">
      <span className="text-2xl font-bold text-gray-800 leading-none">{value}</span>
      {trend && (
        <span className={`text-xs font-bold flex items-center ${isUp ? 'text-green-600' : 'text-red-600'}`}>
          {isUp ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
          {trend}
        </span>
      )}
    </div>
  </div>
);
