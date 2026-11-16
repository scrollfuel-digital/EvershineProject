// src/services/authService.js
// Centralized authentication service for Evershine Prefab Solutions
import axios from "axios";

export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "https://evershine-backend-1.onrender.com";

export const AUTH_API_URL = `${API_BASE_URL}/api/auth`;

const TOKEN_KEY = "evershine_auth_token";
const USER_KEY = "evershine_auth_user";

/**
 * Storage helpers
 */
export function getStoredToken() {
  try {
    return localStorage.getItem(TOKEN_KEY) || null;
  } catch {
    return null;
  }
}

export function setStoredToken(token) {
  try {
    if (token) {
      localStorage.setItem(TOKEN_KEY, token);
    } else {
      localStorage.removeItem(TOKEN_KEY);
    }
  } catch (e) {
    console.warn("Failed to save auth token to localStorage:", e);
  }
}

export function getStoredUser() {
  try {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function setStoredUser(user) {
  try {
    if (user) {
      localStorage.setItem(USER_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(USER_KEY);
    }
  } catch (e) {
    console.warn("Failed to save auth user to localStorage:", e);
  }
}

export function clearStoredAuth() {
  try {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  } catch (e) {
    console.warn("Failed to clear auth from localStorage:", e);
  }
}

/**
 * Parses backend error response into a clean, user-friendly message
 */
export function parseAuthError(err, fallback = "An unexpected error occurred. Please try again.") {
  if (!err) return fallback;

  // Network or timeout errors
  if (!err.response) {
    if (err.code === "ECONNABORTED" || err.message?.includes("timeout")) {
      return "Connection timed out. Please check your internet connection.";
    }
    return "Unable to connect to the server. Please verify your internet connection.";
  }

  const { status, data } = err.response;
  const msg = typeof data === "string" ? data : data?.message;

  if (msg) {
    // 401 Unauthorized
    if (status === 401 || msg.includes("401 UNAUTHORIZED") || msg.toLowerCase().includes("invalid username or password")) {
      return "Invalid email address or password. Please check your credentials.";
    }

    // 409 Conflict (User exists)
    if (status === 409 || msg.includes("409 CONFLICT") || msg.toLowerCase().includes("username already exists")) {
      return "An account with this email address already exists. Please sign in instead.";
    }

    // Invalid or expired reset link
    if (msg.toLowerCase().includes("invalid or expired reset link")) {
      return "This password reset link is invalid or has expired. Please request a new one.";
    }

    // Backend validation list (e.g. "name: Name is required, phoneNum: Phone number is required")
    if (msg.includes(":") || msg.includes(",")) {
      // Clean up spring boot validation message prefixes
      const cleaned = msg
        .split(",")
        .map((part) => part.trim())
        .map((part) => {
          const colonIdx = part.indexOf(":");
          return colonIdx !== -1 ? part.substring(colonIdx + 1).trim() : part;
        })
        .filter(Boolean)
        .join(". ");
      if (cleaned) return cleaned;
    }

    return msg;
  }

  if (status === 403) {
    return "You do not have permission to access this resource.";
  }
  if (status === 404) {
    return "The requested authentication endpoint was not found.";
  }
  if (status >= 500) {
    return "Server encountered an error. Please try again shortly.";
  }

  return fallback;
}

/**
 * Authenticates user via email (username) & password.
 * POST /api/auth/login
 * @param {Object} credentials - { username: string, password: string }
 * @returns {Promise<{ token: string, username: string, role: string }>}
 */
export async function loginUser({ username, password }) {
  const response = await axios.post(
    `${AUTH_API_URL}/login`,
    {
      username: String(username || "").trim().toLowerCase(),
      password: String(password || ""),
    },
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      timeout: 15000,
    }
  );
  return response.data;
}

/**
 * Registers a new user account.
 * POST /api/auth/register
 * @param {Object} userData - { name, password, address, username, phoneNum }
 * @returns {Promise<{ username: string, phoneNum: string, id: string }>}
 */
export async function registerUser({ name, password, address, username, phoneNum }) {
  const response = await axios.post(
    `${AUTH_API_URL}/register`,
    {
      name: String(name || "").trim(),
      password: String(password || ""),
      address: String(address || "").trim(),
      username: String(username || "").trim().toLowerCase(),
      phoneNum: String(phoneNum || "").trim(),
    },
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      timeout: 15000,
    }
  );
  return response.data;
}

/**
 * Requests a password reset email.
 * POST /api/auth/forgot-password
 * @param {Object} data - { email: string }
 * @returns {Promise<{ message: string }>}
 */
export async function forgotPassword({ email }) {
  const response = await axios.post(
    `${AUTH_API_URL}/forgot-password`,
    {
      email: String(email || "").trim().toLowerCase(),
    },
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      timeout: 15000,
    }
  );
  return response.data;
}

/**
 * Resets password using token extracted from email link.
 * POST /api/auth/reset-password
 * @param {Object} data - { token: string, newPassword: string }
 * @returns {Promise<{ message: string }>}
 */
export async function resetPassword({ token, newPassword }) {
  const response = await axios.post(
    `${AUTH_API_URL}/reset-password`,
    {
      token: String(token || "").trim(),
      newPassword: String(newPassword || ""),
    },
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      timeout: 15000,
    }
  );
  return response.data;
}

/**
 * Fetches authenticated user profile info.
 * GET /api/user/info
 * @returns {Promise<{ name: string, username: string, phoneNo: string, address: string }>}
 */
export async function getUserInfo() {
  const token = getStoredToken();
  const response = await axios.get(`${API_BASE_URL}/api/user/info`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
    timeout: 15000,
  });
  return response.data;
}
