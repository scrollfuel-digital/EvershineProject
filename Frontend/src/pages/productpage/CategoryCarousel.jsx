import React from "react";
import { Link } from "react-router-dom";
import { categoryListData } from "../../data/categoryListData";

// Individual Category Card matching the user's design
const CategoryCard = ({ item, isSelected, onClick }) => {
  const imageSrc =
    item.images && item.images.length > 0 ? item.images[0] : "/images/no-image.png";

  const handleClick = (e) => {
    if (onClick) {
      e.preventDefault();
      onClick(item);
    }
  };

  return (
    <Link
      to={item.href}
      onClick={handleClick}
      className="group flex flex-col items-center cursor-pointer w-full"
    >
      {/* Card Box */}
      <div
        className={`relative w-full aspect-square rounded-xl sm:rounded-2xl border ${
          isSelected
            ? "border-[#004060] bg-blue-50/40 ring-2 ring-[#004060]/20 shadow-md"
            : "border-slate-200/90 bg-white shadow-xs hover:border-[#004060] hover:shadow-lg hover:shadow-[#004060]/10"
        } p-2 sm:p-2.5 overflow-hidden transition-all duration-300 ease-out group-hover:-translate-y-1 flex items-center justify-center`}
      >
        {/* Subtle Sheen Light Sweep on Hover */}
        <span className="pointer-events-none absolute inset-0 -translate-x-[120%] rotate-12 bg-gradient-to-r from-transparent via-white/70 to-transparent group-hover:translate-x-[120%] transition-transform duration-700 ease-out z-10" />

        {/* Product Image */}
        <img
          src={imageSrc}
          alt={item.label}
          className="w-full h-full object-contain transition-transform duration-500 ease-out group-hover:scale-108"
          loading="lazy"
        />

        {/* Active / Hover Corner Indicator Accent */}
        <span
          className={`absolute top-2 right-2 w-2 h-2 rounded-full transition-all duration-300 ${
            isSelected
              ? "bg-[#004060] opacity-100 scale-100"
              : "bg-[#E3A72F] opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-100"
          }`}
        />
      </div>

      {/* Label under Card */}
      <h3 className="mt-2 text-center w-full px-0.5 min-h-[30px] flex items-start justify-center">
        <span
          className={`font-['Inter',sans-serif] text-[11px] sm:text-xs leading-tight line-clamp-2 block transition-colors ${
            isSelected
              ? "font-bold text-[#004060]"
              : "font-semibold text-slate-800 group-hover:text-[#004060]"
          }`}
        >
          {item.label}
        </span>
      </h3>
    </Link>
  );
};

export default function CategoryCarousel({
  categories = categoryListData,
  selectedSubCategory = null,
  onSubCategoryClick = null,
}) {
  const allCategories = categories && categories.length > 0 ? categories : categoryListData;

  return (
    <section id="categories" className="bg-[#f8fafc] py-4 sm:py-5  mb-6 rounded-2xl">
      <div className="max-w-7xl mx-auto px-2 sm:px-4">
        {/* Static Grid: 3 rows, 9 cards in one row on desktop */}
        <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-9 gap-2.5 sm:gap-3 py-1">
          {allCategories.map((item, index) => (
            <CategoryCard
              key={`${item.href || item.label}-${index}`}
              item={item}
              isSelected={selectedSubCategory === item.label}
              onClick={onSubCategoryClick}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
