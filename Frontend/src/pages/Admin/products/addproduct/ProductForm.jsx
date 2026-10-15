// src/pages/Admin/products/addproduct/ProductForm.jsx
// Production form for adding and updating products adhering to ProductRequestDto schema.
import React, { useState, useMemo, useEffect } from "react";
import {
  FolderTree,
  Plus,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Loader2,
  FileText,
  Sliders,
  TableProperties,
  Image as ImageIcon,
  RotateCcw,
} from "lucide-react";
import { useDataProcess } from "../dataProccess";
import { createProduct, updateProduct } from "../../../../services/productService";
import TiptapEditor from "./TiptapEditor";

function slugify(text) {
  return String(text || "")
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default function ProductForm({
  initialData = null,
  isEditMode = false,
  onSubmitCustom = null,
  onSuccess = null,
  onCancel = null,
}) {
  const {
    categories,
    categoryTypesMap,
    categoryVariantsMap,
    allBrands,
    allSubBrands,
    allGrades,
    allSubGrades,
    nameMap,
    loading: filtersLoading,
  } = useDataProcess();

  // Basic Information
  const [title, setTitle] = useState(initialData?.title || "");
  const [slug, setSlug] = useState(initialData?.slug || "");
  const [isSlugManuallyEdited, setIsSlugManuallyEdited] = useState(Boolean(initialData?.slug));
  const [imageUrl, setImageUrl] = useState(initialData?.imageUrl || "");
  const [productStatus, setProductStatus] = useState(initialData?.productStatus || "ACTIVE");

  // Hierarchy & Filter Selection (7 filter dimensions)
  const [categoryId, setCategoryId] = useState(initialData?.categoryId || "");
  const [categoryTypeId, setCategoryTypeId] = useState(initialData?.categoryTypeId || "");
  const [categoryVariantId, setCategoryVariantId] = useState(initialData?.categoryVariantId || "");
  const [brandId, setBrandId] = useState(initialData?.brandId || "");
  const [subBrandId, setSubBrandId] = useState(initialData?.subBrandId || "");
  const [gradeId, setGradeId] = useState(initialData?.gradeId || "");
  const [subGradeId, setSubGradeId] = useState(initialData?.subGradeId || "");

  // Overview HTML
  const [overviewHtml, setOverviewHtml] = useState(initialData?.overviewHtml || "");

  // Technical Attributes
  const [attributes, setAttributes] = useState(() => {
    const rawAttrs = initialData?.attributeRequestDtos || initialData?.fullAttributeResponseDtos || initialData?.attributes;
    if (Array.isArray(rawAttrs) && rawAttrs.length > 0) {
      return rawAttrs.map((a) => ({
        label: a.label || "",
        unit: a.unit || "",
        valuesText: Array.isArray(a.values) ? a.values.join(", ") : "",
        min: a.min != null ? String(a.min) : "",
        max: a.max != null ? String(a.max) : "",
        customInput: Boolean(a.customInput),
      }));
    }
    return isEditMode
      ? []
      : [{ label: "", unit: "", valuesText: "", min: "", max: "", customInput: false }];
  });

  // Property Tables
  const [propertyTables, setPropertyTables] = useState(() => {
    const rawTables = initialData?.propertyTables || initialData?.propertyRequestDtoList;
    if (Array.isArray(rawTables) && rawTables.length > 0) {
      return rawTables.map((t) => ({
        heading: t.heading || "",
        rows: Object.entries(t.tableOfContent || {}).map(([key, value]) => ({ key, value })),
      }));
    }
    return [];
  });

  // Synchronize form fields whenever initialData changes (e.g. edit mode update)
  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || "");
      setSlug(initialData.slug || "");
      setIsSlugManuallyEdited(Boolean(initialData.slug));
      setImageUrl(initialData.imageUrl || "");
      setProductStatus(initialData.productStatus || "ACTIVE");
      setCategoryId(initialData.categoryId || "");
      setCategoryTypeId(initialData.categoryTypeId || "");
      setCategoryVariantId(initialData.categoryVariantId || "");
      setBrandId(initialData.brandId || "");
      setSubBrandId(initialData.subBrandId || "");
      setGradeId(initialData.gradeId || "");
      setSubGradeId(initialData.subGradeId || "");
      setOverviewHtml(initialData.overviewHtml || "");

      const rawAttrs =
        initialData.fullAttributeResponseDtos ||
        initialData.attributeRequestDtos ||
        initialData.attributes;
      if (Array.isArray(rawAttrs) && rawAttrs.length > 0) {
        setAttributes(
          rawAttrs.map((a) => ({
            label: a.label || "",
            unit: a.unit || "",
            valuesText: Array.isArray(a.values) ? a.values.join(", ") : "",
            min: a.min != null ? String(a.min) : "",
            max: a.max != null ? String(a.max) : "",
            customInput: Boolean(a.customInput),
          }))
        );
      } else {
        setAttributes([]);
      }

      const rawTables =
        initialData.propertyTables ||
        initialData.propertyRequestDtoList;
      if (Array.isArray(rawTables) && rawTables.length > 0) {
        setPropertyTables(
          rawTables.map((t) => ({
            heading: t.heading || "",
            rows: Object.entries(t.tableOfContent || {}).map(([key, value]) => ({ key, value })),
          }))
        );
      } else {
        setPropertyTables([]);
      }
    }
  }, [initialData]);

  // Form Submission State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState(null);
  const [formSuccess, setFormSuccess] = useState(null);

  // Dependent Types & Variants from processed hierarchies
  const availableTypes = useMemo(() => {
    if (!categoryId) return [];
    return categoryTypesMap?.get(categoryId) || [];
  }, [categoryId, categoryTypesMap]);

  const availableVariants = useMemo(() => {
    if (!categoryTypeId) return [];
    return categoryVariantsMap?.get(categoryTypeId) || [];
  }, [categoryTypeId, categoryVariantsMap]);

  const handleTitleChange = (e) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    if (!isSlugManuallyEdited) setSlug(slugify(newTitle));
  };

  const handleCategoryChange = (e) => {
    setCategoryId(e.target.value);
    setCategoryTypeId("");
    setCategoryVariantId("");
  };

  const handleTypeChange = (e) => {
    setCategoryTypeId(e.target.value);
    setCategoryVariantId("");
  };

  // Reset Form
  const handleResetForm = () => {
    setTitle("");
    setSlug("");
    setIsSlugManuallyEdited(false);
    setImageUrl("");
    setProductStatus("ACTIVE");
    setCategoryId("");
    setCategoryTypeId("");
    setCategoryVariantId("");
    setBrandId("");
    setSubBrandId("");
    setGradeId("");
    setSubGradeId("");
    setOverviewHtml("");
    setAttributes([{ label: "", unit: "", valuesText: "", min: "", max: "", customInput: false }]);
    setPropertyTables([]);
    setFormError(null);
    setFormSuccess(null);
  };

  // Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError(null);
    setFormSuccess(null);

    const finalTitle = title.trim();
    const finalSlug = slug.trim() || slugify(finalTitle);

    if (finalTitle.length < 2 || finalTitle.length > 150) {
      setFormError("Title must be between 2 and 150 characters.");
      return;
    }
    if (finalSlug.length < 4 || finalSlug.length > 150) {
      setFormError("Slug must be between 4 and 150 characters.");
      return;
    }
    if (!imageUrl.trim()) {
      setFormError("Image URL is required.");
      return;
    }
    if (!overviewHtml.trim()) {
      setFormError("Product overview description is required.");
      return;
    }

    const processedAttributes = attributes
      .map((attr) => {
        const values = attr.valuesText.split(",").map((v) => v.trim()).filter(Boolean);
        return {
          label: attr.label.trim(),
          unit: attr.unit.trim(),
          values: values.length > 0 ? values : [attr.label.trim()],
          customInput: Boolean(attr.customInput),
          min: attr.min.trim() || null,
          max: attr.max.trim() || null,
        };
      })
      .filter((attr) => attr.label.length >= 2);

    if (!isEditMode && processedAttributes.length === 0) {
      setFormError("At least one attribute with a valid label (2-20 characters) is required.");
      return;
    }

    const processedTables = propertyTables
      .map((tbl) => {
        const tableOfContent = {};
        tbl.rows.forEach((row) => {
          if (row.key.trim() && row.value.trim()) tableOfContent[row.key.trim()] = row.value.trim();
        });
        return { heading: tbl.heading.trim(), tableOfContent };
      })
      .filter((tbl) => tbl.heading && Object.keys(tbl.tableOfContent).length > 0);

    const payload = {
      ...(isEditMode && (initialData?.id || initialData?._id)
        ? { id: initialData.id || initialData._id }
        : {}),
      title: finalTitle,
      slug: finalSlug,
      imageUrl: imageUrl.trim(),
      productStatus,
      attributes: processedAttributes.map((attr) => ({
        label: attr.label,
        unit: attr.unit,
        min: attr.min,
        max: attr.max,
        values: attr.values,
      })),
      attributeRequestDtos: processedAttributes,
      overviewHtml: overviewHtml.trim(),
      propertyTables: processedTables,
      propertyRequestDtoList: processedTables,
      categoryId: categoryId || null,
      categoryTypeId: categoryTypeId || null,
      categoryVariantId: categoryVariantId || null,
      brandId: brandId || null,
      subBrandId: subBrandId || null,
      gradeId: gradeId || null,
      subGradeId: subGradeId || null,
    };

    setIsSubmitting(true);
    try {
      const result = typeof onSubmitCustom === "function"
        ? await onSubmitCustom(payload)
        : isEditMode
        ? await updateProduct(initialData.id || initialData._id, payload)
        : await createProduct(payload);

      setFormSuccess(
        isEditMode
          ? `Product "${result?.title || finalTitle}" updated successfully.`
          : `Product "${result?.title || finalTitle}" created successfully.`
      );
      if (!isEditMode) handleResetForm();
      if (typeof onSuccess === "function") onSuccess(result);
    } catch (err) {
      setFormError(
        err.response?.data?.message || err.response?.data?.error || err.message || "Failed to save product."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Helper to format item display name denoting unavailable status
  const formatOptionLabel = (item) => {
    if (!item) return "";
    const isUnavailable = item.active === false || item.status === "INACTIVE";
    return isUnavailable ? `${item.name} (Unavailable)` : item.name;
  };

  // Filter option sets showing all options from processed data
  const filterDropdownConfig = [
    { label: "Brand", val: brandId, set: setBrandId, list: allBrands || [] },
    { label: "Sub-Brand", val: subBrandId, set: setSubBrandId, list: allSubBrands || [] },
    { label: "Grade", val: gradeId, set: setGradeId, list: allGrades || [] },
    { label: "Sub-Grade", val: subGradeId, set: setSubGradeId, list: allSubGrades || [] },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Notifications */}
      {formSuccess && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span className="font-semibold">{formSuccess}</span>
          </div>
          <button type="button" onClick={() => setFormSuccess(null)} className="font-bold cursor-pointer">✕</button>
        </div>
      )}
      {formError && (
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            <span className="font-semibold">{formError}</span>
          </div>
          <button type="button" onClick={() => setFormError(null)} className="font-bold cursor-pointer">✕</button>
        </div>
      )}

      {/* 1. BASIC INFORMATION */}
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
              onChange={handleTitleChange}
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
              onChange={(e) => {
                setIsSlugManuallyEdited(true);
                setSlug(e.target.value);
              }}
              placeholder="e.g. jsw-colour-coated-corrugated-sheet"
              className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-sm font-mono text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#004060]/20 focus:border-[#004060]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-700">Status *</label>
            <select
              value={productStatus}
              onChange={(e) => setProductStatus(e.target.value)}
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
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://example.com/images/product.jpg"
                className="flex-1 px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#004060]/20 focus:border-[#004060]"
              />
              <div className="w-10 h-10 rounded-lg border border-slate-200 overflow-hidden bg-slate-50 flex items-center justify-center shrink-0">
                {imageUrl ? (
                  <img src={imageUrl} alt="" className="w-full h-full object-cover" onError={(e) => (e.target.style.display = "none")} />
                ) : (
                  <ImageIcon className="w-4 h-4 text-slate-400" />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. CATEGORY & FILTER HIERARCHY (7 DIMENSIONS) */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-7 shadow-[0_1px_3px_rgba(0,0,0,0.05)] space-y-5">
        <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
          <FolderTree className="w-4 h-4 text-[#004060]" />
          <h2 className="text-base font-bold text-slate-900 font-display">Category & Hierarchy Filters</h2>
        </div>

        {/* Category -> Type -> Variant (clean selections, no add buttons) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* 1. Category */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-700">Category</label>
            <select
              value={categoryId}
              onChange={handleCategoryChange}
              disabled={filtersLoading}
              className="w-full px-3 py-2.5 bg-white border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#004060]/20 focus:border-[#004060] cursor-pointer"
            >
              <option value="">None</option>
              {(categories || []).map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {formatOptionLabel(cat)}
                </option>
              ))}
            </select>
          </div>

          {/* 2. Type */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-700">Type</label>
            <select
              value={categoryTypeId}
              onChange={handleTypeChange}
              disabled={!categoryId || availableTypes.length === 0}
              className="w-full px-3 py-2.5 bg-white border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#004060]/20 focus:border-[#004060] disabled:bg-slate-50 disabled:text-slate-400 cursor-pointer"
            >
              <option value="">None</option>
              {availableTypes.map((t) => (
                <option key={t.id} value={t.id}>
                  {formatOptionLabel(t)}
                </option>
              ))}
            </select>
          </div>

          {/* 3. Variant */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-700">Variant</label>
            <select
              value={categoryVariantId}
              onChange={(e) => setCategoryVariantId(e.target.value)}
              disabled={!categoryTypeId || availableVariants.length === 0}
              className="w-full px-3 py-2.5 bg-white border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#004060]/20 focus:border-[#004060] disabled:bg-slate-50 disabled:text-slate-400 cursor-pointer"
            >
              <option value="">None</option>
              {availableVariants.map((v) => (
                <option key={v.id} value={v.id}>
                  {formatOptionLabel(v)}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* 4. Brand, 5. Sub-Brand, 6. Grade, 7. Sub-Grade (Show ALL options, denoting unavailable ones) */}
        <div className="pt-3 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {filterDropdownConfig.map(({ label, val, set, list }) => {
            const options = [...(list || [])];
            // If current val is not present in options (e.g. stale or legacy id), ensure it is safely represented
            if (val && !options.some((item) => item.id === val)) {
              const fallbackName = nameMap?.get(val) || "Selected Item";
              options.unshift({ id: val, name: fallbackName, active: false });
            }

            return (
              <div key={label} className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-700">{label}</label>
                <select
                  value={val}
                  onChange={(e) => set(e.target.value)}
                  className="w-full px-3 py-2.5 bg-white border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#004060]/20 focus:border-[#004060] cursor-pointer"
                >
                  <option value="">None</option>
                  {options.map((item) => (
                    <option key={item.id} value={item.id}>
                      {formatOptionLabel(item)}
                    </option>
                  ))}
                </select>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. PRODUCT OVERVIEW HTML (Tiptap) */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-7 shadow-[0_1px_3px_rgba(0,0,0,0.05)] space-y-4">
        <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100">
          <FileText className="w-4 h-4 text-[#004060]" />
          <h2 className="text-base font-bold text-slate-900 font-display">Product Overview *</h2>
        </div>
        <TiptapEditor
          value={overviewHtml}
          onChange={setOverviewHtml}
          placeholder="Write product overview and technical description..."
        />
      </div>

      {/* 4. TECHNICAL ATTRIBUTES */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-7 shadow-[0_1px_3px_rgba(0,0,0,0.05)] space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <Sliders className="w-4 h-4 text-[#004060]" />
            <h2 className="text-base font-bold text-slate-900 font-display">Technical Attributes *</h2>
          </div>
          <button
            type="button"
            onClick={() => setAttributes((prev) => [...prev, { label: "", unit: "", valuesText: "", min: "", max: "", customInput: false }])}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#004060] bg-blue-50 hover:bg-blue-100 rounded-lg cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Attribute</span>
          </button>
        </div>

        {attributes.length === 0 ? (
          <div className="text-center py-5 border border-dashed border-slate-200 rounded-xl text-slate-400 text-xs">
            No technical attributes configured. Click &quot;Add Attribute&quot; to add specifications.
          </div>
        ) : (
          <div className="space-y-3">
            {attributes.map((attr, index) => (
              <div key={index} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 items-end">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">Label *</label>
                    <input
                      type="text"
                      required
                      value={attr.label}
                      onChange={(e) => setAttributes((p) => p.map((a, i) => (i === index ? { ...a, label: e.target.value } : a)))}
                      placeholder="e.g. Thickness"
                      className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">Unit</label>
                    <input
                      type="text"
                      value={attr.unit}
                      onChange={(e) => setAttributes((p) => p.map((a, i) => (i === index ? { ...a, unit: e.target.value } : a)))}
                      placeholder="e.g. mm"
                      className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">Values (comma-sep)</label>
                    <input
                      type="text"
                      value={attr.valuesText}
                      onChange={(e) => setAttributes((p) => p.map((a, i) => (i === index ? { ...a, valuesText: e.target.value } : a)))}
                      placeholder="0.45, 0.50"
                      className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">Min / Max</label>
                    <div className="flex gap-1">
                      <input
                        type="text"
                        value={attr.min}
                        onChange={(e) => setAttributes((p) => p.map((a, i) => (i === index ? { ...a, min: e.target.value } : a)))}
                        placeholder="Min"
                        className="w-1/2 px-2 py-1.5 bg-white border border-slate-300 rounded-lg text-xs"
                      />
                      <input
                        type="text"
                        value={attr.max}
                        onChange={(e) => setAttributes((p) => p.map((a, i) => (i === index ? { ...a, max: e.target.value } : a)))}
                        placeholder="Max"
                        className="w-1/2 px-2 py-1.5 bg-white border border-slate-300 rounded-lg text-xs"
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-1">
                    <label className="flex items-center gap-1.5 text-[11px] text-slate-600 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={attr.customInput}
                        onChange={(e) => setAttributes((p) => p.map((a, i) => (i === index ? { ...a, customInput: e.target.checked } : a)))}
                        className="rounded border-slate-300 text-[#004060]"
                      />
                      <span>Custom</span>
                    </label>
                    <button
                      type="button"
                      onClick={() => setAttributes((p) => p.filter((_, i) => i !== index))}
                      className="text-slate-400 hover:text-rose-600 p-1 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 5. PROPERTY TABLES */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-7 shadow-[0_1px_3px_rgba(0,0,0,0.05)] space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <TableProperties className="w-4 h-4 text-[#004060]" />
            <h2 className="text-base font-bold text-slate-900 font-display">Property Tables</h2>
          </div>
          <button
            type="button"
            onClick={() => setPropertyTables((prev) => [...prev, { heading: "", rows: [{ key: "", value: "" }] }])}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#004060] bg-blue-50 hover:bg-blue-100 rounded-lg cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Table</span>
          </button>
        </div>

        {propertyTables.length === 0 ? (
          <div className="text-center py-5 border border-dashed border-slate-200 rounded-xl text-slate-400 text-xs">
            No property tables configured. Click "Add Table" to add key-value specifications.
          </div>
        ) : (
          <div className="space-y-4">
            {propertyTables.map((tbl, tableIndex) => (
              <div key={tableIndex} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2.5">
                <div className="flex items-center justify-between gap-3">
                  <input
                    type="text"
                    required
                    value={tbl.heading}
                    onChange={(e) => setPropertyTables((p) => p.map((t, i) => (i === tableIndex ? { ...t, heading: e.target.value } : t)))}
                    placeholder="Table Heading (e.g. Specifications)"
                    className="flex-1 px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs font-bold"
                  />
                  <button
                    type="button"
                    onClick={() => setPropertyTables((p) => p.filter((_, i) => i !== tableIndex))}
                    className="text-slate-400 hover:text-rose-600 p-1 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="space-y-2">
                  {tbl.rows.map((row, rowIndex) => (
                    <div key={rowIndex} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={row.key}
                        onChange={(e) =>
                          setPropertyTables((p) =>
                            p.map((t, i) =>
                              i === tableIndex
                                ? { ...t, rows: t.rows.map((r, rIdx) => (rIdx === rowIndex ? { ...r, key: e.target.value } : r)) }
                                : t
                            )
                          )
                        }
                        placeholder="Property (e.g. Standard)"
                        className="flex-1 px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg text-xs"
                      />
                      <input
                        type="text"
                        value={row.value}
                        onChange={(e) =>
                          setPropertyTables((p) =>
                            p.map((t, i) =>
                              i === tableIndex
                                ? { ...t, rows: t.rows.map((r, rIdx) => (rIdx === rowIndex ? { ...r, value: e.target.value } : r)) }
                                : t
                            )
                          )
                        }
                        placeholder="Value (e.g. IS 277)"
                        className="flex-1 px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg text-xs"
                      />
                      {tbl.rows.length > 1 && (
                        <button
                          type="button"
                          onClick={() =>
                            setPropertyTables((p) =>
                              p.map((t, i) =>
                                i === tableIndex ? { ...t, rows: t.rows.filter((_, rIdx) => rIdx !== rowIndex) } : t
                              )
                            )
                          }
                          className="text-slate-400 hover:text-rose-600 p-1 cursor-pointer"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setPropertyTables((p) =>
                      p.map((t, i) => (i === tableIndex ? { ...t, rows: [...t.rows, { key: "", value: "" }] } : t))
                    )
                  }
                  className="text-[11px] font-semibold text-[#004060] hover:underline cursor-pointer inline-flex items-center gap-1"
                >
                  <Plus className="w-3 h-3" />
                  <span>Add Row</span>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* FOOTER ACTIONS */}
      <div className="flex items-center justify-between pt-2">
        <button
          type="button"
          onClick={handleResetForm}
          disabled={isSubmitting}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 bg-white hover:bg-slate-50 text-xs sm:text-sm font-semibold cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset</span>
        </button>

        <div className="flex items-center gap-3">
          {typeof onCancel === "function" && (
            <button
              type="button"
              onClick={onCancel}
              disabled={isSubmitting}
              className="px-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#004060] hover:bg-[#003350] text-white text-xs sm:text-sm font-semibold shadow-xs disabled:opacity-60 cursor-pointer"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Saving...</span>
              </>
            ) : (
              <span>{isEditMode ? "Save Changes" : "Create Product"}</span>
            )}
          </button>
        </div>
      </div>
    </form>
  );
}
