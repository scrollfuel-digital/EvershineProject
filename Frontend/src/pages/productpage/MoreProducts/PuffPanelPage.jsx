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
import doubleSkinCadImg from '../../../assets/puff_panels/puff_double_skin_cad.jpg';
import exploded3dImg from '../../../assets/puff_panels/puff_3d_exploded.png';
import standingSeamCoreImg from '../../../assets/puff_panels/puff_standing_seam_core.jpg';

export default function PuffPanelPage() {
  const images = [
    { src: exploded3dImg, label: '3D Exploded Double Skin Diagram' },
    { src: doubleSkinCadImg, label: 'CAD Cutaway with Z-Purlin Core' },
    { src: standingSeamCoreImg, label: 'Standing Seam Insulated Profile' }
  ];

  const [activeImage, setActiveImage] = useState(exploded3dImg);
  const [showModal, setShowModal] = useState(false);
  const [showLightbox, setShowLightbox] = useState(false);
  
  // Interactive Customization Controls
  const [metalSkinType, setMetalSkinType] = useState('PPGL / PPGI');
  const [profileType, setProfileType] = useState('Trapezoidal Profile');

  // Calculator State
  const [areaSqm, setAreaSqm] = useState('500');

  // Form State
  const [formData, setFormData] = useState({ name: '', phone: '', quantity: '', requirements: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Wholesale Rate per SQM
  const RATE_PER_SQM = 1500.00;

  const sqm = (parseFloat(areaSqm) || 500);
  const estCostRs = Math.round(sqm * RATE_PER_SQM);

  const technicalSpecsMatrix = [
    { prop: 'Core Insulation Density', val: '40 ± 2 kg/m³ (Rigid Polyurethane PUF)', std: 'IS 11239 / ASTM D-1622' },
    { prop: 'Thermal Conductivity (k-value)', val: '0.020 – 0.024 W/m·K', std: 'ASTM C518' },
    { prop: 'Standard Core Thickness', val: '30 mm, 50 mm, 80 mm, 100 mm, 150 mm', std: 'Factory Formed' },
    { prop: 'Outer / Inner Skin Material', val: 'PPGL / PPGI / Galvalume / Aluminium', std: 'IS 15965 / ASTM A792' },
    { prop: 'Facing Metal Thickness', val: '0.35 mm to 0.80 mm BMT', std: 'IS 513 / IS 277' },
    { prop: 'Compressive Strength', val: '≥ 150 kPa at 10% deformation', std: 'ASTM D-1621' },
    { prop: 'Temperature Range', val: '-40°C to +80°C', std: 'Continuous Exposure' },
    { prop: 'Fire Classification', val: 'Class B2 / Self-Extinguishing / PIR Option', std: 'DIN 4102-1' }
  ];

  const applicationsList = [
    { name: 'Power Sector', desc: 'Acoustic & thermal insulation for turbine halls' },
    { name: 'Commercial Buildings', desc: 'Modern shopping malls & office complexes' },
    { name: 'Architectural Projects', desc: 'Premium custom facade & curved roofs' },
    { name: 'Residential Projects', desc: 'Luxury villas & climate-controlled roofing' },
    { name: 'Auditorium & Theaters', desc: 'Soundproofing & vibration damping acoustic roof' },
    { name: 'Industrial Buildings', desc: 'Heavy manufacturing plants & warehouses' },
    { name: 'Multiplexes', desc: 'High thermal resistance & fire retardant skin' },
    { name: 'Agricultural Buildings', desc: 'Poultry & agro-storage temperature control' }
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
          <span className="font-semibold text-slate-900">Puff Panel / Double Skin Roof Sheet</span>
        </nav>

        {/* HERO BANNER - STANDARDIZED SLATE THEME */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white p-6 sm:p-10 mb-10 shadow-2xl border border-slate-800">
          <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="max-w-2xl">
              <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-3">
                Puff Panel <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-sky-300 to-amber-300">Sheet</span>
              </h1>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Double skin metal roofing system comprising 2 parallel metal sheets linked by Z-purlins creating an insulated gap for high thermal insulation, vapour barrier, and superior acoustic damping.
              </p>
            </div>

            {/* Price Badge Card */}
            <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-3xl p-6 text-center lg:text-right shrink-0 shadow-2xl">
              <span className="text-xs uppercase tracking-wider text-sky-300 font-bold block mb-1">STANDARD WHOLESALE PRICE</span>
              <span className="text-xs text-slate-300 block">Ex-Factory | All Custom Thicknesses</span>
            </div>
          </div>
        </div>

        {/* SECTION 1: PHOTO GALLERY + INTERACTIVE CONFIGURATOR */}
        <div className="grid lg:grid-cols-12 gap-8 mb-12">
          
          {/* LEFT 7 COLS: PHOTO GALLERY */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-5 border border-slate-200 shadow-sm">
            <div 
              onClick={() => setShowLightbox(true)}
              className="relative w-full h-[360px] sm:h-[440px] bg-slate-100 rounded-2xl overflow-hidden mb-4 border border-slate-200 group cursor-pointer"
            >
              <img 
                src={activeImage} 
                alt="Puff Panel Sheet System"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <button 
                className="absolute top-3 right-3 bg-slate-900/80 hover:bg-[#004060] text-white p-2 rounded-xl backdrop-blur-md transition shadow-md"
                aria-label="Enlarge Image"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
              <span className="absolute bottom-3 left-3 bg-slate-900/85 text-[#B8D8E8] text-xs px-3 py-1.5 rounded-lg font-semibold shadow-md">
                Double Skin Insulated System
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
                      ? 'border-[#004060] ring-2 ring-[#004060]/30 scale-[1.02] shadow-md' 
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

          {/* RIGHT 5 COLS: CONFIGURATOR & SQM ESTIMATOR */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6">
            
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
              <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Ruler className="w-5 h-5 text-sky-600" /> Double Skin Configuration
              </h2>

              {/* METAL SKIN TYPE SELECTOR */}
              <label className="block text-xs font-bold text-slate-700 mb-2">Outer/Inner Metal Skin</label>
              <div className="grid grid-cols-3 gap-1.5 mb-4">
                {['PPGL / PPGI', 'Aluminium', 'Bare Galv (BG)'].map((skin) => (
                  <button
                    key={skin}
                    onClick={() => setMetalSkinType(skin)}
                    className={`
                      py-2 px-1 rounded-xl text-[11px] font-bold border text-center transition-all
                      ${metalSkinType === skin
                        ? 'bg-slate-900 border-slate-900 text-white shadow-sm'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300'
                      }
                    `}
                  >
                    {skin}
                  </button>
                ))}
              </div>

              {/* PROFILE TYPE SELECTOR */}
              <label className="block text-xs font-bold text-slate-700 mb-2">Roof Profile Option</label>
              <div className="grid grid-cols-3 gap-1.5 mb-5">
                {['Trapezoidal', 'Clay Tile', 'Standing Seam'].map((prof) => (
                  <button
                    key={prof}
                    onClick={() => setProfileType(prof)}
                    className={`
                      py-2 px-1 rounded-xl text-[11px] font-bold border text-center transition-all
                      ${profileType === prof
                        ? 'bg-sky-700 border-sky-700 text-white shadow-sm'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300'
                      }
                    `}
                  >
                    {prof}
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
                    ₹1,500 / Sq.m
                  </span>
                </div>

                <div className="mb-3">
                  <label className="block text-[10px] font-semibold text-slate-600 mb-1">Total Roof Area (Square Meters)</label>
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
                <MessageSquare className="w-4 h-4" /> Request Quote For Double Skin System
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
                Puff Panel Technical Matrix
              </h2>
            </div>
            <div className="flex items-center gap-2 text-xs font-bold text-slate-600 bg-slate-100 px-3 py-2 rounded-xl">
              <ShieldCheck className="w-4 h-4 text-emerald-600" /> IS & ASTM Certified
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-slate-900 text-white font-bold">
                  <th className="p-3.5 rounded-l-xl">Panel Property</th>
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

        {/* SECTION 3: 3-TIER DOUBLE SKIN SYSTEM ANATOMY */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-sm mb-12">
          <div className="mb-6 pb-4 border-b border-slate-200">
            <span className="text-xs uppercase font-extrabold tracking-wider text-sky-700 bg-sky-50 px-3 py-1 rounded-full border border-sky-100">
              System Engineering
            </span>
            <h2 className="text-2xl font-extrabold text-slate-900 mt-2">
              Double Skin Metal Roof System Architecture
            </h2>
            <p className="text-xs text-slate-500">How two parallel metal skins with Z-purlin spacing deliver ultimate thermal & acoustic performance.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
              <span className="w-8 h-8 rounded-xl bg-slate-900 text-white font-black text-xs flex items-center justify-center mb-3">01</span>
              <h3 className="font-bold text-slate-900 text-base mb-1">Top Metal Skin</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Weatherproof outer metal cladding available in Trapezoidal, Clay Tile, or Standing Seam profiles in PPGI, PPGL, Aluminium, or Bare Galvalume.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
              <span className="w-8 h-8 rounded-xl bg-slate-900 text-white font-black text-xs flex items-center justify-center mb-3">02</span>
              <h3 className="font-bold text-slate-900 text-base mb-1">Z-Purlin Core & Vapour Barrier</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Intermediate Z-purlin framing creates a precise gap housing PUFF / Rockwool insulation blankets and moisture-proof vapour barriers.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
              <span className="w-8 h-8 rounded-xl bg-slate-900 text-white font-black text-xs flex items-center justify-center mb-3">03</span>
              <h3 className="font-bold text-slate-900 text-base mb-1">Bottom Metal Liner</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Parallel bottom metal liner sheet sealing the interior roof space for a clean finished ceiling and superior acoustic absorption.
              </p>
            </div>
          </div>
        </div>

        {/* SECTION 4: WIDE RANGE OF APPLICATIONS */}
        <div className="mb-12">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-sky-700 font-bold text-xs uppercase tracking-wider bg-sky-50 px-3 py-1 rounded-full border border-sky-200">
              Versatile Usages
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
              Key Sector Applications
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">High-performance double skin roofing across commercial and industrial infrastructure</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {applicationsList.map((app, idx) => (
              <div key={idx} className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm hover:border-sky-500 transition">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 mb-2" />
                <h3 className="font-extrabold text-slate-900 text-sm mb-1">{app.name}</h3>
                <p className="text-xs text-slate-500">{app.desc}</p>
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
            <img src={activeImage} alt="Puff Panel Preview" className="max-w-full max-h-[85vh] object-contain rounded-2xl bg-white p-4" />
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
              Puff Panel Sheet — {metalSkinType} ({profileType}) Rate: ₹1,500 / SQM
            </p>

            {isSubmitted ? (
              <div className="py-8 text-center">
                <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-3 animate-bounce" />
                <h4 className="font-bold text-slate-900 text-lg">Inquiry Received!</h4>
                <p className="text-xs text-slate-600 mt-1">Our roofing system engineer will contact you with technical section drawings.</p>
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
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Required Area (SQM / Square Meters)</label>
                  <input
                    type="text"
                    placeholder={`e.g. ${areaSqm} SQM`}
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Additional Requirements</label>
                  <textarea
                    rows={3}
                    placeholder="Specify insulation thickness (e.g. 50mm PUFF or Rockwool) or profile shape"
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
