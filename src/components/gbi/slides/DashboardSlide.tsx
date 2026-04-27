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
        <div className="flex items-end justify-around h-48 gap-4 px-2 mt-4 bg-gray-50/50 rounded p-4 border border-dashed">
          {[
            { name: 'Gulf Hotel', p: 80, color: '#875A7B' },
            { name: 'Four Seasons', p: 75, color: '#017E84' },
            { name: 'The Ritz', p: 100, color: '#875A7B' },
            { name: 'Intercon', p: 65, color: '#017E84' },
            { name: 'Sofitel', p: 50, color: '#875A7B' }
          ].map((item, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
              <div
                className="w-full rounded-t-sm opacity-90 transition-all duration-500 group-hover:opacity-100 shadow-sm"
                style={{ backgroundColor: item.color, height: `${item.p}%` }}
              ></div>
              <span className="text-[9px] text-gray-500 font-bold whitespace-nowrap">{item.name}</span>
            </div>
          ))}
        </div>
      </Card>

      <Card title="Revenue Channel Split" className="md:col-span-2 h-72">
        <div className="flex items-center justify-center h-full relative">
          <div className="w-36 h-36 rounded-full border-[20px] border-[#875A7B] border-r-[#017E84] border-b-[#f1c40f] shadow-inner"></div>
          <div className="absolute flex flex-col gap-2 ml-44">
            <div className="flex items-center gap-2 text-xs font-medium"><div className="w-3 h-3 bg-[#875A7B] rounded-sm"></div> On-Trade (Hotels/Bars) (65%)</div>
            <div className="flex items-center gap-2 text-xs font-medium"><div className="w-3 h-3 bg-[#017E84] rounded-sm"></div> Retail Store (25%)</div>
            <div className="flex items-center gap-2 text-xs font-medium"><div className="w-3 h-3 bg-[#f1c40f] rounded-sm"></div> GBI Express (10%)</div>
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
        { label: 'Jan', value: '710K', percent: 65 },
        { label: 'Feb', value: '735K', percent: 75 },
        { label: 'Mar', value: '845K', percent: 85 },
        { label: 'Apr (Est)', value: '920K', percent: 95 }
      ]}
    />
  );

  return <ViewContainer title="GBI Distribution Analytics" view={view} setView={setView} dashboard={dashboard} pivot={pivot} graph={graph} />;
};
