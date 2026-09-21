import { useState, useMemo, useCallback, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { categoryListData as defaultCategories } from "../../data/categoryListData";

/**
 * Top sub-category slider with pinned Accessories card and continuous sliding categories.
 *
 * @param {Array} categories - List of categories with labels, hrefs, and images
 * @param {string|null} selectedSubCategory - Label of the currently active sub-category
 * @param {Function} onSubCategoryClick - Handler called when a category card is clicked
 */
export default function CategoryCarousel({
  categories = defaultCategories,
  selectedSubCategory = null,
  onSubCategoryClick = () => {}
}) {
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [isCarouselPaused, setIsCarouselPaused] = useState(false);

  // Separate Accessories (pinned) from sliding sub-categories
  const accessoriesItem = useMemo(() => {
    return (
      categories.find(item => item.label.toLowerCase().includes('accessories')) ||
      categories[0]
    );
  }, [categories]);

  const slidingList = useMemo(() => {
    return categories.filter(
      item => !item.label.toLowerCase().includes('accessories')
    );
  }, [categories]);

  const totalSliding = slidingList.length;

  const handleNextSubCategory = useCallback(() => {
    if (totalSliding === 0) return;
    setCarouselIndex(prev => (prev + 1) % totalSliding);
  }, [totalSliding]);

  const handlePrevSubCategory = useCallback(() => {
    if (totalSliding === 0) return;
    setCarouselIndex(prev => (prev - 1 + totalSliding) % totalSliding);
  }, [totalSliding]);

  // Autoplay interval
  useEffect(() => {
    if (isCarouselPaused || totalSliding === 0) return;
    const interval = setInterval(() => {
      handleNextSubCategory();
    }, 2800);
    return () => clearInterval(interval);
  }, [isCarouselPaused, handleNextSubCategory, totalSliding]);

  // Compute 7 visible sliding categories next to Accessories
  const visibleSliding = useMemo(() => {
    if (totalSliding === 0) return [];
    const items = [];
    const count = Math.min(7, totalSliding);
    for (let i = 0; i < count; i++) {
      const idx = (carouselIndex + i) % totalSliding;
      items.push({ ...slidingList[idx], originalIndex: idx });
    }
    return items;
  }, [carouselIndex, totalSliding, slidingList]);

  return (
    <section className="mb-8 relative">
      <div
        className="flex items-center gap-3"
        onMouseEnter={() => setIsCarouselPaused(true)}
        onMouseLeave={() => setIsCarouselPaused(false)}
      >
        {/* Prev Arrow */}
        <button
          onClick={handlePrevSubCategory}
          aria-label="Previous categories"
          className="w-9 h-9 shrink-0 rounded-full border border-slate-200 bg-white shadow-sm flex items-center justify-center text-slate-700 hover:border-teal-600 hover:text-teal-600 hover:shadow-md transition duration-200 cursor-pointer"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Cards Slider Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 flex-1 overflow-hidden py-1">
          {/* Pinned Accessories Card */}
          {accessoriesItem && (() => {
            const isActive = selectedSubCategory === accessoriesItem.label;
            const accImg = accessoriesItem.images && accessoriesItem.images[0] ? accessoriesItem.images[0] : '';
            return (
              <div
                key="pinned-accessories"
                onClick={() => onSubCategoryClick(accessoriesItem)}
                className={`
                  bg-white rounded-2xl p-3 flex flex-col items-center 
                  cursor-pointer transition-all duration-300 relative border group select-none
                  ${isActive
                    ? 'border-teal-500 shadow-lg shadow-teal-500/10 ring-2 ring-teal-500/20 scale-[1.02]'
                    : 'border-slate-200 hover:border-teal-500 hover:-translate-y-1 hover:shadow-md'
                  }
                `}
              >
                {isActive && (
                  <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-amber-400 rounded-full ring-2 ring-white z-10" />
                )}

                <div className="w-full h-24 bg-slate-100 rounded-xl flex items-center justify-center overflow-hidden mb-2">
                  {accImg ? (
                    <img
                      src={accImg}
                      alt={accessoriesItem.label}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300 rounded-xl"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-400 font-bold text-xs">
                      {accessoriesItem.label.slice(0, 2).toUpperCase()}
                    </div>
                  )}
                </div>

                <span
                  className={`text-xs font-semibold text-center leading-tight line-clamp-2 transition-colors ${
                    isActive ? 'text-teal-600' : 'text-slate-700 group-hover:text-teal-600'
                  }`}
                >
                  {accessoriesItem.label}
                </span>
              </div>
            );
          })()}

          {/* Remaining Sliding 7 Categories */}
          {visibleSliding.map((cat, index) => {
            const isActive =
              selectedSubCategory === cat.label ||
              (selectedSubCategory?.toLowerCase().includes('angle') && cat.label.toLowerCase().includes('angle'));
            const catImage = cat.images && cat.images[0] ? cat.images[0] : '';

            return (
              <div
                key={`${cat.href}-${cat.originalIndex}-${index}`}
                onClick={() => onSubCategoryClick(cat)}
                className={`
                  bg-white rounded-2xl p-3 flex flex-col items-center 
                  cursor-pointer transition-all duration-300 relative border group select-none
                  ${isActive
                    ? 'border-teal-500 shadow-lg shadow-teal-500/10 ring-2 ring-teal-500/20 scale-[1.02]'
                    : 'border-slate-200 hover:border-teal-500 hover:-translate-y-1 hover:shadow-md'
                  }
                `}
              >
                {isActive && (
                  <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-amber-400 rounded-full ring-2 ring-white z-10" />
                )}

                <div className="w-full h-24 bg-slate-100 rounded-xl flex items-center justify-center overflow-hidden mb-2">
                  {catImage ? (
                    <img
                      src={catImage}
                      alt={cat.label}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300 rounded-xl"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-400 font-bold text-xs">
                      {cat.label.slice(0, 2).toUpperCase()}
                    </div>
                  )}
                </div>

                <span
                  className={`text-xs font-semibold text-center leading-tight line-clamp-2 transition-colors ${
                    isActive ? 'text-teal-600' : 'text-slate-700 group-hover:text-teal-600'
                  }`}
                >
                  {cat.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* Next Arrow */}
        <button
          onClick={handleNextSubCategory}
          aria-label="Next categories"
          className="w-9 h-9 shrink-0 rounded-full border border-slate-200 bg-white shadow-sm flex items-center justify-center text-slate-700 hover:border-teal-600 hover:text-teal-600 hover:shadow-md transition duration-200 cursor-pointer"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </section>
  );
}
