import React from "react";
import { RotateCcw } from "lucide-react";

export default function CatalogHeader({
  selectedSubCategories = [],
  selectedCategories = [],
  selectedSubCategory = null,
  filteredCount = 0,
  hasActiveFilters = false,
  onClearFilters,
}) {
  const title =
    selectedSubCategories.length > 0
      ? selectedSubCategories.join(", ")
      : selectedCategories.length > 0
      ? selectedCategories.join(", ")
      : selectedSubCategory || "All Products";

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
      <div className="flex items-center gap-3 flex-wrap">
        <h1 className="text-2xl font-bold text-slate-900 font-display">
          {title}
        </h1>
        <span className="text-sm font-medium text-slate-500 bg-slate-200/60 px-3 py-1 rounded-full">
          Found <strong className="text-slate-800">{filteredCount}</strong> results
        </span>
      </div>

      {hasActiveFilters && (
        <div className="flex items-center gap-4">
          <button
            onClick={onClearFilters}
            className="text-sm font-semibold text-blue-600 hover:text-blue-700 hover:underline flex items-center gap-1.5 transition cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}

