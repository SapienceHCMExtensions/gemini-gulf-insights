import { useState } from 'react';
import { Sparkles, Megaphone, Mail, Target, Link } from 'lucide-react';
import { ViewContainer } from '../layout/ViewContainer';
import { PivotView } from '../views/PivotView';
import { GraphView } from '../views/GraphView';
import { Card } from '../ui/Card';
import { callGemini } from '../lib/gemini';

export const MarketingSlide = ({ view, setView }: any) => {
  const [aiInsight, setAiInsight] = useState("");
  const [loadingAi, setLoadingAi] = useState(false);

  const campaignItems = [
     { campaign: "Summer Wine Tasting Event", reach: "1,240 Guests", conversions: "142 Sales", type: "B2C Retail", status: "Active" },
     { campaign: "F1 Corporate Package Email", reach: "450 Accounts", conversions: "12 Contracts", type: "B2B On-Trade", status: "Completed" },
     { campaign: "GBI Express Social Promo", reach: "12,500 Impressions", conversions: "350 Orders", type: "B2C Digital", status: "Active" }
  ];

  const generateInsights = async () => {
     setLoadingAi(true);
     const prompt = `Analyze these marketing campaigns for Gulf Brands International in Bahrain: ${JSON.stringify(campaignItems)}. Give a 2-sentence marketing strategy on how Odoo's CRM and Marketing Automation can bridge the gap in their existing MS Dynamics Navision/LS Retail setup to better target retail vs hotel clients.`;
     const response = await callGemini(prompt);
     setAiInsight(response);
     setLoadingAi(false);
  };

  const dashboard = (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 h-full overflow-y-auto">
      <Card title="Active Marketing Campaigns">
        <div className="flex justify-between items-center mb-4">
           <span className="text-xs text-gray-500 font-bold uppercase">Campaign Engagement</span>
           <button onClick={generateInsights} className="bg-purple-100 text-[#875A7B] px-2 py-1 rounded text-xs font-bold hover:bg-purple-200 transition-colors flex items-center gap-1"><Sparkles size={12} /> Optimize Campaigns</button>
        </div>
        {loadingAi && <div className="text-xs text-[#875A7B] animate-pulse mb-4 flex items-center gap-1"><Sparkles size={12} /> Analyzing cross-channel data...</div>}
        {aiInsight && <div className="text-xs text-gray-700 bg-purple-50 p-3 rounded mb-4 border border-purple-100">{aiInsight}</div>}
        <div className="space-y-4">
          {campaignItems.map((item, i) => (
            <div key={i} className="flex items-center justify-between border-b pb-4 last:border-0">
               <div className="flex flex-col">
                  <span className="font-bold text-sm text-gray-800">{item.campaign}</span>
                  <span className="text-xs text-gray-500 flex items-center gap-1"><Megaphone size={10}/> {item.type}</span>
               </div>
               <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="text-sm font-bold text-[#017E84]">{item.conversions}</div>
                    <div className="text-[10px] font-bold uppercase text-gray-400">from {item.reach}</div>
                  </div>
                  <div className={`text-[10px] font-bold uppercase px-2 py-1 rounded ${item.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>{item.status}</div>
               </div>
            </div>
          ))}
        </div>
      </Card>
      <div className="space-y-6">
        <Card title="Marketing Reach vs Engagement">
           <div className="h-full flex flex-col">
              <div className="pt-2 grid grid-cols-2 gap-4">
                 <div className="bg-gray-50 p-4 rounded border flex flex-col items-center text-center">
                    <Mail className="text-[#875A7B] mb-2" size={24} />
                    <div className="text-2xl font-bold text-gray-800 tracking-tight">24.5%</div>
                    <div className="text-[10px] text-gray-400 font-bold uppercase mt-1">B2B Email Open Rate</div>
                 </div>
                 <div className="bg-gray-50 p-4 rounded border flex flex-col items-center text-center">
                    <Target className="text-[#017E84] mb-2" size={24} />
                    <div className="text-2xl font-bold text-gray-800 tracking-tight">18.2%</div>
                    <div className="text-[10px] text-gray-400 font-bold uppercase mt-1">Tasting Event Conversion</div>
                 </div>
              </div>
           </div>
        </Card>
        <Card className="bg-[#017E84] text-white">
          <div className="flex items-start gap-4">
             <div className="bg-white/20 p-3 rounded-lg"><Link size={24} /></div>
             <div>
               <h4 className="font-bold mb-1">LS Retail Data Sync</h4>
               <p className="text-xs opacity-90 leading-relaxed">
                 Odoo Marketing captures the email leads and forwards the closed deals directly to your <strong>LS Retail</strong> and <strong>MS Navision</strong> backend for seamless operational invoicing and inventory deduction.
               </p>
             </div>
          </div>
        </Card>
      </div>
    </div>
  );

  const pivot = (
    <PivotView
      columns={['Total Leads Generated', 'Active Opportunities', 'Attributed Revenue (BHD)', 'Conversion %']}
      rows={[
        { name: 'Email Marketing (B2B)', values: [450, 42, 68000, 9.3] },
        { name: 'Retail Store Tastings (B2C)', values: [1200, 185, 22500, 15.4] },
        { name: 'Social Media Promos', values: [3500, 420, 18000, 12.0] },
        { name: 'Website - GBI Express', values: [2800, 310, 45000, 11.1] }
      ]}
      measure="Marketing Channel Performance"
    />
  );

  const graph = (
    <GraphView
      title="Lead Acquisition Cost & Reach"
      data={[
        { label: 'Email', value: 'BHD 1.50/Lead', percent: 45, breakdown: [
          { name: 'F1 Corporate Package Email', value: 450, secondary: 12, note: 'Leads / Conversions' },
          { name: 'HORECA Quarterly Newsletter', value: 380, secondary: 18 },
          { name: 'Loyalty Re-Engagement', value: 220, secondary: 9 }
        ]},
        { label: 'Tastings', value: 'BHD 4.20/Lead', percent: 95, breakdown: [
          { name: 'Summer Wine Tasting Event', value: 1240, secondary: 142 },
          { name: 'Spirits Masterclass — Seef', value: 320, secondary: 48 },
          { name: 'F1 Pre-Race Tasting', value: 180, secondary: 36 }
        ]},
        { label: 'Social', value: 'BHD 0.85/Lead', percent: 65, breakdown: [
          { name: 'GBI Express Instagram Promo', value: 8200, secondary: 240 },
          { name: 'Facebook Retargeting', value: 4300, secondary: 110 }
        ]},
        { label: 'Organic Search', value: 'BHD 0.00/Lead', percent: 35, breakdown: [
          { name: 'Brand Search (gulfbrands)', value: 2100, secondary: 180 },
          { name: 'Generic (wine delivery bahrain)', value: 700, secondary: 42 }
        ]}
      ]}
    />
  );

  return <ViewContainer title="Marketing: Campaign Reach & ROI Analysis" view={view} setView={setView} dashboard={dashboard} pivot={pivot} graph={graph} />;
};
