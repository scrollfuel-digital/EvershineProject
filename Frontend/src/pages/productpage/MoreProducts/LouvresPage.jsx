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
import blueStackImg from '../../../assets/louvres/louver_blue_stack.png';
import whitePanelImg from '../../../assets/louvres/louver_white_panel.jpg';
import wallMountedImg from '../../../assets/louvres/louver_wall_mounted.jpg';
import orangePanelImg from '../../../assets/louvres/louver_orange_panel.jpg';

export default function LouvresPage() {
  const images = [
    { src: blueStackImg, label: 'Sky Blue Z-Profile Stack' },
    { src: whitePanelImg, label: 'Off-White Multi-Panel Assembly' },
    { src: wallMountedImg, label: 'Perimeter Wall Mounted Unit' },
    { src: orangePanelImg, label: 'Terracotta Orange Multi-Panel' }
  ];

  const [activeImage, setActiveImage] = useState(blueStackImg);
  const [showModal, setShowModal] = useState(false);
  const [showLightbox, setShowLightbox] = useState(false);
  
  // Interactive Controls
  const [louverType, setLouverType] = useState('Fixed Z-Profile'); // 'Fixed Z-Profile' | 'Adjustable Louvers'
  const [louverSize, setLouverSize] = useState('1.5 x 1.5 Mtr');

  // Ventilation Calculator State
  const [ventAreaSqM, setVentAreaSqM] = useState('20');
  const [permOpeningSqM, setPermOpeningSqM] = useState('5');

  // Form State
  const [formData, setFormData] = useState({ name: '', phone: '', quantity: '', requirements: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Rate per piece
  const RATE_PER_NOS = 3800;

  // Airflow Calculations per User Prompt Formula
  const ventArea = (parseFloat(ventAreaSqM) || 20);
  const permOpening = (parseFloat(permOpeningSqM) || 0);
  const freeInletArea = 1.50 * ventArea;
  const effectiveLouverArea = Math.max(0, freeInletArea - permOpening);
  
  const unitArea = louverSize === '1 x 1 Mtr' ? 1.0 : 2.25;
  const recommendedUnits = Math.ceil(effectiveLouverArea / unitArea) || 1;
  const estTotalCostRs = recommendedUnits * RATE_PER_NOS;

  const specificationsData = [
    { key: 'Product Name', value: 'Industrial Wall Louvers (Evershine Prefab Solutions)' },
    { key: 'Louver Profile', value: 'Z Profile (Weather-Proof Blade Design)' },
    { key: 'Steel Grade', value: 'SS 345 / High Tensile Pre-Painted Steel' },
    { key: 'Standard Dimensions', value: '1.0 x 1.0 Mtr & 1.5 x 1.5 Mtr' },
    { key: 'Blade Thickness', value: '0.30 mm to 1.0 mm' },
    { key: 'Surface Finish', value: 'Pre-painted Coated Steel (All RAL Colors) / Bare Galvanized' },
    { key: 'Wholesale Unit Rate', value: '₹3,800.00 per nos. (per piece)' },
    { key: 'Application', value: 'Industrial Buildings, Warehouses, Storage Plants, Power Plants' }
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
          <span className="font-semibold text-slate-900">Industrial Louvers (SS 345 Z-Profile)</span>
        </nav>

        {/* HERO BANNER - MATCHING EXACT USER REFERENCE LAYOUT */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white p-6 sm:p-10 mb-10 shadow-2xl border border-slate-800">
          <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="max-w-2xl">
              <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-3">
                Industrial <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-sky-300 to-amber-300">Z-Profile Louvers</span>
              </h1>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Engineered wall louvers in SS 345 grade designed to continuously circulate natural air, reduce heat & dust buildup inside warehouses, and maintain healthy building environments.
              </p>
            </div>

            {/* Price Badge Card matching user screenshot box */}
            <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-3xl p-6 text-center lg:text-right shrink-0 shadow-2xl">
              <span className="text-xs uppercase tracking-wider text-sky-300 font-bold block mb-1">STANDARD WHOLESALE PRICE</span>
              <span className="text-xs text-slate-300 block">Ex-Factory | GST & Transport extra</span>
            </div>
          </div>
        </div>

        {/* SECTION 1: PHOTO GALLERY + INTERACTIVE AIRFLOW CALCULATOR & SELECTOR */}
        <div className="grid lg:grid-cols-12 gap-8 mb-12">
          
          {/* LEFT 7 COLS: PHOTO GALLERY */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-5 border border-slate-200 shadow-sm">
            <div 
              onClick={() => setShowLightbox(true)}
              className="relative w-full h-[360px] sm:h-[440px] bg-slate-100 rounded-2xl overflow-hidden mb-4 border border-slate-200 group cursor-pointer"
            >
              <img 
                src={activeImage} 
                alt="Industrial Louver Unit"
                className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-500"
              />
              <button 
                className="absolute top-3 right-3 bg-slate-900/80 hover:bg-sky-600 text-white p-2 rounded-xl backdrop-blur-md transition shadow-md"
                aria-label="Enlarge Image"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
              <span className="absolute bottom-3 left-3 bg-slate-900/80 text-sky-300 text-xs px-3 py-1.5 rounded-lg font-semibold shadow-md">
                Z-Profile Weather Blade
              </span>
            </div>

            {/* Thumbnails (4 photos) */}
            <div className="grid grid-cols-4 gap-2.5">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(img.src)}
                  className={`
                    relative rounded-2xl overflow-hidden aspect-square border-2 transition-all duration-200 bg-slate-50 p-1.5
                    ${activeImage === img.src 
                      ? 'border-sky-600 ring-2 ring-sky-600/20 scale-[1.02] shadow-md' 
                      : 'border-slate-200 hover:border-slate-400 opacity-80 hover:opacity-100'
                    }
                  `}
                >
                  <img src={img.src} alt={img.label} className="w-full h-full object-contain" />
                  <span className="absolute inset-x-0 bottom-0 bg-slate-900/85 text-[9px] text-white py-0.5 text-center font-medium truncate px-1">
                    {img.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT 5 COLS: INTERACTIVE CONFIGURATOR & AIRFLOW CALCULATOR */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6">
            
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
              <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Ruler className="w-5 h-5 text-sky-600" /> Select Louver Type & Specs
              </h2>

              {/* TYPE TOGGLE: FIXED VS ADJUSTABLE */}
              <label className="block text-xs font-bold text-slate-700 mb-2">Louver Blade Control</label>
              <div className="grid grid-cols-2 gap-2 mb-4">
                <button
                  onClick={() => setLouverType('Fixed Z-Profile')}
                  className={`
                    p-2.5 rounded-xl text-xs font-bold border text-left transition-all
                    ${louverType === 'Fixed Z-Profile'
                      ? 'bg-[#0B192C] border-[#0B192C] text-white shadow-sm'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300'
                    }
                  `}
                >
                  <span className="block font-extrabold text-xs mb-0.5">Fixed Z-Profile</span>
                  <span className="text-[9px] opacity-80 block">Continuous Air Flow</span>
                </button>

                <button
                  onClick={() => setLouverType('Adjustable Louvers')}
                  className={`
                    p-2.5 rounded-xl text-xs font-bold border text-left transition-all
                    ${louverType === 'Adjustable Louvers'
                      ? 'bg-sky-700 border-sky-700 text-white shadow-sm'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300'
                    }
                  `}
                >
                  <span className="block font-extrabold text-xs mb-0.5">Adjustable</span>
                  <span className="text-[9px] opacity-80 block">Manual Control</span>
                </button>
              </div>

              {/* SIZE SELECTOR */}
              <label className="block text-xs font-bold text-slate-700 mb-2">Standard Panel Dimensions</label>
              <div className="grid grid-cols-2 gap-2 mb-5">
                {['1 x 1 Mtr', '1.5 x 1.5 Mtr'].map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setLouverSize(sz)}
                    className={`
                      py-2 px-2 rounded-xl text-xs font-bold border text-center transition-all
                      ${louverSize === sz
                        ? 'bg-[#0B192C] border-[#0B192C] text-white shadow-sm'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300'
                      }
                    `}
                  >
                    {sz}
                  </button>
                ))}
              </div>

              {/* LIVE AIRFLOW & COST ESTIMATOR SUB-BOX */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 mb-4">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                    <Calculator className="w-4 h-4 text-sky-600" /> Coverage Estimator (Sq.m)
                  </label>
                  <span className="text-[10px] bg-[#0B192C] text-white px-2 py-0.5 rounded font-bold">
                    ₹1,200 / Sq.m
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div>
                    <label className="block text-[10px] font-semibold text-slate-600 mb-1">Vent Area (m²)</label>
                    <input
                      type="number"
                      min="1"
                      value={ventAreaSqM}
                      onChange={(e) => setVentAreaSqM(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded-xl px-2.5 py-1.5 text-xs font-bold text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-semibold text-slate-600 mb-1">Perm. Opening (m²)</label>
                    <input
                      type="number"
                      min="0"
                      value={permOpeningSqM}
                      onChange={(e) => setPermOpeningSqM(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded-xl px-2.5 py-1.5 text-xs font-bold text-slate-900"
                    />
                  </div>
                </div>

                <div className="bg-white p-3 rounded-xl border border-sky-200/70 text-xs space-y-1 mb-2">
                  <div className="flex justify-between text-slate-600">
                    <span>Free Inlet Area (1.5x):</span>
                    <strong className="text-slate-900">{freeInletArea.toFixed(1)} m²</strong>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Effective Louver Area:</span>
                    <strong className="text-sky-700">{effectiveLouverArea.toFixed(1)} m²</strong>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs pt-1">
                  <div>
                    <span className="text-[10px] text-slate-500 block">Recommended Units</span>
                    <span className="font-extrabold text-sky-700 text-base">{recommendedUnits} nos.</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-500 block">Est. Wholesale Cost</span>
                    <span className="font-black text-amber-600 text-lg">₹{estTotalCostRs.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setShowModal(true)}
                className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 rounded-2xl text-xs shadow-md transition flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4" /> Request Quote For Louver Units
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
                Industrial Louvers Technical Matrix
              </h2>
            </div>
            <div className="flex items-center gap-2 text-xs font-bold text-slate-600 bg-slate-100 px-3 py-2 rounded-xl">
              <ShieldCheck className="w-4 h-4 text-emerald-600" /> Grade SS 345 / Z-Profile Certified
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-slate-900 text-white font-bold">
                  <th className="p-3.5 rounded-l-xl">Specification Parameter</th>
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

        {/* SECTION 3: RAL COLOR FINISHES SHOWCASE */}
        <div className="mb-12">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-sky-700 font-bold text-xs uppercase tracking-wider bg-sky-50 px-3 py-1 rounded-full border border-sky-200">
              Coating & Finish Spectrum
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
              All RAL Colour Options & Bare Finishes
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">Pre-painted coated steel with anti-corrosive primer shielding</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm">
              <div className="w-full h-16 rounded-2xl bg-sky-500 mb-3 shadow-inner" />
              <h3 className="font-extrabold text-slate-900 text-sm">RAL Sky Blue</h3>
              <p className="text-xs text-slate-500">Standard industrial perimeter wall finish</p>
            </div>

            <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm">
              <div className="w-full h-16 rounded-2xl bg-stone-200 mb-3 shadow-inner" />
              <h3 className="font-extrabold text-slate-900 text-sm">RAL Off-White</h3>
              <p className="text-xs text-slate-500">Clean aesthetic for commercial storage facilities</p>
            </div>

            <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm">
              <div className="w-full h-16 rounded-2xl bg-amber-700 mb-3 shadow-inner" />
              <h3 className="font-extrabold text-slate-900 text-sm">RAL Terracotta Orange</h3>
              <p className="text-xs text-slate-500">Heavy industrial architectural look</p>
            </div>

            <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm">
              <div className="w-full h-16 rounded-2xl bg-slate-400 mb-3 shadow-inner" />
              <h3 className="font-extrabold text-slate-900 text-sm">Bare Galvanized</h3>
              <p className="text-xs text-slate-500">High-durability unpainted metallic finish</p>
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
            <img src={activeImage} alt="Industrial Louver Preview" className="max-w-full max-h-[85vh] object-contain rounded-2xl bg-white p-4" />
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
            <p className="text-xs text-sky-600 mb-6">
              Industrial Louvers — {louverType} ({louverSize}) Rate: ₹3,800 / nos.
            </p>

            {isSubmitted ? (
              <div className="py-8 text-center">
                <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-3 animate-bounce" />
                <h4 className="font-bold text-slate-900 text-lg">Inquiry Received!</h4>
                <p className="text-xs text-slate-600 mt-1">Our ventilation specialist will contact you with layout drawings.</p>
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
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Required Quantity (nos / pieces)</label>
                  <input
                    type="text"
                    placeholder={`e.g. ${recommendedUnits} nos.`}
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-sky-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Additional Requirements</label>
                  <textarea
                    rows={3}
                    placeholder="Specify RAL color finish or motorized adjustable blade controls"
                    value={formData.requirements}
                    onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-sky-600"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-sky-600 hover:bg-sky-700 text-white font-bold py-3 rounded-xl shadow-lg shadow-sky-600/20 text-sm transition"
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
