// src/pages/Admin/products/addproduct/ProductForm.jsx
// Production form for adding and updating products adhering to ProductRequestDto schema.
import React, { useState, useMemo, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import {
  FolderTree,
  CheckCircle2,
  AlertCircle,
  Loader2,
  FileText,
  Sliders,
  TableProperties,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  Check,
} from "lucide-react";
import { useDataProcess } from "../dataProccess";
import { createProduct, updateProduct } from "../../../../services/productService";
import CategoryHierarchySection from "./components/CategoryHierarchySection";
import BasicInfoSection from "./components/BasicInfoSection";
import OverviewSection from "./components/OverviewSection";
import TechnicalAttributesSection from "./components/TechnicalAttributesSection";
import PropertyTablesSection from "./components/PropertyTablesSection";
import { propertyTablesToHtml, parsePastableTableText, rowsToPastableText } from "./components/propertyTableUtils";

const DRAFT_STORAGE_KEY = "evershine_add_product_draft";

const STEPS = [
  { id: 1, title: "Category & Hierarchy Filters", icon: FolderTree },
  { id: 2, title: "Basic Information", icon: FileText },
  { id: 3, title: "Product Overview *", icon: FileText },
  { id: 4, title: "Technical Attributes *", icon: Sliders },
  { id: 5, title: "Property Tables", icon: TableProperties },
];

function getSavedDraft() {
  try {
    const raw = localStorage.getItem(DRAFT_STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

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
  const [searchParams, setSearchParams] = useSearchParams();
  const isSubmittedRef = useRef(false);

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

  const savedDraft = useMemo(() => {
    if (isEditMode || initialData) return null;
    return getSavedDraft();
  }, [isEditMode, initialData]);

  // Stepper state (1 to 5) - integrates with URL search params so browser back/forward seamlessly switches steps
  const [internalStep, setInternalStep] = useState(() => {
    const stepParam = parseInt(searchParams.get("step"), 10);
    if (!isEditMode && stepParam >= 1 && stepParam <= 5) {
      return stepParam;
    }
    if (savedDraft?.currentStep && Number(savedDraft.currentStep) >= 1 && Number(savedDraft.currentStep) <= 5) {
      return Number(savedDraft.currentStep);
    }
    return 1;
  });

  const stepParam = parseInt(searchParams.get("step"), 10);
  const currentStep = useMemo(() => {
    if (!isEditMode && stepParam >= 1 && stepParam <= 5) {
      return stepParam;
    }
    return internalStep;
  }, [isEditMode, stepParam, internalStep]);

  // Basic Information
  const [title, setTitle] = useState(() => initialData?.title || savedDraft?.title || "");
  const [slug, setSlug] = useState(() => initialData?.slug || savedDraft?.slug || "");
  const [isSlugManuallyEdited, setIsSlugManuallyEdited] = useState(() => Boolean(initialData?.slug || savedDraft?.isSlugManuallyEdited));
  const [imageUrl, setImageUrl] = useState(() => initialData?.imageUrl || savedDraft?.imageUrl || "");
  const [productStatus, setProductStatus] = useState(() => initialData?.productStatus || savedDraft?.productStatus || "ACTIVE");

  // Hierarchy & Filter Selection (7 filter dimensions)
  const [categoryId, setCategoryId] = useState(() => initialData?.categoryId || savedDraft?.categoryId || "");
  const [categoryTypeId, setCategoryTypeId] = useState(() => initialData?.categoryTypeId || savedDraft?.categoryTypeId || "");
  const [categoryVariantId, setCategoryVariantId] = useState(() => initialData?.categoryVariantId || savedDraft?.categoryVariantId || "");
  const [brandId, setBrandId] = useState(() => initialData?.brandId || savedDraft?.brandId || "");
  const [subBrandId, setSubBrandId] = useState(() => initialData?.subBrandId || savedDraft?.subBrandId || "");
  const [gradeId, setGradeId] = useState(() => initialData?.gradeId || savedDraft?.gradeId || "");
  const [subGradeId, setSubGradeId] = useState(() => initialData?.subGradeId || savedDraft?.subGradeId || "");

  // Overview HTML
  const [overviewHtml, setOverviewHtml] = useState(() => initialData?.overviewHtml || savedDraft?.overviewHtml || "");

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
    if (Array.isArray(savedDraft?.attributes) && savedDraft.attributes.length > 0) {
      return savedDraft.attributes;
    }
    return isEditMode
      ? []
      : [{ label: "", unit: "", valuesText: "", min: "", max: "", customInput: false }];
  });

  // Property Tables (HTML Table from Tiptap Editor & Structured Key-Values)
  const [propertyTableHtml, setPropertyTableHtml] = useState(() => {
    if (savedDraft?.propertyTableHtml) {
      return savedDraft.propertyTableHtml;
    }
    const rawTables = initialData?.propertyTables || initialData?.propertyRequestDtoList;
    if (Array.isArray(rawTables) && rawTables.length > 0) {
      return propertyTablesToHtml(rawTables);
    }
    if (Array.isArray(savedDraft?.propertyTables) && savedDraft.propertyTables.length > 0) {
      return propertyTablesToHtml(savedDraft.propertyTables);
    }
    return "";
  });

  const [propertyTables, setPropertyTables] = useState(() => {
    const rawTables = initialData?.propertyTables || initialData?.propertyRequestDtoList;
    if (Array.isArray(rawTables) && rawTables.length > 0) {
      return rawTables.map((t) => {
        const rows = Object.entries(t.tableOfContent || {}).map(([key, value]) => ({ key, value }));
        return {
          heading: t.heading || "Specifications",
          rows,
          rawText: rowsToPastableText(rows),
        };
      });
    }
    if (Array.isArray(savedDraft?.propertyTables) && savedDraft.propertyTables.length > 0) {
      return savedDraft.propertyTables.map((t) => {
        const rows = Array.isArray(t.rows)
          ? t.rows
          : t.tableOfContent
          ? Object.entries(t.tableOfContent).map(([key, value]) => ({ key, value }))
          : [];
        return {
          heading: t.heading || "Specifications",
          rows,
          rawText: t.rawText !== undefined ? t.rawText : rowsToPastableText(rows),
        };
      });
    }
    return [{ heading: "Specifications", rows: [], rawText: "" }];
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
        setPropertyTableHtml(propertyTablesToHtml(rawTables));
        setPropertyTables(
          rawTables.map((t) => {
            const rows = Object.entries(t.tableOfContent || {}).map(([key, value]) => ({ key, value }));
            return {
              heading: t.heading || "Specifications",
              rows,
              rawText: rowsToPastableText(rows),
            };
          })
        );
      } else {
        setPropertyTableHtml("");
        setPropertyTables([{ heading: "Specifications", rows: [], rawText: "" }]);
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
    isSubmittedRef.current = false;
    const newTitle = e.target.value;
    setTitle(newTitle);
    if (!isSlugManuallyEdited) setSlug(slugify(newTitle));
  };

  const handleCategoryChange = (val) => {
    isSubmittedRef.current = false;
    const value = val && typeof val === "object" && "target" in val ? val.target.value : val;
    setCategoryId(value || "");
    setCategoryTypeId("");
    setCategoryVariantId("");
  };

  const handleTypeChange = (val) => {
    isSubmittedRef.current = false;
    const value = val && typeof val === "object" && "target" in val ? val.target.value : val;
    setCategoryTypeId(value || "");
    setCategoryVariantId("");
  };

  // Persist draft to localStorage whenever form fields or current step change (Add Product mode only)
  useEffect(() => {
    if (isEditMode || initialData || isSubmittedRef.current) return;
    const draft = {
      currentStep,
      title,
      slug,
      isSlugManuallyEdited,
      imageUrl,
      productStatus,
      categoryId,
      categoryTypeId,
      categoryVariantId,
      brandId,
      subBrandId,
      gradeId,
      subGradeId,
      overviewHtml,
      attributes,
      propertyTables,
      propertyTableHtml,
    };
    try {
      localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(draft));
    } catch {
      // Ignore localStorage quota errors
    }
  }, [
    isEditMode,
    initialData,
    currentStep,
    title,
    slug,
    isSlugManuallyEdited,
    imageUrl,
    productStatus,
    categoryId,
    categoryTypeId,
    categoryVariantId,
    brandId,
    subBrandId,
    gradeId,
    subGradeId,
    overviewHtml,
    attributes,
    propertyTables,
    propertyTableHtml,
  ]);

  // Step Validation
  const validateStep = (stepNumber) => {
    setFormError(null);

    if (stepNumber === 1) {
      // Step 1: Category & Hierarchy Filters (optional selections)
      return true;
    }

    if (stepNumber === 2) {
      // Step 2: Basic Information
      const finalTitle = title.trim();
      const finalSlug = slug.trim() || slugify(finalTitle);

      if (finalTitle.length < 2 || finalTitle.length > 150) {
        setFormError("Title must be between 2 and 150 characters.");
        return false;
      }
      if (finalSlug.length < 4 || finalSlug.length > 150) {
        setFormError("Slug must be between 4 and 150 characters.");
        return false;
      }
      if (!imageUrl.trim()) {
        setFormError("Image URL is required.");
        return false;
      }
      return true;
    }

    if (stepNumber === 3) {
      const plainOverview = overviewHtml.replace(/<[^>]*>/g, "").trim();
      if (!plainOverview && !overviewHtml.trim()) {
        setFormError("Product overview description is required.");
        return false;
      }
      return true;
    }

    if (stepNumber === 4) {
      const validAttrs = attributes.filter(
        (a) => a.label && a.label.trim().length >= 2
      );
      if (!isEditMode && validAttrs.length === 0) {
        setFormError("At least one attribute with a valid label (min 2 characters) is required.");
        return false;
      }
      return true;
    }

    return true;
  };

  const goToStep = (nextStep) => {
    setFormError(null);
    setInternalStep(nextStep);
    if (!isEditMode) {
      setSearchParams({ step: nextStep });
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNextStep = () => {
    if (!validateStep(currentStep)) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const nextStep = Math.min(currentStep + 1, 5);
    goToStep(nextStep);
  };

  const handlePrevStep = () => {
    const prevStep = Math.max(currentStep - 1, 1);
    goToStep(prevStep);
  };

  const handleStepClick = (targetStep) => {
    if (targetStep === currentStep) return;
    if (targetStep < currentStep) {
      goToStep(targetStep);
      return;
    }
    if (!validateStep(currentStep)) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    goToStep(targetStep);
  };

  // Reset Form
  const handleResetForm = () => {
    isSubmittedRef.current = true;
    if (!isEditMode) {
      try {
        localStorage.removeItem(DRAFT_STORAGE_KEY);
      } catch {
        // ignore
      }
      setSearchParams({ step: 1 });
    }
    setInternalStep(1);
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
    setPropertyTableHtml("");
    setFormError(null);
    setFormSuccess(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Submit Handler
  const handleSubmit = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    setFormError(null);
    setFormSuccess(null);

    const finalTitle = title.trim();
    const finalSlug = slug.trim() || slugify(finalTitle);

    if (finalTitle.length < 2 || finalTitle.length > 150) {
      setFormError("Title must be between 2 and 150 characters.");
      goToStep(2);
      return;
    }
    if (finalSlug.length < 4 || finalSlug.length > 150) {
      setFormError("Slug must be between 4 and 150 characters.");
      goToStep(2);
      return;
    }
    if (!imageUrl.trim()) {
      setFormError("Image URL is required.");
      goToStep(2);
      return;
    }
    if (!overviewHtml.trim() || overviewHtml === "<p></p>") {
      setFormError("Product overview description is required.");
      goToStep(3);
      return;
    }

    const processedAttributes = attributes
      .map((attr) => {
        const rawText = (attr.valuesText || "").trim();
        const values = rawText.includes(",")
          ? rawText.split(",").map((v) => v.trim()).filter(Boolean)
          : rawText.split(/\s+/).map((v) => v.trim()).filter(Boolean);
        return {
          label: (attr.label || "").trim(),
          unit: (attr.unit || "").trim(),
          values: values.length > 0 ? values : [(attr.label || "").trim()],
          customInput: Boolean(attr.customInput),
          min: (attr.min || "").trim() || null,
          max: (attr.max || "").trim() || null,
        };
      })
      .filter((attr) => attr.label.length >= 2);

    if (!isEditMode && processedAttributes.length === 0) {
      setFormError("At least one attribute with a valid label (2-20 characters) is required.");
      goToStep(4);
      return;
    }

    const processedTables = propertyTables
      .map((tbl) => {
        const tableOfContent = {};
        if (tbl.tableOfContent && typeof tbl.tableOfContent === "object") {
          Object.assign(tableOfContent, tbl.tableOfContent);
        }
        (tbl.rows || []).forEach((row) => {
          if ((row.key || "").trim() && (row.value || "").trim()) {
            tableOfContent[row.key.trim()] = row.value.trim();
          }
        });
        return { heading: (tbl.heading || "Specifications").trim(), tableOfContent };
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

      isSubmittedRef.current = true;
      if (!isEditMode) {
        try {
          localStorage.removeItem(DRAFT_STORAGE_KEY);
        } catch {
          // ignore
        }
        setSearchParams({ step: 1 });
      }

      setFormSuccess(
        isEditMode
          ? `Product "${result?.title || finalTitle}" updated successfully.`
          : `Product "${result?.title || finalTitle}" created successfully and stored in database.`
      );
      setFormError(null);

      // Reset form fields after successful creation without wiping formSuccess
      if (!isEditMode) {
        setInternalStep(1);
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
        setPropertyTableHtml("");
      }
      window.scrollTo({ top: 0, behavior: "smooth" });
      if (typeof onSuccess === "function") onSuccess(result);
    } catch (err) {
      setFormError(
        err.response?.data?.message || err.response?.data?.error || err.message || "Failed to save product."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (currentStep < 5) {
      handleNextStep();
      return;
    }
    handleSubmit(e);
  };

  const handleKeyDown = (e) => {
    // Prevent accidental submit on Enter key inside inputs in the final step
    if (e.key === "Enter" && e.target.tagName === "INPUT" && e.target.type !== "submit") {
      e.preventDefault();
      if (currentStep < 5) {
        handleNextStep();
      }
    }
  };

  // Helper to format item display name denoting unavailable status
  const formatOptionLabel = (item) => {
    if (!item) return "";
    const isUnavailable = item.active === false || item.status === "INACTIVE";
    return isUnavailable ? `${item.name} (Unavailable)` : item.name;
  };

  return (
    <form onSubmit={handleFormSubmit} onKeyDown={handleKeyDown} className="space-y-6">
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

      {/* STEP PROGRESS INDICATOR */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-4 sm:p-5 shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
        <div className="flex items-center justify-between gap-1 sm:gap-2 overflow-x-auto pb-1 sm:pb-0">
          {STEPS.map((step, idx) => {
            const isCompleted = currentStep > step.id;
            const isCurrent = currentStep === step.id;

            return (
              <React.Fragment key={step.id}>
                <button
                  type="button"
                  onClick={() => handleStepClick(step.id)}
                  className={`flex items-center gap-2 sm:gap-2.5 px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-xl transition-all cursor-pointer shrink-0 text-left ${
                    isCurrent
                      ? "bg-[#004060]/10 text-[#004060] font-bold"
                      : isCompleted
                      ? "text-slate-800 hover:bg-slate-50 font-semibold"
                      : "text-slate-400 hover:text-slate-600 font-medium"
                  }`}
                  title={`Go to ${step.title}`}
                >
                  <div
                    className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold shrink-0 transition-colors ${
                      isCurrent
                        ? "bg-[#004060] text-white shadow-xs"
                        : isCompleted
                        ? "bg-emerald-600 text-white"
                        : "bg-slate-100 text-slate-500 border border-slate-200"
                    }`}
                  >
                    {isCompleted ? <Check className="w-4 h-4 stroke-[2.5]" /> : step.id}
                  </div>
                  <span className="hidden md:inline-block text-xs sm:text-sm whitespace-nowrap">
                    {step.title}
                  </span>
                </button>

                {idx < STEPS.length - 1 && (
                  <div
                    className={`hidden lg:block flex-1 h-[2px] mx-1 transition-colors ${
                      currentStep > step.id ? "bg-emerald-500" : "bg-slate-200"
                    }`}
                  />
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Mobile / Tablet active step title display */}
        <div className="md:hidden mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs sm:text-sm text-slate-600">
          <span className="font-semibold text-[#004060]">
            Step {currentStep} of 5:
          </span>
          <span className="font-medium text-slate-800 truncate ml-2">
            {STEPS[currentStep - 1]?.title}
          </span>
        </div>
      </div>

      {/* 1. CATEGORY & FILTER HIERARCHY */}
      {currentStep === 1 && (
        <CategoryHierarchySection
          categoryId={categoryId}
          categoryTypeId={categoryTypeId}
          categoryVariantId={categoryVariantId}
          brandId={brandId}
          subBrandId={subBrandId}
          gradeId={gradeId}
          subGradeId={subGradeId}
          onCategoryChange={handleCategoryChange}
          onTypeChange={handleTypeChange}
          onVariantChange={(val) => {
            isSubmittedRef.current = false;
            const value = val && typeof val === "object" && "target" in val ? val.target.value : val;
            setCategoryVariantId(value || "");
          }}
          onBrandChange={(val) => {
            isSubmittedRef.current = false;
            const value = val && typeof val === "object" && "target" in val ? val.target.value : val;
            setBrandId(value || "");
          }}
          onSubBrandChange={(val) => {
            isSubmittedRef.current = false;
            const value = val && typeof val === "object" && "target" in val ? val.target.value : val;
            setSubBrandId(value || "");
          }}
          onGradeChange={(val) => {
            isSubmittedRef.current = false;
            const value = val && typeof val === "object" && "target" in val ? val.target.value : val;
            setGradeId(value || "");
          }}
          onSubGradeChange={(val) => {
            isSubmittedRef.current = false;
            const value = val && typeof val === "object" && "target" in val ? val.target.value : val;
            setSubGradeId(value || "");
          }}
          categories={categories}
          availableTypes={availableTypes}
          availableVariants={availableVariants}
          allBrands={allBrands}
          allSubBrands={allSubBrands}
          allGrades={allGrades}
          allSubGrades={allSubGrades}
          nameMap={nameMap}
          filtersLoading={filtersLoading}
          formatOptionLabel={formatOptionLabel}
        />
      )}

      {/* 2. BASIC INFORMATION */}
      {currentStep === 2 && (
        <BasicInfoSection
          title={title}
          slug={slug}
          imageUrl={imageUrl}
          productStatus={productStatus}
          onTitleChange={handleTitleChange}
          onSlugChange={(e) => {
            isSubmittedRef.current = false;
            setIsSlugManuallyEdited(true);
            setSlug(e.target.value);
          }}
          onImageUrlChange={(e) => {
            isSubmittedRef.current = false;
            setImageUrl(e.target.value);
          }}
          onStatusChange={(e) => {
            isSubmittedRef.current = false;
            setProductStatus(e.target.value);
          }}
        />
      )}

      {/* 3. PRODUCT OVERVIEW HTML */}
      {currentStep === 3 && (
        <OverviewSection
          overviewHtml={overviewHtml}
          onChange={(html) => {
            isSubmittedRef.current = false;
            setOverviewHtml(html);
          }}
        />
      )}

      {/* 4. TECHNICAL ATTRIBUTES */}
      {currentStep === 4 && (
        <TechnicalAttributesSection
          attributes={attributes}
          onAddAttribute={() => {
            isSubmittedRef.current = false;
            setAttributes((prev) => [
              ...prev,
              { label: "", unit: "", valuesText: "", min: "", max: "", customInput: false },
            ]);
          }}
          onUpdateAttribute={(index, field, value) => {
            isSubmittedRef.current = false;
            setAttributes((prev) =>
              prev.map((attr, idx) => (idx === index ? { ...attr, [field]: value } : attr))
            );
          }}
          onRemoveAttribute={(index) => {
            isSubmittedRef.current = false;
            setAttributes((prev) => prev.filter((_, idx) => idx !== index));
          }}
        />
      )}

      {/* 5. PROPERTY TABLES */}
      {currentStep === 5 && (
        <PropertyTablesSection
          propertyTables={propertyTables}
          onAddTable={() => {
            isSubmittedRef.current = false;
            setPropertyTables((prev) => [
              ...prev,
              { heading: `Table ${prev.length + 1}`, rows: [], rawText: "" },
            ]);
          }}
          onRemoveTable={(tableIndex) => {
            isSubmittedRef.current = false;
            setPropertyTables((prev) => prev.filter((_, idx) => idx !== tableIndex));
          }}
          onHeadingChange={(tableIndex, value) => {
            isSubmittedRef.current = false;
            setPropertyTables((prev) =>
              prev.map((tbl, idx) => (idx === tableIndex ? { ...tbl, heading: value } : tbl))
            );
          }}
          onTextChange={(tableIndex, newText) => {
            isSubmittedRef.current = false;
            const parsedRows = parsePastableTableText(newText);
            setPropertyTables((prev) =>
              prev.map((tbl, idx) =>
                idx === tableIndex
                  ? {
                      ...tbl,
                      rawText: newText,
                      rows: parsedRows,
                    }
                  : tbl
              )
            );
          }}
        />
      )}

      {/* STEP NAVIGATION ACTIONS */}
      <div className="flex items-center justify-between pt-2">
        {currentStep > 1 ? (
          <button
            type="button"
            onClick={handlePrevStep}
            disabled={isSubmitting}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 bg-white hover:bg-slate-50 text-sm font-semibold transition cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Back</span>
          </button>
        ) : (
          <button
            type="button"
            onClick={handleResetForm}
            disabled={isSubmitting}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 bg-white hover:bg-slate-50 text-sm font-semibold transition cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        )}

        <div className="flex items-center gap-3">
          {typeof onCancel === "function" && (
            <button
              type="button"
              onClick={onCancel}
              disabled={isSubmitting}
              className="px-4 py-2.5 text-sm font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
            >
              Cancel
            </button>
          )}

          {currentStep < 5 ? (
            <button
              type="button"
              onClick={handleNextStep}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#004060] hover:bg-[#003350] text-white text-sm font-semibold shadow-xs transition cursor-pointer"
            >
              <span>Save & Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#004060] hover:bg-[#003350] text-white text-sm font-semibold shadow-xs disabled:opacity-60 transition cursor-pointer"
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
          )}
        </div>
      </div>
    </form>
  );
}
