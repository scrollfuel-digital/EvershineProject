// src/pages/Admin/products/ProductFilterBar.jsx
// Lightweight, reusable filter bar for catalogues across Overview and Update & Delete views.
import React, { useMemo } from "react";
import { Search } from "lucide-react";
import { useDataProcess } from "./dataProccess";

const formatLabel = (item) => {
  if (!item) return "";
  const isUnavailable = item.active === false || item.status === "INACTIVE";
  return isUnavailable ? `${item.name} (Unavailable)` : item.name;
};

export default function ProductFilterBar({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedType,
  onTypeChange,
  selectedVariant,
  onVariantChange,
  selectedBrand,
  onBrandChange,
  selectedSubBrand,
  onSubBrandChange,
  selectedGrade,
  onGradeChange,
  selectedSubGrade,
  onSubGradeChange,
  onResetFilters,
  hasFilters,
}) {
  const {
    categories = [],
    categoryTypesMap,
    categoryVariantsMap,
    allBrands = [],
    allSubBrands = [],
    allGrades = [],
    allSubGrades = [],
    nameMap,
  } = useDataProcess();

  const availableTypes = useMemo(
    () => (selectedCategory ? categoryTypesMap?.get(selectedCategory) || [] : []),
    [selectedCategory, categoryTypesMap]
  );

  const availableVariants = useMemo(
    () => (selectedType ? categoryVariantsMap?.get(selectedType) || [] : []),
    [selectedType, categoryVariantsMap]
  );

  const hierarchyFilters = [
    { label: "All Categories", val: selectedCategory, set: onCategoryChange, list: categories },
    { label: "All Types", val: selectedType, set: onTypeChange, list: availableTypes, disabled: !selectedCategory },
    { label: "All Variants", val: selectedVariant, set: onVariantChange, list: availableVariants, disabled: !selectedType },
  ];

  const attributeFilters = [
    { label: "All Brands", val: selectedBrand, set: onBrandChange, list: allBrands },
    { label: "All Sub-Brands", val: selectedSubBrand, set: onSubBrandChange, list: allSubBrands },
    { label: "All Grades", val: selectedGrade, set: onGradeChange, list: allGrades },
    { label: "All Sub-Grades", val: selectedSubGrade, set: onSubGradeChange, list: allSubGrades },
  ];

  const activeBadges = [
    { label: "Cat", val: selectedCategory, clear: () => onCategoryChange("") },
    { label: "Type", val: selectedType, clear: () => onTypeChange("") },
    { label: "Variant", val: selectedVariant, clear: () => onVariantChange("") },
    { label: "Brand", val: selectedBrand, clear: () => onBrandChange("") },
    { label: "Sub-Brand", val: selectedSubBrand, clear: () => onSubBrandChange("") },
    { label: "Grade", val: selectedGrade, clear: () => onGradeChange("") },
    { label: "Sub-Grade", val: selectedSubGrade, clear: () => onSubGradeChange("") },
  ].filter((b) => Boolean(b.val));

  return (
    <div className="bg-slate-50/80 rounded-xl border border-slate-200/80 p-4 space-y-3">
      {/* Row 1: Search & Hierarchy */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search title, brand, attribute..."
            className="w-full pl-9 pr-3 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#004060]/20 focus:border-[#004060]"
          />
        </div>

        {hierarchyFilters.map(({ label, val, set, list, disabled }) => (
          <select
            key={label}
            value={val}
            onChange={(e) => set(e.target.value)}
            disabled={disabled}
            className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#004060]/20 focus:border-[#004060] disabled:bg-slate-100 disabled:text-slate-400 cursor-pointer"
          >
            <option value="">{label}</option>
            {list.map((item) => (
              <option key={item.id} value={item.id}>
                {formatLabel(item)}
              </option>
            ))}
          </select>
        ))}
      </div>

      {/* Row 2: Attributes */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1.5 border-t border-slate-200/60">
        {attributeFilters.map(({ label, val, set, list }) => (
          <select
            key={label}
            value={val}
            onChange={(e) => set(e.target.value)}
            className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#004060]/20 focus:border-[#004060] cursor-pointer"
          >
            <option value="">{label}</option>
            {list.map((item) => (
              <option key={item.id} value={item.id}>
                {formatLabel(item)}
              </option>
            ))}
          </select>
        ))}
      </div>

      {/* Active Badges */}
      {hasFilters && (
        <div className="flex flex-wrap items-center gap-2 pt-1 text-xs sm:text-sm">
          <span className="text-slate-500 font-medium mr-1">Active:</span>
          {activeBadges.map(({ label, val, clear }) => (
            <span
              key={label}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-blue-50 text-blue-700 border border-blue-200 text-xs sm:text-sm"
            >
              <span>
                {label}: {nameMap?.get(val) || "Selected"}
              </span>
              <button
                type="button"
                onClick={clear}
                className="hover:text-blue-900 cursor-pointer font-bold text-sm"
              >
                ×
              </button>
            </span>
          ))}
          <button
            type="button"
            onClick={onResetFilters}
            className="text-sm text-rose-600 hover:text-rose-800 font-semibold underline ml-auto cursor-pointer"
          >
            Clear all
          </button>
        </div>
      )}
    </div>
  );
}
