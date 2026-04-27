import { Link, Megaphone, LayoutDashboard } from 'lucide-react';
import { Header } from '../layout/Header';

export const ClosingSlide = () => (
  <div className="h-full bg-white flex flex-col">
     <Header title="Next Steps: Navision/LS Retail Integration & Odoo Roadmap" activeView="dashboard" setView={() => {}} />
     <div className="flex-1 flex flex-col items-center pt-12 px-8 pb-24 md:px-20 overflow-y-auto">

        <div className="mb-10 text-center max-w-3xl shrink-0">
          <h2 className="text-2xl font-black text-[#875A7B] mb-3">Filling the Gaps in Your Current Stack</h2>
          <p className="text-gray-600 text-base leading-relaxed">
            We understand GBI successfully runs <strong className="text-gray-900">MS Dynamics Navision</strong> and <strong className="text-gray-900">LS Retail</strong> for heavy-lifting finance and inventory. Odoo is perfectly positioned to bridge the missing links: <strong>CRM, Marketing Automation, and B2B Sales Prospecting</strong>.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl text-center mb-12 shrink-0">
           <div className="flex flex-col items-center group bg-gray-50 p-6 rounded-xl border hover:border-[#875A7B] transition-colors">
              <div className="w-16 h-16 rounded-full bg-[#875A7B]/10 flex items-center justify-center text-[#875A7B] mb-4 group-hover:scale-110 transition-transform">
                 <Link size={32} />
              </div>
              <h3 className="text-lg font-bold mb-2">Phase 1: Bridge & CRM Setup</h3>
              <p className="text-xs text-gray-500 leading-relaxed">Implement Odoo CRM to capture B2B hotel leads. Push closed deals via API into your existing <strong>LS Retail</strong> backend.</p>
           </div>
           <div className="flex flex-col items-center group bg-gray-50 p-6 rounded-xl border hover:border-[#875A7B] transition-colors">
              <div className="w-16 h-16 rounded-full bg-[#875A7B]/10 flex items-center justify-center text-[#875A7B] mb-4 group-hover:scale-110 transition-transform">
                 <Megaphone size={32} />
              </div>
              <h3 className="text-lg font-bold mb-2">Phase 2: Marketing Automation</h3>
              <p className="text-xs text-gray-500 leading-relaxed">Deploy targeted email and social campaigns. Drive retail footfall and GBI Express traffic based on customer purchase history.</p>
           </div>
           <div className="flex flex-col items-center group bg-[#875A7B]/5 p-6 rounded-xl border border-[#875A7B]/30 hover:bg-[#875A7B]/10 transition-colors">
              <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-[#875A7B] mb-4 group-hover:scale-110 transition-transform shadow-sm">
                 <LayoutDashboard size={32} />
              </div>
              <h3 className="text-lg font-bold mb-2">Phase 3: Unified Platform (Optional)</h3>
              <p className="text-xs text-gray-600 font-medium leading-relaxed">Evaluate the sunsetting of legacy Navision systems for a complete, unified migration to Odoo 19 ERP.</p>
           </div>
        </div>
        <div className="text-center pt-8 border-t w-full shrink-0">
           <button className="bg-[#875A7B] text-white px-10 py-4 rounded-lg font-bold text-lg hover:bg-[#714B67] transition-all shadow-lg shadow-[#875A7B]/20">
              Request API Integration Demo
           </button>
           <p className="mt-4 text-gray-400 text-xs font-bold uppercase tracking-widest">{"\n"}</p>
        </div>
     </div>
  </div>
);
