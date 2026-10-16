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
    categoryVariantsMap,
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

  // Sync state when URL query params change (e.g., clicking nav item, back/forward, or clearing)
  useEffect(() => {
    setSelectedCategories(queryCategory ? [queryCategory] : []);
    setSelectedSubCategories(querySubCategory ? [querySubCategory] : []);
    setUserCategoryOverride(querySubCategory || null);
  }, [queryCategory, querySubCategory]);

  // Determine active category object based on URL query or selected categories
  const activeCategory = useMemo(() => {
    if (categories.length === 0) return null;
    const currentName = selectedCategories[0] || queryCategory;
    if (currentName) {
      const found = categories.find(
        (c) => c.name.toLowerCase() === currentName.toLowerCase() || c.id === currentName
      );
      if (found) return found;
    }
    // If only subCategory is present, find which category contains this type or variant
    if (querySubCategory) {
      const lowerSub = querySubCategory.toLowerCase();
      for (const cat of categories) {
        const catTypes = Array.isArray(cat.types) ? cat.types : [];
        for (const t of catTypes) {
          if (t.name?.toLowerCase() === lowerSub || t.id === querySubCategory) {
            return cat;
          }
          const vars = categoryVariantsMap?.get(t.id) || t.variants || [];
          if (vars.some((v) => v.name?.toLowerCase() === lowerSub || v.id === querySubCategory)) {
            return cat;
          }
        }
      }
    }
    return categories[0] || null;
  }, [categories, selectedCategories, queryCategory, querySubCategory, categoryVariantsMap]);

  // Determine which type groups to display in the Category sidebar filter accordion matching nav interaction
  const displayedCategoryGroups = useMemo(() => {
    if (!activeCategory) return [];

    const rawTypes = Array.isArray(activeCategory.types) ? activeCategory.types : [];
    const allTypesWithVariants = rawTypes.map((t) => {
      const vars = categoryVariantsMap?.get(t.id) || t.variants || [];
      return {
        type: t,
        variants: vars,
      };
    });

    // If querySubCategory was provided via nav link
    if (querySubCategory) {
      const lowerSub = querySubCategory.toLowerCase();

      // Check if user clicked a Type from nav
      const matchingTypeGroup = allTypesWithVariants.find(
        (g) => g.type.name?.toLowerCase() === lowerSub || g.type.id === querySubCategory
      );
      if (matchingTypeGroup) {
        // Mode 2: Show only that clicked type inside category filter box
        return [matchingTypeGroup];
      }

      // Check if user clicked a Variant from nav
      for (const g of allTypesWithVariants) {
        const matchingVar = g.variants.find(
          (v) => v.name?.toLowerCase() === lowerSub || v.id === querySubCategory
        );
        if (matchingVar) {
          // Mode 3: Variant is selected -> show only it under its parent type
          return [
            {
              type: g.type,
              variants: [matchingVar],
            },
          ];
        }
      }
    }

    // Mode 1: User clicked Category from nav -> show all types associated to it (non-clickable) and their variants as checkboxes
    return allTypesWithVariants;
  }, [activeCategory, querySubCategory, categoryVariantsMap]);

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

  const handleToggleSubCategory = (subCatName, parentTypeName) => {
    setSelectedSubCategories((prev) => {
      const isRemoving = prev.includes(subCatName);
      let next = isRemoving ? prev.filter((s) => s !== subCatName) : [...prev, subCatName];
      if (!isRemoving && parentTypeName && next.includes(parentTypeName)) {
        next = next.filter((s) => s !== parentTypeName);
      }
      if (isRemoving) {
        setUserCategoryOverride(null);
        if (searchParams.get("subCategory") === subCatName || next.length === 0) {
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

  // Base products associated with the active Category and Sub-category selection
  const categoryAssociatedProducts = useMemo(() => {
    if (!Array.isArray(products) || products.length === 0) return [];

    const hasCatFilter = selectedCategories.length > 0;
    const hasSubCatFilter = selectedSubCategories.length > 0;
    const hasOverride = Boolean(userCategoryOverride);

    // If no category or sub-category filter is active, all products are in scope
    if (!hasCatFilter && !hasSubCatFilter && !hasOverride) {
      return products;
    }

    return products.filter((p) => {
      // 1. Match Category (match ID or resolved Name)
      if (hasCatFilter) {
        const pCatName = nameMap?.get(p.categoryId);
        const matchesCat =
          (p.categoryId && selectedCategories.includes(p.categoryId)) ||
          (pCatName && selectedCategories.includes(pCatName));
        if (!matchesCat) return false;
      }

      // 2. Match Sub-Category / Type / Variant (match ID or resolved Name)
      if (hasSubCatFilter) {
        const pTypeName = nameMap?.get(p.categoryTypeId);
        const pVariantName = nameMap?.get(p.categoryVariantId);
        const matchesSubCat =
          (p.categoryTypeId && selectedSubCategories.includes(p.categoryTypeId)) ||
          (pTypeName && selectedSubCategories.includes(pTypeName)) ||
          (p.categoryVariantId && selectedSubCategories.includes(p.categoryVariantId)) ||
          (pVariantName && selectedSubCategories.includes(pVariantName));
        if (!matchesSubCat) return false;
      }

      // 3. Fallback Category Filter from URL / category slider
      if (hasOverride && !hasCatFilter && !hasSubCatFilter) {
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
  }, [products, selectedCategories, selectedSubCategories, userCategoryOverride, nameMap]);

  // Compute sets of active Brand, Sub-Brand, Grade, Sub-Grade associated with current category/sub-category
  const { availableBrandKeys, availableSubBrandKeys, availableGradeKeys, availableSubGradeKeys } = useMemo(() => {
    const hasCatFilter = selectedCategories.length > 0;
    const hasSubCatFilter = selectedSubCategories.length > 0;
    const hasOverride = Boolean(userCategoryOverride);

    // If no category or sub-category filter is active, return null to show all options from dataProccess
    if (!hasCatFilter && !hasSubCatFilter && !hasOverride) {
      return {
        availableBrandKeys: null,
        availableSubBrandKeys: null,
        availableGradeKeys: null,
        availableSubGradeKeys: null,
      };
    }

    const bKeys = new Set();
    const sbKeys = new Set();
    const gKeys = new Set();
    const sgKeys = new Set();

    categoryAssociatedProducts.forEach((p) => {
      // Brands
      if (p.brandId) {
        bKeys.add(p.brandId);
        const name = nameMap?.get(p.brandId);
        if (name) bKeys.add(name.toLowerCase());
      }
      if (p.brand) bKeys.add(p.brand.toLowerCase());

      // Sub-Brands
      if (p.subBrandId) {
        sbKeys.add(p.subBrandId);
        const name = nameMap?.get(p.subBrandId);
        if (name) sbKeys.add(name.toLowerCase());
      }
      if (p.subBrand) sbKeys.add(p.subBrand.toLowerCase());

      // Grades
      if (p.gradeId) {
        gKeys.add(p.gradeId);
        const name = nameMap?.get(p.gradeId);
        if (name) gKeys.add(name.toLowerCase());
      }
      if (p.grade) gKeys.add(p.grade.toLowerCase());

      // Sub-Grades
      if (p.subGradeId) {
        sgKeys.add(p.subGradeId);
        const name = nameMap?.get(p.subGradeId);
        if (name) sgKeys.add(name.toLowerCase());
      }
      if (p.subGrade) sgKeys.add(p.subGrade.toLowerCase());
    });

    return {
      availableBrandKeys: bKeys,
      availableSubBrandKeys: sbKeys,
      availableGradeKeys: gKeys,
      availableSubGradeKeys: sgKeys,
    };
  }, [categoryAssociatedProducts, selectedCategories, selectedSubCategories, userCategoryOverride, nameMap]);

  // Dynamic filter lists constrained to associated products at runtime
  const dynamicBrands = useMemo(() => {
    const list = brands.map((b) => b.name || b);
    if (!availableBrandKeys) return list;
    return list.filter((name) => {
      const lower = (name || "").toLowerCase();
      return availableBrandKeys.has(lower) || selectedBrands.includes(name);
    });
  }, [brands, availableBrandKeys, selectedBrands]);

  const dynamicSubBrands = useMemo(() => {
    const list = subBrands.map((sb) => sb.name || sb);
    if (!availableSubBrandKeys) return list;
    return list.filter((name) => {
      const lower = (name || "").toLowerCase();
      return availableSubBrandKeys.has(lower) || selectedSubBrands.includes(name);
    });
  }, [subBrands, availableSubBrandKeys, selectedSubBrands]);

  const dynamicGrades = useMemo(() => {
    const list = grades.map((g) => g.name || g);
    if (!availableGradeKeys) return list;
    return list.filter((name) => {
      const lower = (name || "").toLowerCase();
      return availableGradeKeys.has(lower) || selectedGrades.includes(name);
    });
  }, [grades, availableGradeKeys, selectedGrades]);

  const dynamicSubGrades = useMemo(() => {
    const list = subGrades.map((sg) => sg.name || sg);
    if (!availableSubGradeKeys) return list;
    return list.filter((name) => {
      const lower = (name || "").toLowerCase();
      return availableSubGradeKeys.has(lower) || selectedSubGrades.includes(name);
    });
  }, [subGrades, availableSubGradeKeys, selectedSubGrades]);

  // Active filter lists filtered by accordion search queries
  const displayedGrades = useMemo(() => {
    if (!gradeSearch) return dynamicGrades;
    return dynamicGrades.filter((g) => g.toLowerCase().includes(gradeSearch.toLowerCase().trim()));
  }, [dynamicGrades, gradeSearch]);

  const displayedSubBrands = useMemo(() => {
    if (!subBrandSearch) return dynamicSubBrands;
    return dynamicSubBrands.filter((sb) => sb.toLowerCase().includes(subBrandSearch.toLowerCase().trim()));
  }, [dynamicSubBrands, subBrandSearch]);

  const displayedBrands = useMemo(() => {
    if (!brandSearch) return dynamicBrands;
    return dynamicBrands.filter((b) => b.toLowerCase().includes(brandSearch.toLowerCase().trim()));
  }, [dynamicBrands, brandSearch]);

  const displayedSubGrades = useMemo(() => {
    if (!subGradeSearch) return dynamicSubGrades;
    return dynamicSubGrades.filter((sg) => sg.toLowerCase().includes(subGradeSearch.toLowerCase().trim()));
  }, [dynamicSubGrades, subGradeSearch]);

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

  // Page Maker chunking (reusing pagination logic from Admin update section)
  const pageSize = 15;
  const [currentPage, setCurrentPage] = useState(0);

  // Chunk filtered products into an array of pages (array of arrays, 15 items per index)
  const pages = useMemo(() => {
    const chunks = [];
    for (let i = 0; i < filteredProducts.length; i += pageSize) {
      chunks.push(filteredProducts.slice(i, i + pageSize));
    }
    return chunks;
  }, [filteredProducts, pageSize]);

  // Products for the currently selected page
  const currentProducts = useMemo(() => {
    if (pages.length === 0) return [];
    return pages[currentPage] || pages[0] || [];
  }, [pages, currentPage]);

  // Reset page when any filter changes
  useEffect(() => {
    setCurrentPage(0);
  }, [
    selectedCategories,
    selectedSubCategories,
    selectedGrades,
    selectedSubBrands,
    selectedBrands,
    selectedSubGrades,
    userCategoryOverride,
  ]);

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

            {/* 1. Category Accordion Card (Dynamic hierarchy: Types non-clickable, Variants with checkboxes) */}
            <div className="rounded-xl border border-[#E2E8F0] bg-white overflow-hidden transition-all shadow-2xs">
              <button
                onClick={() => setCategoryOpen(!categoryOpen)}
                className="w-full flex items-center justify-between px-4 py-3.5 text-left hover:bg-slate-50 transition cursor-pointer"
              >
                <span className="text-[16px] font-semibold text-slate-800">
                  Category
                </span>
                {categoryOpen ? (
                  <ChevronUp className="w-5 h-5 text-slate-700" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-slate-700" />
                )}
              </button>

              {categoryOpen && (
                <div className="px-4 pb-4 pt-2 bg-white border-t border-slate-100 space-y-4 max-h-[480px] overflow-y-auto">
                  {filtersLoading && categories.length === 0 ? (
                    <div className="flex items-center gap-2 text-xs text-slate-400 py-2">
                      <Loader2 className="w-4 h-4 animate-spin text-slate-400" />
                      <span>Loading categories...</span>
                    </div>
                  ) : displayedCategoryGroups.length === 0 ? (
                    <p className="text-xs text-slate-400 py-1">No categories configured.</p>
                  ) : (
                    displayedCategoryGroups.map((group) => {
                      const typeName = group.type.name;
                      const variants = group.variants || [];

                      return (
                        <div key={group.type.id || typeName} className="space-y-2">
                          {/* Non-clickable Type Header with increased font size */}
                          <div className="text-[14.5px] font-semibold text-slate-600 select-none tracking-tight">
                            {typeName}
                          </div>

                          {/* Associated Variants Checkboxes with increased font size */}
                          <div className="space-y-2.5 pl-0.5">
                            {variants.length > 0 ? (
                              variants.map((variant) => {
                                const isChecked =
                                  selectedSubCategories.includes(variant.name) ||
                                  selectedSubCategories.includes(variant.id);
                                return (
                                  <label
                                    key={variant.id || variant.name}
                                    className="flex items-center gap-2.5 text-[14px] text-slate-700 hover:text-slate-900 cursor-pointer select-none"
                                  >
                                    <input
                                      type="checkbox"
                                      checked={isChecked}
                                      onChange={() => handleToggleSubCategory(variant.name, typeName)}
                                      className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-0 cursor-pointer"
                                    />
                                    <span>{variant.name}</span>
                                  </label>
                                );
                              })
                            ) : (
                              <label className="flex items-center gap-2.5 text-[14px] text-slate-700 hover:text-slate-900 cursor-pointer select-none">
                                <input
                                  type="checkbox"
                                  checked={
                                    selectedSubCategories.includes(typeName) ||
                                    selectedSubCategories.includes(group.type.id)
                                  }
                                  onChange={() => handleToggleSubCategory(typeName)}
                                  className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-0 cursor-pointer"
                                />
                                <span>{typeName}</span>
                              </label>
                            )}
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              )}
            </div>

            {/* 2. Grade Accordion Card (Dynamic from category-associated products) */}
            <div className="rounded-xl border border-[#E2E8F0] bg-white overflow-hidden transition-all shadow-2xs">
              <button
                onClick={() => setGradeOpen(!gradeOpen)}
                className="w-full flex items-center justify-between px-4 py-3.5 text-left hover:bg-slate-50 transition cursor-pointer"
              >
                <span className="text-[16px] font-semibold text-[#0F172A] flex items-center gap-1.5">
                  Grade{" "}
                  {dynamicGrades.length > 0 && (
                    <span className="text-xs font-normal text-slate-400">({dynamicGrades.length})</span>
                  )}
                </span>
                {gradeOpen ? (
                  <ChevronUp className="w-5 h-5 text-slate-700" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-slate-700" />
                )}
              </button>

              {gradeOpen && (
                <div className="bg-white border-t border-[#E2E8F0]">
                  {/* Search inside Grade */}
                  <div className="p-3 border-b border-slate-100 bg-slate-50/50">
                    <div className="relative flex items-center">
                      <Search className="w-4 h-4 text-slate-400 absolute left-2.5 pointer-events-none" />
                      <input
                        type="text"
                        placeholder="Search grade..."
                        value={gradeSearch}
                        onChange={(e) => setGradeSearch(e.target.value)}
                        className="w-full text-sm pl-8 pr-7 py-2 border border-slate-200 rounded-md focus:outline-none focus:border-blue-500 bg-white"
                      />
                      {gradeSearch && (
                        <button
                          onClick={() => setGradeSearch("")}
                          className="absolute right-2 text-slate-400 hover:text-slate-600 cursor-pointer"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="p-3.5 flex flex-wrap gap-2.5">
                    {filtersLoading && grades.length === 0 ? (
                      <div className="flex items-center gap-2 text-xs text-slate-400 py-2 w-full justify-center">
                        <Loader2 className="w-4 h-4 animate-spin text-slate-400" />
                        <span>Loading active grades...</span>
                      </div>
                    ) : displayedGrades.length === 0 ? (
                      <p className="text-xs text-slate-400 py-2 w-full text-center">
                        {gradeSearch
                          ? `No active grades matching "${gradeSearch}"`
                          : "No active grades for selected products."}
                      </p>
                    ) : (
                      displayedGrades.map((grade) => {
                        const isChecked = selectedGrades.includes(grade);
                        return (
                          <span
                            key={grade}
                            onClick={() => handleToggleGrade(grade)}
                            className={`inline-flex items-center gap-2.5 px-3.5 py-2 rounded-xl text-[13.5px] font-medium cursor-pointer transition-all border select-none ${
                              isChecked
                                ? "bg-blue-50 text-[#004060] border-blue-300 font-semibold shadow-xs"
                                : "bg-white text-slate-800 border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={() => {}}
                              className="w-4 h-4 rounded-[3px] border-[#64748B] text-[#004060] pointer-events-none"
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

            {/* 3. Sub brand Accordion Card (Dynamic from category-associated products) */}
            <div className="rounded-xl border border-[#E2E8F0] bg-white overflow-hidden transition-all shadow-2xs">
              <button
                onClick={() => setSubBrandOpen(!subBrandOpen)}
                className="w-full flex items-center justify-between px-4 py-3.5 text-left hover:bg-slate-50 transition cursor-pointer"
              >
                <span className="text-[16px] font-semibold text-[#0F172A] flex items-center gap-1.5">
                  Sub brand{" "}
                  {dynamicSubBrands.length > 0 && (
                    <span className="text-xs font-normal text-slate-400">({dynamicSubBrands.length})</span>
                  )}
                </span>
                {subBrandOpen ? (
                  <ChevronUp className="w-5 h-5 text-slate-700" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-slate-700" />
                )}
              </button>

              {subBrandOpen && (
                <div className="bg-white border-t border-[#E2E8F0]">
                  {/* Search inside Sub brand */}
                  <div className="p-3 border-b border-slate-100 bg-slate-50/50">
                    <div className="relative flex items-center">
                      <Search className="w-4 h-4 text-slate-400 absolute left-2.5 pointer-events-none" />
                      <input
                        type="text"
                        placeholder="Search sub brand..."
                        value={subBrandSearch}
                        onChange={(e) => setSubBrandSearch(e.target.value)}
                        className="w-full text-sm pl-8 pr-7 py-2 border border-slate-200 rounded-md focus:outline-none focus:border-blue-500 bg-white"
                      />
                      {subBrandSearch && (
                        <button
                          onClick={() => setSubBrandSearch("")}
                          className="absolute right-2 text-slate-400 hover:text-slate-600 cursor-pointer"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="p-3.5 flex flex-wrap gap-2.5">
                    {filtersLoading && subBrands.length === 0 ? (
                      <div className="flex items-center gap-2 text-xs text-slate-400 py-2 w-full justify-center">
                        <Loader2 className="w-4 h-4 animate-spin text-slate-400" />
                        <span>Loading active sub-brands...</span>
                      </div>
                    ) : displayedSubBrands.length === 0 ? (
                      <p className="text-xs text-slate-400 py-2 w-full text-center">
                        {subBrandSearch
                          ? `No active sub-brands matching "${subBrandSearch}"`
                          : "No active sub-brands for selected products."}
                      </p>
                    ) : (
                      displayedSubBrands.map((subBrand) => {
                        const isChecked = selectedSubBrands.includes(subBrand);
                        return (
                          <span
                            key={subBrand}
                            onClick={() => handleToggleSubBrand(subBrand)}
                            className={`inline-flex items-center gap-2.5 px-3.5 py-2 rounded-xl text-[13.5px] font-medium cursor-pointer transition-all border select-none ${
                              isChecked
                                ? "bg-blue-50 text-[#004060] border-blue-300 font-semibold shadow-xs"
                                : "bg-white text-slate-800 border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={() => {}}
                              className="w-4 h-4 rounded-[3px] border-[#64748B] text-[#004060] pointer-events-none"
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

            {/* 4. Brand Accordion Card (Dynamic from category-associated products) */}
            <div className="rounded-xl border border-[#E2E8F0] bg-white overflow-hidden transition-all shadow-2xs">
              <button
                onClick={() => setBrandOpen(!brandOpen)}
                className="w-full flex items-center justify-between px-4 py-3.5 text-left hover:bg-slate-50 transition cursor-pointer"
              >
                <span className="text-[16px] font-semibold text-[#0F172A] flex items-center gap-1.5">
                  Brand{" "}
                  {dynamicBrands.length > 0 && (
                    <span className="text-xs font-normal text-slate-400">({dynamicBrands.length})</span>
                  )}
                </span>
                {brandOpen ? (
                  <ChevronUp className="w-5 h-5 text-slate-700" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-slate-700" />
                )}
              </button>

              {brandOpen && (
                <div className="bg-white border-t border-[#E2E8F0]">
                  {/* Search inside Brand */}
                  <div className="p-3 border-b border-slate-100 bg-slate-50/50">
                    <div className="relative flex items-center">
                      <Search className="w-4 h-4 text-slate-400 absolute left-2.5 pointer-events-none" />
                      <input
                        type="text"
                        placeholder="Search brand..."
                        value={brandSearch}
                        onChange={(e) => setBrandSearch(e.target.value)}
                        className="w-full text-sm pl-8 pr-7 py-2 border border-slate-200 rounded-md focus:outline-none focus:border-blue-500 bg-white"
                      />
                      {brandSearch && (
                        <button
                          onClick={() => setBrandSearch("")}
                          className="absolute right-2 text-slate-400 hover:text-slate-600 cursor-pointer"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="p-3.5 flex flex-wrap gap-2.5">
                    {filtersLoading && brands.length === 0 ? (
                      <div className="flex items-center gap-2 text-xs text-slate-400 py-2 w-full justify-center">
                        <Loader2 className="w-4 h-4 animate-spin text-slate-400" />
                        <span>Loading active brands...</span>
                      </div>
                    ) : displayedBrands.length === 0 ? (
                      <p className="text-xs text-slate-400 py-2 w-full text-center">
                        {brandSearch
                          ? `No active brands matching "${brandSearch}"`
                          : "No active brands for selected products."}
                      </p>
                    ) : (
                      displayedBrands.map((brand) => {
                        const isChecked = selectedBrands.includes(brand);
                        return (
                          <span
                            key={brand}
                            onClick={() => handleToggleBrand(brand)}
                            className={`inline-flex items-center gap-2.5 px-3.5 py-2 rounded-xl text-[13.5px] font-medium cursor-pointer transition-all border select-none ${
                              isChecked
                                ? "bg-blue-50 text-[#004060] border-blue-300 font-semibold shadow-xs"
                                : "bg-white text-slate-800 border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={() => {}}
                              className="w-4 h-4 rounded-[3px] border-[#64748B] text-[#004060] pointer-events-none"
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

            {/* 5. Sub grade Accordion Card (Dynamic from category-associated products) */}
            <div className="rounded-xl border border-[#E2E8F0] bg-white overflow-hidden transition-all shadow-2xs">
              <button
                onClick={() => setSubGradeOpen(!subGradeOpen)}
                className="w-full flex items-center justify-between px-4 py-3.5 text-left hover:bg-slate-50 transition cursor-pointer"
              >
                <span className="text-[16px] font-semibold text-[#0F172A] flex items-center gap-1.5">
                  Sub grade{" "}
                  {dynamicSubGrades.length > 0 && (
                    <span className="text-xs font-normal text-slate-400">({dynamicSubGrades.length})</span>
                  )}
                </span>
                {subGradeOpen ? (
                  <ChevronUp className="w-5 h-5 text-slate-700" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-slate-700" />
                )}
              </button>

              {subGradeOpen && (
                <div className="bg-white border-t border-[#E2E8F0]">
                  {/* Search inside Sub grade */}
                  <div className="p-3 border-b border-slate-100 bg-slate-50/50">
                    <div className="relative flex items-center">
                      <Search className="w-4 h-4 text-slate-400 absolute left-2.5 pointer-events-none" />
                      <input
                        type="text"
                        placeholder="Search sub grade..."
                        value={subGradeSearch}
                        onChange={(e) => setSubGradeSearch(e.target.value)}
                        className="w-full text-sm pl-8 pr-7 py-2 border border-slate-200 rounded-md focus:outline-none focus:border-blue-500 bg-white"
                      />
                      {subGradeSearch && (
                        <button
                          onClick={() => setSubGradeSearch("")}
                          className="absolute right-2 text-slate-400 hover:text-slate-600 cursor-pointer"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="p-3.5 flex flex-wrap gap-2.5">
                    {filtersLoading && subGrades.length === 0 ? (
                      <div className="flex items-center gap-2 text-xs text-slate-400 py-2 w-full justify-center">
                        <Loader2 className="w-4 h-4 animate-spin text-slate-400" />
                        <span>Loading active sub-grades...</span>
                      </div>
                    ) : displayedSubGrades.length === 0 ? (
                      <p className="text-xs text-slate-400 py-2 w-full text-center">
                        {subGradeSearch
                          ? `No active sub-grades matching "${subGradeSearch}"`
                          : "No active sub-grades for selected products."}
                      </p>
                    ) : (
                      displayedSubGrades.map((subGrade) => {
                        const isChecked = selectedSubGrades.includes(subGrade);
                        return (
                          <span
                            key={subGrade}
                            onClick={() => handleToggleSubGrade(subGrade)}
                            className={`inline-flex items-center gap-2.5 px-3.5 py-2 rounded-xl text-[13.5px] font-medium cursor-pointer transition-all border select-none ${
                              isChecked
                                ? "bg-blue-50 text-[#004060] border-blue-300 font-semibold shadow-xs"
                                : "bg-white text-slate-800 border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={() => {}}
                              className="w-4 h-4 rounded-[3px] border-[#64748B] text-[#004060] pointer-events-none"
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
              <div className="flex flex-wrap items-center gap-2.5 mb-5">
                <span className="text-sm font-semibold text-slate-500 mr-1">Active Filters:</span>

                {selectedCategories.map((cat) => (
                  <span
                    key={`chip-cat-${cat}`}
                    className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-sm font-medium bg-[#EBF5FF] text-[#1E40AF] border border-[#BFDBFE]"
                  >
                    <span>{cat}</span>
                    <button
                      onClick={() => handleToggleCategory(cat)}
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
                      onClick={() => handleToggleSubCategory(subCat)}
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
                      onClick={() => handleToggleGrade(grade)}
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
                      onClick={() => handleToggleBrand(brand)}
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
                      onClick={() => handleToggleSubBrand(subBrand)}
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
                      onClick={() => handleToggleSubGrade(sg)}
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
                      onClick={() => setUserCategoryOverride(null)}
                      className="hover:text-purple-900 transition cursor-pointer"
                    >
                      <X className="w-4 h-4" />
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
                  {currentProducts.map((product) => {
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

                {/* Real Pagination Controls (reused admin update pattern) */}
                {pages.length > 1 && (
                  <div className="pt-8 mt-8 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm">
                    <span className="text-slate-600">
                      Page <strong className="text-slate-900">{currentPage + 1}</strong> of{" "}
                      <strong className="text-slate-900">{pages.length}</strong> ({filteredProducts.length} items total)
                    </span>

                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => {
                          setCurrentPage((p) => Math.max(0, p - 1));
                          window.scrollTo({ top: 300, behavior: "smooth" });
                        }}
                        disabled={currentPage === 0}
                        className="p-2 rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer shadow-2xs transition-colors"
                        title="Previous Page"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>

                      {pages.map((_, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => {
                            setCurrentPage(idx);
                            window.scrollTo({ top: 300, behavior: "smooth" });
                          }}
                          className={`w-8 h-8 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
                            currentPage === idx
                              ? "bg-[#004060] text-white shadow-xs"
                              : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                          }`}
                        >
                          {idx + 1}
                        </button>
                      ))}

                      <button
                        type="button"
                        onClick={() => {
                          setCurrentPage((p) => Math.min(pages.length - 1, p + 1));
                          window.scrollTo({ top: 300, behavior: "smooth" });
                        }}
                        disabled={currentPage >= pages.length - 1}
                        className="p-2 rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer shadow-2xs transition-colors"
                        title="Next Page"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
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
