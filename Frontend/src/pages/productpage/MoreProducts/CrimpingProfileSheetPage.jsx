import React, { useState } from 'react';
import {
  ChevronRight,
  CheckCircle2,
  MessageSquare,
  Maximize2,
  X,
  Ruler,
  Calculator
} from 'lucide-react';

// Image imports
import blueCurvedImg from '../../../assets/crimping_profile/crimp_blue_curved.png';
import orangePurpleImg from '../../../assets/crimping_profile/crimp_orange_purple.jpg';
import blueGreenImg from '../../../assets/crimping_profile/crimp_blue_green.png';

export default function CrimpingProfileSheetPage() {
  const images = [
    { src: blueCurvedImg, label: 'Royal Blue Curved Arch' },
    { src: orangePurpleImg, label: 'Terracotta & Purple Ridge' },
    { src: blueGreenImg, label: 'Emerald & Azure Double Arc' }
  ];

  const [activeImage, setActiveImage] = useState(blueCurvedImg);
  const [showModal, setShowModal] = useState(false);
  const [showLightbox, setShowLightbox] = useState(false);
  
  // Interactive Customization States
  const [coatingType, setCoatingType] = useState('Galvalume'); // 'Galvanized' | 'Galvalume'
  const [yieldStrength, setYieldStrength] = useState('550 MPA');
  const [arcLengthFt, setArcLengthFt] = useState('12');
  const [quantitySheets, setQuantitySheets] = useState('15');

  // Form State
  const [formData, setFormData] = useState({ name: '', phone: '', quantity: '', requirements: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Price & Weight Calculation
  const RATE_PER_KG = 80.00;
  const coatingMultipliers = {
    'Galvanized': 1.25,
    'Galvalume': 1.35
  };
  
  const mult = coatingMultipliers[coatingType] || 1.3;
  const length = (parseFloat(arcLengthFt) || 12);
  const qty = (parseInt(quantitySheets) || 1);
  const estWeightKg = Math.round(length * qty * mult);
  const estCostRs = Math.round(estWeightKg * RATE_PER_KG);

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
          <span className="font-semibold text-slate-900">Crimping Profile Sheet</span>
        </nav>

        {/* HERO BANNER - MATCHING EXACT USER REFERENCE LAYOUT */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white p-6 sm:p-10 mb-10 shadow-2xl border border-slate-800">
          <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="max-w-2xl">
              <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-3">
                Crimping Profile <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-sky-300 to-amber-300">Sheets</span>
              </h1>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Precision-engineered curved crimp profile sheets designed for seamless self-supporting arch roofs, canopy ridges, and industrial bullnose corners without additional purlins.
              </p>
            </div>

            {/* Price Badge Card matching user screenshot box */}
            <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-3xl p-6 text-center lg:text-right shrink-0 shadow-2xl">
              <span className="text-xs uppercase tracking-wider text-sky-300 font-bold block mb-1">STANDARD WHOLESALE PRICE</span>
              <span className="text-xs text-slate-300 block">Ex-Factory | GST & Transport extra</span>
            </div>
          </div>
        </div>

        {/* SECTION 1: PHOTO GALLERY & LIVE CUSTOMIZER */}
        <div className="grid lg:grid-cols-12 gap-8 mb-12">
          
          {/* LEFT 7 COLS: PHOTO GALLERY */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-5 border border-slate-200 shadow-sm">
            <div 
              onClick={() => setShowLightbox(true)}
              className="relative w-full h-[360px] sm:h-[440px] bg-slate-100 rounded-2xl overflow-hidden mb-4 border border-slate-200 group cursor-pointer"
            >
              <img 
                src={activeImage} 
                alt="Crimping Profile Curved Sheet"
                className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500"
              />
              <button 
                className="absolute top-3 right-3 bg-slate-900/80 hover:bg-teal-600 text-white p-2 rounded-xl backdrop-blur-md transition shadow-md"
                aria-label="Enlarge Image"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
              <span className="absolute bottom-3 left-3 bg-slate-900/80 text-teal-300 text-xs px-3 py-1.5 rounded-lg font-semibold shadow-md">
                Custom Arch Curve Profile
              </span>
            </div>

            {/* Thumbnails */}
            <div className="grid grid-cols-3 gap-3">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(img.src)}
                  className={`
                    relative rounded-2xl overflow-hidden aspect-square border-2 transition-all duration-200 bg-slate-50 p-2
                    ${activeImage === img.src 
                      ? 'border-teal-600 ring-2 ring-teal-600/20 scale-[1.02] shadow-md' 
                      : 'border-slate-200 hover:border-slate-400 opacity-80 hover:opacity-100'
                    }
                  `}
                >
                  <img src={img.src} alt={img.label} className="w-full h-full object-contain" />
                  <span className="absolute inset-x-0 bottom-0 bg-slate-900/80 text-[10px] text-white py-1 text-center font-medium truncate px-1">
                    {img.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT 5 COLS: INTERACTIVE ARCH CALCULATOR & SELECTOR */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6">
            
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
              <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Ruler className="w-5 h-5 text-sky-600" /> Coating & Arc Specification
              </h2>

              {/* COATING SELECTOR TOGGLE */}
              <label className="block text-xs font-bold text-slate-700 mb-2">Coating Alloy Type</label>
              <div className="grid grid-cols-2 gap-2 mb-4">
                <button
                  onClick={() => setCoatingType('Galvanized')}
                  className={`
                    p-2.5 rounded-xl text-xs font-bold border text-left transition-all
                    ${coatingType === 'Galvanized'
                      ? 'bg-[#0B192C] border-[#0B192C] text-white shadow-sm'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300'
                    }
                  `}
                >
                  <span className="block font-extrabold text-xs mb-0.5">Galvanized</span>
                  <span className="text-[9px] opacity-80 block">Zinc 120 GSM</span>
                </button>

                <button
                  onClick={() => setCoatingType('Galvalume')}
                  className={`
                    p-2.5 rounded-xl text-xs font-bold border text-left transition-all
                    ${coatingType === 'Galvalume'
                      ? 'bg-sky-700 border-sky-700 text-white shadow-sm'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300'
                    }
                  `}
                >
                  <span className="block font-extrabold text-xs mb-0.5">Galvalume</span>
                  <span className="text-[9px] opacity-80 block">AZ-150 GSM</span>
                </button>
              </div>

              {/* YIELD STRENGTH SELECTOR */}
              <label className="block text-xs font-bold text-slate-700 mb-2">Yield Strength Grade</label>
              <div className="grid grid-cols-3 gap-1.5 mb-5">
                {['245 MPA', '345 MPA', '550 MPA'].map((str) => (
                  <button
                    key={str}
                    onClick={() => setYieldStrength(str)}
                    className={`
                      py-2 px-2 rounded-xl text-xs font-bold border text-center transition-all
                      ${yieldStrength === str
                        ? 'bg-slate-900 border-slate-900 text-white shadow-sm'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300'
                      }
                    `}
                  >
                    {str}
                  </button>
                ))}
              </div>

              {/* LIVE WEIGHT ESTIMATOR SUB-BOX */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 mb-4">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                    <Calculator className="w-4 h-4 text-sky-600" /> Coverage Estimator
                  </label>
                  <span className="text-[10px] bg-slate-900 text-white px-2 py-0.5 rounded font-bold">
                    ₹80 / kg
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div>
                    <label className="block text-[10px] font-semibold text-slate-600 mb-1">Arc Length (Ft)</label>
                    <input
                      type="number"
                      min="1"
                      value={arcLengthFt}
                      onChange={(e) => setArcLengthFt(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded-xl px-3 py-1.5 text-xs font-bold text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-semibold text-slate-600 mb-1">Quantity (Sheets)</label>
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
                    <span className="text-[10px] text-slate-500 block uppercase font-semibold">Total Weight</span>
                    <span className="font-extrabold text-sky-700 text-sm">~{estWeightKg} kg</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-500 block uppercase font-semibold">Wholesale Price</span>
                    <span className="font-black text-amber-600 text-lg">₹{estCostRs.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* MAIN CTA BUTTON MATCHING SCREENSHOT */}
              <button
                onClick={() => setShowModal(true)}
                className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 rounded-2xl text-xs shadow-md transition flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4" /> Request Quote For Crimping Profile Sheet
              </button>
            </div>

          </div>
        </div>

        {/* SECTION 2: DUAL COMPARISON CARDS (GALVANIZED VS GALVALUME) */}
        <div className="mb-12">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-teal-600 font-bold text-xs uppercase tracking-wider bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
              Technical Comparison
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
              Galvanized vs. Galvalume Crimping Specs
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">Certified properties manufactured as per IS 277 standards</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            
            {/* GALVANIZED CARD */}
            <div className="bg-white border-2 border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm hover:border-teal-500 transition relative overflow-hidden">
              <div className="flex items-center justify-between mb-4">
                <span className="bg-slate-900 text-white text-xs font-extrabold px-3 py-1 rounded-full">
                  Galvanized Crimping Sheet
                </span>
                <span className="text-amber-600 font-black text-base">₹80.00 / kg</span>
              </div>

              <ul className="space-y-3 text-xs sm:text-sm text-slate-700 mb-6">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900">Alloy Composition:</strong> Zinc-98% and other alloys-2%
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900">Coating Mass:</strong> 120 GSM (IS 277 Standard)
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900">Yield Strength Options:</strong> 245 MPA / 345 MPA / 550 MPA
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900">Best Used For:</strong> Standard industrial curved roofing & canopies
                  </div>
                </li>
              </ul>

              <button
                onClick={() => { setCoatingType('Galvanized'); setShowModal(true); }}
                className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-2.5 rounded-xl text-xs transition"
              >
                Inquire Galvanized Grade
              </button>
            </div>

            {/* GALVALUME CARD */}
            <div className="bg-white border-2 border-teal-500/80 rounded-3xl p-6 sm:p-8 shadow-md hover:border-teal-600 transition relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-teal-600 text-white text-[10px] uppercase font-black px-3 py-1 rounded-bl-xl">
                High Performance
              </div>

              <div className="flex items-center justify-between mb-4">
                <span className="bg-teal-700 text-white text-xs font-extrabold px-3 py-1 rounded-full">
                  Galvalume Crimping Sheet
                </span>
                <span className="text-amber-600 font-black text-base">₹80.00 / kg</span>
              </div>

              <ul className="space-y-3 text-xs sm:text-sm text-slate-700 mb-6">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900">Alloy Composition:</strong> Al-55%, Zn-43.5%, other alloys-1.5%
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900">Coating Mass:</strong> 150 GSM (IS 277 Standard)
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900">Yield Strength Options:</strong> 245 MPA / 345 MPA / 550 MPA
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900">Best Used For:</strong> Heavy coastal & corrosive environment arched roofs
                  </div>
                </li>
              </ul>

              <button
                onClick={() => { setCoatingType('Galvalume'); setShowModal(true); }}
                className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-2.5 rounded-xl text-xs transition"
              >
                Inquire Galvalume Grade
              </button>
            </div>

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
            <img src={activeImage} alt="Crimped Sheet Curved Preview" className="max-w-full max-h-[85vh] object-contain rounded-2xl bg-white p-4" />
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
            <p className="text-xs text-teal-600 mb-6">
              Crimping Profile Sheet — {coatingType} ({yieldStrength}) Rate: ₹80.00 / kg
            </p>

            {isSubmitted ? (
              <div className="py-8 text-center">
                <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-3 animate-bounce" />
                <h4 className="font-bold text-slate-900 text-lg">Inquiry Received!</h4>
                <p className="text-xs text-slate-600 mt-1">Our technical manager will contact you with custom arc drawings.</p>
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
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-teal-600"
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
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-teal-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Required Quantity (kg / length)</label>
                  <input
                    type="text"
                    placeholder={`e.g. ${estWeightKg} kg`}
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-teal-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Additional Requirements</label>
                  <textarea
                    rows={3}
                    placeholder="Specify radius curve, arc length, or color preferences"
                    value={formData.requirements}
                    onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
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
