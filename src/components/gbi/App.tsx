import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { TitleSlide } from './slides/TitleSlide';
import { DashboardSlide } from './slides/DashboardSlide';
import { FBPerformanceSlide } from './slides/FBPerformanceSlide';
import { PipelineSlide } from './slides/PipelineSlide';
import { MarketingSlide } from './slides/MarketingSlide';
import { ClosingSlide } from './slides/ClosingSlide';
import { Customer360Slide } from './slides/Customer360Slide';
import { StakeholderValueMapSlide } from './slides/StakeholderValueMapSlide';
import { RoadmapSlide } from './slides/RoadmapSlide';

export const App = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [view, setView] = useState('dashboard');

  const slides: any[] = [
    { type: 'title', content: <TitleSlide /> },
    { type: 'stakeholder', content: <StakeholderValueMapSlide /> },
    { id: 'overview', component: <DashboardSlide view={view} setView={setView} /> },
    { id: 'fb', component: <FBPerformanceSlide view={view} setView={setView} /> },
    { id: 'crm', component: <PipelineSlide view={view} setView={setView} /> },
    { id: 'marketing', component: <MarketingSlide view={view} setView={setView} /> },
    { id: 'customer360', component: <Customer360Slide view={view} setView={setView} /> },
    { type: 'roadmap', content: <RoadmapSlide /> },
    { type: 'closing', content: <ClosingSlide /> }
  ];

  const nextSlide = () => {
    setView('dashboard');
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setView('dashboard');
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center">
      <div className="w-full h-full max-w-[1280px] max-h-[800px] bg-white shadow-2xl relative flex flex-col overflow-hidden">

        <div className="flex-1 overflow-hidden">
          {slides[currentSlide].content ?? slides[currentSlide].component}
        </div>

        {/* Controls Overlay */}
        <div className="absolute bottom-6 right-6 flex items-center gap-4 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-xl border border-gray-100 z-50">
          <button
            onClick={prevSlide}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-600"
          >
            <ChevronLeft size={24} />
          </button>
          <div className="text-[10px] font-black text-[#875A7B] border-x px-4 min-w-[60px] text-center uppercase tracking-widest">
            {currentSlide + 1} / {slides.length}
          </div>
          <button
            onClick={nextSlide}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors text-[#875A7B]"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="absolute bottom-0 left-0 h-1 bg-gray-100 w-full z-50">
          <div
            className="h-full bg-[#875A7B] transition-all duration-500"
            style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};
