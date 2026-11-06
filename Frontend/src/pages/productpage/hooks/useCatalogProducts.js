import { useState, useMemo, useEffect, useCallback } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { useDataProcess } from "../../../services/dataProccess";
import { fetchActiveProducts } from "../../../services/productService";
import { categoryListData } from "../../../data/categoryListData";

export function useCatalogProducts({ initialCategory = null } = {}) {
  const { slug, categoryName, categorySlug } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const queryCategory = searchParams.get("category");
  const querySubCategory = searchParams.get("subCategory");
  const queryBrand = searchParams.get("brand");

  const currentSlug = slug || categoryName || categorySlug;

  // Consume dynamic active filters & name map from centralized data processing service
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

  // Active Products State (fetched from /api/products/status/active)
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
  const [selectedBrands, setSelectedBrands] = useState(() => {
    return queryBrand ? [queryBrand] : [];
  });
  const [selectedSubGrades, setSelectedSubGrades] = useState([]);

  // Accordion Expand/Collapse States (Category opened by default)
  const [categoryOpen, setCategoryOpen] = useState(true);
  const [gradeOpen, setGradeOpen] = useState(false);
  const [subBrandOpen, setSubBrandOpen] = useState(false);
  const [brandOpen, setBrandOpen] = useState(() => Boolean(queryBrand));
  const [subGradeOpen, setSubGradeOpen] = useState(false);

  // Search queries inside filter accordions
  const [gradeSearch, setGradeSearch] = useState("");
  const [subBrandSearch, setSubBrandSearch] = useState("");
  const [brandSearch, setBrandSearch] = useState("");
  const [subGradeSearch, setSubGradeSearch] = useState("");

  // Sync state when URL query params change (e.g. clicking nav item, back/forward, or clearing)
  useEffect(() => {
    setSelectedCategories(queryCategory ? [queryCategory] : []);
    setSelectedSubCategories(querySubCategory ? [querySubCategory] : []);
    setSelectedBrands(queryBrand ? [queryBrand] : []);
    setUserCategoryOverride(querySubCategory || null);
    if (queryBrand) {
      setBrandOpen(true);
    }
  }, [queryCategory, querySubCategory, queryBrand]);

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
        return [matchingTypeGroup];
      }

      // Check if user clicked a Variant from nav
      for (const g of allTypesWithVariants) {
        const matchingVar = g.variants.find(
          (v) => v.name?.toLowerCase() === lowerSub || v.id === querySubCategory
        );
        if (matchingVar) {
          return [
            {
              type: g.type,
              variants: [matchingVar],
            },
          ];
        }
      }
    }

    // Default: Show all types and variants associated with active category
    return allTypesWithVariants;
  }, [activeCategory, querySubCategory, categoryVariantsMap]);

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
    setSelectedBrands((prev) => {
      const lower = brandName.toLowerCase();
      const isRemoving = prev.some(
        (b) =>
          b.toLowerCase() === lower ||
          (b.toLowerCase().includes("tata") && lower.includes("tata")) ||
          ((b.toLowerCase().includes("amns") || b.toLowerCase().includes("am/ns")) &&
            (lower.includes("amns") || lower.includes("am/ns")))
      );
      const next = isRemoving
        ? prev.filter(
            (b) =>
              b.toLowerCase() !== lower &&
              !(b.toLowerCase().includes("tata") && lower.includes("tata")) &&
              !((b.toLowerCase().includes("amns") || b.toLowerCase().includes("am/ns")) &&
                (lower.includes("amns") || lower.includes("am/ns")))
          )
        : [...prev, brandName];
      if (isRemoving && searchParams.get("brand")) {
        setSearchParams((sp) => {
          const updated = new URLSearchParams(sp);
          updated.delete("brand");
          return updated;
        }, { replace: true });
      }
      return next;
    });
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

    if (!hasCatFilter && !hasSubCatFilter && !hasOverride) {
      return products;
    }

    return products.filter((p) => {
      // 1. Match Category (match ID or resolved Name)
      if (hasCatFilter) {
        const pCatName = nameMap?.get(p.categoryId) || p.categoryName || p.category || "";
        const matchesCat =
          (p.categoryId && selectedCategories.includes(p.categoryId)) ||
          (pCatName && selectedCategories.some((c) => c.toLowerCase() === pCatName.toLowerCase())) ||
          (activeCategory && (p.categoryId === activeCategory.id || (pCatName && pCatName.toLowerCase() === activeCategory.name?.toLowerCase())));
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
  }, [products, selectedCategories, selectedSubCategories, userCategoryOverride, nameMap, activeCategory]);

  // Compute sets of active Brand, Sub-Brand, Grade, Sub-Grade associated with current category/sub-category
  const { availableBrandKeys, availableSubBrandKeys, availableGradeKeys, availableSubGradeKeys } = useMemo(() => {
    const hasCatFilter = selectedCategories.length > 0;
    const hasSubCatFilter = selectedSubCategories.length > 0;
    const hasOverride = Boolean(userCategoryOverride);

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
    const combined = [...list];
    for (const sb of selectedBrands) {
      if (
        sb &&
        !combined.some(
          (b) =>
            b.toLowerCase() === sb.toLowerCase() ||
            (sb.toLowerCase().includes("tata") && b.toLowerCase().includes("tata")) ||
            ((sb.toLowerCase().includes("amns") || sb.toLowerCase().includes("am/ns")) &&
              (b.toLowerCase().includes("amns") || b.toLowerCase().includes("am/ns")))
        )
      ) {
        combined.push(sb);
      }
    }
    if (!availableBrandKeys) return combined;
    return combined.filter((name) => {
      const lower = (name || "").toLowerCase();
      return (
        availableBrandKeys.has(lower) ||
        selectedBrands.some(
          (sb) =>
            sb.toLowerCase() === lower ||
            (sb.toLowerCase().includes("tata") && lower.includes("tata")) ||
            ((sb.toLowerCase().includes("amns") || sb.toLowerCase().includes("am/ns")) &&
              (lower.includes("amns") || lower.includes("am/ns")))
        )
      );
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
      // 1. Filter by Category
      if (selectedCategories.length > 0) {
        const pCatName = nameMap?.get(p.categoryId) || p.categoryName || p.category || "";
        const matches =
          (p.categoryId && selectedCategories.includes(p.categoryId)) ||
          (pCatName && selectedCategories.some((c) => c.toLowerCase() === pCatName.toLowerCase())) ||
          (activeCategory && (p.categoryId === activeCategory.id || (pCatName && pCatName.toLowerCase() === activeCategory.name?.toLowerCase())));
        if (!matches) return false;
      }

      // 2. Filter by Sub-Category / Type / Variant
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

      // 3. Filter by Brand (match ID, resolved Name, alias, or Title)
      if (selectedBrands.length > 0) {
        const pBrandName = (nameMap?.get(p.brandId) || p.brand || "").toLowerCase();
        const pTitle = (p.title || "").toLowerCase();
        const matches = selectedBrands.some((sb) => {
          const lowerSb = sb.toLowerCase();
          return (
            (p.brandId && (p.brandId === sb || p.brandId.toLowerCase() === lowerSb)) ||
            (pBrandName && pBrandName === lowerSb) ||
            (lowerSb.includes("tata") && (pBrandName.includes("tata") || pTitle.includes("tata"))) ||
            ((lowerSb.includes("amns") || lowerSb.includes("am/ns")) &&
              (pBrandName.includes("amns") || pBrandName.includes("am/ns") || pTitle.includes("amns") || pTitle.includes("am/ns"))) ||
            (pBrandName && (pBrandName.includes(lowerSb) || lowerSb.includes(pBrandName))) ||
            pTitle.includes(lowerSb)
          );
        });
        if (!matches) return false;
      }

      // 4. Filter by Sub-Brand
      if (selectedSubBrands.length > 0) {
        const pSubBrandName = nameMap?.get(p.subBrandId);
        const matches =
          (p.subBrandId && selectedSubBrands.includes(p.subBrandId)) ||
          (pSubBrandName && selectedSubBrands.includes(pSubBrandName));
        if (!matches) return false;
      }

      // 5. Filter by Grade
      if (selectedGrades.length > 0) {
        const pGradeName = nameMap?.get(p.gradeId);
        const matches =
          (p.gradeId && selectedGrades.includes(p.gradeId)) ||
          (pGradeName && selectedGrades.includes(pGradeName));
        if (!matches) return false;
      }

      // 6. Filter by Sub-Grade
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
    activeCategory,
  ]);

  // Page Maker chunking (15 items per page)
  const pageSize = 15;
  const [currentPage, setCurrentPage] = useState(0);

  const pages = useMemo(() => {
    const chunks = [];
    for (let i = 0; i < filteredProducts.length; i += pageSize) {
      chunks.push(filteredProducts.slice(i, i + pageSize));
    }
    return chunks;
  }, [filteredProducts, pageSize]);

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

  return {
    // States
    products,
    productsLoading,
    productsError,
    loadProducts,
    categories,
    filtersLoading,
    nameMap,
    activeCategory,
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
    // Accordion States
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
    // Search Queries
    gradeSearch,
    setGradeSearch,
    subBrandSearch,
    setSubBrandSearch,
    brandSearch,
    setBrandSearch,
    subGradeSearch,
    setSubGradeSearch,
    // Dynamic Filter Lists
    dynamicGrades,
    dynamicSubBrands,
    dynamicBrands,
    dynamicSubGrades,
    displayedGrades,
    displayedSubBrands,
    displayedBrands,
    displayedSubGrades,
    // Toggle Handlers
    handleToggleCategory,
    handleToggleSubCategory,
    handleToggleGrade,
    handleToggleSubBrand,
    handleToggleBrand,
    handleToggleSubGrade,
    handleClearFilters,
    // Filtered Output & Pagination
    filteredProducts,
    currentProducts,
    currentPage,
    setCurrentPage,
    pages,
  };
}

