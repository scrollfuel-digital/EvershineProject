import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ChevronRight, 
  ChevronLeft,
  ChevronDown, 
  ChevronUp, 
  SlidersHorizontal, 
  Truck, 
  X, 
  ShoppingCart, 
  CheckCircle,
  RotateCcw
} from 'lucide-react';
import { categoryListData } from '../../data/categoryListData';
import tileProfileImg from '../../assets/Untitleddesign/12.png';
import turboVentilatorsImg from '../../assets/Untitleddesign/13.png';
import xlpeImg from '../../assets/Untitleddesign/14.png';
import zPurlinImg from '../../assets/Untitleddesign/15.png';

// Steel Grades from Reference Image 3
const GRADES_LIST = [
  'EN 10025',
  'G3134:1991',
  'IS 513:2017',
  'IS 11513:2017',
  'J403:2014',
  '10149:2:2005',
  'JIS G3444:1991',
  'IS 5986:2017',
  'BSK46',
  'IS 2062:2011',
  'IS 1079:2017'
];

// Sample Product Items matching Reference Image 3
const SAMPLE_PRODUCTS = [
  {
    id: 1,
    title: 'One Helix Hot Rolled Sheets IS 2062:2011 E250BR',
    brand: 'One Helix',
    category: 'MS Hot rolled',
    grade: 'IS 2062:2011',
    specs: {
      thickness: '1.6 - 10 mm',
      length: '2500 - 6300 mm',
      width: '1250 - 1500 mm'
    },
    delivery: 'Delivery same day, next day',
    img: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=500&auto=format&fit=crop&q=80'
  },
  {
    id: 2,
    title: 'JSW Steel Hot Rolled Sheets IS 2062:2011 E250A',
    brand: 'JSW Steel',
    category: 'MS Hot rolled',
    grade: 'IS 2062:2011',
    specs: {
      thickness: '1.6 - 25 mm',
      length: '2000 - 12000 mm',
      width: '900 - 2000 mm'
    },
    delivery: 'Delivery in 2 - 5 days',
    img: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=500&auto=format&fit=crop&q=80'
  },
  {
    id: 3,
    title: 'JSW Steel Hot Rolled Coils IS 10748:2004 GR1',
    brand: 'JSW Steel',
    category: 'MS Hot rolled',
    grade: 'IS 1079:2017',
    specs: {
      thickness: '1.6 - 25 mm',
      length: 'Coil Format',
      width: '1250 - 2000 mm'
    },
    delivery: 'Delivery in 2 - 5 days',
    img: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=500&auto=format&fit=crop&q=80'
  },
  {
    id: 4,
    title: 'Evershine Structural Composite Decking Sheet 1.0mm',
    brand: 'Evershine',
    category: 'Deck Sheet',
    grade: 'EN 10025',
    specs: {
      thickness: '0.8 - 1.2 mm',
      length: 'Up to 12000 mm',
      width: '960 mm Effective'
    },
    delivery: 'Delivery same day, next day',
    img: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=500&auto=format&fit=crop&q=80'
  },
  {
    id: 5,
    title: 'Evershine Metallic Red Steel Tile Profile Roofing Sheet',
    brand: 'Evershine',
    category: 'Tile Profile',
    subCategory: 'Tile Profile',
    grade: 'G3134:1991',
    specs: {
      thickness: '0.45 - 0.60 mm',
      length: 'Cut to order (Up to 12m)',
      width: '1000 mm Effective'
    },
    delivery: 'Delivery same day, next day',
    img: tileProfileImg
  },
  {
    id: 6,
    title: 'Evershine Stainless Steel Wind Driven Turbo Ventilator 21"',
    brand: 'Evershine',
    category: 'Turbo Ventilators',
    subCategory: 'Turbo Ventilators',
    grade: 'BSK46',
    specs: {
      thickness: '0.50 mm Vanes',
      length: '21 Inch Throat',
      width: 'Aluminium/SS Base'
    },
    delivery: 'Delivery same day, next day',
    img: turboVentilatorsImg
  },
  {
    id: 7,
    title: 'Evershine XLPE Chemically Cross-Linked Polyethylene Insulation',
    brand: 'Evershine',
    category: 'XLPE',
    subCategory: 'XLPE',
    grade: 'BSK46',
    specs: {
      thickness: '6 - 25 mm Sheet',
      length: '20 Meters Roll',
      width: '1.2 Meters Width'
    },
    delivery: 'Delivery in 2 - 3 days',
    img: xlpeImg
  },
  {
    id: 8,
    title: 'Evershine High Tensile Galvanized Z Purlin & C Purlin Profiles',
    brand: 'Evershine',
    category: 'Z Purlin - Cpurlin',
    subCategory: 'Z Purlin - Cpurlin',
    grade: 'IS 2062:2011',
    specs: {
      thickness: '1.5 - 3.0 mm',
      length: 'Up to 12000 mm',
      width: '100 - 300 mm Web'
    },
    delivery: 'Delivery same day, next day',
    img: zPurlinImg
  }
];

export default function ProductDetails({ initialCategory }) {
  const { slug, categoryName, categorySlug } = useParams();
  const navigate = useNavigate();

  const currentSlug = slug || categoryName || categorySlug;

  // Resolve category label from URL slug parameter
  const matchedCategoryFromSlug = useMemo(() => {
    if (!currentSlug) return null;
    const cleanSlug = currentSlug.toLowerCase().replace(/^\//, '');
    const found = categoryListData.find(cat => {
      const catHref = cat.href.toLowerCase().replace(/^\//, '');
      const catSlug = cat.label.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      return catHref === cleanSlug || catSlug === cleanSlug || cat.label.toLowerCase() === cleanSlug;
    });
    return found ? found.label : null;
  }, [currentSlug]);

  // Active Category State initialized from slug / prop / default (null if no category specified)
  const [selectedSubCategory, setSelectedSubCategory] = useState(
    matchedCategoryFromSlug || initialCategory || null
  );

  // Sync state when URL slug changes
  useEffect(() => {
    if (matchedCategoryFromSlug) {
      setSelectedSubCategory(matchedCategoryFromSlug);
    }
  }, [matchedCategoryFromSlug]);

  const handleSubCategoryClick = (cat) => {
    const isCurrentlyActive = selectedSubCategory === cat.label;
    if (isCurrentlyActive) {
      setSelectedSubCategory(null);
      navigate('/products');
    } else {
      setSelectedSubCategory(cat.label);
      navigate(cat.href);
    }
  };

  const [selectedCategoryCheck, setSelectedCategoryCheck] = useState('MS Hot rolled');
  const [selectedGrades, setSelectedGrades] = useState([]);

  // Sub-category Carousel Slider State (Continuous one-by-one sliding)
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [isCarouselPaused, setIsCarouselPaused] = useState(false);

  // Separate Accessories (pinned) from sliding sub-categories
  const accessoriesItem = useMemo(() => {
    return categoryListData.find(item => item.label.toLowerCase().includes('accessories')) || categoryListData[0];
  }, []);

  const slidingList = useMemo(() => {
    return categoryListData.filter(item => !item.label.toLowerCase().includes('accessories'));
  }, []);

  const totalSliding = slidingList.length;

  const handleNextSubCategory = useCallback(() => {
    setCarouselIndex((prev) => (prev + 1) % totalSliding);
  }, [totalSliding]);

  const handlePrevSubCategory = () => {
    setCarouselIndex((prev) => (prev - 1 + totalSliding) % totalSliding);
  };

  useEffect(() => {
    if (isCarouselPaused) return;
    const interval = setInterval(() => {
      handleNextSubCategory();
    }, 2800);
    return () => clearInterval(interval);
  }, [isCarouselPaused, handleNextSubCategory]);

  // Compute 7 visible sliding categories next to Accessories
  const visibleSliding = useMemo(() => {
    const items = [];
    for (let i = 0; i < 7; i++) {
      const idx = (carouselIndex + i) % totalSliding;
      items.push({ ...slidingList[idx], originalIndex: idx });
    }
    return items;
  }, [carouselIndex, totalSliding, slidingList]);
  
  // Accordion toggle states
  const [categoryOpen, setCategoryOpen] = useState(true);
  const [gradeOpen, setGradeOpen] = useState(true);

  // Selected Product for purchase modal
  const [activeModalProduct, setActiveModalProduct] = useState(null);
  const [orderSubmitted, setOrderSubmitted] = useState(false);

  // Toggle Grade Checkbox
  const handleToggleGrade = (grade) => {
    setSelectedGrades(prev => 
      prev.includes(grade) ? prev.filter(g => g !== grade) : [...prev, grade]
    );
  };

  // Clear all filters
  const handleClearFilters = () => {
    setSelectedSubCategory(null);
    setSelectedCategoryCheck(null);
    setSelectedGrades([]);
  };

  // Filter products logic
  const filteredProducts = useMemo(() => {
    return SAMPLE_PRODUCTS.filter(p => {
      if (selectedGrades.length > 0 && !selectedGrades.includes(p.grade)) {
        return false;
      }
      return true;
    });
  }, [selectedGrades]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans pt-[90px] lg:pt-[110px] pb-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Breadcrumb Navigation matching Image 3 */}
        <nav className="flex items-center gap-2 text-sm text-slate-500 mb-6">
          <a href="/" className="hover:text-teal-600 transition">Home</a>
          <ChevronRight className="w-4 h-4 text-slate-400" />
          <a href="/categories" className="hover:text-teal-600 transition">All products</a>
          <ChevronRight className="w-4 h-4 text-slate-400" />
          <a href="#" className="hover:text-teal-600 transition">Mild Steel</a>
          <ChevronRight className="w-4 h-4 text-slate-400" />
          <span className="font-semibold text-slate-900">
            {selectedSubCategory || selectedCategoryCheck || 'MS Hot rolled'}
          </span>
        </nav>

        {/* Sub-Category Horizontal Showcase Carousel - Continuous Automated Slider */}
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
              className="w-9 h-9 shrink-0 rounded-full border border-slate-200 bg-white shadow-sm flex items-center justify-center text-slate-700 hover:border-teal-600 hover:text-teal-600 hover:shadow-md transition duration-200"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Cards Slider Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 flex-1 overflow-hidden py-1">
              {/* Pinned Accessories Card */}
              {(() => {
                const isActive = selectedSubCategory === accessoriesItem.label;
                return (
                  <div
                    key="pinned-accessories"
                    onClick={() => handleSubCategoryClick(accessoriesItem)}
                    className={`
                      bg-white rounded-2xl p-3 flex flex-col items-center 
                      cursor-pointer transition-all duration-300 relative border group
                      ${isActive 
                        ? 'border-teal-500 shadow-lg shadow-teal-500/10 ring-2 ring-teal-500/20 scale-[1.02]' 
                        : 'border-slate-200 hover:border-teal-500 hover:-translate-y-1 hover:shadow-md'
                      }
                    `}
                  >
                    {isActive && (
                      <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-amber-400 rounded-full ring-2 ring-white" />
                    )}

                    <div className="w-full h-24 bg-slate-100 rounded-xl flex items-center justify-center overflow-hidden mb-2">
                      <img 
                        src={accessoriesItem.images[0]} 
                        alt={accessoriesItem.label}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300 rounded-xl"
                      />
                    </div>

                    <span className={`text-xs font-semibold text-center leading-tight line-clamp-2 transition-colors ${isActive ? 'text-teal-600' : 'text-slate-700 group-hover:text-teal-600'}`}>
                      {accessoriesItem.label}
                    </span>
                  </div>
                );
              })()}

              {/* Remaining Sliding 7 Categories */}
              {visibleSliding.map((cat, index) => {
                const isActive = selectedSubCategory === cat.label;
                const catImage = cat.images && cat.images[0] ? cat.images[0] : '';

                return (
                  <div
                    key={`${cat.href}-${cat.originalIndex}-${index}`}
                    onClick={() => handleSubCategoryClick(cat)}
                    className={`
                      bg-white rounded-2xl p-3 flex flex-col items-center 
                      cursor-pointer transition-all duration-300 relative border group
                      ${isActive 
                        ? 'border-teal-500 shadow-lg shadow-teal-500/10 ring-2 ring-teal-500/20 scale-[1.02]' 
                        : 'border-slate-200 hover:border-teal-500 hover:-translate-y-1 hover:shadow-md'
                      }
                    `}
                  >
                    {/* Active yellow dot badge */}
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

                    <span className={`text-xs font-semibold text-center leading-tight line-clamp-2 transition-colors ${isActive ? 'text-teal-600' : 'text-slate-700 group-hover:text-teal-600'}`}>
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
              className="w-9 h-9 shrink-0 rounded-full border border-slate-200 bg-white shadow-sm flex items-center justify-center text-slate-700 hover:border-teal-600 hover:text-teal-600 hover:shadow-md transition duration-200"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </section>

        {/* Catalog Header Bar matching Image 3 */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-slate-900">
              {selectedSubCategory || selectedCategoryCheck || 'MS Hot rolled'}
            </h1>
            <span className="text-sm font-medium text-slate-500 bg-slate-200/60 px-2.5 py-0.5 rounded-full">
              Found <strong className="text-slate-800">{filteredProducts.length * 45}</strong> results
            </span>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={handleClearFilters}
              className="text-sm font-semibold text-blue-600 hover:text-blue-700 hover:underline flex items-center gap-1 transition"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Clear filters
            </button>
          </div>
        </div>

        {/* Main Grid: Sidebar + Product Cards matching Image 3 */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          
          {/* Left Sidebar Filter Column - Sticky Fixed */}
          <aside className="sticky top-[100px] lg:self-start bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-6 max-h-[calc(100vh-120px)] overflow-y-auto scrollbar-thin scrollbar-thumb-slate-200 z-10">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100 font-bold text-slate-900 text-lg">
              <SlidersHorizontal className="w-5 h-5 text-slate-600" />
              <span>Filter</span>
            </div>

            {/* Category Accordion */}
            <div className="border-b border-slate-100 pb-4">
              <button 
                onClick={() => setCategoryOpen(!categoryOpen)}
                className="w-full flex items-center justify-between py-1 text-sm font-bold text-slate-800"
              >
                <span>Category</span>
                {categoryOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>

              {categoryOpen && (
                <div className="mt-3 space-y-2.5 pl-1">
                  <label className="flex items-center gap-2.5 text-sm text-slate-600 cursor-pointer hover:text-slate-900">
                    <input type="checkbox" className="rounded border-slate-300 text-teal-600 focus:ring-teal-500" />
                    <span>Mild Steel</span>
                  </label>

                  <label className="flex items-center gap-2.5 text-sm text-slate-600 cursor-pointer hover:text-slate-900 pl-4">
                    <input 
                      type="checkbox" 
                      checked={selectedCategoryCheck === 'MS Hot rolled'}
                      onChange={() => setSelectedCategoryCheck(selectedCategoryCheck === 'MS Hot rolled' ? null : 'MS Hot rolled')}
                      className="rounded border-slate-300 text-teal-600 focus:ring-teal-500" 
                    />
                    <span className="font-semibold text-slate-800">MS Hot rolled</span>
                  </label>
                </div>
              )}
            </div>

            {/* Grade Accordion matching Image 3 */}
            <div className="border-b border-slate-100 pb-4">
              <button 
                onClick={() => setGradeOpen(!gradeOpen)}
                className="w-full flex items-center justify-between py-1 text-sm font-bold text-slate-800"
              >
                <span>Grade</span>
                {gradeOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>

              {gradeOpen && (
                <div className="mt-3 space-y-2 max-h-64 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-slate-200">
                  {GRADES_LIST.map((grade) => (
                    <label key={grade} className="flex items-center gap-2.5 text-sm text-slate-600 cursor-pointer hover:text-slate-900">
                      <input 
                        type="checkbox"
                        checked={selectedGrades.includes(grade)}
                        onChange={() => handleToggleGrade(grade)}
                        className="rounded border-slate-300 text-teal-600 focus:ring-teal-500"
                      />
                      <span>{grade}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>
          </aside>

          {/* Right Column: Product Cards Grid matching Image 3 */}
          <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredProducts.map(product => (
              <div 
                key={product.id}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden flex flex-col hover:shadow-lg transition-all duration-200 group"
              >
                {/* Image Box - full cover with Floating Breadcrumb Badge */}
                <div className="w-full h-52 bg-slate-100 flex items-center justify-center relative overflow-hidden">
                  <img 
                    src={product.img} 
                    alt={product.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />

                  {/* Top Image Floating Breadcrumb Badge (Excluded for Deck Sheet) */}
                  {!product.category?.toLowerCase().includes('deck') && !product.title?.toLowerCase().includes('deck') && (
                    <div className="absolute top-3 left-3 bg-slate-900/85 backdrop-blur-md text-white text-[11px] px-2.5 py-1 rounded-lg font-medium shadow-md flex items-center gap-1 border border-white/10">
                      <span className="text-slate-300">Mild Steel</span>
                      <span className="text-teal-400 font-bold">›</span>
                      <span className="text-amber-300 font-semibold">{product.category || 'Hot rolled'}</span>
                    </div>
                  )}
                </div>

                {/* Card Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Inline Card Breadcrumb Trail (Excluded for Deck Sheet) */}
                    {!product.category?.toLowerCase().includes('deck') && !product.title?.toLowerCase().includes('deck') && (
                      <div className="flex items-center gap-1.5 text-[11px] text-slate-500 font-medium mb-2 flex-wrap">
                        <span className="hover:text-teal-600 transition">Mild Steel</span>
                        <ChevronRight className="w-3 h-3 text-slate-400 shrink-0" />
                        <span className="text-teal-700 font-bold bg-teal-50 px-2 py-0.5 rounded border border-teal-100">
                          {product.category || 'Hot rolled'}
                        </span>
                        {product.grade && (
                          <>
                            <ChevronRight className="w-3 h-3 text-slate-400 shrink-0" />
                            <span className="text-slate-600 font-mono text-[10px]">{product.grade}</span>
                          </>
                        )}
                      </div>
                    )}

                    <h3 className="font-bold text-slate-900 text-base leading-snug mb-1">
                      {product.title}
                    </h3>
                    <p className="text-xs text-slate-500 mb-4">
                      Brand: <strong className="text-slate-700 font-medium">{product.brand}</strong>
                    </p>

                    {/* Specification Attributes */}
                    <div className="space-y-1.5 text-xs text-slate-600 mb-4 bg-slate-50 p-3 rounded-lg border border-slate-100">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Thickness</span>
                        <span className="font-semibold text-slate-800">{product.specs.thickness}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Length</span>
                        <span className="font-semibold text-slate-800">{product.specs.length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Width</span>
                        <span className="font-semibold text-slate-800">{product.specs.width}</span>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Action Area */}
                  <div>
                    <button
                      onClick={() => setActiveModalProduct(product)}
                      className="w-full py-2 bg-slate-50 hover:bg-blue-50 text-blue-600 font-bold text-sm rounded-lg transition border border-transparent hover:border-blue-200 text-left px-3 mb-3"
                    >
                      Purchase now
                    </button>

                    <div className="flex items-center gap-2 text-xs text-slate-500 pt-2 border-t border-slate-100">
                      <Truck className="w-4 h-4 text-teal-600 flex-shrink-0" />
                      <span>{product.delivery}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>

      {/* Interactive Purchase Modal */}
      {activeModalProduct && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            <button 
              onClick={() => { setActiveModalProduct(null); setOrderSubmitted(false); }}
              className="absolute top-4 right-4 p-1 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            {orderSubmitted ? (
              <div className="text-center py-6">
                <CheckCircle className="w-16 h-16 text-teal-600 mx-auto mb-3" />
                <h3 className="text-xl font-bold text-slate-900 mb-1">Quote Request Sent!</h3>
                <p className="text-sm text-slate-500 mb-6">
                  Thank you for choosing Evershine. Our industrial team will send a formal proforma invoice to your business contact.
                </p>
                <button
                  onClick={() => { setActiveModalProduct(null); setOrderSubmitted(false); }}
                  className="w-full py-2.5 bg-teal-600 text-white font-bold rounded-xl hover:bg-teal-700 transition"
                >
                  Close Window
                </button>
              </div>
            ) : (
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-1">{activeModalProduct.title}</h3>
                <p className="text-xs text-slate-500 mb-4">Brand: {activeModalProduct.brand} | Grade: {activeModalProduct.grade}</p>

                <div className="bg-slate-50 p-4 rounded-xl space-y-2 text-xs mb-6 border border-slate-100">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Thickness Range:</span>
                    <span className="font-semibold">{activeModalProduct.specs.thickness}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Standard Length:</span>
                    <span className="font-semibold">{activeModalProduct.specs.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Width Range:</span>
                    <span className="font-semibold">{activeModalProduct.specs.width}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-slate-200">
                    <span className="text-slate-500">Estimated Base Price:</span>
                    <span className="font-bold text-sm text-slate-900">₹54.50 / kg</span>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <label className="block text-xs font-semibold text-slate-700">Estimated Requirement (Kg / Tons)</label>
                  <input 
                    type="number" 
                    defaultValue={1000} 
                    className="w-full p-2.5 border border-slate-300 rounded-xl text-sm font-semibold focus:ring-2 focus:ring-teal-500 focus:outline-none"
                    placeholder="Enter quantity in Kg"
                  />
                </div>

                <button
                  onClick={() => setOrderSubmitted(true)}
                  className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>Request Instant Proforma Quote</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
