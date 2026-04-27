import { PlusSquare, MinusSquare, Download } from 'lucide-react';

export const PivotView = ({ columns, rows, measure }: any) => (
  <div className="p-6 h-full overflow-auto bg-white flex flex-col">
    <div className="flex justify-between items-center mb-4 border-b pb-2 shrink-0">
      <div className="flex gap-2">
        <button className="flex items-center gap-1 text-xs border px-2 py-1 rounded bg-gray-50 hover:bg-gray-100 font-medium">
          <PlusSquare size={14} /> Measures ({measure})
        </button>
        <button className="flex items-center gap-1 text-xs border px-2 py-1 rounded bg-gray-50 hover:bg-gray-100">
           Insert in Spreadsheet
        </button>
      </div>
      <div className="flex gap-2">
        <Download size={16} className="text-gray-400 cursor-pointer" />
      </div>
    </div>
    <div className="flex-1 overflow-auto">
      <table className="w-full text-sm border-collapse border">
        <thead>
          <tr>
            <th className="border bg-gray-100 p-2 text-left w-48"></th>
            {columns.map((col: any, i: number) => (
              <th key={i} className="border bg-[#f8f9fa] p-2 text-center text-[#875A7B] font-bold">
                {col}
              </th>
            ))}
            <th className="border bg-blue-50 p-2 text-center font-bold">Total</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row: any, i: number) => (
            <tr key={i}>
              <td className="border p-2 bg-gray-50 font-medium flex items-center gap-2">
                <MinusSquare size={12} className="text-gray-400" /> {row.name}
              </td>
              {row.values.map((val: number, j: number) => (
                <td key={j} className="border p-2 text-right">{val.toLocaleString()}</td>
              ))}
              <td className="border p-2 text-right bg-blue-50/30 font-bold">
                {row.values.reduce((a: number, b: number) => a + b, 0).toLocaleString()}
              </td>
            </tr>
          ))}
          <tr className="bg-blue-50 font-bold">
            <td className="border p-2">Total</td>
            {columns.map((_: any, i: number) => (
              <td key={i} className="border p-2 text-right">
                {rows.reduce((acc: number, row: any) => acc + row.values[i], 0).toLocaleString()}
              </td>
            ))}
            <td className="border p-2 text-right bg-blue-100">
              {rows.reduce((acc: number, row: any) => acc + row.values.reduce((a: number, b: number) => a + b, 0), 0).toLocaleString()}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
);
