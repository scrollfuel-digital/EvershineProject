import React, { useState } from 'react';
import { 
  ChevronRight, 
  CheckCircle, 
  ShieldCheck, 
  Truck, 
  Phone, 
  MessageSquare,
  Zap,
  X,
  Calculator,
  Maximize2,
  CheckCircle2,
  Layers,
  ArrowRight
} from 'lucide-react';

// Image imports
import factoryStackImg from '../../assets/bare_galvalume/bare_galv_factory_stack.jpg';
import jswSilveronImg from '../../assets/bare_galvalume/jsw_silveron_sheet.png';
import isiStampImg from '../../assets/bare_galvalume/bare_galv_isi_stamp.jpg';

export default function BaregalvalumeProfileSheetPage() {
  const images = [
    { src: factoryStackImg, label: 'Factory Sheet Stack' },
    { src: jswSilveronImg, label: 'JSW Silveron+ Al-Zn' },
    { src: isiStampImg, label: 'ISI Marked Profile' }
  ];

  const [activeImage, setActiveImage] = useState(factoryStackImg);
  const [showModal, setShowModal] = useState(false);
  const [showLightbox, setShowLightbox] = useState(false);
  const [selectedThickness, setSelectedThickness] = useState('0.47mm');

  // Interactive Quantity Estimator Calculator State
  const [lengthFt, setLengthFt] = useState('10');
  const [quantitySheets, setQuantitySheets] = useState('20');
  
  // Form State
  const [formData, setFormData] = useState({ name: '', phone: '', quantity: '', requirements: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Rate per kg
  const RATE_PER_KG = 70.00;

  // Approx weight calculation per sheet
  const thicknessMultipliers = {
    '0.47mm': 1.2,
    '0.50mm': 1.3,
    '0.60mm': 1.55,
    '0.80mm': 2.05
  };

  const currentMultiplier = thicknessMultipliers[selectedThickness] || 1.2;
  const totalLength = (parseFloat(lengthFt) || 10);
  const totalSheets = (parseInt(quantitySheets) || 1);
  const estimatedWeightKg = Math.round(totalLength * totalSheets * currentMultiplier);
  const estimatedPriceRs = Math.round(estimatedWeightKg * RATE_PER_KG);

  const specificationsData = [
    { key: 'Tensile Strength', value: 'Up to 550 MPa (Hi-Tensile Grade)' },
    { key: 'Coating Type', value: 'AZ-150 Bare Galvalume (Aluminium-Zinc Alloy)' },
    { key: 'Coating Mass (GSM)', value: 'AZ-150 (150 GSM Coating)' },
    { key: 'Total Coated Thickness (TCT)', value: '0.47mm - 0.80mm' },
    { key: 'Wholesale Rate', value: '₹70.00 per kg' },
    { key: 'Features', value: 'Weather Proof, Corrosion Resistance, Smooth Finish' },
    { key: 'Area of Application', value: 'Commercial & Industrial Shed Roofing, Warehouses' },
    { key: 'Material Grade', value: 'High Tensile Steel / Stainless Steel Base' },
    { key: 'Surface Treatment', value: 'Bare Galvalume / Non-Colored Polyester Finish' }
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
    <div className="min-h-screen bg-slate-50 pt-[110px] pb-24 font-sans text-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* BREADCRUMB NAVIGATION */}
        <nav className="flex items-center gap-2 text-xs sm:text-sm text-slate-500 mb-6 flex-wrap">
          <a href="/" className="hover:text-teal-600 transition">Home</a>
          <ChevronRight className="w-4 h-4 text-slate-400" />
          <a href="/allproduct/mildsteel/deck-sheet" className="hover:text-teal-600 transition">All Products</a>
          <ChevronRight className="w-4 h-4 text-slate-400" />
          <span className="font-semibold text-slate-900">Bare Galvalume Roofing Sheets</span>
        </nav>

        {/* HERO BANNER - LIGHT ELEGANT STYLING */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-slate-900 via-slate-800 to-teal-950 p-6 sm:p-10 mb-8 shadow-xl text-white">
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-teal-500/20 text-teal-300 rounded-full text-xs font-semibold mb-3 border border-teal-500/30">
                <Zap className="w-3.5 h-3.5" /> High Yield Strength 550 MPa | AZ-150 Coating
              </div>
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-3">
                Bare Galvalume Roofing Sheets
              </h1>
              <p className="text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
                Hi-Tensile Steel Sheets with AZ-150 Aluminium-Zinc coating designed to withstand severe weather conditions, protecting industrial sheds and commercial structures.
              </p>
            </div>

            {/* Price Badge */}
            <div className="bg-white/10 border border-white/20 backdrop-blur-md rounded-2xl p-5 sm:p-6 text-center md:text-right shrink-0">
              <span className="text-xs uppercase tracking-wider text-teal-300 font-bold block mb-1">Wholesale Factory Rate</span>
              <div className="text-3xl sm:text-4xl font-extrabold text-amber-400 my-1">
                ₹70.00 <span className="text-sm font-normal text-slate-200">/ kg</span>
              </div>
              <span className="text-xs text-slate-300 block">Ex-Factory | GST & Transport extra</span>
            </div>
          </div>
        </div>

        {/* SECTION 1: PHOTO GALLERY + INTERACTIVE THICKNESS & CALCULATOR */}
        <div className="grid lg:grid-cols-12 gap-8 mb-12">
          
          {/* LEFT 7 COLS: PHOTO GALLERY */}
          <div className="lg:col-span-7 bg-white border border-slate-200 rounded-3xl p-5 shadow-sm">
            {/* Main Active Image Display with Lightbox Trigger */}
            <div 
              onClick={() => setShowLightbox(true)}
              className="relative w-full h-[380px] sm:h-[460px] bg-slate-100 rounded-2xl overflow-hidden mb-4 border border-slate-200 group cursor-pointer"
            >
              <img 
                src={activeImage} 
                alt="Bare Galvalume Profile Sheet"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <button 
                className="absolute top-3 right-3 bg-slate-900/80 hover:bg-teal-600 text-white p-2 rounded-xl backdrop-blur-md transition shadow-md border border-white/10"
                aria-label="Enlarge Image"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
              <span className="absolute bottom-3 left-3 bg-slate-900/80 text-white text-xs px-3 py-1.5 rounded-lg font-medium shadow-md">
                Verified Industrial Asset
              </span>
            </div>

            {/* Thumbnail Switcher */}
            <div className="grid grid-cols-3 gap-3">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(img.src)}
                  className={`
                    relative rounded-xl overflow-hidden aspect-square border-2 transition-all duration-200
                    ${activeImage === img.src 
                      ? 'border-teal-600 ring-2 ring-teal-600/20 scale-[1.02] shadow-md' 
                      : 'border-slate-200 hover:border-slate-400 opacity-80 hover:opacity-100'
                    }
                  `}
                >
                  <img src={img.src} alt={img.label} className="w-full h-full object-cover" />
                  <span className="absolute inset-x-0 bottom-0 bg-slate-900/80 text-[10px] text-white py-1 text-center font-medium truncate px-1">
                    {img.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT 5 COLS: INTERACTIVE THICKNESS & ESTIMATOR CALCULATOR */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* THICKNESS SELECTOR CARD */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
              <h2 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
                <Layers className="w-5 h-5 text-teal-600" /> Select Thickness (TCT)
              </h2>

              <div className="grid grid-cols-2 gap-2.5 mb-5">
                {['0.47mm', '0.50mm', '0.60mm', '0.80mm'].map((thick) => (
                  <button
                    key={thick}
                    onClick={() => setSelectedThickness(thick)}
                    className={`
                      py-2.5 px-3 rounded-xl text-xs font-bold transition-all border text-center
                      ${selectedThickness === thick 
                        ? 'bg-teal-600 border-teal-600 text-white shadow-md shadow-teal-600/20 scale-[1.02]' 
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300'
                      }
                    `}
                  >
                    {thick} {thick === '0.47mm' ? '(Standard)' : ''}
                  </button>
                ))}
              </div>

              {/* FEATURES BULLETS */}
              <div className="space-y-2 text-xs text-slate-600 border-t border-slate-100 pt-4">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                  <span>Corrosion resistant AZ-150 Al-Zn alloy coating</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                  <span>Engineered to withstand all extreme weather conditions</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                  <span>Smooth metallic finish for commercial & industrial sheds</span>
                </div>
              </div>
            </div>

            {/* LIVE WEIGHT & COST ESTIMATOR CALCULATOR */}
            <div className="bg-white border border-teal-200/80 rounded-3xl p-6 shadow-sm relative overflow-hidden">
              <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <Calculator className="w-4 h-4 text-teal-600" /> Quantity & Cost Estimator
                </h3>
                <span className="text-[10px] bg-teal-50 text-teal-700 border border-teal-200 px-2 py-0.5 rounded font-semibold">
                  Live Calculator
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-4">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">Sheet Length (Feet)</label>
                  <input
                    type="number"
                    min="1"
                    max="40"
                    value={lengthFt}
                    onChange={(e) => setLengthFt(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-teal-600"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">Total Quantity (Sheets)</label>
                  <input
                    type="number"
                    min="1"
                    max="1000"
                    value={quantitySheets}
                    onChange={(e) => setQuantitySheets(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-teal-600"
                  />
                </div>
              </div>

              {/* ESTIMATED OUTPUT DISPLAY */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex items-center justify-between mb-4">
                <div>
                  <span className="text-[10px] text-slate-500 block uppercase font-semibold">Est. Weight</span>
                  <span className="text-lg font-extrabold text-teal-700">~{estimatedWeightKg} kg</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-500 block uppercase font-semibold">Est. Wholesale Cost</span>
                  <span className="text-xl font-black text-amber-600">₹{estimatedPriceRs.toLocaleString()}</span>
                </div>
              </div>

              <button
                onClick={() => setShowModal(true)}
                className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 rounded-xl text-xs shadow-lg shadow-teal-600/20 transition flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4" /> Order This Quantity Now
              </button>
            </div>

          </div>

        </div>

        {/* SECTION 2: 3D SPEC CARDS GRID */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:border-teal-500 transition">
            <span className="text-xs text-teal-700 font-bold block mb-1 uppercase tracking-wider">Yield Strength</span>
            <div className="text-2xl font-black text-slate-900 mb-1">550 MPa</div>
            <p className="text-xs text-slate-500">High tensile steel withstands heavy structural loads and winds.</p>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:border-teal-500 transition">
            <span className="text-xs text-teal-700 font-bold block mb-1 uppercase tracking-wider">Al-Zn Coating</span>
            <div className="text-2xl font-black text-slate-900 mb-1">AZ 150 GSM</div>
            <p className="text-xs text-slate-500">55% Aluminium + 43.4% Zinc alloy protection layer.</p>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:border-teal-500 transition">
            <span className="text-xs text-teal-700 font-bold block mb-1 uppercase tracking-wider">Thickness Range</span>
            <div className="text-2xl font-black text-slate-900 mb-1">0.47 - 0.8mm</div>
            <p className="text-xs text-slate-500">Available in standard 0.47mm TCT cut to required sheet length.</p>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:border-teal-500 transition">
            <span className="text-xs text-amber-600 font-bold block mb-1 uppercase tracking-wider">Wholesale Price</span>
            <div className="text-2xl font-black text-amber-600 mb-1">₹70.00 / kg</div>
            <p className="text-xs text-slate-500">Ex-factory wholesale pricing direct from manufacturer stock.</p>
          </div>

        </div>

        {/* SECTION 3: TECHNICAL SPECIFICATIONS TABLE */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-sm mb-10">
          <div className="mb-6 border-b border-slate-200 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="text-2xl font-extrabold text-slate-900">Specification of Bare Galvalume Roofing Sheets</h3>
              <p className="text-xs text-slate-500">Certified Mechanical Properties & Coating Parameters</p>
            </div>
            <span className="text-xs bg-teal-50 text-teal-700 px-3 py-1 rounded-full border border-teal-200 self-start sm:self-auto font-semibold">
              Grade AZ-150 / 550 MPa
            </span>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-200">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-900 text-white uppercase text-[11px] tracking-wider">
                <tr>
                  <th className="py-4 px-6 font-bold">Specification Property</th>
                  <th className="py-4 px-6 font-bold">Value / Standard</th>
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
        </div>

        {/* HORIZONTAL ACTION BAR MATCHING USER SCREENSHOT */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-sm mb-12 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span className="text-xs text-slate-500 block font-medium">Bare Galvalume Sheets</span>
            <span className="text-lg font-black text-amber-600">
              ₹70.00 / kg <span className="text-xs text-slate-500 font-normal">(AZ-150 Galvalume)</span>
            </span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <a
              href="tel:+917498147921"
              aria-label="Call Sales"
              className="w-10 h-10 rounded-xl bg-slate-900 text-teal-400 flex items-center justify-center hover:bg-slate-800 transition shrink-0"
            >
              <Phone className="w-5 h-5" />
            </a>
            <a
              href="https://wa.me/917498147921?text=Hi,%20I%20am%20interested%20in%20Bare%20Galvalume%20Roofing%20Sheets%20(Rs.70/kg)."
              target="_blank"
              rel="noreferrer"
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl font-bold text-xs transition shadow-sm flex items-center gap-2 shrink-0"
            >
              WhatsApp
            </a>
            <button
              onClick={() => setShowModal(true)}
              className="bg-teal-600 hover:bg-teal-700 text-white px-5 py-2.5 rounded-xl font-extrabold text-xs transition shadow-sm flex items-center gap-2 shrink-0"
            >
              Request Quote <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>

      {/* FULL SCREEN LIGHTBOX MODAL */}
      {showLightbox && (
        <div 
          onClick={() => setShowLightbox(false)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm cursor-pointer"
        >
          <div className="relative max-w-4xl w-full max-h-[90vh] flex flex-col items-center">
            <img src={activeImage} alt="Bare Galvalume Enlarged" className="max-w-full max-h-[85vh] object-contain rounded-2xl border border-slate-700 shadow-2xl" />
            <span className="text-xs text-slate-300 mt-3">Click anywhere to close preview</span>
          </div>
        </div>
      )}

      {/* INQUIRY MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl relative text-slate-800">
            <button 
              onClick={() => setShowModal(false)} 
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-extrabold text-slate-900 mb-1">Request Quote</h3>
            <p className="text-xs text-teal-600 mb-6">Bare Galvalume Roofing Sheets (Rate: ₹70.00 / kg)</p>

            {isSubmitted ? (
              <div className="py-8 text-center">
                <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-3 animate-bounce" />
                <h4 className="font-bold text-slate-900 text-lg">Inquiry Received!</h4>
                <p className="text-xs text-slate-600 mt-1">Our technical sales executive will contact you within 30 minutes.</p>
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
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-teal-600"
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
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-teal-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Required Quantity (kg / sq.ft)</label>
                  <input
                    type="text"
                    placeholder={`e.g. ${estimatedWeightKg} kg`}
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-teal-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Additional Requirements</label>
                  <textarea
                    rows={3}
                    placeholder="Specify sheet length or total coverage area"
                    value={formData.requirements}
                    onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-teal-600"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 rounded-xl shadow-lg shadow-teal-600/20 text-sm transition"
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
