// src/pages/Admin/products/filters/FilterOptionsAdminView.jsx
// Production Admin view for managing Filter Options: Brands, Sub-Brands, Grades, and Sub-Grades.
import React, { useState, useMemo } from "react";
import {
  Layers,
  Award,
  Hash,
  Search,
  Plus,
  Edit3,
  Trash2,
  AlertCircle,
  CheckCircle2,
  Loader2,
  Building2,
  X,
} from "lucide-react";
import { useAdminDashboard } from "../AdminDashboardContext";
import {
  createFilterOption,
  updateFilterOption,
  deleteFilterOption,
} from "../../../../services/filterService";

const TAB_CONFIG = [
  { id: "brands", label: "Brands", singular: "Brand", icon: Building2 },
  { id: "sub-brands", label: "Sub-Brands", singular: "Sub-Brand", icon: Layers },
  { id: "grades", label: "Grades", singular: "Grade", icon: Award },
  { id: "sub-grades", label: "Sub-Grades", singular: "Sub-Grade", icon: Hash },
];

export default function FilterOptionsAdminView() {
  const {
    allBrands = [],
    allSubBrands = [],
    allGrades = [],
    allSubGrades = [],
    refetch,
  } = useAdminDashboard();

  // Active Tab
  const [activeTab, setActiveTab] = useState("brands");

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all"); // "all" | "active" | "unavailable"

  // Action Feedback State
  const [actionSuccess, setActionSuccess] = useState(null);
  const [actionError, setActionError] = useState(null);

  // Modal State
  const [modal, setModal] = useState({
    open: false,
    mode: "add", // "add" | "edit" | "delete"
    item: null,
    name: "",
    submitting: false,
    error: null,
  });

  const currentTabMeta = useMemo(() => {
    return TAB_CONFIG.find((t) => t.id === activeTab) || TAB_CONFIG[0];
  }, [activeTab]);

  // Current list based on active tab
  const currentList = useMemo(() => {
    switch (activeTab) {
      case "sub-brands":
        return allSubBrands || [];
      case "grades":
        return allGrades || [];
      case "sub-grades":
        return allSubGrades || [];
      case "brands":
      default:
        return allBrands || [];
    }
  }, [activeTab, allBrands, allSubBrands, allGrades, allSubGrades]);

  // Tab count lookup
  const tabCounts = useMemo(
    () => ({
      brands: (allBrands || []).length,
      "sub-brands": (allSubBrands || []).length,
      grades: (allGrades || []).length,
      "sub-grades": (allSubGrades || []).length,
    }),
    [allBrands, allSubBrands, allGrades, allSubGrades]
  );

  // Filtered and searched list
  const filteredList = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return currentList.filter((item) => {
      if (statusFilter === "active" && !item.active) return false;
      if (statusFilter === "unavailable" && item.active) return false;
      if (q && !item.name?.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [currentList, searchQuery, statusFilter]);

  // Modal Open Handlers
  const handleOpenAdd = () => {
    setModal({
      open: true,
      mode: "add",
      item: null,
      name: "",
      submitting: false,
      error: null,
    });
  };

  const handleOpenEdit = (item) => {
    setModal({
      open: true,
      mode: "edit",
      item,
      name: item.name || "",
      submitting: false,
      error: null,
    });
  };

  const handleOpenDelete = (item) => {
    setModal({
      open: true,
      mode: "delete",
      item,
      name: item.name || "",
      submitting: false,
      error: null,
    });
  };

  const handleCloseModal = () => {
    setModal({
      open: false,
      mode: "add",
      item: null,
      name: "",
      submitting: false,
      error: null,
    });
  };

  // Modal Submit
  const handleModalSubmit = async (e) => {
    e.preventDefault();
    const cleanName = modal.name.trim();

    if (modal.mode !== "delete") {
      if (!cleanName || cleanName.length < 1 || cleanName.length > 50) {
        setModal((prev) => ({
          ...prev,
          error: "Name must be between 1 and 50 characters.",
        }));
        return;
      }
    }

    setModal((prev) => ({ ...prev, submitting: true, error: null }));
    setActionError(null);
    setActionSuccess(null);

    try {
      if (modal.mode === "add") {
        await createFilterOption(activeTab, cleanName);
        setActionSuccess(`${currentTabMeta.singular} "${cleanName}" created successfully.`);
      } else if (modal.mode === "edit") {
        await updateFilterOption(activeTab, modal.item.id, cleanName);
        setActionSuccess(`${currentTabMeta.singular} "${cleanName}" updated successfully.`);
      } else if (modal.mode === "delete") {
        const message = await deleteFilterOption(activeTab, modal.item.id);
        setActionSuccess(
          typeof message === "string" && message
            ? message
            : `${currentTabMeta.singular} "${modal.item.name}" deactivated successfully.`
        );
      }

      if (typeof refetch === "function") await refetch();
      handleCloseModal();
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.message ||
        `Failed to process ${currentTabMeta.singular.toLowerCase()}.`;
      setModal((prev) => ({ ...prev, submitting: false, error: msg }));
    }
  };

  return (
    <div className="space-y-5">
      {/* Notifications */}
      {actionSuccess && (
        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center justify-between shadow-2xs">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span className="font-semibold">{actionSuccess}</span>
          </div>
          <button
            type="button"
            onClick={() => setActionSuccess(null)}
            className="text-emerald-700 hover:text-emerald-900 font-bold cursor-pointer"
          >
            ✕
          </button>
        </div>
      )}

      {actionError && (
        <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-800 flex items-center justify-between shadow-2xs">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            <span className="font-semibold">{actionError}</span>
          </div>
          <button
            type="button"
            onClick={() => setActionError(null)}
            className="text-rose-700 hover:text-rose-900 font-bold cursor-pointer"
          >
            ✕
          </button>
        </div>
      )}

      {/* Main Container */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
        {/* Top Header: Tab Pills + Action Button */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Filter Option Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
            {TAB_CONFIG.map((tab) => {
              const isCurrent = activeTab === tab.id;
              const count = tabCounts[tab.id] || 0;
              const IconComponent = tab.icon;

              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => {
                    setActiveTab(tab.id);
                    setSearchQuery("");
                  }}
                  className={`inline-flex items-center gap-2 px-4 py-2 sm:px-4.5 sm:py-2.5 rounded-xl text-sm sm:text-base font-semibold transition-all whitespace-nowrap cursor-pointer ${
                    isCurrent
                      ? "bg-[#004060] text-white shadow-xs"
                      : "bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                  }`}
                >
                  <IconComponent className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>{tab.label}</span>
                  <span
                    className={`text-xs sm:text-sm px-2.5 py-0.5 rounded-full font-semibold ${
                      isCurrent
                        ? "bg-white/20 text-white"
                        : "bg-slate-200/80 text-slate-600"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Add Option Button */}
          <button
            type="button"
            onClick={handleOpenAdd}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm sm:text-base font-semibold text-white bg-[#004060] hover:bg-[#003350] transition-colors shadow-xs cursor-pointer whitespace-nowrap active:scale-[0.99] shrink-0"
          >
            <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>Add {currentTabMeta.singular}</span>
          </button>
        </div>

        {/* Search & Status Filter Toolbar */}
        <div className="p-3.5 sm:p-4 border-b border-slate-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-slate-50/50">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 w-full sm:w-auto flex-1 max-w-md">
            {/* Search Input */}
            <div className="relative flex-1 min-w-0">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={`Search ${currentTabMeta.label.toLowerCase()}...`}
                className="w-full pl-10 pr-9 py-2.5 bg-white border border-slate-200 rounded-xl text-sm sm:text-base text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#004060]/20 focus:border-[#004060] transition-all shadow-2xs"
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

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm sm:text-base text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#004060]/20 focus:border-[#004060] cursor-pointer shrink-0 shadow-2xs"
            >
              <option value="all">All Status</option>
              <option value="active">Active Only</option>
              <option value="unavailable">Unavailable Only</option>
            </select>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto text-xs sm:text-sm text-slate-500 font-medium shrink-0">
            <span>
              Showing <strong className="text-slate-800">{filteredList.length}</strong> of{" "}
              {currentList.length}
            </span>
          </div>
        </div>

        {/* Content Table */}
        {filteredList.length === 0 ? (
          <div className="p-12 text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
              <currentTabMeta.icon className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-800">
                No {currentTabMeta.label.toLowerCase()} found
              </h3>
              <p className="text-sm text-slate-400 max-w-sm mx-auto mt-0.5">
                {searchQuery || statusFilter !== "all"
                  ? "Try clearing your search query or status filter."
                  : `No ${currentTabMeta.label.toLowerCase()} exist yet.`}
              </p>
            </div>
            {!(searchQuery || statusFilter !== "all") && (
              <button
                type="button"
                onClick={handleOpenAdd}
                className="inline-flex items-center gap-1.5 px-4.5 py-2.5 rounded-xl text-sm sm:text-base font-semibold text-white bg-[#004060] hover:bg-[#003350] transition-colors cursor-pointer shadow-xs"
              >
                <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Add {currentTabMeta.singular}</span>
              </button>
            )}
          </div>
        ) : (
          <div className="w-full overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[560px]">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-200 text-xs sm:text-sm font-semibold text-slate-500 uppercase tracking-wider">
                  <th className="py-3.5 px-3 sm:px-6 w-10 sm:w-14 text-center">#</th>
                  <th className="py-3.5 px-3 sm:px-6">{currentTabMeta.singular} Name</th>
                  <th className="py-3.5 px-3 sm:px-6 w-32 sm:w-36 text-center sm:text-left">Status</th>
                  <th className="py-3.5 px-3 sm:px-6 text-right w-48 sm:w-56">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredList.map((item, idx) => {
                  const isActive = Boolean(item.active);

                  return (
                    <tr
                      key={item.id || idx}
                      className="hover:bg-slate-50/60 transition-colors group"
                    >
                      {/* Index */}
                      <td className="py-3.5 px-3 sm:px-6 text-slate-400 font-mono text-sm sm:text-base text-center w-10 sm:w-14">
                        {idx + 1}
                      </td>

                      {/* Name */}
                      <td className="py-3.5 px-3 sm:px-6">
                        <div className="flex items-center gap-2.5 sm:gap-3">
                          <span className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-slate-100 text-[#004060] flex items-center justify-center shrink-0">
                            <currentTabMeta.icon className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
                          </span>
                          <span className="text-base sm:text-lg font-semibold text-slate-900 group-hover:text-[#004060] transition-colors whitespace-nowrap">
                            {item.name}
                          </span>
                        </div>
                      </td>

                      {/* Status Badge */}
                      <td className="py-3.5 px-3 sm:px-6 whitespace-nowrap text-center sm:text-left">
                        {isActive ? (
                          <span className="inline-flex items-center px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full text-xs sm:text-sm font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                            Active
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full text-xs sm:text-sm font-semibold bg-slate-100 text-slate-600 border border-slate-200">
                            Unavailable
                          </span>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-3 sm:px-6 text-right whitespace-nowrap">
                        <div className="inline-flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => handleOpenEdit(item)}
                            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl text-sm sm:text-base font-semibold bg-white border border-slate-300 text-slate-700 hover:bg-slate-100 hover:text-[#004060] hover:border-slate-400 transition-colors cursor-pointer"
                          >
                            <Edit3 className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                            <span>Edit</span>
                          </button>

                          {isActive && (
                            <button
                              type="button"
                              onClick={() => handleOpenDelete(item)}
                              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl text-sm sm:text-base font-semibold bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200 transition-colors cursor-pointer"
                            >
                              <Trash2 className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                              <span>Deactivate</span>
                            </button>
                          )}
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

      {/* MODAL: ADD / EDIT / DELETE */}
      {modal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xl w-full max-w-sm p-5 space-y-4">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <span
                  className={`p-1.5 rounded-lg ${
                    modal.mode === "delete"
                      ? "bg-rose-100 text-rose-700"
                      : "bg-[#004060]/10 text-[#004060]"
                  }`}
                >
                  {modal.mode === "delete" ? (
                    <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                  ) : (
                    <currentTabMeta.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                  )}
                </span>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 font-display">
                  {modal.mode === "add" && `Add ${currentTabMeta.singular}`}
                  {modal.mode === "edit" && `Rename ${currentTabMeta.singular}`}
                  {modal.mode === "delete" && `Deactivate ${currentTabMeta.singular}`}
                </h3>
              </div>
              <button
                type="button"
                onClick={handleCloseModal}
                disabled={modal.submitting}
                className="text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Error Message */}
            {modal.error && (
              <div className="p-2.5 rounded-lg bg-rose-50 border border-rose-200 text-sm text-rose-700 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <span>{modal.error}</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleModalSubmit} className="space-y-4">
              {modal.mode === "delete" ? (
                /* Delete Confirmation View */
                <div className="py-1 space-y-1.5">
                  <p className="text-sm sm:text-base text-slate-700">
                    Are you sure you want to deactivate{" "}
                    <strong className="text-slate-900">{modal.item?.name}</strong>?
                  </p>
                  <p className="text-xs sm:text-sm text-slate-500">
                    This will mark it as unavailable in product filter options.
                  </p>
                </div>
              ) : (
                /* Add / Edit Input View */
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-sm sm:text-base">
                    <label className="font-semibold text-slate-700">
                      {currentTabMeta.singular} Name *
                    </label>
                    <span className="text-xs sm:text-sm text-slate-400 font-mono">
                      {modal.name.length}/50
                    </span>
                  </div>

                  <input
                    type="text"
                    required
                    maxLength={50}
                    value={modal.name}
                    onChange={(e) => setModal((prev) => ({ ...prev, name: e.target.value }))}
                    placeholder={`e.g. ${
                      activeTab === "brands"
                        ? "JSW, Tata Steel"
                        : activeTab === "grades"
                        ? "IS 2062, Fe 500D"
                        : "Name"
                    }`}
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-sm sm:text-base text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#004060]/20 focus:border-[#004060]"
                    autoFocus
                  />
                </div>
              )}

              {/* Modal Action Buttons */}
              <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  disabled={modal.submitting}
                  className="px-4 py-2 sm:px-4.5 sm:py-2.5 rounded-xl text-sm sm:text-base font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={modal.submitting}
                  className={`inline-flex items-center gap-1.5 px-4.5 py-2 sm:px-5 sm:py-2.5 rounded-xl text-sm sm:text-base font-semibold text-white shadow-xs transition-colors cursor-pointer disabled:opacity-60 ${
                    modal.mode === "delete"
                      ? "bg-rose-600 hover:bg-rose-700"
                      : "bg-[#004060] hover:bg-[#003350]"
                  }`}
                >
                  {modal.submitting && <Loader2 className="w-4 h-4 animate-spin" />}
                  <span>
                    {modal.mode === "add" && "Create"}
                    {modal.mode === "edit" && "Save"}
                    {modal.mode === "delete" && "Deactivate"}
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
