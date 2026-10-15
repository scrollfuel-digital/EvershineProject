// src/context/FilterContext.jsx
// Centralized React context and hook for consuming Evershine filter & category hierarchy data across Admin and Public site.

import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from "react";
import { fetchFilters, filterSelectors } from "../services/filterService";

const FilterContext = createContext(null);

export function FilterProvider({ children }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadData = useCallback(async (force = false) => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchFilters(force);
      setData(result);
      return result;
    } catch (err) {
      console.error("FilterContext: fetch error:", err);
      setError(err.message || "Failed to load catalogue filters");
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch once on app mount (cached automatically by filterService)
  useEffect(() => {
    loadData(false);
  }, [loadData]);

  const value = useMemo(() => {
    const categories = filterSelectors.getCategories(data);
    const brands = filterSelectors.getBrands(data);
    const subBrands = filterSelectors.getSubBrands(data);
    const grades = filterSelectors.getGrades(data);
    const subGrades = filterSelectors.getSubGrades(data);
    const summaryCounts = filterSelectors.getSummaryCounts(data);

    return {
      data,
      loading,
      error,
      refetch: () => loadData(true),
      categories,
      brands,
      subBrands,
      grades,
      subGrades,
      summaryCounts,
      // Bound helper selectors
      getCategoryById: (id) => filterSelectors.getCategoryById(data, id),
      getCategoryBySlug: (slug) => filterSelectors.getCategoryBySlug(data, slug),
      getTypesByCategoryId: (catId) => filterSelectors.getTypesByCategoryId(data, catId),
      getTypeById: (catId, typeId) => filterSelectors.getTypeById(data, catId, typeId),
      getVariantsByTypeId: (catId, typeId) => filterSelectors.getVariantsByTypeId(data, catId, typeId),
      getVariantById: (variantId) => filterSelectors.getVariantById(data, variantId),
      getCategoryCounts: filterSelectors.getCategoryCounts,
    };
  }, [data, loading, error, loadData]);

  return <FilterContext.Provider value={value}>{children}</FilterContext.Provider>;
}

export function useFilters() {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error("useFilters must be used within a FilterProvider");
  }
  return context;
}
