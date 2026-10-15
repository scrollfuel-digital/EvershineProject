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

export const INITIAL_ACTIVE_PRODUCTS = [
  {
    id: "36c2f417-0dd5-47d9-a8e3-3b30cf71bba7",
    imageUrl: "https://internal-assets.jswonemsme.com/CR_Sheet_617x490_webp_ab4dab8b09/CR_Sheet_617x490_webp_ab4dab8b09.webp",
    title: "JSW Steel Galvanized Steel Sheets IS 277:2018 GPIF",
    slug: "jsw-steel-galvanized-steel-sheets-is-2772018-gpif",
    attributes: [
      { label: "Thickness", unit: "mm", min: "0.3", max: "3" },
      { label: "Width", unit: "mm", min: "900", max: "1500" },
      { label: "Length", unit: "mm", min: "1500", max: "6000" },
      { label: "Coating grade", unit: "gsm", min: "80", max: "275" },
      { label: "Spangle type", unit: "", min: null, max: null }
    ],
    categoryId: "a30b3369-8413-475c-86de-b5dfa330b25a",
    categoryTypeId: "01810539-949e-4358-8ec7-b5a22a830037",
    categoryVariantId: "ec729fbf-9f83-41eb-90ac-1c2c6f300853",
    brandId: "99b6b43f-c5ea-4f25-b917-bdad495478d0",
    subBrandId: null,
    gradeId: null,
    subGradeId: "ef10c5c7-72a6-474a-8dbb-3b4f26bf26e5"
  },
  {
    id: "c9cf32f6-8e90-4c71-a7db-99a584c6217a",
    imageUrl: "https://internal-assets.jswonemsme.com/HR_Sheet_617x490_webp_883440e532/HR_Sheet_617x490_webp_883440e532.webp",
    title: "SAIL Hot Rolled Chequered Sheets IS 3502:2004 E250A",
    slug: "sail-hot-rolled-chequered-sheets-is-35022004-e250a",
    attributes: [
      { label: "Thickness", unit: "mm", min: "0.40", max: "0.80" },
      { label: "Width", unit: "mm", min: "1500", max: "2000" },
      { label: "Length", unit: "mm", min: "2000", max: "12000" }
    ],
    categoryId: "a30b3369-8413-475c-86de-b5dfa330b25a",
    categoryTypeId: "a966636b-769a-49a6-b080-ff7cb9e53048",
    categoryVariantId: "68a7db73-e28f-424e-b31f-3e9990e372b8",
    brandId: "18cce6bf-59d0-422c-a1f2-13da55e9be62",
    subBrandId: null,
    gradeId: "f85d2139-e3c6-40ed-a645-56930c9f76bb",
    subGradeId: "2dcbefe1-6757-482d-aafa-0657188e7f6b"
  }
];

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
      cachedActiveProducts = Array.isArray(response.data) && response.data.length > 0 ? response.data : INITIAL_ACTIVE_PRODUCTS;
      return cachedActiveProducts;
    } catch (err) {
      console.warn("Active products API error:", err.message);
      return cachedActiveProducts || INITIAL_ACTIVE_PRODUCTS;
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

export const KNOWN_SLUG_PRODUCTS = {
  "jspl-mild-steel-channels-e450a-ismc": {
    id: "7827dff1-3cdd-41a6-9286-7bbe4ba30eed",
    title: "JSPL Mild Steel Channels E450A ISMC",
    imageUrl: "https://internal-assets.jswonemsme.com/Channels_617x476_webp_067aa5d7a6/Channels_617x476_webp_067aa5d7a6.webp",
    slug: "jspl-mild-steel-channels-e450a-ismc",
    productStatus: "ACTIVE",
    fullAttributeResponseDtos: [
      {
        label: "Flange width",
        unit: "mm",
        min: "40",
        max: "90",
        values: ["40", "50", "65", "75", "82", "90"]
      },
      {
        label: "Web depth",
        unit: "mm",
        min: "75",
        max: "300",
        values: ["75", "100", "125", "150", "200", "250", "300"]
      },
      {
        label: "Sectional weight",
        unit: "kg/m",
        min: "7",
        max: "36",
        values: ["7.14", "9.56", "13.1", "16.8", "22.3", "34.2", "36.3"]
      },
      {
        label: "Cut length",
        unit: "mm",
        min: "6000",
        max: "12000",
        values: ["6000", "12000"]
      }
    ],
    overviewHtml: "<h2><strong>Overview</strong></h2><hr><h3><strong>Product information</strong></h3><p>Produced in state-of-art facilities, Mild Steel Channels have</p><ol><li><p>Mild to high tensile strength and wide dimensional range</p></li><li><p>Atmospheric corrosion resistance and superior weldability</p></li></ol><p><strong>Applications</strong></p><p>Truck and trailer frame support, bridges, industrial shed, railway mast, refineries, scaffolding</p><p><strong>Length</strong></p><p>6m or 12m</p><hr><h3><strong>Packaging information</strong></h3><p>Bundled</p>",
    propertyRequestDtoList: [
      {
        heading: "Chemical composition",
        tableOfContent: {
          "Carbon % (Max)": "0.2",
          "Mode of deoxidation": "Semi-killed / Killed",
          "Phosphorus % (Max)": "0.",
          "Silicon % (Max)": "0.4"
        }
      },
      {
        heading: "Mechanical properties",
        tableOfContent: {
          "Elongation % at L0 = 5.65, min": "200",
          "Internal Bend diameter, min": "2t",
          "Tensile Strength MPa (Min)": "540",
          "Yield Strength MPa (Min)": "380"
        }
      },
      {
        heading: "Tolerance properties",
        tableOfContent: {
          "Flange width tolerance (mm)": "+/-2",
          "Web depth tolerance (mm)": "+/-3",
          "Weight per meter tolerance": "+/-3"
        }
      }
    ],
    categoryId: "4b3b6635-505d-41bf-b895-f8f84be619f0",
    categoryTypeId: "76a26d15-ebda-4552-9eae-50a40bdc157d",
    categoryVariantId: null,
    brandId: "92c2c294-b32a-4276-a3d1-994c026279ef",
    subBrandId: null,
    gradeId: "52e40689-ab97-4aa1-8132-c41a4db4e86f",
    subGradeId: "62a04321-aa49-4660-9528-7165fcefcbc0"
  }
};

/**
 * Fetch a single product by slug from the backend API.
 * GET https://evershine-backend-1.onrender.com/api/products/slug/{slug}
 * @param {string} slug - Product slug.
 * @param {AbortSignal} [signal] - Optional abort signal.
 * @returns {Promise<Object>}
 */
export async function fetchProductBySlug(slug, signal = null) {
  if (!slug) throw new Error("Product slug is required.");

  try {
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
      // Check known fallback
      if (KNOWN_SLUG_PRODUCTS[slug]) {
        return KNOWN_SLUG_PRODUCTS[slug];
      }
      throw new Error("Product not found.");
    }

    throw new Error("Unable to load product. Please try again.");
  } catch (err) {
    if (signal?.aborted) throw err;
    if (KNOWN_SLUG_PRODUCTS[slug]) {
      return KNOWN_SLUG_PRODUCTS[slug];
    }
    throw err;
  }
}
