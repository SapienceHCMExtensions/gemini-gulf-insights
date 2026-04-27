import { MoreVertical } from 'lucide-react';

export const Card = ({ title, children, className = "" }: any) => {
  const hasBg = /(^|\s)bg-/.test(className);
  return (
  <div className={`${hasBg ? '' : 'bg-white'} border rounded-lg shadow-sm overflow-hidden flex flex-col ${className}`}>
    {title && (
      <div className="px-4 py-2 border-b bg-gray-50 flex justify-between items-center shrink-0">
        <span className="font-medium text-xs text-gray-600 uppercase tracking-wider">{title}</span>
        <MoreVertical size={14} className="text-gray-400" />
      </div>
    )}
    <div className="p-4 flex-1">{children}</div>
  </div>
  );
};
