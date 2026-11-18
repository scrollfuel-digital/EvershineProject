// src/pages/Admin/products/addproduct/components/filterUtils.js
// Reusable search function for hierarchy and category filter arrays.

/**
 * Filter an array of items by search query matching item.name.
 * @param {string} query - The search query input.
 * @param {Array<{id: string, name: string}>} items - List of available filter items.
 * @returns {{ matches: Array, notFound: boolean }}
 */
export function searchFilterItems(query, items) {
  if (!query || !query.trim()) {
    return { matches: items || [], notFound: false };
  }
  const q = query.trim().toLowerCase();
  const matches = (items || []).filter((item) =>
    String(item?.name || "").toLowerCase().includes(q)
  );
  return {
    matches,
    notFound: matches.length === 0,
  };
}
