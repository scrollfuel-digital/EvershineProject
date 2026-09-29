import { useState, useMemo, useEffect } from "react";
import {
  GRADES_LIST,
  SUB_BRANDS_LIST,
  BRANDS_LIST,
  SUB_GRADES_LIST
} from "../data/filterData";

/**
 * Helper to match category filter against product fields and known synonyms
 */
function matchesCategoryFilter(product, categoryName) {
  if (!product || !categoryName) return false;
  const pCat = product.category?.toLowerCase() || '';
  const pSubCat = product.subCategory?.toLowerCase() || '';
  const pGroup = product.group?.toLowerCase() || '';
  const pTitle = product.title?.toLowerCase() || '';
  const target = categoryName.toLowerCase().trim();

  // Exact match
  if (pCat === target || pSubCat === target) return true;

  // Specific groups & aliases
  if (target === 'mild steel' && pGroup.includes('mild steel')) return true;
  if (target === 'structural steel' && pGroup.includes('structural')) return true;
  if (target === 'roofing & cladding' && pGroup.includes('roofing')) return true;
  if (target === 'puf panels' && (pCat.includes('puf') || pCat.includes('puff') || pTitle.includes('puf') || pTitle.includes('puff'))) return true;
  if (target === 'polycarbonate sheet' && (pCat.includes('poly') || pTitle.includes('polycarbonate'))) return true;
  if (target === 'angles' && (pCat.includes('angle') || pTitle.includes('angle'))) return true;
  if (target === 'channels' && (pCat.includes('channel') || pTitle.includes('channel') || pTitle.includes('beam'))) return true;
  if (target === 'colour coated' && (pCat === 'colour coated' || pTitle.includes('colour coated') || pTitle.includes('ppgl'))) return true;
  if (target === 'coated steel' && (pCat === 'coated steel' || pTitle.includes('galvalume') || pTitle.includes('galvanized'))) return true;
  if (target === 'ms hot rolled' && (pCat === 'ms hot rolled' || pTitle.includes('hot rolled'))) return true;
  if (target === 'ms cold rolled' && (pCat === 'ms cold rolled' || pTitle.includes('cold rolled'))) return true;

  // Substring matching
  return pCat.includes(target) || target.includes(pCat) || pTitle.includes(target);
}

/**
 * Helper to match sub-category filter against product fields
 */
function matchesSubCategoryFilter(product, subCategoryName) {
  if (!product || !subCategoryName) return false;
  const pSubCat = product.subCategory?.toLowerCase() || '';
  const pTitle = product.title?.toLowerCase() || '';
  const target = subCategoryName.toLowerCase().trim();

  return pSubCat === target || pSubCat.includes(target) || pTitle.includes(target);
}

/**
 * Helper to match top category cards or URL slug against product fields
 */
function matchesTopCategoryFilter(product, topCategoryName) {
  if (!product || !topCategoryName) return false;
  const pCat = product.category?.toLowerCase() || '';
  const pSubCat = product.subCategory?.toLowerCase() || '';
  const pTitle = product.title?.toLowerCase() || '';
  const target = topCategoryName.toLowerCase().trim();

  if (pCat === target || pSubCat === target) return true;
  if (target.includes('angle') && (pCat.includes('angle') || pTitle.includes('angle'))) return true;
  if ((target.includes('puf') || target.includes('puff')) && (pCat.includes('puff') || pCat.includes('puf') || pTitle.includes('puff') || pTitle.includes('puf'))) return true;
  if (target.includes('poly') && (pCat.includes('poly') || pTitle.includes('poly'))) return true;
  if (target.includes('ppgl') && (pCat.includes('colour coated') || pTitle.includes('ppgl') || pSubCat.includes('galvalume'))) return true;
  if (target.includes('baregalvalume') && (pCat.includes('coated') || pTitle.includes('galvalume') || pTitle.includes('silveron'))) return true;

  return pCat.includes(target) || target.includes(pCat) || pSubCat.includes(target) || pTitle.includes(target);
}

/**
 * Custom hook to manage product filtering state, search inside accordions,
 * and computation of filtered products.
 *
 * @param {Array} products - Raw product list (e.g. SAMPLE_PRODUCTS)
 * @param {string|null} selectedSubCategory - Currently selected sub-category from slider or URL
 * @param {boolean} hasCategoryOverride - Whether an active override from slider/URL exists
 */
export function useProductFilters(
  products = [],
  selectedSubCategory = null,
  hasCategoryOverride = false,
  initialCategories = []
) {
  // Filter Checkbox Selection States
  const [selectedCategories, setSelectedCategories] = useState(
    Array.isArray(initialCategories) ? initialCategories : []
  );
  const [selectedSubCategories, setSelectedSubCategories] = useState([]);
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
  const [gradeSearch, setGradeSearch] = useState('');
  const [subBrandSearch, setSubBrandSearch] = useState('');
  const [brandSearch, setBrandSearch] = useState('');
  const [subGradeSearch, setSubGradeSearch] = useState('');

  // Toggle handlers
  const handleToggleCategory = (category) => {
    setSelectedCategories(prev =>
      prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
    );
  };

  const handleToggleSubCategory = (subCat) => {
    setSelectedSubCategories(prev =>
      prev.includes(subCat) ? prev.filter(s => s !== subCat) : [...prev, subCat]
    );
  };

  const handleToggleGrade = (grade) => {
    setSelectedGrades(prev =>
      prev.includes(grade) ? prev.filter(g => g !== grade) : [...prev, grade]
    );
  };

  const handleToggleSubBrand = (subBrand) => {
    setSelectedSubBrands(prev =>
      prev.includes(subBrand) ? prev.filter(s => s !== subBrand) : [...prev, subBrand]
    );
  };

  const handleToggleBrand = (brand) => {
    setSelectedBrands(prev =>
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    );
  };

  const handleToggleSubGrade = (subGrade) => {
    setSelectedSubGrades(prev =>
      prev.includes(subGrade) ? prev.filter(sg => sg !== subGrade) : [...prev, subGrade]
    );
  };

  // Clear all filters
  const handleClearFilters = () => {
    setSelectedCategories([]);
    setSelectedSubCategories([]);
    setSelectedGrades([]);
    setSelectedSubBrands([]);
    setSelectedBrands([]);
    setSelectedSubGrades([]);
    setGradeSearch('');
    setSubBrandSearch('');
    setBrandSearch('');
    setSubGradeSearch('');
  };

  // Determine whether any category/subcategory filtering is active
  const isCategoryActive =
    selectedCategories.length > 0 ||
    selectedSubCategories.length > 0 ||
    Boolean(selectedSubCategory);

  // Products matching the active category selections
  const categoryProducts = useMemo(() => {
    if (!isCategoryActive) {
      return products;
    }

    return products.filter(p => {
      // 1. Filter by Category Checkboxes (OR match across checked categories)
      if (selectedCategories.length > 0) {
        const matchesCat = selectedCategories.some(cat => matchesCategoryFilter(p, cat));
        if (!matchesCat) return false;
      }

      // 1b. Filter by Sub-category Checkboxes (OR match across checked sub-categories)
      if (selectedSubCategories.length > 0) {
        const matchesSubCat = selectedSubCategories.some(sc => matchesSubCategoryFilter(p, sc));
        if (!matchesSubCat) return false;
      }

      // 2. Filter by top category cards or URL slug if no checkbox is explicitly active
      if (selectedSubCategory && selectedCategories.length === 0 && selectedSubCategories.length === 0) {
        if (!matchesTopCategoryFilter(p, selectedSubCategory)) return false;
      }

      return true;
    });
  }, [products, selectedCategories, selectedSubCategories, selectedSubCategory, isCategoryActive]);

  // Dynamically compute available Grades related to active category
  const availableGrades = useMemo(() => {
    if (!isCategoryActive) return GRADES_LIST;

    const catGrades = new Set();
    categoryProducts.forEach(p => {
      if (p.grade && typeof p.grade === 'string' && p.grade.trim()) {
        catGrades.add(p.grade.trim());
      }
    });

    const result = [];
    const addedLower = new Set();

    GRADES_LIST.forEach(g => {
      const gLower = g.toLowerCase();
      for (const cg of catGrades) {
        if (cg.toLowerCase() === gLower) {
          result.push(g);
          addedLower.add(gLower);
          break;
        }
      }
    });

    catGrades.forEach(cg => {
      if (!addedLower.has(cg.toLowerCase())) {
        result.push(cg);
        addedLower.add(cg.toLowerCase());
      }
    });

    return result;
  }, [categoryProducts, isCategoryActive]);

  // Dynamically compute available Sub-brands related to active category
  const availableSubBrands = useMemo(() => {
    if (!isCategoryActive) return SUB_BRANDS_LIST;

    const catSubBrands = new Set();
    categoryProducts.forEach(p => {
      if (p.subBrand && typeof p.subBrand === 'string' && p.subBrand.trim()) {
        catSubBrands.add(p.subBrand.trim());
      }
    });

    const result = [];
    const addedLower = new Set();

    SUB_BRANDS_LIST.forEach(sb => {
      const sbLower = sb.toLowerCase();
      for (const csb of catSubBrands) {
        if (csb.toLowerCase() === sbLower) {
          result.push(sb);
          addedLower.add(sbLower);
          break;
        }
      }
    });

    catSubBrands.forEach(csb => {
      if (!addedLower.has(csb.toLowerCase())) {
        result.push(csb);
        addedLower.add(csb.toLowerCase());
      }
    });

    return result;
  }, [categoryProducts, isCategoryActive]);

  // Dynamically compute available Brands related to active category
  const availableBrands = useMemo(() => {
    if (!isCategoryActive) return BRANDS_LIST;

    const catBrands = new Set();
    categoryProducts.forEach(p => {
      if (p.brand && typeof p.brand === 'string' && p.brand.trim()) {
        catBrands.add(p.brand.trim());
      }
    });

    const result = [];
    const addedLower = new Set();

    BRANDS_LIST.forEach(b => {
      const bLower = b.toLowerCase();
      for (const cb of catBrands) {
        if (cb.toLowerCase() === bLower) {
          result.push(b);
          addedLower.add(bLower);
          break;
        }
      }
    });

    catBrands.forEach(cb => {
      if (!addedLower.has(cb.toLowerCase())) {
        result.push(cb);
        addedLower.add(cb.toLowerCase());
      }
    });

    return result;
  }, [categoryProducts, isCategoryActive]);

  // Dynamically compute available Sub-grades related to active category
  const availableSubGrades = useMemo(() => {
    if (!isCategoryActive) return SUB_GRADES_LIST;

    const catSubGrades = new Set();
    categoryProducts.forEach(p => {
      if (p.subGrade && typeof p.subGrade === 'string' && p.subGrade.trim()) {
        catSubGrades.add(p.subGrade.trim());
      }
    });

    const result = [];
    const addedClean = new Set();

    SUB_GRADES_LIST.forEach(sg => {
      const sgClean = sg.toLowerCase().replace(/[\s_-]+/g, '');
      for (const csg of catSubGrades) {
        if (csg.toLowerCase().replace(/[\s_-]+/g, '') === sgClean) {
          result.push(sg);
          addedClean.add(sgClean);
          break;
        }
      }
    });

    catSubGrades.forEach(csg => {
      const csgClean = csg.toLowerCase().replace(/[\s_-]+/g, '');
      if (!addedClean.has(csgClean)) {
        result.push(csg);
        addedClean.add(csgClean);
      }
    });

    return result;
  }, [categoryProducts, isCategoryActive]);

  // Prune any selections that are no longer available in the active category
  useEffect(() => {
    if (!isCategoryActive) return;

    setSelectedGrades(prev => {
      const next = prev.filter(g =>
        availableGrades.some(ag => ag.toLowerCase() === g.toLowerCase())
      );
      return next.length === prev.length ? prev : next;
    });

    setSelectedSubBrands(prev => {
      const next = prev.filter(sb =>
        availableSubBrands.some(asb => asb.toLowerCase() === sb.toLowerCase())
      );
      return next.length === prev.length ? prev : next;
    });

    setSelectedBrands(prev => {
      const next = prev.filter(b =>
        availableBrands.some(ab => ab.toLowerCase() === b.toLowerCase())
      );
      return next.length === prev.length ? prev : next;
    });

    setSelectedSubGrades(prev => {
      const next = prev.filter(sg => {
        const sgClean = sg.toLowerCase().replace(/[\s_-]+/g, '');
        return availableSubGrades.some(
          asg => asg.toLowerCase().replace(/[\s_-]+/g, '') === sgClean
        );
      });
      return next.length === prev.length ? prev : next;
    });
  }, [isCategoryActive, availableGrades, availableSubBrands, availableBrands, availableSubGrades]);

  // Filtered lists based on search queries inside accordions
  const displayedGrades = useMemo(() => {
    if (!gradeSearch.trim()) return availableGrades;
    const q = gradeSearch.toLowerCase();
    return availableGrades.filter(g => g.toLowerCase().includes(q));
  }, [availableGrades, gradeSearch]);

  const displayedSubBrands = useMemo(() => {
    if (!subBrandSearch.trim()) return availableSubBrands;
    const q = subBrandSearch.toLowerCase();
    return availableSubBrands.filter(sb => sb.toLowerCase().includes(q));
  }, [availableSubBrands, subBrandSearch]);

  const displayedBrands = useMemo(() => {
    if (!brandSearch.trim()) return availableBrands;
    const q = brandSearch.toLowerCase();
    return availableBrands.filter(b => b.toLowerCase().includes(q));
  }, [availableBrands, brandSearch]);

  const displayedSubGrades = useMemo(() => {
    if (!subGradeSearch.trim()) return availableSubGrades;
    const q = subGradeSearch.toLowerCase();
    return availableSubGrades.filter(sg => sg.toLowerCase().includes(q));
  }, [availableSubGrades, subGradeSearch]);

  // Filter products logic
  const filteredProducts = useMemo(() => {
    return categoryProducts.filter(p => {
      // 3. Filter by Grade
      if (selectedGrades.length > 0 && (!p.grade || !selectedGrades.some(g => g.toLowerCase() === p.grade?.toLowerCase()))) {
        return false;
      }

      // 4. Filter by Sub-brand
      if (selectedSubBrands.length > 0 && (!p.subBrand || !selectedSubBrands.some(sb => sb.toLowerCase() === p.subBrand?.toLowerCase()))) {
        return false;
      }

      // 5. Filter by Brand (flexible matching)
      if (selectedBrands.length > 0) {
        const pBrand = p.brand?.toLowerCase() || '';
        const matchesBrand = selectedBrands.some(b => {
          const bLower = b.toLowerCase();
          return pBrand === bLower || pBrand.includes(bLower) || bLower.includes(pBrand);
        });
        if (!matchesBrand) return false;
      }

      // 6. Filter by Sub-grade (whitespace and punctuation agnostic)
      if (selectedSubGrades.length > 0) {
        const pSubGrade = p.subGrade?.toLowerCase().replace(/[\s_-]+/g, '') || '';
        const matchesSubGrade = selectedSubGrades.some(sg => {
          const sgClean = sg.toLowerCase().replace(/[\s_-]+/g, '');
          return pSubGrade === sgClean || pSubGrade.includes(sgClean) || sgClean.includes(pSubGrade);
        });
        if (!matchesSubGrade) return false;
      }

      return true;
    });
  }, [
    categoryProducts,
    selectedGrades,
    selectedSubBrands,
    selectedBrands,
    selectedSubGrades
  ]);

  const hasActiveFilters =
    selectedCategories.length > 0 ||
    selectedSubCategories.length > 0 ||
    selectedGrades.length > 0 ||
    selectedSubBrands.length > 0 ||
    selectedBrands.length > 0 ||
    selectedSubGrades.length > 0 ||
    Boolean(selectedSubCategory) ||
    hasCategoryOverride;

  return {
    // Selection state
    selectedCategories,
    setSelectedCategories,
    handleToggleCategory,

    selectedSubCategories,
    setSelectedSubCategories,
    handleToggleSubCategory,

    selectedGrades,
    setSelectedGrades,
    handleToggleGrade,

    selectedSubBrands,
    setSelectedSubBrands,
    handleToggleSubBrand,

    selectedBrands,
    setSelectedBrands,
    handleToggleBrand,

    selectedSubGrades,
    setSelectedSubGrades,
    handleToggleSubGrade,

    // Accordion state
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

    // Search state
    gradeSearch,
    setGradeSearch,
    subBrandSearch,
    setSubBrandSearch,
    brandSearch,
    setBrandSearch,
    subGradeSearch,
    setSubGradeSearch,

    // Category dynamic options
    isCategoryActive,
    availableGrades,
    availableSubBrands,
    availableBrands,
    availableSubGrades,

    // Filtered lists for accordions
    displayedGrades,
    displayedSubBrands,
    displayedBrands,
    displayedSubGrades,

    // Filtered results & controls
    filteredProducts,
    handleClearFilters,
    hasActiveFilters
  };
}
