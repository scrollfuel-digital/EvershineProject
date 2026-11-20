import React from "react";
import { X } from "lucide-react";

export default function ActiveFilterChips({
  selectedCategories = [],
  selectedSubCategories = [],
  selectedGrades = [],
  selectedBrands = [],
  selectedSubBrands = [],
  selectedSubGrades = [],
  userCategoryOverride = null,
  onToggleCategory,
  onToggleSubCategory,
  onToggleGrade,
  onToggleBrand,
  onToggleSubBrand,
  onToggleSubGrade,
  onClearOverride,
}) {
  return (
    <div className="flex flex-wrap items-center gap-2.5 mb-5">
      <span className="text-sm font-semibold text-slate-500 mr-1">Active Filters:</span>

      {selectedCategories.map((cat) => (
        <span
          key={`chip-cat-${cat}`}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-sm font-medium bg-[#EBF5FF] text-[#1E40AF] border border-[#BFDBFE]"
        >
          <span>{cat}</span>
          <button
            onClick={() => onToggleCategory(cat)}
            className="hover:text-blue-900 transition cursor-pointer"
            aria-label={`Remove ${cat}`}
          >
            <X className="w-4 h-4" />
          </button>
        </span>
      ))}

      {selectedSubCategories.map((subCat) => (
        <span
          key={`chip-subcat-${subCat}`}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-sm font-medium bg-[#EBF5FF] text-[#1E40AF] border border-[#BFDBFE]"
        >
          <span>{subCat}</span>
          <button
            onClick={() => onToggleSubCategory(subCat)}
            className="hover:text-blue-900 transition cursor-pointer"
            aria-label={`Remove ${subCat}`}
          >
            <X className="w-4 h-4" />
          </button>
        </span>
      ))}

      {selectedGrades.map((grade) => (
        <span
          key={`chip-grade-${grade}`}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-sm font-medium bg-[#F0FDF4] text-[#166534] border border-[#BBF7D0]"
        >
          <span>Grade: {grade}</span>
          <button
            onClick={() => onToggleGrade(grade)}
            className="hover:text-green-900 transition cursor-pointer"
            aria-label={`Remove ${grade}`}
          >
            <X className="w-4 h-4" />
          </button>
        </span>
      ))}

      {selectedBrands.map((brand) => (
        <span
          key={`chip-brand-${brand}`}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-sm font-medium bg-[#FAF5FF] text-[#6B21A8] border border-[#E9D5FF]"
        >
          <span>Brand: {brand}</span>
          <button
            onClick={() => onToggleBrand(brand)}
            className="hover:text-purple-900 transition cursor-pointer"
            aria-label={`Remove ${brand}`}
          >
            <X className="w-4 h-4" />
          </button>
        </span>
      ))}

      {selectedSubBrands.map((subBrand) => (
        <span
          key={`chip-subbrand-${subBrand}`}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-sm font-medium bg-[#FDF4FF] text-[#86198F] border border-[#F5D0FE]"
        >
          <span>Sub-brand: {subBrand}</span>
          <button
            onClick={() => onToggleSubBrand(subBrand)}
            className="hover:text-fuchsia-900 transition cursor-pointer"
            aria-label={`Remove ${subBrand}`}
          >
            <X className="w-4 h-4" />
          </button>
        </span>
      ))}

      {selectedSubGrades.map((sg) => (
        <span
          key={`chip-subgrade-${sg}`}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-sm font-medium bg-[#FEF2F2] text-[#991B1B] border border-[#FECACA]"
        >
          <span>Sub-grade: {sg}</span>
          <button
            onClick={() => onToggleSubGrade(sg)}
            className="hover:text-red-900 transition cursor-pointer"
            aria-label={`Remove ${sg}`}
          >
            <X className="w-4 h-4" />
          </button>
        </span>
      ))}

      {userCategoryOverride &&
        !selectedCategories.includes(userCategoryOverride) &&
        !selectedSubCategories.includes(userCategoryOverride) && (
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-sm font-medium bg-purple-50 text-purple-700 border border-purple-200">
            <span>Selected: {userCategoryOverride}</span>
            <button
              onClick={onClearOverride}
              className="hover:text-purple-900 transition cursor-pointer"
              aria-label="Remove override filter"
            >
              <X className="w-4 h-4" />
            </button>
          </span>
        )}
    </div>
  );
}

