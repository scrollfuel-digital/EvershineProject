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
  Award,
  Flame,
  ShieldAlert,
  Calculator,
  Compass,
  Ruler,
  Paintbrush
} from 'lucide-react';

// Image imports
import factoryStackImg from '../../assets/aluminium_profile/alum_factory_stack.jpg';
import corrugatedStackImg from '../../assets/aluminium_profile/alum_corrugated_stack.jpg';
import trapezoidalStackImg from '../../assets/aluminium_profile/alum_trapezoidal_stack.jpg';

export default function AluminiumProfileSheetPage() {
  const images = [
    { src: factoryStackImg, label: 'Aluminium Profile Factory Stack' },
    { src: corrugatedStackImg, label: 'Corrugated Aluminium Sheet' },
    { src: trapezoidalStackImg, label: 'Trapezoidal Aluminium Profile' }
  ];

  const [activeImage, setActiveImage] = useState(factoryStackImg);
  const [showModal, setShowModal] = useState(false);
  const [showLightbox, setShowLightbox] = useState(false);
  
  // Interactive Controls
  const [profileType, setProfileType] = useState('Trapezoidal Profile');
  const [sheetThickness, setSheetThickness] = useState('0.70 mm');
  const [lengthMtrs, setLengthMtrs] = useState('3.66');
  const [quantityPieces, setQuantityPieces] = useState('15');

  // Form State
  const [formData, setFormData] = useState({ name: '', phone: '', quantity: '', requirements: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Wholesale Rate per kg
  const RATE_PER_KG = 320.00;

  const thkNum = parseFloat(sheetThickness) || 0.70;
  const lenNum = parseFloat(lengthMtrs) || 3.66;
  const pcsNum = parseInt(quantityPieces) || 1;

  // Approx weight per meter for aluminium sheet: width(1m) * thk(mm) * 2.71 kg/m³
  const kgPerMtr = (thkNum * 2.71).toFixed(2);
  const estimatedWeightKg = Math.round(kgPerMtr * lenNum * pcsNum);
  const estimatedCostRs = Math.round(estimatedWeightKg * RATE_PER_KG);

  const specificationsData = [
    { key: 'Material Designation', value: 'AlMgSio.5F25', std: 'DIN Standard' },
    { key: 'Material Grade', value: 'Al6063-T5', std: 'ASTM B221' },
    { key: 'Wholesale Price Rate', value: '₹320.00 per kg', std: 'Ex-Factory' },
    { key: 'Tensile Strength', value: '250 N/mm²', std: 'ISO 6892' },
    { key: '0.2% Proof Stress', value: '160 N/mm²', std: 'High Yield' },
    { key: 'Ductile Yield (A5 / A10)', value: '10% / 8%', std: 'Formable' },
    { key: 'Modulus of Elasticity', value: '70,000 N/mm²', std: 'Structural Rigidity' },
    { key: 'Brinell Hardness', value: '75 HB / 300 HV', std: 'Scratch Resistant' },
    { key: 'Thermal Expansion', value: '23.8×10⁻⁶ 1/K', std: 'Stable Geometry' },
    { key: 'Anodizing Layer', value: 'E6/EV1 Clear (10 µm)', std: '100% Anti-Corrosive' },
    { key: 'Parallelism & Straightness', value: '±0.1 mm / 0.3mm per 300mm', std: 'Precision Milled' }
  ];

  const keyFeatures = [
    {
      title: 'Lightweight & Ultra Durable',
      desc: 'High strength-to-weight ratio reduces building roof load while providing 50+ year corrosion resistance.'
    },
    {
      title: 'E6/EV1 Anodized Shield',
      desc: '10-micron clear anodized layer shields raw aluminium against coastal salt air, acid rain, and industrial chemicals.'
    },
    {
      title: 'High Thermal Reflectivity',
      desc: 'Natural shiny metallic finish reflects up to 85% of solar radiation, lowering building HVAC energy bills.'
    },
    {
      title: 'Zero Maintenance Architecture',
      desc: 'Does not rust, peel, or require painting over its entire life cycle, delivering maximum long-term ROI.'
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
          <span className="font-semibold text-slate-900">Aluminium Profile Sheet</span>
        </nav>

        {/* HERO BANNER - EXACT AIR BUBBLE INSULATION COLOR PALETTE */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#0B192C] via-[#102A43] to-[#0B192C] text-white p-6 sm:p-10 mb-10 shadow-2xl border border-[#1E3A5F]">
          <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#003846] text-[#00D2FF] rounded-full text-xs font-bold mb-4 border border-cyan-800/50 shadow-sm">
                <Sparkles className="w-4 h-4 text-amber-400" /> High Tensile Grade Al6063-T5
              </div>
              <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-3">
                Aluminium <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-sky-300 to-amber-300">Profile Sheet</span>
              </h1>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Premium grade structural Aluminium Profile Sheets engineered for industrial roofing, cladding, and architectural applications with high corrosion resistance.
              </p>
            </div>

            {/* Price Badge Card matching screenshot */}
            <div className="bg-[#132A3E]/80 backdrop-blur-md border border-[#1E3E5A] rounded-3xl p-6 text-center lg:text-right shrink-0 shadow-2xl">
              <span className="text-xs uppercase tracking-wider text-[#00D2FF] font-bold block mb-1">STANDARD WHOLESALE PRICE</span>
              <div className="text-4xl font-black text-[#FFC107] my-1">
                ₹320.00 <span className="text-sm font-normal text-slate-200">/ kg</span>
              </div>
              <span className="text-xs text-slate-300 block">Ex-Factory | GST & Transport extra</span>
            </div>
          </div>
        </div>

        {/* SECTION 1: PHOTO GALLERY + INTERACTIVE CONFIGURATOR CARD */}
        <div className="grid lg:grid-cols-12 gap-8 mb-12">
          
          {/* LEFT 7 COLS: PHOTO GALLERY */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-5 border border-slate-200 shadow-sm">
            <div 
              onClick={() => setShowLightbox(true)}
              className="relative w-full h-[360px] sm:h-[440px] bg-slate-100 rounded-2xl overflow-hidden mb-4 border border-slate-200 group cursor-pointer"
            >
              <img 
                src={activeImage} 
                alt="Aluminium Profile Sheet"
                className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-500"
              />
              <button 
                className="absolute top-3 right-3 bg-slate-900/80 hover:bg-sky-600 text-white p-2 rounded-xl backdrop-blur-md transition shadow-md"
                aria-label="Enlarge Image"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
              <span className="absolute bottom-3 left-3 bg-slate-900/85 text-sky-300 text-xs px-3 py-1.5 rounded-lg font-semibold shadow-md">
                100% Anti-Corrosive Anodized Al6063-T5
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

          {/* RIGHT 5 COLS: INTERACTIVE CONFIGURATOR & ESTIMATOR CARD MATCHING USER SCREENSHOT */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6">
            
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
              <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Ruler className="w-5 h-5 text-sky-600" /> Select Aluminium Specifications
              </h2>

              {/* PROFILE TYPE SELECTOR */}
              <label className="block text-xs font-bold text-slate-700 mb-2">Profile Geometry</label>
              <div className="grid grid-cols-2 gap-2 mb-4">
                {['Trapezoidal Profile', 'Corrugated Wave'].map((p) => (
                  <button
                    key={p}
                    onClick={() => setProfileType(p)}
                    className={`
                      py-2 px-1 rounded-xl text-[11px] font-bold border text-center transition-all
                      ${profileType === p
                        ? 'bg-[#0B192C] border-[#0B192C] text-white shadow-sm'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300'
                      }
                    `}
                  >
                    {p}
                  </button>
                ))}
              </div>

              {/* THICKNESS SELECTOR */}
              <label className="block text-xs font-bold text-slate-700 mb-2">Sheet Thickness (mm)</label>
              <div className="grid grid-cols-4 gap-1.5 mb-5">
                {['0.50 mm', '0.70 mm', '0.90 mm', '1.20 mm'].map((t) => (
                  <button
                    key={t}
                    onClick={() => setSheetThickness(t)}
                    className={`
                      py-2 px-1 rounded-xl text-[11px] font-bold border text-center transition-all
                      ${sheetThickness === t
                        ? 'bg-sky-700 border-sky-700 text-white shadow-sm'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300'
                      }
                    `}
                  >
                    {t}
                  </button>
                ))}
              </div>

              {/* LIVE WEIGHT & COST ESTIMATOR SUB-CARD MATCHING SCREENSHOT */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 mb-4">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                    <Calculator className="w-4 h-4 text-sky-600" /> Coverage Estimator (kg / ₹)
                  </label>
                  <span className="text-[10px] bg-[#0B192C] text-white px-2 py-0.5 rounded font-bold">
                    ₹320 / kg
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div>
                    <label className="block text-[10px] font-semibold text-slate-600 mb-1">Length per Sheet (Meters)</label>
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
                    <label className="block text-[10px] font-semibold text-slate-600 mb-1">Quantity (Sheets)</label>
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
                <MessageSquare className="w-4 h-4" /> Request Quote For Aluminium Profile Sheet
              </button>
            </div>

          </div>

        </div>

        {/* SECTION 2: 4 KEY MATERIAL ADVANTAGES */}
        <div className="mb-12">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-sky-700 font-bold text-xs uppercase tracking-wider bg-sky-50 px-3 py-1 rounded-full border border-sky-200">
              Structural Aluminum Superiority
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
              Why Choose Aluminium Profile Sheets?
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">Lightweight, non-corrosive, highly reflective roofing for coastal and industrial environments</p>
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

        {/* SECTION 3: FULL TECHNICAL SPECIFICATIONS MATRIX TABLE */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm mb-12">
          <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
            <div>
              <span className="text-xs font-bold text-sky-700 uppercase tracking-wider bg-sky-50 px-3 py-1 rounded-full border border-sky-100">
                Technical Data Sheet
              </span>
              <h2 className="text-2xl font-extrabold text-slate-900 mt-2">
                Aluminium Profile Sheet Technical Matrix
              </h2>
            </div>
            <div className="flex items-center gap-2 text-xs font-bold text-slate-600 bg-slate-100 px-3 py-2 rounded-xl">
              <ShieldCheck className="w-4 h-4 text-emerald-600" /> Al6063-T5 & DIN Standard Certified
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-[#0B192C] text-white font-bold">
                  <th className="p-3.5 rounded-l-xl">Technical Property</th>
                  <th className="p-3.5">Tested Value</th>
                  <th className="p-3.5 rounded-r-xl">Standard / Specification</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {specificationsData.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 transition">
                    <td className="p-3.5 font-bold text-slate-900">{item.key}</td>
                    <td className="p-3.5 font-extrabold text-sky-700">{item.value}</td>
                    <td className="p-3.5 text-slate-500 font-medium">{item.std}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* HORIZONTAL ACTION BAR MATCHING USER REQUEST */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-sm mb-12 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span className="text-xs text-slate-500 block font-medium">Aluminium Profile Sheet (Al6063-T5)</span>
            <span className="text-lg font-black text-amber-600">
              ₹320.00 / kg <span className="text-xs text-slate-500 font-normal">(Anodized E6/EV1 Clear | Ex-Factory)</span>
            </span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <a
              href="tel:+917498147921"
              aria-label="Call Sales"
              className="w-10 h-10 rounded-xl bg-[#0B192C] text-sky-400 flex items-center justify-center hover:bg-slate-800 transition shrink-0"
            >
              <Phone className="w-5 h-5" />
            </a>
            <a
              href="https://wa.me/917498147921?text=Hi,%20I%20am%20interested%20in%20Aluminium%20Profile%20Sheet%20(Rs.320/kg)."
              target="_blank"
              rel="noreferrer"
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl font-bold text-xs transition shadow-sm flex items-center gap-2 shrink-0"
            >
              WhatsApp
            </a>
            <button
              onClick={() => setShowModal(true)}
              className="bg-[#0B192C] hover:bg-slate-800 text-white px-5 py-2.5 rounded-xl font-extrabold text-xs transition shadow-sm flex items-center gap-2 shrink-0"
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
            <img src={activeImage} alt="Aluminium Profile Sheet Preview" className="max-w-full max-h-[85vh] object-contain rounded-2xl bg-white p-4" />
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
              Aluminium Profile Sheet — {profileType} ({sheetThickness}) Rate: ₹320.00 / kg
            </p>

            {isSubmitted ? (
              <div className="py-8 text-center">
                <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-3 animate-bounce" />
                <h4 className="font-bold text-slate-900 text-lg">Inquiry Received!</h4>
                <p className="text-xs text-slate-600 mt-1">Our sales manager will contact you within 30 minutes with custom length dispatch details.</p>
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
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Required Quantity (kg / sheets)</label>
                  <input
                    type="text"
                    placeholder={`e.g. ${pcsNum} sheets (~${estimatedWeightKg} kg)`}
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-sky-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Additional Requirements</label>
                  <textarea
                    rows={3}
                    placeholder="Specify length per sheet or anodizing thickness requirements"
                    value={formData.requirements}
                    onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-sky-600"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#0B192C] hover:bg-slate-800 text-white font-bold py-3 rounded-xl shadow-lg text-sm transition"
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
