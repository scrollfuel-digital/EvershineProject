import React, { useMemo, useRef, useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, ChevronLeft } from "lucide-react";
import ProductCard from "../../../components/ui/ProductCard";

export default function CategoryProductSection({ category, products = [], nameMap = null }) {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = useCallback(() => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 6);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 6);
    }
  }, []);

  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, [checkScroll]);

  const handleScroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -scrollRef.current.clientWidth * 0.82 : scrollRef.current.clientWidth * 0.82;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const associatedProducts = useMemo(() => {
    if (!Array.isArray(products) || !category) return [];

    const catId = category.id;
    const catName = (category.name || "").toLowerCase();

    return products.filter((p) => {
      const pCatName = (nameMap?.get(p.categoryId) || p.categoryName || p.category || "").toLowerCase();
      return (
        (catId && p.categoryId === catId) ||
        (catName && pCatName === catName)
      );
    });
  }, [products, category, nameMap]);

  // If no products available for this category, do not render an empty section
  if (associatedProducts.length === 0) return null;

  // Show up to 4 products per category
  const displayProducts = associatedProducts.slice(0, 4);

  return (
    <section className="w-full">
      {/* Category Header: Category name on left, See all on right */}
      <div className="flex items-center justify-between gap-4 pb-4 border-b border-[#c4a574]/30">
        <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 tracking-tight">
          {category.name}
        </h2>

        <Link
          to={`/products?category=${encodeURIComponent(category.name)}`}
          className="group inline-flex items-center gap-1 text-xs sm:text-sm font-semibold text-neutral-900 hover:text-[#c4a574] transition-colors shrink-0"
        >
          <span>See all</span>
          <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>

      {/* Product Container: Horizontal slider on mobile/tab with < > buttons, 4-col grid on desktop */}
      <div className="relative group/carousel pt-4 sm:pt-5">
        {/* Left Arrow Button (mobile/tablet only) */}
        <button
          type="button"
          onClick={() => handleScroll("left")}
          disabled={!canScrollLeft}
          aria-label="Slide previous products"
          className={`absolute -left-2 sm:-left-3.5 top-1/2 -translate-y-1/2 z-20 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white text-slate-800 border border-slate-200 flex items-center justify-center transition-all duration-200 lg:hidden ${
            canScrollLeft
              ? "opacity-100 hover:bg-slate-50 cursor-pointer"
              : "opacity-0 pointer-events-none"
          }`}
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Right Arrow Button (mobile/tablet only) */}
        <button
          type="button"
          onClick={() => handleScroll("right")}
          disabled={!canScrollRight}
          aria-label="Slide next products"
          className={`absolute -right-2 sm:-right-3.5 top-1/2 -translate-y-1/2 z-20 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white text-slate-800 border border-slate-200 flex items-center justify-center transition-all duration-200 lg:hidden ${
            canScrollRight
              ? "opacity-100 hover:bg-slate-50 cursor-pointer"
              : "opacity-0 pointer-events-none"
          }`}
        >
          <ChevronRight className="w-4 h-4" />
        </button>

        {/* 1x4 Grid Layout: 1 + 0.2 peek on mobile phone view, 4-col grid on desktop */}
        <div
          ref={scrollRef}
          onScroll={checkScroll}
          className="grid grid-flow-col auto-cols-[80%] sm:auto-cols-[280px] lg:auto-cols-fr lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 xl:gap-9 overflow-x-auto lg:overflow-visible scroll-smooth snap-x snap-mandatory py-2 px-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        >
          {displayProducts.map((product) => {
            const productSlug = product.slug || product.id;
            return (
              <div
                key={product.id || productSlug}
                className="w-full snap-start"
              >
                <ProductCard
                  product={product}
                  nameMap={nameMap}
                  brandName={nameMap?.get(product.brandId) || product.brand || ""}
                  to={productSlug ? `/products/${productSlug}` : null}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
