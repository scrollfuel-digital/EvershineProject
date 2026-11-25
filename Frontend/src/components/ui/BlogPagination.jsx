// src/components/ui/BlogPagination.jsx
import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function BlogPagination({ page = 0, totalPages = 1, onPageChange }) {
  const safeTotal = Math.max(1, totalPages);
  const btnClass =
    "inline-flex items-center gap-1.5 px-4 sm:px-5 py-2.5 rounded-xl bg-white text-neutral-900 font-bold border border-[#c4a574]/40 disabled:opacity-40 disabled:cursor-not-allowed hover:text-[#c4a574] transition cursor-pointer text-sm sm:text-base";

  return (
    <div className="flex items-center justify-center gap-3 pt-8 pb-4">
      <button
        type="button"
        onClick={() => onPageChange(Math.max(0, page - 1))}
        disabled={page === 0}
        className={btnClass}
        aria-label="Previous Page"
      >
        <ChevronLeft className="w-4.5 h-4.5 shrink-0" />
        <span>Previous</span>
      </button>

      <span className="text-sm sm:text-base font-bold text-neutral-900 px-4 py-2 bg-white/85 rounded-xl border border-[#c4a574]/30 select-none">
        Page {page + 1} of {safeTotal}
      </span>

      <button
        type="button"
        onClick={() => onPageChange(Math.min(safeTotal - 1, page + 1))}
        disabled={page >= safeTotal - 1}
        className={btnClass}
        aria-label="Next Page"
      >
        <span>Next</span>
        <ChevronRight className="w-4.5 h-4.5 shrink-0" />
      </button>
    </div>
  );
}
