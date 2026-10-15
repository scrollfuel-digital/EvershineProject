// src/pages/Admin/products/catalogue/CatalogueViewModal.jsx
// Material view modal displaying authentic item details: Name, Slug, Hierarchy, and Counts.
import React, { useState } from "react";
import { FolderTree, Layers, Tag, X, Copy, Check, Edit2 } from "lucide-react";

export default function CatalogueViewModal({
  open,
  title,
  entity,
  item,
  parentHierarchy,
  childCountText,
  onClose,
  onEdit,
}) {
  const [copiedSlug, setCopiedSlug] = useState(false);

  if (!open || !item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xl w-full max-w-md overflow-hidden animate-[fadeIn_0.15s_ease-out]">
        {/* Header */}
        <div className="px-5 py-3.5 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#004060]/10 text-[#004060] flex items-center justify-center">
              {entity === "category" ? (
                <FolderTree className="w-4 h-4" />
              ) : entity === "type" ? (
                <Layers className="w-4 h-4" />
              ) : (
                <Tag className="w-4 h-4" />
              )}
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 font-display">{title}</h3>
              <span className="text-[11px] text-slate-400 font-medium">Catalogue Hierarchy</span>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-3 text-sm">
          <div className="p-3 bg-slate-50/80 rounded-xl border border-slate-200/80 space-y-1">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block">
              Name
            </span>
            <span className="text-base font-bold text-slate-900 block">
              {item.name}
            </span>
          </div>

          <div className="p-3 bg-slate-50/80 rounded-xl border border-slate-200/80 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                Slug
              </span>
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard.writeText(item.slug);
                  setCopiedSlug(true);
                  setTimeout(() => setCopiedSlug(false), 2000);
                }}
                className="inline-flex items-center gap-1 text-xs font-semibold text-[#004060] hover:underline cursor-pointer"
              >
                {copiedSlug ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-600">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
            <span className="font-mono text-xs text-slate-700 bg-white px-2.5 py-1 rounded-lg border border-slate-200 inline-block font-semibold">
              {item.slug}
            </span>
          </div>

          {parentHierarchy && (
            <div className="p-3 bg-slate-50/80 rounded-xl border border-slate-200/80 space-y-1">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block">
                Parent Hierarchy
              </span>
              <span className="text-xs font-semibold text-slate-800 bg-white px-2.5 py-1 rounded-lg border border-slate-200 inline-block">
                {parentHierarchy}
              </span>
            </div>
          )}

          {childCountText && (
            <div className="p-3 bg-slate-50/80 rounded-xl border border-slate-200/80 space-y-1">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block">
                Sub-Items
              </span>
              <span className="text-xs font-medium text-slate-700 bg-white px-2.5 py-1 rounded-lg border border-slate-200 inline-block">
                {childCountText}
              </span>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-5 py-3 bg-slate-50/60 border-t border-slate-100 flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 cursor-pointer"
          >
            Close
          </button>
          <button
            type="button"
            onClick={() => {
              onClose();
              onEdit(item);
            }}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-xs font-semibold text-white bg-[#004060] hover:bg-[#003350] cursor-pointer shadow-xs"
          >
            <Edit2 className="w-3.5 h-3.5" />
            <span>Edit</span>
          </button>
        </div>
      </div>
    </div>
  );
}
