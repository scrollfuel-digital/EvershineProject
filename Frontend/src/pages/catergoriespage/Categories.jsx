import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { categoryListData, brands } from "../../data/categoryListData";

const ShelfEdge = ({ progress = 0 }) => (
    <div className="relative mt-4 mb-10 h-[3px] w-full bg-[#E7E5DE] overflow-hidden rounded-full">
        <div
            className="absolute inset-y-0 left-0 bg-[#0F766E] transition-[width] duration-500 ease-out"
            style={{ width: `${progress}%` }}
        />
        <div className="absolute inset-0 flex justify-between px-[2px]">
            {Array.from({ length: 24 }).map((_, i) => (
                <span key={i} className="w-px h-full bg-[#FAFAF7]/70" />
            ))}
        </div>
    </div>
);

const SectionHeader = ({ title, onViewAll, progress }) => (
    <div>
        <div className="flex items-end justify-between">
            <div>
                <h2 className="font-['Sora',sans-serif] text-3xl md:text-4xl font-semibold text-[#14152B] mt-2">
                    {title}
                </h2>
            </div>

            {onViewAll && (
                <button
                    onClick={onViewAll}
                    className="group hidden sm:inline-flex items-center gap-2 font-['Inter',sans-serif] text-sm font-medium text-[#14152B] hover:text-[#0F766E] transition-colors"
                >
                    View all
                    <svg
                        width="16" height="16" viewBox="0 0 16 16" fill="none"
                        className="transition-transform group-hover:translate-x-1"
                    >
                        <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
            )}
        </div>
        <ShelfEdge progress={progress} />
    </div>
);

const NavArrow = ({ direction, onClick, label }) => (
    <button
        aria-label={label}
        onClick={onClick}
        className="w-9 h-9 shrink-0 rounded-full border border-[#E7E5DE] bg-white flex items-center justify-center
                   text-[#14152B] hover:border-[#0F766E] hover:text-[#0F766E] hover:shadow-[0_0_0_4px_rgba(15,118,110,0.08)]
                   focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#0F766E] focus-visible:outline-offset-2
                   transition-all duration-200"
    >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
                d={direction === "prev" ? "M10 3L5 8l5 5" : "M6 3l5 5-5 5"}
                stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"
            />
        </svg>
    </button>
);
const AnimatedLabel = ({ children, className = "" }) => (
    <span className={`relative inline-block ${className}`}>
        <span className="inline-block transition-transform duration-300 ease-out group-hover:-translate-y-0.5">
            {children}
        </span>
        <span
            className="absolute left-1/2 -bottom-0.5 h-[1.5px] bg-[#0F766E] rounded-full
                       w-0 group-hover:w-full -translate-x-1/2
                       transition-[width] duration-300 ease-out"
        />
    </span>
);

const CategoryCard = ({ item }) => (
    <Link to={item.href} className="group">
        <div className="relative bg-white border border-[#E7E5DE] rounded-2xl p-4 overflow-hidden
                       transition-all duration-300 ease-out
                       group-hover:-translate-y-1.5 group-hover:scale-[1.03]
                       group-hover:border-[#0F766E]
                       group-hover:shadow-[0_16px_28px_-14px_rgba(20,21,43,0.28)]">
            <span className="pointer-events-none absolute inset-0 -translate-x-[120%] rotate-12
                             bg-gradient-to-r from-transparent via-white/60 to-transparent
                             group-hover:translate-x-[120%] transition-transform duration-700 ease-out" />
            <img
                src={item.images.length ? item.images[0] : "/images/no-image.png"}
                alt={item.label}
                className="relative w-full h-24 object-contain transition-transform duration-500 ease-out group-hover:scale-110"
            />
            <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-[#F2B807]
                             opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-100
                             transition-all duration-300" />
        </div>
        <h3 className="text-center mt-3">
            <AnimatedLabel className="font-['Inter',sans-serif] text-sm font-medium text-[#14152B] group-hover:text-[#0F766E] transition-colors leading-5">
                {item.label}
            </AnimatedLabel>
        </h3>
    </Link>
);

const Categories = () => {
    const navigate = useNavigate();
    const accessories = categoryListData[0];
    const slidingData = categoryListData.slice(1);

    const total = slidingData.length;
    const [startIndex, setStartIndex] = useState(0);
    const [paused, setPaused] = useState(false);

    useEffect(() => {
        if (paused || total === 0) return;
        const interval = setInterval(() => {
            setStartIndex((prev) => (prev + 1) % total);
        }, 2800);
        return () => clearInterval(interval);
    }, [paused, total]);

    const visibleSliding = [];
    for (let i = 0; i < 7; i++) {
        visibleSliding.push(slidingData[(startIndex + i) % total]);
    }

    const step = (dir) => {
        setStartIndex((prev) => (prev + (dir === "next" ? 1 : total - 1)) % total);
    };

    const progress = total ? (startIndex / total) * 100 : 0;

    return (
        <>
            <section className="bg-[#FAFAF7] pt-[110px] sm:pt-[130px] lg:pt-[140px] pb-8">
                <div className="max-w-7xl mx-auto px-4">

                    <SectionHeader
                        title="Browse categories"
                        progress={progress}
                        onViewAll={() => navigate("/all-categories")}
                    />

                    <div
                        className="flex items-center gap-4"
                        onMouseEnter={() => setPaused(true)}
                        onMouseLeave={() => setPaused(false)}
                    >
                        <NavArrow direction="prev" label="Previous categories" onClick={() => step("prev")} />

                        <div className="grid grid-cols-4 sm:grid-cols-4 lg:grid-cols-8 gap-4 flex-1 overflow-visible pt-3 pb-4">
                            {/* Accessories — always pinned */}
                            <CategoryCard item={accessories} />

                            {/* Sliding 7 slots — one by one */}
                            {visibleSliding.map((item, index) => (
                                <CategoryCard key={`${item.href}-${startIndex}-${index}`} item={item} />
                            ))}
                        </div>

                        <NavArrow direction="next" label="Next categories" onClick={() => step("next")} />
                    </div>
                </div>
            </section>

            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4">

                    <SectionHeader
                        title="Top brands"
                        progress={100}
                    />

                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
                        {brands.map((brand) => (
                            <div key={brand.id} className="text-center group cursor-pointer">
                                <div className="relative w-28 h-28 mx-auto rounded-full border border-[#E7E5DE] bg-[#FAFAF7] flex items-center justify-center transition-all duration-300 group-hover:border-[#0F766E] group-hover:shadow-[0_0_0_6px_rgba(15,118,110,0.1)]">
                                    {brand.image ? (
                                        <img
                                            src={brand.image}
                                            alt={brand.name}
                                            className="w-16 h-16 object-contain transition-all duration-300 group-hover:scale-110"
                                        />
                                    ) : (
                                        <span className="font-semibold text-sm text-[#14152B] group-hover:text-[#0F766E] transition-colors px-2 text-center leading-5">
                                            {brand.name}
                                        </span>
                                    )}
                                </div>
                                <h3 className="mt-4">
                                    <AnimatedLabel className="font-['Inter',sans-serif] text-sm font-medium text-[#14152B] group-hover:text-[#0F766E] transition-colors">
                                        {brand.name}
                                    </AnimatedLabel>
                                </h3>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
};

export default Categories;