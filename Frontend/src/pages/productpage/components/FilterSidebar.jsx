import React from "react";
import { SlidersHorizontal } from "lucide-react";
import CategoryAccordion from "./CategoryAccordion";
import FacetAccordion from "./FacetAccordion";

export default function FilterSidebar({
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
      {/* Breadcrumb Navigation on top */}
      <nav className="flex items-center gap-1.5 text-sm text-[#64748B] mb-1 font-medium">
        <a href="/" className="hover:text-[#004060] transition">
          Home
        </a>
        <span className="text-slate-400 text-xs">›</span>
        <span className="text-[#0F172A] font-semibold">All products</span>
      </nav>

      {/* Main Unified Filter Sidebar Container: Web Blue (#004060) */}
      <div className="bg-[#004060] text-white rounded-2xl p-5 border border-[#003860] shadow-md space-y-3">
        {/* Filter Header: "FILTER" (Golden Accent) */}
        <div className="flex items-center gap-2.5 pb-3.5 border-b border-white/15">
          <SlidersHorizontal className="w-5.5 h-5.5 text-[#FBBF24]" />
          <span className="text-lg sm:text-xl font-black uppercase tracking-wide text-[#FBBF24]">
            Filter
          </span>
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
      </div>
    </aside>
  );
}
