import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, ArrowRight, ShieldCheck } from "lucide-react";

// Importing Real Product Photos from Assets
import ppglBlueImg from "../../../assets/ppgl_profile/royal_blue_ppgl_stack.jpg";
import ppglGreenImg from "../../../assets/ppgl_profile/jsw_green_colouron.jpg";
import bareGalvImg from "../../../assets/bare_galvalume/bare_galv_factory_stack.jpg";
import gcSheetImg from "../../../assets/gc_sheets/gc_green_jsw_stack.jpg";
import tileProfileImg from "../../../assets/tile_profile/tile_red_jsw_trust.jpg";
import crimpImg from "../../../assets/crimping_profile/crimp_blue_curved.png";
import alumImg from "../../../assets/aluminium_profile/alum_corrugated_stack.jpg";

import zPurlinImg from "../../../assets/z_c_purlin/cz_purlin_factory_stack.jpg";
import giAngleImg from "../../../assets/gi_angles/gi_angle_bundle.jpg";
import deckSheetImg from "../../../assets/deck_sheets/deck_composite_slab.png";
import pebImg from "../../../assets/peb_structure/peb_frame_erection.jpg";

import puffPanelImg from "../../../assets/puff_panels/puff_3d_exploded.png";
import standingSeamImg from "../../../assets/standing_seam/standing_seam_blue_cad.jpg";
import polySheetImg from "../../../assets/poly_sheet/poly_clear_corrugated.jpg";
import multiwallImg from "../../../assets/multiwall_sheets/multiwall_profile_section.png";
import turboVentImg from "../../../assets/turbo_ventilators/turbo_roof_mounted.png";
import louvresImg from "../../../assets/louvres/louver_blue_stack.png";
import xlpeFoamImg from "../../../assets/xlpe_foam/xlpe_foam_roll.jpg";

// Data grouped by category
const productCategories = {
  coated: {
    title: "Coated Steel & Coils",
    desc: "Galvalume, galvanized and pre-painted steel coils and sheets engineered for maximum corrosion resistance.",
    items: [
      {
        id: "c1",
        title: "JSW Steel PPGL Coils IS 15961:2012",
        subtitle: "Royal Blue & Multi-Color Pre-Painted Coils",
        standard: "IS 15961 / ASTM A792",
        thickness: "0.30mm - 0.80mm",
        coating: "AZ150 (150 gsm Al-Zn)",
        image: ppglBlueImg,
        link: "/allproduct/mildsteel/ppgl-ppgi",
      },
      {
        id: "c2",
        title: "Bare Galvalume Sheets AZ150 YS550",
        subtitle: "High Solar Reflectance Roofing Sheets",
        standard: "IS 15961 YS 550 MPa",
        thickness: "0.35mm - 0.70mm",
        coating: "AZ150 Bare Galvalume",
        image: bareGalvImg,
        link: "/allproduct/mildsteel/baregalvalume-profile-sheet",
      },
      {
        id: "c3",
        title: "JSW Colouron+ Weatherproof Coils",
        subtitle: "SMP / PVDF High Durability Paint Finish",
        standard: "IS 14246:2013 Class 1",
        thickness: "0.45mm - 0.60mm",
        coating: "RMP / SMP Anti-Chipping",
        image: ppglGreenImg,
        link: "/allproduct/mildsteel/ppgl-ppgi",
      },
      {
        id: "c4",
        title: "JSW Corrugated GC Sheets IS 277",
        subtitle: "Heavy Gauge Zinc Coated Roofing",
        standard: "IS 277:2018 GPD",
        thickness: "0.50mm - 0.80mm",
        coating: "120 GSM Pure Zinc",
        image: gcSheetImg,
        link: "/allproduct/mildsteel/gc-sheet",
      },
      {
        id: "c5",
        title: "JSW Trust Step Tile Architectural Roof",
        subtitle: "Aesthetic Terracotta Finish for Villas",
        standard: "IS 15961 / Step Tile",
        thickness: "0.45mm - 0.50mm",
        coating: "High Durability Polyester",
        image: tileProfileImg,
        link: "/allproduct/mildsteel/tile-profile",
      },
    ],
  },
  tmt: {
    title: "TMT Rebars & Reinforcement",
    desc: "High-ductility seismic-resistant thermo-mechanically treated rebars sourced from India's prime primary producers.",
    items: [
      {
        id: "t1",
        title: "JSW Neosteel Fe 550D TMT Rebar",
        subtitle: "High Ductility Earthquake Resistant Rebars",
        standard: "IS 1786:2008 Fe 550D",
        thickness: "8mm - 32mm Diameter",
        coating: "Superior Rib Bonding",
        image: pebImg,
        link: "/allproduct/mildsteel/peb-structure",
      },
      {
        id: "t2",
        title: "TATA Tiscon 550 Super Ductile (SD)",
        subtitle: "Ultra High Yield Strength Foundation Steel",
        standard: "IS 1786:2008 SD",
        thickness: "8mm - 36mm Diameter",
        coating: "Low Carbon Equivalent",
        image: giAngleImg,
        link: "/allproduct/mildsteel/gi-angle",
      },
      {
        id: "t3",
        title: "JSPL Panther Fe 550D Rebars",
        subtitle: "Consistent Core Ductility for High Rises",
        standard: "IS 1786 Certified",
        thickness: "10mm - 32mm Diameter",
        coating: "Excellent Bendability",
        image: zPurlinImg,
        link: "/allproduct/mildsteel/z-purlin-cpurlin",
      },
      {
        id: "t4",
        title: "Electrosteel Fe 500D Primary Rebar",
        subtitle: "Corrosion Resistant Heavy Duty Concrete Steel",
        standard: "IS 1786:2008 Fe 500D",
        thickness: "8mm - 25mm Diameter",
        coating: "Certified Chem Specs",
        image: pebImg,
        link: "/allproduct/mildsteel/peb-structure",
      },
      {
        id: "t5",
        title: "Structural TMT Billet-Rolled Rebars",
        subtitle: "Heavy Commercial Foundation Ready",
        standard: "IS 1786 Fe 550D",
        thickness: "12mm - 40mm Diameter",
        coating: "100% Spark Tested",
        image: giAngleImg,
        link: "/allproduct/mildsteel/gi-angle",
      },
    ],
  },
  cr: {
    title: "Cold Rolled (CR) Steel",
    desc: "Superior flatness, uniform thickness, and clean surface finish for precision fabrication and stamping.",
    items: [
      {
        id: "cr1",
        title: "TATA Steel CR Sheets IS 513 CR2",
        subtitle: "High Precision Cold Rolled Sheets",
        standard: "IS 513:2016 CR2",
        thickness: "0.50mm - 2.50mm",
        coating: "Oiled Surface Clean",
        image: bareGalvImg,
        link: "/allproduct/mildsteel/baregalvalume-profile-sheet",
      },
      {
        id: "cr2",
        title: "AM/NS India Cold Rolled Sheets CR3",
        subtitle: "Superior Flatness Deep Drawing Steel",
        standard: "IS 513:2016 CR3 / EDD",
        thickness: "0.60mm - 2.00mm",
        coating: "Cold Reduced Annealed",
        image: alumImg,
        link: "/allproduct/mildsteel/alumium-profile-sheet",
      },
      {
        id: "cr3",
        title: "JSW Steel Cold Rolled Coils CR4",
        subtitle: "Extra Deep Draw Quality Structural Coils",
        standard: "IS 513:2016 CR4",
        thickness: "0.70mm - 3.00mm",
        coating: "Skin Passed Finish",
        image: zPurlinImg,
        link: "/allproduct/mildsteel/z-purlin-cpurlin",
      },
      {
        id: "cr4",
        title: "Commercial CR Precision Slit Coils",
        subtitle: "Automotive & Appliance Grade Slit Widths",
        standard: "IS 513 Grade D",
        thickness: "0.40mm - 1.80mm",
        coating: "Lightly Oiled",
        image: crimpImg,
        link: "/allproduct/mildsteel/crimping-profile-sheet",
      },
      {
        id: "cr5",
        title: "Heavy Gauge CR Formable Sheets",
        subtitle: "Industrial Panels & Electrical Enclosures",
        standard: "IS 513:2016 CR1",
        thickness: "1.00mm - 3.20mm",
        coating: "Pickled & Cold Rolled",
        image: deckSheetImg,
        link: "/allproduct/mildsteel/deck-sheet",
      },
    ],
  },
  structural: {
    title: "Structural Purlins & Sections",
    desc: "Engineered cold-formed Z & C purlins, metal decking, and GI angles for rapid erection of industrial frameworks.",
    items: [
      {
        id: "st1",
        title: "Cold Formed Z & C Purlins IS 811",
        subtitle: "Pre-Punched CNC Slotted Steel Framing",
        standard: "IS 811 / IS 2062 E250-E350",
        thickness: "1.50mm - 3.00mm",
        coating: "120-275 GSM Galvanized",
        image: zPurlinImg,
        link: "/allproduct/mildsteel/z-purlin-cpurlin",
      },
      {
        id: "st2",
        title: "High Tensile Metal Deck Sheets",
        subtitle: "52mm / 75mm Profile Composite Slab",
        standard: "IS 277 / ASTM A653",
        thickness: "0.80mm - 1.60mm",
        coating: "Z275 Heavy Zinc",
        image: deckSheetImg,
        link: "/allproduct/mildsteel/deck-sheet",
      },
      {
        id: "st3",
        title: "Hot Dip Galvanized GI Angles",
        subtitle: "Transmission & Solar Mounting Angles",
        standard: "IS 2062 / IS 4759",
        thickness: "3mm - 20mm Leg Size",
        coating: "80-120 Micron Zinc",
        image: giAngleImg,
        link: "/allproduct/mildsteel/gi-angle",
      },
      {
        id: "st4",
        title: "Pre-Engineered PEB Rafters & Columns",
        subtitle: "High Yield Built-Up Plate Sections",
        standard: "AWS D1.1 / IS 2062 E350",
        thickness: "Custom Fabricated",
        coating: "Epoxy Primer / PU Coated",
        image: pebImg,
        link: "/allproduct/mildsteel/peb-structure",
      },
      {
        id: "st5",
        title: "Polycarbonate High Impact Corrugated",
        subtitle: "100% Virgin Bayer/SABIC Resin Panels",
        standard: "UV 50 Micron Protected",
        thickness: "1.00mm - 3.00mm",
        coating: "Co-Extruded UV Block",
        image: polySheetImg,
        link: "/allproduct/mildsteel/poly-sheet",
      },
    ],
  },
};

export default function ProductSlider() {
  const [activeTab, setActiveTab] = useState("coated");
  const scrollRef = useRef(null);

  const currentCategory = productCategories[activeTab];

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.75;
      scrollRef.current.scrollTo({
        left: direction === "left" ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="bg-white py-12 sm:py-16 lg:py-20 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6">
          <div className="max-w-2xl">
            
            <h2 className="font-['Sora',sans-serif] text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0B1729] tracking-tight">
              Featured Material Specifications
            </h2>
            <p className="mt-2 font-['Inter',sans-serif] text-sm sm:text-base text-slate-600 leading-relaxed">
              {currentCategory.desc}
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto">
            <button
              onClick={() => scroll("left")}
              aria-label="Scroll left"
              className="w-10 h-10 rounded-full border border-slate-300 bg-white hover:bg-slate-100 flex items-center justify-center text-slate-700 hover:text-[#081827] transition shadow-xs cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll("right")}
              aria-label="Scroll right"
              className="w-10 h-10 rounded-full border border-slate-300 bg-white hover:bg-slate-100 flex items-center justify-center text-slate-700 hover:text-[#081827] transition shadow-xs cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Category Navigation Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 scrollbar-none">
          {Object.entries(productCategories).map(([key, cat]) => {
            const isActive = activeTab === key;
            return (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`whitespace-nowrap px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-[#081827] text-white shadow-md shadow-[#081827]/20"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                {cat.title}
              </button>
            );
          })}
        </div>

        {/* Product Carousel Grid */}
        <div
          ref={scrollRef}
          className="flex items-stretch gap-5 overflow-x-auto pb-6 pt-2 scrollbar-none scroll-smooth"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {currentCategory.items.map((product) => (
            <article
              key={product.id}
              className="group flex w-[280px] sm:w-[320px] flex-shrink-0 flex-col rounded-xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-[#004060] hover:shadow-xl"
            >
              {/* Image Preview with Zoom */}
              <div className="relative h-44 w-full overflow-hidden rounded-t-xl bg-slate-100">
                <img
                  src={product.image}
                  alt={product.title}
                  className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-108"
                  loading="lazy"
                />
                <span className="absolute top-3 right-3 rounded-full bg-[#E3A72F] px-2.5 py-0.5 text-[10px] font-bold text-[#081827] shadow-sm">
                  {product.coating}
                </span>
              </div>

              {/* Card Details */}
              <div className="flex flex-1 flex-col justify-between p-5">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#004060]">
                    {product.standard}
                  </span>
                  <h3 className="mt-1.5 font-['Sora',sans-serif] text-base font-bold text-slate-900 leading-snug group-hover:text-[#004060] transition-colors">
                    {product.title}
                  </h3>
                  <p className="mt-1 text-xs text-slate-500 leading-relaxed">
                    {product.subtitle}
                  </p>

                  <div className="mt-4 rounded-lg bg-slate-50 p-2.5 text-[11px] text-slate-600 space-y-1 border border-slate-100">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Thickness Range:</span>
                      <span className="font-semibold text-slate-800">{product.thickness}</span>
                    </div>
                  </div>
                </div>

                {/* Card Action */}
                <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-3">
                  <Link
                    to={product.link}
                    className="text-xs font-bold text-[#004060] hover:text-[#E3A72F] transition-colors inline-flex items-center gap-1"
                  >
                    <span>Full Specs</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  <Link
                    to="/contact"
                    className="rounded bg-[#E3A72F] hover:bg-[#F2BF51] px-3 py-1.5 text-xs font-bold text-[#081827] transition shadow-xs"
                  >
                    Request Quote
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}
