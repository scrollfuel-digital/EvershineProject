import React from "react";
import { useNavigate } from "react-router-dom";
import { SlidersHorizontal, RotateCcw, Loader2 } from "lucide-react";
import ProductCard from "../../../components/ui/ProductCard";

export default function ProductGrid({
  productsLoading = false,
  productsCount = 0,
  productsError = null,
  onRetry,
  filteredCount = 0,
  hasActiveFilters = false,
  onClearFilters,
  currentProducts = [],
  nameMap = null,
}) {
  const navigate = useNavigate();

  if (productsLoading && productsCount === 0) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 p-16 text-center shadow-xs space-y-4">
        <Loader2 className="w-10 h-10 animate-spin text-[#004060] mx-auto" />
        <h3 className="text-lg font-bold text-slate-800">Loading active products...</h3>
        <p className="text-sm text-slate-400">Fetching live products from backend catalogue</p>
      </div>
    );
  }

  if (productsError && productsCount === 0) {
    return (
      <div className="bg-white rounded-2xl border border-red-200 p-12 text-center shadow-xs space-y-4">
        <h3 className="text-lg font-bold text-slate-800">Unable to load products</h3>
        <p className="text-sm text-slate-500">{productsError}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="px-5 py-2 bg-[#004060] text-white rounded-xl text-sm font-semibold hover:bg-[#003350] transition cursor-pointer"
          >
            Retry
          </button>
        )}
      </div>
    );
  }

  if (filteredCount === 0) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center shadow-xs">
        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-[#004060]">
          <SlidersHorizontal className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-bold text-slate-900 mb-2 font-display">
          No matching products
        </h3>
        <p className="text-sm text-slate-500 mb-6 max-w-md mx-auto leading-relaxed">
          {hasActiveFilters
            ? "No products match your currently selected filters. Try unchecking some filters or clearing all to view all available products."
            : "No active products are currently available in the catalogue."}
        </p>
        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className="px-6 py-2.5 bg-[#004060] hover:bg-[#003350] text-white font-semibold rounded-xl transition shadow-xs cursor-pointer inline-flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Clear all filters</span>
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-6">
      {currentProducts.map((product) => {
        const productSlug = product.slug || product.id;
        return (
          <ProductCard
            key={product.id}
            product={product}
            nameMap={nameMap}
            brandName={nameMap?.get(product.brandId) || product.brand || ""}
            to={productSlug ? `/products/${productSlug}` : null}
            onClick={() => {
              if (productSlug) {
                navigate(`/products/${productSlug}`);
              }
            }}
          />
        );
      })}
    </div>
  );
}

