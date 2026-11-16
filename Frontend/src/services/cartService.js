// src/services/cartService.js
// Centralized cart API service for Evershine Prefab Solutions
import axios from "axios";
import { API_BASE_URL, getStoredToken } from "./authService";

export const CART_API_URL = `${API_BASE_URL}/api/cart`;

/**
 * Maximum products allowed in the cart as enforced by Evershine backend rules
 */
export const MAX_CART_ITEMS = 5;

/**
 * Parses cart error response into user-friendly message
 */
export function parseCartError(err, fallback = "Unable to update cart. Please try again.") {
  if (!err) return fallback;

  if (!err.response) {
    if (err.code === "ECONNABORTED" || err.message?.includes("timeout")) {
      return "Connection timed out. Please check your network connection.";
    }
    return "Unable to connect to the cart server. Please check your internet connection.";
  }

  const { status, data } = err.response;
  const msg = typeof data === "string" ? data : data?.message;

  if (status === 401) {
    return "Please sign in to access and manage your cart.";
  }

  if (status === 403) {
    return "You do not have permission to modify this cart.";
  }

  if (msg) {
    const lower = msg.toLowerCase();
    if (lower.includes("limit") || lower.includes("maximum") || lower.includes("5")) {
      return "Maximum cart limit reached (at most 5 products). Please remove an item to add a new product.";
    }
    return msg;
  }

  if (status >= 500) {
    return "Cart service is temporarily unavailable. Please try again shortly.";
  }

  return fallback;
}

/**
 * Fetches all cart items for the authenticated user
 * GET /api/cart
 * @returns {Promise<Array>} Array of cart items
 */
export async function fetchCartApi() {
  const token = getStoredToken();
  if (!token) {
    return [];
  }

  const response = await axios.get(CART_API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
    timeout: 15000,
  });

  return Array.isArray(response.data) ? response.data : [];
}

/**
 * Adds a product to the user's cart
 * POST /api/cart
 * @param {Object} payload
 * @param {string} payload.productSlug - Slug identifier of the product
 * @param {number} payload.quantity - Quantity
 * @param {Array<{ label: string, unit: string, value: string }>} payload.selectedCartAttributes
 * @returns {Promise<Object>} Added cart item object
 */
export async function addToCartApi({ productSlug, quantity = 1, selectedCartAttributes = [] }) {
  const token = getStoredToken();
  if (!token) {
    const error = new Error("Authentication required");
    error.response = { status: 401, data: { message: "Please sign in to add products to your cart." } };
    throw error;
  }

  const payload = {
    productSlug: String(productSlug || "").trim(),
    quantity: Math.max(1, Number(quantity) || 1),
    selectedCartAttributes: Array.isArray(selectedCartAttributes)
      ? selectedCartAttributes.map((attr) => ({
          label: String(attr.label || "").trim(),
          unit: String(attr.unit || "").trim(),
          value: String(attr.value || "").trim(),
        }))
      : [],
  };

  const response = await axios.post(CART_API_URL, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    timeout: 15000,
  });

  return response.data;
}

/**
 * Updates a cart item's quantity or attributes in the database
 * PUT /api/cart/{cartItemId}
 * @param {Object} params
 * @param {string} params.cartItemId - Cart item UUID
 * @param {string} params.productSlug - Slug identifier of the product
 * @param {number} params.quantity - Updated quantity
 * @param {Array<{ label: string, unit: string, value: string }>} params.cartAttributes - Note: cartAttributes, not selectedCartAttributes
 * @returns {Promise<Object>}
 */
export async function updateCartItemApi({ cartItemId, productSlug, quantity, cartAttributes = [] }) {
  const token = getStoredToken();
  if (!token) {
    const error = new Error("Authentication required");
    error.response = { status: 401, data: { message: "Please sign in to update your cart." } };
    throw error;
  }

  if (!cartItemId) {
    throw new Error("Cart item ID is required for update.");
  }

  const payload = {
    quantity: Math.max(1, Number(quantity) || 1),
    productSlug: String(productSlug || "").trim(),
    cartAttributes: Array.isArray(cartAttributes)
      ? cartAttributes.map((attr) => ({
          label: String(attr.label || "").trim(),
          unit: String(attr.unit || "").trim(),
          value: String(attr.value || "").trim(),
        }))
      : [],
  };

  const response = await axios.put(`${CART_API_URL}/${cartItemId}`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    timeout: 15000,
  });

  return response.data;
}

/**
 * Deletes a cart item from the database by its UUID
 * DELETE /api/cart/{cartItemId}
 * @param {string} cartItemId - Cart item UUID
 * @returns {Promise<Object>}
 */
export async function deleteCartItemApi(cartItemId) {
  const token = getStoredToken();
  if (!token) {
    const error = new Error("Authentication required");
    error.response = { status: 401, data: { message: "Please sign in to modify your cart." } };
    throw error;
  }

  if (!cartItemId) {
    throw new Error("Cart item ID is required for deletion.");
  }

  const response = await axios.delete(`${CART_API_URL}/${cartItemId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
    timeout: 15000,
  });

  return response.data;
}

