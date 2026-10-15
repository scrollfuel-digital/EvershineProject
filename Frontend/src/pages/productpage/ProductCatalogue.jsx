import { useState, useMemo, useEffect, useCallback } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import {
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  ChevronUp,
  SlidersHorizontal,
  X,
  RotateCcw,
  Search,
  Loader2,
} from "lucide-react";
import { useDataProcess } from "../../services/dataProccess";
import { fetchActiveProducts } from "../../services/productService";
import ProductCard from "../../components/ui/ProductCard";

export default function ProductCatalogue({ initialCategory = null }) {
  const { slug, categoryName, categorySlug } = useParams();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const queryCategory = searchParams.get("category");
  const querySubCategory = searchParams.get("subCategory");

  const currentSlug = slug || categoryName || categorySlug;

  // Consume dynamic active filters & name map from the centralized data processing service
  const {
    categories = [],
    brands = [],
    subBrands = [],
    grades = [],
    subGrades = [],
    nameMap = new Map(),
    loading: filtersLoading,
  } = useDataProcess();

  // Active Products State (fetched from https://evershine-backend-1.onrender.com/api/products/status/active)
  const [products, setProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(true);
  const [productsError, setProductsError] = useState(null);

  const loadProducts = useCallback(async (force = false) => {
    setProductsLoading(true);
    setProductsError(null);
    try {
      const data = await fetchActiveProducts(force);
      setProducts(Array.isArray(data) ? data : []);
    } catch (err) {
      console.warn("Failed to load active products:", err);
      setProductsError(err.message || "Failed to load active products");
    } finally {
      setProductsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProducts(false);
  }, [loadProducts]);

  // Resolve category label from URL slug parameter
  const matchedCategoryFromSlug = useMemo(() => {
    if (!currentSlug) return null;
    const cleanSlug = currentSlug.toLowerCase().replace(/^\//, "");
    const found = categoryListData.find((cat) => {
      const catHref = cat.href.toLowerCase().replace(/^\//, "");
      const catSlug = cat.label.toLowerCase().replace(/[^a-z0-9]+/g, "-");
      return catHref === cleanSlug || catSlug === cleanSlug || cat.label.toLowerCase() === cleanSlug;
    });
    return found ? found.label : null;
  }, [currentSlug]);

  // Track explicit user category selection with fallback to URL slug / initialCategory / query params
  const [userCategoryOverride, setUserCategoryOverride] = useState(null);
  const selectedSubCategory =
    userCategoryOverride ?? (querySubCategory || matchedCategoryFromSlug || initialCategory || null);

  // Sync state when URL query params change (e.g., clicking nav item, back/forward, or clearing)
  useEffect(() => {
    setSelectedCategories(queryCategory ? [queryCategory] : []);
    setSelectedSubCategories(querySubCategory ? [querySubCategory] : []);
    setUserCategoryOverride(querySubCategory || null);
  }, [queryCategory, querySubCategory]);

  // Filter Checkbox Selection States
  const [selectedCategories, setSelectedCategories] = useState(() => {
    if (queryCategory) return [queryCategory];
    if (matchedCategoryFromSlug) return [matchedCategoryFromSlug];
    if (initialCategory) return [initialCategory];
    return [];
  });
  const [selectedSubCategories, setSelectedSubCategories] = useState(() => {
    if (querySubCategory) return [querySubCategory];
    return [];
  });
  const [selectedGrades, setSelectedGrades] = useState([]);
  const [selectedSubBrands, setSelectedSubBrands] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedSubGrades, setSelectedSubGrades] = useState([]);

  // Accordion Expand/Collapse States (Category opened by default)
  const [categoryOpen, setCategoryOpen] = useState(true);
  const [gradeOpen, setGradeOpen] = useState(false);
  const [subBrandOpen, setSubBrandOpen] = useState(false);
  const [brandOpen, setBrandOpen] = useState(false);
  const [subGradeOpen, setSubGradeOpen] = useState(false);

  // Search queries inside filter accordions
  const [gradeSearch, setGradeSearch] = useState("");
  const [subBrandSearch, setSubBrandSearch] = useState("");
  const [brandSearch, setBrandSearch] = useState("");
  const [subGradeSearch, setSubGradeSearch] = useState("");

  // Toggle Handlers
  const handleToggleCategory = (catName) => {
    setSelectedCategories((prev) => {
      const isRemoving = prev.includes(catName);
      const next = isRemoving ? prev.filter((c) => c !== catName) : [...prev, catName];
      if (isRemoving && searchParams.get("category") === catName) {
        setSearchParams((sp) => {
          const updated = new URLSearchParams(sp);
          updated.delete("category");
          return updated;
        }, { replace: true });
      }
      return next;
    });
  };

  const handleToggleSubCategory = (subCatName) => {
    setSelectedSubCategories((prev) => {
      const isRemoving = prev.includes(subCatName);
      const next = isRemoving ? prev.filter((s) => s !== subCatName) : [...prev, subCatName];
      if (isRemoving) {
        setUserCategoryOverride(null);
        if (searchParams.get("subCategory") === subCatName) {
          setSearchParams((sp) => {
            const updated = new URLSearchParams(sp);
            updated.delete("subCategory");
            return updated;
          }, { replace: true });
        }
      }
      return next;
    });
  };

  const handleToggleGrade = (gradeName) => {
    setSelectedGrades((prev) =>
      prev.includes(gradeName) ? prev.filter((g) => g !== gradeName) : [...prev, gradeName]
    );
  };

  const handleToggleSubBrand = (subBrandName) => {
    setSelectedSubBrands((prev) =>
      prev.includes(subBrandName) ? prev.filter((s) => s !== subBrandName) : [...prev, subBrandName]
    );
  };

  const handleToggleBrand = (brandName) => {
    setSelectedBrands((prev) =>
      prev.includes(brandName) ? prev.filter((b) => b !== brandName) : [...prev, brandName]
    );
  };

  const handleToggleSubGrade = (subGradeName) => {
    setSelectedSubGrades((prev) =>
      prev.includes(subGradeName) ? prev.filter((s) => s !== subGradeName) : [...prev, subGradeName]
    );
  };

  const handleClearFilters = () => {
    setSelectedCategories([]);
    setSelectedSubCategories([]);
    setSelectedGrades([]);
    setSelectedSubBrands([]);
    setSelectedBrands([]);
    setSelectedSubGrades([]);
    setGradeSearch("");
    setSubBrandSearch("");
    setBrandSearch("");
    setSubGradeSearch("");
    setUserCategoryOverride(null);
    setSearchParams({}, { replace: true });
  };

  const hasActiveFilters =
    selectedCategories.length > 0 ||
    selectedSubCategories.length > 0 ||
    selectedGrades.length > 0 ||
    selectedSubBrands.length > 0 ||
    selectedBrands.length > 0 ||
    selectedSubGrades.length > 0 ||
    Boolean(userCategoryOverride);

  // Active filter lists filtered by accordion search queries (using only active items from centralized data process)
  const displayedGrades = useMemo(() => {
    const list = grades.map((g) => g.name || g);
    if (!gradeSearch) return list;
    return list.filter((g) => g.toLowerCase().includes(gradeSearch.toLowerCase().trim()));
  }, [grades, gradeSearch]);

  const displayedSubBrands = useMemo(() => {
    const list = subBrands.map((sb) => sb.name || sb);
    if (!subBrandSearch) return list;
    return list.filter((sb) => sb.toLowerCase().includes(subBrandSearch.toLowerCase().trim()));
  }, [subBrands, subBrandSearch]);

  const displayedBrands = useMemo(() => {
    const list = brands.map((b) => b.name || b);
    if (!brandSearch) return list;
    return list.filter((b) => b.toLowerCase().includes(brandSearch.toLowerCase().trim()));
  }, [brands, brandSearch]);

  const displayedSubGrades = useMemo(() => {
    const list = subGrades.map((sg) => sg.name || sg);
    if (!subGradeSearch) return list;
    return list.filter((sg) => sg.toLowerCase().includes(subGradeSearch.toLowerCase().trim()));
  }, [subGrades, subGradeSearch]);

  // Filter products by selected active filters
  const filteredProducts = useMemo(() => {
    if (!Array.isArray(products) || products.length === 0) return [];

    return products.filter((p) => {
      // 1. Filter by Category (match ID or resolved Name)
      if (selectedCategories.length > 0) {
        const pCatName = nameMap?.get(p.categoryId);
        const matches =
          (p.categoryId && selectedCategories.includes(p.categoryId)) ||
          (pCatName && selectedCategories.includes(pCatName));
        if (!matches) return false;
      }

      // 2. Filter by Sub-Category / Type / Variant (match ID or resolved Name)
      if (selectedSubCategories.length > 0) {
        const pTypeName = nameMap?.get(p.categoryTypeId);
        const pVariantName = nameMap?.get(p.categoryVariantId);
        const matches =
          (p.categoryTypeId && selectedSubCategories.includes(p.categoryTypeId)) ||
          (pTypeName && selectedSubCategories.includes(pTypeName)) ||
          (p.categoryVariantId && selectedSubCategories.includes(p.categoryVariantId)) ||
          (pVariantName && selectedSubCategories.includes(pVariantName));
        if (!matches) return false;
      }

      // 3. Filter by Brand (match ID or resolved Name)
      if (selectedBrands.length > 0) {
        const pBrandName = nameMap?.get(p.brandId);
        const matches =
          (p.brandId && selectedBrands.includes(p.brandId)) ||
          (pBrandName && selectedBrands.includes(pBrandName));
        if (!matches) return false;
      }

      // 4. Filter by Sub-Brand (match ID or resolved Name)
      if (selectedSubBrands.length > 0) {
        const pSubBrandName = nameMap?.get(p.subBrandId);
        const matches =
          (p.subBrandId && selectedSubBrands.includes(p.subBrandId)) ||
          (pSubBrandName && selectedSubBrands.includes(pSubBrandName));
        if (!matches) return false;
      }

      // 5. Filter by Grade (match ID or resolved Name)
      if (selectedGrades.length > 0) {
        const pGradeName = nameMap?.get(p.gradeId);
        const matches =
          (p.gradeId && selectedGrades.includes(p.gradeId)) ||
          (pGradeName && selectedGrades.includes(pGradeName));
        if (!matches) return false;
      }

      // 6. Filter by Sub-Grade (match ID or resolved Name)
      if (selectedSubGrades.length > 0) {
        const pSubGradeName = nameMap?.get(p.subGradeId);
        const matches =
          (p.subGradeId && selectedSubGrades.includes(p.subGradeId)) ||
          (pSubGradeName && selectedSubGrades.includes(pSubGradeName));
        if (!matches) return false;
      }

      // 7. Fallback Category Filter from URL / category slider
      if (
        userCategoryOverride &&
        selectedCategories.length === 0 &&
        selectedSubCategories.length === 0
      ) {
        const pCatName = (nameMap?.get(p.categoryId) || "").toLowerCase();
        const pTypeName = (nameMap?.get(p.categoryTypeId) || "").toLowerCase();
        const pTitle = (p.title || "").toLowerCase();
        const target = userCategoryOverride.toLowerCase();
        if (!pCatName.includes(target) && !pTypeName.includes(target) && !pTitle.includes(target)) {
          return false;
        }
      }

      return true;
    });
  }, [
    products,
    selectedCategories,
    selectedSubCategories,
    selectedBrands,
    selectedSubBrands,
    selectedGrades,
    selectedSubGrades,
    userCategoryOverride,
    nameMap,
  ]);

  // Pagination State
  const ITEMS_PER_PAGE = 21;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE) || 1;

  // Reset to page 1 on filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [
    selectedCategories,
    selectedSubCategories,
    selectedGrades,
    selectedSubBrands,
    selectedBrands,
    selectedSubGrades,
    userCategoryOverride,
  ]);

  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    window.scrollTo({ top: 300, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans pt-[80px] md:pt-[125px] lg:pt-[138px] pb-12 w-full px-4 sm:px-6 lg:px-10 xl:px-16 2xl:px-20">
      <div className="w-full">
        {/* Main Grid: Sidebar + Product Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          {/* Left Sidebar Filter Column */}
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

              {/* Filter Header: "Filter" on Left with 2-slider icon, "Clear filters" on Right */}
              <div className="flex items-center justify-between pb-3">
                <div className="flex items-center gap-2.5">
                  <SlidersHorizontal className="w-5 h-5 text-slate-800" />
                  <span className="text-xl font-bold text-[#0F172A]">Filter</span>
                </div>
                {hasActiveFilters && (
                  <button
                    onClick={handleClearFilters}
                    className="text-sm font-semibold text-[#1A56DB] hover:text-blue-800 hover:underline transition cursor-pointer"
                  >
                    Clear filters
                  </button>
                )}
              </div>
            </div>

            {/* 1. Category Accordion Card (Dynamic from centralized data process) */}
            <div className="rounded-xl border border-[#E2E8F0] bg-[#F4F6FB] overflow-hidden transition-all shadow-2xs">
              <button
                onClick={() => setCategoryOpen(!categoryOpen)}
                className="w-full flex items-center justify-between px-4 py-3.5 text-left hover:bg-[#EEF2F8] transition cursor-pointer"
              >
                <span className="text-[15px] font-medium text-[#0F172A]">
                  Category{" "}
                  {categories.length > 0 && (
                    <span className="text-xs font-normal text-slate-400">({categories.length})</span>
                  )}
                </span>
                {categoryOpen ? (
                  <ChevronUp className="w-5 h-5 text-[#0F172A]" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-[#0F172A]" />
                )}
              </button>

              {categoryOpen && (
                <div className="px-4 py-3.5 bg-white border-t border-[#E2E8F0] space-y-3">
                  {filtersLoading && categories.length === 0 ? (
                    <div className="flex items-center gap-2 text-xs text-slate-400 py-2">
                      <Loader2 className="w-4 h-4 animate-spin text-slate-400" />
                      <span>Loading categories...</span>
                    </div>
                  ) : categories.length === 0 ? (
                    <p className="text-xs text-slate-400 py-1">No categories configured.</p>
                  ) : (
                    <div className="flex flex-col gap-2.5">
                      {categories.map((cat) => {
                        const isCatChecked = selectedCategories.includes(cat.name);
                        const catTypes = Array.isArray(cat.types) ? cat.types : [];

                        return (
                          <div key={cat.id || cat.name} className="flex flex-col gap-1.5">
                            {/* Category Chip */}
                            <span
                              onClick={() => handleToggleCategory(cat.name)}
                              className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-medium cursor-pointer transition-all border select-none w-fit ${
                                isCatChecked
                                  ? "bg-blue-50 text-[#004060] border-blue-300 font-semibold shadow-xs"
                                  : "bg-white text-slate-800 border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                              }`}
                            >
                              <input
                                type="checkbox"
                                checked={isCatChecked}
                                onChange={() => {}}
                                className="w-3.5 h-3.5 rounded-[2px] border-[#64748B] text-[#004060] pointer-events-none"
                              />
                              <span>{cat.name}</span>
                            </span>

                            {/* Subcategories / Types under Category */}
                            {catTypes.length > 0 && (
                              <div className="flex flex-wrap gap-1.5 pl-3 ml-2 border-l-2 border-slate-200 py-1">
                                {catTypes.map((type) => {
                                  const isTypeChecked = selectedSubCategories.includes(type.name);
                                  return (
                                    <span
                                      key={type.id || type.name}
                                      onClick={() => handleToggleSubCategory(type.name)}
                                      className={`inline-flex items-center gap-2 px-2.5 py-1 rounded-lg text-xs font-medium cursor-pointer transition-all border select-none ${
                                        isTypeChecked
                                          ? "bg-blue-50 text-[#004060] border-blue-300 font-semibold shadow-xs"
                                          : "bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                                      }`}
                                    >
                                      <input
                                        type="checkbox"
                                        checked={isTypeChecked}
                                        onChange={() => {}}
                                        className="w-3 h-3 rounded-[2px] border-[#64748B] text-[#004060] pointer-events-none"
                                      />
                                      <span>{type.name}</span>
                                    </span>
                                  );
                                })}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* 2. Grade Accordion Card (Active only from centralized data process) */}
            <div className="rounded-xl border border-[#E2E8F0] bg-[#F4F6FB] overflow-hidden transition-all shadow-2xs">
              <button
                onClick={() => setGradeOpen(!gradeOpen)}
                className="w-full flex items-center justify-between px-4 py-3.5 text-left hover:bg-[#EEF2F8] transition cursor-pointer"
              >
                <span className="text-[15px] font-medium text-[#0F172A] flex items-center gap-1.5">
                  Grade{" "}
                  {grades.length > 0 && (
                    <span className="text-xs font-normal text-slate-400">({grades.length})</span>
                  )}
                </span>
                {gradeOpen ? (
                  <ChevronUp className="w-5 h-5 text-[#0F172A]" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-[#0F172A]" />
                )}
              </button>

              {gradeOpen && (
                <div className="bg-white border-t border-[#E2E8F0]">
                  {/* Search inside Grade */}
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
                          onClick={() => setGradeSearch("")}
                          className="absolute right-2 text-slate-400 hover:text-slate-600 cursor-pointer"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="p-3.5 flex flex-wrap gap-2">
                    {filtersLoading && grades.length === 0 ? (
                      <div className="flex items-center gap-2 text-xs text-slate-400 py-2 w-full justify-center">
                        <Loader2 className="w-4 h-4 animate-spin text-slate-400" />
                        <span>Loading active grades...</span>
                      </div>
                    ) : displayedGrades.length === 0 ? (
                      <p className="text-xs text-slate-400 py-2 w-full text-center">
                        {gradeSearch
                          ? `No active grades matching "${gradeSearch}"`
                          : "No active grades configured."}
                      </p>
                    ) : (
                      displayedGrades.map((grade) => {
                        const isChecked = selectedGrades.includes(grade);
                        return (
                          <span
                            key={grade}
                            onClick={() => handleToggleGrade(grade)}
                            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-medium cursor-pointer transition-all border select-none ${
                              isChecked
                                ? "bg-blue-50 text-[#004060] border-blue-300 font-semibold shadow-xs"
                                : "bg-white text-slate-800 border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={() => {}}
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

            {/* 3. Sub brand Accordion Card (Active only from centralized data process) */}
            <div className="rounded-xl border border-[#E2E8F0] bg-[#F4F6FB] overflow-hidden transition-all shadow-2xs">
              <button
                onClick={() => setSubBrandOpen(!subBrandOpen)}
                className="w-full flex items-center justify-between px-4 py-3.5 text-left hover:bg-[#EEF2F8] transition cursor-pointer"
              >
                <span className="text-[15px] font-medium text-[#0F172A] flex items-center gap-1.5">
                  Sub brand{" "}
                  {subBrands.length > 0 && (
                    <span className="text-xs font-normal text-slate-400">({subBrands.length})</span>
                  )}
                </span>
                {subBrandOpen ? (
                  <ChevronUp className="w-5 h-5 text-[#0F172A]" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-[#0F172A]" />
                )}
              </button>

              {subBrandOpen && (
                <div className="bg-white border-t border-[#E2E8F0]">
                  {/* Search inside Sub brand */}
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
                          onClick={() => setSubBrandSearch("")}
                          className="absolute right-2 text-slate-400 hover:text-slate-600 cursor-pointer"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="p-3.5 flex flex-wrap gap-2">
                    {filtersLoading && subBrands.length === 0 ? (
                      <div className="flex items-center gap-2 text-xs text-slate-400 py-2 w-full justify-center">
                        <Loader2 className="w-4 h-4 animate-spin text-slate-400" />
                        <span>Loading active sub-brands...</span>
                      </div>
                    ) : displayedSubBrands.length === 0 ? (
                      <p className="text-xs text-slate-400 py-2 w-full text-center">
                        {subBrandSearch
                          ? `No active sub-brands matching "${subBrandSearch}"`
                          : "No active sub-brands configured."}
                      </p>
                    ) : (
                      displayedSubBrands.map((subBrand) => {
                        const isChecked = selectedSubBrands.includes(subBrand);
                        return (
                          <span
                            key={subBrand}
                            onClick={() => handleToggleSubBrand(subBrand)}
                            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-medium cursor-pointer transition-all border select-none ${
                              isChecked
                                ? "bg-blue-50 text-[#004060] border-blue-300 font-semibold shadow-xs"
                                : "bg-white text-slate-800 border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={() => {}}
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

            {/* 4. Brand Accordion Card (Active only from centralized data process) */}
            <div className="rounded-xl border border-[#E2E8F0] bg-[#F4F6FB] overflow-hidden transition-all shadow-2xs">
              <button
                onClick={() => setBrandOpen(!brandOpen)}
                className="w-full flex items-center justify-between px-4 py-3.5 text-left hover:bg-[#EEF2F8] transition cursor-pointer"
              >
                <span className="text-[15px] font-medium text-[#0F172A] flex items-center gap-1.5">
                  Brand{" "}
                  {brands.length > 0 && (
                    <span className="text-xs font-normal text-slate-400">({brands.length})</span>
                  )}
                </span>
                {brandOpen ? (
                  <ChevronUp className="w-5 h-5 text-[#0F172A]" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-[#0F172A]" />
                )}
              </button>

              {brandOpen && (
                <div className="bg-white border-t border-[#E2E8F0]">
                  {/* Search inside Brand */}
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
                          onClick={() => setBrandSearch("")}
                          className="absolute right-2 text-slate-400 hover:text-slate-600 cursor-pointer"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="p-3.5 flex flex-wrap gap-2">
                    {filtersLoading && brands.length === 0 ? (
                      <div className="flex items-center gap-2 text-xs text-slate-400 py-2 w-full justify-center">
                        <Loader2 className="w-4 h-4 animate-spin text-slate-400" />
                        <span>Loading active brands...</span>
                      </div>
                    ) : displayedBrands.length === 0 ? (
                      <p className="text-xs text-slate-400 py-2 w-full text-center">
                        {brandSearch
                          ? `No active brands matching "${brandSearch}"`
                          : "No active brands configured."}
                      </p>
                    ) : (
                      displayedBrands.map((brand) => {
                        const isChecked = selectedBrands.includes(brand);
                        return (
                          <span
                            key={brand}
                            onClick={() => handleToggleBrand(brand)}
                            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-medium cursor-pointer transition-all border select-none ${
                              isChecked
                                ? "bg-blue-50 text-[#004060] border-blue-300 font-semibold shadow-xs"
                                : "bg-white text-slate-800 border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={() => {}}
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

            {/* 5. Sub grade Accordion Card (Active only from centralized data process) */}
            <div className="rounded-xl border border-[#E2E8F0] bg-[#F4F6FB] overflow-hidden transition-all shadow-2xs">
              <button
                onClick={() => setSubGradeOpen(!subGradeOpen)}
                className="w-full flex items-center justify-between px-4 py-3.5 text-left hover:bg-[#EEF2F8] transition cursor-pointer"
              >
                <span className="text-[15px] font-medium text-[#0F172A] flex items-center gap-1.5">
                  Sub grade{" "}
                  {subGrades.length > 0 && (
                    <span className="text-xs font-normal text-slate-400">({subGrades.length})</span>
                  )}
                </span>
                {subGradeOpen ? (
                  <ChevronUp className="w-5 h-5 text-[#0F172A]" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-[#0F172A]" />
                )}
              </button>

              {subGradeOpen && (
                <div className="bg-white border-t border-[#E2E8F0]">
                  {/* Search inside Sub grade */}
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
                          onClick={() => setSubGradeSearch("")}
                          className="absolute right-2 text-slate-400 hover:text-slate-600 cursor-pointer"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="p-3.5 flex flex-wrap gap-2">
                    {filtersLoading && subGrades.length === 0 ? (
                      <div className="flex items-center gap-2 text-xs text-slate-400 py-2 w-full justify-center">
                        <Loader2 className="w-4 h-4 animate-spin text-slate-400" />
                        <span>Loading active sub-grades...</span>
                      </div>
                    ) : displayedSubGrades.length === 0 ? (
                      <p className="text-xs text-slate-400 py-2 w-full text-center">
                        {subGradeSearch
                          ? `No active sub-grades matching "${subGradeSearch}"`
                          : "No active sub-grades configured."}
                      </p>
                    ) : (
                      displayedSubGrades.map((subGrade) => {
                        const isChecked = selectedSubGrades.includes(subGrade);
                        return (
                          <span
                            key={subGrade}
                            onClick={() => handleToggleSubGrade(subGrade)}
                            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-medium cursor-pointer transition-all border select-none ${
                              isChecked
                                ? "bg-blue-50 text-[#004060] border-blue-300 font-semibold shadow-xs"
                                : "bg-white text-slate-800 border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={() => {}}
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

          {/* Right Column: Product Cards Grid Area */}
          <div className="lg:col-span-3">
            {/* Catalog Header Bar with Products Count & Reset */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
              <div className="flex items-center gap-3 flex-wrap">
                <h1 className="text-2xl font-bold text-slate-900 font-display">
                  {selectedSubCategories.length > 0
                    ? selectedSubCategories.join(", ")
                    : selectedCategories.length > 0
                    ? selectedCategories.join(", ")
                    : selectedSubCategory || "All Products"}
                </h1>
                <span className="text-sm font-medium text-slate-500 bg-slate-200/60 px-3 py-1 rounded-full">
                  Found <strong className="text-slate-800">{filteredProducts.length}</strong> results
                </span>
              </div>

              {hasActiveFilters && (
                <div className="flex items-center gap-4">
                  <button
                    onClick={handleClearFilters}
                    className="text-sm font-semibold text-blue-600 hover:text-blue-700 hover:underline flex items-center gap-1.5 transition cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    Clear filters
                  </button>
                </div>
              )}
            </div>

            {/* Active Filter Badges / Chips */}
            {hasActiveFilters && (
              <div className="flex flex-wrap items-center gap-2 mb-6 p-3 bg-white rounded-xl border border-slate-200/80 shadow-xs">
                <span className="text-xs font-semibold text-slate-500 mr-1">Active Filters:</span>

                {selectedCategories.map((cat) => (
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

                {selectedSubCategories.map((subCat) => (
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

                {selectedGrades.map((grade) => (
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

                {selectedBrands.map((brand) => (
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

                {selectedSubBrands.map((subBrand) => (
                  <span
                    key={`chip-subbrand-${subBrand}`}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-[#FDF4FF] text-[#86198F] border border-[#F5D0FE]"
                  >
                    <span>Sub-brand: {subBrand}</span>
                    <button
                      onClick={() => handleToggleSubBrand(subBrand)}
                      className="hover:text-fuchsia-900 transition cursor-pointer"
                      aria-label={`Remove ${subBrand}`}
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </span>
                ))}

                {selectedSubGrades.map((sg) => (
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
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-purple-50 text-purple-700 border border-purple-200">
                    <span>Selected: {userCategoryOverride}</span>
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

            {/* Product Cards Grid / Loading / Empty States */}
            {productsLoading && products.length === 0 ? (
              <div className="bg-white rounded-2xl border border-slate-200 p-16 text-center shadow-xs space-y-4">
                <Loader2 className="w-10 h-10 animate-spin text-[#004060] mx-auto" />
                <h3 className="text-lg font-bold text-slate-800">Loading active products...</h3>
                <p className="text-sm text-slate-400">Fetching live products from backend catalogue</p>
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center shadow-xs">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-[#004060]">
                  <SlidersHorizontal className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2 font-display">
                  No matching products
                </h3>
                <p className="text-sm text-slate-500 mb-6 max-w-md mx-auto leading-relaxed">
                  {hasActiveFilters
                    ? "No products match your currently selected filters. Try unchecking some filters or clearing all to view all available products."
                    : "No active products are currently available in the catalogue."}
                </p>
                {hasActiveFilters && (
                  <button
                    onClick={handleClearFilters}
                    className="px-6 py-2.5 bg-[#004060] hover:bg-[#003350] text-white font-semibold rounded-xl transition shadow-xs cursor-pointer inline-flex items-center gap-2"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Clear all filters</span>
                  </button>
                )}
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {paginatedProducts.map((product) => {
                    const productSlug = product.slug || product.id;
                    return (
                      <ProductCard
                        key={product.id}
                        product={product}
                        nameMap={nameMap}
                        brandName={nameMap?.get(product.brandId) || product.brand || ""}
                        to={productSlug ? `/products/${productSlug}` : null}
                        onClick={() => {
                          if (productSlug) {
                            navigate(`/products/${productSlug}`);
                          }
                        }}
                      />
                    );
                  })}
                </div>

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
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => {
                        const isActive = pageNumber === currentPage;
                        return (
                          <button
                            key={pageNumber}
                            onClick={() => handlePageChange(pageNumber)}
                            className={`min-w-[34px] px-3 py-1.5 border rounded-md text-sm font-semibold transition cursor-pointer ${
                              isActive
                                ? "bg-[#004060] border-[#004060] text-white shadow-xs"
                                : "bg-white border-slate-300 text-slate-700 hover:bg-slate-50"
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
    </div>
  );
}
