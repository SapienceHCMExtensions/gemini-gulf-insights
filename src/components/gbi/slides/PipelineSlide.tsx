import { useState } from 'react';
import { Sparkles, Calendar } from 'lucide-react';
import { ViewContainer } from '../layout/ViewContainer';
import { PivotView } from '../views/PivotView';
import { GraphView } from '../views/GraphView';
import { callGemini } from '../lib/gemini';

export const PipelineSlide = ({ view, setView }: any) => {
  const [aiDrafts, setAiDrafts] = useState<Record<string, string>>({});
  const [loadingDraft, setLoadingDraft] = useState<string | null>(null);

  const handleGenerateDraft = async (item: string, uniqueId: string) => {
    setLoadingDraft(uniqueId);
    const prompt = `You are a B2B sales rep for Gulf Brands International in Bahrain. Draft a short, enthusiastic 2-sentence B2B email to a hotel/venue proposing a premium beverage supply contract for their account named "${item}". Focus on bulk supply, reliability, and premium liquor portfolio.`;
    const response = await callGemini(prompt);
    setAiDrafts(prev => ({ ...prev, [uniqueId]: response }));
    setLoadingDraft(null);
  };

  const dashboard = (
    <div className="flex-1 p-6 flex gap-4 overflow-x-auto h-full">
      {[
        { name: 'Prospecting', color: '#875A7B', count: 3, items: ['New Beach Club (Zallaq)', 'Boutique Hotel Manama', 'Corporate Gift Baskets'] },
        { name: 'Tasting & Negotiation', color: '#017E84', count: 2, items: ['Hilton Juffair Minibars', 'F1 Village Paddock Club'] },
        { name: 'Credit App / Contract', color: '#f1c40f', count: 1, items: ['Grand Yard House Renewal'] },
        { name: 'Active Supply', color: '#2ecc71', count: 4, items: ['Wyndham Grand Lounge', 'Sofitel Beach Bar', 'Downtown Rotana'] }
      ].map((col, i) => (
        <div key={i} className="min-w-[280px] flex-1 flex flex-col gap-3">
          <div className="flex justify-between items-center px-2">
            <h4 className="font-bold text-sm text-gray-700 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: col.color }}></div>
              {col.name}
            </h4>
            <span className="text-xs bg-gray-200 px-2 py-0.5 rounded-full text-gray-600 font-bold">{col.count}</span>
          </div>
          <div className="flex-1 overflow-y-auto space-y-3">
            {col.items.map((item, idx) => {
              const uniqueId = `${i}-${idx}`;
              return (
              <div key={idx} className="bg-white p-3 rounded shadow-sm border border-gray-200 cursor-pointer hover:border-[#875A7B] transition-colors">
                <div className="text-[10px] text-gray-400 mb-1 font-bold">B2B Account • Est. BHD {Math.floor(Math.random() * 50000 + 20000)}/yr</div>
                <div className="text-sm font-bold text-gray-800">{item}</div>
                <div className="flex justify-between items-center mt-3">
                  <div className="flex -space-x-1">
                    <div className="w-6 h-6 rounded-full bg-[#875A7B] border-white border text-[8px] flex items-center justify-center font-bold text-white uppercase">
                      {item.charAt(0)}
                    </div>
                  </div>
                  <div className="text-[10px] text-gray-400 flex items-center gap-1 font-medium"><Calendar size={10} /> Next Action: 22 May</div>
                </div>
                <div className="mt-3 pt-3 border-t border-gray-100">
                  {loadingDraft === uniqueId ? (
                    <div className="text-[10px] text-[#875A7B] animate-pulse flex items-center gap-1"><Sparkles size={10} /> Drafting proposal...</div>
                  ) : aiDrafts[uniqueId] ? (
                    <div className="text-[10px] text-gray-600 bg-purple-50 p-2 rounded border border-purple-100">{aiDrafts[uniqueId]}</div>
                  ) : (
                    <button onClick={(e) => { e.stopPropagation(); handleGenerateDraft(item, uniqueId); }} className="text-[10px] text-[#875A7B] font-bold hover:underline flex items-center gap-1">
                      <Sparkles size={10} /> Draft AI Proposal
                    </button>
                  )}
                </div>
              </div>
            )})}
          </div>
        </div>
      ))}
    </div>
  );

  const pivot = (
    <PivotView
      columns={['Total Lead Value', 'Expected Annual Rev', 'Probability Avg %']}
      rows={[
        { name: '5-Star Hotels', values: [120000, 85000, 65] },
        { name: 'Independent Bars/Pubs', values: [48000, 32000, 40] },
        { name: 'Events & Catering', values: [24000, 18000, 85] },
        { name: 'Retail / Corporate', values: [95000, 62000, 50] }
      ]}
      measure="B2B Pipeline Metrics"
    />
  );

  const graph = (
    <GraphView
      title="B2B Funnel Analysis"
      data={[
        { label: 'Prospecting', value: 'BHD 287K', percent: 95 },
        { label: 'Negotiation', value: 'BHD 185K', percent: 70 },
        { label: 'Contract Sent', value: 'BHD 95K', percent: 40 },
        { label: 'Active Account', value: 'BHD 42K (New)', percent: 25 }
      ]}
    />
  );

  return <ViewContainer title="CRM: B2B Sales & Account Pipeline" view={view} setView={setView} dashboard={dashboard} pivot={pivot} graph={graph} />;
};
