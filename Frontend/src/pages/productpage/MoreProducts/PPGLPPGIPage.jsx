import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ChevronRight, 
  CheckCircle2, 
  ShieldCheck, 
  MessageSquare,
  Maximize2,
  X,
  Calculator,
  Ruler
} from 'lucide-react';

// Image imports
import jswGreenImg from '../../../assets/ppgl_profile/jsw_green_colouron.jpg';
import multiColorImg from '../../../assets/ppgl_profile/ppgl_multi_color_stack.png';
import royalBlueImg from '../../../assets/ppgl_profile/royal_blue_ppgl_stack.jpg';

export default function PPGLPPGIPage() {
  const images = [
    { src: jswGreenImg, label: 'JSW Colouron+ Green Stamped Sheet' },
    { src: multiColorImg, label: 'Cyan & Terracotta Red Profile Stack' },
    { src: royalBlueImg, label: 'Royal Blue PPGL Factory Sheet Stack' }
  ];

  const [activeImage, setActiveImage] = useState(jswGreenImg);
  const [showModal, setShowModal] = useState(false);
  const [showLightbox, setShowLightbox] = useState(false);
  
  // Interactive Controls
  const [selectedThickness, setSelectedThickness] = useState('0.50 mm');
  const [selectedLength, setSelectedLength] = useState('3.6576 m (12 ft)');

  // Calculator State
  const [quantityPieces, setQuantityPieces] = useState('50');

  // Form State
  const [formData, setFormData] = useState({ name: '', phone: '', quantity: '', requirements: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Rate per kg
  const RATE_PER_KG = 70.00;

  // Weight multipliers (kg per meter for 1090mm cover width)
  const thicknessWeightMap = {
    '0.35 mm': 3.12,
    '0.40 mm': 3.56,
    '0.45 mm': 4.01,
    '0.50 mm': 4.45,
    '0.60 mm': 5.34
  };

  const lenInMtrs = parseFloat(selectedLength) || 3.6576;
  const pcs = parseInt(quantityPieces) || 1;
  const kgPerMtr = thicknessWeightMap[selectedThickness] || 4.45;
  const estimatedWeightKg = Math.round(lenInMtrs * pcs * kgPerMtr);
  const estimatedCostRs = Math.round(estimatedWeightKg * RATE_PER_KG);

  const testMatrixData = [
    { test: "Salt Spray Corrosion Resistance", method: "ASTM B117", result: "1000 Hrs Pass (Zero Rust)" },
    { test: "Scratch Hardness (Top / Back)", method: "Pencil & Weight Test", result: "2.0 kg Top / 1.5 kg Back" },
    { test: "Adhesion Test (Cross-Hatch)", method: "ISO 2409", result: "100% Adhesion Pass" },
    { test: "Solvent Rub Test (MEK)", method: "ASTM D5402", result: "100 DR Pass (Double Rub)" },
    { test: "T-Bend Flexibility Test", method: "ASTM D4145", result: "No Tape Loss / Zero Flaking" },
    { test: "Humidity Resistance", method: "ASTM D2247", result: "750 – 1000 Hrs Pass" },
    { test: "Max Operating Temperature", method: "Thermal Limit", result: "Up to 140°C Continuous" },
    { test: "Water Boiling Test", method: "Coating Integrity", result: "As per Standard Certified" }
  ];

  const lengthsList = [
    '2.4384 m (8 ft)',
    '3.048 m (10 ft)',
    '3.6576 m (12 ft)',
    '4.2672 m (14 ft)',
    '4.8768 m (16 ft)',
    '5.4864 m (18 ft)',
    '6.096 m (20 ft)',
    '6.7056 m (22 ft)',
    '7.3152 m (24 ft)'
  ];

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
          <Link to="/" className="hover:text-teal-600 transition">Home</Link>
          <ChevronRight className="w-4 h-4 text-slate-400" />
          <Link to="/products" className="hover:text-teal-600 transition">All Products</Link>
          <ChevronRight className="w-4 h-4 text-slate-400" />
          <span className="font-semibold text-slate-900">PPGL / PPGI Profile Sheet</span>
        </nav>

        {/* HERO BANNER - CLEAN MINIMALIST STEEL PALETTE */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white p-6 sm:p-10 mb-10 shadow-2xl border border-slate-800">
          <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="max-w-2xl">
              <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-3">
                PPGL / PPGI <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-sky-300 to-amber-300">Profile Sheet</span>
              </h1>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Super Durable Polyester (SDP) top coat over High-Grade Aluminium-Zinc substrate. Tested for 100% cross-hatch adhesion, 100DR solvent rub, and 140°C thermal endurance.
              </p>
            </div>

            {/* Price Badge Card */}
            <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-3xl p-6 text-center lg:text-right shrink-0 shadow-2xl">
              <span className="text-xs uppercase tracking-wider text-sky-300 font-bold block mb-1">STANDARD WHOLESALE PRICE</span>
              <span className="text-xs text-slate-300 block">Ex-Factory | GST & Transport extra</span>
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
                alt="PPGL Profile Sheet"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <button 
                className="absolute top-3 right-3 bg-slate-900/80 hover:bg-sky-600 text-white p-2 rounded-xl backdrop-blur-md transition shadow-md"
                aria-label="Enlarge Image"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
              <span className="absolute bottom-3 left-3 bg-slate-900/85 text-sky-300 text-xs px-3 py-1.5 rounded-lg font-semibold shadow-md">
                High Gloss SDP Top Coat
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
                  <img src={img.src} alt={img.label} className="w-full h-full object-cover rounded-xl" />
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
                <Ruler className="w-5 h-5 text-sky-600" /> Select Sheet Thickness & Length
              </h2>

              {/* THICKNESS SELECTOR */}
              <label className="block text-xs font-bold text-slate-700 mb-2">Thickness (Tolerance: +0/-0.030mm)</label>
              <div className="grid grid-cols-5 gap-1.5 mb-5">
                {['0.35 mm', '0.40 mm', '0.45 mm', '0.50 mm', '0.60 mm'].map((t) => (
                  <button
                    key={t}
                    onClick={() => setSelectedThickness(t)}
                    className={`
                      py-2 px-1 rounded-xl text-xs font-bold border text-center transition-all
                      ${selectedThickness === t
                        ? 'bg-[#0B192C] border-[#0B192C] text-white shadow-sm'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300'
                      }
                    `}
                  >
                    {t}
                  </button>
                ))}
              </div>

              {/* LENGTH SELECTOR */}
              <label className="block text-xs font-bold text-slate-700 mb-2">Standard Length Options</label>
              <select
                value={selectedLength}
                onChange={(e) => setSelectedLength(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-xs font-bold text-slate-900 mb-5 focus:outline-none focus:border-sky-600"
              >
                {lengthsList.map((len) => (
                  <option key={len} value={len}>{len}</option>
                ))}
              </select>

              {/* LIVE WEIGHT & COST ESTIMATOR SUB-BOX */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 mb-4">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                    <Calculator className="w-4 h-4 text-sky-600" /> Coverage Estimator
                  </label>
                  <span className="text-[10px] bg-[#0B192C] text-white px-2 py-0.5 rounded font-bold">
                    ₹70 / kg
                  </span>
                </div>

                <div className="mb-3">
                  <label className="block text-[10px] font-semibold text-slate-600 mb-1">Number of Sheets (Pieces)</label>
                  <input
                    type="number"
                    min="1"
                    value={quantityPieces}
                    onChange={(e) => setQuantityPieces(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-xl px-3 py-1.5 text-xs font-bold text-slate-900"
                  />
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
                className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 rounded-2xl text-xs shadow-md transition flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4" /> Request Quote For PPGL Profile Sheets
              </button>
            </div>

          </div>

        </div>

        {/* SECTION 2: TECHNICAL PERFORMANCE TEST MATRIX */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm mb-12">
          <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
            <div>
              <span className="text-xs font-bold text-sky-700 uppercase tracking-wider bg-sky-50 px-3 py-1 rounded-full border border-sky-100">
                Technical Data Sheet
              </span>
              <h2 className="text-2xl font-extrabold text-slate-900 mt-2">
                Certified Coating Performance & Test Matrix
              </h2>
            </div>
            <div className="flex items-center gap-2 text-xs font-bold text-slate-600 bg-slate-100 px-3 py-2 rounded-xl">
              <ShieldCheck className="w-4 h-4 text-emerald-600" /> 1000 Hrs Salt Spray Certified
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-slate-900 text-white font-bold">
                  <th className="p-3.5 rounded-l-xl">Laboratory Test Parameter</th>
                  <th className="p-3.5">Test Standard</th>
                  <th className="p-3.5 rounded-r-xl">Certified Result</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {testMatrixData.map((row, i) => (
                  <tr key={i} className="hover:bg-slate-50 transition">
                    <td className="p-3.5 font-bold text-slate-900 w-1/3">{row.test}</td>
                    <td className="p-3.5 text-slate-700 font-semibold">{row.method}</td>
                    <td className="p-3.5 font-extrabold text-sky-700">{row.result}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* SECTION 3: COATING SYSTEM ARCHITECTURE CARDS */}
        <div className="mb-12">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-sky-700 font-bold text-xs uppercase tracking-wider bg-sky-50 px-3 py-1 rounded-full border border-sky-200">
              Multi-Layer Protection
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
              Why Choose PPGL / PPGI Profile Sheets?
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">Super durable polyester multi-layer coating system engineered for extreme weather resilience</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm hover:border-sky-500 transition">
              <CheckCircle2 className="w-6 h-6 text-emerald-600 mb-3" />
              <span className="text-[10px] font-bold uppercase text-sky-700 bg-sky-50 px-2.5 py-1 rounded-full border border-sky-100 inline-block mb-2">Substrate</span>
              <h3 className="font-extrabold text-slate-900 text-base mb-1">AZ-150 Al-Zinc Base</h3>
              <p className="text-xs text-slate-600 leading-relaxed">High-grade Aluminium & Zinc alloy coating for maximum core protection</p>
            </div>

            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm hover:border-sky-500 transition">
              <CheckCircle2 className="w-6 h-6 text-emerald-600 mb-3" />
              <span className="text-[10px] font-bold uppercase text-sky-700 bg-sky-50 px-2.5 py-1 rounded-full border border-sky-100 inline-block mb-2">Top Coat</span>
              <h3 className="font-extrabold text-slate-900 text-base mb-1">SDP Paint System</h3>
              <p className="text-xs text-slate-600 leading-relaxed">Super Durable Polyester finish with high gloss & UV color retention</p>
            </div>

            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm hover:border-sky-500 transition">
              <CheckCircle2 className="w-6 h-6 text-emerald-600 mb-3" />
              <span className="text-[10px] font-bold uppercase text-sky-700 bg-sky-50 px-2.5 py-1 rounded-full border border-sky-100 inline-block mb-2">Bottom Coat</span>
              <h3 className="font-extrabold text-slate-900 text-base mb-1">RMP Back Primer</h3>
              <p className="text-xs text-slate-600 leading-relaxed">Regular Modified Polyester back coat offering 1.5kg scratch resistance</p>
            </div>

            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm hover:border-sky-500 transition">
              <CheckCircle2 className="w-6 h-6 text-emerald-600 mb-3" />
              <span className="text-[10px] font-bold uppercase text-sky-700 bg-sky-50 px-2.5 py-1 rounded-full border border-sky-100 inline-block mb-2">Protection</span>
              <h3 className="font-extrabold text-slate-900 text-base mb-1">JSW Everglow Film</h3>
              <p className="text-xs text-slate-600 leading-relaxed">Branded peelable guard film protecting high-gloss finish during transport</p>
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
            <img src={activeImage} alt="PPGL Sheet Preview" className="max-w-full max-h-[85vh] object-contain rounded-2xl bg-white p-4" />
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
            <p className="text-xs text-[#004060] font-bold mb-6">
              PPGL Profile Sheet — {selectedThickness} ({selectedLength}) Rate: ₹70.00 / kg
            </p>

            {isSubmitted ? (
              <div className="py-8 text-center">
                <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-3 animate-bounce" />
                <h4 className="font-bold text-slate-900 text-lg">Inquiry Received!</h4>
                <p className="text-xs text-slate-600 mt-1">Our sales team will contact you with coil & sheet batch availability.</p>
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
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-[#004060]"
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
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-[#004060]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Required Quantity (kg / sheets)</label>
                  <input
                    type="text"
                    placeholder={`e.g. ${estimatedWeightKg} kg`}
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-[#004060]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Additional Requirements</label>
                  <textarea
                    rows={3}
                    placeholder="Specify color shade (e.g. Off-White, Sky Blue, Brick Red) or custom cut length"
                    value={formData.requirements}
                    onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-[#004060]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#004060] hover:bg-[#003048] text-white font-bold py-3 rounded-xl shadow-lg text-sm transition"
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
