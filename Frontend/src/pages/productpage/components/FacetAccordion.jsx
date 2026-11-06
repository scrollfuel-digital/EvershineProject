import React from "react";
import { ChevronDown, ChevronUp, Search, X, Loader2 } from "lucide-react";

export default function FacetAccordion({
  title,
  isOpen,
  onToggleOpen,
  itemsCount = 0,
  loading = false,
  searchValue = "",
  onSearchChange,
  displayedItems = [],
  selectedItems = [],
  onToggleItem,
  checkMatcher = null,
  searchPlaceholder = "",
}) {
  return (
    <div className="rounded-xl border border-[#E2E8F0] bg-white overflow-hidden transition-all shadow-2xs">
      <button
        onClick={onToggleOpen}
        className="w-full flex items-center justify-between px-4 py-3.5 text-left hover:bg-slate-50 transition cursor-pointer"
      >
        <span className="text-[16px] font-semibold text-[#0F172A] flex items-center gap-1.5">
          {title}{" "}
          {itemsCount > 0 && (
            <span className="text-xs font-normal text-slate-400">({itemsCount})</span>
          )}
        </span>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-slate-700" />
        ) : (
          <ChevronDown className="w-5 h-5 text-slate-700" />
        )}
      </button>

      {isOpen && (
        <div className="bg-white border-t border-[#E2E8F0]">
          {/* Search inside Accordion */}
          <div className="p-3 border-b border-slate-100 bg-slate-50/50">
            <div className="relative flex items-center">
              <Search className="w-4 h-4 text-slate-400 absolute left-2.5 pointer-events-none" />
              <input
                type="text"
                placeholder={searchPlaceholder || `Search ${title.toLowerCase()}...`}
                value={searchValue}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full text-sm pl-8 pr-7 py-2 border border-slate-200 rounded-md focus:outline-none focus:border-blue-500 bg-white"
              />
              {searchValue && (
                <button
                  onClick={() => onSearchChange("")}
                  className="absolute right-2 text-slate-400 hover:text-slate-600 cursor-pointer"
                  aria-label={`Clear search for ${title}`}
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          <div className="p-3.5 flex flex-wrap gap-2.5">
            {loading && itemsCount === 0 ? (
              <div className="flex items-center gap-2 text-xs text-slate-400 py-2 w-full justify-center">
                <Loader2 className="w-4 h-4 animate-spin text-slate-400" />
                <span>Loading active {title.toLowerCase()}s...</span>
              </div>
            ) : displayedItems.length === 0 ? (
              <p className="text-xs text-slate-400 py-2 w-full text-center">
                {searchValue
                  ? `No active ${title.toLowerCase()}s matching "${searchValue}"`
                  : `No active ${title.toLowerCase()}s for selected products.`}
              </p>
            ) : (
              displayedItems.map((item) => {
                const isChecked = checkMatcher
                  ? checkMatcher(item, selectedItems)
                  : selectedItems.includes(item);

                return (
                  <span
                    key={item}
                    onClick={() => onToggleItem(item)}
                    className={`inline-flex items-center gap-2.5 px-3.5 py-2 rounded-xl text-[13.5px] font-medium cursor-pointer transition-all border select-none ${
                      isChecked
                        ? "bg-blue-50 text-[#004060] border-blue-300 font-semibold shadow-xs"
                        : "bg-white text-slate-800 border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => {}}
                      className="w-4 h-4 rounded-[3px] border-[#64748B] text-[#004060] pointer-events-none"
                    />
                    <span>{item}</span>
                  </span>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}

