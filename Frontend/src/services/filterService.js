// src/services/filterService.js
// Centralized service for fetching, caching, and querying Evershine filter & category hierarchy data.
import axios from "axios";
import { invalidateDataProcessCache } from "./dataProccess";

export const FILTERS_API_URL = "https://evershine-backend-1.onrender.com/api/filters";

export const FILTER_RESOURCE_ENDPOINTS = {
  brand: "https://evershine-backend-1.onrender.com/api/brands",
  brands: "https://evershine-backend-1.onrender.com/api/brands",
  subBrand: "https://evershine-backend-1.onrender.com/api/sub-brands",
  subBrands: "https://evershine-backend-1.onrender.com/api/sub-brands",
  "sub-brand": "https://evershine-backend-1.onrender.com/api/sub-brands",
  "sub-brands": "https://evershine-backend-1.onrender.com/api/sub-brands",
  grade: "https://evershine-backend-1.onrender.com/api/grades",
  grades: "https://evershine-backend-1.onrender.com/api/grades",
  subGrade: "https://evershine-backend-1.onrender.com/api/sub-grades",
  subGrades: "https://evershine-backend-1.onrender.com/api/sub-grades",
  "sub-grade": "https://evershine-backend-1.onrender.com/api/sub-grades",
  "sub-grades": "https://evershine-backend-1.onrender.com/api/sub-grades",
};

// In-memory cache to guarantee single-request reuse across Admin and Public website
let cachedFiltersData = null;
let pendingFetchPromise = null;

/**
 * Normalizes raw API response to guarantee predictable arrays and fields.
 */
export function normalizeFiltersResponse(raw) {
  if (!raw || typeof raw !== "object") {
    return {
      categories: [],
      brands: [],
      subBrands: [],
      grades: [],
      subGrades: [],
    };
  }

  const categories = Array.isArray(raw.categories)
    ? raw.categories.map((cat) => ({
        id: String(cat.id ?? ""),
        name: String(cat.name ?? ""),
        slug: String(cat.slug ?? ""),
        types: Array.isArray(cat.types)
          ? cat.types.map((type) => ({
              id: String(type.id ?? ""),
              name: String(type.name ?? ""),
              slug: String(type.slug ?? ""),
              variants: Array.isArray(type.variants)
                ? type.variants.map((v) => ({
                    id: String(v.id ?? ""),
                    name: String(v.name ?? ""),
                    slug: String(v.slug ?? ""),
                  }))
                : [],
            }))
          : [],
      }))
    : [];

  const normalizeEntity = (item) => ({
    id: String(item.id ?? ""),
    name: String(item.name ?? ""),
    active: Boolean(item.active),
  });

  const allBrands = Array.isArray(raw.brands) ? raw.brands.map(normalizeEntity) : [];
  const allSubBrands = Array.isArray(raw.subBrands) ? raw.subBrands.map(normalizeEntity) : [];
  const allGrades = Array.isArray(raw.grades) ? raw.grades.map(normalizeEntity) : [];
  const allSubGrades = Array.isArray(raw.subGrades) ? raw.subGrades.map(normalizeEntity) : [];

  return {
    categories,
    brands: allBrands.filter((b) => b.active),
    subBrands: allSubBrands.filter((sb) => sb.active),
    grades: allGrades.filter((g) => g.active),
    subGrades: allSubGrades.filter((sg) => sg.active),
    allBrands,
    allSubBrands,
    allGrades,
    allSubGrades,
  };
}

/**
 * Fetch filter specifications once and cache in memory.
 * @param {boolean} forceRefresh - If true, bypasses in-memory cache and re-fetches.
 * @returns {Promise<object>} Normalized filter structure.
 */
export async function fetchFilters(forceRefresh = false) {
  if (!forceRefresh && cachedFiltersData) {
    return cachedFiltersData;
  }

  if (!forceRefresh && pendingFetchPromise) {
    return pendingFetchPromise;
  }

  pendingFetchPromise = (async () => {
    try {
      const response = await fetch(FILTERS_API_URL, {
        headers: {
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch filters (HTTP ${response.status})`);
      }

      const json = await response.json();
      cachedFiltersData = normalizeFiltersResponse(json);
      return cachedFiltersData;
    } finally {
      pendingFetchPromise = null;
    }
  })();

  return pendingFetchPromise;
}

/**
 * Reusable Selectors & Lookups
 */
export const filterSelectors = {
  // Categories
  getCategories: (filters) => filters?.categories || [],

  getCategoryById: (filters, categoryId) => {
    if (!filters?.categories || !categoryId) return null;
    return filters.categories.find((c) => c.id === categoryId) || null;
  },

  getCategoryBySlug: (filters, slug) => {
    if (!filters?.categories || !slug) return null;
    const clean = slug.toLowerCase().trim();
    return filters.categories.find((c) => c.slug.toLowerCase() === clean) || null;
  },

  // Types under category
  getTypesByCategoryId: (filters, categoryId) => {
    const category = filterSelectors.getCategoryById(filters, categoryId);
    return category?.types || [];
  },

  getTypeById: (filters, categoryId, typeId) => {
    if (!typeId) return null;
    if (categoryId) {
      const types = filterSelectors.getTypesByCategoryId(filters, categoryId);
      return types.find((t) => t.id === typeId) || null;
    }
    // Search across all categories if categoryId is omitted
    for (const cat of filters?.categories || []) {
      const match = (cat.types || []).find((t) => t.id === typeId);
      if (match) return match;
    }
    return null;
  },

  // Variants under type
  getVariantsByTypeId: (filters, categoryId, typeId) => {
    const type = filterSelectors.getTypeById(filters, categoryId, typeId);
    return type?.variants || [];
  },

  getVariantById: (filters, variantId) => {
    if (!filters?.categories || !variantId) return null;
    for (const cat of filters.categories) {
      for (const t of cat.types || []) {
        const variant = (t.variants || []).find((v) => v.id === variantId);
        if (variant) {
          return { variant, parentType: t, parentCategory: cat };
        }
      }
    }
    return null;
  },

  // Flat entities (active only for consumer filters)
  getBrands: (filters) => (filters?.brands || []).filter((b) => b.active),
  getSubBrands: (filters) => (filters?.subBrands || []).filter((sb) => sb.active),
  getGrades: (filters) => (filters?.grades || []).filter((g) => g.active),
  getSubGrades: (filters) => (filters?.subGrades || []).filter((sg) => sg.active),
  // All entities for administrative filter options management
  getAllBrands: (filters) => filters?.allBrands || filters?.brands || [],
  getAllSubBrands: (filters) => filters?.allSubBrands || filters?.subBrands || [],
  getAllGrades: (filters) => filters?.allGrades || filters?.grades || [],
  getAllSubGrades: (filters) => filters?.allSubGrades || filters?.subGrades || [],

  // Statistical rollups for UI tables
  getCategoryCounts: (category) => {
    if (!category) return { typesCount: 0, variantsCount: 0 };
    const typesCount = category.types?.length || 0;
    const variantsCount = (category.types || []).reduce(
      (sum, t) => sum + (t.variants?.length || 0),
      0
    );
    return { typesCount, variantsCount };
  },

  getSummaryCounts: (filters) => {
    const categories = filters?.categories || [];
    let totalTypes = 0;
    let totalVariants = 0;

    categories.forEach((c) => {
      totalTypes += c.types?.length || 0;
      (c.types || []).forEach((t) => {
        totalVariants += t.variants?.length || 0;
      });
    });

    return {
      totalCategories: categories.length,
      totalTypes,
      totalVariants,
      totalBrands: filters?.brands?.length || 0,
      totalSubBrands: filters?.subBrands?.length || 0,
      totalGrades: filters?.grades?.length || 0,
      totalSubGrades: filters?.subGrades?.length || 0,
    };
  },
};

/**
 * Invalidate cached filter data
 */
export function invalidateFilterCache() {
  cachedFiltersData = null;
  pendingFetchPromise = null;
  invalidateDataProcessCache();
}

/**
 * Create a new filter item (brand, sub-brand, grade, sub-grade).
 * POST /api/{resource}?name={name}
 * @param {string} resource - 'brands' | 'sub-brands' | 'grades' | 'sub-grades'
 * @param {string} name - Option name (1-50 characters)
 * @returns {Promise<Object>}
 */
export async function createFilterOption(resource, name) {
  const baseUrl = FILTER_RESOURCE_ENDPOINTS[resource];
  if (!baseUrl) throw new Error(`Invalid resource type: ${resource}`);
  const trimmed = String(name || "").trim();
  if (!trimmed || trimmed.length > 50) {
    throw new Error("Name must be between 1 and 50 characters.");
  }
  const url = `${baseUrl}?name=${encodeURIComponent(trimmed)}`;
  const response = await axios.post(url, {}, { headers: { Accept: "*/*" } });
  invalidateFilterCache();
  return response.data;
}

/**
 * Update an existing filter item name (brand, sub-brand, grade, sub-grade).
 * PUT /api/{resource}/{id}?newName={newName}
 * @param {string} resource - 'brands' | 'sub-brands' | 'grades' | 'sub-grades'
 * @param {string} id - UUID
 * @param {string} newName - Updated name (1-50 characters)
 * @returns {Promise<Object>}
 */
export async function updateFilterOption(resource, id, newName) {
  const baseUrl = FILTER_RESOURCE_ENDPOINTS[resource];
  if (!baseUrl) throw new Error(`Invalid resource type: ${resource}`);
  const trimmed = String(newName || "").trim();
  if (!trimmed || trimmed.length > 50) {
    throw new Error("New name must be between 1 and 50 characters.");
  }
  const url = `${baseUrl}/${id}?newName=${encodeURIComponent(trimmed)}`;
  const response = await axios.put(url, {}, { headers: { Accept: "*/*" } });
  invalidateFilterCache();
  return response.data;
}

/**
 * Soft-delete / deactivate a filter item.
 * DELETE /api/{resource}/{id}
 * Deactivates the entity and marks associated products as UNAVAILABLE.
 * @param {string} resource - 'brands' | 'sub-brands' | 'grades' | 'sub-grades'
 * @param {string} id - UUID
 * @returns {Promise<string>} Success message from backend
 */
export async function deleteFilterOption(resource, id) {
  const baseUrl = FILTER_RESOURCE_ENDPOINTS[resource];
  if (!baseUrl) throw new Error(`Invalid resource type: ${resource}`);
  const url = `${baseUrl}/${id}`;
  const response = await axios.delete(url, { headers: { Accept: "*/*" } });
  invalidateFilterCache();
  return response.data;
}

