// src/pages/Admin/products/addproduct/components/PropertyTablesSection.jsx
// Step 5: Direct Pastable Property Tables section.
// Direct pastable input: Line 1 = Key, Line 2 = Value, with multiple tables support and live preview.
import React from "react";
import { TableProperties, Plus, Trash2, CheckCircle2 } from "lucide-react";
import { rowsToPastableText } from "./propertyTableUtils";

export default function PropertyTablesSection({
  propertyTables = [],
  onAddTable,
  onRemoveTable,
  onHeadingChange,
  onTextChange,
}) {
  const tables = Array.isArray(propertyTables) && propertyTables.length > 0
    ? propertyTables
    : [{ heading: "Specifications", rows: [], rawText: "" }];

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-7 shadow-[0_1px_3px_rgba(0,0,0,0.05)] space-y-6">
      {/* Section Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100 flex-wrap gap-2">
        <div className="flex items-center gap-2.5">
          <TableProperties className="w-4 h-4 text-[#004060]" />
          <h2 className="text-base font-bold text-slate-900 font-display">Property Tables</h2>
        </div>
        <span className="text-xs text-slate-500 font-medium">
          Paste data directly: <strong>1st line = Key</strong>, <strong>next line = Value</strong>
        </span>
      </div>

      {/* Tables List */}
      <div className="space-y-6">
        {tables.map((tbl, tableIndex) => {
          const currentText = tbl.rawText !== undefined
            ? tbl.rawText
            : rowsToPastableText(tbl.rows || []);
          const rows = Array.isArray(tbl.rows) ? tbl.rows : [];

          return (
            <div
              key={tableIndex}
              className="p-4 sm:p-5 rounded-2xl bg-slate-50/70 border border-slate-200/90 space-y-4 transition-all"
            >
              {/* Table Heading & Remove Button */}
              <div className="flex items-center justify-between gap-3 flex-wrap">
                <div className="flex-1 min-w-[220px]">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Table Heading
                  </label>
                  <input
                    type="text"
                    value={tbl.heading || ""}
                    onChange={(e) => onHeadingChange?.(tableIndex, e.target.value)}
                    placeholder="e.g. Specifications, Dimensions, Mechanical Properties"
                    className="w-full px-3.5 py-2 bg-white border border-slate-300 rounded-xl text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#004060]/20 focus:border-[#004060]"
                  />
                </div>

                {tables.length > 1 && (
                  <button
                    type="button"
                    onClick={() => onRemoveTable?.(tableIndex)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-rose-600 hover:text-rose-700 hover:bg-rose-50 border border-rose-200 transition-colors cursor-pointer self-end mb-0.5"
                    title="Remove this table"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Remove Table</span>
                  </button>
                )}
              </div>

              {/* Direct Pastable Textarea */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-semibold text-slate-700">
                    Direct Pastable Data (Key on 1st line, Value on next line)
                  </label>
                  <span className="text-[11px] text-slate-400 font-medium hidden sm:inline">
                    Odd line = Key • Even line = Value
                  </span>
                </div>
                <textarea
                  rows={6}
                  value={currentText}
                  onChange={(e) => onTextChange?.(tableIndex, e.target.value)}
                  placeholder={`Paste specifications directly here...\nThickness\n0.50 mm - 1.20 mm\nStandard\nIS 277 / ASTM A653\nCoating\nAZ 150 GSM\nTensile Strength\n550 MPa`}
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-xs sm:text-sm font-mono text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#004060]/20 focus:border-[#004060] transition-all resize-y"
                />
              </div>

              {/* Live Parsed Preview Table */}
              {rows.length > 0 && (
                <div className="space-y-1.5 pt-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-600 inline-flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Parsed Table Preview ({rows.length} {rows.length === 1 ? "property" : "properties"})</span>
                    </span>
                  </div>
                  <div className="w-full overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-2xs">
                    <table className="w-full text-left text-xs sm:text-sm">
                      <thead>
                        <tr className="bg-slate-100/80 border-b border-slate-200 text-slate-600 font-semibold">
                          <th className="py-2.5 px-3 sm:px-4 w-1/2">Property (Key)</th>
                          <th className="py-2.5 px-3 sm:px-4 w-1/2">Value</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {rows.map((row, rIdx) => (
                          <tr key={rIdx} className="hover:bg-slate-50/60">
                            <td className="py-2.5 px-3 sm:px-4 font-semibold text-slate-800 break-words">
                              {row.key || <span className="text-slate-400 italic">(Empty Key)</span>}
                            </td>
                            <td className="py-2.5 px-3 sm:px-4 text-slate-600 break-words">
                              {row.value || <span className="text-amber-600 italic">(Missing Value)</span>}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Add Another Table Button */}
      <button
        type="button"
        onClick={onAddTable}
        className="w-full py-3 px-4 rounded-xl border-2 border-dashed border-slate-300 hover:border-[#004060] text-slate-700 hover:text-[#004060] bg-slate-50/50 hover:bg-slate-50 transition-all font-semibold text-xs sm:text-sm inline-flex items-center justify-center gap-2 cursor-pointer shadow-2xs"
      >
        <Plus className="w-4 h-4 text-[#004060]" />
        <span>Add Another Table</span>
      </button>
    </div>
  );
}
