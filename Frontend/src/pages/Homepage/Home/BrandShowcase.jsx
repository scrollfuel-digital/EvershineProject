import React, { useRef, useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import jswLogo from "../../../assets/brands/jsw.png";
import tataLogo from "../../../assets/brands/tata.png";
import apolloLogo from "../../../assets/brands/apl.png";
import amnsLogo from "../../../assets/brands/amns.png";
import hindalcoLogo from "../../../assets/brands/hindalco.png";

const brandPartners = [
  {
    id: 1,
    name: "JSW Steel",
    logo: jswLogo,
    brandQuery: "JSW Steel",
    imgClass: "max-h-[50px] sm:max-h-[64px] lg:max-h-[76px] max-w-[85%]",
  },
  {
    id: 2,
    name: "Tata Steel",
    logo: tataLogo,
    brandQuery: "TATA",
    imgClass: "max-h-[54px] sm:max-h-[68px] lg:max-h-[82px] max-w-[75%]",
  },
  {
    id: 3,
    name: "APL Apollo",
    logo: apolloLogo,
    brandQuery: "APL Apollo",
    imgClass: "max-h-[48px] sm:max-h-[60px] lg:max-h-[72px] max-w-[85%]",
  },
  {
    id: 4,
    name: "AM/NS India",
    logo: amnsLogo,
    brandQuery: "AMNS",
    imgClass: "max-h-[44px] sm:max-h-[56px] lg:max-h-[68px] max-w-[92%]",
  },
  {
    id: 5,
    name: "Hindalco",
    logo: hindalcoLogo,
    brandQuery: "Hindalco",
    imgClass: "max-h-[54px] sm:max-h-[68px] lg:max-h-[82px] max-w-[75%]",
  },
];

const displayBrands = [...brandPartners, ...brandPartners];

export default function BrandShowcase() {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  const getSingleStep = useCallback(() => {
    if (!scrollRef.current) return 220;
    const children = scrollRef.current.children;
    if (children.length >= 2) {
      return children[1].offsetLeft - children[0].offsetLeft;
    }
    return (children[0]?.offsetWidth || 200) + 16;
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

  // Automatic smooth scroll 1 single image at a time
  useEffect(() => {
    const timer = setInterval(() => {
      if (isPaused || !scrollRef.current) return;
      const el = scrollRef.current;
      const maxScroll = el.scrollWidth - el.clientWidth;
      if (maxScroll <= 4) return;

      const step = getSingleStep();
      if (el.scrollLeft >= maxScroll - 8) {
        el.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        el.scrollBy({ left: step, behavior: "smooth" });
      }
    }, 2800);

    return () => clearInterval(timer);
  }, [isPaused, getSingleStep]);

  const handleScroll = (direction) => {
    if (scrollRef.current) {
      const step = getSingleStep();
      const scrollAmount = direction === "left" ? -step : step;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section className="py-4 sm:py-6 lg:py-8 bg-[#fabd23]">
      <div className="mx-4 md:mx-[4vw]">
        {/* Brand Container with Arrows */}
        <div
          className="relative group/carousel"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Left Arrow Button */}
          <button
            type="button"
            onClick={() => handleScroll("left")}
            disabled={!canScrollLeft}
            aria-label="Slide previous brands"
            className={`absolute -left-2 sm:-left-3.5 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white text-slate-700 border border-slate-200 flex items-center justify-center shadow-md transition-all duration-200 ${
              canScrollLeft
                ? "opacity-100 hover:bg-slate-50 cursor-pointer"
                : "opacity-0 pointer-events-none"
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Right Arrow Button */}
          <button
            type="button"
            onClick={() => handleScroll("right")}
            disabled={!canScrollRight}
            aria-label="Slide next brands"
            className={`absolute -right-2 sm:-right-3.5 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white text-slate-700 border border-slate-200 flex items-center justify-center shadow-md transition-all duration-200 ${
              canScrollRight
                ? "opacity-100 hover:bg-slate-50 cursor-pointer"
                : "opacity-0 pointer-events-none"
            }`}
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          {/* Brand Slider: Images only with optical sizing & single-image smooth scroll */}
          <div
            ref={scrollRef}
            onScroll={checkScroll}
            onTouchStart={() => setIsPaused(true)}
            onTouchEnd={() => setIsPaused(false)}
            className="flex items-center gap-4 sm:gap-6 lg:gap-8 overflow-x-auto scroll-smooth snap-x snap-mandatory py-2 px-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          >
            {displayBrands.map((brand, idx) => (
              <Link
                key={`${brand.id}-${idx}`}
                to={`/products?brand=${encodeURIComponent(brand.brandQuery || brand.name)}`}
                className="group flex items-center justify-center flex-shrink-0 w-[170px] sm:w-[210px] md:w-[240px] lg:w-[260px] h-20 sm:h-24 lg:h-28 snap-start transition-transform duration-200 hover:scale-105"
              >
                <img
                  src={brand.logo}
                  alt=""
                  className={`w-auto object-contain filter contrast-105 ${brand.imgClass}`}
                  loading="lazy"
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
