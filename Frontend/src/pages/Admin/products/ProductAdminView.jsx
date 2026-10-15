import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Plus, LayoutGrid, Package, FolderTree, Edit3, SlidersHorizontal } from "lucide-react";
import { useAdminDashboard } from "./AdminDashboardContext";
import ProductSummaryCards from "./ProductSummaryCards";
import ProductForm from "./addproduct";
import CatalogueAdminView from "./catalogue";
import ProductCatalogueGrid from "./ProductCatalogueGrid";
import ProductUpdateDeleteView from "./updatedelete";
import FilterOptionsAdminView from "./filters";

export default function ProductAdminView() {
  const { subSection } = useParams();
  const navigate = useNavigate();
  const { data, loading, error, refetch } = useAdminDashboard();

  let activeTab = "overview";
  if (subSection === "add-product") {
    activeTab = "add-product";
  } else if (subSection === "catalogue" || subSection === "categories") {
    activeTab = "catalogue";
  } else if (subSection === "update-delete" || subSection === "manage") {
    activeTab = "update-delete";
  } else if (subSection === "filters" || subSection === "filter-options") {
    activeTab = "filters";
  } else if (subSection === "overview") {
    activeTab = "overview";
  }

  const handleTabChange = (tabId) => {
    if (tabId === "add-product") {
      navigate("/admin/products/add-product");
    } else if (tabId === "catalogue") {
      navigate("/admin/products/catalogue");
    } else if (tabId === "update-delete") {
      navigate("/admin/products/update-delete");
    } else if (tabId === "filters") {
      navigate("/admin/products/filters");
    } else {
      navigate("/admin/products/overview");
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Product Admin Header & Tab Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 font-display tracking-tight flex items-center gap-2.5">
            <Package className="w-6 h-6 text-[#004060]" />
            <span>Product Management</span>
          </h1>
        </div>

        {/* Tab Controls: Overview, Catalogue, Add Product, Update & Delete */}
        <div className="flex items-center gap-2 self-start sm:self-auto flex-wrap">
          <button
            type="button"
            onClick={() => handleTabChange("overview")}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm sm:text-base font-semibold transition-all cursor-pointer ${
              activeTab === "overview"
                ? "bg-[#004060] text-white shadow-xs"
                : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50"
            }`}
          >
            <LayoutGrid className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>Overview</span>
          </button>

          <button
            type="button"
            onClick={() => handleTabChange("catalogue")}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm sm:text-base font-semibold transition-all cursor-pointer ${
              activeTab === "catalogue"
                ? "bg-[#004060] text-white shadow-xs"
                : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50"
            }`}
          >
            <FolderTree className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>Catalogue</span>
          </button>

          <button
            type="button"
            onClick={() => handleTabChange("add-product")}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm sm:text-base font-semibold transition-all cursor-pointer ${
              activeTab === "add-product"
                ? "bg-[#004060] text-white shadow-xs"
                : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50"
            }`}
          >
            <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>Add Product</span>
          </button>

          <button
            type="button"
            onClick={() => handleTabChange("update-delete")}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm sm:text-base font-semibold transition-all cursor-pointer ${
              activeTab === "update-delete"
                ? "bg-[#004060] text-white shadow-xs"
                : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50"
            }`}
          >
            <Edit3 className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>Update & Delete</span>
          </button>
        </div>
      </div>

      {/* Syncing indicator */}
      {loading && (
        <div className="text-sm text-slate-500 animate-pulse font-medium">
          Syncing catalogue data...
        </div>
      )}

      {/* Error state if dashboard metrics fail */}
      {error && !data && (
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-sm text-rose-700 flex items-center justify-between">
          <span>Failed to load catalogue data: {error}</span>
          <button
            type="button"
            onClick={refetch}
            className="font-bold underline cursor-pointer hover:text-rose-900"
          >
            Retry
          </button>
        </div>
      )}

      {/* TAB 1: Overview (Summary Cards + Catalogue Grid) */}
      {activeTab === "overview" && (
        <div className="space-y-6">
          <ProductSummaryCards data={data} />
          <ProductCatalogueGrid
            onUpdateProduct={(id) => navigate(`/admin/products/update-delete?edit=${id}`)}
          />
        </div>
      )}

      {/* TAB 2: Catalogue Section (Hierarchical Categories, Types, Variants) */}
      {activeTab === "catalogue" && <CatalogueAdminView />}

      {/* TAB 3: Add Product Form */}
      {activeTab === "add-product" && <ProductForm />}

      {/* TAB 4: Update & Delete Products */}
      {activeTab === "update-delete" && <ProductUpdateDeleteView />}

      {/* TAB 5: Filter Options (Brands, Sub-Brands, Grades, Sub-Grades) */}
      {activeTab === "filters" && <FilterOptionsAdminView />}
    </div>
  );
}
