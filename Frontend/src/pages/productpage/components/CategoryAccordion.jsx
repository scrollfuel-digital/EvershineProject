import React from "react";
import { ChevronDown, ChevronUp, Loader2 } from "lucide-react";

export default function CategoryAccordion({
  isOpen,
  onToggleOpen,
  loading = false,
  categoriesCount = 0,
  categoryGroups = [],
  selectedSubCategories = [],
  onToggleSubCategory,
}) {
  return (
    <div className="rounded-xl border border-[#E2E8F0] bg-white overflow-hidden transition-all shadow-2xs">
      <button
        onClick={onToggleOpen}
        className="w-full flex items-center justify-between px-4 py-3.5 text-left hover:bg-slate-50 transition cursor-pointer"
      >
        <span className="text-[16px] font-semibold text-slate-800">
          Category
        </span>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-slate-700" />
        ) : (
          <ChevronDown className="w-5 h-5 text-slate-700" />
        )}
      </button>

      {isOpen && (
        <div className="px-4 pb-4 pt-2 bg-white border-t border-slate-100 space-y-4 max-h-[480px] overflow-y-auto">
          {loading && categoriesCount === 0 ? (
            <div className="flex items-center gap-2 text-xs text-slate-400 py-2">
              <Loader2 className="w-4 h-4 animate-spin text-slate-400" />
              <span>Loading categories...</span>
            </div>
          ) : categoryGroups.length === 0 ? (
            <p className="text-xs text-slate-400 py-1">No categories configured.</p>
          ) : (
            categoryGroups.map((group) => {
              const typeName = group.type.name;
              const variants = group.variants || [];

              return (
                <div key={group.type.id || typeName} className="space-y-2">
                  {/* Non-clickable Type Header */}
                  <div className="text-[14.5px] font-semibold text-slate-600 select-none tracking-tight">
                    {typeName}
                  </div>

                  {/* Associated Variants Checkboxes */}
                  <div className="space-y-2.5 pl-0.5">
                    {variants.length > 0 ? (
                      variants.map((variant) => {
                        const isChecked =
                          selectedSubCategories.includes(variant.name) ||
                          selectedSubCategories.includes(variant.id);
                        return (
                          <label
                            key={variant.id || variant.name}
                            className="flex items-center gap-2.5 text-[14px] text-slate-700 hover:text-slate-900 cursor-pointer select-none"
                          >
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={() => onToggleSubCategory(variant.name, typeName)}
                              className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-0 cursor-pointer"
                            />
                            <span>{variant.name}</span>
                          </label>
                        );
                      })
                    ) : (
                      <label className="flex items-center gap-2.5 text-[14px] text-slate-700 hover:text-slate-900 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={
                            selectedSubCategories.includes(typeName) ||
                            selectedSubCategories.includes(group.type.id)
                          }
                          onChange={() => onToggleSubCategory(typeName)}
                          className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-0 cursor-pointer"
                        />
                        <span>{typeName}</span>
                      </label>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}

