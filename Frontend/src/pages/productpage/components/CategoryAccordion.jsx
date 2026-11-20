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
    <div className="border-b border-white/15 pb-3">
      <button
        onClick={onToggleOpen}
        className="w-full flex items-center justify-between py-2.5 text-left cursor-pointer transition group"
      >
        <span className="text-sm sm:text-base font-extrabold uppercase tracking-wide text-[#FBBF24] flex items-center gap-2">
          <span>Category</span>
          {categoriesCount > 0 && (
            <span className="text-xs font-bold text-white bg-white/15 px-2 py-0.5 rounded-full">
              {categoriesCount}
            </span>
          )}
        </span>
        {isOpen ? (
          <ChevronUp className="w-4.5 h-4.5 text-[#FBBF24] group-hover:scale-110 transition-transform" />
        ) : (
          <ChevronDown className="w-4.5 h-4.5 text-[#FBBF24] group-hover:scale-110 transition-transform" />
        )}
      </button>

      {isOpen && (
        <div className="pt-2 pb-1 space-y-3.5 max-h-64 overflow-y-auto pr-1.5 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-[#003860]/40 [&::-webkit-scrollbar-thumb]:bg-[#285870] [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-[#3b7a9e] [scrollbar-width:thin] [scrollbar-color:#285870_#003860]">
          {loading && categoriesCount === 0 ? (
            <div className="flex items-center gap-2 text-xs font-semibold text-white/70 py-2">
              <Loader2 className="w-4 h-4 animate-spin text-white/70" />
              <span>Loading categories...</span>
            </div>
          ) : categoryGroups.length === 0 ? (
            <p className="text-xs font-semibold text-white/70 py-1">No categories configured.</p>
          ) : (
            categoryGroups.map((group) => {
              const typeName = group.type.name;
              const variants = group.variants || [];

              return (
                <div key={group.type.id || typeName} className="space-y-1.5">
                  {/* Non-clickable Type Header: Weighted & clear */}
                  <div className="text-xs sm:text-[13px] font-extrabold text-[#FBBF24]/90 uppercase tracking-wide select-none">
                    {typeName}
                  </div>

                  {/* Associated Variants Checkboxes */}
                  <div className="space-y-1.5 pl-1">
                    {variants.length > 0 ? (
                      variants.map((variant) => {
                        const isChecked =
                          selectedSubCategories.includes(variant.name) ||
                          selectedSubCategories.includes(variant.id);
                        return (
                          <label
                            key={variant.id || variant.name}
                            className="flex items-center gap-3 text-[14.5px] sm:text-[15.5px] text-white/95 hover:text-white cursor-pointer select-none py-1 transition-colors"
                          >
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={() => onToggleSubCategory(variant.name, typeName)}
                              className="w-4 h-4 rounded border-white/40 text-[#004060] focus:ring-0 accent-[#FBBF24] cursor-pointer shrink-0"
                            />
                            <span className={`leading-snug ${isChecked ? "font-black text-[#FBBF24]" : "font-semibold"}`}>
                              {variant.name}
                            </span>
                          </label>
                        );
                      })
                    ) : (
                      <label className="flex items-center gap-3 text-[14.5px] sm:text-[15.5px] text-white/95 hover:text-white cursor-pointer select-none py-1 transition-colors">
                        <input
                          type="checkbox"
                          checked={
                            selectedSubCategories.includes(typeName) ||
                            selectedSubCategories.includes(group.type.id)
                          }
                          onChange={() => onToggleSubCategory(typeName)}
                          className="w-4 h-4 rounded border-white/40 text-[#004060] focus:ring-0 accent-[#FBBF24] cursor-pointer shrink-0"
                        />
                        <span className={`leading-snug ${selectedSubCategories.includes(typeName) ? "font-black text-[#FBBF24]" : "font-semibold"}`}>
                          {typeName}
                        </span>
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
