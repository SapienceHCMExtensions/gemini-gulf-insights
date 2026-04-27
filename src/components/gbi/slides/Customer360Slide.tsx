import { useState } from 'react';
import { Sparkles, Mail, Phone, Calendar, Star, Hotel, Store, Globe } from 'lucide-react';
import { ViewContainer } from '../layout/ViewContainer';
import { PivotView } from '../views/PivotView';
import { GraphView } from '../views/GraphView';
import { Card } from '../ui/Card';
import { callGemini } from '../lib/gemini';

export const Customer360Slide = ({ view, setView }: any) => {
  const [aiInsight, setAiInsight] = useState("");
  const [loadingAi, setLoadingAi] = useState(false);

  const customer = {
    name: "The Ritz-Carlton, Bahrain",
    segment: "Premium HORECA",
    accountManager: "S. Al-Mahmood",
    since: "2019",
    ltv: "BHD 184,500",
    nps: 9.2,
    nextAction: "Propose 2026 F1 hospitality wine pairing package — high open rate on F1 newsletter + recent Dom Pérignon reorder signals readiness."
  };

  const touchpoints = [
    { date: "Today", channel: "GBI Express", icon: Globe, label: "Reordered Dom Pérignon x12 (BHD 4,200)", color: "#017E84" },
    { date: "3 days ago", channel: "Email Campaign", icon: Mail, label: "Opened 'F1 Corporate Packages' newsletter", color: "#875A7B" },
    { date: "1 week ago", channel: "LS Retail POS", icon: Store, label: "Walk-in tasting at Seef branch (BHD 320)", color: "#017E84" },
    { date: "2 weeks ago", channel: "Sales Call", icon: Phone, label: "Quarterly review with S. Al-Mahmood", color: "#875A7B" },
    { date: "1 month ago", channel: "Event", icon: Calendar, label: "Attended Summer Wine Tasting (4 attendees)", color: "#017E84" }
  ];

  const generateInsights = async () => {
    setLoadingAi(true);
    const prompt = `You are an Odoo CRM AI advisor for Gulf Brands International in Bahrain. Customer: ${JSON.stringify(customer)}. Recent touchpoints: ${JSON.stringify(touchpoints.map(t => `${t.date}: ${t.label}`))}. In 2 sentences, recommend the next best engagement action that combines insights from LS Retail POS data, Navision invoicing history, and Odoo CRM activity. Be specific and revenue-focused.`;
    const response = await callGemini(prompt);
    setAiInsight(response);
    setLoadingAi(false);
  };

  const dashboard = (
    <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6 h-full overflow-y-auto">
      <Card className="md:col-span-1">
        <div className="flex flex-col items-center text-center pb-4 border-b mb-4">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#875A7B] to-[#017E84] flex items-center justify-center text-white mb-3">
            <Hotel size={36} />
          </div>
          <h3 className="font-bold text-base text-gray-800">{customer.name}</h3>
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#875A7B] bg-purple-50 px-2 py-1 rounded mt-2">{customer.segment}</span>
        </div>
        <div className="space-y-3 text-xs">
          <div className="flex justify-between"><span className="text-gray-500">Account Manager</span><span className="font-bold text-gray-800">{customer.accountManager}</span></div>
          <div className="flex justify-between"><span className="text-gray-500">Customer Since</span><span className="font-bold text-gray-800">{customer.since}</span></div>
          <div className="flex justify-between items-center"><span className="text-gray-500">Lifetime Value</span><span className="font-bold text-[#017E84] text-sm">{customer.ltv}</span></div>
          <div className="flex justify-between items-center">
            <span className="text-gray-500">NPS Score</span>
            <span className="font-bold text-gray-800 flex items-center gap-1"><Star size={12} className="text-yellow-500 fill-yellow-500" /> {customer.nps}</span>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t">
          <div className="text-[10px] font-bold uppercase text-gray-400 mb-2">Data Sources Unified</div>
          <div className="flex flex-wrap gap-1">
            <span className="text-[10px] bg-gray-100 px-2 py-1 rounded font-bold text-gray-600">LS Retail</span>
            <span className="text-[10px] bg-gray-100 px-2 py-1 rounded font-bold text-gray-600">MS Navision</span>
            <span className="text-[10px] bg-purple-100 px-2 py-1 rounded font-bold text-[#875A7B]">Odoo CRM</span>
            <span className="text-[10px] bg-purple-100 px-2 py-1 rounded font-bold text-[#875A7B]">Marketing</span>
            <span className="text-[10px] bg-purple-100 px-2 py-1 rounded font-bold text-[#875A7B]">eCommerce</span>
          </div>
        </div>
      </Card>

      <Card title="Unified Engagement Timeline" className="md:col-span-1">
        <div className="space-y-4">
          {touchpoints.map((tp, i) => (
            <div key={i} className="flex gap-3 relative">
              {i < touchpoints.length - 1 && <div className="absolute left-[15px] top-8 bottom-[-16px] w-px bg-gray-200" />}
              <div className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white relative z-10" style={{ backgroundColor: tp.color }}>
                <tp.icon size={14} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-0.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: tp.color }}>{tp.channel}</span>
                  <span className="text-[10px] text-gray-400">{tp.date}</span>
                </div>
                <p className="text-xs text-gray-700 leading-snug">{tp.label}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <div className="md:col-span-1 space-y-6">
        <Card className="bg-gradient-to-br from-[#875A7B] to-[#6B4763] text-white">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] font-bold uppercase tracking-widest opacity-80">AI Next-Best-Action</span>
            <Sparkles size={14} />
          </div>
          <p className="text-sm font-medium leading-relaxed mb-4">{customer.nextAction}</p>
          <button onClick={generateInsights} className="w-full bg-white/15 hover:bg-white/25 transition-colors px-3 py-2 rounded text-xs font-bold flex items-center justify-center gap-2 backdrop-blur-sm">
            <Sparkles size={12} /> Refresh AI Recommendation
          </button>
          {loadingAi && <div className="text-[10px] mt-3 opacity-90 animate-pulse flex items-center gap-1"><Sparkles size={10} /> Analyzing 360° signals...</div>}
          {aiInsight && <div className="text-[11px] mt-3 bg-white/10 p-3 rounded leading-relaxed">{aiInsight}</div>}
        </Card>

        <Card title="Channel Affinity">
          <div className="space-y-3">
            {[
              { label: 'GBI Express (Web)', pct: 88, icon: Globe },
              { label: 'B2B Sales Direct', pct: 72, icon: Phone },
              { label: 'Retail Walk-In', pct: 45, icon: Store },
              { label: 'Email Marketing', pct: 62, icon: Mail }
            ].map((c, i) => (
              <div key={i}>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[11px] text-gray-700 font-medium flex items-center gap-1.5"><c.icon size={11} className="text-gray-400" />{c.label}</span>
                  <span className="text-[11px] font-bold text-[#875A7B]">{c.pct}%</span>
                </div>
                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-[#875A7B] to-[#017E84]" style={{ width: `${c.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );

  const pivot = (
    <PivotView
      columns={['LS Retail POS (BHD)', 'Navision B2B Invoices (BHD)', 'GBI Express Online (BHD)', 'Total Revenue (BHD)']}
      rows={[
        { name: 'The Ritz-Carlton', values: [4200, 142000, 38300, 184500] },
        { name: 'Four Seasons Bahrain', values: [2100, 118000, 22400, 142500] },
        { name: 'Gulf Hotel Group', values: [8400, 96000, 14200, 118600] },
        { name: 'Wyndham Grand Manama', values: [1800, 72000, 8900, 82700] },
        { name: 'Premium Retail Walk-Ins', values: [142000, 0, 0, 142000] }
      ]}
      measure="Customer 360 - Cross-Channel Revenue Attribution"
    />
  );

  const graph = (
    <GraphView
      title="Engagement Score by Customer Segment"
      data={[
        { label: 'Premium HORECA (5-Star Hotels)', value: '92 / 100', percent: 92 },
        { label: 'F1 / Event Partners', value: '85 / 100', percent: 85 },
        { label: 'Mid-Market Restaurants', value: '68 / 100', percent: 68 },
        { label: 'Retail Loyalty Members', value: '74 / 100', percent: 74 },
        { label: 'GBI Express Repeat Buyers', value: '81 / 100', percent: 81 }
      ]}
    />
  );

  return <ViewContainer title="Customer 360: Unified Engagement & Insights" view={view} setView={setView} dashboard={dashboard} pivot={pivot} graph={graph} />;
};
