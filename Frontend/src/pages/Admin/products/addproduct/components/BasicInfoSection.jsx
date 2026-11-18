// src/pages/Admin/products/addproduct/components/BasicInfoSection.jsx
// Step 2: Basic Information section.
import React from "react";
import { FileText, Image as ImageIcon } from "lucide-react";

export default function BasicInfoSection({
  title,
  slug,
  imageUrl,
  productStatus,
  onTitleChange,
  onSlugChange,
  onImageUrlChange,
  onStatusChange,
}) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-7 shadow-[0_1px_3px_rgba(0,0,0,0.05)] space-y-5">
      <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
        <FileText className="w-4 h-4 text-[#004060]" />
        <h2 className="text-base font-bold text-slate-900 font-display">Basic Information</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1.5 md:col-span-2">
          <label className="block text-xs font-semibold text-slate-700">Product Title *</label>
          <input
            type="text"
            required
            minLength={2}
            maxLength={150}
            value={title}
            onChange={onTitleChange}
            placeholder="e.g. JSW Colour Coated Corrugated Sheet"
            className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#004060]/20 focus:border-[#004060]"
          />
        </div>

        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-slate-700">Slug *</label>
          <input
            type="text"
            required
            minLength={4}
            maxLength={150}
            value={slug}
            onChange={onSlugChange}
            placeholder="e.g. jsw-colour-coated-corrugated-sheet"
            className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-sm font-mono text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#004060]/20 focus:border-[#004060]"
          />
        </div>

        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-slate-700">Status *</label>
          <select
            value={productStatus}
            onChange={onStatusChange}
            className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#004060]/20 focus:border-[#004060] cursor-pointer"
          >
            <option value="ACTIVE">ACTIVE</option>
            <option value="UNAVAILABLE">UNAVAILABLE</option>
          </select>
        </div>

        <div className="space-y-1.5 md:col-span-2">
          <label className="block text-xs font-semibold text-slate-700">Image URL *</label>
          <div className="flex items-center gap-3">
            <input
              type="url"
              required
              value={imageUrl}
              onChange={onImageUrlChange}
              placeholder="https://example.com/images/product.jpg"
              className="flex-1 px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#004060]/20 focus:border-[#004060]"
            />
            <div className="w-10 h-10 rounded-lg border border-slate-200 overflow-hidden bg-slate-50 flex items-center justify-center shrink-0">
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt=""
                  className="w-full h-full object-cover"
                  onError={(e) => (e.target.style.display = "none")}
                />
              ) : (
                <ImageIcon className="w-4 h-4 text-slate-400" />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
