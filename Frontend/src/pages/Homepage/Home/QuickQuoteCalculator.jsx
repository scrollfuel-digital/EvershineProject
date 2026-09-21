import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Calculator, Send, CheckCircle2, PhoneCall, ArrowRight, MessageSquare, FileText } from "lucide-react";

const materialOptions = [
  { id: "roofing", label: "Colouron & Bare Galvalume Sheets", unit: "Sq. Meters / MT" },
  { id: "tmt", label: "Fe 550D / Fe 500D TMT Rebars", unit: "Metric Tonnes (MT)" },
  { id: "purlins", label: "Z & C Structural Purlins", unit: "RMT / MT" },
  { id: "decking", label: "Composite Metal Deck Sheets", unit: "Sq. Meters" },
  { id: "puff", label: "PUF / PIR Insulated Panels", unit: "Sq. Meters" },
  { id: "poly", label: "Polycarbonate Daylighting Sheets", unit: "Sq. Meters" },
];

const quantityOptions = [
  "Less than 5 MT (Sample / Small Batch)",
  "5 - 20 MT (Standard Industrial Shed)",
  "20 - 50 MT (Medium Commercial Project)",
  "50+ MT (Mega Infrastructure / Bulk)",
];

export default function QuickQuoteCalculator() {
  const [selectedMaterial, setSelectedMaterial] = useState("roofing");
  const [selectedQuantity, setSelectedQuantity] = useState(quantityOptions[1]);
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!phone) return;

    // Construct WhatsApp prefilled message
    const matLabel = materialOptions.find((m) => m.id === selectedMaterial)?.label || selectedMaterial;
    const text = `Hello Evershine MSME! I would like to request an instant B2B quote:%0A%0A*Material:* ${encodeURIComponent(matLabel)}%0A*Volume:* ${encodeURIComponent(selectedQuantity)}%0A*Project City:* ${encodeURIComponent(city || "Not specified")}%0A*Contact:* ${encodeURIComponent(phone)}`;

    window.open(`https://wa.me/919860118911?text=${text}`, "_blank");
    setSubmitted(true);
  };

  return (
    <section id="quick-calculator" className="bg-gradient-to-b from-white to-slate-50 py-12 sm:py-16 lg:py-20 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="rounded-2xl border border-slate-200 bg-[#081827] text-white p-5 sm:p-8 lg:p-10 shadow-2xl relative overflow-hidden">
          {/* Subtle Ambient Background Gradient */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#E3A72F]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">

            {/* Left Column: Heading & Value Proposition */}
            <div className="lg:col-span-5 space-y-4 sm:space-y-5">
              <div className="font-['Inter',sans-serif] inline-flex items-center gap-2 rounded-md bg-[#E3A72F]/20 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-[#F2C054]">
                <Calculator className="w-3.5 h-3.5 text-[#E3A72F]" />
                <span>Instant B2B Price Estimator</span>
              </div>

              <h2 className="font-['Sora',sans-serif] text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
                Get Mill-Direct Pricing For Your Project
              </h2>

              <p className="font-['Inter',sans-serif] text-sm sm:text-base text-slate-300 leading-relaxed">
                Select your materials, volume requirements, and destination. Our procurement specialists
                generate an itemized project estimate with verified MTC standards and transportation costs.
              </p>

              <div className="space-y-2.5 pt-1 text-xs text-slate-300">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#E3A72F] shrink-0" />
                  <span>Transparent GST invoicing with zero hidden loading fees</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#E3A72F] shrink-0" />
                  <span>Custom profiling, precision cutting, and pre-punching support</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#E3A72F] shrink-0" />
                  <span>Direct WhatsApp dispatch updates and transit insurance</span>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  to="/all-categories"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-[4px] border border-white/30 hover:border-white bg-white/10 hover:bg-white/20 px-6 py-3 text-xs sm:text-sm font-semibold text-white transition-all duration-200 cursor-pointer"
                >
                  <FileText className="w-4 h-4 text-[#E3A72F]" />
                  <span>Browse Full Product Catalog</span>
                </Link>
              </div>
            </div>

            {/* Right Column: Interactive 3-Step Form */}
            <div className="lg:col-span-7">
              <form
                onSubmit={handleSubmit}
                className="rounded-xl border border-white/15 bg-white/[0.04] backdrop-blur-md p-5 sm:p-7 space-y-4 sm:space-y-5"
              >
                {/* Step 1: Material Selection */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                    Step 1: Select Material Category
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {materialOptions.map((opt) => (
                      <button
                        type="button"
                        key={opt.id}
                        onClick={() => setSelectedMaterial(opt.id)}
                        className={`text-left p-3 rounded-lg border text-xs font-semibold transition-all cursor-pointer ${selectedMaterial === opt.id
                            ? "bg-[#E3A72F] text-[#081827] border-[#E3A72F] shadow-sm font-bold"
                            : "bg-white/5 text-slate-200 border-white/10 hover:bg-white/10"
                          }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Step 2: Tonnage / Volume */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                    Step 2: Approximate Quantity / Project Scale
                  </label>
                  <select
                    value={selectedQuantity}
                    onChange={(e) => setSelectedQuantity(e.target.value)}
                    className="w-full rounded-lg border border-white/20 bg-[#0d2338] px-3.5 py-2.5 text-xs sm:text-sm text-white focus:border-[#E3A72F] focus:outline-hidden"
                  >
                    {quantityOptions.map((qty, idx) => (
                      <option key={idx} value={qty} className="bg-[#081827] text-white">
                        {qty}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Step 3: Destination & Mobile */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                      Step 3: Delivery City / Site
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Pune, NCR, Ahmedabad"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full rounded-lg border border-white/20 bg-[#0d2338] px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:border-[#E3A72F] focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                      WhatsApp / Mobile Number
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full rounded-lg border border-white/20 bg-[#0d2338] px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:border-[#E3A72F] focus:outline-hidden"
                    />
                  </div>
                </div>

                {/* Submit CTA */}
                <button
                  type="submit"
                  className="w-full rounded-lg bg-[#E3A72F] hover:bg-[#F2BF51] text-[#081827] py-3.5 px-6 font-bold text-sm sm:text-base transition-all duration-200 shadow-lg shadow-[#E3A72F]/20 hover:scale-[1.01] flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Receive Instant Quotation on WhatsApp</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                {submitted && (
                  <p className="text-center text-xs text-green-400 mt-2 font-medium">
                    ✓ Opening WhatsApp chat with your pre-filled inquiry. Our technical desk will respond promptly!
                  </p>
                )}
              </form>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
