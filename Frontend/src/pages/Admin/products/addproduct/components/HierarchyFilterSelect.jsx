// src/pages/Admin/products/addproduct/components/HierarchyFilterSelect.jsx
// Reusable searchable filter select for Category, Type, Variant, Brand, Sub-Brand, Grade, Sub-Grade.
import React, { useState, useRef, useEffect } from "react";
import { X } from "lucide-react";
import { searchFilterItems } from "./filterUtils";

export default function HierarchyFilterSelect({
  label,
  value,
  onChange,
  items = [],
  disabled = false,
  formatOptionLabel = (item) => item?.name || "",
  nameMap = null,
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const options = [...(items || [])];
  if (value && !options.some((item) => item.id === value)) {
    const fallbackName = nameMap?.get(value) || "Selected Item";
    options.unshift({ id: value, name: fallbackName, active: false });
  }

  const { matches, notFound } = searchFilterItems(searchQuery, options);

  const handleSelect = (selectedId) => {
    onChange(selectedId);
    setSearchQuery("");
    setIsOpen(false);
  };

  return (
    <div ref={containerRef} className="space-y-1.5 relative">
      {/* Label and search box aside the name */}
      <div className="flex items-center justify-between gap-1.5">
        <label className="block text-xs font-semibold text-slate-700">{label}</label>
        <div className="relative flex items-center">
          <input
            type="text"
            value={searchQuery}
            disabled={disabled}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setIsOpen(true);
            }}
            onFocus={() => {
              if (searchQuery.trim()) setIsOpen(true);
            }}
            placeholder={`Search ${label}...`}
            className="w-24 sm:w-28 px-2 py-0.5 text-[11px] bg-slate-50 border border-slate-200 rounded-md text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-[#004060] focus:bg-white disabled:bg-slate-100 disabled:cursor-not-allowed"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                setIsOpen(false);
              }}
              className="absolute right-1 text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              <X className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>

      {/* Standard Select Dropdown */}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className="w-full px-3 py-2.5 bg-white border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#004060]/20 focus:border-[#004060] disabled:bg-slate-50 disabled:text-slate-400 cursor-pointer"
      >
        <option value="">None</option>
        {options.map((item) => (
          <option key={item.id} value={item.id}>
            {formatOptionLabel(item)}
          </option>
        ))}
      </select>

      {/* Search Matches Overlay */}
      {isOpen && searchQuery.trim() && (
        <div className="absolute z-30 top-full left-0 right-0 mt-1 max-h-48 overflow-y-auto bg-white border border-slate-200 rounded-xl shadow-lg p-1 space-y-0.5">
          {notFound ? (
            <div className="px-3 py-2 text-xs text-rose-500 font-medium text-center">
              Not found
            </div>
          ) : (
            matches.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => handleSelect(item.id)}
                className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs flex items-center justify-between cursor-pointer transition ${
                  value === item.id
                    ? "bg-[#004060]/10 text-[#004060] font-semibold"
                    : "text-slate-700 hover:bg-slate-100"
                }`}
              >
                <span className="truncate">{formatOptionLabel(item)}</span>
                <span className="text-[10px] text-[#004060] font-bold ml-2 shrink-0">
                  {value === item.id ? "Selected" : "Add"}
                </span>
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
}
