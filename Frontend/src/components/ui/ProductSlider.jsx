import React, { useRef } from "react";
import { Link } from "react-router-dom";

// Metallic SVG Renderings for crisp visual fidelity
const SteelSheetIllustration = () => (
  <svg viewBox="0 0 200 120" className="w-28 sm:w-36 h-20 sm:h-24 drop-shadow-md">
    <defs>
      <linearGradient id="metalGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#f1f5f9" />
        <stop offset="35%" stopColor="#cbd5e1" />
        <stop offset="70%" stopColor="#94a3b8" />
        <stop offset="100%" stopColor="#64748b" />
      </linearGradient>
      <linearGradient id="metalTop" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="50%" stopColor="#e2e8f0" />
        <stop offset="100%" stopColor="#cbd5e1" />
      </linearGradient>
      <linearGradient id="specular" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="rgba(255,255,255,0.8)" />
        <stop offset="50%" stopColor="rgba(255,255,255,0)" />
      </linearGradient>
    </defs>
    {/* Bottom Sheet */}
    <polygon points="30,70 140,35 175,55 65,90" fill="url(#metalGrad1)" />
    <polygon points="30,70 65,90 65,95 30,75" fill="#475569" />
    <polygon points="65,90 175,55 175,60 65,95" fill="#334155" />

    {/* Middle Sheet */}
    <polygon points="28,62 138,27 173,47 63,82" fill="url(#metalTop)" />
    <polygon points="28,62 63,82 63,87 28,67" fill="#64748b" />
    <polygon points="63,82 173,47 173,52 63,87" fill="#475569" />

    {/* Top Sheet */}
    <polygon points="25,54 135,19 170,39 60,74" fill="url(#metalTop)" />
    <polygon points="25,54 60,74 60,59 25,39" fill="url(#metalTop)" />
    <polygon points="25,54 60,74 60,78 25,58" fill="#94a3b8" />
    <polygon points="60,74 170,39 170,43 60,78" fill="#64748b" />
    
    {/* Glossy Reflection Highlight */}
    <polygon points="45,47 95,31 115,37 65,53" fill="url(#specular)" />
  </svg>
);

const SteelCoilIllustration = () => (
  <svg viewBox="0 0 200 140" className="w-24 sm:w-32 h-20 sm:h-24 drop-shadow-md">
    <defs>
      <linearGradient id="coilGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#f8fafc" />
        <stop offset="50%" stopColor="#94a3b8" />
        <stop offset="100%" stopColor="#475569" />
      </linearGradient>
      <linearGradient id="coilHole" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#1e293b" />
        <stop offset="100%" stopColor="#0f172a" />
      </linearGradient>
    </defs>
    {/* Bottom Left Coil */}
    <g transform="translate(20, 35)">
      <ellipse cx="40" cy="40" rx="32" ry="24" fill="url(#coilGrad)" />
      <ellipse cx="40" cy="40" rx="18" ry="12" fill="url(#coilHole)" />
      <path d="M 72 40 L 72 65 A 32 24 0 0 1 8 65 L 8 40 Z" fill="#64748b" />
    </g>
    {/* Bottom Right Coil */}
    <g transform="translate(85, 35)">
      <ellipse cx="40" cy="40" rx="32" ry="24" fill="url(#coilGrad)" />
      <ellipse cx="40" cy="40" rx="18" ry="12" fill="url(#coilHole)" />
      <path d="M 72 40 L 72 65 A 32 24 0 0 1 8 65 L 8 40 Z" fill="#64748b" />
    </g>
    {/* Top Center Coil */}
    <g transform="translate(52, 5)">
      <ellipse cx="40" cy="40" rx="32" ry="24" fill="url(#coilGrad)" stroke="#cbd5e1" strokeWidth="1" />
      <ellipse cx="40" cy="40" rx="18" ry="12" fill="url(#coilHole)" />
      <path d="M 72 40 L 72 60 A 32 24 0 0 1 8 60 L 8 40 Z" fill="#475569" />
    </g>
  </svg>
);

const TMTRebarIllustration = () => (
  <svg viewBox="0 0 200 120" className="w-28 sm:w-36 h-20 sm:h-24 drop-shadow-md">
    <defs>
      <linearGradient id="rebarGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="40%" stopColor="#cbd5e1" />
        <stop offset="80%" stopColor="#64748b" />
        <stop offset="100%" stopColor="#334155" />
      </linearGradient>
    </defs>
    <g transform="rotate(-15, 100, 60)">
      {/* Rebar Rod 1 */}
      <rect x="20" y="20" width="160" height="14" rx="7" fill="url(#rebarGrad)" />
      {[...Array(12)].map((_, i) => (
        <line key={i} x1={30 + i * 12} y1="20" x2={36 + i * 12} y2="34" stroke="#475569" strokeWidth="2.5" strokeLinecap="round" />
      ))}

      {/* Rebar Rod 2 */}
      <rect x="15" y="42" width="170" height="16" rx="8" fill="url(#rebarGrad)" />
      {[...Array(13)].map((_, i) => (
        <line key={i} x1={25 + i * 12} y1="42" x2={31 + i * 12} y2="58" stroke="#334155" strokeWidth="3" strokeLinecap="round" />
      ))}

      {/* Rebar Rod 3 */}
      <rect x="25" y="66" width="150" height="14" rx="7" fill="url(#rebarGrad)" />
      {[...Array(11)].map((_, i) => (
        <line key={i} x1={35 + i * 12} y1="66" x2={41 + i * 12} y2="80" stroke="#475569" strokeWidth="2.5" strokeLinecap="round" />
      ))}
    </g>
  </svg>
);

const WireRodIllustration = () => (
  <svg viewBox="0 0 160 120" className="w-24 sm:w-28 h-20 sm:h-24 drop-shadow-md">
    <g transform="translate(10, 10)">
      {/* Concentric wire coil rings */}
      {[...Array(6)].map((_, i) => (
        <ellipse
          key={i}
          cx="70"
          cy="50"
          rx={42 - i * 3.5}
          ry={32 - i * 2.5}
          fill="none"
          stroke="#475569"
          strokeWidth="3.5"
        />
      ))}
      {[...Array(6)].map((_, i) => (
        <ellipse
          key={`highlight-${i}`}
          cx="70"
          cy="50"
          rx={40.5 - i * 3.5}
          ry={30.5 - i * 2.5}
          fill="none"
          stroke="#cbd5e1"
          strokeWidth="1.5"
        />
      ))}
      {/* Vertical & Horizontal binding straps */}
      <rect x="67" y="16" width="6" height="68" rx="2" fill="#1e293b" />
      <rect x="26" y="47" width="88" height="6" rx="2" fill="#1e293b" />
    </g>
  </svg>
);

const StructuralSteelIllustration = () => (
  <svg viewBox="0 0 200 130" className="w-28 sm:w-36 h-20 sm:h-24 drop-shadow-md">
    <defs>
      <linearGradient id="beamMetal" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="40%" stopColor="#cbd5e1" />
        <stop offset="80%" stopColor="#64748b" />
        <stop offset="100%" stopColor="#334155" />
      </linearGradient>
    </defs>
    <g transform="translate(10, 10)">
      {/* Bottom I-Beam */}
      <path d="M 30 75 L 140 40 L 170 55 L 60 90 Z" fill="url(#beamMetal)" />
      <polygon points="30,75 60,90 60,96 30,81" fill="#475569" />
      <polygon points="60,90 170,55 170,61 60,96" fill="#334155" />

      {/* Middle I-Beam (Cross stack) */}
      <path d="M 45 45 L 155 75 L 135 90 L 25 60 Z" fill="url(#beamMetal)" />
      <polygon points="25,60 135,90 135,96 25,66" fill="#475569" />
      <polygon points="135,90 155,75 155,81 135,96" fill="#334155" />

      {/* Top I-Beam */}
      <path d="M 35 30 L 145 0 L 175 15 L 65 45 Z" fill="url(#beamMetal)" />
      <polygon points="35,30 65,45 65,51 35,36" fill="#475569" />
      <polygon points="65,45 175,15 175,21 65,51" fill="#334155" />

      {/* Specular Highlight */}
      <polygon points="45,27 135,0 150,5 60,32" fill="rgba(255,255,255,0.7)" />
    </g>
  </svg>
);

// UI Design System Components matching Categories.jsx
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

      <Link
        to="/products"
        className="group inline-flex items-center gap-2 font-['Inter',sans-serif] text-sm font-medium text-[#14152B] hover:text-[#0F766E] transition-colors"
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
            strokeWidth="1.5"
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

const AnimatedLabel = ({ children, className = "" }) => (
  <span className={`relative inline-block ${className}`}>
    <span className="inline-block transition-transform duration-300 ease-out group-hover:-translate-y-0.5">
      {children}
    </span>
    <span
      className="absolute left-1/2 -bottom-0.5 h-[1.5px] bg-[#0F766E] rounded-full
                 w-0 group-hover:w-full -translate-x-1/2
                 transition-[width] duration-300 ease-out"
    />
  </span>
);

const ProductCard = ({ product, renderIllustration }) => (
  <Link
    to={product.link}
    className="flex-shrink-0 w-[190px] sm:w-[215px] lg:w-[225px] group cursor-pointer"
  >
    <div className="relative bg-white border border-[#E7E5DE] rounded-2xl p-4 overflow-hidden flex items-center justify-center h-36 sm:h-40
                   transition-all duration-300 ease-out
                   group-hover:-translate-y-1.5 group-hover:scale-[1.03]
                   group-hover:border-[#0F766E]
                   group-hover:shadow-[0_16px_28px_-14px_rgba(20,21,43,0.28)]">
      {/* Light Reflection Shine Effect */}
      <span className="pointer-events-none absolute inset-0 -translate-x-[120%] rotate-12
                       bg-gradient-to-r from-transparent via-white/60 to-transparent
                       group-hover:translate-x-[120%] transition-transform duration-700 ease-out" />
      
      {/* Metallic Product Illustration */}
      <div className="transition-transform duration-500 ease-out group-hover:scale-110">
        {renderIllustration(product.type)}
      </div>

      {/* Yellow Top-Right Accent Dot */}
      <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-[#F2B807]
                       opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-100
                       transition-all duration-300" />
    </div>

    {/* Title Label underneath */}
    <h3 className="mt-3 text-center">
      <AnimatedLabel className="font-['Inter',sans-serif] text-xs sm:text-sm font-medium text-[#14152B] group-hover:text-[#0F766E] transition-colors leading-snug line-clamp-2">
        {product.title}
      </AnimatedLabel>
    </h3>
  </Link>
);

const msColdRolledProducts = [
  {
    id: 1,
    title: "TATA Cold Rolled Sheets IS 513:2016 CR2",
    type: "sheet",
    link: "/products"
  },
  {
    id: 2,
    title: "AMNS Cold Rolled Sheets IS 513:2016 CR2",
    type: "sheet",
    link: "/products"
  },
  {
    id: 3,
    title: "JSW Steel Cold Rolled Coils IS 513:2016 CR4",
    type: "coil",
    link: "/products"
  },
  {
    id: 4,
    title: "JSW Steel Cold Rolled Sheets IS 513:2016 CR2",
    type: "sheet",
    link: "/products"
  },
  {
    id: 5,
    title: "TATA Cold Rolled Sheets IS 513:2016 CR4",
    type: "sheet",
    link: "/products"
  },
  {
    id: 6,
    title: "AMNS Cold Rolled Coils IS 513:2016 CR3",
    type: "coil",
    link: "/products"
  }
];

const tmtProducts = [
  {
    id: 1,
    title: "JSW One Fe550 TMT Rebar",
    type: "tmt",
    link: "/products"
  },
  {
    id: 2,
    title: "TATA Tiscon FE 550 SD TMT Rebar",
    type: "tmt",
    link: "/products"
  },
  {
    id: 3,
    title: "JSPL FE 550D TMT Rebar",
    type: "tmt",
    link: "/products"
  },
  {
    id: 4,
    title: "Bhagwati Fe500 TMT Rebar",
    type: "tmt",
    link: "/products"
  },
  {
    id: 5,
    title: "TATA Tiscon Steel TMT IS 1786:2008 FE 550D",
    type: "tmt",
    link: "/products"
  },
  {
    id: 6,
    title: "Jindal Panther Fe 550D TMT Rebar",
    type: "tmt",
    link: "/products"
  }
];

const coatedSteelProducts = [
  {
    id: 1,
    title: "JSW Steel Galvanized Steel Coils IS 277:2018 GP",
    type: "coil",
    link: "/products"
  },
  {
    id: 2,
    title: "JSW Steel Galvalume Steel Coils IS 15961:2012 YS550",
    type: "coil",
    link: "/products"
  },
  {
    id: 3,
    title: "JSW Steel Galvanized Steel Coils IS 277:2018 GPED",
    type: "coil",
    link: "/products"
  },
  {
    id: 4,
    title: "JSW Steel Galvanized Steel Sheets IS 277:2018 GPD",
    type: "sheet",
    link: "/products"
  },
  {
    id: 5,
    title: "JSW Steel Galvalume Steel Sheets IS 15961:2012 YS550",
    type: "sheet",
    link: "/products"
  },
  {
    id: 6,
    title: "TATA Steel Galvanized Steel Coils IS 277:2018 GP",
    type: "coil",
    link: "/products"
  }
];

const wireRodsProducts = [
  {
    id: 1,
    title: "JSW Steel Wire Rods Coil SAE4140",
    type: "wirerod",
    link: "/products"
  },
  {
    id: 2,
    title: "JSW Steel Wire Rods Coil IS 970:1955 EN8M",
    type: "wirerod",
    link: "/products"
  },
  {
    id: 3,
    title: "ESL Wire Rods Coil IS 7887:1992 SAE 1010",
    type: "wirerod",
    link: "/products"
  },
  {
    id: 4,
    title: "JSW Steel Wire Rod Coils AWS A5.18:2005 ER70S6",
    type: "wirerod",
    link: "/products"
  },
  {
    id: 5,
    title: "VSP Wire Rods Coil IS 7887:1992 SAE 1010",
    type: "wirerod",
    link: "/products"
  },
  {
    id: 6,
    title: "TATA Steel Wire Rod Coils IS 7887:1992 SAE 1008",
    type: "wirerod",
    link: "/products"
  }
];

const structuralSteelProducts = [
  {
    id: 1,
    title: "SAIL Mild Steel Channels E250BR ISMC",
    type: "structural",
    link: "/products"
  },
  {
    id: 2,
    title: "SAIL Mild Steel Channels E450BR ISMC",
    type: "structural",
    link: "/products"
  },
  {
    id: 3,
    title: "SAIL Mild Steel Channels E250A ISMC",
    type: "structural",
    link: "/products"
  },
  {
    id: 4,
    title: "SAIL Mild Steel Beams E250BR NPB",
    type: "structural",
    link: "/products"
  },
  {
    id: 5,
    title: "SAIL Mild Steel Beams E250BR ISMB",
    type: "structural",
    link: "/products"
  },
  {
    id: 6,
    title: "SAIL Mild Steel Beams E350BR ISMB",
    type: "structural",
    link: "/products"
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
      const scrollAmount = direction === "left" ? -320 : 320;
      ref.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const renderProductIllustration = (type) => {
    switch (type) {
      case "coil":
        return <SteelCoilIllustration />;
      case "tmt":
        return <TMTRebarIllustration />;
      case "wirerod":
        return <WireRodIllustration />;
      case "structural":
        return <StructuralSteelIllustration />;
      case "sheet":
      default:
        return <SteelSheetIllustration />;
    }
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-16 bg-white font-['Inter',sans-serif]">
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
                <ProductCard
                  key={product.id}
                  product={product}
                  renderIllustration={renderProductIllustration}
                />
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
                <ProductCard
                  key={product.id}
                  product={product}
                  renderIllustration={renderProductIllustration}
                />
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
                <ProductCard
                  key={product.id}
                  product={product}
                  renderIllustration={renderProductIllustration}
                />
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
                <ProductCard
                  key={product.id}
                  product={product}
                  renderIllustration={renderProductIllustration}
                />
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
                <ProductCard
                  key={product.id}
                  product={product}
                  renderIllustration={renderProductIllustration}
                />
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
