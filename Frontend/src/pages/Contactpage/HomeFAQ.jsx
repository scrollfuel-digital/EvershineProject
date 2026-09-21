import { useState } from "react";
import { Plus, Minus, ChevronLeft, ChevronRight, CheckCircle2 } from "lucide-react";

const allFaqs = [
  {
    id: 1,
    q: "How do you verify the authenticity and grade of steel materials?",
    a: "Every product supplied by Evershine is sourced directly from primary mills (JSW Steel, Tata Steel, AM/NS India, and APL Apollo). Each consignment is accompanied by an authentic Mill Test Certificate (MTC) detailing heat numbers, chemical composition, tensile yield strength, and certified coating mass (e.g. AZ150 / 120 GSM).",
  },
  {
    id: 2,
    q: "Can you provide custom cut-to-length sheets and pre-crimped curved profiles?",
    a: "Yes. Our automated CNC roll-forming facilities manufacture custom cut-to-length roofing and cladding sheets up to 12 meters to eliminate site overlap wastage. We also provide precision concave and convex crimping curves tailored to your architectural radius.",
  },
  {
    id: 3,
    q: "What is your typical turnaround and dispatch timeline for project deliveries?",
    a: "Standard inventory items (Bare Galvalume, PPGL coils, TMT rebars, and standard GI angles) ship within 24 to 48 hours. Custom roll-formed sheets, slotted Z & C purlins, and insulated PUFF panels typically dispatch within 3 to 7 business days across India.",
  },
  {
    id: 4,
    q: "What are your minimum order quantities (MOQ) for project pricing?",
    a: "We support both regional MSME contractors and large EPC builders. While immediate ex-stock items can be purchased in smaller batches, competitive project-rate pricing starts at 5 Metric Tonnes (MT), with tiered volume discounts on orders exceeding 20 MT.",
  },
  {
    id: 5,
    q: "Do you offer technical consultation for span design and wind-load calculations?",
    a: "Yes. Our technical team assists engineers and architects with wind-load checks according to IS 875 (Part 3), purlin spacing optimization, composite deck slab load-deflection analysis, and optimal coating selection based on site conditions.",
  },
  {
    id: 6,
    q: "What payment and GST invoice options are available for contractors?",
    a: "We offer transparent B2B commercial terms including direct mill-rate GST invoices, electronic RTGS/NEFT payment processing, and flexible credit facilities for registered MSMEs and pre-approved recurring infrastructure contractors.",
  },
  {
    id: 7,
    q: "How do Galvalume (AZ150) and Galvanized (GI) coatings compare in coastal zones?",
    a: "Galvalume (55% Al-Zn alloy) offers 3 to 4 times greater atmospheric corrosion resistance than standard Galvanized steel in marine and industrial environments, preventing edge-creep and surface discoloration.",
  },
  {
    id: 8,
    q: "Can you assist with structural purlin spacing and composite deck calculations?",
    a: "Yes. Our in-house engineering desk provides span-load tables, moment capacity charts, and fastener spacing recommendations compliant with National Building Code (NBC) standards.",
  },
  {
    id: 9,
    q: "What profile thicknesses and widths are available for metal roofing?",
    a: "We roll-form bare and prepainted steel from 0.35 mm up to 0.80 mm BMT, in overall widths of 1060 mm (effective cover 1000 mm), as well as standing seam 400 mm / 430 mm architectural profiles.",
  },
  {
    id: 10,
    q: "Do you manufacture custom matching ridge caps, gutters, and flashings?",
    a: "Yes, our sheet metal shop produces color-matched 3-meter flashings, apron flashing, drip edges, industrial box gutters, and corner trims using the identical coil batch to ensure 100% color consistency.",
  },
  {
    id: 11,
    q: "Are insulated PUFF and PIR sandwich panels fire-rated?",
    a: "Yes. Our continuous-line polyurethane and polyisocyanurate (PIR) insulated roof and wall panels conform to Class B1/B2 fire-retardant standards with self-extinguishing core formulations.",
  },
  {
    id: 12,
    q: "How do I request an immediate bulk wholesale price quotation?",
    a: "You can click 'Click Here to buy now' above or type your inquiry directly in the 'Any Question?' box to connect instantly with our commercial procurement desk on WhatsApp.",
  },
];

const ITEMS_PER_PAGE = 6;

export default function HomeFAQ() {
  const [openIdx, setOpenIdx] = useState(null);
  const [page, setPage] = useState(0);
  const [userQuestion, setUserQuestion] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const totalPages = Math.ceil(allFaqs.length / ITEMS_PER_PAGE);
  const currentFaqs = allFaqs.slice(
    page * ITEMS_PER_PAGE,
    (page + 1) * ITEMS_PER_PAGE
  );

  const toggle = (id) => {
    setOpenIdx(openIdx === id ? null : id);
  };

  const handleSendQuestion = (e) => {
    e.preventDefault();
    if (!userQuestion.trim()) return;

    const message = `Hello Evershine Team! I have a question regarding steel procurement:%0A%0A"${encodeURIComponent(
      userQuestion.trim()
    )}"`;

    window.open(`https://wa.me/919860118911?text=${message}`, "_blank");
    setSubmitted(true);
    setUserQuestion("");
  };

  return (
    <section className="relative bg-white py-14 sm:py-20 overflow-hidden font-['Inter',sans-serif]">
      {/* Background Watermark Heading matching the reference screenshot */}
      <div className="absolute top-3 sm:top-5 left-1/2 -translate-x-1/2 w-full text-center pointer-events-none select-none z-0">
        <span className="font-['Sora',sans-serif] text-5xl sm:text-7xl md:text-8xl font-black text-slate-100/90 whitespace-nowrap tracking-wide">
          Frequently Ask Question
        </span>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        
        {/* Title & Subtitle */}
        <div className="text-center mb-10 sm:mb-12">
          <h2 className="font-['Sora',sans-serif] text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0B1729] tracking-tight">
            Frequently Ask Question
          </h2>
          <p className="mt-2 font-['Inter',sans-serif] text-sm sm:text-base font-semibold text-[#285870] hover:text-[#004060] transition cursor-pointer">
            <a href="#contact-form" onClick={(e) => {
              e.preventDefault();
              const target = document.getElementById("contact-form") || document.getElementById("quick-calculator");
              target?.scrollIntoView({ behavior: "smooth" });
            }}>
              Click Here to buy now.
            </a>
          </p>
        </div>

        {/* Two-Column Layout matching reference image */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
          
          {/* Left Column: 6 Question Accordion Cards & Pagination Buttons */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="space-y-3.5">
              {currentFaqs.map((faq) => {
                const isOpen = openIdx === faq.id;
                return (
                  <div
                    key={faq.id}
                    className="rounded-md bg-white border border-slate-100 shadow-[0_3px_14px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_18px_rgba(0,0,0,0.07)] transition-all duration-200"
                  >
                    <button
                      onClick={() => toggle(faq.id)}
                      className="w-full flex items-center justify-between px-5 py-4 text-left cursor-pointer"
                      aria-expanded={isOpen}
                    >
                      <span className="text-xs sm:text-sm font-semibold text-slate-700 pr-4 leading-snug">
                        {faq.q}
                      </span>

                      {/* Circular Plus/Minus Button */}
                      <div
                        className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#285870] hover:bg-[#1f4559] text-white flex items-center justify-center shrink-0 shadow-xs transition-colors duration-200"
                      >
                        {isOpen ? (
                          <Minus className="w-4 h-4 stroke-[2.5]" />
                        ) : (
                          <Plus className="w-4 h-4 stroke-[2.5]" />
                        )}
                      </div>
                    </button>

                    {/* Accordion Answer */}
                    {isOpen && (
                      <div className="px-5 pb-4 pt-1 text-xs sm:text-xs text-slate-500 leading-relaxed border-t border-slate-100/80 animate-in fade-in duration-150">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Pagination Navigation Arrows */}
            <div className="flex items-center gap-2.5 pt-5 sm:pt-6 pl-2">
              <button
                onClick={() => {
                  setPage((p) => Math.max(0, p - 1));
                  setOpenIdx(null);
                }}
                disabled={page === 0}
                aria-label="Previous FAQs"
                className={`w-8 h-8 rounded-full flex items-center justify-center transition shadow-xs cursor-pointer ${
                  page === 0
                    ? "bg-[#285870]/40 text-white/70 cursor-not-allowed"
                    : "bg-[#285870] hover:bg-[#1f4559] text-white"
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  setPage((p) => Math.min(totalPages - 1, p + 1));
                  setOpenIdx(null);
                }}
                disabled={page >= totalPages - 1}
                aria-label="Next FAQs"
                className={`w-8 h-8 rounded-full flex items-center justify-center transition shadow-xs cursor-pointer ${
                  page >= totalPages - 1
                    ? "bg-[#285870]/40 text-white/70 cursor-not-allowed"
                    : "bg-[#285870] hover:bg-[#1f4559] text-white"
                }`}
              >
                <ChevronRight className="w-4 h-4" />
              </button>

              <span className="text-xs text-slate-400 ml-2 select-none">
                Page {page + 1} of {totalPages}
              </span>
            </div>
          </div>

          {/* Right Column: "Any Question?" Illustration, Subtext, Input, and "Sent" Button */}
          <div className="lg:col-span-5 flex flex-col items-center text-center px-4 sm:px-6 pt-2">
            
            {/* Custom Illustration matching the reference: Teal Blob, Giant '?', and Professional Woman looking up */}
            <div className="relative w-56 h-48 sm:w-64 sm:h-52 mb-3 flex items-center justify-center">
              <svg
                viewBox="0 0 260 210"
                className="w-full h-full select-none"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Organic Background Blob */}
                <path
                  d="M130 15C185 12 245 45 240 105C235 165 185 195 130 195C70 195 20 155 25 100C30 40 75 18 130 15Z"
                  fill="#EBF3F7"
                />

                {/* Ambient floating small question marks */}
                <text x="60" y="70" fill="#9BB7C4" fontSize="18" fontWeight="bold" fontFamily="sans-serif">?</text>
                <text x="75" y="115" fill="#9BB7C4" fontSize="13" fontWeight="bold" fontFamily="sans-serif">?</text>
                <text x="210" y="80" fill="#9BB7C4" fontSize="16" fontWeight="bold" fontFamily="sans-serif">?</text>
                <text x="195" y="145" fill="#9BB7C4" fontSize="12" fontWeight="bold" fontFamily="sans-serif">?</text>

                {/* Main Prominent Question Mark */}
                <g transform="translate(142, 20)">
                  <path
                    d="M32 0C15 0 2 12 2 28C2 35 7 40 13 40C19 40 24 35 24 29C24 22 29 16 36 16C43 16 49 21 49 28C49 37 42 42 35 48C27 55 21 64 21 77V80C21 86 26 90 32 90C38 90 43 86 43 80V78C43 71 47 67 54 60C64 51 71 42 71 28C71 9 53 0 32 0ZM32 104C25 104 20 109 20 116C20 123 25 128 32 128C39 128 44 123 44 116C44 109 39 104 32 104Z"
                    fill="#285870"
                  />
                </g>

                {/* Businesswoman Figure looking up at the question mark */}
                {/* Hair Bun */}
                <circle cx="178" cy="84" r="5" fill="#2C3E50" />
                {/* Head */}
                <circle cx="174" cy="89" r="6" fill="#F8C9A9" />
                {/* Hair */}
                <path d="M168 87C168 83 172 82 176 83C179 84 180 87 180 89C177 88 171 89 168 87Z" fill="#2C3E50" />
                
                {/* Magenta/Pink inner blouse collar */}
                <path d="M171 94L177 94L174 99Z" fill="#E11D48" />

                {/* Navy Business Blazer Jacket */}
                <path
                  d="M166 96C163 99 160 106 160 114L166 122H182L188 114C188 106 185 99 182 96C178 95 170 95 166 96Z"
                  fill="#1E293B"
                />

                {/* Left arm bent towards hip */}
                <path
                  d="M161 99L154 108L158 116L164 114"
                  stroke="#1E293B"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle cx="158" cy="116" r="2" fill="#F8C9A9" />

                {/* Right arm slightly raised */}
                <path
                  d="M187 100L193 108L190 115"
                  stroke="#1E293B"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle cx="190" cy="116" r="2" fill="#F8C9A9" />

                {/* Slim Pencil Skirt */}
                <path d="M165 122H183L180 148H168L165 122Z" fill="#1E293B" />

                {/* Slender legs */}
                <rect x="170" y="148" width="2.5" height="28" fill="#F8C9A9" />
                <rect x="176" y="148" width="2.5" height="28" fill="#F8C9A9" />

                {/* Shoes */}
                <path d="M168 176H173L175 178H168Z" fill="#0F172A" />
                <path d="M174 176H179L181 178H174Z" fill="#0F172A" />

                {/* Small accent sparkles */}
                <path d="M125 152L127 148L129 152L133 154L129 156L127 160L125 156L121 154Z" fill="#285870" />
              </svg>
            </div>

            {/* Heading & Subtitle */}
            <h3 className="font-['Sora',sans-serif] text-2xl sm:text-3xl font-extrabold text-[#0B1729] tracking-tight">
              Any Question?
            </h3>
            <p className="mt-1 text-xs sm:text-sm text-slate-400 max-w-sm leading-relaxed">
              You can ask anything you want to know about our products & pricing.
            </p>

            {/* Inquiry Form */}
            <form onSubmit={handleSendQuestion} className="w-full max-w-md mt-6 space-y-4">
              <div className="text-left">
                <label className="block text-xs font-semibold text-slate-500 mb-1.5 ml-0.5">
                  Let me know.
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    placeholder="Enter Here"
                    value={userQuestion}
                    onChange={(e) => setUserQuestion(e.target.value)}
                    className="w-full rounded-xs border border-slate-200 bg-white px-3.5 py-2.5 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:border-[#285870] focus:ring-1 focus:ring-[#285870] focus:outline-hidden transition shadow-2xs"
                  />
                  {userQuestion && (
                    <button
                      type="button"
                      onClick={() => setUserQuestion("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"
                    >
                      ✕
                    </button>
                  )}
                </div>
              </div>

              {/* Pill "Sent" Button */}
              <div className="flex justify-center sm:justify-end pt-1">
                <button
                  type="submit"
                  className="rounded-full bg-[#285870] hover:bg-[#1f4559] text-white py-2.5 px-10 font-bold text-xs sm:text-sm transition-all duration-200 shadow-[0_8px_20px_rgba(40,88,112,0.3)] hover:shadow-[0_10px_25px_rgba(40,88,112,0.4)] hover:scale-[1.02] cursor-pointer inline-flex items-center justify-center gap-2"
                >
                  <span>Sent</span>
                </button>
              </div>

              {submitted && (
                <div className="flex items-center justify-center gap-1.5 text-xs text-green-600 font-semibold pt-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Inquiry sent! Opening technical desk chat.</span>
                </div>
              )}
            </form>

          </div>

        </div>

      </div>
    </section>
  );
}

