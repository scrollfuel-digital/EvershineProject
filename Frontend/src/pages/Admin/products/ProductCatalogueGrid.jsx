import React, { useState, useEffect, useMemo, useCallback } from "react";
import { RotateCcw, ChevronLeft, ChevronRight, Package, Loader2, Edit3, Trash2 } from "lucide-react";
import { fetchLightProducts } from "../../../services/productService";
import { useDataProcess } from "./dataProccess";
import ProductCard from "../../../components/ui/ProductCard";
import ProductFilterBar from "./ProductFilterBar";

export default function ProductCatalogueGrid({
  pageSize = 15,
  title = "Product Catalogue",
  description = "Browse live products, specifications, and brand associations.",
  onUpdateProduct = null,
  onDeleteProduct = null,
  loadingId = null,
  showAdminActions = false,
}) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedVariant, setSelectedVariant] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedSubBrand, setSelectedSubBrand] = useState("");
  const [selectedGrade, setSelectedGrade] = useState("");
  const [selectedSubGrade, setSelectedSubGrade] = useState("");
  const [currentPage, setCurrentPage] = useState(0);

  // Name map from dataProccess for product card label display
  const { nameMap } = useDataProcess();

  const handleCategoryChange = (catId) => {
    setSelectedCategory(catId);
    setSelectedType("");
    setSelectedVariant("");
  };

  const handleTypeChange = (typeId) => {
    setSelectedType(typeId);
    setSelectedVariant("");
  };

  // Load products
  const loadProducts = useCallback(async (force = false) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchLightProducts(force);
      setProducts(data);
    } catch (err) {
      setError(err.message || "Failed to load products");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  // Reset page when any filter changes
  useEffect(() => {
    setCurrentPage(0);
  }, [
    searchQuery,
    selectedCategory,
    selectedType,
    selectedVariant,
    selectedBrand,
    selectedSubBrand,
    selectedGrade,
    selectedSubGrade,
  ]);

  // Filter products by all 7 hierarchy attributes + multi-field search
  const filteredProducts = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    const queryTokens = q ? q.split(/\s+/).filter(Boolean) : [];

    return products.filter((p) => {
      // 1. Category Filter
      if (selectedCategory && p.categoryId !== selectedCategory) return false;

      // 2. Category Type Filter (cascaded)
      if (selectedType && p.categoryTypeId !== selectedType) return false;

      // 3. Category Variant Filter (cascaded)
      if (selectedVariant && p.categoryVariantId !== selectedVariant) return false;

      // 4. Brand Filter
      if (selectedBrand && p.brandId !== selectedBrand) return false;

      // 5. Sub-Brand Filter
      if (selectedSubBrand && p.subBrandId !== selectedSubBrand) return false;

      // 6. Grade Filter
      if (selectedGrade && p.gradeId !== selectedGrade) return false;

      // 7. Sub-Grade Filter
      if (selectedSubGrade && p.subGradeId !== selectedSubGrade) return false;

      // Search Query Filter (Title, Brand Name, Slug, Category, Attributes)
      if (queryTokens.length > 0) {
        const titleStr = p.title?.toLowerCase() || "";
        const slugStr = p.slug?.toLowerCase() || "";
        const brandStr = nameMap?.get(p.brandId)?.toLowerCase() || "";
        const categoryStr = nameMap?.get(p.categoryId)?.toLowerCase() || "";
        const attributesStr = Array.isArray(p.attributes)
          ? p.attributes
              .map((a) => `${a.label || ""} ${a.min || ""} ${a.max || ""} ${a.unit || ""}`)
              .join(" ")
              .toLowerCase()
          : "";

        const searchableText = `${titleStr} ${slugStr} ${brandStr} ${categoryStr} ${attributesStr}`;
        const matchesAllTokens = queryTokens.every((token) => searchableText.includes(token));
        if (!matchesAllTokens) return false;
      }

      return true;
    });
  }, [
    products,
    searchQuery,
    selectedCategory,
    selectedType,
    selectedVariant,
    selectedBrand,
    selectedSubBrand,
    selectedGrade,
    selectedSubGrade,
    nameMap,
  ]);

  // Chunk filtered products into an array of pages (array of arrays, 15 items per index)
  const pages = useMemo(() => {
    const chunks = [];
    for (let i = 0; i < filteredProducts.length; i += pageSize) {
      chunks.push(filteredProducts.slice(i, i + pageSize));
    }
    return chunks;
  }, [filteredProducts, pageSize]);

  // Products for the currently selected page
  const currentProducts = useMemo(() => {
    if (pages.length === 0) return [];
    return pages[currentPage] || pages[0] || [];
  }, [pages, currentPage]);

  const hasFilters = Boolean(
    searchQuery ||
    selectedCategory ||
    selectedType ||
    selectedVariant ||
    selectedBrand ||
    selectedSubBrand ||
    selectedGrade ||
    selectedSubGrade
  );

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("");
    setSelectedType("");
    setSelectedVariant("");
    setSelectedBrand("");
    setSelectedSubBrand("");
    setSelectedGrade("");
    setSelectedSubGrade("");
    setCurrentPage(0);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-[0_1px_3px_rgba(0,0,0,0.05)] space-y-5">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div>
          <h2 className="text-base sm:text-lg font-bold text-slate-900 font-display flex items-center gap-2">
            <Package className="w-5 h-5 text-[#004060]" />
            <span>{title}</span>
            <span className="text-sm font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600">
              {filteredProducts.length}
            </span>
          </h2>
        </div>

        <div className="flex items-center gap-2">
          {hasFilters && (
            <button
              type="button"
              onClick={handleResetFilters}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-sm text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Filters</span>
            </button>
          )}
        </div>
      </div>

      {/* Reusable Common Filter Bar */}
      <ProductFilterBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
        selectedType={selectedType}
        onTypeChange={handleTypeChange}
        selectedVariant={selectedVariant}
        onVariantChange={setSelectedVariant}
        selectedBrand={selectedBrand}
        onBrandChange={setSelectedBrand}
        selectedSubBrand={selectedSubBrand}
        onSubBrandChange={setSelectedSubBrand}
        selectedGrade={selectedGrade}
        onGradeChange={setSelectedGrade}
        selectedSubGrade={selectedSubGrade}
        onSubGradeChange={setSelectedSubGrade}
        onResetFilters={handleResetFilters}
        hasFilters={hasFilters}
      />

      {/* Error Alert */}
      {error && (
        <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-sm text-rose-800 flex items-center justify-between">
          <span>{error}</span>
          <button type="button" onClick={() => loadProducts(true)} className="font-bold underline cursor-pointer">
            Retry
          </button>
        </div>
      )}

      {/* Loading State */}
      {loading && products.length === 0 ? (
        <div className="py-16 text-center text-sm text-slate-500 flex items-center justify-center gap-2">
          <Loader2 className="w-5 h-5 animate-spin text-[#004060]" />
          <span>Loading catalogue products...</span>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="py-14 text-center text-sm text-slate-500">
          {hasFilters ? "No products found matching your filters." : "No products available in catalogue."}
        </div>
      ) : (
        <>
          {/* Product Cards Grid (Displays current page products) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {currentProducts.map((product) => {
              const brandName = nameMap?.get(product.brandId) || "—";
              const categoryName = nameMap?.get(product.categoryId) || "";
              const hasAdminActions = showAdminActions || Boolean(onUpdateProduct || onDeleteProduct);

              const actionButton = hasAdminActions ? (
                <div className="flex items-center gap-2 w-full justify-between">
                  {onUpdateProduct && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onUpdateProduct(product.id, product);
                      }}
                      disabled={loadingId === product.id}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg text-xs font-semibold bg-[#004060] hover:bg-[#003049] text-white transition-colors disabled:opacity-60 cursor-pointer shadow-2xs"
                    >
                      {loadingId === product.id ? (
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      ) : (
                        <Edit3 className="w-3.5 h-3.5" />
                      )}
                      <span>Update</span>
                    </button>
                  )}
                  {onDeleteProduct && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteProduct(product.id, product);
                      }}
                      disabled={loadingId === product.id}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg text-xs font-semibold bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200 transition-colors disabled:opacity-60 cursor-pointer shadow-2xs"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Delete</span>
                    </button>
                  )}
                </div>
              ) : null;

              return (
                <ProductCard
                  key={product.id}
                  product={product}
                  brandName={brandName}
                  categoryName={categoryName}
                  actionButton={actionButton}
                />
              );
            })}
          </div>

          {/* Real Pagination Controls */}
          {pages.length > 0 && (
            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm">
              <span className="text-slate-600">
                Page <strong className="text-slate-900">{currentPage + 1}</strong> of{" "}
                <strong className="text-slate-900">{pages.length}</strong> ({filteredProducts.length} items total)
              </span>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setCurrentPage((p) => Math.max(0, p - 1))}
                  disabled={currentPage === 0}
                  className="p-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                  title="Previous Page"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                {pages.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setCurrentPage(idx)}
                    className={`w-8 h-8 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
                      currentPage === idx
                        ? "bg-[#004060] text-white shadow-xs"
                        : "border border-slate-200 text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    {idx + 1}
                  </button>
                ))}

                <button
                  type="button"
                  onClick={() => setCurrentPage((p) => Math.min(pages.length - 1, p + 1))}
                  disabled={currentPage >= pages.length - 1}
                  className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                  title="Next Page"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
