// src/pages/Admin/products/addproduct/components/OverviewSection.jsx
// Step 3: Product Overview rich text section using Tiptap.
import React from "react";
import { FileText } from "lucide-react";
import TiptapEditor from "../TiptapEditor";

export default function OverviewSection({ overviewHtml, onChange }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-7 shadow-[0_1px_3px_rgba(0,0,0,0.05)] space-y-4">
      <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100">
        <FileText className="w-4 h-4 text-[#004060]" />
        <h2 className="text-base font-bold text-slate-900 font-display">Product Overview *</h2>
      </div>
      <TiptapEditor
        value={overviewHtml}
        onChange={onChange}
        placeholder="Write product overview and technical description..."
      />
    </div>
  );
}
