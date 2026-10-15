// src/pages/Admin/products/catalogue/CatalogueAdminView.jsx
// Material Catalogue Management: Category > Type > Variant Drilldown.
import React, { useState, useMemo } from "react";
import {
  FolderTree,
  Plus,
  Edit2,
  Eye,
  CheckCircle2,
  AlertCircle,
  Search,
  ChevronRight,
  ArrowLeft,
  Layers,
  Tag,
  X,
} from "lucide-react";
import { useAdminDashboard } from "../AdminDashboardContext";
import {
  createCategory,
  updateCategory,
  createCategoryType,
  updateCategoryType,
  createCategoryVariant,
  updateCategoryVariant,
} from "../../../../services/categoryService";
import CatalogueViewModal from "./CatalogueViewModal";
import CatalogueFormModal from "./CatalogueFormModal";

function slugify(text) {
  return String(text || "")
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default function CatalogueAdminView() {
  const {
    categories = [],
    categoryTypesMap = new Map(),
    categoryVariantsMap = new Map(),
    refetch,
  } = useAdminDashboard();

  // Navigation Drilldown State
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [selectedTypeId, setSelectedTypeId] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // Feedback notifications
  const [toastMessage, setToastMessage] = useState(null);
  const [toastError, setToastError] = useState(null);

  // Add / Edit Modal State
  const [formModal, setFormModal] = useState({
    open: false,
    mode: "add",
    entity: "category",
    item: null,
    name: "",
    slug: "",
    isSlugEdited: false,
    submitting: false,
    error: null,
  });

  // View Detail Modal State
  const [viewModal, setViewModal] = useState({
    open: false,
    title: "",
    entity: "category",
    item: null,
    parentHierarchy: null,
    childCountText: null,
  });

  // Active parent objects
  const selectedCategory = useMemo(() => {
    return categories.find((c) => c.id === selectedCategoryId) || null;
  }, [categories, selectedCategoryId]);

  const currentTypes = useMemo(() => {
    if (!selectedCategoryId) return [];
    return categoryTypesMap?.get(selectedCategoryId) || [];
  }, [categoryTypesMap, selectedCategoryId]);

  const selectedType = useMemo(() => {
    if (!selectedTypeId) return null;
    return currentTypes.find((t) => t.id === selectedTypeId) || null;
  }, [currentTypes, selectedTypeId]);

  const currentVariants = useMemo(() => {
    if (!selectedTypeId) return [];
    return categoryVariantsMap?.get(selectedTypeId) || [];
  }, [categoryVariantsMap, selectedTypeId]);

  // Current level: 0 = Categories, 1 = Types, 2 = Variants
  const currentLevel = selectedType ? 2 : selectedCategory ? 1 : 0;

  // Active items filtered by search
  const displayedItems = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (currentLevel === 0) {
      return q ? categories.filter((c) => c.name?.toLowerCase().includes(q)) : categories;
    }
    if (currentLevel === 1) {
      return q ? currentTypes.filter((t) => t.name?.toLowerCase().includes(q)) : currentTypes;
    }
    return q ? currentVariants.filter((v) => v.name?.toLowerCase().includes(q)) : currentVariants;
  }, [currentLevel, categories, currentTypes, currentVariants, searchQuery]);

  // Contextual Add Button Config
  const addConfig = useMemo(() => {
    if (currentLevel === 2) {
      return { label: "Add Variant", entity: "variant" };
    }
    if (currentLevel === 1) {
      return { label: "Add Type", entity: "type" };
    }
    return { label: "Add Category", entity: "category" };
  }, [currentLevel]);

  // Parent name for modal subtitle
  const modalParentName = useMemo(() => {
    if (formModal.entity === "variant") {
      return `${selectedCategory?.name} → ${selectedType?.name}`;
    }
    if (formModal.entity === "type") {
      return selectedCategory?.name || "";
    }
    return "";
  }, [formModal.entity, selectedCategory, selectedType]);

  // Handlers for Modals
  const handleOpenAdd = () => {
    setFormModal({
      open: true,
      mode: "add",
      entity: addConfig.entity,
      item: null,
      name: "",
      slug: "",
      isSlugEdited: false,
      submitting: false,
      error: null,
    });
  };

  const handleOpenEdit = (item) => {
    setFormModal({
      open: true,
      mode: "edit",
      entity: addConfig.entity,
      item,
      name: item.name || "",
      slug: item.slug || "",
      isSlugEdited: true,
      submitting: false,
      error: null,
    });
  };

  const handleOpenView = (item) => {
    if (currentLevel === 0) {
      const types = categoryTypesMap?.get(item.id) || [];
      setViewModal({
        open: true,
        title: "Category Details",
        entity: "category",
        item,
        parentHierarchy: null,
        childCountText: `${types.length} ${types.length === 1 ? "Type" : "Types"} configured`,
      });
    } else if (currentLevel === 1) {
      const variants = categoryVariantsMap?.get(item.id) || [];
      setViewModal({
        open: true,
        title: "Category Type Details",
        entity: "type",
        item,
        parentHierarchy: selectedCategory?.name || null,
        childCountText: `${variants.length} ${variants.length === 1 ? "Variant" : "Variants"} configured`,
      });
    } else {
      setViewModal({
        open: true,
        title: "Variant Details",
        entity: "variant",
        item,
        parentHierarchy: `${selectedCategory?.name} → ${selectedType?.name}`,
        childCountText: null,
      });
    }
  };

  // Form Submit
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const cleanName = formModal.name.trim();
    const cleanSlug = (formModal.slug.trim() || slugify(cleanName)).toLowerCase();

    if (cleanName.length < 2 || cleanName.length > 100 || cleanSlug.length < 2 || cleanSlug.length > 100) {
      setFormModal((p) => ({ ...p, error: "Name and slug must be between 2 and 100 characters." }));
      return;
    }

    setFormModal((p) => ({ ...p, submitting: true, error: null }));
    try {
      if (formModal.entity === "category") {
        formModal.mode === "edit"
          ? await updateCategory(formModal.item.id, { name: cleanName, slug: cleanSlug })
          : await createCategory({ name: cleanName, slug: cleanSlug });
        setToastMessage(`Category "${cleanName}" ${formModal.mode === "edit" ? "updated" : "created"} successfully.`);
      } else if (formModal.entity === "type") {
        formModal.mode === "edit"
          ? await updateCategoryType(formModal.item.id, { name: cleanName, slug: cleanSlug })
          : await createCategoryType(selectedCategoryId, { name: cleanName, slug: cleanSlug });
        setToastMessage(`Type "${cleanName}" ${formModal.mode === "edit" ? "updated" : "created"} successfully.`);
      } else {
        formModal.mode === "edit"
          ? await updateCategoryVariant(formModal.item.id, { name: cleanName, slug: cleanSlug })
          : await createCategoryVariant(selectedTypeId, { name: cleanName, slug: cleanSlug });
        setToastMessage(`Variant "${cleanName}" ${formModal.mode === "edit" ? "updated" : "created"} successfully.`);
      }

      if (typeof refetch === "function") await refetch();
      setFormModal((p) => ({ ...p, open: false }));
    } catch (err) {
      const msg = err.response?.data?.message || err.message || "Action failed. Please try again.";
      setFormModal((p) => ({ ...p, submitting: false, error: msg }));
    }
  };

  return (
    <div className="space-y-4">
      {/* Toast Notifications */}
      {toastMessage && (
        <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center justify-between shadow-2xs">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span className="font-semibold">{toastMessage}</span>
          </div>
          <button
            type="button"
            onClick={() => setToastMessage(null)}
            className="text-emerald-700 hover:text-emerald-900 font-bold cursor-pointer"
          >
            ✕
          </button>
        </div>
      )}

      {toastError && (
        <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-800 flex items-center justify-between shadow-2xs">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            <span className="font-semibold">{toastError}</span>
          </div>
          <button
            type="button"
            onClick={() => setToastError(null)}
            className="text-rose-700 hover:text-rose-900 font-bold cursor-pointer"
          >
            ✕
          </button>
        </div>
      )}

      {/* Prominent Navigation Bar: Back Button & Breadcrumbs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 sm:p-4 bg-white border border-slate-200 rounded-2xl shadow-xs">
        <div className="flex items-center gap-2 sm:gap-2.5 flex-wrap min-w-0">
          {currentLevel > 0 ? (
            <button
              type="button"
              onClick={() => {
                if (currentLevel === 2) setSelectedTypeId("");
                else setSelectedCategoryId("");
                setSearchQuery("");
              }}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-sm font-semibold transition-colors cursor-pointer border border-slate-300 shadow-2xs"
            >
              <ArrowLeft className="w-4 h-4 text-slate-700" />
              <span>Back</span>
            </button>
          ) : (
            <div className="w-8 h-8 rounded-lg bg-[#004060]/10 flex items-center justify-center text-[#004060] shrink-0">
              <FolderTree className="w-4 h-4" />
            </div>
          )}

          {/* Breadcrumb Trail: Categories > CategoryName > TypeName */}
          <div className="flex items-center gap-1.5 sm:gap-2 text-sm sm:text-base font-semibold text-slate-600 flex-wrap min-w-0">
            <button
              type="button"
              onClick={() => {
                setSelectedCategoryId("");
                setSelectedTypeId("");
                setSearchQuery("");
              }}
              className={`hover:text-[#004060] transition-colors cursor-pointer ${
                currentLevel === 0 ? "font-bold text-[#004060]" : "text-slate-600"
              }`}
            >
              Categories
            </button>
            {selectedCategory && (
              <>
                <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
                <button
                  type="button"
                  onClick={() => {
                    setSelectedTypeId("");
                    setSearchQuery("");
                  }}
                  className={`hover:text-[#004060] transition-colors cursor-pointer ${
                    currentLevel === 1 ? "font-bold text-[#004060]" : "text-slate-600"
                  }`}
                >
                  {selectedCategory.name}
                </button>
              </>
            )}
            {selectedType && (
              <>
                <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
                <span className="font-bold text-[#004060] truncate">{selectedType.name}</span>
              </>
            )}
          </div>
        </div>

        <div className="text-xs sm:text-sm font-medium text-slate-500 shrink-0">
          Showing:{" "}
          <strong className="text-slate-800">
            {currentLevel === 0 && "Root Categories"}
            {currentLevel === 1 && `Types in ${selectedCategory?.name}`}
            {currentLevel === 2 && `Variants in ${selectedType?.name}`}
          </strong>
        </div>
      </div>

      {/* Main Actions Bar: Prominent Search on Left, Single Add Button on Right (Previous Separate Layout) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={
              currentLevel === 0
                ? "Search categories..."
                : currentLevel === 1
                ? `Search types in ${selectedCategory?.name}...`
                : `Search variants in ${selectedType?.name}...`
            }
            className="w-full pl-10 pr-9 py-2.5 bg-white border border-slate-300 rounded-xl text-sm sm:text-base text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#004060]/20 focus:border-[#004060] transition-all shadow-2xs"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <button
          type="button"
          onClick={handleOpenAdd}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#004060] hover:bg-[#003350] text-white text-sm sm:text-base font-semibold transition-all shadow-xs cursor-pointer whitespace-nowrap active:scale-[0.99] shrink-0"
        >
          <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
          <span>{addConfig.label}</span>
        </button>
      </div>

      {/* Material Table Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-3.5 sm:p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/70 flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <span className="text-base sm:text-lg font-bold text-slate-900 font-display">
              {currentLevel === 0 && "Categories"}
              {currentLevel === 1 && `Category Types in "${selectedCategory?.name}"`}
              {currentLevel === 2 && `Variants in "${selectedType?.name}"`}
            </span>
            <span className="text-sm font-semibold px-2.5 py-0.5 rounded-md bg-slate-200/80 text-slate-700">
              {displayedItems.length}
            </span>
          </div>
          <span className="text-xs sm:text-sm text-slate-500 hidden sm:inline">
            {currentLevel < 2 ? "Click row to view child options" : "End level variants"}
          </span>
        </div>

        {displayedItems.length === 0 ? (
          <div className="p-10 text-center text-sm text-slate-500 space-y-3">
            <p>
              {searchQuery
                ? `No items found matching "${searchQuery}".`
                : currentLevel === 0
                ? "No categories created yet."
                : currentLevel === 1
                ? `No types configured under "${selectedCategory?.name}" yet.`
                : `No variants configured under "${selectedType?.name}" yet.`}
            </p>
            <button
              type="button"
              onClick={handleOpenAdd}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold text-white bg-[#004060] hover:bg-[#003350] transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{addConfig.label}</span>
            </button>
          </div>
        ) : (
          <div className="w-full overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[500px]">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-200 text-xs sm:text-sm font-semibold text-slate-500 uppercase tracking-wider">
                  <th className="py-3.5 px-3 sm:px-6 w-10 sm:w-14 text-center">#</th>
                  <th className="py-3.5 px-3 sm:px-6">
                    {currentLevel === 0 ? "Category Name" : currentLevel === 1 ? "Type Name" : "Variant Name"}
                  </th>
                  <th className="py-3.5 px-3 sm:px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {displayedItems.map((item, idx) => {
                  return (
                    <tr
                      key={item.id}
                      onClick={() => {
                        if (currentLevel === 0) {
                          setSelectedCategoryId(item.id);
                          setSearchQuery("");
                        } else if (currentLevel === 1) {
                          setSelectedTypeId(item.id);
                          setSearchQuery("");
                        }
                      }}
                      className={`transition-colors group select-none ${
                        currentLevel < 2 ? "hover:bg-slate-50 cursor-pointer" : "hover:bg-slate-50/50"
                      }`}
                    >
                      <td className="py-3.5 px-3 sm:px-6 text-slate-400 font-mono text-sm text-center w-10 sm:w-14">
                        {idx + 1}
                      </td>

                      <td className="py-3.5 px-3 sm:px-6 font-semibold text-slate-900 group-hover:text-[#004060]">
                        <div className="flex items-center justify-between gap-3">
                          <div className="flex items-center gap-2.5 sm:gap-3">
                            {currentLevel === 0 && <FolderTree className="w-5 h-5 text-[#004060] shrink-0" />}
                            {currentLevel === 1 && <Layers className="w-5 h-5 text-[#004060] shrink-0" />}
                            {currentLevel === 2 && <Tag className="w-5 h-5 text-slate-400 shrink-0" />}
                            <span className="text-base sm:text-lg font-semibold whitespace-nowrap">{item.name}</span>
                          </div>
                          {currentLevel < 2 && (
                            <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-[#004060] group-hover:translate-x-0.5 transition-all shrink-0" />
                          )}
                        </div>
                      </td>

                      <td
                        className="py-3.5 px-3 sm:px-6 text-right whitespace-nowrap"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="inline-flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => handleOpenView(item)}
                            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl text-sm sm:text-base font-semibold bg-white border border-slate-300 text-slate-700 hover:bg-slate-100 hover:text-[#004060] hover:border-slate-400 transition-colors cursor-pointer"
                          >
                            <Eye className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                            <span>View</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => handleOpenEdit(item)}
                            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl text-sm sm:text-base font-semibold bg-white border border-slate-300 text-slate-700 hover:bg-slate-100 hover:text-[#004060] hover:border-slate-400 transition-colors cursor-pointer"
                          >
                            <Edit2 className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                            <span>Edit</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* VIEW MODAL COMPONENT */}
      <CatalogueViewModal
        open={viewModal.open}
        title={viewModal.title}
        entity={viewModal.entity}
        item={viewModal.item}
        parentHierarchy={viewModal.parentHierarchy}
        childCountText={viewModal.childCountText}
        onClose={() => setViewModal((p) => ({ ...p, open: false }))}
        onEdit={(it) => {
          setViewModal((p) => ({ ...p, open: false }));
          handleOpenEdit(it);
        }}
      />

      {/* ADD / EDIT MODAL COMPONENT */}
      <CatalogueFormModal
        open={formModal.open}
        mode={formModal.mode}
        entity={formModal.entity}
        name={formModal.name}
        slug={formModal.slug}
        submitting={formModal.submitting}
        error={formModal.error}
        parentName={modalParentName}
        onNameChange={(val) =>
          setFormModal((p) => ({
            ...p,
            name: val,
            slug: p.isSlugEdited ? p.slug : slugify(val),
          }))
        }
        onSlugChange={(val) => setFormModal((p) => ({ ...p, slug: val, isSlugEdited: true }))}
        onSubmit={handleFormSubmit}
        onClose={() => setFormModal((p) => ({ ...p, open: false }))}
      />
    </div>
  );
}
