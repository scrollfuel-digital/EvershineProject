import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

import CrimpingSheetBanner from "../../../assets/banner/crimping-profile-sheet-16x9-v3.png";
import CrimpingSheetsPromoBanner from "../../../assets/banner/crimping-profile-sheets-16x9-v3.png";
import GalvanizedCoilsBanner from "../../../assets/banner/galvanized-coils-16x9-v3.png";
import PuffPanelBanner from "../../../assets/banner/puff-panel-16x9-v3.png";
import GIAnglesPhotoBanner from "../../../assets/banner/gi-angles-structural-section-16x9-photo.png";
import AluminiumCrimpingPhotoBanner from "../../../assets/banner/aluminium-crimping-profile-sheets-16x9-photo.png";
import DeckSheetsPhotoBanner from "../../../assets/banner/deck-sheets-16x9-photo.png";

const banners = [
  CrimpingSheetsPromoBanner,
  GalvanizedCoilsBanner,
  PuffPanelBanner,
  GIAnglesPhotoBanner,
  DeckSheetsPhotoBanner,
];

const AUTOPLAY_DELAY = 4000;

const Hero = () => {
  const containerRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [current, setCurrent] = useState(0);

  const isMobile = typeof window !== "undefined" ? window.innerWidth < 768 : false;
  const gap = isMobile ? 12 : 28;

  // Exactly two cards fill the container on desktop, one on mobile
  const cardWidth = containerWidth > 0
    ? (isMobile ? containerWidth : (containerWidth - gap) / 2)
    : 0;

  const step = cardWidth + gap;
  const maxIndex = banners.length - (isMobile ? 1 : 2);
  const safeCurrent = Math.min(current, maxIndex);

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.clientWidth);
      }
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, AUTOPLAY_DELAY);

    return () => clearInterval(timer);
  }, [maxIndex]);

  return (
    <section className="w-full overflow-hidden mt-[114px] lg:mt-[128px] pt-3 sm:pt-4 pb-2">
      {/* Banner carousel viewport with equal left and right spacing */}
      <div ref={containerRef} className="mx-4 md:mx-[4vw] overflow-hidden">
        <motion.div
          className="flex w-max"
          style={{ gap: `${gap}px` }}
          animate={{ x: -safeCurrent * step }}
          transition={{
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {banners.map((banner, index) => (
            <div
              key={index}
              className="shrink-0 overflow-hidden rounded-xl md:rounded-2xl"
              style={{ width: cardWidth > 0 ? `${cardWidth}px` : "auto" }}
            >
              <img
                src={banner}
                alt={`Banner ${index + 1}`}
                className="block w-full aspect-[16/9] h-auto object-contain"
                draggable={false}
              />
            </div>
          ))}
        </motion.div>
      </div>

      {/* Pagination */}
      <div className="mt-2 flex justify-center gap-2">
        {Array.from({ length: maxIndex + 1 }).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
              safeCurrent === index
                ? "w-6 bg-neutral-900"
                : "w-1.5 bg-[#c4a574]/50 hover:bg-[#c4a574]"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;


