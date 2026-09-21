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
import cadImg from '../../../assets/gi_angles/gi_angle_cad.png';
import stackedImg from '../../../assets/gi_angles/gi_angle_stacked.jpg';
import bundleImg from '../../../assets/gi_angles/gi_angle_bundle.jpg';

export default function GIAnglePage() {
  const images = [
    { src: cadImg, label: 'L-Profile Structural CAD Geometry' },
    { src: stackedImg, label: '3-Tier Galvanized Angle Stack' },
    { src: bundleImg, label: 'Factory Bundle Stock' }
  ];

  const [activeImage, setActiveImage] = useState(cadImg);
  const [showModal, setShowModal] = useState(false);
  const [showLightbox, setShowLightbox] = useState(false);
  
  // Interactive Size Selection
  const [selectedSize, setSelectedSize] = useState('50x50x5mm');
  const [customSizeOption, setCustomSizeOption] = useState('Standard Equal Leg');

  // Calculator State
  const [lengthMeters, setLengthMeters] = useState('6');
  const [quantityPieces, setQuantityPieces] = useState('20');

  // Form State
  const [formData, setFormData] = useState({ name: '', phone: '', quantity: '', requirements: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Rate per kg
  const RATE_PER_KG = 65.00;

  // Approx weight per 6 meter length
  const sizeMultipliers = {
    '25x25x1.5mm': 0.58,  // kg per meter
    '40x40x3mm': 1.82,    // kg per meter
    '50x50x5mm': 3.75,    // kg per meter
    '120x80x1.8mm': 2.85  // kg per meter
  };

  const currentWeightPerMeter = sizeMultipliers[selectedSize] || 3.75;
  const totalLengthMtrs = (parseFloat(lengthMeters) || 6);
  const totalPieces = (parseInt(quantityPieces) || 1);
  const estimatedWeightKg = Math.round(totalLengthMtrs * totalPieces * currentWeightPerMeter);
  const estimatedCostRs = Math.round(estimatedWeightKg * RATE_PER_KG);

  const commonSizesData = [
    {
      size: '25 x 25 x 1.5 mm',
      code: '25x25x1.5mm',
      use: 'Small-scale construction & DIY projects',
      weight: '~0.58 kg/m'
    },
    {
      size: '40 x 40 x 3.0 mm',
      code: '40x40x3mm',
      use: 'Popular in medium structural framing',
      weight: '~1.82 kg/m'
    },
    {
      size: '50 x 50 x 5.0 mm',
      code: '50x50x5mm',
      use: 'Frequently used in heavy-duty construction',
      weight: '~3.75 kg/m'
    },
    {
      size: '120 x 80 x 1.8 mm',
      code: '120x80x1.8mm',
      use: 'Ideal for large industrial PEB structures',
      weight: '~2.85 kg/m'
    }
  ];

  const featuresList = [
    {
      title: 'Corrosion Resistance',
      desc: 'Hot-dip molten zinc immersion layer shields underlying steel against severe rust & chemical weathering.'
    },
    {
      title: 'Extended Durability',
      desc: 'Significantly longer service life with minimal maintenance compared to raw un-galvanized angles.'
    },
    {
      title: 'High Tensile Strength',
      desc: 'L-shape structural design offers high load-bearing integrity and torsional stability.'
    },
    {
      title: 'Versatile Applications',
      desc: 'Ideal for solar plant purlins, PEB roof trusses, tower frames, and heavy machinery mounts.'
    },
    {
      title: 'Cost-Effective ROI',
      desc: 'Long term economical choice reducing lifetime repair, painting, and structural replacement costs.'
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
          <span className="font-semibold text-slate-900">Galvanized Iron Angle (GI Angle)</span>
        </nav>

        {/* HERO BANNER - MATCHING EXACT USER REFERENCE LAYOUT */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white p-6 sm:p-10 mb-10 shadow-2xl border border-slate-800">
          <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="max-w-2xl">
              <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-3">
                Galvanized Iron <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-sky-300 to-amber-300">Angles (GI)</span>
              </h1>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                L-shaped structural steel sections immersed in molten zinc to form a permanent corrosion-barrier coating for PEB structures, solar power frames, and industrial fabrications.
              </p>
            </div>

            {/* Price Badge Card matching user screenshot box */}
            <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-3xl p-6 text-center lg:text-right shrink-0 shadow-2xl">
              <span className="text-xs uppercase tracking-wider text-sky-300 font-bold block mb-1">STANDARD WHOLESALE PRICE</span>
              <span className="text-xs text-slate-300 block">Ex-Factory | GST & Transport extra</span>
            </div>
          </div>
        </div>

        {/* SECTION 1: PHOTO GALLERY + INTERACTIVE SIZE CALCULATOR */}
        <div className="grid lg:grid-cols-12 gap-8 mb-12">
          
          {/* LEFT 7 COLS: PHOTO GALLERY */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-5 border border-slate-200 shadow-sm">
            <div 
              onClick={() => setShowLightbox(true)}
              className="relative w-full h-[360px] sm:h-[440px] bg-slate-900 rounded-2xl overflow-hidden mb-4 border border-slate-200 group cursor-pointer"
            >
              <img 
                src={activeImage} 
                alt="Galvanized Iron Angle L-Section"
                className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500"
              />
              <button 
                className="absolute top-3 right-3 bg-slate-900/80 hover:bg-sky-600 text-white p-2 rounded-xl backdrop-blur-md transition shadow-md"
                aria-label="Enlarge Image"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
              <span className="absolute bottom-3 left-3 bg-slate-900/80 text-sky-300 text-xs px-3 py-1.5 rounded-lg font-semibold shadow-md">
                Precision Hot-Dip Galvanized
              </span>
            </div>

            {/* Thumbnails */}
            <div className="grid grid-cols-3 gap-3">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(img.src)}
                  className={`
                    relative rounded-2xl overflow-hidden aspect-square border-2 transition-all duration-200 bg-slate-900 p-2
                    ${activeImage === img.src 
                      ? 'border-sky-500 ring-2 ring-sky-500/20 scale-[1.02] shadow-md' 
                      : 'border-slate-800 hover:border-slate-600 opacity-80 hover:opacity-100'
                    }
                  `}
                >
                  <img src={img.src} alt={img.label} className="w-full h-full object-contain" />
                  <span className="absolute inset-x-0 bottom-0 bg-slate-950/85 text-[10px] text-white py-1 text-center font-medium truncate px-1">
                    {img.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT 5 COLS: INTERACTIVE SIZE & CALCULATOR */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6">
            
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
              <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Ruler className="w-5 h-5 text-sky-600" /> Select Angle Dimensions
              </h2>

              {/* COMMON SIZES RADIO / BUTTON GRID */}
              <label className="block text-xs font-bold text-slate-700 mb-2">Standard GI Angle Sizes</label>
              <div className="grid grid-cols-2 gap-2 mb-4">
                {commonSizesData.map((item) => (
                  <button
                    key={item.code}
                    onClick={() => setSelectedSize(item.code)}
                    className={`
                      p-2.5 rounded-xl text-xs font-bold border text-left transition-all
                      ${selectedSize === item.code 
                        ? 'bg-[#0B192C] border-[#0B192C] text-white shadow-sm' 
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300'
                      }
                    `}
                  >
                    <span className="block font-black text-xs text-amber-400 mb-0.5">{item.size}</span>
                    <span className="text-[9px] opacity-80 block truncate">{item.use}</span>
                  </button>
                ))}
              </div>

              {/* CUSTOM SIZES SPECIFIER */}
              <label className="block text-xs font-bold text-slate-700 mb-2">Customized Angle Options</label>
              <div className="grid grid-cols-3 gap-1.5 mb-5">
                {['Unequal Leg', 'Extra-Large', 'Micro Angle'].map((opt) => (
                  <button
                    key={opt}
                    onClick={() => setCustomSizeOption(opt)}
                    className={`
                      py-2 px-1 rounded-xl text-[11px] font-bold border text-center transition-all
                      ${customSizeOption === opt
                        ? 'bg-sky-700 border-sky-700 text-white shadow-sm'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300'
                      }
                    `}
                  >
                    {opt}
                  </button>
                ))}
              </div>

              {/* LIVE WEIGHT & COST ESTIMATOR SUB-BOX */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 mb-4">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                    <Calculator className="w-4 h-4 text-sky-600" /> Coverage Estimator
                  </label>
                  <span className="text-[10px] bg-slate-900 text-white px-2 py-0.5 rounded font-bold">
                    ₹65 / kg
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div>
                    <label className="block text-[10px] font-semibold text-slate-600 mb-1">Length per piece (Mtr)</label>
                    <input
                      type="number"
                      min="1"
                      value={lengthMeters}
                      onChange={(e) => setLengthMeters(e.target.value)}
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
                className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 rounded-2xl text-xs shadow-md transition flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4" /> Request Quote For GI Angles
              </button>
            </div>

          </div>

        </div>

        {/* SECTION 2: COMMON SIZES & APPLICATIONS SHOWCASE */}
        <div className="mb-12">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-sky-700 font-bold text-xs uppercase tracking-wider bg-sky-50 px-3 py-1 rounded-full border border-sky-200">
              Standard Sizes & Custom Fabrication
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
              GI Angle Size Spectrum & Uses
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">From light DIY fabrications to heavy industrial PEB structures</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {commonSizesData.map((item, idx) => (
              <div key={idx} className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm hover:border-sky-500 transition group">
                <span className="text-[10px] font-black uppercase text-sky-600 bg-sky-50 px-2.5 py-1 rounded-full border border-sky-100 inline-block mb-3">
                  Option 0{idx + 1}
                </span>
                <h3 className="font-extrabold text-slate-900 text-xl mb-1">{item.size}</h3>
                <span className="text-xs text-amber-600 font-bold block mb-3">{item.weight}</span>
                <p className="text-xs text-slate-600 leading-relaxed">{item.use}</p>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 3: KEY FEATURES GRID (5 CARDS) */}
        <div className="mb-12">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Key Advantages of GI Angles
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">Why hot-dip galvanizing gives your structure maximum longevity</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuresList.map((feat, idx) => (
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
            <img src={activeImage} alt="GI Angle Preview" className="max-w-full max-h-[85vh] object-contain rounded-2xl bg-white p-4" />
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
              GI Angle — {selectedSize} ({customSizeOption}) Rate: ₹65.00 / kg
            </p>

            {isSubmitted ? (
              <div className="py-8 text-center">
                <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-3 animate-bounce" />
                <h4 className="font-bold text-slate-900 text-lg">Inquiry Received!</h4>
                <p className="text-xs text-slate-600 mt-1">Our sales team will contact you with bulk bundle discounts.</p>
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
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Required Quantity (kg / pieces)</label>
                  <input
                    type="text"
                    placeholder={`e.g. ${estimatedWeightKg} kg`}
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-sky-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Additional Requirements</label>
                  <textarea
                    rows={3}
                    placeholder="Specify unequal leg dimensions (e.g. 50x25x3mm) or cut length"
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
