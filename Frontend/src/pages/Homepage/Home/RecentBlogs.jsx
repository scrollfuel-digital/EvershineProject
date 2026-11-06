import React, { useRef, useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, ChevronLeft } from "lucide-react";
import BlogCard from "../../../components/ui/BlogCard";

const DUMMY_BLOGS = [
  {
    id: 1,
    image: "https://internal-assets.jswonemsme.com/hr_coil_f73b39fe0f/hr_coil_f73b39fe0f.webp?w=1000",
    title: "Hot rolled coil (HR coil): Grades, sizes & applications",
    category: "MSME",
    date: "23 Oct 2026",
    href: "/blogs",
  },
  {
    id: 2,
    image: "https://internal-assets.jswonemsme.com/CRCA_sheet_e321c0de3a/CRCA_sheet_e321c0de3a.webp?w=1000",
    title: "CRCA sheet: Full form, properties and industrial applications",
    category: "MSME",
    date: "23 Oct 2026",
    href: "/blogs",
  },
  {
    id: 3,
    image: "https://internal-assets.jswonemsme.com/hrpo_steel_06d8caaefa/hrpo_steel_06d8caaefa.webp?w=1000",
    title: "HRPO Steel: Full form, properties and applications",
    category: "MSME",
    date: "23 Oct 2026",
    href: "/blogs",
  },
];

export default function RecentBlogs() {
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
      const scrollAmount =
        direction === "left"
          ? -scrollRef.current.clientWidth * 0.8
          : scrollRef.current.clientWidth * 0.8;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section className="py-6 sm:py-10">
      <div className="mx-4 md:mx-[4vw]">
        {/* Header: Recent blogs on left, See all on right */}
        <div className="flex items-center justify-between gap-4 pb-4 border-b border-slate-200">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Recent blogs
          </h2>

          <Link
            to="/blogs"
            className="group inline-flex items-center gap-1 text-xs sm:text-sm font-semibold text-[#004060] hover:text-[#002840] transition-colors shrink-0"
          >
            <span>See all</span>
            <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        {/* 1x3 Grid Container: horizontal scroller on phone (showing ~1.2 cards), 3-col grid on desktop */}
        <div className="relative group/carousel pt-4 sm:pt-6">
          {/* Left Arrow Button (mobile/tablet only) */}
          <button
            type="button"
            onClick={() => handleScroll("left")}
            disabled={!canScrollLeft}
            aria-label="Slide previous blogs"
            className={`absolute -left-2 sm:-left-3.5 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white text-slate-800 border border-slate-200 shadow-md flex items-center justify-center transition-all duration-200 lg:hidden ${
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
            aria-label="Slide next blogs"
            className={`absolute -right-2 sm:-right-3.5 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white text-slate-800 border border-slate-200 shadow-md flex items-center justify-center transition-all duration-200 lg:hidden ${
              canScrollRight
                ? "opacity-100 hover:bg-slate-50 cursor-pointer"
                : "opacity-0 pointer-events-none"
            }`}
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          {/* 1x3 Grid Layout */}
          <div
            ref={scrollRef}
            onScroll={checkScroll}
            className="grid grid-flow-col auto-cols-[80%] sm:auto-cols-[48%] lg:auto-cols-fr lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 overflow-x-auto lg:overflow-visible scroll-smooth snap-x snap-mandatory py-2 px-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          >
            {DUMMY_BLOGS.map((blog) => (
              <div key={blog.id} className="w-full snap-start">
                <BlogCard blog={blog} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

