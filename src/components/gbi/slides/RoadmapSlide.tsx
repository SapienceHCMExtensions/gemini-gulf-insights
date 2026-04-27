import { Zap, Rocket, TrendingUp, Building2, ShieldCheck, Calendar } from 'lucide-react';
import { Header } from '../layout/Header';

const phases = [
  {
    range: 'Month 1–2',
    title: 'CRM + Marketing Live',
    icon: Zap,
    accent: '#875A7B',
    scope: ['Odoo CRM deployed', 'Email & WhatsApp automation', 'Navision/LS Retail API bridge'],
    quickWin: 'First automated B2B campaign live in week 4',
    investment: 'BHD 18–25k',
    roi: '+15% lead conversion',
    exit: 'Pause/continue decision after Month 2'
  },
  {
    range: 'Month 3–4',
    title: 'Customer 360 + AI Insights',
    icon: Rocket,
    accent: '#017E84',
    scope: ['Unified customer profile', 'Gemini-powered next-best-action', 'Churn & cross-sell scoring'],
    quickWin: 'First AI-driven churn save (HORECA account)',
    investment: 'BHD 22–30k',
    roi: '+22% account retention',
    exit: 'Pause/continue decision after Month 4'
  },
  {
    range: 'Month 5–6',
    title: 'eCommerce + Loyalty',
    icon: TrendingUp,
    accent: '#875A7B',
    scope: ['GBI Express integrated', 'Loyalty program live', 'Behavioral segmentation'],
    quickWin: 'First repeat-purchase uplift on online channel',
    investment: 'BHD 28–40k',
    roi: '+18% repeat-purchase rate',
    exit: 'Pause/continue decision after Month 6'
  },
  {
    range: 'Year 2 (Optional)',
    title: 'Unified Platform Evaluation',
    icon: Building2,
    accent: '#017E84',
    scope: ['ROI review of legacy systems', 'Optional Odoo ERP migration', 'Full consolidation business case'],
    quickWin: 'Data-backed migration decision — not a leap of faith',
    investment: 'TBD per scope',
    roi: 'Evaluated against measured Year 1 gains',
    exit: 'Fully optional — GBI retains full control'
  }
];

export const RoadmapSlide = () => (
  <div className="h-full bg-white flex flex-col">
    <Header title="Phased Roadmap with Quick Wins" activeView="dashboard" setView={() => {}} />
    <div className="flex-1 flex flex-col px-8 md:px-12 py-6 overflow-y-auto">
      <div className="text-center mb-6 shrink-0">
        <div className="inline-block text-[10px] font-bold uppercase tracking-widest text-[#017E84] bg-teal-50 px-3 py-1 rounded-full mb-3">Low-Risk, Quick-Win Path</div>
        <h2 className="text-3xl font-black text-gray-900 mb-2 tracking-tight">Value in Weeks. Decisions Every Quarter.</h2>
        <p className="text-sm text-gray-500 max-w-2xl mx-auto">Each phase is independently valuable. GBI can pause, stop, or accelerate after any milestone — no big-bang risk.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 flex-1 min-h-0">
        {phases.map((p, i) => (
          <div key={i} className="relative bg-white border border-gray-200 rounded-xl p-4 flex flex-col hover:shadow-lg transition-all" style={{ borderTopWidth: '4px', borderTopColor: p.accent }}>
            <div className="absolute -top-2 -right-2 bg-yellow-400 text-yellow-900 text-[9px] font-black uppercase px-2 py-1 rounded-full shadow flex items-center gap-1">
              <Zap size={10} /> Quick Win
            </div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center text-white shrink-0" style={{ backgroundColor: p.accent }}>
                <p.icon size={18} />
              </div>
              <div>
                <div className="text-[9px] font-bold uppercase tracking-wider text-gray-400 flex items-center gap-1"><Calendar size={9} />{p.range}</div>
                <h3 className="font-bold text-xs text-gray-900 leading-tight">{p.title}</h3>
              </div>
            </div>
            <div className="mb-3">
              <div className="text-[9px] font-bold uppercase tracking-wider text-gray-400 mb-1">Scope</div>
              <ul className="space-y-1">
                {p.scope.map((s, j) => (
                  <li key={j} className="text-[10px] text-gray-700 leading-snug flex gap-1.5"><span style={{ color: p.accent }}>•</span>{s}</li>
                ))}
              </ul>
            </div>
            <div className="mb-3 bg-yellow-50 border border-yellow-200 rounded p-2">
              <div className="text-[9px] font-bold uppercase tracking-wider text-yellow-700 mb-0.5">Quick Win</div>
              <p className="text-[10px] text-gray-800 leading-snug font-medium">{p.quickWin}</p>
            </div>
            <div className="mt-auto pt-3 border-t space-y-1.5">
              <div className="flex justify-between text-[10px]">
                <span className="text-gray-500">Investment</span>
                <span className="font-bold text-gray-800">{p.investment}</span>
              </div>
              <div className="flex justify-between text-[10px]">
                <span className="text-gray-500">Expected ROI</span>
                <span className="font-bold" style={{ color: p.accent }}>{p.roi}</span>
              </div>
              <div className="text-[9px] text-gray-400 italic pt-1 border-t leading-snug flex items-start gap-1">
                <ShieldCheck size={10} className="shrink-0 mt-0.5" />{p.exit}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex flex-col md:flex-row items-center justify-between gap-4 bg-gradient-to-r from-[#875A7B] to-[#017E84] text-white p-4 rounded-xl shrink-0">
        <div className="flex-1">
          <h4 className="font-bold text-sm mb-0.5">Start with a 2-Week Discovery Workshop</h4>
          <p className="text-xs opacity-90">Customer 360 mockup, integration blueprint, and ROI model — all delivered before any commitment.</p>
        </div>
        <button className="bg-white text-[#875A7B] px-6 py-2.5 rounded-lg font-bold text-xs uppercase tracking-wider hover:bg-gray-100 transition-colors shrink-0">
          Book Discovery Workshop
        </button>
      </div>
    </div>
  </div>
);
