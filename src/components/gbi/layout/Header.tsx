import { LayoutDashboard, Grid, BarChart3, Search } from 'lucide-react';

export const Header = ({ title, activeView, setView }: any) => (
  <div className="flex items-center justify-between px-6 py-3 border-b bg-white shrink-0">
    <div className="flex items-center gap-3">
      <div className="bg-[#875A7B] p-1.5 rounded-lg text-white">
        <LayoutDashboard size={20} />
      </div>
      <h2 className="font-semibold text-lg text-gray-800">{title}</h2>
    </div>
    <div className="flex items-center gap-4 text-sm text-gray-500">
      <div className="flex bg-gray-100 rounded-md p-1 border">
        {[
          { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
          { id: 'pivot', label: 'Pivot', icon: Grid },
          { id: 'graph', label: 'Graph', icon: BarChart3 }
        ].map((v) => (
          <button
            key={v.id}
            onClick={() => setView(v.id)}
            className={`px-3 py-1 flex items-center gap-2 rounded transition-all ${
              activeView === v.id
                ? 'bg-white shadow-sm font-medium text-[#875A7B]'
                : 'hover:text-gray-800'
            }`}
          >
            <v.icon size={14} />
            {v.label}
          </button>
        ))}
      </div>
      <div className="flex gap-2">
        <div className="relative">
          <Search size={16} className="absolute left-2 top-2 text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            className="pl-8 pr-4 py-1.5 border rounded text-xs bg-gray-50 focus:outline-none focus:ring-1 focus:ring-[#875A7B]"
          />
        </div>
      </div>
    </div>
  </div>
);
