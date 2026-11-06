import React from "react";
import { SlidersHorizontal } from "lucide-react";
import CategoryAccordion from "./CategoryAccordion";
import FacetAccordion from "./FacetAccordion";

export default function FilterSidebar({
  hasActiveFilters,
  onClearFilters,
  // Category Accordion
  categoryOpen,
  onToggleCategoryOpen,
  filtersLoading,
  categoriesCount,
  categoryGroups,
  selectedSubCategories,
  onToggleSubCategory,
  // Grade Accordion
  gradeOpen,
  onToggleGradeOpen,
  dynamicGrades,
  gradeSearch,
  onGradeSearchChange,
  displayedGrades,
  selectedGrades,
  onToggleGrade,
  // Sub-brand Accordion
  subBrandOpen,
  onToggleSubBrandOpen,
  dynamicSubBrands,
  subBrandSearch,
  onSubBrandSearchChange,
  displayedSubBrands,
  selectedSubBrands,
  onToggleSubBrand,
  // Brand Accordion
  brandOpen,
  onToggleBrandOpen,
  dynamicBrands,
  brandSearch,
  onBrandSearchChange,
  displayedBrands,
  selectedBrands,
  onToggleBrand,
  // Sub-grade Accordion
  subGradeOpen,
  onToggleSubGradeOpen,
  dynamicSubGrades,
  subGradeSearch,
  onSubGradeSearchChange,
  displayedSubGrades,
  selectedSubGrades,
  onToggleSubGrade,
}) {
  const brandMatcher = (brand, selected) =>
    selected.some(
      (sb) =>
        sb.toLowerCase() === brand.toLowerCase() ||
        (sb.toLowerCase().includes("tata") && brand.toLowerCase().includes("tata")) ||
        ((sb.toLowerCase().includes("amns") || sb.toLowerCase().includes("am/ns")) &&
          (brand.toLowerCase().includes("amns") || brand.toLowerCase().includes("am/ns")))
    );

  return (
    <aside className="w-full lg:self-start space-y-3 z-10">
      {/* Breadcrumb & Filter Header */}
      <div className="mb-2">
        <nav className="flex items-center gap-1.5 text-sm text-[#64748B] mb-3">
          <a href="/" className="hover:text-blue-600 transition">
            Home
          </a>
          <span className="text-slate-400 text-xs">›</span>
          <span className="text-[#0F172A] font-medium">All products</span>
        </nav>

        {/* Filter Header: "Filter" on Left, "Clear filters" on Right */}
        <div className="flex items-center justify-between pb-3">
          <div className="flex items-center gap-2.5">
            <SlidersHorizontal className="w-5 h-5 text-slate-800" />
            <span className="text-xl font-bold text-[#0F172A]">Filter</span>
          </div>
          {hasActiveFilters && (
            <button
              onClick={onClearFilters}
              className="text-sm font-semibold text-[#1A56DB] hover:text-blue-800 hover:underline transition cursor-pointer"
            >
              Clear filters
            </button>
          )}
        </div>
      </div>

      {/* 1. Category Accordion */}
      <CategoryAccordion
        isOpen={categoryOpen}
        onToggleOpen={onToggleCategoryOpen}
        loading={filtersLoading}
        categoriesCount={categoriesCount}
        categoryGroups={categoryGroups}
        selectedSubCategories={selectedSubCategories}
        onToggleSubCategory={onToggleSubCategory}
      />

      {/* 2. Grade Accordion */}
      <FacetAccordion
        title="Grade"
        isOpen={gradeOpen}
        onToggleOpen={onToggleGradeOpen}
        itemsCount={dynamicGrades.length}
        loading={filtersLoading}
        searchValue={gradeSearch}
        onSearchChange={onGradeSearchChange}
        displayedItems={displayedGrades}
        selectedItems={selectedGrades}
        onToggleItem={onToggleGrade}
      />

      {/* 3. Sub brand Accordion */}
      <FacetAccordion
        title="Sub brand"
        isOpen={subBrandOpen}
        onToggleOpen={onToggleSubBrandOpen}
        itemsCount={dynamicSubBrands.length}
        loading={filtersLoading}
        searchValue={subBrandSearch}
        onSearchChange={onSubBrandSearchChange}
        displayedItems={displayedSubBrands}
        selectedItems={selectedSubBrands}
        onToggleItem={onToggleSubBrand}
      />

      {/* 4. Brand Accordion */}
      <FacetAccordion
        title="Brand"
        isOpen={brandOpen}
        onToggleOpen={onToggleBrandOpen}
        itemsCount={dynamicBrands.length}
        loading={filtersLoading}
        searchValue={brandSearch}
        onSearchChange={onBrandSearchChange}
        displayedItems={displayedBrands}
        selectedItems={selectedBrands}
        onToggleItem={onToggleBrand}
        checkMatcher={brandMatcher}
      />

      {/* 5. Sub grade Accordion */}
      <FacetAccordion
        title="Sub grade"
        isOpen={subGradeOpen}
        onToggleOpen={onToggleSubGradeOpen}
        itemsCount={dynamicSubGrades.length}
        loading={filtersLoading}
        searchValue={subGradeSearch}
        onSearchChange={onSubGradeSearchChange}
        displayedItems={displayedSubGrades}
        selectedItems={selectedSubGrades}
        onToggleItem={onToggleSubGrade}
      />
    </aside>
  );
}

