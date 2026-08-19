import React, { useState, useEffect, useCallback, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";

import CrimpingBanner from "../../assets/banner/crimping_profile_banner.png";
import GIAngleBanner from "../../assets/banner/GI Banner.png";
import AluminiumCrimpingBanner from "../../assets/banner/aluminium_crimping_banner.png";
import PuffPanelsBanner from "../../assets/banner/puff_panels_banner.jpg";
import DeckSheetsBanner from "../../assets/banner/deck_sheets_banner.png";
import BareGalvalumeBanner from "../../assets/banner/bare_galvalume_banner.png";
import StandingSeamBanner from "../../assets/banner/standing_seam_banner.jpg";

const banners = [
  CrimpingBanner,
  GIAngleBanner,
  AluminiumCrimpingBanner,
  PuffPanelsBanner,
  DeckSheetsBanner,
  BareGalvalumeBanner,
  StandingSeamBanner,
];
const bannerBgColors = [
  "bg-[#f1f5f9]",
  "bg-[#0b1329]",
  "bg-[#f1f5f9]",
  "bg-[#f1f5f9]",
  "bg-[#f1f5f9]",
  "bg-[#f1f5f9]",
  "bg-[#f1f5f9]",
];

const AUTOPLAY_DELAY = 4000;

// Variants for the sliding effect
const slideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? "100%" : "-100%",
    opacity: 1,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction) => ({
    x: direction > 0 ? "-100%" : "100%",
    opacity: 1,
  }),
};

const Hore = () => {
  const [[current, direction], setState] = useState([0, 0]);
  const timerRef = useRef(null);

  const goTo = useCallback((index, dir) => {
    setState(([prevIndex]) => {
      const newIndex = (index + banners.length) % banners.length;
      // if direction not explicitly passed, infer it
      const inferredDir =
        dir !== undefined ? dir : newIndex > prevIndex ? 1 : -1;
      return [newIndex, inferredDir];
    });
  }, []);

  const next = useCallback(() => {
    setState(([prevIndex]) => [(prevIndex + 1) % banners.length, 1]);
  }, []);

  const prev = useCallback(() => {
    setState(([prevIndex]) => [
      (prevIndex - 1 + banners.length) % banners.length,
      -1,
    ]);
  }, []);

  // Autoplay
  useEffect(() => {
    timerRef.current = setInterval(next, AUTOPLAY_DELAY);
    return () => clearInterval(timerRef.current);
  }, [next]);

  return (
    <section
      className={`relative w-full mt-[64px] sm:mt-[72px] lg:mt-[84px] h-[calc(100vh-64px)] sm:h-[calc(100vh-72px)] lg:h-[calc(100vh-84px)] overflow-hidden transition-colors duration-500 ${bannerBgColors[current]}`}
    >
      <AnimatePresence initial={false} custom={direction} mode="popLayout">
        <motion.div
          key={current}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "tween", duration: 0.6, ease: "easeInOut" },
          }}
          className="absolute inset-0 w-full h-full flex items-center justify-center p-0"
        >
          <img
            src={banners[current]}
            alt={`Banner ${current + 1}`}
            className="w-full h-full object-contain md:object-cover object-center max-w-full max-h-full"
            draggable={false}
          />
        </motion.div>
      </AnimatePresence>

      {/* Prev / Next arrows */}
      <button
        onClick={prev}
        aria-label="Previous slide"
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-10 h-10 rounded-full bg-black/40 text-white hover:bg-black/60 transition"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      <button
        onClick={next}
        aria-label="Next slide"
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-10 h-10 rounded-full bg-black/40 text-white hover:bg-black/60 transition"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Pagination dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex gap-2">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => goTo(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`h-2 rounded-full transition-all duration-300 ${index === current
                ? "w-6 bg-white"
                : "w-2 bg-white/50 hover:bg-white/80"
              }`}
          />
        ))}
      </div>
    </section>
  );
};

export default Hore;
