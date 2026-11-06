import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function CatalogPagination({
  currentPage = 0,
  totalPages = 0,
  totalItems = 0,
  onPageChange,
}) {
  if (totalPages <= 1) return null;

  const handlePageSelect = (pageIndex) => {
    onPageChange(pageIndex);
    window.scrollTo({ top: 300, behavior: "smooth" });
  };

  return (
    <div className="pt-8 mt-8 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm">
      <span className="text-slate-600">
        Page <strong className="text-slate-900">{currentPage + 1}</strong> of{" "}
        <strong className="text-slate-900">{totalPages}</strong> ({totalItems} items total)
      </span>

      <div className="flex items-center gap-1.5">
        <button
          type="button"
          onClick={() => handlePageSelect(Math.max(0, currentPage - 1))}
          disabled={currentPage === 0}
          className="p-2 rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer shadow-2xs transition-colors"
          title="Previous Page"
          aria-label="Previous Page"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {Array.from({ length: totalPages }).map((_, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => handlePageSelect(idx)}
            className={`w-8 h-8 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
              currentPage === idx
                ? "bg-[#004060] text-white shadow-xs"
                : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
            }`}
          >
            {idx + 1}
          </button>
        ))}

        <button
          type="button"
          onClick={() => handlePageSelect(Math.min(totalPages - 1, currentPage + 1))}
          disabled={currentPage >= totalPages - 1}
          className="p-2 rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer shadow-2xs transition-colors"
          title="Next Page"
          aria-label="Next Page"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

