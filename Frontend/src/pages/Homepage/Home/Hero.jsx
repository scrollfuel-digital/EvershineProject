import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

import CrimpingBanner from "../../../assets/banner/crimping_profile_banner.png";
import GIAngleBanner from "../../../assets/banner/GI Banner.png";
import AluminiumCrimpingBanner from "../../../assets/banner/aluminium_crimping_banner.png";
import PuffPanelsBanner from "../../../assets/banner/puff_panels_banner.jpg";
import DeckSheetsBanner from "../../../assets/banner/deck_sheets_banner.png";
import BareGalvalumeBanner from "../../../assets/banner/bare_galvalume_banner.png";
import StandingSeamBanner from "../../../assets/banner/standing_seam_banner.jpg";

const banners = [
  CrimpingBanner,
  GIAngleBanner,
  AluminiumCrimpingBanner,
  PuffPanelsBanner,
  DeckSheetsBanner,
  BareGalvalumeBanner,
  StandingSeamBanner,
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
    <section className="w-full overflow-hidden mt-[114px] md:mt-[114px] lg:mt-[126px] pt-3 sm:pt-4 pb-2">
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
              className="shrink-0 overflow-hidden rounded-xl md:rounded-2xl shadow-sm"
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
                ? "w-6 bg-gray-500"
                : "w-1.5 bg-gray-300 hover:bg-gray-500"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;


