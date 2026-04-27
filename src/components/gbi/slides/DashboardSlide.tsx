import { Link } from '@tanstack/react-router';
import { ArrowUpRight } from 'lucide-react';
import { ViewContainer } from '../layout/ViewContainer';
import { PivotView } from '../views/PivotView';
import { GraphView } from '../views/GraphView';
import { Card } from '../ui/Card';
import { Stat } from '../ui/Stat';

export const DashboardSlide = ({ view, setView }: any) => {
  const dashboard = (
    <div className="p-6 grid grid-cols-1 md:grid-cols-4 gap-4 h-full overflow-y-auto">
      <Card><Stat label="Total Monthly Revenue" value="BHD 845.2K" trend="12.5%" isUp={true} /></Card>
      <Card><Stat label="Active On-Trade Accounts" value="142" trend="4.1%" isUp={true} /></Card>
      <Card><Stat label="GBI Express Orders" value="2,850" trend="18.3%" isUp={true} /></Card>
      <Card><Stat label="Cases Imported (MTD)" value="18,400" trend="8.0%" isUp={true} /></Card>

      <Card title="Sales by Key On-Trade Account" className="md:col-span-2 h-72">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Click a bar to drill down</span>
          <Link
            to="/drilldown/$widget"
            params={{ widget: 'on-trade-accounts' }}
            className="text-[10px] font-bold uppercase tracking-wider text-[#875A7B] hover:text-[#714B67] flex items-center gap-1"
          >
            Drill down <ArrowUpRight size={11} />
          </Link>
        </div>
        <div className="flex items-end justify-around h-44 gap-4 px-2 bg-gray-50/50 rounded p-4 border border-dashed">
          {[
            { name: 'Gulf Hotel', p: 80, color: '#875A7B' },
            { name: 'Four Seasons', p: 75, color: '#017E84' },
            { name: 'The Ritz', p: 100, color: '#875A7B' },
            { name: 'Intercon', p: 65, color: '#017E84' },
            { name: 'Sofitel', p: 50, color: '#875A7B' }
          ].map((item, i) => (
            <Link
              key={i}
              to="/drilldown/$widget"
              params={{ widget: 'on-trade-accounts' }}
              className="flex-1 flex flex-col items-center gap-2 h-full justify-end group cursor-pointer"
              aria-label={`Drill down: ${item.name}`}
            >
              <div
                className="w-full rounded-t-sm opacity-90 transition-all duration-300 group-hover:opacity-100 group-hover:!bg-[#017E84] group-hover:scale-y-105 origin-bottom shadow-sm"
                style={{ backgroundColor: item.color, height: `${item.p}%` }}
              ></div>
              <span className="text-[9px] text-gray-500 font-bold whitespace-nowrap group-hover:text-[#017E84]">{item.name}</span>
            </Link>
          ))}
        </div>
      </Card>

      <Card title="Revenue Channel Split" className="md:col-span-2 h-72">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Click a channel to drill down</span>
          <Link
            to="/drilldown/$widget"
            params={{ widget: 'revenue-channel' }}
            className="text-[10px] font-bold uppercase tracking-wider text-[#875A7B] hover:text-[#714B67] flex items-center gap-1"
          >
            Drill down <ArrowUpRight size={11} />
          </Link>
        </div>
        <div className="flex items-center justify-center h-full relative gap-6">
          <Link
            to="/drilldown/$widget"
            params={{ widget: 'revenue-channel' }}
            aria-label="Drill down: Revenue Channel Split"
            className="rounded-full transition-all hover:ring-4 hover:ring-[#875A7B]/20"
          >
            <div className="w-32 h-32 rounded-full border-[18px] border-[#875A7B] border-r-[#017E84] border-b-[#f1c40f] shadow-inner" />
          </Link>
          <div className="flex flex-col gap-1">
            {[
              { name: 'On-Trade (Hotels/Bars)', pct: '65%', color: '#875A7B' },
              { name: 'Retail Store', pct: '25%', color: '#017E84' },
              { name: 'GBI Express', pct: '10%', color: '#f1c40f' }
            ].map((c, i) => (
              <Link
                key={i}
                to="/drilldown/$widget"
                params={{ widget: 'revenue-channel' }}
                className="flex items-center gap-2 text-xs font-medium px-2 py-1 rounded hover:bg-[#f1f3f5] transition-colors"
              >
                <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: c.color }} />
                <span className="text-gray-700">{c.name}</span>
                <span className="text-gray-400">({c.pct})</span>
              </Link>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );

  const pivot = (
    <PivotView
      columns={['Spirits Revenue', 'Beer Revenue', 'Wine Revenue']}
      rows={[
        { name: 'On-Trade (Hotels & Bars)', values: [285000, 142000, 115000] },
        { name: 'Retail Store', values: [120000, 45000, 32000] },
        { name: 'GBI Express (Home Delivery)', values: [45000, 18000, 22000] },
        { name: 'Corporate Events / Private', values: [15000, 8000, 12000] }
      ]}
      measure="Wholesale Sales (BHD)"
    />
  );

  const graph = (
    <GraphView
      title="GBI Wholesale Revenue Trend"
      data={[
        { label: 'Jan', value: 'BHD 710K', percent: 65, breakdown: [
          { name: 'On-Trade (Hotels & Bars)', value: 462000, secondary: '65%' },
          { name: 'Retail Store', value: 177500, secondary: '25%' },
          { name: 'GBI Express', value: 70500, secondary: '10%' }
        ]},
        { label: 'Feb', value: 'BHD 735K', percent: 75, breakdown: [
          { name: 'On-Trade (Hotels & Bars)', value: 477750, secondary: '65%' },
          { name: 'Retail Store', value: 183750, secondary: '25%' },
          { name: 'GBI Express', value: 73500, secondary: '10%' }
        ]},
        { label: 'Mar', value: 'BHD 845K', percent: 85, breakdown: [
          { name: 'On-Trade (Hotels & Bars)', value: 549250, secondary: '65%' },
          { name: 'Retail Store', value: 211250, secondary: '25%' },
          { name: 'GBI Express', value: 84500, secondary: '10%' }
        ]},
        { label: 'Apr (Est)', value: 'BHD 920K', percent: 95, breakdown: [
          { name: 'On-Trade (Hotels & Bars)', value: 598000, secondary: '65%', note: 'Driven by F1 hospitality contracts' },
          { name: 'Retail Store', value: 230000, secondary: '25%' },
          { name: 'GBI Express', value: 92000, secondary: '10%', note: 'Online channel +18% MoM' }
        ]}
      ]}
    />
  );

  return <ViewContainer title="GBI Distribution Analytics" view={view} setView={setView} dashboard={dashboard} pivot={pivot} graph={graph} />;
};
