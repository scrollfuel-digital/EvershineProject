// src/components/ui/BlogFilterBar.jsx
import React from "react";
import { Loader2, Search, X } from "lucide-react";

const SORT_BY_OPTIONS = [
  { value: "createdAt", label: "Sort: Date" },
  { value: "title", label: "Sort: Name" },
];

export default function BlogFilterBar({
  searchQuery,
  onSearchChange,
  onClearSearch,
  isSearching = false,
  isSearchMode = false,
  sortBy = "createdAt",
  sortDir = "desc",
  onSortByChange,
  onSortDirChange,
  placeholder = "Search articles by title or keyword...",
  className = "",
}) {
  const sortDirOptions = [
    { value: "desc", label: sortBy === "title" ? "Z → A" : "Newest" },
    { value: "asc", label: sortBy === "title" ? "A → Z" : "Oldest" },
  ];

  const selectClass =
    "bg-white text-neutral-900 rounded-xl px-4 py-3 text-sm sm:text-base font-semibold border border-[#c4a574]/40 focus:outline-none focus:ring-2 focus:ring-[#c4a574] cursor-pointer";

  return (
    <div className={`flex flex-col sm:flex-row items-stretch sm:items-center gap-3 ${className}`}>
      <div className="relative flex-1">
        {isSearching ? (
          <Loader2 className="w-5 h-5 text-[#c4a574] animate-spin absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
        ) : (
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
        )}
        <input
          type="text"
          placeholder={placeholder}
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full bg-white text-neutral-900 placeholder-slate-400 rounded-xl pl-12 pr-10 py-3 text-sm sm:text-base border border-[#c4a574]/40 focus:outline-none focus:ring-2 focus:ring-[#c4a574]"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={onClearSearch}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-neutral-900 p-1 cursor-pointer"
            aria-label="Clear search"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {!isSearchMode && (
        <div className="flex items-center gap-2 shrink-0">
          <select
            value={sortBy}
            onChange={(e) => onSortByChange(e.target.value)}
            aria-label="Sort blogs by"
            className={selectClass}
          >
            {SORT_BY_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>

          <select
            value={sortDir}
            onChange={(e) => onSortDirChange(e.target.value)}
            aria-label="Sort direction"
            className={selectClass}
          >
            {sortDirOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
}
