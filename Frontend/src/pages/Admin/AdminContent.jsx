// src/pages/Admin/AdminContent.jsx
import React from "react";
import { useParams, Link } from "react-router-dom";
import {
  Users,
  Package,
  Mail,
  BookOpen,
  ChevronRight,
  Layers
} from "lucide-react";
import { ADMIN_NAV_CONFIG } from "./adminNavConfig";
import ProductAdminView from "./products/ProductAdminView";

// Section icon resolver
function getSectionIcon(iconName, className = "w-5 h-5") {
  switch (iconName) {
    case "Users":
      return <Users className={className} />;
    case "Package":
      return <Package className={className} />;
    case "Mail":
      return <Mail className={className} />;
    case "BookOpen":
      return <BookOpen className={className} />;
    default:
      return <Layers className={className} />;
  }
}

export default function AdminContent() {
  const { section: sectionParam, subSection: subSectionParam } = useParams();

  // Find active section or default to Products
  const activeSection =
    ADMIN_NAV_CONFIG.find((s) => s.id === sectionParam) ||
    ADMIN_NAV_CONFIG.find((s) => s.id === "products") ||
    ADMIN_NAV_CONFIG[0];

  // Find active submenu item or default to first in section
  const activeSubItem =
    activeSection.subItems?.find((sub) => sub.id === subSectionParam) ||
    activeSection.subItems?.[0] || {
      id: "index",
      label: activeSection.label,
      description: activeSection.description,
    };

  const isProductsSection = activeSection.id === "products";

  // When viewing products, render the required Product Catalogue layout directly
  if (isProductsSection) {
    return <ProductAdminView />;
  }

  // Placeholder for other admin sections (Users, Contacts, Blogs)
  return (
    <div className="max-w-6xl mx-auto space-y-4">
      {/* Breadcrumbs for non-product sections */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-slate-500">
        <Link to="/admin" className="hover:text-primary transition-colors">
          Admin
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
        <Link
          to={`/admin/${activeSection.id}`}
          className="text-slate-600 font-medium hover:text-primary transition-colors"
        >
          {activeSection.label}
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
        <span className="text-primary font-semibold">{activeSubItem.label}</span>
      </nav>

      {/* Module Placeholder Card */}
      <div className="bg-white border border-slate-200 rounded-xl p-8 shadow-2xs text-center">
        <div className="max-w-md mx-auto space-y-3">
          <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center mx-auto border border-slate-200">
            {getSectionIcon(activeSection.iconName, "w-6 h-6 text-primary")}
          </div>

          <h2 className="text-lg font-bold text-slate-900">
            {activeSubItem.label} Module
          </h2>

          <p className="text-xs text-slate-600 leading-relaxed">
            This administrative section is structured according to project specifications. Backend endpoints will connect to this view when deployed.
          </p>

          <div className="pt-3 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-2 text-left">
            <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
              <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider block">
                Section
              </span>
              <span className="text-xs font-medium text-slate-800">
                {activeSection.label}
              </span>
            </div>

            <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
              <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider block">
                Route
              </span>
              <span className="text-[11px] font-mono text-slate-800 truncate block">
                /admin/{activeSection.id}/{activeSubItem.id}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
