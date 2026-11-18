// src/pages/Admin/products/addproduct/components/CategoryHierarchySection.jsx
// Step 1: Category & Hierarchy Filters using reusable HierarchyFilterSelect.
import React from "react";
import { FolderTree } from "lucide-react";
import HierarchyFilterSelect from "./HierarchyFilterSelect";

export default function CategoryHierarchySection({
  categoryId,
  categoryTypeId,
  categoryVariantId,
  brandId,
  subBrandId,
  gradeId,
  subGradeId,
  onCategoryChange,
  onTypeChange,
  onVariantChange,
  onBrandChange,
  onSubBrandChange,
  onGradeChange,
  onSubGradeChange,
  categories,
  availableTypes,
  availableVariants,
  allBrands,
  allSubBrands,
  allGrades,
  allSubGrades,
  nameMap,
  filtersLoading,
  formatOptionLabel,
}) {
  const secondaryFilters = [
    { label: "Brand", val: brandId, set: onBrandChange, list: allBrands || [] },
    { label: "Sub-Brand", val: subBrandId, set: onSubBrandChange, list: allSubBrands || [] },
    { label: "Grade", val: gradeId, set: onGradeChange, list: allGrades || [] },
    { label: "Sub-Grade", val: subGradeId, set: onSubGradeChange, list: allSubGrades || [] },
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-7 shadow-[0_1px_3px_rgba(0,0,0,0.05)] space-y-5">
      <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
        <FolderTree className="w-4 h-4 text-[#004060]" />
        <h2 className="text-base font-bold text-slate-900 font-display">Category & Hierarchy Filters</h2>
      </div>

      {/* 1. Category -> 2. Subcategory -> 3. Subcategory Variant */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <HierarchyFilterSelect
          label="Category"
          value={categoryId}
          onChange={onCategoryChange}
          items={categories || []}
          disabled={filtersLoading}
          formatOptionLabel={formatOptionLabel}
          nameMap={nameMap}
        />

        <HierarchyFilterSelect
          label="Subcategory"
          value={categoryTypeId}
          onChange={onTypeChange}
          items={availableTypes || []}
          disabled={!categoryId || availableTypes.length === 0}
          formatOptionLabel={formatOptionLabel}
          nameMap={nameMap}
        />

        <HierarchyFilterSelect
          label="Subcategory Variant"
          value={categoryVariantId}
          onChange={onVariantChange}
          items={availableVariants || []}
          disabled={!categoryTypeId || availableVariants.length === 0}
          formatOptionLabel={formatOptionLabel}
          nameMap={nameMap}
        />
      </div>

      {/* 4. Brand, 5. Sub-Brand, 6. Grade, 7. Sub-Grade */}
      <div className="pt-3 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {secondaryFilters.map(({ label, val, set, list }) => (
          <HierarchyFilterSelect
            key={label}
            label={label}
            value={val}
            onChange={set}
            items={list}
            formatOptionLabel={formatOptionLabel}
            nameMap={nameMap}
          />
        ))}
      </div>
    </div>
  );
}
