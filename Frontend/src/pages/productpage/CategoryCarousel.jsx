import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { categoryListData } from "../../data/categoryListData";

// Shelf edge with animated progress bar
const ShelfEdge = ({ progress = 0 }) => (
  <div className="relative mt-3 mb-8 h-[3px] w-full bg-[#E5E7EB] overflow-hidden rounded-full">
    <div
      className="absolute inset-y-0 left-0 bg-[#004060] transition-all duration-500 ease-out"
      style={{ width: `${Math.max(8, progress)}%` }}
    />
    <div className="absolute inset-0 flex justify-between px-[2px] pointer-events-none">
      {Array.from({ length: 28 }).map((_, i) => (
        <span key={i} className="w-px h-full bg-white/60" />
      ))}
    </div>
  </div>
);

// Individual Category Card matching the user's design
const CategoryCard = ({ item }) => {
  const imageSrc =
    item.images && item.images.length > 0 ? item.images[0] : "/images/no-image.png";

  return (
    <Link to={item.href} className="group flex flex-col items-center">
      {/* Card Box */}
      <div className="relative w-full aspect-square rounded-2xl border border-slate-200/90 bg-white p-3.5 sm:p-4 overflow-hidden shadow-xs transition-all duration-300 ease-out group-hover:-translate-y-1.5 group-hover:border-[#004060] group-hover:shadow-xl group-hover:shadow-[#004060]/10 flex items-center justify-center">
        {/* Subtle Sheen Light Sweep on Hover */}
        <span className="pointer-events-none absolute inset-0 -translate-x-[120%] rotate-12 bg-gradient-to-r from-transparent via-white/70 to-transparent group-hover:translate-x-[120%] transition-transform duration-700 ease-out z-10" />

        {/* Product Image */}
        <img
          src={imageSrc}
          alt={item.label}
          className="w-full h-full object-contain transition-transform duration-500 ease-out group-hover:scale-108"
          loading="lazy"
        />

        {/* Corner Indicator Accent on Hover */}
        <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-[#E3A72F] opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300" />
      </div>

      {/* Label under Card */}
      <h3 className="mt-2.5 text-center w-full px-1 h-8 sm:h-9 flex items-start justify-center">
        <span className="font-['Inter',sans-serif] text-xs sm:text-[13px] font-semibold text-slate-800 group-hover:text-[#004060] transition-colors leading-tight line-clamp-2 block">
          {item.label}
        </span>
      </h3>
    </Link>
  );
};

const VISIBLE_COUNT = 16;
const AUTOPLAY_DELAY = 4000;

export default function CategoryShowcase() {
  const total = categoryListData.length;
  const [startIndex, setStartIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const step = useCallback(
    (dir) => {
      setStartIndex((prev) => (prev + (dir === "next" ? 2 : total - 2)) % total);
    },
    [total]
  );

  useEffect(() => {
    if (isPaused || total === 0) return;
    const interval = setInterval(() => {
      setStartIndex((prev) => (prev + 2) % total);
    }, AUTOPLAY_DELAY);
    return () => clearInterval(interval);
  }, [isPaused, total]);

  // Generate the currently visible items (wrapping around)
  const visibleItems = [];
  for (let i = 0; i < VISIBLE_COUNT; i++) {
    visibleItems.push(categoryListData[(startIndex + i) % total]);
  }

  const progress = total ? (((startIndex % total) + 1) / total) * 100 : 0;

  return (
    <section id="categories" className="bg-[#f8fafc] py-10 sm:py-1 lg:py-2 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header with Actions */}
        <div className="flex items-end justify-between gap-4">
          <div>
            
            <h2 className="font-['Sora',sans-serif] text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0B1729] tracking-tight">
              Browse Categories
            </h2>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {/* Navigation Arrows in Header */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => step("prev")}
                aria-label="Previous categories"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-slate-200 bg-white flex items-center justify-center text-slate-700 hover:text-[#004060] hover:border-[#004060] hover:shadow-xs transition-all duration-200 cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                onClick={() => step("next")}
                aria-label="Next categories"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-slate-200 bg-white flex items-center justify-center text-slate-700 hover:text-[#004060] hover:border-[#004060] hover:shadow-xs transition-all duration-200 cursor-pointer"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            <Link
              to="/all-categories"
              className="group hidden sm:inline-flex items-center gap-1.5 font-['Inter',sans-serif] text-xs sm:text-sm font-bold text-[#004060] hover:text-[#E3A72F] transition-colors pl-2"
            >
              <span>View all</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        {/* Shelf Edge Progress Line */}
        <ShelfEdge progress={progress} />

        {/* Cards Grid: Full width on mobile without side buttons crowding */}
        <div
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3 sm:gap-4 py-1">
            {visibleItems.map((item, index) => (
              <CategoryCard
                key={`${item.href}-${index}`}
                item={item}
              />
            ))}
          </div>
        </div>

        {/* Mobile View All Link */}
        <div className="mt-6 text-center sm:hidden">
          <Link
            to="/all-categories"
            className="inline-flex items-center gap-2 text-xs font-bold text-[#004060] bg-white border border-slate-200 rounded-lg px-5 py-2.5 shadow-xs hover:border-[#004060]"
          >
            <span>View All Categories</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
