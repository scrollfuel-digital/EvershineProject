import React, { useState } from "react";
import { Play, Star, X } from "lucide-react";

// Design System Components matching ProductSlider.jsx & Categories.jsx
const ShelfEdge = ({ progress = 100 }) => (
  <div className="relative mt-3 mb-8 h-[3px] w-full bg-[#E7E5DE] overflow-hidden rounded-full">
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

const SectionHeader = ({ title, progress = 100 }) => (
  <div>
    <div className="flex items-end justify-between">
      <h2 className="font-['Sora',sans-serif] text-2xl md:text-3xl font-semibold text-[#14152B]">
        {title}
      </h2>
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
               transition-all duration-200 cursor-pointer z-10"
  >
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path
        d={direction === "prev" ? "M10 3L5 8l5 5" : "M6 3l5 5-5 5"}
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </button>
);

const spotlightCards = [
  {
    id: 1,
    name: "Kailash Pati",
    role: "Senior Team Lead Repos IoT",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
  },
  {
    id: 2,
    name: "Vikram",
    role: "Proprietor, Khushi Construction",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
  },
  {
    id: 3,
    name: "Rajesh Sharma",
    role: "Director, Apex Infra Tech",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
  },
  {
    id: 4,
    name: "Anand Verma",
    role: "Managing Director, Nova Steel",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
  }
];

const customerReviews = [
  {
    id: 1,
    name: "Dev Mudgal",
    role: "Managing Director, Vishwakarma Granite Limited",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150",
    rating: 5,
    quote: "“We trust Evershine MSME for quality products, timely delivery, and transparency”"
  },
  {
    id: 2,
    name: "Faqihuddin Khan",
    role: "Partner, ZHA Solutions",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150",
    rating: 5,
    quote: "“Evershine MSME makes procurement seamless, saving time and effort”"
  },
  {
    id: 3,
    name: "Vikas Agarwal",
    role: "Partner, Hindustan Wires",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=150",
    rating: 5,
    quote: "“Evershine MSME ensures consistent quality across all our materials”"
  }
];

export default function FromOurCustomers() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [videoModal, setVideoModal] = useState(null);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? spotlightCards.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= spotlightCards.length - 1 ? 0 : prev + 1));
  };

  // Determine cards to show in carousel (2 per view on desktop)
  const getVisibleCards = () => {
    const card1 = spotlightCards[currentIndex];
    const card2 = spotlightCards[(currentIndex + 1) % spotlightCards.length];
    return [card1, card2];
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-16 bg-white font-['Inter',sans-serif]">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Section Header */}
        <SectionHeader title="From our customers" progress={100} />

        {/* Customer Spotlight Carousel with Side NavArrows */}
        <div className="flex items-center gap-3">
          <NavArrow
            direction="prev"
            label="Previous customer spotlight"
            onClick={prevSlide}
          />

          <div className="flex-1 min-w-0">
            {/* Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {getVisibleCards().map((card, index) => (
                <div
                  key={`${card.id}-${index}`}
                  className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-[#ebf3fe] via-[#f0f6ff] to-[#e4efff] border border-blue-100 p-6 flex flex-row items-center justify-between min-h-[260px] sm:min-h-[280px] shadow-xs hover:shadow-md transition duration-300"
                >
                  {/* Top-Left Dot Matrix Decor */}
                  <div className="absolute top-4 left-4 grid grid-cols-4 gap-1.5 opacity-30 pointer-events-none">
                    {[...Array(20)].map((_, i) => (
                      <div key={i} className="w-1.5 h-1.5 rounded-full bg-blue-900" />
                    ))}
                  </div>

                  {/* Top-Right Logo Badge */}
                  <div className="absolute top-4 right-5 flex items-center pointer-events-none">
                    <div className="flex flex-col items-end">
                      <span className="text-xs sm:text-sm font-extrabold text-[#004060] tracking-tight leading-none flex items-center gap-0.5">
                        <span className="text-red-600 font-black italic">EVERSHINE</span>
                      </span>
                      <span className="text-[9px] font-bold text-[#004060] tracking-wider leading-none mt-0.5">
                        ONE MSME
                      </span>
                    </div>
                  </div>

                  {/* Left Side: Spotlight Title & Play Button */}
                  <div className="flex flex-col justify-center z-10 max-w-[55%]">
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0f2b5c] tracking-tight leading-tight">
                      Customer
                    </h3>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-2xl sm:text-3xl font-extrabold text-[#0f2b5c] tracking-tight">
                        Spotlight
                      </span>
                      <button
                        onClick={() => setVideoModal(card)}
                        className="w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-[#1d4ed8] text-white flex items-center justify-center shadow-md hover:bg-blue-700 hover:scale-105 transition cursor-pointer shrink-0"
                        aria-label={`Play spotlight video of ${card.name}`}
                      >
                        <Play className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current ml-0.5" />
                      </button>
                    </div>
                    {/* Horizontal Accent Line */}
                    <div className="w-20 sm:w-24 h-1 bg-[#1d4ed8] rounded-full mt-3"></div>
                  </div>

                  {/* Right Side: Customer Portrait Container */}
                  <div className="relative z-10 flex justify-end">
                    <div
                      onClick={() => setVideoModal(card)}
                      className="relative w-40 sm:w-48 h-52 sm:h-60 rounded-xl overflow-hidden border border-blue-200 shadow-sm group cursor-pointer bg-white"
                    >
                      <img
                        src={card.image}
                        alt={card.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                      />
                      {/* Play Overlay */}
                      <div className="absolute inset-0 bg-black/15 group-hover:bg-black/30 transition flex items-center justify-center">
                        <div className="w-10 h-10 rounded-full bg-blue-600/90 text-white flex items-center justify-center shadow-md group-hover:scale-110 transition">
                          <Play className="w-5 h-5 fill-current ml-0.5" />
                        </div>
                      </div>

                      {/* Bottom Overlay Badge with Dark Blue Vertical Line */}
                      <div className="absolute bottom-2 left-2 right-2 bg-white/95 backdrop-blur-xs rounded-lg p-2 shadow-md border border-gray-100">
                        <div className="border-l-3 border-blue-600 pl-2">
                          <h4 className="font-bold text-xs sm:text-sm text-gray-900 leading-snug">
                            {card.name}
                          </h4>
                          <p className="text-[10px] sm:text-xs text-gray-500 font-medium leading-tight truncate">
                            {card.role}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination Dots */}
            <div className="flex justify-center items-center gap-1.5 mt-5">
              {spotlightCards.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`transition-all duration-300 cursor-pointer ${
                    i === currentIndex
                      ? "w-2.5 h-2.5 rounded-full bg-[#0F766E]"
                      : "w-1.5 h-1.5 rounded-full bg-gray-300 hover:bg-gray-400"
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          </div>

          <NavArrow
            direction="next"
            label="Next customer spotlight"
            onClick={nextSlide}
          />
        </div>

        {/* Testimonial Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          {customerReviews.map((review) => (
            <div
              key={review.id}
              className="bg-white rounded-2xl border border-[#E7E5DE] p-5 shadow-xs hover:border-[#0F766E] hover:shadow-[0_16px_28px_-14px_rgba(20,21,43,0.28)] transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Header: Avatar, Name & Title */}
                <div className="flex items-center gap-3">
                  <img
                    src={review.avatar}
                    alt={review.name}
                    className="w-11 h-11 rounded-full object-cover border border-[#E7E5DE] shadow-xs shrink-0"
                  />
                  <div className="min-w-0">
                    <h4 className="font-bold text-[#14152B] text-sm sm:text-base leading-snug truncate font-['Inter',sans-serif]">
                      {review.name}
                    </h4>
                    <p className="text-xs text-gray-500 mt-0.5 leading-tight truncate">
                      {review.role}
                    </p>
                  </div>
                </div>

                {/* Rating Stars */}
                <div className="flex items-center gap-1 my-3 text-amber-400">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                {/* Quote Text */}
                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed font-medium">
                  {review.quote}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Video Modal Popup */}
      {videoModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="relative w-full max-w-3xl bg-gray-900 rounded-2xl overflow-hidden shadow-2xl border border-gray-800">
            <button
              onClick={() => setVideoModal(null)}
              className="absolute top-3 right-3 z-20 p-2 bg-black/50 hover:bg-black/80 text-white rounded-full transition cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="aspect-video w-full bg-black">
              <iframe
                className="w-full h-full"
                src={`${videoModal.videoUrl}?autoplay=1`}
                title={`${videoModal.name} - Customer Spotlight`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <div className="p-4 bg-gray-900 text-white flex items-center justify-between border-t border-gray-800">
              <div>
                <h3 className="font-bold text-base sm:text-lg text-white">{videoModal.name}</h3>
                <p className="text-xs sm:text-sm text-gray-400">{videoModal.role}</p>
              </div>
              <span className="text-xs font-medium px-3 py-1 bg-[#0F766E] text-white rounded-full">
                Customer Spotlight
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
