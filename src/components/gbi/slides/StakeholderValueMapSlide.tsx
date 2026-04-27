import { Crown, Calculator, Briefcase, Megaphone, Store, Server, Link2 } from 'lucide-react';
import { Header } from '../layout/Header';

const personas = [
  {
    icon: Crown,
    role: 'CEO',
    pain: 'No single view of customer health across brands & channels.',
    delivers: 'Real-time executive dashboard — revenue, NPS, pipeline, campaign ROI in one glance.',
    metric: '< 30s',
    metricLabel: 'Time to executive insight',
    accent: '#875A7B'
  },
  {
    icon: Calculator,
    role: 'CFO',
    pain: 'Marketing spend ROI unclear; finance reconciles across systems.',
    delivers: 'Campaign-to-cash attribution, BHD per lead per channel, automated Navision sync.',
    metric: '+22%',
    metricLabel: 'Marketing ROI visibility',
    accent: '#017E84'
  },
  {
    icon: Briefcase,
    role: 'Head of Sales',
    pain: 'B2B hotel/HORECA leads tracked in spreadsheets and WhatsApp.',
    delivers: 'Unified pipeline, Lead scoring, automated follow-ups.',
    metric: '3.5x',
    metricLabel: 'Lead conversion lift',
    accent: '#875A7B'
  },
  {
    icon: Megaphone,
    role: 'Head of Marketing',
    pain: 'Cannot segment by purchase behavior — campaigns are generic.',
    delivers: 'LS Retail POS data flows into Odoo Marketing for behavioral segmentation & A/B testing.',
    metric: '24.5%',
    metricLabel: 'Email open rate (vs 9% industry)',
    accent: '#017E84'
  },
  {
    icon: Store,
    role: 'Head of Retail Ops',
    pain: 'Reactive stock decisions; no forward signal from CRM.',
    delivers: 'CRM pipeline + event calendar feeds LS Retail replenishment.',
    metric: '−18%',
    metricLabel: 'Stock-outs on premium SKUs',
    accent: '#875A7B'
  },
  {
    icon: Server,
    role: 'IT Director',
    pain: 'Concern: another system to maintain, integrate and secure.',
    delivers: 'Cloud-hosted, API Interfaces to Navision/LS Retail.',
    metric: '6 wks',
    metricLabel: 'Time to first production value',
    accent: '#017E84'
  }
];

export const StakeholderValueMapSlide = () => (
  <div className="h-full bg-white flex flex-col">
    <Header title="Stakeholder Value Map" activeView="dashboard" setView={() => {}} />
    <div className="flex-1 flex flex-col px-8 md:px-12 py-6 pb-24 overflow-y-auto">
      <div className="text-center mb-6 shrink-0">
        <div className="inline-block text-[10px] font-bold uppercase tracking-widest text-[#875A7B] bg-purple-50 px-3 py-1 rounded-full mb-3">For Every Seat at the Table</div>
        <h2 className="text-3xl font-black text-gray-900 mb-2 tracking-tight">One Platform. Six Stakeholders. Measurable Wins.</h2>
        <p className="text-sm text-gray-500 max-w-2xl mx-auto">Odoo speaks the language of every leader at GBI — quantified outcomes, not feature lists.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {personas.map((p, i) => (
          <div key={i} className="bg-white border border-gray-200 rounded-xl p-4 flex flex-col hover:shadow-lg hover:border-[#875A7B]/40 transition-all">
            <div className="flex items-center gap-3 mb-3 pb-3 border-b">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center text-white shrink-0" style={{ backgroundColor: p.accent }}>
                <p.icon size={20} />
              </div>
              <h3 className="font-bold text-sm text-gray-900">{p.role}</h3>
            </div>
            <div className="mb-3">
              <div className="text-[9px] font-bold uppercase tracking-wider text-gray-400 mb-1">Pain Today</div>
              <p className="text-[11px] text-gray-700 leading-snug">{p.pain}</p>
            </div>
            <div className="mb-3 flex-1">
              <div className="text-[9px] font-bold uppercase tracking-wider mb-1" style={{ color: p.accent }}>Odoo Delivers</div>
              <p className="text-[11px] text-gray-800 leading-snug font-medium">{p.delivers}</p>
            </div>
            <div className="mt-auto pt-3 border-t flex items-baseline justify-between">
              <span className="text-2xl font-black tracking-tight" style={{ color: p.accent }}>{p.metric}</span>
              <span className="text-[9px] font-bold uppercase text-gray-400 text-right ml-2 leading-tight">{p.metricLabel}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 bg-gradient-to-r from-[#875A7B] to-[#017E84] text-white p-4 rounded-xl flex items-center gap-4">
        <div className="bg-white/20 p-2 rounded-lg shrink-0"><Link2 size={20} /></div>
        <p className="text-xs md:text-sm font-medium leading-relaxed">
          <strong className="font-bold">Built on top of your existing investment.</strong> Odoo augments <strong>MS Navision</strong> and <strong>LS Retail</strong> via APIs — zero rip-and-replace, zero disruption to operations or finance.
        </p>
      </div>
    </div>
  </div>
);
