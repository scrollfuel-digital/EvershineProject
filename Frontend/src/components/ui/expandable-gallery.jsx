import React, { useState, useId, useRef } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { ArrowLeft, ArrowRight, ShieldCheck, Award, FileCheck2, Cpu, Truck, BadgePercent, CheckCircle2 } from "lucide-react";
import { useOutsideClick } from "../../hooks/use-outside-click";
import { Button } from "./button";
import { cn } from "../../lib/utils";

// Local high-res project assets
import bareGalvImg from "../../assets/bare_galvalume/bare_galv_factory_stack.jpg";
import ppglBlueImg from "../../assets/ppgl_profile/royal_blue_ppgl_stack.jpg";
import pebFrameImg from "../../assets/peb_structure/peb_frame_erection.jpg";
import czPurlinImg from "../../assets/z_c_purlin/cz_purlin_factory_stack.jpg";
import deckSlabImg from "../../assets/deck_sheets/deck_composite_slab.png";
import puffPanelImg from "../../assets/puff_panels/puff_double_skin_cad.jpg";

const ASSURANCE_CARDS = [
  {
    id: "pillar-1",
    title: "Direct Mill Sourcing",
    tag: "100% Prime Quality",
    desc: "Direct procurement partnerships with JSW Steel, Tata Steel, AM/NS India, and APL Apollo guaranteeing prime Grade-A coils and sections.",
    src: bareGalvImg,
    alt: "Primary Steel Mill Sourcing",
    rotation: -15,
    x: -90,
    y: 10,
    zIndex: 10,
  },
  {
    id: "pillar-2",
    title: "Guaranteed MTC Documentation",
    tag: "Full Traceability",
    desc: "Complete Mill Test Certificates provided with every batch verifying chemical composition, tensile yield, and coating thickness.",
    src: ppglBlueImg,
    alt: "Mill Test Certificate Verification",
    rotation: -3,
    x: -10,
    y: -15,
    zIndex: 20,
  },
  {
    id: "pillar-3",
    title: "Precision Roll-Forming & Curving",
    tag: "Zero On-Site Waste",
    desc: "Automated CNC roll-forming offering custom cut-to-length profiles up to 12 meters, crimping curves, and pre-punched purlins.",
    src: czPurlinImg,
    alt: "Automated CNC Roll-Forming",
    rotation: 12,
    x: 75,
    y: 5,
    zIndex: 30,
  },
  {
    id: "pillar-4",
    title: "PAN-India Fleet Logistics",
    tag: "24-48h Fast Dispatch",
    desc: "Reliable dispatch network with transit insurance delivering directly to remote construction sites and factory locations on schedule.",
    src: pebFrameImg,
    alt: "Industrial Logistics Network",
  },
  {
    id: "pillar-5",
    title: "Transparent B2B Project Pricing",
    tag: "No Hidden Costs",
    desc: "Direct mill-rate pricing for MSMEs and major contractors with volume-tier discounts and itemized GST tax invoices.",
    src: deckSlabImg,
    alt: "Transparent B2B Commercial Rates",
  },
  {
    id: "pillar-6",
    title: "Engineering Technical Guidance",
    tag: "End-to-End Support",
    desc: "Dedicated structural specialists assisting with span calculations, wind-load assessments (IS 875), and optimal coating selection.",
    src: puffPanelImg,
    alt: "Technical Span & Structural Support",
  },
];

const transition = {
  type: "spring",
  stiffness: 160,
  damping: 18,
  mass: 1,
};

export function ExpandableGallery() {
  const [isExpanded, setIsExpanded] = useState(false);
  const layoutGroupId = useId();
  const containerRef = useRef(null);

  useOutsideClick(containerRef, () => {
    if (isExpanded) {
      setIsExpanded(false);
    }
  });

  return (
    <section className="relative w-full px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-start overflow-hidden">
      <LayoutGroup id={layoutGroupId}>
        <div className="w-full max-w-6xl mx-auto flex flex-col items-center">
          
          {/* Top Bar with Go Back button when expanded */}
          <div className="w-full h-12 flex items-center justify-between px-2 mb-3">
            <AnimatePresence>
              {isExpanded && (
                <motion.button
                  key="back-button"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  onClick={() => setIsExpanded(false)}
                  className="flex items-center gap-2 text-slate-300 hover:text-white transition-all group z-50 cursor-pointer"
                >
                  <div className="p-2 rounded-full bg-white/10 group-hover:bg-[#E3A72F] group-hover:text-[#081827] transition-colors text-white">
                    <ArrowLeft className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-semibold text-slate-200 group-hover:text-white">
                    Collapse Stack
                  </span>
                </motion.button>
              )}
            </AnimatePresence>
          </div>

          <motion.div
            ref={containerRef}
            layout
            className={cn(
              "relative w-full transition-all",
              isExpanded
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 px-2"
                : "flex flex-col items-center justify-start pt-2"
            )}
            transition={transition}
          >
            {/* Cards Stack or Grid */}
            <div
              className={cn(
                "relative",
                isExpanded
                  ? "contents"
                  : "h-[420px] sm:h-[460px] w-full flex items-center justify-center mb-6"
              )}
            >
              {ASSURANCE_CARDS.map((card, index) => {
                const isPrimary = index < 3;
                if (!isPrimary && !isExpanded) return null;

                return (
                  <motion.div
                    key={`card-${card.id}`}
                    layoutId={`card-container-${card.id}`}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                      rotate: !isExpanded ? card.rotation || 0 : 0,
                      x: !isExpanded ? card.x || 0 : 0,
                      y: !isExpanded ? card.y || 0 : 0,
                      zIndex: !isExpanded ? card.zIndex || index : 10,
                    }}
                    transition={transition}
                    whileHover={
                      !isExpanded
                        ? {
                            scale: 1.06,
                            y: (card.y || 0) - 18,
                            rotate: (card.rotation || 0) * 0.75,
                            zIndex: 50,
                            transition: {
                              type: "spring",
                              stiffness: 350,
                              damping: 22,
                            },
                          }
                        : { scale: 1.02 }
                    }
                    className={cn(
                      "cursor-pointer overflow-hidden group/card relative",
                      isExpanded
                        ? "relative flex flex-col justify-between rounded-2xl md:rounded-3xl border border-[#1b344b] bg-[#0d2338] shadow-2xl p-5 sm:p-6 transition-all duration-300 hover:border-[#E3A72F]/60"
                        : "absolute w-52 h-52 sm:w-64 sm:h-64 rounded-[2.5rem] md:rounded-[3rem] border-[5px] border-[#1b344b] bg-[#0d2338] shadow-[0_25px_60px_rgba(0,0,0,0.5)]"
                    )}
                    onClick={() => !isExpanded && setIsExpanded(true)}
                  >
                    {/* Inner Image Container with Zoom Effect */}
                    <motion.div
                      layoutId={`image-inner-${card.id}`}
                      layout="position"
                      className={cn(
                        "relative overflow-hidden rounded-xl",
                        isExpanded ? "w-full h-48 sm:h-52 mb-4" : "w-full h-full"
                      )}
                      transition={transition}
                    >
                      <img
                        src={card.src}
                        alt={card.alt}
                        className="w-full h-full object-cover select-none pointer-events-none transition-transform duration-500 group-hover/card:scale-108"
                        loading={isPrimary ? "eager" : "lazy"}
                      />

                      {/* Dark Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#081827] via-[#081827]/40 to-transparent" />

                      {/* Top Corner Pill Tag */}
                      <div className="absolute top-3 left-3 z-10">
                        <span className="font-['Inter',sans-serif] text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#F2C054] bg-[#081827]/80 backdrop-blur-md px-2.5 py-1 rounded-full border border-[#E3A72F]/40 shadow-sm">
                          {card.tag}
                        </span>
                      </div>

                      {/* Bottom Title on Stacked View */}
                      {!isExpanded && (
                        <div className="absolute bottom-3 left-3 right-3 z-10">
                          <h4 className="font-['Sora',sans-serif] text-sm sm:text-base font-bold text-white leading-tight drop-shadow-md">
                            {card.title}
                          </h4>
                        </div>
                      )}
                    </motion.div>

                    {/* Expanded View Extra Content */}
                    {isExpanded && (
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <h3 className="font-['Sora',sans-serif] text-base sm:text-lg font-bold text-white group-hover/card:text-[#F6C45E] transition-colors">
                            {card.title}
                          </h3>
                          <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed font-['Inter',sans-serif]">
                            {card.desc}
                          </p>
                        </div>

                        <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-[#E3A72F]">
                          <span className="font-semibold flex items-center gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            Verified Specification
                          </span>
                          <span className="text-[11px] text-slate-400">Pillar 0{index + 1}</span>
                        </div>
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>

            {/* Content Below Stacked Deck */}
            <AnimatePresence>
              {!isExpanded && (
                <motion.div
                  key="stack-content"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center max-w-2xl space-y-5"
                >
                  <h3 className="font-['Sora',sans-serif] text-xl sm:text-3xl font-bold tracking-tight text-white leading-snug">
                    Builders don't just buy steel products.{" "}
                    <br className="hidden md:block" />
                    <span className="text-[#F6C45E]">They invest in absolute project certainty.</span>
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-lg mx-auto font-['Inter',sans-serif]">
                    Click any card above or expand the deck to inspect our 6 engineering assurance pillars.
                  </p>

                  <div className="flex justify-center pt-2">
                    <Button
                      variant="default"
                      onClick={() => setIsExpanded(true)}
                      className="rounded-full cursor-pointer py-3.5 px-8 font-bold text-xs sm:text-sm group"
                    >
                      <span>Explore All 6 Assurance Pillars</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </motion.div>
        </div>
      </LayoutGroup>
    </section>
  );
}

export default ExpandableGallery;
