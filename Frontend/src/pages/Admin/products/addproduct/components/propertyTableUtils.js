// src/pages/Admin/products/addproduct/components/propertyTableUtils.js
// Utility functions for converting between Tiptap HTML tables and PropertyTable key-value data structures.

function escapeHtml(str) {
  return String(str || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/**
 * Converts Property Tables array or tableOfContent objects to an HTML table string for Tiptap.
 * @param {Array} tables - Array of { heading, tableOfContent, rows }
 * @returns {string} HTML <table> string
 */
export function propertyTablesToHtml(tables) {
  if (!tables || !Array.isArray(tables) || tables.length === 0) return "";
  const allRows = [];

  tables.forEach((tbl) => {
    if (tbl.rows && Array.isArray(tbl.rows)) {
      tbl.rows.forEach((r) => {
        if (r.key || r.value) {
          allRows.push(
            `<tr><td>${escapeHtml(r.key || "")}</td><td>${escapeHtml(r.value || "")}</td></tr>`
          );
        }
      });
    } else if (tbl.tableOfContent && typeof tbl.tableOfContent === "object") {
      Object.entries(tbl.tableOfContent).forEach(([k, v]) => {
        if (k || v) {
          allRows.push(
            `<tr><td>${escapeHtml(k)}</td><td>${escapeHtml(String(v || ""))}</td></tr>`
          );
        }
      });
    }
  });

  if (allRows.length === 0) return "";
  return `<table><tbody>${allRows.join("")}</tbody></table>`;
}

/**
 * Parses Tiptap HTML table (or pasted text/lines) into the standard Property Tables array format.
 * Expected by backend: [{ heading: string, tableOfContent: Record<string, string>, rows: Array<{key, value}> }]
 * @param {string} html - HTML string from Tiptap editor
 * @param {string} defaultHeading - Default heading, e.g. "Specifications"
 * @returns {Array} Array with { heading, tableOfContent, rows }
 */
export function htmlToPropertyTables(html, defaultHeading = "Specifications") {
  if (!html || typeof html !== "string") return [];
  const tableOfContent = {};
  const rows = [];

  // 1. Parse standard HTML table rows
  const rowRegex = /<tr[^>]*>([\s\S]*?)<\/tr>/gi;
  let rowMatch;
  let foundRows = false;

  while ((rowMatch = rowRegex.exec(html)) !== null) {
    foundRows = true;
    const rowContent = rowMatch[1];
    const cellRegex = /<(?:td|th)[^>]*>([\s\S]*?)<\/(?:td|th)>/gi;
    const cells = [];
    let cellMatch;

    while ((cellMatch = cellRegex.exec(rowContent)) !== null) {
      const text = cellMatch[1].replace(/<[^>]*>/g, "").trim();
      cells.push(text);
    }

    if (cells.length >= 2) {
      const key = cells[0].trim();
      const val = cells.slice(1).join(" - ").trim();
      if (key || val) {
        tableOfContent[key] = val;
        rows.push({ key, value: val });
      }
    } else if (cells.length === 1 && cells[0]) {
      const text = cells[0];
      if (text.includes("\t")) {
        const parts = text.split("\t").map((p) => p.trim()).filter(Boolean);
        if (parts.length >= 2) {
          tableOfContent[parts[0]] = parts.slice(1).join(" - ");
          rows.push({ key: parts[0], value: parts.slice(1).join(" - ") });
        }
      } else if (text.includes(":")) {
        const idx = text.indexOf(":");
        const k = text.substring(0, idx).trim();
        const v = text.substring(idx + 1).trim();
        tableOfContent[k] = v;
        rows.push({ key: k, value: v });
      }
    }
  }

  // 2. Fallback for pasted plain text or paragraphs without table elements
  if (!foundRows) {
    const lines = html
      .replace(/<\/(?:p|div|li|tr)>/gi, "\n")
      .replace(/<br\s*\/?>/gi, "\n")
      .replace(/<[^>]*>/g, "")
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean);

    lines.forEach((line) => {
      if (line.includes("\t")) {
        const parts = line.split("\t").map((p) => p.trim()).filter(Boolean);
        if (parts.length >= 2) {
          tableOfContent[parts[0]] = parts.slice(1).join(" - ");
          rows.push({ key: parts[0], value: parts.slice(1).join(" - ") });
        }
      } else if (line.includes(":")) {
        const idx = line.indexOf(":");
        const k = line.substring(0, idx).trim();
        const v = line.substring(idx + 1).trim();
        if (k || v) {
          tableOfContent[k] = v;
          rows.push({ key: k, value: v });
        }
      }
    });
  }

  if (Object.keys(tableOfContent).length === 0) {
    return [];
  }

  return [
    {
      heading: defaultHeading,
      tableOfContent,
      rows,
    },
  ];
}

/**
 * Parses direct pastable text where:
 * Line 1 = Key
 * Line 2 = Value
 * Line 3 = Key
 * Line 4 = Value
 * (Also handles tab-separated rows if copied from spreadsheets).
 * @param {string} text - Raw pasted text
 * @returns {Array<{key: string, value: string}>} Array of key-value rows
 */
export function parsePastableTableText(text) {
  if (!text || typeof text !== "string") return [];
  const lines = text
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter((l) => l.length > 0);

  if (lines.length === 0) return [];

  // If user pasted tab-separated data (e.g. from Excel: Col1 \t Col2)
  const hasTabs = lines.some((l) => l.includes("\t"));
  if (hasTabs) {
    return lines
      .map((line) => {
        const parts = line.split("\t").map((p) => p.trim());
        return { key: parts[0] || "", value: parts.slice(1).join(" ") || "" };
      })
      .filter((r) => r.key || r.value);
  }

  // Key on first line, value on next line
  const rows = [];
  for (let i = 0; i < lines.length; i += 2) {
    const key = lines[i] || "";
    const value = lines[i + 1] || "";
    if (key || value) {
      rows.push({ key, value });
    }
  }
  return rows;
}

/**
 * Converts array of rows into line-by-line alternating text:
 * Line 1: Key
 * Line 2: Value
 * @param {Array<{key: string, value: string}>} rows
 * @returns {string} Formatted alternating text
 */
export function rowsToPastableText(rows) {
  if (!Array.isArray(rows) || rows.length === 0) return "";
  return rows
    .filter((r) => r && (r.key || r.value))
    .map((r) => `${r.key || ""}\n${r.value || ""}`)
    .join("\n");
}
