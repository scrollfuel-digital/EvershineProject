// src/pages/Admin/AdminSidebar.jsx
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Users,
  Package,
  Mail,
  BookOpen,
  ChevronDown,
  ChevronRight,
  ExternalLink,
  Layers,
  X
} from "lucide-react";
import { ADMIN_NAV_CONFIG } from "./adminNavConfig";

// Section Icon Resolver
function renderSectionIcon(iconName, className = "w-5 h-5") {
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

export default function AdminSidebar({ isMobileOpen = false, onCloseMobile = () => {} }) {
  const location = useLocation();

  // Determine active section and subsection from location path
  // e.g. /admin/products/brands -> section: products, sub: brands
  const pathParts = location.pathname.split("/").filter(Boolean);
  const currentSectionId = pathParts[1] || "products";
  const currentSubId = pathParts[2] || (currentSectionId === "products" ? "overview" : "");

  // Accordion state: only one main section expanded at a time
  const [expandedSection, setExpandedSection] = useState(currentSectionId);

  // Sync expanded section with active route if route changes externally
  useEffect(() => {
    if (currentSectionId) {
      setExpandedSection(currentSectionId);
    }
  }, [currentSectionId]);

  const handleToggleSection = (sectionId) => {
    setExpandedSection((prev) => (prev === sectionId ? null : sectionId));
  };

  const sidebarContent = (
    <div className="flex flex-col h-full bg-white select-none">
      {/* Sidebar Header / Brand Context for Mobile */}
      <div className="p-4 border-b border-slate-200 flex items-center justify-between lg:hidden">
        <div>
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
            Admin Menu
          </h2>
          <p className="text-xs text-slate-500">Evershine Solution</p>
        </div>
        <button
          onClick={onCloseMobile}
          className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
          aria-label="Close menu"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Navigation Sections */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1.5">
        <div className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
          Navigation
        </div>

        {ADMIN_NAV_CONFIG.map((section) => {
          const isExpanded = expandedSection === section.id;
          const isSectionActive = currentSectionId === section.id;

          return (
            <div key={section.id} className="rounded-xl overflow-hidden transition-colors">
              {/* Main Section Header Button */}
              <button
                type="button"
                onClick={() => handleToggleSection(section.id)}
                className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-medium transition-all ${
                  isSectionActive
                    ? "bg-slate-100/90 text-primary font-semibold"
                    : "text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                }`}
                aria-expanded={isExpanded}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span
                    className={`shrink-0 transition-colors ${
                      isSectionActive ? "text-primary" : "text-slate-500"
                    }`}
                  >
                    {renderSectionIcon(section.iconName, "w-5 h-5")}
                  </span>
                  <span className="truncate">{section.label}</span>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  {section.subItems && (
                    <span className="text-[11px] px-1.5 py-0.5 rounded bg-slate-200/60 text-slate-600 font-normal">
                      {section.subItems.length}
                    </span>
                  )}
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
                      isExpanded ? "rotate-180 text-primary" : ""
                    }`}
                  />
                </div>
              </button>

              {/* Submenu List */}
              {isExpanded && (
                <div className="pl-4 pr-1 py-1.5 space-y-1 bg-slate-50/60 border-l-2 border-slate-200 ml-4 my-1 rounded-r-lg animate-[fadeIn_0.15s_ease-out]">
                  {section.subItems.map((sub) => {
                    const isSubActive =
                      isSectionActive &&
                      (currentSubId === sub.id || (!currentSubId && sub === section.subItems[0]));

                    return (
                      <Link
                        key={sub.id}
                        to={`/admin/${section.id}/${sub.id}`}
                        onClick={onCloseMobile}
                        className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs transition-colors ${
                          isSubActive
                            ? "bg-[#EEF4FF] text-[#1849A9] font-semibold shadow-xs"
                            : "text-slate-600 hover:text-slate-900 hover:bg-white/80"
                        }`}
                      >
                        <span className="truncate">{sub.label}</span>
                        {isSubActive && (
                          <ChevronRight className="w-3.5 h-3.5 text-[#1849A9] shrink-0 ml-1" />
                        )}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Sidebar Footer Link */}
      <div className="p-3 border-t border-slate-200 mt-auto bg-slate-50/50">
        <Link
          to="/"
          className="flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium text-slate-600 hover:text-primary hover:bg-white transition-colors border border-transparent hover:border-slate-200 shadow-2xs"
        >
          <span className="flex items-center gap-2">
            <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
            Back to Public Site
          </span>
          <span className="text-[10px] text-slate-400">Exit</span>
        </Link>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-4px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside className="hidden lg:block w-72 shrink-0 border-r border-slate-200 min-h-[calc(100vh-84px)] sticky top-[84px] bg-white z-30">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Overlay */}
      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 z-50 bg-black/40 backdrop-blur-xs transition-opacity"
          onClick={onCloseMobile}
          aria-hidden="true"
        />
      )}

      {/* Mobile Off-canvas Drawer */}
      <div
        className={`lg:hidden fixed inset-y-0 left-0 z-50 w-72 max-w-[85vw] bg-white shadow-2xl transition-transform duration-300 ease-in-out ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {sidebarContent}
      </div>
    </>
  );
}
