import React, { useState } from 'react';
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
import boardStackImg from '../../../assets/xlpe_foam/xlpe_foam_board_stack.jpg';
import foamRollImg from '../../../assets/xlpe_foam/xlpe_foam_roll.jpg';
import flatSheetImg from '../../../assets/xlpe_foam/xlpe_foam_flat_sheet.jpg';

export default function XLPEPage() {
  const images = [
    { src: boardStackImg, label: 'Cross-Linked Polyethylene Foam Board Stack' },
    { src: foamRollImg, label: 'Industrial XLPE Thermal Insulation Roll' },
    { src: flatSheetImg, label: 'High Density 30Kg/M³ XLPE Flat Sheet' }
  ];

  const [activeImage, setActiveImage] = useState(boardStackImg);
  const [showModal, setShowModal] = useState(false);
  const [showLightbox, setShowLightbox] = useState(false);
  
  // Interactive Controls
  const [foamThickness, setFoamThickness] = useState('10 MM');
  const [facingOption, setFacingOption] = useState('9 Micron Aluminium Foil');

  // Calculator State
  const [areaSqm, setAreaSqm] = useState('200');

  // Form State
  const [formData, setFormData] = useState({ name: '', phone: '', quantity: '', requirements: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Wholesale Rate per SQM
  const RATE_PER_SQM = 130.00;

  const sqm = (parseFloat(areaSqm) || 200);
  const estCostRs = Math.round(sqm * RATE_PER_SQM);

  const technicalSpecsMatrix = [
    { prop: 'Density', val: '30 Kg/M³ ± 3', std: 'Factory Standard' },
    { prop: 'Thickness Range', val: '8 MM – 20 MM', std: 'Customizable' },
    { prop: 'Thermal Conductivity', val: '0.035 W/m°K (at 23°C)', std: 'IS:3346 / 1980' },
    { prop: 'Operating Temperature', val: '-40°C to 115°C', std: 'Continuous Thermal Range' },
    { prop: 'Water Absorption by Volume', val: '0.21%', std: 'Closed-Cell Structure' },
    { prop: 'Water Vapour Transmission', val: '0.033', std: 'Moisture Barrier' },
    { prop: 'Fire Characteristics', val: 'Class 1 & Class 0', std: 'BS476 Part 6 & 7' },
    { prop: 'Compression Strength (@10% / @25%)', val: '20.8 kPa / 41.8 kPa', std: 'ASTM D3575' },
    { prop: 'Dimensional Stability (100°C 24h)', val: '1.94% Change', std: 'BS 4370 Part 1' },
    { prop: 'Biological & Chemical Resistance', val: 'Fungi (ASTM G21) & Chemical (ASTM C543)', std: 'Anti-Microbial & UV Resistant' },
    { prop: 'Aluminium Foil Facing', val: '9 Micron Pure Aluminium Foil', std: 'Heat Reflective Barrier' },
    { prop: 'Hazardous Substance Compliance', val: 'RoHS I & II Certified Pass', std: 'Eco & Health Safe' }
  ];

  const keyFeatures = [
    {
      title: 'Closed-Cell Microstructure',
      desc: 'Extremely low thermal conductivity (0.035 W/m°K) and 0.21% water absorption prevent condensation and heat gain.'
    },
    {
      title: 'Class 0 Fire Retardant Rating',
      desc: 'Tested to BS476 Part 6 & 7 for fire propagation and surface flame spread, ensuring maximum building safety.'
    },
    {
      title: 'Anti-Microbial & UV Protected',
      desc: 'Resistant to fungal growth (ASTM G21) and harsh industrial chemicals (ASTM C543) without degrading over time.'
    },
    {
      title: '9 Micron Reflective Foil Facing',
      desc: 'Optionally reinforced with 9-micron high-reflectivity aluminium foil to block radiative heat transfer.'
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
          <span className="font-semibold text-slate-900">XLPE Foam Thermal Insulation</span>
        </nav>

        {/* HERO BANNER - CLEAN MINIMALIST STEEL PALETTE */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white p-6 sm:p-10 mb-10 shadow-2xl border border-slate-800">
          <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="max-w-2xl">
              <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-3">
                XLPE Foam <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-sky-300 to-amber-300">Insulation</span>
              </h1>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Chemically cross-linked polyethylene closed-cell foam insulation (30Kg/M³ density). Engineered for roof insulation, HVAC ducting, under-deck thermal protection, and acoustic damping.
              </p>
            </div>

            {/* Price Badge Card */}
            <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-3xl p-6 text-center lg:text-right shrink-0 shadow-2xl">
              <span className="text-xs uppercase tracking-wider text-sky-300 font-bold block mb-1">STANDARD WHOLESALE PRICE</span>
              <span className="text-xs text-slate-300 block">Ex-Factory | All Standard Rolls & Sheets</span>
            </div>
          </div>
        </div>

        {/* SECTION 1: PHOTO GALLERY + INTERACTIVE SQM CALCULATOR */}
        <div className="grid lg:grid-cols-12 gap-8 mb-12">
          
          {/* LEFT 7 COLS: PHOTO GALLERY */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-5 border border-slate-200 shadow-sm">
            <div 
              onClick={() => setShowLightbox(true)}
              className="relative w-full h-[360px] sm:h-[440px] bg-slate-100 rounded-2xl overflow-hidden mb-4 border border-slate-200 group cursor-pointer"
            >
              <img 
                src={activeImage} 
                alt="XLPE Foam Insulation"
                className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-500"
              />
              <button 
                className="absolute top-3 right-3 bg-slate-900/80 hover:bg-sky-600 text-white p-2 rounded-xl backdrop-blur-md transition shadow-md"
                aria-label="Enlarge Image"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
              <span className="absolute bottom-3 left-3 bg-slate-900/85 text-sky-300 text-xs px-3 py-1.5 rounded-lg font-semibold shadow-md">
                30Kg/M³ High Density XLPE
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

          {/* RIGHT 5 COLS: INTERACTIVE CONFIGURATOR & SQM ESTIMATOR */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6">
            
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
              <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Ruler className="w-5 h-5 text-sky-600" /> Select Foam Specifications
              </h2>

              {/* THICKNESS SELECTOR */}
              <label className="block text-xs font-bold text-slate-700 mb-2">Foam Thickness (8mm - 20mm)</label>
              <div className="grid grid-cols-5 gap-1.5 mb-4">
                {['8 MM', '10 MM', '12 MM', '15 MM', '20 MM'].map((t) => (
                  <button
                    key={t}
                    onClick={() => setFoamThickness(t)}
                    className={`
                      py-2 px-1 rounded-xl text-xs font-bold border text-center transition-all
                      ${foamThickness === t
                        ? 'bg-slate-900 border-slate-900 text-white shadow-sm'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300'
                      }
                    `}
                  >
                    {t}
                  </button>
                ))}
              </div>

              {/* FOIL FACING OPTION */}
              <label className="block text-xs font-bold text-slate-700 mb-2">Reflective Foil Facing</label>
              <div className="grid grid-cols-2 gap-2 mb-5">
                {['9 Micron Aluminium Foil', 'Plain XLPE Foam'].map((f) => (
                  <button
                    key={f}
                    onClick={() => setFacingOption(f)}
                    className={`
                      py-2 px-2 rounded-xl text-[11px] font-bold border text-center transition-all
                      ${facingOption === f
                        ? 'bg-sky-700 border-sky-700 text-white shadow-sm'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300'
                      }
                    `}
                  >
                    {f}
                  </button>
                ))}
              </div>

              {/* LIVE AREA SQM ESTIMATOR SUB-BOX */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 mb-4">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                    <Calculator className="w-4 h-4 text-sky-600" /> Coverage Estimator (Sq.m)
                  </label>
                  <span className="text-[10px] bg-slate-900 text-white px-2 py-0.5 rounded font-bold">
                    ₹130 / sqm
                  </span>
                </div>

                <div className="mb-3">
                  <label className="block text-[10px] font-semibold text-slate-600 mb-1">Total Insulation Area (Square Meters)</label>
                  <input
                    type="number"
                    min="10"
                    value={areaSqm}
                    onChange={(e) => setAreaSqm(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-xl px-3 py-1.5 text-xs font-bold text-slate-900"
                  />
                </div>

                <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-200">
                  <div>
                    <span className="text-[10px] text-slate-500 block uppercase font-semibold">Total Area</span>
                    <span className="font-extrabold text-sky-700 text-sm">{sqm.toLocaleString()} Sq.m</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-500 block uppercase font-semibold">Wholesale Price</span>
                    <span className="font-black text-amber-600 text-lg">₹{estCostRs.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* MAIN CTA BUTTON */}
              <button
                onClick={() => setShowModal(true)}
                className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 rounded-2xl text-xs shadow-md transition flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4" /> Request Quote For XLPE Foam Insulation
              </button>
            </div>

          </div>

        </div>

        {/* SECTION 2: FULL TECHNICAL SPECIFICATIONS MATRIX TABLE */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm mb-12">
          <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
            <div>
              <span className="text-xs font-bold text-sky-700 uppercase tracking-wider bg-sky-50 px-3 py-1 rounded-full border border-sky-100">
                Technical Data Sheet
              </span>
              <h2 className="text-2xl font-extrabold text-slate-900 mt-2">
                XLPE Foam Technical Specification Matrix
              </h2>
            </div>
            <div className="flex items-center gap-2 text-xs font-bold text-slate-600 bg-slate-100 px-3 py-2 rounded-xl">
              <ShieldCheck className="w-4 h-4 text-emerald-600" /> BS476 Class 0 Fire & RoHS Certified
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-slate-900 text-white font-bold">
                  <th className="p-3.5 rounded-l-xl">Insulation Property</th>
                  <th className="p-3.5">Technical Value</th>
                  <th className="p-3.5 rounded-r-xl">Test Standard</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {technicalSpecsMatrix.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 transition">
                    <td className="p-3.5 font-bold text-slate-900">{item.prop}</td>
                    <td className="p-3.5 font-extrabold text-sky-700">{item.val}</td>
                    <td className="p-3.5 text-slate-500 font-medium">{item.std}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* SECTION 3: 4 KEY INSULATION ADVANTAGES */}
        <div className="mb-12">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-sky-700 font-bold text-xs uppercase tracking-wider bg-sky-50 px-3 py-1 rounded-full border border-sky-200">
              Thermal Protection
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
              Why Choose XLPE Foam Insulation?
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">Advanced cross-linked structure for roof, HVAC ducting, and industrial thermal barrier</p>
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

      </div>

      {/* LIGHTBOX PREVIEW */}
      {showLightbox && (
        <div 
          onClick={() => setShowLightbox(false)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm cursor-pointer"
        >
          <div className="relative max-w-4xl w-full max-h-[90vh] flex flex-col items-center">
            <img src={activeImage} alt="XLPE Foam Preview" className="max-w-full max-h-[85vh] object-contain rounded-2xl bg-white p-4" />
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
              XLPE Foam — {foamThickness} ({facingOption}) Rate: ₹130.00 / sqm
            </p>

            {isSubmitted ? (
              <div className="py-8 text-center">
                <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-3 animate-bounce" />
                <h4 className="font-bold text-slate-900 text-lg">Inquiry Received!</h4>
                <p className="text-xs text-slate-600 mt-1">Our thermal insulation specialist will contact you with roll dimensions and delivery dispatch.</p>
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
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Required Area (SQM / Square Meters)</label>
                  <input
                    type="text"
                    placeholder={`e.g. ${sqm} SQM`}
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-sky-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Additional Requirements</label>
                  <textarea
                    rows={3}
                    placeholder="Specify application (Under-deck roof insulation, HVAC ducting, or acoustic barrier)"
                    value={formData.requirements}
                    onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-slate-900"
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
