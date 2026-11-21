import React from "react";
import { SlidersHorizontal } from "lucide-react";
import AppSidebar from "../../../components/ui/AppSidebar";
import CategoryAccordion from "./CategoryAccordion";
import FacetAccordion from "./FacetAccordion";

export default function FilterSidebar({
  isOpen = false,
  onClose,
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
    <AppSidebar
      isOpen={isOpen}
      onClose={onClose}
      title="Filter"
      icon={SlidersHorizontal}
      desktopColSpan="lg:col-span-1"
      stickyTopOffset={130}
    >
      <div className="space-y-3">
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
    </AppSidebar>
  );
}
