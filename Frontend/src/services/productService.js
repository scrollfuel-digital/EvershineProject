// src/services/productService.js
// Centralized service for fetching, creating, and managing products via the backend API.
import axios from "axios";

export const PRODUCTS_API_URL = "https://evershine-backend-1.onrender.com/api/products";
export const LIGHT_PRODUCTS_API_URL = "https://evershine-backend-1.onrender.com/api/products/all-light-products";
export const ACTIVE_PRODUCTS_API_URL = "https://evershine-backend-1.onrender.com/api/products/status/active";

let cachedProducts = null;
let cachedLightProducts = null;
let cachedActiveProducts = null;
let pendingProductsPromise = null;
let pendingActiveProductsPromise = null;

/**
 * Fetch all active products for the public product catalogue.
 * GET https://evershine-backend-1.onrender.com/api/products/status/active
 * @param {boolean} forceRefresh - If true, re-fetches from backend.
 * @returns {Promise<Array>}
 */
export async function fetchActiveProducts(forceRefresh = false) {
  if (!forceRefresh && cachedActiveProducts) return cachedActiveProducts;
  if (!forceRefresh && pendingActiveProductsPromise) return pendingActiveProductsPromise;

  pendingActiveProductsPromise = (async () => {
    try {
      const response = await axios.get(ACTIVE_PRODUCTS_API_URL, {
        headers: { Accept: "application/json" },
        timeout: 10000,
      });
      cachedActiveProducts = Array.isArray(response.data) ? response.data : [];
      return cachedActiveProducts;
    } catch (err) {
      console.warn("Active products API error:", err.message);
      return cachedActiveProducts || [];
    } finally {
      pendingActiveProductsPromise = null;
    }
  })();

  return pendingActiveProductsPromise;
}

/**
 * Fetch all light products for catalogue listings.
 * @param {boolean} forceRefresh - If true, re-fetches from backend.
 * @returns {Promise<Array>}
 */
export async function fetchLightProducts(forceRefresh = false) {
  if (!forceRefresh && cachedLightProducts) return cachedLightProducts;
  try {
    const response = await axios.get(LIGHT_PRODUCTS_API_URL, {
      headers: { Accept: "application/json" },
    });
    cachedLightProducts = Array.isArray(response.data) ? response.data : [];
    return cachedLightProducts;
  } catch (err) {
    console.warn("Light products API error:", err.message);
    return cachedLightProducts || [];
  }
}

/**
 * Fetch products from the backend API with memory caching.
 * @param {boolean} forceRefresh - If true, re-fetches from backend.
 * @returns {Promise<Array>} List of products.
 */
export async function fetchProducts(forceRefresh = false) {
  if (!forceRefresh && cachedProducts) {
    return cachedProducts;
  }

  if (!forceRefresh && pendingProductsPromise) {
    return pendingProductsPromise;
  }

  pendingProductsPromise = (async () => {
    try {
      const response = await axios.get(PRODUCTS_API_URL, {
        headers: { Accept: "application/json" },
      });

      const data = response.data;
      cachedProducts = Array.isArray(data) ? data : [];
      return cachedProducts;
    } catch (err) {
      console.warn("Products API fetch error:", err.message);
      cachedProducts = [];
      return cachedProducts;
    } finally {
      pendingProductsPromise = null;
    }
  })();

  return pendingProductsPromise;
}

/**
 * Fetch a single product by ID.
 * @param {string} id - Product UUID.
 * @returns {Promise<Object>}
 */
export async function getProductById(id) {
  const response = await axios.get(`${PRODUCTS_API_URL}/${id}`, {
    headers: { Accept: "application/json" },
  });
  return response.data;
}

/**
 * Create a new product using the ProductRequestDto schema.
 * @param {Object} productDto - The validated ProductRequestDto.
 * @returns {Promise<Object>} Created product data from backend.
 */
export async function createProduct(productDto) {
  const response = await axios.post(PRODUCTS_API_URL, productDto, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  // Invalidate cache so newly created products are fetched on next view
  cachedProducts = null;
  cachedLightProducts = null;
  return response.data;
}

/**
 * Update an existing product by ID.
 * PUT https://evershine-backend-1.onrender.com/api/products/update/{id}
 * @param {string} id - Product UUID.
 * @param {Object} productDto - Product payload.
 * @returns {Promise<Object>} Updated product data from backend.
 */
export async function updateProduct(id, productDto) {
  const response = await axios.put(`${PRODUCTS_API_URL}/update/${id}`, productDto, {
    headers: {
      "Content-Type": "application/json",
      Accept: "*/*",
    },
  });

  // Invalidate cache so updated products are fetched fresh
  cachedProducts = null;
  cachedLightProducts = null;
  return response.data;
}

/**
 * Fetch a single product by slug from the backend API.
 * GET https://evershine-backend-1.onrender.com/api/products/slug/{slug}
 * @param {string} slug - Product slug.
 * @param {AbortSignal} [signal] - Optional abort signal.
 * @returns {Promise<Object>}
 */
export async function fetchProductBySlug(slug, signal = null) {
  if (!slug) throw new Error("Product slug is required.");

  const response = await fetch(
    `https://evershine-backend-1.onrender.com/api/products/slug/${encodeURIComponent(slug)}`,
    {
      headers: { Accept: "*/*" },
      signal: signal || undefined,
    }
  );

  if (response.ok) {
    const data = await response.json();
    return data;
  }

  if (response.status === 404) {
    throw new Error("Product not found.");
  }

  throw new Error("Unable to load product. Please try again.");
}
