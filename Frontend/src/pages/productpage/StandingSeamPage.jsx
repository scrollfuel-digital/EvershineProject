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
  Sun,
  Droplet,
  ShieldAlert,
  Calculator,
  Compass,
  Ruler,
  Lock
} from 'lucide-react';

// Image imports
import blueCadImg from '../../assets/standing_seam/standing_seam_blue_cad.jpg';
import diagram400mmImg from '../../assets/standing_seam/standing_seam_diagram_400mm.jpg';
import charcoalPanelImg from '../../assets/standing_seam/standing_seam_charcoal_panel.jpg';

export default function StandingSeamPage() {
  const images = [
    { src: diagram400mmImg, label: '400mm Width x 65mm Seam Technical Diagram' },
    { src: blueCadImg, label: 'Interlocking Vertical Seam 3D Geometry' },
    { src: charcoalPanelImg, label: 'Charcoal Metallic Standing Seam Panel' }
  ];

  const [activeImage, setActiveImage] = useState(diagram400mmImg);
  const [showModal, setShowModal] = useState(false);
  const [showLightbox, setShowLightbox] = useState(false);
  
  // Interactive Controls
  const [panelWidth, setPanelWidth] = useState('400 mm (16 inch)');
  const [seamHeight, setSeamHeight] = useState('65 mm (2.5 inch)');
  const [materialType, setMaterialType] = useState('Galvalume Steel');

  // Calculator State
  const [lengthRmt, setLengthRmt] = useState('5.0');
  const [quantityPieces, setQuantityPieces] = useState('20');

  // Form State
  const [formData, setFormData] = useState({ name: '', phone: '', quantity: '', requirements: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Wholesale Rate per RMT
  const RATE_PER_RMT = 700.00;

  const lenInMtrs = (parseFloat(lengthRmt) || 5.0);
  const pcs = (parseInt(quantityPieces) || 1);
  const totalRmt = (lenInMtrs * pcs).toFixed(1);
  const estCostRs = Math.round(totalRmt * RATE_PER_RMT);

  const keyAdvantages = [
    {
      title: 'Zero Exposed Fasteners',
      desc: 'Concealed clip fastening system eliminates screw penetrations on the roof surface, preventing leak points.'
    },
    {
      title: 'Elevated Seam Water Drainage',
      desc: 'Seam height between 1"-3" (25-76mm) prevents water ingress even on low-sloped commercial roofs.'
    },
    {
      title: 'Interlocking Weather-Tight Seal',
      desc: 'Precision double-lock or snap-lock seams engineered to withstand extreme wind uplift and heavy rains.'
    },
    {
      title: 'High Solar Reflectance & Efficiency',
      desc: 'Reflects harsh solar heat, significantly aiding indoor insulation and reducing AC energy costs.'
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
          <a href="/" className="hover:text-teal-600 transition">Home</a>
          <ChevronRight className="w-4 h-4 text-slate-400" />
          <a href="/allproduct/mildsteel/deck-sheet" className="hover:text-teal-600 transition">All Products</a>
          <ChevronRight className="w-4 h-4 text-slate-400" />
          <span className="font-semibold text-slate-900">Standing Seam Metal Roofing</span>
        </nav>

        {/* HERO BANNER - CLEAN MINIMALIST STEEL PALETTE */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white p-6 sm:p-10 mb-10 shadow-2xl border border-slate-800">
          <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-sky-500/10 text-sky-400 rounded-full text-xs font-bold mb-4 border border-sky-500/20 shadow-sm">
                <Lock className="w-4 h-4 text-amber-400" /> Concealed Fastener System | Leak-Proof Interlocking Seams
              </div>
              <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-3">
                Standing Seam <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-sky-300 to-amber-300">Metal Roofing</span>
              </h1>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Characterized by prominent vertical seams rising above the flat panel surface. Interlocking design eliminates exposed fasteners for 100% weather-tight leak-proof integrity.
              </p>
            </div>

            {/* Price Badge Card */}
            <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-3xl p-6 text-center lg:text-right shrink-0 shadow-2xl">
              <span className="text-xs uppercase tracking-wider text-sky-300 font-bold block mb-1">Wholesale Rate</span>
              <div className="text-4xl font-black text-amber-400 my-1">
                ₹700.00 <span className="text-sm font-normal text-slate-200">/ rmt</span>
              </div>
              <span className="text-xs text-slate-300 block">Ex-Factory | Cut-to-Length Orders</span>
            </div>
          </div>
        </div>

        {/* SECTION 1: PHOTO GALLERY + INTERACTIVE RMT CALCULATOR */}
        <div className="grid lg:grid-cols-12 gap-8 mb-12">
          
          {/* LEFT 7 COLS: PHOTO GALLERY */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-5 border border-slate-200 shadow-sm">
            <div 
              onClick={() => setShowLightbox(true)}
              className="relative w-full h-[360px] sm:h-[440px] bg-slate-100 rounded-2xl overflow-hidden mb-4 border border-slate-200 group cursor-pointer"
            >
              <img 
                src={activeImage} 
                alt="Standing Seam Roofing Panel"
                className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-500"
              />
              <button 
                className="absolute top-3 right-3 bg-slate-900/80 hover:bg-sky-600 text-white p-2 rounded-xl backdrop-blur-md transition shadow-md"
                aria-label="Enlarge Image"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
              <span className="absolute bottom-3 left-3 bg-slate-900/85 text-sky-300 text-xs px-3 py-1.5 rounded-lg font-semibold shadow-md">
                Interlocking Vertical Seam
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

          {/* RIGHT 5 COLS: INTERACTIVE CONFIGURATOR & RMT ESTIMATOR */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6">
            
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
              <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Ruler className="w-5 h-5 text-sky-600" /> Standing Seam Dimensions & Options
              </h2>

              {/* PANEL COVER WIDTH */}
              <label className="block text-xs font-bold text-slate-700 mb-2">Panel Width (12" to 20")</label>
              <div className="grid grid-cols-3 gap-1.5 mb-4">
                {['305 mm (12")', '400 mm (16")', '510 mm (20")'].map((w) => (
                  <button
                    key={w}
                    onClick={() => setPanelWidth(w)}
                    className={`
                      py-2 px-1 rounded-xl text-[11px] font-bold border text-center transition-all
                      ${panelWidth === w
                        ? 'bg-[#0B192C] border-[#0B192C] text-white shadow-sm'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300'
                      }
                    `}
                  >
                    {w}
                  </button>
                ))}
              </div>

              {/* SEAM HEIGHT SELECTOR */}
              <label className="block text-xs font-bold text-slate-700 mb-2">Seam Height (1" to 3")</label>
              <div className="grid grid-cols-3 gap-1.5 mb-5">
                {['25 mm (1.0")', '50 mm (2.0")', '65 mm (2.5")'].map((sh) => (
                  <button
                    key={sh}
                    onClick={() => setSeamHeight(sh)}
                    className={`
                      py-2 px-1 rounded-xl text-[11px] font-bold border text-center transition-all
                      ${seamHeight === sh
                        ? 'bg-[#0B192C] border-[#0B192C] text-white shadow-sm'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300'
                      }
                    `}
                  >
                    {sh}
                  </button>
                ))}
              </div>

              {/* LIVE RMT CALCULATOR SUB-BOX */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 mb-4">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                    <Calculator className="w-4 h-4 text-sky-600" /> Coverage Estimator
                  </label>
                  <span className="text-[10px] bg-[#0B192C] text-white px-2 py-0.5 rounded font-bold">
                    ₹700 / rmt
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div>
                    <label className="block text-[10px] font-semibold text-slate-600 mb-1">Length per sheet (Mtrs)</label>
                    <input
                      type="number"
                      step="0.1"
                      min="1"
                      value={lengthRmt}
                      onChange={(e) => setLengthRmt(e.target.value)}
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
                    <span className="text-[10px] text-slate-500 block uppercase font-semibold">Total Running Meters</span>
                    <span className="font-extrabold text-sky-700 text-sm">{totalRunningMeters} rmt</span>
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
                className="w-full bg-[#0B192C] hover:bg-[#102A43] text-white font-bold py-3 rounded-2xl text-xs shadow-md transition flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4" /> Request Quote For Standing Seam Roofs
              </button>
            </div>

          </div>

        </div>

        {/* SECTION 2: 4 KEY ADVANTAGES GRID */}
        <div className="mb-12">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-sky-700 font-bold text-xs uppercase tracking-wider bg-sky-50 px-3 py-1 rounded-full border border-sky-200">
              Structural Excellence
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
              Why Choose Standing Seam Roofing?
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">The ultimate union of form, longevity, and leak-proof engineering</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {keyAdvantages.map((adv, idx) => (
              <div key={idx} className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm hover:border-sky-500 transition">
                <CheckCircle2 className="w-6 h-6 text-emerald-600 mb-3" />
                <h3 className="font-extrabold text-slate-900 text-base mb-2">{adv.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{adv.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* HORIZONTAL ACTION BAR MATCHING USER REQUEST */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-sm mb-12 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span className="text-xs text-slate-500 block font-medium">Standing Seam Metal Roofing</span>
            <span className="text-lg font-black text-amber-600">
              ₹700.00 / rmt <span className="text-xs text-slate-500 font-normal">(Concealed Fastener Interlocking Seam)</span>
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
              href="https://wa.me/917498147921?text=Hi,%20I%20am%20interested%20in%20Standing%20Seam%20Roofing%20(Rs.700/rmt)."
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
            <img src={activeImage} alt="Standing Seam Preview" className="max-w-full max-h-[85vh] object-contain rounded-2xl bg-white p-4" />
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
              Standing Seam Roofing — {panelWidth} ({seamHeight}) Rate: ₹700.00 / rmt
            </p>

            {isSubmitted ? (
              <div className="py-8 text-center">
                <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-3 animate-bounce" />
                <h4 className="font-bold text-slate-900 text-lg">Inquiry Received!</h4>
                <p className="text-xs text-slate-600 mt-1">Our technical roofing specialist will contact you with roll-forming site details.</p>
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
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Required Length (rmt / meters)</label>
                  <input
                    type="text"
                    placeholder={`e.g. ${totalRmt} rmt`}
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-sky-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Additional Requirements</label>
                  <textarea
                    rows={3}
                    placeholder="Specify metal material (Galvalume steel / Aluminium) or site roll-forming"
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
