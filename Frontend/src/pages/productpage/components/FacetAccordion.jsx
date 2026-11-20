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
    <div className="border-b border-white/15 last:border-b-0 pb-3 last:pb-0">
      <button
        onClick={onToggleOpen}
        className="w-full flex items-center justify-between py-2.5 text-left cursor-pointer transition group"
      >
        <span className="text-sm sm:text-base font-extrabold uppercase tracking-wide text-[#FBBF24] flex items-center gap-2">
          <span>{title}</span>
          {itemsCount > 0 && (
            <span className="text-xs font-bold text-white bg-white/15 px-2 py-0.5 rounded-full">
              {itemsCount}
            </span>
          )}
        </span>
        {isOpen ? (
          <ChevronUp className="w-4.5 h-4.5 text-[#FBBF24] group-hover:scale-110 transition-transform" />
        ) : (
          <ChevronDown className="w-4.5 h-4.5 text-[#FBBF24] group-hover:scale-110 transition-transform" />
        )}
      </button>

      {isOpen && (
        <div className="pt-2 pb-1 space-y-2.5">
          {/* Bigger, Weighted Search Bar inside Accordion */}
          {itemsCount > 6 && (
            <div className="relative flex items-center mb-2.5">
              <Search className="w-4 h-4 text-[#FBBF24]/80 absolute left-3 pointer-events-none" />
              <input
                type="text"
                placeholder={searchPlaceholder || `Search ${title.toLowerCase()}...`}
                value={searchValue}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full text-sm sm:text-[14.5px] font-semibold pl-9 pr-8 py-2.5 border border-white/25 rounded-xl focus:outline-none focus:border-[#FBBF24] focus:ring-1 focus:ring-[#FBBF24]/40 bg-[#002b40] text-white placeholder-white/50 shadow-inner transition-all"
              />
              {searchValue && (
                <button
                  onClick={() => onSearchChange("")}
                  className="absolute right-2.5 text-white/60 hover:text-white cursor-pointer p-0.5"
                  aria-label={`Clear search for ${title}`}
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          )}

          {/* Vertical Checkbox List: Weighted typography & background-matching scrollbar */}
          <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1.5 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-[#003860]/40 [&::-webkit-scrollbar-thumb]:bg-[#285870] [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-[#3b7a9e] [scrollbar-width:thin] [scrollbar-color:#285870_#003860]">
            {loading && itemsCount === 0 ? (
              <div className="flex items-center gap-2 text-xs font-semibold text-white/70 py-2 w-full justify-center">
                <Loader2 className="w-4 h-4 animate-spin text-white/70" />
                <span>Loading active {title.toLowerCase()}s...</span>
              </div>
            ) : displayedItems.length === 0 ? (
              <p className="text-xs font-semibold text-white/70 py-2 w-full text-center">
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
                  <label
                    key={item}
                    className="flex items-center gap-3 py-1 text-[14.5px] sm:text-[15.5px] text-white/95 hover:text-white cursor-pointer select-none transition-colors group"
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => onToggleItem(item)}
                      className="w-4 h-4 rounded border-white/40 text-[#004060] focus:ring-0 accent-[#FBBF24] cursor-pointer shrink-0"
                    />
                    <span className={`leading-snug ${isChecked ? "font-black text-[#FBBF24]" : "font-semibold"}`}>
                      {item}
                    </span>
                  </label>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}
