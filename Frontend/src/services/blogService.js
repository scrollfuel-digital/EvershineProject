// src/services/blogService.js
import axios from "axios";
import { API_BASE_URL } from "./authService";

const BLOGS_BASE_URL = `${API_BASE_URL}/api/blogs`;

export function formatBlogDate(dateStr) {
  if (!dateStr) return null;
  return new Date(dateStr).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

// In-memory cache to avoid redundant API calls across tab/route switches
const pagesCache = new Map(); // key: `${pageNo}_${size}` -> paginated response
const slugCache = new Map(); // key: slug -> full blog detail ({ id, title, slug, content, keywords, imageUrl, createdAt })
const searchCache = new Map(); // key: trimmed lowercase keyword -> array of matching blogs

export function getCachedBlogsPage(pageNo = 0, size = 6, sortBy = "createdAt", sortDir = "desc") {
  return pagesCache.get(`${pageNo}_${size}_${sortBy}_${sortDir}`) || null;
}

export function getCachedBlogBySlug(slug) {
  return slug ? slugCache.get(slug) || null : null;
}

export function getCachedBlogSearch(keyword = "") {
  const key = keyword.trim().toLowerCase();
  return key ? searchCache.get(key) || null : null;
}

export function invalidateBlogsCache(slug = null) {
  pagesCache.clear();
  searchCache.clear();
  if (slug) {
    slugCache.delete(slug);
  }
}

/**
 * Fetch paginated light blog list (GET /api/blogs)
 */
export async function fetchBlogsPage({
  pageNo = 0,
  size = 6,
  sortBy = "createdAt",
  sortDir = "desc",
  force = false,
} = {}) {
  const cacheKey = `${pageNo}_${size}_${sortBy}_${sortDir}`;
  if (!force && pagesCache.has(cacheKey)) {
    return pagesCache.get(cacheKey);
  }

  const { data } = await axios.get(BLOGS_BASE_URL, {
    params: { pageNo, size, sortBy, sortDir },
    headers: { accept: "*/*" },
  });

  const normalized = {
    content: Array.isArray(data?.content) ? data.content : [],
    page: data?.page ?? pageNo,
    size: data?.size ?? size,
    totalElements: data?.totalElements ?? (Array.isArray(data?.content) ? data.content.length : 0),
    totalPages: Math.max(1, data?.totalPages ?? 1),
    first: Boolean(data?.first),
    last: Boolean(data?.last),
    hasNext: Boolean(data?.hasNext),
    hasPrevious: Boolean(data?.hasPrevious),
  };

  pagesCache.set(cacheKey, normalized);
  return normalized;
}

/**
 * Fetch full blog details by slug (GET /api/blogs/{slug})
 */
export async function fetchBlogBySlug(slug, force = false) {
  if (!slug) throw new Error("Blog slug is required.");
  if (!force && slugCache.has(slug)) {
    return slugCache.get(slug);
  }

  const { data } = await axios.get(`${BLOGS_BASE_URL}/${encodeURIComponent(slug)}`, {
    headers: { accept: "*/*" },
  });

  if (data) {
    slugCache.set(slug, data);
    if (data.slug && data.slug !== slug) {
      slugCache.set(data.slug, data);
    }
  }
  return data;
}

/**
 * Search blogs by keyword (GET /api/blogs/search?keyword=...)
 */
export async function searchBlogsByKeyword(keyword = "", force = false) {
  const trimmed = keyword.trim();
  if (!trimmed) return [];
  const cacheKey = trimmed.toLowerCase();

  if (!force && searchCache.has(cacheKey)) {
    return searchCache.get(cacheKey);
  }

  const { data } = await axios.get(`${BLOGS_BASE_URL}/search`, {
    params: { keyword: trimmed },
    headers: { accept: "*/*" },
  });

  const results = Array.isArray(data) ? data : [];
  searchCache.set(cacheKey, results);
  return results;
}

/**
 * Create a new blog post (POST /api/blogs)
 */
export async function createBlog(payload) {
  const { data } = await axios.post(BLOGS_BASE_URL, payload, {
    headers: { accept: "*/*", "Content-Type": "application/json" },
  });
  invalidateBlogsCache();
  if (data?.slug) {
    slugCache.set(data.slug, data);
  }
  return data;
}

/**
 * Update an existing blog post by id (PUT /api/blogs/{id})
 */
export async function updateBlog(id, payload, oldSlug = null) {
  const { data } = await axios.put(`${BLOGS_BASE_URL}/${id}`, payload, {
    headers: { accept: "*/*", "Content-Type": "application/json" },
  });
  invalidateBlogsCache(oldSlug);
  if (data?.slug) {
    slugCache.set(data.slug, data);
  }
  return data;
}

/**
 * Delete a blog post by id (DELETE /api/blogs/{id})
 */
export async function deleteBlog(id, slug = null) {
  const { data } = await axios.delete(`${BLOGS_BASE_URL}/${id}`, {
    headers: { accept: "*/*" },
  });
  invalidateBlogsCache(slug);
  return data;
}
