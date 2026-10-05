import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ChevronRight, 
  CheckCircle2, 
  ShieldCheck, 
  MessageSquare,
  Maximize2,
  X,
  Ruler,
  Calculator
} from 'lucide-react';

// Image imports
import greenJswImg from '../../../assets/gc_sheets/gc_green_jsw_stack.jpg';
import silverCloseImg from '../../../assets/gc_sheets/gc_silver_close.jpg';
import silverStackImg from '../../../assets/gc_sheets/gc_silver_stack.jpg';

export default function GCSheetPage() {
  const images = [
    { src: greenJswImg, label: 'JSW Green Colour ON+ GC Sheet' },
    { src: silverCloseImg, label: 'Silver Galvanized Linear Profile' },
    { src: silverStackImg, label: 'Factory Stacked GC Sheets' }
  ];

  const [activeImage, setActiveImage] = useState(greenJswImg);
  const [showModal, setShowModal] = useState(false);
  const [showLightbox, setShowLightbox] = useState(false);
  
  // Interactive Customization States
  const [selectedWidth, setSelectedWidth] = useState('910 mm');
  const [selectedThickness, setSelectedThickness] = useState('0.50 mm');
  const [sheetLengthFt, setSheetLengthFt] = useState('10');
  const [quantitySheets, setQuantitySheets] = useState('25');

  // Form State
  const [formData, setFormData] = useState({ name: '', phone: '', quantity: '', requirements: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Rate per kg
  const RATE_PER_KG = 60.00;

  // Approx weight calculation per sheet length
  const thicknessMultipliers = {
    '0.20 mm': 0.55,
    '0.30 mm': 0.78,
    '0.40 mm': 1.02,
    '0.50 mm': 1.28,
    '0.80 mm': 2.05
  };

  const mult = thicknessMultipliers[selectedThickness] || 1.28;
  const length = (parseFloat(sheetLengthFt) || 10);
  const qty = (parseInt(quantitySheets) || 1);
  const estWeightKg = Math.round(length * qty * mult);
  const estCostRs = Math.round(estWeightKg * RATE_PER_KG);

  const featuresList = [
    {
      title: 'Uniform Corrugations',
      desc: 'Precision engineered linear profile ensures perfect interlocking & 100% leak-proof overlapping.'
    },
    {
      title: 'High Tensile Strength',
      desc: 'Manufactured from best-in-class steel base to withstand extreme winds & heavy structural loads.'
    },
    {
      title: 'Superior Zinc Coating',
      desc: 'Heavy protective Zinc layer prevents rusting, corrosion, and natural weathering forces.'
    },
    {
      title: 'Best Raw Material',
      desc: 'Durastrong quality assurance guaranteed for agricultural, industrial, and residential roofing.'
    }
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
          <span className="font-semibold text-slate-900">Galvanized Corrugated Sheets (GC Sheets)</span>
        </nav>

        {/* HERO BANNER - MATCHING EXACT USER REFERENCE LAYOUT */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white p-6 sm:p-10 mb-10 shadow-2xl border border-slate-800">
          <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="max-w-2xl">
              <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-3">
                Galvanized Corrugated <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-sky-300 to-amber-300">Sheets (GC)</span>
              </h1>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Durastrong GC Sheets feature linear corrugations with high-grade Zinc coating. Manufactured with precision in 0.20mm – 0.80mm thickness and multiple standard widths to exceed industry standards.
              </p>
            </div>

            {/* Price Badge Card matching user screenshot box */}
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
                alt="Galvanized Corrugated GC Sheet"
                className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-500"
              />
              <button 
                className="absolute top-3 right-3 bg-slate-900/80 hover:bg-emerald-600 text-white p-2 rounded-xl backdrop-blur-md transition shadow-md"
                aria-label="Enlarge Image"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
              <span className="absolute bottom-3 left-3 bg-slate-900/80 text-emerald-300 text-xs px-3 py-1.5 rounded-lg font-semibold shadow-md">
                Linear Corrugated Pattern
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
                      ? 'border-emerald-600 ring-2 ring-emerald-600/20 scale-[1.02] shadow-md' 
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

          {/* RIGHT 5 COLS: INTERACTIVE WIDTH & THICKNESS CONFIGURATOR */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6">
            
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
              <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Ruler className="w-5 h-5 text-sky-600" /> Select GC Specifications
              </h2>

              {/* WIDTH SELECTOR */}
              <label className="block text-xs font-bold text-slate-700 mb-2">Available Sheet Widths</label>
              <div className="grid grid-cols-3 gap-2 mb-4">
                {['825 mm', '910 mm', '1220 mm'].map((w) => (
                  <button
                    key={w}
                    onClick={() => setSelectedWidth(w)}
                    className={`
                      py-2 px-2 rounded-xl text-xs font-bold border text-center transition-all
                      ${selectedWidth === w
                        ? 'bg-[#0B192C] border-[#0B192C] text-white shadow-sm'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300'
                      }
                    `}
                  >
                    {w}
                  </button>
                ))}
              </div>

              {/* THICKNESS SELECTOR */}
              <label className="block text-xs font-bold text-slate-700 mb-2">Sheet Thickness Range</label>
              <div className="grid grid-cols-3 gap-1.5 mb-5">
                {['0.20 mm', '0.30 mm', '0.40 mm', '0.50 mm', '0.80 mm'].map((thick) => (
                  <button
                    key={thick}
                    onClick={() => setSelectedThickness(thick)}
                    className={`
                      py-2 px-1 rounded-xl text-[11px] font-bold border text-center transition-all
                      ${selectedThickness === thick
                        ? 'bg-sky-700 border-sky-700 text-white shadow-sm'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300'
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
                    <Calculator className="w-4 h-4 text-sky-600" /> Coverage Estimator
                  </label>
                  <span className="text-[10px] bg-slate-900 text-white px-2 py-0.5 rounded font-bold">
                    ₹60 / kg
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div>
                    <label className="block text-[10px] font-semibold text-slate-600 mb-1">Length per Sheet (Ft)</label>
                    <input
                      type="number"
                      min="1"
                      value={sheetLengthFt}
                      onChange={(e) => setSheetLengthFt(e.target.value)}
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
                <MessageSquare className="w-4 h-4" /> Request Quote For GC Corrugated Sheets
              </button>
            </div>

          </div>

        </div>

        {/* SECTION 2: TECHNICAL SUMMARY TABLE */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm mb-12">
          <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
            <div>
              <span className="text-xs font-bold text-sky-700 uppercase tracking-wider bg-sky-50 px-3 py-1 rounded-full border border-sky-100">
                Technical Data Sheet
              </span>
              <h2 className="text-2xl font-extrabold text-slate-900 mt-2">
                GC Sheets Technical Matrix
              </h2>
            </div>
            <div className="flex items-center gap-2 text-xs font-bold text-slate-600 bg-slate-100 px-3 py-2 rounded-xl">
              <ShieldCheck className="w-4 h-4 text-emerald-600" /> IS 277 & ISO Certified
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-slate-900 text-white font-bold">
                  <th className="p-3.5 rounded-l-xl">Specification Parameter</th>
                  <th className="p-3.5 rounded-r-xl">Details / Value</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                <tr className="hover:bg-slate-50 transition">
                  <td className="p-3.5 font-bold text-slate-900 w-1/2">Product Name</td>
                  <td className="p-3.5 text-slate-700">Durastrong Galvanized Corrugated Sheets (GC Sheets)</td>
                </tr>
                <tr className="hover:bg-slate-50 transition">
                  <td className="p-3.5 font-bold text-slate-900">Thickness Range</td>
                  <td className="p-3.5 font-extrabold text-sky-700">0.20 mm – 0.80 mm TCT</td>
                </tr>
                <tr className="hover:bg-slate-50 transition">
                  <td className="p-3.5 font-bold text-slate-900">Standard Width Options</td>
                  <td className="p-3.5 text-slate-700">825 mm / 910 mm / 1220 mm</td>
                </tr>
                <tr className="hover:bg-slate-50 transition">
                  <td className="p-3.5 font-bold text-slate-900">Surface Finish & Coating</td>
                  <td className="p-3.5 text-slate-700">Galvanized Zinc Coated / JSW Colour ON+ Option</td>
                </tr>
                <tr className="hover:bg-slate-50 transition">
                  <td className="p-3.5 font-bold text-slate-900">Wholesale Price Rate</td>
                  <td className="p-3.5 font-black text-amber-600">₹60.00 per kg</td>
                </tr>
                <tr className="hover:bg-slate-50 transition">
                  <td className="p-3.5 font-bold text-slate-900">Application Areas</td>
                  <td className="p-3.5 text-slate-700">Industrial Sheds, Agricultural Warehouses, Residential Roofing</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* SECTION 3: KEY FEATURES GRID */}
        <div className="mb-12">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-emerald-700 font-bold text-xs uppercase tracking-wider bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Durastrong Excellence
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
              Why Choose Durastrong GC Sheets?
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">Engineered to prioritize structural integrity and long-lasting weather durability</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuresList.map((feat, idx) => (
              <div key={idx} className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm hover:border-emerald-500 transition group">
                <CheckCircle2 className="w-6 h-6 text-emerald-600 mb-3" />
                <h3 className="font-extrabold text-slate-900 text-base mb-2">{feat.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{feat.desc}</p>
              </div>
            ))}
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
            <img src={activeImage} alt="GC Sheet Preview" className="max-w-full max-h-[85vh] object-contain rounded-2xl bg-white p-4" />
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
            <p className="text-xs text-emerald-600 mb-6">
              Durastrong GC Sheet — {selectedThickness} ({selectedWidth}) Rate: ₹60.00 / kg
            </p>

            {isSubmitted ? (
              <div className="py-8 text-center">
                <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-3 animate-bounce" />
                <h4 className="font-bold text-slate-900 text-lg">Inquiry Received!</h4>
                <p className="text-xs text-slate-600 mt-1">Our Durastrong representative will contact you shortly.</p>
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
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-emerald-600"
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
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-emerald-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Required Quantity (kg / sheets)</label>
                  <input
                    type="text"
                    placeholder={`e.g. ${estWeightKg} kg`}
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-emerald-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Additional Requirements</label>
                  <textarea
                    rows={3}
                    placeholder="Specify sheet length or color options (e.g. Green JSW Colour ON+)"
                    value={formData.requirements}
                    onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-emerald-600"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl shadow-lg shadow-emerald-600/20 text-sm transition"
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
