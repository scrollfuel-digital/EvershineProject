import React, { useState } from 'react';
import { 
  ChevronRight, 
  CheckCircle2, 
  ShieldCheck, 
  Phone, 
  MessageSquare,
  Sparkles,
  ArrowRight,
  Maximize2,
  X,
  Layers,
  Building2,
  Award,
  Flame,
  ShieldAlert,
  Calculator,
  Compass,
  Ruler,
  TrendingDown
} from 'lucide-react';

// Image imports
import cad3dImg from '../../assets/z_c_purlin/cz_purlin_cad_3d.png';
import factoryStackImg from '../../assets/z_c_purlin/cz_purlin_factory_stack.jpg';
import redPrimerImg from '../../assets/z_c_purlin/cz_purlin_red_primer.jpg';

export default function ZPurlinCPurlinPage() {
  const images = [
    { src: cad3dImg, label: '3D CAD Section Geometry of C & Z Purlins' },
    { src: factoryStackImg, label: 'Factory Floor Stack of Galvanized Purlins' },
    { src: redPrimerImg, label: 'C & Z Profile Structural Section Schematic' }
  ];

  const [activeImage, setActiveImage] = useState(cad3dImg);
  const [showModal, setShowModal] = useState(false);
  const [showLightbox, setShowLightbox] = useState(false);
  
  // Interactive Controls
  const [sectionType, setSectionType] = useState('Z Section');
  const [selectedWebSize, setSelectedWebSize] = useState('200 mm');
  const [selectedThickness, setSelectedThickness] = useState('2.0 mm');
  const [lengthMtrs, setLengthMtrs] = useState('6.0');
  const [quantityPieces, setQuantityPieces] = useState('20');

  // Form State
  const [formData, setFormData] = useState({ name: '', phone: '', quantity: '', requirements: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Wholesale Rate per kg
  const RATE_PER_KG = 65.00;

  const webSizesList = ['150 mm', '175 mm', '200 mm', '250 mm', '300 mm'];
  const thicknessList = ['1.2 mm', '1.5 mm', '1.8 mm', '2.0 mm', '2.5 mm', '3.0 mm'];

  const webNum = parseInt(selectedWebSize) || 200;
  const thkNum = parseFloat(selectedThickness) || 2.0;
  const lenNum = parseFloat(lengthMtrs) || 6.0;
  const pcsNum = parseInt(quantityPieces) || 1;

  // Approximate weight per meter formula for purlins: (Web + 2*Flange) * thk * 0.00785
  // approx: web (mm) * thk (mm) * 0.024
  const kgPerMtr = (webNum * thkNum * 0.0245).toFixed(2);
  const estimatedWeightKg = Math.round(kgPerMtr * lenNum * pcsNum);
  const estimatedCostRs = Math.round(estimatedWeightKg * RATE_PER_KG);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setShowModal(false);
      setFormData({ name: '', phone: '', quantity: '', requirements: '' });
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-[#FAFAF7] pt-[110px] pb-20 font-sans text-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* BREADCRUMB NAVIGATION */}
        <nav className="flex items-center gap-2 text-xs sm:text-sm text-slate-500 mb-6 flex-wrap">
          <a href="/" className="hover:text-teal-600 transition">Home</a>
          <ChevronRight className="w-4 h-4 text-slate-400" />
          <a href="/allproduct/mildsteel/deck-sheet" className="hover:text-teal-600 transition">All Products</a>
          <ChevronRight className="w-4 h-4 text-slate-400" />
          <span className="font-semibold text-slate-900">C / Z Structural Steel Purlins</span>
        </nav>

        {/* HERO BANNER - CLEAN MINIMALIST STEEL PALETTE */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white p-6 sm:p-10 mb-10 shadow-2xl border border-slate-800">
          <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-sky-500/10 text-sky-400 rounded-full text-xs font-bold mb-4 border border-sky-500/20 shadow-sm">
                <TrendingDown className="w-4 h-4 text-amber-400" /> Cold-Formed High Tensile Steel | Saves 30% - 50% Structural Weight
              </div>
              <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-3">
                Specification Of <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-sky-300 to-amber-300">C / Z Purlins</span>
              </h1>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Cold-formed structural steel purlins engineered for PEB roofing, wall cladding, and portal frame buildings. Available in custom web depths (150mm - 300mm) and thicknesses (1.2mm - 3.0mm).
              </p>
            </div>

            {/* Price Badge Card */}
            <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-3xl p-6 text-center lg:text-right shrink-0 shadow-2xl">
              <span className="text-xs uppercase tracking-wider text-sky-300 font-bold block mb-1">Wholesale Rate</span>
              <div className="text-4xl font-black text-amber-400 my-1">
                ₹65.00 <span className="text-sm font-normal text-slate-200">/ kg</span>
              </div>
              <span className="text-xs text-slate-300 block">Ex-Factory | High Tensile Galvanized & Red Oxide</span>
            </div>
          </div>
        </div>

        {/* SECTION 1: PHOTO GALLERY + INTERACTIVE CONFIGURATOR */}
        <div className="grid lg:grid-cols-12 gap-8 mb-12">
          
          {/* LEFT 7 COLS: PHOTO GALLERY */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-5 border border-slate-200 shadow-sm">
            <div 
              onClick={() => setShowLightbox(true)}
              className="relative w-full h-[360px] sm:h-[440px] bg-slate-100 rounded-2xl overflow-hidden mb-4 border border-slate-200 group cursor-pointer"
            >
              <img 
                src={activeImage} 
                alt="C / Z Section Purlins"
                className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-500"
              />
              <button 
                className="absolute top-3 right-3 bg-slate-900/80 hover:bg-sky-600 text-white p-2 rounded-xl backdrop-blur-md transition shadow-md"
                aria-label="Enlarge Image"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
              <span className="absolute bottom-3 left-3 bg-slate-900/85 text-sky-300 text-xs px-3 py-1.5 rounded-lg font-semibold shadow-md">
                High Strength Cold-Formed Steel
              </span>
            </div>

            {/* Thumbnails */}
            <div className="grid grid-cols-3 gap-3">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(img.src)}
                  className={`
                    relative rounded-2xl overflow-hidden aspect-square border-2 transition-all duration-200 bg-slate-100 p-0.5
                    ${activeImage === img.src 
                      ? 'border-sky-600 ring-2 ring-sky-600/30 scale-[1.02] shadow-md' 
                      : 'border-slate-200 hover:border-slate-400 opacity-85 hover:opacity-100'
                    }
                  `}
                >
                  <img src={img.src} alt={img.label} className="w-full h-full object-contain p-1 rounded-xl" />
                  <span className="absolute inset-x-0 bottom-0 bg-slate-950/85 text-[9px] text-white py-0.5 text-center font-medium truncate px-1">
                    {img.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT 5 COLS: INTERACTIVE CONFIGURATOR & CALCULATOR */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6">
            
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
              <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Ruler className="w-5 h-5 text-sky-600" /> Select Purlin Profile & Size
              </h2>
              {/* SECTION PROFILE TYPE SELECTOR */}
              <label className="block text-xs font-bold text-slate-700 mb-2">Purlin Profile Geometry</label>
              <div className="grid grid-cols-2 gap-2 mb-4">
                {['Z Section (Lappable)', 'C Section (Simple Span)'].map((sec) => (
                  <button
                    key={sec}
                    onClick={() => setSectionType(sec)}
                    className={`
                      py-2 px-1.5 rounded-xl text-[11px] font-bold border text-center transition-all
                      ${sectionType === sec
                        ? 'bg-[#0B192C] border-[#0B192C] text-white shadow-sm'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300'
                      }
                    `}
                  >
                    {sec}
                  </button>
                ))}
              </div>

              {/* WEB SIZE SELECTOR */}
              <label className="block text-xs font-bold text-slate-700 mb-2">Web Depth Size (Height)</label>
              <div className="grid grid-cols-5 gap-1 mb-4">
                {webSizesList.map((web) => (
                  <button
                    key={web}
                    onClick={() => setSelectedWebSize(web)}
                    className={`
                      py-1.5 px-0.5 rounded-xl text-[11px] font-bold border text-center transition-all
                      ${selectedWebSize === web
                        ? 'bg-sky-700 border-sky-700 text-white shadow-sm'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300'
                      }
                    `}
                  >
                    {web}
                  </button>
                ))}
              </div>

              {/* THICKNESS SELECTOR */}
              <label className="block text-xs font-bold text-slate-700 mb-2">Sheet Thickness (mm)</label>
              <div className="grid grid-cols-6 gap-1 mb-5">
                {thicknessList.map((thk) => (
                  <button
                    key={thk}
                    onClick={() => setSelectedThickness(thk)}
                    className={`
                      py-1.5 px-0.5 rounded-xl text-[11px] font-bold border text-center transition-all
                      ${selectedThickness === thk
                        ? 'bg-[#0B192C] border-[#0B192C] text-white shadow-sm'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300'
                      }
                    `}
                  >
                    {thk}
                  </button>
                ))}
              </div>

              {/* LIVE WEIGHT & COST ESTIMATOR SUB-BOX */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 mb-4">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                    <Calculator className="w-4 h-4 text-sky-600" /> Coverage Estimator
                  </label>
                  <span className="text-[10px] bg-[#0B192C] text-white px-2 py-0.5 rounded font-bold">
                    ₹65 / kg
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div>
                    <label className="block text-[10px] font-semibold text-slate-600 mb-1">Length per Purlin (Meters)</label>
                    <input
                      type="number"
                      step="0.5"
                      min="1"
                      value={lengthMtrs}
                      onChange={(e) => setLengthMtrs(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded-xl px-3 py-1.5 text-xs font-bold text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-semibold text-slate-600 mb-1">Quantity (Pieces)</label>
                    <input
                      type="number"
                      min="1"
                      value={quantityPieces}
                      onChange={(e) => setQuantityPieces(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded-xl px-3 py-1.5 text-xs font-bold text-slate-900"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-200">
                  <div>
                    <span className="text-[10px] text-slate-500 block uppercase font-semibold">Total Weight</span>
                    <span className="font-extrabold text-sky-700 text-sm">~{estimatedWeightKg} kg</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-500 block uppercase font-semibold">Wholesale Price</span>
                    <span className="font-black text-amber-600 text-lg">₹{estimatedCostRs.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* MAIN CTA BUTTON MATCHING SCREENSHOT */}
              <button
                onClick={() => setShowModal(true)}
                className="w-full bg-[#0B192C] hover:bg-[#102A43] text-white font-bold py-3 rounded-2xl text-xs shadow-md transition flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4" /> Request Quote For Purlins
              </button>
            </div>
          </div>
        </div>

        {/* SECTION 2: DUAL COMPARISON CARDS - C vs Z PURLINS */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          
          {/* C SECTION PURLINS CARD */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-extrabold text-slate-900 bg-slate-100 px-3 py-1 rounded-full">
                Single Span Structure
              </span>
              <span className="text-xs font-bold text-sky-700">Simple Non-Continuous</span>
            </div>
            <h3 className="text-xl font-extrabold text-slate-900 mb-2">C Section Purlins</h3>
            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              C section purlins are roll formed into a C section with equal flange widths. Recommended for simple, non-continuous span construction.
            </p>
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2 text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> Portal frames and single bay buildings
              </div>
              <div className="flex items-center gap-2 text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> Roofing, wall cladding, and flooring systems
              </div>
              <div className="flex items-center gap-2 text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> Multi-bay simple spanning lines
              </div>
            </div>
          </div>

          {/* Z SECTION PURLINS CARD */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-extrabold text-sky-700 bg-sky-50 px-3 py-1 rounded-full border border-sky-100">
                30% - 50% Steel Savings
              </span>
              <span className="text-xs font-bold text-amber-600">Lapped Continuous Line</span>
            </div>
            <h3 className="text-xl font-extrabold text-slate-900 mb-2">Z Section Purlins</h3>
            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              Engineered with one broad and one narrow flange to sit neatly lapped at internal supports. Lapping doubles thickness at high bending moment points for maximum structural rigidity.
            </p>
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2 text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> Grain handling, coal handling & factories
              </div>
              <div className="flex items-center gap-2 text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> Saves 30% to 50% steel weight vs C section
              </div>
              <div className="flex items-center gap-2 text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> Continuous structural strength over multi-bays
              </div>
            </div>
          </div>

        </div>

        {/* HORIZONTAL ACTION BAR MATCHING USER REQUEST */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-sm mb-12 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span className="text-xs text-slate-500 block font-medium">Specification Of C / Z Section Purlins</span>
            <span className="text-lg font-black text-amber-600">
              ₹65.00 / kg <span className="text-xs text-slate-500 font-normal">(Web Sizes: 150mm - 300mm | Thk: 1.2mm - 3.0mm)</span>
            </span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <a
              href="tel:+917498147921"
              aria-label="Call Sales"
              className="w-10 h-10 rounded-xl bg-slate-900 text-sky-400 flex items-center justify-center hover:bg-slate-800 transition shrink-0"
            >
              <Phone className="w-5 h-5" />
            </a>
            <a
              href="https://wa.me/917498147921?text=Hi,%20I%20am%20interested%20in%20C%20and%20Z%20Purlins%20(Rs.65/kg)."
              target="_blank"
              rel="noreferrer"
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl font-bold text-xs transition shadow-sm flex items-center gap-2 shrink-0"
            >
              WhatsApp
            </a>
            <button
              onClick={() => setShowModal(true)}
              className="bg-slate-900 hover:bg-slate-800 text-white px-5 py-2.5 rounded-xl font-extrabold text-xs transition shadow-sm flex items-center gap-2 shrink-0"
            >
              Request Quote <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>

      {/* LIGHTBOX PREVIEW */}
      {showLightbox && (
        <div 
          onClick={() => setShowLightbox(false)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm cursor-pointer"
        >
          <div className="relative max-w-4xl w-full max-h-[90vh] flex flex-col items-center">
            <img src={activeImage} alt="C / Z Purlin Preview" className="max-w-full max-h-[85vh] object-contain rounded-2xl bg-white p-4" />
            <span className="text-xs text-slate-300 mt-3">Click anywhere to close preview</span>
          </div>
        </div>
      )}

      {/* INQUIRY MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl relative text-slate-800">
            <button 
              onClick={() => setShowModal(false)} 
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-extrabold text-slate-900 mb-1">Request Quote</h3>
            <p className="text-xs text-sky-700 font-bold mb-6">
              {sectionType} Purlins — Web: {selectedWebSize} | Thk: {selectedThickness} Rate: ₹65.00 / kg
            </p>

            {isSubmitted ? (
              <div className="py-8 text-center">
                <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-3 animate-bounce" />
                <h4 className="font-bold text-slate-900 text-lg">Inquiry Received!</h4>
                <p className="text-xs text-slate-600 mt-1">Our structural engineering team will contact you with hole punching & mill dispatch details.</p>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-sky-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    required
                    placeholder="Enter mobile number"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-sky-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Required Weight or Length (kg / meters)</label>
                  <input
                    type="text"
                    placeholder={`e.g. ${pcsNum} pcs (~${estimatedWeightKg} kg)`}
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-sky-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Additional Requirements</label>
                  <textarea
                    rows={3}
                    placeholder="Specify bolt hole punching details or galvanizing coating (GSM)"
                    value={formData.requirements}
                    onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-sky-600"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 rounded-xl shadow-lg text-sm transition"
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
