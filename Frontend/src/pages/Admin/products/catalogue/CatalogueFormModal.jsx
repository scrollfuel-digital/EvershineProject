// src/pages/Admin/products/catalogue/CatalogueFormModal.jsx
// Material Add / Edit modal for Category, Category Type, and Variant with Name and Slug fields.
import React from "react";
import { X, Loader2 } from "lucide-react";

export default function CatalogueFormModal({
  open,
  mode,
  entity,
  name,
  slug,
  submitting,
  error,
  parentName,
  onNameChange,
  onSlugChange,
  onSubmit,
  onClose,
}) {
  if (!open) return null;

  const entityTitle =
    entity === "category" ? "Category" : entity === "type" ? "Category Type" : "Variant";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xl w-full max-w-sm p-5 space-y-4 animate-[fadeIn_0.15s_ease-out]">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <h3 className="text-sm font-bold text-slate-900 font-display">
            {mode === "edit" ? "Edit" : "Add"} {entityTitle}
          </h3>
          <button
            type="button"
            onClick={onClose}
            disabled={submitting}
            className="text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Parent Notice */}
        {mode === "add" && parentName && (
          <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700">
            Adding under: <strong className="text-slate-900">{parentName}</strong>
          </div>
        )}

        <form onSubmit={onSubmit} className="space-y-3.5">
          {error && (
            <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-800">
              {error}
            </div>
          )}

          <div className="space-y-1">
            <label className="block text-xs font-semibold text-slate-700">Name *</label>
            <input
              type="text"
              required
              minLength={2}
              maxLength={100}
              value={name}
              onChange={(e) => onNameChange(e.target.value)}
              placeholder="Enter name..."
              className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#004060]/20 focus:border-[#004060]"
              autoFocus
            />
          </div>

          <div className="space-y-1">
            <label className="block text-xs font-semibold text-slate-700">Slug *</label>
            <input
              type="text"
              required
              minLength={2}
              maxLength={100}
              value={slug}
              onChange={(e) => onSlugChange(e.target.value)}
              placeholder="enter-slug"
              className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-sm font-mono text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#004060]/20 focus:border-[#004060]"
            />
          </div>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              disabled={submitting}
              className="px-3.5 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-[#004060] text-white text-xs font-semibold hover:bg-[#003350] disabled:opacity-60 cursor-pointer shadow-xs"
            >
              {submitting && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
              <span>{mode === "edit" ? "Save Changes" : "Create"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
