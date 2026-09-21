import React, { useState } from "react";
import {
  ChevronRight,
  CheckCircle2,
  ShieldCheck,
  MessageSquare,
  Maximize2,
  X,
  Calculator,
  Ruler,
} from "lucide-react";

// Image imports
import factoryStackImg from "../../../assets/bare_galvalume/bare_galv_factory_stack.jpg";
import jswSilveronImg from "../../../assets/bare_galvalume/jsw_silveron_sheet.png";
import isiStampImg from "../../../assets/bare_galvalume/bare_galv_isi_stamp.jpg";

export default function BaregalvalumeProfileSheetPage() {
  const images = [
    { src: factoryStackImg, label: "Factory Sheet Stack" },
    { src: jswSilveronImg, label: "JSW Silveron+ Al-Zn" },
    { src: isiStampImg, label: "ISI Marked Profile" },
  ];

  const [activeImage, setActiveImage] = useState(factoryStackImg);
  const [showModal, setShowModal] = useState(false);
  const [showLightbox, setShowLightbox] = useState(false);
  const [selectedThickness, setSelectedThickness] = useState("0.47mm");

  // Interactive Quantity Estimator Calculator State
  const [lengthFt, setLengthFt] = useState("10");
  const [quantitySheets, setQuantitySheets] = useState("20");

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    quantity: "",
    requirements: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Rate per kg
  const RATE_PER_KG = 70.0;

  // Approx weight calculation per sheet
  const thicknessMultipliers = {
    "0.47mm": 1.2,
    "0.50mm": 1.3,
    "0.60mm": 1.55,
    "0.80mm": 2.05,
  };

  const currentMultiplier = thicknessMultipliers[selectedThickness] || 1.2;
  const totalLength = parseFloat(lengthFt) || 10;
  const totalSheets = parseInt(quantitySheets) || 1;
  const estimatedWeightKg = Math.round(
    totalLength * totalSheets * currentMultiplier,
  );
  const estimatedPriceRs = Math.round(estimatedWeightKg * RATE_PER_KG);

  const specificationsData = [
    { key: "Tensile Strength", value: "Up to 550 MPa (Hi-Tensile Grade)" },
    {
      key: "Coating Type",
      value: "AZ-150 Bare Galvalume (Aluminium-Zinc Alloy)",
    },
    { key: "Coating Mass (GSM)", value: "AZ-150 (150 GSM Coating)" },
    { key: "Total Coated Thickness (TCT)", value: "0.47mm - 0.80mm" },
    { key: "Wholesale Rate", value: "₹70.00 per kg" },
    {
      key: "Features",
      value: "Weather Proof, Corrosion Resistance, Smooth Finish",
    },
    {
      key: "Area of Application",
      value: "Commercial & Industrial Shed Roofing, Warehouses",
    },
    {
      key: "Material Grade",
      value: "High Tensile Steel / Stainless Steel Base",
    },
    {
      key: "Surface Treatment",
      value: "Bare Galvalume / Non-Colored Polyester Finish",
    },
  ];

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setShowModal(false);
      setFormData({ name: "", phone: "", quantity: "", requirements: "" });
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-[110px] pb-24 font-sans text-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* BREADCRUMB NAVIGATION */}
        <nav className="flex items-center gap-2 text-xs sm:text-sm text-slate-500 mb-6 flex-wrap">
          <a href="/" className="hover:text-teal-600 transition">
            Home
          </a>
          <ChevronRight className="w-4 h-4 text-slate-400" />
          <a
            href="/allproduct/mildsteel/deck-sheet"
            className="hover:text-teal-600 transition"
          >
            All Products
          </a>
          <ChevronRight className="w-4 h-4 text-slate-400" />
          <span className="font-semibold text-slate-900">
            Bare Galvalume Roofing Sheets
          </span>
        </nav>

        {/* HERO BANNER - MATCHING EXACT USER REFERENCE LAYOUT */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white p-6 sm:p-10 mb-10 shadow-2xl border border-slate-800">
          <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="max-w-2xl">
              <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-3">
                Bare Galvalume{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-sky-300 to-amber-300">
                  Roofing Sheets
                </span>
              </h1>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Hi-Tensile Steel Sheets with AZ-150 Aluminium-Zinc coating
                designed to withstand severe weather conditions, protecting
                industrial sheds and commercial structures.
              </p>
            </div>

            {/* Price Badge Card matching user screenshot box */}
            <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-3xl p-6 text-center lg:text-right shrink-0 shadow-2xl">
              <span className="text-xs uppercase tracking-wider text-sky-300 font-bold block mb-1">
                STANDARD WHOLESALE PRICE
              </span>
              <span className="text-xs text-slate-300 block">
                Ex-Factory | GST & Transport extra
              </span>
            </div>
          </div>
        </div>

        {/* SECTION 1: PHOTO GALLERY + INTERACTIVE THICKNESS & CALCULATOR */}
        <div className="grid lg:grid-cols-12 gap-8 mb-12">
          {/* LEFT 7 COLS: PHOTO GALLERY */}
          <div className="lg:col-span-7 bg-white border border-slate-200 rounded-3xl p-5 shadow-sm">
            {/* Main Active Image Display with Lightbox Trigger */}
            <div
              onClick={() => setShowLightbox(true)}
              className="relative w-full h-[380px] sm:h-[460px] bg-slate-100 rounded-2xl overflow-hidden mb-4 border border-slate-200 group cursor-pointer"
            >
              <img
                src={activeImage}
                alt="Bare Galvalume Profile Sheet"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <button
                className="absolute top-3 right-3 bg-slate-900/80 hover:bg-teal-600 text-white p-2 rounded-xl backdrop-blur-md transition shadow-md border border-white/10"
                aria-label="Enlarge Image"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
              <span className="absolute bottom-3 left-3 bg-slate-900/80 text-white text-xs px-3 py-1.5 rounded-lg font-medium shadow-md">
                Verified Industrial Asset
              </span>
            </div>

            {/* Thumbnail Switcher */}
            <div className="grid grid-cols-3 gap-3">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(img.src)}
                  className={`
                    relative rounded-xl overflow-hidden aspect-square border-2 transition-all duration-200
                    ${
                      activeImage === img.src
                        ? "border-teal-600 ring-2 ring-teal-600/20 scale-[1.02] shadow-md"
                        : "border-slate-200 hover:border-slate-400 opacity-80 hover:opacity-100"
                    }
                  `}
                >
                  <img
                    src={img.src}
                    alt={img.label}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute inset-x-0 bottom-0 bg-slate-900/80 text-[10px] text-white py-1 text-center font-medium truncate px-1">
                    {img.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT 5 COLS: INTERACTIVE CONFIGURATOR CARD MATCHING EXACT SCREENSHOT */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6">
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
              <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Ruler className="w-5 h-5 text-sky-600" /> Select Bare Galvalume
                Specifications
              </h2>

              {/* THICKNESS SELECTOR */}
              <label className="block text-xs font-bold text-slate-700 mb-2">
                Sheet Thickness (TCT)
              </label>
              <div className="grid grid-cols-4 gap-1.5 mb-4">
                {["0.47 mm", "0.50 mm", "0.60 mm", "0.80 mm"].map((thick) => (
                  <button
                    key={thick}
                    onClick={() => setSelectedThickness(thick)}
                    className={`
                      py-2 px-1 rounded-xl text-[11px] font-bold border text-center transition-all
                      ${
                        selectedThickness === thick
                          ? "bg-slate-900 border-slate-900 text-white shadow-sm"
                          : "bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300"
                      }
                    `}
                  >
                    {thick}
                  </button>
                ))}
              </div>

              {/* LIVE WEIGHT & PRICE ESTIMATOR SUB-BOX */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 mb-4">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                    <Calculator className="w-4 h-4 text-sky-600" /> Weight &
                    Price Calculator
                  </label>
                  <span className="text-[10px] bg-slate-900 text-white px-2 py-0.5 rounded font-bold">
                    ₹70 / kg
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div>
                    <label className="block text-[10px] font-semibold text-slate-600 mb-1">
                      Length per Sheet (Feet)
                    </label>
                    <input
                      type="number"
                      step="0.5"
                      min="1"
                      value={lengthFt}
                      onChange={(e) => setLengthFt(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded-xl px-3 py-1.5 text-xs font-bold text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-semibold text-slate-600 mb-1">
                      Quantity (Sheets)
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={quantitySheets}
                      onChange={(e) => setQuantitySheets(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded-xl px-3 py-1.5 text-xs font-bold text-slate-900"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-200">
                  <div>
                    <span className="text-[10px] text-slate-500 block uppercase font-semibold">
                      Total Weight
                    </span>
                    <span className="font-extrabold text-teal-700 text-sm">
                      ~{estimatedWeightKg} kg
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-500 block uppercase font-semibold">
                      Wholesale Price
                    </span>
                    <span className="font-black text-amber-600 text-lg">
                      ₹{estimatedPriceRs.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* MAIN CTA BUTTON MATCHING SCREENSHOT */}
              <button
                onClick={() => setShowModal(true)}
                className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 rounded-2xl text-xs shadow-md transition flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4" /> Request Quote For Bare
                Galvalume Sheets
              </button>
            </div>
          </div>
        </div>

        {/* SECTION 2: TECHNICAL SPECIFICATIONS TABLE */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm mb-12">
          <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
            <div>
              <span className="text-xs font-bold text-sky-700 uppercase tracking-wider bg-sky-50 px-3 py-1 rounded-full border border-sky-100">
                Technical Data Sheet
              </span>
              <h2 className="text-2xl font-extrabold text-slate-900 mt-2">
                Bare Galvalume Technical Matrix
              </h2>
            </div>
            <div className="flex items-center gap-2 text-xs font-bold text-slate-600 bg-slate-100 px-3 py-2 rounded-xl">
              <ShieldCheck className="w-4 h-4 text-emerald-600" /> Grade AZ-150 / 550 MPa Certified
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-slate-900 text-white font-bold">
                  <th className="p-3.5 rounded-l-xl">Specification Property</th>
                  <th className="p-3.5 rounded-r-xl">Value / Standard</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {specificationsData.map((row, i) => (
                  <tr key={i} className="hover:bg-slate-50 transition">
                    <td className="p-3.5 font-bold text-slate-900 w-1/2">{row.key}</td>
                    <td className="p-3.5 font-extrabold text-sky-700">{row.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* SECTION 3: 3D SPEC CARDS GRID */}
        <div className="mb-12">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-sky-700 font-bold text-xs uppercase tracking-wider bg-sky-50 px-3 py-1 rounded-full border border-sky-200">
              High Tensile Roofing
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
              Why Choose Bare Galvalume Sheets?
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">55% Al-Zn alloy coated hi-tensile steel engineered for lifetime corrosion protection</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm hover:border-sky-500 transition">
              <CheckCircle2 className="w-6 h-6 text-emerald-600 mb-3" />
              <span className="text-xs text-teal-700 font-bold block mb-1 uppercase tracking-wider">
                Yield Strength
              </span>
              <div className="text-2xl font-black text-slate-900 mb-1">
                550 MPa
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                High tensile steel withstands heavy structural loads and winds.
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm hover:border-sky-500 transition">
              <CheckCircle2 className="w-6 h-6 text-emerald-600 mb-3" />
              <span className="text-xs text-teal-700 font-bold block mb-1 uppercase tracking-wider">
                Al-Zn Coating
              </span>
              <div className="text-2xl font-black text-slate-900 mb-1">
                AZ 150 GSM
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                55% Aluminium + 43.4% Zinc alloy protection layer.
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm hover:border-sky-500 transition">
              <CheckCircle2 className="w-6 h-6 text-emerald-600 mb-3" />
              <span className="text-xs text-teal-700 font-bold block mb-1 uppercase tracking-wider">
                Thickness Range
              </span>
              <div className="text-2xl font-black text-slate-900 mb-1">
                0.47 - 0.8mm
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Available in standard 0.47mm TCT cut to required sheet length.
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm hover:border-sky-500 transition">
              <CheckCircle2 className="w-6 h-6 text-emerald-600 mb-3" />
              <span className="text-xs text-amber-600 font-bold block mb-1 uppercase tracking-wider">
                High Durability
              </span>
              <div className="text-2xl font-black text-slate-900 mb-1">
                4x Life
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Up to 4 times longer lifespan compared to ordinary galvanized steel.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FULL SCREEN LIGHTBOX MODAL */}
      {showLightbox && (
        <div
          onClick={() => setShowLightbox(false)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm cursor-pointer"
        >
          <div className="relative max-w-4xl w-full max-h-[90vh] flex flex-col items-center">
            <img
              src={activeImage}
              alt="Bare Galvalume Enlarged"
              className="max-w-full max-h-[85vh] object-contain rounded-2xl border border-slate-700 shadow-2xl"
            />
            <span className="text-xs text-slate-300 mt-3">
              Click anywhere to close preview
            </span>
          </div>
        </div>
      )}

      {/* INQUIRY MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl relative text-slate-800">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-extrabold text-slate-900 mb-1">
              Request Quote
            </h3>
            <p className="text-xs text-teal-600 mb-6">
              Bare Galvalume Roofing Sheets (Rate: ₹70.00 / kg)
            </p>

            {isSubmitted ? (
              <div className="py-8 text-center">
                <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-3 animate-bounce" />
                <h4 className="font-bold text-slate-900 text-lg">
                  Inquiry Received!
                </h4>
                <p className="text-xs text-slate-600 mt-1">
                  Our technical sales executive will contact you within 30
                  minutes.
                </p>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-teal-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="Enter mobile number"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-teal-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Required Quantity (kg / sq.ft)
                  </label>
                  <input
                    type="text"
                    placeholder={`e.g. ${estimatedWeightKg} kg`}
                    value={formData.quantity}
                    onChange={(e) =>
                      setFormData({ ...formData, quantity: e.target.value })
                    }
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-teal-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Additional Requirements
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Specify sheet length or total coverage area"
                    value={formData.requirements}
                    onChange={(e) =>
                      setFormData({ ...formData, requirements: e.target.value })
                    }
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-teal-600"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 rounded-xl shadow-lg shadow-teal-600/20 text-sm transition"
                >
                  Submit Inquiry Now
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
