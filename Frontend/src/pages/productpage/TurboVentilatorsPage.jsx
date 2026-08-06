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
  Wind,
  Zap,
  ShieldAlert,
  Calculator,
  Compass,
  Ruler,
  RotateCw,
  Gauge
} from 'lucide-react';

// Image imports
import roofMountedImg from '../../assets/turbo_ventilators/turbo_roof_mounted.png';
import polyBaseImg from '../../assets/turbo_ventilators/turbo_poly_base.jpg';
import studioSs430Img from '../../assets/turbo_ventilators/turbo_ss430_studio.jpg';

export default function TurboVentilatorsPage() {
  const images = [
    { src: roofMountedImg, label: 'Installed SS430 Roof Mounted Turbo Ventilator' },
    { src: polyBaseImg, label: 'Customized Poly Profile Match Base Assembly' },
    { src: studioSs430Img, label: '610mm Throat SS430 Studio Product Shot' }
  ];

  const [activeImage, setActiveImage] = useState(roofMountedImg);
  const [showModal, setShowModal] = useState(false);
  const [showLightbox, setShowLightbox] = useState(false);
  
  // Calculator State
  const [unitQuantity, setUnitQuantity] = useState('5');

  // Form State
  const [formData, setFormData] = useState({ name: '', phone: '', quantity: '', requirements: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Wholesale Rate per nos.
  const RATE_PER_UNIT = 3000.00;

  const units = (parseInt(unitQuantity) || 1);
  const estCostRs = units * RATE_PER_UNIT;

  const keyFeatures = [
    {
      title: '100% Wind-Driven (0 KW Electricity)',
      desc: 'Operates continuously without electrical power by harnessing natural wind and thermal heat convection.'
    },
    {
      title: 'High Air Exhaust (2,100 CFM)',
      desc: 'Powerful 2,100 Cubic Feet Per Minute suction clears accumulated heat, vapors, smoke, and industrial dust.'
    },
    {
      title: 'SS430 JSW Stainless Vanes',
      desc: '42 to 44 aerodynamically curved SS430 vanes (0.50mm thickness) resistant to rust, acid fumes, and rain.'
    },
    {
      title: 'Dual 6001 ZZ Shielded Bearings',
      desc: 'Low-friction precision ball bearings over a 12mm G.I shaft ensure silent, maintenance-free 24/7 rotation.'
    }
  ];

  const techSpecs = [
    { label: 'Throat Diameter', val: '610 MM (24 Inch)' },
    { label: 'Turbine Diameter', val: '710 MM' },
    { label: 'Overall Height', val: '410 MM' },
    { label: 'Number of Vanes', val: '42 - 44 Nos.' },
    { label: 'Vanes Material (MOC)', val: 'SS430 JSW Stainless Steel (0.50mm)' },
    { label: 'Shaft Diameter & MOC', val: '12 MM Galvanized Iron (G.I)' },
    { label: 'Bearing Type', val: '6001 ZZ Double Shielded (2 Nos.)' },
    { label: 'Exhaust Airflow Capacity', val: '2,100 C.F.M.' },
    { label: 'Base Matching Type', val: 'Poly Profile Customized Matching Base' },
    { label: 'Unit Net Weight', val: 'Approx 5.0 KG' },
    { label: 'Trademark & HSN Code', val: 'RBS / HSN 8412' },
    { label: 'Warranty Period', val: '1 Year Manufacturer Warranty' }
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
          <a href="/" className="hover:text-teal-600 transition">Home</a>
          <ChevronRight className="w-4 h-4 text-slate-400" />
          <a href="/allproduct/mildsteel/deck-sheet" className="hover:text-teal-600 transition">All Products</a>
          <ChevronRight className="w-4 h-4 text-slate-400" />
          <span className="font-semibold text-slate-900">Industrial Rooftop Turbo Ventilators</span>
        </nav>

        {/* HERO BANNER - CLEAN MINIMALIST STEEL PALETTE */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white p-6 sm:p-10 mb-10 shadow-2xl border border-slate-800">
          <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-sky-500/10 text-sky-400 rounded-full text-xs font-bold mb-4 border border-sky-500/20 shadow-sm">
                <Wind className="w-4 h-4 text-amber-400 animate-spin" /> Zero Power Eco Ventilation | 2,100 CFM Exhaust Capacity
              </div>
              <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-3">
                Industrial Rooftop <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-sky-300 to-amber-300">Turbo Ventilators</span>
              </h1>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                SS430 JSW stainless steel air-driven roof ventilators designed for 24/7 continuous circulation of fresh natural air, eliminating heat buildup, fumes, and humidity in industrial sheds.
              </p>
            </div>

            {/* Price Badge Card */}
            <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-3xl p-6 text-center lg:text-right shrink-0 shadow-2xl">
              <span className="text-xs uppercase tracking-wider text-sky-300 font-bold block mb-1">Wholesale Rate</span>
              <div className="text-4xl font-black text-amber-400 my-1">
                ₹3,000 <span className="text-sm font-normal text-slate-200">/ nos.</span>
              </div>
              <span className="text-xs text-slate-300 block">Ex-Factory | Standard 610mm Throat</span>
            </div>
          </div>
        </div>

        {/* SECTION 1: PHOTO GALLERY + INTERACTIVE UNIT CALCULATOR */}
        <div className="grid lg:grid-cols-12 gap-8 mb-12">
          
          {/* LEFT 7 COLS: PHOTO GALLERY */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-5 border border-slate-200 shadow-sm">
            <div 
              onClick={() => setShowLightbox(true)}
              className="relative w-full h-[360px] sm:h-[440px] bg-slate-100 rounded-2xl overflow-hidden mb-4 border border-slate-200 group cursor-pointer"
            >
              <img 
                src={activeImage} 
                alt="Industrial Turbo Ventilator"
                className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-500"
              />
              <button 
                className="absolute top-3 right-3 bg-slate-900/80 hover:bg-sky-600 text-white p-2 rounded-xl backdrop-blur-md transition shadow-md"
                aria-label="Enlarge Image"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
              <span className="absolute bottom-3 left-3 bg-slate-900/85 text-sky-300 text-xs px-3 py-1.5 rounded-lg font-semibold shadow-md">
                610mm Throat SS430 Turbine
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

          {/* RIGHT 5 COLS: INTERACTIVE UNIT CALCULATOR & QUICK SPECS */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6">
            
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
              <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Gauge className="w-5 h-5 text-sky-600" /> Quantity & Cost Estimator
              </h2>

              {/* LIVE UNIT COST ESTIMATOR */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 mb-5">
                <div className="flex items-center justify-between mb-3">
                  <label className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                    <Calculator className="w-4 h-4 text-sky-600" /> Wholesale Price Estimator
                  </label>
                  <span className="text-[10px] bg-slate-900 text-white px-2 py-0.5 rounded font-bold">
                    ₹3,000 / nos.
                  </span>
                </div>

                <div className="mb-4">
                  <label className="block text-[10px] font-semibold text-slate-600 mb-1">Required Turbo Ventilator Units (Nos)</label>
                  <input
                    type="number"
                    min="1"
                    value={unitQuantity}
                    onChange={(e) => setUnitQuantity(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2 text-sm font-bold text-slate-900"
                  />
                </div>

                <div className="flex items-center justify-between text-xs pt-3 border-t border-slate-200">
                  <div>
                    <span className="text-[10px] text-slate-500 block uppercase font-semibold">Total Quantity</span>
                    <span className="font-extrabold text-sky-700 text-sm">{units} Units</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-500 block uppercase font-semibold">Total Wholesale Price</span>
                    <span className="font-black text-amber-600 text-xl">₹{estCostRs.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* QUICK KEY SPECS SUMMARY */}
              <div className="space-y-2 mb-5">
                <div className="flex items-center justify-between text-xs py-1.5 border-b border-slate-100">
                  <span className="text-slate-500">Throat Diameter</span>
                  <span className="font-bold text-slate-900">610 mm (24")</span>
                </div>
                <div className="flex items-center justify-between text-xs py-1.5 border-b border-slate-100">
                  <span className="text-slate-500">Exhaust Air Capacity</span>
                  <span className="font-bold text-emerald-600">2,100 C.F.M.</span>
                </div>
                <div className="flex items-center justify-between text-xs py-1.5 border-b border-slate-100">
                  <span className="text-slate-500">Blades / Vanes MOC</span>
                  <span className="font-bold text-slate-900">42-44 SS430 JSW</span>
                </div>
                <div className="flex items-center justify-between text-xs py-1.5">
                  <span className="text-slate-500">Power Source</span>
                  <span className="font-bold text-sky-600">Air / Wind Driven (0 KW)</span>
                </div>
              </div>

              <button
                onClick={() => setShowModal(true)}
                className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 rounded-2xl text-xs shadow-md transition flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4" /> Request Quote For Turbo Ventilators
              </button>
            </div>

          </div>

        </div>

        {/* SECTION 2: 4 KEY PERFORMANCE ADVANTAGES */}
        <div className="mb-12">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-sky-700 font-bold text-xs uppercase tracking-wider bg-sky-50 px-3 py-1 rounded-full border border-sky-200">
              Zero Maintenance Ventilation
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
              Key Engineering Features
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">Eco-friendly ventilation designed for industrial factories, warehouses, and auditoriums</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {keyFeatures.map((feat, idx) => (
              <div key={idx} className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm hover:border-sky-500 transition">
                <CheckCircle2 className="w-6 h-6 text-emerald-600 mb-3" />
                <h3 className="font-extrabold text-slate-900 text-base mb-2">{feat.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 3: FULL TECHNICAL SPECIFICATIONS MATRIX */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm mb-12">
          <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
            <div>
              <span className="text-xs font-bold text-sky-700 uppercase tracking-wider bg-sky-50 px-3 py-1 rounded-full border border-sky-100">
                Technical Data Sheet
              </span>
              <h2 className="text-2xl font-extrabold text-slate-900 mt-2">
                RBS 610mm Turbo Ventilator Specifications
              </h2>
            </div>
            <div className="flex items-center gap-2 text-xs font-bold text-slate-600 bg-slate-100 px-3 py-2 rounded-xl">
              <ShieldCheck className="w-4 h-4 text-emerald-600" /> 1 Year Manufacturer Warranty
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {techSpecs.map((spec, idx) => (
              <div key={idx} className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex items-center justify-between">
                <span className="text-xs text-slate-500 font-semibold">{spec.label}</span>
                <span className="text-xs font-extrabold text-slate-900">{spec.val}</span>
              </div>
            ))}
          </div>
        </div>

        {/* HORIZONTAL ACTION BAR MATCHING USER REQUEST */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-sm mb-12 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span className="text-xs text-slate-500 block font-medium">Industrial Rooftop Turbo Ventilator (SS430)</span>
            <span className="text-lg font-black text-amber-600">
              ₹3,000.00 / nos. <span className="text-xs text-slate-500 font-normal">(610mm Throat | 2100 CFM Airflow)</span>
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
              href="https://wa.me/917498147921?text=Hi,%20I%20am%20interested%20in%20Turbo%20Ventilators%20(Rs.3000/nos)."
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
            <img src={activeImage} alt="Turbo Ventilator Preview" className="max-w-full max-h-[85vh] object-contain rounded-2xl bg-white p-4" />
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
              Industrial Turbo Ventilator (610mm Throat) Rate: ₹3,000.00 / nos.
            </p>

            {isSubmitted ? (
              <div className="py-8 text-center">
                <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-3 animate-bounce" />
                <h4 className="font-bold text-slate-900 text-lg">Inquiry Received!</h4>
                <p className="text-xs text-slate-600 mt-1">Our sales engineering team will contact you with poly profile base match details.</p>
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
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Required Quantity (Units / Nos)</label>
                  <input
                    type="text"
                    placeholder={`e.g. ${units} units`}
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-sky-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Additional Requirements</label>
                  <textarea
                    rows={3}
                    placeholder="Specify roof profile (e.g. Trapezoidal / Corrugated sheet match for base plate)"
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
