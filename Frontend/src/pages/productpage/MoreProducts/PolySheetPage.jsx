import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ChevronRight, 
  CheckCircle2, 
  ShieldCheck,
  MessageSquare,
  Maximize2,
  X,
  Sun,
  Calculator,
  Ruler
} from 'lucide-react';

// Image imports
import clearCorrugatedImg from '../../../assets/poly_sheet/poly_clear_corrugated.jpg';
import translucentWaveImg from '../../../assets/poly_sheet/poly_translucent_wave.jpg';
import blueTrapezoidalImg from '../../../assets/poly_sheet/poly_blue_trapezoidal.jpg';

export default function PolySheetPage() {
  const images = [
    { src: clearCorrugatedImg, label: 'Clear Corrugated Profile Sheet' },
    { src: translucentWaveImg, label: 'Translucent Opal Wave Stack' },
    { src: blueTrapezoidalImg, label: 'Sky Blue Trapezoidal Sheet' }
  ];

  const [activeImage, setActiveImage] = useState(clearCorrugatedImg);
  const [showModal, setShowModal] = useState(false);
  const [showLightbox, setShowLightbox] = useState(false);
  
  // Interactive Customization Controls
  const [nominalThickness, setNominalThickness] = useState('1.25 mm');
  const [selectedColor, setSelectedColor] = useState('Clear');

  // Running Meter Calculator State
  const [lengthRmt, setLengthRmt] = useState('3.6'); // 12 ft ~ 3.6 rmt
  const [quantityPieces, setQuantityPieces] = useState('10');

  // Form State
  const [formData, setFormData] = useState({ name: '', phone: '', quantity: '', requirements: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Rate per Running Meter (RMT)
  const RATE_PER_RMT = 980.00;

  const totalLengthMtrs = (parseFloat(lengthRmt) || 3.6);
  const totalPieces = (parseInt(quantityPieces) || 1);
  const totalRunningMeters = (totalLengthMtrs * totalPieces).toFixed(1);
  const estCostRs = Math.round(totalRunningMeters * RATE_PER_RMT);

  const technicalSpecsMatrix = [
    { prop: 'Base Polymer', val: '100% Virgin Polycarbonate (Bayer / Sabic Resin)', std: 'ASTM D3935' },
    { prop: 'Nominal Thickness', val: '1.25 mm & 2.00 mm Standard', std: 'Micrometer Standard' },
    { prop: 'Light Transmission', val: 'Clear: 89% | Opal: 55% | Bronze: 35%', std: 'ASTM D1003' },
    { prop: 'UV Protection Layer', val: 'Co-Extruded 50 Micron UV Barrier (Weather Side)', std: 'Co-Extrusion Tech' },
    { prop: 'Service Temperature', val: '-40°C to +120°C', std: 'Continuous Thermal Range' },
    { prop: 'Impact Resistance', val: '250x Stronger than Glass, 30x Acrylic', std: 'ASTM D256' },
    { prop: 'Fire Rating', val: 'Class B1 / Self-Extinguishing / Low Smoke', std: 'UL 94 / BS 476' },
    { prop: 'Profile Matching', val: 'Trapezoidal 1010, Corrugated 76/18, Custom Match', std: 'Metal Profile Match' }
  ];

  const colorsList = [
    { name: 'Clear', hex: '#E2E8F0', tag: 'Standard' },
    { name: 'White (Opal 50)', hex: '#F8FAFC', tag: 'Standard' },
    { name: 'Bronze', hex: '#78350F', tag: 'Standard' },
    { name: 'Silver (Heat Stop)', hex: '#94A3B8', tag: 'Special Order' },
    { name: 'Blue', hex: '#0284C7', tag: 'Special Order' },
    { name: 'Green', hex: '#16A34A', tag: 'Special Order' }
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
    <div className="min-h-screen bg-gradient-to-b from-cyan-50/40 via-white to-slate-50 pt-[110px] pb-20 font-sans text-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* BREADCRUMB NAVIGATION */}
        <nav className="flex items-center gap-2 text-xs sm:text-sm text-slate-500 mb-6 flex-wrap">
          <Link to="/" className="hover:text-cyan-600 transition">Home</Link>
          <ChevronRight className="w-4 h-4 text-slate-400" />
          <Link to="/products" className="hover:text-cyan-600 transition">All Products</Link>
          <ChevronRight className="w-4 h-4 text-slate-400" />
          <span className="font-semibold text-slate-900">Polycarbonate Profile Sheet</span>
        </nav>

        {/* HERO BANNER - MATCHING EXACT USER REFERENCE LAYOUT */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white p-6 sm:p-10 mb-10 shadow-2xl border border-slate-800">
          <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="max-w-2xl">
              <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-3">
                Polycarbonate <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-sky-300 to-amber-300">Profile Sheet</span>
              </h1>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Highest grade polymer profile sheets with non-delaminating UV protective layer for 100% natural daylight transmission and extreme thermal durability.
              </p>
            </div>

            {/* Price Badge Card matching user screenshot box */}
            <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-3xl p-6 text-center lg:text-right shrink-0 shadow-2xl">
              <span className="text-xs uppercase tracking-wider text-sky-300 font-bold block mb-1">STANDARD WHOLESALE PRICE</span>
              <span className="text-xs text-slate-300 block">Ex-Factory | GST & Transport extra</span>
            </div>
          </div>
        </div>

        {/* SECTION 1: PHOTO GALLERY & CONFIGURATOR */}
        <div className="grid lg:grid-cols-12 gap-8 mb-12">
          
          {/* LEFT 7 COLS: PHOTO GALLERY */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-5 border border-cyan-100 shadow-sm">
            <div 
              onClick={() => setShowLightbox(true)}
              className="relative w-full h-[360px] sm:h-[440px] bg-slate-900 rounded-2xl overflow-hidden mb-4 border border-slate-200 group cursor-pointer"
            >
              <img 
                src={activeImage} 
                alt="Polycarbonate Profile Sheet"
                className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-500"
              />
              <button 
                className="absolute top-3 right-3 bg-slate-900/80 hover:bg-cyan-600 text-white p-2 rounded-xl backdrop-blur-md transition shadow-md"
                aria-label="Enlarge Image"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
              <span className="absolute bottom-3 left-3 bg-slate-900/85 text-cyan-300 text-xs px-3 py-1.5 rounded-lg font-semibold shadow-md">
                Co-Extruded UV Protected
              </span>
            </div>

            {/* Thumbnails */}
            <div className="grid grid-cols-3 gap-3">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(img.src)}
                  className={`
                    relative rounded-2xl overflow-hidden aspect-square border-2 transition-all duration-200 bg-slate-900 p-1.5
                    ${activeImage === img.src 
                      ? 'border-cyan-500 ring-2 ring-cyan-500/20 scale-[1.02] shadow-md' 
                      : 'border-slate-800 hover:border-slate-600 opacity-80 hover:opacity-100'
                    }
                  `}
                >
                  <img src={img.src} alt={img.label} className="w-full h-full object-contain" />
                  <span className="absolute inset-x-0 bottom-0 bg-slate-950/85 text-[9px] text-white py-0.5 text-center font-medium truncate px-1">
                    {img.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
          
          {/* RIGHT 5 COLS: NOMINAL THICKNESS & RUNNING METER ESTIMATOR */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6">
            
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
              <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Ruler className="w-5 h-5 text-sky-600" /> Select Polycarbonate Specs
              </h2>

              {/* NOMINAL THICKNESS SELECTOR */}
              <label className="block text-xs font-bold text-slate-700 mb-2">Nominal Thickness</label>
              <div className="grid grid-cols-2 gap-2 mb-4">
                {[
                  { name: '1.25 mm', desc: 'Standard Transmission' },
                  { name: '2.00 mm', desc: 'Heavy Duty Structural' }
                ].map((item) => (
                  <button
                    key={item.name}
                    onClick={() => setNominalThickness(item.name)}
                    className={`
                      p-2.5 rounded-xl text-xs font-bold border text-left transition-all
                      ${nominalThickness === item.name
                        ? 'bg-[#0B192C] border-[#0B192C] text-white shadow-sm'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300'
                      }
                    `}
                  >
                    <span className="block font-black text-xs text-amber-400 mb-0.5">{item.name}</span>
                    <span className="text-[9px] opacity-80 block">{item.desc}</span>
                  </button>
                ))}
              </div>

              {/* COLOR SELECTION GRID */}
              <label className="block text-xs font-bold text-slate-700 mb-2">Available Sheet Colors</label>
              <div className="grid grid-cols-3 gap-1.5 mb-5">
                {colorsList.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setSelectedColor(c.name)}
                    className={`
                      p-1.5 rounded-xl text-[10px] font-bold border text-center transition-all flex flex-col items-center gap-1
                      ${selectedColor === c.name
                        ? 'bg-sky-700 border-sky-700 text-white shadow-sm'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300'
                      }
                    `}
                  >
                    <span className="w-3.5 h-3.5 rounded-full border border-slate-400 shrink-0" style={{ backgroundColor: c.hex }} />
                    <span className="truncate w-full text-[9px]">{c.name}</span>
                  </button>
                ))}
              </div>

              {/* ESTIMATOR SUB-BOX */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 mb-4">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                    <Calculator className="w-4 h-4 text-sky-600" /> Coverage Estimator
                  </label>
                  <span className="text-[10px] bg-slate-900 text-white px-2 py-0.5 rounded font-bold">
                    ₹980 / rmt
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div>
                    <label className="block text-[10px] font-semibold text-slate-600 mb-1">Length per Sheet (Mtrs)</label>
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
                      value={quantityPieces}
                      onChange={(e) => setQuantityPieces(e.target.value)}
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

              {/* MAIN CTA BUTTON */}
              <button
                onClick={() => setShowModal(true)}
                className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 rounded-2xl text-xs shadow-md transition flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4" /> Request Quote For Polycarbonate Sheets
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
                Polycarbonate Sheet Technical Matrix
              </h2>
            </div>
            <div className="flex items-center gap-2 text-xs font-bold text-slate-600 bg-slate-100 px-3 py-2 rounded-xl">
              <ShieldCheck className="w-4 h-4 text-emerald-600" /> ASTM D1003 & UL 94 Certified
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-slate-900 text-white font-bold">
                  <th className="p-3.5 rounded-l-xl">Sheet Property</th>
                  <th className="p-3.5">Technical Specification</th>
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

        {/* SECTION 3: CO-EXTRUDED UV SHIELD & NOMINAL THICKNESS HIGHLIGHTS */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
            <div className="w-10 h-10 rounded-2xl bg-sky-50 text-sky-700 flex items-center justify-center mb-3">
              <Sun className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Co-Extruded UV Protection Barrier</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              A layer of highly UV stabilised POLYCARBONATE is co-extruded directly on the weathering side of all Hough Group Polycarbonate Roof Sheets. This layer will never crack or delaminate, ensuring years of clear light transmission without yellowing.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
            <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center mb-3">
              <Ruler className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Micrometer Nominal Thickness Standard</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Established by representative micrometer measurements across the full sheet width. Available in <strong>1.25 mm</strong> and <strong>2.00 mm</strong> nominal thickness specifications matching all non-translucent metal roof profiles.
            </p>
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
            <img src={activeImage} alt="Polycarbonate Sheet Preview" className="max-w-full max-h-[85vh] object-contain rounded-2xl bg-white p-4" />
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
              Polycarbonate Sheet — {nominalThickness} ({selectedColor}) Rate: ₹980.00 / rmt
            </p>

            {isSubmitted ? (
              <div className="py-8 text-center">
                <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-3 animate-bounce" />
                <h4 className="font-bold text-slate-900 text-lg">Inquiry Received!</h4>
                <p className="text-xs text-slate-600 mt-1">Our translucent roofing expert will contact you shortly.</p>
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
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-slate-900"
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
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Required Length (rmt / meters)</label>
                  <input
                    type="text"
                    placeholder={`e.g. ${totalRunningMeters} rmt`}
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Additional Requirements</label>
                  <textarea
                    rows={3}
                    placeholder="Specify profile matching (e.g. 1010 trapezoidal, 76/18 corrugated) or cut length"
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
