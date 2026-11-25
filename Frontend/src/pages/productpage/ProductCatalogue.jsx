import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, SlidersHorizontal } from "lucide-react";
import { useCatalogProducts } from "./hooks/useCatalogProducts";
import FilterSidebar from "./components/FilterSidebar";
import CatalogHeader from "./components/CatalogHeader";
import ActiveFilterChips from "./components/ActiveFilterChips";
import ProductGrid from "./components/ProductGrid";
import CatalogPagination from "./components/CatalogPagination";

export default function ProductCatalogue({ initialCategory = null }) {
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

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
    <div className="min-h-screen bg-[#fdf8ef] text-slate-800 font-sans pt-[116px] sm:pt-[124px] md:pt-[116px] lg:pt-[128px] pb-12 w-full px-4 sm:px-6 lg:px-10 xl:px-16 2xl:px-20">
      <div className="w-full">
        {/* Breadcrumb Navigation - Clickable, large font size, separated by > icon with equal top/bottom spacing */}
        <nav className="flex items-center gap-2.5 text-base sm:text-lg lg:text-[19px] text-slate-700 font-semibold flex-wrap py-5 sm:py-6">
          <Link to="/" className="hover:text-[#004060] transition-colors">
            Home
          </Link>
          <ChevronRight className="w-4.5 h-4.5 sm:w-5 sm:h-5 text-slate-400 shrink-0" />
          <Link to="/products" className="hover:text-[#004060] transition-colors">
            All Products
          </Link>
          {initialCategory && (
            <>
              <ChevronRight className="w-4.5 h-4.5 sm:w-5 sm:h-5 text-slate-400 shrink-0" />
              <Link
                to={`/products?category=${encodeURIComponent(initialCategory)}`}
                className="text-[#004060] font-bold capitalize hover:underline"
              >
                {initialCategory}
              </Link>
            </>
          )}
        </nav>

        {/* Mobile View: Single Trigger Button for Filters Drawer (Only products visible initially) */}
        <div className="lg:hidden mb-5">
          <button
            type="button"
            onClick={() => setIsMobileFilterOpen(true)}
            className="w-full flex items-center justify-between px-4 py-3.5 bg-[#004060] hover:bg-[#003860] active:scale-[0.99] text-white rounded-xl shadow-md border border-white/10 transition-all cursor-pointer"
          >
            <div className="flex items-center gap-2.5">
              <SlidersHorizontal className="w-5 h-5 text-[#FBBF24]" />
              <span className="font-semibold text-[15px] sm:text-base">
                Filters &amp; Categories
              </span>
              {hasActiveFilters && (
                <span className="bg-[#FBBF24] text-[#004060] text-xs font-bold px-2 py-0.5 rounded-full">
                  Active
                </span>
              )}
            </div>
            <span className="flex items-center gap-1 text-xs font-bold text-[#FBBF24] bg-white/10 px-2.5 py-1 rounded-lg">
              View <ChevronRight className="w-4 h-4" />
            </span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          {/* Left Column: Multi-facet Filter Sidebar (Reusable AppSidebar) */}
          <FilterSidebar
            isOpen={isMobileFilterOpen}
            onClose={() => setIsMobileFilterOpen(false)}
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
          <div className="lg:col-span-3 w-full">
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
