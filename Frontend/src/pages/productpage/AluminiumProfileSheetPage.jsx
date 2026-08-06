import React, { useState } from 'react';
import { 
  ChevronRight, 
  CheckCircle, 
  ShieldCheck, 
  Truck, 
  Phone, 
  MessageSquare,
  Sparkles,
  X
} from 'lucide-react';

// Image imports
import factoryStackImg from '../../assets/aluminium_profile/alum_factory_stack.jpg';
import corrugatedStackImg from '../../assets/aluminium_profile/alum_corrugated_stack.jpg';
import trapezoidalStackImg from '../../assets/aluminium_profile/alum_trapezoidal_stack.jpg';

export default function AluminiumProfileSheetPage() {
  const images = [
    { src: factoryStackImg, label: 'Factory Stack' },
    { src: corrugatedStackImg, label: 'Corrugated Profile' },
    { src: trapezoidalStackImg, label: 'Trapezoidal Sheet' }
  ];

  const [activeImage, setActiveImage] = useState(factoryStackImg);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', quantity: '', requirements: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const specificationsData = [
    { key: 'Material Designation', value: 'AlMgSio.5F25' },
    { key: 'Material Number', value: 'Al6063-T5' },
    { key: 'Price Rate', value: '₹320.00 per kg' },
    { key: 'Minimum Tensile Strength', value: '250 N/mm²' },
    { key: '0.2% Proof Stress', value: '160 N/mm²' },
    { key: 'Ductile Yield (A5)', value: '10%' },
    { key: 'Ductile Yield (A10)', value: '8%' },
    { key: 'Modulus of Elasticity', value: '70,000 N/mm²' },
    { key: 'Brinell Hardness', value: '75 HB' },
    { key: 'Coefficient of Thermal Expansion', value: '(-50 to +20°C): 21.8×10⁻⁶ 1/K | (+20 to +100°C): 23.8×10⁻⁶ 1/K' },
    { key: 'Transversal Contraction Figure', value: 'V = 0.34' },
    { key: 'Anodizing Process', value: 'E6/EV1 Clear' },
    { key: 'Thickness of Layer', value: '10 µm' },
    { key: 'Hardness (Vickers)', value: '300 HV' },
    { key: 'Section Faces Parallelism', value: 'Within +/- 0.1 mm' },
    { key: 'Straightness of Profile', value: 'Max deviation 0.3 mm per 300 mm' },
    { key: 'Maximum Twist', value: '1.5 mm per 2000 mm' }
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
    <div className="min-h-screen bg-slate-50 pt-[110px] pb-16 font-sans text-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* BREADCRUMB NAVIGATION */}
        <nav className="flex items-center gap-2 text-xs sm:text-sm text-slate-500 mb-6 flex-wrap">
          <a href="/" className="hover:text-teal-600 transition">Home</a>
          <ChevronRight className="w-4 h-4 text-slate-400" />
          <a href="/allproduct/mildsteel/deck-sheet" className="hover:text-teal-600 transition">All Products</a>
          <ChevronRight className="w-4 h-4 text-slate-400" />
          <span className="font-semibold text-slate-900">Aluminium Profile Sheet</span>
        </nav>

        {/* HERO HEADER & TITLE */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-teal-950 text-white rounded-3xl p-6 sm:p-10 mb-8 shadow-xl relative overflow-hidden">
          <div className="absolute right-0 top-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-teal-500/20 text-teal-300 rounded-full text-xs font-medium mb-3 border border-teal-500/30">
                <Sparkles className="w-3.5 h-3.5" /> High Tensile Grade Al6063-T5
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-2">
                Aluminium Profile Sheet
              </h1>
              <p className="text-slate-300 text-sm sm:text-base max-w-2xl">
                Premium grade structural Aluminium Profile Sheets engineered for industrial roofing, cladding, and architectural applications with high corrosion resistance.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 sm:p-6 text-center md:text-right shrink-0">
              <span className="text-xs uppercase tracking-wider text-teal-300 block font-semibold">Standard Wholesale Price</span>
              <div className="text-3xl sm:text-4xl font-extrabold text-amber-400 my-1">
                ₹320.00 <span className="text-sm font-normal text-slate-200">/ kg</span>
              </div>
              <span className="text-xs text-slate-300 block">Ex-Factory | GST & Transport extra</span>
            </div>
          </div>
        </div>

        {/* MAIN 2-COLUMN SECTION: GALLERY + OVERVIEW */}
        <div className="grid lg:grid-cols-12 gap-8 mb-12">
          
          {/* LEFT 7 COLS: PHOTO GALLERY */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-5 shadow-sm border border-slate-200">
            {/* Main Active Image Display */}
            <div className="relative w-full h-[380px] sm:h-[480px] bg-slate-100 rounded-2xl overflow-hidden mb-4 border border-slate-200 group">
              <img 
                src={activeImage} 
                alt="Aluminium Profile Sheet"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute bottom-3 left-3 bg-slate-900/80 backdrop-blur-md text-white text-xs px-3 py-1.5 rounded-lg font-medium shadow-md">
                Verified Industrial Asset
              </span>
            </div>

            {/* Thumbnail Switcher */}
            <div className="grid grid-cols-4 gap-3">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(img.src)}
                  className={`
                    relative rounded-xl overflow-hidden aspect-square border-2 transition-all duration-200
                    ${activeImage === img.src 
                      ? 'border-teal-500 ring-2 ring-teal-500/20 scale-[1.02] shadow-md' 
                      : 'border-slate-200 hover:border-slate-400 opacity-80 hover:opacity-100'
                    }
                  `}
                >
                  <img src={img.src} alt={img.label} className="w-full h-full object-cover" />
                  <span className="absolute inset-x-0 bottom-0 bg-slate-900/75 text-[10px] text-white py-1 text-center font-medium truncate px-1">
                    {img.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT 5 COLS: KEY FEATURES & QUICK INQUIRY */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6">
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">
              <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-teal-600" /> Key Material Highlights
              </h2>

              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                  <span className="text-xs text-slate-500 block">Grade</span>
                  <span className="font-bold text-slate-900 text-sm">Al6063-T5</span>
                </div>
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                  <span className="text-xs text-slate-500 block">Tensile Strength</span>
                  <span className="font-bold text-teal-700 text-sm">250 N/mm²</span>
                </div>
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                  <span className="text-xs text-slate-500 block">Hardness</span>
                  <span className="font-bold text-slate-900 text-sm">75 HB / 300 HV</span>
                </div>
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                  <span className="text-xs text-slate-500 block">Anodizing</span>
                  <span className="font-bold text-slate-900 text-sm">E6/EV1 Clear (10µm)</span>
                </div>
              </div>

              <ul className="space-y-2.5 text-xs sm:text-sm text-slate-600 mb-6">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-teal-600 shrink-0" /> Superior strength-to-weight ratio for industrial structures.
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-teal-600 shrink-0" /> High corrosion resistance with E6/EV1 clear anodizing layer.
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-teal-600 shrink-0" /> Precise profile tolerances (Faces parallel within ±0.1mm).
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-teal-600 shrink-0" /> Custom cut-to-length options available on order.
                </li>
              </ul>

              {/* ACTION BUTTONS */}
              <div className="space-y-3">
                <button
                  onClick={() => setShowModal(true)}
                  className="w-full bg-teal-600 hover:bg-teal-700 text-white py-3.5 rounded-xl font-bold text-sm shadow-lg shadow-teal-600/20 transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" /> Request Instant Quote
                </button>

                <div className="grid grid-cols-2 gap-3">
                  <a
                    href="tel:+917498147921"
                    className="flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white py-3 rounded-xl font-semibold text-xs transition"
                  >
                    <Phone className="w-3.5 h-3.5 text-teal-400" /> Call Sales
                  </a>
                  <a
                    href="https://wa.me/917498147921?text=Hi,%20I%20am%20interested%20in%20Aluminium%20Profile%20Sheet%20(Rs.320/kg)."
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-xl font-semibold text-xs transition"
                  >
                    WhatsApp Quote
                  </a>
                </div>
              </div>

            </div>

            {/* TRUST BADGE */}
            <div className="bg-teal-50 border border-teal-200/70 rounded-2xl p-4 flex items-center gap-3">
              <Truck className="w-8 h-8 text-teal-700 shrink-0" />
              <div>
                <h4 className="text-xs font-bold text-teal-950">Fast Delivery Nationwide</h4>
                <p className="text-[11px] text-teal-800">Dispatch within 24-48 hours for standard stock profiles.</p>
              </div>
            </div>

          </div>

        </div>

        {/* TECHNICAL SPECIFICATIONS SECTION */}
        <section className="bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-slate-200 mb-12">
          
          <div className="mb-6 border-b border-slate-200 pb-4">
            <h3 className="text-2xl font-extrabold text-slate-900">Technical Specifications</h3>
            <p className="text-xs sm:text-sm text-slate-500">Certified Mechanical & Chemical Properties for Grade Al6063-T5 (Rate: ₹320.00 / kg)</p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-200">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-900 text-white uppercase text-[11px] tracking-wider">
                <tr>
                  <th className="py-3.5 px-6 font-bold">Parameter / Property</th>
                  <th className="py-3.5 px-6 font-bold">Specified Value</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white">
                {specificationsData.map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-slate-50/50 hover:bg-slate-100/50' : 'hover:bg-slate-100/50'}>
                    <td className="py-3.5 px-6 font-semibold text-slate-900 w-1/2">{row.key}</td>
                    <td className="py-3.5 px-6 text-teal-800 font-medium">{row.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </section>

      </div>

      {/* INQUIRY MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl relative border border-slate-100">
            <button 
              onClick={() => setShowModal(false)} 
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold text-slate-900 mb-1">Request Quote</h3>
            <p className="text-xs text-slate-500 mb-6">Aluminium Profile Sheet (Rate: ₹320.00 / kg)</p>

            {isSubmitted ? (
              <div className="py-8 text-center">
                <CheckCircle className="w-12 h-12 text-emerald-500 mx-auto mb-3 animate-bounce" />
                <h4 className="font-bold text-slate-900 text-lg">Inquiry Received!</h4>
                <p className="text-xs text-slate-600 mt-1">Our sales manager will contact you within 30 minutes.</p>
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
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20"
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
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Required Quantity (kg / sq.ft)</label>
                  <input
                    type="text"
                    placeholder="e.g. 500 kg"
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Additional Requirements</label>
                  <textarea
                    rows={3}
                    placeholder="Specify thickness, length, or profile type"
                    value={formData.requirements}
                    onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 rounded-xl shadow-lg shadow-teal-600/20 text-sm transition"
                >
                  Submit Inquiry
                </button>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
