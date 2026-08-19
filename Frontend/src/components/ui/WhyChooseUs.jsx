import React, { useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  MapPin,
  ShieldCheck,
  TrendingUp,
  Users,
  Clock,
  Award
} from 'lucide-react';

const whyChooseItems = [
  {
    title: "Prime Quality",
    desc: "High-grade structural steel and roofing sheets with excellent durability and performance.",
    icon: MapPin
  },
  {
    title: "Verified & Legal",
    desc: "Complete ISO compliance, clear specifications, and quality testing documentation.",
    icon: ShieldCheck
  },
  {
    title: "High Returns",
    desc: "Strong weather resistance, low maintenance, and exceptional long-term cost value.",
    icon: TrendingUp
  },
  {
    title: "Expert Guidance",
    desc: "Dedicated engineering specialists providing end-to-end site support and technical consultation.",
    icon: Users
  },
  {
    title: "Timely Delivery",
    desc: "On-time logistics and dispatch directly to your project location without delay.",
    icon: Clock
  },
  {
    title: "Transparent Pricing",
    desc: "Best market value with transparent quotes and zero hidden expenses.",
    icon: Award
  }
];

export default function WhyChooseUs() {
  const [startIndex, setStartIndex] = useState(0);

  // Items per page view (3 on desktop, 1 on mobile)
  const itemsPerPage = 3;
  const maxIndex = Math.max(0, whyChooseItems.length - itemsPerPage);

  const prevSlide = () => {
    setStartIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
  };

  const nextSlide = () => {
    setStartIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const activePage = Math.min(
    Math.floor(startIndex / (itemsPerPage - 1)),
    Math.ceil(whyChooseItems.length / itemsPerPage) - 1
  );

  const visibleItems = whyChooseItems.slice(startIndex, startIndex + itemsPerPage);

  return (
    <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-slate-50/80 border-t border-slate-100 overflow-hidden">
      <div className="max-w-6xl mx-auto">

        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#004060] tracking-tight font-display mb-3">
            Why Choose Evershine Projects?
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm md:text-base max-w-xl mx-auto leading-relaxed">
            Trusted industrial solutions with verified documentation, premium materials, and long-term growth potential.
          </p>
        </div>

        {/* Carousel Container with Side Navigation Arrows */}
        <div className="relative items-center">

          {/* Left Arrow Button */}
          <button
            onClick={prevSlide}
            aria-label="Previous Slide"
            className="absolute -left-2 sm:-left-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white shadow-md border border-[#B8D8E8]/60 flex items-center justify-center text-[#004060] hover:bg-[#B8D8E8]/30 transition duration-200 cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Right Arrow Button */}
          <button
            onClick={nextSlide}
            aria-label="Next Slide"
            className="absolute -right-2 sm:-right-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white shadow-md border border-[#B8D8E8]/60 flex items-center justify-center text-[#004060] hover:bg-[#B8D8E8]/30 transition duration-200 cursor-pointer"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 px-4 sm:px-6">
            {visibleItems.map((item, idx) => {
              const IconComp = item.icon;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-[28px] sm:rounded-[32px] p-8 sm:p-10 shadow-lg shadow-slate-200/50 border border-slate-100/80 text-center flex flex-col items-center justify-center transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl group"
                >
                  {/* Soft Brand Light Blue Circle Icon Badge */}
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#B8D8E8]/40 text-[#004060] group-hover:bg-[#004060] group-hover:text-white transition-colors duration-300 flex items-center justify-center mb-6 shadow-inner shrink-0">
                    <IconComp className="w-7 h-7 stroke-[1.8]" />
                  </div>

                  {/* Card Title */}
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2 font-display tracking-tight group-hover:text-[#004060] transition-colors">
                    {item.title}
                  </h3>

                  {/* Card Description */}
                  <p className="text-xs sm:text-sm text-slate-500 leading-relaxed max-w-xs mx-auto font-sans">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>

        </div>

        {/* Bottom Pagination Dots */}
        <div className="flex justify-center items-center gap-2 mt-10 sm:mt-12">
          {[...Array(Math.ceil(whyChooseItems.length / itemsPerPage))].map((_, pageIdx) => {
            const isCurrent = pageIdx === activePage;
            return (
              <button
                key={pageIdx}
                onClick={() => setStartIndex(pageIdx * (itemsPerPage - 1))}
                aria-label={`Go to slide page ${pageIdx + 1}`}
                className={`transition-all duration-300 cursor-pointer ${isCurrent
                    ? 'w-7 h-2.5 bg-[#004060] rounded-full'
                    : 'w-2.5 h-2.5 bg-[#B8D8E8] hover:bg-[#285870] rounded-full'
                  }`}
              />
            );
          })}
        </div>

      </div>
    </section>
  );
}
