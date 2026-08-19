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
  Flame,
  Activity,
  Calculator,
  Compass,
  Palette,
  Ruler
} from 'lucide-react';

// Image imports
import profileSectionImg from '../../assets/multiwall_sheets/multiwall_profile_section.png';
import colorPaletteImg from '../../assets/multiwall_sheets/multiwall_color_palette.jpg';

export default function MultiwallSheetPage() {
  const images = [
    { src: profileSectionImg, label: 'Twin-Wall Profile Cross-Section' },
    { src: colorPaletteImg, label: 'Polycarbonate Color Spectrum' }
  ];

  const [activeImage, setActiveImage] = useState(profileSectionImg);
  const [showModal, setShowModal] = useState(false);
  const [showLightbox, setShowLightbox] = useState(false);
  
  // Interactive Customization Controls
  const [selectedColor, setSelectedColor] = useState('Opal White');
  const [selectedThickness, setSelectedThickness] = useState('6mm');
  const [selectedSize, setSelectedSize] = useState('2100 x 5800 mm');
  const [uvProtection, setUvProtection] = useState('Both Sided UV Protection');

  // Calculator State
  const [areaSqFt, setAreaSqFt] = useState('500');

  // Form State
  const [formData, setFormData] = useState({ name: '', phone: '', quantity: '', requirements: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Rate per sq.ft.
  const RATE_PER_SQFT = 55.00;

  const sqFt = (parseFloat(areaSqFt) || 500);
  const estCostRs = Math.round(sqFt * RATE_PER_SQFT);

  const colorsList = [
    { name: 'Clear', hex: '#E2E8F0' },
    { name: 'Opal White', hex: '#F8FAFC' },
    { name: 'Blue', hex: '#0284C7' },
    { name: 'Greenish Blue', hex: '#0D9488' },
    { name: 'Green', hex: '#16A34A' },
    { name: 'Metallic Grey', hex: '#64748B' },
    { name: 'Bronze', hex: '#78350F' },
    { name: 'Pencil Grey', hex: '#334155' }
  ];

  const astmTestMatrix = [
    {
      item: "Impact Resistance (Izod Notched Resin)",
      method: "ASTM D 256 (Pendulum: 7.5 Joule)",
      unit: "J/m",
      result: "908 J/m"
    },
    {
      item: "Sheet Curve Radius Limitation (6mm)",
      method: "Cold Bending Standard",
      unit: "mm Radius",
      result: "> 1050 mm Minimum Radius"
    },
    {
      item: "Sheet Curve Radius Limitation (10mm)",
      method: "Cold Bending Standard",
      unit: "mm Radius",
      result: "> 1750 mm Minimum Radius"
    },
    {
      item: "Specific Gravity / Density D23C",
      method: "ASTM D 792",
      unit: "Sp gr (23/23C)",
      result: "1.2 Sp gr / Kg/m³"
    },
    {
      item: "Flammability (Horizontal Burn / Flame Spread)",
      method: "ASTM D 635",
      unit: "mm/minute",
      result: "< 25 mm/minute (Self-Extinguishing)"
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
          <span className="font-semibold text-slate-900">Multiwall Polycarbonate Sheet</span>
        </nav>

        {/* HERO BANNER - EXACT AIR BUBBLE INSULATION COLOR PALETTE */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#0B192C] via-[#102A43] to-[#0B192C] text-white p-6 sm:p-10 mb-10 shadow-2xl border border-[#1E3A5F]">
          <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#003846] text-[#00D2FF] rounded-full text-xs font-bold mb-4 border border-cyan-800/50 shadow-sm">
                <Sun className="w-4 h-4 text-amber-400" /> ASTM D 256 Impact Resistant | Co-extruded UV Shield
              </div>
              <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-3">
                Multiwall Polycarbonate <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-sky-300 to-amber-300">Sheets</span>
              </h1>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Premium multiwall structured polycarbonate sheets featuring 908 J/m Izod impact resistance, thermal insulation channels, and optional co-extruded UV protection for skylights & architectural canopies.
              </p>
            </div>

            {/* Price Badge Card matching screenshot */}
            <div className="bg-[#132A3E]/80 backdrop-blur-md border border-[#1E3E5A] rounded-3xl p-6 text-center lg:text-right shrink-0 shadow-2xl">
              <span className="text-xs uppercase tracking-wider text-[#00D2FF] font-bold block mb-1">STANDARD WHOLESALE PRICE</span>
              <div className="text-4xl font-black text-[#FFC107] my-1">
                ₹55.00 <span className="text-sm font-normal text-slate-200">/ sq.ft.</span>
              </div>
              <span className="text-xs text-slate-300 block">Ex-Factory | Custom Sizes Available</span>
            </div>
          </div>
        </div>

        {/* SECTION 1: PHOTO GALLERY + INTERACTIVE COLOR & THICKNESS CONFIGURATOR */}
        <div className="grid lg:grid-cols-12 gap-8 mb-12">
          
          {/* LEFT 7 COLS: PHOTO GALLERY */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-5 border border-slate-200 shadow-sm">
            <div 
              onClick={() => setShowLightbox(true)}
              className="relative w-full h-[360px] sm:h-[440px] bg-slate-900 rounded-2xl overflow-hidden mb-4 border border-slate-200 group cursor-pointer"
            >
              <img 
                src={activeImage} 
                alt="Multiwall Polycarbonate Sheet"
                className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-500"
              />
              <button 
                className="absolute top-3 right-3 bg-slate-900/80 hover:bg-purple-600 text-white p-2 rounded-xl backdrop-blur-md transition shadow-md"
                aria-label="Enlarge Image"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
              <span className="absolute bottom-3 left-3 bg-slate-900/80 text-purple-300 text-xs px-3 py-1.5 rounded-lg font-semibold shadow-md">
                High Impact Resin Base
              </span>
            </div>

            {/* Thumbnails */}
            <div className="grid grid-cols-2 gap-3">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(img.src)}
                  className={`
                    relative rounded-2xl overflow-hidden aspect-video border-2 transition-all duration-200 bg-slate-900 p-2
                    ${activeImage === img.src 
                      ? 'border-purple-600 ring-2 ring-purple-600/20 scale-[1.02] shadow-md' 
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

          {/* RIGHT 5 COLS: INTERACTIVE CONFIGURATOR */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6">
            
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
              <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Ruler className="w-5 h-5 text-sky-600" /> Color & Thickness Options
              </h2>

              {/* COLOR SWATCH SELECTOR */}
              <label className="block text-xs font-bold text-slate-700 mb-2">Select Sheet Color</label>
              <div className="grid grid-cols-4 gap-1.5 mb-4">
                {colorsList.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setSelectedColor(c.name)}
                    className={`
                      p-1.5 rounded-xl text-[10px] font-bold border text-center transition-all flex flex-col items-center gap-1
                      ${selectedColor === c.name
                        ? 'bg-[#0B192C] border-[#0B192C] text-white shadow-sm'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300'
                      }
                    `}
                  >
                    <span className="w-3.5 h-3.5 rounded-full border border-slate-400 shrink-0" style={{ backgroundColor: c.hex }} />
                    <span className="truncate w-full text-[9px]">{c.name}</span>
                  </button>
                ))}
              </div>

              {/* THICKNESS SELECTOR */}
              <label className="block text-xs font-bold text-slate-700 mb-2">Multiwall Thickness (Twin-Wall)</label>
              <div className="grid grid-cols-4 gap-1.5 mb-5">
                {['6 mm', '8 mm', '10 mm', '12 mm'].map((thick) => (
                  <button
                    key={thick}
                    onClick={() => setSelectedThickness(thick)}
                    className={`
                      py-2 px-1 rounded-xl text-[11px] font-bold border text-center transition-all
                      ${selectedThickness === thick
                        ? 'bg-sky-700 border-sky-700 text-white shadow-sm'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300'
                      }
                    `}
                  >
                    {thick}
                  </button>
                ))}
              </div>

              {/* LIVE AREA ESTIMATOR SUB-BOX */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 mb-4">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                    <Calculator className="w-4 h-4 text-sky-600" /> Coverage Estimator (Sq.Ft)
                  </label>
                  <span className="text-[10px] bg-[#0B192C] text-white px-2 py-0.5 rounded font-bold">
                    ₹55 / sq.ft
                  </span>
                </div>

                <div className="mb-3">
                  <label className="block text-[10px] font-semibold text-slate-600 mb-1">Total Coverage Area (Sq.Ft)</label>
                  <input
                    type="number"
                    min="10"
                    value={areaSqFt}
                    onChange={(e) => setAreaSqFt(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-xl px-3 py-1.5 text-xs font-bold text-slate-900"
                  />
                </div>

                <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-200">
                  <div>
                    <span className="text-[10px] text-slate-500 block uppercase font-semibold">Total Area</span>
                    <span className="font-extrabold text-sky-700 text-sm">{areaSqFt} Sq.Ft</span>
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
                <MessageSquare className="w-4 h-4" /> Request Quote For Multiwall Sheets
              </button>
            </div>

          </div>

        </div>

        {/* SECTION 2: ASTM CERTIFIED TEST METHODS MATRIX */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-sm mb-12">
          <div className="mb-6 border-b border-slate-200 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="text-2xl font-extrabold text-slate-900">ASTM Certified Mechanical & Thermal Test Matrix</h3>
              <p className="text-xs text-slate-500">High-impact resin base standards and cold-bending performance parameters</p>
            </div>
            <span className="text-xs bg-purple-50 text-purple-700 px-3 py-1 rounded-full border border-purple-200 font-semibold self-start sm:self-auto">
              Rate: ₹55.00 / sq.ft.
            </span>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-200">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-900 text-white uppercase text-[11px] tracking-wider">
                <tr>
                  <th className="py-4 px-6 font-bold">Test Item / Parameter</th>
                  <th className="py-4 px-6 font-bold text-purple-300">Test Method</th>
                  <th className="py-4 px-6 font-bold text-purple-300">Unit</th>
                  <th className="py-4 px-6 font-bold text-amber-400">Certified Result</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white">
                {astmTestMatrix.map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-slate-50/50 hover:bg-slate-100/50' : 'hover:bg-slate-100/50'}>
                    <td className="py-3.5 px-6 font-bold text-slate-900 w-1/3">{row.item}</td>
                    <td className="py-3.5 px-6 text-slate-700 font-semibold">{row.method}</td>
                    <td className="py-3.5 px-6 text-slate-500 font-mono">{row.unit}</td>
                    <td className="py-3.5 px-6 text-purple-800 font-black">{row.result}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* SECTION 3: STANDARD DIMENSIONS & CUSTOMIZATIONS */}
        <div className="mb-12">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-purple-700 font-bold text-xs uppercase tracking-wider bg-purple-50 px-3 py-1 rounded-full border border-purple-200">
              Dimensional Availability
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
              Standard Sheet Sizes & Custom Cut Options
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">Available in standard roll/sheet sizes with customized cut-to-length service</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm">
              <span className="text-[10px] font-bold uppercase text-purple-600 bg-purple-50 px-2.5 py-1 rounded-full border border-purple-100 inline-block mb-2">Size A</span>
              <h3 className="font-extrabold text-slate-900 text-lg mb-1">2100 x 11800 mm</h3>
              <p className="text-xs text-slate-500">Full industrial length sheet for skylight roofing</p>
            </div>

            <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm">
              <span className="text-[10px] font-bold uppercase text-purple-600 bg-purple-50 px-2.5 py-1 rounded-full border border-purple-100 inline-block mb-2">Size B</span>
              <h3 className="font-extrabold text-slate-900 text-lg mb-1">2100 x 5800 mm</h3>
              <p className="text-xs text-slate-500">Standard container size for easy logistics</p>
            </div>

            <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm">
              <span className="text-[10px] font-bold uppercase text-purple-600 bg-purple-50 px-2.5 py-1 rounded-full border border-purple-100 inline-block mb-2">Size C</span>
              <h3 className="font-extrabold text-slate-900 text-lg mb-1">1220 x 11800 mm</h3>
              <p className="text-xs text-slate-500">Narrow width profile for architectural partitions</p>
            </div>

            <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm">
              <span className="text-[10px] font-bold uppercase text-purple-600 bg-purple-50 px-2.5 py-1 rounded-full border border-purple-100 inline-block mb-2">Size D</span>
              <h3 className="font-extrabold text-slate-900 text-lg mb-1">1220 x 5800 mm</h3>
              <p className="text-xs text-slate-500">Compact size for residential canopy roofing</p>
            </div>
          </div>
        </div>

        {/* HORIZONTAL ACTION BAR MATCHING USER REQUEST */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-sm mb-12 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span className="text-xs text-slate-500 block font-medium">Multiwall Polycarbonate Sheets</span>
            <span className="text-lg font-black text-amber-600">
              ₹55.00 / sq.ft. <span className="text-xs text-slate-500 font-normal">(UV Protected Polycarbonate)</span>
            </span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <a
              href="tel:+917498147921"
              aria-label="Call Sales"
              className="w-10 h-10 rounded-xl bg-slate-900 text-purple-400 flex items-center justify-center hover:bg-slate-800 transition shrink-0"
            >
              <Phone className="w-5 h-5" />
            </a>
            <a
              href="https://wa.me/917498147921?text=Hi,%20I%20am%20interested%20in%20Multiwall%20Polycarbonate%20Sheets%20(Rs.55/sqft)."
              target="_blank"
              rel="noreferrer"
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl font-bold text-xs transition shadow-sm flex items-center gap-2 shrink-0"
            >
              WhatsApp
            </a>
            <button
              onClick={() => setShowModal(true)}
              className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2.5 rounded-xl font-extrabold text-xs transition shadow-sm flex items-center gap-2 shrink-0"
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
            <img src={activeImage} alt="Multiwall Polycarbonate Preview" className="max-w-full max-h-[85vh] object-contain rounded-2xl bg-white p-4" />
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
            <p className="text-xs text-purple-600 mb-6">
              Multiwall Sheet — {selectedColor} ({selectedThickness}, {uvProtection}) Rate: ₹55.00 / sq.ft.
            </p>

            {isSubmitted ? (
              <div className="py-8 text-center">
                <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-3 animate-bounce" />
                <h4 className="font-bold text-slate-900 text-lg">Inquiry Received!</h4>
                <p className="text-xs text-slate-600 mt-1">Our technical sales executive will contact you with custom color samples.</p>
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
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-purple-600"
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
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-purple-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Required Area (sq. ft)</label>
                  <input
                    type="text"
                    placeholder={`e.g. ${areaSqFt} sq.ft.`}
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-purple-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Additional Requirements</label>
                  <textarea
                    rows={3}
                    placeholder="Specify sheet size or custom cut dimensions"
                    value={formData.requirements}
                    onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-purple-600"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-xl shadow-lg shadow-purple-600/20 text-sm transition"
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
