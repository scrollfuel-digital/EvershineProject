import { useState, useMemo } from "react";
import {
  GRADES_LIST,
  SUB_BRANDS_LIST,
  BRANDS_LIST,
  SUB_GRADES_LIST
} from "../data/filterData";

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

  // Accordion Expand/Collapse States (Category opened by default so Angles is visible)
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

  // Filtered lists based on search queries inside accordions
  const displayedGrades = useMemo(() => {
    if (!gradeSearch.trim()) return GRADES_LIST;
    const q = gradeSearch.toLowerCase();
    return GRADES_LIST.filter(g => g.toLowerCase().includes(q));
  }, [gradeSearch]);

  const displayedSubBrands = useMemo(() => {
    if (!subBrandSearch.trim()) return SUB_BRANDS_LIST;
    const q = subBrandSearch.toLowerCase();
    return SUB_BRANDS_LIST.filter(sb => sb.toLowerCase().includes(q));
  }, [subBrandSearch]);

  const displayedBrands = useMemo(() => {
    if (!brandSearch.trim()) return BRANDS_LIST;
    const q = brandSearch.toLowerCase();
    return BRANDS_LIST.filter(b => b.toLowerCase().includes(q));
  }, [brandSearch]);

  const displayedSubGrades = useMemo(() => {
    if (!subGradeSearch.trim()) return SUB_GRADES_LIST;
    const q = subGradeSearch.toLowerCase();
    return SUB_GRADES_LIST.filter(sg => sg.toLowerCase().includes(q));
  }, [subGradeSearch]);

  // Filter products logic
  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      // 1. Filter by Category Checkboxes
      if (selectedCategories.length > 0) {
        const matchesCategory = selectedCategories.some(cat => {
          const c = cat.toLowerCase();
          return (
            p.category?.toLowerCase() === c ||
            p.subCategory?.toLowerCase() === c ||
            p.title?.toLowerCase().includes(c)
          );
        });
        if (!matchesCategory) return false;
      }

      // 1b. Filter by Sub-category Checkboxes (e.g. Hot rolled sheets, coils, HRPO)
      if (selectedSubCategories.length > 0) {
        const matchesSubCategory = selectedSubCategories.some(sc => {
          const scLower = sc.toLowerCase();
          return (
            p.subCategory?.toLowerCase() === scLower ||
            p.title?.toLowerCase().includes(scLower)
          );
        });
        if (!matchesSubCategory) return false;
      }

      // 2. Filter by top sub-category slider (if selected and no checkbox override)
      if (selectedSubCategory && selectedCategories.length === 0 && selectedSubCategories.length === 0) {
        const sub = selectedSubCategory.toLowerCase();
        const matchesSub =
          p.category?.toLowerCase().includes(sub) ||
          p.subCategory?.toLowerCase().includes(sub) ||
          p.title?.toLowerCase().includes(sub) ||
          (sub.includes('angle') && (p.category?.toLowerCase().includes('angle') || p.title?.toLowerCase().includes('angle')));
        if (!matchesSub) return false;
      }

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
    products,
    selectedCategories,
    selectedSubCategories,
    selectedSubCategory,
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
