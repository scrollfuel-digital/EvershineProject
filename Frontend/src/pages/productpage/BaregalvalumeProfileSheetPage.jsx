import React, { useState } from "react";
import {
  ChevronRight,
  Phone,
  MessageSquare,
  Zap,
  X,
  Calculator,
  Maximize2,
  CheckCircle2,
  Layers,
  ArrowRight,
  Sparkles,
  Ruler,
} from "lucide-react";

// Image imports
import factoryStackImg from "../../assets/bare_galvalume/bare_galv_factory_stack.jpg";
import jswSilveronImg from "../../assets/bare_galvalume/jsw_silveron_sheet.png";
import isiStampImg from "../../assets/bare_galvalume/bare_galv_isi_stamp.jpg";

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

        {/* HERO BANNER - EXACT AIR BUBBLE INSULATION COLOR PALETTE */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#0B192C] via-[#102A43] to-[#0B192C] text-white p-6 sm:p-10 mb-10 shadow-2xl border border-[#1E3A5F]">
          <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#003846] text-[#00D2FF] rounded-full text-xs font-bold mb-4 border border-cyan-800/50 shadow-sm">
                <Sparkles className="w-4 h-4 text-amber-400" /> High Yield

                Strength 550 MPa | AZ-150 Coating
              </div>
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

            {/* Price Badge Card matching screenshot */}
            <div className="bg-[#132A3E]/80 backdrop-blur-md border border-[#1E3E5A] rounded-3xl p-6 text-center lg:text-right shrink-0 shadow-2xl">
              <span className="text-xs uppercase tracking-wider text-[#00D2FF] font-bold block mb-1">
                STANDARD WHOLESALE PRICE
              </span>
              <div className="text-4xl font-black text-[#FFC107] my-1">
                ₹70.00{" "}
                <span className="text-sm font-normal text-slate-200">/ kg</span>
              </div>
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
                          ? "bg-[#0B192C] border-[#0B192C] text-white shadow-sm"
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
                  <span className="text-[10px] bg-[#0B192C] text-white px-2 py-0.5 rounded font-bold">
                    ₹70 / kg
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div>
                    <label className="block text-[10px] font-semibold text-slate-600 mb-1">
                      Sheet Length (Feet)
                    </label>
                    <input
                      type="number"
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
                    <span className="font-extrabold text-sky-700 text-sm">
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
                className="w-full bg-[#0B192C] hover:bg-[#102A43] text-white font-bold py-3 rounded-2xl text-xs shadow-md transition flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4" /> Request Quote For Bare
                Galvalume Sheets
              </button>
            </div>
          </div>
        </div>

        {/* SECTION 2: 3D SPEC CARDS GRID */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:border-teal-500 transition">
            <span className="text-xs text-teal-700 font-bold block mb-1 uppercase tracking-wider">
              Yield Strength
            </span>
            <div className="text-2xl font-black text-slate-900 mb-1">
              550 MPa
            </div>
            <p className="text-xs text-slate-500">
              High tensile steel withstands heavy structural loads and winds.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:border-teal-500 transition">
            <span className="text-xs text-teal-700 font-bold block mb-1 uppercase tracking-wider">
              Al-Zn Coating
            </span>
            <div className="text-2xl font-black text-slate-900 mb-1">
              AZ 150 GSM
            </div>
            <p className="text-xs text-slate-500">
              55% Aluminium + 43.4% Zinc alloy protection layer.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:border-teal-500 transition">
            <span className="text-xs text-teal-700 font-bold block mb-1 uppercase tracking-wider">
              Thickness Range
            </span>
            <div className="text-2xl font-black text-slate-900 mb-1">
              0.47 - 0.8mm
            </div>
            <p className="text-xs text-slate-500">
              Available in standard 0.47mm TCT cut to required sheet length.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:border-teal-500 transition">
            <span className="text-xs text-amber-600 font-bold block mb-1 uppercase tracking-wider">
              Wholesale Price
            </span>
            <div className="text-2xl font-black text-amber-600 mb-1">
              ₹70.00 / kg
            </div>
            <p className="text-xs text-slate-500">
              Ex-factory wholesale pricing direct from manufacturer stock.
            </p>
          </div>
        </div>

        {/* SECTION 3: TECHNICAL SPECIFICATIONS TABLE */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-sm mb-10">
          <div className="mb-6 border-b border-slate-200 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="text-2xl font-extrabold text-slate-900">
                Specification of Bare Galvalume Roofing Sheets
              </h3>
              <p className="text-xs text-slate-500">
                Certified Mechanical Properties & Coating Parameters
              </p>
            </div>
            <span className="text-xs bg-teal-50 text-teal-700 px-3 py-1 rounded-full border border-teal-200 self-start sm:self-auto font-semibold">
              Grade AZ-150 / 550 MPa
            </span>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-200">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-900 text-white uppercase text-[11px] tracking-wider">
                <tr>
                  <th className="py-4 px-6 font-bold">
                    Specification Property
                  </th>
                  <th className="py-4 px-6 font-bold">Value / Standard</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white">
                {specificationsData.map((row, i) => (
                  <tr
                    key={i}
                    className={
                      i % 2 === 0
                        ? "bg-slate-50/50 hover:bg-slate-100/50"
                        : "hover:bg-slate-100/50"
                    }
                  >
                    <td className="py-3.5 px-6 font-semibold text-slate-900 w-1/2">
                      {row.key}
                    </td>
                    <td className="py-3.5 px-6 text-teal-800 font-medium">
                      {row.value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* HORIZONTAL ACTION BAR MATCHING USER SCREENSHOT */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-sm mb-12 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span className="text-xs text-slate-500 block font-medium">
              Bare Galvalume Sheets
            </span>
            <span className="text-lg font-black text-amber-600">
              ₹70.00 / kg{" "}
              <span className="text-xs text-slate-500 font-normal">
                (AZ-150 Galvalume)
              </span>
            </span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <a
              href="tel:+917498147921"
              aria-label="Call Sales"
              className="w-10 h-10 rounded-xl bg-slate-900 text-teal-400 flex items-center justify-center hover:bg-slate-800 transition shrink-0"
            >
              <Phone className="w-5 h-5" />
            </a>
            <a
              href="https://wa.me/917498147921?text=Hi,%20I%20am%20interested%20in%20Bare%20Galvalume%20Roofing%20Sheets%20(Rs.70/kg)."
              target="_blank"
              rel="noreferrer"
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl font-bold text-xs transition shadow-sm flex items-center gap-2 shrink-0"
            >
              WhatsApp
            </a>
            <button
              onClick={() => setShowModal(true)}
              className="bg-teal-600 hover:bg-teal-700 text-white px-5 py-2.5 rounded-xl font-extrabold text-xs transition shadow-sm flex items-center gap-2 shrink-0"
            >
              Request Quote <ArrowRight className="w-4 h-4" />
            </button>
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
