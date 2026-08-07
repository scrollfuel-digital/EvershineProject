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
  Calculator,
  Compass,
  CheckCircle,
  Clock,
  DollarSign,
  Wrench
} from 'lucide-react';

// Image imports
import frameErectionImg from '../../assets/peb_structure/peb_frame_erection.jpg';
import warehouseExtImg from '../../assets/peb_structure/peb_warehouse_exterior.jpg';
import columnElevImg from '../../assets/peb_structure/peb_column_elevation.jpg';
import loadingDocksImg from '../../assets/peb_structure/peb_loading_docks.jpg';
import factoryFrontImg from '../../assets/peb_structure/peb_factory_front.jpg';

export default function PEBStructurePage() {
  const images = [
    { src: frameErectionImg, label: 'Open Primary I-Beam Frame Erection' },
    { src: warehouseExtImg, label: 'Completed Industrial Warehouse' },
    { src: columnElevImg, label: 'Side Column & Rafter Framing' },
    { src: loadingDocksImg, label: 'Canopy Loading Docks' },
    { src: factoryFrontImg, label: 'Factory Front Elevation' }
  ];

  const [activeImage, setActiveImage] = useState(frameErectionImg);
  const [showModal, setShowModal] = useState(false);
  const [showLightbox, setShowLightbox] = useState(false);
  
  // Interactive Calculator State
  const [totalSqFt, setTotalSqFt] = useState('10000');
  const [buildingType, setBuildingType] = useState('Industrial Warehouse');

  // Form State
  const [formData, setFormData] = useState({ name: '', phone: '', quantity: '', requirements: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Wholesale Rate per kg
  const RATE_PER_KG = 86.00;

  // Approx weight ~3.2 kg per sq.ft of floor area for PEB steel
  const totalArea = (parseFloat(totalSqFt) || 10000);
  const estimatedWeightKg = Math.round(totalArea * 3.2);
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
          <span className="font-semibold text-slate-900">Pre-Engineered Building (PEB Structure)</span>
        </nav>

        {/* HERO BANNER - EXACT AIR BUBBLE INSULATION COLOR PALETTE */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#0B192C] via-[#102A43] to-[#0B192C] text-white p-6 sm:p-10 mb-10 shadow-2xl border border-[#1E3A5F]">
          <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#003846] text-[#00D2FF] rounded-full text-xs font-bold mb-4 border border-cyan-800/50 shadow-sm">
                <Building2 className="w-4 h-4 text-amber-400" /> Turnkey Prefabricated Steel Building Solution
              </div>
              <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-3">
                Pre-Engineered <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-sky-300 to-amber-300">Buildings (PEB)</span>
              </h1>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Custom-designed industrial steel structures engineered for maximum space utilization, rapid construction speed, and significant cost savings over conventional civil construction.
              </p>
            </div>

            {/* Price Badge Card matching screenshot */}
            <div className="bg-[#132A3E]/80 backdrop-blur-md border border-[#1E3E5A] rounded-3xl p-6 text-center lg:text-right shrink-0 shadow-2xl">
              <span className="text-xs uppercase tracking-wider text-[#00D2FF] font-bold block mb-1">STANDARD WHOLESALE PRICE</span>
              <div className="text-4xl font-black text-[#FFC107] my-1">
                ₹86.00 <span className="text-sm font-normal text-slate-200">/ kg</span>
              </div>
              <span className="text-xs text-slate-300 block">Ex-Factory | Turnkey Design & Fabrication</span>
            </div>
          </div>
        </div>

        {/* MAIN SECTION: PHOTO GALLERY & STREAMLINED ESTIMATOR */}
        <div className="grid lg:grid-cols-12 gap-8 mb-12">
          
          {/* LEFT 7 COLS: PHOTO GALLERY (5 PHOTOS) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-5 border border-slate-200 shadow-sm">
            <div 
              onClick={() => setShowLightbox(true)}
              className="relative w-full h-[360px] sm:h-[440px] bg-slate-900 rounded-2xl overflow-hidden mb-4 border border-slate-200 group cursor-pointer"
            >
              <img 
                src={activeImage} 
                alt="PEB Structure Erection"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <button 
                className="absolute top-3 right-3 bg-slate-900/80 hover:bg-[#004060] text-white p-2 rounded-xl backdrop-blur-md transition shadow-md"
                aria-label="Enlarge Image"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
              <span className="absolute bottom-3 left-3 bg-slate-900/85 text-[#B8D8E8] text-xs px-3 py-1.5 rounded-lg font-semibold shadow-md">
                Evershine Industrial Erection Project
              </span>
            </div>

            {/* 5 Thumbnails Bar */}
            <div className="grid grid-cols-5 gap-2">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(img.src)}
                  className={`
                    relative rounded-xl overflow-hidden aspect-square border-2 transition-all duration-200 bg-slate-900 p-0.5
                    ${activeImage === img.src 
                      ? 'border-[#004060] ring-2 ring-[#004060]/30 scale-[1.02] shadow-md' 
                      : 'border-slate-300 hover:border-slate-400 opacity-80 hover:opacity-100'
                    }
                  `}
                >
                  <img src={img.src} alt={img.label} className="w-full h-full object-cover rounded-lg" />
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT 5 COLS: PROJECT COST ESTIMATOR & INQUIRY */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6">
            
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
              <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Ruler className="w-5 h-5 text-sky-600" /> Select PEB Structure Specifications
              </h2>

              <div className="space-y-3 mb-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Building Application</label>
                  <select
                    value={buildingType}
                    onChange={(e) => setBuildingType(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-xs font-bold text-slate-900 focus:outline-none focus:border-sky-600"
                  >
                    <option value="Industrial Warehouse">Industrial Warehouse / Logistics</option>
                    <option value="Manufacturing Factory">Manufacturing Plant / Factory Shed</option>
                    <option value="Cold Storage Facility">Cold Storage Facility</option>
                    <option value="Aircraft Hangar">Aircraft Hangar / Clear Span Shed</option>
                  </select>
                </div>
              </div>

              {/* ESTIMATOR SUB-BOX MATCHING SCREENSHOT */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 mb-4">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                    <Calculator className="w-4 h-4 text-sky-600" /> Coverage Estimator (Sq.Ft)
                  </label>
                  <span className="text-[10px] bg-[#0B192C] text-white px-2 py-0.5 rounded font-bold">
                    ₹86 / kg
                  </span>
                </div>

                <div className="mb-3">
                  <label className="block text-[10px] font-semibold text-slate-600 mb-1">Total Carpet Area (Sq.Ft)</label>
                  <input
                    type="number"
                    min="1000"
                    max="500000"
                    value={totalSqFt}
                    onChange={(e) => setTotalSqFt(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-xl px-3 py-1.5 text-xs font-bold text-slate-900"
                  />
                </div>

                <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-200">
                  <div>
                    <span className="text-[10px] text-slate-500 block uppercase font-semibold">Total Steel Weight</span>
                    <span className="font-extrabold text-sky-700 text-sm">~{estimatedWeightKg.toLocaleString()} kg</span>
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
                <MessageSquare className="w-4 h-4" /> Request Quote For PEB Structure
              </button>
            </div>

          </div>

        </div>

        {/* STREAMLINED 3-TIER PRODUCT CATEGORIES (No cluttering cards!) */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-sm mb-12">
          <div className="mb-6 pb-4 border-b border-slate-200">
            <span className="text-xs uppercase font-extrabold tracking-wider text-[#004060] bg-sky-50 px-3 py-1 rounded-full border border-sky-100">
              System Architecture
            </span>
            <h2 className="text-2xl font-extrabold text-slate-900 mt-2">
              The 3 Core Structural Categories of PEB
            </h2>
            <p className="text-xs text-slate-500">Optimized structural components designed to deliver rapid assembly and superior load integrity.</p>
          </div>

          <div className="divide-y divide-slate-200">
            
            {/* ROW 1 */}
            <div className="py-5 grid md:grid-cols-12 gap-4 items-center">
              <div className="md:col-span-4">
                <span className="text-[10px] font-black text-white bg-[#004060] px-2.5 py-0.5 rounded-md uppercase">Category 01</span>
                <h3 className="text-lg font-bold text-slate-900 mt-1">Primary Structural Members</h3>
              </div>
              <div className="md:col-span-8 text-xs text-slate-600 leading-relaxed">
                Custom built-up <strong>"I" shape steel sections</strong> for primary framing columns and roof rafters. Welded with high-yield strength steel plates to bear main building loads.
              </div>
            </div>

            {/* ROW 2 */}
            <div className="py-5 grid md:grid-cols-12 gap-4 items-center">
              <div className="md:col-span-4">
                <span className="text-[10px] font-black text-white bg-[#004060] px-2.5 py-0.5 rounded-md uppercase">Category 02</span>
                <h3 className="text-lg font-bold text-slate-900 mt-1">Secondary Structural Members</h3>
              </div>
              <div className="md:col-span-8 text-xs text-slate-600 leading-relaxed">
                Cold-formed <strong>"Z" and "C" purlins</strong>, wall girts, and eave struts. Light-weight yet high tensile galvanized profiles providing intermediate support for roof and wall cladding.
              </div>
            </div>

            {/* ROW 3 */}
            <div className="py-5 grid md:grid-cols-12 gap-4 items-center">
              <div className="md:col-span-4">
                <span className="text-[10px] font-black text-white bg-[#004060] px-2.5 py-0.5 rounded-md uppercase">Category 03</span>
                <h3 className="text-lg font-bold text-slate-900 mt-1">Roof & Wall Cladding Profiles</h3>
              </div>
              <div className="md:col-span-8 text-xs text-slate-600 leading-relaxed">
                Precision roll-formed <strong>Pre-Painted Galvalume / Galvanized sheeting</strong> available in Bare Galvalume, PPGL, PUFF sandwich panels, and tile profiles for weatherproof enclosure.
              </div>
            </div>

          </div>
        </div>

        {/* SUB-SYSTEMS & ACCESSORIES 2-COLUMN SECTION (Clean List Layout) */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          
          {/* FUNCTIONAL SUB-SYSTEMS */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
            <h3 className="text-base font-extrabold text-slate-900 mb-3 flex items-center gap-2">
              <Wrench className="w-5 h-5 text-[#004060]" /> Functional Structural Sub-Systems
            </h3>
            <ul className="space-y-2.5 text-xs text-slate-700">
              <li className="flex items-center gap-2.5 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span><strong>Mezzanine Floors:</strong> Heavy joists & deck sheet slabs for multi-story office space inside warehouses.</span>
              </li>
              <li className="flex items-center gap-2.5 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span><strong>Crane Runway Beams:</strong> Heavy duty bracket beams to support 5T - 50T overhead crane systems.</span>
              </li>
              <li className="flex items-center gap-2.5 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span><strong>Roof Platforms & Catwalks:</strong> Safe maintenance walkways and solar panel inspection bridges.</span>
              </li>
            </ul>
          </div>

          {/* AESTHETIC FEATURES & ACCESSORIES */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
            <h3 className="text-base font-extrabold text-slate-900 mb-3 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#004060]" /> Architectural Accessories & Trims
            </h3>
            <ul className="space-y-2.5 text-xs text-slate-700">
              <li className="flex items-center gap-2.5 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span><strong>Fascias, Parapets & Canopies:</strong> Modern entrance overhangs & loading dock roof extensions.</span>
              </li>
              <li className="flex items-center gap-2.5 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span><strong>Eave Gutters & Downspouts:</strong> Complete rainwater management rainwater discharge channels.</span>
              </li>
              <li className="flex items-center gap-2.5 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span><strong>Ridge Ventilation & Cable Bracing:</strong> Continuous natural airflow and wind bracing stability.</span>
              </li>
            </ul>
          </div>

        </div>

        {/* HORIZONTAL ACTION BAR MATCHING USER REQUEST */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-sm mb-12 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span className="text-xs text-slate-500 block font-medium">Pre-Engineered Building (PEB Structure)</span>
            <span className="text-lg font-black text-amber-600">
              ₹86.00 / kg <span className="text-xs text-slate-500 font-normal">(Ex-Factory Turnkey Solution)</span>
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
              href="https://wa.me/917498147921?text=Hi,%20I%20am%20interested%20in%20PEB%20Structures%20(Rs.86/kg)."
              target="_blank"
              rel="noreferrer"
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl font-bold text-xs transition shadow-sm flex items-center gap-2 shrink-0"
            >
              WhatsApp
            </a>
            <button
              onClick={() => setShowModal(true)}
              className="bg-[#004060] hover:bg-[#003048] text-white px-5 py-2.5 rounded-xl font-extrabold text-xs transition shadow-sm flex items-center gap-2 shrink-0"
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
            <img src={activeImage} alt="PEB Erection Preview" className="max-w-full max-h-[85vh] object-contain rounded-2xl bg-white p-4" />
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
            <p className="text-xs text-[#004060] font-semibold mb-6">
              PEB Structure — {buildingType} ({totalSqFt} sq.ft) Rate: ₹86.00 / kg
            </p>

            {isSubmitted ? (
              <div className="py-8 text-center">
                <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-3 animate-bounce" />
                <h4 className="font-bold text-slate-900 text-lg">Inquiry Received!</h4>
                <p className="text-xs text-slate-600 mt-1">Our PEB structural engineer will contact you with 3D GA drawings.</p>
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
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Required Building Footprint (sq. ft)</label>
                  <input
                    type="text"
                    placeholder={`e.g. ${totalSqFt} sq.ft`}
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-[#004060]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Additional Requirements</label>
                  <textarea
                    rows={3}
                    placeholder="Specify crane capacity, mezzanine requirement, or clear height"
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
