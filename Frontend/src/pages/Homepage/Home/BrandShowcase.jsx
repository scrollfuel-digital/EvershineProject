import React from "react";
import { ShieldCheck, Award } from "lucide-react";
import jswLogo from "../../../assets/brand/JSWLogo.png";
import tataLogo from "../../../assets/brand/TATAlogo.png";
import apolloLogo from "../../../assets/brand/ApolloLogo.png";
import amnsLogo from "../../../assets/brand/AMIndialogo.png";
import hindalcoLogo from "../../../assets/brand/HindalcoLogo.png";

const brandPartners = [
  {
    id: 1,
    name: "JSW Steel",
    logo: jswLogo,
    tag: "Color Coated & Galvalume Coils",
    tier: "Authorized Distribution Partner",
  },
  {
    id: 2,
    name: "Tata Steel",
    logo: tataLogo,
    tag: "Tiscon TMT & Cold Rolled Sheets",
    tier: "Primary Sourcing Mill",
  },
  {
    id: 3,
    name: "APL Apollo",
    logo: apolloLogo,
    tag: "Hollow Sections & Structural Tubes",
    tier: "Structural Supply Partner",
  },
  {
    id: 4,
    name: "AM/NS India",
    logo: amnsLogo,
    tag: "Heavy Structural & Hot Rolled Plates",
    tier: "Certified Steel Partner",
  },
  {
    id: 5,
    name: "Hindalco",
    logo: hindalcoLogo,
    tag: "Aluminium Profile Roofing Sheets",
    tier: "Aluminium Sourcing Mill",
  },
];

export default function BrandShowcase() {
  return (
    <section className="bg-gradient-to-b from-[#06111b] via-[#091b2c] to-[#0c2237] py-12 sm:py-16 lg:py-20 border-b border-[#1b344b] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header with Certified Sourcing Tag */}
        

        {/* Brand Logo Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-6 pt-2">
          {brandPartners.map((brand, idx) => (
            <div
              key={brand.id}
              className={`group relative ${
                idx === brandPartners.length - 1
                  ? "col-span-2 sm:col-span-1 max-w-[220px] sm:max-w-none mx-auto w-full"
                  : ""
              }`}
            >
              <div
                className="relative flex flex-col items-center justify-between rounded-xl border border-[#E3A72F]/60 bg-[#10304e] shadow-xl shadow-[#05101a]/50 backdrop-blur-sm p-4 sm:p-6 transition-all duration-300 transform -translate-y-1.5 group-hover:translate-y-0 group-hover:border-white/10 group-hover:bg-[#0d273f]/70 group-hover:shadow-md h-full cursor-pointer"
              >
                {/* Top Tier Badge */}
                <span className="text-[10px] font-semibold text-[#F6C45E] group-hover:text-slate-400 transition-colors mb-3 text-center uppercase tracking-wider">
                  {brand.tier}
                </span>

                {/* Logo Container with Soft White Background Pill */}
                <div className="w-full h-16 sm:h-20 bg-white rounded-lg p-2.5 sm:p-3 flex items-center justify-center shadow-md transition-transform duration-300 scale-105 group-hover:scale-100">
                  <img
                    src={brand.logo}
                    alt={`${brand.name} logo`}
                    className="max-h-full max-w-full object-contain filter contrast-105"
                    loading="lazy"
                  />
                </div>

                {/* Brand Name & Key Product Tag */}
                <div className="text-center mt-3.5 w-full">
                  <h3 className="font-['Sora',sans-serif] text-sm sm:text-base font-bold text-[#F6C45E] group-hover:text-white transition-colors">
                    {brand.name}
                  </h3>
                  <p className="text-[11px] text-slate-300 group-hover:text-slate-400 mt-1 leading-tight line-clamp-1 transition-colors">
                    {brand.tag}
                  </p>
                </div>

                {/* Bottom Subtle Accent Line */}
                <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-[#E3A72F] to-transparent opacity-100 group-hover:opacity-0 transition-opacity duration-300 rounded-b-xl" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
