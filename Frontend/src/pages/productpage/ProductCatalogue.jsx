import React from "react";
import { useCatalogProducts } from "./hooks/useCatalogProducts";
import FilterSidebar from "./components/FilterSidebar";
import CatalogHeader from "./components/CatalogHeader";
import ActiveFilterChips from "./components/ActiveFilterChips";
import ProductGrid from "./components/ProductGrid";
import CatalogPagination from "./components/CatalogPagination";

export default function ProductCatalogue({ initialCategory = null }) {
  const {
    products,
    productsLoading,
    productsError,
    loadProducts,
    categories,
    filtersLoading,
    nameMap,
    displayedCategoryGroups,
    selectedCategories,
    selectedSubCategories,
    selectedGrades,
    selectedSubBrands,
    selectedBrands,
    selectedSubGrades,
    selectedSubCategory,
    userCategoryOverride,
    setUserCategoryOverride,
    hasActiveFilters,
    categoryOpen,
    setCategoryOpen,
    gradeOpen,
    setGradeOpen,
    subBrandOpen,
    setSubBrandOpen,
    brandOpen,
    setBrandOpen,
    subGradeOpen,
    setSubGradeOpen,
    gradeSearch,
    setGradeSearch,
    subBrandSearch,
    setSubBrandSearch,
    brandSearch,
    setBrandSearch,
    subGradeSearch,
    setSubGradeSearch,
    dynamicGrades,
    dynamicSubBrands,
    dynamicBrands,
    dynamicSubGrades,
    displayedGrades,
    displayedSubBrands,
    displayedBrands,
    displayedSubGrades,
    handleToggleCategory,
    handleToggleSubCategory,
    handleToggleGrade,
    handleToggleSubBrand,
    handleToggleBrand,
    handleToggleSubGrade,
    handleClearFilters,
    filteredProducts,
    currentProducts,
    currentPage,
    setCurrentPage,
    pages,
  } = useCatalogProducts({ initialCategory });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans pt-[80px] md:pt-[125px] lg:pt-[138px] pb-12 w-full px-4 sm:px-6 lg:px-10 xl:px-16 2xl:px-20">
      <div className="w-full">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          {/* Left Column: Multi-facet Filter Sidebar */}
          <FilterSidebar
            categoryOpen={categoryOpen}
            onToggleCategoryOpen={() => setCategoryOpen(!categoryOpen)}
            filtersLoading={filtersLoading}
            categoriesCount={categories.length}
            categoryGroups={displayedCategoryGroups}
            selectedSubCategories={selectedSubCategories}
            onToggleSubCategory={handleToggleSubCategory}
            gradeOpen={gradeOpen}
            onToggleGradeOpen={() => setGradeOpen(!gradeOpen)}
            dynamicGrades={dynamicGrades}
            gradeSearch={gradeSearch}
            onGradeSearchChange={setGradeSearch}
            displayedGrades={displayedGrades}
            selectedGrades={selectedGrades}
            onToggleGrade={handleToggleGrade}
            subBrandOpen={subBrandOpen}
            onToggleSubBrandOpen={() => setSubBrandOpen(!subBrandOpen)}
            dynamicSubBrands={dynamicSubBrands}
            subBrandSearch={subBrandSearch}
            onSubBrandSearchChange={setSubBrandSearch}
            displayedSubBrands={displayedSubBrands}
            selectedSubBrands={selectedSubBrands}
            onToggleSubBrand={handleToggleSubBrand}
            brandOpen={brandOpen}
            onToggleBrandOpen={() => setBrandOpen(!brandOpen)}
            dynamicBrands={dynamicBrands}
            brandSearch={brandSearch}
            onBrandSearchChange={setBrandSearch}
            displayedBrands={displayedBrands}
            selectedBrands={selectedBrands}
            onToggleBrand={handleToggleBrand}
            subGradeOpen={subGradeOpen}
            onToggleSubGradeOpen={() => setSubGradeOpen(!subGradeOpen)}
            dynamicSubGrades={dynamicSubGrades}
            subGradeSearch={subGradeSearch}
            onSubGradeSearchChange={setSubGradeSearch}
            displayedSubGrades={displayedSubGrades}
            selectedSubGrades={selectedSubGrades}
            onToggleSubGrade={handleToggleSubGrade}
          />

          {/* Right Column: Product Cards & Pagination */}
          <div className="lg:col-span-3">
            <CatalogHeader
              selectedSubCategories={selectedSubCategories}
              selectedCategories={selectedCategories}
              selectedSubCategory={selectedSubCategory}
              filteredCount={filteredProducts.length}
              hasActiveFilters={hasActiveFilters}
              onClearFilters={handleClearFilters}
            />

            {hasActiveFilters && (
              <ActiveFilterChips
                selectedCategories={selectedCategories}
                selectedSubCategories={selectedSubCategories}
                selectedGrades={selectedGrades}
                selectedBrands={selectedBrands}
                selectedSubBrands={selectedSubBrands}
                selectedSubGrades={selectedSubGrades}
                userCategoryOverride={userCategoryOverride}
                onToggleCategory={handleToggleCategory}
                onToggleSubCategory={handleToggleSubCategory}
                onToggleGrade={handleToggleGrade}
                onToggleBrand={handleToggleBrand}
                onToggleSubBrand={handleToggleSubBrand}
                onToggleSubGrade={handleToggleSubGrade}
                onClearOverride={() => setUserCategoryOverride(null)}
              />
            )}

            <ProductGrid
              productsLoading={productsLoading}
              productsCount={products.length}
              productsError={productsError}
              onRetry={() => loadProducts(true)}
              filteredCount={filteredProducts.length}
              hasActiveFilters={hasActiveFilters}
              onClearFilters={handleClearFilters}
              currentProducts={currentProducts}
              nameMap={nameMap}
            />

            <CatalogPagination
              currentPage={currentPage}
              totalPages={pages.length}
              totalItems={filteredProducts.length}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
