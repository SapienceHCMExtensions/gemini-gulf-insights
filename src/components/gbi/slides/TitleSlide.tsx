import { Building2 } from 'lucide-react';
import odooArchitecture from '@/assets/odoo-architecture.png';

export const TitleSlide = () => (
  <div className="h-full bg-[#875A7B] flex flex-col items-center justify-center text-white relative overflow-hidden">
    <div className="absolute top-10 left-10 opacity-20"><Building2 size={240} /></div>
    <div className="relative z-10 text-center px-10 flex flex-col items-center">
      <div className="bg-white p-6 rounded-2xl shadow-xl mb-8">
        <img src="https://www.gulfbrandsinternational.com/wp-content/themes/gbi/images/logo.png" alt="Gulf Brands International Logo" className="h-20 md:h-24 object-contain" />
      </div>
      <h1 className="text-5xl md:text-6xl font-black mb-4 tracking-tight uppercase leading-tight">Gulf Brands<br/>International</h1>
      <p className="text-2xl font-light opacity-80 mb-12">Digital Transformation with Odoo 19</p>
      <div className="flex gap-4 justify-center mb-10">
        <span className="bg-white/10 px-6 py-2 rounded-full text-xs font-bold border border-white/20 uppercase tracking-widest">Unified Operations</span>
        <span className="bg-white/10 px-6 py-2 rounded-full text-xs font-bold border border-white/20 uppercase tracking-widest">Real-Time Reporting</span>
      </div>
      <div className="mt-4 flex justify-center w-full">
        <img src={odooArchitecture} alt="Odoo Implementation Architecture" className="h-24 md:h-32 object-contain bg-white p-4 rounded-xl shadow-lg border border-white/20" />
      </div>
    </div>
    <div className="absolute bottom-10 right-10 flex items-center gap-3 opacity-60">
      <span className="text-xs font-bold uppercase tracking-tighter">Partner Showcase 2026</span>
    </div>
  </div>
);
