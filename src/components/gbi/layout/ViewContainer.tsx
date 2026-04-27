import { Header } from './Header';

export const ViewContainer = ({ view, setView, title, dashboard, pivot, graph }: any) => {
  return (
    <div className="h-full flex flex-col bg-[#f8f9fa]">
      <Header title={title} activeView={view} setView={setView} />
      <div className="flex-1 overflow-hidden">
        {view === 'pivot' && pivot}
        {view === 'graph' && graph}
        {view === 'dashboard' && dashboard}
      </div>
    </div>
  );
};
