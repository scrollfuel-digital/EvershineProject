import { useState, useMemo, useEffect } from "react";
import {
  GRADES_LIST,
  SUB_BRANDS_LIST,
  BRANDS_LIST,
  SUB_GRADES_LIST,
  CATEGORY_SPECIFIC_FILTERS
} from "../data/filterData";

/**
 * Normalizes grade standard strings by removing 'IS ', 'IS', colons, underscores, hyphens, and spaces
 * E.g. '15961_2012' -> '159612012', 'IS 15961:2012' -> '159612012', 'ASTM A792' -> 'astma792'
 */
export function normalizeGrade(grade) {
  if (!grade || typeof grade !== 'string') return '';
  return grade
    .toLowerCase()
    .replace(/^is\s*/i, '')
    .replace(/[\s_:.-]+/g, '');
}

/**
 * Normalizes sub-grade strings by removing spaces, underscores, and hyphens
 * E.g. 'YS_250' -> 'ys250', 'YS 250' -> 'ys250', 'CS Type B' -> 'cstypeb'
 */
export function normalizeSubGrade(subGrade) {
  if (!subGrade || typeof subGrade !== 'string') return '';
  return subGrade.toLowerCase().replace(/[\s_-]+/g, '');
}

/**
 * Checks if a string or slug corresponds to Colour Coated category
 */
function isColourCoatedCategory(cat) {
  if (!cat) return false;
  const c = cat.toLowerCase().trim();
  return c === 'colour coated' || c === 'ppgl-ppgi' || c === 'colour-coated';
}

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
  if (target === 'colour coated' && (
    pCat === 'colour coated' ||
    pTitle.includes('colour coated') ||
    pTitle.includes('ppgl') ||
    pSubCat === 'galvanized coils' ||
    pSubCat === 'galvanized sheets' ||
    pSubCat === 'pre-painted galvalume coils' ||
    pSubCat === 'pre-painted galvalume sheets'
  )) return true;
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

  // Disallow pre-painted products when filtering for bare galvalume sheets or coils
  if (
    (target === 'galvalume sheets' || target === 'galvalume coils') &&
    (pSubCat.includes('pre-painted') || pSubCat.includes('pre painted') || pTitle.includes('pre painted') || pTitle.includes('pre-painted'))
  ) {
    return false;
  }

  // Exact match
  if (pSubCat === target) return true;

  // Strict match for galvalume sheets / coils so no loose includes match
  if (target === 'galvalume sheets' || target === 'galvalume coils') {
    return pSubCat === target;
  }

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

  if (target === 'galvalume-sheets' || target === 'galvalume sheets') {
    if (pSubCat.includes('pre-painted') || pSubCat.includes('pre painted') || pTitle.includes('pre painted') || pTitle.includes('pre-painted')) {
      return false;
    }
    return pSubCat === 'galvalume sheets';
  }
  if (target === 'galvalume-coils' || target === 'galvalume coils') {
    if (pSubCat.includes('pre-painted') || pSubCat.includes('pre painted') || pTitle.includes('pre painted') || pTitle.includes('pre-painted')) {
      return false;
    }
    return pSubCat === 'galvalume coils';
  }

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
  initialCategories = [],
  initialSubCategories = []
) {
  // Filter Checkbox Selection States
  const [selectedCategories, setSelectedCategories] = useState(
    Array.isArray(initialCategories) ? initialCategories : []
  );
  const [selectedSubCategories, setSelectedSubCategories] = useState(
    Array.isArray(initialSubCategories) ? initialSubCategories : []
  );

  useEffect(() => {
    if (Array.isArray(initialCategories)) {
      setSelectedCategories(initialCategories);
    }
  }, [JSON.stringify(initialCategories)]);

  useEffect(() => {
    if (Array.isArray(initialSubCategories)) {
      setSelectedSubCategories(initialSubCategories);
    }
  }, [JSON.stringify(initialSubCategories)]);
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

  // Check if a specific subcategory (e.g. Galvanized coils, Pre-painted galvalume sheets, Pre-painted galvalume coils) is active
  const activeSubCategoryFilterKey = useMemo(() => {
    // 1. If any subcategory checkbox is selected that matches CATEGORY_SPECIFIC_FILTERS
    if (selectedSubCategories.length > 0) {
      for (const sc of selectedSubCategories) {
        const scKey = sc.toLowerCase().trim();
        if (CATEGORY_SPECIFIC_FILTERS[scKey]) {
          return scKey;
        }
      }
    }

    // 2. Top category / URL slug fallback when no subcategories checked
    if (selectedSubCategories.length === 0 && selectedSubCategory) {
      const s = selectedSubCategory.toLowerCase().trim();
      if (s === 'galvanized-coils' || s === 'galvanized coils' || (s.includes('galvanized') && s.includes('coil'))) {
        return 'galvanized coils';
      }
      if (s === 'galvanized-sheets' || s === 'galvanized sheets' || (s.includes('galvanized') && s.includes('sheet'))) {
        return 'galvanized sheets';
      }
      if (s === 'hot-rolled-sheets' || s === 'hot rolled sheets' || (s.includes('hot') && s.includes('rolled') && s.includes('sheet'))) {
        return 'hot rolled sheets';
      }
      if (s === 'hot-rolled-coils' || s === 'hot rolled coils' || (s.includes('hot') && s.includes('rolled') && s.includes('coil'))) {
        return 'hot rolled coils';
      }
      if (s === 'hrpo-coils' || s === 'hrpo coils' || (s.includes('hrpo') && s.includes('coil'))) {
        return 'hrpo coils';
      }
      if (s === 'hrpo-sheets' || s === 'hrpo sheets' || (s.includes('hrpo') && s.includes('sheet'))) {
        return 'hrpo sheets';
      }
      if (s === 'galvalume-coils' || s === 'galvalume coils' || (s.includes('galvalume') && s.includes('coil') && !s.includes('pre-painted'))) {
        return 'galvalume coils';
      }
      if (s === 'galvalume-sheets' || s === 'galvalume sheets' || (s.includes('galvalume') && s.includes('sheet') && !s.includes('pre-painted'))) {
        return 'galvalume sheets';
      }
      if (s === 'cold-rolled-coils' || s === 'cold rolled coils' || (s.includes('cold') && s.includes('rolled') && s.includes('coil'))) {
        return 'cold rolled coils';
      }
      if (s.includes('sheet') && (s.includes('galvalume') || s.includes('pre-painted'))) {
        return 'pre-painted galvalume sheets';
      }
      if (s.includes('coil') && (s.includes('galvalume') || s.includes('pre-painted'))) {
        return 'pre-painted galvalume coils';
      }
      if (CATEGORY_SPECIFIC_FILTERS[s]) {
        return s;
      }
    }

    return null;
  }, [selectedSubCategories, selectedSubCategory]);

  // Check if Colour coated or any of its subcategories/aliases is selected
  const isColourCoatedActive = useMemo(() => {
    if (selectedCategories.some(c => isColourCoatedCategory(c))) return true;
    const colourCoatedSubCats = [
      'pre-painted galvalume sheets',
      'pre-painted galvalume coils',
      'galvanized coils',
      'galvanized sheets'
    ];
    if (selectedSubCategories.some(sc => colourCoatedSubCats.includes(sc.toLowerCase().trim()))) return true;
    if (selectedSubCategory && isColourCoatedCategory(selectedSubCategory)) return true;
    return false;
  }, [selectedCategories, selectedSubCategories, selectedSubCategory]);

  // Dynamically compute available Grades related to active category
  const availableGrades = useMemo(() => {
    // 1. If specific subcategory is active (e.g. Galvanized coils, Pre-painted galvalume sheets, Pre-painted galvalume coils),
    // return its predefined grades EXACTLY
    if (activeSubCategoryFilterKey && CATEGORY_SPECIFIC_FILTERS[activeSubCategoryFilterKey]?.grades) {
      return CATEGORY_SPECIFIC_FILTERS[activeSubCategoryFilterKey].grades;
    }

    // 2. Else if Colour coated is active, return general colour coated grades EXACTLY
    if (isColourCoatedActive && CATEGORY_SPECIFIC_FILTERS['colour coated']?.grades) {
      return CATEGORY_SPECIFIC_FILTERS['colour coated'].grades;
    }

    if (!isCategoryActive) return GRADES_LIST;

    const catGrades = new Set();
    categoryProducts.forEach(p => {
      if (p.grade && typeof p.grade === 'string' && p.grade.trim()) {
        catGrades.add(p.grade.trim());
      }
    });

    const result = [];
    const addedLower = new Set();
    const addedNorm = new Set();

    GRADES_LIST.forEach(g => {
      const gLower = g.toLowerCase();
      if (addedLower.has(gLower)) return;
      for (const cg of catGrades) {
        if (cg.toLowerCase() === gLower) {
          result.push(g);
          addedLower.add(gLower);
          const norm = normalizeGrade(g);
          if (norm) addedNorm.add(norm);
          break;
        }
      }
    });

    catGrades.forEach(cg => {
      const cgLower = cg.toLowerCase();
      if (!addedLower.has(cgLower)) {
        result.push(cg);
        addedLower.add(cgLower);
        const norm = normalizeGrade(cg);
        if (norm) addedNorm.add(norm);
      }
    });

    return result;
  }, [categoryProducts, isCategoryActive, activeSubCategoryFilterKey, isColourCoatedActive]);

  // Dynamically compute available Sub-brands related to active category
  const availableSubBrands = useMemo(() => {
    // 1. If specific subcategory is active and defines subBrands, return them EXACTLY
    if (activeSubCategoryFilterKey && CATEGORY_SPECIFIC_FILTERS[activeSubCategoryFilterKey]?.subBrands) {
      return CATEGORY_SPECIFIC_FILTERS[activeSubCategoryFilterKey].subBrands;
    }

    // 2. Else if Colour coated is active and defines subBrands, return them EXACTLY
    if (isColourCoatedActive && CATEGORY_SPECIFIC_FILTERS['colour coated']?.subBrands) {
      return CATEGORY_SPECIFIC_FILTERS['colour coated'].subBrands;
    }

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
  }, [categoryProducts, isCategoryActive, activeSubCategoryFilterKey, isColourCoatedActive]);

  // Dynamically compute available Brands related to active category
  const availableBrands = useMemo(() => {
    // 1. If specific subcategory is active and defines brands, return them EXACTLY
    if (activeSubCategoryFilterKey && CATEGORY_SPECIFIC_FILTERS[activeSubCategoryFilterKey]?.brands) {
      return CATEGORY_SPECIFIC_FILTERS[activeSubCategoryFilterKey].brands;
    }

    // 2. Else if Colour coated is active and defines brands, return them EXACTLY
    if (isColourCoatedActive && CATEGORY_SPECIFIC_FILTERS['colour coated']?.brands) {
      return CATEGORY_SPECIFIC_FILTERS['colour coated'].brands;
    }

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
    // 1. If specific subcategory is active (e.g. Galvanized coils, Pre-painted galvalume sheets, Pre-painted galvalume coils),
    // return its predefined sub-grades EXACTLY
    if (activeSubCategoryFilterKey && CATEGORY_SPECIFIC_FILTERS[activeSubCategoryFilterKey]?.subGrades) {
      return CATEGORY_SPECIFIC_FILTERS[activeSubCategoryFilterKey].subGrades;
    }

    // 2. Else if Colour coated is active, return general colour coated sub-grades EXACTLY
    if (isColourCoatedActive && CATEGORY_SPECIFIC_FILTERS['colour coated']?.subGrades) {
      return CATEGORY_SPECIFIC_FILTERS['colour coated'].subGrades;
    }

    if (!isCategoryActive) return SUB_GRADES_LIST;

    const catSubGrades = new Set();
    categoryProducts.forEach(p => {
      if (p.subGrade && typeof p.subGrade === 'string' && p.subGrade.trim()) {
        catSubGrades.add(p.subGrade.trim());
      }
    });

    const result = [];
    const addedExact = new Set();

    SUB_GRADES_LIST.forEach(sg => {
      const sgLower = sg.toLowerCase();
      if (addedExact.has(sgLower)) return;
      const sgClean = normalizeSubGrade(sg);
      for (const csg of catSubGrades) {
        if (normalizeSubGrade(csg) === sgClean) {
          result.push(sg);
          addedExact.add(sgLower);
          break;
        }
      }
    });

    catSubGrades.forEach(csg => {
      const csgLower = csg.toLowerCase();
      if (!addedExact.has(csgLower)) {
        result.push(csg);
        addedExact.add(csgLower);
      }
    });

    return result;
  }, [categoryProducts, isCategoryActive, activeSubCategoryFilterKey, isColourCoatedActive]);

  // Prune any selections that are no longer available in the active category
  useEffect(() => {
    if (!isCategoryActive) return;

    setSelectedGrades(prev => {
      const next = prev.filter(g => {
        const gLower = g.toLowerCase();
        const gNorm = normalizeGrade(g);
        return availableGrades.some(
          ag => ag.toLowerCase() === gLower || (gNorm.length > 0 && normalizeGrade(ag) === gNorm)
        );
      });
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
        const sgClean = normalizeSubGrade(sg);
        return availableSubGrades.some(
          asg => normalizeSubGrade(asg) === sgClean
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
      // 3. Filter by Grade (normalized matching for standards with prefix/punctuation differences)
      if (selectedGrades.length > 0) {
        if (!p.grade) return false;
        const pGradeLower = p.grade.toLowerCase().trim();
        const pGradeNorm = normalizeGrade(p.grade);
        const matchesGrade = selectedGrades.some(g => {
          const gLower = g.toLowerCase().trim();
          if (pGradeLower === gLower) return true;
          const gNorm = normalizeGrade(g);
          if (gNorm.length > 0 && pGradeNorm === gNorm) return true;
          if (gNorm.length > 0 && (pGradeNorm.startsWith(gNorm) || gNorm.startsWith(pGradeNorm))) return true;
          return false;
        });
        if (!matchesGrade) return false;
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

      // 6. Filter by Sub-grade (exact match on normalized string)
      if (selectedSubGrades.length > 0) {
        const pSubGrade = normalizeSubGrade(p.subGrade);
        const matchesSubGrade = selectedSubGrades.some(sg => {
          const sgClean = normalizeSubGrade(sg);
          if (pSubGrade === sgClean) return true;
          if (sgClean === 'st52' && pSubGrade.includes('st52')) return true;
          if (sgClean === 'gr2chequered' && (pSubGrade === 'gr2chequered' || (pSubGrade === 'gr2' && (p.title?.toLowerCase().includes('chequered') || p.subGrade?.toLowerCase().includes('chequered'))))) return true;
          return false;
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
