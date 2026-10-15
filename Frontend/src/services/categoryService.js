// src/services/categoryService.js
// Centralized service for Catalogue API operations: Categories, CategoryTypes, and Variants.
import axios from "axios";

export const CATEGORIES_API_URL = "https://evershine-backend-1.onrender.com/api/categories";
export const CATEGORY_TYPES_API_URL = "https://evershine-backend-1.onrender.com/api/category-types";
export const CATEGORY_VARIANTS_API_URL = "https://evershine-backend-1.onrender.com/api/category-variants";

/**
 * Fetch all categories.
 * @returns {Promise<Array>} List of { id, name, slug }
 */
export async function fetchCategories() {
  const response = await axios.get(CATEGORIES_API_URL, {
    headers: { Accept: "application/json" },
  });
  return Array.isArray(response.data) ? response.data : [];
}

/**
 * Create a new Category using CatalogueRequestDto.
 * @param {Object} data - { name: string, slug: string }
 * @returns {Promise<Object>} Created { id, name, slug }
 */
export async function createCategory({ name, slug }) {
  const response = await axios.post(
    CATEGORIES_API_URL,
    {
      name: String(name || "").trim(),
      slug: String(slug || "").trim(),
    },
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }
  );
  return response.data;
}

/**
 * Update an existing Category by ID using CatalogueRequestDto.
 * @param {string} id - Category UUID
 * @param {Object} data - { name: string, slug: string }
 * @returns {Promise<Object>} Updated { id, name, slug }
 */
export async function updateCategory(id, { name, slug }) {
  const response = await axios.put(
    `${CATEGORIES_API_URL}/${id}`,
    {
      name: String(name || "").trim(),
      slug: String(slug || "").trim(),
    },
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }
  );
  return response.data;
}

/**
 * Create a new CategoryType under a parent Category.
 * @param {string} parentCategoryId - UUID of parent category
 * @param {Object} data - { name: string, slug: string }
 * @returns {Promise<Object>} Created CategoryType { id, name, slug }
 */
export async function createCategoryType(parentCategoryId, { name, slug }) {
  const response = await axios.post(
    `${CATEGORY_TYPES_API_URL}/${parentCategoryId}`,
    {
      name: String(name || "").trim(),
      slug: String(slug || "").trim(),
    },
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }
  );
  return response.data;
}

/**
 * Update an existing CategoryType by ID.
 * @param {string} categoryTypeId - UUID of category type
 * @param {Object} data - { name: string, slug: string }
 * @returns {Promise<Object>} Updated CategoryType { id, name, slug }
 */
export async function updateCategoryType(categoryTypeId, { name, slug }) {
  const response = await axios.put(
    `${CATEGORY_TYPES_API_URL}/${categoryTypeId}`,
    {
      name: String(name || "").trim(),
      slug: String(slug || "").trim(),
    },
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }
  );
  return response.data;
}

/**
 * Update an existing CategoryVariant by ID.
 * @param {string} variantId - UUID of variant
 * @param {Object} data - { name: string, slug: string }
 * @returns {Promise<Object>} Updated Variant { id, name, slug }
 */
export async function updateCategoryVariant(variantId, { name, slug }) {
  const response = await axios.put(
    `${CATEGORY_VARIANTS_API_URL}/${variantId}`,
    {
      name: String(name || "").trim(),
      slug: String(slug || "").trim(),
    },
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }
  );
  return response.data;
}

/**
 * Create a new CategoryVariant under a parent CategoryType.
 * @param {string} parentTypeId - UUID of parent category type
 * @param {Object} data - { name: string, slug: string }
 * @returns {Promise<Object>} Created Variant { id, name, slug }
 */
export async function createCategoryVariant(parentTypeId, { name, slug }) {
  const response = await axios.post(
    `${CATEGORY_VARIANTS_API_URL}/${parentTypeId}`,
    {
      name: String(name || "").trim(),
      slug: String(slug || "").trim(),
    },
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }
  );
  return response.data;
}

