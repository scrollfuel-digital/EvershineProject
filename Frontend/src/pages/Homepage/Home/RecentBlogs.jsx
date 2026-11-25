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
    date: "23 Nov 2026",
    href: "/blogs/hot-rolled-coil-hr-coil-grades-sizes-applications",
  },
  {
    id: 2,
    image: "https://internal-assets.jswonemsme.com/buy_tmt_bars_online_4113850e86/buy_tmt_bars_online_4113850e86.webp?w=1000",
    title: "Buy TMT bars online in India: Fe 500 & Fe 550 grade guide",
    category: "MSME",
    date: "23 Nov 2026",
    href: "/blogs/buy-tmt-bars-online-in-india-fe-500-fe-550-grade-guide",
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

let cachedRecentBlogs = null;

export default function RecentBlogs() {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [blogsList, setBlogsList] = useState(() => cachedRecentBlogs || DUMMY_BLOGS);

  useEffect(() => {
    if (cachedRecentBlogs) return;

    let isMounted = true;
    async function fetchRecentBlogs() {
      try {
        const res = await fetch(
          "https://evershine-backend-1.onrender.com/api/blogs?pageNo=0&size=3&sortBy=createdAt&sortDir=desc",
          { headers: { accept: "*/*" } }
        );
        if (res.ok) {
          const data = await res.json();
          if (isMounted && Array.isArray(data.content) && data.content.length > 0) {
            const formatted = data.content.map((b, idx) => ({
              id: b.slug || idx,
              image: b.imageUrl,
              title: b.title,
              category: "MSME",
              date: b.createdAt
                ? new Date(b.createdAt).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })
                : "Recent",
              href: `/blogs/${b.slug}`,
            }));
            cachedRecentBlogs = formatted;
            setBlogsList(formatted);
          }
        }
      } catch {
        // Fallback to DUMMY_BLOGS
      }
    }
    fetchRecentBlogs();
    return () => {
      isMounted = false;
    };
  }, []);

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
    <section className="my-8 sm:my-12 mx-4 md:mx-[4vw]">
      <div
        className="relative rounded-2xl sm:rounded-3xl lg:rounded-[2.5rem] py-6 sm:py-8 lg:py-10 px-4 sm:px-6 lg:px-8 text-neutral-900 overflow-hidden border border-[#c4a574]/35"
        style={{ backgroundColor: "#fdf8ef" }}
      >
        {/* Header: Recent blogs on left, See all on right */}
        <div className="flex items-center justify-between gap-4 pb-4 border-b border-[#c4a574]/30">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900">
            Recent blogs
          </h2>

          <Link
            to="/blogs"
            className="group inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-neutral-900 hover:text-[#c4a574] bg-white/80 hover:bg-white px-3.5 py-1.5 rounded-full border border-[#c4a574]/40 transition-all shrink-0"
          >
            <span>See all</span>
            <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 text-[#c4a574]" />
          </Link>
        </div>

        {/* 1x3 Grid Container: horizontal scroller on phone, 3-col grid on desktop */}
        <div className="relative group/carousel pt-5 sm:pt-6">
          {/* Left Arrow Button (mobile/tablet only) */}
          <button
            type="button"
            onClick={() => handleScroll("left")}
            disabled={!canScrollLeft}
            aria-label="Slide previous blogs"
            className={`absolute -left-2 sm:-left-3.5 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white text-slate-800 border border-slate-200 flex items-center justify-center transition-all duration-200 lg:hidden ${
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
            className={`absolute -right-2 sm:-right-3.5 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white text-slate-800 border border-slate-200 flex items-center justify-center transition-all duration-200 lg:hidden ${
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
            className="grid grid-flow-col auto-cols-[85%] sm:auto-cols-[48%] lg:auto-cols-fr lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 overflow-x-auto lg:overflow-visible scroll-smooth snap-x snap-mandatory py-2 px-0.5 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          >
            {blogsList.map((blog) => (
              <div key={blog.id} className="w-full snap-start">
                <BlogCard
                  blog={blog}
                  className="bg-white rounded-2xl p-3.5 sm:p-4 transition-all duration-300 border border-[#004060]/15 h-full"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
