// src/services/dataProccess.js
// Centralized data processing service and React hook for Evershine products, filters, and admin dashboard metrics.
// Accessible by both Public Website modules (Product pages, navigation) and Admin Panel modules.
import axios from "axios";
import { useState, useEffect, useCallback } from "react";

export const FILTERS_API_URL = "https://evershine-backend-1.onrender.com/api/filters";
export const ACTIVE_PRODUCTS_API_URL = "https://evershine-backend-1.onrender.com/api/products/status/active";

// In-memory cache for processed filter hierarchy across public web and admin
let cachedProcessedData = null;
let pendingFetchPromise = null;

/**
 * Pure synchronous processor that transforms raw filter API data into lookup Maps and structured hierarchies.
 * Reusable across any React component or service in Web and Admin.
 *
 * @param {Object} data - Raw filter data from /api/filters
 * @returns {Object} Structured maps and lists (active-only and all items)
 */
export function processFilterData(data) {
  const categoryTypesMap = new Map();
  const categoryVariantsMap = new Map();
  const typeToCategoryMap = new Map();
  const variantToTypeMap = new Map();
  const nameMap = new Map();

  if (!data || typeof data !== "object") {
    return {
      categoryTypesMap,
      categoryVariantsMap,
      typeToCategoryMap,
      variantToTypeMap,
      nameMap,
      categories: [],
      brands: [],
      subBrands: [],
      grades: [],
      subGrades: [],
      allBrands: [],
      allSubBrands: [],
      allGrades: [],
      allSubGrades: [],
      raw: data,
    };
  }

  const categories = Array.isArray(data.categories) ? data.categories : [];
  const allBrands = Array.isArray(data.brands) ? data.brands : [];
  const allSubBrands = Array.isArray(data.subBrands) ? data.subBrands : [];
  const allGrades = Array.isArray(data.grades) ? data.grades : [];
  const allSubGrades = Array.isArray(data.subGrades) ? data.subGrades : [];

  // Active-only lists for filter selection across public product pages and admin
  const brands = allBrands.filter((b) => Boolean(b.active));
  const subBrands = allSubBrands.filter((sb) => Boolean(sb.active));
  const grades = allGrades.filter((g) => Boolean(g.active));
  const subGrades = allSubGrades.filter((sg) => Boolean(sg.active));

  [...allBrands, ...allSubBrands, ...allGrades, ...allSubGrades].forEach((item) => {
    if (item?.id) nameMap.set(item.id, item.name);
  });

  // Build category, type, and variant hierarchies & maps
  categories.forEach((category) => {
    if (!category) return;
    if (category.id) nameMap.set(category.id, category.name);

    const associatedTypes = [];
    const types = Array.isArray(category.types) ? category.types : [];

    types.forEach((type) => {
      if (!type) return;
      if (type.id) {
        nameMap.set(type.id, type.name);
        typeToCategoryMap.set(type.id, category.id);
      }

      associatedTypes.push({
        id: type.id,
        name: type.name,
        slug: type.slug,
      });

      const variants = Array.isArray(type.variants)
        ? type.variants.map((variant) => {
            if (variant?.id) {
              nameMap.set(variant.id, variant.name);
              variantToTypeMap.set(variant.id, type.id);
            }
            return {
              id: variant.id,
              name: variant.name,
              slug: variant.slug,
            };
          })
        : [];

      categoryVariantsMap.set(type.id, variants);
    });

    categoryTypesMap.set(category.id, associatedTypes);
  });

  return {
    categoryTypesMap,
    categoryVariantsMap,
    typeToCategoryMap,
    variantToTypeMap,
    nameMap,
    categories,
    brands, // active-only for choosing options
    subBrands, // active-only
    grades, // active-only
    subGrades, // active-only
    allBrands, // all items (active & unavailable) for Admin Filter Options
    allSubBrands,
    allGrades,
    allSubGrades,
    raw: data,
  };
}

/**
 * Async fetcher that queries the filter API using axios, caches the result, and returns processed data.
 * Reusable across any view in Web or Admin.
 *
 * @param {boolean} forceRefresh - If true, bypasses the in-memory cache and re-fetches.
 * @returns {Promise<Object>} Processed filter data
 */
export async function dataProccess(forceRefresh = false) {
  if (!forceRefresh && cachedProcessedData) {
    return cachedProcessedData;
  }

  if (!forceRefresh && pendingFetchPromise) {
    return pendingFetchPromise;
  }

  pendingFetchPromise = (async () => {
    try {
      const response = await axios.get(FILTERS_API_URL, {
        headers: { Accept: "application/json" },
      });

      const data = response.data;
      cachedProcessedData = processFilterData(data);
      return cachedProcessedData;
    } catch (err) {
      console.error("dataProccess: API Error:", err?.message || err);
      if (cachedProcessedData) {
        return cachedProcessedData;
      }
      return processFilterData({});
    } finally {
      pendingFetchPromise = null;
    }
  })();

  return pendingFetchPromise;
}

/**
 * React Hook for consuming processed filter hierarchy data in any React component.
 * Provides live state (loading, error, refetch, active lists, and lookup maps).
 */
export function useDataProcess(autoFetch = true) {
  const [processed, setProcessed] = useState(() => cachedProcessedData || processFilterData({}));
  const [loading, setLoading] = useState(!cachedProcessedData);
  const [error, setError] = useState(null);

  const executeFetch = useCallback(async (force = false) => {
    setLoading(true);
    setError(null);
    try {
      const result = await dataProccess(force);
      setProcessed(result);
      return result;
    } catch (err) {
      const msg = err.response?.data?.message || err.message || "Failed to process filter data";
      setError(msg);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (autoFetch) {
      executeFetch(false);
    }
  }, [autoFetch, executeFetch]);

  return {
    ...processed,
    loading,
    error,
    refetch: () => executeFetch(true),
  };
}

/**
 * Pure processor to compute admin metrics, counts, and entity mappings from dashboard API data.
 */
export function processAdminData(data) {
  const nameMap = new Map();
  const counts = {
    totalCategories: 0,
    totalBrands: 0,
    totalTypes: 0,
    totalVariants: 0,
    totalGrades: 0,
    totalSubBrands: 0,
    totalSubGrades: 0,
    totalProducts: Number(data?.totalProducts) || 0,
    activeProducts: Number(data?.activeProducts) || 0,
    unavailableProducts: Number(data?.unavailableProducts) || 0,
  };
  const productCounts = {
    totalCategoriesProducts: 0,
    totalBrandsProducts: 0,
    totalTypesProducts: 0,
    totalVariantsProducts: 0,
    totalGradesProducts: 0,
    totalSubBrandsProducts: 0,
    totalSubGradesProducts: 0,
  };

  const ENTITY_CONFIG = [
    { key: "categories", cKey: "totalCategories", pKey: "totalCategoriesProducts" },
    { key: "brands", cKey: "totalBrands", pKey: "totalBrandsProducts" },
    { key: "categoryTypes", cKey: "totalTypes", pKey: "totalTypesProducts" },
    { key: "categoryVariants", cKey: "totalVariants", pKey: "totalVariantsProducts" },
    { key: "grades", cKey: "totalGrades", pKey: "totalGradesProducts" },
    { key: "subBrands", cKey: "totalSubBrands", pKey: "totalSubBrandsProducts" },
    { key: "subGrades", cKey: "totalSubGrades", pKey: "totalSubGradesProducts" },
  ];

  if (data && typeof data === "object") {
    ENTITY_CONFIG.forEach(({ key, cKey, pKey }) => {
      const items = Array.isArray(data[key]) ? data[key] : [];
      counts[cKey] = items.length;
      items.forEach((item) => {
        if (item?.id) nameMap.set(item.id, item.name);
        productCounts[pKey] += Number(item?.productCount) || 0;
      });
    });
  }

  nameMap.counts = counts;
  nameMap.productCounts = productCounts;

  return { nameMap, counts, productCounts, raw: data };
}

/**
 * Invalidate in-memory cache to force next fetch to load fresh data from server
 */
export function invalidateDataProcessCache() {
  cachedProcessedData = null;
  pendingFetchPromise = null;
}

export const adminData = processAdminData;

export default dataProccess;
