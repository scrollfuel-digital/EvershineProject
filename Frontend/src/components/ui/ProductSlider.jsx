import React, { useRef } from "react";
import { Link } from "react-router-dom";

// Importing Real Product Photos from Assets
import ppglBlueImg from "../../assets/ppgl_profile/royal_blue_ppgl_stack.jpg";
import ppglGreenImg from "../../assets/ppgl_profile/jsw_green_colouron.jpg";
import bareGalvImg from "../../assets/bare_galvalume/bare_galv_factory_stack.jpg";
import gcSheetImg from "../../assets/gc_sheets/gc_green_jsw_stack.jpg";
import tileProfileImg from "../../assets/tile_profile/tile_red_jsw_trust.jpg";
import crimpImg from "../../assets/crimping_profile/crimp_blue_curved.png";
import alumImg from "../../assets/aluminium_profile/alum_corrugated_stack.jpg";

import zPurlinImg from "../../assets/z_c_purlin/cz_purlin_factory_stack.jpg";
import giAngleImg from "../../assets/gi_angles/gi_angle_bundle.jpg";
import deckSheetImg from "../../assets/deck_sheets/deck_composite_slab.png";
import pebImg from "../../assets/peb_structure/peb_frame_erection.jpg";

import puffPanelImg from "../../assets/puff_panels/puff_3d_exploded.png";
import standingSeamImg from "../../assets/standing_seam/standing_seam_blue_cad.jpg";
import polySheetImg from "../../assets/poly_sheet/poly_clear_corrugated.jpg";
import multiwallImg from "../../assets/multiwall_sheets/multiwall_profile_section.png";
import turboVentImg from "../../assets/turbo_ventilators/turbo_roof_mounted.png";
import louvresImg from "../../assets/louvres/louver_blue_stack.png";
import xlpeFoamImg from "../../assets/xlpe_foam/xlpe_foam_roll.jpg";

// UI Design System Components
const ShelfEdge = ({ progress = 100 }) => (
  <div className="relative mt-3 mb-8 h-[3px] w-full bg-[#E7E5DE] overflow-hidden rounded-full">
    <div
      className="absolute inset-y-0 left-0 bg-[#004060] transition-[width] duration-500 ease-out"
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
      <h2 className="font-display text-2xl md:text-3xl font-extrabold text-[#004060] tracking-tight">
        {title}
      </h2>

      <Link
        to="/products"
        onClick={() => window.scrollTo(0, 0)}
        className="group inline-flex items-center gap-2 font-sans text-sm font-semibold text-[#004060] hover:text-[#003860] transition-colors cursor-pointer"
      >
        View all
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          className="transition-transform group-hover:translate-x-1"
        >
          <path
            d="M3 8h10M9 4l4 4-4 4"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Link>
    </div>
    <ShelfEdge progress={progress} />
  </div>
);

const NavArrow = ({ direction, onClick, label }) => (
  <button
    aria-label={label}
    onClick={onClick}
    className="w-10 h-10 shrink-0 rounded-full border border-[#E7E5DE] bg-white flex items-center justify-center
               text-[#004060] hover:border-[#004060] hover:bg-[#B8D8E8]/20 hover:shadow-md
               focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#004060]
               transition-all duration-200 cursor-pointer z-10"
  >
    <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
      <path
        d={direction === "prev" ? "M10 3L5 8l5 5" : "M6 3l5 5-5 5"}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </button>
);

const ProductCard = ({ product }) => (
  <Link
    to={product.link}
    onClick={() => window.scrollTo(0, 0)}
    className="flex-shrink-0 w-[200px] sm:w-[230px] lg:w-[245px] group cursor-pointer"
  >
    <div className="relative bg-white border border-[#E7E5DE] rounded-2xl p-3 overflow-hidden flex items-center justify-center h-40 sm:h-44
                   transition-all duration-300 ease-out
                   group-hover:-translate-y-1.5 group-hover:scale-[1.02]
                   group-hover:border-[#004060]
                   group-hover:shadow-[0_16px_28px_-14px_rgba(0,64,96,0.25)]">
      {/* Light Reflection Shine Effect */}
      <span className="pointer-events-none absolute inset-0 -translate-x-[120%] rotate-12
                       bg-gradient-to-r from-transparent via-white/40 to-transparent
                       group-hover:translate-x-[120%] transition-transform duration-700 ease-out z-10" />

      {/* Real Product Photo */}
      <img
        src={product.image}
        alt={product.title}
        className="w-full h-full object-cover rounded-xl transition-transform duration-500 ease-out group-hover:scale-105"
        loading="lazy"
      />

      {/* Brand Accent Dot */}
      <span className="absolute top-3 right-3 w-2.5 h-2.5 rounded-full bg-[#004060] border-2 border-white
                       opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-100
                       transition-all duration-300 z-10" />
    </div>

    {/* Title Label underneath */}
    <div className="mt-3 text-center px-1">
      <h3 className="font-sans text-xs sm:text-sm font-bold text-slate-900 group-hover:text-[#004060] transition-colors leading-snug line-clamp-2">
        {product.title}
      </h3>
      {product.subtitle && (
        <span className="text-[11px] text-slate-500 font-medium block mt-0.5">
          {product.subtitle}
        </span>
      )}
    </div>
  </Link>
);

// 1. MS Cold rolled
const msColdRolledProducts = [
  {
    id: 1,
    title: "TATA Cold Rolled Sheets IS 513:2016 CR2",
    subtitle: "High Precision Cold Rolled Sheets",
    image: bareGalvImg,
    link: "/baregalvalume-profile-sheet"
  },
  {
    id: 2,
    title: "AMNS Cold Rolled Sheets IS 513:2016 CR2",
    subtitle: "Superior Flatness CR Steel Sheets",
    image: alumImg,
    link: "/aluminium-profile-sheet"
  },
  {
    id: 3,
    title: "JSW Steel Cold Rolled Coils IS 513:2016 CR4",
    subtitle: "Deep Drawing Grade Cold Rolled Coils",
    image: zPurlinImg,
    link: "/z-purlin-cpurlin"
  },
  {
    id: 4,
    title: "JSW Steel Cold Rolled Sheets IS 513:2016 CR2",
    subtitle: "Durable Industrial Grade Steel",
    image: crimpImg,
    link: "/crimping-profile-sheet"
  },
  {
    id: 5,
    title: "TATA Cold Rolled Sheets IS 513:2016 CR4",
    subtitle: "Extra Deep Draw Structural Steel",
    image: deckSheetImg,
    link: "/deck-sheet"
  }
];

// 2. TMT
const tmtProducts = [
  {
    id: 1,
    title: "JSW One Fe550 TMT Rebar",
    subtitle: "High Ductility Earthquake Resistant Rebars",
    image: pebImg,
    link: "/peb-structure"
  },
  {
    id: 2,
    title: "TATA Tiscon FE 550 SD TMT Rebar",
    subtitle: "Super Ductile Concrete Reinforcement",
    image: giAngleImg,
    link: "/gi-angle"
  },
  {
    id: 3,
    title: "JSPL FE 550D TMT Rebar",
    subtitle: "High Yield Strength Steel Rebars",
    image: zPurlinImg,
    link: "/z-purlin-cpurlin"
  },
  {
    id: 4,
    title: "Bhagwati Fe500 TMT Rebar",
    subtitle: "Corrosion Resistant Heavy Duty Rebar",
    image: pebImg,
    link: "/peb-structure"
  },
  {
    id: 5,
    title: "TATA Tiscon Steel TMT IS 1786:2008 FE 550D",
    subtitle: "Premium Grade Foundation Rebars",
    image: giAngleImg,
    link: "/gi-angle"
  }
];

// 3. Coated Steel
const coatedSteelProducts = [
  {
    id: 1,
    title: "JSW Steel Galvanized Steel Coils IS 277:2018 GP",
    subtitle: "Royal Blue & Multi-Color Coated Steel",
    image: ppglBlueImg,
    link: "/ppgl-ppgi"
  },
  {
    id: 2,
    title: "JSW Steel Galvalume Steel Coils IS 15961:2012 YS550",
    subtitle: "AZ150 High Corrosion Galvalume",
    image: bareGalvImg,
    link: "/baregalvalume-profile-sheet"
  },
  {
    id: 3,
    title: "JSW Steel Galvanized Steel Coils IS 277:2018 GPED",
    subtitle: "Weatherproof Coated Roofing Coils",
    image: ppglGreenImg,
    link: "/ppgl-ppgi"
  },
  {
    id: 4,
    title: "JSW Steel Galvanized Steel Sheets IS 277:2018 GPD",
    subtitle: "Heavy Duty Corrugated GC Sheets",
    image: gcSheetImg,
    link: "/gc-sheet"
  },
  {
    id: 5,
    title: "JSW Steel Galvalume Steel Sheets IS 15961:2012 YS550",
    subtitle: "Aesthetic Step Tile Architectural Roof",
    image: tileProfileImg,
    link: "/tile-profile"
  }
];

// 4. Wire rods
const wireRodsProducts = [
  {
    id: 1,
    title: "JSW Steel Wire Rods Coil SAE4140",
    subtitle: "Thermal XLPE Insulation Foam Roll",
    image: xlpeFoamImg,
    link: "/xlpe"
  },
  {
    id: 2,
    title: "JSW Steel Wire Rods Coil IS 970:1955 EN8M",
    subtitle: "Zero-Power Turbo Roof Ventilators",
    image: turboVentImg,
    link: "/turbo-ventilators"
  },
  {
    id: 3,
    title: "ESL Wire Rods Coil IS 7887:1992 SAE 1010",
    subtitle: "Weatherproof Industrial Air Louvres",
    image: louvresImg,
    link: "/louvres"
  },
  {
    id: 4,
    title: "JSW Steel Wire Rod Coils AWS A5.18:2005 ER70S6",
    subtitle: "Translucent Polycarbonate Daylighting Sheets",
    image: polySheetImg,
    link: "/poly-sheet"
  },
  {
    id: 5,
    title: "VSP Wire Rods Coil IS 7887:1992 SAE 1010",
    subtitle: "Multiwall UV Resistant Skylight Panels",
    image: multiwallImg,
    link: "/multiwall-sheet"
  }
];

// 5. Structural Steel
const structuralSteelProducts = [
  {
    id: 1,
    title: "SAIL Mild Steel Channels E250BR ISMC",
    subtitle: "Heavy Duty Steel Framing Channels",
    image: zPurlinImg,
    link: "/z-purlin-cpurlin"
  },
  {
    id: 2,
    title: "SAIL Mild Steel Channels E450BR ISMC",
    subtitle: "Pre-Engineered Factory Building Frames",
    image: pebImg,
    link: "/peb-structure"
  },
  {
    id: 3,
    title: "SAIL Mild Steel Channels E250A ISMC",
    subtitle: "Galvanized Heavy GI Structural Angles",
    image: giAngleImg,
    link: "/gi-angle"
  },
  {
    id: 4,
    title: "SAIL Mild Steel Beams E250BR NPB",
    subtitle: "High Strength Composite Slab Decking",
    image: deckSheetImg,
    link: "/deck-sheet"
  },
  {
    id: 5,
    title: "SAIL Mild Steel Beams E250BR ISMB",
    subtitle: "PUFF Insulated Structural Roof Panels",
    image: puffPanelImg,
    link: "/puff-panel"
  }
];

export default function ProductSlider() {
  const msScrollRef = useRef(null);
  const tmtScrollRef = useRef(null);
  const coatedScrollRef = useRef(null);
  const wireScrollRef = useRef(null);
  const structuralScrollRef = useRef(null);

  const scroll = (ref, direction) => {
    if (ref.current) {
      const scrollAmount = direction === "left" ? -340 : 340;
      ref.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-16 bg-white font-sans">
      <div className="max-w-7xl mx-auto space-y-16">

        {/* Section 1: MS Cold rolled */}
        <div className="relative group">
          <SectionHeader title="MS Cold rolled" progress={100} />

          <div className="flex items-center gap-3">
            <NavArrow
              direction="prev"
              label="Previous MS Cold rolled products"
              onClick={() => scroll(msScrollRef, "left")}
            />

            <div
              ref={msScrollRef}
              className="flex items-stretch gap-4 overflow-x-auto scrollbar-none scroll-smooth py-3 flex-1"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {msColdRolledProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            <NavArrow
              direction="next"
              label="Next MS Cold rolled products"
              onClick={() => scroll(msScrollRef, "right")}
            />
          </div>
        </div>

        {/* Section 2: TMT */}
        <div className="relative group">
          <SectionHeader title="TMT" progress={100} />

          <div className="flex items-center gap-3">
            <NavArrow
              direction="prev"
              label="Previous TMT products"
              onClick={() => scroll(tmtScrollRef, "left")}
            />

            <div
              ref={tmtScrollRef}
              className="flex items-stretch gap-4 overflow-x-auto scrollbar-none scroll-smooth py-3 flex-1"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {tmtProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            <NavArrow
              direction="next"
              label="Next TMT products"
              onClick={() => scroll(tmtScrollRef, "right")}
            />
          </div>
        </div>

        {/* Section 3: Coated Steel */}
        <div className="relative group">
          <SectionHeader title="Coated Steel" progress={100} />

          <div className="flex items-center gap-3">
            <NavArrow
              direction="prev"
              label="Previous Coated Steel products"
              onClick={() => scroll(coatedScrollRef, "left")}
            />

            <div
              ref={coatedScrollRef}
              className="flex items-stretch gap-4 overflow-x-auto scrollbar-none scroll-smooth py-3 flex-1"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {coatedSteelProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            <NavArrow
              direction="next"
              label="Next Coated Steel products"
              onClick={() => scroll(coatedScrollRef, "right")}
            />
          </div>
        </div>

        {/* Section 4: Wire rods */}
        <div className="relative group">
          <SectionHeader title="Wire rods" progress={100} />

          <div className="flex items-center gap-3">
            <NavArrow
              direction="prev"
              label="Previous Wire rods products"
              onClick={() => scroll(wireScrollRef, "left")}
            />

            <div
              ref={wireScrollRef}
              className="flex items-stretch gap-4 overflow-x-auto scrollbar-none scroll-smooth py-3 flex-1"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {wireRodsProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            <NavArrow
              direction="next"
              label="Next Wire rods products"
              onClick={() => scroll(wireScrollRef, "right")}
            />
          </div>
        </div>

        {/* Section 5: Structural Steel */}
        <div className="relative group">
          <SectionHeader title="Structural Steel" progress={100} />

          <div className="flex items-center gap-3">
            <NavArrow
              direction="prev"
              label="Previous Structural Steel products"
              onClick={() => scroll(structuralScrollRef, "left")}
            />

            <div
              ref={structuralScrollRef}
              className="flex items-stretch gap-4 overflow-x-auto scrollbar-none scroll-smooth py-3 flex-1"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {structuralSteelProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            <NavArrow
              direction="next"
              label="Next Structural Steel products"
              onClick={() => scroll(structuralScrollRef, "right")}
            />
          </div>
        </div>

      </div>
    </section>
  );
}
