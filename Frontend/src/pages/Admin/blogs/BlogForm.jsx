// src/pages/Admin/blogs/BlogForm.jsx
import React, { useState } from "react";
import { Save, Loader2, X, Plus, ArrowLeft, AlertCircle } from "lucide-react";
import TiptapEditor from "../products/addproduct/TiptapEditor";
import { createBlog, updateBlog } from "../../../services/blogService";

function toSlug(text = "") {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 100);
}

export default function BlogForm({
  mode = "create",
  initialData = null,
  onSaved,
  onCancel,
}) {
  const isEdit = mode === "edit" && Boolean(initialData?.id);

  const [title, setTitle] = useState(initialData?.title || "");
  const [slug, setSlug] = useState(initialData?.slug || "");
  const [slugTouched, setSlugTouched] = useState(isEdit);
  const [imageUrl, setImageUrl] = useState(initialData?.imageUrl || "");
  const [content, setContent] = useState(initialData?.content || "");
  const [keywords, setKeywords] = useState(
    Array.isArray(initialData?.keywords) ? initialData.keywords : []
  );
  const [keywordInput, setKeywordInput] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleTitleChange = (val) => {
    setTitle(val);
    if (!slugTouched) {
      setSlug(toSlug(val));
    }
  };

  const handleAddKeyword = () => {
    const parts = keywordInput
      .split(",")
      .map((k) => k.trim())
      .filter(Boolean);
    if (parts.length === 0) return;

    setKeywords((prev) => {
      const next = [...prev];
      parts.forEach((p) => {
        if (!next.includes(p)) next.push(p);
      });
      return next;
    });
    setKeywordInput("");
  };

  const handleKeywordKeyDown = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      handleAddKeyword();
    }
  };

  const handleRemoveKeyword = (kw) => {
    setKeywords((prev) => prev.filter((item) => item !== kw));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const trimmedTitle = title.trim();
    const trimmedSlug = slug.trim();
    const trimmedImage = imageUrl.trim();
    const trimmedContent = content.trim();

    if (!trimmedTitle || trimmedTitle.length > 300) {
      setError("Title is required and must be at most 300 characters.");
      return;
    }
    if (!trimmedSlug || trimmedSlug.length > 100) {
      setError("Slug is required and must be at most 100 characters.");
      return;
    }
    if (!trimmedImage) {
      setError("Image URL is required.");
      return;
    }
    if (!trimmedContent) {
      setError("Blog content is required.");
      return;
    }

    const payload = {
      title: trimmedTitle,
      slug: trimmedSlug,
      imageUrl: trimmedImage,
      content: trimmedContent,
      keywords,
    };

    try {
      setSubmitting(true);
      const saved = isEdit
        ? await updateBlog(initialData.id, payload, initialData.slug)
        : await createBlog(payload);

      if (!isEdit) {
        setTitle("");
        setSlug("");
        setSlugTouched(false);
        setImageUrl("");
        setContent("");
        setKeywords([]);
        setKeywordInput("");
      }

      if (onSaved) onSaved(saved, isEdit ? "updated" : "created");
    } catch (err) {
      const apiMsg =
        err?.response?.data?.message ||
        err?.message ||
        `Failed to ${isEdit ? "update" : "create"} blog.`;
      setError(apiMsg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl border border-[#c4a574]/35 p-5 sm:p-8 space-y-6"
    >
      {/* Form Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 font-display">
            {isEdit ? "Update Blog Post" : "Create New Blog Post"}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-1">
            {isEdit
              ? `Editing article #${initialData.id}`
              : "Publish a new article with HTML content and SEO keywords."}
          </p>
        </div>

        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm sm:text-base font-semibold bg-slate-100 text-neutral-900 hover:bg-slate-200 transition cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to List</span>
          </button>
        )}
      </div>

      {error && (
        <div className="flex items-start gap-3 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-sm sm:text-base font-medium">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      {/* Title & Slug */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm sm:text-base font-semibold text-neutral-900 mb-2">
            Title <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            maxLength={300}
            value={title}
            onChange={(e) => handleTitleChange(e.target.value)}
            placeholder="e.g. Hot rolled coil (HR coil): Grades, sizes & applications"
            className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm sm:text-base text-neutral-900 focus:outline-none focus:ring-2 focus:ring-[#c4a574] focus:border-transparent"
          />
          <p className="text-sm text-slate-500 mt-1">{title.length}/300 characters</p>
        </div>

        <div>
          <label className="block text-sm sm:text-base font-semibold text-neutral-900 mb-2">
            Slug <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            maxLength={100}
            value={slug}
            onChange={(e) => {
              setSlugTouched(true);
              setSlug(e.target.value);
            }}
            placeholder="e.g. hot-rolled-coil-hr-coil-grades-sizes-applications"
            className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm sm:text-base text-neutral-900 font-mono focus:outline-none focus:ring-2 focus:ring-[#c4a574] focus:border-transparent"
          />
          <p className="text-sm text-slate-500 mt-1">{slug.length}/100 characters</p>
        </div>
      </div>

      {/* Image URL & Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-start">
        <div className="lg:col-span-2">
          <label className="block text-sm sm:text-base font-semibold text-neutral-900 mb-2">
            Featured Image URL <span className="text-rose-500">*</span>
          </label>
          <input
            type="url"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="https://..."
            className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm sm:text-base text-neutral-900 focus:outline-none focus:ring-2 focus:ring-[#c4a574] focus:border-transparent"
          />
        </div>

        <div>
          <span className="block text-sm sm:text-base font-semibold text-neutral-900 mb-2">
            Preview
          </span>
          <div className="h-28 rounded-xl border border-slate-200 bg-slate-50 overflow-hidden flex items-center justify-center">
            {imageUrl.trim() ? (
              <img
                src={imageUrl}
                alt="Preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-sm text-slate-400">No image URL</span>
            )}
          </div>
        </div>
      </div>

      {/* Keywords */}
      <div>
        <label className="block text-sm sm:text-base font-semibold text-neutral-900 mb-2">
          Keywords
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={keywordInput}
            onChange={(e) => setKeywordInput(e.target.value)}
            onKeyDown={handleKeywordKeyDown}
            placeholder="Type keyword and press Enter or comma..."
            className="flex-1 px-4 py-3 rounded-xl border border-slate-300 text-sm sm:text-base text-neutral-900 focus:outline-none focus:ring-2 focus:ring-[#c4a574] focus:border-transparent"
          />
          <button
            type="button"
            onClick={handleAddKeyword}
            className="inline-flex items-center gap-1.5 px-4 py-3 rounded-xl bg-neutral-900 text-white hover:bg-[#c4a574] text-sm sm:text-base font-semibold transition cursor-pointer shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Add</span>
          </button>
        </div>

        {keywords.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {keywords.map((kw) => (
              <span
                key={kw}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#fdf8ef] border border-[#c4a574]/50 text-sm font-semibold text-neutral-900"
              >
                <span>{kw}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveKeyword(kw)}
                  className="text-neutral-600 hover:text-rose-600 cursor-pointer"
                  aria-label={`Remove ${kw}`}
                >
                  <X className="w-4 h-4" />
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* HTML Content Editor (Reusing TiptapEditor from Product Overview) */}
      <div>
        <label className="block text-sm sm:text-base font-semibold text-neutral-900 mb-2">
          Blog Content (HTML) <span className="text-rose-500">*</span>
        </label>
        <TiptapEditor
          enableTable
          value={content}
          onChange={setContent}
          placeholder="Write or paste your blog article content..."
        />
      </div>

      {/* Submit */}
      <div className="pt-2 flex items-center justify-end gap-3">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-5 py-3 rounded-xl border border-slate-300 text-sm sm:text-base font-semibold text-neutral-900 hover:bg-slate-50 transition cursor-pointer"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-neutral-900 text-white hover:bg-[#c4a574] disabled:opacity-50 text-sm sm:text-base font-bold transition cursor-pointer"
        >
          {submitting ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <Save className="w-5 h-5" />
          )}
          <span>{submitting ? "Saving..." : isEdit ? "Update Blog" : "Publish Blog"}</span>
        </button>
      </div>
    </form>
  );
}
