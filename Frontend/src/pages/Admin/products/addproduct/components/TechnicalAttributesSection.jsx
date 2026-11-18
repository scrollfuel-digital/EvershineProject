// src/pages/Admin/products/addproduct/components/TechnicalAttributesSection.jsx
// Step 4: Technical Attributes section with space-to-comma value formatting.
import React from "react";
import { Sliders, Plus, Trash2 } from "lucide-react";

/**
 * Formats user input so space-separated values immediately become comma-separated.
 * Works seamlessly for strings, integers, and floating-point doubles.
 */
function formatValuesInput(text) {
  if (!text) return "";
  const cleaned = text.replace(/^\s+/, "");
  if (!cleaned) return "";
  return cleaned
    .replace(/,\s*,/g, ",")
    .replace(/,+/g, ",")
    .replace(/,\s+/g, ", ")
    .replace(/(?<!,)\s+/g, ", ");
}

export default function TechnicalAttributesSection({
  attributes,
  onAddAttribute,
  onUpdateAttribute,
  onRemoveAttribute,
}) {
  const handleValuesChange = (e, index) => {
    const input = e.target;
    const raw = input.value;
    const cursor = input.selectionStart;
    const formatted = formatValuesInput(raw);

    onUpdateAttribute(index, "valuesText", formatted);

    if (formatted !== raw && cursor != null) {
      const diff = formatted.length - raw.length;
      const newCursor = Math.max(0, cursor + diff);
      requestAnimationFrame(() => {
        try {
          input.setSelectionRange(newCursor, newCursor);
        } catch {
          // ignore if unmounted
        }
      });
    }
  };

  const handleValuesBlur = (index) => {
    const currentVal = attributes[index]?.valuesText || "";
    const trimmed = currentVal.replace(/[\s,]+$/, "");
    if (trimmed !== currentVal) {
      onUpdateAttribute(index, "valuesText", trimmed);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-7 shadow-[0_1px_3px_rgba(0,0,0,0.05)] space-y-4">
      <div className="flex items-center justify-between pb-2 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <Sliders className="w-4 h-4 text-[#004060]" />
          <h2 className="text-base font-bold text-slate-900 font-display">Technical Attributes *</h2>
        </div>
        <button
          type="button"
          onClick={onAddAttribute}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#004060] bg-blue-50 hover:bg-blue-100 rounded-lg cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Attribute</span>
        </button>
      </div>

      {attributes.length === 0 ? (
        <div className="text-center py-5 border border-dashed border-slate-200 rounded-xl text-slate-400 text-xs">
          No technical attributes configured. Click &quot;Add Attribute&quot; to add specifications.
        </div>
      ) : (
        <div className="space-y-3">
          {attributes.map((attr, index) => (
            <div key={index} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 items-end">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">Label *</label>
                  <input
                    type="text"
                    required
                    value={attr.label}
                    onChange={(e) => onUpdateAttribute(index, "label", e.target.value)}
                    placeholder="e.g. Thickness"
                    className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">Unit</label>
                  <input
                    type="text"
                    value={attr.unit}
                    onChange={(e) => onUpdateAttribute(index, "unit", e.target.value)}
                    placeholder="e.g. mm"
                    className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">Values (comma or space)</label>
                  <input
                    type="text"
                    value={attr.valuesText}
                    onChange={(e) => handleValuesChange(e, index)}
                    onBlur={() => handleValuesBlur(index)}
                    placeholder="1000 2000 or 0.45 0.50"
                    className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">Min / Max</label>
                  <div className="flex gap-1">
                    <input
                      type="text"
                      value={attr.min}
                      onChange={(e) => onUpdateAttribute(index, "min", e.target.value)}
                      placeholder="Min"
                      className="w-1/2 px-2 py-1.5 bg-white border border-slate-300 rounded-lg text-xs"
                    />
                    <input
                      type="text"
                      value={attr.max}
                      onChange={(e) => onUpdateAttribute(index, "max", e.target.value)}
                      placeholder="Max"
                      className="w-1/2 px-2 py-1.5 bg-white border border-slate-300 rounded-lg text-xs"
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between pt-1">
                  <label className="flex items-center gap-1.5 text-[11px] text-slate-600 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={attr.customInput}
                      onChange={(e) => onUpdateAttribute(index, "customInput", e.target.checked)}
                      className="rounded border-slate-300 text-[#004060]"
                    />
                    <span>Custom</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => onRemoveAttribute(index)}
                    className="text-slate-400 hover:text-rose-600 p-1 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
