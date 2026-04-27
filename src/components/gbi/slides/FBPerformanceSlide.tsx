import { useState } from 'react';
import { Sparkles, Wine, Package, TrendingUp } from 'lucide-react';
import { ViewContainer } from '../layout/ViewContainer';
import { PivotView } from '../views/PivotView';
import { GraphView } from '../views/GraphView';
import { Card } from '../ui/Card';
import { callGemini } from '../lib/gemini';

export const FBPerformanceSlide = ({ view, setView }: any) => {
  const [fbInsight, setFbInsight] = useState("");
  const [loadingFb, setLoadingFb] = useState(false);

  const handleAnalyze = async () => {
    setLoadingFb(true);
    const prompt = `Act as an alcohol wholesale distributor in Bahrain analyzing key account purchasing. Analyze these on-trade accounts: McGettigan's (1240 cases, BHD 15.2k spirits), JJ's (980 cases, BHD 11.5k spirits), Sherlock Holmes (450 cases, BHD 6.8k spirits), CUT Lounge (310 cases, BHD 9.4k spirits). Provide a 2-sentence insight on account growth and premiumization trends based on volume vs revenue.`;
    const response = await callGemini(prompt);
    setFbInsight(response);
    setLoadingFb(false);
  };

  const dashboard = (
    <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6 h-full overflow-y-auto">
      <Card title="On-Trade Account Sales (Last 30 Days)" className="md:col-span-2">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs text-gray-500">Top Performing Venues / Bars</span>
          <button onClick={handleAnalyze} className="text-xs bg-purple-100 text-[#875A7B] px-2 py-1 rounded font-bold hover:bg-purple-200 transition-colors flex items-center gap-1"><Sparkles size={12} /> AI Analysis</button>
        </div>
        {loadingFb && <div className="text-xs text-[#875A7B] animate-pulse mb-2 flex items-center gap-1"><Sparkles size={12} /> Analyzing account performance...</div>}
        {fbInsight && <div className="text-xs text-gray-700 bg-purple-50 p-2 rounded mb-2 border border-purple-100">{fbInsight}</div>}
        <div className="overflow-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-400 uppercase text-[10px] sticky top-0">
              <tr>
                <th className="px-4 py-3 border-b">Client / Venue</th>
                <th className="px-4 py-3 border-b">Cases Ordered</th>
                <th className="px-4 py-3 border-b">Spirits Rev</th>
                <th className="px-4 py-3 border-b">Beer/Wine Rev</th>
                <th className="px-4 py-3 border-b">Trend</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {[
                { venue: "McGettigan's", covers: 1240, bev: 'BHD 15,200', food: 'BHD 8,400', color: 'green' },
                { venue: "JJ's Irish Pub", covers: 980, bev: 'BHD 11,500', food: 'BHD 5,200', color: 'green' },
                { venue: "Sherlock Holmes", covers: 450, bev: 'BHD 6,800', food: 'BHD 2,100', color: 'red' },
                { venue: "CUT Lounge", covers: 310, bev: 'BHD 9,400', food: 'BHD 12,000', color: 'green' }
              ].map((row, i) => (
                <tr key={i} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium">{row.venue}</td>
                  <td className="px-4 py-3">{row.covers}</td>
                  <td className="px-4 py-3 font-semibold text-[#017E84]">{row.bev}</td>
                  <td className="px-4 py-3">{row.food}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${row.color === 'green' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {row.color === 'green' ? '+4.2%' : '-1.5%'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
      <div className="space-y-4">
        <Card title="Top Moving Wholesale Items">
          <ul className="space-y-4 pt-1">
            <li className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-purple-100 text-[#875A7B] flex items-center justify-center"><Wine size={16} /></div>
                <span className="text-sm font-medium text-gray-700">Draft Ale Kegs (50L)</span>
              </div>
              <span className="text-sm font-bold text-gray-800">420</span>
            </li>
            <li className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-teal-100 text-[#017E84] flex items-center justify-center"><Package size={16} /></div>
                <span className="text-sm font-medium text-gray-700">Premium London Dry Gin</span>
              </div>
              <span className="text-sm font-bold text-gray-800">285</span>
            </li>
            <li className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-yellow-100 text-yellow-600 flex items-center justify-center"><Wine size={16} /></div>
                <span className="text-sm font-medium text-gray-700">House Cabernet Sauvignon</span>
              </div>
              <span className="text-sm font-bold text-gray-800">112</span>
            </li>
          </ul>
        </Card>
        <Card title="Account Alert">
           <div className="flex flex-col items-center py-4">
              <TrendingUp className="text-orange-400 mb-2" size={32} />
              <p className="text-center text-sm text-gray-600 px-2">Order volume from <strong>Sherlock Holmes</strong> has dropped 15% vs benchmark.</p>
           </div>
        </Card>
      </div>
    </div>
  );

  const pivot = (
    <PivotView
      columns={['Spirits (Cases)', 'Beer (Kegs/Cases)', 'Wine (Cases)']}
      rows={[
        { name: "McGettigan's", values: [150, 420, 670] },
        { name: "JJ's Irish Pub", values: [80, 310, 590] },
        { name: "Sherlock Holmes", values: [110, 240, 100] },
        { name: "CUT Lounge", values: [40, 180, 90] }
      ]}
      measure="Order Volume"
    />
  );

  const graph = (
    <GraphView
      title="Revenue Share by Key Client"
      data={[
        { label: "McGettigan's", value: 'BHD 23.6K', percent: 95, breakdown: [
          { name: 'Spirits', value: 15200, secondary: 150, note: 'Revenue / Cases' },
          { name: 'Beer (Kegs/Cases)', value: 5800, secondary: 420 },
          { name: 'Wine', value: 2600, secondary: 670 }
        ]},
        { label: "JJ's Pub", value: 'BHD 16.7K', percent: 70, breakdown: [
          { name: 'Spirits', value: 11500, secondary: 80 },
          { name: 'Beer (Kegs/Cases)', value: 3700, secondary: 310 },
          { name: 'Wine', value: 1500, secondary: 590 }
        ]},
        { label: "Sherlock", value: 'BHD 8.9K', percent: 45, breakdown: [
          { name: 'Spirits', value: 6800, secondary: 110, note: 'Volume -15% vs benchmark' },
          { name: 'Beer (Kegs/Cases)', value: 1700, secondary: 240 },
          { name: 'Wine', value: 400, secondary: 100 }
        ]},
        { label: "CUT Lounge", value: 'BHD 21.4K', percent: 85, breakdown: [
          { name: 'Spirits', value: 9400, secondary: 40 },
          { name: 'Beer (Kegs/Cases)', value: 2400, secondary: 180 },
          { name: 'Wine', value: 9600, secondary: 90, note: 'Premium wine driver' }
        ]}
      ]}
    />
  );

  return <ViewContainer title="On-Trade Key Account Performance" view={view} setView={setView} dashboard={dashboard} pivot={pivot} graph={graph} />;
};
