import { useState, useMemo, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  ChevronUp,
  SlidersHorizontal,
  Truck,
  X,
  ShoppingCart,
  CheckCircle,
  RotateCcw,
  Search,
  Tag
} from 'lucide-react';
import { categoryListData } from '../../data/categoryListData';
import { CATEGORY_GROUPS, MS_HOT_ROLLED_SUB_CATEGORIES, COLOUR_COATED_SUB_CATEGORIES, COATED_STEEL_SUB_CATEGORIES, MS_COLD_ROLLED_SUB_CATEGORIES } from '../../data/filterData';
import { SAMPLE_PRODUCTS } from '../../data/sampleProducts';
import { useProductFilters } from '../../hooks/useProductFilters';
import CategoryCarousel from './CategoryCarousel';

export default function ProductDetails({ initialCategory = null }) {
  const { slug, categoryName, categorySlug } = useParams();
  const navigate = useNavigate();

  const currentSlug = slug || categoryName || categorySlug;

  // Resolve category label from URL slug parameter
  const matchedCategoryFromSlug = useMemo(() => {
    if (!currentSlug) return null;
    const cleanSlug = currentSlug.toLowerCase().replace(/^\//, '');
    const found = categoryListData.find(cat => {
      const catHref = cat.href.toLowerCase().replace(/^\//, '');
      const catSlug = cat.label.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      return catHref === cleanSlug || catSlug === cleanSlug || cat.label.toLowerCase() === cleanSlug;
    });
    return found ? found.label : null;
  }, [currentSlug]);

  // Track explicit user selection with fallback to URL slug / initialCategory
  const [userCategoryOverride, setUserCategoryOverride] = useState(null);
  const selectedSubCategory = userCategoryOverride ?? (matchedCategoryFromSlug || initialCategory || null);

  const handleSubCategoryClick = (cat) => {
    const isCurrentlyActive = selectedSubCategory === cat.label;
    if (isCurrentlyActive) {
      setUserCategoryOverride(null);
      navigate('/products');
    } else {
      setUserCategoryOverride(cat.label);
      navigate(cat.href);
    }
  };

  // Filter and Accordion State via useProductFilters custom hook
  const {
    selectedCategories,
    handleToggleCategory,
    selectedSubCategories,
    handleToggleSubCategory,
    selectedGrades,
    handleToggleGrade,
    selectedSubBrands,
    handleToggleSubBrand,
    selectedBrands,
    handleToggleBrand,
    selectedSubGrades,
    handleToggleSubGrade,
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
    displayedGrades,
    displayedSubBrands,
    displayedBrands,
    displayedSubGrades,
    isCategoryActive,
    availableGrades,
    availableSubBrands,
    availableBrands,
    availableSubGrades,
    filteredProducts,
    handleClearFilters: clearFiltersHook,
    hasActiveFilters
  } = useProductFilters(
    SAMPLE_PRODUCTS,
    selectedSubCategory,
    userCategoryOverride !== null,
    matchedCategoryFromSlug ? [matchedCategoryFromSlug] : (initialCategory ? [initialCategory] : [])
  );

  const handleClearFilters = () => {
    setUserCategoryOverride(null);
    clearFiltersHook();
  };

  // Selected Product for purchase modal
  const [activeModalProduct, setActiveModalProduct] = useState(null);
  const [orderSubmitted, setOrderSubmitted] = useState(false);

  // Pagination State: 7 rows of 3 cards = 21 cards per page
  const ITEMS_PER_PAGE = 21;
  const [currentPage, setCurrentPage] = useState(1);

  // Reset to page 1 whenever filters or subcategory change
  useEffect(() => {
    setCurrentPage(1);
  }, [
    selectedCategories,
    selectedSubCategories,
    selectedGrades,
    selectedSubBrands,
    selectedBrands,
    selectedSubGrades,
    selectedSubCategory
  ]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);

  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans pt-[90px] lg:pt-[110px] pb-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">

        {/* Sub-Category Horizontal Showcase Carousel - Continuous Slider */}
        <CategoryCarousel
          categories={categoryListData}
          selectedSubCategory={selectedSubCategory}
          onSubCategoryClick={handleSubCategoryClick}
        />

        {/* Main Grid: Sidebar + Product Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">

          {/* Left Sidebar Filter Column matching JSW One MSME Reference Screenshot */}
          <aside className="w-full lg:self-start space-y-3 z-10">

            {/* Breadcrumb matching JSW One MSME screenshot */}
            <div className="mb-2">
              <nav className="flex items-center gap-1.5 text-sm text-[#64748B] mb-3">
                <a href="/" className="hover:text-blue-600 transition">Home</a>
                <span className="text-slate-400 text-xs">›</span>
                <span className="text-[#0F172A] font-medium">All products</span>
              </nav>

              {/* Filter Header: "Filter" on Left with 2-slider icon, "Clear filters" on Right */}
              <div className="flex items-center justify-between pb-3">
                <div className="flex items-center gap-2.5">
                  <SlidersHorizontal className="w-5 h-5 text-slate-800" />
                  <span className="text-xl font-bold text-[#0F172A]">Filter</span>
                </div>
                <button
                  onClick={handleClearFilters}
                  className="text-sm font-semibold text-[#1A56DB] hover:text-blue-800 hover:underline transition cursor-pointer"
                >
                  Clear filters
                </button>
              </div>
            </div>

            {/* 1. Category Accordion Card */}
            <div className="rounded-xl border border-[#E2E8F0] bg-[#F4F6FB] overflow-hidden transition-all shadow-2xs">
              <button
                onClick={() => setCategoryOpen(!categoryOpen)}
                className="w-full flex items-center justify-between px-4 py-3.5 text-left hover:bg-[#EEF2F8] transition cursor-pointer"
              >
                <span className="text-[15px] font-medium text-[#0F172A]">Category</span>
                {categoryOpen ? (
                  <ChevronUp className="w-5 h-5 text-[#0F172A]" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-[#0F172A]" />
                )}
              </button>

              {categoryOpen && (
                <div className="px-4 py-3.5 bg-white border-t border-[#E2E8F0] space-y-3">
                  {CATEGORY_GROUPS.map((group, gIdx) => (
                    <div key={group.groupName} className={gIdx > 0 ? "pt-1" : ""}>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-[#4B5563] mb-2">
                        {group.groupName}
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {group.items.map((item) => {
                          const isChecked = selectedCategories.includes(item);
                          if (item === 'Colour coated') {
                            return (
                              <div key={item} className="w-full flex flex-col gap-2">
                                <span
                                  onClick={() => handleToggleCategory(item)}
                                  className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-medium cursor-pointer transition-all border select-none w-fit ${isChecked
                                      ? 'bg-blue-50 text-[#004060] border-blue-300 font-semibold shadow-xs'
                                      : 'bg-white text-slate-800 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                                    }`}
                                >
                                  <input
                                    type="checkbox"
                                    checked={isChecked}
                                    onChange={() => { }}
                                    className="w-3.5 h-3.5 rounded-[2px] border-[#64748B] text-[#004060] pointer-events-none"
                                  />
                                  <span>{item}</span>
                                </span>

                                {/* Ordered list of Sub-categories with clickable checkboxes directly below Colour coated */}
                                <div className="flex flex-col gap-1.5 pl-3 ml-2 border-l-2 border-slate-200 py-1">
                                  {COLOUR_COATED_SUB_CATEGORIES.map((subCat) => {
                                    const isSubChecked = selectedSubCategories.includes(subCat);
                                    return (
                                      <span
                                        key={subCat}
                                        onClick={() => handleToggleSubCategory(subCat)}
                                        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-medium cursor-pointer transition-all border select-none w-fit ${isSubChecked
                                            ? 'bg-blue-50 text-[#004060] border-blue-300 font-semibold shadow-xs'
                                            : 'bg-white text-slate-800 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                                          }`}
                                      >
                                        <input
                                          type="checkbox"
                                          checked={isSubChecked}
                                          onChange={() => { }}
                                          className="w-3.5 h-3.5 rounded-[2px] border-[#64748B] text-[#004060] pointer-events-none"
                                        />
                                        <span>{subCat}</span>
                                      </span>
                                    );
                                  })}
                                </div>
                              </div>
                            );
                          }
                          if (item === 'MS Hot rolled') {
                            return (
                              <div key={item} className="w-full flex flex-col gap-2">
                                <span
                                  onClick={() => handleToggleCategory(item)}
                                  className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-medium cursor-pointer transition-all border select-none w-fit ${isChecked
                                      ? 'bg-blue-50 text-[#004060] border-blue-300 font-semibold shadow-xs'
                                      : 'bg-white text-slate-800 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                                    }`}
                                >
                                  <input
                                    type="checkbox"
                                    checked={isChecked}
                                    onChange={() => { }}
                                    className="w-3.5 h-3.5 rounded-[2px] border-[#64748B] text-[#004060] pointer-events-none"
                                  />
                                  <span>{item}</span>
                                </span>

                                {/* Ordered list of Sub-categories with clickable checkboxes directly below MS hot rolled */}
                                <div className="flex flex-col gap-1.5 pl-3 ml-2 border-l-2 border-slate-200 py-1">
                                  {MS_HOT_ROLLED_SUB_CATEGORIES.map((subCat) => {
                                    const isSubChecked = selectedSubCategories.includes(subCat);
                                    return (
                                      <span
                                        key={subCat}
                                        onClick={() => handleToggleSubCategory(subCat)}
                                        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-medium cursor-pointer transition-all border select-none w-fit ${isSubChecked
                                            ? 'bg-blue-50 text-[#004060] border-blue-300 font-semibold shadow-xs'
                                            : 'bg-white text-slate-800 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                                          }`}
                                      >
                                        <input
                                          type="checkbox"
                                          checked={isSubChecked}
                                          onChange={() => { }}
                                          className="w-3.5 h-3.5 rounded-[2px] border-[#64748B] text-[#004060] pointer-events-none"
                                        />
                                        <span>{subCat}</span>
                                      </span>
                                    );
                                  })}
                                </div>
                              </div>
                            );
                          }
                          if (item === 'Coated Steel') {
                            return (
                              <div key={item} className="w-full flex flex-col gap-2">
                                <span
                                  onClick={() => handleToggleCategory(item)}
                                  className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-medium cursor-pointer transition-all border select-none w-fit ${isChecked
                                      ? 'bg-blue-50 text-[#004060] border-blue-300 font-semibold shadow-xs'
                                      : 'bg-white text-slate-800 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                                    }`}
                                >
                                  <input
                                    type="checkbox"
                                    checked={isChecked}
                                    onChange={() => { }}
                                    className="w-3.5 h-3.5 rounded-[2px] border-[#64748B] text-[#004060] pointer-events-none"
                                  />
                                  <span>{item}</span>
                                </span>

                                {/* Ordered list of Sub-categories with clickable checkboxes directly below Coated Steel */}
                                <div className="flex flex-col gap-1.5 pl-3 ml-2 border-l-2 border-slate-200 py-1">
                                  {COATED_STEEL_SUB_CATEGORIES.map((subCat) => {
                                    const isSubChecked = selectedSubCategories.includes(subCat);
                                    return (
                                      <span
                                        key={subCat}
                                        onClick={() => handleToggleSubCategory(subCat)}
                                        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-medium cursor-pointer transition-all border select-none w-fit ${isSubChecked
                                            ? 'bg-blue-50 text-[#004060] border-blue-300 font-semibold shadow-xs'
                                            : 'bg-white text-slate-800 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                                          }`}
                                      >
                                        <input
                                          type="checkbox"
                                          checked={isSubChecked}
                                          onChange={() => { }}
                                          className="w-3.5 h-3.5 rounded-[2px] border-[#64748B] text-[#004060] pointer-events-none"
                                        />
                                        <span>{subCat}</span>
                                      </span>
                                    );
                                  })}
                                </div>
                              </div>
                            );
                          }
                          if (item === 'MS Cold rolled') {
                            return (
                              <div key={item} className="w-full flex flex-col gap-2">
                                <span
                                  onClick={() => handleToggleCategory(item)}
                                  className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-medium cursor-pointer transition-all border select-none w-fit ${isChecked
                                      ? 'bg-blue-50 text-[#004060] border-blue-300 font-semibold shadow-xs'
                                      : 'bg-white text-slate-800 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                                    }`}
                                >
                                  <input
                                    type="checkbox"
                                    checked={isChecked}
                                    onChange={() => { }}
                                    className="w-3.5 h-3.5 rounded-[2px] border-[#64748B] text-[#004060] pointer-events-none"
                                  />
                                  <span>{item}</span>
                                </span>

                                {/* Ordered list of Sub-categories with clickable checkboxes directly below MS Cold rolled */}
                                <div className="flex flex-col gap-1.5 pl-3 ml-2 border-l-2 border-slate-200 py-1">
                                  {MS_COLD_ROLLED_SUB_CATEGORIES.map((subCat) => {
                                    const isSubChecked = selectedSubCategories.includes(subCat);
                                    return (
                                      <span
                                        key={subCat}
                                        onClick={() => handleToggleSubCategory(subCat)}
                                        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-medium cursor-pointer transition-all border select-none w-fit ${isSubChecked
                                            ? 'bg-blue-50 text-[#004060] border-blue-300 font-semibold shadow-xs'
                                            : 'bg-white text-slate-800 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                                          }`}
                                      >
                                        <input
                                          type="checkbox"
                                          checked={isSubChecked}
                                          onChange={() => { }}
                                          className="w-3.5 h-3.5 rounded-[2px] border-[#64748B] text-[#004060] pointer-events-none"
                                        />
                                        <span>{subCat}</span>
                                      </span>
                                    );
                                  })}
                                </div>
                              </div>
                            );
                          }
                          return (
                            <span
                              key={item}
                              onClick={() => handleToggleCategory(item)}
                              className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-medium cursor-pointer transition-all border select-none ${isChecked
                                  ? 'bg-blue-50 text-[#004060] border-blue-300 font-semibold shadow-xs'
                                  : 'bg-white text-slate-800 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                                }`}
                            >
                              <input
                                type="checkbox"
                                checked={isChecked}
                                onChange={() => { }}
                                className="w-3.5 h-3.5 rounded-[2px] border-[#64748B] text-[#004060] pointer-events-none"
                              />
                              <span>{item}</span>
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* 2. Grade Accordion Card */}
            <div className="rounded-xl border border-[#E2E8F0] bg-[#F4F6FB] overflow-hidden transition-all shadow-2xs">
              <button
                onClick={() => setGradeOpen(!gradeOpen)}
                className="w-full flex items-center justify-between px-4 py-3.5 text-left hover:bg-[#EEF2F8] transition cursor-pointer"
              >
                <span className="text-[15px] font-medium text-[#0F172A] flex items-center gap-1.5">
                  Grade {isCategoryActive && <span className="text-xs font-normal text-slate-400">({availableGrades.length})</span>}
                </span>
                {gradeOpen ? (
                  <ChevronUp className="w-5 h-5 text-[#0F172A]" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-[#0F172A]" />
                )}
              </button>

              {gradeOpen && (
                <div className="bg-white border-t border-[#E2E8F0]">
                  <div className="p-3 border-b border-slate-100 bg-slate-50/50">
                    <div className="relative flex items-center">
                      <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 pointer-events-none" />
                      <input
                        type="text"
                        placeholder="Search grade..."
                        value={gradeSearch}
                        onChange={(e) => setGradeSearch(e.target.value)}
                        className="w-full text-xs pl-8 pr-7 py-1.5 border border-slate-200 rounded-md focus:outline-none focus:border-blue-500 bg-white"
                      />
                      {gradeSearch && (
                        <button
                          onClick={() => setGradeSearch('')}
                          className="absolute right-2 text-slate-400 hover:text-slate-600 cursor-pointer"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="p-3.5 flex flex-wrap gap-2">
                    {displayedGrades.length === 0 ? (
                      <p className="text-xs text-slate-400 py-2 w-full text-center">
                        {gradeSearch ? `No grades matching "${gradeSearch}"` : "No grades available for selected category"}
                      </p>
                    ) : (
                      displayedGrades.map((grade) => {
                        const isChecked = selectedGrades.includes(grade);
                        return (
                          <span
                            key={grade}
                            onClick={() => handleToggleGrade(grade)}
                            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-medium cursor-pointer transition-all border select-none ${isChecked
                                ? 'bg-blue-50 text-[#004060] border-blue-300 font-semibold shadow-xs'
                                : 'bg-white text-slate-800 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                              }`}
                          >
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={() => { }}
                              className="w-3.5 h-3.5 rounded-[2px] border-[#64748B] text-[#004060] pointer-events-none"
                            />
                            <span>{grade}</span>
                          </span>
                        );
                      })
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* 3. Sub brand Accordion Card */}
            <div className="rounded-xl border border-[#E2E8F0] bg-[#F4F6FB] overflow-hidden transition-all shadow-2xs">
              <button
                onClick={() => setSubBrandOpen(!subBrandOpen)}
                className="w-full flex items-center justify-between px-4 py-3.5 text-left hover:bg-[#EEF2F8] transition cursor-pointer"
              >
                <span className="text-[15px] font-medium text-[#0F172A] flex items-center gap-1.5">
                  Sub brand {isCategoryActive && <span className="text-xs font-normal text-slate-400">({availableSubBrands.length})</span>}
                </span>
                {subBrandOpen ? (
                  <ChevronUp className="w-5 h-5 text-[#0F172A]" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-[#0F172A]" />
                )}
              </button>

              {subBrandOpen && (
                <div className="bg-white border-t border-[#E2E8F0]">
                  <div className="p-3 border-b border-slate-100 bg-slate-50/50">
                    <div className="relative flex items-center">
                      <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 pointer-events-none" />
                      <input
                        type="text"
                        placeholder="Search sub brand..."
                        value={subBrandSearch}
                        onChange={(e) => setSubBrandSearch(e.target.value)}
                        className="w-full text-xs pl-8 pr-7 py-1.5 border border-slate-200 rounded-md focus:outline-none focus:border-blue-500 bg-white"
                      />
                      {subBrandSearch && (
                        <button
                          onClick={() => setSubBrandSearch('')}
                          className="absolute right-2 text-slate-400 hover:text-slate-600 cursor-pointer"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="p-3.5 flex flex-wrap gap-2">
                    {displayedSubBrands.length === 0 ? (
                      <p className="text-xs text-slate-400 py-2 w-full text-center">
                        {subBrandSearch ? `No sub-brands matching "${subBrandSearch}"` : "No sub-brands available for selected category"}
                      </p>
                    ) : (
                      displayedSubBrands.map((subBrand) => {
                        const isChecked = selectedSubBrands.includes(subBrand);
                        return (
                          <span
                            key={subBrand}
                            onClick={() => handleToggleSubBrand(subBrand)}
                            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-medium cursor-pointer transition-all border select-none ${isChecked
                                ? 'bg-blue-50 text-[#004060] border-blue-300 font-semibold shadow-xs'
                                : 'bg-white text-slate-800 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                              }`}
                          >
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={() => { }}
                              className="w-3.5 h-3.5 rounded-[2px] border-[#64748B] text-[#004060] pointer-events-none"
                            />
                            <span>{subBrand}</span>
                          </span>
                        );
                      })
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* 4. Brand Accordion Card */}
            <div className="rounded-xl border border-[#E2E8F0] bg-[#F4F6FB] overflow-hidden transition-all shadow-2xs">
              <button
                onClick={() => setBrandOpen(!brandOpen)}
                className="w-full flex items-center justify-between px-4 py-3.5 text-left hover:bg-[#EEF2F8] transition cursor-pointer"
              >
                <span className="text-[15px] font-medium text-[#0F172A] flex items-center gap-1.5">
                  Brand {isCategoryActive && <span className="text-xs font-normal text-slate-400">({availableBrands.length})</span>}
                </span>
                {brandOpen ? (
                  <ChevronUp className="w-5 h-5 text-[#0F172A]" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-[#0F172A]" />
                )}
              </button>

              {brandOpen && (
                <div className="bg-white border-t border-[#E2E8F0]">
                  <div className="p-3 border-b border-slate-100 bg-slate-50/50">
                    <div className="relative flex items-center">
                      <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 pointer-events-none" />
                      <input
                        type="text"
                        placeholder="Search brand..."
                        value={brandSearch}
                        onChange={(e) => setBrandSearch(e.target.value)}
                        className="w-full text-xs pl-8 pr-7 py-1.5 border border-slate-200 rounded-md focus:outline-none focus:border-blue-500 bg-white"
                      />
                      {brandSearch && (
                        <button
                          onClick={() => setBrandSearch('')}
                          className="absolute right-2 text-slate-400 hover:text-slate-600 cursor-pointer"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="p-3.5 flex flex-wrap gap-2">
                    {displayedBrands.length === 0 ? (
                      <p className="text-xs text-slate-400 py-2 w-full text-center">
                        {brandSearch ? `No brands matching "${brandSearch}"` : "No brands available for selected category"}
                      </p>
                    ) : (
                      displayedBrands.map((brand) => {
                        const isChecked = selectedBrands.includes(brand);
                        return (
                          <span
                            key={brand}
                            onClick={() => handleToggleBrand(brand)}
                            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-medium cursor-pointer transition-all border select-none ${isChecked
                                ? 'bg-blue-50 text-[#004060] border-blue-300 font-semibold shadow-xs'
                                : 'bg-white text-slate-800 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                              }`}
                          >
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={() => { }}
                              className="w-3.5 h-3.5 rounded-[2px] border-[#64748B] text-[#004060] pointer-events-none"
                            />
                            <span>{brand}</span>
                          </span>
                        );
                      })
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* 5. Sub grade Accordion Card */}
            <div className="rounded-xl border border-[#E2E8F0] bg-[#F4F6FB] overflow-hidden transition-all shadow-2xs">
              <button
                onClick={() => setSubGradeOpen(!subGradeOpen)}
                className="w-full flex items-center justify-between px-4 py-3.5 text-left hover:bg-[#EEF2F8] transition cursor-pointer"
              >
                <span className="text-[15px] font-medium text-[#0F172A] flex items-center gap-1.5">
                  Sub grade {isCategoryActive && <span className="text-xs font-normal text-slate-400">({availableSubGrades.length})</span>}
                </span>
                {subGradeOpen ? (
                  <ChevronUp className="w-5 h-5 text-[#0F172A]" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-[#0F172A]" />
                )}
              </button>

              {subGradeOpen && (
                <div className="bg-white border-t border-[#E2E8F0]">
                  <div className="p-3 border-b border-slate-100 bg-slate-50/50">
                    <div className="relative flex items-center">
                      <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 pointer-events-none" />
                      <input
                        type="text"
                        placeholder="Search sub grade..."
                        value={subGradeSearch}
                        onChange={(e) => setSubGradeSearch(e.target.value)}
                        className="w-full text-xs pl-8 pr-7 py-1.5 border border-slate-200 rounded-md focus:outline-none focus:border-blue-500 bg-white"
                      />
                      {subGradeSearch && (
                        <button
                          onClick={() => setSubGradeSearch('')}
                          className="absolute right-2 text-slate-400 hover:text-slate-600 cursor-pointer"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="p-3.5 flex flex-wrap gap-2">
                    {displayedSubGrades.length === 0 ? (
                      <p className="text-xs text-slate-400 py-2 w-full text-center">
                        {subGradeSearch ? `No sub-grades matching "${subGradeSearch}"` : "No sub-grades available for selected category"}
                      </p>
                    ) : (
                      displayedSubGrades.map((subGrade) => {
                        const isChecked = selectedSubGrades.includes(subGrade);
                        return (
                          <span
                            key={subGrade}
                            onClick={() => handleToggleSubGrade(subGrade)}
                            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-medium cursor-pointer transition-all border select-none ${isChecked
                                ? 'bg-blue-50 text-[#004060] border-blue-300 font-semibold shadow-xs'
                                : 'bg-white text-slate-800 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                              }`}
                          >
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={() => { }}
                              className="w-3.5 h-3.5 rounded-[2px] border-[#64748B] text-[#004060] pointer-events-none"
                            />
                            <span>{subGrade}</span>
                          </span>
                        );
                      })
                    )}
                  </div>
                </div>
              )}
            </div>

          </aside>

          {/* Right Column: Product Cards Grid */}
          <div className="lg:col-span-3">

            {/* Catalog Header Bar with Products Count & Reset */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
              <div className="flex items-center gap-3 flex-wrap">
                <h1 className="text-2xl font-bold text-slate-900">
                  {selectedSubCategories.length > 0
                    ? selectedSubCategories.join(', ')
                    : selectedCategories.length > 0
                    ? selectedCategories.join(', ')
                    : selectedSubCategory || 'All Products'}
                </h1>
                <span className="text-sm font-medium text-slate-500 bg-slate-200/60 px-2.5 py-0.5 rounded-full">
                  Found <strong className="text-slate-800">{filteredProducts.length}</strong> results
                </span>
              </div>

              <div className="flex items-center gap-4">
                <button
                  onClick={handleClearFilters}
                  className="text-sm font-semibold text-blue-600 hover:text-blue-700 hover:underline flex items-center gap-1.5 transition cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Clear filters
                </button>
              </div>
            </div>

            {/* Active Filter Badges / Chips */}
            {hasActiveFilters && (
              <div className="flex flex-wrap items-center gap-2 mb-6 p-3 bg-white rounded-xl border border-slate-200/80 shadow-xs">
                <span className="text-xs font-semibold text-slate-500 mr-1">Active Filters:</span>

                {selectedCategories.map(cat => (
                  <span
                    key={`chip-cat-${cat}`}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-[#EBF5FF] text-[#1E40AF] border border-[#BFDBFE]"
                  >
                    <span>{cat}</span>
                    <button
                      onClick={() => handleToggleCategory(cat)}
                      className="hover:text-blue-900 transition cursor-pointer"
                      aria-label={`Remove ${cat}`}
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </span>
                ))}

                {selectedSubCategories.map(subCat => (
                  <span
                    key={`chip-subcat-${subCat}`}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-[#EBF5FF] text-[#1E40AF] border border-[#BFDBFE]"
                  >
                    <span>{subCat}</span>
                    <button
                      onClick={() => handleToggleSubCategory(subCat)}
                      className="hover:text-blue-900 transition cursor-pointer"
                      aria-label={`Remove ${subCat}`}
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </span>
                ))}

                {selectedGrades.map(grade => (
                  <span
                    key={`chip-grade-${grade}`}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-[#F0FDF4] text-[#166534] border border-[#BBF7D0]"
                  >
                    <span>Grade: {grade}</span>
                    <button
                      onClick={() => handleToggleGrade(grade)}
                      className="hover:text-green-900 transition cursor-pointer"
                      aria-label={`Remove ${grade}`}
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </span>
                ))}

                {selectedSubBrands.map(sb => (
                  <span
                    key={`chip-sb-${sb}`}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-[#FFFBEB] text-[#B45309] border border-[#FDE68A]"
                  >
                    <span>Sub-brand: {sb}</span>
                    <button
                      onClick={() => handleToggleSubBrand(sb)}
                      className="hover:text-amber-900 transition cursor-pointer"
                      aria-label={`Remove ${sb}`}
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </span>
                ))}

                {selectedBrands.map(brand => (
                  <span
                    key={`chip-brand-${brand}`}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-[#FAF5FF] text-[#6B21A8] border border-[#E9D5FF]"
                  >
                    <span>Brand: {brand}</span>
                    <button
                      onClick={() => handleToggleBrand(brand)}
                      className="hover:text-purple-900 transition cursor-pointer"
                      aria-label={`Remove ${brand}`}
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </span>
                ))}

                {selectedSubGrades.map(sg => (
                  <span
                    key={`chip-subgrade-${sg}`}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-[#FEF2F2] text-[#991B1B] border border-[#FECACA]"
                  >
                    <span>Sub-grade: {sg}</span>
                    <button
                      onClick={() => handleToggleSubGrade(sg)}
                      className="hover:text-red-900 transition cursor-pointer"
                      aria-label={`Remove ${sg}`}
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </span>
                ))}

                {userCategoryOverride && (
                  <span
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-purple-50 text-purple-700 border border-purple-200"
                  >
                    <span>Slider: {userCategoryOverride}</span>
                    <button
                      onClick={() => setUserCategoryOverride(null)}
                      className="hover:text-purple-900 transition cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </span>
                )}

                <button
                  onClick={handleClearFilters}
                  className="text-xs font-bold text-red-600 hover:text-red-700 hover:underline ml-auto pl-2 cursor-pointer"
                >
                  Reset All
                </button>
              </div>
            )}

            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
                  <SlidersHorizontal className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-1">No products match your filters</h3>
                <p className="text-sm text-slate-500 mb-6 max-w-md mx-auto">
                  Try clearing some filters or searching for different categories, grades, or sub-brands.
                </p>
                <button
                  onClick={handleClearFilters}
                  className="px-6 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-xl transition shadow-sm cursor-pointer"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {paginatedProducts.map(product => {
                  const isCleanLayout =
                    product.category?.toLowerCase() === 'angles' ||
                    product.category?.toLowerCase() === 'channels' ||
                    product.category?.toLowerCase() === 'beams and columns' ||
                    product.category?.toLowerCase() === 'colour coated' ||
                    product.category?.toLowerCase() === 'ms cold rolled' ||
                    product.category?.toLowerCase() === 'coated steel' ||
                    product.category?.toLowerCase() === 'ms hot rolled' ||
                    product.category?.toLowerCase() === 'wire rods' ||
                    product.group === 'Structural Steel' ||
                    product.group === 'Roofing & Cladding';

                  return (
                    <div
                      key={product.id}
                      className="bg-white rounded-2xl border border-slate-200 overflow-hidden flex flex-col hover:shadow-lg transition-all duration-200 group"
                    >
                      {/* Image Box */}
                      <div className="w-full h-52 bg-white flex items-center justify-center relative overflow-hidden p-4 border-b border-slate-100">
                        <img
                          src={product.img}
                          alt={product.title}
                          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                        />

                        {/* Top Floating Badge (for non-catalog/general products) */}
                        {!isCleanLayout && !product.category?.toLowerCase().includes('deck') && !product.title?.toLowerCase().includes('deck') && (
                          <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-semibold text-slate-700 shadow-sm border border-slate-100 flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-teal-500"></span>
                            {product.category}
                          </div>
                        )}
                      </div>

                      {/* Card Content */}
                      <div className="p-5 flex flex-col flex-1 justify-between">
                        <div>
                          {/* Title */}
                          <h3 className="font-bold text-slate-800 text-sm mb-1.5 line-clamp-2 min-h-[40px] group-hover:text-blue-600 transition-colors">
                            {product.title}
                          </h3>

                          {/* Brand Info */}
                          <p className="text-xs text-slate-500 mb-3 flex items-center gap-2">
                            <span>Brand: <strong className="text-slate-700 font-medium">{product.brand}</strong></span>
                            {!isCleanLayout && product.subBrand && (
                              <>
                                <span className="text-slate-300">•</span>
                                <span>Sub-brand: <strong className="text-blue-700 font-medium">{product.subBrand}</strong></span>
                              </>
                            )}
                          </p>

                          {/* Specification Attributes */}
                          {product.specs && Object.keys(product.specs).length > 0 && (
                            <div className="space-y-1.5 text-xs text-slate-600 mb-4 bg-slate-50 p-3 rounded-lg border border-slate-100">
                              {product.specs?.thickness && (
                                <div className="flex justify-between">
                                  <span className="text-slate-400">Thickness</span>
                                  <span className="font-semibold text-slate-800">{product.specs.thickness}</span>
                                </div>
                              )}
                              {product.specs?.diameter && (
                                <div className="flex justify-between">
                                  <span className="text-slate-400">Diameter</span>
                                  <span className="font-semibold text-slate-800">{product.specs.diameter}</span>
                                </div>
                              )}
                              {product.specs?.sectionalWeight && (
                                <div className="flex justify-between">
                                  <span className="text-slate-400">Sectional weight</span>
                                  <span className="font-semibold text-slate-800">{product.specs.sectionalWeight}</span>
                                </div>
                              )}
                              {product.specs?.webDepth && (
                                <div className="flex justify-between">
                                  <span className="text-slate-400">Web depth</span>
                                  <span className="font-semibold text-slate-800">{product.specs.webDepth}</span>
                                </div>
                              )}
                              {product.specs?.flangeWidth && (
                                <div className="flex justify-between">
                                  <span className="text-slate-400">Flange width</span>
                                  <span className="font-semibold text-slate-800">{product.specs.flangeWidth}</span>
                                </div>
                              )}
                              {product.specs?.length && (
                                <div className="flex justify-between">
                                  <span className="text-slate-400">Length</span>
                                  <span className="font-semibold text-slate-800">{product.specs.length}</span>
                                </div>
                              )}
                              {product.specs?.width && (
                                <div className="flex justify-between">
                                  <span className="text-slate-400">Width</span>
                                  <span className="font-semibold text-slate-800">{product.specs.width}</span>
                                </div>
                              )}
                            </div>
                          )}
                        </div>

                        {/* Bottom Action Area */}
                        <div>
                          <button
                            onClick={() => setActiveModalProduct(product)}
                            className="w-full py-2.5 bg-[#F1F5F9] hover:bg-blue-50 text-blue-600 font-bold text-xs rounded-lg transition border border-transparent hover:border-blue-200 text-left px-3 mb-3 cursor-pointer"
                          >
                            Purchase now
                          </button>

                          <div className="flex items-center gap-2 text-xs text-slate-500 pt-2 border-t border-slate-100">
                            <Tag className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                            <span>{product.delivery}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Pagination Controls Matching Screenshot */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-10 pt-6 border-t border-slate-200/80">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="flex items-center gap-1.5 px-3.5 py-1.5 border border-slate-300 rounded-md bg-white text-slate-700 text-sm font-medium hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition shadow-2xs"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Prev</span>
                  </button>

                  <div className="flex items-center gap-1.5">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNumber => {
                      const isActive = pageNumber === currentPage;
                      return (
                        <button
                          key={pageNumber}
                          onClick={() => handlePageChange(pageNumber)}
                          className={`min-w-[34px] px-3 py-1.5 border rounded-md text-sm font-semibold transition cursor-pointer ${
                            isActive
                              ? 'bg-[#1849A9] border-[#1849A9] text-white shadow-xs'
                              : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50'
                          }`}
                        >
                          {pageNumber}
                        </button>
                      );
                    })}
                  </div>

                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="flex items-center gap-1.5 px-3.5 py-1.5 border border-slate-300 rounded-md bg-white text-slate-700 text-sm font-medium hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition shadow-2xs"
                  >
                    <span>Next</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </>
          )}
          </div>

        </div>

      </div>

      {/* Interactive Purchase Modal */}
      {activeModalProduct && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => { setActiveModalProduct(null); setOrderSubmitted(false); }}
              className="absolute top-4 right-4 p-1 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {orderSubmitted ? (
              <div className="text-center py-6">
                <CheckCircle className="w-16 h-16 text-teal-600 mx-auto mb-3" />
                <h3 className="text-xl font-bold text-slate-900 mb-1">Quote Request Sent!</h3>
                <p className="text-sm text-slate-500 mb-6">
                  Thank you for choosing Evershine. Our industrial team will send a formal proforma invoice to your business contact.
                </p>
                <button
                  onClick={() => { setActiveModalProduct(null); setOrderSubmitted(false); }}
                  className="w-full py-2.5 bg-teal-600 text-white font-bold rounded-xl hover:bg-teal-700 transition cursor-pointer"
                >
                  Close Window
                </button>
              </div>
            ) : (
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-1">{activeModalProduct.title}</h3>
                <p className="text-xs text-slate-500 mb-4">
                  Brand: {activeModalProduct.brand} {activeModalProduct.subBrand && `(${activeModalProduct.subBrand})`} | Grade: {activeModalProduct.grade}
                </p>

                <div className="bg-slate-50 p-4 rounded-xl space-y-2 text-xs mb-6 border border-slate-100">
                  {activeModalProduct.specs?.thickness && (
                    <div className="flex justify-between">
                      <span className="text-slate-500">Thickness:</span>
                      <span className="font-semibold">{activeModalProduct.specs.thickness}</span>
                    </div>
                  )}
                  {activeModalProduct.specs?.diameter && (
                    <div className="flex justify-between">
                      <span className="text-slate-500">Diameter:</span>
                      <span className="font-semibold">{activeModalProduct.specs.diameter}</span>
                    </div>
                  )}
                  {activeModalProduct.specs?.sectionalWeight && (
                    <div className="flex justify-between">
                      <span className="text-slate-500">Sectional weight:</span>
                      <span className="font-semibold">{activeModalProduct.specs.sectionalWeight}</span>
                    </div>
                  )}
                  {activeModalProduct.specs?.webDepth && (
                    <div className="flex justify-between">
                      <span className="text-slate-500">Web depth:</span>
                      <span className="font-semibold">{activeModalProduct.specs.webDepth}</span>
                    </div>
                  )}
                  {activeModalProduct.specs?.flangeWidth && (
                    <div className="flex justify-between">
                      <span className="text-slate-500">Flange width:</span>
                      <span className="font-semibold">{activeModalProduct.specs.flangeWidth}</span>
                    </div>
                  )}
                  {activeModalProduct.specs?.length && (
                    <div className="flex justify-between">
                      <span className="text-slate-500">Standard Length:</span>
                      <span className="font-semibold">{activeModalProduct.specs.length}</span>
                    </div>
                  )}
                  {activeModalProduct.specs?.width && (
                    <div className="flex justify-between">
                      <span className="text-slate-500">Width Range:</span>
                      <span className="font-semibold">{activeModalProduct.specs.width}</span>
                    </div>
                  )}
                  <div className="flex justify-between pt-2 border-t border-slate-200">
                    <span className="text-slate-500">Estimated Base Price:</span>
                    <span className="font-bold text-sm text-slate-900">₹54.50 / kg</span>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <label className="block text-xs font-semibold text-slate-700">Estimated Requirement (Kg / Tons)</label>
                  <input
                    type="number"
                    defaultValue={1000}
                    className="w-full p-2.5 border border-slate-300 rounded-xl text-sm font-semibold focus:ring-2 focus:ring-teal-500 focus:outline-none"
                    placeholder="Enter quantity in Kg"
                  />
                </div>

                <button
                  onClick={() => setOrderSubmitted(true)}
                  className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20 cursor-pointer"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>Request Instant Proforma Quote</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
